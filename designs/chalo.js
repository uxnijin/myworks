// ==========================================================================
//  Chalo. A design entry — the screens, and a little about them. Prose stays
//  short on purpose.
//
//  Figures: chalo-assets/ — supplied slides, run through
//  tools/prep_figures.py. Left out: the Insurance and Food Order sheets,
//  which are empty apart from a stock advert carrying a real business's
//  phone number.
// ==========================================================================

BODY('chalo', {
  blocks: [
    { t: 'p', x: 'A design rather than a build: these are the screens as drawn, not captures of a running app.' },
    { t: 'p', x: 'The mark is a folded map inside a speech bubble, which is the product in one shape: the map answers, but you get at it by asking.' },
    { t: 'image', src: '/chalo-assets/splash.webp', alt: 'The Chalo splash screen: a white map-in-a-speech-bubble mark on blue', caption: 'Splash.' },

    { t: 'h2', x: 'The app' },
    { t: 'p', x: 'Home is three ways of looking at the same place: things to do, places to go, and how to get there.' },
    { t: 'image', src: '/chalo-assets/home.webp', alt: 'Chalo home on the Activities tab: search, three category tabs, a Manali banner and a Nearby row', caption: 'Home, on Activities.' },
    { t: 'p', x: 'Under that it is rows you keep scrolling, over four tabs that never move.' },
    { t: 'image', src: '/chalo-assets/nearby.webp', alt: 'The Nearby and Most People Tried rows, with the Explore, Saved, Trips and Profile tab bar', caption: 'Nearby, and the tab bar.' },
    { t: 'p', x: 'Destinations leads with a picture and Travel leads with a form, because they are not the same question.' },
    { t: 'image', src: '/chalo-assets/destinations.webp', alt: 'The Destinations tab with a Taj Mahal hero, beside the Travel tab showing a bus search', caption: 'Destinations, and Travel.' },
    { t: 'p', x: 'Open one of them and it is a page: what the place is, then the guides, stays and restaurants attached to it.' },
    { t: 'image', src: '/chalo-assets/destination.webp', alt: 'A destination sheet for Jal Mahal with Overview, Guides, Stays and Restaurants tabs over a full-width photograph', caption: 'A destination, opened.' },

    { t: 'h2', x: 'The advisor' },
    { t: 'p', x: 'It has its own mark and sits a tap from the search bar, so asking is never further away than searching.' },
    { t: 'image', src: '/chalo-assets/ask-advisor.webp', alt: 'The Ask Advisor mark on blue, beside the home header where the Ask Advisor pill sits next to the search field', caption: 'Ask Advisor.' },
    { t: 'p', x: 'You describe the trip in a sentence (where, roughly when, who with) and it comes back with the follow-ups a good travel agent would ask before promising anything.' },
    { t: 'image', src: '/chalo-assets/advisor.webp', alt: 'The Chalo Advisor chat answering a request for four days in Delhi, and the empty chat with sponsored trip cards', caption: 'The advisor, asked about Delhi.' },
    { t: 'p', x: 'Chat and Explore are the same advisor in two moods: one talks, one shows.' },
    { t: 'image', src: '/chalo-assets/advisor-header.webp', alt: 'The advisor header with the Chat and Explore toggle above two sponsored trip cards', caption: 'Chat, and Explore.' },
    { t: 'p', x: 'A reply carries things you can keep, and the questions you were going to ask next anyway.' },
    { t: 'image', src: '/chalo-assets/suggestions.webp', alt: 'A You might like carousel and You might want to ask suggestion chips under a chat reply', caption: 'Under a reply.' },
    { t: 'p', x: 'Explore is the same knowledge laid out to browse (attractions, stays, restaurants) rather than asked for.' },
    { t: 'image', src: '/chalo-assets/explore.webp', alt: 'The Explore tab with category chips and rated result cards for stays and restaurants', caption: 'Explore.' },
    { t: 'p', x: 'Every card can be liked or dropped into a trip without opening it.' },
    { t: 'image', src: '/chalo-assets/explore-cards.webp', alt: 'Attraction cards for Humayun’s Tomb and the Lotus Temple, each with a heart and a plus', caption: 'Heart, and plus.' },
    { t: 'p', x: 'Getting there is a bus, a flight, a car or a train, and the results say which of them are paid placements.' },
    { t: 'image', src: '/chalo-assets/travel.webp', alt: 'Activity category chips beside the travel search with bus results, prices and sponsored labels', caption: 'Activities, and the search.' },

    { t: 'h2', x: 'Booking, without leaving the conversation' },
    { t: 'p', x: 'Best or cheapest, then the total, then pay. The itinerary is a card in the chat rather than a handoff to somewhere else.' },
    { t: 'image', src: '/chalo-assets/flights.webp', alt: 'Flight itineraries inside the chat with Best and Cheapest options, and the payment sheet showing the total', caption: 'Flights, and the sheet.' },
    { t: 'p', x: 'The card carries the cancellation terms, the price per person and the button, so nothing has to be looked up somewhere else.' },
    { t: 'image', src: '/chalo-assets/flight-card.webp', alt: 'The flight itinerary card enlarged beside the chat, showing both legs, free cancellation, the price and the Book button', caption: 'The itinerary card.' },

    { t: 'h2', x: 'What you keep' },
    { t: 'p', x: 'Saved is a shelf and Trips is a calendar: what you liked and what you actually committed to are kept apart.' },
    { t: 'image', src: '/chalo-assets/saved.webp', alt: 'Saved restaurants, places and stays, beside the Trips screen with an upcoming booked trip', caption: 'Saved, and Trips.' },
    { t: 'p', x: 'A booked trip is one card: the picture, the rating, where it is and the dates it covers.' },
    { t: 'image', src: '/chalo-assets/trip-card.webp', alt: 'The Trips screen beside an enlarged upcoming trip card showing a rated Delhi tour and its dates', caption: 'A trip, up close.' },
    { t: 'p', x: 'Insurance, emergency help and food sit at the top of the profile: the things you want when the trip is already happening, not while you are planning it.' },
    { t: 'image', src: '/chalo-assets/profile.webp', alt: 'The profile screen with insurance, emergency help and food order shortcuts above account settings', caption: 'Profile.' },
    { t: 'p', x: 'The permission ask says what it is for, and can be closed.' },
    { t: 'image', src: '/chalo-assets/notifications.webp', alt: 'A notifications permission sheet explaining that suggestions are based on current location', caption: 'Notifications.' },

    { t: 'h2', x: 'The other side' },
    { t: 'p', x: 'There is a second app, in green, for the people supplying all of this. Activities and destinations each get their own way in.' },
    { t: 'image', src: '/chalo-assets/partners.webp', alt: 'The Chalo Partners splash in green, with the Activity Partner and Destination Partner variants', caption: 'Chalo Partners.' },
  ],
});
