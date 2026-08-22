// ============================================================================
//  Don't just say "No results" — a finding.
// ============================================================================

BODY('dont-just-say-no-results', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: "When a search doesn't find anything, most websites simply show:" },
    { t: 'p', x: '<strong>No results found</strong>' },
    { t: 'p', x: "But this doesn't really help the user." },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'Use the search query to understand what might have gone wrong and give the user a useful next step.' },
    { t: 'p', x: 'For example:' },
    { t: 'p', x: '<strong>No results for &ldquo;black Nike shoes under &#8377;2,000&rdquo;</strong>' },
    { t: 'p', x: '<strong>Try increasing your budget to &#8377;3,000</strong>' },
    { t: 'p', x: 'or:' },
    { t: 'p', x: '<strong>No results under &#8377;2,000. Show results up to &#8377;3,000?</strong>' },
    { t: 'demo', kind: 'search' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "The user doesn't have to figure out what to change." },
    { t: 'p', x: 'The product can help them recover from the failed search instead of making them start again.' },
    { t: 'p', x: "With AI, this can become even better because the system can understand the user's intent and suggest the most useful change." },
    { t: 'p', x: "<strong>Don't just tell users that something failed. Help them move forward.</strong>" },
  ],
});
