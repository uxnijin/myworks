// ============================================================================
//  Nisf: a redesign, in progress.
//
//  Screens: nisf-assets/screens (31 captures of the app as it ships today;
//  the My Information screen is left out, it carries a real email and phone
//  number). They run as a full-bleed moving band, the `screens` block.
//
//  This is the opening only. The study itself goes underneath.
// ============================================================================

BODY('nisf', {
  blocks: [
    { t: 'p', x: 'It is live, with a real user base across Kerala. That is the constraint behind most of what follows: the redesign lands on people who already know their way around, so it has to be recognisable on the first open.' },
    { t: 'p', x: 'A profile is a code, F&#8209;2249, with an age, a district and a line about how the person covers. No photograph. So the work of the app is helping you decide who is worth a request from that alone.' },
    { t: 'p', x: 'That decision is where the app is unusual. Under the filters any matrimonial site has (age, location, education, income, height, language) sits a second layer that a general one has no reason to build: <em>path</em> and <em>aqeedah</em> and <em>madhab</em>, how much of the Qur&rsquo;an someone has memorised in juz, the level of their tajweed, their Arabic, their view on photography of people, the courses they have finished inside the app itself. A profile is read across five tabs, and one of them is Deen.' },
    { t: 'p', x: 'Around that sits the machinery: a wali&rsquo;s verification as a status you can see before you write, requests that live in four states, and a purchase wall somewhere in between.' },

    { t: 'h2', x: 'The app as it is today' },
    { t: 'p', x: 'Thirty-one screens of the live app, running now on real phones. This is the thing being redesigned, not the redesign. Almost every decision further down this page is an answer to something in here.' },
    {
      t: 'screens',
      label: 'Thirty-one screens of the Nisf app as it ships today',
      items: [
        { src: '/nisf-assets/screens/0833.webp' },
        { src: '/nisf-assets/screens/0834.webp' },
        { src: '/nisf-assets/screens/0835.webp' },
        { src: '/nisf-assets/screens/0836.webp' },
        { src: '/nisf-assets/screens/0837.webp' },
        { src: '/nisf-assets/screens/0838.webp' },
        { src: '/nisf-assets/screens/0839.webp' },
        { src: '/nisf-assets/screens/0840.webp' },
        { src: '/nisf-assets/screens/0841.webp' },
        { src: '/nisf-assets/screens/0842.webp' },
        { src: '/nisf-assets/screens/0843.webp' },
        { src: '/nisf-assets/screens/0844.webp' },
        { src: '/nisf-assets/screens/0845.webp' },
        { src: '/nisf-assets/screens/0846.webp' },
        { src: '/nisf-assets/screens/0847.webp' },
        { src: '/nisf-assets/screens/0848.webp' },
        { src: '/nisf-assets/screens/0849.webp' },
        { src: '/nisf-assets/screens/0850.webp' },
        { src: '/nisf-assets/screens/0851.webp' },
        { src: '/nisf-assets/screens/0852.webp' },
        { src: '/nisf-assets/screens/0853.webp' },
        { src: '/nisf-assets/screens/0854.webp' },
        { src: '/nisf-assets/screens/0855.webp' },
        { src: '/nisf-assets/screens/0856.webp' },
        { src: '/nisf-assets/screens/0857.webp' },
        { src: '/nisf-assets/screens/0858.webp' },
        { src: '/nisf-assets/screens/0859.webp' },
        { src: '/nisf-assets/screens/0860.webp' },
        { src: '/nisf-assets/screens/0861.webp' },
        { src: '/nisf-assets/screens/0862.webp' },
        { src: '/nisf-assets/screens/0864.webp' }
      ],
    },

    { t: 'h2', x: 'Before any screen' },
    { t: 'p', x: 'The redesign did not start in the design file. It started with the complaints: the support WhatsApp, the store reviews, and the people around the app itself. Sisters who use it with a sister beside them, a brother browsing after night duty in Riyadh, and a father in Malappuram who runs his daughter&rsquo;s account because the deen knowledge is hers and the phone is his problem.' },
    { t: 'p', x: 'So the first artefact is not a wireframe, it is a plan. Three questions, written down before anything else so the answers could not drift: where exactly do people give up in the filter and request flows, what does privacy actually mean to a sister as against her wali, and can a father in his fifties finish the core journey without one of his children sitting next to him.' },
    { t: 'image', src: '/nisf-assets/ux/research-plan.webp', alt: 'The research plan: why the work is happening, three research questions, the method, what is out of scope, and planning sticky notes around it', caption: 'The plan, so the answers could not drift.' },

    { t: 'h2', x: 'What people actually said' },
    { t: 'p', x: 'Seven people, plus two walis on the phone, in Malayalam. The notes keep the lines blunt because the blunt lines are the useful ones. <em>My photo? Never. My brother&rsquo;s friends are all on these apps.</em> <em>I opened the filter and it was like a government form.</em> <em>Viewed 7 months ago hurt more than a decline.</em>' },
    { t: 'p', x: 'One line came back four times in different mouths: the app says the request was sent, but sent <em>where</em>? Nobody could describe what happens on the other side. That single unanswered question does more damage than any broken screen, because silence reads as rejection.' },
    { t: 'image', src: '/nisf-assets/ux/interviews.webp', alt: 'Seven participant cards with sticky notes of raw interview quotes underneath each one, and tally marks in the margins', caption: 'P1 to P7, quotes kept blunt on purpose.' },

    { t: 'h2', x: 'The same person, from four sides' },
    { t: 'p', x: 'The empathy map is a composite of the three sisters, and the gap it exposes is between what is said and what is done. She says the ID-only profile is why she installed it. What she does is screenshot profiles into the family WhatsApp group for votes, and check who viewed her every day while telling no one that she does.' },
    { t: 'image', src: '/nisf-assets/ux/empathy-map.webp', alt: 'An empathy map with Says, Thinks, Does and Feels quadrants of sticky notes around a centre circle labelled Aisha, 22, Kozhikode', caption: 'Says one thing, does another. Both are true.' },
    { t: 'p', x: 'Three personas, and the point of them is that all three must succeed on the same screens. Aisha decides with her family. Riyas has thirty minutes after a night shift and a father in Kerala to hand things to. And Abdul Rahman, 54, is the stress test: large-font mode on, icons meaningless without labels, and full authority over the outcome. Every screen in the redesign got asked one question: can Abdul Rahman do this alone?' },
    { t: 'image', src: '/nisf-assets/ux/personas.webp', alt: 'Three persona cards: Aisha, 22, a student in Kozhikode; Riyas, 26, a nurse in Riyadh; and Abdul Rahman, 54, a shop owner and wali, each with goals, frustrations and comfort bars', caption: 'Three people, one set of screens.' },

    { t: 'h2', x: 'The real competitor is not an app' },
    { t: 'p', x: 'The matrix has the apps you would expect in it, and none of them owns the thing Nisf is actually for: a guardian in the loop. The column that mattered was the last one. The local broker aunty gives families something no app in the row does, which is news. She reports back. Who saw the proposal, who is thinking, who said no.' },
    { t: 'p', x: 'That reframed the work. The app does not need chat to compete. It needs to report back the way she does: honest states on every request, viewed and expired written in plain words, and a next step at every dead end.' },
    { t: 'image', src: '/nisf-assets/ux/competitive.webp', alt: 'A comparison matrix of Nisf against Muzz, Salams, Shaadi and the local broker across eight rows, with sticky note conclusions beside it', caption: 'The broker reports back. The app has to learn that.' },

    { t: 'h2', x: 'Where the journey breaks' },
    { t: 'p', x: 'Aisha&rsquo;s journey through the app as it ships, with her mood drawn as a line. It falls off a cliff twice, and neither cliff is a visual problem. The first is the fifteen-screen filter, abandoned twice by someone who wanted to use it. The second is the wait after sending a request, where the app goes quiet and she fills the silence with the worst interpretation.' },
    { t: 'p', x: 'The line only climbs at the end, when a father picks up the phone and the app gets out of the way. Which is the finding in one sentence: the product is at its best exactly where it stops being a product.' },
    { t: 'image', src: '/nisf-assets/ux/journey-map.webp', alt: 'A journey map of nine stages from hearing about the app to the family call, with an emotion line dipping at the filter and the waiting stages, and pain and opportunity notes under each stage', caption: 'Two cliffs: the filter, and the silence.' },

    { t: 'h2', x: 'What the notes add up to' },
    { t: 'p', x: 'Five insights survived the so-what test. Privacy means control over who sees, not hiding from everyone. Silence damages trust more than rejection does. The wali is a user, not a feature. The filters have the right depth in the wrong shape. And after an accept, the job is a graceful handover to the families, not more app.' },
    { t: 'image', src: '/nisf-assets/ux/insights-hmw.webp', alt: 'Five numbered insight cards, each citing its evidence, next to a cluster of how-might-we sticky notes', caption: 'Five insights, each with its receipts.' },

    { t: 'h2', x: 'The map, then the paths' },
    { t: 'p', x: 'The structure was sorted with paper cards over chai, and the first thing that happened is that Courses and Coaching landed in the same pile without a prompt. So five tabs became four before any screen was drawn, and the sitemap grew a rule the old app never had: every state gets a real screen. Empty, expired, declined, failed, offline. If a branch can happen, it has somewhere to land.' },
    { t: 'image', src: '/nisf-assets/ux/ia-sitemap.webp', alt: 'The old five-tab structure scribbled out in red above the new four-tab sitemap, with every sub-screen and its edge states annotated', caption: 'Five tabs crossed out, four drawn properly.' },
    { t: 'p', x: 'Then the two flows that carry the product. The golden path runs from browsing to two fathers on the phone, and every exit from it (declined, expired, resend) ends at a screen that exists. The filter flow is a loop on purpose: no matches leads to why, and editing the filter brings everything back still filled in, because a reset is a punishment.' },
    { t: 'image', src: '/nisf-assets/ux/user-flows.webp', alt: 'Two flowcharts: the request flow from browsing to the family call with decline, expiry and resend branches, and the filter loop ending in a result count', caption: 'The golden path ends at a phone call, not a screen.' },

    { t: 'h2', x: 'Paper before pixels' },
    { t: 'p', x: 'The first Home sketch had photo cards, because that is what every reference looks like. It is the only sketch with a red cross through it. The research killed it in a day: photos are not a missing feature of this app, they are the whole problem with the other ones. The winner keeps the card, swaps the photo for an abstract plate with the ID and the shield, and lets the status pill grow out of the card&rsquo;s corner.' },
    { t: 'p', x: 'Two more fights happened on paper, which is the cheapest place to lose them. Tabs on the profile were crossed out mid-sketch for one scroll with anchor chips, because Abdul Rahman cannot find tabs and everyone can scroll. And requests answer with two big honest buttons, not swipe gestures, because a swipe is a dating-app verb and an accident waiting for a man with large-font mode on.' },
    { t: 'image', src: '/nisf-assets/ux/wireframes.webp', alt: 'Rough hand-drawn wireframes: the rejected photo-card home crossed out in red, the winning ID-plate version, the one-scroll filter, the profile with tabs scribbled out, the requests screen with buttons, and a crazy-eights strip', caption: 'The one with the red cross paid for all the others.' },

    { t: 'h2', x: 'Decisions, dated' },
    { t: 'p', x: 'Every call that shaped the redesign is in a log with its date and its evidence, so future me stops re-arguing with past me. Photos out. Five tabs to four. Fifteen filter screens to one. Buttons, never swipes. The wali moved to step two of onboarding, verified by a phone call. And confetti on a match rejected, because this is a nikah, not a game.' },
    { t: 'image', src: '/nisf-assets/ux/decision-log.webp', alt: 'A dated decision log of ten rows, each with the decision, the evidence behind it and its shipped status', caption: 'Dated, so it stays settled.' },

    { t: 'h2', x: 'Where it starts' },
    { t: 'p', x: 'Two decisions come before any screen gets drawn: what it is set in, and what colour it is. Every screen after them inherits both, so they are cheap to change now and expensive to change later.' },

    { t: 'p', x: 'Onest, for three reasons. Its letters are open and its x-height is tall, which is what keeps small type legible, and this app is mostly small type, since a filter is a wall of chips. It ships as one variable file covering 100 to 900, so the whole hierarchy comes out of a single download instead of five. And it is friendly without being childish, which matters in an app that is asking people personal questions.' },
    { t: 'image', src: '/nisf-assets/tokens-type.webp', alt: 'The Onest typeface: the name set large, the character set, five weights from Light to Bold, and a display, title and body scale', caption: 'Onest.' },

    { t: 'p', x: '<strong>#65558F</strong> is not a new colour. It is the purple the app already wears (the icon is that colour), and keeping it means the redesign arrives as the same app rather than a different one that took the name.' },
    { t: 'p', x: 'It also sits at a useful lightness. White on it clears AA at 6.5:1, and it clears AA again as text on the near-white surface, so one colour does both jobs: the fill of a button, and the ink of a link. A system that needs a second, darker purple for text has two colours to keep in step forever.' },
    { t: 'p', x: 'Everything else is that colour at another tone. On a near-white surface the tones do the separating, so a card can sit apart from what is behind it without a border drawn around it.' },
    { t: 'image', src: '/nisf-assets/tokens-colour.webp', alt: 'The colour token sheet: the primary #65558F large, beside its tonal steps from 95 down to 20, with the surface and ink', caption: 'One colour, and its tones.' },

    { t: 'h2', x: 'The navigation' },
    { t: 'p', x: 'The old bar was Material&rsquo;s own: five tabs with a pill sliding in under the active one. The reason to leave it is that the app ships on both platforms and that bar is Android&rsquo;s. What replaces it is the shape iOS and Android already agree on, so neither side has to learn anything.' },
    { t: 'p', x: 'Five tabs became four. Courses and Coaching were one intent wearing two names (somebody who wants to learn does not care which shelf it is filed on), so they are a single tab called Learn. Four tabs also give each one a wider target than five did.' },
    { t: 'p', x: 'Every icon keeps its label. An icon on its own has to be learned first; a word does not.' },
    { t: 'p', x: 'And the icons are drawn for this app rather than lifted from a set, so their weight and their corners match everything around them. A borrowed icon set is the usual reason an app looks slightly assembled.' },
    { t: 'image', src: '/nisf-assets/navbar.webp', alt: 'The redesigned bottom navigation: Home, Requests, Learn and Profile, with custom filled icons and the active tab in purple', caption: 'Home, Requests, Learn, Profile.' },

    { t: 'h2', x: 'The top of the list' },
    { t: 'p', x: 'Search, filter and the status chips are all doing one job: narrowing a list of strangers down to a few worth reading. The old screen spread that job over three rows, put sort in the middle of it, and left the last chip cut off behind a scroll arrow.' },
    { t: 'p', x: 'So filter moves up beside the field it belongs to, and the chips get the width to all fit. Everything that narrows the list is now one tap away, and none of it is hidden.' },
    { t: 'p', x: 'The placeholder does a quiet job as well. It names what the field takes, id or location, because a box that only says <em>Search</em> has to be guessed at, and a guess that returns nothing reads as an empty app rather than a wrong query.' },
    { t: 'image', src: '/nisf-assets/search.webp', alt: 'The redesigned top of the profiles list: a search field reading search by id or location, a filter button beside it, and the All, Not Viewed, Saved and Viewed chips', caption: 'Search, filter, and four chips that fit.' },

    { t: 'p', x: 'The study goes under here.' },
  ],
});
