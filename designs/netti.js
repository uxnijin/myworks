// ============================================================================
//  Netti — A Speed Test for Four Apple Platforms
//  Mobile App Design Case Study
//
//  One SwiftUI codebase across iPhone, iPad, Mac and Apple Watch. Real
//  measurement against Cloudflare's speed-test edge — nothing simulated.
//  Designed and built end-to-end: 23 Swift files, 4,303 lines, no UI libraries.
//
//  Every screenshot in this case study is the real app running in a simulator.
// ============================================================================

const DESIGN_NETTI = {
  slug: 'netti',
  name: 'Netti: One Instrument, Four Screens',
  category: 'Mobile App',
  icon: 'gauge',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'A network speed test designed as an instrument rather than a dashboard — one SwiftUI codebase that becomes a tab bar, a split view, a Mac window and a stack of paged rings.',
  lede: 'Netti measures your connection against Cloudflare\'s public speed-test edge and reports what it finds — including packet loss and retransmits read straight from kernel TCP counters. It runs on iPhone, iPad, Mac and Apple Watch from a single set of screens, and it is built on one typographic rule: every measured value is monospaced, every label is not. This is a design case study about precision — about the small decisions that separate a dial that looks like a speedometer from one that behaves like an instrument.',
  tech: ['Swift', 'SwiftUI', 'Observation', 'URLSession', 'Swift Charts', 'Cloudflare speed-test edge', 'iOS 18 · iPadOS 18 · macOS 15 · watchOS 11'],
  blocks: [

    // ── This is real ─────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'success',
      title: 'A working app on four platforms, not a mockup.',
      x: 'Every screen here is a screenshot of real Swift running on a real device or simulator. The dial is driven by live throughput, the history charts plot real runs, and the network panel reads your actual interfaces. <strong>23 Swift files, 4,303 lines, zero third-party UI libraries.</strong>',
    },

    // ── Hero ─────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/netti-assets/hero-cross-device.png',
      alt: 'Netti running on Apple Watch, iPhone and iPad side by side',
      caption: 'Watch, iPhone and iPad — the same screens, three different shells, one codebase.',
    },

    // ── At a glance ──────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; iOS Engineer (end-to-end)'],
        ['Type', 'Personal project · independent prototype'],
        ['Platforms', 'iPhone · iPad · Mac · Apple Watch, from one codebase'],
        ['Domain', 'Network measurement · utility'],
        ['Design system', 'Built from scratch — Theme, Type and Motion as three token files'],
        ['Data', 'Live measurement against Cloudflare\'s speed-test edge. Nothing mocked.'],
        ['Deliverable', 'A runnable app on four platforms'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '4', l: 'Platforms, one codebase' },
        { v: '23', l: 'Swift files' },
        { v: '4,303', l: 'Lines of Swift' },
        { v: '0', l: 'Third-party UI libraries' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'On the starting point',
      x: 'The visual direction began from a <strong>Tubik Studio speed-test concept</strong> — the dark canvas, the sweep gradient and the dial are a debt to that work. What this project adds is everything a concept image does not have to answer: how the dial behaves at 4 Mbps and at 900, what it does while idle, where history lives once it has to hold a chart, and what the whole thing becomes on a 13-inch iPad and a 46mm watch. Several of the decisions below are <em>departures</em> from the reference, and each one is called out as such.',
    },

    // ══ 1. The thesis ════════════════════════════════════════════════════════
    { t: 'h2', x: '1. Instrument, Not Dashboard' },
    {
      t: 'p',
      x: 'A speed test has one job and about six numbers. That makes it a deceptively hard thing to design well: there is no information architecture to hide behind, no onboarding to soften the first impression, and no content to carry the screen. Everything rests on how the numbers are presented and how they move.',
    },
    {
      t: 'p',
      x: 'So the guiding idea was to design it as an <strong>instrument</strong> — a measuring device with a face — rather than as a dashboard of cards. Instruments have particular properties. They rest at a resting state rather than at zero. Their needles settle instead of bouncing. Their scales are chosen so the pointer sits in an expressive part of the travel. Their numerals are set in a face where digits do not change width. Each of those became a real rule in the code.',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The one rule that does the most work',
      x: '<strong>Every measured value is monospaced. Every label is not.</strong> It is a single line in <code>Type.swift</code>, applied without exception, and it is the reason a screen of six numbers reads as an instrument panel rather than as a settings page.',
    },

    // ══ 2. The dial ══════════════════════════════════════════════════════════
    { t: 'h2', x: '2. The Dial, Decision by Decision' },
    {
      t: 'p',
      x: 'The gauge is the whole product, so it got the most attention. It is drawn from scratch — arcs, ticks, needle and glow are SwiftUI shapes, not an image or a library — which means every property of it is a decision someone had to make.',
    },
    {
      t: 'image',
      src: '/netti-assets/gauge-anatomy.png',
      alt: 'The Netti dial annotated with the six decisions behind it',
      caption: 'The dial, annotated. Six decisions, each of which is enforced in code rather than left to taste.',
    },
    { t: 'h3', x: 'The face auto-ranges' },
    {
      t: 'p',
      x: 'A fixed 0–1000 Mbps face is the obvious choice and the wrong one: on a 40 Mbps link it wastes 95% of its travel and the needle never leaves the first sliver of the arc. Netti\'s ceiling instead climbs a ladder of round numbers — 25, 50, 100, 250, 500, 1000 — snapping up as the measurement grows, so the needle always sits somewhere expressive. The screenshots above show a 25 Mbps face and a 50 Mbps face; neither was configured, both were chosen by the gauge.',
    },
    {
      t: 'callout',
      kind: 'warning',
      title: 'The bug that rescaling caused',
      x: 'Animating the tick labels meant SwiftUI cross-faded their <em>content</em> as well as their position — so mid-rescale the dial briefly showed two different scales at once, with ghosted numbers from the old face sitting between the new ones. The fix was <code>.contentTransition(.identity)</code> plus keying the whole tick set on the scale maximum, so a rescale replaces the labels outright instead of blending them.',
    },
    { t: 'h3', x: 'Idle hides almost everything' },
    {
      t: 'p',
      x: 'A needle resting at zero on a fully drawn face does not read as “ready”. It reads as broken. So at idle the needle, the ticks and the numeric readout are all absent, and what remains is the arc track and a start ring lit by the sweep gradient. The instrument only assembles itself once it has something to measure.',
    },
    {
      t: 'image',
      src: '/netti-assets/run-sequence.png',
      alt: 'The speed test screen in three states: idle, measuring, and settled',
      caption: 'Idle, measuring, settled. The same screen — the interface is built out of the measurement rather than around it.',
    },
    { t: 'h3', x: 'The readout lives in the notch' },
    {
      t: 'p',
      x: 'The arc spans 250°, which leaves a gap at the bottom. That gap is where the big numeric readout sits — and because the needle can never point into it, the two can never collide at any value on any scale. It is a small piece of geometry doing the work that a layout rule would otherwise have to do badly.',
    },

    // ══ 3. Design system ═════════════════════════════════════════════════════
    { t: 'h2', x: '3. The Design System' },
    {
      t: 'p',
      x: 'Three files hold every token in the app: <code>Theme.swift</code> for colour and geometry, <code>Type.swift</code> for the ramp, <code>Motion.swift</code> for named curves. No view contains a hex value, a font size or a duration. That is what makes an app this small feel consistent — and what made it possible to bring up three more platforms without the design drifting on any of them.',
    },
    { t: 'h3', x: 'Colour: one chromatic event' },
    {
      t: 'p',
      x: 'The app is greyscale apart from two things: the signature sweep, and four metric accents. Everything structural — canvas, card, raised control, hairline — is a step of black. Colour is therefore never decorative; if something is coloured it is because it is a measurement, and which measurement it is can be read from the hue alone.',
    },
    {
      t: 'image',
      src: '/netti-assets/color-system.png',
      alt: 'Netti colour tokens: surfaces, metric accents, and the sweep gradient',
      caption: 'Four surfaces, four metric accents, one four-stop sweep. The canvas is true black so OLED pixels switch off around the gauge.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'droplet', title: 'True black, deliberately', desc: 'True #000000 black canvas lets OLED pixels around the gauge switch off entirely.' },
        { icon: 'layers', title: 'Cards sit 7% above the canvas', desc: 'Surface at #121214 with a 7% white hairline for subtle elevation on pure black.' },
        { icon: 'activity', title: 'The sweep is sampled, not stepped', desc: 'Gradient fills dial arc, progress bar, and live numbers in unison.' },
        { icon: 'zap', title: 'Accents are assigned, not chosen', desc: 'Orange download, violet upload, green ping, amber jitter.' },
      ],
    },
    { t: 'h3', x: 'Type: the mono rule' },
    {
      t: 'image',
      src: '/netti-assets/type-system.png',
      alt: 'The Netti type ramp, showing monospaced values against SF Pro labels',
      caption: 'The ramp is small on purpose: three mono roles, three sans roles. Anything that is a measurement takes a mono role, without exception.',
    },
    {
      t: 'p',
      x: 'Beyond the instrument feeling, monospaced digits solve a real motion problem. The engine samples every 200 ms, so during a run the readout is re-rendering five times a second. In a proportional face the digits change width as they count and the whole number twitches horizontally. In SF Mono it counts in place.',
    },
    { t: 'h3', x: 'Motion: five named curves' },
    {
      t: 'p',
      x: 'An app with this much continuous movement gets noisy fast unless the movement shares a vocabulary. Five curves cover everything, each tied to an intent rather than to a component.',
    },
    {
      t: 'table',
      head: ['Token', 'Curve', 'Used for', 'Why this shape'],
      rows: [
        ['needle', 'interpolatingSpring · stiffness 120 · damping 20', 'Needle travel', 'Heavily damped so it settles rather than bounces. A bouncing needle reads as an unstable measurement.'],
        ['readout', 'spring · response 0.18 · damping 1.0', 'Live value updates', 'Must finish inside the 200 ms sample interval, or <code>.numericText</code> is left permanently mid-flight and the digits smear.'],
        ['phase', 'spring · response 0.5 · damping 0.85', 'Screen and phase changes', 'Slow enough to be legible as a change of state, springy enough not to feel like a page load.'],
        ['press', 'spring · response 0.28 · damping 0.7', 'Card and button presses', 'One physical model for every tappable surface in the app.'],
        ['entrance', 'spring · response 0.55 · damping 0.82 · staggered 55 ms', 'Groups of cards appearing', 'The stagger is what makes six cards read as one group arriving rather than six things popping.'],
      ],
    },
    {
      t: 'callout',
      kind: 'warning',
      title: 'A motion rule discovered the hard way',
      x: 'The 200 ms constraint on the readout curve is not a preference — it is arithmetic. Any spring slower than the sampling interval means the next value arrives before the previous transition has landed, and <code>.numericText</code> ends up permanently interpolating between two numbers. The result is a readout that never resolves into readable digits. The curve was tuned until it fit inside the interval, not until it felt nice.',
    },
    { t: 'h3', x: 'Geometry' },
    {
      t: 'p',
      x: 'Three radius tiers, fixed rather than concentric: <strong>card 20</strong>, <strong>control 14</strong>, and a 16pt card padding that everything inherits. Textbook concentric rounding would drive the inner radius down to ~4 at this padding, at which point the nesting stops reading as intentional and just looks like an inconsistency. Fixed tiers, continuous curvature everywhere.',
    },

    // ══ 4. Cross-device ══════════════════════════════════════════════════════
    { t: 'h2', x: '4. Four Platforms, One Set of Screens' },
    {
      t: 'p',
      x: 'This is the part of the project I find most interesting, and it is almost entirely a structural decision rather than a visual one. There is no iPad build, no Mac build and no separate iPad layout file. There is one <code>RootView</code> that asks a single question — is the horizontal size class regular? — and answers it with either a sidebar or a tab bar.',
    },
    {
      t: 'image',
      src: '/netti-assets/responsive-shell.png',
      alt: 'The same speed test screen shown as an iPad split view and an iPhone tab layout',
      caption: 'Regular width and compact width. Only the chrome changed — the gauge, the cards and the detail panel are the identical views in both.',
    },
    {
      t: 'diagram',
      caption: 'One view tree, one selection, three chromes. The screens themselves are never branched on platform.',
      svg: `<svg viewBox="0 0 680 320" role="img" aria-label="Diagram showing one shared view tree branching into three platform chromes">
  <defs>
    <marker id="ntar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow"/>
    </marker>
    <marker id="ntara" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 z" class="d-arrow-a"/>
    </marker>
  </defs>

  <text x="120" y="26" class="d-t" text-anchor="middle">Shared</text>

  <rect x="30" y="44" width="180" height="34" rx="9" class="d-box-a"/>
  <text x="120" y="66" class="d-s" text-anchor="middle">AppState · section</text>

  <rect x="30" y="92" width="180" height="30" rx="8" class="d-box"/>
  <text x="120" y="112" class="d-s" text-anchor="middle">SpeedTestView</text>
  <rect x="30" y="128" width="180" height="30" rx="8" class="d-box"/>
  <text x="120" y="148" class="d-s" text-anchor="middle">HistoryView</text>
  <rect x="30" y="164" width="180" height="30" rx="8" class="d-box"/>
  <text x="120" y="184" class="d-s" text-anchor="middle">NetworkInfoView</text>
  <rect x="30" y="200" width="180" height="30" rx="8" class="d-box"/>
  <text x="120" y="220" class="d-s" text-anchor="middle">SettingsView</text>

  <text x="120" y="258" class="d-s" text-anchor="middle">Theme · Type · Motion</text>
  <text x="120" y="276" class="d-s" text-anchor="middle">one token set, every platform</text>

  <line x1="220" y1="150" x2="268" y2="150" class="d-l d-l-a" marker-end="url(#ntara)"/>

  <rect x="284" y="40" width="376" height="80" rx="12" class="d-box"/>
  <text x="472" y="66" class="d-s" text-anchor="middle">sizeClass == .regular  →  NavigationSplitView</text>
  <text x="472" y="86" class="d-s" text-anchor="middle">iPad · sidebar pinned open, last-run footer</text>
  <text x="472" y="106" class="d-s" text-anchor="middle">Mac · same branch, plus ⌘R and ⌘1–3</text>

  <rect x="284" y="132" width="376" height="60" rx="12" class="d-box"/>
  <text x="472" y="158" class="d-s" text-anchor="middle">compact  →  TabView</text>
  <text x="472" y="178" class="d-s" text-anchor="middle">iPhone · four tabs, inline titles</text>

  <rect x="284" y="204" width="376" height="60" rx="12" class="d-box"/>
  <text x="472" y="230" class="d-s" text-anchor="middle">watchOS  →  paged TabView</text>
  <text x="472" y="250" class="d-s" text-anchor="middle">its own root — a reduction, not a resize</text>
</svg>`,
    },
    {
      t: 'cards',
      items: [
        { icon: 'sidebar', title: 'The sidebar is pinned open', desc: 'Explicit column visibility prevents hidden sidebar on first launch.' },
        { icon: 'layers', title: 'Selection lives in shared state', desc: 'Shared state selection preserves route across window resizing.' },
        { icon: 'window', title: 'Big screens get more, not bigger', desc: 'Extra width adds detail panels and footers rather than scaling up.' },
        { icon: 'code', title: 'One platform check, honestly counted', desc: 'Guarded OS checks keep platform-specific code minimal and focused.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'On the Mac screenshots',
      x: 'The Mac build runs — it takes the sidebar branch, adds ⌘R to run a test, ⌘1–3 to move between sections, and a proper Settings scene — but this machine has no Screen Recording permission, and a sandboxed SwiftUI app cannot capture its own window through <code>cacheDisplay</code> or <code>CALayer.render</code> either. Rather than mock up a Mac window that I could not verify pixel for pixel, the Mac is described here and drawn in the diagram above. I would rather have a gap in the case study than a screenshot that is really an illustration.',
    },

    // ══ 5. watchOS ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '5. The Watch Is a Reduction' },
    {
      t: 'p',
      x: 'The watch is the one platform that does not share the phone\'s root view, and it should not. A 46mm screen cannot hold a dial with ticks, a needle and six cards — and shrinking that layout produces something technically present and practically unreadable. So the watch keeps the idea and discards the apparatus.',
    },
    {
      t: 'image',
      src: '/netti-assets/watch-pages.png',
      alt: 'Four Apple Watch screens: start, download, upload and result',
      caption: 'One idea per page, navigated by the crown. The ticks and the needle are gone; the sweep-filled arc survives because it is the part that carries meaning at this size.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'gauge', title: 'The arc survives, the apparatus does not', desc: 'Clean ring sweep with monospaced figure; ticks and needle omitted at 46mm.' },
        { icon: 'moveH', title: 'Pages follow the measurement', desc: 'Pages auto-advance from ping to download and upload.' },
        { icon: 'check', title: 'The start page carries the last run', desc: 'Displays figures from the previous run directly under the start ring.' },
      ],
    },

    // ══ 6. Beyond the dial ═══════════════════════════════════════════════════
    { t: 'h2', x: '6. History and Network' },
    {
      t: 'p',
      x: 'In the reference concept, history was a bottom sheet — permanently half-occluded and far too small to hold a chart. Promoting it to a full section is the biggest structural departure in the project, and it is justified by what history is actually for: not looking up run 14, but seeing whether the connection is getting worse.',
    },
    {
      t: 'image',
      src: '/netti-assets/history-network.png',
      alt: 'The History screen with its trend chart, beside the Network screen showing tunnel detection',
      caption: 'History leads with the trend and the ten-run average; Network leads with whether your traffic is going through a tunnel at all.',
    },
    {
      t: 'p',
      x: 'The Network screen exists for one reason: a speed test that silently measures a VPN or iCloud Private Relay tunnel and reports the result as your line is lying by omission. Netti detects the tunnel, says so in plain language, and explains that the number will read low. Everything else on that screen — interfaces, addresses, the Cloudflare edge and its location — comes from the device and the network, not from placeholder copy.',
    },

    // ══ 7. Honest measurement ════════════════════════════════════════════════
    { t: 'h2', x: '7. The Settings Are the Methodology' },
    {
      t: 'p',
      x: 'Most speed tests hide their method. Netti puts it on a screen and explains the trade-off each control makes, because every one of them can change the number you get. A setting that can make a measurement wrong should say how.',
    },
    {
      t: 'image',
      src: '/netti-assets/methodology.png',
      alt: 'The Settings screen beside the four measurement rules behind it',
      caption: 'Each control states its trade-off in the interface, not in a help page.',
    },
    {
      t: 'table',
      head: ['Metric', 'How it is actually obtained'],
      rows: [
        ['Download', '<code>GET /__down</code> across N parallel streams, bytes counted in <code>URLSessionDataDelegate</code>'],
        ['Upload', '<code>POST /__up</code>, bytes counted in <code>didSendBodyData</code>'],
        ['Ping', 'The minimum of twelve zero-byte round trips, measured <em>before</em> the link is saturated'],
        ['Jitter', 'Mean absolute difference between consecutive ping probes'],
        ['<strong>Loss / Resent</strong>', '<strong>Real kernel TCP counters</strong>, parsed from the <code>server-timing: cfL4</code> response header'],
        ['Edge, IP, location', '<code>/cdn-cgi/trace</code>'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Why Loss and Resent are the interesting cards',
      x: 'Cloudflare\'s <code>__down</code> responses carry a <code>server-timing: cfL4</code> header containing genuine kernel-level TCP counters — packets sent, lost, retransmitted, and minimum RTT — for the exact connections the test used. That is what lets those two cards be honest measurements rather than estimates inferred from throughput variance. The counters are cumulative <em>per connection</em>, so they have to be keyed by connection id and summed across the latest reading of each; summing every reading double-counts badly. The documented <code>/meta</code> JSON endpoint, incidentally, now returns 403 — <code>/cdn-cgi/trace</code> is the working route to edge metadata.',
    },

    // ══ 8. Craft ═════════════════════════════════════════════════════════════
    { t: 'h2', x: '8. The Precision Underneath' },
    {
      t: 'p',
      x: '“Designed with precision” is easy to claim and hard to evidence, so here are the specific things that cost a build cycle each and that nobody would notice if they had been done wrong — which is rather the point.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'timer', title: 'The readout spring is arithmetic', desc: 'Spring tuned to finish within the 200ms sample window.' },
        { icon: 'type', title: 'Tick labels do not cross-fade', desc: '.contentTransition(.identity) prevents scale blending.' },
        { icon: 'braces', title: 'History survives a schema change', desc: 'Handwritten Decodable handles missing keys gracefully.' },
        { icon: 'slider', title: 'Streams recycle rather than resize', desc: 'Streams relaunch upon completion to sustain throughput.' },
        { icon: 'activity', title: 'The first 25% of samples are discarded', desc: 'Ignores initial 25% of samples to bypass TCP slow-start.' },
        { icon: 'check', title: 'Zero renders as “0 KB”, not “Zero KB”', desc: 'Formatted explicitly as "0 KB" for visual consistency.' },
      ],
    },

    // ══ 9. Next ══════════════════════════════════════════════════════════════
    { t: 'h2', x: '9. What I\'d Do Next' },
    {
      t: 'cards',
      items: [
        { icon: 'activity', title: 'A Live Activity for the run', desc: 'Dynamic Island presence for active test phase and live throughput.' },
        { icon: 'globe', title: 'Choose the edge', desc: 'Option to manually select and measure against specific Cloudflare edges.' },
        { icon: 'gauge', title: 'A watch complication', desc: 'Complication displaying latest download figure directly on the watch face.' },
        { icon: 'search', title: 'Validate the dial against a fixed face', desc: 'User testing comparing auto-ranging vs fixed scale dial.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The takeaway',
      x: 'The cross-platform result here did not come from a cross-platform framework or a clever abstraction. It came from putting every token in three files, keeping the screens free of platform branches, and letting one question — regular or compact — choose the chrome. The design work and the engineering work were the same work, which is why four platforms cost roughly one platform\'s worth of effort.',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The takeaway',
      x: 'The cross-platform result here did not come from a cross-platform framework or a clever abstraction. It came from putting every token in three files, keeping the screens free of platform branches, and letting one question — regular or compact — choose the chrome. The design work and the engineering work were the same work, which is why four platforms cost roughly one platform\'s worth of effort.',
    },

  ],
};
