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
//  EXPLORING - "Things I'm Exploring" page. Right now it's rendered as a
//  grid of tool chips rather than the row list BUILDING/WRITINGS use.
//  Each item: { name, icon?, letter?, color, url? }. `icon` is a key from
//  ICONS; when omitted, `letter` (defaults to the first character of
//  `name`) is shown in a colored monogram tile instead.
// ============================================================================

const EXPLORING = [
  { name: 'Figma', icon: 'figma', color: '#a259ff', url: 'https://figma.com' },
  { name: 'Notion', letter: 'N', color: '#1d1d1d', url: 'https://notion.so' },
  { name: 'Linear', letter: 'L', color: '#5e6ad2', url: 'https://linear.app' },
  { name: 'Claude', letter: 'C', color: '#da7756', url: 'https://claude.ai' },
  { name: 'Antigravity', letter: 'A', color: '#4285f4', url: 'https://antigravity.google' },
  { name: 'Firebase', letter: 'F', color: '#ffca28', url: 'https://firebase.google.com' },
  { name: 'Supabase', letter: 'S', color: '#3ecf8e', url: 'https://supabase.com' },
  { name: 'Photoshop', letter: 'Ps', color: '#001e36', url: 'https://adobe.com/products/photoshop.html' },
  { name: 'Linearity Curve', letter: 'Lc', color: '#7c3aed', url: 'https://linearity.io/curve' },
  { name: 'Shopify', icon: 'cart', color: '#95bf47', url: 'https://shopify.com' },
  { name: 'Framer', letter: 'Fr', color: '#0055ff', url: 'https://framer.com' },
];

// ============================================================================
//  DESIGNS - case studies shown in the sidebar's "Designs" section, grouped
//  by `category` ('Mobile App' or 'Web'). Each entry is defined in its own
//  file under /designs (same pattern as /projects) and pushed in here.
//  Shape is identical to a PROJECTS entry - see the block DSL reference
//  above - plus `category` in place of `group`.
// ============================================================================

const DESIGNS = [
  DESIGN_PARCEL,
  DESIGN_ROUTE_PLANNER,
  DESIGN_SHIPFLOW,
  DESIGN_MOBILE_DEMO,
];

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



