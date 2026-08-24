// ============================================================================
//  Figma Font Preview — a plugin.
// ============================================================================

BODY('figma-font-preview', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It puts your local fonts, the full Google Fonts catalogue, and Fontshare in one panel, and shows every one of them rendered in your own words.' },
    {
      t: 'list',
      items: [
        'Type your own preview text and change the size, so you see real words instead of "The quick brown fox".',
        'Search by name, or filter by where the font comes from and by style: sans serif, serif, monospace, display, handwriting.',
        'Click a font to apply it to whatever text layers you have selected.',
        'Web fonts that are not installed in Figma yet are flagged, so you know before you click.',
      ],
    },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'It follows Figma\'s light and dark mode on its own.' },
    { t: 'p', x: 'The only thing it fetches is font previews. Nothing about your file leaves your machine.' },
  ],
});
