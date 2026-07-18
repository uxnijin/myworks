// ============================================================================
//  ShipFlow: Shipment Operations Dashboard
//  Web (B2B SaaS) Design Case Study
//
//  Designed and built in code. A real, clickable product, not a Figma file.
//  Live: https://parcel-trackings.netlify.app/
// ============================================================================

const DESIGN_SHIPFLOW = {
  slug: 'shipflow',
  name: 'ShipFlow: Shipment Operations Dashboard',
  category: 'Web',
  icon: 'window',
  tag: 'Case Study',
  status: 'Live',
  url: 'https://parcel-trackings.netlify.app/',
  summary: 'An enterprise dashboard for logistics teams tracking parcels across carriers, designed and coded end-to-end as a working product.',
  lede: 'End-to-end product design and front-end engineering for an enterprise shipment-tracking dashboard. Ops teams watch parcels across carriers, triage exceptions, and keep customers informed. I designed every screen, state and interaction, then built it with HTML, CSS and JavaScript. This is a live, clickable product.',
  tech: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'No framework', 'No build step'],
  blocks: [

    // ── This is real ──────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'success',
      title: 'This is a working product, not a Figma prototype.',
      x: 'Every screen, state and interaction in this case study runs real code. The dark mode is real CSS. The command palette opens on ⌘K. The charts are drawn on a live <code>&lt;canvas&gt;</code>. The loading, empty, error and offline states are fully reachable. Open the live build and click through it.',
    },

    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/shipflow-assets/dashboard-light.png',
      alt: 'ShipFlow dashboard showing shipment list with metric cards, filters and status badges',
      caption: 'The Shipments dashboard is the home base ops teams open every morning.',
      ratio: '16-9',
    },

    // ── At a glance ───────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; Front-end Engineer'],
        ['Platform', 'Responsive web app'],
        ['Domain', 'Logistics B2B SaaS operations tooling'],
        ['Built with', 'Hand-written HTML, CSS &amp; JavaScript without frameworks or build steps'],
        ['Deliverable', 'A live, interactive product'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '12', l: 'Fully built screens' },
        { v: '5', l: 'Status states, color-coded' },
        { v: '100%', l: 'Reachable, real UI states' },
        { v: '0', l: 'UI frameworks or libraries' },
      ],
    },

    // ── 1. The Problem ────────────────────────────────────────────────────────
    { t: 'h2', x: '1. The Problem' },
    {
      t: 'p',
      x: 'A logistics operations team manages thousands of parcels daily across different carriers. Each carrier has its own portal, tracking format, and definitions. Ops managers often juggle multiple tabs and spreadsheets while worrying about delayed packages.',
    },
    {
      t: 'p',
      x: 'The job is about fast triage. ShipFlow displays delayed shipments and unassigned exceptions on one screen so you can act before customers call.',
    },
    {
      t: 'table',
      head: ['#', 'The daily pain', 'What it costs the team'],
      rows: [
        ['P1', 'Tracking scattered across carrier portals', 'Constant tab-switching and no single source of truth'],
        ['P2', 'Exceptions discovered late', 'Angry customers and missed SLA windows'],
        ['P3', 'Bulk work done one row at a time', 'Hours lost to repetitive manual actions'],
        ['P4', 'Status buried in dense tables', 'Slow to scan and easy to miss urgent issues'],
        ['P5', 'No shared view of performance', 'On-time rate and carrier quality are hard to measure'],
      ],
    },

    // ── 2. Who it's for ───────────────────────────────────────────────────────
    { t: 'h2', x: '2. Who It\'s For' },
    {
      t: 'callout',
      kind: 'info',
      title: 'I need to know what is on fire before the customer does.',
      x: 'Operations manager view: they value density and speed over decoration.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'gauge', title: 'Speed over delight', desc: 'Built to be scanned in seconds. High density but highly readable.' },
        { icon: 'activity', title: 'Status at a glance', desc: 'Color and shape map to five critical status states.' },
        { icon: 'layers', title: 'Bulk by default', desc: 'First-class batch operations including import, archive, and edit.' },
        { icon: 'moon', title: 'All-day comfort', desc: 'A clean, low-chroma interface with a fully native dark theme.' },
      ],
    },

    // ── 3. Design Principles ──────────────────────────────────────────────────
    { t: 'h2', x: '3. Design Principles' },
    {
      t: 'p',
      x: 'Four rules guided the design of this dense interface to keep it clean and focused.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'droplet', title: 'Color means status only', desc: 'Color is reserved strictly for status meaning. Neutral tones dominate otherwise.' },
        { icon: 'type', title: 'Type hierarchy over borders', desc: 'Weight and spacing structure the layout. Fewer borders keep focus on content.' },
        { icon: 'zap', title: 'Functional motion', desc: 'Short, precise transitions clarify state changes without decoration.' },
        { icon: 'check', title: 'Every state designed', desc: 'Loading, empty, error, and offline screens are designed with equal care.' },
      ],
    },

    // ── 4. The Design System (built in code) ──────────────────────────────────
    { t: 'h2', x: '4. The Design System Built in Code' },
    {
      t: 'p',
      x: 'The system is built directly in code. Design tokens are CSS custom properties and components are styled HTML. ShipFlow includes a living style guide where every state is fully interactive.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/style-guide-light.png',
      alt: 'ShipFlow living style guide showing color, typography, buttons, inputs, badges, table states, loading/empty/error states, motion tokens and keyboard shortcuts',
      caption: 'The in-app style guide showing actual components with working focus rings.',
      ratio: '3-2',
    },
    { t: 'h3', x: 'Color' },
    {
      t: 'table',
      head: ['Role', 'Meaning', 'Where it shows up'],
      rows: [
        ['Success', 'Delivered or healthy', 'Delivered badges, on-time metrics'],
        ['Warning', 'Delayed or needs attention', 'Delayed status, at-risk metrics'],
        ['Danger', 'Exception or error', 'Exception queue, failed imports, errors'],
        ['Neutral', 'In transit', 'Default badges, secondary chips'],
        ['Primary', 'The main action', 'Monochrome black and white instead of blue'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Why the primary action is black, not blue',
      x: 'When red indicates shipment issues, blue action buttons distract from critical alerts. Keeping actions monochrome reserves color exclusively for status warnings.',
    },
    { t: 'h3', x: 'Type, space and motion' },
    {
      t: 'table',
      head: ['Token', 'Value', 'Purpose'],
      rows: [
        ['Typeface', 'Inter', 'One family, weight-driven hierarchy'],
        ['Type scale', '12 to 26px', 'Caption, footnote, body, heading, title, display'],
        ['Spacing', '4px base', 'A single rhythm every gap snaps to'],
        ['Radius', '6px or 10px', 'Calm, consistent corners'],
        ['Motion', '150 to 250ms', 'Fast, functional transitions without bounce'],
        ['Elevation', 'One shadow level', 'Only floating surfaces like menus, palette, and toasts'],
      ],
    },

    // ── 5. Core Screens ───────────────────────────────────────────────────────
    { t: 'h2', x: '5. Core Screens' },

    { t: 'h3', x: 'Shipments' },
    {
      t: 'p',
      x: 'The main dashboard displays five metric cards for instant status. Below the cards is a dense, keyboard-navigable table with robust search, filtering, and bulk actions.',
    },
    {
      t: 'compare',
      before: '/shipflow-assets/dashboard-light.png',
      after: '/shipflow-assets/dashboard-dark.png',
      beforeLabel: 'Light',
      afterLabel: 'Dark',
      caption: 'Drag the handle to view light and dark modes. The dark mode is hand-tuned.',
    },

    { t: 'h3', x: 'Shipment detail' },
    {
      t: 'p',
      x: 'Clicking any row shows a detailed tracking timeline with carrier info, weight, and value. Status updates and customer notifications are easily accessible.',
    },
    {
      t: 'compare',
      before: '/shipflow-assets/shipment-detail-light.png',
      after: '/shipflow-assets/shipment-detail-dark.png',
      beforeLabel: 'Light',
      afterLabel: 'Dark',
      caption: 'A single shipment with a delivery timeline on the left and details on the right.',
    },

    { t: 'h3', x: 'Exceptions' },
    {
      t: 'p',
      x: 'Exceptions are ranked by severity with clear reasons like weather delays or customs holds. Unassigned exceptions show first for quick assignment.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/exceptions-light.png',
      alt: 'ShipFlow exceptions queue showing severity, reason, assignment and resolution',
      caption: 'The exception queue is severity-ranked, assignable, and resolvable.',
      ratio: '16-9',
    },

    { t: 'h3', x: 'Reports' },
    {
      t: 'p',
      x: 'Reports show on-time delivery, transit times, and exception rates with native canvas charts. Trend directions and sentiments match the real metrics.',
    },
    {
      t: 'compare',
      before: '/shipflow-assets/reports-light.png',
      after: '/shipflow-assets/reports-dark.png',
      beforeLabel: 'Light',
      afterLabel: 'Dark',
      caption: 'Reports using custom canvas charts that match both themes.',
    },

    { t: 'h3', x: 'Import' },
    {
      t: 'p',
      x: 'The CSV import handles large files gracefully. It provides clear reports separating imported, duplicate, and invalid rows.',
    },
    {
      t: 'gallery',
      items: [
        { src: '/shipflow-assets/import-light.png', alt: 'CSV import drop zone' },
        { src: '/shipflow-assets/import-dark.png', alt: 'CSV import drop zone in dark mode' },
      ],
    },

    { t: 'h3', x: 'Calendar, Notifications and Settings' },
    {
      t: 'p',
      x: 'The calendar, notification center, and settings are fully styled and functional. Settings cover profile management, notifications, team access, and integrations.',
    },
    {
      t: 'gallery',
      items: [
        { src: '/shipflow-assets/calendar-light.png', alt: 'Delivery calendar view' },
        { src: '/shipflow-assets/notifications-light.png', alt: 'Notification center' },
        { src: '/shipflow-assets/settings-light.png', alt: 'Settings' },
        { src: '/shipflow-assets/settings-dark.png', alt: 'Settings in dark mode' },
      ],
    },

    // ── 6. Beyond the happy path ──────────────────────────────────────────────
    { t: 'h2', x: '6. Every State Designed' },
    {
      t: 'p',
      x: 'Real software needs to handle edge cases gracefully. This design includes empty states, error states, and offline feedback.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'timer', title: 'Loading', desc: 'Layout-matched skeletons prevent page layout shifting when data loads.' },
        { icon: 'search', title: 'Empty states', desc: 'Clear, helpful states tailored to specific filter or page contexts.' },
        { icon: 'danger', title: 'Errors', desc: 'Form field and import row errors are detailed and actionable.' },
        { icon: 'checkCircle', title: 'Partial success', desc: 'Import reports valid, duplicate, and invalid rows separately.' },
        { icon: 'globe', title: 'Offline states', desc: 'System detects browser connectivity and alerts users with inline status banners.' },
        { icon: 'activity', title: 'Undo actions', desc: 'Batch edits and archiving feature instant undo functionality.' },
      ],
    },
    {
      t: 'image',
      src: '/shipflow-assets/404-light.png',
      alt: 'ShipFlow 404 page',
      caption: 'Even error screens offer clear navigation to guide users back.',
      ratio: '16-9',
    },

    // ── 7. Speed & keyboard ───────────────────────────────────────────────────
    { t: 'h2', x: '7. Keyboard Navigation' },
    {
      t: 'p',
      x: 'A global command palette (⌘K) allows quick navigation. All tables and actions support tab and arrow keys with clean focus states.',
    },
    {
      t: 'compare',
      before: '/shipflow-assets/command-palette-light.png',
      after: '/shipflow-assets/command-palette-dark.png',
      beforeLabel: 'Light',
      afterLabel: 'Dark',
      caption: 'The command palette allows fast search and navigation.',
    },

    // ── 8. Accessibility & responsive ─────────────────────────────────────────
    { t: 'h2', x: '8. Accessibility and Layout' },
    {
      t: 'cards',
      items: [
        { icon: 'moon', title: 'True dark mode', desc: 'Automatically aligns with system settings. Colors are tuned individually for dark backgrounds.' },
        { icon: 'sidebar', title: 'Responsive layout', desc: 'Metric grids and sidebars adapt cleanly to mobile viewports.' },
        { icon: 'globe', title: 'RTL support', desc: 'Right-to-left layout overrides exist for global language compatibility.' },
        { icon: 'check', title: 'Keyboard navigation', desc: 'Full keyboard support with logical tab orders and visible focus states.' },
      ],
    },

    // ── 9. Designed with code, not in Figma ───────────────────────────────────
    { t: 'h2', x: '9. Coded Design Process' },
    {
      t: 'p',
      x: 'Designing directly in code ensures maximum fidelity. The browser serves as the design canvas, ensuring perfect layout alignment.'
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Direct execution from design to code.',
      x: 'Designing in code translates layout logic directly to components and stylesheets. Every interaction is immediately testable and functional.',
    },
    { t: 'h3', x: 'How it\'s put together' },
    {
      t: 'cards',
      items: [
        { icon: 'code', title: 'Vanilla builds', desc: 'Pure HTML, CSS, and JavaScript. No build tools or third-party frameworks needed.' },
        { icon: 'droplet', title: 'CSS variables', desc: 'Design system tokens control spacing, colors, and layout variables globally.' },
        { icon: 'braces', title: 'Async data layer', desc: 'Uses mock data return promises to handle real loading states immediately.' },
        { icon: 'image', title: 'Native canvas', desc: 'Charts are hand-coded directly using the web Canvas API for efficiency.' },
      ],
    },
    { t: 'h3', x: 'Code implementation examples' },
    {
      t: 'p',
      x: 'Status styles are defined as CSS variables. This ensures color roles remain consistent across components and adapt to dark mode automatically.',
    },
    {
      t: 'code',
      file: 'css/tokens.css',
      lang: 'css',
      x: `:root {
  /* Status roles — used only to encode meaning */
  --bg-success: #EAF3DE;  --text-success: #27500A;  --border-success: #97C459;
  --bg-warning: #FAEEDA;  --text-warning: #854F0B;  --border-warning: #EF9F27;
  --bg-danger:  #FCEBEB;  --text-danger:  #A32D2D;  --border-danger:  #E24B4A;

  /* Primary action is monochrome — never blue */
  --fill-primary: #18181B;  --on-primary: #FAFAF9;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-danger: #501313;  --text-danger: #F09595;  --border-danger: #A32D2D;
    /* ...every role re-balanced for a dark surface... */
  }
}`,
    },
    {
      t: 'p',
      x: 'The data layer handles async state transitions. For example, archiving a shipment triggers a toast notification with a working undo action.',
    },
    {
      t: 'code',
      file: 'js/app.js',
      lang: 'js',
      x: `// Mock data mirrors a real API: every read returns a Promise,
// so pages already render loading states correctly.
function delay(data, ms = 350) {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

// Archiving shows a toast with a real Undo — not a confirm dialog.
toast("Shipment archived", {
  icon: "ti-archive",
  action: { label: "Undo", onClick: () => restoreShipment(id) },
});`,
    },

    // ── 10. Reflection ────────────────────────────────────────────────────────
    { t: 'h2', x: '10. Future Enhancements' },
    {
      t: 'cards',
      items: [
        { icon: 'braces', title: 'Real backend API', desc: 'Connect the data layer with carrier APIs to show live tracking data.' },
        { icon: 'activity', title: 'Live notifications', desc: 'Support push-driven updates for immediate alerts on shipping exceptions.' },
        { icon: 'layers', title: 'Custom dashboards', desc: 'Saved filter sets and workspace settings mapped to team roles.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Interactive Design',
      x: 'This case study showcases a functional product with completed interactions, states, dark themes, and layout details.',
    },
    {
      t: 'launch',
      title: 'See it for yourself',
      desc: 'Open the live build, hit ⌘K, switch to dark mode, break something and undo it.',
      url: 'https://parcel-trackings.netlify.app/',
      label: 'Launch ShipFlow',
    },

  ],
};
