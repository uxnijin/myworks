#!/usr/bin/env node
/* ============================================================================
 *  tools/prerender.js — turn the single-page app into 50-odd static pages.
 *
 *  WHY THIS EXISTS
 *
 *  Every URL on this site used to serve the same file: index.html, with the
 *  same <title>, the same description, a canonical pointing at "/", and an
 *  empty <div id="view">. A visitor never noticed, because script.js paints
 *  the page a few milliseconds later. A crawler did.
 *
 *  Googlebot will run the JavaScript eventually, but "eventually" is a render
 *  queue measured in days, and the social crawlers and the AI answer engines
 *  (OAI-SearchBot, PerplexityBot, Claude-SearchBot) do not run it at all. To
 *  every one of them the whole portfolio was one untitled page.
 *
 *  So: bake it. This script loads data.js, blocks.js and every body file in a
 *  Node vm — none of them touch the DOM, which is what makes this possible at
 *  all — and writes a real HTML file per route, with the real text in it.
 *  The SPA then boots on top and takes over navigation exactly as before.
 *
 *  HOW IT STAYS HONEST
 *
 *  The prose is rendered by `renderBlocks` from blocks.js, the same function
 *  the browser calls. Nothing here rewrites content: it renders the content
 *  that already exists into a second target.
 *
 *  RUN IT
 *
 *      node tools/prerender.js            # write the pages
 *      node tools/prerender.js --check    # fail if the pages are stale
 *
 *  Run it after any edit to data.js or a body file, and commit the result.
 * ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const CHECK = process.argv.includes('--check');
const QUIET = process.argv.includes('--quiet');

/* -------------------------------------------------------------- the sandbox
 *
 * data.js and blocks.js are plain scripts full of top-level `const`, written
 * for a <script> tag. A vm context runs them as-is; the bindings land in the
 * context's global lexical scope, so they are read back by evaluating an
 * expression in the same context rather than off `globalThis`.
 */

const sandbox = { console, Date, Intl };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const run = (file) =>
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), sandbox, { filename: file });
const read = (expr) => vm.runInContext(expr, sandbox);

run('data.js');
run('blocks.js');

// `BODY` and `PAGE` are defined by script.js in the browser. Here they merge
// a body file onto its index record, which is all the prerenderer needs.
const PAGE_DATA = {};
sandbox.BODY = (slug, data) => {
  const entry = allEntries().find((e) => e.slug === slug);
  if (entry) Object.assign(entry, data);
  else warn(`body file for unknown slug: ${slug}`);
};
sandbox.PAGE = (key, data) => {
  PAGE_DATA[key] = data;
};

const DESIGNS = read('DESIGNS');
const PROJECTS = read('PROJECTS');
const FINDINGS = read('FINDINGS');
const CASE_STUDIES = read('CASE_STUDIES');
const PROFILE = read('PROFILE');
const SITE = read('SITE');
const HOME = read('HOME');
const CONTACT = read('CONTACT');
const PAGE_COPY = read('PAGE_COPY');
const SEO = read('SEO');
const renderBlocks = read('renderBlocks');
const esc = read('esc');

function allEntries() {
  return [...DESIGNS, ...PROJECTS, ...FINDINGS, ...CASE_STUDIES];
}

const warnings = [];
const warn = (m) => warnings.push(m);

// load every body file named on a record, plus the standalone pages
for (const entry of allEntries()) {
  if (!entry.body) continue;
  const file = entry.body.replace(/^\//, '');
  if (!fs.existsSync(path.join(ROOT, file))) {
    warn(`missing body file: ${file}`);
    continue;
  }
  run(file);
}
for (const page of ['pages/about.js', 'pages/graphics.js']) {
  if (fs.existsSync(path.join(ROOT, page))) run(page);
}

/* ------------------------------------------------------------- small helpers
 * Copies of the four one-liners from script.js that shape an entry's name.
 * They are three lines each and have not changed in the life of the site;
 * importing script.js would mean shimming a DOM for no gain.
 */

const shortName = (p) => String(p.name || p.title || '').split(':')[0].trim();
const subName = (p) => {
  const name = String(p.name || p.title || '');
  const i = name.indexOf(':');
  const sub = i > -1 ? name.slice(i + 1).trim() : p.category || '';
  return sub.toLowerCase() === shortName(p).toLowerCase() ? '' : sub;
};
const entryMeta = (p) => {
  const sub = subName(p).toLowerCase();
  const bits = [];
  if (p.category && p.category.toLowerCase() !== sub) bits.push(p.category);
  if (p.group && p.group.toLowerCase() !== sub) bits.push(p.group);
  if (p.users) bits.push(`${p.users.toLocaleString('en-US')} users`);
  if (p.status) bits.push(p.status);
  return bits.join(' · ');
};

const SITE_URL = SEO.siteUrl.replace(/\/$/, '');
const abs = (u) => (!u ? '' : /^https?:/.test(u) ? u : SITE_URL + (u.startsWith('/') ? u : '/' + u));

// strip inline HTML and collapse whitespace — a description is plain text
const plain = (s = '') =>
  String(s)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Descriptions are cut at a word boundary, never mid-word, and never with an
// ellipsis — a truncated sentence in a search result reads as a broken page.
function clamp(s, max = 158) {
  const t = plain(s);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—-]$/, '').trim();
}

const fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] || '').replace(/\s+/g, ' ')
  .replace(/\s+—\s*$/, '').replace(/—\s+—/g, '—').trim();

/* --------------------------------------------------------------- the routes
 *
 * One entry per URL the site answers on. The file for a route is
 * `<path>.html`, not `<path>/index.html`.
 *
 * That is measured, not assumed. Netlify serves a flat file for an
 * extensionless request directly: /_probe returned _probe.html with a 200 and
 * no redirect. A directory index does not: /_probedir was sent to /_probedir/
 * with a 301. Written the second way, /designs/plate would have answered on
 * /designs/plate/ — one redirect hop away from every internal link, every
 * sitemap entry, and its own canonical tag.
 *
 * The home page is index.html because it has to be.
 *
 * Netlify also serves a real file in preference to the SPA catch-all in
 * _redirects, which is what lets all of this coexist with the router.
 */

const routes = [];
// `out` is derived, never passed: the file and the URL cannot disagree.
const addRoute = (r) => routes.push({ ...r, out: r.path === '' ? 'index.html' : `${r.path}.html` });

// --- index and standalone pages
addRoute({ path: '', kind: 'home' });
addRoute({ path: 'designs', kind: 'index', items: DESIGNS, base: 'designs' });
addRoute({ path: 'case-studies', kind: 'index', items: CASE_STUDIES, base: 'case-studies' });
addRoute({ path: 'products', kind: 'index', items: PROJECTS, base: 'docs' });
addRoute({ path: 'findings', kind: 'index', items: FINDINGS, base: 'findings' });
addRoute({ path: 'graphics', kind: 'graphics' });
addRoute({ path: 'about', kind: 'about' });
addRoute({ path: 'contact', kind: 'contact' });

// --- detail pages
for (const d of DESIGNS) addRoute({ path: `designs/${d.slug}`, kind: 'design', entry: d, collection: DESIGNS, base: 'designs' });
for (const c of CASE_STUDIES) addRoute({ path: `case-studies/${c.slug}`, kind: 'caseStudy', entry: c, collection: CASE_STUDIES, base: 'case-studies' });
for (const f of FINDINGS) addRoute({ path: `findings/${f.slug}`, kind: 'finding', entry: f, collection: FINDINGS, base: 'findings' });
for (const p of PROJECTS) {
  addRoute({ path: `docs/${p.slug}`, kind: 'product', entry: p, collection: PROJECTS, base: 'docs' });
  if (p.privacyBlocks) addRoute({ path: `docs/${p.slug}/privacy`, kind: 'legal', entry: p, legal: 'privacy' });
  if (p.termsBlocks) addRoute({ path: `docs/${p.slug}/terms`, kind: 'legal', entry: p, legal: 'terms' });
}

/* ------------------------------------------------------------------ the head
 *
 * Everything a crawler reads before it reads a word of the page.
 */

function ldJson(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj, null, 2)}</script>`;
}

// The person behind everything, referenced by @id from every other node so the
// whole site describes one entity rather than fifty unrelated authors.
const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SEO.fullName,
    alternateName: SEO.altName,
    url: `${SITE_URL}/`,
    image: { '@type': 'ImageObject', url: abs(PROFILE.avatar), width: 1024, height: 1024 },
    jobTitle: SEO.jobTitle,
    description: plain(PROFILE.bio),
    email: `mailto:${SITE.email}`,
    telephone: `+${SITE.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO.locality,
      addressRegion: SEO.region,
      addressCountry: SEO.countryCode,
    },
    knowsAbout: SEO.keywords,
    sameAs: PROFILE.links.map((l) => l.url),
    worksFor: { '@type': 'Organization', name: 'HACA (Haris & Co Academy)', url: 'https://harisandcoacademy.com' },
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE_URL}/`,
    name: SEO.siteName,
    description: SEO.pages[''].description,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
    // the site has a real client-side search palette behind ⌘K; declaring it
    // is what makes a sitelinks search box possible on the brand query
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/designs?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumbNode(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path === '' ? '/' : `/${t.path}`),
    })),
  };
}

function buildHead(route) {
  const meta = pageMeta(route);
  const url = route.path === '' ? `${SITE_URL}/` : `${SITE_URL}/${route.path}`;
  const image = abs(meta.image || SEO.defaultImage);

  const graph = [personNode(), websiteNode(), ...(meta.nodes || [])];
  if (meta.trail) graph.push(breadcrumbNode(meta.trail));

  return [
    '  <!-- seo:head:start — generated by tools/prerender.js. Do not hand-edit;',
    '       the copy lives in the SEO object in data.js. -->',
    `  <title>${esc(meta.title)}</title>`,
    `  <meta name="description" content="${esc(meta.description)}">`,
    `  <link rel="canonical" href="${esc(url)}">`,
    meta.noindex
      ? '  <meta name="robots" content="noindex, follow">'
      : '  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
    `  <meta name="author" content="${esc(SEO.fullName)}">`,
    '',
    `  <meta property="og:type" content="${meta.ogType || 'website'}">`,
    `  <meta property="og:site_name" content="${esc(SEO.siteName)}">`,
    `  <meta property="og:title" content="${esc(meta.title)}">`,
    `  <meta property="og:description" content="${esc(meta.description)}">`,
    `  <meta property="og:url" content="${esc(url)}">`,
    `  <meta property="og:image" content="${esc(image)}">`,
    `  <meta property="og:image:alt" content="${esc(meta.imageAlt || meta.title)}">`,
    '  <meta property="og:locale" content="en_US">',
    ...(meta.published ? [`  <meta property="article:published_time" content="${esc(meta.published)}">`] : []),
    '',
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${esc(meta.title)}">`,
    `  <meta name="twitter:description" content="${esc(meta.description)}">`,
    `  <meta name="twitter:image" content="${esc(image)}">`,
    `  <meta name="twitter:image:alt" content="${esc(meta.imageAlt || meta.title)}">`,
    ...(SEO.twitterHandle ? [`  <meta name="twitter:creator" content="${esc(SEO.twitterHandle)}">`] : []),
    '',
    // the LCP element on a detail page is the hero figure; telling the browser
    // about it before the parser reaches the markup is worth ~200ms
    ...(meta.preload ? [`  <link rel="preload" as="image" href="${esc(meta.preload)}" fetchpriority="high">`] : []),
    '',
    '  ' + ldJson({ '@context': 'https://schema.org', '@graph': graph }),
    '  <!-- seo:head:end -->',
  ]
    .filter((l) => l !== null)
    .join('\n');
}

/* -------------------------------------------------------- per-route metadata */

function entryImage(p) {
  if (p.ogImage) return p.ogImage;
  const og = `/images/og/${p.slug}.png`;
  if (fs.existsSync(path.join(ROOT, og.slice(1)))) return og;
  return p.thumbUrl || p.coverUrl || SEO.defaultImage;
}

function entryDescription(p) {
  const lede = plain(p.lede || '');
  const summary = plain(p.summary || '');
  const best = lede.length >= 80 ? lede : summary.length >= 80 ? summary : `${summary} ${lede}`.trim();
  return clamp(best);
}

// "August 2026" is how a finding carries its date. Schema wants ISO.
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
function isoDate(s) {
  if (!s) return '';
  const m = String(s).trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return '';
  const mi = MONTHS.indexOf(m[1].toLowerCase());
  if (mi < 0) return '';
  return `${m[2]}-${String(mi + 1).padStart(2, '0')}-01`;
}

function pageMeta(route) {
  const p = SEO.pages[route.path] || {};
  const brand = ` | ${SEO.altName}`;

  switch (route.kind) {
    case 'home':
      return {
        title: p.title,
        description: p.description,
        image: SEO.defaultImage,
        imageAlt: `${SEO.fullName}, ${SEO.jobTitle}`,
        nodes: [
          {
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profilepage`,
            url: `${SITE_URL}/`,
            name: p.title,
            description: p.description,
            isPartOf: { '@id': SITE_ID },
            about: { '@id': PERSON_ID },
            mainEntity: { '@id': PERSON_ID },
          },
        ],
      };

    case 'index':
    case 'graphics':
    case 'about':
      return {
        title: p.title + brand,
        description: p.description,
        trail: [{ name: 'Home', path: '' }, { name: plain(p.title).split('—')[0].trim(), path: route.path }],
        nodes: route.items
          ? [
              {
                '@type': 'CollectionPage',
                '@id': `${SITE_URL}/${route.path}#page`,
                url: `${SITE_URL}/${route.path}`,
                name: p.title,
                description: p.description,
                isPartOf: { '@id': SITE_ID },
                about: { '@id': PERSON_ID },
                mainEntity: {
                  '@type': 'ItemList',
                  numberOfItems: route.items.length,
                  itemListElement: route.items.map((it, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `${SITE_URL}/${route.base}/${it.slug}`,
                    name: plain(it.name || it.title),
                  })),
                },
              },
            ]
          : [],
      };

    // /contact is the page someone lands on when they are deciding rather than
    // browsing, so it carries the service and FAQ markup as well as the
    // breadcrumb every other page gets.
    case 'contact':
      return {
        title: p.title,
        description: p.description,
        trail: [{ name: 'Home', path: '' }, { name: 'Contact', path: 'contact' }],
        nodes: [
          {
            '@type': 'ProfessionalService',
            '@id': `${SITE_URL}/contact#service`,
            name: `${SEO.fullName} — ${SEO.jobTitle}`,
            url: `${SITE_URL}/contact`,
            image: abs(SEO.defaultImage),
            description: p.description,
            founder: { '@id': PERSON_ID },
            provider: { '@id': PERSON_ID },
            email: `mailto:${SITE.email}`,
            telephone: `+${SITE.whatsapp}`,
            priceRange: '$$',
            address: {
              '@type': 'PostalAddress',
              addressLocality: SEO.locality,
              addressRegion: SEO.region,
              addressCountry: SEO.countryCode,
            },
            areaServed: { '@type': 'Place', name: 'Worldwide' },
            knowsAbout: SEO.keywords,
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Design services',
              itemListElement: SERVICES.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.title, description: plain(s.desc) },
              })),
            },
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/contact#faq`,
            mainEntity: SEO.faq.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
            })),
          },
        ],
      };

    case 'design':
    case 'caseStudy': {
      const e = route.entry;
      const title = clamp(
        fill(SEO.templates[route.kind].title, { name: shortName(e), sub: e.category || '' }),
        66
      );
      const img = entryImage(e);
      return {
        title: title + brand,
        description: entryDescription(e),
        image: img,
        imageAlt: `${plain(e.name)} — ${e.category || 'product design'} by ${SEO.fullName}`,
        ogType: 'article',
        preload: firstFigure(e),
        trail: [
          { name: 'Home', path: '' },
          { name: route.kind === 'design' ? 'Designs' : 'Case Studies', path: route.base },
          { name: shortName(e), path: route.path },
        ],
        nodes: [
          {
            '@type': ['Article', 'CreativeWork'],
            '@id': `${SITE_URL}/${route.path}#article`,
            headline: clamp(plain(e.name), 110),
            name: plain(e.name),
            description: entryDescription(e),
            url: `${SITE_URL}/${route.path}`,
            image: abs(img),
            author: { '@id': PERSON_ID },
            creator: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isPartOf: { '@id': SITE_ID },
            inLanguage: 'en',
            genre: e.category || 'Product design',
            keywords: [e.category, e.tag, 'UI design', 'UX design', 'product design'].filter(Boolean).join(', '),
            about: { '@type': 'Thing', name: plain(shortName(e)) },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${route.path}` },
          },
        ],
      };
    }

    case 'product': {
      const e = route.entry;
      const title = clamp(fill(SEO.templates.product.title, { name: shortName(e), sub: e.group || e.tag || '' }), 66);
      const img = entryImage(e);
      const node = {
        '@type': e.group === 'Figma Plugins' || e.group === 'Browser Extensions' ? 'SoftwareApplication' : 'WebApplication',
        '@id': `${SITE_URL}/${route.path}#software`,
        name: plain(shortName(e)),
        alternateName: plain(e.name),
        description: entryDescription(e),
        url: `${SITE_URL}/${route.path}`,
        image: abs(img),
        applicationCategory: 'DesignApplication',
        operatingSystem: e.group === 'Figma Plugins' ? 'Figma' : e.group === 'Browser Extensions' ? 'Chrome' : 'Web',
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        // every one of these is free; saying so is what earns the "Free" chip
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      };
      if (e.url || e.productUrl) node.installUrl = e.productUrl || e.url;
      if (e.users) node.interactionStatistic = {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/InstallAction',
        userInteractionCount: e.users,
      };
      return {
        title: title + brand,
        description: entryDescription(e),
        image: img,
        imageAlt: `${plain(shortName(e))} — ${e.group || 'design tool'} by ${SEO.fullName}`,
        preload: e.thumbUrl,
        trail: [
          { name: 'Home', path: '' },
          { name: 'Products', path: 'products' },
          { name: shortName(e), path: route.path },
        ],
        nodes: [node],
      };
    }

    case 'finding': {
      const e = route.entry;
      const title = clamp(fill(SEO.templates.finding.title, { name: plain(e.title) }), 66);
      const img = entryImage(e);
      const published = isoDate(e.date);
      return {
        title: title + brand,
        description: clamp(
          plain(e.lede || '').length >= 80 ? e.lede : `${plain(e.summary)}. A UX finding on ${plain(e.category || 'interaction design')} by ${SEO.fullName}.`
        ),
        image: img,
        imageAlt: `${plain(e.title)} — UX finding`,
        ogType: 'article',
        published,
        preload: e.thumbUrl,
        trail: [
          { name: 'Home', path: '' },
          { name: 'UX Findings', path: 'findings' },
          { name: plain(e.title), path: route.path },
        ],
        nodes: [
          {
            '@type': 'Article',
            '@id': `${SITE_URL}/${route.path}#article`,
            headline: clamp(plain(e.title), 110),
            description: plain(e.summary),
            url: `${SITE_URL}/${route.path}`,
            image: abs(img),
            ...(published ? { datePublished: published, dateModified: published } : {}),
            author: { '@id': PERSON_ID },
            publisher: { '@id': PERSON_ID },
            isPartOf: { '@id': SITE_ID },
            inLanguage: 'en',
            articleSection: e.category || 'UX',
            keywords: ['UX', 'interaction design', e.category].filter(Boolean).join(', '),
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${route.path}` },
          },
        ],
      };
    }

    case 'legal': {
      const e = route.entry;
      const label = route.legal === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
      return {
        title: `${label} — ${shortName(e)}${brand}`,
        description: clamp(
          `The ${label.toLowerCase()} for ${plain(shortName(e))}, ${plain(e.summary || 'a tool by ' + SEO.fullName)}`
        ),
        // legal boilerplate competes with the product page for nothing and
        // wins on neither; it is kept crawlable but out of the index
        noindex: true,
        trail: [
          { name: 'Home', path: '' },
          { name: 'Products', path: 'products' },
          { name: shortName(e), path: `docs/${e.slug}` },
          { name: label, path: route.path },
        ],
      };
    }

    default:
      return { title: SEO.pages[''].title, description: SEO.pages[''].description };
  }
}

// the first real image in a body, used as the LCP preload hint
function firstFigure(e) {
  const blocks = e.blocks || [];
  for (const b of blocks) {
    if (b.t === 'image' && b.src) return b.src;
    if (b.t === 'gallery' && b.items && b.items[0] && b.items[0].src) return b.items[0].src;
    if (b.t === 'screens' && b.items && b.items[0]) return b.items[0].src || b.items[0];
  }
  return e.thumbUrl || '';
}

/* ------------------------------------------------------------------ services
 * The offer list on /contact. Kept here rather than in data.js because it is the
 * page's content and its schema at once, and the two must not drift.
 */

const SERVICES = SEO.services;
const PROCESS = SEO.process;

/* --------------------------------------------------------------- the markup
 *
 * The static body a crawler reads. The SPA replaces all of it on boot, so this
 * only has to be correct and well-linked, and to use the same class names so
 * the pre-hydration paint looks like the page it is about to become.
 */

const link = (path, label, cls = '') =>
  `<a ${cls ? `class="${cls}" ` : ''}href="/${path}" data-link>${esc(label)}</a>`;

function cardList(items, base) {
  return `
        <ul class="seo-list">
          ${items
            .map(
              (it) => `<li class="seo-row">
            <a class="seo-row-link" href="/${base}/${it.slug}" data-link>${esc(plain(it.name || it.title))}</a>
            <p class="seo-row-sub">${esc(plain(it.summary || it.lede || ''))}</p>
            ${entryMeta(it) ? `<span class="seo-row-meta mono-label">${esc(entryMeta(it))}</span>` : ''}
          </li>`
            )
            .join('\n          ')}
        </ul>`;
}

function docArticle(route) {
  const e = route.entry;
  const collection = route.collection || [];
  const i = collection.indexOf(e);
  const prev = collection[i - 1];
  const next = collection[i + 1];
  const sub = subName(e);
  const kicker = entryMeta(e);
  const title = route.kind === 'finding' ? e.title : shortName(e);

  const blocks = route.legal
    ? route.legal === 'privacy'
      ? e.privacyBlocks
      : e.termsBlocks
    : e.blocks || [];

  const heading = route.legal ? (route.legal === 'privacy' ? 'Privacy Policy' : 'Terms of Service') : title;

  return `
      <div class="view">
        <article class="doc-article read-doc">
          <header class="doc-head">
            <h1 class="doc-h1">
              <span>${esc(heading)}</span>
              ${!route.legal && sub ? `<span class="from">${esc(sub)}</span>` : ''}
            </h1>
            ${!route.legal && kicker ? `<div class="doc-kicker mono-label">${esc(kicker)}</div>` : ''}
            ${!route.legal && e.lede ? `<p class="doc-lede">${e.lede}</p>` : ''}
          </header>
          <div class="prose read-prose">${renderBlocks(blocks)}</div>
          ${
            !route.legal
              ? `<nav class="page-nav" aria-label="Pagination">
            ${prev ? `<a class="page-nav-link prev" href="/${route.base}/${prev.slug}" data-link><span class="page-nav-dir">Previous</span><span class="page-nav-name">${esc(shortName(prev))}</span></a>` : '<span></span>'}
            ${next ? `<a class="page-nav-link next" href="/${route.base}/${next.slug}" data-link><span class="page-nav-dir">Next</span><span class="page-nav-name">${esc(shortName(next))}</span></a>` : ''}
          </nav>`
              : ''
          }
        </article>
      </div>`;
}

function buildView(route) {
  const p = SEO.pages[route.path] || {};

  switch (route.kind) {
    case 'home':
      return `
      <div class="view">
        <section class="hero">
          <div class="hero-top">
            <h1 class="hero-h1">${esc(HOME.headline)}<br><span id="type-word">${esc(HOME.typeWords[0])}</span><span class="type-caret">_</span></h1>
            <img class="hero-photo" src="${esc(PROFILE.avatar)}" alt="${esc(SEO.fullName)}, ${esc(SEO.jobTitle)}">
          </div>
          <div class="hero-row">
            <div class="hero-actions">
              <a class="btn btn-primary" href="/designs" data-link>${esc(HOME.primaryCta)}</a>
              <a class="btn btn-secondary" href="/products" data-link>${esc(HOME.secondaryCta)}</a>
            </div>
            <p class="hero-aside">${PROFILE.bio}</p>
          </div>
        </section>

        <section class="home-sec">
          <h2 class="sec-h">The work</h2>
          <ul class="seo-list">
            <li class="seo-row">${link('designs', 'App and product design portfolio', 'seo-row-link')}<p class="seo-row-sub">${esc(PAGE_COPY.designs.lede)}</p></li>
            <li class="seo-row">${link('case-studies', 'UX case studies', 'seo-row-link')}<p class="seo-row-sub">${esc(PAGE_COPY.caseStudies.lede)}</p></li>
            <li class="seo-row">${link('products', 'Design tools, Figma plugins and browser extensions', 'seo-row-link')}<p class="seo-row-sub">${esc(PAGE_COPY.projects.lede)}</p></li>
            <li class="seo-row">${link('findings', 'UX findings', 'seo-row-link')}<p class="seo-row-sub">${esc(PAGE_COPY.findings.lede)}</p></li>
            <li class="seo-row">${link('contact', 'Hire a UI/UX designer', 'seo-row-link')}<p class="seo-row-sub">Services, process, and answers to the questions that come up before a project starts.</p></li>
            <li class="seo-row">${link('about', 'About ' + SEO.fullName, 'seo-row-link')}<p class="seo-row-sub">Background, experience and the toolkit behind the work.</p></li>
          </ul>
        </section>

        <section class="home-sec">
          <h2 class="sec-h">${esc(HOME.latestHeading)}</h2>
          ${cardList(DESIGNS.slice(0, 6), 'designs')}
        </section>

        <section class="home-sec">
          <h2 class="sec-h">${esc(HOME.productsHeading)}</h2>
          ${cardList([...PROJECTS].sort((a, b) => (b.users || 0) - (a.users || 0)).slice(0, 6), 'docs')}
        </section>
      </div>`;

    case 'index': {
      const key = route.path === 'products' ? 'projects' : route.path === 'case-studies' ? 'caseStudies' : route.path;
      const copy = PAGE_COPY[key] || {};
      return `
      <div class="view">
        <header class="page-head">
          <h1 class="page-h1">${esc(copy.title || p.title)}</h1>
          <p class="page-lede">${esc(copy.lede || p.description)}</p>
        </header>
        ${cardList(route.items, route.base)}
      </div>`;
    }

    case 'graphics':
      return `
      <div class="view">
        <header class="page-head">
          <h1 class="page-h1">${esc(PAGE_COPY.graphics.title)}</h1>
          <p class="page-lede">${esc(PAGE_COPY.graphics.lede)}</p>
        </header>
      </div>`;

    case 'about':
      return buildAboutView();

    case 'contact':
      return buildContactView();

    default:
      return docArticle(route);
  }
}

function buildAboutView() {
  const a = PAGE_DATA.about || {};
  const exp = (a.experience || [])
    .map((x) => `<li><strong>${esc(x.title)}</strong>, ${esc(x.org)} <span class="mono-label">${esc(x.meta || '')}</span><br>${esc(x.note || '')}</li>`)
    .join('\n          ');
  return `
      <div class="view">
        <section class="about-hero">
          <div class="about-hero-copy">
            <span class="mono-label">About${a.location ? ` &middot; ${esc(a.location)}` : ''}</span>
            <h1>${esc(a.name || SEO.fullName)}</h1>
            <p class="about-role">${esc(SEO.jobTitle)}</p>
            <p class="about-bio">${a.bio || ''}</p>
          </div>
        </section>
        <p>I am a ${esc(SEO.jobTitle)} working from ${esc(a.location || `${SEO.locality}, ${SEO.region}`)}. My work runs from the first flow through to a shipped app: UI design, UX research and testing, design systems, and the front-end build that proves the design works. You can ${link('contact', 'hire me for a project')}, read the ${link('case-studies', 'case studies')}, or try one of the ${link('products', 'tools I have shipped')}.</p>
        <h2>Experience</h2>
        <ul class="seo-list">
          ${exp}
        </ul>
        <h2>Skills</h2>
        <p>${(a.skills || []).map((s) => esc(s)).join(' · ')}</p>
        <h2>Toolkit</h2>
        <p>${(a.tools || []).map((t) => esc(typeof t === 'string' ? t : t.name)).join(' · ')}</p>
      </div>`;
}

function buildContactView() {
  return `
      <div class="view">
        <div class="contact-grid">
          <div class="contact-intro">
            <span class="mono-label">${esc(CONTACT.label || 'Contact')}</span>
            <h1>${esc(CONTACT.heading)}</h1>
            <p>${esc(CONTACT.text)}</p>
            <p>I am ${esc(SEO.fullName)}, a ${esc(SEO.jobTitle)} in ${esc(SEO.locality)}, ${esc(SEO.region)}. I design mobile apps, web products and design systems, and I build them too, so what you get at the end is a running product rather than a folder of screens.</p>
            <div class="contact-rows">
              <a href="mailto:${esc(SITE.email)}" class="contact-row"><span class="channel-info"><span class="channel-label">Email</span><span class="channel-value">${esc(SITE.email)}</span></span></a>
              <a href="https://wa.me/${esc(SITE.whatsapp)}" rel="noopener" class="contact-row"><span class="channel-info"><span class="channel-label">WhatsApp</span><span class="channel-value">${esc(SITE.whatsappLabel || SITE.whatsapp)}</span></span></a>
            </div>
          </div>
        </div>

        <section class="contact-work">
          <div class="sec-topline"><h2 class="sec-h">What I do</h2></div>
          <ul>
            ${SERVICES.map((sv) => `<li><strong>${esc(sv.title)}</strong> &mdash; ${esc(sv.desc)}</li>`).join('\n            ')}
          </ul>
        </section>

        <section class="contact-work">
          <div class="sec-topline"><h2 class="sec-h">How a project runs</h2></div>
          <ol>
            ${PROCESS.map((st) => `<li><strong>${esc(st.title)}.</strong> ${esc(st.desc)}</li>`).join('\n            ')}
          </ol>
        </section>

        <section class="contact-work">
          <div class="sec-topline"><h2 class="sec-h">Questions</h2></div>
          <div class="faq">
            ${SEO.faq
              .map(
                (f) => `<details class="faq-item">
              <summary class="faq-q"><h3>${esc(f.q)}</h3></summary>
              <div class="faq-a"><p>${esc(f.a)}</p></div>
            </details>`
              )
              .join('\n            ')}
          </div>
          <p>Before you write: the ${link('case-studies', 'case studies')} and the ${link('designs', 'design portfolio')} will tell you more than this page can, and the ${link('products', 'products')} are tools you can install and use right now.</p>
        </section>
      </div>`;
}

/* -------------------------------------------------- static nav and footer
 * Both are painted by JavaScript at runtime, which means a crawler that does
 * not run JavaScript saw a site with no internal links at all. These are the
 * same links, baked flat.
 */

function buildNav() {
  const pages = [
    ['', 'Index'],
    ['designs', 'Designs'],
    ['case-studies', 'Case Studies'],
    ['products', 'Products'],
    ['findings', 'UX Findings'],
    ['about', 'About'],
    ['contact', 'Contact'],
  ];
  const list = (items, base, title) => `
        <p class="side-title">${esc(title)}</p>
        <ul class="side-list">
          ${items.map((it) => `<li><a class="side-item side-entry" href="/${base}/${it.slug}" data-link><span>${esc(shortName(it))}</span></a></li>`).join('\n          ')}
        </ul>`;

  return `<nav id="nav">
      <div class="side-pages">
        <p class="side-title">Pages</p>
        <ul class="side-list">
          ${pages.map(([p, l]) => `<li><a class="side-item" href="/${p}" data-link>${esc(l)}</a></li>`).join('\n          ')}
        </ul>
      </div>
      ${list(DESIGNS, 'designs', 'Designs')}
      ${list(PROJECTS, 'docs', 'Products')}
    </nav>`;
}

function buildFoot() {
  const col = (title, links) => `
          <div class="foot-col">
            <h4>${esc(title)}</h4>
            <ul>${links.map(([h, l, ext]) => `<li><a href="${esc(h)}"${ext ? ' rel="noopener"' : ' data-link'}>${esc(l)}</a></li>`).join('')}</ul>
          </div>`;

  const popular = [
    ...DESIGNS.slice(0, 2).map((d) => [`/designs/${d.slug}`, shortName(d)]),
    ...[...PROJECTS].sort((a, b) => (b.users || 0) - (a.users || 0)).slice(0, 3).map((p) => [`/docs/${p.slug}`, shortName(p)]),
  ];

  return `<footer class="site-foot" id="site-foot">
      <div class="site-foot-in">
        <div class="foot-top">
          <div class="foot-id">
            <p class="foot-tagline">${esc(SEO.fullName)}, ${esc(SEO.jobTitle)} in ${esc(SEO.locality)}, ${esc(SEO.region)}, ${esc(SEO.country)}.</p>
          </div>
          ${col('Explore', [['/designs', 'Designs'], ['/case-studies', 'Case Studies'], ['/products', 'Products'], ['/findings', 'UX Findings'], ['/graphics', 'Graphic Design'], ['/about', 'About'], ['/contact', 'Hire me']])}
          ${col('Popular', popular)}
          ${col('Connect', [['/contact', 'Contact'], [`mailto:${SITE.email}`, 'Email', true], [`https://wa.me/${SITE.whatsapp}`, 'WhatsApp', true], ...PROFILE.links.map((l) => [l.url, l.label, true])])}
        </div>
        <div class="foot-bottom">
          <span class="foot-note">© ${new Date().getFullYear()} ${esc(PROFILE.name)}. All rights reserved</span>
        </div>
      </div>
    </footer>`;
}

/* ------------------------------------------------------------------- writing */

const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function replaceRegion(html, name, content) {
  const re = new RegExp(`<!-- seo:${name}:start[\\s\\S]*?seo:${name}:end -->`);
  if (!re.test(html)) throw new Error(`marker seo:${name} not found in index.html`);
  return html.replace(re, () => `<!-- seo:${name}:start -->${content}<!-- seo:${name}:end -->`);
}

function buildPage(route) {
  let html = shell;

  // the head marker carries its own comment text, so it is written whole
  html = html.replace(/  <!-- seo:head:start[\s\S]*?seo:head:end -->/, () => buildHead(route));

  html = replaceRegion(html, 'view', `<div id="view" data-prerendered="${esc(route.path)}">${buildView(route)}</div>`);
  html = replaceRegion(html, 'nav', buildNav());
  html = replaceRegion(html, 'foot', buildFoot());

  return html;
}

const written = [];
const stale = [];

for (const route of routes) {
  const out = path.join(ROOT, route.out);
  const html = buildPage(route);
  const existing = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : null;

  if (existing === html) continue;
  if (CHECK) {
    stale.push(route.out);
    continue;
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  written.push(route.out);
}

/* ------------------------------------------------------------------ sitemap
 * Generated from the same route list, so a new entry can never be missing
 * from it. `lastmod` is the body file's real mtime, which is the only honest
 * answer available — a made-up date is worse than none.
 */

function lastmod(route) {
  const candidates = [];
  if (route.entry && route.entry.body) candidates.push(route.entry.body.replace(/^\//, ''));
  candidates.push('data.js');
  for (const c of candidates) {
    const f = path.join(ROOT, c);
    if (fs.existsSync(f)) return fs.statSync(f).mtime.toISOString().slice(0, 10);
  }
  return new Date().toISOString().slice(0, 10);
}

const PRIORITY = { home: '1.0', index: '0.9', about: '0.8', design: '0.8', caseStudy: '0.8', product: '0.7', finding: '0.6', graphics: '0.5', contact: '0.9', legal: '0.1' };
const FREQ = { home: 'weekly', index: 'weekly', about: 'monthly', design: 'monthly', caseStudy: 'monthly', product: 'monthly', finding: 'monthly', graphics: 'monthly', contact: 'monthly', legal: 'yearly' };

// Every figure on this site is a real screenshot of a real running app, which
// is exactly the kind of thing Google Images has an appetite for. Declaring
// them here is the only way an image inside a lazily fetched body ever gets
// crawled at all.
function imageTags(route) {
  if (!route.entry) return '';
  const seen = new Set();
  const out = [];
  const push = (src, alt) => {
    if (!src || seen.has(src) || out.length >= 12) return;
    seen.add(src);
    out.push(
      `\n    <image:image><image:loc>${esc(abs(src))}</image:loc>` +
        (alt ? `<image:title>${esc(clamp(plain(alt), 100))}</image:title>` : '') +
        `</image:image>`
    );
  };
  push(route.entry.thumbUrl, plain(route.entry.name || route.entry.title));
  for (const b of route.entry.blocks || []) {
    if (b.t === 'image') push(b.src, b.alt || b.caption);
    if (b.t === 'gallery') (b.items || []).forEach((it) => push(it.src, it.alt || it.caption));
    if (b.t === 'screens') (b.items || []).forEach((it) => push(it.src || it, it.alt || b.label));
  }
  return out.join('');
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  routes
    .filter((r) => r.kind !== 'legal') // noindex pages do not belong in a sitemap
    .map((r) => {
      const loc = r.path === '' ? `${SITE_URL}/` : `${SITE_URL}/${r.path}`;
      return (
        `  <url><loc>${loc}</loc><lastmod>${lastmod(r)}</lastmod>` +
        `<changefreq>${FREQ[r.kind] || 'monthly'}</changefreq>` +
        `<priority>${PRIORITY[r.kind] || '0.5'}</priority>${imageTags(r)}</url>`
      );
    })
    .join('\n') +
  `\n</urlset>\n`;

const sitemapPath = path.join(ROOT, 'sitemap.xml');
const sitemapOld = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : null;
if (sitemapOld !== sitemap) {
  if (CHECK) stale.push('sitemap.xml');
  else {
    fs.writeFileSync(sitemapPath, sitemap);
    written.push('sitemap.xml');
  }
}

/* ------------------------------------------------------------------ llms.txt
 *
 * The map an answer engine reads before it decides what to fetch. robots.txt
 * says what may be crawled; this says what is worth crawling, in the order a
 * person would want it summarised. It is a proposed convention rather than a
 * standard, and costs one small file to support.
 */

const entryLine = (e, base) =>
  `- [${plain(e.name || e.title)}](${SITE_URL}/${base}/${e.slug}): ${plain(e.summary || e.lede || '')}`;

const llms = [
  `# ${SEO.fullName}`,
  '',
  `> ${SEO.jobTitle} in ${SEO.locality}, ${SEO.region}, ${SEO.country}, working with teams worldwide. Designs mobile apps, web products and design systems, and builds them, so every case study on this site is backed by a real running app, and every figure is a screenshot of it.`,
  '',
  `Contact and hire: ${SITE_URL}/contact  (${SITE.email})`,
  '',
  '## Case studies',
  '',
  'Long-form write-ups: the problem, the reasoning behind each screen, and what shipped.',
  '',
  ...CASE_STUDIES.map((e) => entryLine(e, 'case-studies')),
  '',
  '## Design portfolio',
  '',
  'App and product design work. Onboarding flows, paywalls and full products, each one built and captured running.',
  '',
  ...DESIGNS.map((e) => entryLine(e, 'designs')),
  '',
  '## Products',
  '',
  'Figma plugins, browser extensions and network tools, designed and shipped for real users. All free.',
  '',
  ...PROJECTS.map((e) => entryLine(e, 'docs')),
  '',
  '## UX findings',
  '',
  'Short notes on interaction design, each one a single idea with a worked example.',
  '',
  ...FINDINGS.map((e) => entryLine(e, 'findings')),
  '',
  '## About',
  '',
  `- [About ${SEO.fullName}](${SITE_URL}/about): background, experience and toolkit.`,
  `- [Hire a UI/UX designer](${SITE_URL}/contact): services, process, the usual questions answered, and how to get in touch.`,
  '',
].join('\n');

const llmsPath = path.join(ROOT, 'llms.txt');
const llmsOld = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : null;
if (llmsOld !== llms) {
  if (CHECK) stale.push('llms.txt');
  else {
    fs.writeFileSync(llmsPath, llms);
    written.push('llms.txt');
  }
}

/* -------------------------------------------------------------------- report */

if (!QUIET) {
  for (const w of warnings) console.warn(`  warn: ${w}`);
  if (CHECK) {
    if (stale.length) {
      console.error(`prerender: ${stale.length} file(s) out of date — run \`node tools/prerender.js\`:`);
      stale.slice(0, 20).forEach((f) => console.error(`  ${f}`));
      process.exit(1);
    }
    console.log(`prerender: ${routes.length} routes up to date`);
  } else {
    console.log(`prerender: ${routes.length} routes, ${written.length} file(s) written`);
  }
}
