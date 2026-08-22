// ============================================================================
//  Start loading on hover — a finding.
// ============================================================================

BODY('start-loading-on-hover', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'When we hover over a button or link, there is a good chance we are going to click it.' },
    { t: 'p', x: 'So instead of waiting until the click to start loading the next page, we can start loading it when the user hovers.' },
    { t: 'p', x: '<strong>Current:</strong> Click → Load → Wait' },
    { t: 'p', x: '<strong>Better:</strong> Hover → Start loading → Click → Content is ready' },

    { t: 'demo', kind: 'prefetch' },

    { t: 'h2', x: 'Example' },
    { t: 'p', x: 'If I hover over a project card, the website can start loading that project page in the background.' },
    { t: 'p', x: 'When I click it, the page can open much faster.' },
    { t: 'p', x: 'This is called <strong>prefetching</strong> and is already used in modern websites and apps.' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "We don't have to load everything when the website first opens." },
    { t: 'p', x: 'We only start loading something when the user shows interest in it.' },
    { t: 'p', x: '<strong>Small interaction, but it can make the website feel much faster.</strong>' },
  ],
});
