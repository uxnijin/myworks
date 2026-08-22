// ============================================================================
//  Don't move the page while I'm reading — a finding.
// ============================================================================

BODY('dont-move-the-page-while-im-reading', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'Sometimes new content loads into a page and pushes the existing content down.' },
    { t: 'p', x: "I'm reading something and suddenly the page moves because an image, ad, or other content loaded above it." },
    { t: 'p', x: 'Now I have to find where I was again.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: "When new content loads, keep the user's current position stable." },
    { t: 'p', x: "For example, if I'm reading the 5th paragraph and an image loads above it, the page should adjust so that I'm still looking at the 5th paragraph." },
    { t: 'demo', kind: 'anchor' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'The user may never know why the page feels better.' },
    { t: 'p', x: "They just don't lose their place." },
    { t: 'p', x: "<strong>When the interface changes, don't make the user lose their place.</strong>" },
  ],
});
