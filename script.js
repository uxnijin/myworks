// ============================================================================
//  script.js: router, views, and interactions.
//  Content lives in data.js. Block rendering lives in blocks.js.
// ============================================================================

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const SITE_URL = 'https://nijin.site';

  // analytics.js needs the content to name a route; a top-level const in a
  // classic script isn't a window property, so publish the references here.
  // The arrays are mutated in place as bodies load, so these stay current.
  window.DESIGNS = DESIGNS;
  window.PROJECTS = PROJECTS;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // the hero types these in a loop — every one is a thing that actually
  // exists on this site, so the sentence stays true wherever it pauses
  const TYPE_WORDS = [
    'onboarding flows',
    'paywalls',
    'Figma plugins',
    'browser extensions',
    'network tools',
    'mobile apps',
  ];

  // wraps a route render in the View Transitions API where supported, so the
  // outgoing page crossfades instead of just vanishing; falls back to a bare
  // call everywhere else (older Safari/Firefox, or reduced-motion users).
  const withTransition = (fn) => {
    if (document.startViewTransition && !reduceMotion()) {
      // starting a transition while one is still running rejects; the render
      // itself has already happened, so there is nothing to recover from
      const t = document.startViewTransition(fn);
      t.finished.catch(() => {});
      t.ready.catch(() => {});
      t.updateCallbackDone.catch(() => {});
    } else {
      fn();
    }
  };

  function updateCanonical(path) {
    let link = $('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = path ? `${SITE_URL}/${path}` : `${SITE_URL}/`;
  }

  function setDescription(desc) {
    if (!desc) return;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = desc;
  }

  // ---- the head, on a client-side navigation
  //
  // Every page is served as real HTML by tools/prerender.js, with its title,
  // description, canonical and social tags already correct. That is what a
  // crawler reads. What follows keeps the same head correct once the router
  // takes over and no new document is ever fetched — otherwise the second page
  // a visitor opens would still be wearing the first page's title in their
  // history, their bookmarks and anything they shared.
  //
  // Both sides read the same `SEO` object in data.js, so the wording lives in
  // one place; only the assembly is written twice.

  const SEOCFG = () => (typeof SEO !== 'undefined' && SEO) || { pages: {}, templates: {} };

  const plainText = (s = '') =>
    String(s).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

  // cut at a word boundary; a description clipped mid-word reads as a fault
  const clampText = (s, max = 158) => {
    const t = plainText(s);
    if (t.length <= max) return t;
    const cut = t.slice(0, max);
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—-]$/, '').trim();
  };

  const fillTpl = (tpl = '', vars = {}) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] || '').replace(/\s+/g, ' ').trim();

  function setMetaTag(selector, attr, value) {
    if (!value) return;
    let el = $(selector);
    if (!el) {
      el = document.createElement('meta');
      const m = selector.match(/\[(property|name)="([^"]+)"\]/);
      if (m) el.setAttribute(m[1], m[2]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  }

  // title and description are decided here; og/twitter mirror them, which is
  // what keeps a shared link showing the page that was actually shared
  function applySeo(path, entry, kind) {
    const cfg = SEOCFG();
    const brand = ` | ${cfg.altName || PROFILE.name}`;
    const page = (cfg.pages || {})[path];
    const tpl = (cfg.templates || {})[kind] || {};

    let title = '';
    let description = '';
    let image = cfg.defaultImage || PROFILE.avatar;
    let type = 'website';
    let noindex = false;

    if (page) {
      title = path === '' ? page.title : page.title + brand;
      description = page.description;
    } else if (entry && (kind === 'privacy' || kind === 'terms')) {
      const label = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
      title = `${label} — ${shortName(entry)}${brand}`;
      description = clampText(`The ${label.toLowerCase()} for ${plainText(shortName(entry))}, ${plainText(entry.summary || '')}`);
      noindex = true;
    } else if (entry) {
      const name = kind === 'finding' ? plainText(entry.title) : shortName(entry);
      title = clampText(fillTpl(tpl.title || '{name}', { name, sub: entry.group || entry.category || '' }), 66) + brand;
      const lede = plainText(entry.lede || '');
      const summary = plainText(entry.summary || '');
      description = clampText(lede.length >= 80 ? lede : summary.length >= 80 ? summary : `${summary} ${lede}`);
      image = entry.thumbUrl || entry.coverUrl || image;
      type = kind === 'product' ? 'website' : 'article';
    } else {
      title = `Not found${brand}`;
      description = "That page doesn't exist; it may have been renamed.";
      noindex = true;
    }

    const url = path ? `${SITE_URL}/${path}` : `${SITE_URL}/`;
    const absUrl = (u) => (!u ? '' : /^https?:/.test(u) ? u : SITE_URL + (u.startsWith('/') ? u : '/' + u));

    document.title = title;
    setDescription(description);
    updateCanonical(path);

    setMetaTag('meta[name="robots"]', 'content',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('meta[property="og:type"]', 'content', type);
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', url);
    setMetaTag('meta[property="og:image"]', 'content', absUrl(image));
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', absUrl(image));
  }

  // theme: the data-theme attribute is set by the pre-paint inline script
  // in index.html and kept live there via a matchMedia listener — there's
  // no manual toggle, so nothing to wire up here.

  // containers that hold a single, framed image — these get a shimmering
  // skeleton while the image is in flight, so the page doesn't show a hole.
  const SKELETON_HOSTS = '.frame, .doc-hero-thumbnail, .post-media';

  // fades <img>s in once loaded instead of popping in mid-layout; images
  // already cached by the browser (img.complete) skip straight to visible.
  function initImageFade(root = document) {
    $$('img', root).forEach((img) => {
      if (img.dataset.fadeInit || img.closest('#lb')) return;
      img.dataset.fadeInit = '1';
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('img-loaded');
        return;
      }
      img.classList.add('img-loading');
      const host = img.parentElement?.matches?.(SKELETON_HOSTS) ? img.parentElement : null;
      if (host) host.classList.add('is-skeleton');
      const reveal = () => {
        img.classList.add('img-loaded');
        if (host) host.classList.remove('is-skeleton');
      };
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
    });
  }

  // splits a heading's text into per-word spans with a staggered fade+rise,
  // walking into child elements (e.g. the <em> in the hero h1) so markup
  // inside the heading survives.
  function animateHeading(el) {
    if (!el || reduceMotion()) return;
    const STAGGER = 28;
    const MAX_DELAY = 260;
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          if (!child.textContent.trim()) return;
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (part === '') return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }
            const span = document.createElement('span');
            span.className = 'word-in';
            span.textContent = part;
            span.style.animationDelay = `${Math.min(i * STAGGER, MAX_DELAY)}ms`;
            i++;
            frag.appendChild(span);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };
    walk(el);
  }

  const animateCount = (el, target, duration = 1500) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(easeProgress * target);
      el.textContent = currentValue.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // ------------------------------------------------------------- routing
  // History API when served over http(s); hash fallback for file:// so the
  // site still works when opened straight off disk.
  const HASH_MODE = location.protocol === 'file:';

  const href = (path) => (HASH_MODE ? `#/${path}` : `/${path}`);

  const currentPath = () =>
    HASH_MODE
      ? location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
      : location.pathname.replace(/^\//, '').replace(/\/$/, '');

  const go = (path, replace = false) => {
    const url = href(path);
    if (HASH_MODE) {
      replace ? location.replace(url) : (location.hash = `/${path}`);
    } else {
      history[replace ? 'replaceState' : 'pushState']({}, '', url);
      withTransition(render);
    }
  };

  const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
  const designBySlug = (slug) => DESIGNS.find((d) => d.slug === slug);

  // ------------------------------------------------------------- sidebar nav

  // names of product groups currently expanded inline in the sidebar
  const expandedGroups = new Set();

  // bumped on every route render; async views (remote fetches) capture it
  // and bail if it has moved on by the time their promise resolves, so a
  // slow fetch can't paint over whatever page the user has since opened
  let asyncToken = 0;

  // syncRoute: true when called on a page navigation (auto-expand the group
  // containing the current page); false for manual expand/collapse clicks,
  // which must not have their choice overridden by the route-sync logic
  // groups a collection of doc entries (projects or designs) by a key,
  // preserving first-seen order unless an explicit priority list is given
  function groupBy(items, keyFn, order = []) {
    const groups = [];
    items.forEach((it) => {
      const name = keyFn(it);
      const g = groups.find((x) => x.name === name);
      g ? g.items.push(it) : groups.push({ name, items: [it] });
    });
    if (order.length) {
      groups.sort((a, b) => {
        const ai = order.indexOf(a.name);
        const bi = order.indexOf(b.name);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
    }
    return groups;
  }

  // "Parcel: Premium Courier Booking" → bold "Parcel" + muted "Premium Courier
  // Booking"; entries without a colon fall back to category/group for the sub,
  // unless that would just repeat the name.
  const shortName = (p) => p.name.split(':')[0].trim();
  const subName = (p) => {
    const i = p.name.indexOf(':');
    // no colon → designs borrow their category as the muted half; projects
    // don't (the group already reads as part of most project names)
    const sub = i > -1 ? p.name.slice(i + 1).trim() : (p.category || '');
    return sub.toLowerCase() === shortName(p).toLowerCase() ? '' : sub;
  };

  // deterministic avatar colour per entry, drawn from the site's accent set
  const AVA_COLORS = ['#6352fa', '#3369ff', '#008b37', '#ff5400', '#b98900', '#c02d76', '#0f766e', '#7c3aed'];
  const slugHash = (slug) => {
    let h = 0;
    for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
    return h;
  };
  const avaColor = (slug) => AVA_COLORS[slugHash(slug) % AVA_COLORS.length];

  // deterministic drifting-gradient class (styles.css .grad-1 … .grad-6)
  const gradClass = (slug) => `gcard grad-${(slugHash(slug) % 6) + 1}`;

  // the same palette without .gcard, for places that want the colours in CSS
  // but not a mounted mesh canvas (the sidebar rows hover-fill with these)
  const gradPalette = (slug) => `grad-${(slugHash(slug) % 6) + 1}`;

  // data copy that surfaces in UI chrome loses its em dashes
  const noDash = (s = '') => s.replace(/\s+\u2014\s+/g, ', ');

  // ---- site copy, all of it from data.js. `cms(value, fallback)` keeps the
  // fallback written at each call site authoritative, so a key left blank (or
  // deleted) in data.js still renders something sensible.
  const CMS = () => (typeof SITE !== 'undefined' && SITE) || {};
  const HOMECOPY = () => (typeof HOME !== 'undefined' && HOME) || {};
  const PAGECOPY = (k) => (typeof PAGE_COPY !== 'undefined' && PAGE_COPY[k]) || {};
  const CONTACTCOPY = () => (typeof CONTACT !== 'undefined' && CONTACT) || {};
  const cms = (v, fallback) => (v === undefined || v === null || v === '' ? fallback : v);
  const EMAIL = () => cms(CMS().email, 'uxnijin@gmail.com');
  const WA = () => cms(CMS().whatsapp, '916238417389');

  // ------------------------------------------------- lazy content loading
  //
  // Only data.js (the index) ships with the page. An entry's `blocks` body and
  // a heavy page's data live in their own file and are fetched the first time
  // they are actually needed — opening a case study, or landing on /about.
  //
  // A body file calls BODY(slug, {...}) and a page file calls PAGE(key, data);
  // both are globals because the file is injected as a plain <script>, which
  // keeps every body file readable as the data it is, with no module wrapper.

  const bySlugAll = (slug) =>
    DESIGNS.find((x) => x.slug === slug) ||
    CASE_STUDIES.find((x) => x.slug === slug) ||
    PROJECTS.find((x) => x.slug === slug) ||
    FINDINGS.find((x) => x.slug === slug);

  window.BODY = (slug, data) => {
    const entry = bySlugAll(slug);
    if (entry) Object.assign(entry, data);
  };

  const PAGE_DATA = {};
  window.PAGE = (key, data) => {
    PAGE_DATA[key] = data;
  };

  // one in-flight promise per URL, kept forever: a body is only ever fetched
  // once, and a second request while the first is still in the air joins it
  // rather than injecting a duplicate script.
  const scriptCache = new Map();
  function loadScript(src) {
    if (scriptCache.has(src)) return scriptCache.get(src);
    const p = new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      el.onload = () => resolve(true);
      el.onerror = () => {
        // drop the rejected promise so a later attempt can retry rather than
        // being handed the same failure forever
        scriptCache.delete(src);
        reject(new Error(`could not load ${src}`));
      };
      document.head.appendChild(el);
    });
    scriptCache.set(src, p);
    return p;
  }

  // resolves once `entry.blocks` is on the object. Entries whose body is
  // already present (or which have no body file) resolve immediately.
  const loadBody = (entry) =>
    !entry || !entry.body || entry.blocks
      ? Promise.resolve(entry)
      : loadScript(entry.body).then(() => entry);

  const loadPage = (key, src) =>
    PAGE_DATA[key] ? Promise.resolve(PAGE_DATA[key]) : loadScript(src).then(() => PAGE_DATA[key]);

  const PAGE_SRC = {
    about: '/pages/about.js',
    graphics: '/pages/graphics.js',
  };

  // Hovering a card is a strong signal the next click is that card, so the
  // body is fetched during the hover rather than after the click. By the time
  // the pointer travels to the mouse-down the file is usually already parsed.
  // Failures are ignored: this is a prefetch, and the real load will report.
  const prefetch = (path) => {
    const [head, slug] = path.split('/');
    const entry =
      head === 'designs' ? DESIGNS.find((d) => d.slug === slug)
      : head === 'case-studies' ? CASE_STUDIES.find((c) => c.slug === slug)
      : head === 'docs' ? PROJECTS.find((p) => p.slug === slug)
      : head === 'findings' ? FINDINGS.find((f) => f.slug === slug)
      : null;
    if (entry) return void loadBody(entry).catch(() => {});
    if (PAGE_SRC[path] && !PAGE_DATA[path]) loadScript(PAGE_SRC[path]).catch(() => {});
  };

  // a project has a real logo only when `logoUrl` is set on its record.
  // Figma plugins used to render their store icon from the repo, but six
  // rounded-square app icons in a row read as a store listing rather than a
  // set of covers, so they take the plain icon on the gradient like everything
  // else does.
  const hasLogo = (p) => !!p.logoUrl;
  const logoSrc = (p) => p.logoUrl;
  const coverSrc = (p) => p.coverUrl || `/images/${p.slug}-cover.png`;
  const clientSrc = (c) => c.url || `/images/clients/${c.file}`;

  const entryAva = (p, cls = 'dir-ava') =>
    hasLogo(p)
      ? `<span class="${cls} img"><img src="${esc(logoSrc(p))}" alt="" loading="lazy"></span>`
      : `<span class="${cls}" style="background:${avaColor(p.slug)}">${icon(p.icon)}</span>`;

  function renderNav() {
    const path = currentPath();

    const pageLinks = [
      ['', 'Index'],
      ['designs', 'Designs'],
      ['case-studies', 'Case Studies'],
      ['products', 'Products'],
      ['findings', 'UX Findings'],
      // ['graphics', 'Graphic Design'],  — hidden for now
      ['about', 'About'],
      ['contact', 'Contact'],
    ]
      .map(
        ([p, label]) =>
          `<li><a class="side-item${path === p ? ' active' : ''}" href="${href(p)}" data-link>${esc(label)}</a></li>`
      )
      .join('');

    const list = (items, basePath, title) => `
      <p class="side-title">${esc(title)}</p>
      <ul class="side-list">
        ${items
          .map(
            (it) => `
          <li>
            <a class="side-item side-entry ${gradPalette(it.slug)}${path === `${basePath}/${it.slug}` || path.startsWith(`${basePath}/${it.slug}/`) ? ' active' : ''}"
               href="${href(`${basePath}/${it.slug}`)}" data-link>
              <span>${esc(shortName(it))}</span>
            </a>
          </li>`
          )
          .join('')}
      </ul>`;

    const onDesign = path.startsWith('designs/');
    const onCase = path.startsWith('case-studies/');
    const onDoc = path.startsWith('docs/');

    // the sidebar is the mobile drawer now, and it lists the collection the open
    // page belongs to — both collections anywhere else.
    let collections = '';
    if (onDesign) collections = list(DESIGNS, 'designs', 'Designs');
    else if (onCase) collections = list(CASE_STUDIES, 'case-studies', 'Case Studies');
    else if (onDoc) collections = list(PROJECTS, 'docs', 'Products');
    else collections = list(DESIGNS, 'designs', 'Designs') + list(PROJECTS, 'docs', 'Products');

    $('#nav').innerHTML = `
      <div class="side-pages">
        <p class="side-title">Pages</p>
        <ul class="side-list">${pageLinks}</ul>
      </div>
      ${collections}`;
  }

  function renderSidebarSocials() {
    $('#sidebar-socials').innerHTML = PROFILE.links
      .map(
        (l) =>
          `<a class="sidebar-social-link" href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(
            l.label
          )}">${icon((l.label || '').toLowerCase())}</a>`
      )
      .join('');
  }

  // ------------------------------------------------------------- shared row builders

  // mono meta line under a directory row's name; skips the category/group
  // when the visible subtitle already says it
  const entryMeta = (p) => {
    const sub = subName(p).toLowerCase();
    const bits = [];
    if (p.category && p.category.toLowerCase() !== sub) bits.push(p.category);
    if (p.group && p.group.toLowerCase() !== sub) bits.push(p.group);
    if (p.users) bits.push(`${p.users.toLocaleString('en-US')} users`);
    if (p.status) bits.push(p.status);
    return bits.join(' · ');
  };

  // mono link labels on the right of a row (spans, not anchors — the row
  // itself is the link)
  const entryChannels = (p) => {
    const out = [];
    if (p.group === 'Figma Plugins') out.push('Figma');
    else if (p.group === 'Browser Extensions') out.push('Chrome');
    else if (p.url || p.productUrl) out.push('Web');
    if (p.category) out.push('Case study');
    return out;
  };

  // a PROJECTS/DESIGNS entry as a surf-directory row
  const dirRow = (p, basePath) => `
      <a class="dir-row" href="${href(`${basePath}/${p.slug}`)}" data-link>
        ${entryAva(p)}
        <span class="dir-main">
          <span class="dir-name">${esc(shortName(p))}${subName(p) ? ` <span class="sub">${esc(subName(p))}</span>` : ''}</span>
          <span class="dir-meta">${esc(entryMeta(p))}</span>
        </span>
        <span class="dir-side">
          <span class="dir-links">${entryChannels(p).map(esc).join('&ensp;')}</span>
          <span class="dir-go">${icon('arrowRight')}</span>
        </span>
      </a>`;

  const buildDirRows = (items, basePath) => items.map((p) => dirRow(p, basePath)).join('');

  // article-style card thumbnail, shared by design case studies and findings:
  // `thumbUrl` on the index record wins, then the first figure in the body,
  // and failing both the gradient carries a mark or the entry's own name.
  //
  // The index record is the important half now: a card is drawn before its
  // body file has loaded, so an entry that wants a figure on its card has to
  // name it in data.js. `firstImage` still runs for an entry whose body
  // happens to be in memory already (you came back from reading it).
  //
  // `borrowFigure` is off for onboarding entries, whose figures are phones on a
  // white canvas — at thumbnail size that reads as an empty card, so they fall
  // through to the gradient carrying the product name.
  const cardThumb = (e, label, borrowFigure) => {
    const img = e.thumbUrl || (borrowFigure ? firstImage(e) : '');
    if (img) return `<img src="${esc(img)}" alt="" loading="lazy">`;
    if (e.cardIconUrl)
      return `<span class="thumb-glyph ${gradClass(e.slug)}"><img class="thumb-mark" src="${esc(e.cardIconUrl)}" alt="" loading="lazy"></span>`;
    return `<span class="thumb-cover ${gradClass(e.slug)}"><b>${esc(label)}</b></span>`;
  };

  const designThumb = (d) => cardThumb(d, shortName(d), d.category !== 'Onboarding');
  const findingThumb = (f) => cardThumb(f, f.title || '', true);

  // same card either side: /designs and /case-studies both list article cards,
  // only the base path differs
  const entryCard = (base) => (d) => `
      <a class="acard" href="${href(`${base}/${d.slug}`)}" data-link>
        <span class="acard-thumb">${designThumb(d)}</span>
        <p class="acard-title">${esc(d.name)}</p>
        <span class="acard-meta">${esc([d.category, d.status].filter(Boolean).join(' · '))}</span>
      </a>`;

  const designCard = entryCard('designs');
  const caseStudyCard = entryCard('case-studies');

  // findings use the same card as the designs grid, so an article sits at the
  // same size as a case study or a product
  const findingCard = (f) => `
      <a class="acard" href="${href(`findings/${f.slug}`)}" data-link>
        <span class="acard-thumb">${findingThumb(f)}</span>
        <p class="acard-title">${esc(f.title || '')}</p>
        <span class="acard-meta">${esc([f.kind || f.category, f.date].filter(Boolean).join(' · '))}</span>
      </a>`;

  // product-style card: a drifting gradient with the mark sitting plainly in
  // the middle, corner labels and white chips on the gradient, name and user
  // count below the card
  const projectCard = (p) => {
    const chips = entryChannels(p).concat(p.status ? [p.status] : []).slice(0, 3);
    return `
      <a class="pcard-wrap" href="${href(`docs/${p.slug}`)}" data-link>
        <span class="pcard ${gradClass(p.slug)}">
          <span class="pcard-corners">
            <span class="mono-label">${esc(p.group || '')}</span>
            <span class="chips">${chips.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</span>
          </span>
          <span class="pcard-center">${
            hasLogo(p)
              ? `<img class="pcard-logo" src="${esc(logoSrc(p))}" alt="" loading="lazy">`
              : `<span class="pcard-icon">${icon(p.icon)}</span>`
          }</span>
        </span>
        <span class="pcard-caption">
          <span class="pcard-name">${esc(shortName(p))}</span>
          <span class="pcard-sub">${p.users ? `${p.users.toLocaleString('en-US')} users` : esc(p.status || '')}</span>
        </span>
      </a>`;
  };

  // showcase card: media plate on top, name + summary + arrow link below.
  // Used for the featured products on the home page.
  const showCard = (p) => {
    const media = hasLogo(p)
      ? `<span class="show-media"><img src="${esc(coverSrc(p))}" alt="" loading="lazy"></span>`
      : `<span class="show-media ${gradClass(p.slug)}"><span class="pcard-icon">${icon(p.icon)}</span></span>`;
    return `
      <a class="show-card" href="${href(`docs/${p.slug}`)}" data-link>
        ${media}
        <p class="show-title">${esc(p.name)}</p>
        <p class="show-desc">${esc(noDash(p.summary || ''))}</p>
        <span class="arrow-link">View the doc ${icon('arrowRight')}</span>
      </a>`;
  };

  // ------------------------------------------------------------- home view

  // first real figure inside a case study, used as its thumbnail
  const firstImage = (p) => {
    const b = (p.blocks || []).find((x) => x.t === 'image' && x.src);
    return b ? b.src : '';
  };

  function viewHome() {

    const pick = (list, slugs, fallback) => {
      const chosen = (slugs || []).map((sl) => list.find((x) => x.slug === sl)).filter(Boolean);
      return chosen.length ? chosen : fallback;
    };
    const latest = pick(DESIGNS, HOMECOPY().latestSlugs, DESIGNS).slice(0, 4);
    const H = HOMECOPY();
    const featured = pick(
      PROJECTS,
      HOMECOPY().featuredProjects,
      [...PROJECTS].sort((a, b) => (b.users || 0) - (a.users || 0))
    ).slice(0, 4);

    $('#view').innerHTML = `
      <div class="view">
        <section class="hero">
          <div class="hero-top">
            <h1 class="hero-h1">${esc(cms(H.headline, 'Design, build, and ship'))}<br><span id="type-word"></span><span class="type-caret">_</span></h1>
            <img class="hero-photo" src="${esc(H.heroPhotoUrl || H.heroPhotoPath || PROFILE.avatar)}" alt="${esc(PROFILE.name)}">
          </div>

          <div class="hero-row">
            <div class="hero-actions">
              <a class="btn btn-primary" href="${href('designs')}" data-link>${esc(cms(H.primaryCta, 'Explore the designs'))}</a>
              <a class="btn btn-secondary" href="${href('products')}" data-link>${esc(cms(H.secondaryCta, 'Browse products'))}</a>
            </div>
            <p class="hero-aside">${PROFILE.bio}</p>
          </div>

        </section>

        <section class="home-sec">
          <div class="banner gcard gcard-live grad-1">
            <div class="banner-copy">
              <span class="mono-label">${esc(cms(H.bannerLabel, 'The work'))}</span>
              <h3>${esc(cms(H.bannerHeading, `${DESIGNS.length} case studies · ${PROJECTS.length} shipped products`))}</h3>
              <p>${esc(cms(H.bannerText, 'Every figure is a screenshot of the real, running app, designed and built end to end.'))}</p>
            </div>
          </div>
        </section>

        <section class="home-sec">
          <div class="sec-topline">
            <h2 class="sec-h">${esc(cms(H.latestHeading, 'Latest from the studio'))}</h2>
            <a class="arrow-link" href="${href('designs')}" data-link>All designs ${icon('arrowRight')}</a>
          </div>
          <div class="news-grid">
            ${latest
              .map((d) => `
              <a class="news-item" href="${href(`designs/${d.slug}`)}" data-link>
                <span class="news-thumb">${designThumb(d)}</span>
                <p class="news-title">${esc(d.name)}</p>
                <span class="news-meta">${esc([d.category, d.status].filter(Boolean).join(' · '))}</span>
              </a>`)
              .join('')}
          </div>
        </section>

        <section class="home-sec">
          <div class="sec-topline">
            <h2 class="sec-h">${esc(cms(H.productsHeading, 'Tools people actually use'))}</h2>
            <a class="arrow-link" href="${href('products')}" data-link>View all products ${icon('arrowRight')}</a>
          </div>
          <div class="show-grid">
            ${featured.map(showCard).join('')}
          </div>
        </section>

        ${
          H.showGithub === false
            ? ''
            : `<section class="home-sec">
                 <div class="gh" id="gh"><div class="gh-skel">Loading contributions…</div></div>
               </section>`
        }

        <section class="home-sec">
          <div class="banner gcard gcard-live grad-3">
            <div class="banner-copy">
              <span class="mono-label">${esc(cms(H.ctaLabel, 'Get in touch'))}</span>
              <h3>${esc(cms(H.ctaHeading, 'Have something to build?'))}</h3>
              <p>${esc(cms(H.ctaText, 'From the first flow to the shipped product, I design and build the whole thing.'))}</p>
              <a class="btn btn-light" href="${href('contact')}" data-link style="margin-top:22px">${esc(cms(H.ctaButton, 'Contact me'))}</a>
            </div>
          </div>
        </section>
      </div>`;

    renderGitHub();
    initTypewriter();
  }

  // types the hero's rotating words letter by letter, holds, deletes, moves on
  function initTypewriter() {
    const el = $('#type-word');
    if (!el) return;
    if (reduceMotion()) {
      el.textContent = ((HOMECOPY().typeWords || [])[0]) || TYPE_WORDS[0];
      return;
    }

    const words = (HOMECOPY().typeWords || []).length ? HOMECOPY().typeWords : TYPE_WORDS;
    let word = 0;
    let len = 0;
    let deleting = false;

    const tick = () => {
      if (!document.body.contains(el)) return;
      const target = words[word];
      len += deleting ? -1 : 1;
      el.textContent = target.slice(0, len);

      let wait = deleting ? 38 : 64 + Math.random() * 55;
      if (!deleting && len === target.length) {
        deleting = true;
        wait = 1900;
      } else if (deleting && len === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        wait = 380;
      }
      setTimeout(tick, wait);
    };
    tick();
  }

  // ------------------------------------------------------------- doc view

  function viewDoc(p, collection = PROJECTS, basePath = 'docs') {

    const i = collection.indexOf(p);
    const prev = collection[i - 1];
    const next = collection[i + 1];

    const filteredBlocks = p.group === 'Figma Plugins'
      ? p.blocks.filter(b => {
        if (b.t === 'image' && (b.src.includes('thumbnail?resource_id=') || b.src.includes('-cover'))) return false;
        if (b.t === 'p' && b.x.includes('icon?resource_id=')) return false;
        return true;
      })
      : p.blocks;

    const sub = subName(p);
    const kicker = entryMeta(p);
    const extUrl = p.productUrl || p.url;
    const isProject = basePath === 'docs';

    // every document opens the same way: the name, the meta line, and one lede
    // at reading size. A product's rail still carries the identity beside it,
    // but the column no longer starts in a smaller typeface than it continues
    // in.
    const headerHtml = `
          <header class="doc-head">
            <h1 class="doc-h1">
              <span>${esc(shortName(p))}</span>
              ${sub ? `<span class="from">${esc(sub)}</span>` : ''}
            </h1>
            ${kicker ? `<div class="doc-kicker mono-label">${esc(kicker)}</div>` : ''}
            <p class="doc-lede">${p.lede}</p>
          </header>`;

    const articleHtml = `
        <article class="doc-article read-doc">
          ${headerHtml}

          ${
            hasLogo(p)
              ? `<div class="doc-hero-thumbnail">
                   <img src="${esc(coverSrc(p))}" alt="${esc(p.name)} thumbnail" />
                 </div>`
              : ''
          }

          <div class="prose read-prose">${renderBlocks(filteredBlocks)}</div>

          ${
            p.privacyBlocks || p.termsBlocks
              ? `<div class="doc-footer-links">
                   ${p.privacyBlocks ? `<a class="doc-footer-link" href="${href(`${basePath}/${p.slug}/privacy`)}" data-link>Privacy Policy</a>` : ''}
                   ${p.termsBlocks ? `<a class="doc-footer-link" href="${href(`${basePath}/${p.slug}/terms`)}" data-link>Terms of Service</a>` : ''}
                 </div>`
              : ''
          }

          <nav class="page-nav" aria-label="Pagination">
            ${
              prev
                ? `<a class="page-nav-link prev" href="${href(`${basePath}/${prev.slug}`)}" data-link>
                     <span class="page-nav-dir">${icon('chevronLeft')} Previous</span>
                     <span class="page-nav-name">${esc(shortName(prev))}</span>
                   </a>`
                : '<span></span>'
            }
            ${
              next
                ? `<a class="page-nav-link next" href="${href(`${basePath}/${next.slug}`)}" data-link>
                     <span class="page-nav-dir">Next ${icon('chevronRight')}</span>
                     <span class="page-nav-name">${esc(shortName(next))}</span>
                   </a>`
                : ''
            }
          </nav>
        </article>`;

    if (isProject) {
      // product-page anatomy: content + a sticky rail with the CTA and facts
      const railRow = (label, value) =>
        value ? `<div class="rail-row"><span class="mono-label">${esc(label)}</span><b>${esc(value)}</b></div>` : '';
      $('#view').innerHTML = `
        <div class="view">
          <div class="doc-grid">
            ${articleHtml}
            <aside class="rail" aria-label="Product facts">
              <div class="rail-head">
                ${
                  // a real screenshot of the thing beats a coloured square with
                  // a glyph on it; the glyph is only the fallback for a product
                  // with nothing to shoot yet
                  p.thumbUrl
                    ? `<span class="rail-thumb"><img src="${esc(p.thumbUrl)}" alt="" loading="lazy"></span>`
                    : `<span class="rail-ico" style="background:${avaColor(p.slug)}">${icon(p.icon)}</span>`
                }
                <span class="rail-name">${esc(shortName(p))}</span>
              </div>
              <p class="rail-sub">${esc(noDash(p.summary || ''))}</p>
              ${
                extUrl
                  ? `<a class="btn btn-primary" href="${esc(extUrl)}" target="_blank" rel="noopener">${
                      p.group === 'Figma Plugins' ? 'Open in Figma' : 'Open the product'
                    }</a>`
                  : ''
              }
              <div class="rail-rows">
                ${railRow('Type', p.group)}
                ${railRow('Status', p.status)}
                ${railRow('Users', p.users ? p.users.toLocaleString('en-US') : '')}
                ${railRow('Focus', p.tag)}
              </div>
            </aside>
          </div>
        </div>`;
    } else {
      $('#view').innerHTML = `
        <div class="view">
          ${
            extUrl
              ? articleHtml.replace(
                  '</header>',
                  `<div class="doc-links"><a href="${esc(extUrl)}" target="_blank" rel="noopener">Open product ${icon('external')}</a></div></header>`
                )
              : articleHtml
          }
        </div>`;
    }

    renderTOC();
    initCopy();
    initZoom();
    initScaleDemo();
    initCurrencyDemo();
    initDeleteDemo();
    initStruggleDemo();
    initBatchDemo();
    initResumeDemo();
    initSearchDemo();
    initZoomDemo();
    initNextDemo();
    initRetryDemo();
    initPayDemo();
    initWaitDemo();
    initPrefetchDemo();
    initHumanDemo();
    initAnchorDemo();
    initUndoDemo();
  }

  // ------------------------------------------------------------- headings

  // there is no table of contents in this layout, but headings still get
  // stable ids so the # anchor links in the prose keep working
  function renderTOC() {
    $$('.prose h2, .prose h3').forEach((h, idx) => {
      if (!h.id) {
        h.id = slugify(h.textContent) || `heading-${idx}`;
      }
    });
  }

  // ------------------------------------------------------------- interactions

  function initCopy() {
    $$('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        // a non-empty data-copy value copies itself (e.g. an email address);
        // the bare attribute (code blocks) copies the adjacent <code>.
        const text = btn.dataset.copy || btn.closest('.code')?.querySelector('code')?.innerText;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          btn.classList.add('done');
          setTimeout(() => btn.classList.remove('done'), 1400);
        } catch {
          /* clipboard blocked: nothing useful to do */
        }
      });
    });
  }

  function initZoom() {
    $$('[data-zoom]').forEach((f) => {
      f.addEventListener('click', () => {
        const img = f.querySelector('img');
        if (!img) return;
        $('#lb-img').src = img.src;
        $('#lb-img').alt = img.alt;
        $('#lb').classList.add('on');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  const closeLB = () => {
    $('#lb').classList.remove('on');
    document.body.style.overflow = '';
  };

  // Window listeners are registered once at boot, not per render; otherwise
  // every navigation would leave another set behind pointing at dead nodes.
  let dragTarget = null;

  const scrub = (el, clientX) => {
    const r = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    el.style.setProperty('--pos', `${pct}%`);
  };

  function initCompareGlobals() {
    const xOf = (e) => (e.touches ? e.touches[0]?.clientX : e.clientX);

    const start = (e) => {
      const el = e.target.closest('[data-compare]');
      if (!el) return;
      dragTarget = el;
      scrub(el, xOf(e));
    };
    const move = (e) => {
      const x = xOf(e);
      if (x == null) return;
      if (dragTarget) return scrub(dragTarget, x);
      // hover-to-scrub feels better than click-drag on desktop
      const hovered = e.target?.closest?.('[data-compare]');
      if (hovered) scrub(hovered, x);
    };
    const end = () => (dragTarget = null);

    document.addEventListener('mousedown', start);
    document.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
  }

  function initTilt() {
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  // true on desktop-with-mouse; touch/coarse pointers skip the magnetic
  // pull and 3D tilt entirely rather than faking hover.
  const HOVER_FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // gentle 3D tilt on screenshots/thumbnails, capped well under a full
  // perspective flip so it reads as "photo on a desk", not a gimmick.
  function initTilt3D(root = document) {
    if (!HOVER_FINE) return;
    const MAX_DEG = 2;
    $$('[data-tilt-3d]', root).forEach((el) => {
      if (el.dataset.tilt3dInit) return;
      el.dataset.tilt3dInit = '1';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const ry = (px - 0.5) * MAX_DEG * 2;
        const rx = (0.5 - py) * MAX_DEG * 2;
        el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(700px) rotateX(0) rotateY(0)';
      });
    });
  }

  // primary buttons drift toward the cursor within a small radius, then
  // spring back; :active still contributes a press-scale via the same
  // inline transform so the two effects don't fight over the property.
  function initMagnetic(root = document) {
    if (!HOVER_FINE) return;
    $$('.cta, .search-btn, .contact-btn', root).forEach((btn) => {
      if (btn.dataset.magnetInit) return;
      btn.dataset.magnetInit = '1';
      let mx = 0;
      let my = 0;
      let pressed = false;
      const apply = () => {
        btn.style.transform = `translate(${mx}px, ${my}px) scale(${pressed ? 0.96 : 1})`;
      };
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        mx = (e.clientX - (r.left + r.width / 2)) * 0.08;
        my = (e.clientY - (r.top + r.height / 2)) * 0.08;
        apply();
      });
      btn.addEventListener('mouseleave', () => {
        mx = 0;
        my = 0;
        pressed = false;
        apply();
      });
      btn.addEventListener('mousedown', () => {
        pressed = true;
        apply();
      });
      window.addEventListener('mouseup', () => {
        pressed = false;
        apply();
      });
    });
  }

  // click-to-load facades keep third-party iframes out until asked
  document.addEventListener('click', (e) => {
    const facade = e.target.closest('.facade');
    if (!facade) return;
    const wrap = facade.closest('[data-embed]');
    if (!wrap) return;
    wrap.innerHTML = `<iframe src="${wrap.dataset.embed}" allow="autoplay; fullscreen; clipboard-write" allowfullscreen loading="lazy" title="Embedded content"></iframe>`;
  });

  // ------------------------------------------------------------- scale demo

  function initScaleDemo() {
    const demo = $('[data-demo="scale"]');
    if (!demo) return;

    const color = $('#demo-color', demo);
    const hexIn = $('.demo-hex', demo);
    const steps = $('#demo-steps', demo);
    const stepsV = $('.demo-steps-v', demo);
    const scale = $('.demo-scale', demo);

    const paint = (base) => {
      const n = +steps.value;
      stepsV.textContent = n;
      const cells = buildScale(base, n);
      const mid = n; // index of the base color
      scale.innerHTML = cells
        .map((rgb, i) => {
          const hex = rgbToHex(rgb);
          return `<button class="demo-cell${i === mid ? ' base' : ''}" role="listitem"
            style="background:${hex};color:${readable(rgb)}" data-hex="${hex}"
            title="${hex} (click to copy)" aria-label="${hex}"><span>${hex.slice(1)}</span></button>`;
        })
        .join('');
    };

    const update = (v) => {
      if (!isHex(v)) return;
      const hex = v.startsWith('#') ? v : `#${v}`;
      color.value = hex.length === 4 ? `#${hex.slice(1).split('').map((c) => c + c).join('')}` : hex;
      paint(color.value);
    };

    color.addEventListener('input', () => {
      hexIn.value = color.value.toUpperCase();
      paint(color.value);
    });
    hexIn.addEventListener('input', () => update(hexIn.value));
    steps.addEventListener('input', () => paint(color.value));

    scale.addEventListener('click', async (e) => {
      const cell = e.target.closest('.demo-cell');
      if (!cell) return;
      try {
        await navigator.clipboard.writeText(cell.dataset.hex);
        const note = $('.demo-note', demo);
        const was = note.textContent;
        note.textContent = `Copied ${cell.dataset.hex}`;
        note.style.color = 'var(--accent)';
        setTimeout(() => {
          note.textContent = was;
          note.style.color = '';
        }, 1200);
      } catch {
        /* clipboard blocked */
      }
    });

    paint(color.value);
  }

  // ------------------------------------------------------------ ambient demos

  // The four figures in the findings all play rather than wait to be clicked.
  // They share one loop: it pauses off-screen, stops with the view it belongs
  // to, and holds a single still frame for anyone who has asked for less
  // motion. `run` gets a beat() to wait on and does one pass of the story.
  function ambient(demo, { still, run }) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      still();
      return;
    }

    let stop = false;
    let visible = true;

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const beat = async (ms) => {
      await wait(ms);
      while (!visible && !stop) await wait(200);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
      { threshold: 0.15 }
    );
    io.observe(demo);

    const watchdog = setInterval(() => {
      if (document.contains(demo)) return;
      stop = true;
      io.disconnect();
      clearInterval(watchdog);
    }, 2000);

    (async () => {
      let pass = 0;
      while (!stop) {
        if (!document.contains(demo)) return;
        await run(beat, pass++);
      }
    })();
  }

  // The pointer is the whole point: a figure that changes on its own reads as a
  // bug, and the same change with a cursor arriving first reads as someone
  // doing it. One pointer per demo, parked out of the way between moves.
  function pointerFor(demo) {
    const el = document.createElement('span');
    el.className = 'demo-cursor';
    // one arrow, drawn from its own tip
    el.innerHTML =
      '<span class="demo-cursor-ring"></span>' +
      '<svg class="demo-cursor-g" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M5.6 2.4 19.2 12.3l-6.3.5 3.4 6.9-2.9 1.4-3.4-6.9-4.4 4.2z"/></svg>';
    demo.appendChild(el);

    // the tip lands a little past the middle of a control, the way a hand does
    const at = (target, fx = 0.56, fy = 0.62) => {
      const d = demo.getBoundingClientRect();
      const r = target.getBoundingClientRect();
      el.style.transform = `translate(${r.left - d.left + r.width * fx}px, ${r.top - d.top + r.height * fy}px)`;
    };

    return {
      // move into place, press, and let the press be what changes the state
      tap: async (target, beat, act) => {
        at(target);
        el.classList.add('on');
        await beat(620);
        el.classList.add('down');
        await beat(170);
        if (act) act();
        await beat(150);
        el.classList.remove('down');
        await beat(240);
      },
      // arrive and stay, without pressing — a hover is its own event
      hover: async (target, beat, act) => {
        at(target);
        el.classList.add('on');
        await beat(620);
        if (act) act();
        await beat(160);
      },
      // drift to the corner, so nothing is obscured while the result is read
      park: async (beat) => {
        const d = demo.getBoundingClientRect();
        el.style.transform = `translate(${d.width - 34}px, ${d.height - 26}px)`;
        await beat(300);
        el.classList.remove('on');
      },
    };
  }

  // ---------------------------------------------------------- currency demo

  // Select the amount, open the menu, convert. Each pass uses the next
  // preferred currency, and every number comes off the rate table.
  function initCurrencyDemo() {
    const demo = $('[data-demo="currency"]');
    if (!demo) return;

    const AMOUNT = 249.99;
    const cur = $('.cdemo-cur', demo);
    const amount = $('.cdemo-amount', demo);
    const convert = $('.cdemo-convert', demo);
    const out = $('.cdemo-out', demo);
    const rateV = $('.cdemo-rate-v', demo);
    const step = $('.cdemo-step', demo);
    const hand = pointerFor(demo);

    // one formatting rule for both lines, so the rate and the total agree
    const money = (v, r, dp) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: r.code,
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
      }).format(v);

    const paint = (r) => {
      cur.textContent = r.code;
      convert.textContent = `Convert to ${r.code}`;
      out.textContent = `${money(AMOUNT * r.rate, r, r.code === 'JPY' ? 0 : 2)} ${r.code}`;
      rateV.textContent = `1 USD = ${money(r.rate, r, 2)}`;
    };

    const say = (s) => {
      step.textContent = s;
    };

    ambient(demo, {
      still: () => {
        paint(DEMO_RATES[0]);
        demo.dataset.state = 'converted';
        say('Converted in place');
      },
      run: async (beat, pass) => {
        const r = DEMO_RATES[pass % DEMO_RATES.length];
        paint(r);

        demo.dataset.state = 'idle';
        say('An amount in another currency');
        await beat(1100);

        // the selection and the menu come from the press, not from a timer
        await hand.tap(amount, beat, () => {
          demo.dataset.state = 'selected';
          say('Selected');
        });
        demo.dataset.state = 'menu';
        say('The usual menu');
        await beat(900);

        await hand.tap(convert, beat, () => {
          demo.dataset.state = 'converted';
          say('Converted in place');
        });
        await hand.park(beat);
        await beat(2600);
      },
    });
  }

  // ------------------------------------------------------------ delete demo

  // Two deletes confirmed, and then the dialog gives way to an undo. Nothing
  // to click: the list plays it out and rebuilds itself.
  function initDeleteDemo() {
    const demo = $('[data-demo="delete"]');
    if (!demo) return;

    const LEARN_AFTER = 2;
    const list = $('.ddemo-list', demo);
    const mode = $('.ddemo-mode', demo);
    const step = $('.ddemo-step', demo);
    const toast = $('.ddemo-toast', demo);
    const toastT = $('.ddemo-toast-t', demo);
    const hand = pointerFor(demo);
    const ROWS = list.innerHTML;

    const say = (s) => {
      step.textContent = s;
    };

    const setMode = (learned) => {
      demo.dataset.mode = learned ? 'undo' : 'confirm';
      mode.textContent = learned ? 'Deleting straight away, with undo' : 'Confirming every delete';
    };

    const name = (row) => $('.ddemo-name', row).textContent.trim();

    ambient(demo, {
      still: () => {
        setMode(true);
        list.firstElementChild.remove();
        list.firstElementChild.remove();
        toastT.textContent = '\u201cDraft \u2014 pricing page\u201d deleted';
        toast.classList.add('on');
        say('No dialog, undo instead');
      },
      run: async (beat) => {
        list.innerHTML = ROWS;
        toast.classList.remove('on');
        setMode(false);
        say('Watching');
        await beat(900);

        // the row leaves rather than blinks out, so the delete is legible
        const drop = async (row) => {
          row.classList.add('going');
          await beat(240);
          row.remove();
        };

        // rows are picked from down the list rather than always off the top,
        // so the pointer travels and the deletes read as separate decisions
        const pick = (n) => list.children[Math.min(n, list.children.length - 1)];

        // the first two are deleted the long way round
        for (let i = 0; i < LEARN_AFTER; i += 1) {
          const row = pick(i === 0 ? 1 : 3);
          await hand.tap($('.ddemo-del', row), beat, () => {
            row.classList.add('asking');
            say('Asking to be sure');
          });
          await beat(500);
          await hand.tap($('.ddemo-yes', row), beat, () => say(`Deleted \u00b7 ${i + 1}`));
          await drop(row);
          await beat(500);
        }

        setMode(true);
        say('Twice is intent');
        await beat(1200);

        // and the rest go straight through, with the undo underneath
        for (let i = 0; i < 2; i += 1) {
          const row = pick(i === 0 ? 0 : 2);
          const label = name(row);
          await hand.tap($('.ddemo-del', row), beat, () => {
            toastT.textContent = `Deleted \u201c${label}\u201d`;
            toast.classList.add('on');
            say('No dialog, undo instead');
          });
          await drop(row);
          await beat(1900);
          if (i === 0) toast.classList.remove('on');
          await beat(400);
        }

        await hand.park(beat);
        await beat(2000);
      },
    });
  }

  // ----------------------------------------------------------- struggle demo

  // A field typed into and cleared twice, and the hint that follows.
  function initStruggleDemo() {
    const demo = $('[data-demo="struggle"]');
    if (!demo) return;

    const text = $('.sdemo-text', demo);
    const field = $('.sdemo-field', demo);
    const step = $('.sdemo-step', demo);
    const hand = pointerFor(demo);

    const say = (s) => {
      step.textContent = s;
    };

    ambient(demo, {
      still: () => {
        text.textContent = 'ORD 2481';
        demo.classList.add('hinting');
        say('Hint offered');
      },
      run: async (beat) => {
        const type = async (str, speed = 75) => {
          for (const ch of str) {
            text.textContent += ch;
            await beat(speed);
          }
        };

        const clear = async (speed = 45) => {
          while (text.textContent) {
            text.textContent = text.textContent.slice(0, -1);
            await beat(speed);
          }
        };

        demo.classList.remove('hinting');
        text.textContent = '';
        say('Watching');
        await beat(700);

        // someone clicks into the field before any of this happens
        await hand.tap(field, beat, () => say('Typing'));
        await hand.park(beat);
        await type('2481');
        await beat(800);

        say('Cleared');
        await clear();
        await beat(500);

        say('Typing again');
        await type('ord 2481');
        await beat(900);

        say('Cleared again');
        await clear();
        await beat(400);

        // the hint lands while the third attempt is still sitting in the field
        say('Trying again');
        await type('ORD 2481');
        await beat(700);

        say('Hint offered');
        demo.classList.add('hinting');
        await beat(3400);
      },
    });
  }

  // -------------------------------------------------------------- batch demo

  // Three images rotated by hand, then the offer to finish the other seven.
  function initBatchDemo() {
    const demo = $('[data-demo="batch"]');
    if (!demo) return;

    const tiles = $$('.bdemo-tile', demo);
    const btn = $('.bdemo-btn', demo);
    const step = $('.bdemo-step', demo);
    const hand = pointerFor(demo);
    const BY_HAND = 3;

    const say = (s) => {
      step.textContent = s;
    };

    ambient(demo, {
      still: () => {
        tiles.slice(0, BY_HAND).forEach((t) => t.classList.add('turned'));
        demo.classList.add('asking');
        say('Offer made');
      },
      run: async (beat) => {
        tiles.forEach((t) => t.classList.remove('turned'));
        demo.classList.remove('asking', 'taken');
        say('Watching');
        await beat(900);

        for (let i = 0; i < BY_HAND; i += 1) {
          await hand.tap(tiles[i], beat, () => {
            tiles[i].classList.add('turned');
            say(`Rotated by hand \u00b7 ${i + 1}`);
          });
        }

        say('Same edit, three times');
        await beat(500);

        demo.classList.add('asking');
        say('Offer made');
        await beat(1400);

        await hand.tap(btn, beat, () => demo.classList.add('taken'));

        // the other seven follow, staggered, so the batch reads as one action
        for (let i = BY_HAND; i < tiles.length; i += 1) {
          tiles[i].classList.add('turned');
          await beat(90);
        }
        say('Applied to the other 7');
        await hand.park(beat);
        await beat(2600);
      },
    });
  }

  // ------------------------------------------------------------- resume demo

  // Three fields filled, the page left at the fourth, and the return landing
  // on that field rather than at the top of the form.
  function initResumeDemo() {
    const demo = $('[data-demo="resume"]');
    if (!demo) return;

    const row = (key) => $(`.rdemo-row[data-f="${key}"]`, demo);
    const value = (key) => $('.rdemo-v', row(key));
    const step = $('.rdemo-step', demo);
    const hand = pointerFor(demo);

    const FILLED = [
      ['name', 'Nijin Muhammed'],
      ['phone', '98470 12345'],
      ['address', 'Kozhikode, Kerala'],
    ];

    const say = (s) => {
      step.textContent = s;
    };

    const focus = (key) => {
      $$('.rdemo-row', demo).forEach((r) => r.classList.remove('on'));
      if (key) row(key).classList.add('on');
    };

    ambient(demo, {
      still: () => {
        FILLED.forEach(([k, v]) => (value(k).textContent = v));
        demo.dataset.state = 'back';
        row('pin').classList.add('here');
        say('Back where you were');
      },
      run: async (beat) => {
        demo.dataset.state = 'filling';
        $$('.rdemo-row', demo).forEach((r) => r.classList.remove('here', 'on'));
        FILLED.forEach(([k]) => (value(k).textContent = ''));
        say('Filling the form');
        await beat(800);

        for (const [key, text] of FILLED) {
          await hand.tap(row(key), beat, () => focus(key));
          const box = value(key);
          for (const ch of text) {
            box.textContent += ch;
            await beat(52);
          }
          await beat(420);
        }

        // the last field is the one the answer has to be fetched for
        await hand.tap(row('pin'), beat, () => {
          focus('pin');
          say('Needs the PIN');
        });
        await hand.park(beat);
        await beat(500);

        demo.dataset.state = 'away';
        say('Left the page');
        await beat(2400);

        demo.dataset.state = 'back';
        focus('pin');
        row('pin').classList.add('here');
        say('Back on the field, not the top of the form');
        await beat(3600);
      },
    });
  }

  // ------------------------------------------------------------- search demo

  // The query is typed, the dead end is shown, and then the same failure is
  // answered with the one change worth offering.
  function initSearchDemo() {
    const demo = $('[data-demo="search"]');
    if (!demo) return;

    const query = demo.dataset.query;
    const box = $('.qdemo-q', demo);
    const go = $('.qdemo-go', demo);
    const field = $('.qdemo-field', demo);
    const cta = $('.qdemo-cta', demo);
    const step = $('.qdemo-step', demo);
    const hand = pointerFor(demo);
    const hits = $$('.qdemo-hit', demo).length;

    const say = (s) => {
      step.textContent = s;
    };

    ambient(demo, {
      still: () => {
        box.textContent = query;
        demo.dataset.state = 'help';
        say('The same failure, answered');
      },
      run: async (beat) => {
        demo.dataset.state = 'idle';
        box.textContent = '';
        say('Watching');
        await beat(800);

        await hand.tap(field, beat, () => {
          demo.dataset.state = 'typing';
          say('Typing the query');
        });
        await hand.park(beat);
        for (const ch of query) {
          box.textContent += ch;
          await beat(48);
        }
        await beat(500);

        await hand.tap(go, beat, () => {
          demo.dataset.state = 'help';
          say('Nothing matched, and here is why');
        });
        await hand.park(beat);
        await beat(2400);

        await hand.tap(cta, beat, () => {
          demo.dataset.state = 'results';
          say(`${hits} results, no retyping`);
        });
        await hand.park(beat);
        await beat(3400);
      },
    });
  }

  // --------------------------------------------------------------- zoom demo

  // The same card opened two ways. The hero panel is placed exactly over the
  // card, then grown to fill the screen — so the thing that was clicked is the
  // thing that arrives, rather than a new screen replacing it.
  function initZoomDemo() {
    const demo = $('[data-demo="zoom"]');
    if (!demo) return;

    const stage = $('.zdemo-stage', demo);
    const card = $('.zdemo-card.is-hero', demo);
    const hero = $('.zdemo-hero', demo);
    const step = $('.zdemo-step', demo);
    const hand = pointerFor(demo);

    const say = (s) => {
      step.textContent = s;
    };

    // sit the hero exactly on the card it came from
    const overCard = () => {
      const s0 = stage.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      hero.style.left = `${c.left - s0.left}px`;
      hero.style.top = `${c.top - s0.top}px`;
      hero.style.width = `${c.width}px`;
      hero.style.height = `${c.height}px`;
    };

    // opening stops short of the edges, so the panel still reads as sitting on
    // the page it grew out of
    const fillStage = () => {
      const inset = 10;
      hero.style.left = `${inset}px`;
      hero.style.top = `${inset}px`;
      hero.style.width = `${stage.clientWidth - inset * 2}px`;
      hero.style.height = `${stage.clientHeight - inset * 2}px`;
    };

    ambient(demo, {
      still: () => {
        overCard();
        fillStage();
        demo.dataset.state = 'open';
        say('The same card, opened');
      },
      run: async (beat) => {
        demo.dataset.state = 'grid';
        overCard();
        say('Watching');
        await beat(1000);

        // the card itself does the travelling
        await hand.tap(card, beat, () => {
          demo.dataset.state = 'opening';
          // the hero starts on the card, so the growth reads as one object
          overCard();
          requestAnimationFrame(() => {
            fillStage();
            demo.dataset.state = 'open';
          });
          say('The same card, opened');
        });
        await hand.park(beat);
        await beat(3000);

        demo.dataset.state = 'opening';
        overCard();
        say('And back where it came from');
        await beat(900);
        demo.dataset.state = 'grid';
        await beat(1400);
      },
    });
  }

  // --------------------------------------------------------------- next demo

  // The same button twice: once saying nothing, once naming the step it leads
  // to — and then going exactly there.
  function initNextDemo() {
    const demo = $('[data-demo="next"]');
    if (!demo) return;

    const go = $('.ndemo-go', demo);
    const heading = $('.ndemo-h', demo);
    const step = $('.ndemo-step', demo);
    const hand = pointerFor(demo);

    // the label is built from the step list, so it cannot promise a step that
    // is not the one the button moves to
    const STEPS = $$('.ndemo-stp', demo).map((el) => el.textContent.trim());

    const say = (s) => {
      step.textContent = s;
    };

    const at = (i) => {
      demo.dataset.at = String(i);
      heading.textContent = `${STEPS[i]} details`;
      const next = STEPS[i + 1];
      go.textContent = next ? `Continue to ${next.toLowerCase()}` : 'Place the order';
    };

    ambient(demo, {
      still: () => {
        at(1);
        say('The button names the step it leads to');
      },
      run: async (beat) => {
        at(1);
        say('The button names the step it leads to');
        await beat(1900);

        await hand.tap(go, beat, () => {
          at(2);
          say('Exactly what it promised');
        });
        await hand.park(beat);
        await beat(2600);
      },
    });
  }

  // -------------------------------------------------------------- retry demo

  // Two tiles loaded, one did not. The retry reloads that tile and leaves the
  // other two alone — which is the whole point, so nothing else may flicker.
  function initRetryDemo() {
    const demo = $('[data-demo="retry"]');
    if (!demo) return;

    const failed = $('.tdemo-tile[data-t="orders"]', demo);
    const retry = $('.tdemo-retry', failed);
    const step = $('.tdemo-step', demo);
    const hand = pointerFor(demo);

    const say = (s) => {
      step.textContent = s;
    };

    ambient(demo, {
      still: () => {
        demo.dataset.state = 'failed';
        say('One tile failed, the others are fine');
      },
      run: async (beat) => {
        demo.dataset.state = 'failed';
        say('Two loaded, one did not');
        await beat(1600);

        await hand.tap(retry, beat, () => {
          demo.dataset.state = 'retrying';
          say('Only that tile is asked again');
        });
        await hand.park(beat);
        await beat(1700);

        demo.dataset.state = 'done';
        say('Back without reloading the page');
        await beat(3200);
      },
    });
  }

  // ---------------------------------------------------------------- pay demo

  // The press is answered immediately, and the button stops being a button
  // until the request comes back.
  function initPayDemo() {
    const demo = $('[data-demo="pay"]');
    if (!demo) return;

    const btn = $('.pdemo-btn', demo);
    const label = $('.pdemo-label', demo);
    const step = $('.pdemo-step', demo);
    const hand = pointerFor(demo);
    const AMOUNT = $('.pdemo-total-v', demo).textContent.trim();

    const say = (s) => {
      step.textContent = s;
    };

    ambient(demo, {
      still: () => {
        demo.dataset.state = 'done';
        label.textContent = 'Payment complete';
        say('The press was answered');
      },
      run: async (beat) => {
        demo.dataset.state = 'ready';
        label.textContent = `Pay ${AMOUNT}`;
        say('Watching');
        await beat(900);

        await hand.tap(btn, beat, () => {
          demo.dataset.state = 'busy';
          label.textContent = 'Processing\u2026';
          say('Answered on the press, and locked');
        });

        // a second press while it is working, which the button refuses
        await hand.tap(btn, beat, () => {
          demo.classList.add('refused');
          say('A second press does nothing');
        });
        await beat(500);
        demo.classList.remove('refused');
        await beat(1400);

        demo.dataset.state = 'done';
        label.textContent = 'Payment complete';
        say('Charged once');
        await hand.park(beat);
        await beat(2800);
      },
    });
  }

  // --------------------------------------------------------------- wait demo

  // The same wait, told three ways as it gets longer. The clock is real: it
  // counts the beats the loop has actually spent waiting.
  function initWaitDemo() {
    const demo = $('[data-demo="wait"]');
    if (!demo) return;

    const msg = $('.wdemo-msg', demo);
    const sub = $('.wdemo-sub', demo);
    const clock = $('.wdemo-clock', demo);
    const step = $('.wdemo-step', demo);

    const say = (s) => {
      step.textContent = s;
    };

    const STAGES = [
      { at: 0, state: 'short', msg: 'Loading\u2026', sub: 'Fetching your report', trace: 'Under two seconds: say nothing else' },
      { at: 2.4, state: 'mid', msg: 'Still working\u2026', sub: 'The report is large', trace: 'A few seconds in: still working' },
      { at: 6, state: 'long', msg: 'This is taking longer than usual', sub: 'You can keep waiting, or try again', trace: 'Longer than usual: say so, and offer a way out' },
    ];

    const paint = (st) => {
      demo.dataset.state = st.state;
      msg.textContent = st.msg;
      sub.textContent = st.sub;
      say(st.trace);
    };

    ambient(demo, {
      still: () => {
        paint(STAGES[2]);
        clock.textContent = '9.0s';
      },
      run: async (beat) => {
        let t = 0;
        paint(STAGES[0]);
        clock.textContent = '0.0s';

        // one tick every 200ms, so the copy changes on the clock, not on a cue
        while (t < 9) {
          await beat(200);
          t += 0.2;
          clock.textContent = `${t.toFixed(1)}s`;
          const stage = STAGES.filter((x) => t >= x.at).pop();
          if (stage && demo.dataset.state !== stage.state) paint(stage);
        }
        await beat(1600);
      },
    });
  }

  // ----------------------------------------------------------- prefetch demo

  // The mechanism, drawn on one axis: the request starts on the hover and
  // finishes before the click, so the click has nothing left to wait for.
  // Every mark is positioned from DEMO_TRACE, so the picture cannot disagree
  // with the numbers printed on it.
  function initPrefetchDemo() {
    const demo = $('[data-demo="prefetch"]');
    if (!demo) return;

    const t = DEMO_TRACE;
    const card = $('.hdemo-card.is-target', demo);
    const bar = $('.hdemo-bar', demo);
    const step = $('.hdemo-step', demo);
    const hand = pointerFor(demo);
    const pct = (ms) => `${(ms / t.span) * 100}%`;

    const mark = (name) => $(`.hdemo-mark[data-m="${name}"]`, demo);

    // lay the trace out once; the loop only reveals it
    mark('hover').style.left = pct(t.hover);
    mark('click').style.left = pct(t.click);
    mark('ready').style.left = pct(t.hover + t.request);
    mark('paint').style.left = pct(t.click);
    bar.style.left = pct(t.hover);
    $('em', bar).textContent = `GET /desk-clock \u00b7 ${t.request}\u2009ms`;

    const say = (s) => {
      step.textContent = s;
    };

    const show = (name) => mark(name).classList.add('on');
    const clear = () => {
      $$('.hdemo-mark', demo).forEach((m) => m.classList.remove('on'));
      bar.style.width = '0%';
      bar.classList.remove('grow');
    };

    ambient(demo, {
      still: () => {
        demo.dataset.state = 'open';
        card.classList.add('hover', 'open');
        bar.style.width = pct(t.request);
        ['hover', 'ready', 'click', 'paint'].forEach(show);
        say('The request fits in the gap before the click');
      },
      run: async (beat) => {
        demo.dataset.state = 'idle';
        card.classList.remove('hover', 'open');
        clear();
        say('Watching');
        await beat(900);

        // the hover is the event that starts the fetch
        await hand.hover(card, beat, () => {
          card.classList.add('hover');
          demo.dataset.state = 'fetching';
          show('hover');
          say('Hover: the request starts here');
        });
        bar.classList.add('grow');
        bar.style.width = pct(t.request);
        await beat(1500);

        show('ready');
        say(`Answered in ${t.request}\u2009ms, while the pointer is still on the card`);
        await beat(1400);

        await hand.tap(card, beat, () => {
          show('click');
          show('paint');
          card.classList.add('open');
          demo.dataset.state = 'open';
          say('Click: painted from cache, nothing to wait for');
        });
        await hand.park(beat);
        await beat(3000);
      },
    });
  }

  // -------------------------------------------------------------- human demo

  // The check that replaces the CAPTCHA, drawn as it runs: signals land while
  // the form is being filled, the score is the sum of their weights, and the
  // challenge is skipped only once that sum clears the threshold.
  function initHumanDemo() {
    const demo = $('[data-demo="human"]');
    if (!demo) return;

    const value = $('.gdemo-v', demo);
    const go = $('.gdemo-go', demo);
    const fill = $('.gdemo-fill', demo);
    const score = $('.gdemo-score', demo);
    const step = $('.gdemo-step', demo);
    const hand = pointerFor(demo);
    const field = $('.gdemo-input', demo);

    const EMAIL = 'nijin@studio.in';
    const TOTAL = DEMO_SIGNALS.reduce((n, g) => n + g.weight, 0);

    const say = (s) => {
      step.textContent = s;
    };

    // one number, used for the bar, the label and the decision
    let sum = 0;
    const paint = () => {
      fill.style.width = `${sum}%`;
      score.textContent = String(sum);
      demo.dataset.pass = sum >= DEMO_THRESHOLD ? 'yes' : 'no';
    };

    const land = (key) => {
      const g = DEMO_SIGNALS.find((x) => x.key === key);
      $(`.gdemo-sig[data-s="${key}"]`, demo).classList.add('on');
      sum += g.weight;
      paint();
    };

    const reset = () => {
      $$('.gdemo-sig', demo).forEach((el) => el.classList.remove('on'));
      sum = 0;
      paint();
      value.textContent = '';
      demo.dataset.state = 'idle';
    };

    ambient(demo, {
      still: () => {
        $$('.gdemo-sig', demo).forEach((el) => el.classList.add('on'));
        sum = TOTAL;
        paint();
        value.textContent = EMAIL;
        demo.dataset.state = 'in';
        say(`Score ${TOTAL} of 100 \u2014 no challenge shown`);
      },
      run: async (beat) => {
        reset();
        say('Nothing asked of the user yet');
        await beat(900);

        // moving the pointer is itself one of the signals
        await hand.tap(field, beat, () => {
          demo.dataset.state = 'typing';
          land('pointer');
          say('The way the pointer moved is the first signal');
        });
        await hand.park(beat);
        await beat(400);

        for (const ch of EMAIL) {
          value.textContent += ch;
          await beat(58);
        }
        land('typing');
        say('Typing rhythm looks human, not scripted');
        await beat(900);

        land('nav');
        await beat(600);
        land('device');
        // the wording is read off the same comparison the code makes
        say(`Score ${sum} \u2014 ${sum >= DEMO_THRESHOLD ? 'over' : 'still under'} the threshold`);
        await beat(1100);

        await hand.tap(go, beat, () => {
          land('timing');
          say(`Score ${sum} of 100 \u2014 ${sum >= DEMO_THRESHOLD ? 'over' : 'under'} the threshold`);
        });
        await beat(700);

        demo.dataset.state = 'in';
        say('Signed in, with no CAPTCHA to solve');
        await hand.park(beat);
        await beat(3000);
      },
    });
  }

  // ------------------------------------------------------------- anchor demo

  // Something loads above the line being read. The slot grows by DEMO_SHIFT and
  // the document is pushed up by the same DEMO_SHIFT in the same breath, so the
  // line stays exactly where the reader left it — the guide proves it.
  function initAnchorDemo() {
    const demo = $('[data-demo="anchor"]');
    if (!demo) return;

    const doc = $('.ldemo-doc', demo);
    const slot = $('.ldemo-slot', demo);
    const read = $('.ldemo-p.is-read', demo);
    const guide = $('.ldemo-guide', demo);
    const step = $('.ldemo-step', demo);

    const GUIDE_Y = 208;

    const say = (s) => {
      step.textContent = s;
    };

    // park the read line on the guide, whatever the type happens to measure
    const rest = () => {
      // collapse without animating, or offsetTop is read mid-transition and the
      // line lands wherever the half-finished height happens to put it
      slot.style.transition = 'none';
      slot.style.height = '0px';
      doc.style.transition = 'none';
      doc.style.transform = 'translateY(0)';
      guide.style.top = `${GUIDE_Y}px`;
      const top = read.offsetTop;
      doc.style.transform = `translateY(${GUIDE_Y - top}px)`;
      void doc.offsetHeight;
      slot.style.transition = '';
      return GUIDE_Y - top;
    };

    ambient(demo, {
      still: () => {
        const y = rest();
        slot.style.height = `${DEMO_SHIFT}px`;
        doc.style.transform = `translateY(${y - DEMO_SHIFT}px)`;
        demo.dataset.state = 'after';
        say('The line stayed where it was');
      },
      run: async (beat) => {
        const y = rest();
        demo.dataset.state = 'before';
        say('Reading, part way down the page');
        await beat(1600);

        // the two halves of the correction run together, on the same curve
        demo.dataset.state = 'loading';
        doc.style.transition = 'transform 0.5s var(--ease-out)';
        slot.style.height = `${DEMO_SHIFT}px`;
        doc.style.transform = `translateY(${y - DEMO_SHIFT}px)`;
        say(`An image loads above it \u2014 ${DEMO_SHIFT}\u2009px of new page`);
        await beat(900);

        demo.dataset.state = 'after';
        say(`Scroll corrected by the same ${DEMO_SHIFT}\u2009px`);
        await beat(1500);

        say('The line you were reading never moved');
        await beat(3000);
      },
    });
  }

  // --------------------------------------------------------------- undo demo

  // A real stack: every action pushes an entry that knows how to reverse
  // itself, and the key pops the top one and runs it. The list on the right is
  // that array, rendered.
  function initUndoDemo() {
    const demo = $('[data-demo="undo"]');
    if (!demo) return;

    const list = $('.udemo-list', demo);
    const stackEl = $('.udemo-stack', demo);
    const key = $('.udemo-key', demo);
    const step = $('.udemo-step', demo);
    const hand = pointerFor(demo);
    const START = list.innerHTML;

    const say = (s) => {
      step.textContent = s;
    };

    let stack = [];

    const paintStack = () => {
      stackEl.innerHTML = stack
        .map(
          (e, i) => `<li class="udemo-entry${i === 0 ? ' is-next' : ''}">
            ${i === 0 ? icon('undo', 'udemo-entry-i') : ''}${e.label}
          </li>`
        )
        .join('');
      demo.dataset.stack = String(stack.length);
    };

    const push = (label, undo) => {
      stack.unshift({ label, undo });
      paintStack();
    };

    const row = (id) => $(`.udemo-row[data-id="${id}"]`, demo);

    // the three actions, each paired with the step that reverses it
    const remove = (id) => {
      const el = row(id);
      const before = el.nextElementSibling;
      const name = $('.udemo-nt', el).textContent;
      el.classList.add('going');
      setTimeout(() => el.remove(), 220);
      push(`Deleted &ldquo;${name}&rdquo;`, () => {
        el.classList.remove('going');
        list.insertBefore(el, before);
      });
    };

    const moveUp = (id) => {
      const el = row(id);
      const prev = el.previousElementSibling;
      const name = $('.udemo-nt', el).textContent;
      list.insertBefore(el, prev);
      el.classList.add('moved');
      setTimeout(() => el.classList.remove('moved'), 500);
      push(`Moved &ldquo;${name}&rdquo; up`, () => list.insertBefore(el, prev.nextElementSibling));
    };

    const markDone = (id) => {
      const el = row(id);
      const name = $('.udemo-nt', el).textContent;
      el.classList.add('is-done');
      push(`Marked &ldquo;${name}&rdquo; done`, () => el.classList.remove('is-done'));
    };

    const undoOne = async (beat) => {
      if (!stack.length) return;
      key.classList.add('down');
      await beat(180);
      const entry = stack.shift();
      entry.undo();
      paintStack();
      await beat(160);
      key.classList.remove('down');
      await beat(420);
    };

    ambient(demo, {
      still: () => {
        list.innerHTML = START;
        stack = [];
        paintStack();
        markDone(3);
        say('Every action leaves something to undo');
      },
      run: async (beat) => {
        list.innerHTML = START;
        stack = [];
        paintStack();
        say('Watching');
        await beat(900);

        await hand.tap(row(1), beat, () => {
          remove(1);
          say('Deleted \u2014 one entry on the stack');
        });
        await beat(700);

        await hand.tap(row(3), beat, () => {
          moveUp(3);
          say('Moved \u2014 two');
        });
        await beat(700);

        await hand.tap(row(0), beat, () => {
          markDone(0);
          say('Changed \u2014 three');
        });
        await hand.park(beat);
        await beat(1200);

        say('\u2318Z takes the top entry off and reverses it');
        await undoOne(beat);
        await beat(600);
        await undoOne(beat);
        await beat(600);
        await undoOne(beat);

        say('Back to where it started, with nothing confirmed on the way');
        await beat(2800);
      },
    });
  }

  // ------------------------------------------------------------- github graph

  const GH_CACHE = 'gh-contrib-cache';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  const LEVEL_NAMES = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];

  // The API hands back one flat list of days; the painter wants columns of
  // weeks starting on Sunday, with GitHub's own field names.
  function normaliseGitHub(raw) {
    const days = (raw && raw.contributions) || [];
    if (!days.length) throw new Error('unexpected shape');

    const weeks = [];
    let week = [];
    days.forEach((d) => {
      const dow = new Date(d.date + 'T00:00:00').getDay();
      if (dow === 0 && week.length) {
        weeks.push(week);
        week = [];
      }
      week.push({
        date: d.date,
        contributionCount: d.count || 0,
        contributionLevel: LEVEL_NAMES[d.level] || 'NONE',
      });
    });
    if (week.length) weeks.push(week);

    // the year rarely starts on a Sunday, so the first column is short. Pad it
    // at the top with blanks, otherwise every cell in it sits one or more rows
    // too high and the whole first week reads against the wrong weekday.
    if (weeks.length) {
      const firstDow = new Date(weeks[0][0].date + 'T00:00:00').getDay();
      for (let i = 0; i < firstDow; i++) weeks[0].unshift(null);
    }

    const total = (raw.total && (raw.total.lastYear ?? Object.values(raw.total)[0])) || 0;
    return { contributions: weeks, totalContributions: total };
  }

  function paintGitHub(data, cached) {
    const el = $('#gh');
    if (!el) return;

    // The API returns an array of weeks; each week is an array of day objects.
    const weeks = (data.contributions || []).filter((w) => Array.isArray(w) && w.length);
    if (!weeks.length) throw new Error('unexpected shape');

    const total = data.totalContributions || 0;

    // one label per month, placed on the column where that month first appears
    let months = '';
    let last = -1;
    weeks.forEach((w, col) => {
      const first = w.find(Boolean);
      if (!first) return;
      const d = new Date(first.date + 'T00:00:00');
      if (d.getMonth() !== last) {
        months += `<span style="grid-column-start:${col + 1}">${MONTHS[d.getMonth()]}</span>`;
        last = d.getMonth();
      }
    });

    // emitted row-major (a weekday at a time) rather than column-major, so the
    // grid can flow by row and let each row take its height from the cells'
    // aspect-ratio — that is what lets the columns be 1fr and fill the card.
    const cell = (d) => {
      if (!d) return `<div class="gh-cell gh-pad"></div>`;
      const lvl = LEVELS[d.contributionLevel] ?? 0;
      const n = d.contributionCount || 0;
      const date = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const tip = n === 0 ? `No contributions on ${date}` : `${n} contribution${n > 1 ? 's' : ''} on ${date}`;
      return `<div class="gh-cell" data-l="${lvl}" data-tip="${esc(tip)}"></div>`;
    };

    let cells = '';
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < weeks.length; col++) cells += cell(weeks[col][row]);
    }

    const cols = `grid-template-columns:repeat(${weeks.length},1fr)`;

    el.innerHTML = `
      <div class="gh-scroll">
        <div class="gh-wrap">
          <div class="gh-months" style="${cols}">${months}</div>
          <div class="gh-body">
            <div class="gh-days"><span>Mon</span><span>Wed</span><span>Fri</span></div>
            <div class="gh-grid" style="${cols}">${cells}</div>
          </div>
        </div>
      </div>
      <div class="gh-foot">
        <span class="gh-stat"><strong>${total.toLocaleString()}</strong> contributions in the last year</span>
        <span class="gh-cached">${cached ? 'Showing cached data, as GitHub is unreachable right now.' : ''}</span>
        <span class="gh-legend">
          Less
          ${[0, 1, 2, 3, 4].map((l) => `<span class="gh-cell" data-l="${l}"></span>`).join('')}
          More
        </span>
      </div>`;

    // tooltip
    const tip = $('#gh-tip');
    $$('.gh-grid .gh-cell', el).forEach((c) => {
      c.addEventListener('mouseenter', () => {
        tip.textContent = c.dataset.tip;
        const r = c.getBoundingClientRect();
        tip.style.left = `${r.left + r.width / 2}px`;
        tip.style.top = `${r.top}px`;
        tip.classList.add('on');
      });
      c.addEventListener('mouseleave', () => tip.classList.remove('on'));
    });
  }

  function renderGitHub() {
    const el = $('#gh');
    if (!el || !PROFILE.github) return;

    // 1. paint from cache immediately if we have it, so the graph never flashes empty
    let cache = null;
    try {
      cache = JSON.parse(localStorage.getItem(GH_CACHE) || 'null');
    } catch {
      /* corrupt cache: ignore */
    }
    if (cache?.data) {
      try {
        paintGitHub(cache.data, false);
      } catch {
        cache = null;
      }
    }

    // 2. always revalidate in the background
    fetch(`https://github-contributions-api.jogruber.de/v4/${PROFILE.github}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((raw) => {
        const data = normaliseGitHub(raw);
        paintGitHub(data, false);
        try {
          localStorage.setItem(GH_CACHE, JSON.stringify({ ts: Date.now(), data }));
        } catch {
          /* quota: the graph still works, it just won't survive a reload */
        }
      })
      .catch(() => {
        if (cache?.data) {
          paintGitHub(cache.data, true); // stale is much better than nothing
          return;
        }
        el.innerHTML = `<div class="gh-skel">
          Couldn't load contributions.
          <a href="https://github.com/${esc(PROFILE.github)}" target="_blank" rel="noopener"
             style="color:var(--accent);font-weight:600">View profile on GitHub →</a>
        </div>`;
      });
  }

  // ------------------------------------------------------------- search palette

  let palIndex = 0;
  let palItems = [];

  const searchable = () => [
    { name: 'Index', desc: 'All products', path: '', icon: 'home' },
    { name: 'UX Findings', desc: 'Findings, teardowns and notes', path: 'findings', icon: 'book' },
    // { name: 'Graphic Design', desc: 'Posters and print work', path: 'graphics', icon: 'image' },  — hidden for now
    { name: 'About', desc: 'Experience, education, clients', path: 'about', icon: 'home' },
    { name: 'Contact', desc: 'Get in touch', path: 'contact', icon: 'mail' },
    ...PROJECTS.map((p) => ({ name: p.name, desc: p.summary, path: `docs/${p.slug}`, icon: p.icon, tag: p.tag })),
    ...DESIGNS.map((d) => ({ name: d.name, desc: d.summary, path: `designs/${d.slug}`, icon: d.icon, tag: d.tag })),
    ...FINDINGS.map((f) => ({
      name: f.title,
      desc: f.summary || '',
      path: `findings/${f.slug}`,
      icon: f.icon || 'book',
      tag: f.kind || f.category || '',
    })),
  ];

  function paintPalette(q = '') {
    const needle = q.toLowerCase().trim();
    palItems = searchable().filter(
      (it) =>
        !needle ||
        it.name.toLowerCase().includes(needle) ||
        it.desc.toLowerCase().includes(needle) ||
        (it.tag || '').toLowerCase().includes(needle)
    );
    palIndex = 0;
    const res = $('#pal-res');
    if (!palItems.length) {
      res.innerHTML = `<div class="pal-empty">No products match “${esc(q)}”</div>`;
      return;
    }
    res.innerHTML = palItems
      .map(
        (it, i) => `<div class="pal-item" role="option" aria-selected="${i === 0}" data-i="${i}">
          <span class="pal-ico">${icon(it.icon)}</span>
          <span class="pal-item-name">${esc(it.name)}</span>
          <span class="pal-item-desc">${esc(it.desc)}</span>
          ${it.tag ? `<span class="pal-item-tag">${esc(it.tag)}</span>` : ''}
        </div>`
      )
      .join('');
  }

  const movePal = (d) => {
    if (!palItems.length) return;
    palIndex = (palIndex + d + palItems.length) % palItems.length;
    $$('.pal-item').forEach((el, i) => el.setAttribute('aria-selected', i === palIndex));
    $$('.pal-item')[palIndex]?.scrollIntoView({ block: 'nearest' });
  };

  const choosePal = () => {
    const it = palItems[palIndex];
    if (!it) return;
    closePalette();
    go(it.path);
  };

  function openPalette() {
    $('#pal-bg').classList.add('on');
    $('#pal-input').value = '';
    paintPalette('');
    $('#pal-input').focus();
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    $('#pal-bg').classList.remove('on');
    document.body.style.overflow = '';
  }

  // ------------------------------------------------------------- mobile drawer

  const openNav = () => {
    $('#sidebar').classList.add('open');
    $('#scrim').classList.add('on');
    $('#menu-btn').setAttribute('aria-expanded', 'true');
  };
  const closeNav = () => {
    $('#sidebar').classList.remove('open');
    $('#scrim').classList.remove('on');
    $('#menu-btn').setAttribute('aria-expanded', 'false');
  };

  // ------------------------------------------------------------- progress bar

  const updateProgress = () => {
    const bar = $('#progress');
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    if (max < 200 || currentPath() === '') {
      bar.classList.remove('on');
      return;
    }
    bar.classList.add('on');
    bar.style.transform = `scaleX(${Math.min(1, doc.scrollTop / max)})`;
  };

  function viewDocSubPage(p, title, blocks) {

    $('#view').innerHTML = `
      <div class="view">
        <article class="doc-article read-doc">
          <header class="doc-head">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="${href('')}" data-link>Index</a>
              ${icon('chevronRight')}
              <a href="${href(`docs/${p.slug}`)}" data-link>${esc(p.name)}</a>
              ${icon('chevronRight')}
              <span style="color:var(--text)">${esc(title)}</span>
            </nav>
            <h1 class="doc-h1">${esc(title)}</h1>
            <p class="doc-lede">Legal documentation for ${esc(p.name)}.</p>
          </header>

          <div class="prose read-prose">${renderBlocks(blocks)}</div>
        </article>
      </div>`;

    renderTOC(p);
    initCopy();
    initZoom();
  }

  // ------------------------------------------------------------- render

  function render() {
    let path = currentPath();

    // /projects was renamed to /products. Netlify 301s the real request, but
    // an in-app link or a back/forward entry can still land here, so swap it
    // and rewrite history rather than rendering a 404.
    if (path === 'projects' || path.startsWith('projects/')) {
      path = 'products' + path.slice('projects'.length);
      history.replaceState(null, '', href(path));
    }

    // /writings was renamed to /findings, article slugs unchanged. Same reason
    // as above: Netlify 301s a real request, this catches in-app history.
    if (path === 'writings' || path.startsWith('writings/')) {
      path = 'findings' + path.slice('writings'.length);
      history.replaceState(null, '', href(path));
    }

    // /hire was folded into /contact. Netlify 301s a real request; this catches
    // a link already in someone's history or a bookmark.
    if (path === 'hire') {
      path = 'contact';
      history.replaceState(null, '', href(path));
    }

    // /exploring is gone — its toolkit is the Tools row on /about. Netlify
    // 301s a real request; this catches in-app history the same way.
    if (path === 'exploring') {
      path = 'about';
      history.replaceState(null, '', href(path));
    }

    closeNav();
    asyncToken++;

    // no page carries the library sidebar any more: a case study is a document,
    // and the list of every other case study beside it was competing with it.
    // The same list is still the mobile drawer, which is where it earns itself.
    document.body.classList.remove('with-sidebar');

    // topnav active state
    const navKey = path.startsWith('designs') ? 'designs'
      : path.startsWith('case-studies') ? 'case-studies'
      : path.startsWith('docs/') || path === 'products' ? 'products'
      : path.startsWith('findings') ? 'findings'
      : path === 'graphics' ? 'graphics'
      : path === 'about' ? 'about'
      : '';
    $$('.topnav a').forEach((a) => a.classList.toggle('active', a.dataset.nav === navKey));

    // what the page is about, for applySeo() at the bottom of this function
    let seoEntry = null;
    let seoKind = '';

    if (path === '' || path === 'index.html') {
      viewHome();
    } else if (path === 'contact') {
      viewContact();
    } else if (path === 'about') {
      whenLoaded(() => pageReady('about'), viewAbout, 'About');
    } else if (path === 'graphics') {
      whenLoaded(() => pageReady('graphics'), viewGraphics, 'Graphic Design');
    } else if (path === 'designs') {
      viewDirectory(DESIGNS, 'designs');
    } else if (path === 'case-studies') {
      viewDirectory(CASE_STUDIES, 'case-studies');
    } else if (path === 'products') {
      viewDirectory(PROJECTS, 'docs');
    } else if (path === 'building') {
      viewNotFound();
    } else if (path === 'findings') {
      viewFindings();
    } else if (path.startsWith('findings/')) {
      const slug = path.slice('findings/'.length);
      const f = FINDINGS.find((x) => x.slug === slug);
      seoEntry = f; seoKind = 'finding';
      f ? whenLoaded(() => bodyReady(f), () => viewFinding(f), f.title) : viewNotFound();
    } else if (path.startsWith('docs/')) {
      const parts = path.slice(5).split('/');
      const slug = parts[0];
      const sub = parts[1];
      const p = bySlug(slug);
      if (!sub) { seoEntry = p; seoKind = 'product'; }
      if (!p) {
        viewNotFound();
      } else if (!sub) {
        whenLoaded(() => bodyReady(p), () => viewDoc(p), shortName(p));
      } else if (sub === 'privacy' || sub === 'terms') {
        seoEntry = p; seoKind = sub === 'privacy' ? 'privacy' : 'terms';
        // the legal pages live in the same body file as the case study, so the
        // body has to be here before we can tell whether they exist at all
        whenLoaded(
          () => bodyReady(p),
          () => {
            const blocks = sub === 'privacy' ? p.privacyBlocks : p.termsBlocks;
            if (!blocks) return viewNotFound();
            viewDocSubPage(p, sub === 'privacy' ? 'Privacy Policy' : 'Terms of Service', blocks);
          },
          sub === 'privacy' ? 'Privacy Policy' : 'Terms of Service'
        );
      } else {
        viewNotFound();
      }
    } else if (path.startsWith('case-studies/')) {
      const slug = path.slice('case-studies/'.length);
      const c = CASE_STUDIES.find((x) => x.slug === slug);
      seoEntry = c; seoKind = 'caseStudy';
      c
        ? whenLoaded(() => bodyReady(c), () => viewDoc(c, CASE_STUDIES, 'case-studies'), shortName(c))
        : viewNotFound();
    } else if (path.startsWith('designs/')) {
      const slug = path.slice('designs/'.length);
      const d = designBySlug(slug);
      seoEntry = d; seoKind = 'design';
      d ? whenLoaded(() => bodyReady(d), () => viewDoc(d, DESIGNS, 'designs'), shortName(d)) : viewNotFound();
    } else {
      viewNotFound();
    }

    renderNav();
    window.scrollTo(0, 0);
    applySeo(path, seoEntry, seoKind);
    if (window.trackPage) window.trackPage(path);
    afterRender();
  }

  // everything that has to run against freshly painted markup. Called once per
  // navigation, and again when a lazily loaded view swaps in over its
  // skeleton. All of it is idempotent.
  function afterRender() {
    updateProgress();
    initImageFade($('#view'));
    animateHeading($('#view h1'));
    initReveal();
    if (window.MeshGradient) window.MeshGradient.scan();
  }

  // True while the markup in #view is the prerendered HTML for the URL we are
  // rendering — which is the case exactly once, on the first paint after a
  // real page load. The attribute is cleared the moment it is read, so any
  // later navigation to the same path behaves normally.
  function hasPrerender() {
    const view = $('#view');
    if (!view) return false;
    const baked = view.getAttribute('data-prerendered');
    if (baked === null || baked !== currentPath()) return false;
    view.removeAttribute('data-prerendered');
    return true;
  }

  // ---- lazy route helpers
  //
  // A detail page cannot paint until its body file has arrived, so it shows a
  // skeleton of the right shape immediately and swaps in the real view when
  // the body lands. `asyncToken` guards against a slow load painting over a
  // page the visitor has since navigated to.
  function whenLoaded(load, paint, describe) {
    const ready = load();
    if (ready.settled) return paint();
    const token = asyncToken;
    // The page was served as prerendered HTML and this is the first render on
    // it, so the real content is already on screen. Replacing it with a
    // skeleton while the body file arrives would be a step backwards for the
    // visitor and would throw away the LCP the static paint just earned.
    const baked = hasPrerender();
    if (!baked) paintSkeleton(describe);
    afterRender();
    ready
      .then(() => {
        if (token !== asyncToken) return;
        paint();
        afterRender();
      })
      .catch(() => {
        if (token !== asyncToken) return;
        // on a prerendered page the article is already on screen and correct;
        // replacing it with a retry prompt because the body file failed would
        // be trading a working page for a broken one
        if (!baked) paintLoadError(describe);
        afterRender();
      });
  }

  // resolved-already promises let a cached entry paint synchronously, with no
  // skeleton frame in between
  const settled = (v) => {
    const p = Promise.resolve(v);
    p.settled = true;
    return p;
  };

  const bodyReady = (entry) => (entry.blocks ? settled(entry) : loadBody(entry));
  const pageReady = (key) => (PAGE_DATA[key] ? settled(PAGE_DATA[key]) : loadPage(key, PAGE_SRC[key]));

  // a grey stand-in the size of the page that is coming, so the layout does
  // not jump when the real thing arrives
  function paintSkeleton(title) {
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <article class="doc-article" aria-busy="true">
          <header class="doc-head">
            <h1 class="doc-h1"><span>${esc(title || 'Loading')}</span></h1>
          </header>
          <div class="skeleton">
            <span class="sk-line" style="width:92%"></span>
            <span class="sk-line" style="width:86%"></span>
            <span class="sk-line" style="width:64%"></span>
            <span class="sk-figure"></span>
            <span class="sk-line" style="width:90%"></span>
            <span class="sk-line" style="width:72%"></span>
          </div>
        </article>
      </div>`;
  }

  function paintLoadError(title) {
    $('#view').innerHTML = `
      <div class="view">
        <article class="doc-article">
          <header class="doc-head">
            <h1 class="doc-h1"><span>${esc(title || 'This page')}</span></h1>
            <p class="doc-lede">This page could not be loaded. It may be a connection problem, and reloading usually fixes it.</p>
          </header>
          <p><a class="btn btn-secondary" href="${href('')}" data-link>Back to the index</a></p>
        </article>
      </div>`;
  }

  // ------------------------------------------------------------- reveal

  // fades grid items and big blocks up as they scroll into view, with a
  // small stagger inside each row
  let revealObserver = null;

  function initReveal() {
    if (reduceMotion() || !('IntersectionObserver' in window)) return;
    revealObserver?.disconnect();
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('revealed');
          revealObserver.unobserve(en.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    const els = $$(
      '.acard, .pcard-wrap, .show-card, .news-item, .banner, .launch, .tool-pill, .tl-item',
      $('#view')
    );
    const vh = window.innerHeight || 800;
    els.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${(i % 4) * 60}ms`);
      // anything already on screen reveals straight away — the observer only
      // handles what's still below the fold (and can't be trusted to fire in
      // prerendered/hidden tabs)
      if (el.getBoundingClientRect().top < vh) {
        // setTimeout, not rAF: rAF never fires in hidden/prerendered tabs
        setTimeout(() => el.classList.add('revealed'), 30);
      } else {
        revealObserver.observe(el);
      }
    });
  }

  // ------------------------------------------------------------- directories

  // /designs and /case-studies are laid out like an articles page (image
  // cards); /products like a products page (tall cards, name below). All of
  // them open with the category pills, then the groups under mono labels.
  function viewDirectory(items, basePath) {
    const isProducts = basePath === 'docs';
    const isCases = basePath === 'case-studies';
    // article cards for everything that is not a product
    const isArticles = !isProducts;
    // the copy key stays 'projects': the route and labels were renamed to
    // Products, the PAGE_COPY key in data.js was left alone
    const copy = PAGECOPY(isProducts ? 'projects' : isCases ? 'caseStudies' : 'designs');
    const title = cms(copy.title, isProducts ? 'Products' : isCases ? 'Case Studies' : 'Designs');
    const lede = cms(
      copy.lede,
      isProducts
        ? 'Figma plugins, browser extensions, and network tools, designed, built, and shipped for real users.'
        : isCases
        ? 'Longer write-ups of the work: the problem, the decisions, and what shipped.'
        : 'Onboarding flows, paywalls, and full products. Every case study is backed by a real, running app.'
    );


    const groups = isProducts
      ? groupBy(items, (p) => p.group || 'Products')
      : isCases
      ? groupBy(items, (c) => c.category || 'Case Studies')
      : groupBy(items, (d) => d.category || 'Design', ['Onboarding', 'Paywalls', 'Mobile App', 'Web']);

    const card = isCases ? caseStudyCard : designCard;
    const grid = (g) =>
      isArticles
        ? `<div class="acard-grid">${g.items.map(card).join('')}</div>`
        : `<div class="pcard-grid">${g.items.map(projectCard).join('')}</div>`;

    const pills = groups
      .map(
        (g) => `
        <a class="cat-pill" href="#g-${slugify(g.name)}" data-scrollto="g-${slugify(g.name)}">
          ${esc(g.name)} <span class="count">${g.items.length}</span>
        </a>`
      )
      .join('');

    $('#view').innerHTML = `
      <div class="view">
        <header class="page-head">
          <h1 class="page-h1">${esc(title)}</h1>
          <p class="page-lede">${esc(lede)}</p>
        </header>

        <div class="cat-row">${pills}</div>

        <div class="dir-list">
          ${groups
            .map(
              (g) => `
            <div class="group-head" id="g-${slugify(g.name)}">
              <h2 class="group-title">${esc(g.name)}</h2>
              <span class="group-count">${g.items.length} ${
                isProducts
                  ? g.items.length === 1 ? 'product' : 'products'
                  : g.items.length === 1 ? 'case study' : 'case studies'
              }</span>
            </div>
            ${grid(g)}`
            )
            .join('')}
        </div>
      </div>`;

    // category pills scroll to their group
    $$('#view [data-scrollto]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(a.dataset.scrollto)?.scrollIntoView({
          behavior: reduceMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  }

  // ------------------------------------------------------------- graphics

  // Posters and other flat graphic work. Purely a showcase: a grid of images
  // that open in the lightbox, grouped by category when one is set.
  function viewGraphics() {
    const copy = PAGECOPY('graphics');
    const title = cms(copy.title, 'Graphic Design');
    const lede = cms(copy.lede, 'Posters and print work, made for clients and for the fun of it.');


    // a poster without artwork has nothing to show, so it stays in the list in
    // pages/graphics.js as a placeholder for its file and is skipped here
    const posters = (PAGE_DATA.graphics || []).filter((p) => p.src);
    const groups = groupBy(posters, (p) => p.category || '');

    const card = (p) => `
      <button class="poster" type="button" data-zoom aria-label="${esc(p.title || 'Open poster')}">
        <span class="poster-frame"><img src="${esc(p.src)}" alt="${esc(p.title || '')}" loading="lazy"></span>
        ${p.title ? `<p class="poster-title">${esc(p.title)}</p>` : ''}
        <span class="poster-meta">${esc([p.client, p.year].filter(Boolean).join(' · '))}</span>
      </button>`;

    $('#view').innerHTML = `
      <div class="view">
        <header class="page-head">
          <h1 class="page-h1">${esc(title)}</h1>
          <p class="page-lede">${esc(lede)}</p>
        </header>

        ${
          posters.length
            ? groups
                .map(
                  (g) => `
            ${
              g.name
                ? `<div class="group-head">
                     <h2 class="group-title">${esc(g.name)}</h2>
                     <span class="group-count">${g.items.length} ${g.items.length === 1 ? 'piece' : 'pieces'}</span>
                   </div>`
                : ''
            }
            <div class="poster-grid" style="margin-top:28px">${g.items.map(card).join('')}</div>`
                )
                .join('')
            : `<div class="strip"><span class="mono-label">Nothing here yet</span></div>
               <p class="page-lede" style="padding:24px 0">
                 Posters listed in pages/graphics.js appear here once they have artwork.
               </p>`
        }
      </div>`;

    initZoom();
  }

  // ------------------------------------------------------------- findings

  // Articles — findings, teardowns, notes. A record in data.js, a body in
  // findings/<slug>.js, rendered through the same block DSL as a case study.
  // The grid is the designs grid: same card, same size as a product.
  function viewFindings() {
    const copy = PAGECOPY('findings');
    const title = cms(copy.title, 'UX Findings');
    const lede = cms(copy.lede, 'Findings, teardowns and notes from designing and building things.');

    $('#toc').innerHTML = '';

    const items = FINDINGS.filter((f) => f && f.slug);
    // findings group by theme rather than by surface, in a fixed reading order
    const groups = groupBy(items, (w) => w.category || '', [
      'Anticipation',
      'Feedback',
      'Recovery',
      'Continuity',
      'Friction',
    ]);
    const grouped = groups.length > 1 || (groups[0] && groups[0].name);

    const pills = grouped
      ? groups
          .map(
            (g) => `
        <a class="cat-pill" href="#g-${slugify(g.name || 'finding')}" data-scrollto="g-${slugify(g.name || 'finding')}">
          ${esc(g.name || 'Finding')} <span class="count">${g.items.length}</span>
        </a>`
          )
          .join('')
      : '';

    const body = items.length
      ? `
        ${pills ? `<div class="cat-row">${pills}</div>` : ''}
        <div class="dir-list">
          ${groups
            .map(
              (g) => `
            ${
              grouped
                ? `<div class="group-head" id="g-${slugify(g.name || 'finding')}">
                     <h2 class="group-title">${esc(g.name || 'Finding')}</h2>
                     <span class="group-count">${g.items.length} ${g.items.length === 1 ? 'article' : 'articles'}</span>
                   </div>`
                : ''
            }
            <div class="acard-grid">${g.items.map(findingCard).join('')}</div>`
            )
            .join('')}
        </div>`
      : `<div class="strip"><span class="mono-label">Nothing here yet</span></div>
         <p class="page-lede" style="padding:24px 0">Findings added to data.js will appear here.</p>`;

    $('#view').innerHTML = `
      <div class="view">
        <header class="page-head">
          <h1 class="page-h1">${esc(title)}</h1>
          <p class="page-lede">${esc(lede)}</p>
        </header>
        ${body}
      </div>`;

    // category pills scroll to their group
    $$('#view [data-scrollto]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(a.dataset.scrollto)?.scrollIntoView({
          behavior: reduceMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
      });
    });
  }

  function viewFinding(f) {

    const i = FINDINGS.indexOf(f);
    const prev = FINDINGS[i - 1];
    const next = FINDINGS[i + 1];
    const kicker = [f.kind, f.category, f.date].filter(Boolean).join(' · ');

    // The lede is meant to be one standfirst line. If a whole article ends up
    // in it, blank-line-separated, it would otherwise render as one run-on
    // paragraph — so the first paragraph stays the lede and the rest falls
    // through into the body above the blocks. A one-paragraph lede is
    // unaffected, and a proper `blocks` body still leads.
    const ledeParts = (f.lede || '').split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
    const lede = ledeParts[0] || '';
    const spill = ledeParts.slice(1);

    $('#view').innerHTML = `
      <div class="view">
        <article class="doc-article read-doc">
          <header class="doc-head">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="${href('')}" data-link>Index</a>
              ${icon('chevronRight')}
              <a href="${href('findings')}" data-link>UX Findings</a>
            </nav>
            <h1 class="doc-h1"><span>${esc(f.title || '')}</span></h1>
            ${kicker ? `<div class="doc-kicker mono-label">${esc(kicker)}</div>` : ''}
            ${lede ? `<p class="doc-lede">${lede}</p>` : ''}
          </header>

          <div class="prose read-prose">${spill.map((x) => `<p>${x}</p>`).join('')}${renderBlocks(f.blocks || [])}</div>

          ${
            f.sourceUrl
              ? `<div class="doc-footer-links">
                   <a class="doc-footer-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener">${esc(
                  f.sourceLabel || 'Source'
                )}</a>
                 </div>`
              : ''
          }

          <nav class="page-nav" aria-label="Pagination">
            ${
              prev
                ? `<a class="page-nav-link prev" href="${href(`findings/${prev.slug}`)}" data-link>
                     <span class="page-nav-dir">${icon('chevronLeft')} Previous</span>
                     <span class="page-nav-name">${esc(prev.title || '')}</span>
                   </a>`
                : '<span></span>'
            }
            ${
              next
                ? `<a class="page-nav-link next" href="${href(`findings/${next.slug}`)}" data-link>
                     <span class="page-nav-dir">Next ${icon('chevronRight')}</span>
                     <span class="page-nav-name">${esc(next.title || '')}</span>
                   </a>`
                : ''
            }
          </nav>
        </article>
      </div>`;

    $('#toc').innerHTML = '';
    renderTOC();
    initCopy();
    initZoom();
    initCurrencyDemo();
    initDeleteDemo();
    initStruggleDemo();
    initBatchDemo();
    initResumeDemo();
    initSearchDemo();
    initZoomDemo();
    initNextDemo();
    initRetryDemo();
    initPayDemo();
    initWaitDemo();
    initPrefetchDemo();
    initHumanDemo();
    initAnchorDemo();
    initUndoDemo();
  }

  // A tool is either a plain name or { name, icon }, where `icon` is a file in
  // /images/tools/ — the product's own mark, so the row reads as real software
  // rather than a list of words.
  const toolPill = (t) => {
    const name = typeof t === 'string' ? t : t.name;
    const ico = typeof t === 'string' ? '' : t.icon;
    return `<span class="skill-pill tool-pill">${
      ico
        ? `<img class="tool-pill-ico" src="/images/tools/${esc(ico)}.png" alt="" width="20" height="20" loading="lazy" decoding="async">`
        : ''
    }${esc(name)}</span>`;
  };

  function viewAbout() {
    // shadows nothing: the About data lives in pages/about.js and only exists
    // once that file has been fetched
    const ABOUT = PAGE_DATA.about || {};
    $('#toc').innerHTML = '';

    // doubled below so the marquee can loop seamlessly
    const clientLogos = CLIENTS.map(
      (c) =>
        `<img src="${esc(clientSrc(c))}" alt="${esc(c.name)}" title="${esc(c.name)}"${
          c.scale ? ` style="--s:${Number(c.scale)}"` : ''
        } loading="lazy">`
    ).join('');

    // Experience and education read as a dated timeline: the years sit in their
    // own rail on the left, and a node on the hairline marks each entry. The
    // role still in progress gets the filled node — `meta` ending in "Present"
    // is the only signal, so nothing has to be flagged in the data.
    const isNow = (it) => /present\s*$/i.test(it.meta || '');

    const row = (it) => `
      <li class="tl-item${isNow(it) ? ' is-now' : ''}">
        <span class="tl-when">${esc(it.meta || '')}</span>
        <span class="tl-rail" aria-hidden="true"></span>
        <div class="tl-body">
          <h3 class="tl-title">${esc(it.title)}</h3>
          <span class="tl-org">${esc(it.org)}</span>
          ${it.note ? `<p class="tl-note">${esc(it.note)}</p>` : ''}
        </div>
      </li>`;

    const timeline = (items) => `<ol class="tl">${items.map(row).join('')}</ol>`;

    $('#view').innerHTML = `
      <div class="view">
        <section class="about-hero">
          <div class="about-hero-copy">
            <span class="mono-label">About${ABOUT.location ? ` · ${esc(ABOUT.location)}` : ''}</span>
            <h1>${esc(ABOUT.name)}</h1>
            <p class="about-role">${esc(PROFILE.role)}</p>
            <p class="about-bio">${ABOUT.bio}</p>
          </div>
        </section>

        <div class="stat-card gcard gcard-live grad-5">
          <div class="stat"><span class="stat-v">${esc(cms(ABOUT.stat1Value, '30+'))}</span><span class="stat-l">${esc(cms(ABOUT.stat1Label, 'Clients worked with'))}</span></div>
          <div class="stat"><span class="stat-v">${esc(cms(ABOUT.stat2Value, '500+'))}</span><span class="stat-l">${esc(cms(ABOUT.stat2Label, 'Design students mentored'))}</span></div>
          <div class="stat"><span class="stat-v">${PROJECTS.length}</span><span class="stat-l">Products designed, built and shipped</span></div>
        </div>

        <section class="home-sec">
          <div class="strip">
            <span class="mono-label">Clients</span>
            <span class="mono-label">A few of the 30+</span>
          </div>
          <div class="logo-marquee" aria-label="Client logos">
            <div class="logo-track">${clientLogos}${clientLogos}</div>
          </div>
        </section>

        ${
          ABOUT.photo
            ? `<section class="home-sec">
                 <figure class="figure" style="margin:0">
                   <div class="frame" style="cursor:default">
                     <img src="${esc(ABOUT.photo.src)}" alt="${esc(ABOUT.photo.caption || '')}" loading="lazy">
                   </div>
                   ${ABOUT.photo.caption ? `<figcaption>${esc(ABOUT.photo.caption)}</figcaption>` : ''}
                 </figure>
               </section>`
            : ''
        }

        <section class="home-sec">
          <div class="sec-topline">
            <h2 class="sec-h">Experience</h2>
          </div>
          ${timeline(ABOUT.experience)}
        </section>

        <section class="home-sec">
          <div class="sec-topline">
            <h2 class="sec-h">Education</h2>
          </div>
          ${timeline(ABOUT.education)}
        </section>

        <section class="home-sec">
          <div class="sec-topline">
            <h2 class="sec-h">Skills</h2>
          </div>
          <div class="skill-row">
            ${ABOUT.skills.map((s) => `<span class="skill-pill">${esc(s)}</span>`).join('')}
          </div>

          ${
            ABOUT.tools && ABOUT.tools.length
              ? `<div class="strip" style="margin-top:44px">
                   <span class="mono-label">Tools</span>
                   <span class="mono-label">Day to day</span>
                 </div>
                 <div class="skill-row">${ABOUT.tools.map(toolPill).join('')}</div>`
              : ''
          }
        </section>

        <section class="home-sec">
          <div class="banner gcard gcard-live grad-2">
            <div class="banner-copy">
              <span class="mono-label">Next project</span>
              <h3>${esc(cms(ABOUT.ctaHeading, 'Want to work together?'))}</h3>
              <p>${esc(cms(ABOUT.ctaText, 'Tell me what you are building and where it is stuck. I will bring the design and the code.'))}</p>
              <a class="btn btn-light" href="${href('contact')}" data-link style="margin-top:22px">${esc(cms(ABOUT.ctaButton, 'Start a conversation'))}</a>
            </div>
          </div>
        </section>
      </div>`;
  }

  // The services, the process and the questions all live in the SEO object in
  // data.js, so this page, the prerendered copy of it and its FAQ schema say
  // the same thing. They used to have a page of their own at /hire; a sales
  // page sitting next to Contact was one page too many, and split the intent
  // across two URLs that both wanted the same visitor.
  const SERVICES = () => (typeof SEO !== 'undefined' && SEO.services) || [];
  const PROCESS = () => (typeof SEO !== 'undefined' && SEO.process) || [];
  const FAQ = () => (typeof SEO !== 'undefined' && SEO.faq) || [];

  function viewContact() {
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <div class="contact-grid">
          <div class="contact-intro">
            <span class="mono-label">${esc(cms(CONTACTCOPY().label, 'Contact'))}</span>
            <h1>${esc(cms(CONTACTCOPY().heading, 'Have something in mind? Say hello'))}</h1>
            <p>${esc(cms(CONTACTCOPY().text, 'Reach out for collaborations, project inquiries, or just to talk shop about onboarding, paywalls, and shipping things.'))}</p>

            <div class="contact-rows">
              <a href="mailto:${esc(EMAIL())}" class="contact-row">
                <span class="channel-ico">${icon('mail')}</span>
                <span class="channel-info">
                  <span class="channel-label">Email</span>
                  <span class="channel-value">${esc(EMAIL())}</span>
                </span>
                <span class="dir-go">${icon('arrowRight')}</span>
              </a>
              <a href="https://wa.me/${esc(WA())}" target="_blank" rel="noopener" class="contact-row">
                <span class="channel-ico">${icon('whatsapp')}</span>
                <span class="channel-info">
                  <span class="channel-label">WhatsApp</span>
                  <span class="channel-value">${esc(cms(CMS().whatsappLabel, '62384 17389'))}</span>
                </span>
                <span class="dir-go">${icon('arrowRight')}</span>
              </a>
            </div>

            <div class="contact-socials">
              ${PROFILE.links
                .map(
                  (l) =>
                    `<a class="icon-btn-c" href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}">${icon((l.label || '').toLowerCase())}</a>`
                )
                .join('')}
            </div>
          </div>

          <form class="contact-form form-card" id="contact-form">
            <div class="form-group">
              <label for="contact-name">Name</label>
              <input type="text" id="contact-name" name="name" required placeholder="Your name">
            </div>
            
            <div class="form-group">
              <label for="contact-email">Email</label>
              <input type="email" id="contact-email" name="email" required placeholder="you@example.com">
            </div>
            
            <div class="form-group">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="5" required placeholder="Tell me about your project..."></textarea>
            </div>
            
            <button class="cta" type="submit" style="width: 100%; justify-content: center; margin-top: 8px;">Send Message</button>
            <div class="form-status" id="form-status"></div>
          </form>
        </div>

        <section class="contact-work">
          <div class="sec-topline">
            <h2 class="sec-h">What I do</h2>
          </div>
          ${renderBlocks([{ t: 'cards', items: SERVICES() }])}
        </section>

        <section class="contact-work">
          <div class="sec-topline">
            <h2 class="sec-h">How a project runs</h2>
          </div>
          ${renderBlocks([{ t: 'steps', items: PROCESS() }])}
        </section>

        <section class="contact-work">
          <div class="sec-topline">
            <h2 class="sec-h">Questions</h2>
          </div>
          <div class="prose read-prose contact-faq">
            ${FAQ().map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
          </div>
        </section>
      </div>`;

    const form = $('#contact-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('#form-status');
      if (!status) return;

      status.className = 'form-status';
      status.textContent = 'Sending…';

      const formData = new FormData(form);
      formData.append('access_key', '09b72f4a-458d-47f1-8e83-1f8d118a6a64');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          status.innerHTML = `${icon('check')}<span>Thank you! Your message has been sent.</span>`;
          status.className = 'form-status success';
          if (window.track) window.track('contact_submit');
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = 'Something went wrong. Please try again.';
        status.className = 'form-status error';
      }
    });
  }

  function viewNotFound() {
    // paints late on the async routes, so it re-applies the head itself rather
    // than leaving a "Privacy Policy" title over a "Page not found" body
    applySeo(currentPath(), null, '');
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <header class="page-head">
          <h1 class="page-h1">Page not found</h1>
          <p class="page-lede">That page doesn't exist; it may have been renamed.</p>
        </header>
        <div class="hero-actions" style="padding-bottom:64px">
          <a class="btn btn-primary" href="${href('')}" data-link>Back to the index</a>
        </div>
      </div>`;
  }

  // ------------------------------------------------------------- boot

  // top promo banner: whatever SITE says, or the newest case study
  function renderPromo() {
    const bar = $('#promo-bar');
    const s = CMS();
    if (s.promoEnabled === false) {
      bar.style.display = 'none';
      return;
    }
    bar.style.display = '';
    const latest = DESIGNS[0];
    const text = cms(s.promoText, latest ? `${shortName(latest)}: ${noDash(latest.summary || '')}` : '');
    const url = cms(s.promoUrl, latest ? `designs/${latest.slug}` : '');
    if (!text) {
      bar.style.display = 'none';
      return;
    }
    bar.innerHTML = `
      <span class="promo-chip">${esc(cms(s.promoChip, 'New'))}</span>
      <span class="promo-text">${esc(text)}</span>
      ${url ? `<a class="promo-cta" href="${href(url)}" data-link>${esc(cms(s.promoCta, 'View'))}</a>` : ''}`;
  }

  function renderFooter() {
    const popular = [
      ...DESIGNS.slice(0, 2).map((d) => ({ label: shortName(d), path: `designs/${d.slug}` })),
      ...[...PROJECTS].sort((a, b) => (b.users || 0) - (a.users || 0)).slice(0, 3)
        .map((p) => ({ label: shortName(p), path: `docs/${p.slug}` })),
    ];

    $('#site-foot').innerHTML = `
      <div class="site-foot-in">
        <div class="foot-top">
          <div class="foot-id">
            <span class="brand-mark" style="background-image:url(${esc(PROFILE.avatar)})"></span>
            <p class="foot-tagline">${esc(cms(CMS().footerTagline, 'Onboarding flows, paywalls, and the tools behind them, designed and shipped by one person'))}</p>
            <div class="foot-quick">
              <a href="${href('designs')}" data-link>Explore the designs</a>
              <a href="${href('products')}" data-link>Browse products</a>
            </div>
          </div>

          <div class="foot-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="${href('designs')}" data-link>Designs</a></li>
              <li><a href="${href('case-studies')}" data-link>Case Studies</a></li>
              <li><a href="${href('products')}" data-link>Products</a></li>
              <li><a href="${href('findings')}" data-link>UX Findings</a></li>
              <li><a href="${href('graphics')}" data-link>Graphic Design</a></li>
              <li><a href="${href('about')}" data-link>About</a></li>
            </ul>
          </div>

          <div class="foot-col">
            <h4>Popular</h4>
            <ul>
              ${popular.map((it) => `<li><a href="${href(it.path)}" data-link>${esc(it.label)}</a></li>`).join('')}
            </ul>
          </div>

          <div class="foot-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="${href('contact')}" data-link>Contact</a></li>
              <li><a href="mailto:${esc(EMAIL())}">Email</a></li>
              <li><a href="https://wa.me/${esc(WA())}" target="_blank" rel="noopener">WhatsApp</a></li>
              <li><a href="https://github.com/${esc(PROFILE.github)}" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div class="foot-mid">
          <div class="icon-group">
            <span class="icon-row">
              ${PROFILE.links
                .map(
                  (l) =>
                    `<a class="icon-btn-c" href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}">${icon((l.label || '').toLowerCase())}</a>`
                )
                .join('')}
            </span>
          </div>
          <div class="icon-group">
            <span class="icon-row">
              <a class="icon-btn-c" href="mailto:${esc(EMAIL())}" aria-label="Email">${icon('mail')}</a>
              <a class="icon-btn-c" href="https://wa.me/${esc(WA())}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
            </span>
          </div>
        </div>

        <div class="foot-bottom">
          <span class="foot-note">© ${new Date().getFullYear()} ${esc(PROFILE.name)}. All rights reserved</span>
          <span class="foot-note">${esc(cms(CMS().footerNote, 'Designed and built by hand, no templates'))}</span>
        </div>
      </div>`;
  }

  function boot() {
    // topbar icons
    $('#menu-btn').innerHTML = icon('menu');
    $('#pal-icon').innerHTML = icon('search');
    $('#lb-close').innerHTML = icon('x');
    $('#brand-mark').style.backgroundImage = `url(${PROFILE.avatar})`;
    $('#brand-name').textContent = PROFILE.name;

    renderFooter();
    if (window.MeshGradient) window.MeshGradient.scan();

    renderPromo();

    // rounded favicon
    if (PROFILE.avatar) {
      const img = new Image();
      img.src = PROFILE.avatar;
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const x = c.getContext('2d');
        x.beginPath();
        x.arc(32, 32, 32, 0, Math.PI * 2);
        x.clip();
        const m = Math.min(img.width, img.height);
        x.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, 64, 64);
        let l = document.querySelector("link[rel~='icon']");
        if (!l) {
          l = document.createElement('link');
          l.rel = 'icon';
          document.head.appendChild(l);
        }
        l.type = 'image/png';
        l.href = c.toDataURL('image/png');
      };
    }

    // nav
    $('#menu-btn').addEventListener('click', () =>
      $('#sidebar').classList.contains('open') ? closeNav() : openNav()
    );
    $('#scrim').addEventListener('click', closeNav);

    // nav accordion expand/collapse
    $('#nav').addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('[data-toggle-group]');
      if (!toggleBtn) return;
      const name = toggleBtn.dataset.toggleGroup;
      if (expandedGroups.has(name)) {
        expandedGroups.delete(name);
      } else {
        expandedGroups.add(name);
      }
      renderNav(false);
    });

    renderSidebarSocials();

    // intercept internal links
    document.addEventListener('click', (e) => {
      const tocLink = e.target.closest('a.toc-link[data-toc]');
      if (tocLink) {
        e.preventDefault();
        const id = tocLink.dataset.toc || tocLink.getAttribute('href')?.replace(/^#/, '');
        const target = id ? document.getElementById(id) : null;
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        return;
      }

      const a = e.target.closest('a[data-link]');
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let cmd-click open a tab
      if (HASH_MODE) {
        closeNav();
        return; // hashchange handles it
      }
      e.preventDefault();
      const path = new URL(a.href, location.origin).pathname.replace(/^\//, '');
      if (path !== currentPath()) go(path);
      else closeNav();
    });

    // Pointer over a link is the earliest reliable signal that its body will
    // be wanted. `pointerenter` covers mouse and pen; `touchstart` fires on
    // tap before the click, which still buys the length of the tap.
    const prefetchFrom = (e) => {
      const a = e.target.closest?.('a[data-link]');
      if (!a) return;
      prefetch(new URL(a.href, location.origin).pathname.replace(/^\//, ''));
    };
    document.addEventListener('pointerover', prefetchFrom, { passive: true });
    document.addEventListener('touchstart', prefetchFrom, { passive: true });

    // palette (the visible search bar is gone; ⌘K still opens it)
    $('#pal-input').addEventListener('input', (e) => paintPalette(e.target.value));
    $('#pal-bg').addEventListener('click', (e) => e.target === $('#pal-bg') && closePalette());
    $('#pal-res').addEventListener('click', (e) => {
      const item = e.target.closest('.pal-item');
      if (!item) return;
      palIndex = +item.dataset.i;
      choosePal();
    });
    $('#pal-res').addEventListener('mousemove', (e) => {
      const item = e.target.closest('.pal-item');
      if (!item || +item.dataset.i === palIndex) return;
      palIndex = +item.dataset.i;
      $$('.pal-item').forEach((el, i) => el.setAttribute('aria-selected', i === palIndex));
    });

    // lightbox
    $('#lb').addEventListener('click', closeLB);

    initCompareGlobals();

    // keys
    document.addEventListener('keydown', (e) => {
      const palOpen = $('#pal-bg').classList.contains('on');

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        palOpen ? closePalette() : openPalette();
        return;
      }
      if (e.key === '/' && !palOpen && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault();
        openPalette();
        return;
      }
      if (e.key === 'Escape') {
        if (palOpen) closePalette();
        if ($('#lb').classList.contains('on')) closeLB();
        closeNav();
        return;
      }
      if (!palOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        movePal(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        movePal(-1);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        choosePal();
      }
    });

    // scroll
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
      },
      { passive: true }
    );

    window.addEventListener('popstate', () => withTransition(render));
    window.addEventListener('hashchange', () => withTransition(render));

    render();
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
