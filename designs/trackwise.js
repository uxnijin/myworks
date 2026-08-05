// ============================================================================
//  Trackwise — Where Is My Parcel?
//  Web App Design Case Study
//
//  A multi-carrier parcel tracking platform designed and built end-to-end on
//  Razorpay's real production design system (@razorpay/blade v12). 82 files,
//  ~27,900 lines, 34 routes, 9 personas × 7 backend conditions.
//
//  Every screenshot in this case study is captured from the running app at 2x.
//  Nothing here is a mockup and nothing is redrawn.
// ============================================================================

const DESIGN_TRACKWISE = {
  slug: 'trackwise',
  name: 'Trackwise: Where Is My Parcel?',
  category: 'Web',
  icon: 'cart',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'A multi-carrier parcel tracking platform built on Razorpay\'s real design system — one timeline across 14 carriers, a delay prediction that shows its reasoning, and every persona, plan edge and failure state designed rather than assumed.',
  lede: '"Where is my order?" is the single most expensive question in e-commerce — and almost every answer to it is a carrier page that says <em>In transit</em> and nothing else. Trackwise is a working product that answers it properly: paste any tracking number from 14 carriers, get one stitched timeline across every handover, and get told a parcel is going to be late roughly a day before the carrier admits it. It is designed on <strong>Razorpay Blade</strong>, the real production design system, and shipped as a running React app — 34 routes, 9 personas and 7 backend conditions, all reachable in one click.',
  tech: ['React 18', 'TypeScript', 'Razorpay Blade v12 (109 components)', 'styled-components', 'React Router', 'Framer Motion', 'Recharts', 'Vite', 'Seeded mock data · no backend'],
  blocks: [

    // ══ Hero ═════════════════════════════════════════════════════════════════
    {
      t: 'image',
      src: '/trackwise-assets/hero.webp',
      alt: 'Three Trackwise screens — the public landing page, the workspace home, and a parcel detail page',
      caption: 'One product, three altitudes: the public front door that needs no account, the workspace that triages a hundred parcels, and the single parcel that explains itself.',
    },

    // ══ Framing ══════════════════════════════════════════════════════════════
    {
      t: 'callout',
      kind: 'success',
      title: 'This is a running app, not a Figma export.',
      x: 'Every image below is a 2× screenshot of real React running in a browser. The carrier is detected as you type, the timeline is stitched from two carriers\' scan histories, the API key really is shown exactly once, pausing a webhook really does stop test deliveries succeeding, and the delay prediction really does carry its own reasoning. <strong>82 files, ~27,900 lines, 34 routes.</strong>',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'An independent exercise, built on a real design system.',
      x: 'Trackwise is my own product concept. It is built on <strong>Razorpay Blade</strong> (<code>@razorpay/blade</code> v12.112) — Razorpay\'s real, open-source design system — because designing inside someone else\'s constraints is the honest version of the job. This is not a Razorpay product, is not affiliated with or endorsed by Razorpay, and no Razorpay data is involved. Every number in the screenshots comes from one seeded generator. Carrier names and logos identify the couriers a real product would integrate.',
    },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; front-end engineer — problem framing, IA, interaction design, UI, copy, illustration, build'],
        ['Type', 'Self-directed product concept · working prototype'],
        ['Platform', 'Responsive web app — 390px to 1440px+'],
        ['Domain', 'Logistics · post-purchase experience · WISMO deflection'],
        ['The problem', '"Where is my order?" — the most-asked, least-well-answered question after checkout'],
        ['The constraint', 'Use a real production design system (Razorpay Blade) rather than inventing one'],
        ['The bet', 'The product that <em>predicts</em> the bad news beats the product that reports it'],
        ['Coverage', '34 routes × 9 personas × 7 backend conditions — all reachable from one panel'],
        ['Deliverable', 'A running React app anyone can click through in a minute'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '14', l: 'Carriers, one timeline' },
        { v: '9', l: 'Personas modelled' },
        { v: '7', l: 'Backend conditions' },
        { v: '109', l: 'Blade components used' },
      ],
    },

    // ══ 1. The problem ═══════════════════════════════════════════════════════
    { t: 'h2', x: '1. The Most Expensive Question in E-commerce' },
    {
      t: 'p',
      x: 'Every support team in retail knows the shape of it. A customer buys something. Two days pass. They open a chat window and type five words: <strong>"where is my order?"</strong> — WISMO, in the trade. It is the highest-volume ticket in e-commerce and the least valuable one to answer, because the answer already exists in a carrier\'s database. The customer just couldn\'t reach it, or reached it and couldn\'t understand it.',
    },
    {
      t: 'p',
      x: 'I started by writing down what actually goes wrong between "shipped" and "delivered." Not features — <em>failures</em>. Each one became a design decision, and every one of them is visible in a screenshot further down this page.',
    },
    {
      t: 'table',
      head: ['What actually goes wrong', 'What Trackwise does about it'],
      rows: [
        ['<strong>The number doesn\'t belong to anyone.</strong> You have a tracking number and no idea which of 14 carriers to paste it into.', 'Carrier detection as you type. One field, no dropdown — the format identifies the carrier before you finish pasting.'],
        ['<strong>The journey is split across carriers.</strong> Royal Mail hands to India Post and the trail simply stops on both sites.', 'One stitched timeline across handovers, with the handover itself marked as an event rather than hidden as a gap.'],
        ['<strong>"In transit" is not an answer.</strong> The status is technically true and practically useless.', 'The page leads with a date and a place — <em>expected Friday, currently at Mumbai Foreign Post Office</em> — and the status is a secondary badge.'],
        ['<strong>Bad news arrives last.</strong> The carrier keeps promising Friday until Friday evening.', 'A delay prediction that flags the slip roughly 19 hours before the carrier revises, and shows why it thinks so.'],
        ['<strong>Sharing the page leaks your address.</strong> Forwarding a carrier link hands over the recipient name and full delivery address.', 'A share link that is status-only by construction — address, recipient and full tracking number are structurally excluded, and the sheet says so at the moment of sharing.'],
        ['<strong>Tracking is an ad surface.</strong> Free trackers monetise a moment of anxiety with ads and data broking.', '"No account. No card. No ads." on the landing page, and a Privacy page that says what is and is not stored.'],
        ['<strong>The merchant loses the moment.</strong> The most-visited page after checkout is on someone else\'s domain, in someone else\'s brand.', 'A branded tracking page on the merchant\'s own domain and palette — and analytics that tie it to deflected tickets.'],
      ],
    },

    { t: 'h3', x: 'Three people, three completely different products' },
    {
      t: 'p',
      x: 'The same tracking data serves three users whose needs barely overlap. Designing one dashboard for all three would have produced something that fits nobody, so the product resolves into three shapes around one core — and the plan tiers follow the people, not the other way round.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'search', title: 'The anxious buyer', desc: 'Has one number and no account. Wants an answer in <strong>under five seconds</strong>, then wants to leave. Never sees a dashboard — the public page is the whole product.' },
        { icon: 'cart', title: 'The heavy shopper', desc: 'Eleven parcels in flight, half of them international. Needs <strong>triage</strong>: what needs me, what lands today, what can wait. Lives on the workspace home.' },
        { icon: 'gauge', title: 'The store owner', desc: 'Ships hundreds a month and eats the WISMO tickets. Needs a <strong>branded page</strong>, carrier performance, and proof the subscription pays for itself.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The one-line thesis',
      x: 'Everything that follows comes from one sentence: <strong>answer first, ask later.</strong> Most tracking products treat the answer as the reward for signing up. Trackwise gives the answer to a stranger with no account, and only then makes a case for itself — which turns out to be the only moment the case is persuasive.',
    },

    // ══ 2. The front door ════════════════════════════════════════════════════
    { t: 'h2', x: '2. The Front Door Has One Job' },
    {
      t: 'p',
      x: 'The landing page originally carried a hero, a feature grid, testimonials, a pricing teaser and a footer — the standard SaaS stack. Then I watched what someone actually arrives to do: paste a number. Everything that wasn\'t that got cut from above the fold, and the marketing moved to <em>after</em> the answer, where it can point at something real.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/landing.webp',
      alt: 'The full Trackwise landing page — headline, one tracking field, carrier strip, and the three-persona entry cards below',
      caption: 'One question, one field, and the fourteen carriers it covers. Everything below the fold exists to get a first-time reviewer into the right persona — not to sell.',
    },
    { t: 'h3', x: 'Detection instead of a dropdown' },
    {
      t: 'p',
      x: 'The single most common friction in tracking is the carrier picker: a dropdown of 14 logos asking a question the number already answers. Tracking numbers have formats — <code>1Z</code> prefixes for UPS, a 12-digit block for FedEx, <code>RP…IN</code> for India Post. So the field reads the format and names the carrier while you type. When it can\'t tell yet, it says nothing at all rather than guessing — silence is a better state than a wrong logo.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/detection.webp',
      alt: 'The tracking field with a UPS number detected, beside the same field with only two digits typed and nothing claimed',
      caption: 'Left: eighteen characters in, the carrier is named and confirmed. Right: two digits in, the field stays quiet. A confident wrong answer here costs more than no answer.',
    },

    // ══ 3. The answer ════════════════════════════════════════════════════════
    { t: 'h2', x: '3. The Answer, Then the Ask' },
    {
      t: 'p',
      x: 'The public tracking page is the product\'s most important screen and the one no signed-in user ever sees. It is ordered as an argument: <strong>the answer</strong> (a date, a place, a status), then <strong>the journey</strong>, then — only once you\'ve been given what you came for — the case for an account. A first-time visitor can get the full answer and leave without ever seeing a form.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/public-answer.webp',
      alt: 'The full public tracking page — arrival date, route, journey timeline, and the sign-up case at the bottom',
      caption: 'Date and place first, at display size. The timeline second. The pitch last, and only after the page has been useful. No account was required to reach any of it.',
    },
    { t: 'h3', x: 'Sharing without leaking' },
    {
      t: 'p',
      x: 'People forward tracking links constantly — to a partner, to the person the gift is for, into a group chat. Carrier links carry the recipient name, the full delivery address and the raw tracking number, which means forwarding one is a small privacy accident. Trackwise\'s share link is <strong>status-only by construction</strong>: the shared route can\'t render an address because the payload behind it doesn\'t contain one. And the share sheet says so, at the exact moment the decision is being made, rather than in a privacy policy nobody opens.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/share.webp',
      alt: 'The share sheet on the public page with copy, WhatsApp, mail and OS-sheet options, beside the shareable link card inside the workspace',
      caption: '"Status only — no address, no tracking number," stated where it matters. The same sentence appears on the public share sheet and on the owner\'s copy of the link.',
    },
    { t: 'h3', x: 'And the merchant\'s version of the same page' },
    {
      t: 'p',
      x: 'For a store, the tracking page is the highest-traffic page after checkout — and handing that traffic to a third-party domain is a small brand donation made several thousand times a month. The branded page runs on the merchant\'s own domain, palette, typography and support contacts, with their FAQ and their shop links. The builder behind it is a live preview: the palette presets, the domain, and the support details update the real page as you change them.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/branded.webp',
      alt: 'The branded merchant tracking page in a dark green palette, beside the branded-page builder with live preview',
      caption: 'Same data, entirely different clothes — a deliberately non-Blade palette, because a merchant\'s brand is not the design system\'s job. The builder shows the customer\'s view while you edit it.',
    },

    // ══ 4. Navigation ════════════════════════════════════════════════════════
    { t: 'h2', x: '4. Three Levels of Navigation, Three Different Questions' },
    {
      t: 'p',
      x: 'A workspace with 34 routes gets lost quickly if navigation is one flat list. The structure here is three strips, each answering a different question, and the rule is that no strip ever answers another strip\'s question.',
    },
    {
      t: 'table',
      head: ['Level', 'The question it answers', 'Where it lives'],
      rows: [
        ['<strong>Product tabs</strong>', 'Which part of the product am I in?', 'The dark top bar. Overflows into <em>More</em> as the window narrows.'],
        ['<strong>Side rail</strong>', 'Which screen?', 'A grouped rail — Tracking · Insights · Developers. Collapses to a 56px icon rail, and the choice persists across reloads.'],
        ['<strong>Context tabs</strong>', 'Which slice of <em>this</em> screen?', 'A light strip under the top bar: parcel scopes with live counts, developer sections, settings sections.'],
      ],
    },
    {
      t: 'p',
      x: 'The parcel scopes — Active, Needs attention, Delivered, Archive — began as a second-level side-nav panel. Moved to a tab strip they cost no horizontal width, show their counts without a hover, and read as the filters they always were. That is the whole argument for the change, and the counts are the tell: <strong>Needs attention 29</strong> is a piece of information, not a label.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/home.webp',
      alt: 'The full workspace home page — greeting, four stat tiles, the needs-a-look panel, arriving next, and latest activity',
      caption: 'Home is triage, in order: <strong>what needs you</strong>, then what lands today, then everything moving as expected. The headline is a count and a name, not a welcome.',
    },
    { t: 'h3', x: 'The same screen, three plans' },
    {
      t: 'p',
      x: 'Home reads the persona rather than checking plan flags screen by screen, so a free shopper with eleven parcels, a Pro user with sixty-four, and a store with a hundred and forty-eight all get a page shaped to their volume — the same components, different density, different first sentence.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/home-personas.webp',
      alt: 'The workspace home rendered for a free shopper, a Pro user and a Business store',
      caption: 'Free, Pro, Business — one screen, three densities. The quota meter in the rail changes with them, and so does what the page thinks is worth putting first.',
    },

    // ══ 5. The list ══════════════════════════════════════════════════════════
    { t: 'h2', x: '5. A Hundred Parcels, and the One You Meant' },
    {
      t: 'p',
      x: 'The list is where a store owner spends their day, so the row had to carry a lot without becoming a spreadsheet: carrier, item, merchant, tracking number, status, a route bar with origin and destination, the expected date, and a delay flag when there is one. Everything else — search, status, carrier, sort, and quick filters for starred, international, delay-predicted and shared — sits above it.',
    },
    {
      t: 'p',
      x: 'The important interaction is what happens when you click a row. Opening a full page for every parcel means losing your place in a list you were scanning, so a row opens a <strong>peek</strong>: the arrival date, the route, the current location and the recent journey, in a drawer, with the full page one click further. Triage rarely needs the full page — it needs the answer and the next row.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/parcels.webp',
      alt: 'The parcels list with filters and quick filters, beside a parcel peek drawer opened over it',
      caption: 'Scan, peek, dismiss, next. The list stays exactly where you left it — the drawer is the answer, not a destination.',
    },

    // ══ 6. The parcel ════════════════════════════════════════════════════════
    { t: 'h2', x: '6. One Parcel, Two Carriers, One Timeline' },
    {
      t: 'p',
      x: 'This is the screen the whole product exists to produce. A parcel from London to Kochi is carried by Royal Mail, handed to India Post for the last mile, and tracked in two databases that don\'t know about each other. On the carriers\' own sites the trail stops mid-journey. Here the two scan histories are merged into one timeline, ordered by time, and the handover is <strong>marked as an event rather than hidden as a gap</strong> — because "handed over to India Post" is the single most reassuring line on the page when you are watching a parcel go quiet.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/detail.webp',
      alt: 'The full parcel detail page — expected date, route rail, delay callout, journey timeline, shipment facts, alerts and shareable link',
      caption: 'The full page. Expected date and route at the top, the delay prediction next because it changes what you do, the journey below it, and the facts in a column that never competes with the story.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/timeline.webp',
      alt: 'The journey timeline showing ten scans across Royal Mail and India Post with a carrier handover marked',
      caption: 'Ten scans, two carriers, one column. Every entry carries its place and which carrier reported it — so "who has my parcel right now" is answerable at a glance.',
    },
    {
      t: 'p',
      x: 'Underneath the readable timeline sits the same data unedited: <strong>raw carrier scans</strong>, monospaced, exactly as each carrier reported them. It exists because a merchant disputing a delivery with a courier needs the courier\'s own words, and because a product that rewrites its sources should be willing to show them.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/rawscans.webp',
      alt: 'The raw carrier scans panel — a monospaced list of timestamps, carriers, scan descriptions and locations',
      caption: 'The unedited source, one row per scan. Nothing here is interpreted — which is the point of putting it directly under something that is.',
    },

    // ══ 7. The prediction ════════════════════════════════════════════════════
    { t: 'h2', x: '7. The Hardest Screen: Telling Someone Bad News Early' },
    {
      t: 'p',
      x: 'The feature that makes Trackwise worth paying for is also the one most likely to be distrusted: it tells you a parcel will be late <em>while the carrier is still promising it on time</em>. That is a direct contradiction on screen — the carrier says Friday, we say Tuesday — and the design problem is entirely one of credibility.',
    },
    {
      t: 'p',
      x: 'Four decisions carry it. <strong>Show both dates</strong>, and attribute each: what the carrier still promises, and what we expect. <strong>Show the reasoning</strong> in one plain sentence — "origin hub is running 1.8 days behind on outbound sorting this week" — because an unexplained prediction is a horoscope. <strong>Show the confidence</strong> as a number and a bar, so a 91% and a 60% don\'t look identical. And <strong>show when it changed</strong>: flagged a day ago, carrier has since confirmed. The badge that reads "carrier has since confirmed" is the most valuable pixel on the page, because it is the product being proved right in public.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/delay.webp',
      alt: 'The expected-date header showing the original promise struck through, and the delay callout with reasoning and a 91% confidence bar',
      caption: 'Top: the date, and the date it replaced. Bottom: the disagreement stated plainly — carrier still promises Friday, we expect Tuesday, flagged a day ago, 91% confident, and here is why.',
    },
    { t: 'h3', x: 'And then publishing your own error rate' },
    {
      t: 'p',
      x: 'A prediction engine that only reports its wins is marketing. So the Business analytics carry a <strong>scoreboard</strong> that publishes the number a vendor would normally bury: <em>false positives — 41 parcels we warned about that arrived on time anyway.</em> Alongside it, the median lead time (how far ahead of the carrier the warning came) and the raw hit rate. The copy states the trade-off in one line: we would rather over-warn slightly than let a delay surprise a customer — and here is the count, so you can judge that for yourself.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/scoreboard.webp',
      alt: 'Analytics panels — tickets deflected and support cost saved, the delay prediction scoreboard, and lanes ranked by exception rate',
      caption: 'Three panels doing three different jobs: what the plan bought, how often the prediction was right — including when it wasn\'t — and which shipping lanes are actually worth fixing. Figures are from the seeded demo dataset.',
    },
    {
      t: 'callout',
      kind: 'warning',
      title: 'Why publish the failures at all?',
      x: 'Because the alternative is worse. A merchant who gets one false alarm and has never been told false alarms exist concludes the feature is broken. A merchant who was told upfront that ~10% of warnings are precautionary concludes it is working as described. <strong>Naming your error rate converts a bug report into an expectation</strong> — and it is the cheapest trust the product ever buys.',
    },

    // ══ 8. Getting parcels in ════════════════════════════════════════════════
    { t: 'h2', x: '8. Three Ways In, for Three Different Volumes' },
    {
      t: 'p',
      x: 'A shopper adds one number. A store pastes forty out of a spreadsheet. A serious store never adds anything at all, because the parcels arrive through a Shopify sync or an inbox scan. Those are three different jobs, so they are three tabs rather than one clever field that tries to be all of them.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/add.webp',
      alt: 'The add-parcel screen in three modes — a single number, a bulk paste with per-line carrier detection, and automatic sources',
      caption: 'One · many · none. The bulk paste runs the same detection per line and reports what it found before you commit, so a bad row is caught at paste time rather than after the import.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/integrations.webp',
      alt: 'The integrations page with inbox, store, channel and developer connections, beside the inbox scans queue',
      caption: 'Where parcels come from, and what the mail scanner found. Every connection carries a real state — connected, expired, needs reconnect — because integrations are where products quietly break.',
    },

    // ══ 9. Alerts ════════════════════════════════════════════════════════════
    { t: 'h2', x: '9. Alerts: a Matrix, Not a Pile of Switches' },
    {
      t: 'p',
      x: 'Notification settings usually decay into a long column of toggles that answers "do you want emails?" — the wrong question. The real question has two axes: <strong>which event</strong>, and <strong>which channel</strong>. Out-for-delivery deserves a push and nothing more; an exception deserves push, email and SMS; a carrier handover deserves nothing at all unless you ask. So the settings are a grid: triggers down the side, channels across the top, one master switch per row.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/matrix.webp',
      alt: 'The notification rules matrix — seven triggers down the side, five channels across the top, with checkboxes and per-row master switches',
      caption: 'Seven triggers × five channels, with the scope of each rule stated underneath it ("applies to starred parcels"). Channels the plan doesn\'t include are visible but disabled — the ceiling is shown, not hidden.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/alerts.webp',
      alt: 'The alerts feed grouped by day, each alert showing which channel it went out on',
      caption: 'And the feed those rules produce — grouped by day, each entry showing the channel it actually went out on. Rules you can\'t audit are rules you stop trusting.',
    },

    // ══ 10. Developers ═══════════════════════════════════════════════════════
    { t: 'h2', x: '10. The Developer Surface Is Three Jobs, Not One Settings Page' },
    {
      t: 'p',
      x: 'API access started life as a single settings page and was wrong there, because three unrelated jobs were sharing one screen: <em>getting credentials</em>, <em>configuring where events go</em>, and <em>working out why one didn\'t arrive</em>. The third one happens at 2am under pressure and deserves its own room. So Developers became its own product area with three sections — and everything in it mutates real state.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/keys.webp',
      alt: 'The API keys page with a start-here panel and key list, beside the modal that shows a newly created secret exactly once',
      caption: 'Keys carry a mode (live or test) and a fixed scope set, so a read-only test key can never touch live data even if it leaks. The secret is shown <strong>exactly once</strong> — the only honest way to model a key that is stored as a hash.',
    },
    {
      t: 'p',
      x: 'Webhooks are modelled the same way: multiple endpoints, each with its own event subscriptions, signing secret and delivery history. Pausing an endpoint genuinely stops test sends succeeding; unsubscribing an event genuinely removes it from what you can fire. A settings screen where the switches are decorative teaches developers to distrust the whole dashboard.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/webhooks.webp',
      alt: 'The webhooks page — endpoint URL, sending toggle, signing secret, event subscriptions and recent deliveries',
      caption: 'One endpoint, fully specified: where, whether it is sending, what it is subscribed to, the secret it is signed with, and what happened last time.',
    },
    {
      t: 'p',
      x: 'The event log is the 2am screen. Every attempt for seven days, filterable by outcome, and expanding a row gives the two things you actually need side by side: <strong>what we sent</strong> (the exact JSON) and <strong>what came back</strong> (the exact response, including a 500\'s HTML error page). Failures carry a "send again" that is safe to press, because events carry an id and the copy says so.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/eventlog.webp',
      alt: 'The event log with one failed delivery expanded, showing the request JSON we sent and the 500 response the server returned',
      caption: 'The request, the response, the status code, the retry count and the event id — one row, expanded. Everything a developer would otherwise ask support for.',
    },

    // ══ 11. Money ════════════════════════════════════════════════════════════
    { t: 'h2', x: '11. The Money Moments — Designed, Not Bolted On' },
    {
      t: 'p',
      x: 'Plan limits, trials and failed payments are where products get ugly: hard walls, disabled screens, red modals. These states only exist for a week or two in a user\'s life, which is exactly why they go unreviewed and end up being the worst screens in the product. I designed them as a sequence with one rule — <strong>never take away what is already working</strong>.',
    },
    {
      t: 'steps',
      items: [
        { title: 'Day one — nothing to show', desc: 'Empty states that do a job: what this screen will hold, and the one action that fills it. A setup checklist that can be dismissed and doesn\'t nag.' },
        { title: '92% of the quota', desc: 'The rail meter turns amber and counts down in the unit that matters — "8 parcels left", not "92% used". Nothing is blocked yet, and the upgrade is an offer.' },
        { title: 'Quota exhausted', desc: 'The critical decision: parcels you are <em>already</em> tracking keep updating. You just can\'t add new ones until the 1st. The wall is on new work, never on work in flight.' },
        { title: 'Trial ending', desc: 'A countdown that says what happens on the day rather than what you\'ll lose — and the invoice preview is one click away.' },
        { title: 'Payment failed', desc: 'A six-day grace period stated in days remaining, with tracking and alerts still running. The product degrades on a schedule you can read, not the moment a card bounces.' },
      ],
    },
    {
      t: 'image',
      src: '/trackwise-assets/plan-states.webp',
      alt: 'Six workspace states — brand new account, 92% of quota, quota exhausted, trial ending, payment failed, and an empty list',
      caption: 'The states that exist for one week and get reviewed for none of it. Each is reachable in a single click from the review panel — which is the only reason they got designed at all.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/quota.webp',
      alt: 'The quota meter in the sidebar showing 8 parcels left, and the banner shown once the limit is reached',
      caption: '"8 parcels left" is a countdown. "92% used" is a statistic. Only one of them tells you what to do next — and the banner that follows it is careful to say what still works.',
    },
    { t: 'h3', x: 'Gating without lying' },
    {
      t: 'p',
      x: 'A gated feature is a design decision about respect. Hiding it entirely means a customer never learns the product does the thing they need; a dead click with a shrug is worse. Trackwise renders the real screen behind a blur, with a panel that lists specifically what would appear and what it costs — the feature is <em>visible, unusable, and honestly priced</em>.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/gates.webp',
      alt: 'The analytics page gated behind an upgrade panel over a blurred real chart, beside the full upgrade modal with plan comparison',
      caption: 'The blur is the real Analytics page, rendered with real data. What sits on top of it is a list of exactly what you would get — not a padlock.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/pricing.webp',
      alt: 'The full public pricing page with three plans, a comparison table and an FAQ',
      caption: 'Every limit on one page, including the awkward questions — what happens at the limit, what happens when you downgrade, what happens to data. Pricing pages that dodge those get read as traps.',
    },

    // ══ 12. States ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '12. Every Way It Can Fail, Drawn on Purpose' },
    {
      t: 'p',
      x: 'The product depends on 14 third-party carrier APIs, which means it is broken somewhere almost all of the time. Designing only the happy path would have left the most-seen screens to a default spinner and an <code>alert()</code>. So the app models <strong>seven backend conditions</strong>, and every screen renders honestly in each of them.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/states.webp',
      alt: 'Six workspace states — loading skeletons, empty, server error, offline, rate limited, and partial carrier outage',
      caption: 'Loading · empty · server error · offline · rate limited · partial outage. Six different truths, six different sentences — none of them a spinner.',
    },
    {
      t: 'table',
      head: ['Condition', 'What the interface says — and why'],
      rows: [
        ['<strong>Loading</strong>', 'Skeletons shaped like the content that\'s coming, so the layout doesn\'t jump when it lands.'],
        ['<strong>Empty</strong>', 'What this screen will hold once it has something, plus the one action that fills it. Never a shrug.'],
        ['<strong>Server error</strong>', '"We couldn\'t load this" — and, critically, "your parcels are still being tracked in the background." The failure is scoped to the page, not the promise.'],
        ['<strong>Offline</strong>', 'Cached data, clearly labelled stale with the time of the last sync. Readable, not blank.'],
        ['<strong>Rate limited</strong>', 'The most honest one: we hit the carrier\'s shared limit, data is up to 22 minutes behind, and paid plans poll on a dedicated quota. A limitation and its remedy in one sentence.'],
        ['<strong>Partial outage</strong>', 'Names the two degraded carriers and the exact number of affected parcels, and states that every other carrier is unaffected — with a filter to see them.'],
        ['<strong>Not found</strong>', 'Different copy inside the workspace and outside it, because a lost signed-in user and a lost stranger need different exits.'],
      ],
    },
    {
      t: 'image',
      src: '/trackwise-assets/errors.webp',
      alt: 'The 404 page inside the workspace, the public 404, and the help and support panel',
      caption: 'Two different kinds of lost, and the way out of both. Every route in the app is also wrapped in an error boundary — a single bad prop once took the whole app to a blank white page, which is how the API screen got fixed.',
    },

    // ══ 13. Craft ════════════════════════════════════════════════════════════
    { t: 'h2', x: '13. Dark, Responsive, and the Details That Cost the Most Time' },
    {
      t: 'p',
      x: 'Dark mode is Blade\'s <code>onDark</code> scheme rather than an inverted stylesheet — but the hand-built pieces had to be taught it. The custom illustrations resolve their own palette per scheme, because the pastel blues that read as soft on white glow unpleasantly on a dark surface, and the route rails and carrier tiles use non-token colour that needed a second pass.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/dark.webp',
      alt: 'The landing page, workspace home and parcel detail page in dark mode',
      caption: 'The same three screens as the top of this page, in Blade\'s dark scheme. The illustrations aren\'t recoloured — each resolves its own palette for the scheme it\'s rendered in.',
    },
    {
      t: 'p',
      x: 'Responsively, the shell degrades in a fixed order rather than all at once: the side rail collapses to icons, then the product tabs overflow into <em>More</em>, then the rail becomes a drawer, then the table becomes a stack of rows. Each break happens at the width where the thing it protects actually stops fitting.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/responsive.webp',
      alt: 'The parcels list at 1280, 960, 820 and 680 pixels wide, showing the navigation degrading in stages',
      caption: '1280 → 960 → 820 → 680. Four stages, each losing exactly one thing: the rail\'s labels, then the tab labels, then the rail itself, then the table\'s columns.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/mobile.webp',
      alt: 'Four Trackwise screens at 390 pixels wide — landing, public tracking page, workspace home and parcel list',
      caption: 'At 390px the public pages matter most — that\'s where a tracking link opens when it arrives by WhatsApp. The workspace follows the same rules, one column at a time.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/search.webp',
      alt: 'The command palette searching across parcels, pages and actions, beside the account menu',
      caption: 'One field over parcels, pages and actions — because in a 34-route product, search is navigation for anyone who has used it more than twice.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/settings.webp',
      alt: 'Six settings sections — profile, plan and billing, notifications, team, privacy, and developer options',
      caption: 'Six sections, each one a real screen rather than a stub. Privacy is a page with sentences, not a link to a PDF — in a product that watches your parcels, it is a feature.',
    },

    // ══ 14. Built on Blade ═══════════════════════════════════════════════════
    { t: 'h2', x: '14. Designing Inside Someone Else\'s System' },
    {
      t: 'p',
      x: 'I built this on <strong>Razorpay Blade</strong> deliberately. Designing a product with a bespoke design system is a pleasant exercise where every problem has the answer "add a token." Designing inside a real, opinionated, production system is the actual job — you inherit its type scale, its spacing, its colour semantics and its component API, and your taste has to show up in composition and behaviour instead of in decoration.',
    },
    {
      t: 'stats',
      items: [
        { v: '109', l: 'Blade components used' },
        { v: '82', l: 'Source files' },
        { v: '27.9k', l: 'Lines of TypeScript' },
        { v: '34', l: 'Routes' },
      ],
    },
    {
      t: 'p',
      x: 'Blade supplies effectively everything: <code>SideNav</code>, <code>TopNav</code>, <code>TabNav</code>, <code>Table</code>, <code>StepGroup</code>, the charts, <code>EmptyState</code>, every form control, and the colour, spacing, type, elevation and motion scales. Four things had to be hand-built, and each one earned it:',
    },
    {
      t: 'cards',
      items: [
        { icon: 'map', title: 'The route rail', desc: 'Origin → destination with live progress. Needs arbitrary non-token colour to read as a journey rather than a progress bar.' },
        { icon: 'image', title: 'The illustration set', desc: 'Blade ships icons but no illustrations — and empty states, feature gates and summary cards are where a dashboard earns its character. <strong>1,355 lines of hand-written SVG</strong>, each resolving its palette per colour scheme.' },
        { icon: 'window', title: 'The context tab strip', desc: 'Each tab is a real link with a sliding indicator, so scopes are shareable URLs rather than component state.' },
        { icon: 'droplet', title: 'The branded page', desc: 'A merchant\'s palette can\'t come from a token system. It gets a deliberate escape hatch from the design system, and only there.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The most instructive bug in the project',
      x: 'Blade\'s <code>SideNav</code> is <code>position: fixed; top: 0; height: 100%</code> and exposes neither <code>top</code> nor <code>height</code>. Running the top bar full-width above the rail therefore needs one override that reaches past the library\'s API, via a <code>data-blade-component</code> selector. It is the only such override in the codebase — and it is the honest lesson of building on someone else\'s system: <strong>you will need exactly one escape hatch, and the discipline is in stopping at one.</strong>',
    },
    {
      t: 'p',
      x: 'Motion is the same story. The custom transitions in <code>motion.css</code> use Blade\'s own motion-token values rather than invented ones — the content column has to match the side nav\'s two easing curves exactly, or the seam between them tears open mid-transition. Everything collapses to a cross-fade under <code>prefers-reduced-motion</code>, and the review panel can force that on to check it.',
    },

    // ══ 15. Designed for review ══════════════════════════════════════════════
    { t: 'h2', x: '15. A Prototype Nobody Can Review Is a Prototype Nobody Believes' },
    {
      t: 'p',
      x: 'Nine personas and seven backend conditions is 63 combinations. If reaching the "payment failed on a Business account during a partial carrier outage" state requires a code change, then in practice nobody ever looks at it — including me. So the product carries its own switchboard: persona, backend condition, appearance and forced reduced motion, plus a complete route index so no screen is reachable only by accident. Choices persist across reloads.',
    },
    {
      t: 'image',
      src: '/trackwise-assets/devpanel.webp',
      alt: 'The developer options screen — persona switcher, backend condition switcher, appearance controls and a full route index',
      caption: 'The reviewer\'s switchboard. Every state in this case study was reached from this panel — and every screenshot on this page is one click from a reviewer\'s own browser.',
    },
    {
      t: 'p',
      x: 'The same idea appears in a form a first-time visitor will actually find: under the landing hero, three cards for the three user types and a row of chips for the states that only exist for a week — near a quota, mid-trial, past due. Those are precisely the states that otherwise go unreviewed, so the product volunteers them.',
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'The seed matters',
      x: 'One seeded generator produces four parcel pools — 22, 64, 148 and a separate 6 for test mode — with coherent scan histories, carrier handovers, ETAs and delay predictions. <strong>Seeded, so the dataset is identical on every reload.</strong> A demo that reshuffles between screenshots cannot be reviewed, compared, or trusted — and neither can a case study built on one.',
    },

    // ══ 16. Reflection ═══════════════════════════════════════════════════════
    { t: 'h2', x: '16. What I Actually Learned' },
    {
      t: 'cards',
      items: [
        { icon: 'zap', title: 'Answer first, ask later', desc: 'Moving the marketing from before the answer to after it made it persuasive for the first time. You cannot sell tracking to someone who is still anxious about a parcel.' },
        { icon: 'check', title: 'Publish the error rate', desc: 'The false-positive count was the hardest thing to put on screen and the single strongest trust signal in the product. Naming a weakness converts it from a bug report into an expectation.' },
        { icon: 'layers', title: 'Constraints sharpen taste', desc: 'Blade removed every decoration decision, so the work that remained was structure, sequence and language — which is where product design actually happens.' },
        { icon: 'warn', title: 'Edge states are the product', desc: 'Rate-limited, past-due and partial-outage took longer than the happy path and are the screens a real user is most likely to remember.' },
        { icon: 'timer', title: 'Never wall off work in flight', desc: 'Hitting a quota stops new parcels, never the ones already moving. That one rule made every limit screen easy to write honestly.' },
        { icon: 'code', title: 'Building it changes the design', desc: 'The peek drawer, the tab-strip scopes and the split developer area were all consequences of using the thing daily — none of them survived contact as originally drawn.' },
      ],
    },
    { t: 'h3', x: 'What I would do next' },
    {
      t: 'p',
      x: 'The obvious gaps are honest ones. There is no backend, so the prediction is a designed artefact rather than a trained model — the next real step is defining what the model would actually need and what its interface promises on a bad day. The bundle is ~534 kB gzipped, most of it Blade plus the chart library, which a real deployment would code-split at the chart and settings routes. And the whole product currently assumes one workspace per person: multi-store switching is the first structural thing that would have to change.',
    },
    { t: 'hr' },
    {
      t: 'launch',
      title: 'Trackwise on GitHub',
      desc: 'The full source — 82 files, 34 routes, and the seeded dataset every screenshot on this page came from. Clone it, run it, and click through all 63 persona × condition combinations yourself.',
      url: 'https://github.com/uxnijin/razorpay',
      label: 'View the repo',
    },
  ],
};
