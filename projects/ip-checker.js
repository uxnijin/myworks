const PROJECT_IP_CHECKER = {
  slug: 'ip-checker',
  name: 'IP Checker',
  tag: 'Network',
  icon: 'map',
  group: 'Network Tools',
  url: 'https://ipchecker.nijin.site/',
  summary: 'Check IP and location.',
  lede: 'The smallest useful tool I\'ve built: what\'s my IP, and what does the internet think that means about me?',
  status: 'Live',
  blocks: [
    {
      t: 'p',
      x: `Two reasons anyone loads this page: confirming a VPN is actually on, or debugging why a service thinks they're in the wrong country. Both are answered in about one second, and the page should respect that.`,
    },
    { t: 'h2', x: 'Design decisions' },
    {
      t: 'p',
      x: `<strong>The answer, immediately.</strong> No search box — you're asking about yourself, and the server already knows. Making someone press a button to learn their own IP is a small insult.`,
    },
    {
      t: 'p',
      x: `<strong>Location is a guess, and it says so.</strong> Geolocation is a lookup against a registry database, not a measurement. Presenting a guessed city with the same confidence as an observed IP address is the central lie of most IP tools.`,
    },
    {
      t: 'callout',
      kind: 'warning',
      title: 'How wrong geolocation gets',
      x: `IP geolocation resolves to whatever the registry says about that block — often the ISP's registered location rather than yours. Country is usually right. City is frequently wrong, sometimes by hundreds of kilometres, and mobile carriers can place you in a different region entirely. It's a hint, not a position.`,
    },
    { t: 'h2', x: 'What it shows' },
    {
      t: 'p',
      x: `Your public IP, the network it belongs to, and the location that databases associate with it. That's genuinely the whole product — and the discipline is in refusing to pad it out with a fingerprinting panel to look more substantial.`,
    },
    {
      t: 'image',
      src: '',
      alt: 'IP Checker result view',
      caption: 'The whole product.',
      ratio: '16-9',
    },
  ],
};
