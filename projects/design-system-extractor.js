

BODY('design-system-extractor', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It opens in Chrome\'s side panel and reads whatever page you are on, then hands you its design system.' },
    {
      t: 'list',
      items: [
        'Brand colours, split into what they are used for — backgrounds, text, borders — with any CSS variables the site declares.',
        'Every font on the page, with the weights and sizes actually in use.',
        'Images and icons, with the SVGs cleaned up rather than dumped raw.',
        'Corner radii, shadows and gradients.',
        'Click any value to copy it. Or take the lot as CSS or JSON.',
      ],
    },
    { t: 'p', x: 'It follows you as you browse, so moving to another page just updates the panel.' },

    { t: 'h2', x: 'Why a side panel' },
    { t: 'p', x: 'The alternative is DevTools, where getting a colour palette means clicking through the computed styles of forty elements one at a time. The information was always there; it was just never collected in one place.' },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'It reads the page as your browser rendered it, so anything drawn inside a canvas, loaded behind a login you are not in, or applied only on hover will not show up. What you get is what was on screen.' },
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
,
});
