// ==========================================================================
//  Ember. A design entry — the screens, and a little about them. Prose stays
//  short on purpose.
//
//  Figures: ember-assets/ — run every supplied image through
//  tools/prep_figures.py first, which is what keeps a 16:9 figure near 100KB.
// ==========================================================================

BODY('ember', {
  blocks: [
    { t: 'p', x: 'A design rather than a build: these are the screens as drawn, not captures of a running app.' },
    { t: 'p', x: 'Three screens carry the whole app: the list you open it for, the form that makes a habit, and the habit itself.' },
    {
      t: 'image',
      src: '/ember-assets/hero.webp',
      alt: 'Three Ember screens: the habit list, the new habit form, and a habit with its streak and calendar',
      caption: 'The list, the setup, the habit.',
    },
    { t: 'p', x: 'A row is a habit, how often it is due, and the streak. Nothing else. The streak is the only number that has to be readable at a glance.' },
    {
      t: 'image',
      src: '/ember-assets/list.webp',
      alt: 'The habit list filtered to the Education category, four habits each with a flame streak count',
      caption: 'The list, filtered to one category.',
    },
    { t: 'p', x: 'Categories sit above the list as chips, so narrowing it down never means leaving the screen you were reading.' },
    { t: 'p', x: 'Making a habit is one scroll: a name, a category, a colour, the days it repeats, how many times a day, a reminder, a goal. Create stays out of reach until it has a name.' },
    {
      t: 'image',
      src: '/ember-assets/new-habit.webp',
      alt: 'The new habit form: icon, name, category, colour, repeat days, frequency, reminder and streak goal',
      caption: 'New habit.',
    },
    { t: 'p', x: 'The habit opens on its streak in a ring, then the months behind it, then the days themselves.' },
    { t: 'p', x: 'A day that was missed goes pale rather than red. The calendar is there to report, not to scold, and the button underneath is the only thing asking anything of you.' },
    {
      t: 'image',
      src: '/ember-assets/streak.webp',
      alt: 'The month calendar on a habit, completed days filled and two missed days pale, with the mark as completed button beneath',
      caption: 'A month, and the one button.',
    },
  ],
});
