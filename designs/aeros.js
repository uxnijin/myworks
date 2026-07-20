// ============================================================================
//  Aeros: Smart Home Climate Control
//  Web (Consumer IoT Dashboard) Design Case Study
//
//  Designed and built in code. A running prototype with a live simulation
//  behind it, not a Figma file.
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────────
//  THE ONLY LINE TO EDIT WHEN THE BUILD GOES LIVE.
//  Paste the URL here and every product button turns on at once: the CTA in
//  the page header, "Open the product" in the TOC rail, and the launch card
//  at the end of the case study. '#' is a placeholder.
// ─────────────────────────────────────────────────────────────────────────────
const AEROS_URL = '#';

const DESIGN_AEROS = {
  slug: 'aeros',
  name: 'Aeros: Smart Home Climate Control',
  category: 'Web',
  icon: 'gauge',
  tag: 'Case Study',
  status: 'Prototype',
  url: AEROS_URL,
  summary: 'A dark, sensor-driven climate dashboard for the connected home — designed and coded end to end, with a live simulation running underneath every number.',
  lede: 'End-to-end product design and front-end engineering for a smart-home climate dashboard. Aeros reads temperature, humidity, CO₂, particulates and air quality across four rooms and turns them into something a person can actually act on. I designed every screen and interaction, then built it in React. Every value on screen is driven by a running simulation — turn the ventilation up and CO₂ really does fall.',
  tech: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Hand-rolled SVG', 'No chart library'],
  blocks: [

    // ── This is real ──────────────────────────────────────────────────────────
    {
      t: 'callout',
      kind: 'success',
      title: 'Nothing here is a static mockup.',
      x: 'The sensor values drift, the controls change real state, and every screen is reachable. The charts are hand-drawn SVG. The room illustrations are generated in code. Raise ventilation on the temperature screen and you can watch CO₂ come down over the next few ticks.',
    },

    // ── Hero ──────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/aeros-assets/overview.webp',
      alt: 'Aeros Overview screen showing temperature, humidity, health score, air quality and CO₂ cards for the Lounge',
      caption: 'The Overview is the screen you land on: one room, five vital signs, and the energy it is costing.',
      ratio: '16-9',
    },

    // ── At a glance ───────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; Front-end Engineer'],
        ['Platform', 'Responsive web app, dark-only'],
        ['Domain', 'Smart home / consumer IoT climate control'],
        ['Built with', 'React 19, Vite, Tailwind and Framer Motion — no chart, icon or UI library'],
        ['Deliverable', 'A running, interactive prototype'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '8', l: 'Fully built screens' },
        { v: '13', l: 'Overlays and drawers' },
        { v: '48', l: 'Hand-drawn icons' },
        { v: '0', l: 'Chart libraries' },
      ],
    },

    // ── 1. The Problem ────────────────────────────────────────────────────────
    { t: 'h2', x: '1. The Problem' },
    {
      t: 'p',
      x: 'Most smart-home apps are remote controls with a graph bolted on. They will happily tell you the CO₂ is 940 ppm. They will not tell you whether that is bad, why it happened, or what to do about it.',
    },
    {
      t: 'p',
      x: 'Air quality is the hard case. Five gases, five different units, five different danger thresholds, and no intuition to fall back on — most people have no idea what a normal VOC reading looks like. A dashboard that just prints the numbers has moved the problem, not solved it.',
    },
    {
      t: 'table',
      head: ['#', 'The daily pain', 'What it costs the person'],
      rows: [
        ['P1', 'Readings with no reference point', 'A number means nothing without a "should I care?"'],
        ['P2', 'Gases measured in incomparable units', 'PM2.5 in µg/m³ next to CO₂ in ppm reads as noise'],
        ['P3', 'Each room checked separately', 'The room that actually needs attention stays hidden'],
        ['P4', 'Data shown, decisions not offered', 'You are left to infer the fix yourself'],
        ['P5', 'Energy cost divorced from comfort', 'No sense of what comfort is costing you'],
      ],
    },

    // ── 2. Design Principles ──────────────────────────────────────────────────
    { t: 'h2', x: '2. Design Principles' },
    {
      t: 'p',
      x: 'Four rules held the whole thing together, and each one shows up as a concrete decision later in this case study.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'gauge', title: 'Always give a reference', desc: 'Every reading is drawn against the threshold where it stops being fine, never against the raw sensor range.' },
        { icon: 'droplet', title: 'Two colours, one meaning', desc: 'Oxygen blue is normal, warm ether is attention. Colour never decorates — it only ever says "look here".' },
        { icon: 'activity', title: 'Coupled, not random', desc: 'The simulation is physically consistent, so the interface can never contradict itself.' },
        { icon: 'zap', title: 'End in an action', desc: 'Every insight carries the change that resolves it, one tap away.' },
      ],
    },

    // ── 3. The Design System ──────────────────────────────────────────────────
    { t: 'h2', x: '3. The Design System, Built in Code' },
    {
      t: 'p',
      x: 'There is no Figma library behind this. The system lives in the Tailwind theme — surfaces, brand, and text as named tokens, so a colour is chosen by role rather than by eye.',
    },
    { t: 'h3', x: 'Colour' },
    {
      t: 'table',
      head: ['Token', 'Value', 'Role'],
      rows: [
        ['Oxygen blue', '#3B72ED', 'Normal, healthy, in range — the default state of everything'],
        ['Warm ether', '#F18D74', 'Above threshold, needs attention — used sparingly and never for decoration'],
        ['Midnight carbon', '#080B14 → #1B2440', 'Six graded surfaces, from page void up to raised card'],
        ['Ink / mute / faint', '#EEF2FC → #5B678E', 'Three text levels; hierarchy comes from contrast, not size'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Why only two accent colours',
      x: 'A climate dashboard is tempting to paint — a colour per gas, a colour per room. But then colour stops meaning anything. Restricting the palette to "fine" and "not fine" means a single warm bar anywhere on screen is instantly readable as the thing to deal with.',
    },
    {
      t: 'code',
      file: 'tailwind.config.js',
      lang: 'js',
      x: `colors: {
  // Core surfaces — "Midnight Carbon" family
  void: '#080B14',  deep: '#0B1020',  panel: '#0F1526',
  card: '#151D33',  raised: '#1B2440', line: '#232D4A',

  // Brand — the only two accents in the system
  oxygen: { DEFAULT: '#3B72ED', soft: '#5B8AF5', deep: '#2A56C4' },
  ether:  { DEFAULT: '#F18D74', soft: '#F7AC98', deep: '#D96E54' },

  // Text — hierarchy by contrast, not by size
  ink: '#EEF2FC', mute: '#8E9BBF', faint: '#5B678E',
}`,
    },
    { t: 'h3', x: 'Type, surface and motion' },
    {
      t: 'table',
      head: ['Token', 'Value', 'Purpose'],
      rows: [
        ['Typeface', 'Outfit', 'A geometric sans, set at weight 300 so large numerals stay calm'],
        ['Radius', '20 / 28 / 36px', 'Generously round — the soft counterweight to a very dark palette'],
        ['Surface', 'Blur 18px + 3.5% top-light gradient', 'Cards catch light from above instead of sitting flat'],
        ['Motion', '0.4–0.55s, cubic-bezier(0.22, 1, 0.36, 1)', 'A single easing curve everywhere; settles rather than bounces'],
        ['Elevation', 'Inset hairline + long soft shadow', 'Depth without borders, which would fight the dark surfaces'],
      ],
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-eco-toggle.webp',
      alt: 'Close-up of the Aeros eco mode toggle showing the hairline border and raised sub-surface',
      caption: 'One control, up close: a sub-surface panel at 5% white, a hairline border, and a state line under the label rather than beside it.',
    },

    // ── 4. Core Screens ───────────────────────────────────────────────────────
    { t: 'h2', x: '4. Core Screens' },

    { t: 'h3', x: 'Overview' },
    {
      t: 'p',
      x: 'One room at a time. Temperature takes the hero card because it is the thing people actually came to change; humidity, health, air quality and CO₂ sit beside it as equals. The left rail carries the room itself — name, illustration, device count — so you always know which space you are looking at.',
    },
    {
      t: 'gallery',
      items: [
        { src: '/aeros-assets/overview-bedroom.webp', alt: 'Aeros Overview for the Bedroom', caption: 'Bedroom' },
        { src: '/aeros-assets/overview-kitchen.webp', alt: 'Aeros Overview for the Kitchen', caption: 'Kitchen' },
      ],
    },
    {
      t: 'p',
      x: 'The room illustration in the rail is generated, not photographed — layered wall wash, drifting light and furniture silhouettes drawn as SVG per room type. It keeps the build self-contained while still reading as <em>this physical room, lit the way it is right now</em>.',
    },

    { t: 'h3', x: 'Environment' },
    {
      t: 'p',
      x: 'The whole-home view, and the one screen that answers a question the Overview cannot: which room needs me first. A strain ranking puts the worst room up top with a direct route into it, rather than leaving you to compare four cards yourself.',
    },
    {
      t: 'image',
      src: '/aeros-assets/environment.webp',
      alt: 'Aeros Environment screen comparing all four rooms with a strain ranking and cross-room trends',
      caption: 'Needs attention names one room and gives you a button into it. That is the whole point of the screen.',
      ratio: '16-9',
    },

    { t: 'h3', x: 'Energy' },
    {
      t: 'p',
      x: 'Consumption broken down by day, room and device class, with a load curve and costed savings. Savings are shown in currency rather than kilowatt-hours — kWh is a unit almost nobody has intuition for.',
    },
    {
      t: 'image',
      src: '/aeros-assets/energy.webp',
      alt: 'Aeros Energy screen showing consumption by day, room and device class with a load curve',
      caption: 'The diagonal hatching on the weekly bars is a texture, not a colour — it keeps the palette to two accents.',
      ratio: '16-9',
    },

    { t: 'h3', x: 'Devices' },
    {
      t: 'p',
      x: 'Every paired device grouped by room, with working toggles, signal and battery, and an expandable detail row. Grouping by room rather than by type matches how people actually think about their home.',
    },
    {
      t: 'image',
      src: '/aeros-assets/devices.webp',
      alt: 'Aeros Devices screen listing paired devices grouped by room with toggles, signal and battery',
      caption: 'Twenty-five devices across four rooms, each with real toggle state.',
      ratio: '16-9',
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-device-row.webp',
      alt: 'Close-up of a single Aeros device row showing icon, name, state and status dot',
      caption: 'A single device row: icon tile, name, live state line, and a status dot that carries the only colour.',
    },

    { t: 'h3', x: 'AI Insights' },
    {
      t: 'p',
      x: 'Ranked recommendations, each with a confidence meter, the expected effect, and a one-tap apply. An insight that does not end in a button is just a fact — the apply action is what makes the screen worth opening.',
    },
    {
      t: 'image',
      src: '/aeros-assets/insights.webp',
      alt: 'Aeros AI Insights screen with ranked recommendations, confidence meters and apply actions',
      caption: 'Every card states the observation, the confidence, the expected change, and the action.',
      ratio: '16-9',
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-confidence.webp',
      alt: 'Close-up of a single AI insight card with its confidence meter and apply action',
      caption: 'One insight card up close. The confidence meter is the reason the Apply button is trustworthy.',
    },

    // ── 5. Detail Screens ─────────────────────────────────────────────────────
    { t: 'h2', x: '5. Detail Screens' },

    { t: 'h3', x: 'Air Temperature — the full control surface' },
    {
      t: 'p',
      x: 'The one screen where you change things rather than read them. Mode, ventilation, eco, a tick-slider target, schedule and quick actions, arranged so the current temperature stays the largest thing on screen and the target sits directly under your thumb.',
    },
    {
      t: 'image',
      src: '/aeros-assets/air-temperature.webp',
      alt: 'Aeros Air Temperature detail screen with mode, ventilation, eco mode, tick slider and schedule',
      caption: 'Current reading above, target below, and a live estimate of how long it will take to get there.',
      ratio: '16-9',
    },
    { t: 'h3', x: 'Up close: the tick slider' },
    {
      t: 'p',
      x: 'The target control is 64 hairlines rather than a bar. Their heights ramp along the track so the ruler reads as a gradient of density, the passed portion fills with increasing opacity, and past 72% it crosses from oxygen blue into warm ether — you feel yourself entering the expensive end of the range before you read the number.',
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-tick-slider.webp',
      alt: 'Extreme close-up of the Aeros tick slider showing 64 graded hairlines and the ether handle',
      caption: 'Captured at 2.5×. Every tick is a 1px span with its own computed height and fill.',
    },
    {
      t: 'p',
      x: 'Here is the real thing, rebuilt in plain JavaScript with the same geometry and the same easing. Drag it, click anywhere on the track, or focus it and use the arrow keys.',
    },
    { t: 'demo', kind: 'aeros-slider' },

    { t: 'h3', x: 'Air Composition — five gases made comparable' },
    {
      t: 'p',
      x: 'PM2.5, CO₂, VOC, HCHO and CO as gauge columns. This is the screen the whole colour system was designed around, and it is where the single most useful decision in the project lives.',
    },
    {
      t: 'image',
      src: '/aeros-assets/air-composition.webp',
      alt: 'Aeros Air Composition screen showing PM2.5, CO2, VOC, HCHO and CO as gauge columns',
      caption: 'Five gases, five unit systems, one readable comparison.',
      ratio: '16-9',
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Gauge columns scale to the action threshold, not the sensor range',
      x: 'Each column is drawn so that a reading sitting exactly at its warning value lands exactly on the "Normal" gridline. That one rule makes five gases with wildly different units directly comparable: anything above the line needs attention, anything below it does not. You no longer need to know what a bad VOC number looks like — the chart tells you.',
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-gauges.webp',
      alt: 'Close-up of the Aeros gauge columns showing hatched bars, hairline stems and value pills',
      caption: 'The stem-and-pill construction up close: a hairline drops from each pill to its hatched column.',
    },
    {
      t: 'p',
      x: 'Drag the room condition below. Every gas is scaled by the same factor, but each one crosses the Normal line at its own warning threshold — PM2.5 at 25 µg/m³, CO₂ at 1000 ppm, HCHO at 0.1 mg/m³. Watch which one turns first.',
    },
    { t: 'demo', kind: 'aeros-gauge' },

    { t: 'h3', x: 'Metric detail' },
    {
      t: 'p',
      x: 'Humidity, health, air quality and CO₂ share one detail layout — history, context, and a route across to the neighbouring metrics. Building four bespoke screens would have been four chances to drift apart.',
    },
    {
      t: 'gallery',
      items: [
        { src: '/aeros-assets/metric-humidity.webp', alt: 'Humidity detail screen', caption: 'Humidity' },
        { src: '/aeros-assets/metric-health.webp', alt: 'Health score detail screen', caption: 'Health score' },
        { src: '/aeros-assets/metric-co2.webp', alt: 'CO2 detail screen', caption: 'CO₂' },
      ],
    },

    // ── 6. The charts ─────────────────────────────────────────────────────────
    { t: 'h2', x: '6. Nine Charts, Drawn by Hand' },
    {
      t: 'p',
      x: 'Every chart is hand-rolled SVG rather than a charting library. The sparkline gradient, the hairline tick columns, the diagonal-hatched weekly bars and the stem-and-pill gauge columns are all specific enough that a general-purpose library would have been a fight, not a shortcut.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'activity', title: 'Sparkline', desc: 'Blue-to-ether gradient fill; the warm end marks where the series is heading.' },
        { icon: 'slider', title: 'Tick bars', desc: 'Hairline columns with rank-based highlighting, used for dense sensor history.' },
        { icon: 'layers', title: 'Hatch bars', desc: 'Weekly totals textured with diagonal hatching instead of a second colour.' },
        { icon: 'gauge', title: 'Gauge columns', desc: 'Threshold-normalised stems and pills — the air composition workhorse.' },
        { icon: 'timer', title: 'Radial arc', desc: 'Single-value progress against a bounded range.' },
        { icon: 'droplet', title: 'Donut and split bar', desc: 'Share-of-total breakdowns for energy by device class.' },
      ],
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-sparkline.webp',
      alt: 'Close-up of the Aeros sparkline showing the blue to ether gradient stroke and area fill',
      caption: 'The sparkline stroke shifts blue → ether across its width, so the recent end reads warm without a second series.',
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-hatchbars.webp',
      alt: 'Close-up of the diagonal-hatched weekly bars with the selected day capped solid',
      caption: 'Diagonal hatching at 2.2px on a 6px pitch — texture doing the work a second accent colour would otherwise do.',
    },
    { t: 'h3', x: 'Highlight by rank, not by threshold' },
    {
      t: 'p',
      x: 'The first version of the tick chart accented any bar above a fixed cut-off. On a trending series that pushes half the bars over the line and paints a solid warm block — which reads as alarming, and tells you nothing. Taking the top N values instead keeps the accent to a scattered handful however the data moves.',
    },
    {
      t: 'code',
      file: 'src/components/charts/Charts.jsx',
      lang: 'js',
      x: `/**
 * Highlight by rank, not by threshold. A trending series pushes half its bars
 * past any fixed cut-off, which paints a solid ether block; taking the top N
 * keeps the accent to a scattered handful however the data moves.
 */
const hotSet = useMemo(
  () =>
    new Set(
      data
        .map((p, i) => [p.v, i])
        .sort((a, b) => b[0] - a[0])
        .slice(0, hotCount)
        .map(([, i]) => i),
    ),
  [data, hotCount],
)`,
    },
    {
      t: 'image',
      src: '/aeros-assets/crop-tickbars.webp',
      alt: 'Close-up of the tick bars with six ranked bars accented in ether among the blue',
      caption: 'Six accents, scattered across the series — not a block at the tall end.',
    },
    {
      t: 'p',
      x: 'The difference is easier to feel than to read. Switch between the two rules below on the same trending data, and generate a new series to confirm it holds however the numbers move.',
    },
    { t: 'demo', kind: 'aeros-rank' },
    {
      t: 'callout',
      kind: 'warning',
      title: 'Hatching is CSS, not an SVG pattern',
      x: 'An SVG <code>&lt;pattern&gt;</code> defined in a detached <code>&lt;svg&gt;</code> cannot be referenced from a DOM element’s <code>background</code>. The hatch textures ended up as <code>repeating-linear-gradient</code> values exported as constants, which also made them reusable on plain <code>&lt;div&gt;</code> elements.',
    },

    // ── 7. The simulation ─────────────────────────────────────────────────────
    { t: 'h2', x: '7. A Coupled Simulation, Not Random Noise' },
    {
      t: 'p',
      x: 'A dashboard demo usually fakes movement with a random walk. That falls apart the moment someone touches a control — you turn the ventilation up and nothing happens, because nothing is connected to anything.',
    },
    {
      t: 'p',
      x: 'Aeros runs a coupled model on a 3.2 second tick. Temperature eases toward its target and eco mode widens the band. Ventilation actively pulls CO₂ down while a closed room lets it climb. Air quality follows CO₂ and particulates inversely. Health score is a weighted blend of the other four. The interface can never contradict itself, because the numbers are derived from each other rather than rolled independently.',
    },
    {
      t: 'code',
      file: 'src/store.jsx',
      lang: 'js',
      x: `// Temperature eases toward target; eco mode allows a wider band.
const pull = (r.target - r.metrics.temp) * (r.eco ? 0.035 : 0.06)
const temp = clamp(r.metrics.temp + pull + jitter(0.16), 15, 34)

// Ventilation actively pulls CO₂ down; a closed room lets it climb.
const ventPull = r.ventOn ? -(r.ventRpm / 1000) * 5.5 : 4.5
const co2 = clamp(r.metrics.co2 + ventPull + jitter(16), 400, 1500)

// Air quality follows CO₂ and particulates inversely.
const aqTarget = clamp(118 - co2 / 12 - r.gases.pm25 * 0.7, 10, 98)

// Health score is a weighted blend of the other four.
const healthTarget = clamp(comfort * 0.3 + humComfort * 0.2 + aq * 0.5, 20, 99)`,
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Seeded history, live present',
      x: 'The historical series come from a seeded xorshift PRNG, so every room’s past is identical on every reload. Charts feel like a real product with a real history rather than noise that reshuffles on render — while the present keeps moving.',
    },

    // ── 8. Overlays ───────────────────────────────────────────────────────────
    { t: 'h2', x: '8. Thirteen Overlays' },
    {
      t: 'p',
      x: 'Command palette, notifications, settings, customize, schedules, automations, add room, add device, analyse, AI optimization, quick actions, room control and sensors. Each one is designed and reachable — the parts of a product that usually stay as a placeholder rectangle.',
    },
    {
      t: 'gallery',
      items: [
        { src: '/aeros-assets/command-palette.webp', alt: 'Aeros command palette opened with ⌘K', caption: 'Command palette (⌘K)' },
        { src: '/aeros-assets/notifications.webp', alt: 'Aeros notifications overlay', caption: 'Notifications' },
        { src: '/aeros-assets/settings.webp', alt: 'Aeros settings overlay', caption: 'Settings' },
        { src: '/aeros-assets/customize.webp', alt: 'Aeros customize drawer for toggling overview cards', caption: 'Customize' },
        { src: '/aeros-assets/schedules.webp', alt: 'Aeros schedules overlay listing recurring climate profiles', caption: 'Schedules' },
        { src: '/aeros-assets/room-control.webp', alt: 'Aeros room control overlay with mode, ventilation and target', caption: 'Room control' },
        { src: '/aeros-assets/sensors.webp', alt: 'Aeros sensors overlay', caption: 'Sensors' },
        { src: '/aeros-assets/analyse.webp', alt: 'Aeros analyse overlay', caption: 'Analyse' },
      ],
    },
    {
      t: 'p',
      x: 'The customize drawer is the one with teeth: it toggles which cards appear on the Overview, which means the Overview layout has to hold up with any subset of its cards missing.',
    },

    // ── 9. Keyboard ───────────────────────────────────────────────────────────
    { t: 'h2', x: '9. Driving It From the Keyboard' },
    {
      t: 'p',
      x: 'A wall-mounted or always-open dashboard gets used in passing, often one-handed on a trackpad or not touched at all for hours. The keyboard paths matter more than they would in a form-heavy app.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'search', title: 'Command palette', desc: '⌘K or Ctrl-K opens search from anywhere, including inside a detail screen.' },
        { icon: 'chevronLeft', title: 'Escape steps back', desc: 'Escape closes an overlay, or steps out of a detail screen — one level at a time, never both at once.' },
        { icon: 'moveH', title: 'Arrow-key target', desc: 'The temperature slider moves with arrow keys once focused, not just by drag.' },
        { icon: 'zap', title: 'Apply without leaving', desc: 'Insights and quick actions commit in place, so nothing needs a round trip through a settings screen.' },
      ],
    },

    // ── 10. Reflection ────────────────────────────────────────────────────────
    { t: 'h2', x: '10. What I Would Build Next' },
    {
      t: 'cards',
      items: [
        { icon: 'smartphone', title: 'A responsive layout', desc: 'This is a desktop-width dashboard today — the 300px room rail is fixed and does not collapse. Small screens need their own layout, not a reflow of this one.' },
        { icon: 'globe', title: 'Real sensor hardware', desc: 'Bind the store to actual device APIs — the simulation already models the shape the data would arrive in.' },
        { icon: 'timer', title: 'Learned schedules', desc: 'Turn the applied insights into a feedback loop that proposes schedule changes on its own.' },
        { icon: 'sun', title: 'A light theme', desc: 'The system is dark-only today. Every surface token would need re-balancing, not inverting.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Designed in code, on purpose',
      x: 'Threshold-normalised gauges, rank-based highlighting and a coupled simulation are not things you can evaluate in a static mockup. They only reveal themselves as good or bad once the data is moving — which is the argument for designing this kind of product in code in the first place.',
    },
    {
      t: 'launch',
      title: 'Open the live build',
      desc: 'Walk the five screens, hit ⌘K, turn the ventilation up and watch CO₂ fall.',
      url: AEROS_URL,
      label: 'Launch Aeros',
    },

  ],
};
