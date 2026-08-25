// ==========================================================================
//  Bizzscribe Shopping. A design entry: the screens, and a little about
//  them. Prose stays short on purpose.
//
//  Figures: bizzscribe-assets/app-*.webp. The web half of the same product
//  is its own entry, designs/bizzscribe-storefront.js.
// ==========================================================================

BODY('bizzscribe-shopping', {
  blocks: [
    { t: 'p', x: 'The same store as an app. A tab bar replaces the top nav, because a thumb reaches the bottom of a phone and not the top of it.' },
    { t: 'image', src: '/bizzscribe-assets/app-home.webp', alt: 'The app home screen with collection tiles, a best sellers row and the bottom tab bar', caption: 'Home.' },
    { t: 'p', x: 'Browsing keeps filter and sort pinned above the grid, so narrowing a hundred results never means leaving them.' },
    { t: 'image', src: '/bizzscribe-assets/app-browse.webp', alt: 'A filtered listing of hoodies with filter and sort controls, beside a category browse screen', caption: 'Browsing.' },
    { t: 'p', x: 'Search remembers what you looked for and what you looked at, which is most of what anyone searches for twice.' },
    { t: 'image', src: '/bizzscribe-assets/app-search.webp', alt: 'The search screen with recent searches and a recently viewed row', caption: 'Search.' },
    { t: 'p', x: 'A shop on Bizzscribe can sell a thing or a booking, so one page shape carries both. What changes is the pair of buttons at the bottom: <strong>Add to cart</strong> and <strong>Buy now</strong> for a hoodie, <strong>Book Now</strong> and <strong>Enquire Now</strong> for a DJ rig. Everything above them stays put, and a merchant who sells both does not learn two products.' },
    { t: 'image', src: '/bizzscribe-assets/app-product.webp', alt: 'A hoodie product page with add to cart and buy now, beside a DJ equipment rental page with book now and enquire now', caption: 'A product, and a service.' },
    { t: 'p', x: 'Checkout is three short screens instead of one long one, and each ends in a single button.' },
    { t: 'image', src: '/bizzscribe-assets/app-cart.webp', alt: 'The cart, the shipping address screen and the add new address form', caption: 'Cart, address.' },
    { t: 'image', src: '/bizzscribe-assets/app-order.webp', alt: 'The order summary, the payment methods screen and the order placed confirmation', caption: 'Pay, and done.' },
    { t: 'p', x: 'Afterwards an order is a row with its status on it, so the answer to <em>where is it</em> needs no tap at all.' },
    { t: 'image', src: '/bizzscribe-assets/app-orders.webp', alt: 'The my orders screen listing delivered orders with prices and dates', caption: 'Orders.' },
    { t: 'image', src: '/bizzscribe-assets/app-account.webp', alt: 'The account screen, the saved addresses list and the login and security screen', caption: 'The account.' },
  ],
});
