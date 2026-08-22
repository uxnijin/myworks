// ============================================================================
//  Slow doesn't always mean broken — a finding.
// ============================================================================

BODY('slow-doesnt-always-mean-broken', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'When something takes longer than expected, a simple spinner can make users think the website is stuck.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'The interface can change its message based on how long the user has been waiting.' },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>0 to 2 sec</strong><br>Loading…' },
    { t: 'p', x: '<strong>After a few seconds</strong><br>Still working…' },
    { t: 'p', x: '<strong>If it takes longer</strong><br>This is taking longer than usual. You can wait or try again.' },
    { t: 'demo', kind: 'wait' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'The user doesn&rsquo;t know what is happening behind the screen.' },
    { t: 'p', x: 'Small feedback can make a slow process feel more trustworthy instead of making the user wonder if something is broken.' },
    { t: 'p', x: '<strong>When something takes time, communicate what is happening.</strong>' },
  ],
});
