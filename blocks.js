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
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  undo: '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-5a6 6 0 0 0-6-6H4"/>',
  timer: '<line x1="10" y1="2" x2="14" y2="2"/><line x1="12" y1="14" x2="15" y2="11"/><circle cx="12" cy="14" r="8"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',

  // ---- project marks
  // One per PROJECTS entry, so a card says what the product does rather than
  // reaching for a generic glyph (two projects used to share `check`, two more
  // shared `palette`). These render as large as 44px on a card and as small as
  // 12px in the sidebar, so each is 2-6 coarse shapes — descriptive, not
  // intricate. Nothing here is thinner than ~3 units of the 24 box.
  contrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none"/>',
  cmyk: '<circle cx="9.2" cy="9.8" r="5.2"/><circle cx="14.8" cy="9.8" r="5.2"/><circle cx="12" cy="14.6" r="5.2"/>',
  cutout:
    '<path d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8"/><path d="M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8"/><path d="M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16"/><circle cx="12" cy="10.4" r="2.6"/><path d="M7.8 18a4.6 4.6 0 0 1 8.4 0"/>',
  table:
    '<rect x="3" y="4.5" width="18" height="15" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="3" y1="14.5" x2="21" y2="14.5"/><line x1="9.5" y1="9.5" x2="9.5" y2="19.5"/>',
  typeScale:
    '<path d="M3 19 7.75 6 12.5 19"/><line x1="4.7" y1="15" x2="10.8" y2="15"/><line x1="16" y1="7" x2="21" y2="7"/><line x1="16" y1="13" x2="20" y2="13"/><line x1="16" y1="19" x2="18.5" y2="19"/>',
  swatches:
    '<path d="M5 15h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" fill="currentColor" stroke="none"/><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/>',
  extract:
    '<rect x="2.5" y="4" width="19" height="16" rx="2"/><line x1="2.5" y1="9" x2="21.5" y2="9"/><circle cx="7.5" cy="14.5" r="2.2"/><circle cx="12" cy="14.5" r="2.2"/><circle cx="16.5" cy="14.5" r="2.2"/>',
  iconGrid:
    '<rect x="3" y="3" width="8" height="8" rx="1.5"/><circle cx="17" cy="7" r="4"/><path d="M7 13.5 11 21H3z"/><rect x="13" y="13" width="8" height="8" rx="4"/>',
  checklist:
    '<path d="M3 6.5 5 8.5 9 4.5"/><line x1="12.5" y1="6.5" x2="21" y2="6.5"/><path d="M3 17.5 5 19.5 9 15.5"/><line x1="12.5" y1="17.5" x2="21" y2="17.5"/>',
  graduation: '<path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M6 10.6V16c0 1.9 2.7 3.4 6 3.4s6-1.5 6-3.4v-5.4"/>',
  car:
    '<path d="M4 16.2v-2.4l2.1-4.4a2 2 0 0 1 1.8-1.2h8.2a2 2 0 0 1 1.8 1.2l2.1 4.4v2.4"/><line x1="4" y1="13.8" x2="20" y2="13.8"/><circle cx="7.6" cy="16.4" r="1.9"/><circle cx="16.4" cy="16.4" r="1.9"/>',
  speedometer:
    '<path d="M3 17.5a9 9 0 0 1 18 0"/><line x1="12" y1="17.5" x2="16.8" y2="11.5"/><circle cx="12" cy="17.5" r="1.6" fill="currentColor" stroke="none"/>',
  waterfall:
    '<line x1="3" y1="6" x2="13" y2="6"/><line x1="6.5" y1="11" x2="21" y2="11"/><line x1="4.5" y1="16" x2="12" y2="16"/><line x1="9" y1="21" x2="17" y2="21"/>',
  server:
    '<rect x="3" y="4" width="18" height="6.5" rx="2"/><rect x="3" y="13.5" width="18" height="6.5" rx="2"/><line x1="7" y1="7.25" x2="7.01" y2="7.25"/><line x1="7" y1="16.75" x2="7.01" y2="16.75"/>',
  pin: '<path d="M20 10.5c0 6-8 11.5-8 11.5s-8-5.5-8-11.5a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.3" r="2.8"/>',

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
  medium: '<path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>',
  x_social: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  link: '<path d="M9 17H7A5 5 0 0 1 7 7h2m6 10h2a5 5 0 0 0 0-10h-2M8 12h8"/>',
  verified: '<path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"/>',
};

// stroke icons render with a 24-box + stroke; filled ones ship their own path data
const FILLED = new Set(['github', 'instagram', 'linkedin', 'youtube', 'x_social', 'medium', 'verified', 'play']);

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

// Callouts are deliberately plain: a hairline rule, a lead-in line, and the
// text. No tinted panel, no icon in a circle — those read as decoration and
// make every note look the same weight as every other note.

const renderBlock = (b) => {
  switch (b.t) {
    case 'h2':
    case 'h3': {
      const id = b.id || slugify(b.x);
      const tag = b.t;
      return `<${tag} id="${id}">${b.x}</${tag}>`;
    }

    case 'p':
      return `<p>${b.x}</p>`;

    case 'hr':
      return '<hr style="border:none;border-top:1px solid var(--border);margin:48px 0">';

    case 'callout': {
      const kind = b.kind || 'info';
      return `<div class="callout ${kind}">
        ${b.title ? `<strong class="callout-title">${b.title}</strong>` : ''}
        <p>${b.x}</p>
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

    // a moving band of app screens, full-bleed like the client logo marquee on
    // /about. The track is doubled and translated -50%, so the loop is seamless;
    // it pauses on hover, and reduced motion turns it into a strip you scroll
    // yourself rather than 60-odd phones wrapped into a wall.
    case 'screens': {
      // The band is one figure, not thirty: the wrapper carries role="img" and
      // the label, so each frame inside it is presentational and takes an empty
      // alt rather than repeating the same sentence thirty times.
      //
      // Only the first few are worth fetching eagerly. The rest are off-screen
      // in a track that is twice as long as it looks — the second copy exists
      // solely so the marquee can loop — and eager-loading all of them was
      // spending the page's whole image budget before the first paragraph.
      const frame = (it, i) =>
        `<img src="${esc(it.src || it)}" alt="" draggable="false"${
          i < 3 ? '' : ' loading="lazy"'
        } decoding="async">`;
      const shots = (b.items || []).map(frame).join('');
      const loop = (b.items || []).map((it) => frame(it, 99)).join('');
      return `<div class="screens-marquee" role="img" aria-label="${esc(
        b.label || 'App screens'
      )}">
        <div class="screens-track">${shots}${loop}</div>
      </div>`;
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

    case 'list':
      // a plain bullet list; the prose styles already cover ul/li
      return `<ul>${(b.items || []).map((x) => `<li>${x}</li>`).join('')}</ul>`;

    case 'quote':
      return `<blockquote class="pullquote"><p>${b.x}</p>${
        b.by ? `<cite>${esc(b.by)}</cite>` : ''
      }</blockquote>`;

    case 'demo':
      if (b.kind === 'scale') return renderScaleDemo();
      if (b.kind === 'currency') return renderCurrencyDemo();
      if (b.kind === 'delete') return renderDeleteDemo();
      if (b.kind === 'struggle') return renderStruggleDemo();
      if (b.kind === 'batch') return renderBatchDemo();
      if (b.kind === 'resume') return renderResumeDemo();
      if (b.kind === 'search') return renderSearchDemo();
      if (b.kind === 'zoom') return renderZoomDemo();
      if (b.kind === 'next') return renderNextDemo();
      if (b.kind === 'retry') return renderRetryDemo();
      if (b.kind === 'pay') return renderPayDemo();
      if (b.kind === 'wait') return renderWaitDemo();
      if (b.kind === 'prefetch') return renderPrefetchDemo();
      if (b.kind === 'human') return renderHumanDemo();
      if (b.kind === 'anchor') return renderAnchorDemo();
      if (b.kind === 'undo') return renderUndoDemo();
      if (b.kind === 'tabs') return renderTabsDemo();
      return '';

    default:
      return '';
  }
};

const renderBlocks = (blocks = []) => blocks.map(renderBlock).join('');

// ---------------------------------------------------------------- live demo

function renderScaleDemo() {
  return `<div class="demo" data-demo="scale">
    <div class="demo-screen">
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
    </div>
    <div class="demo-foot">
      <span>Click any swatch to copy its hex</span>
      <span class="demo-note">Linear RGB interpolation: the plugin's actual formula</span>
    </div>
  </div>`;
}

// The currency demo: the selection menu the finding describes, made real.
// Rates are fixed constants — this illustrates the interaction, not a rate feed.
const DEMO_RATES = [
  { code: 'INR', rate: 83.84 },
  { code: 'EUR', rate: 0.92 },
  { code: 'GBP', rate: 0.79 },
  { code: 'JPY', rate: 157.2 },
];

function renderCurrencyDemo() {
  return `<div class="demo cdemo" data-demo="currency" data-state="idle">
    <div class="demo-screen">
    <div class="demo-bar">
      <span class="demo-bar-l">Preferred currency</span>
      <span class="cdemo-cur">INR</span>
    </div>
    <div class="cdemo-stage">
      <div class="cdemo-menu" aria-hidden="true">
        <span class="cdemo-item">Cut</span>
        <span class="cdemo-item">Copy</span>
        <span class="cdemo-item">Paste</span>
        <span class="cdemo-item cdemo-convert">Convert to INR</span>
        <span class="cdemo-item">Select All</span>
        <span class="cdemo-item cdemo-more">&rsaquo;</span>
      </div>
      <span class="cdemo-amount">$249.99</span>
      <div class="cdemo-card" aria-hidden="true">
        <div class="cdemo-value">&asymp; <strong class="cdemo-out">&#8377;20,959.16 INR</strong></div>
        <div class="cdemo-rate"><span class="cdemo-rate-v">1 USD = &#8377;83.84</span> &middot; Updated just now</div>
      </div>
    </div>
    </div>
    <div class="demo-foot">
      <span class="cdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The delete demo: two confirmations, then the interface takes the point and
// swaps the dialog for an undo. The list resets, so it can be tried again.
const DEMO_ITEMS = [
  'Untitled project',
  'Old screenshots',
  'Draft: pricing page',
  'Scratch notes',
  'Test project',
  'Archive 2025',
];

function renderDeleteDemo() {
  return `<div class="demo ddemo" data-demo="delete" data-mode="confirm">
    <div class="demo-screen">
    <div class="demo-bar">
      <span class="ddemo-mode">Confirming every delete</span>
    </div>
    <ul class="ddemo-list">
      ${DEMO_ITEMS.map(
        (name) => `<li class="ddemo-row">
          <span class="ddemo-name">${icon('file', 'ddemo-icon')}${esc(name)}</span>
          <span class="ddemo-actions">
            <span class="ddemo-del">${icon('trash', 'ddemo-icon')}Delete</span>
          </span>
          <span class="ddemo-ask">
            <span class="ddemo-ask-q">Delete this?</span>
            <span class="ddemo-cancel">Cancel</span>
            <span class="ddemo-yes">Delete</span>
          </span>
        </li>`
      ).join('')}
    </ul>
    <div class="ddemo-toast">
      <span class="ddemo-toast-t">Deleted</span>
      <span class="ddemo-undo">Undo</span>
    </div>
    </div>
    <div class="demo-foot">
      <span class="ddemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The struggle demo runs itself: a field typed into and cleared twice, and the
// hint that follows. Nothing to click — it is a loop, not an interaction.
function renderStruggleDemo() {
  return `<div class="demo sdemo" data-demo="struggle">
    <div class="demo-screen">
    <div class="sdemo-stage">
      <label class="sdemo-label" for="sdemo-field">Order ID</label>
      <div class="sdemo-field" id="sdemo-field"><span class="sdemo-text"></span><i class="sdemo-caret"></i></div>
      <div class="sdemo-hint">
        <span class="sdemo-hint-t">Having trouble? Here&rsquo;s an example of what to enter.</span>
        <code class="sdemo-eg">ORD-2481-K</code>
      </div>
    </div>
    </div>
    <div class="demo-foot">
      <span class="sdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The batch demo also runs itself: three images rotated by hand, the offer to
// finish the other seven, and the offer being taken.
function renderBatchDemo() {
  return `<div class="demo bdemo" data-demo="batch">
    <div class="demo-screen">
    <div class="bdemo-stage">
      <div class="bdemo-grid">
        ${Array.from({ length: 10 }, (_, i) => `<span class="bdemo-tile" data-i="${i}">${icon('image', 'bdemo-glyph')}</span>`).join('')}
      </div>
      <div class="bdemo-ask">
        <span class="bdemo-ask-t">Apply this to the remaining 7 images?</span>
        <span class="bdemo-btn">Apply</span>
      </div>
    </div>
    </div>
    <div class="demo-foot">
      <span class="bdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The resume demo: a form part-filled, the page left to look something up, and
// the return landing on the field that was still empty.
const DEMO_FIELDS = [
  { key: 'name', label: 'Full name' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'pin', label: 'PIN code' },
];

function renderResumeDemo() {
  return `<div class="demo rdemo" data-demo="resume">
    <div class="demo-screen">
    <div class="demo-bar">
      <span class="demo-bar-l">Delivery details</span>
    </div>
    <div class="rdemo-stage">
      <div class="rdemo-form">
        ${DEMO_FIELDS.map(
          (f) => `<div class="rdemo-row" data-f="${f.key}">
            <span class="rdemo-label">${f.label}</span>
            <span class="rdemo-input"><span class="rdemo-v"></span><i class="rdemo-caret"></i></span>
          </div>`
        ).join('')}
      </div>
      <div class="rdemo-note">You were here. <strong>PIN code</strong> is still missing.</div>
      <div class="rdemo-away"><span class="rdemo-away-t">Left the page to look up the PIN</span></div>
    </div>
    </div>
    <div class="demo-foot">
      <span class="rdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The search demo: the dead end, and the same failure answered usefully. The
// budget, the raised cap and every price come off these three constants, so
// the copy and the results cannot drift apart.
const DEMO_BUDGET = 2000;
const DEMO_CAP = 3000;
const DEMO_HITS = [
  { name: 'Court Low', price: 2199 },
  { name: 'Runner GT', price: 2499 },
  { name: 'Trail Lite', price: 2699 },
  { name: 'Air Step', price: 2899 },
];

const rupees = (n) => `\u20b9${n.toLocaleString('en-IN')}`;

function renderSearchDemo() {
  const query = `black Nike shoes under ${rupees(DEMO_BUDGET)}`;
  return `<div class="demo qdemo" data-demo="search" data-state="idle" data-query="${esc(query)}">
    <div class="demo-screen">
    <div class="qdemo-stage">
      <div class="qdemo-field">
        ${icon('search', 'qdemo-ico')}
        <span class="qdemo-q"></span><i class="qdemo-caret"></i>
        <span class="qdemo-go">Search</span>
      </div>
      <div class="qdemo-panels">
        <div class="qdemo-help">
          <div class="qdemo-help-t">No results for &ldquo;<strong>${esc(query)}</strong>&rdquo;</div>
          <div class="qdemo-help-s">Nothing under ${rupees(DEMO_BUDGET)}. The closest ${DEMO_HITS.length} start at ${rupees(
            DEMO_HITS[0].price
          )}.</div>
          <span class="qdemo-cta">Show results up to ${rupees(DEMO_CAP)}</span>
        </div>
        <div class="qdemo-results">
          ${DEMO_HITS.map(
            (h) => `<span class="qdemo-hit">
              <span class="qdemo-hit-img">${icon('image', 'qdemo-hit-ico')}</span>
              <span class="qdemo-hit-n">${h.name}</span>
              <span class="qdemo-hit-p">${rupees(h.price)}</span>
            </span>`
          ).join('')}
        </div>
      </div>
    </div>
    </div>
    <div class="demo-foot">
      <span class="qdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The steady demo: the same five deletes, once with the button moving under
// the pointer and once with it staying where it was.
// The zoom demo: the same card opened twice — cut to a new screen, then grown
// into one. The hero is the detail panel; it is only ever sized differently.
const DEMO_SHOP = [
  { name: 'Field Lamp', price: '\u20b92,400' },
  { name: 'Desk Clock', price: '\u20b91,850' },
  { name: 'Stone Vase', price: '\u20b93,100' },
];

function renderZoomDemo() {
  const hero = DEMO_SHOP[1];
  return `<div class="demo zdemo" data-demo="zoom" data-state="grid">
    <div class="demo-screen">
      <div class="zdemo-stage">
        <div class="zdemo-grid">
          ${DEMO_SHOP.map(
            (p, i) => `<span class="zdemo-card${i === 1 ? ' is-hero' : ''}">
              <span class="zdemo-img">${icon('image', 'zdemo-ico')}</span>
              <span class="zdemo-n">${p.name}</span>
              <span class="zdemo-p">${p.price}</span>
            </span>`
          ).join('')}
        </div>
        <div class="zdemo-hero">
          <span class="zdemo-img">${icon('image', 'zdemo-ico')}</span>
          <span class="zdemo-n">${hero.name}</span>
          <span class="zdemo-p">${hero.price}</span>
          <span class="zdemo-more">
            <span class="zdemo-line"></span>
            <span class="zdemo-line short"></span>
            <span class="zdemo-buy">Add to cart</span>
          </span>
        </div>
      </div>
    </div>
    <div class="demo-foot">
      <span class="zdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The next demo: the same checkout step with a button that says nothing, and
// then with one that names where it goes.
const DEMO_STEPS = ['Cart', 'Address', 'Payment'];

function renderNextDemo() {
  return `<div class="demo ndemo" data-demo="next" data-at="1">
    <div class="demo-screen">
      <div class="ndemo-stage">
        <div class="ndemo-steps">
          ${DEMO_STEPS.map(
            (name, i) => `<span class="ndemo-stp" data-i="${i}">
              <span class="ndemo-dot"></span>${name}
            </span>`
          ).join('')}
        </div>
        <div class="ndemo-panel">
          <span class="ndemo-h">Delivery address</span>
          <span class="ndemo-line"></span>
          <span class="ndemo-line short"></span>
        </div>
        <div class="ndemo-actions">
          <span class="ndemo-back">Back</span>
          <span class="ndemo-go">Continue</span>
        </div>
      </div>
    </div>
    <div class="demo-foot">
      <span class="ndemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The retry demo: three dashboard tiles, one of which failed, and a retry that
// touches only that tile.
const DEMO_TILES = [
  { key: 'revenue', label: 'Revenue', value: '\u20b94.2L' },
  { key: 'users', label: 'Users', value: '1,284' },
  { key: 'orders', label: 'Orders', value: '312' },
];

function renderRetryDemo() {
  return `<div class="demo tdemo" data-demo="retry" data-state="failed">
    <div class="demo-screen">
      <div class="demo-bar">
        <span class="demo-bar-l">This week</span>
      </div>
      <div class="tdemo-stage">
        ${DEMO_TILES.map(
          (t) => `<div class="tdemo-tile" data-t="${t.key}">
            <span class="tdemo-l">${t.label}</span>
            <span class="tdemo-v">${t.value}</span>
            ${
              t.key === 'orders'
                ? `<span class="tdemo-fail">
              <span class="tdemo-fail-t">${icon('warn', 'tdemo-warn')}Couldn&rsquo;t load</span>
              <span class="tdemo-retry">Try again</span>
            </span>
            <span class="tdemo-spin" aria-hidden="true"></span>`
                : ''
            }
          </div>`
        ).join('')}
      </div>
    </div>
    <div class="demo-foot">
      <span class="tdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The pay demo: one press, and everything after it saying so.
function renderPayDemo() {
  return `<div class="demo pdemo" data-demo="pay" data-state="ready">
    <div class="demo-screen">
      <div class="pdemo-stage">
        <span class="pdemo-total">
          <span class="pdemo-total-l">Total</span>
          <span class="pdemo-total-v">&#8377;500</span>
        </span>
        <span class="pdemo-btn">
          <span class="pdemo-spin" aria-hidden="true"></span>
          <span class="pdemo-label">Pay &#8377;500</span>
        </span>
        <span class="pdemo-note">Do not close this screen</span>
      </div>
    </div>
    <div class="demo-foot">
      <span class="pdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The wait demo: a load that outstays its welcome, and says so as it goes.
function renderWaitDemo() {
  return `<div class="demo wdemo" data-demo="wait" data-state="short">
    <div class="demo-screen">
      <div class="wdemo-stage">
        <span class="wdemo-spin" aria-hidden="true"></span>
        <span class="wdemo-msg">Loading&hellip;</span>
        <span class="wdemo-sub">Fetching your report</span>
        <span class="wdemo-act">Try again</span>
        <span class="wdemo-clock">0.0s</span>
      </div>
    </div>
    <div class="demo-foot">
      <span class="wdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The prefetch demo draws the mechanism rather than the feeling: one time axis,
// three lanes, and the request sitting entirely inside the gap between the
// hover and the click. Every mark is placed from these numbers.
const DEMO_TRACE = {
  span: 900,
  hover: 120,
  request: 320,
  click: 700,
};

function renderPrefetchDemo() {
  const t = DEMO_TRACE;
  const lane = (key, label, inner) => `<div class="hdemo-lane" data-l="${key}">
    <span class="hdemo-ll">${label}</span>
    <span class="hdemo-track">${inner}</span>
  </div>`;
  return `<div class="demo hdemo" data-demo="prefetch" data-state="idle">
    <div class="demo-screen">
      <div class="hdemo-stage">
        <div class="hdemo-cards">
          ${['Field Lamp', 'Desk Clock', 'Stone Vase']
            .map(
              (n, i) => `<span class="hdemo-card${i === 1 ? ' is-target' : ''}">
                <span class="hdemo-thumb"></span>
                <span class="hdemo-n">${n}</span>
              </span>`
            )
            .join('')}
        </div>
        <div class="hdemo-time">
          <div class="hdemo-axis">
            <span>0</span><span>300&#8202;ms</span><span>600&#8202;ms</span><span>${t.span}&#8202;ms</span>
          </div>
          ${lane(
            'pointer',
            'Pointer',
            `<i class="hdemo-mark" data-m="hover"><b></b>hover</i>
             <i class="hdemo-mark" data-m="click"><b></b>click</i>`
          )}
          ${lane(
            'net',
            'Network',
            `<i class="hdemo-bar"><em>GET /desk-clock</em></i>
             <i class="hdemo-mark" data-m="ready"><b></b>in cache</i>`
          )}
          ${lane('screen', 'Screen', `<i class="hdemo-mark" data-m="paint"><b></b>painted &middot; 0&#8202;ms wait</i>`)}
        </div>
      </div>
    </div>
    <div class="demo-foot">
      <span class="hdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The human demo shows the check that replaces the CAPTCHA: signals arriving
// while the form is being filled, and a score that has to clear a threshold
// before the challenge is skipped. The score is summed from the weights, and
// the threshold is drawn at the number it actually compares against.
const DEMO_SIGNALS = [
  { key: 'pointer', label: 'Pointer path', note: 'curved, human speed', weight: 26 },
  { key: 'typing', label: 'Typing rhythm', note: 'uneven gaps', weight: 24 },
  { key: 'timing', label: 'Click timing', note: '340\u2009ms after focus', weight: 22 },
  { key: 'nav', label: 'Navigation', note: 'came from the home page', weight: 16 },
  { key: 'device', label: 'Touch and scroll', note: 'consistent with the device', weight: 12 },
];
const DEMO_THRESHOLD = 82;

function renderHumanDemo() {
  return `<div class="demo gdemo" data-demo="human" data-state="idle">
    <div class="demo-screen">
      <div class="gdemo-stage">
        <div class="gdemo-form">
          <span class="gdemo-fl">Email</span>
          <span class="gdemo-input"><span class="gdemo-v"></span><i class="gdemo-caret"></i></span>
          <span class="gdemo-go">Continue</span>
          <span class="gdemo-done">${icon('checkCircle', 'gdemo-done-i')}Signed in \u2014 no challenge shown</span>
        </div>
        <div class="gdemo-panel">
          <span class="gdemo-h">Is this a person?</span>
          <ul class="gdemo-signals">
            ${DEMO_SIGNALS.map(
              (g) => `<li class="gdemo-sig" data-s="${g.key}">
                <span class="gdemo-tick">${icon('check', 'gdemo-tick-i')}</span>
                <span class="gdemo-sl">${g.label}</span>
                <span class="gdemo-sn">${g.note}</span>
                <span class="gdemo-sw">+${g.weight}</span>
              </li>`
            ).join('')}
          </ul>
          <div class="gdemo-meter">
            <span class="gdemo-fill"></span>
            <span class="gdemo-mark" style="left:${DEMO_THRESHOLD}%"><i></i>challenge below ${DEMO_THRESHOLD}</span>
          </div>
          <span class="gdemo-score">0</span>
        </div>
      </div>
    </div>
    <div class="demo-foot">
      <span class="gdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The anchor demo: a page with something loading above the line being read.
// The image height and the scroll correction are the same number, which is the
// entire mechanism, so both labels are written from it.
const DEMO_SHIFT = 176;

function renderAnchorDemo() {
  const para = (cls = '') => `<span class="ldemo-p ${cls}"><i></i><i></i><i></i></span>`;
  return `<div class="demo ldemo" data-demo="anchor" data-state="before">
    <div class="demo-screen">
      <div class="ldemo-stage">
        <div class="ldemo-view">
          <div class="ldemo-doc">
            ${para()}
            ${para()}
            ${para()}
            <span class="ldemo-slot"><span class="ldemo-img">${icon('image', 'ldemo-img-i')}</span></span>
            <span class="ldemo-p is-read">The line you were reading, four paragraphs down.</span>
            ${para()}
            ${para()}
            ${para()}
          </div>
          <span class="ldemo-guide"><i></i>reading here</span>
        </div>
        <div class="ldemo-notes">
          <span class="ldemo-note" data-n="load"><b></b>image loads above &middot; +${DEMO_SHIFT}&#8202;px</span>
          <span class="ldemo-note" data-n="fix"><b></b>scroll corrected &middot; +${DEMO_SHIFT}&#8202;px</span>
          <span class="ldemo-note" data-n="net"><b></b>the line you were reading &middot; 0&#8202;px</span>
        </div>
      </div>
    </div>
    <div class="demo-foot">
      <span class="ldemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The undo demo runs a real stack: each action pushes an entry, and the key
// pops the top one and reverses it. The list on the right is the stack, not a
// picture of one.
const DEMO_FILES = ['Homepage copy', 'Pricing draft', 'Scratch notes', 'Launch checklist'];

function renderUndoDemo() {
  return `<div class="demo udemo" data-demo="undo">
    <div class="demo-screen">
      <div class="udemo-stage">
        <ul class="udemo-list">
          ${DEMO_FILES.map(
            (name, i) => `<li class="udemo-row" data-id="${i}">
              <span class="udemo-n">${icon('file', 'udemo-ico')}<span class="udemo-nt">${esc(name)}</span></span>
              <span class="udemo-tags"><span class="udemo-done">${icon('check', 'udemo-done-i')}Done</span></span>
            </li>`
          ).join('')}
        </ul>
        <div class="udemo-side">
          <span class="udemo-h">Undo stack</span>
          <ul class="udemo-stack"></ul>
          <span class="udemo-empty">nothing to undo</span>
          <span class="udemo-key"><b>\u2318</b><b>Z</b></span>
        </div>
      </div>
    </div>
    <div class="demo-foot">
      <span class="udemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
    </div>
  </div>`;
}

// The tabs demo: a strip that holds its tab widths while the pointer is closing
// tabs, so the next close button arrives in the slot the last one left. The
// widths only relax once the pointer leaves.
const DEMO_TABS = [
  'Inbox', 'Calendar', 'Docs', 'Figma', 'GitHub', 'Analytics', 'Notes', 'Music',
];

function renderTabsDemo() {
  return `<div class="demo xdemo" data-demo="tabs" data-hold="on">
    <div class="demo-screen">
      <div class="xdemo-stage">
        <div class="xdemo-strip">
          ${DEMO_TABS.map(
            (name) => `<span class="xdemo-tab">
              <span class="xdemo-fav"></span>
              <span class="xdemo-t">${esc(name)}</span>
              <span class="xdemo-x">${icon('x', 'xdemo-x-i')}</span>
            </span>`
          ).join('')}
        </div>
        <div class="xdemo-page"><span class="xdemo-url"></span></div>
        <span class="xdemo-guide"><i></i></span>
      </div>
    </div>
    <div class="demo-foot">
      <span class="xdemo-step">Watching</span>
      <span class="demo-note">Runs on its own</span>
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
