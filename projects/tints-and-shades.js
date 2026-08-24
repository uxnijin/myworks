// ============================================================================
//  Figma Tints & Shades — a plugin.
// ============================================================================

BODY('tints-and-shades', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'You give it a colour, it gives you the scale, evenly spaced, so no two neighbours jump.' },
    { t: 'p', x: 'Lighter steps are blends toward white. Darker steps are blends toward black. That is the whole calculation; the useful part is what happens to the result.' },
    {
      t: 'list',
      items: [
        'Save the scale straight into the file as Figma variables. Several scales can sync at once.',
        'Draw the swatches onto the canvas as a tidy Auto Layout row.',
        'Copy it out as a Tailwind config, as CSS variables, or as design tokens JSON.',
        'Contrast is shown while you are choosing, so you find out the 400 fails on white before you build anything with it.',
      ],
    },

    { t: 'h2', x: 'An honest limitation' },
    { t: 'p', x: 'The steps are evenly spaced by the maths, not by the eye. Our eyes are not linear, so the middle of the scale can look a bit bunched up and strong colours can drift as they lighten.' },
    { t: 'p', x: 'Doing the blending in a perceptual colour space like OKLCH would fix it. That is the next thing to change here, and it has not been done yet.' },
  ],
});
