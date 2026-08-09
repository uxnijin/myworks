# Tuck — onboarding screenshots

22 screens, captured from the running SwiftUI app on an iPhone 17 Pro simulator.
Full resolution, 1206 × 2622 (2×), status bar frozen at 9:41.

Numbered in flow order; each error state sits next to the step it belongs to.

| # | File | Screen |
|---|---|---|
| 01 | `01-splash.png` | Splash |
| 02 | `02-welcome.png` | Welcome — what people save for, in orbit |
| 03 | `03-claims.png` | Two claims the app can keep |
| 04 | `04-goal-empty.png` | Goal — nothing chosen, Next disabled |
| 05 | `05-goal-selected.png` | Goal — chosen |
| 06 | `06-payday-empty.png` | How often money arrives |
| 07 | `07-payday-selected.png` | — chosen |
| 08 | `08-name-empty.png` | Name — empty |
| 09 | `09-name-filled.png` | Name — filled |
| 10 | `10-error-name-short.png` | One letter isn't a name |
| 11 | `11-greeting.png` | The character says hello |
| 12 | `12-extras-empty.png` | Multi-select — nothing chosen |
| 13 | `13-extras-selected.png` | Several chosen |
| 14 | `14-extras-none-of-above.png` | "None of the above" clears the rest |
| 15 | `15-cheer.png` | The dark beat |
| 16 | `16-chart.png` | Little-and-often against one big month |
| 17 | `17-plan.png` | The weekly amount |
| 18 | `18-connect-account.png` | Connect the account you're paid into |
| 19 | `19-round-ups.png` | Round-ups, shown in a phone |
| 20 | `20-timeline.png` | What happens and when |
| 21 | `21-sign-in.png` | Apple / Google / email |
| 22 | `22-error-offline.png` | Offline |

Composites live in `images/`, built with `tools/compose_bezels.py`.

## Imagery

The character, the laurels and the chart are drawn in SwiftUI — no image assets,
so they stay sharp at any size and recolour with the screen they land on.

The jar on the round-ups screen is a real photograph: Wikimedia Commons,
CC BY 2.0, credited in the app repo at `Tuck/Photos/CREDITS.json`. The badges
over it are the actual UI at the size it ships.

The provider marks are the real ones — SF Symbols for Apple, Google's
four-colour G from its published outline data.

Source app: `tuck-ios` (SwiftUI). To re-capture a screen:

```
xcrun simctl launch $DEV dev.curiousobjects.Tuck -kShot <name>
xcrun simctl io $DEV screenshot out.png
```
