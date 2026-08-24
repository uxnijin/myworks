

BODY('tasks-extension', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It puts Google Tasks in Chrome\'s side panel, one keystroke from whatever you are already doing.' },
    {
      t: 'list',
      items: [
        'Your real Google Tasks: the same lists, on the same account, syncing both ways. Nothing new to sign up for.',
        'Add, complete, reorder and move tasks between lists.',
        'Due dates land on your Google Calendar, because they always did.',
        'Search across every list.',
      ],
    },

    { t: 'h2', x: 'The bet' },
    { t: 'p', x: 'Google Tasks is genuinely good and genuinely buried, three clicks deep in Gmail\'s sidebar. It is already synced to the thing you live in, and almost nobody uses it because of where it sits.' },
    { t: 'p', x: 'So this is not another to-do app. It is a shorter path to one that already works, which kills an enormous amount of scope. No sync engine, no accounts, no conflict resolution, no mobile app, since Google already ships one. The whole thing is a surface over an API you already have permission to call.' },

    { t: 'h2', x: 'Where your data goes' },
    { t: 'p', x: 'Your browser talks to Google. There is no server in between, because there is nothing for one to do.' },
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
,
});
