// ==========================================================================
//  Oppam. A case study.
//
//  Figures: oppam-assets/*.webp, supplied slides through prep_figures.py.
//  Individual captures and the capture scripts live in oppam-assets/screens.
//
//  Research is cited, not invented: NMHS 2015-16 for the treatment gap and
//  the Kerala psychiatrist count, the live oppam.me site for what the service
//  offers today, and the published reach numbers for the category.
// ==========================================================================

BODY('oppam', {
  blocks: [
    { t: 'p', x: 'This is a long one, so here is its shape. Why people in Kerala do not come. What the apps in this category already do, and where they stop. What Oppam has today, which is a website. Then the app I designed for it, screen by screen, and the reasons behind each part of it.' },
    { t: 'image', src: '/oppam-assets/brand.webp', alt: 'The Oppam wordmark with its smiling mark, beside the app home screen', caption: 'ഒപ്പം. It means beside you.' },

    { t: 'h2', x: 'Kerala, and the walk to the door' },
    { t: 'p', x: 'Kerala has more psychiatrists per person than any other state in India. About 1.2 for every 100,000 people, where the country as a whole manages 0.75.' },
    { t: 'p', x: 'The National Mental Health Survey still puts the treatment gap at 84.5 percent. The best served state in the country, and most people who need help are not getting any.' },
    {
      t: 'stats',
      items: [
        { v: '84.5%', l: 'of people with a mental health condition in India get no treatment (NMHS 2015-16)' },
        { v: '1.2', l: 'psychiatrists per 100,000 in Kerala, the highest of any state. India averages 0.75' },
        { v: '0', l: 'accounts this app asks you to create' },
      ],
    },
    { t: 'p', x: 'So the wall is not a shortage of therapists. The wall is the walk to the door.' },
    { t: 'p', x: 'What stops people here is quieter than a waiting list. Therapy is whispered about. A clinic is a building other people can watch you walk into. Phones get shared with a sibling or a parent. And nobody knows what actually happens in a first session, so the imagination fills it in with something worse than the truth.' },
    { t: 'p', x: 'I should say plainly what this is built on. <strong>There are no user interviews behind it.</strong> It is the National Mental Health Survey and the Kerala paper drawn from it, published work on shared phones in Indian homes, a read of the live oppam.me service, and a walk through every competing app from first open to booking, marking each place I hesitated and why. The people I kept in mind while deciding are archetypes from that reading, not people I sat with. If there were a budget I would replace them in the first week.' },

    { t: 'h2', x: 'What the apps in this category already do' },
    { t: 'p', x: 'The category is neither empty nor bad. Wysa has reached eleven million lives across a hundred and five countries. Amaha has served four and a half million users. YourDOST puts counsellors on text, audio and video. These are real products with real reach.' },
    { t: 'p', x: 'They are also open about their hardest problem, which is that people leave. Retention is the known weak point of the whole category. Language is the other one. An app that only speaks English is asking somebody to describe their worst week in their second language.' },
    { t: 'p', x: 'But look at where they all begin. They begin at the booking, or at a chatbot. The ten minutes <em>before</em> a person decides to ask for help is nobody&rsquo;s screen.' },
    { t: 'p', x: 'That is the gap this app is built into.' },

    { t: 'h2', x: 'What Oppam has today' },
    { t: 'p', x: 'Oppam is Kerala&rsquo;s first 24/7 online counselling platform. Its site counts more than 50,000 therapy hours. It runs individual, couple and follow-up sessions, plus corporate and campus programmes, out of Kozhikode. It names the things people arrive with: anxiety, stress, depression, trauma, grief, anger, work burnout, parenting, queer-affirmative concerns.' },
    { t: 'p', x: 'The service is real and it works. The website is where it gets hard.' },
    { t: 'p', x: 'Open that homepage as a nervous person and see what you cannot find. Not the price. Not who the therapists are. Not a first step to booking. What you can find is a phone number.' },
    { t: 'p', x: 'For this particular person, a phone call is the tallest step in the whole journey. The website asks them to take it first.' },

    { t: 'h2', x: 'What an app can do that a page cannot' },
    { t: 'p', x: 'An app can be opened without being seen. It can lock a journal behind Face ID, cover itself with a sunrise in the app switcher, and send a notification that gives nothing away. A web page in a browser somebody else borrows can do none of that.' },
    { t: 'p', x: 'It can also carry a price on every card, introduce a person in their own recorded voice, and let you look at everything without being asked who you are.' },
    { t: 'p', x: 'So the app is not the website with a tab bar bolted on. It is the part of the service a website cannot hold.' },

    { t: 'h2', x: 'The sentence everything was tested against' },
    {
      t: 'quote',
      x: 'Oppam is not a therapy app. It is the feeling of someone quietly coming to sit beside you, and its real job is the moment before somebody asks for help, not the transaction afterwards.',
      by: 'The one line every decision had to survive',
    },
    { t: 'p', x: 'Four rules came out of that, and between them they settled most of the arguments.' },
    {
      t: 'cards',
      items: [
        { icon: 'sun', title: 'Trust before identity', desc: 'Nothing is asked before trust is earned. No account, no email. A first name, and even that is optional.' },
        { icon: 'layers', title: 'One loud action', desc: 'Exactly one thing on a screen may raise its voice. Everything else is an invitation you are free to ignore.' },
        { icon: 'droplet', title: 'Visible, not promised', desc: 'If you cannot watch a protection working, it is not a feature. Every toggle shows what it actually does.' },
        { icon: 'moon', title: 'Presence, not performance', desc: 'The companion never gamifies, never guilt-trips, never speaks first, and never pretends to be a therapist.' },
      ],
    },

    { t: 'h2', x: 'The first minutes' },
    { t: 'p', x: 'A sign-up wall feels like registering an illness, so there is not one. The app asks what to call you, and accepts any answer, including none.' },
    { t: 'image', src: '/oppam-assets/first-minutes.webp', alt: 'The opening screens: the welcome, the what should I call you question, and the language chooser', caption: 'A name, and a language.' },
    { t: 'p', x: 'The language question is not a settings toggle here, and it is not only about labels. Feelings do not translate well. Malayalam, English or Manglish switches the lines that carry weight, not the chrome.' },
    { t: 'p', x: 'Then it asks, gently, whether anything is sitting with you lately. Every answer is optional and one of them is <em>nothing right now</em>. It ends on a promise rather than a permission request.' },
    { t: 'image', src: '/oppam-assets/promise.webp', alt: 'Two onboarding screens: is anything sitting with you lately, and before we begin, one promise', caption: 'Nothing is compulsory, including answering.' },

    { t: 'h2', x: 'Home is a veranda, not a dashboard' },
    { t: 'p', x: 'A dashboard asks you to manage something. A veranda is a place you can sit without a reason, which is closer to what this app is for.' },
    { t: 'image', src: '/oppam-assets/home.webp', alt: 'The Oppam home screen with a sky, the companion, a greeting and the next session card', caption: 'Home, in the morning.' },
    { t: 'p', x: 'The sky and the companion follow the hour, so the app feels like it is in the same day you are. After nine at night the companion sleeps and holds a lantern.' },
    { t: 'image', src: '/oppam-assets/home-times.webp', alt: 'The same home screen at morning, afternoon, evening and night, the sky and companion changing with each', caption: 'One screen, four times of day.' },
    { t: 'p', x: 'The check-in asks for weather, not symptoms. <em>Is my problem big enough</em> is one of the questions that keeps people out, and a symptom checklist answers it badly. Weather has no threshold to clear.' },
    { t: 'p', x: 'Small wins collect underneath, and they only ever grow. Nothing here can go down, because a number that falls is a reason to stop opening an app.' },
    { t: 'image', src: '/oppam-assets/home-detail.webp', alt: 'The quiet moment card and the small wins list on the home screen', caption: 'A quiet moment, and things that went right.' },
    { t: 'p', x: 'The quiet moment is a two minute breath on a 4-2-6 count. It is the one thing in the app you can finish.' },
    { t: 'image', src: '/oppam-assets/breathe.webp', alt: 'The breathing screen with the companion and the words breathe in with me', caption: 'Two minutes, and no account needed.' },
    { t: 'p', x: 'Most of this part only exists in motion, so this one is the app running rather than a screenshot of it.' },
    { t: 'image', src: '/oppam-assets/motion-breathe.gif', alt: 'One full breathing cycle animating, captured frame by frame from the simulator', caption: 'One cycle, in and out.' },

    { t: 'h2', x: 'Finding a person' },
    { t: 'p', x: 'A directory asks the hardest question first: evaluate a screen full of strangers and choose correctly, while anxious. So Care starts from a feeling instead.' },
    { t: 'image', src: '/oppam-assets/care-feelings.webp', alt: 'The Care screen listing feelings such as anxiety and worry, relationship issues, grief and loss', caption: 'Start with what is going on, not with a list of people.' },
    { t: 'p', x: 'Then it brings three people forward and says why each of them. Three is a number you can actually decide between. The full list is one tap deeper for anyone who wants it.' },
    { t: 'image', src: '/oppam-assets/care-matches.webp', alt: 'Three matched therapists with the reason each was suggested, and a therapist profile', caption: 'Introductions, not listings.' },
    { t: 'p', x: 'Every therapist answers the same question in their own recorded voice: what your first session is honestly like. The unknown first session is the tallest wall in this whole thing, and a voice gets over it in a way a paragraph does not.' },
    { t: 'image', src: '/oppam-assets/therapist.webp', alt: 'A therapist profile with a voice introduction player, credentials, and tags such as gentle listener and comfort with silence', caption: 'Her voice, before your money.' },
    { t: 'p', x: 'The price is on the card. Per session, always, no packages. Cost opacity is its own barrier, and the answer to it is a number you can see before you are invested.' },
    { t: 'image', src: '/oppam-assets/booking-rhythm.webp', alt: 'The booking screens: choosing a rhythm with prices per session, and picking a time', caption: 'A rhythm, a time, a price you already know.' },
    { t: 'image', src: '/oppam-assets/booking-review.webp', alt: 'The booking review screen and the confirmation', caption: 'Four steps, no forms.' },
    { t: 'p', x: 'The confirmation ends on the thing people are actually anxious about, which is not the calendar entry.' },
    { t: 'image', src: '/oppam-assets/booked.webp', alt: 'The you are booked screen reading nothing to prepare, come exactly as you are', caption: '&ldquo;Nothing to prepare. Come exactly as you are.&rdquo;' },
    { t: 'p', x: 'The room itself says what it does with the session, which is nothing. Video, voice or chat, and camera off is a normal choice rather than a failure.' },
    { t: 'image', src: '/oppam-assets/live.webp', alt: 'The live session screen with the therapist and an end call button', caption: 'The session.' },

    { t: 'h2', x: 'Pages, which nobody else sees' },
    { t: 'p', x: 'Writing is the cheapest first step there is, and it does not need a therapist or a payment. Pages is a journal with the prompt turned off by default, because a prompt is a small exam.' },
    { t: 'image', src: '/oppam-assets/pages.webp', alt: 'The Pages screen with the garden of small wins and the note that these pages are only yours', caption: 'Pages.' },
    { t: 'p', x: 'Letters can be sealed until a date you pick, which turns writing into something you do for a version of yourself that does not exist yet.' },
    { t: 'image', src: '/oppam-assets/letters.webp', alt: 'Writing a page, and a letter being sealed for a future date', caption: 'A page, and a letter to later.' },

    { t: 'h2', x: 'Privacy you can watch working' },
    { t: 'p', x: 'A privacy policy is a promise. A shared phone needs proof. So every protection in here is something you can see doing its job.' },
    { t: 'image', src: '/oppam-assets/you.webp', alt: 'The You tab with the language of the heart switcher and the privacy room', caption: 'The You tab is deliberately small.' },
    { t: 'p', x: 'Face ID on the journal door. A sunrise that covers the app in the switcher. Notifications that show you the exact text somebody else would see on your lock screen. One tap turns Pages into a grocery list.' },
    { t: 'image', src: '/oppam-assets/privacy.webp', alt: 'The privacy room with a lock on the journal, neutral notifications with a live preview, and quiet hours', caption: 'Each one shows what it actually does.' },

    { t: 'h2', x: 'The companion' },
    { t: 'p', x: 'The mark in the logo is a smile, and the companion is that smile alive. It is drawn as animated geometry rather than an image, so it can breathe, blink, and sit one register softer than whatever you are feeling.' },
    { t: 'p', x: 'It never mirrors distress and never celebrates louder than you do. It never speaks first. When it does speak, the words are set in a serif, like a letter rather than a chat bubble.' },
    { t: 'image', src: '/oppam-assets/moods.webp', alt: 'The five companion registers: peaceful, listening, happy, comforting and sleeping', caption: 'Five registers, one face.' },

    { t: 'h2', x: 'The other half, which is the therapist' },
    { t: 'p', x: 'A marketplace that designs only the buyer&rsquo;s side quietly decides that the supply side does not matter. Therapists are the supply here, and burnt out therapists are how a service like this fails. So the console is built too.' },
    { t: 'image', src: '/oppam-assets/console-today.webp', alt: 'The therapist console today screen with the live session and the client who has arrived', caption: 'Today, for the therapist.' },
    { t: 'p', x: 'People rather than cases. A file shows a first name and only what that person chose to share, including the words they typed on day one.' },
    { t: 'image', src: '/oppam-assets/console-week.webp', alt: 'The console today, people and calendar screens', caption: 'The week, and the people in it.' },
    { t: 'p', x: 'Hours are opened by the therapist, not assigned to them. Earnings show the split written out rather than a net figure that needs trusting.' },
    { t: 'image', src: '/oppam-assets/console-practice.webp', alt: 'The practice screen with earnings and the hours the therapist has opened', caption: 'The practice.' },
    { t: 'p', x: 'Notes are written the way you would say it to a colleague you trust, and an unfinished note is not a backlog with a badge on it.' },
    { t: 'image', src: '/oppam-assets/console-notes.webp', alt: 'Session notes and the unfinished notes list', caption: 'Notes.' },
    { t: 'image', src: '/oppam-assets/console-earnings.webp', alt: 'The earnings screen with the split written out and the payout history', caption: 'Earnings, with the split shown.' },
    { t: 'p', x: 'And the part nobody puts in a marketplace: an on-call clinical lead, peer supervision, and an escalation protocol that says what to do when somebody is not safe.' },
    { t: 'image', src: '/oppam-assets/console-support.webp', alt: 'The support screen with an on-call clinical lead, peer supervision and the escalation protocol', caption: 'Nobody holds this alone.' },

    { t: 'h2', x: 'The bad days are designed too' },
    { t: 'p', x: 'Anything that only works when the network does is a prototype. These are the screens the app spends its worst minutes on.' },
    { t: 'image', src: '/oppam-assets/offline.webp', alt: 'The offline ribbon sliding in under the status bar with an explanation screen', caption: 'Offline says so, quietly.' },
    { t: 'image', src: '/oppam-assets/errors.webp', alt: 'Three error states: cannot load right now, the payment did not go through, the connection dropped', caption: 'Reassurance first, one calm retry second.' },
    { t: 'p', x: 'An empty screen is never a dead end. The companion waits in the blank space with a line and a way forward.' },
    { t: 'image', src: '/oppam-assets/empty-booked.webp', alt: 'The nothing booked yet empty state with a find someone button', caption: 'Empty, with a way out of it.' },
    { t: 'image', src: '/oppam-assets/offline-states.webp', alt: 'More states: offline, no sessions yet, and cannot reach the call', caption: 'And the rest of them.' },
    { t: 'image', src: '/oppam-assets/sideways.webp', alt: 'The something went sideways error screen', caption: 'Even this one is written like a person.' },

    { t: 'h2', x: 'Lamplight' },
    { t: 'p', x: 'Dark mode here is not a grey inversion. It is lamplight: warm browns and amber, because this app gets opened late at night by people who are not having a good one, and cold grey at 2 AM is a worse room to sit in.' },
    { t: 'image', src: '/oppam-assets/dark-home.webp', alt: 'The home screen in dark mode with a warm night sky', caption: 'The night veranda.' },
    { t: 'image', src: '/oppam-assets/dark-care.webp', alt: 'Home, Care and a therapist profile in dark mode', caption: 'Care, after dark.' },
    { t: 'image', src: '/oppam-assets/dark-pages.webp', alt: 'Pages, You and the privacy room in dark mode', caption: 'Pages and the privacy room.' },
    { t: 'image', src: '/oppam-assets/dark-breathe.webp', alt: 'The breathing screen and the morning home screen in dark mode', caption: 'A design system is only real once the quiet screens hold.' },

    { t: 'h2', x: 'What this is, and what it is not' },
    { t: 'p', x: 'It is a running SwiftUI app on iOS 18, with the data on the device and nothing in a cloud. Every figure above is a capture of it, taken by launch argument so the same screen comes back the same way each time.' },
    { t: 'image', src: '/oppam-assets/in-hand.webp', alt: 'The Oppam app running on a phone held in one hand', caption: 'On a real phone.' },
    { t: 'p', x: 'What it is not is validated. The archetypes are mine, the priorities are mine, and no part of this has met a person who came looking for help. That is the honest limit of a self-initiated project, and it is the first thing I would fix.' },
    { t: 'p', x: 'Deliberately left for later: the home screen widget, a live activity for the session countdown, Apple sign in, and a night companion that knows how badly you slept. The first of those is a weekend. The last one needs a conversation about health data that this prototype has not earned yet.' },
  ],
});
