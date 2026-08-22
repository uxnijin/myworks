// ============================================================================
//  ShipFlow — Shipment Operations Dashboard (web)
//  B2B SaaS case study
//
//  Same structure as the mobile entries: problem, research, findings, the bet,
//  scope, the flow, the screens, the trade-offs, and how success would be
//  measured. Short text — the figures carry it.
//
//  Every figure is a screenshot of the real running product, captured by
//  tools/shipflow_capture.js (headless Chrome over file://, since ShipFlow is
//  static HTML with no build step) and converted by tools/web_figures.sh.
//  Individual captures live in shipflow-assets/screens/.
//  No bezel here — a desktop product is a desktop product.
// ============================================================================

BODY('shipflow', {
  blocks: [

    // ── Hero ────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/shipflow-assets/hero.webp',
      alt: 'The ShipFlow shipments dashboard: metric cards, filters and a shipment table with status badges',
      caption: 'The Shipments dashboard — the screen an operations team leaves open all day.',
    },

    { t: 'h3', x: 'A working product, not a prototype.' },
    {
      t: 'p',
      x: 'Every screen, state and interaction here runs real code. The dark theme is real CSS, the command palette opens on ⌘K, the charts are drawn on a live <code>&lt;canvas&gt;</code>, and the loading, empty, error and offline states are all reachable. <strong>Every image below is a screenshot of the running build.</strong>',
    },

    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Sole designer and front-end engineer'],
        ['Type', 'Self-directed product exercise'],
        ['Platform', 'Responsive web app'],
        ['Built with', 'Hand-written HTML, CSS and JavaScript - no framework, no build step, no dependencies'],
        ['Domain', 'Logistics operations - multi-carrier shipment management'],
        ['Status', 'Live and clickable, on a seeded mock data layer'],
      ],
    },

    // ══ 1 · Problem ═════════════════════════════════════════════════════════
    { t: 'h2', x: '1 · The problem' },
    {
      t: 'p',
      x: 'An operations team moves thousands of parcels a day across several carriers. Every carrier has its own portal, its own tracking format, and its own definition of what “delayed” means. So the working day becomes tab-juggling: five portals, a spreadsheet, and a sinking feeling about the parcels nobody has looked at yet.',
    },
    {
      t: 'p',
      x: 'And the job is not really “manage shipments”. It is <strong>triage</strong> - find the ones going wrong, before a customer calls to tell you.',
    },

    // ══ 2 · Research ════════════════════════════════════════════════════════
    { t: 'h2', x: '2 · What I did instead of guessing' },
    {
      t: 'p',
      x: 'Self-directed, so the limits are worth stating: <strong>no ops team was interviewed and no real operation was observed.</strong> What there is:',
    },
    {
      t: 'list',
      items: [
        '<strong>A walk through the carrier portals themselves</strong> - the actual tools this replaces - noting what each one makes easy and what each one buries.',
        '<strong>A read of the enterprise dashboards this sits next to</strong>, for the patterns operators already know: the table, the saved view, the command palette, the bulk action with an undo.',
        '<strong>Building it, then using it as an operator would</strong> - opening it cold each morning and asking whether the first screen answered the first question.',
      ],
    },
    {
      t: 'p',
      x: 'So this is a design argument built and pressure-tested by its author. Treat the reasoning as the deliverable, not the conclusions.',
    },

    // ══ 3 · Findings ════════════════════════════════════════════════════════
    { t: 'h2', x: '3 · What that pointed at' },
    {
      t: 'cards',
      items: [
        {
          icon: 'activity',
          title: 'The first screen must triage, not list',
          desc: 'A table of everything is a table of nothing. <strong>So:</strong> the numbers that need action — delayed, exceptions, unassigned — sit above the list and are themselves the filter.',
        },
        {
          icon: 'layers',
          title: 'Carriers disagree about words',
          desc: '“In transit” means five different things across five portals. <strong>So:</strong> one status vocabulary, five states, colour-coded, applied to every carrier alike.',
        },
        {
          icon: 'zap',
          title: 'Operators live on the keyboard',
          desc: 'This is a job, done all day, by the same people. <strong>So:</strong> ⌘K goes anywhere, and every destructive action has an undo rather than a confirm.',
        },
        {
          icon: 'checkCircle',
          title: 'The unhappy states are most of the job',
          desc: 'Exceptions, partial imports, dropped connections. <strong>So:</strong> every one of them is a designed screen, reachable in the build, not a spinner and a shrug.',
        },
      ],
    },

    // ══ 4 · The bet ═════════════════════════════════════════════════════════
    { t: 'h2', x: '4 · The bet' },
    {
      t: 'quote',
      x: 'The job is not managing shipments, it is finding the ones going wrong. So the product opens on what needs attention, and everything else is one keystroke away.',
      by: 'The one sentence every decision was tested against',
    },

    { t: 'h3', x: 'Four rules that settled the arguments' },
    {
      t: 'cards',
      items: [
        { icon: 'gauge', title: 'Answer the first question first', desc: 'What is late, what is unassigned, what lands today. The metric row is not decoration — each card is a filter you can act on.' },
        { icon: 'layers', title: 'One vocabulary across carriers', desc: 'Five statuses, one colour each, applied identically whether it is DHL, USPS, UPS or FedEx. The translation happens once, at the data layer.' },
        { icon: 'zap', title: 'Undo, not confirm', desc: 'Bulk actions apply immediately and offer an undo for a few seconds. A confirm dialog taxes every action to protect against the rare one.' },
        { icon: 'checkCircle', title: 'Every state is a screen', desc: 'Loading, empty, error, offline, partial success, forbidden. If it can happen, it is drawn and reachable in the build.' },
      ],
    },

    // ══ 5 · Feature inventory ═══════════════════════════════════════════════
    { t: 'h2', x: '5 · Everything it could have been' },
    {
      t: 'table',
      head: ['Area', 'What lives there'],
      rows: [
        ['<strong>Triage</strong>', 'The shipments dashboard with metric cards, filters, saved views, bulk actions and undo · the exception queue with severity, assignment and resolution · the inbox scan page'],
        ['<strong>One shipment</strong>', 'A cross-carrier timeline · notes · attachments · the activity log'],
        ['<strong>Planning</strong>', 'A delivery calendar with its own metric row · trends: on-time percentage, transit time, carrier performance, drawn on canvas'],
        ['<strong>Getting data in</strong>', 'CSV import with drag-and-drop, live progress, and partial-success reporting that names the rows it could not take'],
        ['<strong>Everything else</strong>', 'Notification centre · settings across profile, notifications, team and integrations · sign-in with its error state · 403 and 404 · a living style guide · the ⌘K command palette'],
      ],
    },

    // ══ 6 · Prioritisation ══════════════════════════════════════════════════
    { t: 'h2', x: '6 · What made the cut, and why' },
    {
      t: 'p',
      x: 'One rule decided scope: <strong>does this shorten the path to a parcel going wrong?</strong> That is what killed the four in the bottom-right corner - all of them standard in logistics software, all of them for somebody other than the person doing the work.',
    },
    {
      t: 'diagram',
      caption: 'The sort that set scope. Position is judgement, not measurement — the axes are mine, and the point is the reasoning.',
      svg: `<svg viewBox="0 0 720 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feature prioritisation: how much a feature shortens the path to a problem parcel, against build cost">
  <line x1="30" y1="238" x2="700" y2="238" class="d-l"/>
  <line x1="366" y1="20" x2="366" y2="424" class="d-l"/>
  <polygon points="700,238 690,233 690,243" class="d-arrow"/>
  <polygon points="366,20 361,30 371,30" class="d-arrow"/>

  <text x="34" y="52" class="d-m">SHIP FIRST</text>
  <circle cx="40" cy="76" r="4" class="d-dot-a"/><text x="54" y="80" class="d-s">Metric cards that are filters</text>
  <circle cx="40" cy="102" r="4" class="d-dot-a"/><text x="54" y="106" class="d-s">One status vocabulary</text>
  <circle cx="40" cy="128" r="4" class="d-dot-a"/><text x="54" y="132" class="d-s">Saved views in the sidebar</text>
  <circle cx="40" cy="154" r="4" class="d-dot-a"/><text x="54" y="158" class="d-s">Bulk actions with undo</text>
  <circle cx="40" cy="180" r="4" class="d-dot-a"/><text x="54" y="184" class="d-s">Two distinct empty states</text>

  <text x="384" y="52" class="d-m">WORTH THE WORK</text>
  <circle cx="390" cy="76" r="4" class="d-dot-a"/><text x="404" y="80" class="d-s">The ⌘K command palette</text>
  <circle cx="390" cy="102" r="4" class="d-dot-a"/><text x="404" y="106" class="d-s">The exception queue</text>
  <circle cx="390" cy="128" r="4" class="d-dot-a"/><text x="404" y="132" class="d-s">Partial-success import reporting</text>
  <circle cx="390" cy="154" r="4" class="d-dot-a"/><text x="404" y="158" class="d-s">A living style guide</text>
  <circle cx="390" cy="180" r="4" class="d-dot-a"/><text x="404" y="184" class="d-s">Two authored themes</text>

  <text x="34" y="282" class="d-m">LATER, NOT NEVER</text>
  <circle cx="40" cy="306" r="4" class="d-dot"/><text x="54" y="310" class="d-s">Custom report builder</text>
  <circle cx="40" cy="332" r="4" class="d-dot"/><text x="54" y="336" class="d-s">Scheduled digest emails</text>
  <circle cx="40" cy="358" r="4" class="d-dot"/><text x="54" y="362" class="d-s">Per-team permissions</text>

  <text x="384" y="282" class="d-m">CUT</text>
  <circle cx="390" cy="306" r="4" class="d-dot"/><text x="404" y="310" class="d-s">An executive KPI wall</text>
  <circle cx="390" cy="332" r="4" class="d-dot"/><text x="404" y="336" class="d-s">A live map of every parcel</text>
  <circle cx="390" cy="358" r="4" class="d-dot"/><text x="404" y="362" class="d-s">Agent leaderboards</text>
  <circle cx="390" cy="384" r="4" class="d-dot"/><text x="404" y="388" class="d-s">A chat widget for internal notes</text>

  <text x="30" y="452" class="d-m">LOW BUILD COST</text>
  <text x="700" y="452" class="d-m" text-anchor="end">HIGH BUILD COST</text>
  <text x="0" y="14" class="d-m">↑ SHORTENS THE PATH TO A PROBLEM PARCEL</text>
</svg>`,
    },
    {
      t: 'p',
      x: 'The live map is the one worth explaining. It demos beautifully and it is useless here: an operator does not need to know a parcel is somewhere in Ohio, they need to know it has not moved in two days. <strong>Position is not the signal - stalling is.</strong>',
    },

    // ══ 7 · Flow ════════════════════════════════════════════════════════════
    { t: 'h2', x: '7 · The core flow, end to end' },
    {
      t: 'p',
      x: 'A morning in the product: open it, find what is wrong, fix it, and get the day\'s new shipments in. Each phase carries one principle.',
    },
    {
      t: 'diagram',
      caption: 'Twelve steps. Phase one is the whole argument — the first screen is a triage screen, not a list.',
      svg: `<svg viewBox="0 0 720 578" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core flow: triage, investigate, resolve, and load tomorrow">

  <text x="0" y="12" class="d-m">1 · TRIAGE</text>
  <text x="720" y="12" class="d-m" text-anchor="end">ANSWER THE FIRST QUESTION FIRST</text>
  <rect x="0" y="24" width="220" height="60" rx="11" class="d-box-a"/>
  <text x="16" y="50" class="d-t">Open</text><text x="16" y="70" class="d-s">Delayed, exceptions, today</text>
  <rect x="250" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="50" class="d-t">Narrow</text><text x="266" y="70" class="d-s">A card, a filter, a saved view</text>
  <rect x="500" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="50" class="d-t">The queue</text><text x="516" y="70" class="d-s">Severity, then assignment</text>
  <line x1="220" y1="54" x2="244" y2="54" class="d-l"/><polygon points="250,54 242,50 242,58" class="d-arrow"/>
  <line x1="470" y1="54" x2="494" y2="54" class="d-l"/><polygon points="500,54 492,50 492,58" class="d-arrow"/>
  <text x="0" y="106" class="d-s" fill="var(--accent)">↳ the metric cards are the filters — reading a number and acting on it are the same gesture</text>
  <path d="M610 84 V118 q0 8 -8 8 H204 q-8 0 -8 8 V160" class="d-l"/>
  <polygon points="196,166 192,158 200,158" class="d-arrow"/>

  <text x="0" y="154" class="d-m">2 · INVESTIGATE</text>
  <text x="720" y="154" class="d-m" text-anchor="end">ONE VOCABULARY, ALL CARRIERS</text>
  <rect x="0" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="192" class="d-t">One shipment</text><text x="16" y="212" class="d-s">A single timeline</text>
  <rect x="250" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="192" class="d-t">The history</text><text x="266" y="212" class="d-s">Notes, files, activity</text>
  <rect x="500" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="192" class="d-t">The pattern</text><text x="516" y="212" class="d-s">Is this carrier slipping?</text>
  <line x1="220" y1="196" x2="244" y2="196" class="d-l"/><polygon points="250,196 242,192 242,200" class="d-arrow"/>
  <line x1="470" y1="196" x2="494" y2="196" class="d-l"/><polygon points="500,196 492,192 492,200" class="d-arrow"/>
  <text x="0" y="248" class="d-s" fill="var(--accent)">↳ ⌘K jumps straight to a tracking number from anywhere — no going back to the list</text>
  <path d="M610 226 V260 q0 8 -8 8 H204 q-8 0 -8 8 V302" class="d-l"/>
  <polygon points="196,308 192,300 200,300" class="d-arrow"/>

  <text x="0" y="296" class="d-m">3 · RESOLVE</text>
  <text x="720" y="296" class="d-m" text-anchor="end">UNDO, NOT CONFIRM</text>
  <rect x="0" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="334" class="d-t">Assign</text><text x="16" y="354" class="d-s">To a person, not a queue</text>
  <rect x="250" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="334" class="d-t">Act in bulk</text><text x="266" y="354" class="d-s">Select, apply, move on</text>
  <rect x="500" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="334" class="d-t">Undo</text><text x="516" y="354" class="d-s">A few seconds, then it sticks</text>
  <line x1="220" y1="338" x2="244" y2="338" class="d-l"/><polygon points="250,338 242,334 242,342" class="d-arrow"/>
  <line x1="470" y1="338" x2="494" y2="338" class="d-l"/><polygon points="500,338 492,334 492,342" class="d-arrow"/>
  <text x="0" y="390" class="d-s" fill="var(--accent)">↳ no confirm dialog — it taxes every action to protect against the rare one</text>
  <path d="M610 368 V402 q0 8 -8 8 H204 q-8 0 -8 8 V444" class="d-l"/>
  <polygon points="196,450 192,442 200,442" class="d-arrow"/>

  <text x="0" y="438" class="d-m">4 · LOAD TOMORROW</text>
  <text x="720" y="438" class="d-m" text-anchor="end">PARTIAL SUCCESS IS THE NORMAL CASE</text>
  <rect x="0" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="476" class="d-t">Import</text><text x="16" y="496" class="d-s">Drag a CSV in</text>
  <rect x="250" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="476" class="d-t">The report</text><text x="266" y="496" class="d-s">Which rows, and why</text>
  <rect x="500" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="476" class="d-t">Tomorrow</text><text x="516" y="496" class="d-s">The calendar, and trends</text>
  <line x1="220" y1="480" x2="244" y2="480" class="d-l"/><polygon points="250,480 242,476 242,484" class="d-arrow"/>
  <line x1="470" y1="480" x2="494" y2="480" class="d-l"/><polygon points="500,480 492,476 492,484" class="d-arrow"/>
  <text x="0" y="532" class="d-s" fill="var(--accent)">↳ an import that half-works is the usual outcome — so the report names the rows it refused</text>
  <text x="0" y="558" class="d-s" fill="var(--accent)">↻ and the loop starts again tomorrow, on the same first screen</text>
</svg>`,
    },

    // ══ 8 · Triage ══════════════════════════════════════════════════════════
    { t: 'h2', x: '8 · The first screen is a triage screen' },
    {
      t: 'p',
      x: 'The metric row is the design decision. Five numbers - in transit, delivered today, delayed, exceptions, pending pickup - and each one is <em>clickable</em>, filtering the table underneath. Reading the number and acting on it are the same gesture, which is what stops the row being decoration.',
    },
    {
      t: 'p',
      x: 'Underneath, the table earns its keep by being boring: one row per shipment, status as a coloured badge from a five-word vocabulary, and an ETA column that says “Delivered” rather than a date when a date would be noise. Saved views live in the sidebar, because the same three questions get asked every morning.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/exceptions.webp',
      alt: 'The exception queue, grouped by severity with assignment and resolution controls',
      caption: 'The exception queue. Severity first, then who owns it — because an unassigned exception is the one that becomes a phone call.',
    },

    // ══ 9 · One shipment ════════════════════════════════════════════════════
    { t: 'h2', x: '9 · One shipment, one timeline' },
    {
      t: 'p',
      x: 'Carriers disagree about vocabulary, so the shipment page translates once and then speaks one language: a single timeline, notes, attachments and an activity log, with the raw carrier events still available underneath for the times somebody has to argue with a carrier.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/shipment.webp',
      alt: 'A single shipment page with its timeline, notes, attachments and activity log',
      caption: 'One shipment. The timeline is the translation layer — everything above it is ShipFlow’s words, not the carrier’s.',
    },

    // ══ 10 · Keyboard ═══════════════════════════════════════════════════════
    { t: 'h2', x: '10 · Built for people who live in it' },
    {
      t: 'p',
      x: 'This is a job, done all day, by the same handful of people - so it is built for the second week, not the first hour. ⌘K opens a command palette that jumps to any page or any tracking number, with arrow-key navigation. Every new page has to be added to its index, which is a deliberate bit of friction: a page that cannot be reached from the palette is a page that will be forgotten.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/palette.webp',
      alt: 'The command palette open over the dashboard, showing pages and shipments',
      caption: '⌘K from anywhere. Pages and shipments in one list, because an operator does not think of them as different things.',
    },

    // ══ 11 · Import ═════════════════════════════════════════════════════════
    { t: 'h2', x: '11 · An import that half-works is the normal case' },
    {
      t: 'p',
      x: 'CSV import is where operations software usually gives up: it either succeeds or it throws a wall of red. In practice most imports are <em>partial</em> - 200 rows in, three of them malformed - so the design leads with what came in, then names the rows it refused and why, in a form you can fix and re-upload.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/import.webp',
      alt: 'The CSV import screen with a drag-and-drop zone, progress, and a partial-success report',
      caption: 'Drag, watch, then read what didn’t make it. The failures are rows with reasons, not a count.',
    },

    // ══ 12 · Planning ═══════════════════════════════════════════════════════
    { t: 'h2', x: '12 · Looking further than today' },
    {
      t: 'image',
      src: '/shipflow-assets/calendar.webp',
      alt: 'The delivery calendar with metric cards above it',
      caption: 'The calendar answers a different question from the table: not “what is wrong now” but “what is landing, and can we absorb it”.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/reports.webp',
      alt: 'The reports screen: on-time percentage, transit time and carrier performance charts',
      caption: 'Trends, drawn on a live canvas — on-time percentage, transit time, and which carrier is quietly slipping.',
    },

    // ══ 13 · System ═════════════════════════════════════════════════════════
    { t: 'h2', x: '13 · The system, and a style guide that is part of it' },
    {
      t: 'p',
      x: 'Two shared stylesheets carry the whole product: one of tokens - colour, type, spacing, radius, motion, z-index - and one component library. There is no framework and no build step, which is a constraint that turned out to be useful: with nothing to hide behind, the component library has to be genuinely reusable or the pages fall apart.',
    },
    {
      t: 'p',
      x: 'The style guide is a page <em>in</em> the product, not a document beside it, so it can never describe a component that no longer exists.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/guide.webp',
      alt: 'The living style guide page showing the component library',
      caption: 'The style guide is a route in the app. Checking it before inventing a new pattern is the rule that keeps twelve pages looking like one product.',
    },

    // ══ 14 · Dark ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '14 · Two themes, one set of tokens' },
    {
      t: 'p',
      x: 'The dark theme swaps token values on the root element - no component knows which theme it is in. The status colours are the interesting part: they have to stay distinguishable and keep their meaning against a near-black table as well as a near-white one, which is a stricter constraint than it sounds.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/dark.webp',
      alt: 'The shipments dashboard in dark mode',
      caption: 'The same dashboard, dark. The five status colours had to survive the switch without any of them turning into another.',
    },

    // ══ 15 · States ═════════════════════════════════════════════════════════
    { t: 'h2', x: '15 · Every state is a screen' },
    {
      t: 'p',
      x: 'Sign-in with its error state, a 404, a 403, an offline banner driven by real <code>online</code>/<code>offline</code> events, loading skeletons that match the row they replace, and two distinct empty states - “nothing here” and “your filters excluded everything” are different problems with different fixes.',
    },
    {
      t: 'image',
      src: '/shipflow-assets/notfound.webp',
      alt: 'The 404 page',
      caption: 'A dead end, designed. It is a small thing, and it is the difference between a prototype and a product.',
    },

    // ══ 16 · Trade-offs ═════════════════════════════════════════════════════
    { t: 'h2', x: '16 · The trade-offs' },
    {
      t: 'table',
      head: ['What I chose', 'What it cost', 'Why I took it anyway'],
      rows: [
        [
          '<strong>No framework, no build step.</strong>',
          'Repetition — the nav and shell are duplicated across twelve HTML files, and a change to either means twelve edits.',
          'It forces the shared CSS to actually be shared, it loads instantly, and anybody can open a file and read the whole page. For a design artefact that is the right trade; for a real product it is not.',
        ],
        [
          '<strong>Undo instead of confirm.</strong>',
          'A genuinely destructive bulk action can slip through if nobody is looking at the toast.',
          'A confirm dialog taxes every single action to protect against the rare one. Undo puts the cost on the mistake instead of on the work.',
        ],
        [
          '<strong>Metric cards that are filters.</strong>',
          'They cannot then also be a place for trend sparklines or targets — they have one job.',
          'A number you cannot act on is a poster. Making the row clickable is what turns the dashboard into a triage tool.',
        ],
        [
          '<strong>One status vocabulary across carriers.</strong>',
          'Real carrier nuance is flattened, and occasionally that nuance matters.',
          'Five words everyone knows beats forty words nobody agrees on. The raw carrier scans are still one click away for the arguments.',
        ],
        [
          '<strong>No live map.</strong>',
          'The most demo-friendly screen in the category, missing.',
          'An operator does not need to know a parcel is somewhere in Ohio. They need to know it has not moved in two days. Position is not the signal.',
        ],
      ],
    },

    // ══ 17 · Measurement ════════════════════════════════════════════════════
    { t: 'h2', x: '17 · How I\'d know it worked' },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['<strong>North star</strong>', 'Time from a shipment going wrong to somebody owning it. Everything in the triage phase exists to shorten that.'],
        ['<strong>The triage test</strong>', 'How often the first click of a session is a metric card. If people scroll past the row into the table, the row is decoration and should go.'],
        ['<strong>Keyboard adoption</strong>', '⌘K uses per session, by week of tenure. It should climb — if it does not, the palette is not finding what people search for.'],
        ['<strong>Undo rate</strong>', 'How often undo is actually pressed. Very high means the bulk actions are too easy to trigger; zero means nobody has noticed the toast.'],
        ['<strong>Import quality</strong>', 'Rows rejected per import, and how many get fixed and re-uploaded. A report nobody acts on is a report that failed to explain itself.'],
        ['<strong>The first experiment</strong>', 'Triage-first against list-first, on the same data. It is the central claim here and the easiest one to be wrong about.'],
      ],
    },

    // ══ 18 · Scope ══════════════════════════════════════════════════════════
    { t: 'h2', x: '18 · What isn\'t built' },
    {
      t: 'p',
      x: 'No backend - the data layer is mock with simulated latency, though the page scripts already treat it as async, so wiring real <code>fetch</code> calls in would not change the render logic. No authentication behind the sign-in screen. No real carrier integrations, which is the actual hard part of this product. And nobody who does this job for a living has used it, which is why section 17 is a plan rather than a result.',
    },
    {
      t: 'stats',
      items: [
        { v: '12', l: 'fully built screens' },
        { v: '5', l: 'status states, one vocabulary' },
        { v: '2', l: 'authored themes' },
        { v: '0', l: 'frameworks, libraries or build steps' },
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'Enterprise software gets ugly because nobody has to sell it to the person using it. The whole discipline here was to design for the second week — the day the novelty has gone and it is just the tool you open at nine.',
      by: 'Design intent, ShipFlow',
    },
  ],
});
