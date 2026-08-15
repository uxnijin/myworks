// ============================================================================
//  Paywalls — one page, one entry per offer screen.
//
//  Source app: /Users/nijin/Files/Code/paywalls-ios (SwiftUI)
//  Screens: paywall-assets/<app>-screens (individual 2x captures)
//  Figures: paywall-assets/<app>-screens/images, via tools/compose_bezels.py
//
//  A paywall is one or two screens, so they collect here rather than getting a
//  case study each. Add a new one as an h2 + a paragraph + its figure.
// ============================================================================

const DESIGN_PAYWALLS = {
  slug: 'paywalls',
  name: 'Paywalls',
  category: 'Paywalls',
  icon: 'cart',
  tag: 'Paywalls',
  status: 'Prototype',
  summary: 'Six subscription offer screens, built as running iOS apps — the price, the dates and the states that go wrong.',
  lede: '<strong>Paywalls</strong> collects the screen an app asks you for money on. Six of them, each a running iOS app rather than a mockup, so the arithmetic, the dates and the failures are real.',
  blocks: [
    {
      t: 'p',
      x: 'A paywall is one screen, sometimes two, which is why they collect on one page instead of getting a case study each. They live in a single app with a menu, so a new offer is a new entry rather than a new repository. The six below are not one layout in six colours — a bundle, a switch, an interruption, a table, a tier list and a one-off purchase each want a different screen, and the point of building them all in one place is that the differences are legible side by side.',
    },
    {
      t: 'p',
      x: 'They stop at the button. None of them carries a confirmation screen — the screen after the money moves belongs to the app being sold, not to the paywall, and six of those would have been the same screen six times.',
    },
    {
      t: 'p',
      x: 'What they share is a rule rather than a look: no number is typed into a label. Every monthly equivalent, every saving on a badge, every renewal date and every per-person figure is computed from the prices, and a test run of fifty-one assertions fails if any of them drifts — including one that checks a discount is never rounded up. The other shared rule is that the close button is drawn at full size from the first frame.',
    },

    { t: 'h2', x: 'Stride + Tempo — a bundle' },
    {
      t: 'p',
      x: 'A run tracker and a training-plan app, sold as one subscription. The discount is the whole pitch, so it has to be defensible: the struck-through price is twelve months at the real monthly rate, the 60% is the gap between that and the annual one, and neither is a "was" anybody invented. The two marks sit at the same weight with a plus between them, because neither app is the add-on. Everything a subscription screen is usually vague about is stated instead — the day the money moves, the reminder a week before it, and a plan list that carries the per-month figure beside the per-year one so the cheaper plan isn\'t the one you have to do arithmetic to find.',
    },
    {
      t: 'image',
      src: '/paywall-assets/stride-screens/images/stride-01-offer.webp',
      alt: 'The Stride and Tempo bundle offer, the trial timeline, and the two plans',
      caption: 'The offer, what the trial does to your money and when, and the plans.',
    },
    {
      t: 'p',
      x: 'The states around the button are the honest ones. Switching to monthly changes the fine print, not just the radio. Restoring a purchase that was never made says so rather than spinning. And a declined card says nothing has been charged and that the trial hasn\'t started, and keeps the offer behind it instead of dumping you back at the top.',
    },
    {
      t: 'image',
      src: '/paywall-assets/stride-screens/images/stride-02-states.webp',
      alt: 'The monthly plan picked, restore with nothing to restore, and a declined card',
      caption: 'Monthly picked, nothing to restore, and a card declined.',
    },

    { t: 'h2', x: 'Hush — one switch, two prices' },
    {
      t: 'p',
      x: 'Sleep sounds, so the opposite screen to a sale: nothing on it flashes, because a product you open at midnight can\'t be sold at you in the colours of a discount. There is exactly one decision, and it is two tiles rather than a list — with only two prices, a list of two is a list pretending to be longer. The prices sit above the feature rows on purpose: on a screen this quiet the decision belongs above the fold and the argument for it below. The moon, the rings and the stars are drawn, and the star positions are written down rather than random so a re-capture is the same picture.',
    },
    {
      t: 'image',
      src: '/paywall-assets/hush-screens/images/hush-01.webp',
      alt: 'Hush with the yearly plan selected, and with monthly selected',
      caption: 'Yearly, and monthly — the fine print moves with the choice.',
    },

    { t: 'h2', x: 'Sift — the one you didn\'t go looking for' },
    {
      t: 'p',
      x: 'Nobody opens this paywall. It arrives because the free allowance ran out halfway through a task, which changes what it owes you: it shows what you used as five pips rather than a claim, says the date it comes back, and leaves the thing it interrupted visible behind it. The price is one line and a link, because the decision is small even though the moment isn\'t — the plans only unfold if you ask for them. The way out isn\'t "Maybe later", it\'s the date you\'d be waiting until, which is the same information the sheet is already showing you.',
    },
    {
      t: 'image',
      src: '/paywall-assets/sift-screens/images/sift-01.webp',
      alt: 'Sift limit sheet over the inbox, and the plans unfolded',
      caption: 'The allowance gone, and the plans if you ask for them.',
    },

    { t: 'h2', x: 'Atlas — free against paid, line by line' },
    {
      t: 'p',
      x: 'For the people who scroll past the headline and read the table. The design is the table, so the only thing that makes it worth reading is an honest free column: three of the eight rows are already yours on the free tier, and the test suite refuses a row that\'s in free but missing from Plus. Paid rows sit in a tinted column that runs the height of the table rather than getting a tick each, so the shape of what you\'d be buying is visible before you read a word of it. The price is one sentence under the table and the button repeats the free period, not the price.',
    },
    {
      t: 'image',
      src: '/paywall-assets/atlas-screens/images/atlas-01.webp',
      alt: 'Atlas Plus at the top of the screen, and the comparison table scrolled',
      caption: 'The pitch, and the table it exists to hold.',
    },

    { t: 'h2', x: 'Chorus — the number that matters is per person' },
    {
      t: 'p',
      x: 'Tiered plans are almost always compared on the wrong figure: the tier that costs the most is the cheapest one to be on. So the big number on every card is the price per person, derived from the plan price and the accounts it covers, and the plan\'s own price is demoted to the line underneath. The badge for the cheapest tier is computed rather than assigned, so it moves on its own if a price changes. This is the only one of the six that puts its colour on the wall instead of on a button — a banner is a fair thing to spend when the offer is a household one.',
    },
    {
      t: 'image',
      src: '/paywall-assets/chorus-screens/images/chorus-01.webp',
      alt: 'Chorus tiers with solo selected, and with family selected',
      caption: 'Solo and family — the per-person figure is the one that moves.',
    },

    { t: 'h2', x: 'Grain — bought once' },
    {
      t: 'p',
      x: 'No trial, no discount and no urgency, so there is nothing for a badge to say and the type does the work instead — a serif on paper, which no other screen here gets. What\'s left is the argument: the price, the promise that the archive stays readable as plain files without the app, and the year at which subscribing would have cost more, worked out rather than asserted. The subscription is still offered, and offered properly, because a paywall that hides the cheaper way in isn\'t being generous, it\'s being coy.',
    },
    {
      t: 'image',
      src: '/paywall-assets/grain-screens/images/grain-01.webp',
      alt: 'Grain with the one-off purchase selected, and with the yearly plan selected',
      caption: 'Buy it once, or subscribe instead — offered properly, not hidden.',
    },
  ],
};
