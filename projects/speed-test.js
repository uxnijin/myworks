const PROJECT_SPEED_TEST = {
  slug: 'speed-test',
  name: 'Speed Test',
  tag: 'Network',
  icon: 'gauge',
  group: 'Network Tools',
  url: 'https://speedtest.nijin.site/',
  summary: 'Internet speed test — download, upload, ping, jitter.',
  lede: 'Four numbers, no ads, no app install, no "your connection is being analysed" theatre.',
  status: 'Live',
  blocks: [
    {
      t: 'p',
      x: `Most speed tests are advertising with a gauge on top. You want one number and you get a page that weighs more than the file it's about to download to measure your connection.`,
    },
    { t: 'h2', x: 'What it measures' },
    {
      t: 'cards',
      items: [
        { icon: 'download', title: 'Download', desc: 'Throughput pulling data down — the number people mean when they say "speed".' },
        { icon: 'upload', title: 'Upload', desc: 'Throughput pushing data up. Usually far lower, and the one that ruins video calls.' },
        { icon: 'zap', title: 'Ping', desc: 'Round-trip latency. Decides whether things feel instant, regardless of bandwidth.' },
        { icon: 'activity', title: 'Jitter', desc: 'Variance between pings. The quiet killer — high jitter breaks calls even on a fast line.' },
      ],
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Why jitter is on the front page',
      x: `Bandwidth is the number everyone quotes and jitter is the number that explains why the call was bad anyway. A 500 Mbps line with unstable latency is a worse call than a stable 20 Mbps one. Measuring it means taking many samples and reporting the <em>variance</em> — a single ping tells you almost nothing.`,
    },
    { t: 'h2', x: 'Design decisions' },
    {
      t: 'p',
      x: `<strong>The result is the page.</strong> No interstitial, no "analysing…" stage that exists purely to hold you long enough to serve an impression.`,
    },
    {
      t: 'p',
      x: `<strong>All four numbers at once.</strong> Tools that show download first and bury latency are optimising for the number that sounds impressive rather than the one that's diagnostic.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'Speed test results view',
      caption: 'Result state — four numbers, equal weight.',
      ratio: '16-9',
    },
    { t: 'h2', x: 'Caveats' },
    {
      t: 'callout',
      kind: 'warning',
      title: 'A browser speed test measures a browser',
      x: `Any in-browser test is bounded by JavaScript, the browser's connection limits, and the distance to the test server. It tells you what a web page can achieve from where you're sitting — which is usually the number you actually care about, but it is <strong>not</strong> a measurement of your line's theoretical capacity. Treat a slow result as a starting point, not a verdict.`,
    },
  ],
};
