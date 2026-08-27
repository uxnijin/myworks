// ============================================================================
//  Network Tools — a product. Four tools that used to live on four domains,
//  now one site in the Carbon design style.
// ============================================================================

BODY('network-tools', {
  blocks: [
    { t: 'p', x: 'These started as four separate sites. They are now one product with a shared shell, one design system, and a tab for each question. The interface follows IBM&rsquo;s Carbon design language, in light and dark.' },

    { t: 'h2', x: 'Speed test' },
    { t: 'p', x: 'Four numbers and then it stops: download, upload, ping, jitter. All measured against Cloudflare&rsquo;s edge over multiple connections, with the theatre removed.' },
    {
      t: 'list',
      items: [
        'Each number gets a plain-language verdict: <em>comfortable for 4K streams</em>, <em>feels instant</em>, <em>stable line</em>.',
        'A bufferbloat grade, measured by pinging while the line is saturated. The quiet reason calls stutter on fast connections.',
        'History stays on your device, exportable as CSV.',
      ],
    },

    { t: 'h2', x: 'Site speed test' },
    { t: 'p', x: 'You give it a URL and it shows how the page actually loaded: total time, total weight, and the request waterfall. The waterfall is the main view because it is the only part that explains anything. There is no score, on purpose; a single grade squashes a dozen problems into one number you cannot act on.' },
    { t: 'p', x: 'The fetching runs on a server, because a browser is not allowed to read the timing or size of a cross-origin site. Read the shape, not the length: a staircase pays a round trip per step, a flat block is the same bytes arriving together.' },

    { t: 'h2', x: 'DNS checker' },
    { t: 'p', x: 'Your records with their TTLs, then the part that matters: what Google, Cloudflare and Quad9 currently believe, side by side. Where resolvers disagree, the disagreement is shown in red rather than averaged away. The disagreement is the thing you came for.' },
    { t: 'p', x: 'Registration details come from RDAP, certificate history links to the transparency logs, and the whole answer downloads as JSON or CSV.' },

    { t: 'h2', x: 'IP checker' },
    { t: 'p', x: 'Your IP is on screen before you ask; the server already knew. The network facts (ISP, ASN, reverse DNS) sit in one card, and the location sits in another labelled what it is: a guess. Showing a guessed city with the same confidence as an observed address is the central lie of most IP tools, so this one does not.' },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'A browser test measures what a web page can reach from where you are sitting. That is usually the number you care about, but it is not your line&rsquo;s top speed, and one run of anything is an anecdote. Run it twice before you believe it.' },
  ],
});
