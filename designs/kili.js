// ============================================================================
//  Kili — onboarding.
//
//  Source app: /Users/nijin/Files/Code/kili-ios (SwiftUI) → github.com/uxnijin/kili
//  Screens: onboarding-assets/kili-screens (27 individual 2x captures)
//  Figures: onboarding-assets/kili-screens/images
// ============================================================================

const DESIGN_KILI = {
  slug: 'kili',
  name: 'Kili',
  category: 'Onboarding',
  icon: 'globe',
  tag: 'Onboarding',
  status: 'Prototype',
  summary: 'A language app you learn by speaking — twelve onboarding screens and every state that isn\'t the happy path.',
  lede: '<strong>Kili</strong> teaches a language by making you speak it — ten minutes, one conversation a day. Twelve onboarding screens, built as a running iOS app so every state can be seen rather than described.',
  blocks: [
    {
      t: 'p',
      x: 'Nothing personal is asked until there is an account to attach it to, and after that every question says on its own screen where the answer goes — the name is public, the birthday sets the starting level and never appears on the profile, the level is never shown to other learners. The states that usually get left to the operating system are drawn as well: an address that already has an account, a code that doesn\'t match, an under-13 birthday that actually branches, and a dead network that keeps what you typed.',
    },
    { t: 'image', src: '/onboarding-assets/kili-screens/images/kili-01.webp', alt: 'Kili splash and the four intro slides' },
    { t: 'image', src: '/onboarding-assets/kili-screens/images/kili-02.webp', alt: 'Kili account creation and email verification' },
    { t: 'image', src: '/onboarding-assets/kili-screens/images/kili-03.webp', alt: 'Kili name, birthday and level steps' },
    { t: 'image', src: '/onboarding-assets/kili-screens/images/kili-04.webp', alt: 'Kili language grid, daily minutes and the finished setup' },
    { t: 'image', src: '/onboarding-assets/kili-screens/images/kili-05.webp', alt: 'Kili error states' },
    { t: 'image', src: '/onboarding-assets/kili-screens/images/kili-06.webp', alt: 'Kili onboarding screens' },
  ],
};
