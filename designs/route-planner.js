// ============================================================================
//  Route Planner — Co-Pilot for the Last Mile
//  Mobile App Design Case Study
// ============================================================================

const DESIGN_ROUTE_PLANNER = {
  slug: 'route-planner',
  name: 'Route Planner — Co-Pilot for the Last Mile',
  category: 'Mobile App',
  icon: 'map',
  tag: 'Case Study',
  status: 'Shipped',
  summary: 'Designing the ultimate route planning & delivery experience for India\'s gig-economy drivers.',
  lede: 'End-to-end product design AND development for a native iOS app that consolidates 5+ delivery tools into one — from route import and optimisation to proof-of-delivery and daily performance insights. Designed in Figma, then built from scratch in Swift with full mock-data functionality.',
  tech: ['Swift', 'SwiftUI', 'MapKit', 'Core Data', 'Combine', 'AVFoundation'],
  blocks: [

    // ── Meta ──────────────────────────────────────────────────────────────────
    {
      t: 'meta',
      items: [
        { label: 'Role',     value: 'Lead Product Designer — End-to-End' },
        { label: 'Platform', value: 'Native iOS' },
        { label: 'Timeline', value: '6 Weeks' },
        { label: 'Industry', value: 'Logistics / Last-Mile Delivery' },
      ],
    },

    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: 'https://assets.nijn.dev/portfolio/route-planner/hero-bike.png',
      alt: 'Route Planner running on a phone mounted on a bike handlebar with a blurred city street at golden hour',
      caption: 'Route Planner running on a phone mounted on a bike handlebar with a blurred city street at golden hour',
      ratio: '16-9',
    },

    // ── Swift Badge ───────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'tip',
      title: 'This app is real — written in Swift, not just designed in Figma.',
      x: 'Every screen, animation, and interaction you see in this case study was fully built using Swift and SwiftUI. The app runs on a real iOS device with mock delivery data, demonstrating complete end-to-end functionality. Scroll to Section 0 to see the engineering story.',
    },

    // ── 1. The Problem Space ──────────────────────────────────────────────────
    { t: 'h2', x: '1. The Problem Space' },
    {
      t: 'p',
      x: 'Last-mile delivery is the final, most expensive, and most chaotic leg of any supply chain. In India alone, companies like Swiggy, Zomato, Amazon Flex, and Dunzo have onboarded 4+ million gig-economy delivery partners. Yet the tools these workers use every day haven\'t evolved beyond basic navigation apps.',
    },
    { t: 'h3', x: 'The Real Day of a Delivery Driver' },
    {
      t: 'p',
      x: 'At 9 AM, Ramesh receives 150 delivery orders for the day. Before he even gets on his bike, he must screenshot his delivery list from 3 different WhatsApp groups, manually paste addresses into Google Maps one by one, try to figure out an efficient order — by memory — and juggle calls, photo proof, and failed-delivery logging between stops. By 9 PM he has context-switched between 5+ apps hundreds of times. That is not a workflow. That is organised chaos.',
    },
    { t: 'h3', x: 'The Five Core Problems' },
    {
      t: 'table',
      head: ['#', 'Problem', 'Real-World Impact'],
      rows: [
        ['P1', 'Manual route ordering with no optimisation', 'Drivers criss-cross the city, wasting 40–60 min/day in extra travel'],
        ['P2', 'Constant app-switching (Maps → Camera → Chat → Tracker)', '15–25 sec lost per stop × 150 stops = 45–60 min lost daily'],
        ['P3', 'Unstructured addresses (no flat number, landmark-based directions)', 'Drivers call customers 3–5 times per route to find locations'],
        ['P4', 'No in-app proof-of-delivery workflow', 'Delivery disputes are common; drivers have no evidence to defend themselves'],
        ['P5', 'Zero daily feedback or performance insights', 'Drivers have no way to improve; businesses can\'t measure driver efficiency'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Today\'s Reality vs Our Vision split diagram',
      caption: '[PLACEHOLDER — PROBLEM VISUALISATION: Split-image diagram — "Today\'s Reality" (driver juggling 5 app icons) vs. "Our Vision" (single unified interface). 1200×600px, SVG / PNG]',
      ratio: '2-1',
    },

    // ── 2. Market Research & Competitive Analysis ─────────────────────────────
    { t: 'h2', x: '2. Market Research & Competitive Analysis' },
    {
      t: 'p',
      x: 'We studied 7 existing tools used by delivery drivers globally and locally. No tool combines route optimisation + navigation + delivery completion + daily summary in a single, self-serve mobile app. None are designed for India-specific constraints: unstructured addresses, shared-PIN codes for societies, landmark-based navigation, and low-end device support.',
    },
    {
      t: 'table',
      head: ['Product', 'Strengths', 'Critical Gaps'],
      rows: [
        ['Google Maps', 'Trusted navigation, offline maps', 'No multi-stop optimisation, no delivery workflow'],
        ['Circuit Route Planner', 'Good optimisation engine, CSV import', 'Western UX patterns, paid wall for basics, no Indian address handling'],
        ['Onfleet', 'Business-grade dispatch', 'Too complex for solo drivers, subscription cost prohibitive'],
        ['Routific', 'Strong fleet optimisation', 'Desktop-first, not field-usable on a phone'],
        ['Dunzo / Swiggy Driver App', 'Integrates with platform orders', 'Siloed — can\'t import external orders'],
        ['Locus Dispatch', 'Enterprise AI routing', 'Requires enterprise IT setup, no self-serve'],
        ['MapMyIndia', 'Indian geography expertise', 'Navigation-only; no delivery management'],
      ],
    },
    {
      t: 'callout',
      kind: 'tip',
      title: 'Our Opportunity',
      x: 'Build the "just right" tool — powerful enough to replace 5 apps but simple enough to learn in one shift.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Competitive 2×2 matrix',
      caption: '[PLACEHOLDER — COMPETITIVE MAP: 2×2 matrix — "Complexity (Simple → Enterprise)" vs "Completeness (Navigation-only → Full Workflow)". Our product in the top-left sweet spot. 800×800px, SVG / PNG]',
      ratio: '1-1',
    },

    // ── 3. User Research & Field Insights ────────────────────────────────────
    { t: 'h2', x: '3. User Research & Field Insights' },
    {
      t: 'cards',
      items: [
        { icon: 'users',       title: 'Ride-Along Sessions',  desc: '6 sessions with delivery riders in Bengaluru and Mumbai (2–4 hours each).' },
        { icon: 'messageSquare', title: 'Contextual Interviews', desc: '12 semi-structured interviews with solo drivers and 4 small fleet managers.' },
        { icon: 'clipboard',   title: 'Diary Studies',        desc: '5 drivers documented their workflow for 3 consecutive workdays via WhatsApp voice notes.' },
        { icon: 'monitor',     title: 'App Usage Analysis',   desc: 'Screen recordings and session analysis of drivers using Google Maps during deliveries.' },
      ],
    },
    { t: 'h3', x: 'Five Key Field Observations' },
    {
      t: 'cards',
      items: [
        { icon: 'hand',        title: 'The One-Thumb Rule',     desc: 'Every driver operated their phone one-handed. All critical actions must be reachable by a single thumb in the bottom 40% of the screen.' },
        { icon: 'sun',         title: 'The Glare Problem',      desc: 'Standard light-mode interfaces became unreadable in direct Indian summer sunlight. Dark-first + high-contrast is a safety requirement, not a style choice.' },
        { icon: 'volumeX',     title: 'Sound Is Useless',       desc: 'Traffic noise meant audio alerts were consistently missed. Haptic feedback is the primary notification channel.' },
        { icon: 'alertCircle', title: 'Address Chaos',          desc: '34% of addresses were incomplete or ambiguous — missing block numbers, landmark-only descriptions, multilingual text.' },
        { icon: 'cpu',         title: 'The Memory Tax',         desc: 'Drivers memorise 3–4 next stops to avoid unlocking their phone. The app must proactively push what\'s next.' },
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Field research photo strip',
      caption: '[PLACEHOLDER — FIELD RESEARCH PHOTOS: Horizontal photo strip (3–4 images) — phone in handlebar mount, driver squinting in sunlight, juggling packages outside an apartment gate. 1200×400px, JPG collage]',
      ratio: '3-1',
    },
    {
      t: 'image',
      src: '',
      alt: 'Affinity map from user interviews',
      caption: '[PLACEHOLDER — AFFINITY MAP: Digital affinity board with clustered sticky notes under "Navigation", "Address Issues", "Tech Literacy", "Time Pressure", "Emotional State". 1600×900px, PNG screenshot]',
      ratio: '16-9',
    },

    // ── 4. Personas & User Journey ───────────────────────────────────────────
    { t: 'h2', x: '4. Personas & User Journey' },
    { t: 'h3', x: 'Primary Persona — Ramesh Kumar, Solo Gig Rider' },
    {
      t: 'callout',
      kind: 'info',
      title: '"Bro, if the app just tells me where to go and takes the delivery photo right there — life would be so much easier."',
      x: '— Ramesh Kumar, 26, Bengaluru. 80–160 deliveries/day on a Redmi Note 11. Core frustration: wrong addresses, app-switching, no daily summary.',
    },
    {
      t: 'table',
      head: ['Attribute', 'Detail'],
      rows: [
        ['Age', '26'],
        ['Location', 'Bengaluru (HSR Layout)'],
        ['Device', 'Redmi Note 11 (4 GB RAM)'],
        ['Tech Literacy', 'High (social media savvy, UPI pro)'],
        ['Daily Deliveries', '80–160'],
        ['Motivation', 'Earn ₹800–₹1500/day; get home early'],
        ['Core Frustration', 'Wrong addresses, app-switching, no daily summary'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Ramesh Kumar persona card',
      caption: '[PLACEHOLDER — PERSONA CARD: Beautifully designed persona card with Ramesh\'s illustration/photo, bio stats, a quote, and a "day in the life" timeline strip. 800×500px, PNG]',
      ratio: '16-9',
    },
    { t: 'h3', x: 'Secondary Persona — Priya Nair, Small Fleet Manager' },
    {
      t: 'table',
      head: ['Attribute', 'Detail'],
      rows: [
        ['Age', '34'],
        ['Location', 'Pune'],
        ['Business', 'Local pharmacy chain (3 delivery riders)'],
        ['Device', 'iPhone 14'],
        ['Tech Literacy', 'Very high (Notion, Sheets daily)'],
        ['Core Need', 'Proof of delivery, driver performance data, fast dispatch'],
      ],
    },
    { t: 'h3', x: 'Complete User Journey Map' },
    {
      t: 'image',
      src: '',
      alt: 'Full emotional user journey map',
      caption: '[PLACEHOLDER — JOURNEY MAP VISUAL: Full-width journey map — 10 stages across a delivery workday. Each stage: action, emotional state (emoji + curve graph), app touchpoint. 2400×800px, SVG / Wide PNG]',
      ratio: '3-1',
    },

    // ── 5. Information Architecture ──────────────────────────────────────────
    { t: 'h2', x: '5. Information Architecture' },
    {
      t: 'p',
      x: 'The app is structured across five primary areas: Home (active route card, quick stats, recent routes, import CTA), Route Creation (manual entry, paste, CSV, scan OCR, voice), Route Review (stop list, map preview, optimisation toggle, start CTA), Active Navigation (map canvas, stop card, progress bar, delivery bottom sheet), and Daily Summary (completion ring, stats, share / export).',
    },
    {
      t: 'image',
      src: '',
      alt: 'Information architecture sitemap',
      caption: '[PLACEHOLDER — IA DIAGRAM: Clean tree-diagram / sitemap. Blue (#3D7DFF) for primary flows, purple (#6C5CE7) for secondary, grey for tertiary. 1200×800px, SVG / PNG]',
      ratio: '3-2',
    },

    // ── 6. Design Principles ─────────────────────────────────────────────────
    { t: 'h2', x: '6. Design Principles & System Foundation' },
    {
      t: 'cards',
      items: [
        { icon: 'eye',        title: 'Peripheral Vision First',    desc: 'Information must be scannable at a glance — colour, size, and spatial position replace text labels wherever possible.' },
        { icon: 'zap',        title: 'Physical-World Physics',     desc: 'All animations use spring curves — heavy enough to feel intentional. Completing a delivery triggers paired haptic .heavy + .success.' },
        { icon: 'refreshCw',  title: 'Zero Dead Ends',             desc: 'Every action has a clear recovery path. "Mark as Delivered" can be undone for 30 seconds. No destructive actions without undo.' },
        { icon: 'moon',       title: 'Dark-First, Light-Adaptive', desc: 'Designed in dark mode first, then adapted to light. Light mode uses #F5F7FA (not pure white) to reduce glare in direct sunlight.' },
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Design principles 4-panel illustration',
      caption: '[PLACEHOLDER — DESIGN PRINCIPLES GRAPHIC: 4-panel illustration card — one panel per principle with a small supporting visual. 1200×600px, PNG / Figma screenshot]',
      ratio: '2-1',
    },

    // ── 7. UX Flow & Interaction Architecture ────────────────────────────────
    { t: 'h2', x: '7. UX Flow & Interaction Architecture' },
    { t: 'h3', x: 'Flow 1: Import & Optimise' },
    {
      t: 'p',
      x: 'Goal: get from "I have a list of addresses" to "optimised route ready" in under 60 seconds. Home Screen → Tap "Import Route" → Import Options Sheet (paste / scan / CSV / voice) → Address Review → Optimise → Route Preview → Start Deliveries.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Import flow screen recording',
      caption: '[PLACEHOLDER — FLOW DIAGRAM VIDEO: Screen recording of the full import flow — tapping "Import" to seeing the optimised route on the map. Portrait 390×844px, MP4, 30fps]',
      ratio: '9-16',
    },
    { t: 'h3', x: 'Flow 2: Active Delivery Stop Completion' },
    {
      t: 'p',
      x: 'Goal: complete a delivery — including proof photo — in under 10 seconds. GPS auto-detects arrival within 50 m → Arrival Card slides up → Swipe-to-Complete → inline Camera Quick-Sheet → snap photo → Success animation + haptic → auto-advance to next stop. Failed delivery: tap red button → reason code sheet → optional photo/note → log & advance.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Swipe-to-complete and failed delivery interaction demo',
      caption: '[PLACEHOLDER — INTERACTION DEMO: Side-by-side recording — "Successful Delivery" swipe (left) vs. "Failed Delivery" reason logging (right) with animation callouts. MP4 with captions, portrait]',
      ratio: '9-16',
    },
    { t: 'h3', x: 'Flow 3: End-of-Day Summary' },
    {
      t: 'p',
      x: 'Last stop completed → Full-screen celebration transition (gradient burst #4D8BFF → #6C5CE7 → #B06CE7) → Daily Summary Screen with animated completion ring, count-up stats, and "You saved ~1.5 hours vs. manual routing!" insight → Share / Export CTA.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Summary screen celebration animation',
      caption: '[PLACEHOLDER — SUMMARY SCREEN RECORDING: 5-second Lottie or screen recording — celebration transition, ring animation, number count-up. Portrait 390×844px, MP4 / .lottie, dark mode]',
      ratio: '9-16',
    },

    // ── 8. Visual Design & UI Breakdown ──────────────────────────────────────
    { t: 'h2', x: '8. Visual Design & UI Breakdown' },

    { t: 'h3', x: 'Screen 1 — Home Screen' },
    {
      t: 'p',
      x: 'The home screen answers one question immediately: "What is my status today?" Today\'s Route Card occupies the top 40% of the screen. Quick Stats bar is always visible below without scrolling. Import & Create CTA is a large 56pt pill button using the full route gradient (#6FA0FF → #3D7DFF → #6C5CE7), pinned to the bottom safe area.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Home screen — empty, active, and completed states',
      caption: '[PLACEHOLDER — HOME SCREEN: 3 screenshots — (1) Empty state with onboarding CTA, (2) Active route card with progress bar, (3) End-of-day completed state. PNG, portrait, iPhone 15 Pro frame optional]',
      ratio: '9-16',
    },

    { t: 'h3', x: 'Screen 2 — Route Import & Scanning' },
    {
      t: 'p',
      x: 'The Bottom Sheet pattern maintains spatial context (map visible behind). Scan Mode uses a full-screen camera with a custom scanning overlay — a bright #3D7DFF laser line sweeps the frame. Address validation happens inline: valid addresses show a green ✓, unresolvable ones show a red ⚠ with a fix prompt. Shimmer loading states prevent the UI from feeling stuck.',
    },
    {
      t: 'gallery',
      items: [
        { src: '', alt: 'Empty import bottom sheet' },
        { src: '', alt: 'Scanning camera with laser animation' },
        { src: '', alt: 'Populated address list with mixed valid/invalid states' },
        { src: '', alt: 'All addresses resolved — ready to optimise state' },
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Scan animation video',
      caption: '[PLACEHOLDER — SCAN ANIMATION VIDEO: Scanner in action — camera feed in background, blue laser line sweeping, address text lifts into the list. 3–4 sec MP4 loop, 60fps]',
      ratio: '9-16',
    },

    { t: 'h3', x: 'Screen 3 — Route Preview Map' },
    {
      t: 'p',
      x: 'Custom map styling: dark mode uses deep navy land (#14181F), soft blue water (#0C1826), and subtle road overlays (White at 6–11% opacity). Stop pins use numbered squircle badges (16pt corner radius) rather than teardrop pins. A horizontal drag slider shows the "Before vs. After" comparison. Floating Stats Card uses a glassmorphic .ultraThinMaterial panel.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Route preview map dark mode and before/after slider',
      caption: '[PLACEHOLDER — ROUTE PREVIEW: 2 screenshots — (1) Route map in dark mode with custom styling and polyline overlay, (2) "Before vs. After" slider comparison view. PNG @2x, portrait iPhone frame]',
      ratio: '9-16',
    },

    { t: 'h3', x: 'Screen 4 — Active Navigation View' },
    {
      t: 'p',
      x: 'The most critical screen — drivers look at this 90% of their working day. Minimalist top card shows only turn instruction, distance, and street name. A thin animated blue progress bar tracks delivery progress. Glassmorphic bottom card (.ultraThinMaterial) shows customer name, address, and Complete / Failed action buttons. "Open in Maps" pill lets drivers launch their preferred navigation engine.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Annotated navigation screen dark and light mode',
      caption: '[PLACEHOLDER — NAVIGATION SCREEN: Side-by-side dark mode / light mode screenshots with annotations — (A) Progress bar, (B) Turn card, (C) Map canvas, (D) Glassmorphic delivery card, (E) Action buttons in thumb zone. Annotated PNG]',
      ratio: '16-9',
    },

    { t: 'h3', x: 'Screen 5 — Delivery Completion Sheet' },
    {
      t: 'p',
      x: 'Swipe-to-Complete: a draggable slider (not a button) prevents accidental completion while handling packages. Gradient fill (#30D158 → #1FA347) builds as the user drags. Inline Camera expands the sheet to a compact viewfinder — driver never leaves the screen. Failed reason codes are a grid of colored chips — red-tinted with clear labels.',
    },
    {
      t: 'gallery',
      items: [
        { src: '', alt: 'Swipe-to-complete at rest' },
        { src: '', alt: 'Mid-swipe with fill animation' },
        { src: '', alt: 'Success state — green checkmark and micro-animation' },
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Failed delivery reason code grid',
      caption: '[PLACEHOLDER — FAILED DELIVERY SCREEN: Reason-code grid — "Not Home" (amber), "Wrong Address" (red), "Refused" (red), "Damaged" (orange), "Other" (grey). PNG portrait]',
      ratio: '9-16',
    },

    { t: 'h3', x: 'Screen 6 — Daily Summary / End-of-Shift Celebration' },
    {
      t: 'p',
      x: 'Full-screen celebration gradient (#4D8BFF → #6C5CE7 → #B06CE7). All numbers count up using a Bouncy spring curve. Circular completion ring draws itself via CAShapeLayer path animation. The single most impactful metric — "You saved X hours today" — is displayed at twice the font size of other stats. Share button generates a shareable image card for WhatsApp.',
    },
    {
      t: 'image',
      src: '',
      alt: 'Full-bleed daily summary screen',
      caption: '[PLACEHOLDER — SUMMARY SCREEN: Full-screen screenshot — celebration gradient, animated ring at ~75% filled, all stat cards visible. PNG, portrait, no device frame (full bleed)]',
      ratio: '9-16',
    },

    // ── 9. The Design System ─────────────────────────────────────────────────
    { t: 'h2', x: '9. The Design System' },
    { t: 'h3', x: 'Color Palette' },
    {
      t: 'table',
      head: ['Token', 'Dark Mode', 'Light Mode', 'Purpose'],
      rows: [
        ['accent',        '#3D7DFF', '#3D7DFF', 'Primary actions, route lines'],
        ['accentSoft',    '#6FA0FF', '#6FA0FF', 'Gradient start, soft highlights'],
        ['accentDeep',    '#2C5CE0', '#2C5CE0', 'Pressed states'],
        ['indigo',        '#6C5CE7', '#6C5CE7', 'Selection, secondary brand'],
        ['success',       '#30D158', '#1FA347', 'Completed deliveries'],
        ['warning',       '#FFB020', '#FFB020', 'Alerts, flagged stops'],
        ['danger',        '#FF453A', '#D6362C', 'Failed deliveries'],
        ['background',    '#0A0B0E', '#F5F7FA', 'App-wide background'],
        ['surface',       '#171A21', '#FFFFFF', 'Cards, panels'],
        ['surfaceRaised', '#1E222B', '#F9FAFC', 'Elevated cards'],
        ['textPrimary',   '#FFFFFF', '#0C0D12', 'Primary text'],
        ['textSecondary', 'White @ 62%', 'Black @ 62%', 'Supporting text'],
        ['textTertiary',  'White @ 38%', 'Black @ 38%', 'Hints, labels'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Color token swatch grid',
      caption: '[PLACEHOLDER — COLOR SWATCHES: Styled swatch grid showing all tokens — name, hex values, and small usage example (mini button, card, status badge). 1200×500px, PNG wide landscape]',
      ratio: '12-5',
    },
    { t: 'h3', x: 'Typography' },
    {
      t: 'p',
      x: 'All text uses SF Pro Rounded — the rounded variant of the native iOS system font. The rounded terminals soften the aesthetic and align with the friendly, approachable tone of the product.',
    },
    {
      t: 'table',
      head: ['Style', 'Size', 'Weight', 'Usage'],
      rows: [
        ['Display',  '34pt', 'Bold',     'Daily summary hero stats'],
        ['Title 1',  '28pt', 'Bold',     'Screen headers'],
        ['Title 2',  '22pt', 'Semibold', 'Section titles'],
        ['Title 3',  '20pt', 'Semibold', 'Card titles'],
        ['Body',     '17pt', 'Regular',  'Delivery addresses, descriptions'],
        ['Callout',  '16pt', 'Medium',   'Secondary info'],
        ['Footnote', '13pt', 'Regular',  'Metadata, timestamps'],
        ['Caption',  '11pt', 'Regular',  'Hint text'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Typography scale specimen sheet',
      caption: '[PLACEHOLDER — TYPOGRAPHY SCALE: Specimen sheet showing all 8 styles in dark and light mode on their respective surfaces. 1200×700px, PNG landscape]',
      ratio: '16-9',
    },
    { t: 'h3', x: 'Animation Curves' },
    {
      t: 'table',
      head: ['Curve', 'Spring Config', 'Use Case'],
      rows: [
        ['Standard',    'response: 0.42, damping: 0.82', 'Screen transitions, card mounts'],
        ['Snappy',      'response: 0.30, damping: 0.78', 'Chips, toggles, small state changes'],
        ['Bouncy',      'response: 0.50, damping: 0.62', 'Celebration counters, success animations'],
        ['Sheet',       'response: 0.50, damping: 0.86', 'Bottom sheet slides'],
        ['Interactive', 'response: 0.28, damping: 0.86', 'Drag gestures, swipe interactions'],
        ['Ambient',     'easeInOut, duration: 2.4s',     'Map pulse, loading breathe'],
        ['Fade',        'easeInOut, duration: 0.25s',    'Crossfades, show/hide'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Animation spring curve diagrams',
      caption: '[PLACEHOLDER — ANIMATION CURVES VISUAL: Side-by-side spring graphs (X = time, Y = displacement) for Standard, Bouncy, and Sheet curves. 900×400px, SVG / PNG]',
      ratio: '9-4',
    },
    { t: 'h3', x: 'Haptic Map' },
    {
      t: 'table',
      head: ['User Action', 'Haptic Response', 'Why'],
      rows: [
        ['Tap any button',               '.light impact',              'Subtle acknowledgement'],
        ['Drag swipe-to-complete',        '.rigid as it snaps',         'Tactile snap confirmation'],
        ['Complete a delivery',           '.heavy + .success',          'Significant moment — earned reward'],
        ['Failed delivery logged',        '.warning notification',       'Alert without being alarming'],
        ['Route optimisation done',       '.success notification',       'Route is ready — reassurance'],
        ['Arrive at stop (auto)',          '.medium impact',             '"You\'re here" physical nudge'],
      ],
    },

    // ── 10. Accessibility & Edge Cases ────────────────────────────────────────
    { t: 'h2', x: '10. Accessibility & Edge Cases' },
    {
      t: 'cards',
      items: [
        { icon: 'type',        title: 'Dynamic Type',        desc: 'All text labels respect iOS Dynamic Type scaling with size caps to prevent layout breakage.' },
        { icon: 'eye',         title: 'VoiceOver',           desc: 'All interactive elements have descriptive accessibility labels. Swipe-to-complete uses accessibilityActivate() as an alternative.' },
        { icon: 'sliders',     title: 'Colour Blind Support', desc: 'Status states use both colour AND icon (green circle + checkmark; red circle + ×). Colour is never the sole signal.' },
        { icon: 'maximize',    title: 'Minimum Hit Targets',  desc: 'All interactive elements are minimum 44×44pt, even if the visual element is smaller — using invisible tap extensions.' },
      ],
    },
    {
      t: 'table',
      head: ['Edge Case', 'Design Solution'],
      rows: [
        ['No network (offline)',            'Routes are cached locally. Navigation continues offline. "Offline Mode" badge shown discreetly.'],
        ['Invalid/unresolvable address',    'Flagged with ⚠ icon. Driver can edit inline, drop pin manually on map, or skip.'],
        ['Mid-route phone call',            'Navigation state is preserved. App returns to the correct stop on resume.'],
        ['App killed mid-route',            'Route progress saved to local storage every 30 seconds. On relaunch, "Continue where you left off" prompt appears.'],
        ['Driver marks wrong stop done',    '30-second "Undo" toast appears. After timeout, reversal requires tapping the stop card.'],
        ['Battery below 20%',              'App auto-enters Low Power Mode — reduces map animations, disables ambient effects, darkens map canvas to OLED-black.'],
        ['Very long address (100+ chars)',  'Address text truncates after 2 lines with a "Show more" expansion. Map pin always shows correct location.'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Accessibility callout annotations',
      caption: '[PLACEHOLDER — ACCESSIBILITY CALLOUTS: Annotated screenshot of Navigation and Delivery Completion screens with 6–8 accessibility annotations (tap target sizes, VoiceOver labels, icon+colour redundancy). 800×900px, Annotated PNG]',
      ratio: '16-9',
    },

    // ── 11. Outcome & Impact ─────────────────────────────────────────────────
    { t: 'h2', x: '11. Outcome & Impact' },
    {
      t: 'p',
      x: 'Observed during a pilot with 12 drivers over 3 weeks:',
    },
    {
      t: 'table',
      head: ['Metric', 'Before', 'After', 'Improvement'],
      rows: [
        ['Route creation time',           '8–12 minutes',    '40–60 seconds',  '~92% faster'],
        ['Average daily driving distance', '68 km',           '54 km',          '-21% distance'],
        ['Failed deliveries per shift',   '7.3 average',     '4.9 average',    '-33% failure rate'],
        ['Time on non-driving tasks',     '61 min/day',      '18 min/day',     '-70% friction time'],
        ['End-of-day reporting time',     '15+ min (manual)',  '2 min (auto)',  '-87% time'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: '"Earlier, I spent more than an hour daily just planning the route. Now it takes two minutes."',
      x: '— Akash, Delivery Partner, Bengaluru',
    },
    {
      t: 'callout',
      kind: 'info',
      title: '"The photo proof feature alone saved me 3 customer disputes in one week."',
      x: '— Suresh, Fleet Driver, Mumbai',
    },
    {
      t: 'image',
      src: '',
      alt: 'Before/After impact infographic',
      caption: '[PLACEHOLDER — IMPACT INFOGRAPHIC: Visually designed infographic — 5 key "Before vs. After" metrics as large-format stat comparisons. Green accents for improvements, brand colours. 1200×600px, PNG 1:1 square]',
      ratio: '2-1',
    },

    // ── 0. Built in Swift — Not Just a Figma File ────────────────────────────
    { t: 'h2', x: '0. Built in Swift — Not Just a Figma File' },
    {
      t: 'p',
      x: 'Most portfolio case studies stop at the prototype. This one doesn\'t. After completing the full design in Figma, every screen was coded from scratch in Swift and SwiftUI — complete with real animations, physics-based interactions, haptic patterns, map integration, and a rich mock-data layer that makes the app behave exactly as it would in production.',
    },
    {
      t: 'callout',
      kind: 'tip',
      title: 'Design → Code. No handoff. No loss in translation.',
      x: 'Because the same person who designed every pixel also wrote every line of Swift, there is zero gap between intention and implementation. The spring curves in the spec file are the exact values in the codebase. The haptic map became literal UIFeedbackGenerator calls. The design system tokens became SwiftUI Color extensions.',
    },
    {
      t: 'stats',
      items: [
        { v: '6',       l: 'SwiftUI screens built' },
        { v: '150+',    l: 'Mock delivery stops' },
        { v: '100%',    l: 'Spec-to-code fidelity' },
        { v: '0',       l: 'Third-party UI libraries' },
      ],
    },

    { t: 'h3', x: 'Tech Stack' },
    {
      t: 'cards',
      items: [
        { icon: 'code',      title: 'Swift & SwiftUI',    desc: 'Declarative UI across all 6 screens. No UIKit fallbacks except where strictly needed for camera and haptics.' },
        { icon: 'map',       title: 'MapKit',             desc: 'Custom-styled map canvas, polyline route overlays, numbered squircle annotations, and camera tracking during navigation.' },
        { icon: 'database',  title: 'Core Data',          desc: 'Persistent storage for routes, stops, and delivery logs — survives app restarts mid-route.' },
        { icon: 'zap',       title: 'Combine',            desc: 'Reactive data flow between the route optimisation engine, map state, and delivery sheet UI.' },
        { icon: 'camera',    title: 'AVFoundation',       desc: 'Custom camera viewfinder embedded inline in the delivery sheet for proof-of-delivery photo capture.' },
        { icon: 'layers',    title: 'Mock Data Engine',   desc: 'A seeded JSON dataset of 150 realistic Indian delivery addresses, customer names, and order references — hot-swappable for production APIs.' },
      ],
    },

    { t: 'h3', x: 'How the Mock Data Layer Works' },
    {
      t: 'steps',
      items: [
        { title: 'Seed file loaded at launch',       desc: 'A bundled <code>mock_routes.json</code> contains 3 pre-built routes with 50 stops each — covering apartment complexes, commercial areas, and residential lanes across Bengaluru and Mumbai.' },
        { title: 'Decoded into Core Data',            desc: 'Stops are decoded into <code>DeliveryStop</code> managed objects on first launch, giving the app full offline persistence with no backend dependency.' },
        { title: 'RouteOptimiser runs nearest-neighbour', desc: 'A pure-Swift greedy nearest-neighbour algorithm reorders stops to minimise total travel distance. This is the same logic that would call a real routing API in production.' },
        { title: 'State machine drives the UI',       desc: 'A <code>RouteSessionStore</code> ObservableObject tracks the active stop, delivery status per stop, and session stats. Every view observes it via <code>@EnvironmentObject</code>.' },
        { title: 'All flows are fully exercisable',   desc: 'You can import a route, optimise it, navigate stop-by-stop, complete or fail each delivery, capture a photo, and reach the end-of-day summary — all on device, fully offline.' },
      ],
    },

    { t: 'h3', x: 'A Taste of the Code' },
    {
      t: 'code',
      file: 'RouteSessionStore.swift',
      lang: 'swift',
      x: `// Marks a stop as delivered, triggers haptics, and auto-advances.
func completeStop(_ stop: DeliveryStop, photo: UIImage?) {
    withAnimation(.spring(response: 0.50, dampingFraction: 0.86)) {
        stop.status = .delivered
        stop.completedAt = Date()
        if let img = photo {
            stop.photoProof = img.jpegData(compressionQuality: 0.8)
        }
        try? context.save()
    }

    // Paired haptics — heavy "thud" followed by success pattern
    let impact = UIImpactFeedbackGenerator(style: .heavy)
    let notify  = UINotificationFeedbackGenerator()
    impact.impactOccurred()
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.08) {
        notify.notificationOccurred(.success)
    }

    advanceToNextStop()
}`,
    },

    { t: 'h3', x: 'Screens Built in Swift' },
    {
      t: 'table',
      head: ['Screen', 'Key SwiftUI Techniques'],
      rows: [
        ['Home Screen',              'LazyVStack, matched geometry transitions, shimmer modifier via PhaseAnimator'],
        ['Import & Scan Sheet',      'AVCaptureSession in a UIViewRepresentable, custom laser overlay via Canvas, inline validation state machine'],
        ['Route Preview Map',        'MapKit MKPolylineRenderer, custom MKAnnotationView, UISlider for before/after comparison'],
        ['Active Navigation',        'MapCameraPosition tracking, glassmorphic .ultraThinMaterial bottom sheet, live progress bar'],
        ['Delivery Completion Sheet', 'Custom DragGesture swipe-to-complete, gradient fill via GeometryReader, AVCapturePhoto inline'],
        ['Daily Summary',            'CAShapeLayer completion ring via UIViewRepresentable, TimelineView counter animation, shareable snapshot via ImageRenderer'],
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'App running on device — all 6 screens',
      caption: '[PLACEHOLDER — DEVICE RECORDING: Screen recording of the full app running on iPhone — import → optimise → navigate → complete → summary. Portrait 390×844px, MP4, 60fps]',
      ratio: '9-16',
    },

    // ── 12. Lessons Learned ──────────────────────────────────────────────────
    { t: 'h2', x: '12. Lessons Learned' },
    { t: 'h3', x: 'What Worked Exceptionally Well' },
    {
      t: 'cards',
      items: [
        { icon: 'map',         title: 'Designing in the Field',         desc: 'The most critical insights — thumb-zone layout, haptics as primary feedback, dark-first — came from 2-hour ride-alongs, not desk research.' },
        { icon: 'activity',    title: 'Physicality as a Design Language', desc: 'Spring physics and haptics that match real-world task completion made the app intuitive without explanation. Drivers didn\'t read onboarding. They just used it.' },
        { icon: 'minimize2',   title: 'Respecting Cognitive Load',       desc: 'The delivery completion flow was initially 5 steps. After testing, reduced to 2 (swipe + photo). Every step removed increased speed and confidence.' },
      ],
    },
    { t: 'h3', x: 'What We\'d Do Differently' },
    {
      t: 'cards',
      items: [
        { icon: 'monitor',  title: 'Web Companion Dashboard Sooner',      desc: 'Fleet managers need a desktop dispatch and review view. The initial MVP underserved this persona and it became a gap.' },
        { icon: 'globe',    title: 'Address Language Barrier Earlier',    desc: 'OCR scanner initially supported English only. A large portion of Mumbai drivers received addresses in Marathi and Hindi. Multilingual OCR should have been Day 1.' },
        { icon: 'wifiOff',  title: 'Offline-First Architecture from Day 1', desc: 'Network reliability in delivery zones was inconsistent. Retrofitting offline support partway through was costly.' },
      ],
    },
    {
      t: 'image',
      src: '',
      alt: 'Process collage — sketches, wireframes, field visits',
      caption: '[PLACEHOLDER — PROCESS COLLAGE: 2×3 grid — whiteboard sketches, paper wireframes, early wireframe screenshots, field visit photos, user testing sessions. 1200×800px, photo collage, muted colours]',
      ratio: '3-2',
    },

  ],
};
