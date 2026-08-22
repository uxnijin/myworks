// ============================================================================
//  Speed Test — a product.
// ============================================================================

BODY('speed-test', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It gives you four numbers and then stops.' },
    {
      t: 'list',
      items: [
        '<strong>Download</strong> — how fast data comes down. The number people mean when they say "speed".',
        '<strong>Upload</strong> — how fast it goes up. Usually far lower, and the one that ruins video calls.',
        '<strong>Ping</strong> — the round trip. Decides whether things feel instant, however much bandwidth you have.',
        '<strong>Jitter</strong> — how much the ping wobbles. The quiet one: a fast line with unstable latency still makes a bad call.',
      ],
    },
    { t: 'p', x: 'All four arrive together, at the same size. There is no "analysing…" stage, because that stage only ever existed to hold you long enough to show an ad.' },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'A test that runs in a browser is measuring what a web page can manage from where you are sitting. That is usually the number you actually care about, but it is not your line\'s top speed. Treat a slow result as a place to start looking.' },
  ],
});
