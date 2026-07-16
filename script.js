// ============================================================================
//  script.js: router, views, and interactions.
//  Content lives in data.js. Block rendering lives in blocks.js.
// ============================================================================

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

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
      render();
    }
  };

  const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);

  // ------------------------------------------------------------- sidebar nav

  // names of product groups currently expanded inline in the sidebar
  const expandedGroups = new Set();

  // syncRoute: true when called on a page navigation (auto-expand the group
  // containing the current page); false for manual expand/collapse clicks,
  // which must not have their choice overridden by the route-sync logic
  function renderNav(syncRoute = true) {
    const path = currentPath();
    const groups = [];
    PROJECTS.forEach((p) => {
      const g = groups.find((x) => x.name === (p.group || 'Projects'));
      g ? g.items.push(p) : groups.push({ name: p.group || 'Projects', items: [p] });
    });

    const link = (h, ico, label, active, ext) => `
      <li>
        <a class="nav-item${active ? ' active' : ''}" href="${h}"${ext ? ' target="_blank" rel="noopener"' : ' data-link'}${
      active ? ' aria-current="page"' : ''
    }>
          <span class="nav-icon">${icon(ico)}</span>
          <span class="nav-label">${esc(label)}</span>
          ${ext ? `<span class="nav-ext">${icon('external')}</span>` : ''}
        </a>
      </li>`;

    if (syncRoute) {
      // auto-expand the group containing the current page
      const activeEntry = groups.find((g) =>
        g.items.some((p) => path === `docs/${p.slug}` || path.startsWith(`docs/${p.slug}/`))
      );
      if (activeEntry) expandedGroups.add(activeEntry.name);
    }

    $('#nav').innerHTML = `
      <p class="nav-title">Overview</p>
      <ul class="nav-menu">
        ${link(href(''), 'home', 'Index', path === '')}
        ${link(href('building'), 'zap', 'Building', path === 'building')}
        ${link(href('writings'), 'book', 'Writings', path === 'writings')}
        ${link(href('exploring'), 'map', "Things I'm Exploring", path === 'exploring')}
      </ul>
      <p class="nav-title">My Products</p>
      <ul class="nav-menu">
        ${groups
          .map((g) => {
            const isOpen = expandedGroups.has(g.name);
            const itemsHtml = g.items
              .map((p) => link(href(`docs/${p.slug}`), p.icon, p.name, path === `docs/${p.slug}`))
              .join('');
            return `
              <li>
                <button type="button" class="nav-item${isOpen ? ' open' : ''}" data-toggle-group="${esc(g.name)}" aria-expanded="${isOpen}">
                  <span class="nav-icon">${icon(g.items[0]?.icon || 'layers')}</span>
                  <span class="nav-label">${esc(g.name)}</span>
                  <span class="nav-chevron">${icon('chevronRight')}</span>
                </button>
                ${isOpen ? `<ul class="nav-submenu">${itemsHtml}</ul>` : ''}
              </li>`;
          })
          .join('')}
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

  // ------------------------------------------------------------- home view

  function viewHome() {
    document.title = `${PROFILE.name} ${PROFILE.role}`;

    const rows = PROJECTS.map(
      (p) => `
      <a class="row" href="${href(`docs/${p.slug}`)}" data-link>
        <span class="row-ico">${icon(p.icon)}</span>
        <span class="row-body">
          <span class="row-name">${esc(p.name)}</span>
          <span class="row-desc">${esc(p.summary)}</span>
        </span>
        <span class="row-tag">${esc(p.tag)}</span>
        <span class="row-go"><span>Read</span>${icon('arrowRight')}</span>
      </a>`
    ).join('');

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

          <h1>${esc(PROFILE.tagline).replace('documented.', '<em>documented.</em>')}</h1>
          <p class="hero-lede">${PROFILE.bio}</p>
          ${PROFILE.intro ? `<p class="hero-lede" style="margin-top:14px">${PROFILE.intro}</p>` : ''}

          <div class="hero-actions">
            <a class="cta" href="${href(`docs/${PROJECTS[0].slug}`)}" data-link>See Projects ${icon('arrowRight')}</a>
            <button class="cta ghost" id="hero-search">${icon('search')} Search projects</button>
          </div>
        </section>

        <section class="sec">
          <div class="sec-head">
            <h2>Projects</h2>
            <span class="sec-count">${PROJECTS.length} Projects</span>
          </div>
          <p class="sec-sub">Every one has a doc page: the problem, the decisions, and what I'd change.</p>
          <div class="index">${rows}</div>
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
  }

  // ------------------------------------------------------------- doc view

  function viewDoc(p) {
    document.title = `${p.name} | ${PROFILE.name}`;

    const i = PROJECTS.indexOf(p);
    const prev = PROJECTS[i - 1];
    const next = PROJECTS[i + 1];

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
              <span>${esc(p.group || 'Projects')}</span>
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
                ${
                  p.productUrl || p.url
                    ? `<a class="cta" href="${esc(p.productUrl || p.url)}" target="_blank" rel="noopener">${p.group === 'Figma Plugins' ? 'Open in Figma' : 'Open Product'} ${icon('external')}</a>`
                    : ''
                }
              </div>
              ${p.status ? `<span class="pill${p.status === 'Live' ? ' live' : ''}" style="margin-left:auto;"><span class="dot"></span>${esc(p.status)}</span>` : ''}
            </div>
          </header>

          ${
            p.group === 'Figma Plugins'
              ? `<div class="doc-hero-thumbnail" style="margin-bottom:40px; border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border); aspect-ratio:16/9; background:var(--bg-subtle);">
                   <img src="/images/${p.slug}-cover.png" alt="${esc(p.name)} Thumbnail" style="width:100%; height:100%; object-fit:cover; display:block;" />
                 </div>`
              : ''
          }

          <div class="prose">${renderBlocks(filteredBlocks)}</div>

          ${
            p.privacyBlocks || p.termsBlocks
              ? `<div class="doc-footer-links">
                   ${p.privacyBlocks ? `<a class="doc-footer-link" href="${href(`docs/${p.slug}/privacy`)}" data-link>Privacy Policy</a>` : ''}
                   ${p.termsBlocks ? `<a class="doc-footer-link" href="${href(`docs/${p.slug}/terms`)}" data-link>Terms of Service</a>` : ''}
                 </div>`
              : ''
          }

          <nav class="page-nav" aria-label="Pagination">
            ${
              prev
                ? `<a class="page-nav-link prev" href="${href(`docs/${prev.slug}`)}" data-link>
                     <span class="page-nav-dir">${icon('chevronLeft')} Previous</span>
                     <span class="page-nav-name">${esc(prev.name)}</span>
                   </a>`
                : '<span></span>'
            }
            ${
              next
                ? `<a class="page-nav-link next" href="${href(`docs/${next.slug}`)}" data-link>
                     <span class="page-nav-dir">Next ${icon('chevronRight')}</span>
                     <span class="page-nav-name">${esc(next.name)}</span>
                   </a>`
                : ''
            }
          </nav>
        </article>
      </div>`;

    renderTOC(p);
    initCopy();
    initZoom();
    initTilt();
    initScaleDemo();
  }

  // ------------------------------------------------------------- TOC

  let tocObserver = null;

  function renderTOC(p) {
    const heads = $$('.prose h2, .prose h3');
    if (!heads.length) {
      $('#toc').innerHTML = '';
      return;
    }

    const path = currentPath();
    $('#toc').innerHTML = `
      <p class="toc-title">On this page</p>
      <ul class="toc-list">
        ${heads
          .map(
            (h) =>
              `<li><a class="toc-link lvl-${h.tagName === 'H3' ? 3 : 2}" href="#${h.id}" data-toc="${h.id}">${
                h.textContent.replace(/^#/, '').trim()
              }</a></li>`
          )
          .join('')}
        ${p.privacyBlocks ? `<li><a class="toc-link lvl-2${path === `docs/${p.slug}/privacy` ? ' active' : ''}" href="${href(`docs/${p.slug}/privacy`)}" data-link>Privacy Policy</a></li>` : ''}
        ${p.termsBlocks ? `<li><a class="toc-link lvl-2${path === `docs/${p.slug}/terms` ? ' active' : ''}" href="${href(`docs/${p.slug}/terms`)}" data-link>Terms of Service</a></li>` : ''}
      </ul>
      <div class="toc-foot">
        <a class="toc-action" href="${esc(p.productUrl || p.url)}" target="_blank" rel="noopener">${icon('external')} Open the product</a>
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
        const code = btn.closest('.code')?.querySelector('code');
        if (!code) return;
        try {
          await navigator.clipboard.writeText(code.innerText);
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
    { name: 'Building', desc: "Things I'm currently building", path: 'building', icon: 'zap' },
    { name: 'Writings', desc: 'Notes and write-ups', path: 'writings', icon: 'book' },
    { name: "Things I'm Exploring", desc: 'Ideas and topics on my radar', path: 'exploring', icon: 'map' },
    { name: 'Contact', desc: 'Get in touch', path: 'contact', icon: 'mail' },
    ...PROJECTS.map((p) => ({ name: p.name, desc: p.summary, path: `docs/${p.slug}`, icon: p.icon, tag: p.tag })),
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

    if (path === '' || path === 'index.html') {
      viewHome();
    } else if (path === 'contact') {
      viewContact();
    } else if (path === 'building') {
      viewBuilding();
    } else if (path === 'writings') {
      viewWritings();
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
    } else {
      viewNotFound();
    }

    renderNav();
    window.scrollTo(0, 0);
    updateProgress();
  }

  // ------------------------------------------------------------- simple list pages

  function viewListPage(title, lede, items, emptyText) {
    document.title = `${title} | ${PROFILE.name}`;
    $('#toc').innerHTML = '';

    const rows = items
      .map((it) => {
        const inner = `
          <span class="row-ico">${icon(it.icon)}</span>
          <span class="row-body">
            <span class="row-name">${esc(it.title)}</span>
            <span class="row-desc">${esc(it.desc)}</span>
          </span>
          ${it.tag ? `<span class="row-tag">${esc(it.tag)}</span>` : ''}`;
        return it.url
          ? `<a class="row" href="${esc(it.url)}" target="_blank" rel="noopener">${inner}<span class="row-go"><span>Open</span>${icon('arrowRight')}</span></a>`
          : `<div class="row">${inner}</div>`;
      })
      .join('');

    $('#view').innerHTML = `
      <div class="view">
        <article>
          <header class="doc-head">
            <h1 class="doc-h1">${esc(title)}</h1>
            <p class="doc-lede">${esc(lede)}</p>
          </header>
          ${items.length ? `<div class="index">${rows}</div>` : `<p class="sec-sub">${esc(emptyText)}</p>`}
        </article>
      </div>`;
  }

  function viewBuilding() {
    viewListPage('Building', "Things I'm currently building or shipping.", BUILDING, 'Nothing in progress right now — check back soon.');
  }

  function viewWritings() {
    viewListPage('Writings', 'Notes and write-ups on design and building products.', WRITINGS, "Haven't published anything yet — check back soon.");
  }

  function viewExploring() {
    viewListPage("Things I'm Exploring", 'Ideas, tools, and topics currently on my radar.', EXPLORING, 'Nothing new to share yet — check back soon.');
  }

  function viewContact() {
    document.title = `Contact | ${PROFILE.name}`;
    $('#toc').innerHTML = '';
    $('#view').innerHTML = `
      <div class="view">
        <article style="max-width: 600px; margin: 0 auto;">
          <header class="doc-head">
            <h1 class="doc-h1">Contact</h1>
            <p class="doc-lede">Feel free to reach out for collaborations, project inquiries, or just to say hi.</p>
          </header>
          
          <div class="contact-channels">
            <a href="mailto:uxnijin@gmail.com" class="channel-card">
              <span class="channel-ico">${icon('mail')}</span>
              <div class="channel-info">
                <span class="channel-label">Email</span>
                <span class="channel-value">uxnijin@gmail.com</span>
              </div>
            </a>
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
            <div class="form-status" id="form-status" style="margin-top: 16px; text-align: center; font-weight: 500;"></div>
          </form>
        </article>
      </div>`;

    const form = $('#contact-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('#form-status');
      if (!status) return;

      status.textContent = 'Sending...';
      status.style.color = 'var(--text-muted)';

      const formData = new FormData(form);
      formData.append('access_key', '09b72f4a-458d-47f1-8e83-1f8d118a6a64');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          status.textContent = 'Thank you! Your message has been sent.';
          status.style.color = 'var(--accent)';
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        status.textContent = 'Something went wrong. Please try again.';
        status.style.color = 'var(--danger-9)';
      }
    });
  }

  function viewNotFound() {
    document.title = `Not found | ${PROFILE.name}`;
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

    window.addEventListener('popstate', render);
    window.addEventListener('hashchange', render);

    render();
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
