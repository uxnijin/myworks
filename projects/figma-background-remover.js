// ============================================================================
//  Figma Background Remover — a plugin.
// ============================================================================

BODY('figma-background-remover', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It removes the background from an image in one click, on your own machine.' },
    {
      t: 'list',
      items: [
        'Select an image on the canvas, or drag a file in from your computer.',
        'The cut handles awkward edges like hair reasonably well.',
        'If it gets something wrong, brush it back. Erase takes more away, restore brings it back.',
        'A feather slider softens the edge so the cut does not look pasted on.',
        'It exports at double resolution, so what comes back is sharp rather than soft.',
      ],
    },

    { t: 'h2', x: 'Where your image goes' },
    { t: 'p', x: 'Nowhere. The model runs inside Figma on your own device, so the photo is never uploaded to a server. That is the main reason this exists.' },
  ],
});
