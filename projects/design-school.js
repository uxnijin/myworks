// ============================================================================
//  Design School — a product.
// ============================================================================

BODY('design-school', {
  blocks: [
    { t: 'h2', x: 'What it is' },
    { t: 'p', x: 'A reading list for people learning design: the one I actually send students, instead of a bookmark folder with four hundred links in it.' },
    {
      t: 'list',
      items: [
        'Ordered by where you are in learning, not by topic. Beginners do not need "Typography / Colour / Layout"; they need "start here, then this".',
        'Everything in it is something I would hand to a specific student for a specific reason. If I cannot say who it is for and when, it is not in.',
        'No account, no email capture, nothing gated. A resource list behind a signup is a lead magnet wearing a teacher\'s clothes.',
        'A static page that loads fast on a bad connection, because plenty of the people I wrote it for are on one.',
      ],
    },

    { t: 'h2', x: 'Why it is short' },
    { t: 'p', x: 'The value is what got left out. Forty resources someone finishes beats four hundred they bounce off in a week. A link dump looks generous and is the opposite: it hands the hardest part of the job, deciding what is worth your time, back to the person least able to do it.' },

    { t: 'h2', x: 'What needs work' },
    { t: 'p', x: 'The hard part is maintenance, not building. Links rot and tools get bought and ruined, and a stale recommendation costs more trust than a missing one. There is no review schedule on this yet, and there should be.' },
  ],
});
