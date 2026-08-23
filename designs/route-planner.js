// ==========================================================================
//  Route Planner. A design entry — the screens, and a little about them.
//  Prose stays short on purpose.
//
//  Figures: route-planner-assets/ — supplied slides through
//  tools/prep_figures.py, plus the two blue renders that open and close it.
//  Nothing here is composed from route-planner-assets/screens/ any more.
// ==========================================================================

BODY('route-planner', {
  blocks: [
    { t: 'p', x: 'This is a prototype build: a real iPhone app in SwiftUI, on mock data, with the map drawn from scratch.' },
    {
      t: 'image',
      src: '/route-planner-assets/hero.webp',
      alt: 'Route Planner home, with today\'s route and progress, beside the stop card on the live map',
      caption: 'The day so far, and the stop in front of you.',
    },

    { t: 'h2', x: 'Home is the whole day' },
    { t: 'p', x: 'One screen answers the only two questions a driver has before setting off: how much is left, and when does it end.' },
    {
      t: 'image',
      src: '/route-planner-assets/home.webp',
      alt: 'The home screen: a greeting, the route drawn on a map, and a progress ring reading 15 per cent with two done and eleven left',
      caption: 'Today, at the top.',
    },
    { t: 'p', x: 'Under it the day is four numbers, the van and its fuel, and one button that carries on where you stopped.' },
    {
      t: 'image',
      src: '/route-planner-assets/home-tiles.webp',
      alt: 'Stat tiles for stops and duration, the vehicle card with fuel level, and the Resume Route and Import Route buttons',
      caption: 'Stats, the van, and the way back in.',
    },

    { t: 'h2', x: 'Getting the stops in' },
    { t: 'p', x: 'A dispatcher sends a spreadsheet, but a driver at the depot has a label in front of them and both hands full. So there are five ways in, and the fastest one is whichever is fastest right now.' },
    {
      t: 'image',
      src: '/route-planner-assets/import.webp',
      alt: 'The import screen offering CSV, voice, pasted addresses, label scanning and manual entry, with a note that nothing is added until you confirm',
      caption: 'Five ways in — and nothing is added until you confirm.',
    },
    { t: 'p', x: 'Every address is checked before it can join the route, and the ones that fail say what is wrong with them rather than being dropped quietly.' },
    {
      t: 'image',
      src: '/route-planner-assets/review.webp',
      alt: 'History, settings, and the review screen showing eleven ready, two warnings and one error before adding thirteen stops',
      caption: 'History, settings, and the check before the route exists.',
    },
    { t: 'p', x: 'Then it is a list you can scope — everything, still pending, priority, already delivered — with the next stop held in place.' },
    {
      t: 'image',
      src: '/route-planner-assets/stops.webp',
      alt: 'The stop list with All, Pending, Priority and Delivered filters, and the Start Route button',
      caption: 'The stops, and the button that starts the day.',
    },

    { t: 'h2', x: 'Driving it' },
    { t: 'p', x: 'At the stop the card is reachable with a thumb: who it is, how far, and the four things you might need before you get out.' },
    {
      t: 'image',
      src: '/route-planner-assets/arrive.webp',
      alt: 'The arrival card showing the stop name, distance remaining, call, message, notes and skip, and the Arrive at Stop button',
      caption: 'Arriving.',
    },

    { t: 'h2', x: 'Settings, kept small' },
    { t: 'p', x: 'Three things worth changing and nothing else: what to optimise for, what counts as proof, and how it looks.' },
    {
      t: 'image',
      src: '/route-planner-assets/settings.webp',
      alt: 'Settings: optimise for fastest, shortest or balanced, traffic awareness, photo and signature proof, and appearance',
      caption: 'Settings.',
    },

    { t: 'h2', x: 'Dark' },
    { t: 'p', x: 'The app is dark-first, and a delivery day mostly starts before it is light.' },
    {
      t: 'image',
      src: '/route-planner-assets/dark-home.webp',
      alt: 'The same home screen in dark mode, with the route on a dark map',
      caption: 'Home, dark.',
    },
    {
      t: 'image',
      src: '/route-planner-assets/dark-tiles.webp',
      alt: 'The stat tiles and Resume Route button in dark mode',
      caption: 'And the tiles under it.',
    },
    { t: 'p', x: 'Driving, delivering and looking back all hold together in it — the proof sheet is where a theme usually falls apart.' },
    {
      t: 'image',
      src: '/route-planner-assets/dark-drive.webp',
      alt: 'Dark mode navigation, the delivery proof sheet with photo and signature, and the history screen',
      caption: 'Driving, delivering, and the week behind you.',
    },
    { t: 'p', x: 'The map, the route line and the accent survive the switch. Only the surfaces move.' },
    {
      t: 'image',
      src: '/route-planner-assets/dark.webp',
      alt: 'The same home screen and stop card in dark mode',
      caption: 'The same pair, dark.',
    },
  ],
});
