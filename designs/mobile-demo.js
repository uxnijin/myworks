// ============================================================================
//  DEMO ENTRY — a placeholder case study showing how a Mobile App design
//  page is structured. Duplicate this file for a real case study, register
//  it in index.html (a <script> tag next to this one), then add the object
//  to DESIGNS in data.js. Delete this file once you have real work to show.
// ============================================================================

const DESIGN_MOBILE_DEMO = {
  slug: 'mobile-demo',
  name: 'Mobile Case Study (Demo)',
  category: 'Mobile App',
  icon: 'smartphone',
  tag: 'Case Study',
  status: 'Demo',
  summary: 'A placeholder mobile app case study — swap this out for a real project.',
  lede: 'This is a demo entry so the Designs → Mobile App section isn\'t empty. Replace the text and images below with an actual case study.',
  blocks: [
    { t: 'h2', x: 'Overview' },
    {
      t: 'p',
      x: `Use this space to set up the project: what the app does, who it's for, and what you were responsible for designing. A sentence or two on the timeline and your role goes a long way here.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'App cover screenshot',
      caption: 'Drop a cover screenshot or key screen here.',
      ratio: '16-9',
    },
    { t: 'h2', x: 'The problem' },
    {
      t: 'p',
      x: `What wasn't working before this design? Frame the problem in terms the reader will care about — a user pain point, a business metric, a broken flow.`,
    },
    { t: 'h2', x: 'The process' },
    {
      t: 'gallery',
      items: [
        { src: '', alt: 'Wireframes' },
        { src: '', alt: 'Flow diagram' },
        { src: '', alt: 'UI exploration' },
      ],
    },
    {
      t: 'cards',
      items: [
        { icon: 'map', title: 'Research', desc: 'Notes on user interviews, competitive audits, or constraints you discovered.' },
        { icon: 'layers', title: 'Design', desc: 'Key decisions — layout, navigation model, visual language.' },
        { icon: 'checkCircle', title: 'Outcome', desc: 'What shipped, and what changed as a result.' },
      ],
    },
    { t: 'h2', x: 'Final screens' },
    {
      t: 'gallery',
      items: [
        { src: '', alt: 'Final screen 1' },
        { src: '', alt: 'Final screen 2' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'This is a demo case study',
      x: 'Swap every block above for real content — text, screenshots, prototypes — once you have a project to publish.',
    },
  ],
};
