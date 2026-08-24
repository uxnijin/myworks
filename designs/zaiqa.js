// ==========================================================================
//  Zaiqa. A design entry — the screens, and a little about them. Prose stays
//  short on purpose.
//
//  Figures: zaiqa-assets/ — frames exported from Figma, laid out three to a
//  board with tools/compose_shots.py, then encoded by tools/prep_figures.py.
//  The repeated footer is cropped off every frame before composing.
//
//  Held back: the desktop set. Those frames still carry the placeholder
//  MyBilling wordmark in the header rather than the Zaiqa mark.
// ==========================================================================

BODY('zaiqa', {
  blocks: [
    { t: 'p', x: 'Black and gold, a serif at the top of every screen, and the food photographed on near-black. The whole thing is dressed like the restaurant rather than like a delivery app.' },

    { t: 'h2', x: 'Ordering' },
    { t: 'p', x: 'Collection or delivery is the first thing in the cart, not a setting buried somewhere, and each carries its own wait: 15 to 25 minutes if you come and get it, 40 to 50 if it comes to you.' },
    { t: 'image', src: '/zaiqa-assets/order.webp', alt: 'The Zaiqa menu with category chips and dish cards, a dish sheet with its sides, and the cart', caption: 'The menu, a dish, the cart.' },
    { t: 'p', x: 'A dish opens with its price, the one line about it you might actually need — <em>contains milk</em> — and then its sides. One is included and the rest are priced on their own row, so the total moves while you tick.' },
    { t: 'p', x: 'Both the dish and the cart carry a comment box, and both say what it is for: delivery instructions, dietary restrictions.' },

    { t: 'h2', x: 'Paying' },
    { t: 'p', x: 'A saved address is a person rather than a label — no Home and Work, just the name of whoever lives at it. A new one can be dropped on a map instead of typed.' },
    { t: 'image', src: '/zaiqa-assets/pay.webp', alt: 'Choosing from saved addresses, adding a new one on a map, and the payment screen with saved cards', caption: 'Address, then card.' },
    { t: 'p', x: 'Then a card, Razorpay or PayPal — or none of them, and you hand it to the driver.' },

    { t: 'h2', x: 'After' },
    { t: 'image', src: '/zaiqa-assets/after.webp', alt: 'The order confirmation, the orders list split into current and past, and one order in full', caption: 'Confirmed, listed, and opened.' },
    { t: 'p', x: 'An order keeps the sides you chose under each line, so a repeat is the same meal and not just the same dish. Which is why the finished order leads with <strong>Repeat Order</strong>.' },

    { t: 'h2', x: 'The rest of it' },
    { t: 'p', x: 'Signing in is a mobile number; signing up ends on a four-digit code with a way to ask for another one.' },
    { t: 'image', src: '/zaiqa-assets/auth.webp', alt: 'Login, sign up, and the four-digit code screen', caption: 'Getting in.' },
    { t: 'p', x: 'A table is booked on the same app as a takeaway, and the account holds the addresses and cards the checkout draws on.' },
    { t: 'image', src: '/zaiqa-assets/more.webp', alt: 'Table booking, account settings closed, and account settings opened onto saved addresses and cards', caption: 'A table, and the account behind the checkout.' },
  ],
});
