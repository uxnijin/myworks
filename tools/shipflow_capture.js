#!/usr/bin/env node
/**
 * Capture every ShipFlow page from the real thing.
 *
 * ShipFlow is a static HTML mockup with no build step, so headless Chrome can
 * open the files directly over file:// — no server needed. Driven over the
 * DevTools Protocol from plain Node: this machine has Chrome and a global
 * WebSocket, and installing puppeteer just to take screenshots is a detour.
 *
 *   node tools/shipflow_capture.js light
 *   node tools/shipflow_capture.js dark
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SRC = '/Users/nijin/Files/Code/shipflow';
const MODE = process.argv[2] === 'dark' ? 'dark' : 'light';
const OUT = path.join('/Users/nijin/Files/Code/portfolio 2/shipflow-assets/screens', MODE);
const PORT = 9333;
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

// page file → output name. The command palette gets its own pass below.
const PAGES = [
  ['index.html', '01-dashboard'],
  ['shipment-detail.html', '02-shipment'],
  ['exceptions.html', '03-exceptions'],
  ['calendar.html', '04-calendar'],
  ['import.html', '05-import'],
  ['reports.html', '06-reports'],
  ['notifications.html', '07-notifications'],
  ['inbox.html', '08-inbox'],
  ['settings.html', '09-settings'],
  ['login.html', '10-login'],
  ['style-guide.html', '11-style-guide'],
  ['404.html', '12-not-found'],
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
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
  const ready = new Promise((r) => ws.addEventListener('open', r));
  return {
    ready,
    send: (method, params = {}) =>
      new Promise((resolve) => {
        const n = ++id;
        pending.set(n, resolve);
        ws.send(JSON.stringify({ id: n, method, params }));
      }),
    close: () => ws.close(),
  };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'shipflow-'));
  const chrome = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--hide-scrollbars',
    '--force-color-profile=srgb',
    '--allow-file-access-from-files',
    'about:blank',
  ], { stdio: 'ignore' });

  const cdp = client(await connect());
  await cdp.ready;
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { ...VIEWPORT, mobile: false });

  console.log(`── shipflow · ${MODE} ──────────────────────────────`);

  const shoot = async (name) => {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
    fs.writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(data, 'base64'));
    console.log(`  ${name}`);
  };

  const open = async (file, extraWait = 0) => {
    await cdp.send('Page.navigate', { url: `file://${path.join(SRC, file)}` });
    await sleep(2600 + extraWait);
    // The theme is stored per-origin; set it after load and let the page settle.
    await cdp.send('Runtime.evaluate', {
      expression: `
        try { localStorage.setItem('theme', '${MODE}'); } catch (e) {}
        document.documentElement.setAttribute('data-theme', '${MODE}');
        document.documentElement.style.scrollBehavior = 'auto';
        document.querySelectorAll('img').forEach(i => i.loading = 'eager');
      `,
    });
    await sleep(900);
  };

  for (const [file, name] of PAGES) {
    await open(file, file === 'reports.html' ? 1200 : 0);
    await shoot(name);
  }

  // The command palette — global Cmd/Ctrl+K, so it needs a keystroke, not a URL.
  await open('index.html');
  await cdp.send('Runtime.evaluate', {
    expression: `document.dispatchEvent(new KeyboardEvent('keydown',
      { key: 'k', metaKey: true, bubbles: true }));`,
  });
  await sleep(1200);
  await shoot('20-command-palette');

  cdp.close();
  chrome.kill();
  console.log(`→ ${OUT}`);
})();
