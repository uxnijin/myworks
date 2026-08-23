// ==========================================================================
//  Oppam. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('oppam', {
  blocks: [
    { t: 'p', x: 'A prototype build: a real iPhone app in SwiftUI, on mock data, with nothing leaving the device.' },
    {
      t: 'image',
      src: '/oppam-assets/hero.webp',
      alt: 'Five Oppam screens: the welcome, home, a therapist introduction, the journal, and the therapist console',
      caption: 'Four screens from the app, and one from the therapist&rsquo;s.',
    },

    { t: 'h2', x: 'Getting in' },
    { t: 'p', x: 'A name, the language you feel in, and one promise. No email, no password.' },
    {
      t: 'image',
      src: '/oppam-assets/onboarding.webp',
      alt: 'Five onboarding screens: welcome, a name, language, what brings you, and the privacy promise',
      caption: 'Arrival.',
    },
    { t: 'p', x: 'Home changes with the time of day. No badges, no counters, no streak to protect.' },
    {
      t: 'image',
      src: '/oppam-assets/home-times.webp',
      alt: 'The home screen at morning, afternoon, evening and night',
      caption: 'One screen, four times of day.',
    },

    { t: 'h2', x: 'Finding someone' },
    { t: 'p', x: 'You name a feeling and meet three people with reasons attached — introductions rather than listings — then read one of them in their own words.' },
    {
      t: 'image',
      src: '/oppam-assets/care.webp',
      alt: 'Care: naming a feeling, three matched introductions, and a therapist profile',
      caption: 'Care.',
    },
    { t: 'p', x: 'The bill is plain, and the last thing the booking says is that there is nothing to prepare.' },
    {
      t: 'image',
      src: '/oppam-assets/booking.webp',
      alt: 'The four booking steps - plan, time, how to meet, and the bill - then the confirmation',
      caption: 'Booking.',
    },
    { t: 'p', x: 'The room says what it does with the session, which is nothing. Afterwards you can rebook in a tap.' },
    {
      t: 'image',
      src: '/oppam-assets/session.webp',
      alt: 'The connected session room, and session history',
      caption: 'The session.',
    },

    { t: 'h2', x: 'Your own pages' },
    { t: 'p', x: 'A garden of entries, a composer whose only prompt can be switched off, and a letter you can seal for months.' },
    {
      t: 'image',
      src: '/oppam-assets/pages.webp',
      alt: 'The Pages journal, the writing composer, and the letter-to-future-self composer',
      caption: 'Pages.',
    },
    { t: 'p', x: 'Every protection explains itself, and the notification preview shows the real text a family member would see.' },
    {
      t: 'image',
      src: '/oppam-assets/privacy.webp',
      alt: 'The Face-ID door, the Privacy Room, the app-switcher cover, and the You tab',
      caption: 'The privacy room.',
    },

    { t: 'h2', x: 'The companion' },
    { t: 'p', x: 'One face, five registers, drawn live by the app rather than by hand.' },
    {
      t: 'image',
      src: '/oppam-assets/companion.webp',
      alt: 'The five companion moods, the breathing exercise, and the night companion holding a lantern',
      caption: 'The companion.',
    },
    { t: 'p', x: 'Some of it only exists in motion, so this one is a capture of it running.' },
    {
      t: 'image',
      src: '/oppam-assets/motion-breathe.gif',
      alt: 'The companion breathing - one full cycle, captured from the running app',
      caption: 'One breathing cycle.',
    },

    { t: 'h2', x: 'The therapist&rsquo;s side' },
    { t: 'p', x: 'Today leads with the live session and the note left last time. Nothing is timed, and the room records nothing here either.' },
    {
      t: 'image',
      src: '/oppam-assets/practice-day.webp',
      alt: 'The therapist console: today, incoming requests, the session room and the note composer',
      caption: 'The console.',
    },
    { t: 'p', x: 'People, not cases. A file shows a first name and only what that person chose to share.' },
    {
      t: 'image',
      src: '/oppam-assets/practice-people.webp',
      alt: 'The People list with care signals, a client file, and unfinished notes',
      caption: 'People.',
    },
    { t: 'p', x: 'Hours you open yourself, earnings with the split written out, and your listing exactly as somebody sees it at 2 AM.' },
    {
      t: 'image',
      src: '/oppam-assets/practice-work.webp',
      alt: 'Calendar, practice profile, earnings, the public listing, and supervision & support',
      caption: 'The work.',
    },

    { t: 'h2', x: 'When it goes wrong' },
    { t: 'p', x: 'Reassurance first, one calm retry second.' },
    {
      t: 'image',
      src: '/oppam-assets/edges.webp',
      alt: 'Five failure states: offline, card declined, payment dropped, call failed, and the catch-all',
      caption: 'A declined card, and a held slot.',
    },
    { t: 'p', x: 'Empty is never a dead end — the companion waits in the blank space with a line and a way forward.' },
    {
      t: 'image',
      src: '/oppam-assets/empties.webp',
      alt: 'The offline ribbon and four empty states',
      caption: 'Empty states.',
    },

    { t: 'h2', x: 'Dark' },
    { t: 'p', x: 'Warm, never cold grey. A design system is only real once the error states hold in both.' },
    {
      t: 'image',
      src: '/oppam-assets/dark.webp',
      alt: 'Five screens in lamplight: night home, care, a therapist, pages and the privacy room',
      caption: 'The night veranda.',
    },
    {
      t: 'image',
      src: '/oppam-assets/dark-practice.webp',
      alt: 'The therapist console, a client file, the session room, a confirmed booking and an error state in dark mode',
      caption: 'And the console.',
    },
  ],
});
