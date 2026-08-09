# Sprig — onboarding screenshots

20 screens, captured from the running SwiftUI app on an iPhone 17 Pro simulator.
Full resolution, 1206 × 2622 (2×), status bar frozen at 9:41.

Numbered in flow order; each error state sits next to the step it belongs to.

| # | File | Screen |
|---|---|---|
| 01 | `01-splash.png` | Splash |
| 02 | `02-intro.png` | Intro — fanned product shots, three promises |
| 03 | `03-number-empty.png` | Number sheet, Continue disabled |
| 04 | `04-number-filled.png` | Ten digits in, Continue live |
| 05 | `05-number-sending.png` | Sending |
| 06 | `06-error-number-short.png` | Too few digits |
| 07 | `07-code-empty.png` | One-time code, resend counting down |
| 08 | `08-code-sent.png` | Code-sent confirmation |
| 09 | `09-code-typing.png` | Code part-entered |
| 10 | `10-code-validating.png` | Checking the code |
| 11 | `11-error-code-wrong.png` | Code didn't match |
| 12 | `12-error-offline.png` | Couldn't send the code |
| 13 | `13-name-empty.png` | Name — empty |
| 14 | `14-name-filled.png` | Name — filled |
| 15 | `15-address-search.png` | Area search, current-location row |
| 16 | `16-address-results.png` | Search results |
| 17 | `17-map-pin.png` | Drop the pin on a real map |
| 18 | `18-location-refused.png` | Location declined — type the area instead |
| 19 | `19-coach-mark.png` | One coach-mark over the shop |
| 20 | `20-shop.png` | The shop |

Composites live in `images/`, built with `tools/compose_bezels.py`.

## Imagery

Everything on screen is a real photograph or a real map — no illustration
stands in for a product.

**Product photography** — Wikimedia Commons, all cleared for commercial use.
Credits also live beside the files in the app repo at `Sprig/Photos/CREDITS.json`.

| File | Photographer | Licence |
|---|---|---|
| `hero-tulips.jpg` | Scott Wylie | CC BY 2.0 |
| `hero-seedling.jpg` | Petr Smagin | CC BY 4.0 |
| `hero-rose.jpg` | Filo gèn' | CC BY-SA 4.0 |
| `card-rose-red.jpg` | Paolo Neo | Public domain |
| `card-rose-orange.jpg` | Nino Barbieri | CC BY-SA 2.5 |
| `card-peony.jpg` | ImagePerson | CC BY 4.0 |
| `card-monstera.jpg` | Princesleaf | CC BY-SA 3.0 |
| `card-planter.jpg` | Ibnul Karim Rupen | CC BY-SA 3.0 |
| `card-tulip.jpg` | 4028mdk09 | CC BY-SA 3.0 |

**Map** — OpenStreetMap tiles over Kadavanthra, Kochi, stitched into a single
bundled image. © OpenStreetMap contributors, ODbL. The credit is shown on the
map screen itself, as the licence asks.

Source app: `sprig-ios` (SwiftUI). To re-capture a screen:

```
xcrun simctl launch $DEV dev.curiousobjects.Sprig -sShot <name>
xcrun simctl io $DEV screenshot out.png
```
