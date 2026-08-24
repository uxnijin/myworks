// ============================================================================
//  Sprig — onboarding.
//
//  Source app: /Users/nijin/Files/Code/sprig-ios (SwiftUI)
//  Screens: onboarding-assets/sprig-screens (20 individual 2x captures)
//  Figures: onboarding-assets/sprig-screens/images, via tools/compose_bezels.py
//  Photography: Wikimedia Commons, cleared for commercial use; map tiles from
//  OpenStreetMap. Credits in the screens README and in the app's CREDITS.json.
// ============================================================================

BODY('sprig', {
  blocks: [
    {
      t: 'p',
      x: 'A shop like this is sold by its pictures, so nothing here is an illustration standing in for a product: the fanned cards, the feed and the map are real photographs and real map tiles, and the licences ship with them. The flow asks for a phone number rather than an email because the delivery rider needs one anyway, and it offers the code by call as well as SMS. An SMS that never arrives is the single most common place this step dies. The address step ends on a pin you can move, because "Kadavanthra" is a neighbourhood, not a doorway. Every failure has a screen: too few digits, a wrong code, a dead network, and a refused location that leaves a working shop behind it.',
    },
    { t: 'image', src: '/onboarding-assets/sprig-screens/images/sprig-01-flow.webp', alt: 'Sprig splash, intro, number entry, one-time code and name', caption: 'Splash, intro, number, code, name.' },
    { t: 'image', src: '/onboarding-assets/sprig-screens/images/sprig-02-address.webp', alt: 'Sprig address search, results, map pin, coach mark and the shop', caption: 'Search, results, the pin, one coach-mark, the shop.' },
    { t: 'image', src: '/onboarding-assets/sprig-screens/images/sprig-03-states.webp', alt: 'Sprig states: sending, too few digits, wrong code, offline and location refused', caption: 'Sending, short number, wrong code, offline, location refused.' },
  ],
});
