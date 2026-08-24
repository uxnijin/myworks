// ============================================================================
//  DEMO ENTRY — a placeholder case study showing how a Web design page is
//  structured. Duplicate this file for a real case study, register it in
//  index.html (a <script> tag next to this one), then add the object to
//  DESIGNS in data.js. Delete this file once you have real work to show.
// ============================================================================

BODY('web-demo', {
  blocks: [
    { t: 'h2', x: 'Overview' },
    {
      t: 'p',
      x: `Set the scene: what site or product is this, who's it for, and what part of the design was yours. A line on the timeline and tools used helps too.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'Homepage screenshot',
      caption: 'Drop a hero screenshot of the site here.',
      ratio: '16-9',
      bleed: true,
    },
    { t: 'h2', x: 'The brief' },
    {
      t: 'p',
      x: `What was the brief or the problem this site had to solve? Keep it short: one clear paragraph beats a wall of context.`,
    },
    { t: 'h2', x: 'Design decisions' },
    {
      t: 'compare',
      before: '',
      after: '',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'A before/after is one of the fastest ways to show design impact, so swap in real screenshots.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'palette', title: 'Visual system', desc: 'Typography, color, spacing decisions and why they were made.' },
        { icon: 'layers', title: 'Layout', desc: 'How the page structure supports the content and the user\'s goal.' },
        { icon: 'gauge', title: 'Performance', desc: 'Anything you did to keep the design fast and accessible.' },
      ],
    },
    { t: 'h2', x: 'Final result' },
    {
      t: 'image',
      src: '',
      alt: 'Final site screenshot',
      caption: 'Final live screenshot goes here.',
      ratio: '16-9',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'This is a demo case study',
      x: 'Swap every block above for real content (text, screenshots, a live link) once you have a project to publish.',
    },
  ],
});
