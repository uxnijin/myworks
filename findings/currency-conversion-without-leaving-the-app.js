// ============================================================================
//  Currency conversion without leaving the app — a finding.
// ============================================================================

BODY('currency-conversion-without-leaving-the-app', {
  blocks: [
    { t: 'h2', x: 'Finding' },
    { t: 'p', x: 'When we see an amount in another currency, we usually have to copy it, open Google, paste it, and check the conversion.' },
    { t: 'p', x: "That's a lot of steps for something very simple." },

    { t: 'h2', x: 'Idea' },
    { t: 'p', x: 'When we select or long press an amount, the normal copy/paste menu could also show the converted value in our preferred currency.' },
    { t: 'p', x: '<strong>$100 → ₹8,700</strong>' },
    { t: 'p', x: 'So we can understand the amount immediately without leaving the app or website.' },
    { t: 'demo', kind: 'currency' },

    { t: 'h2', x: 'Example' },
    { t: 'p', x: 'Imagine reading a travel website with a hotel price of $120.' },
    { t: 'p', x: 'Instead of copying it and searching for the conversion, I could long press the amount and immediately see:' },
    { t: 'p', x: '<strong>$120 → ₹10,440</strong>' },
    { t: 'p', x: "The currency can be based on the user's preferred currency or region settings." },

    { t: 'h2', x: 'Why I like it' },
    { t: 'p', x: 'This could be useful across websites, apps, messages, shopping, travel, and many other places.' },
    { t: 'p', x: "It removes a small but repeated task from the user's workflow." },
  ],
});
