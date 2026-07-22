// ============================================================================
//  EDIT EVERYTHING HERE. Nothing else needs to change.
//
//  PROFILE  - who you are, shown on the homepage + topbar.
//  PROJECTS - one object per product. Order here = order in the sidebar.
//
//  Each project has a `blocks` array: the case study body. Available blocks
//  are documented in blocks.js. Quick reference:
//
//    { t:'h2',  x:'Heading' }                     → section (appears in TOC)
//    { t:'h3',  x:'Subheading' }                  → subsection (appears in TOC)
//    { t:'p',   x:'Text, <strong>HTML</strong> ok' }
//    { t:'callout', kind:'info|success|warning|danger', title:'', x:'' }
//    { t:'code', lang:'js', file:'name.js', x:'...' }
//    { t:'image', src:'', alt:'', caption:'', ratio:'16-9', bleed:true }
//    { t:'gallery', items:[{src,alt,caption}] }
//    { t:'video', src:'file.mp4' }  or  { t:'video', youtube:'ID' }
//    { t:'figma', url:'https://figma.com/file/...' }
//    { t:'compare', before:'a.png', after:'b.png', beforeLabel:'', afterLabel:'' }
//    { t:'diagram', svg:'<svg>…</svg>', caption:'' }
//    { t:'cards', items:[{icon,title,desc}] }
//    { t:'steps', items:[{title,desc}] }
//    { t:'table', head:['A','B'], rows:[['1','2']] }
//    { t:'stats', items:[{v:'4',l:'label'}] }
//    { t:'quote', x:'…', by:'Name' }
//    { t:'demo', kind:'scale' }                   → live tints/shades generator
//    { t:'launch', title:'', desc:'', url:'', label:'' }
//    { t:'hr' }
//
//  Image blocks with no `src` render a labelled placeholder frame: drop a
//  screenshot path in and it becomes a real figure. Nothing else to change.
// ============================================================================

const PROFILE = {
  name: 'Nijin',
  role: 'Product Designer',
  avatar: '/avatar.jpg',
  github: 'uxnijin',
  tagline: 'Design engineering, documented.',
  bio: `Product designer who ships the thing, not the mockup. I've worked with <strong>30+ clients</strong> and mentored <strong>500+ design students</strong> at <a href="https://harisandcoacademy.com" target="_blank" rel="noopener">HACA</a>.`,
  intro: '',
  links: [
    { label: 'Instagram', url: 'https://instagram.com/uxnijin' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/nijinmuhammed' },
    { label: 'YouTube', url: 'https://www.youtube.com/@designschoolmalayalam' },
    { label: 'GitHub', url: 'https://github.com/uxnijin' },
    { label: 'Figma', url: 'https://www.figma.com/@uxnijin' },
  ],
};

// ============================================================================
//  BUILDING / WRITINGS - simple list pages, linked from the sidebar's
//  Overview section. Each item: { icon, title, desc, tag, url? }. `icon` is
//  any key from ICONS in blocks.js. `url` is optional - when set the row
//  links out (opens in a new tab); otherwise it's just a list entry.
//  WRITINGS is only a fallback: the live pages fetch posts straight from
//  Medium (see MEDIUM_USERNAME below) and fall back to this list if the
//  fetch fails.
// ============================================================================

const BUILDING = [
  { icon: 'zap', title: 'Placeholder project one', desc: 'A short description of what this is and why it exists.', tag: 'In progress' },
  { icon: 'layers', title: 'Placeholder project two', desc: 'A short description of what this is and why it exists.', tag: 'Early' },
];

const WRITINGS = [
  { icon: 'book', title: 'Placeholder writing title one', desc: 'A short summary of what this piece is about.', tag: 'Draft' },
  { icon: 'file', title: 'Placeholder writing title two', desc: 'A short summary of what this piece is about.', tag: 'Draft' },
];

// Medium username the Writings pages fetch live posts from.
const MEDIUM_USERNAME = 'nijinmuhammed';

// ============================================================================
//  EXPLORING - "Things I'm Exploring" page: the tools, languages and services
//  in my day-to-day rotation, grouped into labelled sections.
//
//  Shape: an array of { group, blurb?, items:[…] }. Each item is
//    { name, brand?, letter?, color, use?, url? }
//    - `brand`  a key from BRAND_ICONS (blocks.js) → renders the real logo.
//    - `letter` a 1-2 char monogram, shown when there's no brand logo.
//    - `color`  the tile colour (the logo/letter sits on it in white).
//    - `use`    one-line note on what I actually reach for it for.
// ============================================================================

const EXPLORING = [
  {
    group: 'Design & Prototyping',
    blurb: 'Where the pixels and flows get worked out.',
    items: [
      { name: 'Figma', brand: 'figma', color: '#f24e1e', use: 'UI design, prototyping & design systems', url: 'https://figma.com' },
      { name: 'Framer', brand: 'framer', color: '#0f0f0f', use: 'Interactive prototypes & marketing sites', url: 'https://framer.com' },
      { name: 'Photoshop', letter: 'Ps', color: '#31a8ff', use: 'Photo editing, retouching & compositing', url: 'https://adobe.com/products/photoshop.html' },
      { name: 'Illustrator', letter: 'Ai', color: '#ff9a00', use: 'Vector illustration & iconography', url: 'https://adobe.com/products/illustrator.html' },
      { name: 'Linearity Curve', letter: 'Lc', color: '#7c3aed', use: 'Vector design on the iPad', url: 'https://linearity.io/curve' },
    ],
  },
  {
    group: 'Languages & Frameworks',
    blurb: 'What I write when the mockup needs to become a real thing.',
    items: [
      { name: 'JavaScript', brand: 'javascript', color: '#f0b400', use: 'The glue for plugins, tools & prototypes', url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
      { name: 'TypeScript', brand: 'typescript', color: '#3178c6', use: 'Typed JS for anything non-trivial', url: 'https://www.typescriptlang.org' },
      { name: 'HTML', brand: 'html5', color: '#e34f26', use: 'Semantic structure for the web', url: 'https://developer.mozilla.org/docs/Web/HTML' },
      { name: 'CSS', brand: 'css', color: '#1572b6', use: 'Layout, motion & fine-grained styling', url: 'https://developer.mozilla.org/docs/Web/CSS' },
      { name: 'React', brand: 'react', color: '#0a7ea4', use: 'Component-driven web app UIs', url: 'https://react.dev' },
      { name: 'Tailwind CSS', brand: 'tailwind', color: '#0891b2', use: 'Utility-first styling that stays consistent', url: 'https://tailwindcss.com' },
      { name: 'Swift', brand: 'swift', color: '#f05138', use: 'Native iOS prototypes & motion studies', url: 'https://developer.apple.com/swift' },
      { name: 'Python', brand: 'python', color: '#3776ab', use: 'Scripting, automation & quick data work', url: 'https://www.python.org' },
    ],
  },
  {
    group: 'Dev Tools & AI',
    blurb: 'The editors and copilots I build inside every day.',
    items: [
      { name: 'VS Code', letter: 'Vs', color: '#0078d4', use: 'My main editor', url: 'https://code.visualstudio.com' },
      { name: 'Cursor', brand: 'cursor', color: '#0f0f0f', use: 'AI-native editor for larger changes', url: 'https://cursor.com' },
      { name: 'Claude', brand: 'claude', color: '#d97757', use: 'Pair-programming, writing & thinking out loud', url: 'https://claude.ai' },
      { name: 'Antigravity', letter: 'Ag', color: '#4285f4', use: 'Agentic coding experiments', url: 'https://antigravity.google' },
      { name: 'Git', brand: 'git', color: '#f05032', use: 'Version control on everything', url: 'https://git-scm.com' },
      { name: 'GitHub', brand: 'github', color: '#181717', use: 'Hosting, reviews & shipping in the open', url: 'https://github.com' },
    ],
  },
  {
    group: 'Backend & Hosting',
    blurb: 'What backs the prototypes and puts them online.',
    items: [
      { name: 'Firebase', brand: 'firebase', color: '#f5820d', use: 'Auth, realtime data & quick backends', url: 'https://firebase.google.com' },
      { name: 'Supabase', brand: 'supabase', color: '#3ecf8e', use: 'Postgres backend with less setup', url: 'https://supabase.com' },
      { name: 'Node.js', brand: 'nodejs', color: '#5fa04e', use: 'Server-side JS & build tooling', url: 'https://nodejs.org' },
      { name: 'Vercel', brand: 'vercel', color: '#0f0f0f', use: 'Zero-fuss deploys for web projects', url: 'https://vercel.com' },
      { name: 'Netlify', brand: 'netlify', color: '#00c7b7', use: 'Static hosting & preview builds', url: 'https://netlify.com' },
      { name: 'Cloudflare', brand: 'cloudflare', color: '#f38020', use: 'DNS, edge & keeping sites fast', url: 'https://cloudflare.com' },
    ],
  },
  {
    group: 'Product & Workspace',
    blurb: 'Where the work gets organised, tracked and sold.',
    items: [
      { name: 'Notion', brand: 'notion', color: '#0f0f0f', use: 'Notes, docs & project wikis', url: 'https://notion.so' },
      { name: 'Linear', brand: 'linear', color: '#5e6ad2', use: 'Issue tracking & planning', url: 'https://linear.app' },
      { name: 'Shopify', brand: 'shopify', color: '#95bf47', use: 'Storefronts & commerce experiments', url: 'https://shopify.com' },
    ],
  },
];

// ============================================================================
//  DESIGNS - case studies shown in the sidebar's "Designs" section, grouped
//  by `category` ('Mobile App' or 'Web'). Each entry is defined in its own
//  file under /designs (same pattern as /projects) and pushed in here.
//  Shape is identical to a PROJECTS entry - see the block DSL reference
//  above - plus `category` in place of `group`.
// ============================================================================

const DESIGNS = [
  DESIGN_OPPAM,
  DESIGN_NETTI,
  DESIGN_KSRTC,
  DESIGN_AEROS,
  DESIGN_PARCEL,
  DESIGN_ROUTE_PLANNER,
  DESIGN_SHIPFLOW,
].filter(d => !d.hidden);

// ============================================================================

const PROJECTS = [
  PROJECT_FIGMA_CONTRAST_CHECKER,
  PROJECT_FIGMA_CMYK_EXPORT,
  PROJECT_FIGMA_BACKGROUND_REMOVER,
  PROJECT_FIGMA_TYPOGRAPHY_CREATOR,
  PROJECT_FIGMA_TABLE_CREATOR,
  PROJECT_DESIGN_SYSTEM_EXTRACTOR,
  PROJECT_TASKS_EXTENSION,
  PROJECT_TINTS_AND_SHADES,
  PROJECT_DESIGN_SCHOOL,
  PROJECT_ICON_LIBRARY,
  PROJECT_SPEED_TEST,
  PROJECT_SITE_SPEED_TEST,
  PROJECT_DNS_CHECKER,
  PROJECT_IP_CHECKER,
  PROJECT_DIECASTKERALA,
];

// User counts for projects
PROJECT_FIGMA_CONTRAST_CHECKER.users = 5;
PROJECT_FIGMA_CMYK_EXPORT.users = 50;
PROJECT_FIGMA_BACKGROUND_REMOVER.users = 240;
PROJECT_FIGMA_TYPOGRAPHY_CREATOR.users = 10;
PROJECT_FIGMA_TABLE_CREATOR.users = 150;
PROJECT_DESIGN_SYSTEM_EXTRACTOR.users = 920;
PROJECT_TASKS_EXTENSION.users = 1800;
PROJECT_TINTS_AND_SHADES.users = 9;
PROJECT_DESIGN_SCHOOL.users = 500;
PROJECT_SPEED_TEST.users = 11200;
PROJECT_SITE_SPEED_TEST.users = 6300;
PROJECT_DNS_CHECKER.users = 2700;
PROJECT_IP_CHECKER.users = 1900;



