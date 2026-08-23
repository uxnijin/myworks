// ==========================================================================
//  HACA Design School. A design entry — the screens, and a little about them.
//  Prose stays short on purpose.
//
//  The one entry where a compare block earns its place: the old page and the
//  new one are the same sections, so they wipe against each other.
//  Figures: haca-design-school-assets/, through tools/prep_figures.py.
// ==========================================================================

BODY('haca-design-school', {
  blocks: [
    { t: 'p', x: 'A design rather than a build — these are the pages as drawn, not a site you can visit.' },
    {
      t: 'compare',
      before: '/haca-design-school-assets/old-hero.webp',
      after: '/haca-design-school-assets/new-hero.webp',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'The hero. Drag the handle across.',
    },
    { t: 'p', x: 'The old hero sold with a photograph and a sentence set in the same typeface as everything else. The new one makes the course name the picture — students set into the letters, so the people and the promise are one object instead of two.' },

    { t: 'h2', x: 'The same page, section by section' },
    { t: 'p', x: 'The questions did not change. The voice did: display type that commits, and a colour per section so scrolling feels like moving through rooms rather than down a list.' },
    {
      t: 'compare',
      before: '/haca-design-school-assets/old-why.webp',
      after: '/haca-design-school-assets/new-why.webp',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'Why people join.',
    },
    { t: 'p', x: 'Six reasons in a two-column grid became four, each with a face carrying the feeling the sentence describes — the doubt at the top, the ease at the bottom.' },
    {
      t: 'compare',
      before: '/haca-design-school-assets/old-learn.webp',
      after: '/haca-design-school-assets/new-learn.webp',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'The modules.',
    },
    { t: 'p', x: 'The module list was eight identical rows saying Branding basics. Now they are tabbed cards, numbered, each showing its level and who teaches it, so the shape of the course is visible without reading a word.' },
    {
      t: 'compare',
      before: '/haca-design-school-assets/old-ai.webp',
      after: '/haca-design-school-assets/new-ai.webp',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'The bonus module.',
    },
    { t: 'p', x: 'A bulleted list became four stacked cards, one colour each. The same four claims, given the weight of things rather than lines.' },
    {
      t: 'compare',
      before: '/haca-design-school-assets/old-included.webp',
      after: '/haca-design-school-assets/new-included.webp',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'What is included.',
    },
    { t: 'p', x: 'Then it is alternating rows — videos, projects, templates — so a long list of inclusions reads as a rhythm instead of a wall.' },
    { t: 'image', src: '/haca-design-school-assets/included-detail.webp', alt: 'Alternating rows for instructional videos, course projects and templates, each with an illustration', caption: 'The rows underneath.' },
    {
      t: 'compare',
      before: '/haca-design-school-assets/old-closer.webp',
      after: '/haca-design-school-assets/new-closer.webp',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'The closer.',
    },
    { t: 'p', x: 'The last thing on the page stops being a blue rectangle and gets a shape of its own.' },

    { t: 'h2', x: 'What the old page did not have' },
    { t: 'p', x: 'A design course has to show the work its students make. This is the section a branding school cannot afford to be missing.' },
    { t: 'image', src: '/haca-design-school-assets/students.webp', alt: 'A row of student project cards, each with the work, the student name and their batch', caption: 'Students&rsquo; work.' },
    { t: 'p', x: 'And the people teaching it, since the fee is partly for access to them.' },
    { t: 'image', src: '/haca-design-school-assets/instructors.webp', alt: 'The instructors section with a large founder portrait beside three smaller ones', caption: 'The instructors.' },
    { t: 'p', x: 'The awkward questions — how you pay, in how many instalments — are answered on the page rather than in a message to the team.' },
    { t: 'image', src: '/haca-design-school-assets/faq.webp', alt: 'A frequently asked questions accordion with the payment options answer open', caption: 'The questions.' },
  ],
});
