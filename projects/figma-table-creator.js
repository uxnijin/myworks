// ============================================================================
//  Figma Table Creator — a plugin.
// ============================================================================

BODY('figma-table-creator', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It builds the table for you, with real structure and real data.' },
    {
      t: 'list',
      items: [
        'Pick a style — Minimal, Notion, Stripe, Linear or Material — then adjust padding and corners.',
        'Paste in a CSV and it fills the table with your actual data instead of Lorem Ipsum.',
        'It reads what each column holds and formats it: statuses become coloured badges, dates get formatted, numbers and currency line up on the right.',
        'Everything is built with Auto Layout, so the table resizes properly and you can add a row without redrawing it.',
        'Turn columns off without deleting them.',
      ],
    },

    { t: 'h2', x: 'Why the data matters' },
    { t: 'p', x: 'A table full of placeholder text hides the problems. Real names are longer than you expect, real numbers wrap, and real status labels do not all fit the same badge. Pasting the actual data is how you find that before build.' },
  ],
});
