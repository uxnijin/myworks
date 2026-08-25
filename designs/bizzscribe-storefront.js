// ==========================================================================
//  Bizzscribe Storefront. A design entry: the screens, and a little about
//  them. Prose stays short on purpose.
//
//  Figures: bizzscribe-assets/web-*.webp. The app half of the same product
//  is its own entry, designs/bizzscribe-shopping.js.
// ==========================================================================

BODY('bizzscribe-storefront', {
  blocks: [
    { t: 'p', x: 'Bizzscribe is a business management platform. This is the shop a business builds on it and hands to its own customers, which is why nothing on the page belongs to Bizzscribe: the wordmark, the colour and the banner are the merchant&rsquo;s.' },
    { t: 'p', x: 'Desktop and phone are drawn together throughout, because a store is not one of them with the other bolted on afterwards.' },
    { t: 'image', src: '/bizzscribe-assets/web-home.webp', alt: 'The storefront home page in a desktop browser and on a phone: a seasonal banner, a collections row and a product grid', caption: 'Home, on both.' },
    { t: 'p', x: 'Categories open as one flat map rather than a menu that unfolds a level at a time. A shopper who knows they want a hoodie should not have to hover their way down to it.' },
    { t: 'image', src: '/bizzscribe-assets/web-menu.webp', alt: 'The categories mega menu showing Women, Men and Kids as columns of tops, outerwear, activewear, bottoms and accessories', caption: 'Everything the shop sells, at once.' },
    { t: 'p', x: 'The product page keeps the picture and the buy button in view together, so choosing a size never scrolls the thing you are buying off the screen.' },
    { t: 'image', src: '/bizzscribe-assets/web-product.webp', alt: 'A product page on desktop and phone: gallery, price, rating, size and colour, and the add to cart button', caption: 'A product.' },
    { t: 'p', x: 'Below it the reviews carry the ratings breakdown and an ordering-help panel, since the questions that stop a sale are answered on the page or not at all.' },
    { t: 'image', src: '/bizzscribe-assets/web-reviews.webp', alt: 'The product description, the ratings breakdown, the need-ordering-help panel and a row of related products', caption: 'What is under it.' },
    { t: 'p', x: 'The cart is a panel rather than a page, so adding something does not throw away the grid you were reading.' },
    { t: 'image', src: '/bizzscribe-assets/web-cart.webp', alt: 'The product grid with the cart open as a side panel listing items, the subtotal and a continue to checkout button', caption: 'The cart.' },
    { t: 'image', src: '/bizzscribe-assets/web-wishlist.webp', alt: 'The grid with the wishlist panel open, showing saved items and recently viewed', caption: 'And the wishlist beside it.' },
    { t: 'p', x: 'The account holds the two things a returning customer comes back for: where to send it, and how to pay.' },
    { t: 'image', src: '/bizzscribe-assets/web-account.webp', alt: 'The account page on desktop and phone with personal details, saved addresses, cards and login security', caption: 'The account.' },
  ],
});
