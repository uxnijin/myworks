// ============================================================================
//  Retry only what failed — a finding.
// ============================================================================

BODY('retry-only-what-failed', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'When something fails, many products reload the whole page or make the user start again.' },
    { t: 'p', x: 'But sometimes only one small part actually failed.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'If one section fails, only retry that part instead of loading everything again.' },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>Revenue ✓<br>Users ✓<br>Orders ⚠️ Couldn&rsquo;t load</strong>' },
    { t: 'p', x: 'Instead of refreshing the whole dashboard, the user can simply tap:' },
    { t: 'p', x: '<strong>Try again</strong>' },
    { t: 'demo', kind: 'retry' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "It saves time and doesn't interrupt the parts that are already working." },
    { t: 'p', x: "<strong>If only one thing failed, don't make the user restart everything.</strong>" },
  ],
});
