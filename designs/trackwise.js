// ==========================================================================
//  Trackwise. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('trackwise', {
  blocks: [
    { t: 'p', x: 'A prototype build: a running React app, designed inside Razorpay&rsquo;s Blade design system rather than a house style of my own.' },
    {
      t: 'image',
      src: '/trackwise-assets/hero.webp',
      alt: 'The Trackwise workspace home: parcels needing attention, arriving today, in transit, and the latest activity',
      caption: 'The workspace home.',
    },
    { t: 'p', x: 'It opens on what needs a person, not on a list of everything.' },

    { t: 'h2', x: 'The part a shopper sees' },
    { t: 'p', x: 'The landing page has one job. The marketing that used to sit under the hero moved to the tracking page, after the answer, where it is finally persuasive.' },
    {
      t: 'image',
      src: '/trackwise-assets/landing.webp',
      alt: 'The Trackwise landing page: a hero and a single tracking field',
      caption: 'Landing.',
    },
    { t: 'p', x: 'Status first. What you can share is deliberately less than what you can see.' },
    {
      t: 'image',
      src: '/trackwise-assets/public.webp',
      alt: 'The public tracking page showing status, then share options',
      caption: 'The public tracking page.',
    },

    { t: 'h2', x: 'The part a merchant lives in' },
    { t: 'p', x: 'The counts are the point. <em>Needs attention: 29</em> is a to-do list, not a filter label.' },
    {
      t: 'image',
      src: '/trackwise-assets/parcels.webp',
      alt: 'The parcels list with scope tabs, filters, quick filters and pagination',
      caption: 'All parcels.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/attention.webp',
      alt: 'The needs-attention scope, filtered to parcels with exceptions and predicted delays',
      caption: 'The same table, scoped to trouble.',
    },
    { t: 'p', x: 'Eleven scans across two carriers, told once. The handover is a fact on the page rather than a gap in the story.' },
    {
      t: 'image',
      src: '/trackwise-assets/detail.webp',
      alt: 'A parcel detail page with a merged cross-carrier timeline, route rail and shipment facts',
      caption: 'One parcel.',
    },
    { t: 'p', x: 'Deflection, carrier performance, prediction accuracy, and the lanes worth fixing.' },
    {
      t: 'image',
      src: '/trackwise-assets/analytics.webp',
      alt: 'The analytics screen: WISMO deflection, carrier performance, prediction accuracy and lanes worth fixing',
      caption: 'Analytics.',
    },
    { t: 'p', x: 'Paste a block of tracking numbers and watch the carriers resolve as you go.' },
    {
      t: 'image',
      src: '/trackwise-assets/add.webp',
      alt: 'The add-parcels screen with single, bulk paste and automatic options',
      caption: 'Adding parcels.',
    },

    { t: 'h2', x: 'The plumbing' },
    { t: 'p', x: 'Every alert shows the channel it went out on, because <em>did the customer actually hear about this</em> is the only question that matters here.' },
    {
      t: 'image',
      src: '/trackwise-assets/alerts.webp',
      alt: 'The alerts screen, grouped by day, showing which channel each alert went out on',
      caption: 'Alerts.',
    },
    { t: 'p', x: 'The failed attempt, and why it failed, is the whole reason this screen exists.' },
    {
      t: 'image',
      src: '/trackwise-assets/webhooks.webp',
      alt: 'The webhooks screen with endpoints and delivery attempts',
      caption: 'Webhooks.',
    },
    { t: 'p', x: 'A connected integration and a broken one look genuinely different.' },
    {
      t: 'image',
      src: '/trackwise-assets/integrations.webp',
      alt: 'The integrations screen showing inbox, store, channel and developer connections with real states',
      caption: 'Integrations.',
    },

    { t: 'h2', x: 'Money, and making it theirs' },
    { t: 'p', x: 'Every limit on one page, so the awkward questions get answered here rather than in a support thread later.' },
    {
      t: 'image',
      src: '/trackwise-assets/pricing.webp',
      alt: 'The pricing page with a full comparison table and every limit stated',
      caption: 'Pricing.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/billing.webp',
      alt: 'The billing settings screen with plan, quota meters and invoices',
      caption: 'Billing, with the quota meter.',
    },
    { t: 'p', x: 'A merchant&rsquo;s own palette and domain, previewed live. One of the few places the design system needed something new.' },
    {
      t: 'image',
      src: '/trackwise-assets/branded.webp',
      alt: 'The branded-page builder with a live preview of the merchant’s tracking page',
      caption: 'The branded-page builder.',
    },
    { t: 'p', x: 'The parts that came from Blade switched themselves. The parts I built are where the work was.' },
    {
      t: 'image',
      src: '/trackwise-assets/dark.webp',
      alt: 'The workspace home in dark mode',
      caption: 'Dark.',
    },
  ],
});
