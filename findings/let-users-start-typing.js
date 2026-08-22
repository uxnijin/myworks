// ============================================================================
//  Let users start typing — a finding.
// ============================================================================

BODY('let-users-start-typing', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'On desktop, users often have to click an input before they can start typing.' },
    { t: 'p', x: 'When there is one clear main input, I feel this click is an unnecessary step.' },

    { t: 'h2', x: 'My observation' },
    { t: 'p', x: 'If no other input is focused, we can assume the user wants to use the main input.' },
    { t: 'p', x: 'Instead of:' },
    { t: 'p', x: '<strong>Click → Type</strong>' },
    { t: 'p', x: 'We can do:' },
    { t: 'p', x: '<strong>Type → Input receives text</strong>' },
    { t: 'p', x: 'If the user clicks another input, typing will work normally in that input.' },

    { t: 'h2', x: 'Solution' },
    { t: 'p', x: 'Make the main input the default place for typing when no other input is focused.' },

    { t: 'h2', x: 'Why I think this is good' },
    { t: 'p', x: 'It removes one small step and makes the product feel faster.' },
    { t: 'p', x: 'It also makes the experience more keyboard-friendly, especially on desktop.' },

    { t: 'h2', x: 'One thing to consider' },
    { t: 'p', x: 'This works best when there is one clear main input.' },
    { t: 'p', x: 'If there are multiple important inputs, automatically choosing one could confuse the user.' },

    { t: 'h2', x: 'My takeaway' },
    { t: 'p', x: "<strong>If the user's intention is obvious, don't make them do one more click to start.</strong>" },
  ],
});
