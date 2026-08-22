// ============================================================================
//  Reduce uncertainty before the click — a finding.
// ============================================================================

BODY('reduce-uncertainty-before-the-click', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: "Sometimes users understand what a button says, but they don't know exactly what will happen after clicking it." },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>Continue</strong>' },
    { t: 'p', x: 'Continue to what?' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'Use the UI to show what happens next before the user clicks.' },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>Cart → Address → Payment</strong>' },
    { t: 'p', x: 'If the user is currently on Address, the next button can say:' },
    { t: 'p', x: '<strong>Continue to payment</strong>' },
    { t: 'p', x: "Now the user doesn't have to guess." },
    { t: 'demo', kind: 'next' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "A good interface doesn't only tell users <strong>what they can do</strong>." },
    { t: 'p', x: 'It also helps them understand <strong>what will happen next</strong>.' },
    { t: 'p', x: '<strong>Give users confidence before they take the action.</strong>' },
  ],
});
