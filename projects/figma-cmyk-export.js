// ============================================================================
//  Figma CMYK Export — a plugin.
// ============================================================================

BODY('figma-cmyk-export', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It exports your design straight to a print-ready CMYK file, without a trip through another app.' },
    {
      t: 'list',
      items: [
        'CMYK PDF, made with a real print colour profile.',
        'A JPEG version that shows you on screen roughly how the ink will look, so there are no surprises.',
        'Exports at 300 DPI, which is what a printer needs.',
        'Everything is converted inside Figma. Your design is never uploaded anywhere.',
      ],
    },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'Bright screen colours — strong greens, electric blues — cannot be made with ink. They will come out duller. The JPEG preview is there so you find that out now rather than after the print run.' },
  ],
});
