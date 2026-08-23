// ==========================================================================
//  Route Planner. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('route-planner', {
  blocks: [
    { t: 'p', x: 'This is a prototype build: a real iPhone app in SwiftUI, on mock data, with the map drawn from scratch.' },
    {
      t: 'image',
      src: '/route-planner-assets/hero.webp',
      alt: 'Five Route Planner screens: home, the route overview, driving, arrival and the end-of-day summary',
      caption: 'The day, end to end.',
    },
    { t: 'p', x: 'An import that only ever succeeds has not been designed, so this one arrives broken. The route exists only after you have read the middle screen.' },
    {
      t: 'image',
      src: '/route-planner-assets/import.webp',
      alt: 'Import Route, the validation review screen, and the drag-to-reorder list',
      caption: 'Import, review, reorder.',
    },
    { t: 'p', x: 'One map carries the whole drive; only the sheet on top of it changes. Arriving offers both outcomes at the same reach.' },
    {
      t: 'image',
      src: '/route-planner-assets/drive.webp',
      alt: 'The route overview, active navigation, and the arrival sheet',
      caption: 'Overview, driving, arrived.',
    },
    { t: 'p', x: 'The day ends with a recap, and settings small enough to leave alone.' },
    {
      t: 'image',
      src: '/route-planner-assets/after.webp',
      alt: 'The daily summary, history, and settings screens',
      caption: 'Summary, history, settings.',
    },
    { t: 'p', x: 'The map, the route line and the accent survive the switch. Only the surfaces move.' },
    {
      t: 'image',
      src: '/route-planner-assets/theme.webp',
      alt: 'Home and navigation shown in light and dark side by side',
      caption: 'The same two screens, light and dark.',
    },
  ],
});
