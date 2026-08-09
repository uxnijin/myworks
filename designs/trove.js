// ============================================================================
//  Trove — onboarding.
//
//  Source app: /Users/nijin/Files/Code/trove-ios (SwiftUI)
//  Screens: onboarding-assets/trove-screens (14 individual 2x captures)
//  Figures: onboarding-assets/trove-screens/images, built with tools/compose_bezels.py
// ============================================================================

const DESIGN_TROVE = {
  slug: 'trove',
  name: 'Trove',
  category: 'Onboarding',
  icon: 'layers',
  tag: 'Onboarding',
  status: 'Prototype',
  summary: 'Buy allocated gold by the gram — sign-in, email verification and a vault that starts at zero.',
  lede: '<strong>Trove</strong> sells allocated gold, silver and platinum from a gram upwards, held in an audited vault. Fourteen onboarding screens, built as a running iOS app.',
  blocks: [
    {
      t: 'p',
      x: 'Signing in is dark and the app is light, because one is a lobby and the other is a ledger. Buying metal is regulated, so verification isn\'t an upsell tucked into settings — it sits under the balance and says plainly that nothing can be bought or sold until it is done. The sign-in lives in a sheet over the welcome screen so closing it never feels like leaving; the code step counts down before it will resend, rather than letting four live codes pile up in one inbox; and the amber takes near-black text instead of white, which is the one place this system parts company with the usual dark-UI habit. Every failure has a screen of its own — an unfinished domain, a code that doesn\'t match, a network that drops mid-verification.',
    },
    { t: 'image', src: '/onboarding-assets/trove-screens/images/trove-01-flow.webp', alt: 'Trove splash, welcome, sign-in sheet and verification code', caption: 'Splash, welcome, sign-in, code.' },
    { t: 'image', src: '/onboarding-assets/trove-screens/images/trove-02-verify.webp', alt: 'Trove code entry, verifying, success and the empty vault', caption: 'Entering, verifying, in, and a vault at zero.' },
    { t: 'image', src: '/onboarding-assets/trove-screens/images/trove-03-states.webp', alt: 'Trove states — sending, unfinished domain, wrong code, resend available and offline', caption: 'Sending, bad domain, wrong code, resend live, offline.' },
  ],
};
