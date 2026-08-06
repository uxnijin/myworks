// ============================================================================
//  script.js: router, views, and interactions.
//  Content lives in data.js. Block rendering lives in blocks.js.
// ============================================================================

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const SITE_URL = 'https://nijin.site';
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ROTATING_WORDS = [
    'that ships.',
    'without fluff.',
    'done right.',
    'for products.',
    'made practical.',
    'built better.',
    'made simple.',
    'with purpose.',
    'that works.',
    'that delivers.',
    'that scales.',
    'that lasts.',
    'with impact.',
    'by design.',
    'for real.',
    'made to last.',
    'production-ready.',
    'user-first.',
    'business-driven.',
    'engineered well.',
    'beyond mockups.',
    'beyond pixels.',
    'built to scale.',
    'built to ship.',
    'built for growth.',
    'built for users.',
    'built with care.',
    'shipped fast.',
    'shipped often.',
    'validated.',
    'refined.',
    'polished.',
    'intentional.',
    'practical.',
    'measurable.',
    'reliable.',
    'accessible.',
    'scalable.',
    'human-centered.',
    'worth using.',
    'worth building.',
    'made for teams.',
    'with clarity.',
    'with confidence.',
    'with precision.',
    'with empathy.',
    'with intention.',
    'with evidence.',
    'with quality.',
    'for people.',
  ];

  // wraps a route render in the View Transitions API where supported, so the
  // outgoing page crossfades instead of just vanishing; falls back to a bare
  // call everywhere else (older Safari/Firefox, or reduced-motion users).
  const withTransition = (fn) => {
    if (document.startViewTransition && !reduceMotion()) {
      document.startViewTransition(fn);
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

  // bumped on every route render; async views (Medium fetches) capture it
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

  function renderNav(syncRoute = true) {
    const path = currentPath();
    const productGroups = groupBy(PROJECTS, (p) => p.group || 'Projects');
    const designGroups = groupBy(DESIGNS, (d) => d.category || 'Design', ['Mobile App', 'Web']);

    const link = (h, ico, label, active, ext, showIcon = true) => `
      <li>
        <a class="nav-item${active ? ' active' : ''}" href="${h}"${ext ? ' target="_blank" rel="noopener"' : ' data-link'}${active ? ' aria-current="page"' : ''
      }>
          ${showIcon ? `<span class="nav-icon">${icon(ico)}</span>` : ''}
          <span class="nav-label">${esc(label)}</span>
          ${ext ? `<span class="nav-ext">${icon('external')}</span>` : ''}
        </a>
      </li>`;

    const groupList = (groups, basePath) => groups
      .map((g) => {
        const isOpen = expandedGroups.has(g.name);
        const itemsHtml = g.items
          .map((it) => link(href(`${basePath}/${it.slug}`), it.icon, it.name, path === `${basePath}/${it.slug}`, false, false))
          .join('');
        const groupIcons = {
          'Mobile App': 'smartphone',
          'Resources': 'file',
        };
        const grpIcon = groupIcons[g.name] || g.items[0]?.icon || 'layers';
        return `
          <li>
            <button type="button" class="nav-item${isOpen ? ' open' : ''}" data-toggle-group="${esc(g.name)}" aria-expanded="${isOpen}">
              <span class="nav-icon">${icon(grpIcon)}</span>
              <span class="nav-label">${esc(g.name)}</span>
              <span class="nav-chevron">${icon('chevronRight')}</span>
            </button>
            ${isOpen ? `<ul class="nav-submenu">${itemsHtml}</ul>` : ''}
          </li>`;
      })
      .join('');

    if (syncRoute) {
      // auto-expand the group containing the current page
      const activeProductGroup = productGroups.find((g) =>
        g.items.some((p) => path === `docs/${p.slug}` || path.startsWith(`docs/${p.slug}/`))
      );
      if (activeProductGroup) expandedGroups.add(activeProductGroup.name);
      const activeDesignGroup = designGroups.find((g) =>
        g.items.some((d) => path === `designs/${d.slug}` || path.startsWith(`designs/${d.slug}/`))
      );
      if (activeDesignGroup) expandedGroups.add(activeDesignGroup.name);
    }

    $('#nav').innerHTML = `
      <p class="nav-title">Overview</p>
      <ul class="nav-menu">
        ${link(href(''), 'home', 'Index', path === '')}
        ${link(href('writings'), 'book', 'Writings', path === 'writings')}
        ${link(href('exploring'), 'map', "Things I'm Exploring", path === 'exploring')}
      </ul>
      ${designGroups.length ? `
      <p class="nav-title">Designs</p>
      <ul class="nav-menu">
        ${groupList(designGroups, 'designs')}
      </ul>` : ''}
      <p class="nav-title">My Products</p>
      <ul class="nav-menu">
        ${groupList(productGroups, 'docs')}
      </ul>`;
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

  // a PROJECTS/DESIGNS entry, linking internally via the router
  const buildDocRows = (items, basePath) =>
    items
      .map(
        (p) => `
      <a class="row" href="${href(`${basePath}/${p.slug}`)}" data-link>
        <span class="row-ico">${icon(p.icon)}</span>
        <span class="row-body">
          <span class="row-name">${esc(p.name)}</span>
          <span class="row-desc">${esc(p.summary)}</span>
        </span>
        <span class="row-tag">${esc(p.tag)}</span>
        <span class="row-go"><span>Read</span>${icon('arrowRight')}</span>
      </a>`
      )
      .join('');

  // a { icon, title, desc, tag, url? } item, e.g. BUILDING/WRITINGS/Medium posts
  const buildRows = (items) =>
    items
      .map((it) => {
        const inner = `
          <span class="row-ico">${icon(it.icon)}</span>
          <span class="row-body">
            <span class="row-name">${esc(it.title)}</span>
            <span class="row-desc">${esc(it.desc)}</span>
          </span>
          ${it.tag ? `<span class="row-tag">${esc(it.tag)}</span>` : ''}`;
        if (it.slug) {
          return `<a class="row" href="${href(`writings/${it.slug}`)}" data-link>${inner}<span class="row-go"><span>Read</span>${icon('arrowRight')}</span></a>`;
        }
        return it.url
          ? `<a class="row" href="${esc(it.url)}" target="_blank" rel="noopener">${inner}<span class="row-go"><span>Open</span>${icon('arrowRight')}</span></a>`
          : `<div class="row">${inner}</div>`;
      })
      .join('');

  // ------------------------------------------------------------- Medium

  // fetches nijinmuhammed's Medium posts through rss2json (Medium's own
  // feed has no CORS headers, so it can't be read directly from the
  // browser). Cached for the session; a failed fetch clears the cache so
  // the next visit to a Writings view retries instead of staying broken.
  let mediumPostsPromise = null;
  function fetchMediumPosts() {
    if (mediumPostsPromise) return mediumPostsPromise;
    const rssUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    mediumPostsPromise = fetch(api)
      .then((res) => {
        if (!res.ok) throw new Error('medium: bad response');
        return res.json();
      })
      .then((data) => {
        if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('medium: bad payload');
        return data.items.map((item) => {
          const text = (item.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
          return {
            icon: 'book',
            title: item.title,
            slug: slugify(item.title),
            desc: text.length > 150 ? `${text.slice(0, 150).trim()}…` : text,
            url: item.link,
            content: item.content || item.description || '',
            tag: item.pubDate
              ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '',
          };
        });
      })
      .catch((err) => {
        mediumPostsPromise = null;
        throw err;
      });
    return mediumPostsPromise;
  }

  // ------------------------------------------------------------- Threads

  let threadsPostsPromise = null;
  function fetchThreadsPosts() {
    if (threadsPostsPromise) return threadsPostsPromise;
    const targetUrl = (typeof THREADS_RSS_URL === 'string' && THREADS_RSS_URL.trim())
      ? THREADS_RSS_URL.trim()
      : `https://www.threads.net/@${THREADS_USERNAME}/rss`;
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetUrl)}`;

    threadsPostsPromise = fetch(api)
      .then((res) => {
        if (!res.ok) throw new Error(`threads: HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status !== 'ok' || !Array.isArray(data.items)) throw new Error('threads: bad payload');
        return data.items.map((item) => {
          let imageUrl = item.enclosure && item.enclosure.link ? item.enclosure.link : '';
          const htmlContent = item.description || item.content || '';
          if (!imageUrl && htmlContent) {
            const match = htmlContent.match(/src=["']([^"']+)["']/i);
            if (match) imageUrl = match[1];
          }
          if (imageUrl) {
            imageUrl = imageUrl.replace(/&amp;/g, '&');
          }

          const cleanHtml = htmlContent.replace(/<img[^>]*>/gi, '');
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = cleanHtml;
          const rawText = (tempDiv.textContent || tempDiv.innerText || item.title || '').trim();

          return {
            author: item.author || `@${THREADS_USERNAME}`,
            text: rawText,
            image: imageUrl,
            url: item.link || `https://www.threads.net/@${THREADS_USERNAME}`,
            date: item.pubDate
              ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '',
          };
        });
      })
      .catch(() => {
        return fetch('./threads.json')
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => []);
      });

    return threadsPostsPromise;
  }

  const buildThreadsCards = (posts) =>
    `<div class="threads-feed">
      ${posts
        .map((p) => {
          const bodyHtml = esc(p.text || '').replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
          return `
            <article class="thread-card">
              <header class="thread-card-head">
                <div class="thread-card-author">
                  <div class="thread-card-avatar">
                    ${PROFILE.avatar ? `<img src="${esc(PROFILE.avatar)}" alt="${esc(PROFILE.name)}" />` : icon('at-sign')}
                  </div>
                  <div class="thread-card-meta">
                    <span class="thread-card-handle">${esc(THREADS_USERNAME)}</span>
                    ${p.date ? `<span class="thread-card-dot">•</span><span class="thread-card-date">${esc(p.date)}</span>` : ''}
                  </div>
                </div>
                <a class="thread-card-link" href="${esc(p.url)}" target="_blank" rel="noopener" title="Open on Threads">
                  ${icon('external')}
                </a>
              </header>

              <div class="thread-card-text"><p>${bodyHtml}</p></div>

              ${
                p.image
                  ? `<div class="thread-card-media">
                      <img src="${esc(p.image)}" alt="Threads post attachment" loading="lazy" onerror="this.parentElement.style.display='none'" />
                    </div>`
                  : ''
              }

              <footer class="thread-card-foot">
                <a href="${esc(p.url)}" target="_blank" rel="noopener" class="thread-action" title="Like on Threads">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </a>
                <a href="${esc(p.url)}" target="_blank" rel="noopener" class="thread-action" title="Reply on Threads">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                </a>
                <a href="${esc(p.url)}" target="_blank" rel="noopener" class="thread-action" title="Repost on Threads">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
                </a>
                <a href="${esc(p.url)}" target="_blank" rel="noopener" class="thread-action" title="Share">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.5.5 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                </a>
              </footer>
            </article>`;
        })
        .join('')}
    </div>`;





  // ------------------------------------------------------------- home view

  function viewHome() {
    document.title = `${PROFILE.name} ${PROFILE.role}`;
    setDescription(`${PROFILE.tagline} Projects, case studies, and tools by ${PROFILE.name}, ${PROFILE.role}.`);

    const designRows = buildDocRows(DESIGNS, 'designs');
    const productRows = buildDocRows(PROJECTS, 'docs');

    $('#view').innerHTML = `
      <div class="view">
        <section class="hero">

          <div class="hero-id">
            <span class="hero-avatar" style="background-image:url(${esc(PROFILE.avatar)})"></span>
            <span class="hero-id-text">
              <span class="hero-id-name">${esc(PROFILE.name)} ${icon('verified')}</span>
              <span class="hero-id-role">${esc(PROFILE.role)}</span>
            </span>
          </div>

          <h1>${esc(PROFILE.tagline).replace('documented.', '<span class="rotating-word-wrapper"><em class="rotating-word active" style="position: relative;">' + ROTATING_WORDS[0] + '</em></span>')}</h1>
          <p class="hero-lede">${PROFILE.bio}</p>
          ${PROFILE.intro ? `<p class="hero-lede" style="margin-top:14px">${PROFILE.intro}</p>` : ''}

          <div class="hero-actions">
            <a class="cta" href="${href(`docs/${PROJECTS[0].slug}`)}" data-link>See Projects ${icon('arrowRight')}</a>
            <button class="cta ghost" id="hero-search">${icon('search')} Search projects</button>
          </div>
        </section>

        ${DESIGNS.length ? `
        <section class="sec">
          <div class="sec-head">
            <h2>Designs</h2>
            <span class="sec-count">${DESIGNS.length} Case ${DESIGNS.length === 1 ? 'Study' : 'Studies'}</span>
          </div>
          <p class="sec-sub">Mobile app and web design case studies — the brief, the process, the outcome.</p>
          <div class="index">${designRows}</div>
        </section>` : ''}

        <section class="sec">
          <div class="sec-head">
            <h2>My Products</h2>
            <span class="sec-count">${PROJECTS.length} Products</span>
          </div>
          <p class="sec-sub">Every one has a doc page: the problem, the decisions, and what I'd change.</p>
          <div class="index">${productRows}</div>
        </section>

        <section class="sec">
          <div class="sec-head">
            <h2>Writing</h2>
            <a class="sec-count" href="${href('writings')}" data-link>All writings ${icon('arrowRight')}</a>
          </div>
          <p class="sec-sub">Notes on design and building products, live from Medium.</p>
          <div class="index" id="home-writing-list"><p class="sec-sub">Loading posts from Medium…</p></div>
        </section>

        <section class="sec">
          <div class="sec-head">
            <h2>Videos</h2>
          </div>
          <p class="sec-sub">Watch sessions and talks from HACA Design School.</p>
          <div class="embed" style="max-width: 480px; margin: 16px 0;">
            <iframe src="https://www.youtube.com/embed/taRS6YUVZhM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </section>

        <section class="sec">
          <div class="sec-head"><h2>Activity</h2></div>
          <p class="sec-sub">Most of this is the tools above, being built in public.</p>
          <div class="gh" id="gh"><div class="gh-skel">Loading contributions…</div></div>
        </section>

        <footer class="foot">
          <span class="foot-note">© ${new Date().getFullYear()} ${esc(PROFILE.name)}</span>
          <span class="socials">
            ${PROFILE.links
        .map(
          (l) =>
            `<a href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}">${icon(
              (l.label || '').toLowerCase()
            )}</a>`
        )
        .join('')}
          </span>
        </footer>
      </div>`;

    const totalUsers = PROJECTS.reduce((sum, p) => sum + (p.users || 0), 0);
    const sortedProjects = [...PROJECTS].sort((a, b) => (b.users || 0) - (a.users || 0));

    $('#toc').innerHTML = `
      <div class="toc-users">
        <h3 class="toc-title">Community Reach</h3>
        <div class="users-total-card">
          <span class="users-total-num">0</span>
          <span class="users-total-label">Active Users Combined</span>
        </div>
        <details class="users-accordion">
          <summary class="toc-title">
            <span>By Product</span>
            <span class="users-chevron">${icon('chevronRight')}</span>
          </summary>
          <div class="users-list">
            ${sortedProjects
        .map((p, i) => {
          const maxUsers = sortedProjects[0].users || 1;
          const pct = Math.max(4, Math.round(((p.users || 0) / maxUsers) * 100));
          return `
                  <a href="${href(`docs/${p.slug}`)}" class="users-item" data-link style="animation-delay: ${i * 20}ms;">
                    <div class="users-item-header">
                      <span class="users-item-icon">${icon(p.icon)}</span>
                      <span class="users-item-name">${esc(p.name)}</span>
                      <span class="users-item-count" data-val="${p.users || 0}">0</span>
                    </div>
                    <div class="users-item-bar-bg">
                      <div class="users-item-bar" style="width: ${pct}%;"></div>
                    </div>
                  </a>
                `;
        })
        .join('')}
          </div>
        </details>
      </div>
    `;

    const totalNumEl = $('.users-total-num');
    if (totalNumEl) {
      animateCount(totalNumEl, totalUsers, 1500);
    }

    const accordion = $('.users-accordion');
    const summary = $('summary', accordion);
    if (accordion && summary) {
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        const items = $$('.users-item', accordion);
        if (accordion.hasAttribute('open')) {
          items.forEach((item, idx) => {
            item.style.animationDelay = `${(items.length - 1 - idx) * 20}ms`;
          });
          accordion.classList.add('closing');
          setTimeout(() => {
            accordion.removeAttribute('open');
            accordion.classList.remove('closing');
          }, 500);
        } else {
          items.forEach((item, idx) => {
            item.style.animationDelay = `${idx * 20}ms`;
          });
          accordion.setAttribute('open', '');
          $$('.users-item-count', accordion).forEach((el) => {
            const val = parseInt(el.dataset.val, 10);
            if (!isNaN(val)) {
              animateCount(el, val, 1000);
            }
          });
        }
      });
    }

    $('#hero-search')?.addEventListener('click', openPalette);
    renderGitHub();

    const homeWritingToken = asyncToken;
    fetchMediumPosts()
      .then((posts) => (posts.length ? posts.slice(0, 4) : WRITINGS))
      .catch(() => WRITINGS)
      .then((posts) => {
        if (homeWritingToken !== asyncToken) return;
        const list = $('#home-writing-list');
        if (!list) return;
        list.innerHTML = posts.length
          ? buildRows(posts)
          : `<p class="sec-sub">Haven't published anything yet — check back soon.</p>`;
      });

    initRotatingHeadline();
  }

  function initRotatingHeadline() {
    const wrapper = $('.rotating-word-wrapper');
    if (!wrapper) return;

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (!document.body.contains(wrapper)) {
        clearInterval(intervalId);
        return;
      }

      const currentSpan = wrapper.querySelector('.rotating-word.active');
      if (!currentSpan) return;

      currentIndex = (currentIndex + 1) % ROTATING_WORDS.length;
      const nextWord = ROTATING_WORDS[currentIndex];

      const currentWidth = currentSpan.offsetWidth;

      const newSpan = document.createElement('em');
      newSpan.className = 'rotating-word enter';
      newSpan.style.position = 'absolute';
      newSpan.style.left = '0';
      newSpan.style.top = '0';
      newSpan.textContent = nextWord;
      wrapper.appendChild(newSpan);

      const newWidth = newSpan.offsetWidth;

      wrapper.style.width = `${currentWidth}px`;

      wrapper.offsetHeight; // force reflow

      currentSpan.classList.remove('active');
      currentSpan.classList.add('exit');

      newSpan.classList.remove('enter');
      newSpan.classList.add('active');

      wrapper.style.width = `${newWidth}px`;

      setTimeout(() => {
        if (!document.body.contains(wrapper)) return;
        currentSpan.remove();
        newSpan.style.position = 'relative';
        newSpan.style.left = '';
        newSpan.style.top = '';
        wrapper.style.width = '';
      }, 600);
    }, 3000);
  }

  // ------------------------------------------------------------- doc view

  function viewDoc(p, collection = PROJECTS, basePath = 'docs') {
    document.title = `${p.name} | ${PROFILE.name}`;
    setDescription(p.summary);

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

    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="${href('')}" data-link>Index</a>
              ${icon('chevronRight')}
              <span>${esc(p.group || p.category || 'Projects')}</span>
              ${icon('chevronRight')}
              <span style="color:var(--text)">${esc(p.name)}</span>
            </nav>
            <h1 class="doc-h1" style="display:flex; align-items:center; gap:12px;">
              ${p.group === 'Figma Plugins' ? `<img src="/images/${p.slug}-logo.png" alt="" style="width:36px; height:36px; border-radius:8px; border:1px solid var(--border); flex-shrink:0;" />` : ''}
              <span>${esc(p.name)}</span>
            </h1>
            <p class="doc-lede">${p.lede}</p>
            <div class="doc-meta">
              <div class="doc-meta-actions" style="display:flex; gap:8px;">
                ${p.productUrl || p.url
        ? `<a class="cta" href="${esc(p.productUrl || p.url)}" target="_blank" rel="noopener">${p.group === 'Figma Plugins' ? 'Open in Figma' : 'Open Product'} ${icon('external')}</a>`
        : ''
      }
              </div>
              ${p.status ? `<span class="pill${p.status === 'Live' ? ' live' : ''}" style="margin-left:auto;"><span class="dot"></span>${esc(p.status)}</span>` : ''}
            </div>
          </header>

          ${p.group === 'Figma Plugins'
        ? `<div class="doc-hero-thumbnail" data-tilt-3d style="margin-bottom:40px; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border); aspect-ratio:16/9; background:var(--bg-subtle); transition:transform .3s var(--ease);">
                   <img src="/images/${p.slug}-cover.png" alt="${esc(p.name)} Thumbnail" style="width:100%; height:100%; object-fit:cover; display:block;" />
                 </div>`
        : ''
      }

          <div class="prose">${renderBlocks(filteredBlocks)}</div>

          ${p.privacyBlocks || p.termsBlocks
        ? `<div class="doc-footer-links">
                   ${p.privacyBlocks ? `<a class="doc-footer-link" href="${href(`${basePath}/${p.slug}/privacy`)}" data-link>Privacy Policy</a>` : ''}
                   ${p.termsBlocks ? `<a class="doc-footer-link" href="${href(`${basePath}/${p.slug}/terms`)}" data-link>Terms of Service</a>` : ''}
                 </div>`
        : ''
      }

          <nav class="page-nav" aria-label="Pagination">
            ${prev
        ? `<a class="page-nav-link prev" href="${href(`${basePath}/${prev.slug}`)}" data-link>
                     <span class="page-nav-dir">${icon('chevronLeft')} Previous</span>
                     <span class="page-nav-name">${esc(prev.name)}</span>
                   </a>`
        : '<span></span>'
      }
            ${next
        ? `<a class="page-nav-link next" href="${href(`${basePath}/${next.slug}`)}" data-link>
                     <span class="page-nav-dir">Next ${icon('chevronRight')}</span>
                     <span class="page-nav-name">${esc(next.name)}</span>
                   </a>`
        : ''
      }
          </nav>
        </article>
      </div>`;

    renderTOC(p, basePath);
    initCopy();
    initZoom();
    initTilt();
    initScaleDemo();
  }

  // ------------------------------------------------------------- TOC

  let tocObserver = null;

  function renderTOC(p, basePath = 'docs') {
    const heads = $$('.prose h2, .prose h3');
    if (!heads.length) {
      $('#toc').innerHTML = '';
      return;
    }

    heads.forEach((h, idx) => {
      if (!h.id) {
        h.id = slugify(h.textContent) || `heading-${idx}`;
      }
    });

    const path = currentPath();
    $('#toc').innerHTML = `
      <p class="toc-title">On this page</p>
      <ul class="toc-list">
        ${heads
        .map(
          (h) =>
            `<li><a class="toc-link lvl-${h.tagName === 'H3' ? 3 : 2}" href="#${h.id}" data-toc="${h.id}">${h.textContent.replace(/^#/, '').trim()
            }</a></li>`
        )
        .join('')}
        ${p.privacyBlocks ? `<li><a class="toc-link lvl-2${path === `${basePath}/${p.slug}/privacy` ? ' active' : ''}" href="${href(`${basePath}/${p.slug}/privacy`)}" data-link>Privacy Policy</a></li>` : ''}
        ${p.termsBlocks ? `<li><a class="toc-link lvl-2${path === `${basePath}/${p.slug}/terms` ? ' active' : ''}" href="${href(`${basePath}/${p.slug}/terms`)}" data-link>Terms of Service</a></li>` : ''}
      </ul>
      <div class="toc-foot">
        ${p.productUrl || p.url ? `<a class="toc-action" href="${esc(p.productUrl || p.url)}" target="_blank" rel="noopener">${icon('external')} Open the product</a>` : ''}
        <a class="toc-action" href="#" data-top>${icon('chevronLeft')} Back to top</a>
      </div>`;

    $('[data-top]')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // scrollspy: highlight the heading nearest the top of the viewport
    tocObserver?.disconnect();
    const seen = new Map();
    tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e));
        const visible = [...seen.values()]
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (!id) return;
        $$('.toc-link').forEach((l) => l.classList.toggle('active', l.dataset.toc === id));
      },
      { rootMargin: '-72px 0px -70% 0px', threshold: 0 }
    );
    heads.forEach((h) => tocObserver.observe(h));
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

  // ------------------------------------------------------------- github graph

  const GH_CACHE = 'gh-contrib-cache';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

  function paintGitHub(data, cached) {
    const el = $('#gh');
    if (!el) return;

    // The API returns an array of weeks; each week is an array of day objects.
    const weeks = (data.contributions || []).filter((w) => Array.isArray(w) && w.length);
    if (!weeks.length) throw new Error('unexpected shape');

    const total = data.totalContributions || 0;

    let months = '';
    let last = -1;
    weeks.forEach((w, col) => {
      const d = new Date(w[0].date);
      if (d.getMonth() !== last) {
        months += `<span style="grid-column-start:${col + 1}">${MONTHS[d.getMonth()]}</span>`;
        last = d.getMonth();
      }
    });

    const cells = weeks
      .map((w) =>
        w
          .map((d) => {
            const lvl = LEVELS[d.contributionLevel] ?? 0;
            const n = d.contributionCount || 0;
            const date = new Date(d.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const tip = n === 0 ? `No contributions on ${date}` : `${n} contribution${n > 1 ? 's' : ''} on ${date}`;
            return `<div class="gh-cell" data-l="${lvl}" data-tip="${esc(tip)}"></div>`;
          })
          .join('')
      )
      .join('');

    el.innerHTML = `
      <div class="gh-head">
        <h3 class="gh-title">
          ${icon('github')}
          <a href="https://github.com/${esc(PROFILE.github)}" target="_blank" rel="noopener">@${esc(PROFILE.github)}</a>
        </h3>
        <span class="gh-stat"><strong>${total.toLocaleString()}</strong> contributions in the last year</span>
      </div>
      <div class="gh-scroll">
        <div class="gh-wrap">
          <div class="gh-months" style="grid-template-columns:repeat(${weeks.length},1fr)">${months}</div>
          <div class="gh-body">
            <div class="gh-days"><span>Mon</span><span>Wed</span><span>Fri</span></div>
            <div class="gh-grid" style="grid-template-columns:repeat(${weeks.length},1fr)">${cells}</div>
          </div>
        </div>
      </div>
      <div class="gh-foot">
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
    fetch(`https://github-contributions-api.deno.dev/${PROFILE.github}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) => {
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
    { name: 'Index', desc: 'All projects', path: '', icon: 'home' },
    { name: 'Writings', desc: 'Notes and write-ups', path: 'writings', icon: 'book' },
    { name: "Things I'm Exploring", desc: 'Ideas and topics on my radar', path: 'exploring', icon: 'map' },
    { name: 'Contact', desc: 'Get in touch', path: 'contact', icon: 'mail' },
    ...PROJECTS.map((p) => ({ name: p.name, desc: p.summary, path: `docs/${p.slug}`, icon: p.icon, tag: p.tag })),
    ...DESIGNS.map((d) => ({ name: d.name, desc: d.summary, path: `designs/${d.slug}`, icon: d.icon, tag: d.tag })),
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
      res.innerHTML = `<div class="pal-empty">No projects match “${esc(q)}”</div>`;
      return;
    }
    res.innerHTML = palItems
      .map(
        (it, i) => `<div class="pal-item" role="option" aria-selected="${i === 0}" data-i="${i}">
          <span class="pal-ico">${icon(it.icon)}</span>
          <span class="pal-text">
            <span class="pal-name">${esc(it.name)}</span>
            <span class="pal-desc">${esc(it.desc)}</span>
          </span>
          ${it.tag ? `<span class="pal-hint">${esc(it.tag)}</span>` : ''}
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
    document.title = `${title} | ${p.name} | ${PROFILE.name}`;
    setDescription(`Legal documentation for ${p.name}.`);

    $('#view').innerHTML = `
      <div class="view">
        <article>
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

          <div class="prose">${renderBlocks(blocks)}</div>
        </article>
      </div>`;

    renderTOC(p);
    initCopy();
    initZoom();
  }

  // ------------------------------------------------------------- render

  function render() {
    const path = currentPath();
    closeNav();
    asyncToken++;

    if (path === '' || path === 'index.html') {
      viewHome();
    } else if (path === 'contact') {
      viewContact();
    } else if (path === 'building') {
      viewNotFound();
    } else if (path === 'writings') {
      viewWritings();
    } else if (path.startsWith('writings/')) {
      const slug = path.slice('writings/'.length);
      const token = asyncToken;
      $('#view').innerHTML = `
        <div class="view">
          <article>
            <header class="doc-head">
              <nav class="crumbs" aria-label="Breadcrumb">
                <a href="${href('')}" data-link>Index</a>
                ${icon('chevronRight')}
                <a href="${href('writings')}" data-link>Writings</a>
              </nav>
              <h1 class="doc-h1">Loading article…</h1>
            </header>
            <div class="prose"><p>Fetching article content from Medium…</p></div>
          </article>
        </div>`;
      $('#toc').innerHTML = '';

      fetchMediumPosts()
        .then((posts) => {
          if (token !== asyncToken) return;
          const post = posts.find((p) => p.slug === slug);
          if (post) {
            viewWriting(post);
          } else {
            viewNotFound();
          }
        })
        .catch(() => {
          if (token !== asyncToken) return;
          viewNotFound();
        });
    } else if (path === 'exploring') {
      viewExploring();
    } else if (path.startsWith('docs/')) {
      const parts = path.slice(5).split('/');
      const slug = parts[0];
      const sub = parts[1];
      const p = bySlug(slug);
      if (p) {
        if (!sub) {
          viewDoc(p);
        } else if (sub === 'privacy' && p.privacyBlocks) {
          viewDocSubPage(p, 'Privacy Policy', p.privacyBlocks);
        } else if (sub === 'terms' && p.termsBlocks) {
          viewDocSubPage(p, 'Terms of Service', p.termsBlocks);
        } else {
          viewNotFound();
        }
      } else {
        viewNotFound();
      }
    } else if (path.startsWith('designs/')) {
      const slug = path.slice('designs/'.length);
      const d = designBySlug(slug);
      d ? viewDoc(d, DESIGNS, 'designs') : viewNotFound();
    } else {
      viewNotFound();
    }

    renderNav();
    window.scrollTo(0, 0);
    updateProgress();
    updateCanonical(path);
    initImageFade($('#view'));
    animateHeading($('#view h1'));
    initTilt3D($('#view'));
    initMagnetic();
  }

  // ------------------------------------------------------------- simple list pages

  function viewListPage(title, lede, items, emptyText) {
    document.title = `${title} | ${PROFILE.name}`;
    setDescription(lede);
    $('#toc').innerHTML = '';

    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <h1 class="doc-h1">${esc(title)}</h1>
            <p class="doc-lede">${esc(lede)}</p>
          </header>
          ${items.length ? `<div class="index">${buildRows(items)}</div>` : `<p class="sec-sub">${esc(emptyText)}</p>`}
        </article>
      </div>`;
  }

  function viewBuilding() {
    const title = 'Building';
    const lede = "Things I'm currently building or shipping, live from Threads.";
    document.title = `${title} | ${PROFILE.name}`;
    setDescription(lede);
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <h1 class="doc-h1">${esc(title)}</h1>
            <p class="doc-lede">${esc(lede)}</p>
          </header>
          <div id="building-body"><p class="sec-sub">Loading updates from Threads…</p></div>
        </article>
      </div>`;

    const token = asyncToken;
    fetchThreadsPosts()
      .then((posts) => ({ posts, empty: 'Nothing posted on Threads yet — check back soon.' }))
      .catch(() => ({ posts: BUILDING, empty: "Couldn't load updates from Threads right now — check back soon." }))
      .then(({ posts, empty }) => {
        if (token !== asyncToken) return;
        const body = $('#building-body');
        if (!body) return;
        body.innerHTML = posts.length ? buildThreadsCards(posts) : `<p class="sec-sub">${esc(empty)}</p>`;
      });
  }

  function viewWritings() {
    const title = 'Writings';
    const lede = 'Notes and write-ups on design and building products, live from Medium.';
    document.title = `${title} | ${PROFILE.name}`;
    setDescription(lede);
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <h1 class="doc-h1">${esc(title)}</h1>
            <p class="doc-lede">${esc(lede)}</p>
          </header>
          <div id="writings-body"><p class="sec-sub">Loading posts from Medium…</p></div>
        </article>
      </div>`;

    const token = asyncToken;
    fetchMediumPosts()
      .then((posts) => ({ posts, empty: 'Nothing published on Medium yet — check back soon.' }))
      .catch(() => ({ posts: WRITINGS, empty: "Couldn't load posts from Medium right now — check back soon." }))
      .then(({ posts, empty }) => {
        if (token !== asyncToken) return;
        const body = $('#writings-body');
        if (!body) return;
        body.innerHTML = posts.length ? `<div class="index">${buildRows(posts)}</div>` : `<p class="sec-sub">${esc(empty)}</p>`;
      });
  }

  function viewWriting(post) {
    document.title = `${post.title} | ${PROFILE.name}`;
    setDescription(post.desc);

    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <nav class="crumbs" aria-label="Breadcrumb">
              <a href="${href('')}" data-link>Index</a>
              ${icon('chevronRight')}
              <a href="${href('writings')}" data-link>Writings</a>
              ${icon('chevronRight')}
              <span style="color:var(--text)">${esc(post.title)}</span>
            </nav>
            <h1 class="doc-h1">${esc(post.title)}</h1>
            <div class="doc-meta">
              ${post.tag ? `<span class="doc-meta-date" style="color:var(--text-faint); font-size:14px;">${esc(post.tag)}</span>` : ''}
              <div class="doc-meta-actions" style="display:flex; gap:8px; margin-left:auto;">
                ${post.url
        ? `<a class="cta" href="${esc(post.url)}" target="_blank" rel="noopener">Read on Medium ${icon('external')}</a>`
        : ''
      }
              </div>
            </div>
          </header>

          <div class="prose Medium-prose">${post.content}</div>
        </article>
      </div>`;

    // Ensure all h2 and h3 elements inside the Medium content have IDs for TOC
    $$('.prose h2, .prose h3').forEach((h, idx) => {
      if (!h.id) {
        h.id = slugify(h.textContent) || `heading-${idx}`;
      }
    });

    renderTOC({
      name: post.title,
      productUrl: post.url
    }, 'writings');

    initCopy();
    initZoom();
    initTilt();
  }

  function viewExploring() {
    const title = "Things I'm Exploring";
    const lede = 'The tools, languages and services in my day-to-day rotation — from designing the thing to shipping it.';
    document.title = `${title} | ${PROFILE.name}`;
    setDescription(lede);
    $('#toc').innerHTML = '';

    const chip = (t) => {
      const glyph = t.brand
        ? brandGlyph(t.brand)
        : `<span class="tool-chip-mono">${esc(t.letter || t.name.charAt(0))}</span>`;
      const inner = `
        <span class="tool-chip-ico" style="background:${esc(t.color || 'var(--accent)')}">${glyph}</span>
        <span class="tool-chip-body">
          <span class="tool-chip-name">${esc(t.name)}</span>
          ${t.use ? `<span class="tool-chip-use">${esc(t.use)}</span>` : ''}
        </span>`;
      return t.url
        ? `<a class="tool-chip" href="${esc(t.url)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="tool-chip">${inner}</div>`;
    };

    // Back-compat: support both the grouped shape and a flat array.
    const groups = Array.isArray(EXPLORING) && EXPLORING[0] && EXPLORING[0].items
      ? EXPLORING
      : [{ items: EXPLORING }];

    const total = groups.reduce((n, g) => n + (g.items ? g.items.length : 0), 0);

    const sections = groups.map((g) => `
      <section class="tool-section">
        ${g.group ? `<div class="tool-section-head">
          <h2 class="tool-section-title">${esc(g.group)}</h2>
          ${g.blurb ? `<p class="tool-section-blurb">${esc(g.blurb)}</p>` : ''}
        </div>` : ''}
        <div class="tool-grid">${g.items.map(chip).join('')}</div>
      </section>`).join('');

    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <h1 class="doc-h1">${esc(title)}</h1>
            <p class="doc-lede">${esc(lede)}</p>
          </header>
          ${total ? sections : `<p class="sec-sub">Nothing new to share yet — check back soon.</p>`}
        </article>
      </div>`;
  }

  function viewContact() {
    document.title = `Contact | ${PROFILE.name}`;
    setDescription(`Get in touch with ${PROFILE.name} for collaborations, project inquiries, or just to say hi.`);
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <article style="max-width: 600px; margin: 0 auto;">
          <header class="doc-head">
            <h1 class="doc-h1">Contact</h1>
            <p class="doc-lede">Feel free to reach out for collaborations, project inquiries, or just to say hi.</p>
          </header>
          
          <div class="contact-channels">
            <div class="channel-card">
              <a href="mailto:uxnijin@gmail.com" class="channel-card-main">
                <span class="channel-ico">${icon('mail')}</span>
                <div class="channel-info">
                  <span class="channel-label">Email</span>
                  <span class="channel-value">uxnijin@gmail.com</span>
                </div>
              </a>
              <button class="copy-btn" type="button" aria-label="Copy email address" data-copy="uxnijin@gmail.com">
                ${icon('copy', 'copy')}${icon('check', 'check')}
              </button>
            </div>
            <a href="https://wa.me/916238417389" target="_blank" rel="noopener" class="channel-card">
              <span class="channel-ico">${icon('whatsapp')}</span>
              <div class="channel-info">
                <span class="channel-label">WhatsApp</span>
                <span class="channel-value">62384 17389</span>
              </div>
            </a>
          </div>
          
          <form class="contact-form" id="contact-form">
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
        </article>
      </div>`;

    initCopy();

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
    document.title = `Not found | ${PROFILE.name}`;
    setDescription(`That page doesn't exist; it may have been renamed.`);
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <h1 class="doc-h1">Page not found</h1>
        <p class="doc-lede">That page doesn't exist; it may have been renamed.</p>
        <div class="hero-actions">
          <a class="cta" href="${href('')}" data-link>Back to the index ${icon('arrowRight')}</a>
        </div>
      </div>`;
  }

  // ------------------------------------------------------------- boot

  function boot() {
    // topbar icons
    $('#menu-btn').innerHTML = icon('menu');
    $('.search-ico').innerHTML = icon('search');
    $('#contact-ico').innerHTML = icon('mail');
    $('#pal-icon').innerHTML = icon('search');
    $('#lb-close').innerHTML = icon('x');
    $('#brand-mark').style.backgroundImage = `url(${PROFILE.avatar})`;
    $('#brand-name').textContent = PROFILE.name;
    if (!navigator.platform.toLowerCase().includes('mac')) $('#search-kbd').textContent = 'Ctrl K';

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
      const tocLink = e.target.closest('a.toc-link[data-toc], a.heading-anchor');
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

    // palette
    $('#search-btn').addEventListener('click', openPalette);
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
