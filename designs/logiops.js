// ==========================================================================
//  LogiOps. A design entry — a logistics control center built with the
//  Carbon design system (v11 Figma kit). Prose stays short on purpose.
// ==========================================================================

BODY('logiops', {
  blocks: [
    { t: 'p', x: 'A concept built with the Carbon design system, using the real v11 kit: its components, its tokens, its data table, its UI shell. The product is an internal tool for a logistics operations team, and it follows one story the whole way. A shipment is delayed. Someone finds it, understands why, fixes it, and tracks the fix.' },
    {
      t: 'image',
      src: '/logiops-assets/overview.webp',
      alt: 'The LogiOps operations overview: five KPI tiles, a shipment health donut, activity bars, critical exceptions and regional performance',
      caption: 'The overview. Five numbers, and the three exceptions that matter today.',
    },
    { t: 'p', x: 'The dashboard is not a report. The critical exceptions card is a queue, and every row on it goes somewhere.' },
    {
      t: 'image',
      src: '/logiops-assets/zoom-health.webp',
      alt: 'The shipment health card enlarged: the donut with 86% on time and its legend',
      caption: 'Shipment health, closer.',
    },

    { t: 'h2', x: 'The table' },
    { t: 'p', x: 'The main screen is a data table doing everything an enterprise table has to do: search in the toolbar, filters above, sortable columns with the sort shown, bulk selection, status as tags, and pagination that admits there are 2,761 pages.' },
    {
      t: 'image',
      src: '/logiops-assets/shipments.webp',
      alt: 'The shipments screen: filter dropdowns, a searchable data table with selection checkboxes, status tags and pagination',
      caption: 'Shipments. One row is already selected; the delayed one.',
    },

    { t: 'h2', x: 'One shipment' },
    { t: 'p', x: 'The detail page answers the first three questions in order: how late, why, and when instead. The timeline marks the exact step where the day went wrong.' },
    {
      t: 'image',
      src: '/logiops-assets/shipment-details.webp',
      alt: 'Shipment details: a warning notification, a vertical timeline with an error step, current status and shipment information',
      caption: 'SHP-28490. The old ETA is struck through, not deleted.',
    },
    {
      t: 'image',
      src: '/logiops-assets/zoom-timeline.webp',
      alt: 'The shipment timeline enlarged: completed steps, a delay marked in red, and the two steps still pending',
      caption: 'The timeline, closer. The error state comes from the component itself.',
    },

    { t: 'h2', x: 'The exception workspace' },
    { t: 'p', x: 'Delayed shipments are not a filter, they are a workqueue with owners. Two rows have nobody; the blue link is the ask.' },
    {
      t: 'image',
      src: '/logiops-assets/exceptions.webp',
      alt: 'The exceptions workspace: a content switcher for scope and a table of exceptions with duration, priority tags and owners',
      caption: 'Exceptions, sorted by how long they have been burning.',
    },
    { t: 'p', x: 'Opening one is the hero screen. The problem in one sentence, the cause under it, the blast radius as three numbers, and the fix as an ordered list with a button on each step.' },
    {
      t: 'image',
      src: '/logiops-assets/exception-details.webp',
      alt: 'Exception details: problem statement with cause, impact metrics, related information and three recommended actions with buttons',
      caption: 'EX-2841. Decision support, not a log viewer.',
    },
    {
      t: 'image',
      src: '/logiops-assets/zoom-problem.webp',
      alt: 'The problem card enlarged: the delay statement and the reason it happened',
      caption: 'The problem card. The why is written by the system, read by a person.',
    },
    {
      t: 'image',
      src: '/logiops-assets/zoom-actions.webp',
      alt: 'The recommended actions enlarged: three numbered steps, each with its own button',
      caption: 'Step 1 clears the SLA risk for 31 shipments, so it goes first.',
    },

    { t: 'h2', x: 'The fix' },
    { t: 'p', x: 'Assigning a vehicle needs the fleet, so the fleet screen exists to serve that moment. The available vehicle is already selected, and the panel ends in the only button that matters.' },
    {
      t: 'image',
      src: '/logiops-assets/fleet.webp',
      alt: 'The fleet screen: a vehicle table with status tags and a side panel showing vehicle details, health and an assign button',
      caption: 'VH-1832, available, 2.1 km away.',
    },
    {
      t: 'image',
      src: '/logiops-assets/zoom-vehicle.webp',
      alt: 'The vehicle details panel enlarged: driver, location, health bar, recent trips and the assign button',
      caption: 'VH-1832, ready to take the load.',
    },

    { t: 'h2', x: 'Analytics' },
    { t: 'p', x: 'Kept simple: four KPIs, one trend, and two ways of slicing the trouble. The charts use the system&rsquo;s data visualization palette.' },
    {
      t: 'image',
      src: '/logiops-assets/analytics.webp',
      alt: 'The analytics screen: KPI tiles, an on-time delivery line chart, delays by region and an exception types donut',
      caption: 'One number is red on purpose. Resolution speed is the metric that lags.',
    },
    {
      t: 'image',
      src: '/logiops-assets/zoom-donut.webp',
      alt: 'The exception types donut enlarged, with the categorical palette and counts',
      caption: 'Exception types, closer.',
    },

    { t: 'h2', x: 'Dark, from tokens' },
    { t: 'p', x: 'The dark theme is not a repaint. Every fill and every text on these screens is bound to a theme token, so the dark set is the same frames with the theme collection switched to Gray 90. Components, tags, tables and charts follow on their own.' },
    {
      t: 'image',
      src: '/logiops-assets/overview-dark.webp',
      alt: 'The operations overview in the Gray 90 dark theme',
      caption: 'The same overview. One variable mode changed, nothing redrawn.',
    },
    {
      t: 'gallery',
      items: [
        { src: '/logiops-assets/shipments-dark.webp', alt: 'The shipments data table in the dark theme' },
        { src: '/logiops-assets/exception-details-dark.webp', alt: 'The exception details screen in the dark theme' },
      ],
    },
    { t: 'p', x: 'Seven screens, both themes, and a wired prototype for the one flow that matters: dashboard to exception to cause to vehicle to resolved.' },
  ],
});
