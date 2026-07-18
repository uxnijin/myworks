// ============================================================================
//  Parcel: Premium Courier Booking (iOS)
//  Mobile App Design Case Study
//
//  Designed AND built in code. A real, runnable SwiftUI prototype — not a
//  Figma file. Every screen, animation, map and haptic is working Swift,
//  driven by a rich mock-data layer. No backend, no network.
// ============================================================================

const DESIGN_PARCEL = {
  slug: 'parcel',
  name: 'Parcel: Premium Courier Booking',
  category: 'Mobile App',
  icon: 'smartphone',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'Booking a courier that feels as effortless as ordering a ride — designed and built end-to-end in native SwiftUI.',
  lede: 'End-to-end product design AND iOS engineering for a consumer courier-booking app. I designed every screen, state and motion, then built the whole thing in Swift and SwiftUI — a custom vector map, an 8-stage live tracking timeline, spring-physics motion and haptics, all running on a seeded mock-data layer. It runs on a real iPhone. Nothing here is a static mockup.',
  tech: ['Swift', 'SwiftUI', 'Canvas', 'Observation', 'Custom motion', 'Haptics', 'Mock data · no network'],
  blocks: [

    // ── This is real ──────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'success',
      title: 'This is a working iOS app, not a Figma prototype.',
      x: 'Every screen, transition, map and haptic in this case study is real Swift code. The courier moves along the route on a hand-drawn <code>Canvas</code> map. The confirmation confetti is a real particle system. The tracking timeline animates stage by stage. It builds in Xcode and runs on an iPhone — I designed the interaction <em>by writing it</em>, not by faking it in a prototyping tool.',
    },

    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/parcel-assets/hero-banner.png',
      alt: 'Three Parcel screens — Home, live Tracking, and booking Confirmation',
      caption: 'Home, live tracking, and the confirmation pass — three of the app\'s thirteen fully-built screens.',
    },

    // ── At a glance ─────────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; iOS Engineer (end-to-end)'],
        ['Platform', 'Native iOS (iPhone, iOS 26)'],
        ['Domain', 'Logistics · consumer courier booking'],
        ['Built with', 'Swift &amp; SwiftUI, hand-written — no UI frameworks, no map SDK'],
        ['Data', 'A seeded, offline mock layer. No backend, no network.'],
        ['Deliverable', 'A runnable, fully interactive iOS prototype'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '13', l: 'Screens & surfaces built' },
        { v: '8', l: 'Named spring curves' },
        { v: '0', l: 'Third-party UI libraries' },
        { v: '100%', l: 'Mock data, no network' },
      ],
    },

    // ── 1. The idea ───────────────────────────────────────────────────────────
    { t: 'h2', x: '1. The Idea' },
    {
      t: 'p',
      x: 'Sending a parcel in India still feels like a chore. You visit a courier counter, or juggle half-formed apps that look like spreadsheets, compare opaque pricing, and then have no honest idea where your package is until it either arrives or doesn\'t. Meanwhile, booking a cab is a 20-second, one-thumb ritual we all trust.',
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The premise',
      x: 'What if booking a courier felt like ordering a ride? Doorstep pickup in ~20 minutes, transparent partner choice, and a live map you actually believe. That emotional bar — calm, fast, trustworthy — drove every decision.',
    },
    {
      t: 'p',
      x: 'Parcel is a self-serve app for the person <strong>sending</strong> a package: pick pickup and drop, describe the parcel, choose a courier partner on price and speed, pay, and follow it live. The design language borrows the confidence of Apple Wallet, the calm of Linear and Arc, and the friendliness of Airbnb — light-first, with a single indigo-violet signature.',
    },

    // ── 2. Who it's for ───────────────────────────────────────────────────────
    { t: 'h2', x: '2. Who It\'s For' },
    {
      t: 'callout',
      kind: 'info',
      title: '"I just want to send this thing and know it\'s handled — without thinking about it again."',
      x: 'Aarav, 29, Bengaluru. Sends 2–4 parcels a month — documents to family, a resold gadget, a gift to another city. Comfortable with UPI and ride apps. Has zero patience for courier counters and dense tracking pages.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'gauge', title: 'Values speed', desc: 'Wants the whole booking done before the auto-rickshaw arrives. Low typing, smart defaults, sensible prefills.' },
        { icon: 'checkCircle', title: 'Wants certainty', desc: 'A booking number, an ETA, and a live map beat a promise. Anxiety is the real problem to solve.' },
        { icon: 'phone', title: 'One-thumb, on the move', desc: 'Primary actions sit in the bottom third of the screen. Everything reachable while walking.' },
      ],
    },

    // ── 3. Design language ──────────────────────────────────────────────────────
    { t: 'h2', x: '3. Design Language' },
    {
      t: 'p',
      x: 'Four principles kept a feature-rich app feeling calm and premium rather than busy.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'sun', title: 'Light-first, dark-ready', desc: 'Designed in a soft warm-white (#F4F4F8) so it feels bright and trustworthy. A hand-tuned dark theme is built from the same tokens, not auto-inverted.' },
        { icon: 'zap', title: 'Motion with mass', desc: 'Every transition uses a named spring curve. Sheets are heavy, chips are snappy, celebrations bounce. Motion communicates state, it never decorates.' },
        { icon: 'layers', title: 'Wallet-grade surfaces', desc: 'Continuous-corner "squircle" cards, a single elevation level, and a top-lit sheen. Depth is used sparingly so it means something.' },
        { icon: 'droplet', title: 'Color carries meaning', desc: 'Neutrals dominate. Indigo is the one brand action; amber, green and violet map to shipment status. Nothing is colorful just to be colorful.' },
      ],
    },
    {
      t: 'image',
      src: '/parcel-assets/shell-screens.png',
      alt: 'Welcome, account creation, and profile screens showing the calm light-first design language',
      caption: 'The frame around the flow — Welcome, sign-in and profile. Calm, bright, and unmistakably one system.',
    },

    // ── 4. The booking flow ─────────────────────────────────────────────────────
    { t: 'h2', x: '4. The Core Flow: Booking' },
    {
      t: 'p',
      x: 'The heart of the app is a five-step booking flow that lives on a single surface — steps swap with matched, directional motion under a persistent progress header, so it never feels like five separate screens. The sender is prefilled from the signed-in profile, so most bookings start already half-done.',
    },
    {
      t: 'steps',
      items: [
        { title: 'Pickup', desc: 'Where should we collect from? Saved places (Home, Office, Parents) are one tap; the sender is prefilled.' },
        { title: 'Delivery', desc: 'Frequent recipients as avatars, with recipient details and a destination address list.' },
        { title: 'Parcel', desc: 'Document · Parcel · Fragile · Heavy, a weight stepper, a note for the rider, and free parcel protection.' },
        { title: 'Choose partner', desc: 'Five courier partners compared on rating, pickup ETA, speed and reliability — with a clear recommendation.' },
        { title: 'Review & pay', desc: 'A route map, the full itinerary, a transparent fare breakdown, and one confident confirm button.' },
      ],
    },
    {
      t: 'image',
      src: '/parcel-assets/booking-flow.png',
      alt: 'All five booking steps in a row: Pickup, Delivery, Parcel, Choose partner, Review & pay',
      caption: 'The full five-step booking flow, left to right. One surface, directional transitions, a progress header that never leaves.',
    },
    { t: 'h3', x: 'Choosing a partner is the decision that matters' },
    {
      t: 'p',
      x: 'This is where trust is won or lost, so it gets the most design care. Each partner card leads with a monogram badge in its own brand color, then a rating, and a three-up strip of the numbers that actually drive the choice: pickup ETA, speed tier, and a reliability score. The recommended partner is highlighted, and a glass bar pins the current selection and price above the button so the trade-off is never out of sight. Review then lays out the route, the itinerary and a transparent fare breakdown before you commit.',
    },
    {
      t: 'image',
      src: '/parcel-assets/partner-review.png',
      alt: 'Choose partner screen beside the Review & pay screen',
      caption: 'Choose partner (with a recommended highlight) and Review & pay (route, itinerary, fare breakdown).',
    },
    { t: 'h3', x: 'The payoff: a moment worth celebrating' },
    {
      t: 'p',
      x: 'Confirming triggers a full-screen celebration — a spring-scaled success check, a real confetti particle system, and a Wallet-style card with the booking number, AWB and ETA counting into place (it\'s the third screen in the hero above). Sending something matters emotionally; the interface treats it that way. From there, one tap drops you straight into live tracking.',
    },

    // ── 5. Live tracking ──────────────────────────────────────────────────────
    { t: 'h2', x: '5. Live Tracking' },
    {
      t: 'p',
      x: 'Tracking is the screen a customer opens the most, so it had to feel alive. A courier marker travels along a curved route on a custom map, a progress ring shows how far along the delivery is, and a draggable sheet reveals the rider, a call/message shortcut, and an animated 8-stage timeline — from "Pickup requested" all the way to "Delivered". The current stage pulses so your eye lands on it instantly. The Activity tab collects every live shipment as its own moving mini-map card.',
    },
    {
      t: 'image',
      src: '/parcel-assets/tracking-live.png',
      alt: 'Live tracking screen with map, courier and timeline, beside the Activity tab of live mini-map cards',
      caption: 'The map, moving courier, progress ring and timeline are all hand-drawn and animated in SwiftUI — no map SDK, no assets.',
    },
    { t: 'h3', x: 'The eight stages' },
    {
      t: 'table',
      head: ['Stage', 'What the customer sees'],
      rows: [
        ['Pickup requested', 'We\'re finding a courier partner'],
        ['Pickup accepted', 'A partner accepted your request'],
        ['Courier assigned', 'Your rider is on the way to pickup'],
        ['Package picked up', 'Your package is with the rider'],
        ['In transit', 'Moving toward the destination city'],
        ['At sorting hub', 'Sorted and dispatched for delivery'],
        ['Out for delivery', 'Arriving at the doorstep soon'],
        ['Delivered', 'Handed over to the recipient'],
      ],
    },

    // ── 6. Signature moments ─────────────────────────────────────────────────
    { t: 'h2', x: '6. Signature Interaction Moments' },
    {
      t: 'p',
      x: 'The details that make it feel like a real, premium product — each one built from scratch in code.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'map', title: 'Hand-drawn vector map', desc: 'A stylised "premium map" rendered entirely with SwiftUI Canvas — water, park, city blocks, road grid, a bowed pickup→delivery route, and a courier that eases along it. Zero map SDK, zero image assets.' },
        { icon: 'activity', title: '8-stage live timeline', desc: 'A vertical timeline where completed stages fill and the active stage pulses with an ambient loop. Each stage carries its own SF Symbol, timestamp and location.' },
        { icon: 'checkCircle', title: 'Confetti confirmation', desc: 'A real particle system plus a spring-scaled check and animated counters — a deliberate emotional peak at the moment of booking.' },
        { icon: 'home', title: 'Floating tab bar', desc: 'A custom glass tab bar with a raised central "Book" action, symbol-bounce on selection, and no reliance on the stock TabView.' },
        { icon: 'phone', title: 'Haptics on every beat', desc: 'Nine mapped feedback patterns — a light tap on buttons, medium on step advance, a success notification on booking. The app talks back through touch.' },
        { icon: 'droplet', title: 'One dynamic color system', desc: 'Every color is a single token that resolves per light/dark trait at runtime, so the whole app re-themes coherently from one source of truth.' },
      ],
    },

    // ── 7. The design system, in code ────────────────────────────────────────
    { t: 'h2', x: '7. The Design System, Built in Code' },
    {
      t: 'p',
      x: 'There was no separate Figma library to drift out of sync. The design system <em>is</em> the code: colors, type, spacing, radius, motion and haptics are all Swift tokens, used directly by every view.',
    },
    { t: 'h3', x: 'Color' },
    {
      t: 'table',
      head: ['Token', 'Light', 'Dark', 'Purpose'],
      rows: [
        ['accent', '#4B44F5', '#4B44F5', 'The one brand action — electric indigo'],
        ['violet', '#8B5CF6', '#8B5CF6', 'Gradient companion, "out for delivery"'],
        ['amber', '#FF9F0A', '#FF9F0A', 'In-motion / in-transit states'],
        ['success', '#2ECC71', '#2ECC71', 'Delivered, confirmation'],
        ['danger', '#FF453A', '#FF453A', 'Errors, cancellations'],
        ['background', '#F4F4F8', '#0A0A0F', 'App background — warm-white / near-black ink'],
        ['surface', '#FFFFFF', '#17171F', 'Cards and panels'],
        ['textPrimary', '#0B0B12', '#FFFFFF', 'Primary text (secondary/tertiary are opacity steps)'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Why light-first',
      x: 'A courier app carries a little anxiety — is my package okay? A bright, warm, low-chroma surface reads as calm and trustworthy. Dark mode is fully supported and hand-balanced, but light is the app\'s natural home.',
    },
    { t: 'h3', x: 'Type, space & shape' },
    {
      t: 'table',
      head: ['Token', 'Value', 'Purpose'],
      rows: [
        ['Typeface', 'SF Pro Rounded', 'Friendly, native, modern — rounded terminals soften the tone'],
        ['Type scale', '11 → 56pt', 'Micro, caption, body, titles, hero numbers'],
        ['Spacing', '4pt base', 'A single rhythm every gap snaps to (4 → 48)'],
        ['Radius', '10 / 16 / 22 / 28 / 36', 'Continuous "squircle" corners everywhere'],
        ['Controls', '56pt buttons · 58pt fields', 'Generous, thumb-friendly hit targets (min 44pt)'],
      ],
    },
    { t: 'h3', x: 'Motion' },
    {
      t: 'table',
      head: ['Curve', 'Spring config', 'Use case'],
      rows: [
        ['Standard', 'response 0.42 · damping 0.82', 'Screen and step transitions'],
        ['Snappy', 'response 0.30 · damping 0.78', 'Chips, toggles, small state'],
        ['Bouncy', 'response 0.55 · damping 0.60', 'Celebrations, counters, success'],
        ['Sheet', 'response 0.50 · damping 0.86', 'Bottom sheets, large surfaces'],
        ['Interactive', 'response 0.28 · damping 0.86', 'Drag-follow gestures'],
        ['Ambient', 'easeInOut 2.4s loop', 'Map pulse, gradient drift'],
      ],
    },
    { t: 'h3', x: 'Haptics' },
    {
      t: 'table',
      head: ['User action', 'Haptic', 'Why'],
      rows: [
        ['Tap a button', '.light impact', 'Subtle acknowledgement'],
        ['Advance a booking step', '.medium impact', 'A sense of forward progress'],
        ['Switch tabs', '.selection', 'A crisp detent'],
        ['Booking confirmed', '.success notification', 'The emotional peak — you did it'],
        ['Something went wrong', '.warning / .error', 'Alert without alarm'],
      ],
    },

    // ── 8. Built in Swift, not Figma ─────────────────────────────────────────
    { t: 'h2', x: '8. Built in Swift, Not Figma' },
    {
      t: 'p',
      x: 'Most portfolio case studies stop at the mockup. This one is the running app. I didn\'t hand a design to an engineer — I <em>was</em> the engineer, so there is zero gap between intention and implementation. The spring values in the design notes are the literal spring values in the code. The haptic map is literal <code>UIFeedbackGenerator</code> calls. The color tokens are SwiftUI <code>Color</code> extensions.',
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Design → code. No handoff, no loss in translation.',
      x: 'Designing by building means every interaction is testable the instant it\'s designed. If a transition felt wrong, I changed a damping value and felt it again in seconds. That tight loop is only possible when the designer writes the Swift.',
    },
    {
      t: 'stats',
      items: [
        { v: '13', l: 'SwiftUI screens & surfaces' },
        { v: '~18', l: 'Custom components' },
        { v: '8-stage', l: 'Live tracking timeline' },
        { v: '1', l: 'Observable store · no NavigationStack' },
      ],
    },
    { t: 'h3', x: 'How it\'s put together' },
    {
      t: 'cards',
      items: [
        { icon: 'code', title: 'Pure SwiftUI', desc: 'Declarative views throughout, dropping to UIKit only for haptics. No storyboards, no third-party UI kits.' },
        { icon: 'braces', title: 'One @Observable store', desc: 'A single @MainActor AppStore is the source of truth and the router. No NavigationStack — every transition is custom, so motion is fully mine.' },
        { icon: 'map', title: 'Everything hand-drawn', desc: 'The map, progress ring, timeline, confetti and tab bar are drawn with Canvas / Shape / SF Symbols. No map SDK, no image assets.' },
        { icon: 'layers', title: 'Seeded mock-data layer', desc: 'A deterministic generator produces believable Indian names, cities, PINs, AWBs and pricing — so demos look identical every run and could be swapped for a real API.' },
      ],
    },
    { t: 'h3', x: 'A taste of the code' },
    {
      t: 'p',
      x: 'The whole design system starts as tokens. Because color is a single dynamic value, one definition drives both themes — light and dark stay in lockstep with no duplicated screens.',
    },
    {
      t: 'code',
      file: 'DesignSystem/Theme.swift',
      lang: 'swift',
      x: `enum Theme {
    /// The one brand action — a confident electric indigo.
    static let accent = Color(hex: 0x4B44F5)

    /// App background — soft warm-white in light, near-black ink in dark.
    static let background = Color.dynamic(lightHex: 0xF4F4F8, darkHex: 0x0A0A0F)
    static let surface    = Color.dynamic(lightHex: 0xFFFFFF, darkHex: 0x17171F)

    /// Signature gradient used on primary buttons and hero accents.
    static let brandGradient = LinearGradient(
        colors: [accentSoft, accent, violet],
        startPoint: .topLeading, endPoint: .bottomTrailing)
}

extension Color {
    /// Resolves per light/dark trait at runtime — one token, two themes.
    static func dynamic(lightHex: UInt, darkHex: UInt) -> Color {
        Color(UIColor { traits in
            let hex = traits.userInterfaceStyle == .dark ? darkHex : lightHex
            return UIColor(hex)
        })
    }
}`,
    },
    {
      t: 'p',
      x: 'And the tracking map is not a screenshot — it\'s a live drawing. The route is a quadratic curve, and the courier is placed on it every frame by evaluating the Bézier at the current progress.',
    },
    {
      t: 'code',
      file: 'Components/MiniMap.swift',
      lang: 'swift',
      x: `// Bow the straight line into a gentle arc, then draw casing + fill.
var route = Path()
route.move(to: pickup)
route.addQuadCurve(to: delivery, control: control)
ctx.stroke(route, with: .color(Theme.accent.opacity(0.25)),
           style: StrokeStyle(lineWidth: 9, lineCap: .round))
ctx.stroke(route, with: .color(Theme.accent),
           style: StrokeStyle(lineWidth: 4, lineCap: .round))

// Highlight the portion already travelled.
let travelled = route.trimmedPath(from: 0, to: CGFloat(progress))
ctx.stroke(travelled, with: .color(.white),
           style: StrokeStyle(lineWidth: 4, lineCap: .round))

// Place the courier on the curve by evaluating the quad Bézier at t.
let pos = quadPoint(pickup, control, delivery, CGFloat(progress))
let pulse = 1 + 0.15 * sin(time * 3)   // gentle breathing halo
ctx.fill(circle(at: pos, r: 18 * pulse), with: .color(Theme.accent.opacity(0.16)))
ctx.fill(circle(at: pos, r: 13),          with: .color(Theme.accent))`,
    },
    { t: 'h3', x: 'Screens built in Swift' },
    {
      t: 'table',
      head: ['Screen', 'Notable SwiftUI technique'],
      rows: [
        ['Welcome & Auth', 'Gradient app-icon, segmented Register/Login, social auth buttons'],
        ['Home', 'Live hero card, quick actions, horizontally-scrolling saved places, rebook rows'],
        ['Booking flow', 'One surface, five steps, directional matched transitions + persistent progress header'],
        ['Choose partner', 'Comparison cards with a glass "selected partner" bar pinned above the CTA'],
        ['Confirmation', 'Confetti particle system, spring check, animated counters'],
        ['Tracking', 'Canvas map + moving courier, progress ring, draggable sheet, pulsing 8-stage timeline'],
        ['Activity', 'Live mini-map cards with animated LIVE badges'],
        ['Shipments & Profile', 'Search + status filters, status pills, saved places & recipients'],
      ],
    },

    // ── 9. Light & dark ──────────────────────────────────────────────────────
    { t: 'h2', x: '9. Light-First, Dark Done Right' },
    {
      t: 'p',
      x: 'Light mode is the app\'s home, but dark mode isn\'t an afterthought or an auto-invert. Because every color is one dynamic token, dark is hand-balanced from the same source — surfaces get their own inks, the accent glows a touch, and the map re-tints its water and land.',
    },
    {
      t: 'image',
      src: '/parcel-assets/theme-home.png',
      alt: 'The Home screen shown in light mode beside dark mode',
      caption: 'The same Home screen in both themes, from a single set of tokens — not an auto-invert.',
    },
    {
      t: 'image',
      src: '/parcel-assets/theme-tracking.png',
      alt: 'Live tracking shown in light mode beside dark mode',
      caption: 'Live tracking re-themes end to end — including the hand-drawn map canvas.',
    },

    // ── 10. What I'd build next ───────────────────────────────────────────────
    { t: 'h2', x: '10. What I\'d Build Next' },
    {
      t: 'cards',
      items: [
        { icon: 'braces', title: 'Real carrier APIs', desc: 'The mock layer already mirrors an API shape — every read could be swapped for live carrier tracking with minimal view changes.' },
        { icon: 'activity', title: 'Push-driven updates', desc: 'Live Activities on the lock screen and push notifications for each stage change, reusing the existing 8-stage model.' },
        { icon: 'globe', title: 'Localisation', desc: 'Indian-language support for names and addresses, and Dynamic Type auditing across the denser screens.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The takeaway',
      x: 'This is what "design engineer" means to me: I can take a product from an emotional premise all the way to a running, felt-in-the-hand iOS app — owning the interaction, the motion, the system and the Swift that makes it real.',
    },

  ],
};
