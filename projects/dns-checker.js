// ============================================================================
//  DNS Checker — a product.
// ============================================================================

BODY('dns-checker', {
  blocks: [
    { t: 'h2', x: 'What it does' },
    { t: 'p', x: 'You type a domain and it asks a set of public resolvers around the world what they currently think the answer is.' },
    {
      t: 'list',
      items: [
        'A, AAAA, CNAME, MX, NS and TXT records, each with the TTL alongside it.',
        'Where resolvers disagree, it shows the disagreement rather than averaging it away. The disagreement is the thing you came for.',
        'Registration details, Cloudflare detection, and certificate transparency logs, if you want them.',
        'Download the result as JSON or CSV.',
      ],
    },

    { t: 'h2', x: 'Why you cannot just check locally' },
    { t: 'p', x: 'Records do not spread. Resolvers cache them, and each one forgets on its own schedule. So "propagation" really means "the slowest cache between you and your users has not expired yet".' },
    { t: 'p', x: 'Checking from your own machine only tells you about your own resolver. The useful question is what the resolvers you do not control are handing out, and no amount of flushing your cache will answer it.' },

    { t: 'h2', x: 'Good to know' },
    { t: 'p', x: 'Public resolvers are a good proxy, not a guarantee. Your visitors\' ISPs have their own caches and their own opinions about TTLs, and a few ignore short ones entirely. All clear here means "probably fine", not "definitely done".' },
  ],
});
