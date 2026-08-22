// ============================================================================
//  Make transitions preserve context — a finding.
// ============================================================================

BODY('make-transitions-preserve-context', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'When something changes on a screen, we usually just show the new state.' },
    { t: 'p', x: 'But the user can lose the connection between <strong>what they clicked</strong> and <strong>what appeared next</strong>.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'Use animation to make the same element visually move into its new state.' },
    { t: 'p', x: 'For example, when I click a product card, the card can expand into the product details instead of disappearing and showing a completely new page.' },
    { t: 'p', x: 'The user can understand:' },
    { t: 'p', x: '<strong>This is the same thing, just opened.</strong>' },
    { t: 'demo', kind: 'zoom' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'The animation is not just there to look nice.' },
    { t: 'p', x: 'It helps the user understand where something came from and where it went.' },
    { t: 'p', x: '<strong>Animation should explain the change, not just decorate it.</strong>' },
  ],
});
