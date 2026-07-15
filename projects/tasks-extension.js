const PROJECT_TASKS_EXTENSION = {
  slug: 'tasks-extension',
  name: 'Tasks Extension',
  tag: 'Chrome Extension',
  icon: 'check',
  group: 'Browser Extensions',
  url: '/tasks/index.html',
  productUrl: 'https://chromewebstore.google.com/',
  summary: 'A beautiful Chrome extension to manage and sync your tasks directly with Google Tasks.',
  lede: 'Google Tasks is genuinely good and genuinely buried, sitting three clicks deep in Gmail\'s sidebar. This puts it one keystroke from wherever you already are, with no database in the middle.',
  status: 'Unlisted',
  blocks: [
    {
      t: 'p',
      x: `Google Tasks has a quiet advantage over every to-do app on the market: it's already synced to the thing you live in. Due dates land on your calendar. Emails become tasks. It's on your phone. There's no account to make, no team to invite, no upsell.`,
    },
    {
      t: 'p',
      x: `And almost nobody uses it, because getting to it means opening Gmail, finding the right-hand rail, and clicking a small blue icon. The product is fine. The <strong>distance</strong> to the product is the problem.`,
    },
    { t: 'h2', x: 'The bet' },
    {
      t: 'p',
      x: `Don't build a task app. Build a <strong>shorter path to one that already works</strong>.`,
    },
    {
      t: 'p',
      x: `That reframing kills an enormous amount of scope. No sync engine. No accounts. No conflict resolution. No mobile app, since Google already ships one. The entire product is a rendering surface over an API you already have permission to call.`,
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
        ['<code>identity</code>', 'OAuth 2.0 with your Google account. Read and write your tasks, and nothing else.'],
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
          desc: 'Closed until you click it. For the ten-second interaction: add a thing, check a thing, leave.',
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
      x: `These aren't two modes of one UI; they are answers to two different questions. The popup optimises for <em>exit speed</em>. The side panel optimises for <em>staying open</em>. Trying to serve both with one layout is how you get an interface that's mediocre at each.`,
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
      x: `Because it writes through the official API, a task created here shows up in the Gmail sidebar, on Google Calendar if it has a due date, and in the Google Tasks mobile app, with no sync code on my side.`,
    },
    { t: 'h2', x: 'Interface' },
    {
      t: 'image',
      src: '',
      alt: 'The Tasks popup open over a webpage',
      caption: 'The popup: one list, one input, no chrome.',
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
      x: `<strong>Offline is unsolved.</strong> There's a local task cache, but it's a cache, not an offline mode; there's no write queue and no conflict resolution. Go offline, add a task, and you're relying on luck. This is the honest gap in the product and I've deliberately not claimed otherwise on the landing page.`,
    },
    {
      t: 'p',
      x: `<strong>"Instant sync" is optimistic UI.</strong> Writes go out immediately and the interface updates before confirmation. It feels instant. It isn't atomic, and a failed write currently fails quietly.`,
    },
    {
      t: 'callout',
      kind: 'danger',
      title: 'Honest status',
      x: `Like the extractor, the store link points at the Chrome Web Store homepage rather than a listing, as this isn't published. The landing page ships a real working demo of the interface, but the extension itself is unreleased.`,
    },
  ],
  privacyBlocks: [
    { t: 'p', x: '<em>Last updated: July 8, 2026</em>' },
    {
      t: 'p',
      x: 'This privacy policy describes how we collect, protect, and use user information in the Tasks Extension Chrome extension. We are committed to protecting your privacy and security. We do not gather, store, or track any personal information or task list details on external servers.'
    },
    { t: 'h2', x: 'Google OAuth Data' },
    {
      t: 'p',
      x: 'Our extension uses Google OAuth 2.0 to access Google Tasks APIs on your behalf. The authentication token obtained from this process is saved safely directly inside your local browser storage. This token is used solely to authenticate request endpoints sent from your browser to Google API servers.'
    },
    {
      t: 'p',
      x: 'We do not copy, process, or send this Google Account credential to any third-party databases, developers, or analytical software.'
    },
    { t: 'h2', x: 'Limited Use Compliance' },
    {
      t: 'p',
      x: 'The Tasks Extension\'s use and transfer of information received from Google APIs to any other app will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener">Google API Services User Data Policy</a>, including the Limited Use requirements.'
    },
    { t: 'h2', x: 'Data Storage & Safety' },
    {
      t: 'p',
      x: 'All app-related data, user settings, authentication credentials, and task caching are kept inside your local device using Chrome\'s secure sandboxed storage API (Chrome Storage API). No database sync, telemetry tools, or server log tracking are deployed, ensuring that your details remain strictly private.'
    },
    { t: 'h2', x: 'Required Permissions' },
    {
      t: 'p',
      x: 'The Tasks Extension requests the following browser permissions in order to perform correctly:'
    },
    {
      t: 'table',
      head: ['Permission', 'Purpose'],
      rows: [
        ['identity', 'Allows authentication with your Google account through OAuth 2.0.'],
        ['storage', 'Saves user preferences and active state on your local machine.'],
        ['alarms', 'Powers background alerts to warn you of upcoming scheduled task due dates.']
      ]
    },
    { t: 'h2', x: 'Policy Changes' },
    {
      t: 'p',
      x: 'We may update this Privacy Policy statement occasionally to reflect modifications in our application or browser API changes. We recommend referencing this document regularly to keep updated with updates.'
    },
    { t: 'h2', x: 'Contact' },
    {
      t: 'p',
      x: 'If you have any questions or feedback regarding this privacy document, please contact us at <a href="mailto:privacy@uxnijin.com">privacy@uxnijin.com</a>.'
    }
  ],
  termsBlocks: [
    { t: 'p', x: '<em>Last updated: July 8, 2026</em>' },
    { t: 'h2', x: 'Acceptance of Terms' },
    {
      t: 'p',
      x: 'By installing and using the Tasks Extension Chrome extension, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please remove and uninstall the application immediately.'
    },
    { t: 'h2', x: 'Description of Service' },
    {
      t: 'p',
      x: 'Tasks Extension is a productivity tool designed as a Chrome extension. It allows users to view, create, toggle, and manage their lists inside Google Tasks through integration with official Google API endpoints. The product is provided "as is" and is free of charge.'
    },
    { t: 'h2', x: 'License to Use' },
    {
      t: 'p',
      x: 'We grant you a personal, worldwide, royalty-free, non-assignable, and non-exclusive license to use the software provided to you. This license is for the sole purpose of enabling you to use and enjoy the benefits of the extension as permitted by these terms.'
    },
    { t: 'h2', x: 'Your Responsibilities' },
    {
      t: 'p',
      x: 'You agree not to attempt to interfere with the proper working of the extension, reverse-engineer its components, or use the tool to make malicious Google API calls that violate Google Service Agreements. You are responsible for keeping your browser environment secure.'
    },
    { t: 'h2', x: 'Disclaimer of Warranties' },
    {
      t: 'p',
      x: 'Tasks Extension is provided on an "as is" and "as available" basis. The developer makes no warranties, express or implied, including but not limited to the merchantability, fitness for a particular purpose, non-infringement, or uninterrupted operation of the tool.'
    },
    { t: 'h2', x: 'Limitation of Liability' },
    {
      t: 'p',
      x: 'In no event shall the developer be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to loss of data, workflow disruption, or other intangible losses resulting from the use or inability to use this extension.'
    },
    { t: 'h2', x: 'Contact' },
    {
      t: 'p',
      x: 'For any questions or support queries regarding these terms, please contact us at <a href="mailto:support@uxnijin.com">support@uxnijin.com</a>.'
    }
  ]
};
