// ============================================================================
//  Tuck — onboarding.
//
//  Source app: /Users/nijin/Files/Code/tuck-ios (SwiftUI)
//  Screens: onboarding-assets/tuck-screens (22 individual 2x captures)
//  Figures: onboarding-assets/tuck-screens/images, via tools/compose_bezels.py
//  Character, laurels and chart are drawn in SwiftUI; the jar is a real
//  photograph (Wikimedia Commons, CC BY 2.0) credited in the app's CREDITS.json.
// ============================================================================

const DESIGN_TUCK = {
  slug: 'tuck',
  name: 'Tuck',
  category: 'Onboarding',
  icon: 'zap',
  tag: 'Onboarding',
  status: 'Prototype',
  summary: 'A savings app that puts a little away each week — a six-question setup with a character to carry it.',
  lede: '<strong>Tuck</strong> moves a small amount into a pot every week, on the day money actually arrives. Twenty-two onboarding screens, built as a running iOS app.',
  blocks: [
    {
      t: 'p',
      x: 'Six questions is a long way to ask somebody to walk, so the flow is built to feel short rather than to be short: one rail that never hides, one question a screen, and a character who turns up between steps to say something and ask for nothing. The questions earn their place — how often you get paid genuinely changes the weekly amount, and the plan screen shows the arithmetic rather than a promise. Money apps are also where dark patterns live, so the two screens before sign-up are the honest ones: what the connection can and cannot do, and a timeline saying exactly when the first pound moves. Every failure has a screen, and "none of the above" clears the rest, because both cannot be true.',
    },
    { t: 'image', src: '/onboarding-assets/tuck-screens/images/tuck-01-intro.webp', alt: 'Tuck splash, welcome, claims and the first question', caption: 'Splash, welcome, claims, the first question.' },
    { t: 'image', src: '/onboarding-assets/tuck-screens/images/tuck-02-quiz.webp', alt: 'Tuck payday, name, greeting and multi-select steps', caption: 'How you get paid, your name, hello, and the rest.' },
    { t: 'image', src: '/onboarding-assets/tuck-screens/images/tuck-03-value.webp', alt: 'Tuck encouragement, chart, weekly plan, account connection and round-ups', caption: 'A breath, the argument, the number, the two permissions.' },
    { t: 'image', src: '/onboarding-assets/tuck-screens/images/tuck-04-finish.webp', alt: 'Tuck timeline, sign-in and three error states', caption: 'When things happen, signing in, and what goes wrong.' },
  ],
};
