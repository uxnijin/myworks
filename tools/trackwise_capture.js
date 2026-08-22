#!/usr/bin/env node
/**
 * Capture every Trackwise screen from the running dev server.
 *
 * Trackwise is a Vite/React app with real URL routes, so this navigates rather
 * than clicking. Persona and appearance live in localStorage under
 * `trackwise.devstate.v1` — the defaults are already Business + light, and this
 * writes them explicitly so a run is deterministic.
 *
 * Start the server first (preview_start name: "trackwise"), then:
 *   node tools/trackwise_capture.js light [port]
 *   node tools/trackwise_capture.js dark  [port]
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const MODE = process.argv[2] === 'dark' ? 'dark' : 'light';
const APP_PORT = process.argv[3] || '4173';
const BASE = `http://localhost:${APP_PORT}`;
const OUT = path.join('/Users/nijin/Files/Code/portfolio 2/trackwise-assets/screens', MODE);
const PORT = 9334;
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

const ROUTES = [
  ['/', '01-landing'],
  ['/track/pcl_public_demo', '02-public-track'],
  ['/pricing', '03-pricing'],
  ['/signin', '04-signin'],
  ['/app', '10-home'],
  ['/app/parcels', '11-parcels'],
  ['/app/parcels/attention', '12-attention'],
  ['/app/add', '14-add'],
  ['/app/alerts', '15-alerts'],
  ['/app/analytics', '16-analytics'],
  ['/app/branded', '17-branded'],
  ['/app/integrations', '18-integrations'],
  ['/app/inbox', '19-inbox'],
  ['/app/developers', '20-api-keys'],
  ['/app/developers/webhooks', '21-webhooks'],
  ['/app/developers/logs', '22-event-log'],
  ['/app/plans', '23-plans'],
  ['/app/settings/billing', '24-billing'],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch (_) { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('Chrome never came up on the debugging port');
}

function client(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  });
  const ready = new Promise((r) => ws.addEventListener('open', r));
  return {
    ready,
    send: (method, params = {}) => new Promise((resolve) => {
      const n = ++id; pending.set(n, resolve);
      ws.send(JSON.stringify({ id: n, method, params }));
    }),
    close: () => ws.close(),
  };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'trackwise-'));
  const chrome = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run', '--hide-scrollbars', '--force-color-profile=srgb',
    'about:blank',
  ], { stdio: 'ignore' });

  const cdp = client(await connect());
  await cdp.ready;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { ...VIEWPORT, mobile: false });

  // Seed the dev-state before the app boots, so persona and theme are fixed.
  const seed = JSON.stringify({
    personaId: 'business', dataState: 'ready',
    colorScheme: MODE, forceReducedMotion: true, isNavCollapsed: false,
  });
  await cdp.send('Page.navigate', { url: BASE });
  await sleep(3000);
  await cdp.send('Runtime.evaluate', {
    expression: `localStorage.setItem('trackwise.devstate.v1', ${JSON.stringify(seed)});`,
  });

  console.log(`── trackwise · ${MODE} ─────────────────────────────`);

  const shoot = async (name) => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, 'base64'));
    console.log(`  ${name}`);
  };

  const go = async (route, wait = 3000) => {
    await cdp.send('Page.navigate', { url: BASE + route });
    await sleep(wait);
    await cdp.send('Runtime.evaluate', {
      expression: `document.documentElement.style.scrollBehavior='auto';
                   document.querySelectorAll('img').forEach(i => i.loading='eager');`,
    });
    await sleep(700);
  };

  for (const [route, name] of ROUTES) {
    await go(route, route === '/app/analytics' ? 4200 : 3000);
    await shoot(name);
  }

  // Parcel detail. The Business workspace is MERCHANT_PARCELS, seeded 133, so
  // ids run pcl_133_000 upward — but resolve it from the DOM first and only
  // fall back to the known id, so a reseed doesn't silently break the shot.
  await go('/app/parcels');
  const { result } = await cdp.send('Runtime.evaluate', {
    expression: `(() => {
      const a = [...document.querySelectorAll('a[href*="/app/parcels/detail/"]')][0];
      if (a) return new URL(a.href).pathname;
      const m = document.body.innerHTML.match(/pcl_[0-9]+_[0-9]+/);
      return m ? '/app/parcels/detail/' + m[0] : '/app/parcels/detail/pcl_133_000';
    })()`,
    returnByValue: true,
  });
  await go((result && result.value) || '/app/parcels/detail/pcl_133_000', 3600);
  await shoot('13-parcel-detail');

  cdp.close();
  chrome.kill();
  console.log(`→ ${OUT}`);
})();
