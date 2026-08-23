// ==========================================================================
//  ShipFlow. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('shipflow', {
  blocks: [
    { t: 'p', x: 'A prototype build, and this one is online: plain HTML, CSS and JavaScript, no framework and no build step.' },
    {
      t: 'image',
      src: '/shipflow-assets/hero.webp',
      alt: 'The ShipFlow shipments dashboard: metric cards, filters and a shipment table with status badges',
      caption: 'The screen an operations team leaves open all day.',
    },
    { t: 'p', x: 'Severity first, then who owns it. An exception nobody owns is the one that turns into a phone call.' },
    {
      t: 'image',
      src: '/shipflow-assets/exceptions.webp',
      alt: 'The exception queue, grouped by severity with assignment and resolution controls',
      caption: 'The exception queue.',
    },
    { t: 'p', x: 'One shipment, one timeline. Everything above it is ShipFlow&rsquo;s vocabulary rather than the carrier&rsquo;s.' },
    {
      t: 'image',
      src: '/shipflow-assets/shipment.webp',
      alt: 'A single shipment page with its timeline, notes, attachments and activity log',
      caption: 'A shipment.',
    },
    { t: 'p', x: 'Pages and shipments sit in one list, because an operator does not think of them as different things.' },
    {
      t: 'image',
      src: '/shipflow-assets/palette.webp',
      alt: 'The command palette open over the dashboard, showing pages and shipments',
      caption: 'Command palette.',
    },
    { t: 'p', x: 'An import that half-works is the normal case, so the failures are rows with reasons rather than a count.' },
    {
      t: 'image',
      src: '/shipflow-assets/import.webp',
      alt: 'The CSV import screen with a drag-and-drop zone, progress, and a partial-success report',
      caption: 'Import.',
    },
    { t: 'p', x: 'The calendar answers a different question from the table: not what is wrong now, but what is landing and whether the week can absorb it.' },
    {
      t: 'image',
      src: '/shipflow-assets/calendar.webp',
      alt: 'The delivery calendar with metric cards above it',
      caption: 'Calendar.',
    },
    { t: 'p', x: 'Trends drawn on a canvas — on-time percentage, transit time, and which carrier is quietly slipping.' },
    {
      t: 'image',
      src: '/shipflow-assets/reports.webp',
      alt: 'The reports screen: on-time percentage, transit time and carrier performance charts',
      caption: 'Reports.',
    },
    { t: 'p', x: 'The style guide is a route inside the app. Checking it before inventing a new pattern is what keeps twelve pages looking like one product.' },
    {
      t: 'image',
      src: '/shipflow-assets/guide.webp',
      alt: 'The living style guide page showing the component library',
      caption: 'The style guide.',
    },
    { t: 'p', x: 'The five status colours had to survive the switch without any of them turning into another one.' },
    {
      t: 'image',
      src: '/shipflow-assets/dark.webp',
      alt: 'The shipments dashboard in dark mode',
      caption: 'Dark.',
    },
    { t: 'p', x: 'A dead end, designed. Small thing, and it is most of the difference between a prototype and a product.' },
    {
      t: 'image',
      src: '/shipflow-assets/notfound.webp',
      alt: 'The 404 page',
      caption: 'Not found.',
    },
  ],
});
