// ============================================================================
//  Kcalo: a concept calorie tracker, designed end to end.
//
//  Assets: kcalo-assets/ (slide-frame exports from the Figma file: screens on
//  a grey surface at 44px radius, no bezels, no shadows) and kcalo-assets/ux/
//  (the twelve process boards). Everything on this page is exported from the
//  same file: design, components, branding, deck and store screenshots.
// ============================================================================

BODY('kcalo', {
  blocks: [
    { t: 'p', x: 'This one has no client and no users, and says so up front. The brief was mine: take one sharp idea and carry it the whole distance a real product goes. Research, flows, a token system, a component library, thirty-one screens with their empty and error states, a brand, three posters, six App Store screenshots and a ten-slide pitch. One Figma file, one week of evenings.' },
    { t: 'p', x: 'The idea itself came from watching people around me. Everyone has installed a calorie tracker. Nobody still uses one. The apps all work; the logging is what dies. And the same people who will not type a meal photograph their meals constantly, for Instagram, for a spouse, for a dietitian on WhatsApp. The behaviour already exists. Kcalo just reroutes it.' },

    { t: 'h2', x: 'The homework' },
    { t: 'p', x: 'The plan asked three questions and named the bar for success: does anyone still log on day five? Six interviews, a two-week diary study where four people re-tried their old trackers, 180 store reviews tagged, and a plate test of thirty real mixed Kerala meals to see if a photo can even be itemised by eye.' },
    { t: 'image', src: '/kcalo-assets/ux/research-plan.webp', alt: 'The research plan: why the work exists, three research questions, the method, what is out of scope, with planning sticky notes beside it', caption: 'The Day-5 test, written down before any screen.' },
    { t: 'p', x: 'The interviews kept landing the same two blows. Effort: <em>I searched porotta and got forty American flatbreads.</em> <em>Day 4, breakfast, I could not search for idli one more time.</em> And shame: <em>red numbers at 2 AM after a hard shift, I deleted it that night.</em> Nobody quit over a bad calorie day. Everyone quit over the logging or the scolding.' },
    { t: 'p', x: 'The thread that became the product was quieter. A nurse photographs his dinner for his wife. A mother photographs the pot before serving. A dietitian estimates calories from client photos on WhatsApp all day. Three people describing the same interface without knowing it.' },
    { t: 'image', src: '/kcalo-assets/ux/interviews.webp', alt: 'Six participant cards and a dietitian, each with sticky notes of raw interview quotes underneath', caption: 'P1 to P5, plus the dietitian who already does the job by eye.' },

    { t: 'h2', x: 'Who it has to survive' },
    { t: 'p', x: 'The empathy map is Meera, a composite of the quitters: photographs food anyway, quits at the first untrackable meal rather than the first bad number, and reads red type as a teacher’s red pen.' },
    { t: 'image', src: '/kcalo-assets/ux/empathy-map.webp', alt: 'An empathy map with Says, Thinks, Does and Feels quadrants around a centre circle labelled Meera, 25, Thrissur', caption: 'Quits at the first untrackable meal, not the first bad day.' },
    { t: 'p', x: 'Three personas share the screens. Meera has a wedding in eight months and three sadyas a week. Ajmal wants protein numbers between sets. And Rukiya is the stress test: one pot for four people, one free hand, twenty-second sessions, no food scale ever. Every flow got asked her question first.' },
    { t: 'image', src: '/kcalo-assets/ux/personas.webp', alt: 'Three persona cards: Meera, 25; Ajmal, 24; and Rukiya, 31, each with goals, frustrations and comfort bars', caption: 'Rukiya is the bar: one hand, twenty seconds, no scale.' },

    { t: 'h2', x: 'The control condition is a person' },
    { t: 'p', x: 'The competitive scan put the usual apps in columns and then added the one that wins: a dietitian on WhatsApp. She takes photos, estimates by eye, and answers with mercy. She loses only on price and scale. That reframed the whole build: Kcalo is not a better database, it is her eye and her tone, productised.' },
    { t: 'image', src: '/kcalo-assets/ux/competitive.webp', alt: 'A comparison matrix of Kcalo against MyFitnessPal, Cal AI, Yazio and HealthifyMe, with a dietitian on WhatsApp as the final column', caption: 'The last column wins on everything except price.' },
    { t: 'p', x: 'The journey map draws the standard first week: heroic on install night, drowning in search by day two, one festival kills the week, red numbers finish it on day four. A seventh stage sits at the end with the same person and the same food going through a photo instead. The whole product is the distance between those two dots.' },
    { t: 'image', src: '/kcalo-assets/ux/journey-map.webp', alt: 'A journey map of a first week with a classic tracker, the emotion line collapsing to uninstall on day four, then recovering at a final stage labelled with Kcalo', caption: 'Same person, same food, different curve.' },
    { t: 'p', x: 'Five insights survived, and four principles came out of them: the camera is the keyboard, kind numbers, made for the mixed plate, and bends-does-not-break. Every screen below answers to those four.' },
    { t: 'image', src: '/kcalo-assets/ux/insights-hmw.webp', alt: 'Five numbered insight cards with their evidence, beside a cluster of how-might-we sticky notes', caption: 'Five insights, each with its receipts.' },

    { t: 'h2', x: 'Paper first' },
    { t: 'p', x: 'The first home sketch had a search bar on top and a Diary tab below, and it earned the only red cross on the board, because it was MyFitnessPal with new paint. The second draws the day itself: a ring, a week strip, meals as cards, and no tab bar at all. Logging is a moment, not a place you visit, so the plus on every meal card opens the camera.' },
    { t: 'p', x: 'Two more fights ended on paper, where losing is cheap. Apple-style macro rings lost to labelled bars, because nobody can say which ring is carbs. And the red over-limit screen lost to a warm orange card with a walk suggestion, because one participant uninstalled over exactly that screen.' },
    { t: 'image', src: '/kcalo-assets/ux/wireframes.webp', alt: 'Rough hand-drawn wireframes: the search-first home crossed out in red, the winning day-first version, the rings versus bars debate, the red over-limit screen crossed out, and a crazy-eights strip on the reward moment', caption: 'The one with the red cross paid for the rest.' },
    { t: 'p', x: 'The structure and the loop, cleaned up: onboarding feeds a hub, and the core loop runs from hunger to logged in five seconds, with every exit drawn. A failed scan gets tips and a typed fallback. Offline queues the photo. A dead end is a design bug.' },
    { t: 'image', src: '/kcalo-assets/ux/ia-sitemap.webp', alt: 'The rejected four-tab structure scribbled out above the shipped sitemap: onboarding into a single home hub with scan, add food, day, progress and settings branches', caption: 'The tab bar died on paper.' },
    { t: 'image', src: '/kcalo-assets/ux/core-loop.webp', alt: 'A flowchart of the core loop from hungry to logged with retry, search fallback and fix-results branches', caption: 'Five seconds, every exit accounted for.' },

    { t: 'h2', x: 'Where drawing starts' },
    { t: 'p', x: 'One family everywhere: SF Pro Rounded. The app is mostly numbers, and rounded numerals read as friendly where a grotesque reads as a lab report. Bold carries every number, Semibold every label, Medium the body, and that is the whole hierarchy.' },
    { t: 'image', src: '/kcalo-assets/tokens-type.webp', alt: 'The type specimen: SF Pro Rounded with the six-step scale from hero numbers to captions', caption: 'One family. Bold for numbers, Semibold for labels.' },
    { t: 'p', x: 'One green with a job: #35C858 fills buttons, rings and wins, and nothing else. The three macro colours are locked to their own bars, each with a pastel track, so a colour always means the same nutrient. Yellow belongs to the flame ring alone. When a colour has one job, a glance is enough.' },
    { t: 'image', src: '/kcalo-assets/tokens-colour.webp', alt: 'Eight colour swatch cards with hex values and usage notes: the greens, flame yellow, the three macro accents, ink and canvas', caption: 'Every colour with its one job written on the card.' },

    { t: 'h2', x: 'The card the app hangs off' },
    { t: 'p', x: 'The hero card answers the only question that matters at a glance: how much is left today. The number is huge and the unit is not, the flame sits in a real progress ring, and what has been eaten lives in a quiet pill instead of a second headline. Below, the three macro bars with their fixed colours.' },
    { t: 'image', src: '/kcalo-assets/hero-card.webp', alt: 'The green hero card enlarged: 780 Kcal left, an eaten pill, a flame inside a yellow progress ring, and three macro bars', caption: 'One glance: what is left, how it is going.' },
    { t: 'p', x: 'The week strip above it does the calendar’s whole job in one row. A green dot means a logged day, the selected day becomes a green pill with the date in a white circle, and days without dots simply have nothing to show.' },
    { t: 'image', src: '/kcalo-assets/week-strip.webp', alt: 'The week strip enlarged: day columns with green logged dots and the selected Thursday as a green pill', caption: 'Logged days get a dot. That is the whole system.' },
    { t: 'image', src: '/kcalo-assets/home.webp', alt: 'The home screen: Today header, week strip, the green hero card and meal cards with logged food rows', caption: 'The day, one glance.' },
    { t: 'p', x: 'Meals are cards, and a logged food is a row: photo at 12px radius, name, one line of description, then a calorie chip and a macro chip. The photo earns its place because the photo is the log; seeing your own plate again is what makes the entry feel true.' },
    { t: 'image', src: '/kcalo-assets/meal-card.webp', alt: 'The breakfast meal card enlarged: header with add and edit buttons, and two food rows with photos and stat chips', caption: 'The photo is the log, so the photo stays.' },

    { t: 'h2', x: 'The five seconds' },
    { t: 'p', x: 'The scan flow is the product. A camera with corner brackets and three modes, an analyzing state that says what it is doing in three steps, and a result sheet that itemises the meal: calories, three macro cards, a health score with a sentence of reasoning in plain words, and the ingredient list with each item’s share. Fix Results takes a tap, because the model will be wrong sometimes and the design should assume it.' },
    { t: 'image', src: '/kcalo-assets/scan-flow.webp', alt: 'Three screens: the camera with scan brackets, the analyzing state with progress steps over the photo, and the itemised result sheet', caption: 'Snap, three seconds, itemised.' },
    { t: 'p', x: 'Search exists as the fallback, not the front door. Recents come first because dinner repeats, results carry local food names, and a dead-end query offers to create the food or scan it instead. The empty state is drawn, not left to chance.' },
    { t: 'image', src: '/kcalo-assets/search.webp', alt: 'Three screens: add food with recents and quick actions, live search results for chicken, and the food detail for a banana with serving chips', caption: 'The fallback, treated as a real path.' },

    { t: 'h2', x: 'A plan, not a calculator' },
    { t: 'p', x: 'Onboarding asks five things and shows its work: goal, pace on a slider with a recommendation, then a progress ring while the plan is computed, and a plan-ready screen wearing the same hero card the home screen uses. The card is the handshake; you meet it before you meet the app.' },
    { t: 'image', src: '/kcalo-assets/onboarding.webp', alt: 'Three onboarding screens: goal selection cards, the pace slider with a recommendation banner, and the plan-ready screen with the hero card', caption: 'Five questions, then the plan wearing the home card.' },
    { t: 'p', x: 'Everything stays editable afterwards. Goals are steppers and sliders rather than forms, and the paywall arrives only after the first successful scans, priced against what it just did rather than what it promises.' },
    { t: 'image', src: '/kcalo-assets/paywall-goals.webp', alt: 'Two screens: the Pro paywall with feature list and yearly and monthly price cards, and the daily goals editor with macro sliders', caption: 'The paywall comes after the value, not before.' },

    { t: 'h2', x: 'Built to be kept' },
    { t: 'p', x: 'The habit layer is three screens: progress with a week of bars and a weight trend, a streak celebration that pauses rather than resets, and water as its own small win. The reward for logging a meal is watching the ring move. Confetti is reserved for streaks, because this is dinner, not a casino.' },
    { t: 'image', src: '/kcalo-assets/habits.webp', alt: 'Three screens: progress charts, the day-12 streak celebration, and the water tracker with a glass grid', caption: 'Progress, streaks, water: small wins on one board.' },
    { t: 'p', x: 'And the edges got the same attention as the happy path. A first day with nothing logged points at the camera. Going over goal turns the card warm orange and suggests a walk, in exactly those words, because the alternative shipped in another app and produced an uninstall story. Offline says the log is safe on the phone.' },
    { t: 'image', src: '/kcalo-assets/edges.webp', alt: 'Three screens: the empty first-day home, the over-goal home with an orange hero card and a walk suggestion, and the offline state', caption: 'Empty, over, offline: drawn, not left to chance.' },

    { t: 'h2', x: 'The system underneath' },
    { t: 'p', x: 'Twenty icons drawn for the app, and eleven components with variants and swappable parts: buttons, chips, day cells, macro bars, food rows, list rows, toggles, the nav header. The thirty-one screens are assembled from these, which is why they agree with each other.' },
    { t: 'image', src: '/kcalo-assets/components.webp', alt: 'The component sheet: button styles, day cell states, macro bars, chips, toggles, food row and list row variants', caption: 'Eleven components, thirty-one screens.' },

    { t: 'h2', x: 'The brand, travelling' },
    { t: 'p', x: 'The mark is the product’s own progress ring with the flame inside, because the app already had a logo before the brand work started; it just needed extracting. The wordmark is the app’s own typeface. Nothing about the brand is a second design language.' },
    { t: 'image', src: '/kcalo-assets/brand-logo.webp', alt: 'The Kcalo mark on a green tile beside the wordmark and tagline', caption: 'The ring was already the logo.' },
    { t: 'image', src: '/kcalo-assets/poster-launch.webp', alt: 'A social poster on the green gradient: the ring mark above Snap it, Track it, with a Free on iOS button', caption: 'Snap it. Track it.' },
    { t: 'image', src: '/kcalo-assets/poster-streak.webp', alt: 'A dark social poster: a large flame over Day 12 and the line Streaks that survive wedding season', caption: 'The tone travels too: log the biriyani, keep the streak.' },
    { t: 'p', x: 'The store listing tells the loop in six frames, and the deck compresses the whole argument to ten slides. Two of them carry most of it: the insight, and the product doing it.' },
    { t: 'image', src: '/kcalo-assets/appstore-01.webp', alt: 'App Store screenshot: Snap your meal headline over the camera screen in a device frame on the green gradient', caption: 'Frame one of six: the promise.' },
    { t: 'image', src: '/kcalo-assets/appstore-05.webp', alt: 'App Store screenshot: Streaks that stick headline over the streak celebration screen', caption: 'Frame five: the reason you stay.' },
    { t: 'image', src: '/kcalo-assets/deck-insight.webp', alt: 'A dark pitch slide reading The camera is the keyboard', caption: 'The whole product in six words.' },
    { t: 'image', src: '/kcalo-assets/deck-product.webp', alt: 'A pitch slide titled One app, four jobs, with three screens in device frames', caption: 'The deck shows the real screens, not mockups of mockups.' },

    { t: 'h2', x: 'Decisions, dated' },
    { t: 'p', x: 'Eleven calls shaped the thing, each logged with its date and its evidence, from killing the tab bar to banning red mornings to keeping confetti for streaks only. The log exists so future me stops re-arguing with past me.' },
    { t: 'image', src: '/kcalo-assets/ux/decision-log.webp', alt: 'A dated decision log of eleven rows, each with the decision, its evidence and its shipped status', caption: 'Dated, so it stays settled.' },
    { t: 'p', x: 'What is left is the honest next step for any concept: put the prototype in front of Meera, Ajmal and Rukiya’s one free hand, and run the Day-5 test for real.' },
  ],
});
