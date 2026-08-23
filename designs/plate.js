// ==========================================================================
//  Plate. A design entry — the screens, and a little about them. Prose stays
//  short on purpose.
//
//  Figures: plate-assets/ — supplied slides through tools/prep_figures.py.
// ==========================================================================

BODY('plate', {
  blocks: [
    { t: 'p', x: 'A concept, and not a built one — these are the screens as drawn.' },
    { t: 'p', x: 'A calorie tracker that is one screen. The week across the top, what is left of the day under it, and everything you have eaten below that.' },
    { t: 'image', src: '/plate-assets/today.webp', alt: 'The Plate today screen held in one hand: a week strip, the calories left for today, and the day’s logged meals', caption: 'Today.' },
    { t: 'p', x: 'The number in the biggest type is what is <em>left</em>, not what has been eaten — that is the one you make the next decision with. Days you logged carry a dot, so the week reads as a habit rather than a calendar.' },
    { t: 'image', src: '/plate-assets/top.webp', alt: 'The week strip with Thursday selected, above a green card reading 780 kcal left for today with carbs, fats and protein bars', caption: 'The top of the screen.' },
    { t: 'p', x: 'Macros sit under it as three bars, because a calorie total on its own does not tell you what to eat next.' },
    { t: 'image', src: '/plate-assets/parts.webp', alt: 'The green summary card and empty meal rows beside a breakfast card holding two logged items', caption: 'The card, and a meal.' },
    { t: 'p', x: 'A meal you have eaten is a photograph, a number and one tag. A meal you have not is a row with a plus in it, and the two look nothing alike — which is the whole navigation.' },
    { t: 'image', src: '/plate-assets/meals.webp', alt: 'Breakfast logged with a chicken salad and an orange juice, above empty rows for lunch and a snack', caption: 'Logged, and not yet.' },
  ],
});
