// ============================================================================
//  analytics.js — Microsoft Clarity.
//
//  Clarity gives you visitors, sessions, clicks, scroll depth, time spent,
//  locations, and heatmaps automatically the moment the tag is on the page.
//  This file does the tag, plus the three things a single-page site has to add
//  by hand for those numbers to be worth reading:
//
//    1. every route change is announced, so heatmaps and scroll depth are
//       recorded per page instead of all landing on "/"
//    2. every page carries custom tags (page type, slug, category, status), so
//       the dashboard can be filtered to "all case studies" or one project
//    3. the clicks that actually matter — a product opened, a case study read,
//       the contact form sent — are sent as custom events
//
//  ---------------------------------------------------------------------------
//  SET YOUR PROJECT ID BELOW. Find it at clarity.microsoft.com →
//  Settings → Overview → Project ID (a short string like "qwe123rty4").
//  ---------------------------------------------------------------------------
// ============================================================================

const ANALYTICS = {
  clarityProjectId: '', // ← paste it here
  // sessions on these routes are flagged so Clarity always keeps the recording
  prioritise: ['contact', 'about'],
};

(() => {
  const projectId = ANALYTICS.clarityProjectId;

  if (!projectId) {
    console.info('[analytics] no Clarity project ID set, see analytics.js');
    window.track = () => {};
    return;
  }

  // ---- the standard Clarity tag
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', projectId);

  const clarity = (...args) => {
    try {
      window.clarity && window.clarity(...args);
    } catch (e) {
      /* never let analytics break a render */
    }
  };

  // ---- custom events, also callable from anywhere as window.track('name')
  window.track = (name, tags) => {
    if (!name) return;
    clarity('event', name);
    if (tags) Object.entries(tags).forEach(([k, v]) => v && clarity('set', k, String(v)));
  };

  // ---- route → tags
  // Called by script.js on every render, so each SPA page is tagged and
  // measured separately rather than everything piling onto the entry URL.
  const routeInfo = (path) => {
    if (!path) return { type: 'home', name: 'Home' };
    if (path === 'designs') return { type: 'designs-index', name: 'Designs' };
    if (path === 'projects') return { type: 'projects-index', name: 'Projects' };
    if (path === 'findings') return { type: 'findings-index', name: 'Findings' };
    if (path === 'about') return { type: 'about', name: 'About' };
    if (path === 'contact') return { type: 'contact', name: 'Contact' };
    if (path.startsWith('designs/')) {
      const slug = path.slice(8);
      const d = (window.DESIGNS || []).find((x) => x.slug === slug) || {};
      return { type: 'case-study', name: d.name || slug, slug, category: d.category, status: d.status };
    }
    if (path.startsWith('docs/')) {
      const slug = path.slice(5).split('/')[0];
      const p = (window.PROJECTS || []).find((x) => x.slug === slug) || {};
      const sub = path.split('/')[2];
      return {
        type: sub ? `project-${sub}` : 'project',
        name: p.name || slug,
        slug,
        category: p.group,
        status: p.status,
      };
    }
    if (path.startsWith('findings/')) return { type: 'article', name: path.slice(9), slug: path.slice(9) };
    return { type: 'not-found', name: path };
  };

  let lastPath = null;

  window.trackPage = (path) => {
    if (path === lastPath) return;
    lastPath = path;
    const info = routeInfo(path);

    // give Clarity an explicit page identity so heatmaps group correctly
    clarity('identify', 'visitor', undefined, path || 'home', info.name);

    clarity('set', 'page_type', info.type);
    clarity('set', 'page_name', info.name);
    if (info.slug) clarity('set', 'slug', info.slug);
    if (info.category) clarity('set', 'category', info.category);
    if (info.status) clarity('set', 'status', info.status);

    if (ANALYTICS.prioritise.includes(path) || info.type === 'case-study') {
      clarity('upgrade', info.type);
    }
  };

  // ---- the clicks worth naming
  // Matched against the click target itself, not a link ancestor: some of
  // these (a figure opening the lightbox, a logo in the marquee) are not
  // anchors at all.
  const CLICKS = [
    ['.frame', 'zoom_figure'],
    ['.logo-marquee', 'client_logo_click'],
    ['.promo-bar', 'promo_click'],
    ['.hero-actions .btn-primary', 'hero_primary_cta'],
    ['.hero-actions .btn-secondary', 'hero_secondary_cta'],
    ['.rail .btn-primary', 'open_product_from_rail'],
    ['.doc-links', 'open_product'],
    ['.acard', 'open_case_study'],
    ['.pcard-wrap, .show-card', 'open_project'],
    ['.news-item', 'open_latest'],
    ['.cat-pill', 'filter_category'],
    ['.nav-panel', 'nav_dropdown'],
    ['.secnav', 'section_jump'],
    ['.contact-row', 'contact_channel'],
    ['.icon-btn-c', 'social_click'],
    ['.page-nav', 'page_nav'],
    ['.topnav', 'nav_click'],
    ['.site-foot', 'footer_click'],
  ];

  document.addEventListener(
    'click',
    (e) => {
      for (const [selector, name] of CLICKS) {
        if (e.target.closest(selector)) {
          window.track(name);
          return;
        }
      }
    },
    { passive: true }
  );

  // outbound clicks, whatever they are
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest('a[href^="http"]');
      if (!a) return;
      try {
        const host = new URL(a.href).hostname;
        if (host && host !== location.hostname) window.track('outbound', { outbound_host: host });
      } catch (err) {
        /* malformed href */
      }
    },
    { passive: true }
  );
})();
