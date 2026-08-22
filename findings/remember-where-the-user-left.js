// ============================================================================
//  Remember where the user left — a finding.
// ============================================================================

BODY('remember-where-the-user-left', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'Sometimes users leave a page to find some information and come back later.' },
    { t: 'p', x: 'The product usually remembers the page, but not always <strong>what the user was doing</strong>.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: "The system can remember the user's last position and context." },
    { t: 'p', x: 'For example, if I am filling a form and leave to find my PIN code, when I come back, the product can take me directly to the field I was filling.' },
    { t: 'p', x: '<strong>&ldquo;You were here. PIN code is still missing.&rdquo;</strong>' },
    { t: 'demo', kind: 'resume' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "The user doesn't have to remember where they stopped or search through the page again." },
    { t: 'p', x: "The product remembers the user's context for them." },
    { t: 'p', x: "<strong>Don't just remember the page. Remember what the user was doing.</strong>" },
  ],
});
