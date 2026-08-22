// ============================================================================
//  Learn repeated actions — a finding.
// ============================================================================

BODY('learn-repeated-actions', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'Sometimes users repeat the same action many times.' },
    { t: 'p', x: 'For example, if I upload 10 images and rotate the first 3 manually, there is a good chance I want the same change for the others.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'The system can notice the repeated action and ask:' },
    { t: 'p', x: '<strong>&ldquo;Apply this to the remaining 7 images?&rdquo;</strong>' },
    { t: 'p', x: 'One click can replace many repeated actions.' },
    { t: 'demo', kind: 'batch' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "The user doesn't have to create a rule or manually repeat the same action." },
    { t: 'p', x: 'The system simply notices what they are doing and helps at the right time.' },
    { t: 'p', x: '<strong>If the user keeps doing the same thing, the product can offer to do it for them.</strong>' },
  ],
});
