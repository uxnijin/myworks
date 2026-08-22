// ============================================================================
//  Learn from repeated actions — a finding.
// ============================================================================

BODY('learn-from-repeated-actions', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'When deleting something, we often get a confirmation:' },
    { t: 'p', x: '<strong>Are you sure you want to delete this?</strong>' },
    { t: 'p', x: "That's useful for preventing mistakes, but when a user is deleting many items, asking the same thing again and again becomes annoying." },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'If the user repeatedly deletes items, the system can understand that they are intentionally cleaning up.' },
    { t: 'p', x: 'After a few repeated deletions, we can remove the confirmation and give them an <strong>Undo</strong> option instead.' },
    { t: 'p', x: '<strong>Delete → Delete → Delete → Delete</strong>' },
    { t: 'p', x: 'instead of:' },
    { t: 'p', x: '<strong>Delete → Confirm → Delete → Confirm → Delete → Confirm</strong>' },
    { t: 'demo', kind: 'delete' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'It handles both situations:' },
    { t: 'p', x: 'If it was a mistake, the user can <strong>Undo</strong> it.' },
    { t: 'p', x: 'If they are intentionally deleting many items, they can do it much faster.' },
    { t: 'p', x: 'The system is not just following a fixed rule. It is responding to what the user is doing.' },

    { t: 'h2', x: 'One thing to consider' },
    { t: 'p', x: 'I would keep this behavior limited to the current session or task, especially for destructive actions.' },
    { t: 'p', x: "<strong>The interface should adapt to the user's behavior, but still keep them safe.</strong>" },
  ],
});
