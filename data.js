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
  ],
};

// ============================================================================

const PROJECTS = [
  PROJECT_DESIGN_SYSTEM_EXTRACTOR,
  PROJECT_TASKS_EXTENSION,
  PROJECT_TINTS_AND_SHADES,
  PROJECT_DESIGN_SCHOOL,
  PROJECT_SPEED_TEST,
  PROJECT_SITE_SPEED_TEST,
  PROJECT_DNS_CHECKER,
  PROJECT_IP_CHECKER,
];

