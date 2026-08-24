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
    { t: 'p', x: 'It does not open on photographs. A profile is a code, F&#8209;2249, with an age, a district and a line about how the person covers, and the work of the app is helping you decide who is worth a request.' },
    { t: 'p', x: 'That decision is where the app is unusual. Under the filters any matrimonial site has (age, location, education, income, height, language) sits a second layer that a general one has no reason to build: <em>path</em> and <em>aqeedah</em> and <em>madhab</em>, how much of the Qur&rsquo;an someone has memorised in juz, the level of their tajweed, their Arabic, their view on photography of people, the courses they have finished inside the app itself. A profile is read across five tabs, and one of them is Deen.' },
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
