// ============================================================================
//  Parcel — Premium Courier Booking (iOS)
//  Mobile case study
//
//  Same structure as the Oppam, KSRTC and Route Planner entries: problem,
//  research, findings, the bet, scope, the flow, the screens, the trade-offs,
//  and how success would be measured. Short text — the figures carry it.
//
//  Every figure is a screenshot of the running SwiftUI app, composed by
//  tools/parcel_figures.sh. Individual captures live in parcel-assets/screens/.
//  Light is the primary set; dark appears only in the theme figure.
//
//  NOTE: the funnel is FOUR steps (pickup, receiver, parcel, review) and the
//  app assigns a pickup branch rather than comparing partners. An older draft
//  of this case study described five steps and a partner-comparison screen —
//  that is stale. Write from what the captures show.
// ============================================================================

BODY('parcel', {
  blocks: [

    // ── Hero ────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/parcel-assets/hero.webp',
      alt: 'Five Parcel screens: home, the parcel step, review and pay, live tracking, and the booking confirmation',
      caption: 'Home, two steps of the funnel, the live map, and the pass you get at the end.',
    },

    { t: 'h3', x: 'A self-directed concept, and every screen is real.' },
    {
      t: 'p',
      x: 'Nobody commissioned this and no courier company was involved. <strong>Every image is a screenshot of the running app.</strong> The courier moves along the route on a hand-drawn <code>Canvas</code> map - there is no map SDK anywhere in the project. The tracking timeline animates stage by stage, the confirmation confetti is a real particle system, and the whole thing builds in Xcode and runs on an iPhone.',
    },

    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Sole designer and engineer - end to end'],
        ['Type', 'Self-directed product exercise'],
        ['Platform', 'Native iOS - iPhone, light-first'],
        ['Built with', 'Swift and SwiftUI, hand-written - no UI frameworks, no map SDK'],
        ['Data', 'A seeded offline mock layer. No backend, no network.'],
        ['Status', 'Runnable prototype - no real booking, no payment rail'],
      ],
    },

    // ══ 1 · Problem ═════════════════════════════════════════════════════════
    { t: 'h2', x: '1 · The problem' },
    {
      t: 'p',
      x: 'Booking a cab in India is a twenty-second, one-thumb ritual that everybody trusts. Sending a parcel is still a chore: a counter visit, or an app that looks like a spreadsheet, opaque pricing, and then no honest idea where the thing is until it either turns up or doesn\'t.',
    },
    {
      t: 'p',
      x: 'The interesting part is that the second job is not harder than the first. It is <em>the same shape</em> - a pickup, a drop, a price, a person coming to your door - presented as paperwork instead of as a ride.',
    },

    // ══ 2 · Research ════════════════════════════════════════════════════════
    { t: 'h2', x: '2 · What I did instead of guessing' },
    {
      t: 'p',
      x: 'This is self-directed, so I will say the limits plainly: <strong>no senders were interviewed, and no courier operator was consulted.</strong> What there is:',
    },
    {
      t: 'list',
      items: [
        '<strong>I booked a courier through the existing apps</strong> and wrote down every point where I had to guess - what it would cost, when somebody would actually arrive, and where the parcel was once it left.',
        '<strong>A side-by-side with the ride-hailing pattern</strong> this design borrows from, to work out which parts genuinely transfer and which parts are a category mistake.',
        '<strong>Building it, and then using it</strong> - which is where the design actually changed. The pickup-time question below is the clearest example: the first version promised a slot, and building it made it obvious that was a lie.',
      ],
    },

    // ══ 3 · Findings ════════════════════════════════════════════════════════
    { t: 'h2', x: '3 · What that pointed at' },
    {
      t: 'cards',
      items: [
        {
          icon: 'gauge',
          title: 'The typing is the tax',
          desc: 'Addresses, names, phone numbers — retyped every single time. <strong>So:</strong> saved places, frequent receivers as avatars, and a sender prefilled from the profile. Most bookings start half-done.',
        },
        {
          icon: 'activity',
          title: 'Anxiety is the real problem',
          desc: 'The gap between “booked” and “delivered” is where trust is lost. <strong>So:</strong> a live map, a named courier you can call, and a timeline that fills in as it happens.',
        },
        {
          icon: 'checkCircle',
          title: 'A promised slot you can’t keep is worse than a range',
          desc: 'Pickup times depend on a branch, not on the app. <strong>So:</strong> the app says “today, within 2 hours” and tells you the branch confirms the exact slot when they call.',
        },
        {
          icon: 'smartphone',
          title: 'One thumb, on the move',
          desc: 'This gets used standing in a doorway holding a box. <strong>So:</strong> primary actions live in the bottom third, and nothing important needs a second hand.',
        },
      ],
    },

    // ══ 4 · The bet ═════════════════════════════════════════════════════════
    { t: 'h2', x: '4 · The bet' },
    {
      t: 'quote',
      x: 'Sending a parcel is the same shape as booking a ride - a pickup, a drop, a price and a person coming to your door. Design it as a ride, not as paperwork, and the anxiety goes with the paperwork.',
      by: 'The one sentence every decision was tested against',
    },

    { t: 'h3', x: 'Four rules that settled the arguments' },
    {
      t: 'cards',
      items: [
        { icon: 'sun', title: 'Light-first, dark authored', desc: 'Designed in a soft warm-white so it reads bright and trustworthy. The dark theme is built from the same tokens by hand, not auto-inverted.' },
        { icon: 'zap', title: 'Motion with mass', desc: 'Every transition uses a named spring. Sheets are heavy, chips are snappy, the confirmation is allowed to celebrate. Motion communicates state; it never decorates.' },
        { icon: 'layers', title: 'Wallet-grade surfaces', desc: 'Continuous-corner cards, a single elevation level, a top-lit sheen. Depth is used sparingly enough that it means something when it appears.' },
        { icon: 'droplet', title: 'Say what you actually know', desc: 'A range you can keep beats a time you can’t. Where the app is guessing, it says it is guessing.' },
      ],
    },

    // ══ 5 · Feature inventory ═══════════════════════════════════════════════
    { t: 'h2', x: '5 · Everything it could have been' },
    {
      t: 'p',
      x: 'Thirteen surfaces, grouped by the part of the job they belong to.',
    },
    {
      t: 'table',
      head: ['Part of the job', 'What lives there'],
      rows: [
        ['<strong>Arriving</strong>', 'Welcome · phone sign-in · a home that leads with the shipment already moving, then Domestic and International, then the quick actions'],
        ['<strong>Booking</strong>', 'Pickup with saved places and “use current location” · receiver from frequent contacts · parcel type, a fragile toggle, a weight stepper and a note for the rider · a review carrying the route map, the itinerary, the assigned branch and the fee'],
        ['<strong>Waiting</strong>', 'A confirmation pass with a booking number and the branch’s phone number · a live map with the courier drawn on it · a progress ring · a named, rateable courier · a timeline that fills in stage by stage'],
        ['<strong>Afterwards</strong>', 'A rating prompt · activity · shipment history · profile and saved addresses'],
      ],
    },

    // ══ 6 · Prioritisation ══════════════════════════════════════════════════
    { t: 'h2', x: '6 · What made the cut, and why' },
    {
      t: 'p',
      x: 'One rule decided scope: <strong>does this reduce the sender\'s uncertainty?</strong> Not “does it add a feature” — which is what killed the four in the bottom-right corner, every one of them normal in a logistics app.',
    },
    {
      t: 'diagram',
      caption: 'The sort that set scope. Position is judgement, not measurement — the axes are mine, and the point is the reasoning.',
      svg: `<svg viewBox="0 0 720 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feature prioritisation: how much a feature reduces the sender's uncertainty, against build cost">
  <line x1="30" y1="238" x2="700" y2="238" class="d-l"/>
  <line x1="366" y1="20" x2="366" y2="424" class="d-l"/>
  <polygon points="700,238 690,233 690,243" class="d-arrow"/>
  <polygon points="366,20 361,30 371,30" class="d-arrow"/>

  <text x="34" y="52" class="d-m">SHIP FIRST</text>
  <circle cx="40" cy="76" r="4" class="d-dot-a"/><text x="54" y="80" class="d-s">Saved places and receivers</text>
  <circle cx="40" cy="102" r="4" class="d-dot-a"/><text x="54" y="106" class="d-s">An honest pickup range</text>
  <circle cx="40" cy="128" r="4" class="d-dot-a"/><text x="54" y="132" class="d-s">The branch’s phone number</text>
  <circle cx="40" cy="154" r="4" class="d-dot-a"/><text x="54" y="158" class="d-s">A booking number you can read</text>
  <circle cx="40" cy="180" r="4" class="d-dot-a"/><text x="54" y="184" class="d-s">The fee, before you confirm</text>

  <text x="384" y="52" class="d-m">WORTH THE WORK</text>
  <circle cx="390" cy="76" r="4" class="d-dot-a"/><text x="404" y="80" class="d-s">A live map, drawn from scratch</text>
  <circle cx="390" cy="102" r="4" class="d-dot-a"/><text x="404" y="106" class="d-s">A named, callable courier</text>
  <circle cx="390" cy="128" r="4" class="d-dot-a"/><text x="404" y="132" class="d-s">A timeline that fills in live</text>
  <circle cx="390" cy="154" r="4" class="d-dot-a"/><text x="404" y="158" class="d-s">Four steps on one surface</text>
  <circle cx="390" cy="180" r="4" class="d-dot-a"/><text x="404" y="184" class="d-s">Two authored themes</text>

  <text x="34" y="282" class="d-m">LATER, NOT NEVER</text>
  <circle cx="40" cy="306" r="4" class="d-dot"/><text x="54" y="310" class="d-s">Scheduled pickups</text>
  <circle cx="40" cy="332" r="4" class="d-dot"/><text x="54" y="336" class="d-s">Multi-parcel bookings</text>
  <circle cx="40" cy="358" r="4" class="d-dot"/><text x="54" y="362" class="d-s">Live Activity on the lock screen</text>

  <text x="384" y="282" class="d-m">CUT</text>
  <circle cx="390" cy="306" r="4" class="d-dot"/><text x="404" y="310" class="d-s">A partner price-comparison grid</text>
  <circle cx="390" cy="332" r="4" class="d-dot"/><text x="404" y="336" class="d-s">Loyalty points and tiers</text>
  <circle cx="390" cy="358" r="4" class="d-dot"/><text x="404" y="362" class="d-s">In-app chat with support</text>
  <circle cx="390" cy="384" r="4" class="d-dot"/><text x="404" y="388" class="d-s">A promotions carousel on home</text>

  <text x="30" y="452" class="d-m">LOW BUILD COST</text>
  <text x="700" y="452" class="d-m" text-anchor="end">HIGH BUILD COST</text>
  <text x="0" y="14" class="d-m">↑ REDUCES THE SENDER’S UNCERTAINTY</text>
</svg>`,
    },
    {
      t: 'p',
      x: 'The one worth explaining is the partner grid. An earlier version of this design compared five courier partners on price, speed and rating - and it looked great in a portfolio. It was also the wrong job: a first-time sender does not have an opinion about carriers, and asking them to form one is <em>work</em> disguised as choice. The app assigns the nearest branch, names it, and gives you its phone number instead.',
    },

    // ══ 7 · Flow ════════════════════════════════════════════════════════════
    { t: 'h2', x: '7 · The core flow, end to end' },
    {
      t: 'p',
      x: 'From opening the app to rating a delivery. Each phase carries one principle, and the orange notes are the places a sender normally starts worrying.',
    },
    {
      t: 'diagram',
      caption: 'Twelve steps. The funnel is four of them, and they all happen on one surface under a progress header that never leaves.',
      svg: `<svg viewBox="0 0 720 578" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core flow: arrive, book, hand it over, and follow it">

  <text x="0" y="12" class="d-m">1 · ARRIVE</text>
  <text x="720" y="12" class="d-m" text-anchor="end">START HALF-DONE</text>
  <rect x="0" y="24" width="220" height="60" rx="11" class="d-box-a"/>
  <text x="16" y="50" class="d-t">Open</text><text x="16" y="70" class="d-s">A phone number, nothing more</text>
  <rect x="250" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="50" class="d-t">Home</text><text x="266" y="70" class="d-s">Leads with what’s moving</text>
  <rect x="500" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="50" class="d-t">Send</text><text x="516" y="70" class="d-s">Domestic or international</text>
  <line x1="220" y1="54" x2="244" y2="54" class="d-l"/><polygon points="250,54 242,50 242,58" class="d-arrow"/>
  <line x1="470" y1="54" x2="494" y2="54" class="d-l"/><polygon points="500,54 492,50 492,58" class="d-arrow"/>
  <text x="0" y="106" class="d-s" fill="var(--accent)">↳ a shipment already in flight owns the top of home — tracking is not a tab you go and find</text>
  <path d="M610 84 V118 q0 8 -8 8 H204 q-8 0 -8 8 V160" class="d-l"/>
  <polygon points="196,166 192,158 200,158" class="d-arrow"/>

  <text x="0" y="154" class="d-m">2 · BOOK IT</text>
  <text x="720" y="154" class="d-m" text-anchor="end">FOUR STEPS, ONE SURFACE</text>
  <rect x="0" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="192" class="d-t">Pickup</text><text x="16" y="212" class="d-s">Home, Office, Parents</text>
  <rect x="250" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="192" class="d-t">Receiver</text><text x="266" y="212" class="d-s">Frequent people, as faces</text>
  <rect x="500" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="192" class="d-t">The parcel</text><text x="516" y="212" class="d-s">Type, weight, fragile, a note</text>
  <line x1="220" y1="196" x2="244" y2="196" class="d-l"/><polygon points="250,196 242,192 242,200" class="d-arrow"/>
  <line x1="470" y1="196" x2="494" y2="196" class="d-l"/><polygon points="500,196 492,192 492,200" class="d-arrow"/>
  <text x="0" y="248" class="d-s" fill="var(--accent)">↳ the sender is prefilled from the profile — most bookings open already half-answered</text>
  <path d="M610 226 V260 q0 8 -8 8 H204 q-8 0 -8 8 V302" class="d-l"/>
  <polygon points="196,308 192,300 200,300" class="d-arrow"/>

  <text x="0" y="296" class="d-m">3 · HAND IT OVER</text>
  <text x="720" y="296" class="d-m" text-anchor="end">SAY WHAT YOU ACTUALLY KNOW</text>
  <rect x="0" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="334" class="d-t">Review</text><text x="16" y="354" class="d-s">Route, itinerary, the fee</text>
  <rect x="250" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="334" class="d-t">Confirm</text><text x="266" y="354" class="d-s">One button, with the amount</text>
  <rect x="500" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="334" class="d-t">Booked</text><text x="516" y="354" class="d-s">A number, and a branch to call</text>
  <line x1="220" y1="338" x2="244" y2="338" class="d-l"/><polygon points="250,338 242,334 242,342" class="d-arrow"/>
  <line x1="470" y1="338" x2="494" y2="338" class="d-l"/><polygon points="500,338 492,334 492,342" class="d-arrow"/>
  <text x="0" y="390" class="d-s" fill="var(--accent)">↳ “today, within 2 hours” — a range the branch can keep, not a slot the app invented</text>
  <path d="M610 368 V402 q0 8 -8 8 H204 q-8 0 -8 8 V444" class="d-l"/>
  <polygon points="196,450 192,442 200,442" class="d-arrow"/>

  <text x="0" y="438" class="d-m">4 · FOLLOW IT</text>
  <text x="720" y="438" class="d-m" text-anchor="end">CLOSE THE ANXIETY GAP</text>
  <rect x="0" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="476" class="d-t">Track</text><text x="16" y="496" class="d-s">A map you can believe</text>
  <rect x="250" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="476" class="d-t">The courier</text><text x="266" y="496" class="d-s">Named, rated, callable</text>
  <rect x="500" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="476" class="d-t">Delivered</text><text x="516" y="496" class="d-s">Then a quiet rating prompt</text>
  <line x1="220" y1="480" x2="244" y2="480" class="d-l"/><polygon points="250,480 242,476 242,484" class="d-arrow"/>
  <line x1="470" y1="480" x2="494" y2="480" class="d-l"/><polygon points="500,480 492,476 492,484" class="d-arrow"/>
  <text x="0" y="532" class="d-s" fill="var(--accent)">↳ the timeline fills in stage by stage — requested, accepted, assigned, collected</text>
  <text x="0" y="558" class="d-s" fill="var(--accent)">↻ rebook from history — the same route, prefilled, in two taps</text>
</svg>`,
    },

    // ══ 8 · Shell ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '8 · The frame around the flow' },
    {
      t: 'p',
      x: 'Sign-in is a phone number and nothing else. Home leads with the shipment that is already moving - if something is in flight, that is the only thing you came to find out - and only then offers Domestic and International. The quick actions underneath are the three verbs that actually recur: track, rebook, shipments.',
    },
    {
      t: 'image',
      src: '/parcel-assets/shell.webp',
      alt: 'The welcome screen, phone sign-in, and home',
      caption: 'Welcome, sign-in, home. One system, and a home screen that answers “where is my thing” before it asks for anything.',
    },

    // ══ 9 · Booking ═════════════════════════════════════════════════════════
    { t: 'h2', x: '9 · Four steps, one surface' },
    {
      t: 'p',
      x: 'The funnel lives on a single surface: steps swap with matched, directional motion under a progress header that never unmounts, so it never feels like four separate screens. Almost every field has a default worth accepting - saved places, frequent receivers as avatars, the sender already filled in.',
    },
    {
      t: 'image',
      src: '/parcel-assets/booking.webp',
      alt: 'The four booking steps: pickup, receiver, the parcel, and review and pay',
      caption: 'Pickup → receiver → parcel → review. The progress bar and the phone button stay put; only the middle changes.',
    },
    {
      t: 'p',
      x: 'The parcel step is the one that had to stay simple. Four things decide a courier quote - what it is, how heavy, how fragile, and anything the rider should know - so it asks exactly those four, as a type list, a stepper, a toggle and one optional line. No dimensions, no declared value, no insurance upsell.',
    },

    // ══ 10 · Honesty ════════════════════════════════════════════════════════
    { t: 'h2', x: '10 · The pickup time is a range, on purpose' },
    {
      t: 'p',
      x: 'This is the decision I would defend hardest. An earlier version promised a pickup slot, and building it made the problem obvious: <strong>the app does not control when a rider leaves a branch.</strong> A slot the system cannot keep is a broken promise on the very first booking.',
    },
    {
      t: 'p',
      x: 'So the review, the confirmation and the tracking screen all say the same thing - <em>today, within 2 hours</em> - and the confirmation adds the sentence that makes it usable rather than vague: <em>“the branch confirms the exact slot when they call.”</em> The branch\'s own phone number sits underneath it. The app stops pretending to be the operator, and hands you the operator.',
    },
    {
      t: 'image',
      src: '/parcel-assets/tracking.webp',
      alt: 'The booking confirmation, live tracking with the courier on a map, and the rating prompt',
      caption: 'Booked, in flight, delivered. The courier is a named person with a rating and a call button; the timeline fills in as it happens; the rating asks once and quietly.',
    },
    {
      t: 'p',
      x: 'The map is drawn rather than embedded - no map SDK anywhere in the project. That was a deliberate cost: it buys exact art direction and a route that can animate itself, and it gives up real geography entirely.',
    },

    // ══ 11 · After ══════════════════════════════════════════════════════════
    { t: 'h2', x: '11 · Afterwards' },
    {
      t: 'image',
      src: '/parcel-assets/after.webp',
      alt: 'Activity, shipment history, and the profile screen',
      caption: 'Activity, history and profile. History is the rebooking surface — most people send to the same few places.',
    },

    // ══ 12 · Theme ══════════════════════════════════════════════════════════
    { t: 'h2', x: '12 · Light-first, dark authored' },
    {
      t: 'p',
      x: 'The app is designed in a soft warm-white rather than pure white, with one indigo-violet signature carrying every primary action, and status colours reserved for status. Dark is built from the same tokens by hand - the map, the route line and the accent survive the switch, and only the surfaces move.',
    },
    {
      t: 'image',
      src: '/parcel-assets/theme.webp',
      alt: 'Home and tracking shown in light and dark side by side',
      caption: 'The same two screens in both appearances.',
    },

    // ══ 13 · Trade-offs ═════════════════════════════════════════════════════
    { t: 'h2', x: '13 · The trade-offs' },
    {
      t: 'table',
      head: ['What I chose', 'What it cost', 'Why I took it anyway'],
      rows: [
        [
          '<strong>Drawing the map instead of embedding one.</strong>',
          'No real geography, no real routing, and it could not ship like this.',
          'It buys exact art direction and a route line that animates itself, on a screen whose whole job is to feel believable. A stock map would have made this look like every other tracking page.',
        ],
        [
          '<strong>A pickup range, not a slot.</strong>',
          'Vaguer than a competitor promising 4–6pm, and almost certainly worse in a conversion test.',
          'The app does not control when a rider leaves a branch. A slot it cannot keep breaks trust on the first booking, which is the only one that matters.',
        ],
        [
          '<strong>Assigning a branch instead of comparing partners.</strong>',
          'Loses the price-comparison grid, which is the most portfolio-friendly screen in the category.',
          'A first-time sender has no opinion about carriers. Asking them to form one is work disguised as choice.',
        ],
        [
          '<strong>Four steps instead of one long form.</strong>',
          'Four taps of Continue where a single scrolling form would need none.',
          'One question at a time is what makes it feel like booking a ride. The progress header is what stops four steps reading as four screens.',
        ],
        [
          '<strong>Phone-number sign-in, nothing else.</strong>',
          'No email, so no receipts, no recovery, no marketing list.',
          'The parcel needs a phone number anyway. Everything else could be asked for later, and mostly never needs to be.',
        ],
      ],
    },

    // ══ 14 · Measurement ════════════════════════════════════════════════════
    { t: 'h2', x: '14 · How I\'d know it worked' },
    {
      t: 'p',
      x: 'Nothing has shipped, so there are no results to report. This is the plan I would hold it to.',
    },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['<strong>North star</strong>', 'Time from opening the app to a confirmed booking, for a repeat sender. The prefills exist to make that number small.'],
        ['<strong>The anxiety test</strong>', 'Tracking opens per shipment. Counterintuitively I want this to <em>fall</em> over time — obsessive checking means the map is not convincing.'],
        ['<strong>The honesty test</strong>', 'Support contacts asking “when is pickup”. The range plus the branch number exists to make that call unnecessary; if it does not, the range is too vague to be useful.'],
        ['<strong>Repeat rate</strong>', 'Second bookings within 30 days, and how many come through rebook rather than a fresh funnel.'],
        ['<strong>Guardrail</strong>', 'Bookings abandoned at the parcel step. That is the only screen asking for something the sender has to think about.'],
        ['<strong>The first experiment</strong>', 'The honest range against a promised slot. It is the riskiest decision in the design and the one most likely to lose on a naive conversion metric while winning on retention.'],
      ],
    },

    // ══ 15 · Scope ══════════════════════════════════════════════════════════
    { t: 'h2', x: '15 · What isn\'t built' },
    {
      t: 'p',
      x: 'No real geocoding or routing, because the map is drawn. No payment rail - the fee is real in the interface and imaginary underneath. No scheduled pickups, no multi-parcel bookings, and no Live Activity, though the tracking timeline is exactly the data one wants. And no sender has used it, which is why the section above is a plan rather than a result.',
    },
    {
      t: 'stats',
      items: [
        { v: '13', l: 'screens and surfaces' },
        { v: '4', l: 'booking steps, one surface' },
        { v: '8', l: 'named spring curves' },
        { v: '0', l: 'third-party UI libraries, and no map SDK' },
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'The best decision in this project was subtracting a screen. The partner-comparison grid looked like the most designed thing in the app, and removing it is what made the booking feel like ordering a ride.',
      by: 'Design intent, Parcel',
    },
  ],
});
