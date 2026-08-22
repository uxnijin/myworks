// ============================================================================
//  Prevent duplicate actions — a finding.
// ============================================================================

BODY('prevent-duplicate-actions', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'Sometimes an action takes a few seconds to complete.' },
    { t: 'p', x: "If the user doesn't get immediate feedback, they may click the button again." },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>Pay &#8377;500 → nothing happens → Pay &#8377;500 again</strong>' },
    { t: 'p', x: 'This can create duplicate requests or payments.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'The moment the action starts, give clear feedback and prevent another click.' },
    { t: 'p', x: '<strong>Pay &#8377;500 → Processing… → Payment complete</strong>' },
    { t: 'p', x: 'The button can also become temporarily disabled while the request is being processed.' },
    { t: 'demo', kind: 'pay' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'The system should protect the user from a problem caused by the system being slow.' },
    { t: 'p', x: "<strong>When the system is processing, make it clear that the user's action was received.</strong>" },
  ],
});
