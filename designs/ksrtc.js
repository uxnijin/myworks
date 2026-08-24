// ==========================================================================
//  KSRTC Booking. A design entry — the screens, and a little about them. Prose stays short on purpose.
// ==========================================================================

BODY('ksrtc', {
  blocks: [
    { t: 'p', x: 'A prototype build: a real iPhone app in SwiftUI, on mock data.' },
    {
      t: 'image',
      src: '/ksrtc-assets/hero.webp',
      alt: 'Five screens from the redesigned KSRTC app: search, results, the seat map, review and the ticket',
      caption: 'Search, results, seats, review, ticket.',
    },
    { t: 'p', x: 'What matters here is what does not move: the trip summary, the progress rail, the total and the dock stay put the whole way down.' },
    {
      t: 'image',
      src: '/ksrtc-assets/funnel.webp',
      alt: 'All five booking steps side by side: seats, boarding and drop, passenger details, review and payment',
      caption: 'The whole funnel, left to right.',
    },
    { t: 'p', x: 'Recent searches and the routes people actually take make the common case one tap.' },
    {
      t: 'image',
      src: '/ksrtc-assets/search.webp',
      alt: 'The home search screen, the results list, and the filter sheet',
      caption: 'Home, results, filters.',
    },
    { t: 'p', x: 'Boarding points are landmarks with real time offsets, because that is how you find a bus.' },
    {
      t: 'image',
      src: '/ksrtc-assets/seats.webp',
      alt: 'The seat map beside the boarding and dropping point step',
      caption: 'The deck, and the step after it.',
    },
    { t: 'p', x: 'The fare is itemised, and what a cancellation gives back is shown <em>before</em> you cancel.' },
    {
      t: 'image',
      src: '/ksrtc-assets/money.webp',
      alt: 'The review step with an itemised fare, the payment step, and the cancellation sheet quoting a refund',
      caption: 'Review, payment, the cancellation quote.',
    },
    { t: 'p', x: 'Row subtitles are real counts, so a row tells you whether there is anything behind it before you tap.' },
    {
      t: 'image',
      src: '/ksrtc-assets/after.webp',
      alt: 'The My Trips list, the ticket, and the profile screen',
      caption: 'Trips, ticket, profile.',
    },
    { t: 'p', x: 'Loading, empty and error are drawn as screens too. Results needs two different empty states, because no service on a route and filters that excluded everything are different problems.' },
    {
      t: 'image',
      src: '/ksrtc-assets/states.webp',
      alt: 'The results screen loading, in error, and empty, plus the empty trips list',
      caption: 'Loading, error, and two kinds of empty.',
    },
    { t: 'p', x: 'The same tokens on a separate ramp. The seat states have to keep their meaning in both, which is the real test.' },
    {
      t: 'image',
      src: '/ksrtc-assets/dark.webp',
      alt: 'Home, the seat map, review, the ticket and trips in dark mode',
      caption: 'Dark.',
    },
  ],
});
