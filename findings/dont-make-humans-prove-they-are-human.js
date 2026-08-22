// ============================================================================
//  Don't make humans prove they are human — a finding.
// ============================================================================

BODY('dont-make-humans-prove-they-are-human', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'A lot of websites still ask users to solve CAPTCHAs like:' },
    { t: 'p', x: '<strong>Select all the traffic lights</strong>' },
    { t: 'p', x: '<strong>Select all the bicycles</strong>' },
    { t: 'p', x: 'It adds friction, especially when the user is just trying to log in, sign up, or continue.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'Instead of showing a CAPTCHA to everyone, the system can first look at different signals to estimate whether the interaction looks normal.' },
    { t: 'p', x: 'For example:' },
    {
      t: 'list',
      items: [
        'Mouse movement and cursor behavior',
        'How the user moves between elements',
        'Typing patterns',
        'Click timing and interaction speed',
        'Scrolling behavior',
        'Touch interactions on mobile',
        'How the page is being navigated',
        'Unusual request or interaction patterns',
      ],
    },
    { t: 'p', x: "If the system has high confidence that the user is genuine, don't show the CAPTCHA at all." },
    { t: 'p', x: 'If the behavior looks suspicious, then show an additional verification step.' },
    { t: 'demo', kind: 'human' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: "Most users should not have to solve a security problem that they didn't create." },
    { t: 'p', x: 'Security can happen in the background, and the user only needs to be involved when the system is unsure.' },
    { t: 'p', x: '<strong>Good security should be invisible when possible, and interruptive only when necessary.</strong>' },
  ],
});
