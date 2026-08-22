// ============================================================================
//  Site Speed Test — a product.
// ============================================================================

BODY('site-speed-test', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'You give it a URL and it shows you how the page actually loaded.' },
    {
      t: 'list',
      items: [
        '<strong>Load time</strong> — the symptom. Good for tracking, useless on its own for working out why.',
        '<strong>Page size</strong> — the total bytes. Usually the first surprise: an uncompressed hero image, or a font nobody subset.',
        '<strong>The waterfall</strong> — every request in order, showing what had to wait for what. This is the part that explains anything, so it is the main view rather than something three tabs deep.',
        'Run it from a few different regions, or against two sites side by side.',
      ],
    },
    { t: 'p', x: 'There is no score. A single grade squashes a dozen separate problems into one number you cannot act on, so people stare at it, feel bad, and change nothing.' },

    { t: 'h2', x: 'How to read the waterfall' },
    { t: 'p', x: 'Look at its shape, not its length. A staircase — each request starting only once the one above finished — means you are paying a full round trip per step. A wide flat block is the same bytes loading all at once, and a completely different experience.' },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'One run is an anecdote. CDN warmth, distance and time of day all move these numbers, so run it a few times before you believe it.' },
  ],
});
