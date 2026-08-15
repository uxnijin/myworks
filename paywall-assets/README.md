# Paywall screenshots

Six paywalls, captured from the running SwiftUI app (`paywalls-ios`) on an
iPhone 17 Pro simulator. Full resolution, 1206 × 2622 (2×), status bar frozen
at 9:41.

| Folder | Paywall | What it is |
|---|---|---|
| `stride-screens/` | Stride + Tempo | A two-app bundle sold on the gap between two prices |
| `hush-screens/` | Hush | Dark and quiet, one switch between two prices |
| `sift-screens/` | Sift | The free allowance ran out mid-task |
| `atlas-screens/` | Atlas | Free against paid, line by line |
| `chorus-screens/` | Chorus | Three tiers, priced per person |
| `grain-screens/` | Grain | No subscription — bought once |

`menu.png` is the gallery's own menu, listing all six. It isn't part of any
offer, so it lives here rather than in one of the folders.

Each folder has its screens numbered in flow order, a `README.md` mapping every
file to its screen, and the composites in `images/` built with
`tools/compose_bezels.py`.

**None of them ends on a confirmation screen.** What happens once the money
moves belongs to the app being sold, not to the paywall — and six "you're in"
screens would have been the same screen six times.

## The numbers

Nothing on any of these screens is typed into a label. Monthly equivalents,
savings, per-person prices, renewal and charge dates are all computed from the
prices in the app, and `-pSelfTest` asserts them — 51 checks, including that a
discount is never rounded up and that a comparison table never has a row in the
free column that's missing from the paid one.

"Today" is pinned to 9 August 2026 so a re-capture says the same dates.

## Imagery

Everything drawn: app tiles and their glyphs, the running-track lanes, the
crescent and its rings, the ridge line and the bars. No image assets, so they
stay sharp at any size and recolour with the skin they land on.

To re-capture a screen:

```
xcrun simctl launch $DEV dev.curiousobjects.Paywalls -pShot atlasTable
xcrun simctl io $DEV screenshot out.png
```
