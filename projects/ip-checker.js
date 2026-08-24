// ============================================================================
//  IP Checker — a product.
// ============================================================================

BODY('ip-checker', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'It shows your public IP address the moment the page opens. No button, because you are asking about yourself and the server already knows.' },
    {
      t: 'list',
      items: [
        'Your IPv4 and IPv6 addresses, and the network they belong to.',
        'The ISP, organisation and ASN behind them.',
        'The location the registry databases associate with the address.',
        'Type any other IP into the box to look that one up instead.',
      ],
    },
    { t: 'p', x: 'Two things bring most people here: checking a VPN is actually on, and working out why a website thinks they are in the wrong country. Both are answered in about a second.' },

    { t: 'h2', x: 'About that location' },
    { t: 'p', x: 'It is a lookup, not a measurement. The databases record where the address block is registered, which is often the ISP\'s office rather than you. Country is usually right; city is frequently wrong, sometimes by hundreds of kilometres, and mobile networks can put you in another state entirely.' },
    { t: 'p', x: 'So it is labelled as a guess. Showing a guessed city with the same confidence as an observed IP address is the central lie of most IP tools.' },
  ],
});
