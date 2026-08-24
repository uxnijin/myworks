// ============================================================================
//  Nisf — a redesign, in progress.
//
//  Screens: nisf-assets/screens (31 captures of the app as it ships today;
//  the My Information screen is left out, it carries a real email and phone
//  number). They run as a full-bleed moving band — the `screens` block.
//
//  This is the opening only. The study itself goes underneath.
// ============================================================================

BODY('nisf', {
  blocks: [
    { t: 'p', x: 'Nisf is a matrimonial app for practising Muslims. It is live, it has a real user base across Kerala, and this is a redesign of it.' },
    { t: 'p', x: 'It does not open on photographs. A profile is a code — F&#8209;2249 — with an age, a district and a line about how the person covers, and the work of the app is helping you decide who is worth a request.' },
    { t: 'p', x: 'That decision is where the app is unusual. Under the filters any matrimonial site has — age, location, education, income, height, language — sits a second layer that a general one has no reason to build: <em>path</em> and <em>aqeedah</em> and <em>madhab</em>, how much of the Qur&rsquo;an someone has memorised in juz, the level of their tajweed, their Arabic, their view on photography of people, the courses they have finished inside the app itself. A profile is read across five tabs, and one of them is Deen.' },
    { t: 'p', x: 'Around that sits the machinery: a wali&rsquo;s verification as a status you can see before you write, requests that live in four states, and a purchase wall somewhere in between.' },
    { t: 'p', x: 'Every screen below is the app as it ships today. It is the thing being redesigned, not the redesign.' },
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

    { t: 'h2', x: 'Where it starts' },
    { t: 'p', x: 'Before a single screen gets redrawn: the two things every screen is made out of.' },
    { t: 'image', src: '/nisf-assets/tokens-type.webp', alt: 'The Onest typeface — the name set large, the character set, five weights from Light to Bold, and a display, title and body scale', caption: 'Onest.' },
    { t: 'p', x: 'One primary, <strong>#65558F</strong>, and the tones it makes. A palette grown from a single colour holds together as it spreads across surfaces, chips and states — and the app already lives on a near-white surface, so the tones do the separating instead of borders.' },
    { t: 'image', src: '/nisf-assets/tokens-colour.webp', alt: 'The colour token sheet: the primary #65558F large, beside its tonal steps from 95 down to 20, with the surface and ink', caption: 'One colour, and its tones.' },

    { t: 'h2', x: 'The navigation' },
    { t: 'p', x: 'The old bar was Material&rsquo;s own: five tabs, a pill sliding in under the active one, Android&rsquo;s shape worn on both platforms. This one is the shape the two platforms already agree on — an icon, a label under it, and colour doing the work of saying where you are.' },
    { t: 'p', x: 'Five tabs became four. Courses and Coaching were the same intent wearing two names, so they are one tab now, called Learn.' },
    { t: 'p', x: 'The icons are drawn for this app rather than lifted from a set, so their weight and their corners match everything else in it.' },
    { t: 'image', src: '/nisf-assets/navbar.webp', alt: 'The redesigned bottom navigation: Home, Requests, Learn and Profile, with custom filled icons and the active tab in purple', caption: 'Home, Requests, Learn, Profile.' },

    { t: 'p', x: 'The study goes under here.' },
  ],
});
