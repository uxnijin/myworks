# Ember — individual screens

The captures the figures in `../` are composed from. Numbered in flow order.
Nothing here is loaded by the site; the figures are, and these are what they
were built out of.

| File | Screen |
|---|---|
| `01-habit-list.png` | The habit list, filtered to Education. Search, category chips, four habits with their streaks, and the tab bar. |
| `02-new-habit-empty.png` | New Habit, untouched — no name, three days on, reminder off, **Create disabled**. |
| `03-new-habit-filled.png` | The same form, filled — named, every day on, reminder on, **Create enabled**. The pair is the point. |
| `04-habit-detail.png` | One habit, full length: the streak ring, the monthly bars, June's calendar with two missed days, and the button. |

Figures in `../`, all 2400x1350 webp through `tools/prep_figures.py`:

| File | From |
|---|---|
| `hero.webp` | the three-phone composite |
| `list.webp` | the list, close |
| `new-habit.webp` | the form, close |
| `streak.webp` | the calendar and the button, close |
| `thumb.webp` | a 16:9 band cut out of `01-habit-list.png` — a card wants filled pixels, and a phone floating on white disappears at that size |

`02` and `03` compose into a two-state figure with
`tools/compose_bezels.py --height 0.76`, but that tool's bezel is the dark one
and these figures use a silver bezel, so the pair is left out rather than shipped
looking like a different set.
