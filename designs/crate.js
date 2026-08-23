// ==========================================================================
//  Crate. A design entry — the screens, and a little about them. Prose stays
//  short on purpose.
//
//  Figures: crate-assets/ — supplied slides through tools/prep_figures.py.
// ==========================================================================

BODY('crate', {
  blocks: [
    { t: 'p', x: 'A concept, and not a built one — these are the screens as drawn.' },
    { t: 'p', x: 'It opens on the one thing you came to do, with the two facts that decide whether you stay: how much it will take, and whether it is safe.' },
    { t: 'image', src: '/crate-assets/landing.webp', alt: 'The empty state: a drop area reading Add Files, with up to 10GB on one side and secured file transfer on the other', caption: 'Nothing added yet.' },
    { t: 'p', x: 'Then sending is one screen split in two. Files, delivery and options down the left; on the right, the page your recipient will open, filling in as you go.' },
    { t: 'image', src: '/crate-assets/send.webp', alt: 'The send screen with uploads, delivery and advanced options on the left and a live preview of the recipient page on the right', caption: 'The send screen.' },

    { t: 'h2', x: 'Building it' },
    { t: 'p', x: 'The upload is honest about two things at once: how far along each file is, and that they have been checked.' },
    { t: 'image', src: '/crate-assets/files.webp', alt: 'The upload card showing 409.2 MB of 10GB used, a file uploading at 75 per cent, and two finished files', caption: 'Files.' },
    { t: 'p', x: 'A link or an email, something to say, and how long the whole thing lives.' },
    { t: 'image', src: '/crate-assets/delivery.webp', alt: 'Delivery options: link or email, a title and message, recipients, and an expiry of three days', caption: 'Delivery.' },
    { t: 'p', x: 'Then the things a sender actually worries about — who can open it, how many times, and whether they can put something back.' },
    { t: 'image', src: '/crate-assets/advanced.webp', alt: 'Advanced options: password protection, download limit, recipient permissions, and email notifications', caption: 'Advanced.' },
    { t: 'p', x: 'And the part the product is really selling: a logo, a banner, colours, type, a button — down to custom CSS for anyone who wants it.' },
    { t: 'image', src: '/crate-assets/customize.webp', alt: 'The customise panel with logo and identity, message, colours, typography, button and custom CSS, over background style choices', caption: 'Customise.' },
    { t: 'p', x: 'The four of them are steps, so the screen never asks for everything at once.' },
    { t: 'image', src: '/crate-assets/steps.webp', alt: 'The same screen with a step rail reading upload, delivery via, advanced and customize, and previous and next buttons', caption: 'Four steps, one screen.' },

    { t: 'h2', x: 'What the other person opens' },
    { t: 'p', x: 'The sender&rsquo;s banner, what is inside, how long it has left, and one button that takes all of it.' },
    { t: 'image', src: '/crate-assets/transfer.webp', alt: 'The recipient page with the transfer title, file count and expiry, a banner image, the file list and a download all button', caption: 'The transfer page.' },
    { t: 'p', x: 'A grid once there are more files than a list wants to hold.' },
    { t: 'image', src: '/crate-assets/grid.webp', alt: 'The same page with the files as a grid of six tiles, each with its size and a download button', caption: 'More files.' },
    { t: 'p', x: 'Dark, because it is a page that gets opened at every hour.' },
    { t: 'image', src: '/crate-assets/dark.webp', alt: 'The recipient page in dark mode, the banner and download button unchanged', caption: 'Dark.' },
    { t: 'p', x: 'And with a colour behind it — the screen the sender started on, wearing what they chose.' },
    { t: 'image', src: '/crate-assets/branded.webp', alt: 'The drop screen on a full-bleed blue ground with the headline in white above it', caption: 'Branded.' },
  ],
});
