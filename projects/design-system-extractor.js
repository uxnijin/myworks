const PROJECT_DESIGN_SYSTEM_EXTRACTOR = {
  slug: 'design-system-extractor',
  name: 'Design System Extractor',
  tag: 'Chrome Extension',
  icon: 'palette',
  group: 'Browser Extensions',
  url: '/design-system-extractor/index.html',
  productUrl: 'https://chromewebstore.google.com/',
  summary: 'Extract colors, typography, images, icons, and CSS styles from any website in seconds.',
  lede: 'A Chrome extension that reads a live page and hands back its design system — brand colors, fonts, asset URLs, clean SVGs, shadows and corner radii — in one click, without ever opening DevTools.',
  status: 'Unlisted',
  blocks: [
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
  privacyBlocks: [
    { t: 'p', x: '<em>Last updated: July 15, 2026</em>' },
    {
      t: 'p',
      x: 'This privacy policy describes how we collect, protect, and use user information in the Design System Extractor Chrome extension. We are committed to protecting your privacy and security. We do not gather, store, or track any personal information or extracted webpage metadata on external servers.'
    },
    { t: 'h2', x: 'Data Collection & Use' },
    {
      t: 'p',
      x: 'The Design System Extractor parses CSS rules, colors, fonts, assets, and design properties directly within your local browser sandbox. All calculations, parsing, and extraction workflows occur solely on your machine.'
    },
    {
      t: 'p',
      x: 'We do not collect, store, transmit, or monetize any data obtained from your active browser pages or from your design systems. Everything stays completely in your browser context.'
    },
    { t: 'h2', x: 'Required Permissions' },
    {
      t: 'p',
      x: 'The Design System Extractor Chrome extension requests the following browser permissions in order to perform correctly:'
    },
    {
      t: 'table',
      head: ['Permission', 'Purpose'],
      rows: [
        ['activeTab', 'Allows the extension to read the layout parameters, CSS files, and image metadata of the page you are currently viewing to present the design system parameters when you click the extension icon.'],
        ['storage', 'Saves user preferences, favorites, and settings locally on your computer.']
      ]
    },
    { t: 'h2', x: 'Local Storage & Security' },
    {
      t: 'p',
      x: 'All user-specific settings, favorites, and custom configurations are stored locally on your device via the secure Chrome Extension Storage API. No analytical databases or telemetry software are deployed, ensuring that your workflow details remain strictly private.'
    },
    { t: 'h2', x: 'Third Party Disclosure' },
    {
      t: 'p',
      x: 'We do not sell, trade, or transfer any information to outside parties. Because we do not collect any data, there is no data to share.'
    },
    { t: 'h2', x: 'Policy Changes' },
    {
      t: 'p',
      x: 'We may update this Privacy Policy statement occasionally to reflect modifications in our application or browser API requirements. We recommend referencing this document regularly to keep updated with updates.'
    },
    { t: 'h2', x: 'Contact' },
    {
      t: 'p',
      x: 'If you have any questions or feedback regarding this privacy document, please contact us at <a href="mailto:uxnijin@gmail.com">uxnijin@gmail.com</a>.'
    }
  ],
  termsBlocks: [
    { t: 'p', x: '<em>Last updated: July 15, 2026</em>' },
    { t: 'h2', x: 'Acceptance of Terms' },
    {
      t: 'p',
      x: 'By installing and using the Design System Extractor Chrome extension, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please uninstall and discontinue using the extension immediately.'
    },
    { t: 'h2', x: 'License & Usage' },
    {
      t: 'p',
      x: 'We grant you a personal, non-transferable, non-exclusive license to use the Design System Extractor extension strictly for personal, developer, or design-related workspace activities in accordance with these terms.'
    },
    {
      t: 'p',
      x: 'You may inspect, view, copy, and download styling properties and assets parsed by the extension from web documents that you own or have permission to access.'
    },
    { t: 'h2', x: 'Prohibited Uses' },
    {
      t: 'p',
      x: 'You agree not to use the extension for any unlawful purposes, including but not limited to:'
    },
    {
      t: 'table',
      head: ['Restriction', 'Details'],
      rows: [
        ['Copyright & IP', 'Accessing or copying protected design works in a manner that violates copyright, trademark, or intellectual property laws.'],
        ['Distribution', 'Distributing, renting, or selling the software or modifying its core package structure for resale.'],
        ['Scraping', 'Deploying the extension to scrape data aggressively or bypass site security/API limits in an automated fashion.']
      ]
    },
    { t: 'h2', x: 'Intellectual Property' },
    {
      t: 'p',
      x: 'The code, layouts, logos, and UI representations of the Design System Extractor application are the exclusive intellectual property of Nijin. All trademarks and registered assets of websites you inspect using this tool remain the property of their respective owners.'
    },
    { t: 'h2', x: 'Disclaimer of Warranty' },
    {
      t: 'p',
      x: 'The Design System Extractor Chrome extension is provided "as is" and "as available", without warranty of any kind, express or implied. We do not guarantee that the extension will accurately parse every styling element, image, or dynamic CSS script on all external webpages.'
    },
    { t: 'h2', x: 'Limitation of Liability' },
    {
      t: 'p',
      x: 'In no event shall Nijin be liable for any damages, data loss, or business interruptions arising out of the use or inability to use the Design System Extractor extension, even if we have been notified of such possibilities.'
    },
    { t: 'h2', x: 'Contact' },
    {
      t: 'p',
      x: 'If you have any questions or feedback regarding these terms, please contact us at <a href="mailto:uxnijin@gmail.com">uxnijin@gmail.com</a>.'
    }
  ]
};
