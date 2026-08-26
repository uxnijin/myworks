// ============================================================================
//  Don't move the target while I'm clicking — a finding.
// ============================================================================

BODY('dont-move-the-target-while-im-clicking', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'On desktop I often close a lot of browser tabs at once.' },
    { t: 'p', x: 'In Chrome this is easy. I close one tab, and the close button of the next tab is already under my cursor, so I can keep clicking in the same place until I am done.' },
    { t: 'p', x: 'On some other platforms the tabs resize the moment one closes. The next close button moves somewhere else, and I have to find it and move the cursor again for every single tab.' },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'When an action is likely to be repeated, keep the target where it is until the user is finished.' },
    { t: 'p', x: 'The tab strip can hold its widths while the pointer is still in it, and only re-lay itself out once the pointer leaves.' },
    { t: 'p', x: '<strong>Close → close → close</strong>, without moving the mouse between them.' },
    { t: 'demo', kind: 'tabs' },
    { t: 'p', x: 'The same applies anywhere a list has a button on every row: deleting, dismissing, approving, removing.' },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'The user never notices it when it works. They only notice the version where they have to chase the button.' },
    { t: 'p', x: 'It costs nothing to hold a layout still for a few seconds, and it turns a slow, careful task into a few quick clicks.' },
    { t: 'p', x: "<strong>If the user is about to click again, don't move what they are clicking.</strong>" },
  ],
});
