// ============================================================================
//  blocks.js: icon set + the block renderer.
//  Turns the `blocks` arrays in data.js into HTML. See data.js for the DSL.
// ============================================================================

const ICONS = {
  // product / nav
  palette: '<path d="M12 2a10 10 0 0 0 0 20c.6 0 1-.4 1-1 0-.3-.1-.5-.3-.7-.2-.2-.3-.5-.3-.8 0-.6.4-1 1-1H15a5 5 0 0 0 5-5c0-4.4-3.6-8-8-8Z"/><circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>',
  type: '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  window: '<rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="9" x2="22" y2="9"/><circle cx="5.5" cy="6.5" r=".6" fill="currentColor"/>',
  sidebar: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="15" y1="3" x2="15" y2="21"/>',
  droplet: '<path d="M12 2.7 6.9 7.8a7.2 7.2 0 1 0 10.2 0L12 2.7Z"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  braces: '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  gauge: '<path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M13.4 10.6 19 5"/><path d="M20.5 16a9 9 0 1 0-17 0"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  timer: '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  // ui
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  whatsapp: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3" fill="currentColor" stroke="none"/>',
  hash: '<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>',
  slider: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  moveH: '<polyline points="9 6 3 12 9 18"/><polyline points="15 6 21 12 15 18"/>',
  info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  warn: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  danger: '<polygon points="7.9 2 16.1 2 22 7.9 22 16.1 16.1 22 7.9 22 2 16.1 2 7.9 7.9 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  checkCircle: '<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><polyline points="22 4 12 14.01 9 11.01"/>',
  figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
  smartphone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><line x1="10.5" y1="19" x2="13.5" y2="19"/>',
  cart: '<circle cx="9" cy="21" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="21" r="1.4" fill="currentColor" stroke="none"/><path d="M2.5 3h2.6l2.4 12.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21.5 7H6"/>',
  // socials (filled)
  github: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
  instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>',
  linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  youtube: '<path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.136C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.482A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.136c1.87.482 9.388.482 9.388.482s7.518 0 9.388-.482a3.002 3.002 0 0 0 2.11-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
  x_social: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  link: '<path d="M9 17H7A5 5 0 0 1 7 7h2m6 10h2a5 5 0 0 0 0-10h-2M8 12h8"/>',
  verified: '<path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"/>',
};

// stroke icons render with a 24-box + stroke; filled ones ship their own path data
const FILLED = new Set(['github', 'instagram', 'linkedin', 'youtube', 'x_social', 'verified', 'play']);

const icon = (name, cls = '') => {
  const d = ICONS[name] || ICONS.link;
  const vb = name === 'verified' ? '0 0 40 40' : '0 0 24 24';
  if (FILLED.has(name)) {
    return `<svg class="${cls}" viewBox="${vb}" fill="currentColor" aria-hidden="true">${d}</svg>`;
  }
  return `<svg class="${cls}" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
};

// ---------------------------------------------------------------- utilities

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// code needs & < > escaped but must keep quotes literal so the tokenizer works
const escCode = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const slugify = (s = '') =>
  String(s)
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const KEYWORDS =
  'const|let|var|function|return|if|else|for|while|do|new|import|export|from|default|class|extends|async|await|typeof|instanceof|of|in|null|undefined|true|false|this|try|catch|throw';

const highlight = (code, lang) => {
  const s = escCode(code);
  if (lang === 'text' || lang === 'bash') return s;
  const re = new RegExp(
    [
      '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)', // 1 comment
      "('(?:[^'\\\\\\n]|\\\\.)*'|\"(?:[^\"\\\\\\n]|\\\\.)*\"|`(?:[^`\\\\]|\\\\.)*`)", // 2 string
      `\\b(${KEYWORDS})\\b`, // 3 keyword
      '\\b(\\d+(?:\\.\\d+)?)\\b', // 4 number
      '\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()', // 5 call
    ].join('|'),
    'g'
  );
  return s.replace(re, (m, c, str, kw, num, fn) => {
    if (c) return `<span class="tk-c">${c}</span>`;
    if (str) return `<span class="tk-s">${str}</span>`;
    if (kw) return `<span class="tk-k">${kw}</span>`;
    if (num) return `<span class="tk-n">${num}</span>`;
    if (fn) return `<span class="tk-f">${fn}</span>`;
    return m;
  });
};

const placeholder = (label = 'Screenshot') =>
  `<div class="ph">${icon('image')}<span>${esc(label)}</span></div>`;

// ---------------------------------------------------------------- blocks

const CALLOUT_ICON = { info: 'info', success: 'checkCircle', warning: 'warn', danger: 'danger' };

const renderBlock = (b) => {
  switch (b.t) {
    case 'h2':
    case 'h3': {
      const id = b.id || slugify(b.x);
      const tag = b.t;
      return `<${tag} id="${id}"><a class="heading-anchor" href="#${id}" aria-label="Link to this section">#</a>${b.x}</${tag}>`;
    }

    case 'p':
      return `<p>${b.x}</p>`;

    case 'hr':
      return '<hr style="border:none;border-top:1px solid var(--border);margin:48px 0">';

    case 'callout': {
      const kind = b.kind || 'info';
      return `<div class="callout ${kind}">
        <div class="callout-ico">${icon(CALLOUT_ICON[kind] || 'info')}</div>
        <div class="callout-body">
          ${b.title ? `<strong class="callout-title">${b.title}</strong>` : ''}
          <p>${b.x}</p>
        </div>
      </div>`;
    }

    case 'code':
      return `<div class="code">
        <div class="code-bar">
          <span class="code-file">${esc(b.file || '')}</span>
          ${b.lang ? `<span class="code-lang">${esc(b.lang)}</span>` : ''}
          <button class="copy-btn" type="button" aria-label="Copy code" data-copy>
            ${icon('copy', 'copy')}${icon('check', 'check')}
          </button>
        </div>
        <pre><code>${highlight(b.x, b.lang)}</code></pre>
      </div>`;

    case 'launch':
      return `<a class="launch" href="${esc(b.url)}" target="_blank" rel="noopener">
        <span class="launch-ico">${icon('external')}</span>
        <span class="launch-body">
          <h4>${esc(b.title)}</h4>
          <p>${esc(b.desc || '')}</p>
        </span>
        <span class="cta">${esc(b.label || 'Open')} ${icon('arrowRight')}</span>
      </a>`;

    case 'image': {
      const inner = b.src
        ? `<img src="${esc(b.src)}" alt="${esc(b.alt || '')}" loading="lazy" decoding="async">`
        : placeholder(b.alt || 'Screenshot');
      const ratio = b.src ? '' : ` ratio-${b.ratio || '16-9'}`;
      return `<figure class="figure${b.bleed ? ' bleed' : ''}">
        <div class="frame${ratio}"${b.src ? ' data-zoom data-tilt-3d' : ''}>${inner}</div>
        ${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}
      </figure>`;
    }

    case 'gallery':
      return `<div class="gallery">${(b.items || [])
        .map(
          (it) => `<div class="frame"${it.src ? ' data-zoom data-tilt-3d' : ''}>${
            it.src
              ? `<img src="${esc(it.src)}" alt="${esc(it.alt || '')}" loading="lazy" decoding="async">`
              : placeholder(it.alt || 'Screenshot')
          }</div>`
        )
        .join('')}</div>`;

    case 'video': {
      if (b.youtube) {
        return `<div class="embed" data-embed="https://www.youtube-nocookie.com/embed/${esc(b.youtube)}?autoplay=1">
          <div class="facade">
            <div class="facade-inner">
              <span class="facade-play">${icon('play')}</span>
              <span class="facade-label">${esc(b.label || 'Play video')}</span>
              <span class="facade-sub">Loads YouTube when you click</span>
            </div>
          </div>
        </div>`;
      }
      if (!b.src) {
        return `<div class="embed"><div class="ph" style="height:100%">${icon('play')}<span>${esc(
          b.label || 'Video'
        )}</span></div></div>`;
      }
      return `<div class="embed"><video controls preload="none"${
        b.poster ? ` poster="${esc(b.poster)}"` : ''
      } src="${esc(b.src)}"></video></div>`;
    }

    case 'figma': {
      if (!b.url) {
        return `<div class="embed"><div class="ph" style="height:100%">${icon('figma')}<span>Figma embed</span></div></div>`;
      }
      const src = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(b.url)}`;
      return `<div class="embed" data-embed="${esc(src)}">
        <div class="facade">
          <div class="facade-inner">
            <span class="facade-play">${icon('figma')}</span>
            <span class="facade-label">${esc(b.label || 'Open Figma file')}</span>
            <span class="facade-sub">Loads Figma when you click</span>
          </div>
        </div>
      </div>`;
    }

    case 'compare': {
      const pane = (src, alt, label) =>
        src
          ? `<img src="${esc(src)}" alt="${esc(alt || '')}" loading="lazy" draggable="false">`
          : placeholder(label);
      return `<figure class="figure">
        <div class="compare" data-compare style="--pos:50%">
          <div class="compare-pane">${pane(b.before, b.beforeLabel, b.beforeLabel || 'Before')}</div>
          <div class="compare-pane after">${pane(b.after, b.afterLabel, b.afterLabel || 'After')}</div>
          <span class="compare-tag l">${esc(b.beforeLabel || 'Before')}</span>
          <span class="compare-tag r">${esc(b.afterLabel || 'After')}</span>
          <div class="compare-handle"><span class="compare-grip">${icon('moveH')}</span></div>
        </div>
        ${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}
      </figure>`;
    }

    case 'diagram':
      return `<figure class="figure"><div class="diagram">${b.svg}</div>${
        b.caption ? `<figcaption>${b.caption}</figcaption>` : ''
      }</figure>`;

    case 'cards':
      return `<div class="cards">${(b.items || [])
        .map(
          (it) => `<div class="card" data-tilt>
            ${it.icon ? `<span class="card-ico">${icon(it.icon)}</span>` : ''}
            <h4>${esc(it.title)}</h4>
            <p>${it.desc}</p>
          </div>`
        )
        .join('')}</div>`;

    case 'steps':
      return `<ol class="steps">${(b.items || [])
        .map((it) => `<li class="step"><h4>${esc(it.title)}</h4><p>${it.desc}</p></li>`)
        .join('')}</ol>`;

    case 'table':
      return `<div class="table-wrap"><table>
        <thead><tr>${(b.head || []).map((h) => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${(b.rows || [])
          .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
          .join('')}</tbody>
      </table></div>`;

    case 'stats':
      return `<div class="stats">${(b.items || [])
        .map((it) => `<div class="stat"><div class="stat-v">${esc(it.v)}</div><div class="stat-l">${esc(it.l)}</div></div>`)
        .join('')}</div>`;

    case 'quote':
      return `<blockquote class="callout"><div class="callout-body"><p>${b.x}</p>${
        b.by ? `<p style="color:var(--text-faint) !important;font-size:13.5px !important">- ${esc(b.by)}</p>` : ''
      }</div></blockquote>`;

    case 'demo':
      if (b.kind === 'scale') return renderScaleDemo();
      if (b.kind === 'aeros-slider') return renderAerosSlider();
      if (b.kind === 'aeros-gauge') return renderAerosGauge();
      if (b.kind === 'aeros-rank') return renderAerosRank();
      return '';

    default:
      return '';
  }
};

const renderBlocks = (blocks = []) => blocks.map(renderBlock).join('');

// ---------------------------------------------------------------- live demo

function renderScaleDemo() {
  return `<div class="demo" data-demo="scale">
    <div class="demo-bar">
      <label for="demo-color">Base color</label>
      <input type="color" id="demo-color" class="demo-swatch-input" value="#8c52ff" aria-label="Base color picker">
      <input type="text" class="demo-hex" value="#8C52FF" spellcheck="false" aria-label="Base color hex value">
      <span class="demo-steps">
        <label for="demo-steps">Steps</label>
        <input type="range" id="demo-steps" min="2" max="6" value="4" aria-label="Number of steps each side">
        <span class="demo-steps-v" style="font-variant-numeric:tabular-nums">4</span>
      </span>
    </div>
    <div class="demo-scale" role="list"></div>
    <div class="demo-foot">
      <span>Click any swatch to copy its hex</span>
      <span class="demo-note">Linear RGB interpolation: the plugin's actual formula</span>
    </div>
  </div>`;
}

// ------------------------------------------------- live Aeros components
//
//  Faithful vanilla rebuilds of three components from the Aeros dashboard,
//  so the case study can be tried rather than only looked at. Geometry and
//  easing are copied from the React source; each renders on its own dark
//  Aeros surface regardless of the site theme, because that is the context
//  the components were designed for.

function renderAerosSlider() {
  return `<div class="demo ademo" data-demo="aeros-slider">
    <div class="demo-bar">
      <label>Temperature target</label>
      <span class="ademo-readout"><b class="ademo-val">24.0</b><span class="ademo-unit">°C</span></span>
      <span class="ademo-hint">drag, click, or focus and use &larr; &rarr;</span>
    </div>
    <div class="ademo-stage">
      <div class="ademo-slider" role="slider" tabindex="0" aria-label="Temperature target"
           aria-valuemin="16" aria-valuemax="32" aria-valuenow="24">
        <div class="ademo-ticks"></div>
        <div class="ademo-handle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M4 8h10M18 8h2M4 16h4M12 16h8"/>
            <circle cx="16" cy="8" r="2"/><circle cx="10" cy="16" r="2"/>
          </svg>
        </div>
      </div>
      <div class="ademo-axis"><span>16&deg;C</span><span>24&deg;C</span><span>32&deg;C</span></div>
    </div>
    <div class="demo-foot">
      <span>64 hairlines, height graded along the track</span>
      <span class="demo-note">Past 72% the fill turns warm &mdash; the app's own rule</span>
    </div>
  </div>`;
}

function renderAerosGauge() {
  return `<div class="demo ademo" data-demo="aeros-gauge">
    <div class="demo-bar">
      <label for="ademo-mult">Room condition</label>
      <input type="range" id="ademo-mult" min="30" max="190" value="80" aria-label="Room condition">
      <span class="ademo-cond">Comfortable</span>
      <button type="button" class="ademo-btn" data-replay>Replay motion</button>
    </div>
    <div class="ademo-stage ademo-gauge-stage">
      <div class="ademo-grid">
        <span style="bottom:75%"></span>
        <span style="bottom:50%"><i>Normal</i></span>
        <span style="bottom:25%"></span>
      </div>
      <div class="ademo-cols"></div>
    </div>
    <div class="demo-foot">
      <span>Five gases, five unit systems, one comparison</span>
      <span class="demo-note">Each column crosses the line at <em>its own</em> warning value</span>
    </div>
  </div>`;
}

function renderAerosRank() {
  return `<div class="demo ademo" data-demo="aeros-rank">
    <div class="demo-bar">
      <span class="ademo-seg">
        <button type="button" data-mode="rank" class="is-on">Top-6 by rank</button>
        <button type="button" data-mode="threshold">Above average</button>
      </span>
      <button type="button" class="ademo-btn" data-reshuffle>New series</button>
      <span class="ademo-hint ademo-count"></span>
    </div>
    <div class="ademo-stage">
      <svg class="ademo-bars" viewBox="0 0 440 120" preserveAspectRatio="none" aria-hidden="true"></svg>
    </div>
    <div class="demo-foot">
      <span>The same trending series, highlighted two ways</span>
      <span class="demo-note">Switch to "above average" and watch the accent become a solid block</span>
    </div>
  </div>`;
}

// Exact algorithm from the plugin: blend RGB channels toward 255 / 0.
const hexToRgb = (hex) => {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = (rgb) => '#' + rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('').toUpperCase();

const buildScale = (baseHex, steps) => {
  const rgb = hexToRgb(baseHex);
  const shades = [];
  const tints = [];
  for (let i = 1; i <= steps; i++) {
    const factor = i / (steps + 1);
    shades.unshift(rgb.map((c) => c * (1 - factor)));
    tints.push(rgb.map((c) => c + (255 - c) * factor));
  }
  return [...shades, rgb, ...tints];
};

// YIQ brightness: same contrast heuristic the plugin's demo uses
const readable = (rgb) => ((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 >= 140 ? '#1d1d1d' : '#ffffff');

const isHex = (v) => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());
