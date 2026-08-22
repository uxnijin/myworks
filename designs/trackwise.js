// ============================================================================
//  Trackwise — Multi-carrier Parcel Tracking (web)
//  B2B SaaS case study
//
//  Same structure as the other entries: problem, research, findings, the bet,
//  scope, the flow, the screens, the trade-offs, and how success would be
//  measured. Short text — the figures carry it.
//
//  Every figure is a screenshot of the running app, captured by
//  tools/trackwise_capture.js against the dev server (preview_start name
//  "trackwise"). Individual captures live in trackwise-assets/screens/.
//  No bezel — a desktop product is a desktop product.
//
//  Built on Razorpay's real Blade design system. The persona/data-state switch
//  is a genuine feature of the build, not a demo hack — see the dev panel.
// ============================================================================

BODY('trackwise', {
  blocks: [

    // ── Hero ────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/trackwise-assets/hero.webp',
      alt: 'The Trackwise workspace home: parcels needing attention, arriving today, in transit, and the latest activity',
      caption: 'The workspace home. It opens on what needs a human, not on a list of everything.',
    },

    { t: 'h3', x: 'A working product, on a real design system.' },
    {
      t: 'p',
      x: 'Trackwise is built on <strong>Razorpay\'s Blade</strong> - the real published design system, not a lookalike. <strong>Every image below is a screenshot of the running app.</strong> Everything runs on seeded mock data, and a developer panel in the app switches persona (guest, free, pro, business, past-due) and backend condition (ready, loading, empty, server error, offline, rate-limited) so no state is reachable only by accident.',
    },

    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Sole designer and front-end engineer'],
        ['Type', 'Self-directed product exercise'],
        ['Platform', 'Responsive web app - public pages and a workspace'],
        ['Built with', 'React, TypeScript, Vite, and <strong>@razorpay/blade</strong>'],
        ['Domain', 'Multi-carrier parcel tracking for merchants and shoppers'],
        ['Status', 'Runnable prototype on seeded data - no backend, no API keys'],
      ],
    },

    // ══ 1 · Problem ═════════════════════════════════════════════════════════
    { t: 'h2', x: '1 · The most expensive question in e-commerce' },
    {
      t: 'p',
      x: '<em>“Where is my order?”</em> - WISMO. It is the single largest category of inbound support contact for online retail, running at roughly <strong>25–40% of all tickets</strong> and climbing past half during peak season. Each one costs somewhere between <strong>$5 and $22</strong> to answer.',
    },
    {
      t: 'p',
      x: 'The awkward part: the answer already exists. It is sitting in a carrier\'s API. The ticket happens because nobody put the answer where the customer was looking - so a merchant pays several dollars for a human to read out a status that a page could have shown for free.',
    },
    {
      t: 'stats',
      items: [
        { v: '25–40%', l: 'of e-commerce support tickets are “where is my order”' },
        { v: '$5–22', l: 'to answer one of them, with a person' },
        { v: '90%+', l: 'of customers track an order after buying it' },
      ],
    },

    // ══ 2 · Research ════════════════════════════════════════════════════════
    { t: 'h2', x: '2 · What I did instead of guessing' },
    {
      t: 'p',
      x: 'Self-directed, so the limits first: <strong>no merchants were interviewed and no support queue was observed.</strong> What there is:',
    },
    {
      t: 'list',
      items: [
        '<strong>Published WISMO figures</strong> - ticket share, cost per contact, and the fact that most shoppers are already tracking. Those three numbers define both the problem and the business case.',
        '<strong>A walk through the tracking pages</strong> shoppers actually land on - carrier pages, marketplace pages, and the branded ones - noting where each stops being useful.',
        '<strong>Reading Blade properly</strong> before drawing anything, so the work is a genuine test of building inside somebody else\'s design system rather than a reskin.',
        '<strong>Building every persona and every failure state</strong>, and then reviewing them - which is what the developer panel exists for.',
      ],
    },

    // ══ 3 · Findings ════════════════════════════════════════════════════════
    { t: 'h2', x: '3 · What that pointed at' },
    {
      t: 'cards',
      items: [
        {
          icon: 'search',
          title: 'The shopper knows one thing',
          desc: 'They have a tracking number and no idea which carrier it belongs to. <strong>So:</strong> one field, live carrier detection, and no dropdown to get wrong.',
        },
        {
          icon: 'activity',
          title: 'Answer first, ask second',
          desc: 'Marketing above the answer is why people bounce to Google. <strong>So:</strong> the status, then sharing, then the sign-up — in that order, never reversed.',
        },
        {
          icon: 'layers',
          title: 'One parcel, several carriers',
          desc: 'A cross-border parcel changes hands and each carrier tells its own partial story. <strong>So:</strong> one merged timeline, with the raw scans kept underneath.',
        },
        {
          icon: 'checkCircle',
          title: 'Bad news early beats bad news late',
          desc: 'A delay a merchant learns about from a customer is already a support ticket. <strong>So:</strong> predicted delays, with the reasoning shown so the prediction can be argued with.',
        },
      ],
    },

    // ══ 4 · The bet ═════════════════════════════════════════════════════════
    { t: 'h2', x: '4 · The bet' },
    {
      t: 'quote',
      x: 'Every WISMO ticket is an answer that existed and was not shown. Put the answer where the customer is already looking, and tell the merchant about the delay before the customer does.',
      by: 'The one sentence every decision was tested against',
    },

    { t: 'h3', x: 'Four rules that settled the arguments' },
    {
      t: 'cards',
      items: [
        { icon: 'zap', title: 'The answer, then the ask', desc: 'Nothing is sold above the fold on a tracking page. Persuasion comes after the question is answered, which is the only moment it is persuasive.' },
        { icon: 'verified', title: 'Public means status only', desc: 'Address, recipient and the full tracking number are structurally excluded from a shared page — and the share sheet says so at the moment of sharing.' },
        { icon: 'layers', title: 'Three levels, three questions', desc: 'Which part of the product, which screen, which slice of this screen. Each level answers exactly one of those, and never two.' },
        { icon: 'checkCircle', title: 'No state reachable by accident', desc: 'Every persona, plan limit and backend failure is switchable in the app, because the states that only exist for a week are the ones that never get designed.' },
      ],
    },

    // ══ 5 · Feature inventory ═══════════════════════════════════════════════
    { t: 'h2', x: '5 · Everything it could have been' },
    {
      t: 'table',
      head: ['Area', 'What lives there'],
      rows: [
        ['<strong>Public, no account</strong>', 'A landing page with one job · a public tracking page with share-by-copy, WhatsApp, mail or the OS sheet · a branded merchant page on the merchant\'s own palette · pricing with every limit on one page · sign-in and create-account on one route'],
        ['<strong>The workspace</strong>', 'Triage-first home · parcels with filters, quick filters, sort and scope tabs · a parcel detail with a cross-carrier timeline, route rail, delay prediction and raw scans · add parcels singly, by bulk paste, or automatically · alerts grouped by day showing which channel each went out on'],
        ['<strong>Business</strong>', 'Analytics: WISMO deflection, carrier performance, prediction accuracy, and the lanes worth fixing · a branded-page builder with a live preview · integrations for inbox, store, channels and developer'],
        ['<strong>Developers</strong>', 'API keys · webhooks with delivery attempts · an event log — three separate jobs, not one settings page'],
        ['<strong>Money</strong>', 'Plans, billing, quota meters, the trial-ending state and the past-due state'],
      ],
    },

    // ══ 6 · Prioritisation ══════════════════════════════════════════════════
    { t: 'h2', x: '6 · What made the cut, and why' },
    {
      t: 'p',
      x: 'One rule decided scope: <strong>does this prevent a support ticket?</strong> Which is a harsher filter than it sounds - it cut most of the things a tracking product usually sells itself on.',
    },
    {
      t: 'diagram',
      caption: 'The sort that set scope. Position is judgement, not measurement — the axes are mine, and the point is the reasoning.',
      svg: `<svg viewBox="0 0 720 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feature prioritisation: how much a feature prevents a support ticket, against build cost">
  <line x1="30" y1="238" x2="700" y2="238" class="d-l"/>
  <line x1="366" y1="20" x2="366" y2="424" class="d-l"/>
  <polygon points="700,238 690,233 690,243" class="d-arrow"/>
  <polygon points="366,20 361,30 371,30" class="d-arrow"/>

  <text x="34" y="52" class="d-m">SHIP FIRST</text>
  <circle cx="40" cy="76" r="4" class="d-dot-a"/><text x="54" y="80" class="d-s">One field, carrier auto-detected</text>
  <circle cx="40" cy="102" r="4" class="d-dot-a"/><text x="54" y="106" class="d-s">Answer above the ask</text>
  <circle cx="40" cy="128" r="4" class="d-dot-a"/><text x="54" y="132" class="d-s">Share without leaking an address</text>
  <circle cx="40" cy="154" r="4" class="d-dot-a"/><text x="54" y="158" class="d-s">Triage-first workspace home</text>
  <circle cx="40" cy="180" r="4" class="d-dot-a"/><text x="54" y="184" class="d-s">Every limit on one pricing page</text>

  <text x="384" y="52" class="d-m">WORTH THE WORK</text>
  <circle cx="390" cy="76" r="4" class="d-dot-a"/><text x="404" y="80" class="d-s">One merged cross-carrier timeline</text>
  <circle cx="390" cy="102" r="4" class="d-dot-a"/><text x="404" y="106" class="d-s">Delay prediction, with reasoning</text>
  <circle cx="390" cy="128" r="4" class="d-dot-a"/><text x="404" y="132" class="d-s">The branded-page builder</text>
  <circle cx="390" cy="154" r="4" class="d-dot-a"/><text x="404" y="158" class="d-s">Webhooks and an event log</text>
  <circle cx="390" cy="180" r="4" class="d-dot-a"/><text x="404" y="184" class="d-s">Every persona and failure state</text>

  <text x="34" y="282" class="d-m">LATER, NOT NEVER</text>
  <circle cx="40" cy="306" r="4" class="d-dot"/><text x="54" y="310" class="d-s">Returns and exchanges</text>
  <circle cx="40" cy="332" r="4" class="d-dot"/><text x="54" y="336" class="d-s">A shopper mobile app</text>
  <circle cx="40" cy="358" r="4" class="d-dot"/><text x="54" y="362" class="d-s">Multi-workspace for agencies</text>

  <text x="384" y="282" class="d-m">CUT</text>
  <circle cx="390" cy="306" r="4" class="d-dot"/><text x="404" y="310" class="d-s">A map of the parcel’s position</text>
  <circle cx="390" cy="332" r="4" class="d-dot"/><text x="404" y="336" class="d-s">Upsells on the tracking page</text>
  <circle cx="390" cy="358" r="4" class="d-dot"/><text x="404" y="362" class="d-s">A reviews-request flow</text>
  <circle cx="390" cy="384" r="4" class="d-dot"/><text x="404" y="388" class="d-s">Gamified delivery countdowns</text>

  <text x="30" y="452" class="d-m">LOW BUILD COST</text>
  <text x="700" y="452" class="d-m" text-anchor="end">HIGH BUILD COST</text>
  <text x="0" y="14" class="d-m">↑ PREVENTS A SUPPORT TICKET</text>
</svg>`,
    },
    {
      t: 'p',
      x: 'Upsells on the tracking page are the interesting cut. Every competitor in this category sells them, and the pitch is good: it is the highest-intent page a merchant owns. But the page exists to answer one question, and a carousel above the answer is precisely what sends a shopper back to Google - which costs the merchant a ticket. <strong>The marketing moved below the answer instead.</strong>',
    },

    // ══ 7 · Flow ════════════════════════════════════════════════════════════
    { t: 'h2', x: '7 · The core flow, end to end' },
    {
      t: 'p',
      x: 'Two people use this product for opposite reasons. A shopper wants one answer and then to leave; a merchant wants to never be surprised. The flow below follows the parcel, and the phases hand off between them.',
    },
    {
      t: 'diagram',
      caption: 'Twelve steps across two audiences. The whole business case sits in phase four — every alert that lands before a customer notices is a ticket that never happens.',
      svg: `<svg viewBox="0 0 720 578" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core flow: a shopper asks, the merchant loads parcels, the parcel travels, and a delay is caught early">

  <text x="0" y="12" class="d-m">1 · THE SHOPPER ASKS</text>
  <text x="720" y="12" class="d-m" text-anchor="end">THE ANSWER, THEN THE ASK</text>
  <rect x="0" y="24" width="220" height="60" rx="11" class="d-box-a"/>
  <text x="16" y="50" class="d-t">One field</text><text x="16" y="70" class="d-s">Carrier detected live</text>
  <rect x="250" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="50" class="d-t">The answer</text><text x="266" y="70" class="d-s">Status, above everything</text>
  <rect x="500" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="50" class="d-t">Share it</text><text x="516" y="70" class="d-s">Status only, never address</text>
  <line x1="220" y1="54" x2="244" y2="54" class="d-l"/><polygon points="250,54 242,50 242,58" class="d-arrow"/>
  <line x1="470" y1="54" x2="494" y2="54" class="d-l"/><polygon points="500,54 492,50 492,58" class="d-arrow"/>
  <text x="0" y="106" class="d-s" fill="var(--accent)">↳ no dropdown to get wrong, and no marketing above the fold — that is what sends people to Google</text>
  <path d="M610 84 V118 q0 8 -8 8 H204 q-8 0 -8 8 V160" class="d-l"/>
  <polygon points="196,166 192,158 200,158" class="d-arrow"/>

  <text x="0" y="154" class="d-m">2 · THE MERCHANT LOADS</text>
  <text x="720" y="154" class="d-m" text-anchor="end">THREE WAYS IN, THREE VOLUMES</text>
  <rect x="0" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="192" class="d-t">One at a time</text><text x="16" y="212" class="d-s">Paste and go</text>
  <rect x="250" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="192" class="d-t">Bulk paste</text><text x="266" y="212" class="d-s">Detected as you type</text>
  <rect x="500" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="192" class="d-t">Automatic</text><text x="516" y="212" class="d-s">Store, inbox, or the API</text>
  <line x1="220" y1="196" x2="244" y2="196" class="d-l"/><polygon points="250,196 242,192 242,200" class="d-arrow"/>
  <line x1="470" y1="196" x2="494" y2="196" class="d-l"/><polygon points="500,196 492,192 492,200" class="d-arrow"/>
  <text x="0" y="248" class="d-s" fill="var(--accent)">↳ the right way in depends on whether you ship five parcels a week or five thousand</text>
  <path d="M610 226 V260 q0 8 -8 8 H204 q-8 0 -8 8 V302" class="d-l"/>
  <polygon points="196,308 192,300 200,300" class="d-arrow"/>

  <text x="0" y="296" class="d-m">3 · THE PARCEL TRAVELS</text>
  <text x="720" y="296" class="d-m" text-anchor="end">ONE PARCEL, ONE STORY</text>
  <rect x="0" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="334" class="d-t">Scans arrive</text><text x="16" y="354" class="d-s">From several carriers</text>
  <rect x="250" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="334" class="d-t">Merged</text><text x="266" y="354" class="d-s">One timeline, one vocabulary</text>
  <rect x="500" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="334" class="d-t">Predicted</text><text x="516" y="354" class="d-s">And it shows its working</text>
  <line x1="220" y1="338" x2="244" y2="338" class="d-l"/><polygon points="250,338 242,334 242,342" class="d-arrow"/>
  <line x1="470" y1="338" x2="494" y2="338" class="d-l"/><polygon points="500,338 492,334 492,342" class="d-arrow"/>
  <text x="0" y="390" class="d-s" fill="var(--accent)">↳ the raw carrier scans stay underneath — for the times you have to argue with a carrier</text>
  <path d="M610 368 V402 q0 8 -8 8 H204 q-8 0 -8 8 V444" class="d-l"/>
  <polygon points="196,450 192,442 200,442" class="d-arrow"/>

  <text x="0" y="438" class="d-m">4 · SOMETHING GOES WRONG</text>
  <text x="720" y="438" class="d-m" text-anchor="end">BEFORE THE CUSTOMER NOTICES</text>
  <rect x="0" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="476" class="d-t">Needs attention</text><text x="16" y="496" class="d-s">The home screen says so</text>
  <rect x="250" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="476" class="d-t">Alert out</text><text x="266" y="496" class="d-s">On a named channel</text>
  <rect x="500" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="476" class="d-t">Ticket avoided</text><text x="516" y="496" class="d-s">Counted, in analytics</text>
  <line x1="220" y1="480" x2="244" y2="480" class="d-l"/><polygon points="250,480 242,476 242,484" class="d-arrow"/>
  <line x1="470" y1="480" x2="494" y2="480" class="d-l"/><polygon points="500,480 492,476 492,484" class="d-arrow"/>
  <text x="0" y="532" class="d-s" fill="var(--accent)">↳ every alert that lands first is a $5–22 ticket that never happens — which is the whole product</text>
  <text x="0" y="558" class="d-s" fill="var(--accent)">↻ and the deflection rate is the number the merchant is actually buying</text>
</svg>`,
    },

    // ══ 8 · The front door ══════════════════════════════════════════════════
    { t: 'h2', x: '8 · One field, no dropdown' },
    {
      t: 'p',
      x: 'A shopper has a tracking number and usually no idea which carrier issued it. So the landing page is one hero, one field with live carrier detection, and nothing else above the fold. Asking somebody to pick their carrier from a list of forty is asking them to answer a question they came here to have answered.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/landing.webp',
      alt: 'The Trackwise landing page: a hero and a single tracking field',
      caption: 'One job. The marketing that used to live under this hero moved to the tracking page — after the answer, where it is finally persuasive.',
    },

    // ══ 9 · The answer ══════════════════════════════════════════════════════
    { t: 'h2', x: '9 · The answer, then the share, then the ask' },
    {
      t: 'p',
      x: 'The public tracking page is the most-visited screen in a product like this and the one most often ruined. Here the order is fixed: the status, then a way to share it, then - and only then - a reason to make an account.',
    },
    {
      t: 'p',
      x: 'Sharing is where the privacy decision lives. A shared page carries <strong>status only</strong>: address, recipient and the full tracking number are structurally excluded rather than hidden, and the share sheet says so at the moment you share, because that is the moment somebody is deciding whether to send it to a group chat.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/public.webp',
      alt: 'The public tracking page showing status, then share options',
      caption: 'Status first. What you can share is deliberately less than what you can see.',
    },

    // ══ 10 · Navigation ═════════════════════════════════════════════════════
    { t: 'h2', x: '10 · Three levels, three different questions' },
    {
      t: 'p',
      x: 'Navigation is three levels and each answers exactly one question: <strong>which part of the product</strong> (the dark top bar, which overflows into “More” as the window narrows), <strong>which screen</strong> (a grouped side rail that collapses to 56px and remembers the choice), and <strong>which slice of this screen</strong> (a light tab strip under the top bar, carrying live counts).',
    },
    {
      t: 'p',
      x: 'The parcel scopes used to be a second-level side panel. As a tab strip they cost no width, show their counts without a hover, and read as the filters they actually are.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/parcels.webp',
      alt: 'The parcels list with scope tabs, filters, quick filters and pagination',
      caption: 'All parcels, with the scopes as tabs. The counts are the point — “needs attention: 29” is a to-do list, not a filter label.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/attention.webp',
      alt: 'The needs-attention scope, filtered to parcels with exceptions and predicted delays',
      caption: 'The same table, scoped to trouble. This is the view a merchant should be able to live in.',
    },

    // ══ 11 · One timeline ═══════════════════════════════════════════════════
    { t: 'h2', x: '11 · One parcel, two carriers, one timeline' },
    {
      t: 'p',
      x: 'A cross-border parcel changes hands - here DHL hands off to Delhivery - and each carrier tells its own partial story in its own words. The detail page merges them into a single timeline with one vocabulary, keeps the route rail and the shipment facts alongside, and leaves the raw carrier scans underneath for the times somebody has to argue with a carrier.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/detail.webp',
      alt: 'A parcel detail page with a merged cross-carrier timeline, route rail and shipment facts',
      caption: 'Eleven scans across two carriers, told once. The handover is a fact on the page rather than a gap in the story.',
    },

    // ══ 12 · Bad news ═══════════════════════════════════════════════════════
    { t: 'h2', x: '12 · The hardest screen: bad news, early' },
    {
      t: 'p',
      x: 'A delay a merchant hears about from a customer has already cost them a ticket. So Trackwise predicts delays - and, more importantly, <strong>shows its reasoning</strong>. A prediction you cannot interrogate is a prediction nobody will act on, and one that turns out wrong without explanation destroys trust in every future one.',
    },
    {
      t: 'p',
      x: 'This is also why analytics carries a prediction-accuracy scoreboard. A product that guesses on a merchant\'s behalf owes them a public record of how often it is right.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/analytics.webp',
      alt: 'The analytics screen: WISMO deflection, carrier performance, prediction accuracy and lanes worth fixing',
      caption: 'Deflection, carrier performance, prediction accuracy, and the lanes worth fixing. The first number is the one the merchant is buying.',
    },

    // ══ 13 · Getting parcels in ═════════════════════════════════════════════
    { t: 'h2', x: '13 · Three ways in, for three different volumes' },
    {
      t: 'p',
      x: 'Five parcels a week and five thousand a week are different jobs. So there are three ways in: one at a time, a bulk paste that detects carriers live as you type, or automatically from a store, an inbox or the API. Offering three is not indecision - the fastest one genuinely changes with volume.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/add.webp',
      alt: 'The add-parcels screen with single, bulk paste and automatic options',
      caption: 'Paste a block of tracking numbers and watch the carriers resolve as you go.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/alerts.webp',
      alt: 'The alerts screen, grouped by day, showing which channel each alert went out on',
      caption: 'Alerts grouped by day, each showing the channel it went out on — because “did the customer actually hear about this?” is the only question that matters here.',
    },

    // ══ 14 · Developers ═════════════════════════════════════════════════════
    { t: 'h2', x: '14 · The developer surface is three jobs, not a settings page' },
    {
      t: 'p',
      x: 'Most products bury API keys, webhooks and logs in one “Developers” tab. They are three different jobs done by three different people at three different times: getting started, wiring something up, and debugging at 2am. So they are three screens.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/webhooks.webp',
      alt: 'The webhooks screen with endpoints and delivery attempts',
      caption: 'Webhooks with their delivery attempts. The failed attempt, and why it failed, is the whole reason this screen exists.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/integrations.webp',
      alt: 'The integrations screen showing inbox, store, channel and developer connections with real states',
      caption: 'Integrations with real connect and error states — a connected integration and a broken one look genuinely different.',
    },

    // ══ 15 · Money ══════════════════════════════════════════════════════════
    { t: 'h2', x: '15 · The money moments, designed rather than bolted on' },
    {
      t: 'p',
      x: 'The states that decide whether a business keeps a customer only exist for about a week each - near a quota, mid-trial, past due - so they are exactly the states that never get designed. Here they are switchable in the app, which is the only reason they got the same attention as the happy path.',
    },
    {
      t: 'p',
      x: 'Pricing puts every limit on one page, including the awkward questions, on the theory that a limit discovered later is worse than a limit read up front.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/pricing.webp',
      alt: 'The pricing page with a full comparison table and every limit stated',
      caption: 'Every limit on one page. The awkward questions are answered here rather than in a support thread later.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/billing.webp',
      alt: 'The billing settings screen with plan, quota meters and invoices',
      caption: 'Billing, with the quota meter that makes the plan limit visible before it becomes a problem.',
    },

    // ══ 16 · Blade ══════════════════════════════════════════════════════════
    { t: 'h2', x: '16 · Built inside somebody else’s design system' },
    {
      t: 'p',
      x: 'This was the real exercise. Blade is a published, opinionated system with its own tokens, components and rules, and building a whole product inside it is a different discipline from inventing a language: <strong>the interesting decisions move from “what should this look like” to “which existing component is this, really”.</strong>',
    },
    {
      t: 'p',
      x: 'Where Blade had an answer, I used it. Where it did not - the merged timeline, the route rail, the branded-page preview - the new pieces are composed from Blade primitives so they inherit its tokens, its dark theme and its accessibility work rather than sitting beside them.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/branded.webp',
      alt: 'The branded-page builder with a live preview of the merchant’s tracking page',
      caption: 'The branded-page builder — a merchant\'s own palette and domain, previewed live. One of the few places the system needed something new.',
    },

    // ══ 17 · Dark ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '17 · Dark mode, for free and not for free' },
    {
      t: 'p',
      x: 'Blade ships <code>onLight</code> and <code>onDark</code>, so every stock component switched for free. Everything I composed had to earn it - the timeline\'s status colours, the route rail\'s gradient, and the carrier logos, which are the one thing on the page that has no dark variant and never will.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/dark.webp',
      alt: 'The workspace home in dark mode',
      caption: 'The same home screen, dark. The parts that came from Blade switched themselves; the parts I built are where the work was.',
    },

    // ══ 18 · Trade-offs ═════════════════════════════════════════════════════
    { t: 'h2', x: '18 · The trade-offs' },
    {
      t: 'table',
      head: ['What I chose', 'What it cost', 'Why I took it anyway'],
      rows: [
        [
          '<strong>Building inside Blade.</strong>',
          'No visual identity of my own, and some screens fought the system before they fitted it.',
          'Inventing a design language is the easy half. Working productively inside a real one — and knowing when to compose rather than invent — is the part that matters on a team.',
        ],
        [
          '<strong>No upsells on the tracking page.</strong>',
          'Gives up the highest-intent surface a merchant owns, which every competitor monetises.',
          'A carousel above the answer is what sends a shopper back to Google, and that costs a ticket. The marketing moved below the answer instead.',
        ],
        [
          '<strong>Status-only sharing.</strong>',
          'A shared page is less useful — you cannot forward it as proof of address or delivery detail.',
          'People paste these links into group chats. A tracking link that leaks a home address is a product that gets somebody hurt exactly once.',
        ],
        [
          '<strong>Predictions that show their reasoning.</strong>',
          'A lot more surface area, and it makes the product visibly wrong sometimes.',
          'A prediction you cannot interrogate is one nobody acts on. Being visibly wrong occasionally is the price of being trusted the rest of the time.',
        ],
        [
          '<strong>A persona and failure-state switch inside the product.</strong>',
          'A control real users must never see, carried in the real build.',
          'Near-quota, mid-trial and past-due each exist for about a week. Without a switch they never get reviewed, and they are where the revenue is.',
        ],
        [
          '<strong>Three developer screens instead of one tab.</strong>',
          'More navigation, and each screen is thinner than a combined one.',
          'Getting started, wiring up and debugging at 2am are three jobs. A combined page serves the first and fails the third.',
        ],
      ],
    },

    // ══ 19 · Measurement ════════════════════════════════════════════════════
    { t: 'h2', x: '19 · How I\'d know it worked' },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['<strong>North star</strong>', 'WISMO tickets per hundred orders, before and after. It is the number the product is sold on and the only one that matters.'],
        ['<strong>Deflection</strong>', 'Tracking-page visits per parcel against support contacts per parcel. The first should rise while the second falls; if both rise, the page is not answering.'],
        ['<strong>Prediction accuracy</strong>', 'Published in the product, not just measured. If a merchant cannot see how often we are right, they are right not to act on it.'],
        ['<strong>The share test</strong>', 'How often a public tracking link gets shared. It is free distribution, and it only happens if the page is genuinely useful.'],
        ['<strong>Guardrail</strong>', 'Bounces from the tracking page to a search engine. That is the exact failure the “answer first” rule exists to prevent.'],
        ['<strong>The first experiment</strong>', 'Answer-first against marketing-first on the public page. Every competitor does the opposite of what I chose, which is either an insight or a mistake — and this is how you find out which.'],
      ],
    },

    // ══ 20 · Scope ══════════════════════════════════════════════════════════
    { t: 'h2', x: '20 · What isn\'t built' },
    {
      t: 'p',
      x: 'No backend and no carrier integrations - which is the genuinely hard part of this product, and the part where a real version would live or die. The delay prediction is a plausible fiction rather than a model. No returns or exchanges, no shopper mobile app, and no multi-workspace for agencies. And no merchant has used it, which is why section 19 is a plan rather than a result.',
    },
    {
      t: 'stats',
      items: [
        { v: '2', l: 'audiences: shopper and merchant' },
        { v: '7', l: 'personas, switchable in the build' },
        { v: '7', l: 'backend conditions, including the ugly ones' },
        { v: '1', l: 'design system, not my own' },
      ],
    },

    { t: 'h3', x: 'Sources' },
    {
      t: 'list',
      items: [
        'Published WISMO benchmarks for 2025 - share of inbound support volume, cost per contact, and the proportion of shoppers who track an order after buying.',
        'Razorpay Blade - the published design system this is built on.',
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'Building inside somebody else\'s design system changes the question. It stops being “what should this look like” and becomes “which component is this, really” — which is the question you spend most of your time on inside an actual product team.',
      by: 'Design intent, Trackwise',
    },
  ],
});
