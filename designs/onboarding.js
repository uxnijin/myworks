// ============================================================================
//  Onboarding — a running series.
//
//  One page, one entry per flow. Keep each entry to a heading, a short
//  paragraph and the figures — nothing longer.
//
//  Flow 01 source app: /Users/nijin/Files/Code/kili-ios (SwiftUI).
//  Figures are 2x simulator captures; screens pinned with `-kShot <name>`,
//  flow logic covered by `-kSelfTest`.
//
//  Adding flow 02: append an `h2`, a paragraph and its figures, and drop the
//  captures into /onboarding-assets. Nothing else changes.
// ============================================================================

const DESIGN_ONBOARDING = {
  slug: 'onboarding',
  name: 'Onboarding Flows',
  category: 'Onboarding',
  icon: 'play',
  tag: 'Series',
  status: 'Prototype',
  summary: 'Onboarding flows designed and built as running iOS apps — one app per entry.',
  lede: 'Complete onboarding flows, designed and then built as working iOS apps so every screen can be seen rather than described. One entry per app, added as I go.',
  blocks: [

    // ══ 01 — Kili ════════════════════════════════════════════════════════════
    { t: 'h2', x: '01 — Kili, a language app' },
    {
      t: 'p',
      x: '<strong>Kili</strong> teaches a language by making you speak it — ten minutes, one conversation a day. The onboarding is twelve screens for adults learning a second or third language, and it is ordered so that nothing personal is asked until there is an account to attach it to. Each question then says on its own screen where the answer goes: the name is public, the birthday sets the level and never appears on the profile, the level is never shown to other learners. Every state that normally gets left to the operating system is drawn too — a taken email, a wrong code, an under-13 birthday, a dead network.',
    },
    // Drop the finished 16:9 composite in as `src` and this becomes the
    // figure. The 27 source screenshots are in /onboarding-assets/kili-screens.
    {
      t: 'image',
      // src: '/onboarding-assets/kili.webp',
      alt: 'Kili onboarding screens',
      ratio: '16-9',
      caption: 'The twelve screens and their error states.',
    },
  ],
};
