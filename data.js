// ============================================================================
//  EDIT EVERYTHING HERE. Nothing else needs to change.
//
//  PROFILE  — who you are, shown on the homepage + topbar.
//  PROJECTS — one object per product. Order here = order in the sidebar.
//
//  Each project has a `blocks` array — the case study body. Available blocks
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
//  Image blocks with no `src` render a labelled placeholder frame — drop a
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
  // ==========================================================================
  {
    slug: 'design-system-extractor',
    name: 'Design System Extractor',
    tag: 'Chrome Extension',
    icon: 'palette',
    group: 'Browser Extensions',
    url: '/design-system-extractor/index.html',
    summary: 'Extract colors, typography, images, icons, and CSS styles from any website in seconds.',
    lede: 'A Chrome extension that reads a live page and hands back its design system — brand colors, fonts, asset URLs, clean SVGs, shadows and corner radii — in one click, without ever opening DevTools.',
    status: 'Unlisted',
    blocks: [
      {
        t: 'launch',
        title: 'Design System Extractor',
        desc: 'Landing page, feature tour and install link',
        url: '/design-system-extractor/index.html',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `Every designer has done this: you find a site with a palette you like, open DevTools, and start clicking through elements one at a time — copying a hex here, a <code>font-family</code> there, squinting at a <code>box-shadow</code> to work out how many layers it has. Twenty minutes later you have a Slack message to yourself full of half-remembered values.`,
      },
      {
        t: 'p',
        x: `The information is <em>right there</em> in the CSSOM. The browser has already parsed it, resolved it, and computed it. The only thing missing is something that reads it back to you in the shape a designer actually thinks in — grouped by role, deduplicated, and copyable.`,
      },
      { t: 'h2', x: 'The problem' },
      {
        t: 'p',
        x: `DevTools is an <strong>inspector</strong>, not a <strong>reporter</strong>. It's built to answer "why is this one element like this?" — a debugging question. Designers are asking a completely different question: "what are the rules of this whole system?"`,
      },
      {
        t: 'p',
        x: `That mismatch shows up everywhere in the workflow. DevTools shows you one node at a time, so you can't see that a site actually only uses six colors across four hundred elements. It shows computed values without telling you which are CSS custom properties — the difference between a design <em>token</em> and a one-off. And it gives you SVGs as DOM nodes, not as files you can use.`,
      },
      {
        t: 'callout',
        kind: 'info',
        title: 'The framing that unlocked it',
        x: `Stop treating a webpage as a document to inspect. Treat it as a <strong>design system to audit</strong>. Same data, completely different output.`,
      },
      { t: 'h2', x: 'How it works' },
      {
        t: 'p',
        x: `The extension runs entirely in your browser, after the page has finished rendering. It walks the document, reads computed styles off every element, and buckets what it finds into four categories — then deduplicates and ranks each bucket by how often the value appears.`,
      },
      {
        t: 'diagram',
        caption: 'Everything happens inside the tab. No network hop, no server, no round trip.',
        svg: `<svg viewBox="0 0 640 210" role="img" aria-label="Diagram: page DOM flows through the extension parser into four grouped outputs, all inside the browser tab">
  <defs>
    <marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow"/>
    </marker>
    <marker id="ara" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow-a"/>
    </marker>
  </defs>
  <rect x="1" y="1" width="638" height="208" rx="12" class="d-box" stroke-dasharray="4 4"/>
  <text x="16" y="22" class="d-s">Your browser tab — nothing leaves this box</text>

  <rect x="26" y="72" width="118" height="62" rx="10" class="d-box"/>
  <text x="85" y="98" class="d-t" text-anchor="middle">Live page</text>
  <text x="85" y="115" class="d-s" text-anchor="middle">DOM + CSSOM</text>

  <line x1="150" y1="103" x2="196" y2="103" class="d-l" marker-end="url(#ar)"/>

  <rect x="202" y="60" width="132" height="86" rx="10" class="d-box-a"/>
  <text x="268" y="92" class="d-t" text-anchor="middle">Extractor</text>
  <text x="268" y="109" class="d-s" text-anchor="middle">getComputedStyle</text>
  <text x="268" y="124" class="d-s" text-anchor="middle">dedupe + rank</text>

  <line x1="340" y1="103" x2="386" y2="103" class="d-l d-l-a" marker-end="url(#ara)"/>

  <rect x="392" y="38" width="222" height="30" rx="8" class="d-box"/>
  <text x="406" y="58" class="d-t">Colors</text>
  <text x="600" y="58" class="d-s" text-anchor="end">hex · rgba · var()</text>

  <rect x="392" y="76" width="222" height="30" rx="8" class="d-box"/>
  <text x="406" y="96" class="d-t">Typography</text>
  <text x="600" y="96" class="d-s" text-anchor="end">family · size · weight</text>

  <rect x="392" y="114" width="222" height="30" rx="8" class="d-box"/>
  <text x="406" y="134" class="d-t">Assets</text>
  <text x="600" y="134" class="d-s" text-anchor="end">img · inline SVG</text>

  <rect x="392" y="152" width="222" height="30" rx="8" class="d-box"/>
  <text x="406" y="172" class="d-t">Effects</text>
  <text x="600" y="172" class="d-s" text-anchor="end">shadow · radius</text>
</svg>`,
      },
      { t: 'h3', x: 'The four buckets' },
      {
        t: 'cards',
        items: [
          {
            icon: 'palette',
            title: 'Colors',
            desc: 'Groups every color on the page. Detects hex values, RGBA layers and CSS color variables — so you can tell a token from a one-off.',
          },
          {
            icon: 'type',
            title: 'Typography',
            desc: 'Font families, active sizes, line-heights and weights, with the Google Fonts path where one exists.',
          },
          {
            icon: 'image',
            title: 'Assets & icons',
            desc: 'Every image and icon loaded on the page. Copy SVG source inline, download the vector, or grab the absolute URL.',
          },
          {
            icon: 'layers',
            title: 'Shadows & radius',
            desc: 'Box-shadow layers, border widths and corner rounding — the details that decide whether a rebuild reads as parity or as a knockoff.',
          },
        ],
      },
      { t: 'h3', x: 'Reading a color, properly' },
      {
        t: 'p',
        x: `Colors are the deceptively hard one. <code>getComputedStyle</code> resolves everything to <code>rgb()</code> or <code>rgba()</code>, which means by the time you read it, the <em>authored</em> value is gone — you've lost the distinction between a hardcoded color and a design token. So the extractor reads the custom-property layer separately and cross-references it, rather than trusting the computed value alone.`,
      },
      {
        t: 'code',
        lang: 'js',
        file: 'the shape of the problem',
        x: `// What the author wrote — a token, reused 200 times:
//   color: var(--brand-primary)
//
// What getComputedStyle hands back:
//   "rgb(254, 85, 27)"
//
// Same string you'd get from a one-off inline style.
// The computed layer flattens intent, so read both:

const el = document.querySelector('.cta');
const computed = getComputedStyle(el).color;        // "rgb(254, 85, 27)"
const authored = getComputedStyle(document.documentElement)
  .getPropertyValue('--brand-primary').trim();      // "#fe551b"

// Now you can say "this is --brand-primary", not "this is orange".`,
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Where this is still wrong',
        x: `Frequency ranking treats a color used on 200 body-text nodes as more important than one used on a single hero CTA. That's usually right and occasionally very wrong. Weighting by rendered area rather than node count would fix it — that's the next thing I want to change.`,
      },
      { t: 'h2', x: 'Design decisions' },
      { t: 'h3', x: 'Two permissions, and no more' },
      {
        t: 'p',
        x: `The extension requests exactly two permissions. That was a constraint I set before writing any code, because a tool that reads every page you visit has to be obviously trustworthy — not trustworthy-if-you-read-the-source.`,
      },
      {
        t: 'table',
        head: ['Permission', 'Why it exists'],
        rows: [
          [
            '<code>activeTab</code>',
            'Reads layout, CSS and image metadata — but <strong>only for the tab you\'re on, only when you click the icon</strong>. It cannot read pages in the background.',
          ],
          ['<code>storage</code>', 'Saves your preferences and favourites locally, via the Chrome Storage API.'],
        ],
      },
      {
        t: 'p',
        x: `Notably absent: <code>host_permissions</code>, <code>tabs</code>, <code>webRequest</code>, and any network access at all. Parsing happens in the local browser sandbox. Nothing extracted — no colors, no fonts, no assets — is sent anywhere, because there's nowhere for it to be sent.`,
      },
      {
        t: 'callout',
        kind: 'success',
        title: 'A side effect worth having',
        x: `Because it runs in your browser context <em>after</em> the page loads, it works on anything you can already see — pages behind a login, staging environments, and <code>localhost</code>. A server-side scraper can't reach any of those.`,
      },
      { t: 'h3', x: 'No login, no account, no onboarding' },
      {
        t: 'p',
        x: `Install, open a site, click the icon. Three steps, and the third one is the payoff. Any signup wall on a utility this small is a tax on the exact impulse that makes someone install it.`,
      },
      {
        t: 'steps',
        items: [
          { title: 'Install the extension', desc: 'One click from the Chrome Web Store.' },
          { title: 'Navigate to any website', desc: 'Any page you want to pull colors, type or assets from — including private ones.' },
          { title: 'Extract instantly', desc: 'Click the toolbar icon. The whole design system, formatted and grouped.' },
        ],
      },
      { t: 'h2', x: 'Interface' },
      {
        t: 'image',
        src: '',
        alt: 'The extension popup showing the Colors tab',
        caption: 'The popup — Colors tab, grouped and ranked by usage.',
        ratio: '4-3',
      },
      {
        t: 'gallery',
        items: [
          { src: '', alt: 'Typography tab' },
          { src: '', alt: 'Assets tab with SVG download' },
          { src: '', alt: 'Effects tab' },
        ],
      },
      { t: 'h2', x: 'What I\'d change' },
      {
        t: 'p',
        x: `Three things, in order of how much they bother me:`,
      },
      {
        t: 'p',
        x: `<strong>Area-weighted ranking.</strong> As above — node count is a proxy for importance, and a bad one.<br>
<strong>Export the whole system, not values.</strong> Right now you copy values one at a time. It should emit a <code>tailwind.config.js</code>, a block of CSS custom properties, or a Style Dictionary JSON in one action.<br>
<strong>Shadow parity is approximate.</strong> Multi-layer shadows come back as a single computed string; splitting them back into authored layers is guesswork I haven't solved.`,
      },
      {
        t: 'callout',
        kind: 'danger',
        title: 'Honest status',
        x: `The Chrome Web Store link on the landing page currently points at the store homepage, not a listing — the extension isn't published yet. The landing page, the parser and the UI are real; distribution is the unfinished part.`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'tasks-extension',
    name: 'Tasks Extension',
    tag: 'Chrome Extension',
    icon: 'check',
    group: 'Browser Extensions',
    url: '/tasks/index.html',
    summary: 'A beautiful Chrome extension to manage and sync your tasks directly with Google Tasks.',
    lede: 'Google Tasks is genuinely good and genuinely buried — three clicks deep in Gmail\'s sidebar. This puts it one keystroke from wherever you already are, with no database in the middle.',
    status: 'Unlisted',
    blocks: [
      {
        t: 'launch',
        title: 'Tasks Extension',
        desc: 'Landing page with a live interactive demo',
        url: '/tasks/index.html',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `Google Tasks has a quiet advantage over every to-do app on the market: it's already synced to the thing you live in. Due dates land on your calendar. Emails become tasks. It's on your phone. There's no account to make, no team to invite, no upsell.`,
      },
      {
        t: 'p',
        x: `And almost nobody uses it — because getting to it means opening Gmail, finding the right-hand rail, and clicking a small blue icon. The product is fine. The <strong>distance</strong> to the product is the problem.`,
      },
      { t: 'h2', x: 'The bet' },
      {
        t: 'p',
        x: `Don't build a task app. Build a <strong>shorter path to one that already works</strong>.`,
      },
      {
        t: 'p',
        x: `That reframing kills an enormous amount of scope. No sync engine. No accounts. No conflict resolution. No mobile app — Google already ships one. The entire product is a rendering surface over an API you already have permission to call.`,
      },
      {
        t: 'callout',
        kind: 'info',
        title: 'The whole architecture, in one line',
        x: `Your browser talks to Google. That's it. There is no server in between, because there's nothing for a server to do.`,
      },
      {
        t: 'diagram',
        caption: 'The middle column is where most task apps put a database. Leaving it out is the feature.',
        svg: `<svg viewBox="0 0 640 190" role="img" aria-label="Diagram: the extension in your browser calls the Google Tasks API directly, with no intermediate server">
  <defs>
    <marker id="ar2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow-a"/>
    </marker>
    <marker id="ar2b" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
      <path d="M8,0 L0,4 L8,8 z" class="d-arrow-a"/>
    </marker>
  </defs>

  <rect x="16" y="42" width="168" height="106" rx="12" class="d-box-a"/>
  <text x="100" y="70" class="d-t" text-anchor="middle">Extension</text>
  <text x="100" y="88" class="d-s" text-anchor="middle">popup · side panel</text>
  <text x="100" y="104" class="d-s" text-anchor="middle">chrome.storage</text>
  <text x="100" y="120" class="d-s" text-anchor="middle">chrome.alarms</text>
  <text x="100" y="138" class="d-s" text-anchor="middle">OAuth 2.0 token</text>

  <line x1="192" y1="86" x2="292" y2="86" class="d-l d-l-a" marker-end="url(#ar2)"/>
  <text x="242" y="78" class="d-s" text-anchor="middle">read / write</text>
  <line x1="292" y1="108" x2="192" y2="108" class="d-l d-l-a" marker-end="url(#ar2b)"/>
  <text x="242" y="124" class="d-s" text-anchor="middle">tasks + lists</text>

  <rect x="300" y="42" width="152" height="106" rx="12" class="d-box" stroke-dasharray="5 5"/>
  <text x="376" y="88" class="d-s" text-anchor="middle" style="font-size:11px">no server here</text>
  <text x="376" y="106" class="d-s" text-anchor="middle" style="font-size:11px">no database here</text>
  <line x1="330" y1="128" x2="422" y2="62" class="d-l" stroke-dasharray="3 3"/>

  <rect x="468" y="42" width="156" height="106" rx="12" class="d-box"/>
  <text x="546" y="70" class="d-t" text-anchor="middle">Google Tasks API</text>
  <text x="546" y="92" class="d-s" text-anchor="middle">Gmail sidebar</text>
  <text x="546" y="110" class="d-s" text-anchor="middle">Google Calendar</text>
  <text x="546" y="128" class="d-s" text-anchor="middle">iOS + Android apps</text>

  <text x="320" y="176" class="d-s" text-anchor="middle">Your data never touches infrastructure I control.</text>
</svg>`,
      },
      { t: 'h2', x: 'Design decisions' },
      { t: 'h3', x: 'Three permissions' },
      {
        t: 'table',
        head: ['Permission', 'What it powers'],
        rows: [
          ['<code>identity</code>', 'OAuth 2.0 with your Google account. Read and write your tasks — nothing else.'],
          ['<code>storage</code>', 'Preferences and task cache, in Chrome\'s sandboxed local storage.'],
          ['<code>alarms</code>', 'Background notifications for tasks with due dates.'],
        ],
      },
      {
        t: 'p',
        x: `The OAuth token lives in local browser storage and is used only to authenticate requests going from your browser to Google's servers. It is never copied to a third party, because there is no third party. Use of Google API data adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener">Google API Services User Data Policy</a>, including the Limited Use requirements.`,
      },
      { t: 'h3', x: 'Two surfaces, one product' },
      {
        t: 'cards',
        items: [
          {
            icon: 'window',
            title: 'Toolbar popup',
            desc: 'Closed until you click it. For the ten-second interaction — add a thing, check a thing, leave.',
          },
          {
            icon: 'sidebar',
            title: 'Chrome Side Panel',
            desc: 'Pinned next to the page you\'re reading, persistent across tabs. For when the list is the job, not the interruption.',
          },
        ],
      },
      {
        t: 'p',
        x: `These aren't two modes of one UI — they're answers to two different questions. The popup optimises for <em>exit speed</em>. The side panel optimises for <em>staying open</em>. Trying to serve both with one layout is how you get an interface that's mediocre at each.`,
      },
      { t: 'h3', x: 'Keyboard first' },
      {
        t: 'p',
        x: `If you have to reach for the mouse to tick something off, the extension has already lost to a sticky note. Four keys cover essentially the whole surface:`,
      },
      {
        t: 'table',
        head: ['Key', 'Action'],
        rows: [
          ['<kbd>Enter</kbd>', 'Create new task'],
          ['<kbd>Space</kbd>', 'Check / complete task'],
          ['<kbd>Esc</kbd>', 'Dismiss panel'],
          ['<kbd>Shift</kbd> + <kbd>N</kbd>', 'Switch lists'],
        ],
      },
      {
        t: 'callout',
        kind: 'success',
        title: 'The ecosystem does the heavy lifting',
        x: `Because it writes through the official API, a task created here shows up in the Gmail sidebar, on Google Calendar if it has a due date, and in the Google Tasks mobile app — with no sync code on my side.`,
      },
      { t: 'h2', x: 'Interface' },
      {
        t: 'image',
        src: '',
        alt: 'The Tasks popup open over a webpage',
        caption: 'The popup — one list, one input, no chrome.',
        ratio: '4-3',
      },
      {
        t: 'compare',
        before: '',
        after: '',
        beforeLabel: 'Gmail sidebar',
        afterLabel: 'Extension',
        caption: 'Same data, same account. The difference is how far you had to go to reach it.',
      },
      { t: 'h2', x: 'What I\'d change' },
      {
        t: 'p',
        x: `<strong>Offline is unsolved.</strong> There's a local task cache, but it's a cache, not an offline mode — there's no write queue and no conflict resolution. Go offline, add a task, and you're relying on luck. This is the honest gap in the product and I've deliberately not claimed otherwise on the landing page.`,
      },
      {
        t: 'p',
        x: `<strong>"Instant sync" is optimistic UI.</strong> Writes go out immediately and the interface updates before confirmation. It feels instant. It isn't atomic, and a failed write currently fails quietly.`,
      },
      {
        t: 'callout',
        kind: 'danger',
        title: 'Honest status',
        x: `Like the extractor, the store link points at the Chrome Web Store homepage rather than a listing — this isn't published. The landing page ships a real working demo of the interface, but the extension itself is unreleased.`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'tints-and-shades',
    name: 'Tints & Shades',
    tag: 'Figma Plugin',
    icon: 'droplet',
    group: 'Figma Plugins',
    url: 'https://tintsandshades.nijin.site/',
    summary: 'A Figma plugin that generates color scales of tints and shades in seconds.',
    lede: 'Pick a base color, get a mathematically uniform scale, push it straight into Figma variables — or out as Tailwind config, CSS custom properties, or Style Dictionary JSON.',
    status: 'Open source',
    blocks: [
      {
        t: 'launch',
        title: 'Tints & Shades',
        desc: 'Live plugin page with an interactive generator',
        url: 'https://tintsandshades.nijin.site/',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `Building a color scale by hand is a special kind of tedious. You pick a brand color, then eyeball nine variations of it, then discover halfway through the UI that your 300 and your 400 are indistinguishable and your 700 has quietly gone purple.`,
      },
      {
        t: 'p',
        x: `The maths to avoid that is not complicated. It's linear interpolation. The plugin's whole job is to run it consistently and put the result where you need it.`,
      },
      { t: 'h2', x: 'The algorithm' },
      {
        t: 'p',
        x: `Two operations, one formula each. A <strong>tint</strong> blends the base color's channels toward white. A <strong>shade</strong> blends them toward black. Steps are interpolated at even intervals so no two neighbours jump.`,
      },
      {
        t: 'code',
        lang: 'js',
        file: 'the entire engine',
        x: `// Tint — blend each RGB channel toward 255 (white)
const tint = (c, factor) => Math.round(c + (255 - c) * factor);

// Shade — blend each RGB channel toward 0 (black)
const shade = (c, factor) => Math.round(c * (1 - factor));

// Even intervals prevent visible jumps between neighbours
for (let i = 1; i <= steps; i++) {
  const factor = i / (steps + 1);
  scale.unshift(rgb.map(c => shade(c, factor)));  // darker side
  scale.push(rgb.map(c => tint(c, factor)));      // lighter side
}`,
      },
      {
        t: 'p',
        x: `That's it. That's the plugin. The interesting design work wasn't the maths — it was deciding what to do with the output.`,
      },
      { t: 'h3', x: 'Try it' },
      {
        t: 'p',
        x: `This runs the exact formula above, live. Change the base color, drag the step count, click any swatch to copy its hex.`,
      },
      { t: 'demo', kind: 'scale' },
      {
        t: 'callout',
        kind: 'warning',
        title: 'The honest limitation of RGB interpolation',
        x: `Linear RGB blending is <strong>mathematically</strong> uniform, not <strong>perceptually</strong> uniform. Human vision isn't linear in RGB, so evenly-spaced RGB steps don't look evenly spaced — mid-tones bunch up and saturated hues can drift as they lighten. A perceptual space like OKLCH would fix this. That's the single biggest improvement available to this plugin, and it isn't done.`,
      },
      { t: 'h2', x: 'Design decisions' },
      { t: 'h3', x: 'Output where the work actually happens' },
      {
        t: 'p',
        x: `A color scale that lives in a plugin panel is useless. The scale has to land in the file, or in the codebase, without a copy-paste round trip:`,
      },
      {
        t: 'cards',
        items: [
          { icon: 'layers', title: 'Figma variables', desc: 'Any generated scale saves directly into the document\'s variable list. Batch-sync several scales at once.' },
          { icon: 'code', title: 'Tailwind config', desc: 'Hex arrays formatted for a tailwind.config file — paste and go.' },
          { icon: 'braces', title: 'CSS variables', desc: 'Root custom properties, ready for a stylesheet.' },
          { icon: 'file', title: 'Design tokens JSON', desc: 'Style Dictionary–shaped schema for handoff pipelines.' },
        ],
      },
      { t: 'h3', x: 'Contrast is a design constraint, not a report' },
      {
        t: 'p',
        x: `The scale is built to help hit WCAG AA and AAA — but the useful move is surfacing contrast <em>while</em> you're picking, not auditing it after you've shipped. A scale that tells you the 400 fails on white before you've built forty components with it has saved you a day.`,
      },
      {
        t: 'p',
        x: `Everything is calculated in memory, inside Figma's sandboxed iframe. Step preferences persist via <code>figma.clientStorage</code>. No registration, no analytics, no network calls — your design libraries never leave the client.`,
      },
      { t: 'h2', x: 'Where it gets used' },
      {
        t: 'table',
        head: ['Role', 'What they reach for it for'],
        rows: [
          ['Product designers', 'Hover and active states that relate to the base color instead of being guessed.'],
          ['Design system leads', 'Standard 50–950 scales with uniform intervals across every brand color.'],
          ['Frontend developers', 'Exact hex arrays, so "which blue?" stops being a question.'],
        ],
      },
      {
        t: 'image',
        src: '',
        alt: 'The plugin panel running inside Figma',
        caption: 'The plugin panel inside Figma.',
        ratio: '16-9',
      },
      { t: 'h2', x: 'What I\'d change' },
      {
        t: 'p',
        x: `<strong>Move to OKLCH.</strong> The whole limitation above collapses if the interpolation happens in a perceptual space. It's the one change that would make the output <em>look</em> as uniform as it measures.`,
      },
      {
        t: 'p',
        x: `<strong>Publish the source.</strong> The plugin is MIT licensed and there's no public repo behind that claim yet — which makes the claim close to meaningless. Either the repo goes up or the line comes off the page.`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'design-school',
    name: 'Design School',
    tag: 'Resource',
    icon: 'book',
    group: 'Teaching',
    url: 'https://design.nijin.site/',
    summary: 'A curated collection of resources for learning design.',
    lede: 'What I actually send students, instead of a bookmark folder with four hundred links and no opinion.',
    status: 'Live',
    blocks: [
      {
        t: 'launch',
        title: 'Design School',
        desc: 'The live resource collection',
        url: 'https://design.nijin.site/',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `After mentoring 500+ students at <a href="https://harisandcoacademy.com" target="_blank" rel="noopener">HACA</a>, I noticed I was answering the same question every intake: <em>"what should I read?"</em> — and answering it badly, with a link dump.`,
      },
      {
        t: 'p',
        x: `A link dump is a failure of nerve. It looks generous and it's actually the opposite: it hands the hardest part of the job — deciding what's worth your time — back to the person least equipped to do it.`,
      },
      { t: 'h2', x: 'The principle' },
      {
        t: 'callout',
        kind: 'info',
        title: 'Curation is subtraction',
        x: `The value of this collection is everything I <strong>left out</strong>. A list of 40 resources someone will actually finish beats a list of 400 they'll bounce off in a week.`,
      },
      {
        t: 'p',
        x: `So the rule is: if I wouldn't personally hand it to a specific student for a specific reason, it doesn't go in. Every entry has to answer "who is this for, and when in their learning?" — not just "is this good?"`,
      },
      { t: 'h2', x: 'Design decisions' },
      {
        t: 'p',
        x: `<strong>Ordered by learning stage, not by category.</strong> Categories are a librarian's mental model. Beginners don't need "Typography / Color / Layout" — they need "start here, then this."`,
      },
      {
        t: 'p',
        x: `<strong>No account, no email capture, no drip sequence.</strong> The point is to help, and a resource list gated behind a signup is a lead magnet wearing a teacher's clothes.`,
      },
      {
        t: 'p',
        x: `<strong>Fast and boring.</strong> A static page that loads instantly on a bad connection, because a meaningful share of the students I'm writing for are on one.`,
      },
      {
        t: 'image',
        src: '',
        alt: 'Design School resource index',
        caption: 'The index — grouped by where you are, not by what it is.',
        ratio: '16-9',
      },
      { t: 'h2', x: 'What I\'d change' },
      {
        t: 'p',
        x: `The hard part of a curated list isn't building it — it's the maintenance. Links rot, tools get acquired and enshittified, and a stale recommendation is worse than none, because it spends trust I need for the rest of the list. There's no review cadence on this yet, and there should be.`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'speed-test',
    name: 'Speed Test',
    tag: 'Network',
    icon: 'gauge',
    group: 'Network Tools',
    url: 'https://speedtest.nijin.site/',
    summary: 'Internet speed test — download, upload, ping, jitter.',
    lede: 'Four numbers, no ads, no app install, no "your connection is being analysed" theatre.',
    status: 'Live',
    blocks: [
      {
        t: 'launch',
        title: 'Speed Test',
        desc: 'Run a live speed test',
        url: 'https://speedtest.nijin.site/',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `Most speed tests are advertising with a gauge on top. You want one number and you get a page that weighs more than the file it's about to download to measure your connection.`,
      },
      { t: 'h2', x: 'What it measures' },
      {
        t: 'cards',
        items: [
          { icon: 'download', title: 'Download', desc: 'Throughput pulling data down — the number people mean when they say "speed".' },
          { icon: 'upload', title: 'Upload', desc: 'Throughput pushing data up. Usually far lower, and the one that ruins video calls.' },
          { icon: 'zap', title: 'Ping', desc: 'Round-trip latency. Decides whether things feel instant, regardless of bandwidth.' },
          { icon: 'activity', title: 'Jitter', desc: 'Variance between pings. The quiet killer — high jitter breaks calls even on a fast line.' },
        ],
      },
      {
        t: 'callout',
        kind: 'info',
        title: 'Why jitter is on the front page',
        x: `Bandwidth is the number everyone quotes and jitter is the number that explains why the call was bad anyway. A 500 Mbps line with unstable latency is a worse call than a stable 20 Mbps one. Measuring it means taking many samples and reporting the <em>variance</em> — a single ping tells you almost nothing.`,
      },
      { t: 'h2', x: 'Design decisions' },
      {
        t: 'p',
        x: `<strong>The result is the page.</strong> No interstitial, no "analysing…" stage that exists purely to hold you long enough to serve an impression.`,
      },
      {
        t: 'p',
        x: `<strong>All four numbers at once.</strong> Tools that show download first and bury latency are optimising for the number that sounds impressive rather than the one that's diagnostic.`,
      },
      {
        t: 'image',
        src: '',
        alt: 'Speed test results view',
        caption: 'Result state — four numbers, equal weight.',
        ratio: '16-9',
      },
      { t: 'h2', x: 'Caveats' },
      {
        t: 'callout',
        kind: 'warning',
        title: 'A browser speed test measures a browser',
        x: `Any in-browser test is bounded by JavaScript, the browser's connection limits, and the distance to the test server. It tells you what a web page can achieve from where you're sitting — which is usually the number you actually care about, but it is <strong>not</strong> a measurement of your line's theoretical capacity. Treat a slow result as a starting point, not a verdict.`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'site-speed-test',
    name: 'Site Speed Test',
    tag: 'Network',
    icon: 'timer',
    group: 'Network Tools',
    url: 'https://sitespeedcheck.nijin.site/',
    summary: 'Checks page load time, size, and request waterfall for any website.',
    lede: 'Load time, total weight, and the request waterfall — the three things that tell you why a page is slow, rather than just that it is.',
    status: 'Live',
    blocks: [
      {
        t: 'launch',
        title: 'Site Speed Test',
        desc: 'Analyse any URL',
        url: 'https://sitespeedcheck.nijin.site/',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `"Your site scores 63" is not actionable. A composite score compresses a dozen independent problems into one number you can't act on, which is why people stare at it, feel bad, and change nothing.`,
      },
      {
        t: 'p',
        x: `The waterfall is the opposite. It's not a grade — it's a <strong>sequence</strong>. And slowness is almost always a sequencing problem.`,
      },
      { t: 'h2', x: 'The three measurements' },
      {
        t: 'table',
        head: ['Metric', 'What it tells you'],
        rows: [
          ['<strong>Load time</strong>', 'The symptom. Useful for tracking, useless for diagnosis.'],
          ['<strong>Page size</strong>', 'Total bytes. Usually the first surprise — an uncompressed hero image or a font you forgot to subset.'],
          ['<strong>Request waterfall</strong>', 'The cause. Every request, in order, with what blocked what.'],
        ],
      },
      {
        t: 'callout',
        kind: 'info',
        title: 'Read the waterfall\'s shape, not its length',
        x: `A long waterfall isn't automatically bad — a <strong>staircase</strong> is. Requests descending one after another means each one had to finish before the next could start, and you're paying full round-trip latency per step. A wide, flat block of parallel requests is a page loading efficiently. Same total bytes, completely different experience.`,
      },
      { t: 'h2', x: 'Design decisions' },
      {
        t: 'p',
        x: `<strong>No score.</strong> Scores let you feel measured without being informed. Every number here maps to a thing you could go change this afternoon.`,
      },
      {
        t: 'p',
        x: `<strong>The waterfall is the hero, not an appendix.</strong> Most tools hide it three tabs deep behind the number. It's the only part that explains anything.`,
      },
      {
        t: 'image',
        src: '',
        alt: 'Request waterfall visualisation',
        caption: 'The waterfall — where the staircases show up.',
        ratio: '16-9',
        bleed: true,
      },
      { t: 'h2', x: 'Caveats' },
      {
        t: 'callout',
        kind: 'warning',
        title: 'One run is an anecdote',
        x: `A single measurement from one location, on one connection, with a cold cache is a data point, not a baseline. CDN warmth, geography and time of day all move these numbers. Run it a few times before you believe it.`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'dns-checker',
    name: 'DNS Checker',
    tag: 'Network',
    icon: 'globe',
    group: 'Network Tools',
    url: 'https://dnschecker.nijin.site/',
    summary: 'Shows your DNS records + propagation.',
    lede: 'Your records, and whether the rest of the world can see them yet.',
    status: 'Live',
    blocks: [
      {
        t: 'launch',
        title: 'DNS Checker',
        desc: 'Look up records and propagation',
        url: 'https://dnschecker.nijin.site/',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `DNS is the thing that breaks your launch. You changed the record, it works on your machine, and someone on another continent is still hitting the old server — and you have no way to see what they see.`,
      },
      { t: 'h2', x: 'Why "propagation" is the whole feature' },
      {
        t: 'p',
        x: `There's no such thing as DNS propagation, strictly. Records don't <em>spread</em> — resolvers <strong>cache</strong> them, and each one independently forgets on its own TTL schedule. What people call propagation is really "the slowest cache between you and your users hasn't expired yet."`,
      },
      {
        t: 'callout',
        kind: 'info',
        title: 'Which is exactly why you need to check from elsewhere',
        x: `Checking from your own machine tells you about <strong>your</strong> resolver's cache and nothing else. The only useful question is what resolvers <em>you don't control</em> are currently returning — and that's a question you can't answer locally, no matter how many times you flush your cache.`,
      },
      { t: 'h2', x: 'Design decisions' },
      {
        t: 'p',
        x: `<strong>Show the disagreement.</strong> When resolvers return different answers, that <em>is</em> the finding. A tool that averages it away or shows only the first response has thrown out the one thing you came for.`,
      },
      {
        t: 'p',
        x: `<strong>TTL up front.</strong> "Wait 48 hours" is folklore. Your TTL is a number, it's right there, and it tells you what the actual worst case is.`,
      },
      {
        t: 'image',
        src: '',
        alt: 'DNS record lookup with propagation status',
        caption: 'Records, with per-resolver status.',
        ratio: '16-9',
      },
      { t: 'h2', x: 'Caveats' },
      {
        t: 'callout',
        kind: 'warning',
        title: 'Public resolvers aren\'t your users',
        x: `Checking a set of public resolvers is a good proxy and not a guarantee. Your visitors' ISP resolvers have their own caches and sometimes their own opinions about TTLs — a few ignore short ones entirely. All clear here means "probably fine", not "definitely done".`,
      },
    ],
  },

  // ==========================================================================
  {
    slug: 'ip-checker',
    name: 'IP Checker',
    tag: 'Network',
    icon: 'map',
    group: 'Network Tools',
    url: 'https://ipchecker.nijin.site/',
    summary: 'Check IP and location.',
    lede: 'The smallest useful tool I\'ve built: what\'s my IP, and what does the internet think that means about me?',
    status: 'Live',
    blocks: [
      {
        t: 'launch',
        title: 'IP Checker',
        desc: 'See your IP and what it reveals',
        url: 'https://ipchecker.nijin.site/',
        label: 'Open product',
      },
      {
        t: 'p',
        x: `Two reasons anyone loads this page: confirming a VPN is actually on, or debugging why a service thinks they're in the wrong country. Both are answered in about one second, and the page should respect that.`,
      },
      { t: 'h2', x: 'Design decisions' },
      {
        t: 'p',
        x: `<strong>The answer, immediately.</strong> No search box — you're asking about yourself, and the server already knows. Making someone press a button to learn their own IP is a small insult.`,
      },
      {
        t: 'p',
        x: `<strong>Location is a guess, and it says so.</strong> Geolocation is a lookup against a registry database, not a measurement. Presenting a guessed city with the same confidence as an observed IP address is the central lie of most IP tools.`,
      },
      {
        t: 'callout',
        kind: 'warning',
        title: 'How wrong geolocation gets',
        x: `IP geolocation resolves to whatever the registry says about that block — often the ISP's registered location rather than yours. Country is usually right. City is frequently wrong, sometimes by hundreds of kilometres, and mobile carriers can place you in a different region entirely. It's a hint, not a position.`,
      },
      { t: 'h2', x: 'What it shows' },
      {
        t: 'p',
        x: `Your public IP, the network it belongs to, and the location that databases associate with it. That's genuinely the whole product — and the discipline is in refusing to pad it out with a fingerprinting panel to look more substantial.`,
      },
      {
        t: 'image',
        src: '',
        alt: 'IP Checker result view',
        caption: 'The whole product.',
        ratio: '16-9',
      },
    ],
  },
];
