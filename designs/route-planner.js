// ============================================================================
//  Route Planner — A Day of Deliveries on One Surface
//  Mobile case study
//
//  Same structure as the Oppam and KSRTC entries: problem, research, findings,
//  the bet, scope, the flow, the screens, the trade-offs, and how success
//  would be measured. Short text — the figures carry it.
//
//  Every figure is a screenshot of the running SwiftUI app, composed by
//  tools/rp_figures.sh. Individual captures live in
//  route-planner-assets/screens/. The app was designed dark-first, but the
//  figures use the LIGHT captures — they sit in a white reading column, and a
//  wall of near-black punches a hole in the page. Dark appears in the theme
//  figure only. Self-directed exercise: no client, no research programme —
//  the copy says so.
// ============================================================================

BODY('route-planner', {
  blocks: [

    // ── Hero ────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/route-planner-assets/hero.webp',
      alt: 'Five Route Planner screens: home, the route overview, driving, arrival and the end-of-day summary',
      caption: 'The whole day: what today is, what the route looks like, where you are now, the stop in front of you, and how it went.',
    },

    { t: 'h3', x: 'A self-directed exercise, and every screen is real.' },
    {
      t: 'p',
      x: 'Nobody commissioned this and no delivery company was involved. There was no research programme and no production data - the arguments below are design reasoning, not findings. <strong>Every image is a screenshot of the running app.</strong> The map pans and zooms, the route line draws itself, stops re-sequence under your finger, validation really rejects rows, and completing a stop advances the day.',
    },

    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Sole designer and engineer - end to end'],
        ['Type', 'Self-directed product exercise'],
        ['Platform', 'Native iOS - iPhone, <strong>dark-first</strong>'],
        ['Built with', 'SwiftUI, a hand-drawn vector map, seeded mock data - 44 files, ~6,800 lines'],
        ['Notably', 'No MapKit. The map is drawn from scratch into a SwiftUI Canvas.'],
        ['Status', 'Runnable prototype - no backend, no network, no accounts'],
      ],
    },

    // ══ 1 · Problem ═════════════════════════════════════════════════════════
    { t: 'h2', x: '1 · The problem' },
    {
      t: 'p',
      x: 'Consumer navigation is built around one question: <em>how do I get to this one place?</em> A delivery driver\'s question is different and much larger: <em>what is the best order for these 120 places, and how do I prove I did each one?</em>',
    },
    {
      t: 'p',
      x: 'The gap between those two questions is where a working day leaks - into a spreadsheet, a chat thread, a camera roll and a notes app that never talk to each other. And the last mile is where the money is: it has grown to <strong>about 53% of total shipping cost</strong>, up from 41% in 2018.',
    },
    {
      t: 'stats',
      items: [
        { v: '53%', l: 'of shipping cost is now the last mile (up from 41% in 2018)' },
        { v: '~8%', l: 'of last-mile deliveries fail on the first attempt' },
        { v: '180+', l: 'stops in a busy driver’s day' },
      ],
    },

    // ══ 2 · Research ════════════════════════════════════════════════════════
    { t: 'h2', x: '2 · What I did instead of guessing' },
    {
      t: 'p',
      x: 'This one has the thinnest evidence base of anything on this site, and I would rather say so than imply otherwise: <strong>no drivers were interviewed and no depot was visited.</strong> What there is:',
    },
    {
      t: 'list',
      items: [
        '<strong>Published last-mile figures</strong> - cost share, first-attempt failure rates, and what those failures are actually caused by. Two numbers did most of the design work: <strong>22%</strong> of failed deliveries trace back to inaccurate address data, and <strong>36%</strong> to nobody being home.',
        '<strong>A walk through the consumer navigation apps</strong> a driver would otherwise use, noting every point where a single-destination model breaks on a 120-stop day.',
        '<strong>Building it, and then using it</strong> - which is where most of the real corrections came from. A slide-to-confirm, a list that re-sequences under a finger and a map you can throw around cannot be judged from a static frame.',
      ],
    },
    {
      t: 'p',
      x: 'So treat this as a design argument that has been built and pressure-tested by its author, not as a validated product. The measurement plan near the end is what I would do about that.',
    },

    // ══ 3 · Findings ════════════════════════════════════════════════════════
    { t: 'h2', x: '3 · What that pointed at' },
    {
      t: 'cards',
      items: [
        {
          icon: 'layers',
          title: 'The day leaks between apps',
          desc: 'Addresses in a spreadsheet, exceptions in chat, proof in the camera roll. <strong>So:</strong> put the whole day on one surface, from raw addresses to a signed-off recap.',
        },
        {
          icon: 'checkCircle',
          title: 'Bad addresses are a design problem',
          desc: 'Nearly a quarter of failed deliveries start as bad data. <strong>So:</strong> import is two steps — bring the addresses in, then review what the app found wrong before any of it becomes a stop.',
        },
        {
          icon: 'activity',
          title: 'Failure is normal, not exceptional',
          desc: 'Around one delivery in twelve fails first time. <strong>So:</strong> “Couldn’t deliver” sits at equal reach to “Deliver”, not behind the happy path.',
        },
        {
          icon: 'smartphone',
          title: 'One hand, full brightness, in a van',
          desc: 'The phone is on a windscreen mount and the other hand is holding a parcel. <strong>So:</strong> dark-first, one loud action per screen, and confirmations you can feel.',
        },
      ],
    },

    // ══ 4 · The bet ═════════════════════════════════════════════════════════
    { t: 'h2', x: '4 · The bet' },
    {
      t: 'quote',
      x: 'Put the entire day on one surface - from a raw list of addresses to a signed-off recap - and the app stops being one of the five things a driver is juggling.',
      by: 'The one sentence every decision was tested against',
    },

    { t: 'h3', x: 'Four rules that settled the arguments' },
    {
      t: 'cards',
      items: [
        { icon: 'smartphone', title: 'One thumb, one loud action', desc: 'Each screen commits to a single primary action pinned to the bottom — Import Route, Start Route, I’ve Arrived, Finish Day. Everything else is quieter and further up.' },
        { icon: 'moon', title: 'Dark first, light adaptive', desc: 'Designed in dark and adapted to light rather than the other way round. A phone on a windscreen mount lives at high brightness, and the map is the screen.' },
        { icon: 'checkCircle', title: 'Nothing enters the route unchecked', desc: 'Import is deliberately two moves: bring addresses in, then read what is wrong with them before any of it becomes a stop.' },
        { icon: 'zap', title: 'Physical confirmation', desc: 'Actions that end a stop are gestures with weight — a slide, not a tap — each paired with a specific haptic, so the phone can confirm without being looked at.' },
      ],
    },

    // ══ 5 · Feature inventory ═══════════════════════════════════════════════
    { t: 'h2', x: '5 · Everything it could have been' },
    {
      t: 'p',
      x: 'Nine screens, grouped by the part of the day they belong to. All of it is in the running prototype; what got cut is named next rather than quietly dropped.',
    },
    {
      t: 'table',
      head: ['Part of the day', 'What lives there'],
      rows: [
        ['<strong>Loading it</strong>', 'Five import methods — CSV, dictation, pasted text, a camera scan of a label, or typed by hand · a validation pass that separates warnings from errors · a review screen that leads with what is broken'],
        ['<strong>Ordering it</strong>', 'A greedy nearest-neighbour optimise from the depot · the saving stated in hours and kilometres · a drag-to-reorder list that re-sequences instantly · the route drawn as an animatable line'],
        ['<strong>Running it</strong>', 'A hand-drawn map that pans and zooms · the next stop as a card with customer, address and ETA · call, message, notes and skip in reach · an arrival sheet with both outcomes at equal weight · optional photo, signature and note · slide-to-confirm'],
        ['<strong>Closing it</strong>', 'A recap that opens itself after the last stop · delivered and failed side by side · distance, time on road, fuel and time saved · seven days of history as a chart · a deliberately small settings screen'],
      ],
    },

    // ══ 6 · Prioritisation ══════════════════════════════════════════════════
    { t: 'h2', x: '6 · What made the cut, and why' },
    {
      t: 'p',
      x: 'One rule decided scope: <strong>does this help finish the day?</strong> Not “does it look impressive in a demo” — which is exactly what killed the four in the bottom-right corner, all of them standard in fleet software.',
    },
    {
      t: 'diagram',
      caption: 'The sort that set scope. Position is judgement, not measurement — the axes are mine, and the point is the reasoning.',
      svg: `<svg viewBox="0 0 720 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feature prioritisation: how much a feature helps finish the day, against build cost">
  <line x1="30" y1="238" x2="700" y2="238" class="d-l"/>
  <line x1="366" y1="20" x2="366" y2="424" class="d-l"/>
  <polygon points="700,238 690,233 690,243" class="d-arrow"/>
  <polygon points="366,20 361,30 371,30" class="d-arrow"/>

  <text x="34" y="52" class="d-m">SHIP FIRST</text>
  <circle cx="40" cy="76" r="4" class="d-dot-a"/><text x="54" y="80" class="d-s">One loud action per screen</text>
  <circle cx="40" cy="102" r="4" class="d-dot-a"/><text x="54" y="106" class="d-s">Failure at equal reach</text>
  <circle cx="40" cy="128" r="4" class="d-dot-a"/><text x="54" y="132" class="d-s">Optional proof, in capture order</text>
  <circle cx="40" cy="154" r="4" class="d-dot-a"/><text x="54" y="158" class="d-s">Saving stated in hours and km</text>
  <circle cx="40" cy="180" r="4" class="d-dot-a"/><text x="54" y="184" class="d-s">Slide to confirm</text>

  <text x="384" y="52" class="d-m">WORTH THE WORK</text>
  <circle cx="390" cy="76" r="4" class="d-dot-a"/><text x="404" y="80" class="d-s">Validation before import</text>
  <circle cx="390" cy="102" r="4" class="d-dot-a"/><text x="404" y="106" class="d-s">Drag to re-sequence</text>
  <circle cx="390" cy="128" r="4" class="d-dot-a"/><text x="404" y="132" class="d-s">A map drawn from scratch</text>
  <circle cx="390" cy="154" r="4" class="d-dot-a"/><text x="404" y="158" class="d-s">Five ways to get stops in</text>
  <circle cx="390" cy="180" r="4" class="d-dot-a"/><text x="404" y="184" class="d-s">Two full appearances</text>

  <text x="34" y="282" class="d-m">LATER, NOT NEVER</text>
  <circle cx="40" cy="306" r="4" class="d-dot"/><text x="54" y="310" class="d-s">Multi-day planning</text>
  <circle cx="40" cy="332" r="4" class="d-dot"/><text x="54" y="336" class="d-s">Customer ETA notifications</text>
  <circle cx="40" cy="358" r="4" class="d-dot"/><text x="54" y="362" class="d-s">Offline queue and sync</text>

  <text x="384" y="282" class="d-m">CUT</text>
  <circle cx="390" cy="306" r="4" class="d-dot"/><text x="404" y="310" class="d-s">A live fleet-tracking dashboard</text>
  <circle cx="390" cy="332" r="4" class="d-dot"/><text x="404" y="336" class="d-s">Driver leaderboards and scores</text>
  <circle cx="390" cy="358" r="4" class="d-dot"/><text x="404" y="362" class="d-s">In-app chat with dispatch</text>
  <circle cx="390" cy="384" r="4" class="d-dot"/><text x="404" y="388" class="d-s">Turn-by-turn voice guidance</text>

  <text x="30" y="452" class="d-m">LOW BUILD COST</text>
  <text x="700" y="452" class="d-m" text-anchor="end">HIGH BUILD COST</text>
  <text x="0" y="14" class="d-m">↑ HELPS FINISH THE DAY</text>
</svg>`,
    },

    // ══ 7 · Flow ════════════════════════════════════════════════════════════
    { t: 'h2', x: '7 · The core flow, end to end' },
    {
      t: 'p',
      x: 'From a list of addresses to a finished day. Each phase carries one principle, and the orange notes are the places a delivery day normally goes wrong.',
    },
    {
      t: 'diagram',
      caption: 'Twelve steps and one surface. The only screen that is not the map is the one where the day gets loaded.',
      svg: `<svg viewBox="0 0 720 578" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core flow: load the day, order it, run it, close it">

  <text x="0" y="12" class="d-m">1 · LOAD THE DAY</text>
  <text x="720" y="12" class="d-m" text-anchor="end">NOTHING ENTERS UNCHECKED</text>
  <rect x="0" y="24" width="220" height="60" rx="11" class="d-box-a"/>
  <text x="16" y="50" class="d-t">Import</text><text x="16" y="70" class="d-s">CSV, voice, paste, scan, type</text>
  <rect x="250" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="50" class="d-t">Validate</text><text x="266" y="70" class="d-s">Warnings vs errors</text>
  <rect x="500" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="50" class="d-t">Review</text><text x="516" y="70" class="d-s">Leads with what is broken</text>
  <line x1="220" y1="54" x2="244" y2="54" class="d-l"/><polygon points="250,54 242,50 242,58" class="d-arrow"/>
  <line x1="470" y1="54" x2="494" y2="54" class="d-l"/><polygon points="500,54 492,50 492,58" class="d-arrow"/>
  <text x="0" y="106" class="d-s" fill="var(--accent)">↳ errors can’t be added, warnings can — the button says how many, and names the skipped row</text>
  <path d="M610 84 V118 q0 8 -8 8 H204 q-8 0 -8 8 V160" class="d-l"/>
  <polygon points="196,166 192,158 200,158" class="d-arrow"/>

  <text x="0" y="154" class="d-m">2 · ORDER IT</text>
  <text x="720" y="154" class="d-m" text-anchor="end">THE ALGORITHM IS A SUGGESTION</text>
  <rect x="0" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="192" class="d-t">Optimise</text><text x="16" y="212" class="d-s">Saving in hours and km</text>
  <rect x="250" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="192" class="d-t">Overview</text><text x="266" y="212" class="d-s">The line draws itself</text>
  <rect x="500" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="192" class="d-t">Reorder</text><text x="516" y="212" class="d-s">Drag, and it re-sequences</text>
  <line x1="220" y1="196" x2="244" y2="196" class="d-l"/><polygon points="250,196 242,192 242,200" class="d-arrow"/>
  <line x1="470" y1="196" x2="494" y2="196" class="d-l"/><polygon points="500,196 492,192 492,200" class="d-arrow"/>
  <text x="0" y="248" class="d-s" fill="var(--accent)">↳ a driver who knows one gate closes at noon can overrule the optimiser without leaving the screen</text>
  <path d="M610 226 V260 q0 8 -8 8 H204 q-8 0 -8 8 V302" class="d-l"/>
  <polygon points="196,308 192,300 200,300" class="d-arrow"/>

  <text x="0" y="296" class="d-m">3 · RUN IT</text>
  <text x="720" y="296" class="d-m" text-anchor="end">ONE THUMB, ONE LOUD ACTION</text>
  <rect x="0" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="334" class="d-t">Drive</text><text x="16" y="354" class="d-s">Where you are, who is next</text>
  <rect x="250" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="334" class="d-t">Arrive</text><text x="266" y="354" class="d-s">Both outcomes, equal reach</text>
  <rect x="500" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="334" class="d-t">Prove it</text><text x="516" y="354" class="d-s">All optional, in that order</text>
  <line x1="220" y1="338" x2="244" y2="338" class="d-l"/><polygon points="250,338 242,334 242,342" class="d-arrow"/>
  <line x1="470" y1="338" x2="494" y2="338" class="d-l"/><polygon points="500,338 492,334 492,342" class="d-arrow"/>
  <text x="0" y="390" class="d-s" fill="var(--accent)">↳ couldn’t deliver is not an error state — about one first attempt in twelve ends here</text>
  <path d="M610 368 V402 q0 8 -8 8 H204 q-8 0 -8 8 V444" class="d-l"/>
  <polygon points="196,450 192,442 200,442" class="d-arrow"/>

  <text x="0" y="438" class="d-m">4 · CLOSE IT</text>
  <text x="720" y="438" class="d-m" text-anchor="end">A DAY IS NOT ONLY ITS SUCCESSES</text>
  <rect x="0" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="476" class="d-t">Slide to finish</text><text x="16" y="496" class="d-s">The one irreversible action</text>
  <rect x="250" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="476" class="d-t">Summary</text><text x="266" y="496" class="d-s">Delivered and failed, same size</text>
  <rect x="500" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="476" class="d-t">History</text><text x="516" y="496" class="d-s">The last seven days</text>
  <line x1="220" y1="480" x2="244" y2="480" class="d-l"/><polygon points="250,480 242,476 242,484" class="d-arrow"/>
  <line x1="470" y1="480" x2="494" y2="480" class="d-l"/><polygon points="500,480 492,476 492,484" class="d-arrow"/>
  <text x="0" y="532" class="d-s" fill="var(--accent)">↳ the recap opens itself after the last stop — nobody has to remember to close the day</text>
  <text x="0" y="558" class="d-s" fill="var(--accent)">↻ tomorrow starts here: “was today unusual?” is a question history can answer</text>
</svg>`,
    },

    // ══ 8 · Import ══════════════════════════════════════════════════════════
    { t: 'h2', x: '8 · Getting the stops in' },
    {
      t: 'p',
      x: 'Addresses arrive in whatever form the sender had to hand, so the app takes five: a CSV from a dispatcher, dictation, a pasted block of text, a camera scan of a label, or one typed by hand. The point of offering five is not completeness - it is that the fastest one changes depending on whether you have 120 stops or one.',
    },
    {
      t: 'p',
      x: 'The interesting screen is the second one. The summary leads with the count that matters - <strong>what is broken</strong> - rather than a reassuring total. Warnings like “missing unit number” are still addable; errors like “address not found” are not, and the button says so plainly: <em>Add 13 stops to route</em>, with the skipped row spelled out underneath.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/import.webp',
      alt: 'Import Route, the validation review screen, and the drag-to-reorder list',
      caption: 'Import → review → reorder. The route only exists after the middle screen has been read. The prototype seeds real failures on purpose — an import screen that only ever succeeds has not been designed.',
    },
    {
      t: 'p',
      x: 'Ordering runs a greedy nearest-neighbour pass from the depot and reports the result as a plain-language saving rather than a score - hours and kilometres, the two units a day is actually measured in. And optimisation is a <em>suggestion</em>: Reorder sits right next to it, and dragging a stop re-sequences the route instantly.',
    },

    // ══ 9 · Driving ═════════════════════════════════════════════════════════
    { t: 'h2', x: '9 · Driving, arriving, proving' },
    {
      t: 'p',
      x: 'Navigation strips back to what is legible at a glance: where you are on the line, who is next, and one green action. The stop card carries the customer, the address, the ETA and four small utilities - call, message, notes, skip - because the alternative to putting them here is another app.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/drive.webp',
      alt: 'The route overview, active navigation, and the arrival sheet',
      caption: 'Overview → driving → arrived. The same map carries all three; only the sheet on top of it changes. Arrival offers both outcomes at equal reach.',
    },
    {
      t: 'p',
      x: 'Photo, signature and note are all marked <em>optional</em>, in the order they are easiest to capture. That ordering is the argument: the app should never block a driver from closing a stop because a customer would not sign. The stop is finally closed by sliding rather than tapping - the cheapest way to make an irreversible action impossible to trigger with a stray thumb, paired with a heavy impact so the confirmation lands without a glance.',
    },

    // ══ 10 · After ══════════════════════════════════════════════════════════
    { t: 'h2', x: '10 · After the last stop' },
    {
      t: 'p',
      x: 'Completing the final stop moves the app to a recap on its own, without asking. It leads with delivered and failed side by side at the same size - a day is not summarised honestly by its successes alone - then distance, time on road, fuel and time saved. History keeps the last seven working days, so <em>“was today unusual?”</em> is answerable.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/after.webp',
      alt: 'The daily summary, history, and settings screens',
      caption: 'Summary, history, settings. Settings is deliberately small: vehicle, navigation preference, and what to optimise for.',
    },

    // ══ 11 · Design system ══════════════════════════════════════════════════
    { t: 'h2', x: '11 · The design system' },
    {
      t: 'cards',
      items: [
        { icon: 'type', title: 'SF Pro Rounded throughout', desc: 'The rounded system face at system sizes, so Dynamic Type keeps working. Rounded terminals keep a dense, data-heavy screen from reading as industrial.' },
        { icon: 'layers', title: 'Continuous corners, 10–34pt', desc: 'Squircles rather than rounded rectangles at every level: 10 for chips, 16 standard, 22 and 28 for cards, 34 for sheets, a full pill for buttons.' },
        { icon: 'slider', title: '4pt spacing, 20pt gutter', desc: 'One 4pt scale with a 20pt screen gutter. Primary buttons are 56pt tall, chips 38pt, and no hit target goes below 44pt.' },
        { icon: 'droplet', title: 'One shadow, one glow', desc: 'Cards get a single soft floating shadow; the accent glow is reserved for live pins and the primary button — so “glowing” always means “act on this”.' },
      ],
    },
    {
      t: 'p',
      x: 'Motion is seven named curves, defined once and referenced everywhere. Naming them is what keeps a bottom sheet from opening with a counter\'s bounce.',
    },
    {
      t: 'code',
      file: 'DesignSystem/Motion.swift',
      lang: 'swift',
      x: `/// Named animation curves so motion feels consistent and physical across the app.
enum Motion {
    /// Standard content transition — quick, lightly springy.
    static let standard = Animation.spring(response: 0.42, dampingFraction: 0.82)
    /// Snappy UI feedback (chips, toggles, small state).
    static let snappy = Animation.spring(response: 0.30, dampingFraction: 0.78)
    /// Bouncy, playful — celebrations, counters.
    static let bouncy = Animation.spring(response: 0.5, dampingFraction: 0.62)
    /// Smooth, heavy — bottom sheets and large surfaces.
    static let sheet = Animation.spring(response: 0.5, dampingFraction: 0.86)
    /// Interactive drag-follow (no bounce).
    static let interactive = Animation.interactiveSpring(response: 0.28,
                                                         dampingFraction: 0.86,
                                                         blendDuration: 0.1)
    /// Slow ambient loops (map pulse, gradients).
    static let ambient = Animation.easeInOut(duration: 2.4)
    /// Gentle ease for opacity crossfades.
    static let fade = Animation.easeInOut(duration: 0.25)
}`,
    },
    {
      t: 'p',
      x: 'Haptics follow the same discipline. A light impact acknowledges any button; a soft impact confirms a stop dropped into place; a medium impact marks a real change to the route, like skipping; and the success notification fires in exactly one situation - the end of a stop, delivered or failed.',
    },

    // ══ 12 · Appearances ════════════════════════════════════════════════════
    { t: 'h2', x: '12 · One system, two appearances' },
    {
      t: 'p',
      x: 'Every colour is a semantic token that resolves per appearance, so light mode is a re-render rather than a second design. The background is <code>#0A0B0E</code> in dark and <code>#F5F7FA</code> in light - near-black with a hint of blue, and a grey-blue rather than pure white, because a pure-white map at full brightness is the one thing guaranteed to be unreadable outdoors.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/theme.webp',
      alt: 'Home and navigation shown in light and dark side by side',
      caption: 'The same two screens in both appearances. The map, the route line and the accent survive the switch; only the surfaces move.',
    },

    // ══ 13 · Trade-offs ═════════════════════════════════════════════════════
    { t: 'h2', x: '13 · The trade-offs' },
    {
      t: 'p',
      x: 'Every one of these cost something. Naming the cost is the point.',
    },
    {
      t: 'table',
      head: ['What I chose', 'What it cost', 'Why I took it anyway'],
      rows: [
        [
          '<strong>Drawing the map instead of embedding one.</strong>',
          'No real geocoding, no real roads, no traffic. The map is a convincing fiction, and in a shipped product it would have to go.',
          'The map <em>is</em> the art direction here, and I needed the route line to be an animatable Shape and the pins to be ordinary SwiftUI views. An embedded map would have made this look like every other delivery app and fought me on all three.',
        ],
        [
          '<strong>Import is two steps, not one.</strong>',
          'An extra screen between a driver and their route, every single morning.',
          'Nearly a quarter of failed deliveries start as bad address data. Catching that costs one screen; discovering it costs a return trip.',
        ],
        [
          '<strong>Slide to confirm, not tap.</strong>',
          'Slower than a tap, and unusual enough to need learning once.',
          'It is the only irreversible action in the app, performed one-handed while holding parcels. A stray thumb should not be able to close a stop.',
        ],
        [
          '<strong>Proof is optional.</strong>',
          'Some real operations contractually require a signature, and this design would not satisfy them without a setting.',
          'The app should never block a driver from closing a stop because a customer would not sign. Capture what you can, in the order it is easiest to capture, and move.',
        ],
        [
          '<strong>Dark-first.</strong>',
          'Light mode is an adaptation and quietly shows it in a couple of places.',
          'The phone lives on a windscreen mount at full brightness with the map filling it. Designing light-first and inverting would have produced a worse version of the mode that actually gets used.',
        ],
        [
          '<strong>A greedy nearest-neighbour pass, not a real solver.</strong>',
          'It is not optimal. A proper vehicle-routing solver would beat it, sometimes badly.',
          'It runs instantly on-device across 120 stops, and the design question was never “how good is the suggestion” — it was whether a driver would trust one and still feel free to overrule it.',
        ],
      ],
    },

    // ══ 14 · Measurement ════════════════════════════════════════════════════
    { t: 'h2', x: '14 · How I\'d know it worked' },
    {
      t: 'p',
      x: 'Nothing has shipped and nobody has driven a route with it. This is the plan I would hold it to.',
    },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['<strong>North star</strong>', 'Stops completed per hour on road. Everything else here is a means to that.'],
        ['<strong>The import test</strong>', 'First-attempt failure rate on routes that went through validation, against routes that did not. If catching bad addresses does not move that number, the extra screen is not worth its cost.'],
        ['<strong>The override rate</strong>', 'How often a driver reorders after optimising. Very high means the optimiser is wrong; zero means nobody is reading it. Somewhere in between is the design working as intended.'],
        ['<strong>Failure quality</strong>', 'The proportion of failed stops that carry a reason. A failure with no reason attached is a support call tomorrow.'],
        ['<strong>The one-surface test</strong>', 'How often the driver leaves the app mid-route. The whole premise is that they should not have to.'],
        ['<strong>Guardrail</strong>', 'Accidental completions. Slide-to-confirm exists to drive that to roughly zero; if it does not, the gesture is wrong.'],
      ],
    },

    // ══ 15 · Scope ══════════════════════════════════════════════════════════
    { t: 'h2', x: '15 · What isn\'t built' },
    {
      t: 'p',
      x: 'The map is drawn, not derived - so there is <strong>no real geocoding or routing</strong>, and that is the first thing a shipped version would need. There is <strong>no offline queue</strong>, which matters more here than in most apps, since a delivery round spends real time out of signal. There is <strong>no dispatcher side</strong> - the other half of this product is somebody assigning the route in the first place. And no multi-day planning. Most importantly, <strong>no driver has used it</strong>, which is why the section above is a plan rather than a result.',
    },
    {
      t: 'stats',
      items: [
        { v: '9', l: 'screens' },
        { v: '44', l: 'Swift files' },
        { v: '~6,800', l: 'lines of Swift' },
        { v: '0', l: 'third-party libraries, and no MapKit' },
      ],
    },

    { t: 'h3', x: 'Sources' },
    {
      t: 'list',
      items: [
        'Published last-mile logistics figures for 2025 - cost share of the last mile, first-attempt failure rates, and the causes behind them.',
        'Operator-reported stop counts for a typical delivery round.',
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'The reason to build the prototype rather than draw it is that the interactions here are the design. A slide, a list re-sequencing under a finger, a route line drawing itself - none of that can be judged from a static frame, and building it forces the honest questions: what happens on the fourteenth row, and what happens after the last stop.',
      by: 'Design intent, Route Planner',
    },
  ],
});
