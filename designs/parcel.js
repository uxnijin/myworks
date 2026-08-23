// ==========================================================================
//  Parcel. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('parcel', {
  blocks: [
    { t: 'p', x: 'This is a prototype build: a real iPhone app in SwiftUI, running on mock data, with a hand-drawn map and a live tracking timeline. Every screen below is a capture of it, not a mockup.' },
    {
      t: 'image',
      src: '/parcel-assets/hero.webp',
      alt: 'Five Parcel screens: home, the parcel step, review and pay, live tracking, and the booking confirmation',
      caption: 'Home, two steps of the booking, live tracking, and the pass at the end.',
    },
    { t: 'p', x: 'Home answers <strong>where is my thing</strong> before it asks you for anything.' },
    {
      t: 'image',
      src: '/parcel-assets/shell.webp',
      alt: 'The welcome screen, phone sign-in, and home',
      caption: 'Welcome, sign-in, home.',
    },
    { t: 'p', x: 'Booking is four steps on one surface. The progress rail and the button stay where they are; only the middle of the screen changes.' },
    {
      t: 'image',
      src: '/parcel-assets/booking.webp',
      alt: 'The four booking steps: pickup, receiver, the parcel, and review and pay',
      caption: 'Pickup → receiver → parcel → review.',
    },
    { t: 'p', x: 'Once it is booked, the courier is a named person on a map with a call button, and the timeline fills in as it happens.' },
    {
      t: 'image',
      src: '/parcel-assets/tracking.webp',
      alt: 'The booking confirmation, live tracking with the courier on a map, and the rating prompt',
      caption: 'Booked, in flight, delivered.',
    },
    { t: 'p', x: 'Most people send to the same few places, so history is the fastest way to book the next one.' },
    {
      t: 'image',
      src: '/parcel-assets/after.webp',
      alt: 'Activity, shipment history, and the profile screen',
      caption: 'Activity, history, profile.',
    },
    { t: 'p', x: 'Both appearances are drawn, not inverted.' },
    {
      t: 'image',
      src: '/parcel-assets/theme.webp',
      alt: 'Home and tracking shown in light and dark side by side',
      caption: 'The same two screens, light and dark.',
    },
  ],
});
