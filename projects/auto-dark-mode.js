// ============================================================================
//  Auto Dark Mode — a plugin.
// ============================================================================

BODY('auto-dark-mode', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'Select a frame and it puts a dark copy next to it.' },
    { t: 'p', x: 'It does not invert anything. It looks at each colour and works out what that colour is <em>for</em> (a background, a card, a border, text, an icon, or a brand colour) and then treats each one the way it should be treated.' },
    {
      t: 'list',
      items: [
        'Backgrounds and cards go dark, with cards a step lighter than what sits behind them, so the layers still read apart.',
        'Brand colours are left alone. Your logo stays your logo.',
        'Text and icons are checked against whatever they sit on, and lightened until they are comfortably readable. You choose the standard: WCAG 2.1 or the newer APCA.',
        'Photos can be dimmed a little, so a picture shot for a white page does not glare on a dark one.',
        'It can build a variable collection with Light and Dark modes and bind the colours to it, so the two versions stay linked.',
        'Select several frames and they all convert in one go. Components keep their overrides.',
      ],
    },

    { t: 'h2', x: 'What it does not do' },
    { t: 'p', x: 'It reads your layers, not your intent. It works out roles from layer names, nesting and colour, so an icon drawn as a plain rectangle and named "Rectangle 42" will be read as a shape.' },
    { t: 'p', x: 'Shadows are left as they were. A shadow tuned for a white page is nearly invisible on a dark one, and that still needs a person.' },
  ],
});
