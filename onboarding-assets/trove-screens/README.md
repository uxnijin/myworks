# Trove — onboarding screenshots

14 screens, captured from the running SwiftUI app on an iPhone 17 Pro simulator.
Full resolution, 1206 × 2622 (2×), status bar frozen at 9:41.

Numbered in flow order; each error state sits next to the step it belongs to.

| # | File | Screen |
|---|---|---|
| 01 | `01-splash.png` | Splash |
| 02 | `02-welcome.png` | Welcome |
| 03 | `03-sign-in.png` | Sign-in sheet — empty, Continue disabled |
| 04 | `04-sign-in-typed.png` | Address entered, Continue live |
| 05 | `05-sign-in-sending.png` | Sending |
| 06 | `06-error-email-unfinished.png` | Unfinished domain |
| 07 | `07-code-empty.png` | Six-digit code, resend counting down |
| 08 | `08-code-filling.png` | Code part-entered |
| 09 | `09-error-code-wrong.png` | Code didn't match |
| 10 | `10-code-resend-live.png` | Cooldown finished, resend available |
| 11 | `11-error-offline.png` | Couldn't send the code |
| 12 | `12-verifying.png` | Verifying |
| 13 | `13-success.png` | Signed in |
| 14 | `14-home.png` | Home — empty collection |

Composites live in `images/`, built with `tools/compose_bezels.py`.

Source app: `trove-ios` (SwiftUI). To re-capture a screen:

```
xcrun simctl launch $DEV dev.curiousobjects.Trove -tShot <name>
xcrun simctl io $DEV screenshot out.png
```
