// ============================================================================
//  KSRTC Booking — Redesigning Kerala's State Bus Booking Platform
//  Mobile case study
//
//  Same structure as the Oppam entry: problem, research, findings, the bet,
//  scope, the flow, the screens, the trade-offs, and how success would be
//  measured. Short text — the figures carry it.
//
//  Every figure is a screenshot of the running SwiftUI app, composed by
//  tools/ksrtc_figures.sh. Individual captures live in ksrtc-assets/screens/.
//  Independent, unaffiliated prototype: the disclaimer must stay.
// ============================================================================

BODY('ksrtc', {
  blocks: [

    // ── Hero ────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/ksrtc-assets/hero.webp',
      alt: 'Five screens from the redesigned KSRTC app: search, results, the seat map, review and the ticket',
      caption: 'Search, results, the seat map, the itemised review, and the ticket that comes out the other end.',
    },

    { t: 'h3', x: 'An independent redesign, and every screen is real.' },
    {
      t: 'p',
      x: 'This is a personal design exercise. It is <strong>not affiliated with, endorsed by or commissioned by the Kerala State Road Transport Corporation</strong>. No real booking is made, no payment is taken, and no KSRTC system is touched - the app runs on a local mock layer. <strong>Every image below is a screenshot of the running app.</strong> The seat map is tappable, the eight-minute hold really counts down and really expires, and the QR on the ticket is generated on the device.',
    },

    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Sole designer and engineer - audit, IA, UI, motion, build'],
        ['Type', 'Unsolicited redesign of a live public service'],
        ['Platform', 'Native iOS - iPhone, iOS 26'],
        ['Design system', 'Uber <strong>Base</strong>, transcribed to SwiftUI, plus one added brand ramp'],
        ['Built with', 'SwiftUI - 45 files, ~9,000 lines, no UI libraries'],
        ['Data', 'A seeded offline mock layer: 30 Kerala stops, 26 timetable templates. No network.'],
        ['Status', 'Runnable prototype. No payment rail, no real reservation.'],
      ],
    },

    // ══ 1 · Problem ═════════════════════════════════════════════════════════
    { t: 'h2', x: '1 · The problem' },
    {
      t: 'p',
      x: 'KSRTC is not a startup app. It is infrastructure - a fleet of <strong>5,576 buses</strong> running out of <strong>93 depots</strong>, covering about seventeen lakh kilometres a day. The booking platform is where most people meet it.',
    },
    {
      t: 'p',
      x: 'That raises the stakes on every interaction. People book at 6am for a hospital appointment in another district, or at midnight for the last Bangalore service. A confusing fare or a dropped session is not a bounced funnel - it is somebody standing at a bus station without a seat.',
    },
    {
      t: 'stats',
      items: [
        { v: '5,576', l: 'buses in the fleet (CARE Ratings, FY24)' },
        { v: '93', l: 'depots across three zones' },
        { v: '5→1', l: 'booking pages, collapsed into one surface' },
      ],
    },

    // ══ 2 · Research ════════════════════════════════════════════════════════
    { t: 'h2', x: '2 · What I did instead of guessing' },
    {
      t: 'p',
      x: 'No research budget, no access to the corporation\'s analytics, and no way to test on people who book monthly. Rather than dress that up: <strong>there are no user interviews behind this either.</strong> What there is:',
    },
    {
      t: 'list',
      items: [
        '<strong>I booked on the live platform, end to end, twice</strong> - and wrote down every point where I had to stop, re-read, scroll back or guess. That list is the whole basis of the critique.',
        '<strong>A heuristic audit of those notes</strong>, grouped until they collapsed into six recurring themes.',
        '<strong>The corporation\'s published reservation rules</strong> - the 30-day booking window, the ladies-seat quota, the cancellation slabs - so the redesign obeys the real constraints rather than inventing convenient ones.',
        '<strong>The published operating figures</strong>, to size what is actually at stake.',
      ],
    },
    {
      t: 'p',
      x: 'One caveat I want stated up front: every criticism here is made from the outside, with none of the constraints the real team works under - legacy depot systems, statewide reservation rules, procurement, and a userbase that cannot be A/B tested into oblivion. <strong>The point is to show the reasoning, not to claim the original is bad work.</strong> It sells real tickets to real people every day.',
    },

    // ══ 3 · Findings ════════════════════════════════════════════════════════
    { t: 'h2', x: '3 · Four findings, and what each one changed' },
    {
      t: 'cards',
      items: [
        {
          icon: 'layers',
          title: 'The shape is the bug',
          desc: 'Search, results, seats, boarding, passengers and payment are separate pages. Going back loses what you typed. <strong>So:</strong> one mounted surface, five states.',
        },
        {
          icon: 'activity',
          title: 'The fare is a total, not a breakdown',
          desc: 'You are shown a number. Where the reservation charge or the ladies-seat premium sits inside it is never said. <strong>So:</strong> every rupee gets its own line.',
        },
        {
          icon: 'gauge',
          title: 'A web seat grid on a phone',
          desc: 'Small targets, a legend that assumes you know the colour code. <strong>So:</strong> draw the deck as the bus - cabin at the top, aisle down the middle.',
        },
        {
          icon: 'checkCircle',
          title: 'Nothing is remembered',
          desc: 'Passenger details are retyped every booking, and concessions are advertised that cannot actually be booked online. <strong>So:</strong> saved travellers, and a concession list the engine can honour.',
        },
      ],
    },

    // ══ 4 · The bet ═════════════════════════════════════════════════════════
    { t: 'h2', x: '4 · The bet' },
    {
      t: 'quote',
      x: 'The biggest improvement available here is not a prettier screen. It is changing the shape of the funnel - from five pages that each forget the last one, into a single surface that carries your trip with you.',
      by: 'The one sentence every decision was tested against',
    },

    { t: 'h3', x: 'Four rules that settled the arguments' },
    {
      t: 'cards',
      items: [
        { icon: 'layers', title: 'Context is pinned, not remembered', desc: 'Route, date, class and the seat-hold countdown live in a header that survives every step. You are never asked to recall which bus you are booking.' },
        { icon: 'activity', title: 'The button states the outcome', desc: '“Select a seat” → “Continue with 2 seats” → “Review booking” → “Pay ₹644”. Same dock every step; only the label and the payload change.' },
        { icon: 'droplet', title: 'Every rupee on its own line', desc: 'No total without its components. If the app cannot explain a charge, the charge should not exist.' },
        { icon: 'checkCircle', title: 'Prevent the error, don’t report it', desc: 'Picking a ladies-reserved seat pre-fills that passenger as female, rather than failing validation two steps later.' },
      ],
    },

    // ══ 5 · Feature inventory ═══════════════════════════════════════════════
    { t: 'h2', x: '5 · Everything it could have been' },
    {
      t: 'p',
      x: 'Roughly thirty-four surfaces, grouped by where they live. All of the below is in the running prototype; what got cut is named in the next section rather than quietly dropped.',
    },
    {
      t: 'table',
      head: ['Area', 'What lives there'],
      rows: [
        ['<strong>Book</strong>', 'One connected origin-destination control · a date picker capped at the real 30-day window · recent searches · popular Kerala routes · results as cards · filters · sort · in-place date shifting'],
        ['<strong>The funnel</strong>', 'The deck drawn as a bus · a four-item legend · selected seats as removable chips · boarding and dropping points by landmark with real time offsets · one passenger card per seat · saved-passenger autofill · concessions from the engine\'s own list · an itemised review · UPI, card, net banking and wallet'],
        ['<strong>Trips</strong>', 'Upcoming and past · the ticket with a perforation, a mono PNR, seat chips and an on-device QR · cancellation with the refund quoted first'],
        ['<strong>Profile</strong>', 'Saved passengers · payment methods · concessions · seven offline help topics · the cancellation policy table · legal pages'],
        ['<strong>Everywhere</strong>', 'Loading skeletons that match the real row · two distinct empty states · error states with a real retry · a full second theme'],
      ],
    },

    // ══ 6 · Prioritisation ══════════════════════════════════════════════════
    { t: 'h2', x: '6 · What made the cut, and why' },
    {
      t: 'p',
      x: 'One rule decided scope: <strong>does this reduce the amount a passenger has to hold in their head?</strong> Anything that only added surface area lost - which is what killed the four in the bottom-right corner, all of them normal in a travel app.',
    },
    {
      t: 'diagram',
      caption: 'The sort that set scope. Position is judgement, not measurement - the axes are mine, and the point is the reasoning.',
      svg: `<svg viewBox="0 0 720 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feature prioritisation: how much a feature reduces what the passenger must remember, against build cost">
  <line x1="30" y1="238" x2="700" y2="238" class="d-l"/>
  <line x1="366" y1="20" x2="366" y2="424" class="d-l"/>
  <polygon points="700,238 690,233 690,243" class="d-arrow"/>
  <polygon points="366,20 361,30 371,30" class="d-arrow"/>

  <text x="34" y="52" class="d-m">SHIP FIRST</text>
  <circle cx="40" cy="76" r="4" class="d-dot-a"/><text x="54" y="80" class="d-s">Pinned trip header</text>
  <circle cx="40" cy="102" r="4" class="d-dot-a"/><text x="54" y="106" class="d-s">Itemised fare breakdown</text>
  <circle cx="40" cy="128" r="4" class="d-dot-a"/><text x="54" y="132" class="d-s">Button states the outcome</text>
  <circle cx="40" cy="154" r="4" class="d-dot-a"/><text x="54" y="158" class="d-s">Refund quoted before you commit</text>
  <circle cx="40" cy="180" r="4" class="d-dot-a"/><text x="54" y="184" class="d-s">Boarding points as landmarks</text>

  <text x="384" y="52" class="d-m">WORTH THE WORK</text>
  <circle cx="390" cy="76" r="4" class="d-dot-a"/><text x="404" y="80" class="d-s">One mounted surface, five states</text>
  <circle cx="390" cy="102" r="4" class="d-dot-a"/><text x="404" y="106" class="d-s">The deck drawn as a bus</text>
  <circle cx="390" cy="128" r="4" class="d-dot-a"/><text x="404" y="132" class="d-s">A real, expiring seat hold</text>
  <circle cx="390" cy="154" r="4" class="d-dot-a"/><text x="404" y="158" class="d-s">Two authored themes</text>
  <circle cx="390" cy="180" r="4" class="d-dot-a"/><text x="404" y="184" class="d-s">Saved passengers</text>

  <text x="34" y="282" class="d-m">LATER, NOT NEVER</text>
  <circle cx="40" cy="306" r="4" class="d-dot"/><text x="54" y="310" class="d-s">Malayalam localisation</text>
  <circle cx="40" cy="332" r="4" class="d-dot"/><text x="54" y="336" class="d-s">Live Activity for departure</text>
  <circle cx="40" cy="358" r="4" class="d-dot"/><text x="54" y="362" class="d-s">Wallet top-up</text>

  <text x="384" y="282" class="d-m">CUT</text>
  <circle cx="390" cy="306" r="4" class="d-dot"/><text x="404" y="310" class="d-s">Live bus tracking on a map</text>
  <circle cx="390" cy="332" r="4" class="d-dot"/><text x="404" y="336" class="d-s">A loyalty points scheme</text>
  <circle cx="390" cy="358" r="4" class="d-dot"/><text x="404" y="362" class="d-s">In-app seat-neighbour chat</text>
  <circle cx="390" cy="384" r="4" class="d-dot"/><text x="404" y="388" class="d-s">A home-screen offers carousel</text>

  <text x="30" y="452" class="d-m">LOW BUILD COST</text>
  <text x="700" y="452" class="d-m" text-anchor="end">HIGH BUILD COST</text>
  <text x="0" y="14" class="d-m">↑ REDUCES WHAT THE PASSENGER MUST REMEMBER</text>
</svg>`,
    },

    // ══ 7 · The shape ═══════════════════════════════════════════════════════
    { t: 'h2', x: '7 · The shape of the flow' },
    {
      t: 'p',
      x: 'A booking funnel is not a set of screens, it is a shape. The incumbent\'s shape is a stack of pages: each one asks its question, takes its answer, and hands you on having forgotten the trip you are trying to book. You end up holding the state yourself. <em>Which bus was that? Was it the 6:15 or the 6:50?</em>',
    },
    {
      t: 'diagram',
      caption: 'Structurally it is one screen with five states, not five screens. That difference is what makes the funnel feel like momentum rather than paperwork.',
      svg: `<svg viewBox="0 0 720 322" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A five-page booking stack compared with a single mounted surface holding five states">
  <text x="0" y="16" class="d-t">Before · a page per decision</text>
  <rect x="0" y="40" width="200" height="34" rx="8" class="d-box"/>
  <text x="100" y="61" class="d-s" text-anchor="middle">Seats</text>
  <rect x="0" y="86" width="200" height="34" rx="8" class="d-box"/>
  <text x="100" y="107" class="d-s" text-anchor="middle">Boarding point</text>
  <rect x="0" y="132" width="200" height="34" rx="8" class="d-box"/>
  <text x="100" y="153" class="d-s" text-anchor="middle">Passengers</text>
  <rect x="0" y="178" width="200" height="34" rx="8" class="d-box"/>
  <text x="100" y="199" class="d-s" text-anchor="middle">Review</text>
  <rect x="0" y="224" width="200" height="34" rx="8" class="d-box"/>
  <text x="100" y="245" class="d-s" text-anchor="middle">Payment</text>
  <line x1="100" y1="74" x2="100" y2="82" class="d-l"/>
  <line x1="100" y1="120" x2="100" y2="128" class="d-l"/>
  <line x1="100" y1="166" x2="100" y2="174" class="d-l"/>
  <line x1="100" y1="212" x2="100" y2="220" class="d-l"/>
  <text x="0" y="284" class="d-s">Back a step = re-enter.</text>
  <text x="0" y="304" class="d-s">Context is dropped at every hop.</text>

  <line x1="222" y1="148" x2="256" y2="148" class="d-l d-l-a"/>
  <polygon points="264,148 254,143 254,153" class="d-arrow-a"/>

  <text x="290" y="16" class="d-t">After · one mounted surface</text>
  <rect x="290" y="30" width="430" height="238" rx="14" class="d-box-a"/>

  <rect x="306" y="46" width="398" height="38" rx="8" class="d-box"/>
  <text x="318" y="62" class="d-s">TVM → EKM · Today · Super Deluxe</text>
  <text x="318" y="78" class="d-m">SEATS HELD · 7:49 REMAINING</text>

  <rect x="306" y="96" width="74" height="5" rx="2.5" class="d-dot-a"/>
  <rect x="387" y="96" width="74" height="5" rx="2.5" class="d-dot-a"/>
  <rect x="468" y="96" width="74" height="5" rx="2.5" class="d-box"/>
  <rect x="549" y="96" width="74" height="5" rx="2.5" class="d-box"/>
  <rect x="630" y="96" width="74" height="5" rx="2.5" class="d-box"/>

  <rect x="306" y="114" width="398" height="92" rx="10" class="d-box" stroke-dasharray="5 5"/>
  <text x="505" y="152" class="d-s" text-anchor="middle">only this region changes</text>
  <text x="505" y="174" class="d-m" text-anchor="middle">SEATS · POINTS · PASSENGERS · REVIEW · PAY</text>

  <rect x="306" y="218" width="398" height="36" rx="8" class="d-box-a"/>
  <text x="505" y="241" class="d-s" text-anchor="middle">Total ₹644 · Continue</text>

  <text x="290" y="284" class="d-s">Header, progress rail and dock never unmount.</text>
  <text x="290" y="304" class="d-s">Steps crossfade — a slide would say “new page”.</text>
</svg>`,
    },
    {
      t: 'image',
      src: '/ksrtc-assets/funnel.webp',
      alt: 'All five booking steps side by side: seats, boarding and drop, passenger details, review and payment',
      caption: 'The whole funnel, left to right. Notice what does not move: the trip summary, the five-segment progress rail, the total, and the dock.',
    },

    // ══ 8 · User flow ═══════════════════════════════════════════════════════
    { t: 'h2', x: '8 · The core flow, end to end' },
    {
      t: 'p',
      x: 'From opening the app to holding a ticket. Each of the four phases carries one principle, and the orange notes are the recoveries - the places a booking normally goes wrong.',
    },
    {
      t: 'diagram',
      caption: 'Twelve steps. Phase two is the whole redesign: three of those steps happen without the screen ever changing.',
      svg: `<svg viewBox="0 0 720 578" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core booking flow: find the bus, book it, pay, and travel">

  <text x="0" y="12" class="d-m">1 · FIND THE BUS</text>
  <text x="720" y="12" class="d-m" text-anchor="end">ONE CONTROL, TWO ENDS</text>
  <rect x="0" y="24" width="220" height="60" rx="11" class="d-box-a"/>
  <text x="16" y="50" class="d-t">Search</text><text x="16" y="70" class="d-s">From, to, and a date</text>
  <rect x="250" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="50" class="d-t">Results</text><text x="266" y="70" class="d-s">Times first, then fare</text>
  <rect x="500" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="50" class="d-t">A service</text><text x="516" y="70" class="d-s">Seats held for 8 minutes</text>
  <line x1="220" y1="54" x2="244" y2="54" class="d-l"/><polygon points="250,54 242,50 242,58" class="d-arrow"/>
  <line x1="470" y1="54" x2="494" y2="54" class="d-l"/><polygon points="500,54 492,50 492,58" class="d-arrow"/>
  <text x="0" y="106" class="d-s" fill="var(--accent)">↳ change the date and the search re-runs in place — never back to the start</text>
  <path d="M610 84 V118 q0 8 -8 8 H204 q-8 0 -8 8 V160" class="d-l"/>
  <polygon points="196,166 192,158 200,158" class="d-arrow"/>

  <text x="0" y="154" class="d-m">2 · BOOK IT</text>
  <text x="720" y="154" class="d-m" text-anchor="end">ONE SURFACE, FIVE STATES</text>
  <rect x="0" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="192" class="d-t">Seats</text><text x="16" y="212" class="d-s">The deck, drawn as a bus</text>
  <rect x="250" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="192" class="d-t">Boarding &amp; drop</text><text x="266" y="212" class="d-s">Landmarks, with real times</text>
  <rect x="500" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="192" class="d-t">Passengers</text><text x="516" y="212" class="d-s">One card per seat</text>
  <line x1="220" y1="196" x2="244" y2="196" class="d-l"/><polygon points="250,196 242,192 242,200" class="d-arrow"/>
  <line x1="470" y1="196" x2="494" y2="196" class="d-l"/><polygon points="500,196 492,192 492,200" class="d-arrow"/>
  <text x="0" y="248" class="d-s" fill="var(--accent)">↳ a ladies-reserved seat pre-fills that passenger as female — no failed validation later</text>
  <path d="M610 226 V260 q0 8 -8 8 H204 q-8 0 -8 8 V302" class="d-l"/>
  <polygon points="196,308 192,300 200,300" class="d-arrow"/>

  <text x="0" y="296" class="d-m">3 · PAY</text>
  <text x="720" y="296" class="d-m" text-anchor="end">EVERY RUPEE ON ITS OWN LINE</text>
  <rect x="0" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="334" class="d-t">Review</text><text x="16" y="354" class="d-s">The fare, itemised</text>
  <rect x="250" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="334" class="d-t">Payment</text><text x="266" y="354" class="d-s">The button says the amount</text>
  <rect x="500" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="334" class="d-t">Confirmed</text><text x="516" y="354" class="d-s">Straight to the ticket</text>
  <line x1="220" y1="338" x2="244" y2="338" class="d-l"/><polygon points="250,338 242,334 242,342" class="d-arrow"/>
  <line x1="470" y1="338" x2="494" y2="338" class="d-l"/><polygon points="500,338 492,334 492,342" class="d-arrow"/>
  <text x="0" y="390" class="d-s" fill="var(--accent)">↳ the hold runs out → the funnel unwinds to the seat map, nothing charged</text>
  <path d="M610 368 V402 q0 8 -8 8 H204 q-8 0 -8 8 V444" class="d-l"/>
  <polygon points="196,450 192,442 200,442" class="d-arrow"/>

  <text x="0" y="438" class="d-m">4 · TRAVEL</text>
  <text x="720" y="438" class="d-m" text-anchor="end">THE TICKET WORKS OFFLINE</text>
  <rect x="0" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="476" class="d-t">The ticket</text><text x="16" y="496" class="d-s">QR generated on device</text>
  <rect x="250" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="476" class="d-t">Trips</text><text x="266" y="496" class="d-s">Upcoming, then past</text>
  <rect x="500" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="476" class="d-t">Ride, or cancel</text><text x="516" y="496" class="d-s">Both end here</text>
  <line x1="220" y1="480" x2="244" y2="480" class="d-l"/><polygon points="250,480 242,476 242,484" class="d-arrow"/>
  <line x1="470" y1="480" x2="494" y2="480" class="d-l"/><polygon points="500,480 492,476 492,484" class="d-arrow"/>
  <text x="0" y="532" class="d-s" fill="var(--accent)">↳ cancel → the exact refund is quoted before you confirm, with the rule that produced it</text>
  <text x="0" y="558" class="d-s" fill="var(--accent)">↻ book again from a past trip — the route comes back prefilled</text>
</svg>`,
    },

    // ══ 9 · Search ══════════════════════════════════════════════════════════
    { t: 'h2', x: '9 · Search, and what comes back' },
    {
      t: 'p',
      x: 'Origin and destination are not two fields but two ends of <em>one</em> connected control, told apart by marker shape rather than colour. The date defaults to today and refuses anything past the real 30-day window - a picker that offers a date the system cannot serve is just a slower error message.',
    },
    {
      t: 'p',
      x: 'Results are cards, ordered by what a passenger actually scans for: departure and arrival first, then class, then fare - set in a monospaced face so a scrolling column of prices stays readable. Scarcity is the one place a row raises its voice.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/search.webp',
      alt: 'The home search screen, the results list, and the filter sheet',
      caption: 'Home, results, and filters. Recent searches and popular Kerala routes make the common case one tap; filters and sort re-run in place.',
    },

    // ══ 10 · Seat map ═══════════════════════════════════════════════════════
    { t: 'h2', x: '10 · The seat map' },
    {
      t: 'p',
      x: 'This is where a bus booking app is won or lost, and it is the surface that travels worst from web to phone. So the deck is drawn as the bus itself - driver\'s cabin at the top, aisle down the middle. Passengers reason about seats spatially; an abstract grid is a step backwards from a physical thing everybody already understands.',
    },
    {
      t: 'p',
      x: 'Seats are 40pt targets. Only the selected state takes the brand colour, because on this screen the colours <strong>are</strong> the information. Kerala reserves a quarter of seats for women, allocated as whole rows from the front - which is how the block appears on a real bus, so that is how it is drawn.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/seats.webp',
      alt: 'The seat map beside the boarding and dropping point step',
      caption: 'The deck, and the step that follows it. Boarding points are landmarks with real time offsets, not addresses - because that is how you find a bus.',
    },
    {
      t: 'p',
      x: 'The least accessible surface got the most accessibility work. A seat grid is close to meaningless to a screen reader, since everything a sighted user reads comes from position and colour - so each seat spells all of it out, and the five-segment progress rail collapses to one spoken element: <em>“Step 3 of 5: Passenger details.”</em>',
    },

    // ══ 11 · Money ══════════════════════════════════════════════════════════
    { t: 'h2', x: '11 · Being honest about money' },
    {
      t: 'p',
      x: 'Two screens exist purely because the incumbent leaves the passenger guessing. <strong>The review</strong> itemises every component - base fare per passenger, ladies-row premium, reservation charge, concession - instead of presenting a total and asking you to trust it. <strong>The cancellation sheet</strong> quotes the exact refund <em>before</em> you confirm, next to the rule that produced it.',
    },
    {
      t: 'p',
      x: 'That refund figure is computed from the same policy object the system uses to actually pay out, so the number quoted and the number paid cannot drift apart. A quote you can\'t trust is worse than no quote at all.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/money.webp',
      alt: 'The review step with an itemised fare, the payment step, and the cancellation sheet quoting a refund',
      caption: 'Review, payment, and the cancellation quote: fare paid, the charge, and what you actually get back — with the rule underneath it.',
    },
    {
      t: 'p',
      x: 'The saved payment screens deliberately collect less than they could - a UPI handle, a bank name, a card\'s last four digits, and nothing more. There is no payment rail behind this app, so asking for a full card number, expiry or CVV would mean collecting a real credential in order to do nothing with it. The payment step says so on screen.',
    },

    // ══ 12 · After ══════════════════════════════════════════════════════════
    { t: 'h2', x: '12 · The ticket, and everything after' },
    {
      t: 'p',
      x: 'A booking flow is only useful if the ticket survives it. The ticket is built to read as a ticket - a perforation, a mono PNR, seat chips, and a QR generated on the device rather than fetched, because an e-ticket that needs a connection to render is not much of an e-ticket on a bus in the Western Ghats.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/after.webp',
      alt: 'The My Trips list, the ticket, and the profile screen',
      caption: 'Trips, the ticket, and Profile. Row subtitles are computed counts, so a row tells you whether there is anything behind it before you tap.',
    },

    // ══ 13 · Design system ══════════════════════════════════════════════════
    { t: 'h2', x: '13 · The design system' },
    {
      t: 'p',
      x: 'A public-service app needs to look institutional without looking neglected. Rather than invent a language I built on <strong>Uber\'s Base</strong>, transcribing its primitives into Swift and layering semantic tokens on top. Views never touch a hex value; they read <code>theme.contentPrimary</code>. That indirection is what makes a second theme possible at all.',
    },
    {
      t: 'stats',
      items: [
        { v: '99', l: 'colour primitives' },
        { v: '47', l: 'semantic tokens × 2 themes' },
        { v: '22', l: 'type tokens' },
        { v: '11', l: 'illustrations, drawn in SwiftUI' },
      ],
    },
    { t: 'h3', x: 'Two deliberate departures from Base' },
    {
      t: 'cards',
      items: [
        { icon: 'droplet', title: 'A teal ramp Base doesn’t have', desc: 'Base\'s accent is Uber blue, which would make this look like Uber. Teal gives it an identity — and gives the illustrations somewhere to put colour that isn\'t already spoken for by status.' },
        { icon: 'layers', title: 'Rounded, where Base is square', desc: 'Three fixed tiers — surface 20, control 14, inner 10. Textbook concentric rounding drives inner corners down to about 4 at this padding, at which point the nesting stops reading as intentional.' },
      ],
    },
    {
      t: 'p',
      x: 'Base ships Uber Move, which cannot be redistributed. The substitute is SF Pro pushed on the two levers that carry that family\'s character: a rounded display cut with tightened tracking at large sizes, and strict weight discipline - 400 body, 500 label, 700 heading. The sizes and line heights are the real Base values. The Display family is rationed to <strong>one moment per screen</strong>, and the rule is enforced in the source.',
    },

    // ══ 14 · States ═════════════════════════════════════════════════════════
    { t: 'h2', x: '14 · Loading, empty and error are designed too' },
    {
      t: 'p',
      x: 'The mock repository introduces real latency and real failures rather than returning instantly, so these states get exercised during development instead of being decorative. Skeletons mirror the real row\'s chrome and padding exactly, so the list does not reflow when results land - an earlier version used different padding and visibly jumped.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/states.webp',
      alt: 'The results screen loading, in error, and empty, plus the empty trips list',
      caption: 'Loading, error, empty, and a trips list with nothing in it. Results has two distinct empty states — “no service on this route” and “your filters excluded everything” are different problems with different fixes.',
    },

    // ══ 15 · Dark ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '15 · Dark mode, authored not inverted' },
    {
      t: 'p',
      x: 'Base\'s dark theme is not a mechanical inversion - it has a separate grey ramp, and tokens like the modal scrim step from 50% to 70% opacity rather than flipping. So the two themes are authored independently as two instances of the same 47-property struct, and every view gets both for free by reading semantic tokens.',
    },
    {
      t: 'image',
      src: '/ksrtc-assets/dark.webp',
      alt: 'Home, the seat map, review, the ticket and trips in dark mode',
      caption: 'The same tokens on a separate ramp. The seat states have to keep their meaning in both themes, which is the real test.',
    },

    // ══ 16 · Trade-offs ═════════════════════════════════════════════════════
    { t: 'h2', x: '16 · The trade-offs' },
    {
      t: 'p',
      x: 'Every one of these cost something. Naming the cost is the point.',
    },
    {
      t: 'table',
      head: ['What I chose', 'What it cost', 'Why I took it anyway'],
      rows: [
        [
          '<strong>One mounted surface instead of five pages.</strong>',
          'Every step has to fit one layout. The seat map wants full height and spends it fighting a pinned header and dock.',
          'Losing your place is worse than losing a few points of vertical space. The header is the thing the old flow was missing.',
        ],
        [
          '<strong>Built on Uber Base, not a new language.</strong>',
          'The app inherits somebody else\'s opinions, and Base is square where I wanted round.',
          'A public service should look maintained, not authored. A documented system gets there faster and stays consistent under someone else\'s hands.',
        ],
        [
          '<strong>A visible, expiring seat hold.</strong>',
          'A countdown is pressure, and manufactured pressure is a dark pattern.',
          'The hold is real — the seats genuinely release, and the funnel unwinds rather than letting you pay for seats you no longer have. Hiding a real constraint is worse than showing it.',
        ],
        [
          '<strong>Concessions driven off the booking engine\'s own list.</strong>',
          'The app cannot advertise discounts that exist on paper but not online.',
          'Offering a discount you can\'t apply is the incumbent\'s actual bug. Better to show four honest options than eight hopeful ones.',
        ],
        [
          '<strong>Payment methods store a handle, not a credential.</strong>',
          'No realistic card form to demo, which costs the prototype some plausibility.',
          'There is no payment rail behind this. Collecting a real card number to do nothing with it is the worst of both worlds.',
        ],
        [
          '<strong>The refund quote comes from the policy object that issues it.</strong>',
          'Slower than hardcoding the number into the sheet.',
          'A quote that can drift from the payout is worse than no quote. Sharing the source is the only way they cannot disagree.',
        ],
      ],
    },

    // ══ 17 · Measurement ════════════════════════════════════════════════════
    { t: 'h2', x: '17 · How I\'d know it worked' },
    {
      t: 'p',
      x: 'Nothing has shipped, so there are no results to report and I am not going to invent any. This is the plan I would hold it to.',
    },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['<strong>North star</strong>', 'Bookings completed per search started - and specifically, abandonment between choosing a seat and paying, which is where a five-page funnel bleeds.'],
        ['<strong>The shape test</strong>', 'Back-navigation rate. On five pages, going back is the recovery mechanism; on one surface it should become rare. If it doesn\'t drop, the central claim of this redesign is wrong.'],
        ['<strong>Money</strong>', 'Support contacts containing “charge”, “why” or “refund”. The itemised fare and the pre-quoted refund exist to make those contacts unnecessary.'],
        ['<strong>Accessibility</strong>', 'Seat selection completed with VoiceOver on. The seat map is the hardest surface in the app and the one most likely to quietly exclude people.'],
        ['<strong>Guardrail</strong>', 'Hold expiries per booking. A hold that keeps running out means eight minutes is the wrong number, not that users are slow.'],
        ['<strong>The first experiment</strong>', 'Five pages against one surface, with the same visual design on both, so shape is the only variable. Everything here rests on that being the thing that matters — and it is the easiest claim to falsify.'],
      ],
    },

    // ══ 18 · Scope ══════════════════════════════════════════════════════════
    { t: 'h2', x: '18 · What isn\'t built' },
    {
      t: 'p',
      x: '<strong>Malayalam, properly.</strong> Stop names already carry their Malayalam forms and the picker already searches them; full localisation is the obvious next step for a Kerala-first service. <strong>A real reservation backend</strong> - the repository is already an interface with two implementations, mock and HTTP, so pointing the same UI at a live host is a launch argument rather than a rewrite. <strong>Live Activities</strong> for the seat hold and the boarding-point offset. And most importantly: <strong>validation with people who actually book KSRTC monthly</strong>, because every claim in section 3 is a designer\'s reading of a flow, not a finding.',
    },
    {
      t: 'stats',
      items: [
        { v: '~34', l: 'screens and surfaces' },
        { v: '45', l: 'Swift files' },
        { v: '~9,000', l: 'lines of Swift' },
        { v: '0', l: 'third-party UI libraries' },
      ],
    },

    { t: 'h3', x: 'Sources' },
    {
      t: 'list',
      items: [
        'CARE Ratings press release on the Kerala State Road Transport Corporation, April 2025 - fleet strength, depot count and FY24 revenue.',
        'KSRTC\'s own published reservation and cancellation rules - the 30-day booking window, the ladies-seat quota and the refund slabs the prototype implements.',
        'The live KSRTC online reservation flow, walked end to end in 2026.',
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'The interesting work in a redesign like this is not visual. It is noticing that the shape of the funnel is doing more damage than any amount of styling - and then having the range to actually build the alternative and find out whether it is true.',
      by: 'Design intent, KSRTC Booking',
    },
  ],
});
