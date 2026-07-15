const PROJECT_SITE_SPEED_TEST = {
  slug: 'site-speed-test',
  name: 'Site Speed Test',
  tag: 'Network',
  icon: 'timer',
  group: 'Network Tools',
  url: 'https://sitespeedcheck.nijin.site/',
  summary: 'Checks page load time, size, and request waterfall for any website.',
  lede: 'Load time, total weight, and the request waterfall: the three things that tell you why a page is slow, rather than just that it is.',
  status: 'Live',
  blocks: [
    {
      t: 'p',
      x: `"Your site scores 63" is not actionable. A composite score compresses a dozen independent problems into one number you can't act on, which is why people stare at it, feel bad, and change nothing.`,
    },
    {
      t: 'p',
      x: `The waterfall is the opposite. It's not a grade; it's a <strong>sequence</strong>. And slowness is almost always a sequencing problem.`,
    },
    { t: 'h2', x: 'The three measurements' },
    {
      t: 'table',
      head: ['Metric', 'What it tells you'],
      rows: [
        ['<strong>Load time</strong>', 'The symptom. Useful for tracking, useless for diagnosis.'],
        ['<strong>Page size</strong>', 'Total bytes. Usually the first surprise: an uncompressed hero image or a font you forgot to subset.'],
        ['<strong>Request waterfall</strong>', 'The cause. Every request, in order, with what blocked what.'],
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Read the waterfall\'s shape, not its length',
      x: `A long waterfall isn't automatically bad, but a <strong>staircase</strong> is. Requests descending one after another means each one had to finish before the next could start, and you're paying full round-trip latency per step. A wide, flat block of parallel requests is a page loading efficiently. Same total bytes, completely different experience.`,
    },
    { t: 'h2', x: 'Design decisions' },
    {
      t: 'p',
      x: `<strong>No score.</strong> Scores let you feel measured without being informed. Every number here maps to a thing you could go change this afternoon.`,
    },
    {
      t: 'p',
      x: `<strong>The waterfall is the hero, not an appendix.</strong> Most tools hide it three tabs deep behind the number. It's the only part that explains anything.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'Request waterfall visualisation',
      caption: 'The waterfall, where the staircases show up.',
      ratio: '16-9',
      bleed: true,
    },
    { t: 'h2', x: 'Caveats' },
    {
      t: 'callout',
      kind: 'warning',
      title: 'One run is an anecdote',
      x: `A single measurement from one location, on one connection, with a cold cache is a data point, not a baseline. CDN warmth, geography and time of day all move these numbers. Run it a few times before you believe it.`,
    },
  ],
};
