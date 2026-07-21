// ============================================================================
//  Oppam - the Companion Experience
//  Mobile App Design Case Study (concept redesign of oppam.me)
//
//  A ground-up reimagining of Oppam's therapy platform as a native iOS app
//  built around a single idea: not a therapy app, but the feeling of someone
//  quietly coming to sit beside you. Designed and built end-to-end as a
//  running SwiftUI prototype - 29 files, ~6,800 lines, no UI libraries.
//
//  Redesign concept of a real, existing product. The disclaimer callout
//  below must stay. Every screenshot is captured live from the running app.
// ============================================================================

const DESIGN_OPPAM = {
  slug: 'oppam',
  name: 'Oppam: A Companion, Not an App',
  category: 'Mobile App',
  icon: 'sun',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'Reimagining a Kerala therapy platform as a warm iOS companion - a living mascot, a sunlit design system, live sessions, and privacy built for shared homes. Designed and shipped as a running SwiftUI app.',
  lede: 'In Kerala, asking for therapy is heavy - slowed by stigma, shared phones, and fear of the unknown. Oppam (ഒപ്പം - "beside you") is a concept redesign built to soften that moment: not a therapy app, but the feeling of someone quietly sitting beside you - brought to life in a runnable iOS app with an animated companion, a sunlit design system, real-feeling video sessions, and privacy built for shared homes.',
  tech: ['SwiftUI', 'iOS 18', 'SwiftData (on-device only)', 'Observation', 'WidgetKit', 'Custom character system', 'Face ID', 'Mock data · no cloud'],
  blocks: [

    // ── Hero ─────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/oppam-assets/hero.webp',
      alt: 'Three screens from Oppam - the welcome sunrise, the home veranda, and a therapist introduction',
      caption: 'The sunrise that opens the app, the "veranda" home, and Care - where you meet a person, not a directory.',
    },

    // ── Disclaimer & Real App text ──────────────────────────────────────────
    { t: 'h3', x: 'A concept redesign of an existing product.' },
    {
      t: 'p',
      x: 'Oppam is a real therapy platform (<strong>oppam.me</strong>). This is an <strong>independent design exploration</strong> - a reimagining of what their product could feel like as a native app. Therapist names, photos, prices, concern areas and platform stats are drawn from the live oppam.me site so the work is grounded in a real service; bios, reviews and session copy are prototype writing in Oppam\'s voice. Nothing here is shipped, no real booking is made, and no payment is taken. It is offered constructively, as a founder-minded proposal.',
    },
    { t: 'h3', x: 'Every screen here is a real app, not a mockup.' },
    {
      t: 'p',
      x: 'This isn\'t a Figma file exported to images - <strong>every screenshot below is captured live from the running app.</strong> The companion actually breathes and blinks, the breathing exercise really counts you through 4–2–6, the journal really locks behind Face ID, the video session really connects and rates, and the therapist matching really reorders people around the feelings you pick. <strong>29 Swift files, ~6,800 lines, zero third-party UI libraries.</strong>',
    },

    // ── At a glance ──────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; iOS Engineer - research, IA, brand, character, UI, motion, build'],
        ['Type', 'Concept redesign of an existing product · independent prototype'],
        ['Platform', 'Native iOS (iPhone, iOS 18) · home-screen widget'],
        ['Domain', 'Mental health · therapy access in Kerala, India'],
        ['The bet', 'People delay therapy because of <em>feeling</em>, not features. So design the feeling first.'],
        ['Signature', 'A living companion character - the brand mark, alive, present in every room'],
        ['Data', 'Real roster &amp; prices from oppam.me; everything stored on-device with SwiftData. No account, no cloud.'],
        ['Deliverable', 'A runnable, fully interactive iOS app'],
      ],
    },
    {
      t: 'stats',
      items: [
        { v: '0', l: 'Accounts required' },
        { v: '4', l: 'Rooms, one companion' },
        { v: '5', l: 'Companion moods' },
        { v: '1', l: 'Shadow in the whole app' },
      ],
    },

    // ══ 1. Why people don't come ═════════════════════════════════════════════
    { t: 'h2', x: '1. The Real Problem Isn\'t Software' },
    {
      t: 'p',
      x: 'The current Oppam platform already works - it connects people to good therapists across 45+ countries. So a redesign that just repaints buttons would miss the point. The interesting problem is upstream of the app: <strong>most people who would benefit never book at all.</strong> Before designing a single screen, I mapped <em>why</em> - the quiet, human reasons someone in Kerala puts it off. Each barrier became a specific design decision.',
    },
    {
      t: 'table',
      head: ['The barrier (why people wait)', 'Oppam\'s design answer'],
      rows: [
        ['<strong>"Am I mad, then?"</strong> - stigma. Therapy is whispered about; being seen at a clinic carries a cost.', 'No clinical language anywhere. You "sit with" someone - you don\'t "get treated." The app never once says the word it\'s afraid of.'],
        ['<strong>Family visibility.</strong> Shared homes, shared phones, a sibling who borrows your device.', 'A Privacy Room: Face ID on the journal, a sunrise cover in the app switcher, and neutral notifications that never say "therapy."'],
        ['<strong>"Is my problem big enough?"</strong> People wait for a crisis to feel they\'ve earned help.', 'Nothing asks you to rank your pain. "Just wanting to talk" is a first-class, valid reason to be here.'],
        ['<strong>Form dread.</strong> Sign-up walls make it feel like registering an illness.', 'No account. A first name only - any name. "Just let me look around" skips everything.'],
        ['<strong>Cost opacity.</strong> Fear of packages, upsells, hidden fees.', 'A ₹ price on every card, per session. Longer plans are cheaper but never pushed; the first-session discount applies itself.'],
        ['<strong>Language distance.</strong> Feelings don\'t translate; English therapy feels like an exam.', 'Malayalam / English / Manglish, chosen up front - and the emotionally load-bearing lines actually switch, not just the labels.'],
        ['<strong>The unknown first session.</strong> The tallest wall is not knowing what happens in there.', 'Every therapist answers "how I work" in their own voice - camera-off allowed, silence allowed, nothing to prepare.'],
      ],
    },
    { t: 'h3', x: 'Five people I designed for' },
    {
      t: 'p',
      x: 'Abstract barriers become design decisions faster when they have a face. Five personas carried the work - each one bends a different part of the product.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'book', title: 'The student', desc: 'Types what she can\'t say aloud. <strong>Chat-first</strong> therapists, and a promise her parents will never hear a word.' },
        { icon: 'moon', title: 'The new mother', desc: 'Her only free hour is 10 PM. <strong>Voice-only, evening slots</strong>, and a night companion that\'s awake when she is.' },
        { icon: 'globe', title: 'The NRI spouse', desc: 'Gulf time zones, a marriage under strain. <strong>Late-IST couple slots</strong> with an even-handed therapist.' },
        { icon: 'activity', title: 'The burnt-out professional', desc: 'Four hours of sleep. A psychiatrist who <strong>asks how you\'re sleeping</strong> before asking what\'s wrong.' },
        { icon: 'sun', title: 'The one who\'s just not okay tonight', desc: 'Doesn\'t need a booking - needs to not be alone. A <strong>night companion + real helplines</strong>, one tap away.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'The one-line thesis',
      x: 'Everything in this case study follows from a single sentence: <strong>Oppam is not a therapy app - it is a companion experience.</strong> A therapy app helps you manage a condition. A companion sits with you until asking for help stops feeling like a confession. Design the second thing, and the first takes care of itself.',
    },
    { t: 'h3', x: 'The psychology under each decision' },
    {
      t: 'p',
      x: 'The warmth isn\'t decoration - each move is a known behavioural principle, aimed at the exact moment someone hesitates.',
    },
    {
      t: 'table',
      head: ['Principle from research', 'How Oppam uses it'],
      rows: [
        ['<strong>Anonymity lowers self-disclosure cost.</strong> People open up faster when identity is optional.', 'No account, first-name-only, "just look around." You can reach a real therapist before you\'ve given up a single identifying detail.'],
        ['<strong>Choice overload &amp; evaluation anxiety.</strong> A wall of strangers is cognitively expensive and faintly clinical.', 'Care <em>introduces</em> three people with plain reasons instead of asking you to filter and self-select. The full list still exists - one tap deeper.'],
        ['<strong>Loss aversion &amp; the streak trap.</strong> Broken streaks punish you exactly when life is hardest.', 'A garden that can only grow, and check-ins you can skip without penalty. Care that survives the bad week.'],
        ['<strong>Mere presence.</strong> A felt "someone is here" reduces distress even without words.', 'The companion breathes in every room and stays up past 9 PM with a lantern. It never leaves the screen.'],
        ['<strong>Ecological validity.</strong> Calm imported from elsewhere feels generic.', 'The veranda, Malayalam, haldi-light - calm rooted in a specific Kerala place, not a Western meditation brand.'],
      ],
    },

    // ══ 2. The emotional journey ═════════════════════════════════════════════
    { t: 'h2', x: '2. Designing the Feeling, Step by Step' },
    {
      t: 'p',
      x: 'Instead of a feature list, the product was planned as an <strong>emotional arc</strong> - the path from "I don\'t know if I need this" to "I feel a little stronger today." Every screen is a station on that line. If a feature didn\'t move someone gently along it, it didn\'t ship.',
    },
    {
      t: 'steps',
      items: [
        { title: '"I don\'t know if I need this"', desc: 'The app opens without asking anything. The companion just sits with you. No wall, no form, no login.' },
        { title: '"Maybe I\'ll just look"', desc: 'Browse everything, book nothing. No nagging, no countdown, no red badges. Looking is allowed to be the whole visit.' },
        { title: '"I could try writing"', desc: 'Pages: private, prompt optional, spelling doesn\'t matter, Malayalam or Manglish both fine.' },
        { title: '"Maybe a person"', desc: 'Care: name a feeling, meet three people, and - crucially - hear <em>why</em> each of them.' },
        { title: '"I\'m scared of the first session"', desc: 'An honest note from the therapist in their own voice, camera-off and chat modes, and "come exactly as you are."' },
        { title: '"I went"', desc: 'A real-feeling video room that connects, holds the call, and lets you rate it kindly afterward.' },
        { title: '"I feel a little stronger"', desc: 'Small wins plant a garden that only ever grows. Nothing here can wilt - the opposite of a broken streak.' },
      ],
    },

    // ══ 3. Information architecture ══════════════════════════════════════════
    { t: 'h2', x: '3. Four Rooms, One Companion' },
    {
      t: 'p',
      x: 'The whole app is four tabs - and choosing only four was the hardest, most important structural decision. Therapy marketplaces tend to sprawl (directories, filters, blogs, assessments, plans). Oppam does the opposite: <strong>depth over breadth</strong>, so that a scared first-time user is never lost. Each room has one job.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'home', title: 'Home - the veranda', desc: 'A time-aware sky, a greeting by name, your next (or live) session, and a quiet moment to breathe. Warm, never a dashboard.' },
        { icon: 'sun', title: 'Care', desc: 'Finding a therapist reimagined as <strong>being introduced by a trusted friend</strong>. You name a feeling; Oppam brings three people and says why them. The full searchable list is one tap deeper.' },
        { icon: 'book', title: 'Pages', desc: 'A private notebook that lives on the phone - journal, "letters to future me" sealed until their day, and the memory garden. Face ID at the door.' },
        { icon: 'verified', title: 'You', desc: 'Deliberately tiny. The Privacy Room is the hero; real Kerala helplines sit right there; the language-of-the-heart switcher lives here. Almost nothing to "manage" - on purpose.' },
      ],
    },
    { t: 'h3', x: 'Reading the Home screen' },
    {
      t: 'p',
      x: 'The clearest way to see the philosophy is to mark up a single screen. Everything on Home is an <em>invitation</em>, never an instruction - and there is only ever one loud action at a time.',
    },
    {
      t: 'image',
      src: '/oppam-assets/home-anatomy.webp',
      alt: 'Annotated anatomy of the Oppam home screen with three numbered zoom callouts',
      caption: 'Home, annotated. Warmth is doing a job here - every element answers something the research asked for.',
    },
    {
      t: 'image',
      src: '/oppam-assets/home-times.webp',
      alt: 'The home screen at morning, afternoon, evening and night - the sky and companion change with the hour',
      caption: 'The same screen across the day. The sky shifts, and after 9 PM the companion grows sleepy-lidded and holds a lantern - it stays up with you.',
    },

    // ══ 4. The companion - the signature idea ════════════════════════════════
    { t: 'h2', x: '4. The Companion - the Whole Point' },
    {
      t: 'p',
      x: 'This is the idea the entire product is built around, so it gets the most room. Oppam\'s logo is a simple smiling face. The insight was: <strong>don\'t just put the logo in a corner - make it alive, and let it live in every room.</strong> The companion is the brand mark, breathing. It is what turns "an app" into "someone."',
    },
    {
      t: 'diagram',
      caption: 'The companion is drawn as animatable geometry (a SwiftUI Shape), never an imported image - which is the entire reason it can breathe, blink, and change mood in real time.',
      svg: `<svg viewBox="0 0 560 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Construction of the companion face - two upward eye arcs and one lifted smile">
  <text x="40" y="50" class="d-t" style="font-size:22px">How it's built</text>
  <rect x="70" y="100" width="300" height="200" rx="6" class="d-l" stroke-dasharray="5 6" fill="none"/>
  <line x1="70" y1="160" x2="370" y2="160" class="d-l" stroke-dasharray="4 6"/>
  <line x1="70" y1="204" x2="370" y2="204" class="d-l" stroke-dasharray="4 6"/>
  <text x="378" y="165" class="d-s">eyes · 30% height</text>
  <text x="378" y="209" class="d-s">smile · 52% height</text>
  <line x1="160" y1="100" x2="160" y2="300" class="d-l" stroke-dasharray="4 6"/>
  <line x1="280" y1="100" x2="280" y2="300" class="d-l" stroke-dasharray="4 6"/>
  <path d="M144 162 Q160 142 176 162" fill="none" stroke="var(--text)" stroke-width="8" stroke-linecap="round" class="d-smile"/>
  <path d="M264 162 Q280 142 296 162" fill="none" stroke="var(--text)" stroke-width="8" stroke-linecap="round" class="d-smile"/>
  <path d="M100 188 C156 266 284 266 340 188" fill="none" stroke="var(--text)" stroke-width="8" stroke-linecap="round" class="d-smile"/>
  <circle cx="100" cy="188" r="4.5" fill="#FFC13B"/><circle cx="340" cy="188" r="4.5" fill="#FFC13B"/>
  <circle cx="160" cy="142" r="4.5" fill="#FFC13B"/><circle cx="280" cy="142" r="4.5" fill="#FFC13B"/>
  <text x="40" y="360" class="d-s" style="font-size:14px">Two upward arcs (eyes) + one long smile whose</text>
  <text x="40" y="384" class="d-s" style="font-size:14px">tips lift past the eyes - lifted straight from the logo.</text>
</svg>`,
    },
    { t: 'h3', x: 'One face, five registers' },
    {
      t: 'p',
      x: 'The companion has five moods - but the rule that makes it feel safe rather than gimmicky is this: <strong>its mood always sits one step softer than yours.</strong> It never mirrors distress, and it never celebrates louder than you do. When you\'re heavy, it goes tender, not sad. When you win, it\'s quietly happy, not confetti.',
    },
    {
      t: 'image',
      src: '/oppam-assets/moods.webp',
      alt: 'The five companion moods: peaceful, listening, happy, comforting, sleeping',
      caption: 'Peaceful, listening, happy, comforting, sleeping - the same geometry, re-curved. This board is generated live by the app, not drawn by hand.',
    },
    { t: 'h3', x: 'It breathes - and this is where the motion lives' },
    {
      t: 'p',
      x: 'Stillness reads as "dead"; breath reads as "present." The companion runs a slow ~8-second breathing cycle at 2.5% scale and blinks every 3–6 seconds, and every motion in the app collapses to a gentle cross-fade under Reduce Motion. <strong>Static screenshots can\'t carry that - so this frame is left open for the motion clip.</strong>',
    },
    {
      t: 'image',
      src: '/oppam-assets/companion-motion.webp',
      alt: 'The static companion beside an empty framed space reserved for a motion clip',
      caption: 'The static face, and the space where it comes alive. ▶ Motion clip to be dropped in here.',
    },
    { t: 'h3', x: 'The rules it never breaks' },
    {
      t: 'cards',
      items: [
        { icon: 'activity', title: 'It always breathes', desc: 'A ~8-second breathing cycle and a blink every 3–6 seconds. Present, never static.' },
        { icon: 'moon', title: 'It sleeps, it doesn\'t leave', desc: 'After 9 PM it grows sleepy-lidded and holds a lantern. It never disappears - someone is always still there.' },
        { icon: 'book', title: 'It speaks like a letter', desc: 'The companion\'s words are always set in serif, never in a chat bubble - a note from someone who cares, not a chatbot.' },
        { icon: 'sun', title: 'It never performs', desc: 'It never bounces, never talks first in a loud way, never gamifies, never guilt-trips. Presence, not performance.' },
      ],
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Why this matters commercially, not just emotionally',
      x: 'A living character is the one thing a competitor can\'t clone with a template. It is the brand you <em>feel</em> before you read a word - on the app icon, the home-screen widget, the empty states, the app-switcher cover, the booking confirmation. It gives Oppam an ownable identity in a category where most apps look like a hospital form, and it makes the product retainable for the softest reason of all: people come back to something that feels glad they did.',
    },

    // ══ 5. Onboarding ════════════════════════════════════════════════════════
    { t: 'h2', x: '5. Onboarding - Five Gentle Moments, Not a Form' },
    {
      t: 'p',
      x: 'The riskiest 60 seconds in the whole product. Most therapy apps open with a wall - email, password, "create account," an intake questionnaire. Oppam opens with a <strong>sunrise</strong>. The only thing it ever asks is a first name, and even that can be made up or skipped. Trust is earned before anything is requested - the opposite of registering an illness.',
    },
    {
      t: 'image',
      src: '/oppam-assets/onboarding.webp',
      alt: 'The five onboarding steps: welcome sunrise, a name, language of the heart, what brings you, and the privacy promise',
      caption: 'Arrival → a name (any name) → language of the heart → what\'s sitting with you (optional) → one privacy promise. No email. No password. "Just let me look around" skips it all.',
    },

    // ══ 6. Care ══════════════════════════════════════════════════════════════
    { t: 'h2', x: '6. Care - Meeting a Person, Not Browsing a Market' },
    {
      t: 'p',
      x: 'A directory asks an anxious person to evaluate strangers and pick correctly. Oppam inverts it: you name what\'s sitting with you, and it introduces a few people, each with a plain-language reason ("sits with anxiety often," "evening &amp; night times," "speaks Malayalam"). It feels like a friend saying <em>"I know someone you\'d like."</em>',
    },
    {
      t: 'image',
      src: '/oppam-assets/care.webp',
      alt: 'Care: the gentle start with feeling chips, and the matched introductions',
      caption: 'Left: you name a feeling (with the platform\'s real trust strip). Right: three introductions, each with a plain reason why them - and a live session waiting at the top if you have one.',
    },
    { t: 'h3', x: 'The profile that dissolves the fear' },
    {
      t: 'p',
      x: 'Care leads with a real detail the category buries: each therapist has a <strong>voice introduction</strong> and answers "how I work" in their own words. Fear dissolves at "hello." Credentials come after warmth, not before it.',
    },
    {
      t: 'image',
      src: '/oppam-assets/care-anatomy.webp',
      alt: 'A therapist profile annotated: voice intro, plain-language fit tags, and the how-I-work note',
      caption: 'Their voice and plain-language fit come first; logistics last. The "how I work" note is set in serif, like a letter.',
    },
    { t: 'h3', x: 'Booking - three taps, zero forms' },
    {
      t: 'p',
      x: 'Booking is a day, a time, and how you\'d like to meet (video, voice, or chat, because camera-shy is normal here). Longer plans are cheaper but never pushed, couple sessions are first-class for the NRI persona, and the first-session discount applies itself. The confirmation promises a reminder that won\'t mention therapy.',
    },
    {
      t: 'image',
      src: '/oppam-assets/therapist-booking.webp',
      alt: 'A therapist profile, the plan-choosing booking sheet, and the warm confirmation',
      caption: 'Profile → choose a rhythm (single or a gentle plan) → "You\'re booked." Come exactly as you are - that\'s the whole point.',
    },
    {
      t: 'p',
      x: 'The whole flow, step by step: <strong>who\'s coming</strong> (just you, or a couple), <strong>when</strong>, <strong>how you\'d like to meet</strong>, and a plain-language <strong>review</strong> where the bill is itemised and the first-session discount has already applied itself. No hidden fees, cancel anytime.',
    },
    {
      t: 'image',
      src: '/oppam-assets/booking-steps.webp',
      alt: 'The four booking steps: session type, choosing a slot, choosing a mode, and the review with an itemised bill',
      caption: 'Session type → slot → how you\'ll meet → review. Four calm steps, each doing one thing, with a progress dot that never rushes you.',
    },
    { t: 'h3', x: 'For those who\'d rather look themselves' },
    {
      t: 'p',
      x: 'The exhaustive directory still exists - it\'s just not the front door. Search by name or concern, filter by the four real categories (Consultant · Clinical · Psychiatrist · Sexual Health). And the rough edges are designed too: every empty result and error state was drawn on purpose, gathered in one place.',
    },
    {
      t: 'image',
      src: '/oppam-assets/directory-edges.webp',
      alt: 'The full searchable therapist directory, and the edge-case gallery of empty and error states',
      caption: 'Left: the full list, one tap deeper. Right: the edge-case room - offline, card declined, a dropped call, empty searches - each held gently, none left to a default alert.',
    },

    // ══ 7. Sessions ══════════════════════════════════════════════════════════
    { t: 'h2', x: '7. The Session - Held All the Way Through' },
    {
      t: 'p',
      x: 'Most therapy apps hand you off to a generic call and disappear. Oppam stays. A live session surfaces on Home and Care with a single "Join," the video room connects and holds the call, and afterward you\'re asked - gently, skippably - how it went. <strong>The companion frames the whole thing so a first video call feels less like a clinical appointment and more like meeting someone.</strong>',
    },
    {
      t: 'image',
      src: '/oppam-assets/session-flow.webp',
      alt: 'The live session flow: the join card, the connected video room, and the kind rating screen',
      caption: 'Join → a calm, connected room → "How was your time?" Rating is an invitation, never a demand - "Maybe later" is always there, and a low rating offers a different fit with no awkwardness.',
    },
    { t: 'h3', x: 'A history that invites you back' },
    {
      t: 'p',
      x: 'Past sessions become a quiet record you can revisit - each with the warmth of the moment, a star if you gave one, and a one-tap "book again" with the same person. It\'s continuity of care, made to feel like remembering a good conversation, not opening a medical file.',
    },
    {
      t: 'image',
      src: '/oppam-assets/history.webp',
      alt: 'Session history with per-session ratings and rebooking, and the session detail sheet',
      caption: 'Left: your sessions so far, each rebookable in a tap. Right: a session\'s details - nothing to prepare, one quiet reminder an hour before.',
    },

    // ══ 8. Pages ═════════════════════════════════════════════════════════════
    { t: 'h2', x: '8. Pages - a Garden That Can Only Grow' },
    {
      t: 'p',
      x: 'The journal is private by construction (on-device, Face-ID-gated) and warm by tone: prompts are invitations you can dismiss, spelling doesn\'t matter, and you can seal a letter to your future self until its day. Small wins plant a <strong>garden that never wilts</strong> - a deliberate rejection of the streak mechanic that punishes you the day life gets hard.',
    },
    {
      t: 'image',
      src: '/oppam-assets/pages.webp',
      alt: 'The Pages journal with the memory garden, the writing composer, and the future-letter composer',
      caption: 'The garden and your entries; a composer where the only prompt is one you can turn off; and a letter you can seal for one, three or six months.',
    },

    // ══ 9. Privacy ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '9. Privacy Is the Feature, Not the Footnote' },
    {
      t: 'p',
      x: 'In a shared Kerala household, privacy isn\'t a compliance checkbox - it\'s the thing standing between someone and getting help at all. So it\'s given its own room, and every protection <strong>explains itself in plain words and shows exactly what others would see.</strong> There is no account and no cloud; everything lives on the phone.',
    },
    {
      t: 'image',
      src: '/oppam-assets/you-privacy.webp',
      alt: 'The You tab and the Privacy Room with self-explaining toggles and a live notification preview',
      caption: 'The You tab is deliberately tiny; the Privacy Room is the hero. Note the live notification preview: it shows the actual harmless text a family member would see on the lock screen - never the word "therapy."',
    },
    {
      t: 'image',
      src: '/oppam-assets/privacy-signature.webp',
      alt: 'Three privacy signatures: the app-switcher sunrise cover, the Face-ID locked door, and the Privacy Room',
      caption: 'Three signatures of one principle: switch away and the app switcher shows only a sunrise; your pages sit behind a Face-ID door ("these pages are only yours"); and inside the Privacy Room, every protection is a toggle you can see and understand.',
    },

    // ══ 10. Edge & error states ══════════════════════════════════════════════
    { t: 'h2', x: '10. Designed for the Bad Days, Too' },
    {
      t: 'p',
      x: 'A gentle product earns its calm precisely when things go wrong. So every rough edge - a dropped signal, a declined card, a call that won\'t connect, a screen with nothing in it yet - was drawn on purpose, in the same warm voice, never left to a default system alert. <strong>Each one says the same three things: it wasn\'t your fault, nothing was lost, and here\'s the one small thing to try.</strong>',
    },
    {
      t: 'image',
      src: '/oppam-assets/edge-connection.webp',
      alt: 'Five failure states: offline page, card declined, network dropped mid-payment, offline booking, and the call-can\'t-connect screen',
      caption: 'When the signal drops, a card is declined, or a call won\'t connect. Every failure reassures first ("nothing was charged," "your slot is safe") and offers one calm retry.',
    },
    {
      t: 'image',
      src: '/oppam-assets/edge-empty.webp',
      alt: 'The offline ribbon and five empty states: nothing booked, no history, no search results, blank pages, and the generic fallback',
      caption: 'Empty is never a dead end. The companion waits in every blank space with a warm line and a gentle way forward - the app-wide offline ribbon, no sessions yet, no results, blank pages, and the catch-all "something went sideways."',
    },
    {
      t: 'p',
      x: 'And because the whole system is dynamic, every one of these holds together in lamplight too.',
    },
    {
      t: 'image',
      src: '/oppam-assets/edge-dark.webp',
      alt: 'The same error and empty states rendered in lamplight dark mode',
      caption: 'The same rough edges, re-lit for night - warm, never cold grey, even when something breaks.',
    },

    // ══ 11. Widget ═══════════════════════════════════════════════════════════
    { t: 'h2', x: '11. A Presence on the Home Screen' },
    {
      t: 'p',
      x: 'The companion doesn\'t only live inside the app. A WidgetKit widget puts it on the home screen - the same face, the same time-aware greeting, one gentle line, and nothing private. It follows the day (sleepy after dark), asks for nothing, and a tap opens straight into a two-minute breath. It\'s the brand, sitting quietly on your home screen all day.',
    },
    {
      t: 'image',
      src: '/oppam-assets/widget.webp',
      alt: 'The Oppam home-screen widget in light and dark, small and medium sizes',
      caption: 'Small and medium widgets, in daylight and lamplight. No account, no data - just the companion and a greeting that follows the hour.',
    },

    // ══ 11. Design system ════════════════════════════════════════════════════
    { t: 'h2', x: '12. A Design System Made of Sunlight' },
    {
      t: 'p',
      x: 'The palette started from one instruction to myself: <strong>"sunlight, not yellow."</strong> Not the flat brand-yellow of a highlighter, but Kerala morning light through a wooden window - haldi on warm cotton, a lamp at night. The background is never pure white; it\'s warm paper. Ink is never pure black; it\'s the brown-black of handwriting.',
    },
    {
      t: 'image',
      src: '/oppam-assets/palette.webp',
      alt: 'The Oppam colour palette: paper, sun, honey, sun wash, warm ink, leaf, sky, clay, rose, and the lamplight dark tokens',
      caption: 'The core palette. Each colour carries a meaning - leaf is growth and calm confirmation, sky is rest and night, rose is tenderness and is never used for alarm.',
      bleed: true,
    },
    { t: 'h3', x: 'Type: two voices' },
    {
      t: 'table',
      head: ['When Oppam is being human', 'When Oppam is being useful'],
      rows: [
        ['<strong>Serif.</strong> "Good morning, Anu." The companion\'s words. Your journal. The therapist\'s "how I work." Warmth, intimacy, a person talking.', '<strong>Sans-serif.</strong> Tab bar, buttons, prices, filters, meta. Clarity, structure, getting out of the way.'],
      ],
    },
    {
      t: 'cards',
      items: [
        { icon: 'droplet', title: 'One shadow, everywhere', desc: 'The entire app uses a <strong>single</strong> warm, low shadow - like late-afternoon light. Consistency you feel without noticing.' },
        { icon: 'image', title: 'Organic shapes', desc: 'Continuous-corner cards (26pt), capsule chips, rolling hills. Nothing sharp. The geometry itself is trying to relax you.' },
        { icon: 'layers', title: 'Tinted meanings', desc: 'Sun-wash for warmth, leaf-wash for growth, sky-wash for rest. Colour as quiet emotional signage, never decoration.' },
        { icon: 'sun', title: 'Everything rides Dynamic Type', desc: 'Text scales with the reader\'s accessibility settings; the layout holds. Warmth that doesn\'t break when magnified.' },
      ],
    },

    // ══ 12. Dark mode ════════════════════════════════════════════════════════
    { t: 'h2', x: '13. Lamplight - Dark Mode, Reimagined' },
    {
      t: 'p',
      x: 'Most dark modes are cold grey - practical, but a little clinical, exactly the feeling Oppam is trying to avoid. So dark mode here is <strong>"lamplight"</strong>: warm browns and amber, like a lamp someone left on for you. Every token is dynamic - the same components, re-lit for night.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-showcase.webp',
      alt: 'Four screens in lamplight dark mode: home, care, a therapist profile and the journal',
      caption: 'Home, Care, a therapist, and Pages in lamplight. The sunlit palette was the daytime hero, so lamplight simply proves the system holds together at night.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-showcase-2.webp',
      alt: 'Four more lamplight screens: You, session history, booking confirmed, and the night home',
      caption: 'You, your session history, a confirmed booking, and the night veranda - warm, never cold grey.',
    },
    {
      t: 'p',
      x: 'It isn\'t a handful of hero screens that happen to work in the dark - <strong>every room and every flow is fully dressed for lamplight.</strong> Onboarding, the whole session loop, and Care\'s browse-and-book path, all re-lit:',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-onboarding.webp',
      alt: 'All five onboarding steps in lamplight dark mode',
      caption: 'The entire onboarding arc in lamplight - the same warmth, from the first sunrise to the privacy promise.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-sessions.webp',
      alt: 'The session flow in dark mode: night home, the live call, rating, and history',
      caption: 'The session loop at night - the "Still up?" veranda, the live call, the rating, and your history.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-flows.webp',
      alt: 'Care flows in dark mode: the gentle start, the full directory, choosing a plan, and the booking review',
      caption: 'Care in lamplight - from the gentle start through the full directory, plan and review.',
    },

    // ══ 14. How it compares ══════════════════════════════════════════════════
    { t: 'h2', x: '14. How It Compares' },
    {
      t: 'p',
      x: 'Oppam sits in a crowded category - but almost every player optimises for a different thing, and that gap is the opportunity. Two axes tell the whole story: whether finding help feels like <em>browsing a marketplace</em> or <em>being introduced to a person</em>, and whether the product behaves like a <em>clinical tool</em> or a <em>companion that\'s present.</em>',
    },
    {
      t: 'diagram',
      caption: 'Where a companion-first, introduction-led approach sits relative to the market. Grounded against the live oppam.me platform and the wider category.',
      svg: `<svg viewBox="0 0 940 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Positioning map: marketplace versus introduction, clinical tool versus companion presence">
  <!-- axes -->
  <line x1="70" y1="310" x2="880" y2="310" class="d-l"/>
  <line x1="475" y1="60" x2="475" y2="560" class="d-l"/>
  <polygon points="880,310 862,302 862,318" class="d-arrow"/>
  <polygon points="475,60 467,78 483,78" class="d-arrow"/>
  <!-- axis labels -->
  <text x="88" y="345" class="d-s">Browse a marketplace</text>
  <text x="760" y="345" class="d-s">Introduced to a person</text>
  <text x="490" y="76" class="d-s">A companion, present</text>
  <text x="490" y="548" class="d-s">A clinical tool</text>
  <!-- competitor dots -->
  <g>
    <circle cx="200" cy="430" r="7" class="d-box"/><text x="214" y="435" class="d-s">BetterHelp</text>
    <circle cx="270" cy="380" r="7" class="d-box"/><text x="284" y="385" class="d-s">YourDOST</text>
    <circle cx="230" cy="480" r="7" class="d-box"/><text x="244" y="485" class="d-s">Amaha</text>
    <circle cx="360" cy="360" r="7" class="d-box"/><text x="374" y="365" class="d-s">Wysa · Replika (chatbot)</text>
    <circle cx="430" cy="470" r="7" class="d-box"/><text x="444" y="475" class="d-s">Headspace · Calm</text>
    <circle cx="560" cy="185" r="7" class="d-box"/><text x="574" y="190" class="d-s">Finch (gamified)</text>
  </g>
  <!-- Oppam -->
  <circle cx="760" cy="150" r="18" fill="#FFC13B" opacity="0.28"/>
  <circle cx="760" cy="150" r="10" fill="#FFC13B" stroke="#33302A" stroke-width="2"/>
  <text x="782" y="146" class="d-t" style="font-size:15px">Oppam</text>
  <text x="782" y="166" class="d-s">introduced · companion · present</text>
</svg>`,
    },
    {
      t: 'table',
      head: ['What most of the category does', 'What Oppam does instead'],
      rows: [
        ['<strong>Marketplace directories</strong> (BetterHelp, YourDOST, Amaha): filter and scroll a wall of strangers, then self-select.', 'Introductions, not listings. You name a feeling; three people are brought to you, each with a reason. The directory exists - it just isn\'t the front door.'],
        ['<strong>Chatbot-as-therapist</strong> (Wysa, Replika): an AI that role-plays the counsellor.', 'The companion <em>never</em> pretends to be a therapist. It is presence, and it hands you to real, human, credentialed people. That honesty is the trust.'],
        ['<strong>Gamified self-care</strong> (streaks, pets, XP - Finch and the like): engagement through mild guilt.', 'A garden that can only grow, and check-ins you can skip without penalty. Care that survives the bad week instead of punishing it.'],
        ['<strong>Meditation-brand calm</strong> (Headspace, Calm): beautiful, but generic and Western.', 'Calm rooted in a specific place - the Kerala veranda, Malayalam, haldi-light - and in one character you build a relationship with.'],
        ['<strong>Privacy as a policy page.</strong>', 'Privacy as a room you can see and touch: Face ID, app-switcher cover, neutral notifications - designed for shared phones.'],
        ['<strong>Hand-off to a generic call.</strong>', 'A session held all the way through - joined from Home, framed by the companion, and closed with a kind, skippable rating.'],
      ],
    },

    // ══ 15. Scope & honesty ══════════════════════════════════════════════════
    { t: 'h2', x: '15. Prototype Scope' },
    {
      t: 'p',
      x: 'Built with SwiftUI on iOS 18 - SwiftData for on-device storage, the Observation framework for state, async/await, WidgetKit, and a hand-built character and motion system. All data is mock or drawn from the public oppam.me site. Since the last pass, the <strong>WidgetKit widget shipped</strong> and the whole live-session → rating → history loop was built. A few items remain <strong>deliberately deferred</strong>, and naming them is part of the design: a Live Activity for the session countdown, alternate app icons (needs asset variants), HealthKit sleep-awareness for the night companion, and Apple Sign In - kept out of onboarding on purpose, because trust should come before identity.',
    },
    {
      t: 'stats',
      items: [
        { v: '29', l: 'Swift files' },
        { v: '~6,800', l: 'Lines of Swift' },
        { v: '10', l: 'Therapists (from oppam.me)' },
        { v: '0', l: 'Third-party UI libraries' },
      ],
    },

    { t: 'hr' },
    {
      t: 'quote',
      x: 'The goal was never to build a better therapy app. It was to build the first ten seconds - the moment someone opens it, exhales, and feels that, for once, nothing is being asked of them. Everything else is just keeping that promise.',
      by: 'Design intent, Oppam',
    },
  ],
};
