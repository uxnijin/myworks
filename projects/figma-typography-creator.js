// ============================================================================
//  Figma Typography Creator — a plugin.
// ============================================================================

BODY('figma-typography-creator', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'You pick a base size and a ratio, and it works out the whole set of sizes for you, then puts them into the file.' },
    {
      t: 'list',
      items: [
        'Choose a ratio by name (Major Second, Perfect Fourth, Golden Ratio) or type your own. The sizes follow from it, so they relate to each other instead of being guessed.',
        'It registers real Figma text styles, named in a tidy order like Brand / Heading 1 / Bold.',
        'It draws a specimen board on the canvas, so the system is documented where the team can see it. Light or dark.',
        'Headings, body and captions can each use a different font, and code can have its own.',
        'The font picker searches as you type and works from the keyboard.',
      ],
    },

    { t: 'h2', x: 'A note on ratios' },
    { t: 'p', x: 'A bigger ratio gives you dramatic headings and very few usable steps in between. A smaller one gives you plenty of steps that are hard to tell apart. Perfect Fourth is a safe place to start.' },
  ],
});
