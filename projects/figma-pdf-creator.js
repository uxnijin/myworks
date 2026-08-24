// ============================================================================
//  Figma PDF Creator — a plugin.
// ============================================================================

BODY('figma-pdf-creator', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It turns your frames into a finished PDF: pages in the right order, sized properly, ready to send or to print.' },
    {
      t: 'list',
      items: [
        'Drag the pages into the order you want before exporting.',
        'Add page numbers, in whichever corner suits.',
        'Pick A4 or Letter, or set your own size and margins.',
        'Export in RGB for screen or CMYK for print, at up to 300 DPI.',
      ],
    },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'If it is going to a printer, use CMYK and 300 DPI. If it is going in an email, RGB is smaller and looks better on screen.' },
    { t: 'p', x: 'It matches Figma\'s light and dark mode.' },
  ],
});
