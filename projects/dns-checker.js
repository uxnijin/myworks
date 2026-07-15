const PROJECT_DNS_CHECKER = {
  slug: 'dns-checker',
  name: 'DNS Checker',
  tag: 'Network',
  icon: 'globe',
  group: 'Network Tools',
  url: 'https://dnschecker.nijin.site/',
  summary: 'Shows your DNS records + propagation.',
  lede: 'Your records, and whether the rest of the world can see them yet.',
  status: 'Live',
  blocks: [
    {
      t: 'p',
      x: `DNS is the thing that breaks your launch. You changed the record, it works on your machine, and someone on another continent is still hitting the old server — and you have no way to see what they see.`,
    },
    { t: 'h2', x: 'Why "propagation" is the whole feature' },
    {
      t: 'p',
      x: `There's no such thing as DNS propagation, strictly. Records don't <em>spread</em> — resolvers <strong>cache</strong> them, and each one independently forgets on its own TTL schedule. What people call propagation is really "the slowest cache between you and your users hasn't expired yet."`,
    },
    {
      t: 'callout',
      kind: 'info',
      title: 'Which is exactly why you need to check from elsewhere',
      x: `Checking from your own machine tells you about <strong>your</strong> resolver's cache and nothing else. The only useful question is what resolvers <em>you don't control</em> are currently returning — and that's a question you can't answer locally, no matter how many times you flush your cache.`,
    },
    { t: 'h2', x: 'Design decisions' },
    {
      t: 'p',
      x: `<strong>Show the disagreement.</strong> When resolvers return different answers, that <em>is</em> the finding. A tool that averages it away or shows only the first response has thrown out the one thing you came for.`,
    },
    {
      t: 'p',
      x: `<strong>TTL up front.</strong> "Wait 48 hours" is folklore. Your TTL is a number, it's right there, and it tells you what the actual worst case is.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'DNS record lookup with propagation status',
      caption: 'Records, with per-resolver status.',
      ratio: '16-9',
    },
    { t: 'h2', x: 'Caveats' },
    {
      t: 'callout',
      kind: 'warning',
      title: 'Public resolvers aren\'t your users',
      x: `Checking a set of public resolvers is a good proxy and not a guarantee. Your visitors' ISP resolvers have their own caches and sometimes their own opinions about TTLs — a few ignore short ones entirely. All clear here means "probably fine", not "definitely done".`,
    },
  ],
};
