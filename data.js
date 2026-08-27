// ============================================================================
//  data.js — the site's index. EDIT EVERYTHING HERE.
//
//  This file is loaded on every page, so it holds only what every page needs:
//  who you are, the site-wide copy, and the CARD-LEVEL fields for each entry.
//
//  The heavy part of an entry — its `blocks` body — lives in its own file and
//  is fetched the first time that entry is opened. See the `body:` path on
//  each record, and `findings/`, `designs/`, `projects/`, `pages/`.
//
//  Block DSL reference (used inside a body file):
//
//    { t: 'p',       x: 'paragraph text, inline HTML allowed' }
//    { t: 'h2' | 'h3', x: 'heading' }
//    { t: 'image',   src, alt, caption, ratio?, bleed? }
//    { t: 'gallery', items: [{ src, alt, caption }] }
//    { t: 'screens', items: [{ src, alt }], label }   full-bleed moving band
//    { t: 'callout', kind: 'info'|'warn'|'tip', title, x }
//    { t: 'code',    lang, file, x }
//    { t: 'cards',   items: [{ icon, title, desc }] }
//    { t: 'steps',   items: [{ title, desc }] }
//    { t: 'stats',   items: [{ v, l }] }
//    { t: 'table',   head: [], rows: [[]] }
//    { t: 'list',    items: ['bullet', 'bullet'] }
//    { t: 'quote',   x, by }
//    { t: 'video',   src | youtube }
//    { t: 'figma',   url }
//    { t: 'compare', before, after, beforeLabel, afterLabel }
//    { t: 'diagram', svg, caption }
//    { t: 'launch',  title, desc, url, label }
//    { t: 'demo',    kind }
//    { t: 'hr' }
//
//  Image blocks with no `src` render a labelled placeholder frame.
// ============================================================================

const PROFILE = {
  name: 'Nijin',
  role: 'Product Designer',
  avatar: '/avatar.jpg',
  github: 'uxnijin',
  tagline: 'Design engineering, documented.',
  bio: `UI/UX and product designer in Kerala, working worldwide. I ship the thing, not the mockup: app design, web design and design systems, built as well as drawn. <strong>30+ clients</strong>, <strong>500+ design students</strong> mentored at <a href="https://harisandcoacademy.com" target="_blank" rel="noopener">HACA</a>.`,
  intro: '',
  links: [
    { label: 'Instagram', url: 'https://instagram.com/uxnijin' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/nijinmuhammed' },
    { label: 'YouTube', url: 'https://www.youtube.com/@designschoolmalayalam' },
    { label: 'Medium', url: 'https://medium.com/@nijinmuhammed' },
    { label: 'GitHub', url: 'https://github.com/uxnijin' },
    { label: 'Figma', url: 'https://www.figma.com/@uxnijin' },
  ],
};

// ============================================================================
//  SITE / HOME / CONTACT / PAGE_COPY — every piece of copy that is not part of
//  an entry. These used to live in a CMS; they are plain objects now, so a
//  wording change is a one-line edit in this file.
//
//  Anything left blank falls back to the default written into script.js.
// ============================================================================

const SITE = {
  footerTagline: 'Product designer',
  footerNote: 'Designed and built by hand',
  whatsappLabel: '62384 17389',
  email: 'uxnijin@gmail.com',
  whatsapp: '916238417389',

  // the promo bar under the topbar. `promoEnabled: false` hides it entirely;
  // with no promoText it describes the newest case study on its own.
  promoEnabled: false,
  promoChip: 'New',
  promoCta: 'View',
  promoText: '',
  promoUrl: '',
};

const HOME = {
  headline: 'Design engineering',
  typeWords: [
    'made simple',
    'with impact',
    'made to last',
    'business driven',
    'built to ship',
    'refined',
  ],
  primaryCta: 'Explore the designs',
  secondaryCta: 'Browse projects',

  bannerLabel: 'The work',
  bannerText: 'Every figure is a screenshot of the real, running app, designed and built end to end.',

  latestHeading: 'Recent designs',
  productsHeading: 'Tools people actually use',

  ctaLabel: 'Get in touch',
  ctaHeading: 'Have something to build?',
  ctaText: 'From the first flow to the shipped product, I design and build the whole thing.',
  ctaButton: 'Contact me',

  clientsLabel: 'Worked with',
  clientsNote: '30+ clients \u00b7 500+ students mentored',
  showClients: true,
  showGithub: true,

  // which entries the home page pulls forward. Slugs; empty = automatic.
  featuredProjects: ['speed-test', 'tasks-extension', 'figma-background-remover'],
  latestSlugs: [],
};

const CONTACT = {
  label: 'Contact',
  heading: 'Have something in mind? Say hello',
  text: 'Reach out for collaborations, project inquiries, or just to talk shop about onboarding, paywalls, and shipping things.',
};

// title + lede for each index page, keyed by route.
const PAGE_COPY = {
  designs: {
    title: 'Designs',
    lede: 'App and product design: onboarding flows, paywalls, and full products. Every case study is backed by a real, running app.',
  },
  projects: {
    title: 'Products',
    lede: 'Figma plugins, browser extensions, and network tools, designed, built, and shipped for real users.',
  },
  caseStudies: {
    title: 'Case Studies',
    lede: 'Longer write-ups of the work: the problem, the decisions, and what shipped.',
  },
  findings: {
    title: 'UX Findings',
    lede: 'Findings, teardowns and notes from designing and building things.',
  },
  graphics: {
    title: 'Graphic Design',
    lede: 'Posters and print work, made for clients and for the fun of it.',
  },
};

// Order is the marquee's reading order, and the row starts un-scrolled, so the
// names worth leading with sit at positions 3-5 — the middle of the first
// screen. Position 1 lands under the mask's fade, so it gets a quieter mark.
//
// `scale` is optional and multiplies the marquee's 26px logo height. A mark
// with a tall emblem (a crest, a square badge) reads smaller than a wordmark
// at the same height, so it gets a bump to sit at the same optical size.
const CLIENTS = [
  { name: 'iLab', file: 'ilab.png' },
  { name: 'HACA', file: 'haca.png' },
  { name: 'Sobha', file: 'sobha.png' },
  { name: 'TEDx Farook College', file: 'tedx-farook-college.png' },
  { name: 'TinkerHub', file: 'tinkerhub.svg' },
  { name: 'Lascade', file: 'lascade.png' },
  { name: 'KMA', file: 'kma.png' },
  { name: 'Confident CSP', file: 'confident-csp.svg', scale: 1.5 },
  { name: 'Farook College', file: 'farook-college.png' },
  { name: 'Haris & Co.', file: 'harisandco.png' },
  { name: 'AZO', file: 'azo.png' },
  { name: 'HyDesign', file: 'hydesign.png' },
  { name: 'Diecast Kerala', file: 'diecast-kerala.png' },
  { name: 'Protoheim', file: 'protoheim.png' },
  { name: 'The Farm by the River', file: 'farm-by-the-river.png', scale: 2 },
  { name: 'xSpine', file: 'xspine.png' },
];

// ============================================================================
//  DESIGNS / PROJECTS / FINDINGS — the index.
//
//  Card-level fields only. `body` points at the file holding that entry's
//  `blocks`, which is fetched when the entry is opened, not at page load.
//
//  Entry names split on the first ':' everywhere they render — bold product
//  name, muted subtitle — so "Parcel: Premium Courier Booking" is the pattern.
//
//  Adding an entry is now TWO steps: a record here, and its body file. There
//  is no <script> tag to add — the body is loaded by path.
// ============================================================================

// ============================================================================
//  CASE_STUDIES — the /case-studies index. Same shape as a DESIGNS record:
//  card fields here, the body in its own file under `case-studies/`.
//  One placeholder entry for now.
// ============================================================================
const CASE_STUDIES = [
  {
    slug: 'oppam',
    thumbUrl: '/oppam-assets/thumb.webp',
    name: 'Oppam: Designing the Minutes Before Someone Asks for Help',
    category: 'Mobile App',
    icon: 'sun',
    tag: 'Case study',
    status: 'Prototype',
    summary: 'Kerala has the most psychiatrists per person in India and still leaves most people untreated, so the wall is not supply. A running iOS app for a real Kozhikode counselling service, built around the ten minutes before a booking, with the therapist\'s side designed too.',
    lede: 'Oppam is a real counselling service in Kozhikode, and today it is a website and a phone number. Kerala has more psychiatrists per person than any state in India and still leaves most people untreated, so the wall is not supply. It is the walk to the door. This is the app built for that walk.',
    body: '/case-studies/oppam.js',
  },
  {
    slug: 'nisf',
    thumbUrl: '/nisf-assets/thumb.webp',
    name: 'Nisf: A Matrimonial App, Redesigned',
    category: 'Mobile App',
    icon: 'search',
    tag: 'Case study',
    status: 'In progress',
    summary: 'A live matrimonial app for practising Muslims, where the filtering goes past age and income into path, aqeedah, madhab and how much Qur\'an someone has memorised. The redesign starts here.',
    lede: 'Nisf is a matrimonial app for practising Muslims: no photographs, a profile read across five tabs, and a filter layer no general matrimonial site has any reason to build. This is the redesign, starting with the app as it stands.',
    body: '/case-studies/nisf.js',
  },
  {
    slug: 'kcalo',
    thumbUrl: '/plate-assets/thumb.webp',
    name: 'Kcalo: A Calorie Tracker, Designed End to End',
    category: 'Mobile App',
    icon: 'activity',
    tag: 'Case study',
    status: 'Concept',
    summary: 'Every food diary dies the same death: the logging. Kcalo is a concept calorie tracker where the camera is the keyboard, built as a complete thing — 31 screens, a component library, the brand, the store listing and the pitch.',
    lede: 'Kcalo is a concept calorie tracker built end to end, from research boards to App Store screenshots. The premise fits in a sentence: people will not type their dinner, but they will photograph it. So the camera is the keyboard, and everything else is designed around the five seconds that follow the shutter.',
    body: '/case-studies/kcalo.js',
  },
];

const DESIGNS = [
  {
    slug: 'paywalls',
    thumbUrl: '/paywall-assets/stride-screens/images/stride-01-offer.webp',
    hidden: true,
    name: 'Paywalls',
    category: 'Paywalls',
    icon: 'cart',
    tag: 'Paywalls',
    status: 'Prototype',
    summary: 'Six subscription offer screens, built as running iOS apps: the price, the dates and the states that go wrong.',
    lede: '<strong>Paywalls</strong> collects the screen an app asks you for money on. Six of them, each a running iOS app rather than a mockup, so the arithmetic, the dates and the failures are real.',
    body: '/designs/paywalls.js',
  },
  {
    slug: 'tuck',
    hidden: true,
    name: 'Tuck',
    category: 'Onboarding',
    icon: 'zap',
    tag: 'Onboarding',
    status: 'Prototype',
    summary: 'A savings app that puts a little away each week, with a six-question setup with a character to carry it.',
    lede: '<strong>Tuck</strong> moves a small amount into a pot every week, on the day money actually arrives. Twenty-two onboarding screens, built as a running iOS app.',
    body: '/designs/tuck.js',
  },
  {
    slug: 'sprig',
    hidden: true,
    name: 'Sprig',
    category: 'Onboarding',
    icon: 'droplet',
    tag: 'Onboarding',
    status: 'Prototype',
    summary: 'Plants and flowers delivered the same day: number, one-time code, address on a real map.',
    lede: '<strong>Sprig</strong> delivers plants and cut flowers the same day. Twenty onboarding screens, built as a running iOS app: a number, a one-time code, a name, and an address dropped on a real map.',
    body: '/designs/sprig.js',
  },
  {
    slug: 'trove',
    hidden: true,
    name: 'Trove',
    category: 'Onboarding',
    icon: 'layers',
    tag: 'Onboarding',
    status: 'Prototype',
    summary: 'Buy allocated gold by the gram: sign-in, email verification and a vault that starts at zero.',
    lede: '<strong>Trove</strong> sells allocated gold, silver and platinum from a gram upwards, held in an audited vault. Fourteen onboarding screens, built as a running iOS app.',
    body: '/designs/trove.js',
  },
  {
    slug: 'kili',
    hidden: true,
    name: 'Kili',
    category: 'Onboarding',
    icon: 'globe',
    tag: 'Onboarding',
    status: 'Prototype',
    summary: 'A language app you learn by speaking. Twelve onboarding screens and every state that isn\'t the happy path.',
    lede: '<strong>Kili</strong> teaches a language by making you speak it: ten minutes, one conversation a day. Twelve onboarding screens, built as a running iOS app so every state can be seen rather than described.',
    body: '/designs/kili.js',
  },
  {
    slug: 'bizzscribe-shopping',
    thumbUrl: '/bizzscribe-assets/app-thumb.webp',
    name: 'Bizzscribe Shopping: The Same Store, in an App',
    category: 'Mobile App',
    icon: 'smartphone',
    tag: 'Design',
    summary: 'The shopping app that comes with a Bizzscribe store. One product page carries both a thing and a booking, and only the pair of buttons at the bottom changes.',
    lede: 'The shop a business builds on Bizzscribe, as an app. One page shape sells a hoodie or a DJ rig, checkout is three short screens, and an order answers <em>where is it</em> without a tap.',
    body: '/designs/bizzscribe-shopping.js',
  },
  {
    slug: 'bizzscribe-storefront',
    thumbUrl: '/bizzscribe-assets/web-thumb.webp',
    name: 'Bizzscribe Storefront: The Shop a Business Builds',
    category: 'Web',
    icon: 'window',
    tag: 'Design',
    summary: 'The ecommerce store a business builds on Bizzscribe and hands to its own customers, drawn for desktop and phone together. Nothing on the page belongs to the platform underneath.',
    lede: 'Bizzscribe is a business management platform. This is the store a business builds on it: the merchant&rsquo;s wordmark, the merchant&rsquo;s colour, drawn for a desktop browser and a phone at the same time.',
    body: '/designs/bizzscribe-storefront.js',
  },
  {
    slug: 'logiops',
    thumbUrl: '/logiops-assets/thumb.webp',
    name: 'LogiOps: A Control Center for Shipment Exceptions',
    category: 'Web',
    icon: 'gauge',
    tag: 'Design',
    status: 'Concept',
    summary: 'An internal logistics operations tool built with IBM\u2019s Carbon design system. Find the delayed shipment, understand why, fix it from one place. Seven screens, light and dark from the same tokens.',
    lede: '<strong>LogiOps</strong> is the screen a logistics operations team keeps open all day. Built with IBM\u2019s Carbon design system: real components, real tokens, and a dark theme that is a mode switch rather than a second design.',
    body: '/designs/logiops.js',
  },
  {
    slug: 'crate',
    thumbUrl: '/crate-assets/thumb.webp',
    name: 'Crate: A Transfer You Can Brand',
    category: 'Web',
    icon: 'upload',
    tag: 'Design',
    status: 'Concept',
    summary: 'A service for sending files too big to email, where the thing being designed is the page the recipient opens, built beside you as you upload, then dressed in your own logo, colours and type.',
    lede: 'A service for sending files too big to email. The part it takes seriously is the page the person on the other end opens: you build that while you upload, and it stays on screen the whole time.',
    body: '/designs/crate.js',
  },
  {
    slug: 'haca-design-school',
    thumbUrl: '/haca-design-school-assets/thumb.webp',
    name: 'HACA Design School: The Page That Sells the Course',
    category: 'Web',
    icon: 'graduation',
    tag: 'Design',
    status: 'Concept',
    summary: 'A branding course sold on a page that did not look branded. Display type, a colour per section, and the three things the page was missing: student work, the instructors, and the awkward questions about paying.',
    lede: 'A landing page for a branding course. The argument was already settled by the first pass; what this one adds is a voice: display type, a colour per section, and the parts a design school cannot afford to leave out.',
    body: '/designs/haca-design-school.js',
  },
  {
    slug: 'chalo',
    thumbUrl: '/chalo-assets/thumb.webp',
    name: 'Chalo: A Trip You Can Describe',
    category: 'Mobile App',
    icon: 'globe',
    tag: 'Design',
    status: 'Concept',
    summary: 'A travel app where the planning happens in a conversation: describe the trip, get an itinerary back, and book the flight without leaving the chat. Two-sided: there is a partner app for the people supplying it.',
    lede: 'A travel app where the planning happens in a conversation. You describe the trip you want (where, roughly when, who with) and what comes back is an itinerary you can book from without leaving the chat.',
    body: '/designs/chalo.js',
  },
  {
    slug: 'ember',
    thumbUrl: '/ember-assets/thumb.webp',
    name: 'Ember: Habits and Streaks',
    category: 'Mobile App',
    icon: 'checklist',
    tag: 'Design',
    status: 'Concept',
    summary: 'A habit tracker built around one number, the streak. Categories as chips, a setup form that fits in one scroll, and a month that shows a missed day without making a fuss of it.',
    lede: 'A habit tracker built around the streak: the number that says how many days in a row you have kept something up. It is on every row in the list, and it is the biggest thing on the habit itself.',
    body: '/designs/ember.js',
  },
  {
    slug: 'trackwise',
    thumbUrl: '/trackwise-assets/thumb.webp',
    name: 'Trackwise: Where Is My Parcel?',
    category: 'Web',
    icon: 'cart',
    tag: 'Design',
    status: 'Prototype',
    summary: '“Where is my order?” is a quarter of all e-commerce support tickets, and the answer already exists in a carrier API. Built inside Razorpay\'s real Blade design system: one timeline across every handover, and every persona, plan edge and failure state designed rather than assumed.',
    lede: 'Parcel tracking for a shop and its customers. Paste a tracking number from any of 14 carriers and get one timeline back, even when the parcel changed hands halfway.',
    tech: ['React 18', 'TypeScript', 'Razorpay Blade v12 (109 components)', 'styled-components', 'React Router', 'Framer Motion', 'Recharts', 'Vite', 'Seeded mock data · no backend'],
    body: '/designs/trackwise.js',
  },
  {
    slug: 'netti',
    thumbUrl: '/netti-assets/hero-cross-device.png',
    hidden: true,
    name: 'Netti: One Instrument, Four Screens',
    category: 'Mobile App',
    icon: 'gauge',
    tag: 'Design',
    status: 'Prototype',
    summary: 'A network speed test designed as an instrument rather than a dashboard: one SwiftUI codebase that becomes a tab bar, a split view, a Mac window and a stack of paged rings.',
    lede: 'A network speed test drawn as an instrument rather than a dashboard, on a dial that reports what it finds instead of performing it.',
    tech: ['Swift', 'SwiftUI', 'Observation', 'URLSession', 'Swift Charts', 'Cloudflare speed-test edge', 'iOS 18 · iPadOS 18 · macOS 15 · watchOS 11'],
    body: '/designs/netti.js',
  },
  {
    slug: 'ksrtc',
    thumbUrl: '/ksrtc-assets/thumb.webp',
    name: 'KSRTC Booking: A Platform Redesign',
    category: 'Mobile App',
    icon: 'smartphone',
    tag: 'Design',
    status: 'Prototype',
    summary: 'The bug in a booking funnel is its shape, not its styling. Rebuilding Kerala\'s state bus platform around one continuous surface that holds five steps, designed and shipped as a running SwiftUI app.',
    lede: 'A redesign of the booking app for Kerala&rsquo;s state bus network. The original gives every decision a page of its own; this one holds all five steps on a single surface.',
    tech: ['Swift', 'SwiftUI', 'Uber Base design system', 'Observation', 'Custom illustrations', 'Haptics', 'Mock data · no network'],
    body: '/designs/ksrtc.js',
  },
  {
    slug: 'parcel',
    thumbUrl: '/parcel-assets/thumb.webp',
    name: 'Parcel: Premium Courier Booking',
    category: 'Mobile App',
    icon: 'smartphone',
    tag: 'Design',
    status: 'Prototype',
    summary: 'Booking a courier that feels as effortless as ordering a ride, designed and built end-to-end in native SwiftUI.',
    lede: 'A courier app for sending one thing (where it is going, who is receiving it, what is inside) and then watching it move.',
    tech: ['Swift', 'SwiftUI', 'Canvas', 'Observation', 'Custom motion', 'Haptics', 'Mock data · no network'],
    body: '/designs/parcel.js',
  },
  {
    slug: 'route-planner',
    thumbUrl: '/route-planner-assets/thumb.webp',
    name: 'Route Planner: A Day of Deliveries',
    category: 'Mobile App',
    icon: 'map',
    tag: 'Design',
    status: 'Prototype',
    summary: 'A last-mile delivery app that holds a 120-stop day on one surface, designed and built as a running SwiftUI prototype.',
    lede: 'A delivery app for a driver with a hundred-odd stops in a day, designed to hold the whole day rather than the next turn: import, fix, drive, prove, recap.',
    tech: ['Swift', 'SwiftUI', 'Canvas', 'Observation', 'Core Haptics patterns'],
    body: '/designs/route-planner.js',
  },
  {
    slug: 'shipflow',
    thumbUrl: '/shipflow-assets/thumb.webp',
    name: 'ShipFlow: Shipment Operations Dashboard',
    category: 'Web',
    icon: 'window',
    tag: 'Design',
    status: 'Live',
    url: 'https://parcel-trackings.netlify.app/',
    summary: 'The job is not managing shipments, it is finding the ones going wrong. A multi-carrier operations dashboard that opens on triage, designed and coded end-to-end, with no framework and no build step.',
    lede: 'A dashboard for a team moving parcels across several carriers at once. The job is not managing shipments. It is finding the few going wrong before somebody phones about them.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'No framework', 'No build step'],
    body: '/designs/shipflow.js',
  },
].filter((d) => !d.hidden);

const PROJECTS = [
  {
    slug: 'figma-font-preview',
    thumbUrl: '/images/thumbs/figma-font-preview.webp',
    name: 'Figma Font Preview',
    tag: 'Figma Plugin',
    icon: 'type',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1657575372398605206/figma-font-preview',
    summary: 'Browse local fonts, Google Fonts and Fontshare in one panel, and apply one with a click.',
    lede: 'Figma\'s font list gives you a name and no idea what it looks like, and it does not include the web fonts you actually want. This shows every font rendered in your own words, and applies it to your selection in one click.',
    status: 'Live',
    body: '/projects/figma-font-preview.js',
  },
  {
    slug: 'auto-dark-mode',
    thumbUrl: '/images/thumbs/auto-dark-mode.webp',
    name: 'Auto Dark Mode',
    tag: 'Figma Plugin',
    icon: 'moon',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1658472013452888242/auto-dark-mode',
    summary: 'Turn any frame into a readable dark version, with brand colours left alone.',
    lede: 'Making a dark version by hand takes an afternoon, and inverting the colours takes a second and looks wrong. This reads each colour, works out whether it is a background, a border, text or your brand, and treats each one the way it should be treated, then checks the result is still readable.',
    status: 'Live',
    body: '/projects/auto-dark-mode.js',
  },
  {
    slug: 'figma-pdf-creator',
    thumbUrl: '/images/thumbs/figma-pdf-creator.webp',
    name: 'Figma PDF Creator',
    tag: 'Figma Plugin',
    icon: 'file',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1659413618257186274/figma-pdf-creator',
    summary: 'Export frames as a finished PDF, with page order, page numbers, margins and print settings.',
    lede: 'Figma exports a PDF in whatever order it likes, with no page numbers and no margins, so the document gets rebuilt somewhere else before anyone can send it. This finishes it inside Figma.',
    status: 'Live',
    body: '/projects/figma-pdf-creator.js',
  },
  {
    slug: 'figma-contrast-checker',
    thumbUrl: '/images/thumbs/figma-contrast-checker.webp',
    name: 'Figma Contrast Checker',
    tag: 'Figma Plugin',
    icon: 'contrast',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1655498565773835300/figma-contrast-checker',
    summary: 'Tells you whether your text is readable on its background, and fixes it if it is not.',
    lede: 'Grey text on a white card looks fine on a good monitor and disappears on a phone outdoors. Select a text layer and this tells you straight away whether it passes, and offers the nearest colour that does.',
    status: 'Live',
    body: '/projects/figma-contrast-checker.js',
  },
  {
    slug: 'figma-cmyk-export',
    thumbUrl: '/images/thumbs/figma-cmyk-export.webp',
    name: 'Figma CMYK Export',
    tag: 'Figma Plugin',
    icon: 'cmyk',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1655421789860044772/figma-cmyk-export',
    summary: 'Export straight to print-ready CMYK PDF and JPEG.',
    lede: 'Figma works in RGB, which is how screens make colour. Printers work in CMYK, which is how ink makes colour. This exports the file the print shop actually wants, without a trip through another app.',
    status: 'Live',
    body: '/projects/figma-cmyk-export.js',
  },
  {
    slug: 'figma-background-remover',
    thumbUrl: '/images/thumbs/figma-background-remover.webp',
    name: 'Figma Background Remover',
    tag: 'Figma Plugin',
    icon: 'cutout',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1655438283557730288/figma-background-remover',
    summary: 'Cut the background out of any image, free, without the photo leaving your machine.',
    lede: 'Every other background remover asks you to upload the photo to a website and pay for anything above a thumbnail. This runs inside Figma on your own device, and gives you a brush to fix whatever it gets wrong.',
    status: 'Live',
    body: '/projects/figma-background-remover.js',
  },
  {
    slug: 'figma-typography-creator',
    thumbUrl: '/images/thumbs/figma-typography-creator.webp',
    name: 'Figma Typography Creator',
    tag: 'Figma Plugin',
    icon: 'typeScale',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1655538061510305891/figma-typography-creator',
    summary: 'Work out a whole type scale from one size, then put it in the file as real text styles.',
    lede: 'Most type scales are a base size and then four numbers that looked about right. Pick a ratio instead and the sizes relate to each other, then land in the file as named text styles, with a specimen board on the canvas.',
    status: 'Live',
    body: '/projects/figma-typography-creator.js',
  },
  {
    slug: 'figma-table-creator',
    thumbUrl: '/images/thumbs/figma-table-creator.webp',
    name: 'Figma Table Creator',
    tag: 'Figma Plugin',
    icon: 'table',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1655589087289276591/figma-table-creator',
    summary: 'Build a proper Auto Layout table in seconds, filled with your own CSV data.',
    lede: 'Drawing a table by hand is an hour of nudging columns and typing fake names into forty cells. Paste in a CSV instead: it formats statuses as badges, lines the numbers up, and builds the whole thing in Auto Layout.',
    status: 'Live',
    body: '/projects/figma-table-creator.js',
  },
  {
    slug: 'design-system-extractor',
    thumbUrl: '/images/thumbs/design-system-extractor.webp',
    name: 'Design System Extractor',
    tag: 'Chrome Extension',
    icon: 'extract',
    group: 'Browser Extensions',
    productUrl: 'https://chromewebstore.google.com/detail/design-system-extractor/fehaokomfecdgndiccdcmiakdionlhko',
    summary: 'Extract colors, typography, images, icons, and CSS styles from any website in seconds.',
    lede: 'A Chrome extension that reads a live page and hands back its design system (brand colors, fonts, asset URLs, clean SVGs, shadows and corner radii) in one click, without ever opening DevTools.',
    status: 'Unlisted',
    body: '/projects/design-system-extractor.js',
  },
  {
    slug: 'tasks-extension',
    name: 'Tasks Extension',
    tag: 'Chrome Extension',
    icon: 'checklist',
    group: 'Browser Extensions',
    productUrl: 'https://chromewebstore.google.com/',
    summary: 'A beautiful Chrome extension to manage and sync your tasks directly with Google Tasks.',
    lede: 'Google Tasks is genuinely good and genuinely buried, sitting three clicks deep in Gmail\'s sidebar. This puts it one keystroke from wherever you already are, with no database in the middle.',
    status: 'Unlisted',
    body: '/projects/tasks-extension.js',
  },
  {
    slug: 'tints-and-shades',
    thumbUrl: '/images/thumbs/tints-and-shades.webp',
    name: 'Figma Tints & Shades',
    tag: 'Figma Plugin',
    icon: 'swatches',
    group: 'Figma Plugins',
    url: 'https://www.figma.com/community/plugin/1655515637987815480/figma-tints-shades',
    summary: 'Turn one brand colour into an evenly spaced scale, and send it to variables or to code.',
    lede: 'You have one brand colour and you need about ten. Eyeballed scales end up with two steps you cannot tell apart. This spaces them evenly, shows the contrast while you choose, and saves the result as variables, swatches, or code.',
    status: 'Live',
    body: '/projects/tints-and-shades.js',
  },
  {
    slug: 'design-school',
    thumbUrl: '/images/thumbs/design-school.webp',
    name: 'Design School',
    tag: 'Resource',
    icon: 'graduation',
    group: 'Resources',
    url: 'https://design.nijin.site/',
    summary: 'A curated collection of resources for learning design.',
    lede: 'What I actually send students, instead of a bookmark folder with four hundred links and no opinion.',
    status: 'Live',
    body: '/projects/design-school.js',
  },
  {
    slug: 'icon-library',
    thumbUrl: '/images/thumbs/icon-library.webp',
    name: 'Icon Library',
    tag: 'Resource',
    icon: 'iconGrid',
    group: 'Resources',
    url: 'https://icons.nijin.site/',
    summary: 'Search, recolor and download 314,000+ open-source icons, free with no account.',
    lede: 'One search box over every good open-source icon set, so you can find the right glyph, tune it, and paste it without leaving the browser or making an account.',
    status: 'Live',
    body: '/projects/icon-library.js',
  },
  {
    slug: 'speed-test',
    thumbUrl: '/images/thumbs/speed-test.webp',
    name: 'Speed Test',
    tag: 'Network',
    icon: 'speedometer',
    group: 'Network Tools',
    url: 'https://speedtest.nijin.site/',
    summary: 'Internet speed test: download, upload, ping, jitter.',
    lede: 'Four numbers, no ads, no app install, no "your connection is being analysed" theatre.',
    status: 'Live',
    body: '/projects/speed-test.js',
  },
  {
    slug: 'site-speed-test',
    thumbUrl: '/images/thumbs/site-speed-test.webp',
    name: 'Site Speed Test',
    tag: 'Network',
    icon: 'waterfall',
    group: 'Network Tools',
    url: 'https://sitespeedcheck.nijin.site/',
    summary: 'Checks page load time, size, and request waterfall for any website.',
    lede: 'Load time, total weight, and the request waterfall: the three things that tell you why a page is slow, rather than just that it is.',
    status: 'Live',
    body: '/projects/site-speed-test.js',
  },
  {
    slug: 'dns-checker',
    thumbUrl: '/images/thumbs/dns-checker.webp',
    name: 'DNS Checker',
    tag: 'Network',
    icon: 'server',
    group: 'Network Tools',
    url: 'https://dnschecker.nijin.site/',
    summary: 'Shows your DNS records + propagation.',
    lede: 'Your records, and whether the rest of the world can see them yet.',
    status: 'Live',
    body: '/projects/dns-checker.js',
  },
  {
    slug: 'ip-checker',
    thumbUrl: '/images/thumbs/ip-checker.webp',
    name: 'IP Checker',
    tag: 'Network',
    icon: 'pin',
    group: 'Network Tools',
    url: 'https://ipchecker.nijin.site/',
    summary: 'Check IP and location.',
    lede: 'The smallest useful tool I\'ve built: what\'s my IP, and what does the internet think that means about me?',
    status: 'Live',
    body: '/projects/ip-checker.js',
  },
  {
    slug: 'diecastkerala',
    thumbUrl: '/images/thumbs/diecastkerala.webp',
    name: 'Diecast Kerala',
    tag: 'Shopify Store',
    icon: 'car',
    group: 'Shopify',
    url: 'https://diecastkerala.in',
    productUrl: 'https://diecastkerala.in',
    summary: 'A Shopify storefront for die-cast model car collectors in Kerala: catalog, checkout, and brand design.',
    lede: 'Model car collecting is a niche hobby with an audience that cares about detail. The store had to feel as considered as the products on it: clean catalog browsing, fast checkout, and a brand that reads as a specialist shop, not a generic template.',
    status: 'Live',
    body: '/projects/diecastkerala.js',
  },
];

// User counts, kept together so they are easy to refresh in one pass.
const PROJECT_USERS = {
  // Figma plugin counts read off figma.com/@uxnijin — refreshed 2026-08-21.
  'figma-font-preview': 15,
  'auto-dark-mode': 18,
  'figma-pdf-creator': 26,
  'figma-contrast-checker': 21,
  'figma-cmyk-export': 207,
  'figma-background-remover': 1400,
  'figma-typography-creator': 71,
  'figma-table-creator': 775,
  'design-system-extractor': 920,
  'tasks-extension': 1800,
  'tints-and-shades': 30,
  'design-school': 500,
  'speed-test': 11200,
  'site-speed-test': 6300,
  'dns-checker': 2700,
  'ip-checker': 1900,
};
PROJECTS.forEach((p) => {
  if (PROJECT_USERS[p.slug] !== undefined) p.users = PROJECT_USERS[p.slug];
});

// ============================================================================
//  FINDINGS — articles: findings, teardowns and notes.
//  Same record shape; the body lives in findings/<slug>.js.
// ============================================================================

const FINDINGS = [
  {
    slug: 'dont-move-the-target-while-im-clicking',
    title: "Don't move the target while I'm clicking",
    category: 'Continuity',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'window',
    summary: 'Closing eight tabs should be eight clicks in one place, not eight little hunts',
    body: '/findings/dont-move-the-target-while-im-clicking.js',
  },
  {
    slug: 'bring-undo-to-more-web-interactions',
    title: 'Bring Undo to more web interactions',
    category: 'Recovery',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'undo',
    summary: 'Muscle memory already knows Ctrl + Z, so give it something to reverse',
    body: '/findings/bring-undo-to-more-web-interactions.js',
  },
  {
    slug: 'dont-move-the-page-while-im-reading',
    title: "Don't move the page while I'm reading",
    category: 'Continuity',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'book',
    summary: 'If something loads in above you, correct the scroll by exactly its height',
    body: '/findings/dont-move-the-page-while-im-reading.js',
  },
  {
    slug: 'dont-make-humans-prove-they-are-human',
    title: "Don't make humans prove they are human",
    category: 'Friction',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'verified',
    summary: 'Read the signals already there, and only interrupt when the answer is genuinely unclear',
    body: '/findings/dont-make-humans-prove-they-are-human.js',
  },
  {
    slug: 'slow-doesnt-always-mean-broken',
    title: "Slow doesn't always mean broken",
    category: 'Feedback',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'timer',
    summary: 'Let the message grow with the wait, so a slow load never reads as a dead one',
    body: '/findings/slow-doesnt-always-mean-broken.js',
  },
  {
    slug: 'prevent-duplicate-actions',
    title: 'Prevent duplicate actions',
    category: 'Feedback',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'checkCircle',
    summary: 'Answer the press instantly and lock the button, so nobody pays twice',
    body: '/findings/prevent-duplicate-actions.js',
  },
  {
    slug: 'retry-only-what-failed',
    title: 'Retry only what failed',
    thumbUrl: '/images/findings/retry-only-what-failed.webp',
    category: 'Recovery',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'activity',
    summary: 'One tile failed, so reload that tile, not the whole dashboard',
    body: '/findings/retry-only-what-failed.js',
  },
  {
    slug: 'reduce-uncertainty-before-the-click',
    title: 'Reduce uncertainty before the click',
    category: 'Feedback',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'arrowRight',
    summary: 'Continue to what? Name the step the button leads to, before it is pressed',
    body: '/findings/reduce-uncertainty-before-the-click.js',
  },
  {
    slug: 'make-transitions-preserve-context',
    title: 'Make transitions preserve context',
    category: 'Continuity',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'play',
    summary: 'The card the user clicked should be the thing that opens, not a screen that replaces it',
    body: '/findings/make-transitions-preserve-context.js',
  },
  {
    slug: 'dont-just-say-no-results',
    title: 'Don\u2019t just say \u201cNo results\u201d',
    category: 'Recovery',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'search',
    summary: 'Read the query, name what blocked it, and offer the one change that recovers it',
    body: '/findings/dont-just-say-no-results.js',
  },
  {
    slug: 'remember-where-the-user-left',
    title: 'Remember where the user left',
    category: 'Continuity',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'pin',
    summary: 'Come back to the field that was still empty, not to the top of the form',
    body: '/findings/remember-where-the-user-left.js',
  },
  {
    slug: 'learn-repeated-actions',
    title: 'Learn repeated actions',
    category: 'Anticipation',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'layers',
    summary: 'Three of the ten edited the same way, so offer to finish the other seven',
    body: '/findings/learn-repeated-actions.js',
  },
  {
    slug: 'detect-when-the-user-is-struggling',
    title: 'Detect when the user is struggling',
    category: 'Anticipation',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'gauge',
    summary: 'Typed, cleared, typed again, so offer the hint before they go looking for help',
    body: '/findings/detect-when-the-user-is-struggling.js',
  },
  {
    slug: 'learn-from-repeated-actions',
    title: 'Learn from repeated actions',
    thumbUrl: '/images/findings/learn-from-repeated-actions.webp',
    category: 'Anticipation',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'activity',
    summary: 'Drop the confirmation once the user is clearly cleaning up, and offer undo instead',
    body: '/findings/learn-from-repeated-actions.js',
  },
  {
    slug: 'currency-conversion-without-leaving-the-app',
    title: 'Convert currency in place',
    thumbUrl: '/images/findings/currency-conversion-without-leaving-the-app.webp',
    category: 'Friction',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'globe',
    summary: 'Put the converted amount in the selection menu, where the amount already is',
    body: '/findings/currency-conversion-without-leaving-the-app.js',
  },
  {
    slug: 'start-loading-on-hover',
    title: 'Start loading on hover',
    thumbUrl: '/images/findings/start-loading-on-hover.webp',
    category: 'Anticipation',
    kind: 'Finding',
    date: 'August 2026',
    icon: 'zap',
    summary: 'Prefetch on hover, so the click lands on a page that is already there',
    body: '/findings/start-loading-on-hover.js',
  },
  {
    slug: 'let-users-start-typing',
    title: 'Let users start typing',
    category: 'Friction',
    kind: 'Finding',
    date: 'July 2026',
    icon: 'book',
    summary: 'Remove the extra click before typing',
    thumbUrl: '/images/findings/let-users-start-typing.webp',
    body: '/findings/let-users-start-typing.js',
  },
];

// ============================================================================
//  SEO — every title, description and schema fact the site publishes.
//
//  Read twice: once by `tools/prerender.js`, which bakes them into the static
//  HTML a crawler is served, and once by `script.js`, which re-applies them on
//  a client-side navigation. One object, so the two can never drift.
//
//  Titles: aim for 50-60 characters. Google measures pixels, not characters,
//  and cuts a title around 580px. The keyword goes first, the name last.
//  Descriptions: 140-160 characters, written as a sentence a person would read,
//  because the click-through it earns is itself a ranking input.
//
//  `{name}` and `{sub}` are the only tokens; both are filled per entry.
// ============================================================================

const SEO = {
  siteUrl: 'https://nijin.site',
  siteName: 'Nijin Muhammed',
  fullName: 'Nijin Muhammed',
  altName: 'Nijin',
  jobTitle: 'UI/UX and Product Designer',

  // Where the work is done from. Local intent ("ui ux designer in Kerala") is
  // the least contested query a designer can rank for, so the place is named
  // in the schema, on /about, and on /contact rather than left implied.
  locality: 'Kozhikode',
  region: 'Kerala',
  country: 'India',
  countryCode: 'IN',

  // The social card. 1200x630, generated by tools/make_og.py — the square
  // avatar was being letterboxed by every platform that renders a large card.
  defaultImage: '/images/og/default.png',
  imageWidth: 1200,
  imageHeight: 630,

  twitterHandle: '',

  // The phrases the site is actually competing for. Not a meta keywords tag —
  // that has been ignored since 2009 — but the list that keeps the copy on
  // /contact, /about and every index lede pointed at the same intent.
  keywords: [
    'UI designer',
    'UX designer',
    'UI UX designer',
    'product designer',
    'app design',
    'mobile app design',
    'app designer',
    'web design',
    'design engineer',
    'freelance UI UX designer',
    'hire a product designer',
    'Figma plugin developer',
    'SaaS product designer',
    'UI UX designer in Kerala',
    'UI UX designer in India',
  ],

  // ---- index and standalone pages, keyed by route
  pages: {
    '': {
      title: 'Nijin Muhammed — UI/UX Designer & Product Designer',
      description:
        'UI/UX and product designer in Kerala, India. I design and build mobile apps, web products and design tools end to end. 30+ clients, 500+ students mentored.',
      h1: 'Design engineering',
    },
    designs: {
      title: 'App & Product Design Portfolio — UI/UX Work',
      description:
        'A UI/UX design portfolio of mobile apps, onboarding flows and paywalls. Every screen is a capture of a real running app, designed and built end to end.',
    },
    'case-studies': {
      title: 'UX Case Studies — Product Design, Start to Ship',
      description:
        'Long-form UI/UX case studies: the problem, the decisions behind each screen, and what actually shipped. Written by a product designer who builds the app too.',
    },
    products: {
      title: 'Design Tools, Figma Plugins & Browser Extensions',
      description:
        'Figma plugins, Chrome extensions and network tools designed, built and shipped for real users. Free to use, with thousands of installs between them.',
    },
    findings: {
      title: 'UX Findings — Notes on Interaction & Product Design',
      description:
        'Short, evidence-led notes on interaction design: undo, prefetching, error recovery and the small decisions that make a product feel finished.',
    },
    graphics: {
      title: 'Graphic Design Portfolio — Posters & Print Work',
      description:
        'Poster, print and identity work made for clients and for the fun of it, by a designer who spends the rest of the week on product.',
    },
    about: {
      title: 'About Nijin Muhammed — UI/UX Designer in Kerala',
      description:
        'Product designer in Kozhikode, Kerala. 30+ clients, 500+ design students mentored at HACA, and a toolkit that runs from Figma through to shipped Swift and React.',
    },
    contact: {
      title: 'Hire a UI/UX & Product Designer — Contact Nijin',
      description:
        'Hire a freelance UI/UX and product designer for mobile app design, web app design and design systems. Kerala-based, working worldwide. Email, WhatsApp, or the form.',
    },
  },

  // ---- per-entry templates
  templates: {
    design: {
      title: '{name} — {sub} UI/UX Design Case Study',
      // falls back to the record's own `summary` when it is long enough to
      // stand as a description on its own
    },
    caseStudy: {
      title: '{name} — UX Case Study by a Product Designer',
    },
    product: {
      title: '{name} — {sub} by Nijin Muhammed',
    },
    finding: {
      title: '{name} — UX Finding',
    },
  },

  // ---- what the work is. Read three times: as the cards on /contact, as the
  //  same list in the prerendered HTML, and as the OfferCatalog in its schema.
  services: [
    {
      icon: 'window',
      title: 'Mobile app design (iOS & Android)',
      desc: 'The flows, every screen, and the states either side of each button, with a design system that holds them together as the app grows.',
    },
    {
      icon: 'layers',
      title: 'Web app & SaaS product design',
      desc: 'Dashboards, onboarding, settings, and the unglamorous screens a SaaS lives or dies on. Designed against real data.',
    },
    {
      icon: 'zap',
      title: 'Onboarding & paywall design',
      desc: 'The two flows that decide whether anyone sees the rest of the product. Both are on this site as case studies, built and running.',
    },
    {
      icon: 'swatches',
      title: 'Design systems & Figma libraries',
      desc: 'Tokens, components, variants, and documentation a team will actually use. Handed over as a library, not a moodboard.',
    },
    {
      icon: 'code',
      title: 'Design engineering & prototypes',
      desc: 'The design shipped as a running app, SwiftUI on iOS and React on the web, so the handoff is something you can hold.',
    },
    {
      icon: 'gauge',
      title: 'Redesigns & UX audits',
      desc: 'A read of the product as it stands, a list of what is costing you users, and a redesign that arrives as the same product.',
    },
  ],

  process: [
    { title: 'Scope', desc: 'You send what you are building. I send back what it would take, as a number rather than a range.' },
    { title: 'Flows', desc: 'The screens a person moves through, agreed before anything is drawn in detail.' },
    { title: 'Design', desc: 'Every screen, plus the empty state, the error, and the one where the network is slow.' },
    { title: 'Build or handoff', desc: 'Either I build the front end, or you get an annotated file an engineer can work from without asking a question.' },
  ],

  // ---- the questions /contact answers, which are also the FAQ schema on it
  faq: [
    {
      q: 'What does a UI/UX designer actually deliver?',
      a: 'A flow, then the screens, then the design system that keeps them consistent, then an annotated handoff an engineer can build from without asking a question. On most of my projects I build the prototype in Swift or React as well, so the handoff is a running app rather than a file.',
    },
    {
      q: 'Do you work with startups, or only established products?',
      a: 'Both. A startup usually needs the first flow designed and shipped fast; an established product usually needs a redesign that arrives as the same product rather than a different one that took the name. The process is the same, the pace is not.',
    },
    {
      q: 'How much does app design cost?',
      a: 'It depends on how many flows there are and whether the build is included. A single onboarding or paywall flow is a small fixed-price project; a full product is scoped per phase. Tell me what you are building and I will send a number, not a range.',
    },
    {
      q: 'Can you design and build the product?',
      a: 'Yes. Every case study on this site is backed by a real running app I designed and built: iOS in SwiftUI, web in React. That is the point of design engineering: the design is proven by the thing running, not by a mockup.',
    },
    {
      q: 'Where are you based, and do you work remotely?',
      a: 'Kozhikode, Kerala, India. Most of my clients are elsewhere, so remote is the default, and I overlap with European and US mornings.',
    },
    {
      q: 'How do we start?',
      a: 'Send a message with what you are building and roughly when you need it. I answer every enquiry myself, usually within a day.',
    },
  ],
};
