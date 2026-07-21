// ============================================================================
//  Oppam - the Companion Experience
//  Mobile App Design Case Study (concept redesign of oppam.me)
//
//  A ground-up reimagining of Oppam's therapy platform as a native iOS app
//  built around a single idea: not a therapy app, but the feeling of someone
//  quietly coming to sit beside you. Designed and built end-to-end as a
//  running SwiftUI prototype - 17 files, ~4,100 lines, no UI libraries.
//
//  Redesign concept of a real, existing product. The disclaimer callout
//  below must stay.
// ============================================================================

const DESIGN_OPPAM = {
  slug: 'oppam',
  name: 'Oppam: A Companion, Not an App',
  category: 'Mobile App',
  icon: 'sun',
  tag: 'Case Study',
  status: 'Prototype',
  summary: 'Reimagining a Kerala therapy platform as a warm iOS companion - a living mascot, a sunlit design system, and privacy built for shared homes. Designed and shipped as a running SwiftUI app.',
  lede: 'In Kerala, most people who need therapy wait - not because help is missing, but because asking for it is heavy. Stigma, shared phones, cost confusion, the fear of the unknown first session. Oppam (ഒപ്പം - "beside you") is a redesign concept that answers those fears with a single idea: not a therapy app, but the digital embodiment of someone quietly coming and sitting beside you. This is that idea built all the way into a real, runnable iOS app - with a companion character that breathes, a design system made of sunlight, and privacy designed for a house where the phone gets borrowed.',
  tech: ['SwiftUI', 'iOS 18', 'SwiftData (on-device only)', 'Observation', 'Custom character system', 'Face ID', 'Mock data · no cloud'],
  blocks: [

    // ── Hero ─────────────────────────────────────────────────────────────────
    {
      t: 'image',
      src: '/oppam-assets/hero.webp',
      alt: 'Three screens from Oppam - the onboarding sunrise, the home veranda, and therapist matching',
      caption: 'The sunrise that opens the app, the "veranda" home, and Care - where you meet people, not a directory.',
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
      x: 'This isn\'t a Figma file exported to images. It is a working SwiftUI app running on an iPhone - the companion actually breathes and blinks, the breathing exercise really counts you through 4–2–6, the journal really locks behind Face ID, and the therapist matching really reorders people around the feelings you pick. <strong>17 Swift files, ~4,100 lines, zero third-party UI libraries.</strong>',
    },

    // ── At a glance ──────────────────────────────────────────────────────────
    {
      t: 'table',
      head: ['', ''],
      rows: [
        ['Role', 'Product Designer &amp; iOS Engineer - research, IA, brand, character, UI, motion, build'],
        ['Type', 'Concept redesign of an existing product · independent prototype'],
        ['Platform', 'Native iOS (iPhone, iOS 18)'],
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
      x: 'The current Oppam platform already works - it connects people to good therapists across 45+ countries. So a redesign that just repaints buttons would be missing the point. The interesting problem is upstream of the app: <strong>most people who would benefit never book at all.</strong> Before designing a single screen, I mapped <em>why</em> - the quiet, human reasons someone in Kerala puts it off. Each barrier below became a specific design decision.',
    },
    {
      t: 'table',
      head: ['The barrier (why people wait)', 'Oppam\'s design answer'],
      rows: [
        ['<strong>"Am I mad, then?"</strong> - stigma. Therapy is whispered about; being seen at a clinic carries a cost.', 'No clinical language anywhere. You "sit with" someone - you don\'t "get treated." The app never once says the word it\'s afraid of.'],
        ['<strong>Family visibility.</strong> Shared homes, shared phones, a sibling who borrows your device.', 'A Privacy Room: Face ID on the journal, a sunrise cover in the app switcher, neutral notifications, and a one-tap "hide" that turns your pages into a grocery list.'],
        ['<strong>"Is my problem big enough?"</strong> People wait for a crisis to feel they\'ve earned help.', 'The check-in asks for <em>weather</em>, not symptoms. "Just wanting to talk" is a first-class, valid reason.'],
        ['<strong>Form dread.</strong> Sign-up walls make it feel like registering an illness.', 'No account. A first name only - any name. "Just let me look around" skips everything.'],
        ['<strong>Cost opacity.</strong> Fear of packages, upsells, hidden fees.', 'A ₹ price on every card: "per session, always. No packages, no pressure." The first-session discount applies itself.'],
        ['<strong>Language distance.</strong> Feelings don\'t translate; English therapy feels like an exam.', 'Malayalam / English / Manglish, chosen up front - and the emotionally load-bearing lines actually switch, not just the labels.'],
        ['<strong>The unknown first session.</strong> The tallest wall is not knowing what happens in there.', 'Every therapist answers "Your first session, honestly" - camera-off allowed, silence allowed, nothing to prepare.'],
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
        { title: '"Today was heavy"', desc: 'A one-tap weather check-in, and a warm sentence back. The lightest possible way to be honest with yourself.' },
        { title: '"I could try writing"', desc: 'Pages: private, prompt optional, spelling doesn\'t matter, Malayalam or Manglish both fine.' },
        { title: '"Maybe a person"', desc: 'Care: name a feeling, meet three people, and - crucially - hear <em>why</em> each of them.' },
        { title: '"I\'m scared of the first session"', desc: 'An honest note from the therapist, camera-off and chat modes, and "come exactly as you are."' },
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
        { icon: 'home', title: 'Home - the veranda', desc: 'Named after the Kerala <em>charupadi</em>, where you sit beside someone without needing a reason. A time-aware sky, a greeting by name, the weather check-in, your next session, a quiet moment to breathe. Never a dashboard.' },
        { icon: 'sun', title: 'Care', desc: 'Finding a therapist reimagined as <strong>being introduced by a trusted friend</strong>, not browsing a marketplace. You name a feeling; Oppam brings three people and says why them. The full searchable list is one tap deeper, for those who prefer to look themselves.' },
        { icon: 'book', title: 'Pages', desc: 'A private notebook that lives on the phone - journal, "letters to future me" sealed until their day, and the memory garden. Face ID at the door; a quick-hide leaf in the corner.' },
        { icon: 'verified', title: 'You', desc: 'Deliberately tiny. The Privacy Room is the hero; real Kerala helplines sit right there; the language-of-the-heart switcher lives here. There is almost nothing to "manage" - on purpose.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Why Care is "introductions," not a directory',
      x: 'A directory asks an anxious person to evaluate strangers and pick correctly - a cognitively expensive, faintly clinical task. Oppam inverts it: you say what\'s sitting with you, and it introduces a few people, each with a plain-language reason ("sits with anxiety often," "evening &amp; night times," "speaks Malayalam"). It feels like a friend saying <em>"I know someone you\'d like."</em> The exhaustive list still exists - it\'s just not the front door.',
    },
    { t: 'h3', x: 'Reading the Home screen' },
    {
      t: 'p',
      x: 'The clearest way to see the philosophy is to mark up a single screen. Everything on Home is an <em>invitation</em>, never an instruction - and there is only ever one loud action at a time.',
    },
    {
      t: 'image',
      src: '/oppam-assets/home-anatomy.webp',
      alt: 'Annotated anatomy of the Oppam home screen with seven numbered callouts',
      caption: 'Home, annotated. Warmth is not decoration here - every element is doing a job the research asked for.',
    },
    {
      t: 'image',
      src: '/oppam-assets/home-states.webp',
      alt: 'The home screen in morning, evening and night - the sky and companion change with the hour',
      caption: 'The same screen at morning, evening and night. The sky shifts, and after 9 PM the companion grows sleepy-lidded and holds a lantern - it stays up with you.',
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
      svg: `<svg viewBox="0 0 920 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Construction of the companion face - two upward eye arcs and one lifted smile">
  <rect x="2" y="2" width="916" height="466" rx="28" fill="#FFFDF6" stroke="#EADFC8" stroke-width="2"/>
  <!-- LEFT: construction -->
  <text x="60" y="60" font-family="Georgia, serif" font-size="26" fill="#33302A" font-weight="bold">How it's built</text>
  <!-- guide frame -->
  <rect x="90" y="120" width="300" height="200" rx="6" fill="none" stroke="#E3D6B8" stroke-width="1.5" stroke-dasharray="5 6"/>
  <!-- horizontal guides -->
  <line x1="90" y1="180" x2="390" y2="180" stroke="#E3D6B8" stroke-width="1.5" stroke-dasharray="4 6"/>
  <line x1="90" y1="224" x2="390" y2="224" stroke="#E3D6B8" stroke-width="1.5" stroke-dasharray="4 6"/>
  <text x="398" y="185" font-family="Helvetica, sans-serif" font-size="15" fill="#9C9384">eyes · 30% height</text>
  <text x="398" y="229" font-family="Helvetica, sans-serif" font-size="15" fill="#9C9384">smile · 52% height</text>
  <!-- vertical guides -->
  <line x1="180" y1="120" x2="180" y2="320" stroke="#E3D6B8" stroke-width="1.5" stroke-dasharray="4 6"/>
  <line x1="300" y1="120" x2="300" y2="320" stroke="#E3D6B8" stroke-width="1.5" stroke-dasharray="4 6"/>
  <!-- eyes: two upward arcs -->
  <path d="M164 182 Q180 162 196 182" fill="none" stroke="#33302A" stroke-width="9" stroke-linecap="round"/>
  <path d="M284 182 Q300 162 316 182" fill="none" stroke="#33302A" stroke-width="9" stroke-linecap="round"/>
  <!-- smile: wide curve, tips lifted -->
  <path d="M120 208 C176 286 304 286 360 208" fill="none" stroke="#33302A" stroke-width="9" stroke-linecap="round"/>
  <!-- control-point dots -->
  <circle cx="120" cy="208" r="5" fill="#FFC13B"/><circle cx="360" cy="208" r="5" fill="#FFC13B"/>
  <circle cx="180" cy="162" r="5" fill="#FFC13B"/><circle cx="300" cy="162" r="5" fill="#FFC13B"/>
  <text x="60" y="386" font-family="Helvetica, sans-serif" font-size="16" fill="#6E675C">Two upward arcs (eyes) + one long smile whose</text>
  <text x="60" y="410" font-family="Helvetica, sans-serif" font-size="16" fill="#6E675C">tips lift past the eyes - lifted straight from the logo.</text>
  <!-- divider -->
  <line x1="600" y1="70" x2="600" y2="400" stroke="#EADFC8" stroke-width="1.5"/>
  <!-- RIGHT: result -->
  <text x="640" y="60" font-family="Georgia, serif" font-size="26" fill="#33302A" font-weight="bold">What it becomes</text>
  <circle cx="750" cy="220" r="118" fill="#FFC13B" opacity="0.10"/>
  <circle cx="750" cy="220" r="96" fill="#FFC13B" opacity="0.14"/>
  <circle cx="750" cy="220" r="78" fill="#FFFDF4" stroke="#F0E4C4" stroke-width="1.5"/>
  <path d="M714 182 Q730 162 746 182" fill="none" stroke="#33302A" stroke-width="7.5" stroke-linecap="round"/>
  <path d="M754 182 Q770 162 786 182" fill="none" stroke="#33302A" stroke-width="7.5" stroke-linecap="round"/>
  <path d="M704 208 C734 274 766 274 796 208" fill="none" stroke="#33302A" stroke-width="7.5" stroke-linecap="round"/>
  <text x="640" y="386" font-family="Helvetica, sans-serif" font-size="16" fill="#6E675C">A soft sun with dawn-light halos. The same face -</text>
  <text x="640" y="410" font-family="Helvetica, sans-serif" font-size="16" fill="#6E675C">now able to breathe (~8s), blink, and feel.</text>
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
      caption: 'Peaceful, listening, happy, comforting, sleeping - the same geometry, re-curved. This screen is generated live by the app, not drawn by hand.',
    },
    { t: 'h3', x: 'The rules it never breaks' },
    {
      t: 'cards',
      items: [
        { icon: 'activity', title: 'It always breathes', desc: 'A ~8-second breathing cycle at 2.5% scale, and a blink every 3–6 seconds. Stillness reads as "dead"; breath reads as "present."' },
        { icon: 'moon', title: 'It sleeps, it doesn\'t leave', desc: 'After 9 PM it grows sleepy-lidded and holds a lantern in the night scene. It never disappears - someone is always still there.' },
        { icon: 'book', title: 'It speaks like a letter', desc: 'The companion\'s words are always set in serif, never in a chat bubble - so it reads like a note from someone who cares, not a chatbot.' },
        { icon: 'sun', title: 'It never performs', desc: 'It never bounces, never talks first in a loud way, never gamifies, never guilt-trips. Presence, not performance.' },
      ],
    },
    {
      t: 'callout',
      kind: 'success',
      title: 'Why this matters commercially, not just emotionally',
      x: 'A living character is the one thing a competitor can\'t clone with a template. It is the brand you <em>feel</em> before you read a word - on the app icon, the launch, the empty states, the app-switcher cover, the booking confirmation. It gives Oppam an ownable identity in a category where most apps look like a hospital form, and it makes the product retainable for the softest reason of all: people come back to something that feels glad they did.',
    },

    // ══ 5. Motion ════════════════════════════════════════════════════════════
    { t: 'h2', x: '5. Motion Is a Feeling, Not a Flourish' },
    {
      t: 'p',
      x: 'Calm is mostly made of timing. Springs are damped near-critical (no bounce), content <em>arrives</em> rather than popping (a 14pt rise + fade, staggered under 80ms), and the breathing exercise paces you through a real <strong>4-in · 2-hold · 6-out</strong> cycle. Static screenshots undersell this, so here it is running - the companion sun swelling and settling as you breathe with it.',
    },
    {
      t: 'image',
      src: '/oppam-assets/motion-breathe.gif',
      alt: 'The breathing exercise: the companion sun swells and settles as the words guide you',
      caption: 'A quiet moment, captured live from the app. In-out with the sun; the words change with the phase. Every motion in Oppam collapses to a gentle cross-fade under Reduce Motion.',
    },

    // ══ 6. The design system ═════════════════════════════════════════════════
    { t: 'h2', x: '6. A Design System Made of Sunlight' },
    {
      t: 'p',
      x: 'The palette started from one instruction to myself: <strong>"sunlight, not yellow."</strong> Not the flat brand-yellow of a highlighter, but Kerala morning light through a wooden window - haldi on warm cotton, a lamp at night. The background is never pure white; it\'s warm paper. Ink is never pure black; it\'s the brown-black of handwriting.',
    },
    {
      t: 'image',
      src: '/oppam-assets/palette.webp',
      alt: 'The Oppam colour palette: paper, sun, honey, sun wash, warm ink, leaf, clay, sky, rose',
      caption: 'The core palette. Each colour carries a meaning - leaf is growth and calm confirmation, sky is rest and night, rose is tenderness and is never used for alarm.',
    },
    { t: 'h3', x: 'Type: two voices' },
    {
      t: 'p',
      x: 'Typography does one deliberate thing: it separates <strong>the human voice from the wayfinding.</strong> A serif carries anything the app "says" to you - greetings, the companion, journal prose - so it reads like a letter. A clean sans-serif carries structure - tabs, buttons, labels. Everything rides Dynamic Type for accessibility.',
    },
    {
      t: 'table',
      head: ['When Oppam is being human', 'When Oppam is being useful'],
      rows: [
        ['<strong>Serif.</strong> "Good morning, Nijin." The companion\'s words. Your journal. The therapist\'s "how I work." Warmth, intimacy, a person talking.', '<strong>Sans-serif.</strong> Tab bar, buttons, prices, filters, meta. Clarity, structure, getting out of the way.'],
      ],
    },
    { t: 'h3', x: 'The rest of the system' },
    {
      t: 'cards',
      items: [
        { icon: 'droplet', title: 'One shadow, everywhere', desc: 'The entire app uses a <strong>single</strong> warm, low shadow - like late-afternoon light. Consistency you feel without noticing.' },
        { icon: 'image', title: 'Organic shapes', desc: 'Continuous-corner cards (26pt), capsule chips, rolling hills. Nothing sharp. The geometry itself is trying to relax you.' },
        { icon: 'layers', title: 'Tinted meanings', desc: 'Sun-wash for warmth, leaf-wash for growth, sky-wash for rest. Colour is used as quiet emotional signage, never decoration.' },
        { icon: 'sun', title: 'Light &amp; lamplight', desc: 'Dark mode isn\'t cold grey - it\'s "lamplight": warm browns and amber, like a lamp left on for you. The whole system is dynamic.' },
      ],
    },

    // ══ 7. The flows that carry the promise ══════════════════════════════════
    { t: 'h2', x: '7. The Signature Flows' },

    { t: 'h3', x: 'Onboarding - five gentle moments, not a form' },
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

    { t: 'h3', x: 'The check-in - weather, not a 1-to-10 scale' },
    {
      t: 'p',
      x: 'One of the load-bearing before/after decisions. A numeric mood scale ("rate your depression 1–10") is clinical and quietly shaming. Oppam replaces the entire mood tracker with a single question about <strong>inner weather</strong> - sunny, cloudy, rainy, breezy - and answers with one warm sentence. It takes under fifteen seconds and never makes you feel graded.',
    },
    {
      t: 'image',
      src: '/oppam-assets/checkin.webp',
      alt: 'The weather check-in: choosing an inner weather, and the warm companion response afterward',
      caption: 'Pick the weather inside; get a sentence back, not a score. Skipping days is never punished - the opposite of a habit tracker.',
    },

    { t: 'h3', x: 'Care - meeting a person, then booking in three taps' },
    {
      t: 'p',
      x: 'Care leads with a real detail from the platform that competitors bury: each therapist has a <strong>voice introduction</strong> and answers "your first session, honestly." Fear dissolves at "hello." Booking is three taps and zero forms - a day, a time, and how you\'d like to meet (video, voice, or chat, because camera-shy is normal here). The price is itemised and the first-session discount applies itself.',
    },
    {
      t: 'image',
      src: '/oppam-assets/care.webp',
      alt: 'Care: the gentle start with a trust strip and feeling chips, and the matched introductions',
      caption: 'Left: you name a feeling (with the platform\'s real 50,000-hours / 45-countries / ★4.8 trust strip). Right: three introductions, each with a plain reason why them.',
    },
    {
      t: 'image',
      src: '/oppam-assets/therapist-booking.webp',
      alt: 'A therapist profile with voice intro, the three-tap booking sheet, and the warm confirmation',
      caption: 'Their voice and "how I work" come first; logistics last. Booking is three taps. The confirmation says "come exactly as you are - that\'s the whole point," and promises a reminder that won\'t mention therapy.',
    },

    { t: 'h3', x: 'Pages - a garden that can only grow' },
    {
      t: 'p',
      x: 'The journal is private by construction (on-device, Face-ID-gated) and warm by tone: prompts are invitations you can dismiss, spelling doesn\'t matter, and you can seal a letter to your future self. Small wins plant a <strong>garden that never wilts</strong> - a deliberate rejection of the streak mechanic that punishes you the day life gets hard.',
    },
    {
      t: 'image',
      src: '/oppam-assets/pages.webp',
      alt: 'The Pages journal with the memory garden, and the quick-hide grocery-list decoy',
      caption: 'Left: the garden, sealed letters, and real journal entries. Right: tap the leaf and your pages instantly become a plausible grocery list - for the moment someone walks in.',
    },

    // ══ 8. Privacy as a feature ══════════════════════════════════════════════
    { t: 'h2', x: '8. Privacy Is the Feature, Not the Footnote' },
    {
      t: 'p',
      x: 'In a shared Kerala household, privacy isn\'t a compliance checkbox - it\'s the thing standing between someone and getting help at all. So it\'s given its own room, and every protection <strong>explains itself in plain words and shows exactly what others would see.</strong> There is no account and no cloud; everything lives on the phone.',
    },
    {
      t: 'image',
      src: '/oppam-assets/you-privacy.webp',
      alt: 'The You tab and the Privacy Room with self-explaining toggles and a live notification preview',
      caption: 'The Privacy Room. Note the live notification preview: it shows the actual harmless text a family member would see on the lock screen ("The sun\'s out over here ☀️") - never the word "therapy."',
    },
    {
      t: 'image',
      src: '/oppam-assets/privacy-signature.webp',
      alt: 'Three privacy signatures: the app-switcher sunrise cover, the notification preview, and the quick-hide decoy',
      caption: 'Three signatures of the same principle: the app-switcher shows only a sunrise, notifications stay neutral, and one tap turns your journal into a grocery list.',
    },

    // ══ 9. Dark lamplight ════════════════════════════════════════════════════
    { t: 'h2', x: '9. Lamplight - Dark Mode, Reimagined' },
    {
      t: 'p',
      x: 'Most dark modes are cold grey - practical, but a little clinical, exactly the feeling Oppam is trying to avoid. So dark mode here is <strong>"lamplight"</strong>: warm browns and amber, like a lamp someone left on for you. The sunlit palette was the hero of the daytime work, so lamplight is intentionally the secondary showcase - proof the system holds together in both.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-showcase.webp',
      alt: 'Four screens in lamplight dark mode: home, care, pages and the privacy room',
      caption: 'Home, Care, Pages and the Privacy Room in lamplight. Every token is dynamic - the same components, re-lit for night.',
    },

    // ══ 10. How it compares ══════════════════════════════════════════════════
    { t: 'h2', x: '10. How It Compares' },
    {
      t: 'p',
      x: 'Oppam sits in a crowded category - but almost every player optimises for a different thing, and that gap is the opportunity. Grounded against the live oppam.me platform and the wider market, here\'s where a companion-first approach differs.',
    },
    {
      t: 'table',
      head: ['What most of the category does', 'What Oppam does instead'],
      rows: [
        ['<strong>Marketplace directories</strong> (BetterHelp, YourDOST, Amaha): filter and scroll a wall of strangers, then self-select.', 'Introductions, not listings. You name a feeling; three people are brought to you, each with a reason. The directory exists - it just isn\'t the front door.'],
        ['<strong>Chatbot-as-therapist</strong> (Wysa, Replika): an AI that role-plays the counsellor.', 'The companion <em>never</em> pretends to be a therapist. It is presence, and it hands you to real, human, credentialed people. That honesty is the trust.'],
        ['<strong>Gamified self-care</strong> (streaks, pets, XP - Finch, Duolingo-style): engagement through mild guilt.', 'A garden that can only grow, and check-ins you can skip without penalty. Care that survives the bad week instead of punishing it.'],
        ['<strong>Clinical mood tracking</strong> (rate 1–10, symptom logs).', 'Inner weather and a warm sentence back. Honesty without a grade.'],
        ['<strong>Meditation-brand calm</strong> (Headspace, Calm): beautiful, but generic and Western.', 'Calm rooted in a specific place - the Kerala veranda, Malayalam, haldi-light - and in one character you build a relationship with.'],
        ['<strong>Privacy as a policy page.</strong>', 'Privacy as a room you can see and touch: Face ID, app-switcher cover, neutral notifications, one-tap hide - designed for shared phones.'],
      ],
    },

    // ══ 11. Where the founders would take it ═════════════════════════════════
    { t: 'h2', x: '11. Where This Goes Next' },
    {
      t: 'p',
      x: 'Thinking as an Oppam founder, not just a designer: the companion and the four rooms are a <strong>platform</strong>, not a finished feature set. Because the character and the design system already exist, each new idea below can arrive feeling native on day one - the companion simply picks up a new way to sit beside you.',
    },
    {
      t: 'cards',
      items: [
        { icon: 'activity', title: 'A breathing library', desc: 'The 4-2-6 exercise grows into a small collection - box breathing, a 3 AM panic reset, a pre-session settle - the companion guiding each. Calm on demand, in the app you already trust.' },
        { icon: 'book', title: 'A deeper journal', desc: 'Guided reflections after a session, gratitude prompts, and "letters to future me" maturing into a genuine keepsake. Private by construction, always on-device.' },
        { icon: 'sun', title: 'A weather log with gentle insight', desc: 'The daily inner-weather check-ins become a felt timeline - "your skies have been clearer since you started with Farsana" - insight that encourages, never diagnoses.' },
        { icon: 'moon', title: 'Sleep-aware night companion', desc: 'With HealthKit, the companion knows you\'re up at 3 AM and softens accordingly - a lantern, a breath, a helpline - without ever being asked.' },
        { icon: 'globe', title: 'Circles &amp; family mode', desc: 'Opt-in, anonymous peer circles (new mothers, students, NRI spouses) and a gentle "family understanding" primer - carefully, because privacy is the whole promise.' },
        { icon: 'home', title: 'Home-screen presence', desc: 'A WidgetKit sunrise widget and a Live Activity that quietly counts down to a session - the companion on your home screen, still just… beside you.' },
        { icon: 'image', title: 'Alternate app icons', desc: 'The companion in different lights (dawn, lamplight, monsoon) - so even the icon on a shared phone is one you chose, and one that feels like yours.' },
        { icon: 'verified', title: 'The companion, one register wiser', desc: 'Carefully-scoped, on-device warmth - remembering your name, your weather, your language - always handing real feelings to real people. Never a therapist; always a companion.' },
      ],
    },

    // ══ 12. Scope & honesty ══════════════════════════════════════════════════
    { t: 'h2', x: '12. Prototype Scope' },
    {
      t: 'p',
      x: 'Built with SwiftUI on iOS 18 - SwiftData for on-device storage, the Observation framework for state, async/await, and a hand-built character and motion system. All data is mock or drawn from the public oppam.me site. A few items were <strong>deliberately deferred</strong> as a later pass, and naming them is part of the design: the WidgetKit widget, the Live Activity, alternate app icons (needs asset variants), HealthKit sleep-awareness, and Apple Sign In - the last one kept out of onboarding on purpose, because trust should come before identity.',
    },
    {
      t: 'stats',
      items: [
        { v: '17', l: 'Swift files' },
        { v: '~4,100', l: 'Lines of Swift' },
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
