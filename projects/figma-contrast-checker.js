// ============================================================================
//  Figma Contrast Checker — a plugin.
// ============================================================================

BODY('figma-contrast-checker', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'Select a text layer and it tells you, straight away, whether the text is readable on what is behind it.' },
    {
      t: 'list',
      items: [
        'It finds the background for you, looking through parent frames and overlapping shapes.',
        'You get a plain pass or fail against WCAG 2.1, split into AA and AAA, normal and large text.',
        'If it fails, it suggests the nearest colour that passes. One click applies it.',
        'Select a whole frame instead and it checks every text layer inside, in one list. Click any failing row to jump to that layer.',
      ],
    },

    { t: 'h2', x: 'Why it is worth it' },
    { t: 'p', x: 'Contrast is easy to fix while you are choosing the colour and expensive to fix after forty components use it.' },
  ],
});
