// ============================================================================
//  Kcalo: a concept calorie tracker, designed end to end.
//
//  Assets: kcalo-assets/ — bezel-mockup exports (screens inside the device
//  frame on a grey surface), element zooms, posters, deck slides, App Store
//  frames, six motion clips (MP4 loops exported from Figma motion) and the
//  process boards in kcalo-assets/ux/. The hand photos come from the Plate
//  design entry, which is the same home screen this study grew out of.
// ============================================================================

BODY('kcalo', {
  blocks: [
    { t: 'p', x: 'This one has no client and no users, and says so up front. The brief was mine: take one sharp idea and carry it the whole distance a real product goes. Research, flows, wireframes, a token system, a component library, thirty-one screens with their empty and error states, motion, a brand, six posters, an App Store listing and a ten-slide pitch. One Figma file.' },
    { t: 'p', x: 'It started as a single screen: a design entry on this site called <em>Plate</em>, one day of eating on one page. This study is that screen carried the whole distance, and it kept the test the screen was built for. Everyone has installed a calorie tracker; nobody still uses one. The apps work. The logging is what dies. And the same people who will not type a meal photograph their meals constantly. The behaviour already exists. Kcalo reroutes it.' },
    { t: 'image', src: '/plate-assets/top.webp', alt: 'The Kcalo home screen in a device frame: Today header, week strip, the green hero card and meal cards', caption: 'The screen it grew from.' },
    { t: 'button', href: 'https://www.figma.com/design/izblJrOLpLaz3KAcyICKZa/Kcalo-Health-App?node-id=23-40', label: 'Open the full Figma file' },

    { t: 'h2', x: 'The homework' },
    { t: 'p', x: 'The plan asked three questions and named the bar: does anyone still log on day five? Six interviews, a dietitian, a two-week diary study where four people re-tried their old trackers, 180 store reviews tagged, and thirty real mixed Kerala plates photographed to see if a photo can even be itemised by eye.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-plan.webp', alt: 'The research plan board: three research questions as cards and the method with its counts', caption: 'Three questions, and the Day-5 test as the bar.' },
    { t: 'p', x: 'The interviews kept landing the same two blows: effort and shame. Nobody quit over a bad calorie day. And the thread that became the product came from three people describing the same interface without knowing it — a nurse photographing dinner for his wife, a mother photographing the pot, a dietitian estimating calories from client photos on WhatsApp all day.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-voices.webp', alt: 'Six quote cards from participants and a dietitian, with the connecting thread underneath', caption: 'The blunt quotes drive the decisions.' },

    { t: 'h2', x: 'Who it has to survive' },
    { t: 'image', src: '/kcalo-assets/ux/v2-empathy.webp', alt: 'A four-quadrant empathy map for Meera: says, thinks, does, feels', caption: 'Meera quits at the first untrackable meal, not the first bad number.' },
    { t: 'p', x: 'Three personas share the screens, and the third is the stress test. Rukiya cooks one pot for four people with one free hand and owns no food scale. Every flow got asked her question first: one hand, twenty seconds, no scale?' },
    { t: 'image', src: '/kcalo-assets/ux/v2-personas.webp', alt: 'Three persona cards: Meera, Ajmal and Rukiya, with Rukiya marked as the stress test', caption: 'All three must succeed on the same screens.' },

    { t: 'h2', x: 'The control condition is a person' },
    { t: 'p', x: 'The scan put the usual apps in columns and a dietitian on WhatsApp as the control. She wins on everything except price and scale, because she takes photos, estimates by eye and answers with mercy. So Kcalo is not a better database. It is her eye and her tone, productised.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-competitive.webp', alt: 'A comparison table of trackers with a dietitian as the final column, winning most rows', caption: 'The last column wins on everything but price.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-journey.webp', alt: 'A line chart of the week that kills a food diary, ending with a recovered dot labelled with Kcalo', caption: 'Install-night hero to day-four uninstall — and the same person through a photo.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-insights.webp', alt: 'Five numbered insight rows, each with its evidence', caption: 'Five insights survived the so-what test.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-principles.webp', alt: 'Four principle tiles: the camera is the keyboard, kind numbers, made for the mixed plate, bends does not break', caption: 'The insights, turned into filters every screen passes.' },

    { t: 'h2', x: 'Structure before pixels' },
    { t: 'p', x: 'The architecture made one structural bet and it shows in the sitemap: no tab bar. A Diary tab makes logging a place you must go, and logging is a moment, not a place. One hub, one loop, every branch one tap from Home, and every edge state a drawn screen rather than a footnote.' },
    { t: 'image', src: '/kcalo-assets/ux/ia.webp', alt: 'The information architecture: a rejected four-tab skeleton crossed out in red, then the shipped hub-and-branches sitemap', caption: 'The tab bar died before any screen was drawn.' },
    { t: 'p', x: 'The flows cover the whole app in five rows: first run to a plan, the camera loop with its failure exits, the search fallback, progress and habits, and goals with the paywall. The honesty rule from Nisf carried over: every branch ends at a screen that exists.' },
    { t: 'image', src: '/kcalo-assets/ux/flows.webp', alt: 'Five rows of user flows in green flowchart shapes with decisions and labelled connectors', caption: 'Every exit accounted for, including offline.' },
    { t: 'p', x: 'And the wireframes settle the layout fights cheaply: grey blocks, one green primary action per screen, six key screens from home to plan-ready.' },
    { t: 'image', src: '/kcalo-assets/ux/wireframes-v2.webp', alt: 'Six phone wireframes in grey blocks with green primary actions', caption: 'Green marks the one primary action. Everything else earns its grey.' },

    { t: 'h2', x: 'Where drawing starts' },
    { t: 'p', x: 'One family everywhere: SF Pro Rounded. The app is mostly numbers, and rounded numerals read as friendly where a grotesque reads as a lab report. One green with a job, three macro colours locked to their own bars, and yellow reserved for the flame ring alone.' },
    { t: 'image', src: '/kcalo-assets/tokens-type.webp', alt: 'The type specimen: SF Pro Rounded and the scale from hero numbers to captions', caption: 'Bold for numbers, Semibold for labels. That is the hierarchy.' },
    { t: 'image', src: '/kcalo-assets/tokens-colour.webp', alt: 'Eight colour swatch cards with hex values and usage rules', caption: 'Every colour with its one job written on the card.' },

    { t: 'h2', x: 'The card the app hangs off' },
    { t: 'p', x: 'The hero card answers the only question that matters at a glance: how much is left today. And on open, it earns the glance — the card settles in, the ring draws itself to where the day stands, and the macro bars fill in turn. The motion is the state, animated; nothing moves that does not mean something.' },
    { t: 'video', loop: true, src: '/kcalo-assets/motion-hero.mp4', caption: 'The load-in: ring draws, bars fill, pill settles. Built with Figma motion keyframes.' },
    { t: 'image', src: '/kcalo-assets/hero-card.webp', alt: 'The green hero card enlarged: calories left, the eaten pill, the flame ring and three macro bars', caption: 'One glance: what is left, how it is going.' },
    { t: 'image', src: '/kcalo-assets/week-strip.webp', alt: 'The week strip enlarged: logged dots and the selected day as a green pill', caption: 'A dot per logged day. That is the whole calendar.' },
    { t: 'image', src: '/kcalo-assets/home.webp', alt: 'The home screen in a device frame', caption: 'The day, one glance.' },
    { t: 'image', src: '/kcalo-assets/meal-card.webp', alt: 'The breakfast meal card enlarged with photo rows and stat chips', caption: 'The photo is the log, so the photo stays.' },

    { t: 'h2', x: 'The five seconds' },
    { t: 'p', x: 'The scan flow is the product: camera, a three-second analyzing state that says what it is doing, and an itemised result. The result arrives as a sheet over the day — the transition below is the actual motion spec, not an illustration of it.' },
    { t: 'image', src: '/kcalo-assets/scan-flow.webp', alt: 'Three device frames: the camera, the analyzing state and the itemised result', caption: 'Snap, three seconds, itemised.' },
    { t: 'video', loop: true, src: '/kcalo-assets/motion-sheet.mp4', caption: 'Result arrives as a sheet over the day. The scrim is the only ceremony.' },
    { t: 'image', src: '/kcalo-assets/zoom-macros.webp', alt: 'The three macro cards from the result sheet, enlarged', caption: 'Three cards, three colours, no legend needed.' },
    { t: 'video', loop: true, src: '/kcalo-assets/motion-scan.mp4', caption: 'The analyzing state: the spinner works, the checklist reports.' },
    { t: 'image', src: '/kcalo-assets/search.webp', alt: 'Three device frames: add food, search results and the food detail', caption: 'Search stays a real path — recents first, dead ends offer a way out.' },

    { t: 'h2', x: 'A plan, not a calculator' },
    { t: 'image', src: '/kcalo-assets/onboarding.webp', alt: 'Three device frames: goal selection, the pace slider and the plan-ready screen', caption: 'Five questions, then the plan wearing the home card.' },
    { t: 'image', src: '/kcalo-assets/zoom-pace.webp', alt: 'The pace slider card enlarged with the recommended half-kilo setting', caption: 'The wedding-proof slider: slower is easier to keep.' },
    { t: 'image', src: '/kcalo-assets/paywall-goals.webp', alt: 'Two device frames: the Pro paywall and the daily goals editor', caption: 'The paywall comes after the value, not before.' },

    { t: 'h2', x: 'Built to be kept' },
    { t: 'p', x: 'The habit layer works because it is merciful. Streaks pause instead of resetting, going over goal turns the card warm orange with a walk suggestion, and the reward for logging is the ring moving. Confetti is reserved for streak milestones, because this is dinner, not a casino.' },
    { t: 'video', loop: true, src: '/kcalo-assets/motion-streak.mp4', caption: 'Day 12: the ring pops, the week checks in one by one.' },
    { t: 'image', src: '/kcalo-assets/habits.webp', alt: 'Three device frames: progress charts, the streak celebration and the water tracker', caption: 'Progress, streaks, water — small wins on one board.' },
    { t: 'image', src: '/kcalo-assets/edges.webp', alt: 'Three device frames: the empty first day, the orange over-goal state and offline', caption: 'Empty, over, offline: drawn, not left to chance.' },

    { t: 'h2', x: 'The small movements' },
    { t: 'p', x: 'Micro-interactions were built as real Figma motion, keyframe by keyframe, and exported straight from the file. A toggle that overshoots a little. A button that gives under the thumb and ripples once. Small enough to miss, which is the point.' },
    { t: 'video', loop: true, src: '/kcalo-assets/motion-toggle.mp4', caption: 'The toggle: knob stretches, settles with a slight overshoot.' },
    { t: 'video', loop: true, src: '/kcalo-assets/motion-button.mp4', caption: 'The press: 6% give, one quiet ripple.' },
    { t: 'image', src: '/kcalo-assets/zoom-controls.webp', alt: 'Enlarged controls: day cells, the macro bars on green, a toggle, a stat chip and the primary button', caption: 'The controls, at reading distance.' },
    { t: 'image', src: '/kcalo-assets/zoom-ring.webp', alt: 'The flame progress ring enlarged on a green circle', caption: 'The ring: yellow arc on a quiet track, flame at home.' },

    { t: 'h2', x: 'The system underneath' },
    { t: 'image', src: '/kcalo-assets/components.webp', alt: 'The component sheet: buttons, day cells, macro bars, chips, toggles and rows', caption: 'Eleven components, thirty-one screens.' },
    { t: 'image', src: '/kcalo-assets/mockups.webp', alt: 'Three screens in device bezels: home, the scan result and the streak', caption: 'The same file renders its own mockups.' },

    { t: 'h2', x: 'The brand, travelling' },
    { t: 'p', x: 'The mark is the product’s own progress ring with the flame inside; the brand work extracted it rather than inventing it. Four logo variants, the icon set, and six posters in three voices: launch, product, and the kind one about the sadya.' },
    { t: 'image', src: '/kcalo-assets/brand-system.webp', alt: 'Logo variants and the twenty-icon set on tiles', caption: 'Four marks, twenty icons, one hand.' },
    { t: 'hscroll', label: 'Six social posters', items: [
      { src: '/kcalo-assets/poster-launch.webp', alt: 'Launch poster: Snap it, Track it on the green gradient' },
      { src: '/kcalo-assets/poster-product.webp', alt: 'Product poster: Know what you ate in five seconds, with the hero card' },
      { src: '/kcalo-assets/poster-streak.webp', alt: 'Dark streak poster: Day 12, streaks that survive wedding season' },
      { src: '/kcalo-assets/posters-3.webp', alt: 'Three more posters: Know your numbers, One photo Logged, and Log the sadya' },
      { src: '/kcalo-assets/posters-2.webp', alt: 'The streak poster in dark and light variants' },
    ] },
    { t: 'p', x: 'The store listing tells the loop in six frames — scroll through them, tap to zoom — and the deck compresses the whole argument into ten slides.' },
    { t: 'hscroll', label: 'App Store screenshots', items: [
      { src: '/kcalo-assets/appstore-01.webp', alt: 'App Store frame 1: Snap your meal' },
      { src: '/kcalo-assets/appstore-02.webp', alt: 'App Store frame 2: Counted in seconds' },
      { src: '/kcalo-assets/appstore-03.webp', alt: 'App Store frame 3: Your day, one glance' },
      { src: '/kcalo-assets/appstore-04.webp', alt: 'App Store frame 4: Watch it trend' },
      { src: '/kcalo-assets/appstore-05.webp', alt: 'App Store frame 5: Streaks that stick' },
      { src: '/kcalo-assets/appstore-06.webp', alt: 'App Store frame 6: A plan built for you' },
    ] },
    { t: 'hscroll', label: 'The ten-slide pitch deck', items: [
      { src: '/kcalo-assets/deck-01.webp', alt: 'Deck slide 1: cover' },
      { src: '/kcalo-assets/deck-02.webp', alt: 'Deck slide 2: tracking works, nobody lasts' },
      { src: '/kcalo-assets/deck-03.webp', alt: 'Deck slide 3: the camera is the keyboard' },
      { src: '/kcalo-assets/deck-04.webp', alt: 'Deck slide 4: one app, four jobs' },
      { src: '/kcalo-assets/deck-05.webp', alt: 'Deck slide 5: five seconds start to logged' },
      { src: '/kcalo-assets/deck-06.webp', alt: 'Deck slide 6: a plan, not a calculator' },
      { src: '/kcalo-assets/deck-07.webp', alt: 'Deck slide 7: built to be kept' },
      { src: '/kcalo-assets/deck-08.webp', alt: 'Deck slide 8: one system under every screen' },
      { src: '/kcalo-assets/deck-09.webp', alt: 'Deck slide 9: the brand travels' },
      { src: '/kcalo-assets/deck-10.webp', alt: 'Deck slide 10: free on iOS this autumn' },
    ] },

    { t: 'h2', x: 'Decisions, dated' },
    { t: 'p', x: 'Every call that shaped the thing sits in a dated log with its evidence, from killing the tab bar to banning red mornings. The honest next step for any concept closes it: put the prototype in front of Meera, Ajmal and Rukiya’s one free hand, and run the Day-5 test for real.' },
    { t: 'image', src: '/kcalo-assets/ux/v2-decisions.webp', alt: 'A dated decision log board with nine rows, each shipped', caption: 'Dated, so it stays settled.' },
    { t: 'button', href: 'https://www.figma.com/design/izblJrOLpLaz3KAcyICKZa/Kcalo-Health-App?node-id=23-40', label: 'Explore everything in the Figma file' },
  ],
});
