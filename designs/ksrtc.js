// ============================================================================
//  KSRTC Booking — Redesigning Kerala's State Bus Booking Platform
//  Mobile App Design Case Study
//
//  A full redesign of the KSRTC online reservation experience, rebuilt as a
//  native iOS app on Uber's Base design system, ported to SwiftUI. Designed
//  and built end-to-end: 45 Swift files, ~9,000 lines, no UI libraries.
//
//  Independent, unaffiliated prototype. See the disclaimer callout below —
//  it must stay in the case study.
// ============================================================================

const DESIGN_KSRTC = {
  slug: 'ksrtc',
  name: 'KSRTC Booking: A Platform Redesign',
  category: 'Mobile App',
  icon: 'smartphone',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'Rebuilding Kerala\'s state bus booking platform around one continuous five-step flow — designed and shipped as a running SwiftUI app.',
  lede: 'KSRTC moves millions of people across Kerala, and its booking platform is where most of them meet it. It works, but it asks the passenger to do the work: a page-per-decision funnel, a fare with no breakdown, a refund you only learn after you cancel. This is a full redesign — re-architected around a single continuous booking surface, rebuilt on Uber\'s Base design system in SwiftUI, and shipped as a real, runnable iOS app rather than a Figma file.',
  tech: ['Swift', 'SwiftUI', 'Uber Base design system', 'Observation', 'Custom illustrations', 'Haptics', 'Mock data · no network'],
  blocks: [

    // ── Disclaimer first. Non-negotiable. ────────────────────────────────────
    {
      t: 'callout',
      kind: 'warning',
      title: 'An independent redesign concept.',
      x: 'This is a personal design exercise. It is <strong>not affiliated with, endorsed by, or commissioned by the Kerala State Road Transport Corporation</strong>. No real booking is made, no payment is taken, and no KSRTC system is touched — the app runs entirely on a local mock data layer. The critique that follows is a designer\'s reading of a public service\'s booking flow, offered constructively.',
    },

    // ── This is real ─────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'success',
      title: 'This is a working iOS app, not a mockup.',
      x: 'Every screen here is a screenshot of real Swift running on an iPhone. The seat map is tappable, the 8-minute seat hold really counts down and really expires, the fare recalculates per passenger, and the QR on the ticket is generated on-device. 45 Swift files, ~9,000 lines, <strong>zero third-party UI libraries</strong>.',
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/ksrtc-assets/hero-banner.png',
      alt: 'Three screens from the redesigned KSRTC app — search, the seat map, and My Trips',
      caption: 'Search, the seat map, and My Trips — three of about thirty-four surfaces built.',
    },

    // ── At a glance ──────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; iOS Engineer (end-to-end)'],
        ['Type', 'Unsolicited redesign concept · independent prototype'],
        ['Platform', 'Native iOS (iPhone, iOS 26)'],
        ['Domain', 'Public transport · intercity bus reservation'],
        ['Design system', 'Uber <strong>Base</strong>, transcribed to SwiftUI, with one added brand ramp'],
        ['Data', 'A seeded offline mock layer — 30 Kerala stops, 26 timetable templates. No network.'],
        ['Deliverable', 'A runnable, fully interactive iOS app'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '~34', l: 'Screens & surfaces' },
        { v: '5', l: 'Booking steps, one surface' },
        { v: '9,007', l: 'Lines of Swift' },
        { v: '0', l: 'Third-party UI libraries' },
      ],
    },

    // ══ 1. Why redesign it ═══════════════════════════════════════════════════
    { t: 'h2', x: '1. Why This Platform' },
    {
      t: 'p',
      x: 'KSRTC is not a startup app — it is infrastructure. People book on it at 6am for a hospital appointment in another district, or at midnight for the last Bangalore service. That raises the stakes on every interaction: a confusing fare or a lost session is not a bounced funnel, it is someone standing at a bus station without a seat.',
    },
    {
      t: 'p',
      x: 'The existing platform is genuinely functional. It sells real tickets to real people every day, and any redesign that ignores that is posturing. But it was built web-first and grown feature-by-feature, and it shows in three places that matter: <strong>the shape of the flow</strong>, <strong>the honesty of the money</strong>, and <strong>the density of the interface</strong>. Those became the three things this redesign is actually about.',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The thesis',
      x: 'The single biggest improvement available here is not a prettier screen. It is <strong>changing the shape of the booking flow</strong> — from a sequence of pages that each ask a question and forget the last one, into one continuous surface that carries your whole trip with you. Everything else in this case study follows from that.',
    },

    // ══ 2. The comparison ════════════════════════════════════════════════════
    { t: 'h2', x: '2. The Incumbent, Examined' },
    {
      t: 'p',
      x: 'Before designing anything I walked the existing booking flow end to end and wrote down every point where I had to stop and think, re-read, scroll back, or guess. Grouped, they fall into six themes. Each one has a named countermeasure in the redesign — and every countermeasure below is actually implemented in the app, not aspirational.',
    },
    {
      t: 'table',
      head: ['What the current platform does', 'What the redesign does instead'],
      rows: [
        [
          '<strong>A page per decision.</strong> Search, results, seats, boarding point, passenger details and payment are separate pages. Going back a step often means losing what you typed, and there is no persistent reminder of which bus you are actually booking.',
          '<strong>One surface, five steps.</strong> The trip summary, progress rail and action button stay mounted for the whole funnel; only the middle content crossfades. You never lose context because the context never leaves.',
        ],
        [
          '<strong>A fare with no breakdown.</strong> You are shown a total. Where the reservation charge, the ladies-seat premium or the concession sits inside it is not explained — one of the loudest complaints about the platform.',
          '<strong>Every rupee itemised.</strong> A full fare breakdown on the Review step: base fare per passenger, seat premiums, reservation charge and concessions as separate lines that add to the total on the button.',
        ],
        [
          '<strong>Refunds discovered after the fact.</strong> The cancellation policy lives on a separate terms page. You commit to cancelling, then find out what you get back.',
          '<strong>The refund is quoted before you commit.</strong> The cancellation sheet shows fare paid, deduction and exact payout, plus the rule that produced it — computed from the same source the system uses to actually pay out, so the quote and the payout cannot drift.',
        ],
        [
          '<strong>A web seat map on a phone.</strong> A dense grid built for a mouse, with small targets and legend text that assumes you already know the colour code.',
          '<strong>The deck drawn as a bus.</strong> Driver\'s cabin at the top, aisle down the middle, 40pt seats, a four-item legend, and selected seats echoed as removable chips. Passengers reason about seats spatially, so the map is spatial.',
        ],
        [
          '<strong>Raw system data leaking through.</strong> Shouted service names, schedule codes and depot strings surface exactly as the backend stores them.',
          '<strong>Presentation-layer copy.</strong> Service class, timing, amenities and depot are parsed into a scannable row ordered by what a passenger actually looks for: times, then class, then fare.',
        ],
        [
          '<strong>Nothing is remembered.</strong> Passenger details are retyped every booking; concessions are advertised that cannot actually be booked online.',
          '<strong>Saved passengers and honest concessions.</strong> Saved travellers autofill the form, and the concession list is driven off the same enum the booking engine uses — so the app cannot offer a discount it can\'t apply.',
        ],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'On being fair to the incumbent',
      x: 'Every one of these is a <em>design</em> critique, made from the outside, with none of the constraints the actual team works under — legacy depot systems, statewide reservation rules, procurement, and a userbase that cannot be A/B tested into oblivion. The point of the comparison is to show the reasoning behind each redesign decision, not to claim the original is bad work.',
    },

    // ══ 3. The flow — the centrepiece ════════════════════════════════════════
    { t: 'h2', x: '3. The Flow Is the Redesign' },
    {
      t: 'p',
      x: 'This is the part of the project I care most about. A booking funnel is not a set of screens, it is a shape — and the incumbent\'s shape is a stack of pages. Each page asks its question, takes its answer, and hands you to the next one having forgotten the trip you are trying to book. You end up holding the state in your head: which bus was that? was it the 6:15 or the 6:50? what did the fare say?',
    },
    {
      t: 'p',
      x: 'The redesign moves all five decisions onto <strong>one mounted surface</strong>. The header, the progress rail and the button dock never unmount. Only the middle scroll view swaps, on a gentle spring crossfade. Structurally it is one screen with five states, not five screens — and that difference is what makes the funnel feel like momentum instead of paperwork.',
    },
    {
      t: 'diagram',
      caption: 'Left: a page per decision, context dropped at every hop. Right: one mounted surface, five states, context pinned throughout.',
      svg: `<svg viewBox="0 0 660 300" role="img" aria-label="Diagram comparing a five-page booking stack against a single mounted surface with five states">
  <defs>
    <marker id="ksar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow"/>
    </marker>
    <marker id="ksara" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow-a"/>
    </marker>
  </defs>

  <text x="150" y="22" class="d-t" text-anchor="middle">Before · a page per decision</text>

  <rect x="98" y="40" width="104" height="30" rx="8" class="d-box"/>
  <text x="150" y="59" class="d-s" text-anchor="middle">Seats</text>
  <line x1="150" y1="70" x2="150" y2="86" class="d-l" marker-end="url(#ksar)"/>

  <rect x="98" y="88" width="104" height="30" rx="8" class="d-box"/>
  <text x="150" y="107" class="d-s" text-anchor="middle">Boarding point</text>
  <line x1="150" y1="118" x2="150" y2="134" class="d-l" marker-end="url(#ksar)"/>

  <rect x="98" y="136" width="104" height="30" rx="8" class="d-box"/>
  <text x="150" y="155" class="d-s" text-anchor="middle">Passengers</text>
  <line x1="150" y1="166" x2="150" y2="182" class="d-l" marker-end="url(#ksar)"/>

  <rect x="98" y="184" width="104" height="30" rx="8" class="d-box"/>
  <text x="150" y="203" class="d-s" text-anchor="middle">Review</text>
  <line x1="150" y1="214" x2="150" y2="230" class="d-l" marker-end="url(#ksar)"/>

  <rect x="98" y="232" width="104" height="30" rx="8" class="d-box"/>
  <text x="150" y="251" class="d-s" text-anchor="middle">Payment</text>

  <text x="46" y="59" class="d-s" text-anchor="middle">context</text>
  <text x="46" y="72" class="d-s" text-anchor="middle">dropped</text>
  <line x1="46" y1="80" x2="46" y2="240" class="d-l" stroke-dasharray="3 4"/>
  <text x="150" y="282" class="d-s" text-anchor="middle">Back = re-enter. Which bus was this again?</text>

  <line x1="240" y1="150" x2="290" y2="150" class="d-l d-l-a" marker-end="url(#ksara)"/>

  <text x="470" y="22" class="d-t" text-anchor="middle">After · one mounted surface</text>

  <rect x="330" y="34" width="280" height="232" rx="14" class="d-box-a"/>

  <rect x="346" y="48" width="248" height="34" rx="8" class="d-box"/>
  <text x="470" y="62" class="d-s" text-anchor="middle">TVM → EKM · Today · AC Superfast</text>
  <text x="470" y="76" class="d-s" text-anchor="middle">seats held · 7:41 remaining</text>

  <rect x="346" y="92" width="44" height="5" rx="2.5" class="d-box-a"/>
  <rect x="397" y="92" width="44" height="5" rx="2.5" class="d-box-a"/>
  <rect x="448" y="92" width="44" height="5" rx="2.5" class="d-box"/>
  <rect x="499" y="92" width="44" height="5" rx="2.5" class="d-box"/>
  <rect x="550" y="92" width="44" height="5" rx="2.5" class="d-box"/>

  <rect x="346" y="110" width="248" height="98" rx="10" class="d-box" stroke-dasharray="5 5"/>
  <text x="470" y="150" class="d-s" text-anchor="middle">only this region changes</text>
  <text x="470" y="168" class="d-s" text-anchor="middle">seats · points · passengers · review · pay</text>

  <rect x="346" y="218" width="248" height="34" rx="8" class="d-box-a"/>
  <text x="470" y="239" class="d-s" text-anchor="middle">Total ₹644 · Continue</text>

  <text x="470" y="282" class="d-s" text-anchor="middle">Header, progress and dock never unmount.</text>
</svg>`,
    },
    { t: 'h3', x: 'The five steps' },
    {
      t: 'steps',
      items: [
        { title: 'Choose seats', desc: 'The deck drawn as a bus. Tap up to six seats; each one immediately becomes a passenger slot further down the funnel. Ladies-reserved seats are marked and pre-fill gender rather than failing validation later.' },
        { title: 'Boarding &amp; drop', desc: 'Points described by landmark rather than address — how you actually find the bus — each showing its real time offset from origin departure, so the pickup time is never a surprise.' },
        { title: 'Passenger details', desc: 'One card per selected seat, prefilled from saved passengers. Age, gender and concession are menus, not free text. Concessions offered here are the only ones the booking engine can actually apply.' },
        { title: 'Review', desc: 'The journey timeline, the passenger list, and an itemised fare breakdown — every component of the total on its own line.' },
        { title: 'Payment', desc: 'UPI, card, net banking or KSRTC wallet as radio rows, with the running total pinned in the dock. The button says the amount: "Pay ₹644".' },
      ],
    },
    {
      t: 'image',
      src: '/ksrtc-assets/funnel-five-steps.png',
      alt: 'All five booking steps side by side: seats, boarding and drop, passenger details, review, and payment',
      caption: 'The whole funnel, left to right. Notice what does not move: the trip summary, the five-segment progress rail, and the dock.',
    },
    { t: 'h3', x: 'The details that make the flow feel easy' },
    {
      t: 'p',
      x: 'A flow feels good when it never makes you carry something the interface could carry for you. Six decisions do most of that work here.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'layers', title: 'Context is pinned, not remembered', desc: 'Route, date, service class and the seat-hold countdown live in a header that survives every step. You are never asked to recall which bus you are booking.' },
        { icon: 'activity', title: 'The button always states the outcome', desc: '"Select a seat" → "Continue with 2 seats" → "Review booking" → "Pay ₹644". The dock is structurally identical every step; only the label and payload change, so its stability reads as one surface.' },
        { icon: 'timer', title: 'The hold is honest about itself', desc: 'Seats are held for 8 minutes. The countdown sits quietly in the header and only turns red inside the last two minutes — it informs rather than nags. On expiry the funnel unwinds to the seat map instead of letting you pay for seats you no longer hold.' },
        { icon: 'checkCircle', title: 'Errors are prevented, not reported', desc: 'Picking a ladies-reserved seat pre-fills that passenger as female. The rule is enforced three ways — prevention, detection, and a banner naming the exact seats — but you normally meet only the first.' },
        { icon: 'zap', title: 'Typing survives changes of mind', desc: 'Deselecting one seat of three keeps everything already typed for the other two. Passenger records are reconciled against the selection rather than rebuilt.' },
        { icon: 'gauge', title: 'Crossfade, not slide', desc: 'Steps swap with a spring crossfade rather than a horizontal push. A slide says "new page"; a crossfade says "same surface, new content" — which is exactly the claim the architecture is making.' },
      ],
    },

    // ══ 4. Getting into the funnel ═══════════════════════════════════════════
    { t: 'h2', x: '4. Before the Funnel: Search and Results' },
    {
      t: 'p',
      x: 'Search borrows a piece of vocabulary from ride-hailing: origin and destination are not two separate fields but two ends of <em>one</em> connected control, distinguished by marker shape — a circle for where you are, a square for where you are going — rather than by colour. The date defaults to today, collapses to "Today" and "Tomorrow" in the label, and refuses dates beyond the 30-day reservation window, because a picker that offers a date the system cannot serve is just a slower error message.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/search-to-results.png',
      alt: 'The home search screen, the same screen with a route filled in, and the results list',
      caption: 'Home, a filled search, and results. Recent searches and popular Kerala routes make the common case one tap.',
    },
    {
      t: 'p',
      x: 'Results are cards rather than table rows, ordered by what a passenger scans for: departure and arrival times first, then service class, then fare — set in a monospaced face so a scrolling column of prices stays readable. Scarcity is the one place a row raises its voice: at five seats or fewer it earns the only coloured text in the cell. Shifting the date re-runs the search in place instead of sending you back to the start.',
    },

    // ══ 5. Seat map ══════════════════════════════════════════════════════════
    { t: 'h2', x: '5. The Seat Map' },
    {
      t: 'p',
      x: 'The seat map is where a bus booking app is won or lost, and it is the surface that translates worst from web to phone. The redesign draws the deck as the bus itself — driver\'s cabin at the top, aisle running down the middle — because passengers reason about seats spatially. An abstract grid is a step backwards from a physical thing everyone already understands.',
    },
    {
      t: 'p',
      x: 'Seats are 40pt targets. Only the selected state takes the brand colour; ladies-reserved and booked keep their own tokens, because on this screen the colours <em>are</em> the information rather than decoration. Kerala RTC reserves a quarter of seats for women, allocated as whole rows from the front — which is how the block actually appears on a bus, so that is how it is drawn.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/seats-and-points.png',
      alt: 'The seat map screen beside the boarding and dropping point selection step',
      caption: 'The deck, and the boarding/drop step that follows it. Points are landmarks with real time offsets, not addresses.',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The least accessible surface gets the most accessibility work',
      x: 'A seat grid is close to meaningless to a screen reader, because everything a sighted user reads comes from position and colour. So each seat spells all of it out — where it sits, whether it is free, and what it costs — and the five-segment progress rail collapses to a single spoken element: "Step 3 of 5: Passenger details."',
    },

    // ══ 6. Money ═════════════════════════════════════════════════════════════
    { t: 'h2', x: '6. Being Honest About Money' },
    {
      t: 'p',
      x: 'Two screens in this app exist purely because the incumbent\'s versions leave the passenger guessing.',
    },
    {
      t: 'p',
      x: '<strong>The fare breakdown</strong> itemises every component — base fare per passenger, ladies-row premium, reservation charge, concession — instead of presenting a total and asking you to trust it. <strong>The cancellation sheet</strong> quotes the exact refund <em>before</em> you confirm, alongside the rule that produced it. Crucially, that figure is computed from the same policy object the system uses to actually issue the refund, so the number quoted and the number paid cannot drift apart. A quote you can\'t trust is worse than no quote.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/review-and-payment.png',
      alt: 'The review step showing an itemised fare breakdown, beside the payment method step',
      caption: 'Review and Payment. The itemised fare breakdown sits below the passenger card on Review; the running total is pinned in the dock throughout, and the button states the amount rather than just saying "Pay".',
    },
    {
      t: 'callout',
      kind: 'warning',
      title: 'The prototype deliberately collects less than it could',
      x: 'The saved payment screens capture a UPI handle, a bank name, or a card\'s last four digits — and nothing more. There is no payment rail behind this app, so asking for a full card number, expiry, CVV or PIN would mean collecting a real credential in order to do nothing with it: the worst of both. The payment step says so on screen.',
    },

    // ══ 7. Design system ═════════════════════════════════════════════════════
    { t: 'h2', x: '7. The Design System' },
    {
      t: 'p',
      x: 'A public-service app needs to look institutional without looking neglected — legible, calm, obviously maintained. Rather than invent a language, I built on <strong>Uber\'s Base</strong>, transcribing its primitive tokens into Swift and layering semantic tokens on top. Views never touch a hex value; they read <code>theme.contentPrimary</code>. That indirection is what makes the dark theme possible, because Base\'s dark mode is a separate ramp rather than a mechanical inversion.',
    },
    {
      t: 'stats',
      items: [
        { v: '99', l: 'Colour primitives' },
        { v: '47', l: 'Semantic tokens × 2 themes' },
        { v: '22', l: 'Type tokens' },
        { v: '11', l: 'Hand-drawn illustrations' },
      ],
    },
    {
      t: 'image',
      src: '/ksrtc-assets/onboarding-home.png',
      alt: 'The sign-in screen beside the home search screen, showing the shared design language',
      caption: 'Sign-in and Home. The bus illustration, the teal accent and the 48pt controls are the same tokens doing the same jobs on both.',
    },
    { t: 'h3', x: 'Two deliberate departures from Base' },
    {
      t: 'cards',
      items: [
        { icon: 'droplet', title: 'A teal ramp Base doesn\'t have', desc: 'Base\'s accent is Uber blue, which would make this app look like Uber. Teal (#0F8074 light, #54B3A4 dark) gives it an identity — and gives illustrations somewhere to put colour that isn\'t already spoken for. Accent, positive and warning all read as status; a bus drawn in "positive green" would imply something it doesn\'t mean.' },
        { icon: 'layers', title: 'Rounded, where Base is square', desc: 'Stock Base ships square cards and sheets. Everything here is rounded — and rounded uniformly, on three fixed tiers: surface (20), control (14), inner (10). Textbook concentric rounding drives inner corners back to ~4 at 16pt padding, at which point the nesting stops reading as intentional. Fixed tiers instead, always continuous curvature.' },
      ],
    },
    { t: 'h3', x: 'Type' },
    {
      t: 'p',
      x: 'Base ships Uber Move, which is proprietary and cannot be redistributed. The substitute is SF Pro pushed on the two levers that actually carry that family\'s character: a rounded-heavy display cut with tightened tracking at large sizes, and strict weight discipline — 400 body, 500 label, 700 heading — rather than SwiftUI\'s defaults. The sizes and line heights are the real Base values.',
    },
    {
      t: 'table',
      head: ['Family', 'Range', 'Role'],
      rows: [
        ['Paragraph', '12/20 → 18/28 · regular', 'Body copy. Tracking stays at zero.'],
        ['Label', '12/16 → 18/24 · medium', 'Buttons, tags, form labels. Tracking tightens to −0.2.'],
        ['Heading', '20/28 → 40/52 · bold', 'Section and screen titles. Tracking −0.3 → −1.0.'],
        ['Display', '36/44 → 96/112 · bold', 'Reserved for <em>one</em> brandable moment per screen.'],
        ['Mono', '14/16 → 24/32', 'Fares, times, seat numbers, PNRs — anything scanned in a column.'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'One Display moment per screen',
      x: 'The Display family is rationed to a single use per screen, and the rule is enforced in the source — each site is commented <code>// The one Display moment on this screen.</code> On Home it is "Where to?". That discipline is what keeps a dense, form-heavy app from shouting.',
    },
    { t: 'h3', x: 'Motion' },
    {
      t: 'p',
      x: 'Base pairs a curve with an <em>intent</em> rather than with a component, which is why its motion feels coherent: everything entering shares one curve, everything leaving shares another, and exits run at roughly half the duration of entrances.',
    },
    {
      t: 'table',
      head: ['Token', 'Curve', 'Duration', 'Intent'],
      rows: [
        ['entering', 'cubic(0.22, 1, 0.36, 1)', '0.40s', 'Starts fast, settles gradually. Elements coming in.'],
        ['exiting', 'cubic(0.64, 0, 0.78, 0)', '0.20s', 'Gradual start, accelerating away.'],
        ['standard', 'cubic(0.83, 0, 0.17, 1)', '0.30s', 'Gentle at both ends. The general-purpose default.'],
        ['press', 'cubic(0.11, 0, 0.5, 0)', '0.10s', 'Immediate response to touch. Deliberately short.'],
        ['linear', 'linear', '0.25s', 'Opacity and colour crossfades, where easing reads as a flicker.'],
        ['sheetStep', 'spring · response 0.42 · damping 0.86', '—', 'The funnel\'s step transition. Slightly springy, so five steps feel like one surface.'],
      ],
    },
    { t: 'h3', x: 'Illustration' },
    {
      t: 'p',
      x: 'Eleven illustrations — bus, route, seat, passengers, review, wallet, ticket, search, support, shield, discount — are hand-composed from SwiftUI primitives in a 64×64 space. No image assets, so they re-theme with everything else. Four house rules keep them a set rather than a collection: <strong>stroke, don\'t fill</strong>; <strong>two colours maximum</strong>; <strong>geometric only</strong> — circles, capsules and rounded rects on the same continuous curvature as the rest of the app; and <strong>small</strong> — they label a screen, they are never the content of one.',
    },
    {
      t: 'p',
      x: 'The bus is the clearest example of the second rule: its destination blind is the one brand-coloured element, because on a real bus that is the thing you actually look at.',
    },

    // ══ 8. States ════════════════════════════════════════════════════════════
    { t: 'h2', x: '8. Loading, Empty and Error Are Designed Too' },
    {
      t: 'p',
      x: 'The mock repository introduces real latency and real failure modes rather than returning instantly, so the loading, empty and error states get genuinely exercised during development instead of being decorative. Skeletons mirror the real row\'s card chrome and padding exactly, so the list does not reflow when results land — an earlier version used different padding and visibly jumped.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/honest-states.png',
      alt: 'The results screen shown in loading, error, and empty states',
      caption: 'Loading, error and empty. Results has two distinct empty states — "no service on this route" and "your filters excluded everything" are different problems with different fixes.',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'A bug the design system fixed',
      x: 'Every card routes through one <code>.baseSurface()</code> modifier that does fill, border and clip at a single radius. Before it existed, each screen hand-rolled its own background-plus-overlay — which is exactly how the corner radii drifted apart in the first place: the border and the clip were free to disagree.',
    },

    // ══ 9. Dark mode ═════════════════════════════════════════════════════════
    { t: 'h2', x: '9. Dark Mode, Authored Not Inverted' },
    {
      t: 'p',
      x: 'Base\'s dark theme is not a mechanical inversion — it has an entirely separate grey ramp, and tokens like the modal scrim step from 50% to 70% opacity rather than flipping. So the two themes are authored independently as two instances of the same 47-property struct, and every view gets both for free by reading semantic tokens instead of colours.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/theme-pair.png',
      alt: 'The home search screen and the seat map shown in dark mode',
      caption: 'Dark mode across search and the seat map. Same tokens, separate ramp — the seat states keep their meaning in both.',
    },

    // ══ 10. Beyond the funnel ════════════════════════════════════════════════
    { t: 'h2', x: '10. The Rest of the App' },
    {
      t: 'p',
      x: 'A booking flow is only useful if the ticket survives it. Trips splits into Upcoming and Past, each row carrying its status, route, time and PNR. The ticket itself is built to read as a ticket — a perforation, a mono PNR, seat chips, and a QR generated on-device rather than fetched, because an e-ticket that needs a connection to render is not much of an e-ticket on a bus in the Western Ghats.',
    },
    {
      t: 'p',
      x: 'Profile carries thirteen further surfaces: saved passengers, payment methods, concessions, seven offline help topics, the cancellation policy table, and the legal pages. Row subtitles are computed counts rather than fixed copy, so a row tells you whether there is anything behind it before you tap in.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/trips-and-profile.png',
      alt: 'The My Trips list beside the Profile screen',
      caption: 'Trips and Profile. Counts in the row subtitles; the disclaimer pinned at the bottom of Profile.',
    },

    // ══ 11. Next ═════════════════════════════════════════════════════════════
    { t: 'h2', x: '11. What I\'d Do Next' },
    {
      t: 'cards',
      items: [
        { icon: 'globe', title: 'Malayalam, properly', desc: 'Stop names already carry their Malayalam forms and the picker already searches them. Full localisation — plus a Dynamic Type audit of the denser screens — is the obvious next step for a Kerala-first service.' },
        { icon: 'braces', title: 'A real reservation backend', desc: 'The repository is already an interface with two implementations, mock and HTTP. Pointing the same UI at a live host is a launch argument, not a rewrite.' },
        { icon: 'activity', title: 'Live Activities for departure', desc: 'The seat-hold countdown and the boarding-point offset are exactly the data a lock-screen Live Activity wants on the morning of travel.' },
        { icon: 'search', title: 'Validation with real passengers', desc: 'Every claim in section 2 is a designer\'s reading of the flow. The honest next step is putting both versions in front of people who book KSRTC monthly and finding out which parts of this are right.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The takeaway',
      x: 'The interesting work in a redesign like this is not visual. It is noticing that the funnel\'s <em>shape</em> — five pages versus one surface — is doing more damage to the experience than any amount of styling, and then having the engineering range to actually build the alternative and feel whether it is true. It is.',
    },

  ],
};
