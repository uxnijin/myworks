// ============================================================================
//  Oppam - A Companion, Not an App
//  Mobile case study (concept redesign of oppam.me)
//
//  Structure follows the shape a design panel reads for: problem, research,
//  findings, the bet, the principles, the work, the trade-offs, the other
//  side of the marketplace, and how success would be measured. Short text,
//  figures carry the weight.
//
//  Every figure is a screenshot of the running SwiftUI app, composed by
//  tools/oppam_figures.sh. Individual captures live in oppam-assets/screens/.
//  Research is secondary and cited - there are no interviews behind this and
//  the copy says so. Do not add invented metrics, quotes or pilots.
// ============================================================================

BODY('oppam', {
  blocks: [

    // ── Hero ────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/oppam-assets/hero.webp',
      alt: 'Five Oppam screens: the welcome, home, a therapist introduction, the journal, and the therapist console',
      caption: 'The first screen, home, a therapist, your pages - and the fifth phone is the therapist\'s own app. Both sides are built.',
    },

    { t: 'h3', x: 'A concept redesign, and every screen is real.' },
    {
      t: 'p',
      x: 'Oppam is a therapy service in Kerala (<strong>oppam.me</strong>). This is an independent redesign of it as a native iOS app - not commissioned, not shipped. Therapist names, photos, prices and concern areas come from the live site; everything else I designed and built. <strong>Every image below is a screenshot of the running app</strong>, captured from an iPhone simulator - not a mockup, not a render.',
    },

    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Sole designer and engineer - research, IA, UI, motion, build'],
        ['Type', 'Self-initiated concept redesign of a live product'],
        ['Platform', 'iOS 18 - iPhone, plus a home-screen widget'],
        ['Built with', 'SwiftUI, SwiftData, WidgetKit - 38 files, ~10,600 lines, no UI libraries'],
        ['People in it', 'Two: someone seeking care, and the therapist on the other side'],
        ['Status', 'Runnable prototype. On-device only - no cloud, no account, no real payment.'],
      ],
    },

    // ══ 1 · Problem ═════════════════════════════════════════════════════════
    { t: 'h2', x: '1 · The problem' },
    {
      t: 'p',
      x: 'Kerala has more psychiatrists per person than any other state in India. It still leaves most people untreated. <strong>So the wall is not a shortage of therapists.</strong>',
    },
    {
      t: 'p',
      x: 'The wall is the walk to the door. Most people who would benefit never ask at all - and they stop somewhere upstream of the app, long before price or availability matters.',
    },
    {
      t: 'stats',
      items: [
        { v: '83%', l: 'of Indians with a mental-health condition get no treatment (NMHS)' },
        { v: '1.2', l: 'psychiatrists per 100,000 in Kerala - the highest in India' },
        { v: '0', l: 'accounts Oppam asks you to create' },
      ],
    },

    // ══ 2 · Research ════════════════════════════════════════════════════════
    { t: 'h2', x: '2 · What I did instead of guessing' },
    {
      t: 'p',
      x: 'This is self-initiated, so there was no research budget and no recruited panel. I would rather say that plainly than dress it up: <strong>there are no user interviews behind this.</strong> What there is:',
    },
    {
      t: 'list',
      items: [
        '<strong>The National Mental Health Survey</strong> (NIMHANS, 2015-16) and the Kerala paper drawn from it - the size and the shape of the gap, and stigma named in its own qualitative findings.',
        '<strong>Published work on shared phones</strong> in Indian households - who else can see your screen, and what that does to help-seeking.',
        '<strong>A teardown of the live oppam.me service</strong> - its therapist roster, prices, concern areas, languages and hours.',
        '<strong>A walk through the category</strong> - every competing app from first open to booking, marking each place I hesitated and why.',
      ],
    },
    {
      t: 'p',
      x: 'Five situations kept the decisions concrete: the student who types what she can\'t say aloud, the new mother whose only free hour is 10 PM, the husband working Gulf hours, the professional running on four hours of sleep, and the person who simply doesn\'t want to be alone tonight. <strong>Those are archetypes drawn from that reading, not people I interviewed</strong> - and I would replace them with real ones the day there was a budget for it.',
    },

    // ══ 3 · Findings ════════════════════════════════════════════════════════
    { t: 'h2', x: '3 · Four findings, and what each one changed' },
    {
      t: 'cards',
      items: [
        {
          icon: 'activity',
          title: 'Supply is not the bottleneck',
          desc: 'The best-served state in India still leaves most people untreated. <strong>So:</strong> design the ten minutes <em>before</em> the booking, not the booking engine.',
        },
        {
          icon: 'verified',
          title: 'The phone is not private',
          desc: 'Homes and handsets get shared; a sibling borrows the device. <strong>So:</strong> privacy has to be something you can watch working - a room, not a policy page.',
        },
        {
          icon: 'book',
          title: 'Nobody knows what happens in there',
          desc: 'The unknown first session is the tallest wall. <strong>So:</strong> every therapist answers it in their own recorded voice, before you pay anything.',
        },
        {
          icon: 'globe',
          title: 'A directory asks the hardest question first',
          desc: 'Evaluate strangers and choose correctly, while anxious. <strong>So:</strong> bring three people forward and say plainly why each of them.',
        },
      ],
    },

    // ══ 4 · The bet ═════════════════════════════════════════════════════════
    { t: 'h2', x: '4 · The bet' },
    {
      t: 'quote',
      x: 'Oppam is not a therapy app. It is the feeling of someone quietly coming to sit beside you - and its real job is the moment before someone asks for help, not the transaction afterwards.',
      by: 'The one sentence every decision was tested against',
    },

    { t: 'h3', x: 'Four rules that settled the arguments' },
    {
      t: 'cards',
      items: [
        { icon: 'sun', title: 'Trust before identity', desc: 'Nothing is asked before trust is earned. No account, no email - a first name, and even that is optional.' },
        { icon: 'layers', title: 'One loud action', desc: 'Exactly one thing on a screen may raise its voice. Everything else is an invitation you can ignore.' },
        { icon: 'droplet', title: 'Visible, not promised', desc: 'If you can\'t see a protection working, it isn\'t a feature. Every toggle shows what it actually does.' },
        { icon: 'moon', title: 'Presence, not performance', desc: 'The companion never gamifies, never guilt-trips, never speaks first, and never pretends to be a therapist.' },
      ],
    },


    // ══ 5 · Feature inventory ═══════════════════════════════════════════════
    { t: 'h2', x: '5 · Everything it could have been' },
    {
      t: 'p',
      x: 'Before cutting anything, I wrote down every feature the product could carry, grouped by the room it would live in. Twenty-two of them are in the running prototype; the rest are named further down rather than quietly dropped.',
    },
    {
      t: 'table',
      head: ['Room', 'What lives there'],
      rows: [
        ['<strong>Home</strong> — the veranda', 'A sky and a companion that follow the hour · the inner-weather check-in · your next or live session · a two-minute 4-2-6 breath · small wins'],
        ['<strong>Care</strong>', 'Feeling-led matching · three introductions with reasons · a recorded voice introduction · “how I work,” in their own words · the full directory with search and four categories · booking in four steps · video, voice or chat · the live room · a kind, skippable rating · history with one-tap rebooking'],
        ['<strong>Pages</strong>', 'A Face-ID door · the journal · letters sealed until their day · the garden of small wins'],
        ['<strong>You</strong>', 'The Privacy Room · neutral notifications with a live preview · the app-switcher cover · language of the heart · real Kerala helplines · session history'],
        ['<strong>Everywhere</strong>', 'The offline ribbon · eleven designed empty and error states · a home-screen widget'],
        ['<strong>The console</strong>', 'Today · People with care signals · a file and notes per person · the calendar and the hours you open · earnings with the 70/30 split · your public listing · supervision and escalation'],
      ],
    },

    // ══ 6 · Prioritisation ══════════════════════════════════════════════════
    { t: 'h2', x: '6 · What made the cut, and why' },
    {
      t: 'p',
      x: 'One rule decided scope: <strong>does this move somebody closer to asking for help?</strong> Anything that only made the app stickier lost. That rule is what killed the four features in the bottom-right corner - all of them normal in this category, all of them working on the wrong problem.',
    },
    {
      t: 'diagram',
      caption: 'The sort that set scope. Position here is judgement, not measurement - the axes are mine, and the point is the reasoning, not the coordinates.',
      svg: `<svg viewBox="0 0 720 486" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feature prioritisation: effect on the moment of asking, against build cost">
  <line x1="30" y1="238" x2="700" y2="238" class="d-l"/>
  <line x1="366" y1="20" x2="366" y2="424" class="d-l"/>
  <polygon points="700,238 690,233 690,243" class="d-arrow"/>
  <polygon points="366,20 361,30 371,30" class="d-arrow"/>

  <text x="34" y="52" class="d-m">SHIP FIRST</text>
  <circle cx="40" cy="76" r="4" class="d-dot-a"/><text x="54" y="80" class="d-s">No account, ever</text>
  <circle cx="40" cy="102" r="4" class="d-dot-a"/><text x="54" y="106" class="d-s">A price on every card</text>
  <circle cx="40" cy="128" r="4" class="d-dot-a"/><text x="54" y="132" class="d-s">Neutral notifications</text>
  <circle cx="40" cy="154" r="4" class="d-dot-a"/><text x="54" y="158" class="d-s">“Just let me look around”</text>
  <circle cx="40" cy="180" r="4" class="d-dot-a"/><text x="54" y="184" class="d-s">Video, voice or chat</text>

  <text x="384" y="52" class="d-m">WORTH THE WORK</text>
  <circle cx="390" cy="76" r="4" class="d-dot-a"/><text x="404" y="80" class="d-s">The companion</text>
  <circle cx="390" cy="102" r="4" class="d-dot-a"/><text x="404" y="106" class="d-s">Three introductions, with reasons</text>
  <circle cx="390" cy="128" r="4" class="d-dot-a"/><text x="404" y="132" class="d-s">Recorded voice introductions</text>
  <circle cx="390" cy="154" r="4" class="d-dot-a"/><text x="404" y="158" class="d-s">The Privacy Room</text>
  <circle cx="390" cy="180" r="4" class="d-dot-a"/><text x="404" y="184" class="d-s">The therapist console</text>

  <text x="34" y="282" class="d-m">LATER, NOT NEVER</text>
  <circle cx="40" cy="306" r="4" class="d-dot"/><text x="54" y="310" class="d-s">The home-screen widget</text>
  <circle cx="40" cy="332" r="4" class="d-dot"/><text x="54" y="336" class="d-s">Letters to your future self</text>
  <circle cx="40" cy="358" r="4" class="d-dot"/><text x="54" y="362" class="d-s">Live Activity countdown</text>

  <text x="384" y="282" class="d-m">CUT</text>
  <circle cx="390" cy="306" r="4" class="d-dot"/><text x="404" y="310" class="d-s">An AI chat “therapist”</text>
  <circle cx="390" cy="332" r="4" class="d-dot"/><text x="404" y="336" class="d-s">Streaks, XP and badges</text>
  <circle cx="390" cy="358" r="4" class="d-dot"/><text x="404" y="362" class="d-s">A community forum</text>
  <circle cx="390" cy="384" r="4" class="d-dot"/><text x="404" y="388" class="d-s">A mood analytics dashboard</text>

  <text x="30" y="452" class="d-m">LOW BUILD COST</text>
  <text x="700" y="452" class="d-m" text-anchor="end">HIGH BUILD COST</text>
  <text x="0" y="14" class="d-m">↑ MOVES SOMEONE CLOSER TO ASKING</text>
</svg>`,
    },

    // ══ 7 · User flow ═══════════════════════════════════════════════════════
    { t: 'h2', x: '7 · The core flow, end to end' },
    {
      t: 'p',
      x: 'Twelve steps, from opening the app to sitting with somebody. The thing worth noticing is what <em>isn\'t</em> on it - no sign-up, no verification, no intake questionnaire. Each of the four phases carries one principle, and the orange notes are the exits and the recoveries: the places a real person hesitates, or something breaks.',
    },
    {
      t: 'diagram',
      caption: 'Four phases, twelve steps. The loop at the end is the point of the whole thing - a second session is one tap, from a screen you were already on.',
      svg: `<svg viewBox="0 0 720 578" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The core user flow: arrive, find someone, book, and sit with them">

  <text x="0" y="12" class="d-m">1 · ARRIVE</text>
  <text x="720" y="12" class="d-m" text-anchor="end">NOTHING IS ASKED</text>
  <rect x="0" y="24" width="220" height="60" rx="11" class="d-box-a"/>
  <text x="16" y="50" class="d-t">Open</text><text x="16" y="70" class="d-s">No account, no email</text>
  <rect x="250" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="50" class="d-t">A name</text><text x="266" y="70" class="d-s">Any name, or skip it</text>
  <rect x="500" y="24" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="50" class="d-t">Home</text><text x="516" y="70" class="d-s">The veranda, by the hour</text>
  <line x1="220" y1="54" x2="244" y2="54" class="d-l"/><polygon points="250,54 242,50 242,58" class="d-arrow"/>
  <line x1="470" y1="54" x2="494" y2="54" class="d-l"/><polygon points="500,54 492,50 492,58" class="d-arrow"/>
  <text x="0" y="106" class="d-s" fill="var(--accent)">↳ the category puts a sign-up wall here — it is where people quietly leave</text>
  <path d="M610 84 V118 q0 8 -8 8 H204 q-8 0 -8 8 V160" class="d-l"/>
  <polygon points="196,166 192,158 200,158" class="d-arrow"/>

  <text x="0" y="154" class="d-m">2 · FIND SOMEONE</text>
  <text x="720" y="154" class="d-m" text-anchor="end">INTRODUCED, NOT LISTED</text>
  <rect x="0" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="192" class="d-t">Care</text><text x="16" y="212" class="d-s">Name a feeling</text>
  <rect x="250" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="192" class="d-t">Three introductions</text><text x="266" y="212" class="d-s">Each with its reason</text>
  <rect x="500" y="166" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="192" class="d-t">A therapist</text><text x="516" y="212" class="d-s">Voice note, in their words</text>
  <line x1="220" y1="196" x2="244" y2="196" class="d-l"/><polygon points="250,196 242,192 242,200" class="d-arrow"/>
  <line x1="470" y1="196" x2="494" y2="196" class="d-l"/><polygon points="500,196 492,192 492,200" class="d-arrow"/>
  <text x="250" y="248" class="d-s" fill="var(--accent)">↳ or see everyone, in the full directory</text>
  <path d="M610 226 V260 q0 8 -8 8 H204 q-8 0 -8 8 V302" class="d-l"/>
  <polygon points="196,308 192,300 200,300" class="d-arrow"/>

  <text x="0" y="296" class="d-m">3 · BOOK</text>
  <text x="720" y="296" class="d-m" text-anchor="end">PRICE UP FRONT</text>
  <rect x="0" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="334" class="d-t">Book</text><text x="16" y="354" class="d-s">Plan, time, how you’ll meet</text>
  <rect x="250" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="334" class="d-t">Review</text><text x="266" y="354" class="d-s">The bill, in plain words</text>
  <rect x="500" y="308" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="334" class="d-t">Confirmed</text><text x="516" y="354" class="d-s">One neutral reminder</text>
  <line x1="220" y1="338" x2="244" y2="338" class="d-l"/><polygon points="250,338 242,334 242,342" class="d-arrow"/>
  <line x1="470" y1="338" x2="494" y2="338" class="d-l"/><polygon points="500,338 492,334 492,342" class="d-arrow"/>
  <text x="250" y="390" class="d-s" fill="var(--accent)">↳ declined card → nothing charged, slot held</text>
  <path d="M610 368 V402 q0 8 -8 8 H204 q-8 0 -8 8 V444" class="d-l"/>
  <polygon points="196,450 192,442 200,442" class="d-arrow"/>

  <text x="0" y="438" class="d-m">4 · SIT WITH THEM</text>
  <text x="720" y="438" class="d-m" text-anchor="end">HELD ALL THE WAY THROUGH</text>
  <rect x="0" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="16" y="476" class="d-t">Join</text><text x="16" y="496" class="d-s">From Home, one tap</text>
  <rect x="250" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="266" y="476" class="d-t">The session</text><text x="266" y="496" class="d-s">Nothing is recorded</text>
  <rect x="500" y="450" width="220" height="60" rx="11" class="d-box"/>
  <text x="516" y="476" class="d-t">Rating</text><text x="516" y="496" class="d-s">Skippable, then history</text>
  <line x1="220" y1="480" x2="244" y2="480" class="d-l"/><polygon points="250,480 242,476 242,484" class="d-arrow"/>
  <line x1="470" y1="480" x2="494" y2="480" class="d-l"/><polygon points="500,480 492,476 492,484" class="d-arrow"/>
  <text x="0" y="532" class="d-s" fill="var(--accent)">↳ a low rating offers a different fit — no awkwardness, no explaining</text>
  <text x="0" y="558" class="d-s" fill="var(--accent)">↻ book again — one tap from history, straight back to phase 3</text>
</svg>`,
    },

    // ══ 8 · Onboarding ══════════════════════════════════════════════════════
    { t: 'h2', x: '8 · The first sixty seconds' },
    {
      t: 'p',
      x: 'The riskiest screen in the product is the first one. Most therapy apps open with a sign-up wall, which is where a frightened person quietly leaves. Oppam opens with a sunrise and asks for one thing - a name, any name. <strong>"Just let me look around" skips even that.</strong>',
    },
    {
      t: 'image',
      src: '/oppam-assets/onboarding.webp',
      alt: 'Five onboarding screens: welcome, a name, language, what brings you, and the privacy promise',
      caption: 'Arrival, a name, the language you feel in, what\'s sitting with you (optional), one privacy promise. No email. No password.',
    },

    // ══ 9 · Home ════════════════════════════════════════════════════════════
    { t: 'h2', x: '9 · Home is a veranda, not a dashboard' },
    {
      t: 'p',
      x: 'The sky follows the hour. After 9 PM the companion grows sleepy-lidded and lights a lantern - it stays up with you rather than logging off.',
    },
    {
      t: 'image',
      src: '/oppam-assets/home-times.webp',
      alt: 'The home screen at morning, afternoon, evening and night',
      caption: 'One screen, four times of day. No badges, no counters, no streak to protect.',
    },

    // ══ 10 · Care ════════════════════════════════════════════════════════════
    { t: 'h2', x: '10 · Introduced, not listed' },
    {
      t: 'p',
      x: 'You name a feeling - and <em>"Just want to talk"</em> is one of them. Oppam brings three people forward and says why each one: <em>"sits with anxiety often," "evening &amp; night times."</em> Each has a voice note, so you hear a person before you pay. The full searchable directory is still one tap deeper.',
    },
    {
      t: 'image',
      src: '/oppam-assets/care.webp',
      alt: 'Care: naming a feeling, three matched introductions, and a therapist profile',
      caption: 'Name a feeling, meet three people with reasons attached, then read one in their own words. "Introductions, not listings."',
    },

    // ══ 11 · Booking ═════════════════════════════════════════════════════════
    { t: 'h2', x: '11 · The price is on the card' },
    {
      t: 'p',
      x: 'Cost opacity is one of the reasons people never start, so every price is stated per session, up front. Longer plans cost less and are never pushed, and the bill is itemised in plain words before anything is confirmed.',
    },
    {
      t: 'image',
      src: '/oppam-assets/booking.webp',
      alt: 'The four booking steps - plan, time, how to meet, and the bill - then the confirmation',
      caption: 'A rhythm, a time, how you\'d like to meet, then the bill. "No hidden fees. Cancel anytime before a session and it stays as a credit." It ends on "nothing to prepare, come exactly as you are."',
    },

    // ══ 12 · Session ═════════════════════════════════════════════════════════
    { t: 'h2', x: '12 · The session is held all the way through' },
    {
      t: 'p',
      x: 'Most platforms hand you to a generic call and disappear. Here the session surfaces on Home with one Join, the room stays in the app\'s own warmth, and afterwards you\'re asked how it went - gently, and "maybe later" is always there.',
    },
    {
      t: 'image',
      src: '/oppam-assets/session.webp',
      alt: 'The connected session room, and session history',
      caption: 'The room says "this stays between you two. Oppam never records." Afterwards, a history you can rebook from in one tap.',
    },

    // ══ 13 · Pages ══════════════════════════════════════════════════════════
    { t: 'h2', x: '13 · A garden that can only grow' },
    {
      t: 'p',
      x: 'The journal lives behind Face ID, on the phone, and nowhere else. Prompts can be switched off, spelling doesn\'t matter, and Malayalam, English or Manglish are all fine. Small wins plant a garden that never wilts.',
    },
    {
      t: 'image',
      src: '/oppam-assets/pages.webp',
      alt: 'The Pages journal, the writing composer, and the letter-to-future-self composer',
      caption: 'The garden and your entries; a composer whose only prompt can be turned off; and a letter you can seal for months.',
    },

    // ══ 14 · Privacy ════════════════════════════════════════════════════════
    { t: 'h2', x: '14 · Privacy you can watch working' },
    {
      t: 'p',
      x: 'In a shared home, privacy is not a compliance checkbox - it is the thing standing between someone and getting help at all. So it gets its own room, and every protection <strong>shows you exactly what someone else would see.</strong>',
    },
    {
      t: 'image',
      src: '/oppam-assets/privacy.webp',
      alt: 'The Face-ID door, the Privacy Room, the app-switcher cover, and the You tab',
      caption: 'A locked door on your pages; a room where every protection explains itself; the sunrise the app switcher shows; and a You tab kept deliberately tiny. The notification preview is the real text a family member would see.',
    },

    // ══ 15 · Companion ══════════════════════════════════════════════════════
    { t: 'h2', x: '15 · The companion' },
    {
      t: 'p',
      x: 'The logo, alive. It is drawn as animatable geometry rather than an imported image, which is the whole reason it can breathe, blink and change register in real time. <strong>Its mood always sits one step softer than yours</strong> - tender when you are heavy, quietly pleased when you win, never louder than you.',
    },
    {
      t: 'image',
      src: '/oppam-assets/companion.webp',
      alt: 'The five companion moods, the breathing exercise, and the night companion holding a lantern',
      caption: 'Five registers from one face - this board is rendered live by the app, not drawn by hand. Beside it: the 4-2-6 breath, and the companion after 9 PM.',
    },
    {
      t: 'p',
      x: 'Stillness reads as dead; breath reads as present. It runs a slow eight-second breathing cycle at 2.5% scale and blinks every three to six seconds. Under Reduce Motion, every one of those collapses to a cross-fade.',
    },
    {
      t: 'image',
      src: '/oppam-assets/motion-breathe.gif',
      alt: 'The companion breathing - one full cycle, captured from the running app',
      caption: 'One breathing cycle, captured frame by frame from the simulator. Static screenshots can\'t carry this part.',
    },
    {
      t: 'p',
      x: 'The same face sits on the home screen too - a WidgetKit widget carrying the greeting for the hour and nothing private. It asks for nothing, and a tap opens straight into a two-minute breath.',
    },

    // ══ 16 · Trade-offs ═════════════════════════════════════════════════════
    { t: 'h2', x: '16 · The trade-offs' },
    {
      t: 'p',
      x: 'Every one of these had a real cost. Naming the cost is the point - these are the decisions I would expect to defend in a design review.',
    },
    {
      t: 'table',
      head: ['What I chose', 'What it cost', 'Why I took it anyway'],
      rows: [
        [
          '<strong>No account, ever.</strong>',
          'No sync, no recovery if the phone is lost, no history that follows you to a new device.',
          'The sign-up wall is the last screen many people ever see. Continuity is carried on the therapist\'s side instead, so care survives without the person having an identity.',
        ],
        [
          '<strong>Three introductions before the directory.</strong>',
          'Less felt control, and it hides how much choice actually exists.',
          'Choosing between strangers is the hardest task to hand an anxious person. Each match states its reason in plain words, and "see everyone" is one tap away - so the logic stays visible.',
        ],
        [
          '<strong>A character, not a neutral clinical UI.</strong>',
          'Characters can read as childish, they date badly, and they risk trivialising the subject.',
          'It is the one thing a competitor cannot copy from a template, and it makes the empty and error screens bearable. Four hard rules keep it from becoming a toy.',
        ],
        [
          '<strong>A garden instead of streaks.</strong>',
          'A measurably weaker daily-return hook. Streaks work.',
          'A streak breaks on the day someone needs the app most. That is the wrong day to punish somebody.',
        ],
        [
          '<strong>Everything on the device.</strong>',
          'No backup, no cross-device access, and no analytics on the part of the product people use most.',
          'The threat model here is a family member holding your unlocked phone, not a remote attacker. On-device is the only answer that addresses it.',
        ],
        [
          '<strong>The price on every card.</strong>',
          'Price becomes a filter early, and probably costs the more expensive therapists some bookings.',
          'Fear of packages and hidden fees is a documented reason people never begin. Hiding it would win the click and lose the trust.',
        ],
      ],
    },

    // ══ 17 · The therapist's app ════════════════════════════════════════════
    { t: 'h2', x: '17 · The other half: the therapist\'s app' },
    {
      t: 'p',
      x: 'A marketplace with a beautiful client app and a neglected provider portal is half a product. So the same app has a second side. Same paper, same sun, same serif voice - <strong>in working clothes.</strong> It answers three questions in order: who\'s next, who needs something, and what\'s left of the day.',
    },
    {
      t: 'image',
      src: '/oppam-assets/practice-day.webp',
      alt: 'The therapist console: today, incoming requests, the session room and the note composer',
      caption: 'Today leads with the live session and the one-line note you left yourself last time. Requests say "nobody is timing you." The room records nothing. A note is written "the way you\'d say it to a colleague you trust."',
    },
    {
      t: 'p',
      x: 'There is no risk score anywhere. A person gets one of three words - <strong>Steady, Keep an eye, Reach out</strong> - and each one says what to <em>do</em>, not what the person <em>is</em>. The journal never crosses over: the console can\'t see a single page.',
    },
    {
      t: 'image',
      src: '/oppam-assets/practice-people.webp',
      alt: 'The People list with care signals, a client file, and unfinished notes',
      caption: 'People, not cases. The file shows a first name and only what that person chose to share - including the words they typed on day one. "Unfinished notes aren\'t a backlog."',
    },
    {
      t: 'p',
      x: 'The business side is stated in words, not buried: <strong>the therapist keeps 70% of every session</strong>, the split is spelled out, and the payout date sits on the card. Nothing is auto-booked. And if a week passes twenty-five sessions, the console quietly stops offering new people until the therapist says otherwise.',
    },
    {
      t: 'image',
      src: '/oppam-assets/practice-work.webp',
      alt: 'Calendar, practice profile, earnings, the public listing, and supervision & support',
      caption: 'Hours you open yourself, earnings with the split written out, your listing "exactly as someone sees it at 2 AM deciding whether to trust you," and an on-call clinical lead answered in under three minutes.',
    },

    // ══ 18 · Rough weather ══════════════════════════════════════════════════
    { t: 'h2', x: '18 · The bad days are designed too' },
    {
      t: 'p',
      x: 'A gentle product earns its calm exactly when things break. Every failure state says the same three things: <strong>it wasn\'t your fault, nothing was lost, here is one small thing to try.</strong> None of them is left to a default system alert.',
    },
    {
      t: 'image',
      src: '/oppam-assets/edges.webp',
      alt: 'Five failure states: offline, card declined, payment dropped, call failed, and the catch-all',
      caption: '"Your bank declined it, so nothing was charged." "Your therapist is still holding the time." Reassurance first, one calm retry second.',
    },
    {
      t: 'image',
      src: '/oppam-assets/empties.webp',
      alt: 'The offline ribbon and four empty states',
      caption: 'Empty is never a dead end - the companion waits in every blank space with a line and a way forward.',
    },

    // ══ 19 · The system ═════════════════════════════════════════════════════
    { t: 'h2', x: '19 · The system underneath' },
    {
      t: 'p',
      x: 'The palette started from one instruction to myself: <strong>sunlight, not yellow.</strong> Not the flat yellow of a highlighter, but Kerala morning light through a wooden window. The background is never pure white - it is warm paper. The ink is never pure black - it is the brown-black of handwriting.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'book', title: 'Two voices, one rule', desc: 'Serif when Oppam is being <em>human</em> - greetings, the companion, your journal, a therapist\'s own words. Sans-serif when it is being <em>useful</em> - tabs, buttons, prices, meta.' },
        { icon: 'droplet', title: 'One shadow in the whole app', desc: 'A single warm, low shadow, like late-afternoon light. Consistency you feel without noticing it.' },
        { icon: 'layers', title: 'Colour means something', desc: 'Sun is warmth and the one loud action, leaf is growth, sky is rest, clay is the offline ribbon, rose is tenderness - never alarm.' },
        { icon: 'verified', title: 'Accessible by construction', desc: 'Every size rides Dynamic Type and the layouts hold when magnified; every motion collapses to a cross-fade under Reduce Motion; decorative faces are hidden from VoiceOver.' },
      ],
    },

    // ══ 20 · Lamplight ══════════════════════════════════════════════════════
    { t: 'h2', x: '20 · Lamplight' },
    {
      t: 'p',
      x: 'Most dark modes are cold grey - practical, and slightly clinical, which is the one feeling this product cannot afford. Here it is <strong>lamplight</strong>: warm browns and amber, like a lamp somebody left on for you. Every token is dynamic, so both sides of the app re-light together.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark.webp',
      alt: 'Five screens in lamplight: night home, care, a therapist, pages and the privacy room',
      caption: 'The night veranda, Care, a therapist, your pages, and the Privacy Room - warm, never cold grey.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-practice.webp',
      alt: 'The therapist console, a client file, the session room, a confirmed booking and an error state in dark mode',
      caption: 'The console re-lights too - and so does the rough weather. A design system is only real when the error states hold.',
    },

    // ══ 21 · Positioning ════════════════════════════════════════════════════
    { t: 'h2', x: '21 · Where it sits' },
    {
      t: 'p',
      x: 'Two axes decide this category: whether finding help feels like <em>browsing a market</em> or <em>being introduced</em>, and whether the product behaves like a <em>clinical tool</em> or like <em>company</em>. Almost everyone optimises the same corner.',
    },
    {
      t: 'diagram',
      caption: 'A competitive map from walking each app end to end. The empty corner is the opportunity - and the reason the companion exists.',
      svg: `<svg viewBox="0 0 720 424" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Positioning map: browsing a market versus being introduced, a clinical tool versus company">
  <line x1="20" y1="210" x2="694" y2="210" class="d-l"/>
  <line x1="360" y1="26" x2="360" y2="396" class="d-l"/>
  <polygon points="700,210 690,205 690,215" class="d-arrow"/>
  <polygon points="360,20 355,30 365,30" class="d-arrow"/>

  <text x="20" y="236" class="d-m">BROWSE A MARKET</text>
  <text x="700" y="236" class="d-m" text-anchor="end">INTRODUCED TO A PERSON</text>
  <text x="374" y="24" class="d-m">COMPANY, PRESENT</text>
  <text x="374" y="392" class="d-m">A CLINICAL TOOL</text>

  <circle cx="110" cy="295" r="5" class="d-dot"/><text x="124" y="299" class="d-s">BetterHelp</text>
  <circle cx="165" cy="262" r="5" class="d-dot"/><text x="179" y="266" class="d-s">YourDOST</text>
  <circle cx="130" cy="338" r="5" class="d-dot"/><text x="144" y="342" class="d-s">Amaha</text>
  <circle cx="235" cy="245" r="5" class="d-dot"/><text x="249" y="249" class="d-s">Wysa · Replika</text>
  <circle cx="225" cy="330" r="5" class="d-dot"/><text x="239" y="334" class="d-s">Headspace · Calm</text>
  <circle cx="430" cy="125" r="5" class="d-dot"/><text x="444" y="129" class="d-s">Finch</text>

  <circle cx="560" cy="100" r="17" fill="var(--accent)" opacity="0.16"/>
  <circle cx="560" cy="100" r="7" class="d-dot-a"/>
  <text x="584" y="96" class="d-t">Oppam</text>
  <text x="584" y="116" class="d-s">introduced · present</text>
</svg>`,
    },

    // ══ 22 · Measurement ════════════════════════════════════════════════════
    { t: 'h2', x: '22 · How I\'d know it worked' },
    {
      t: 'p',
      x: 'Nothing has shipped, so there are no results to report and I\'m not going to invent any. This is the plan I would hold it to, written before launch rather than after.',
    },
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['<strong>North star</strong>', 'First sessions <em>attended</em> - not booked. Attendance is the only number that means somebody actually walked through the door.'],
        ['<strong>The funnel to watch</strong>', 'Opened → reached a profile → booked → showed up. My bet is that the interesting drop moves from "opened" to "profile → booked," because the account wall is gone.'],
        ['<strong>The anti-streak test</strong>', 'Does a week away predict churn? If the garden works the way I think it does, a gap should be survivable - that is the whole argument against streaks, and it is falsifiable.'],
        ['<strong>Privacy guardrails</strong>', 'Zero notifications that name therapy. Face-ID failures and support contacts about "someone saw my phone" both tracked as hard failures, not noise.'],
        ['<strong>Therapist health</strong>', 'Sessions per therapist per week against the twenty-five cap, and how many "reach out" nudges are actually acted on. A console people ignore is a console that failed.'],
        ['<strong>The first experiment</strong>', 'Introductions versus the full directory, split at the Care tab. This is the riskiest assumption in the whole design: that removing choice reads as care rather than as being sold to. I would want to be proved wrong early.'],
      ],
    },

    // ══ 23 · Scope ══════════════════════════════════════════════════════════
    { t: 'h2', x: '23 · What isn\'t built' },
    {
      t: 'p',
      x: 'Deliberately deferred, and naming it is part of the design: a Live Activity for the session countdown, alternate app icons, HealthKit sleep-awareness for the night companion, and Apple Sign In - kept out of onboarding on purpose, because trust should come before identity. Payments, calls and the network are simulated; the design of what happens when they fail is not.',
    },
    {
      t: 'stats',
      items: [
        { v: '38', l: 'Swift files' },
        { v: '~10,600', l: 'Lines of Swift' },
        { v: '2', l: 'Sides of the marketplace, one codebase' },
        { v: '0', l: 'Third-party UI libraries' },
      ],
    },

    { t: 'h3', x: 'Sources' },
    {
      t: 'list',
      items: [
        'National Mental Health Survey of India 2015-16, NIMHANS - prevalence, treatment gap, and psychiatrist density by state.',
        '<em>Mental health morbidities in Kerala: insights from the National Mental Health Survey</em>, Indian Journal of Psychiatry - the Kerala-specific findings, including stigma named in its qualitative work.',
        'Published studies on shared mobile phone access and digital privacy in Indian households.',
        'oppam.me - the live service: therapist roster, prices, concern areas, languages and hours.',
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'The goal was never a better therapy app. It was the first ten seconds - the moment someone opens it, exhales, and finds that for once nothing is being asked of them. Everything else is keeping that promise.',
      by: 'Design intent, Oppam',
    },
  ],
});
