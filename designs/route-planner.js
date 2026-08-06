// ============================================================================
//  Route Planner — A Day's Deliveries on One Surface
//  Mobile App Design Case Study
//
//  A self-directed product exercise, built end-to-end as a runnable SwiftUI
//  app: 44 Swift files, ~6,800 lines, no third-party UI libraries and no
//  MapKit — the map is drawn from scratch.
//
//  Every figure in this case study is a screenshot of the real app running in
//  the iOS simulator. Nothing here is a rendering or a mockup.
// ============================================================================

const DESIGN_ROUTE_PLANNER = {
  slug: 'route-planner',
  name: 'Route Planner: A Day of Deliveries',
  category: 'Mobile App',
  icon: 'map',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'A last-mile delivery app that holds a 120-stop day on one surface — designed and built as a running SwiftUI prototype.',
  lede: 'A driver with 120 stops is running a small logistics operation from a phone mount, using tools built for someone driving to one place. This is a self-directed exercise in designing the whole day instead of the next turn: import, validate, optimise, drive, prove, recap. Designed and built end-to-end in SwiftUI, on mock data, with a map drawn from scratch.',
  tech: ['Swift', 'SwiftUI', 'Canvas', 'Observation', 'Core Haptics patterns'],
  blocks: [

    // ── Framing ───────────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'warning',
      title: 'A self-directed exercise, not a client project.',
      x: 'Nobody commissioned this and no delivery company was involved. There was no user research programme, no pilot, and no production data — the arguments below are design reasoning, not findings. Everything runs on a local mock data layer.',
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'This is a working iOS app, not a mockup.',
      x: 'Every image on this page is a screenshot of the app running on an iPhone. The map pans and zooms, the route line draws itself, stops re-sequence when you drag them, validation really rejects rows, and completing a stop advances the day. <strong>44 Swift files, ~6,800 lines, zero third-party UI libraries</strong> — and no MapKit; the map is drawn from scratch.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/day.webp',
      alt: 'Four screens of Route Planner: home, route overview, active navigation, and the end-of-day summary',
      caption: 'The whole day in four screens: what today is, what the route looks like, where you are now, and how it went.',
    },
    {
      t: 'table',
      head: ['At a glance', ''],
      rows: [
        ['Role', 'Design and build, end to end'],
        ['Platform', 'Native iOS (iPhone), dark-first'],
        ['Built with', 'SwiftUI · a custom vector map · seeded mock data'],
        ['Scope', '9 screens, 44 Swift files, ~6,800 lines'],
        ['Status', 'Runnable prototype — no backend, no network, no accounts'],
      ],
    },

    // ── 1. The problem ────────────────────────────────────────────────────────
    { t: 'h2', x: '1. The Job Is the Day, Not the Turn' },
    {
      t: 'p',
      x: 'Consumer navigation is built around a single question: <em>how do I get to this one place?</em> A delivery driver\'s question is different and much larger: <em>what is the best order for these 120 places, and how do I prove I did each one?</em> The gap between those two questions is where the working day leaks — into a spreadsheet, a chat thread, a camera roll, and a notes app that never talk to each other.',
    },
    {
      t: 'p',
      x: 'So the design premise here is narrow and testable: <strong>put the entire day on one surface</strong>, from a raw list of addresses to a signed-off recap, and see whether the flow holds together when you actually build it and use it. Four things follow from that premise, and they shaped every screen.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'smartphone', title: 'One thumb, one loud action', desc: 'Each screen commits to a single primary action pinned to the bottom — Import Route, Start Route, I\'ve Arrived, Finish Day. Everything else is quieter and further up.' },
        { icon: 'moon', title: 'Dark first, light adaptive', desc: 'Designed in dark and adapted to light rather than the other way round — a phone on a windscreen mount lives at high brightness, and the map is the screen.' },
        { icon: 'checkCircle', title: 'Nothing enters the route unchecked', desc: 'Import is deliberately a two-step move: bring addresses in, then review what the app found wrong before any of it becomes a stop.' },
        { icon: 'activity', title: 'Physical confirmation', desc: 'Actions that end a stop are gestures with weight — a slide, not a tap — each paired with a specific haptic so the phone can confirm without being looked at.' },
      ],
    },

    // ── 2. Getting the stops in ──────────────────────────────────────────────
    { t: 'h2', x: '2. Getting the Stops In' },
    {
      t: 'p',
      x: 'Addresses arrive in whatever form the sender had to hand, so the app takes five: a CSV from a dispatcher or spreadsheet (marked as the fast path for a full day), dictation, a pasted block of text, a camera scan of a label, or one typed by hand. The point of offering five is not completeness — it is that the fastest one changes depending on whether you have 120 stops or one.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/import.webp',
      alt: 'Import Route, Review Stops, and Reorder Stops screens from the app',
      caption: 'Import → review → reorder. The route only exists after the middle screen has been read and confirmed.',
    },
    { t: 'h3', x: 'Review is where the design earns its keep' },
    {
      t: 'p',
      x: 'The interesting screen is the second one. Imported addresses are checked before they become stops, and the summary leads with the count that actually matters — <strong>what is broken</strong> — rather than a reassuring total. Warnings ("missing unit number") are still addable; errors ("address not found") are not, and the primary button says so plainly: <em>Add 13 stops to route</em>, with the skipped row spelled out underneath.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/validation.webp',
      alt: 'The import validation summary card: 11 ready, 2 warnings, 1 error',
      caption: 'The prototype seeds real failures on purpose — a missing unit, an address not found, one outside the zone — because an import screen that only ever succeeds has not been designed.',
    },
    { t: 'h3', x: 'Optimise, then argue with it' },
    {
      t: 'p',
      x: 'Ordering runs a greedy nearest-neighbour pass from the depot and reports the result as a plain-language saving rather than a score. Crucially, optimisation is a suggestion: <strong>Reorder</strong> sits next to it, and dragging a stop re-sequences the route instantly. A driver who knows that one gate closes at noon must be able to overrule the algorithm without leaving the screen.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/optimize.webp',
      alt: 'The optimisation result banner: optimised route saves 4h 37m, 58 km less driving today',
      caption: 'The result is stated in hours and kilometres — the two units the day is actually measured in.',
    },

    // ── 3. Driving and delivering ────────────────────────────────────────────
    { t: 'h2', x: '3. Driving, Arriving, Proving' },
    {
      t: 'p',
      x: 'Navigation strips back to what is legible at a glance: where you are on the line, who is next, and one green action. The stop card carries the customer, the address, the ETA, and four small utilities — call, message, notes, skip — because the alternative to putting them here is another app.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/drive.webp',
      alt: 'Route overview, active navigation, and the arrival sheet',
      caption: 'Overview → driving → arrived. The same map carries all three; only the sheet on top of it changes.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/arrival.webp',
      alt: 'The arrival sheet: You\'ve arrived, Theo Novak, with Deliver and Couldn\'t deliver actions',
      caption: 'Arrival offers both outcomes at equal reach. A failed delivery is a normal event, not an error state buried behind the happy path.',
    },
    { t: 'h3', x: 'Proof is optional, and asked for in that order' },
    {
      t: 'p',
      x: 'Photo, signature and note are all marked <em>Optional</em>, with a "left at door / safe place" toggle beneath them. That ordering is the argument: the app should never block a driver from closing a stop because a customer would not sign. Capture what you can, in the order it is easiest to capture, and move.',
    },
    {
      t: 'p',
      x: 'The stop is finally closed by sliding, not tapping. A 120-stop day is a day of handling parcels with one hand on a phone; a slide is the cheapest way to make an irreversible action impossible to trigger by accident — and it pairs with a heavy impact plus a success notification so the confirmation lands without a glance.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/slide.webp',
      alt: 'The slide-to-confirm control at the bottom of the delivery sheet',
      caption: 'Slide to mark Delivered. The one control in the app that cannot be triggered by a stray thumb.',
    },

    // ── 4. After the last stop ───────────────────────────────────────────────
    { t: 'h2', x: '4. After the Last Stop' },
    {
      t: 'p',
      x: 'Completing the final stop moves the app to a recap on its own, without asking. It leads with delivered and failed side by side at the same size — a day is not summarised honestly by its successes alone — then distance, time on road, fuel and time saved. History keeps the last seven working days as a bar chart and a per-day breakdown, so "was today unusual?" is answerable.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/after.webp',
      alt: 'Daily summary, history, and settings screens',
      caption: 'Summary, history, settings. Settings is deliberately small: vehicle, navigation preferences, and what to optimise for.',
    },

    // ── 5. Light and dark ────────────────────────────────────────────────────
    { t: 'h2', x: '5. One System, Two Appearances' },
    {
      t: 'p',
      x: 'Every colour is a semantic token that resolves per appearance, so light mode is a re-render rather than a second design. The background is <code>#0A0B0E</code> in dark and <code>#F5F7FA</code> in light — near-black with a hint of blue, and a grey-blue rather than pure white, because a pure-white map surface at full brightness is the one thing guaranteed to be unreadable outdoors.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/theme.webp',
      alt: 'Home and navigation screens shown in light and dark mode side by side',
      caption: 'The same two screens in both appearances. The map, the route line and the accent survive the switch; only the surfaces move.',
    },

    // ── 6. Design system ─────────────────────────────────────────────────────
    { t: 'h2', x: '6. The Design System' },
    { t: 'h3', x: 'Colour' },
    {
      t: 'table',
      head: ['Token', 'Light', 'Dark', 'Used for'],
      rows: [
        ['accent', '#3D7DFF', '#3D7DFF', 'Primary actions, the route line'],
        ['accentSoft / accentDeep', '#6FA0FF / #2C5CE0', '#6FA0FF / #2C5CE0', 'Gradient ends, pressed states'],
        ['indigo', '#6C5CE7', '#6C5CE7', 'Selection, secondary brand tint'],
        ['success', '#30D158', '#30D158', 'Delivered, arrival, the slide control'],
        ['warning', '#FFB020', '#FFB020', 'Addable-but-flagged rows, priority'],
        ['danger', '#FF453A', '#FF453A', 'Blocking errors, failed stops'],
        ['background', '#F5F7FA', '#0A0B0E', 'App-wide background'],
        ['surface / surfaceRaised', '#FFFFFF / #F9FAFC', '#171A21 / #1E222B', 'Cards and elevated cards'],
        ['textPrimary', '#0C0D12', '#FFFFFF', 'Primary text'],
        ['textSecondary / tertiary', '62% / 38%', '62% / 38%', 'Supporting text and hints'],
      ],
    },
    { t: 'h3', x: 'Geometry and type' },
    {
      t: 'cards',
      items: [
        { icon: 'type', title: 'SF Pro Rounded throughout', desc: 'The rounded system face, at system sizes, so Dynamic Type keeps working. Rounded terminals keep a dense, data-heavy screen from reading as industrial.' },
        { icon: 'layers', title: 'Continuous corners, 10–34pt', desc: 'Squircles rather than rounded rectangles at every level: 10 for chips, 16 standard, 22 and 28 for cards, 34 for sheets, full pill for buttons.' },
        { icon: 'slider', title: '4pt spacing, 20pt gutter', desc: 'A single 4pt scale with a 20pt screen gutter. Primary buttons are 56pt tall, chips 38pt, and no hit target goes below 44pt.' },
        { icon: 'droplet', title: 'One shadow, one glow', desc: 'Cards get a single soft floating shadow; the accent glow is reserved for live pins and the primary button, so "glowing" always means "act on this".' },
      ],
    },
    { t: 'h3', x: 'Motion' },
    {
      t: 'p',
      x: 'Seven named curves, defined once and referenced everywhere. Naming them is what keeps a sheet from opening with a counter\'s bounce.',
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
    { t: 'h3', x: 'Haptics' },
    {
      t: 'table',
      head: ['Moment', 'Feedback', 'Why'],
      rows: [
        ['Any button', 'Light impact', 'Acknowledgement, nothing more'],
        ['Dragging a stop into place', 'Soft impact', 'The list confirms the drop without a visual cue'],
        ['Skipping a stop', 'Medium impact', 'A real change to the route, not a tap'],
        ['Delivered or failed', 'Success notification', 'The end of a stop — the only pattern that fires here'],
      ],
    },

    // ── 7. How it's built ────────────────────────────────────────────────────
    { t: 'h2', x: '7. How It\'s Built' },
    {
      t: 'p',
      x: 'The reason to build the prototype rather than prototype it in Figma is that the interactions here are the design. A slide-to-confirm, a route line that draws itself, a list that re-sequences under your finger, a map you can throw around — none of those can be evaluated from a static frame. Building it also forces the honest questions: what happens on the 14th row, what happens when validation fails, what happens after the last stop.',
    },
    {
      t: 'stats',
      items: [
        { v: '44', l: 'Swift files' },
        { v: '6.8k', l: 'Lines of Swift' },
        { v: '0', l: 'Third-party libraries' },
        { v: '120', l: 'Seeded mock stops' },
      ],
    },
    {
      t: 'cards',
      items: [
        { icon: 'map', title: 'The map is drawn, not embedded', desc: 'No MapKit. A procedural city renders into a SwiftUI <code>Canvas</code>, the route is an animatable <code>Shape</code>, and pins are ordinary SwiftUI views — so it draws itself on reveal, matches the art direction exactly, and looks identical on every run.' },
        { icon: 'braces', title: 'One observable store', desc: 'A single <code>@Observable @MainActor AppStore</code> owns the screen, the stops, the drive phase and the day\'s stats. Every view reads from it; there is no second source of truth to fall out of sync.' },
        { icon: 'layers', title: 'Seeded, not random', desc: 'A SplitMix64 generator builds a stable world of 120 stops — names, addresses, delivery windows, package sizes, priorities. The same seed gives the same day every launch, which is what makes screenshots and demos repeatable.' },
        { icon: 'gauge', title: 'A launch-argument harness', desc: '<code>-startScreen</code>, <code>-drivePhase</code> and <code>-simulateProgress</code> jump straight to any screen or state. Every figure on this page was captured through it.' },
      ],
    },
    { t: 'h3', x: 'Ending a stop, in code' },
    {
      t: 'p',
      x: 'The delivery lifecycle is deliberately small — a status, a proof payload, a haptic, and an advance. Success and failure run the same path on purpose, so a failed stop can never end up less finished than a delivered one.',
    },
    {
      t: 'code',
      file: 'Data/AppStore.swift',
      lang: 'swift',
      x: `/// Mark the active stop delivered with captured proof.
func markDelivered(proof: DeliveryProof) {
    guard let idx = activeIndex else { return }
    stops[idx].status = .delivered
    var p = proof
    p.completedAt = p.completedAt ?? currentClock()
    stops[idx].proof = p
    advanceAfterCompletion()
}

/// Mark the active stop failed with a reason.
func markFailed(reason: FailureReason, proof: DeliveryProof) {
    guard let idx = activeIndex else { return }
    stops[idx].status = .failed
    var p = proof
    p.failureReason = reason
    p.completedAt = p.completedAt ?? currentClock()
    stops[idx].proof = p
    advanceAfterCompletion()
}

private func advanceAfterCompletion() {
    recountTerminal()
    Haptics.success()
    // Activate the next pending stop.
    if let nextIdx = stops.firstIndex(where: { $0.status == .pending }) {
        stops[nextIdx].status = .active
        withAnimation(Motion.sheet) { drivePhase = .driving }
    } else {
        // All done — celebrate.
        withAnimation(Motion.standard) { screen = .summary }
    }
}`,
    },
    { t: 'h3', x: 'The flows that exist' },
    {
      t: 'table',
      head: ['Flow', 'What runs'],
      rows: [
        ['Home', 'Live map preview, animated progress ring, day stats, one primary CTA'],
        ['Import', 'Five capture methods, each with its own staging animation'],
        ['Review', 'Address validation with seeded warnings and blocking errors'],
        ['Overview', 'Pannable map, filterable stop list, optimise, manual reorder'],
        ['Navigation', 'Follow camera, live ETA and distance countdown, arrival'],
        ['Delivery', 'Photo, signature pad, note, safe-place toggle, slide to confirm'],
        ['Failure', 'Reason codes, captured on the same path as a delivery'],
        ['Summary & History', 'Animated counters, confetti, seven-day chart, per-day detail'],
      ],
    },

    // ── 8. Honest limits ─────────────────────────────────────────────────────
    { t: 'h2', x: '8. What This Isn\'t Yet' },
    {
      t: 'p',
      x: 'A prototype that claims no limits is just a rendering with extra steps. These are the real ones.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'globe', title: 'No real geography', desc: 'The map is a stylised procedural city, not a road network. It exists to make the route legible, so it cannot answer whether a turn is possible — a production build would swap the canvas for real map data and routing.' },
        { icon: 'warn', title: 'The optimiser is greedy', desc: 'Nearest-neighbour is enough to produce a believably tidy path and a plausible saving. It is not a solver, it ignores time windows and vehicle capacity, and it would not survive contact with a real dispatcher.' },
        { icon: 'phone', title: 'Nobody has driven with it', desc: 'It has been used at a desk, not on a bike in traffic. The claims about glare, one-handed reach and haptics are design reasoning from constraints, and they are exactly the kind of thing a day of ride-alongs would revise.' },
        { icon: 'timer', title: 'No persistence or backend', desc: 'The day resets on launch. Offline behaviour, sync, dispatcher hand-off and proof storage are all real product surface that this exercise deliberately left out.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The takeaway',
      x: 'The design decision worth defending here is that the day, not the turn, is the unit of the product — and the only way to find out whether that holds is to build the whole loop and run it end to end. Doing that surfaced the screens a static flow would have skipped: the review that rejects rows, the reorder that overrules the algorithm, and the failed delivery that has to feel as finished as a successful one.',
    },

  ],
};
