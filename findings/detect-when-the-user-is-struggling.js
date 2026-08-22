// ============================================================================
//  Detect when the user is struggling — a finding.
// ============================================================================

BODY('detect-when-the-user-is-struggling', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: "Sometimes users don't see an error, but their actions show that they are confused." },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>Type → Delete → Type again → Delete → Open help → Try again</strong>' },
    { t: 'p', x: 'The system can notice this pattern.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'Instead of waiting for the user to ask for help, the interface can give a small hint when it sees that the user may be struggling.' },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>&ldquo;Having trouble? Here&rsquo;s an example of what to enter.&rdquo;</strong>' },
    { t: 'demo', kind: 'struggle' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "We usually design for errors, but we don't always design for <strong>confusion</strong>." },
    { t: 'p', x: 'With AI, the system could understand user behavior and offer help at the right moment, without adding more UI for everyone.' },
    { t: 'p', x: '<strong>Help should appear when the user needs it, not all the time.</strong>' },
  ],
});
