// ============================================================================
//  Bring Undo to more web interactions — a finding.
// ============================================================================

BODY('bring-undo-to-more-web-interactions', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'We already use <strong>Ctrl + Z</strong> without thinking when working in tools like Figma, Photoshop, and text editors.' },
    { t: 'p', x: "But many websites don't support the same behavior for their own actions." },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'Web apps can support <strong>Ctrl + Z</strong> for reversible actions.' },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>Delete item → Ctrl + Z → Item comes back</strong>' },
    { t: 'p', x: '<strong>Move item → Ctrl + Z → Item returns</strong>' },
    { t: 'p', x: '<strong>Change something → Ctrl + Z → Previous state</strong>' },
    { t: 'p', x: 'It can also work with the normal <strong>Undo</strong> button or toast.' },
    { t: 'demo', kind: 'undo' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'Users already know what Ctrl + Z means.' },
    { t: 'p', x: "We don't need to teach them a new interaction. We can use an interaction they already have in their muscle memory." },
    { t: 'p', x: 'It can also reduce confirmation popups for actions that can safely be undone.' },
    { t: 'p', x: '<strong>Use familiar behaviors instead of making users learn new ones.</strong>' },
  ],
});
