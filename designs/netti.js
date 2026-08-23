// ==========================================================================
//  Netti. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('netti', {
  blocks: [
    { t: 'p', x: 'A prototype build: one SwiftUI codebase that becomes a tab bar, a split view, a Mac window and a stack of paged rings.' },
    {
      t: 'image',
      src: '/netti-assets/hero-cross-device.png',
      alt: 'Netti running on Apple Watch, iPhone and iPad side by side',
      caption: 'One set of screens, three shells.',
    },
    { t: 'p', x: 'The dial is the whole app, so it got the most attention. Six decisions, each enforced in code rather than left to taste.' },
    {
      t: 'image',
      src: '/netti-assets/gauge-anatomy.png',
      alt: 'The Netti dial annotated with the six decisions behind it',
      caption: 'The dial, annotated.',
    },
    { t: 'p', x: 'The interface is built out of the measurement instead of sitting around it.' },
    {
      t: 'image',
      src: '/netti-assets/run-sequence.png',
      alt: 'The speed test screen in three states: idle, measuring, and settled',
      caption: 'Idle, measuring, settled.',
    },

    { t: 'h2', x: 'The system' },
    { t: 'p', x: 'Four surfaces, four accents, one sweep. The canvas is true black, so the pixels around the gauge switch off on OLED.' },
    {
      t: 'image',
      src: '/netti-assets/color-system.png',
      alt: 'Netti colour tokens: surfaces, metric accents, and the sweep gradient',
      caption: 'Colour.',
    },
    { t: 'p', x: 'One typographic rule does most of the work: anything measured is monospaced, anything labelled is not.' },
    {
      t: 'image',
      src: '/netti-assets/type-system.png',
      alt: 'The Netti type ramp, showing monospaced values against SF Pro labels',
      caption: 'Type.',
    },
    { t: 'p', x: 'Regular width and compact width are the same views. Only the chrome changes.' },
    {
      t: 'image',
      src: '/netti-assets/responsive-shell.png',
      alt: 'The same speed test screen shown as an iPad split view and an iPhone tab layout',
      caption: 'Two widths.',
    },
    { t: 'p', x: 'The watch keeps one idea per page. The ticks and the needle go; the filled arc stays, because it is the part that still means something at that size.' },
    {
      t: 'image',
      src: '/netti-assets/watch-pages.png',
      alt: 'Four Apple Watch screens: start, download, upload and result',
      caption: 'Watch.',
    },
    { t: 'p', x: 'History leads with the trend. Network leads with whether your traffic is going through a tunnel at all.' },
    {
      t: 'image',
      src: '/netti-assets/history-network.png',
      alt: 'The History screen with its trend chart, beside the Network screen showing tunnel detection',
      caption: 'History and network.',
    },
    { t: 'p', x: 'Each setting states its trade-off in the interface rather than in a help page.' },
    {
      t: 'image',
      src: '/netti-assets/methodology.png',
      alt: 'The Settings screen beside the four measurement rules behind it',
      caption: 'Settings.',
    },
  ],
});
