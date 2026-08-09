# Kili — onboarding screenshots

27 screens, captured from the running SwiftUI app on an iPhone 17 Pro simulator.
Full resolution, 1206 × 2622 (2×), status bar frozen at 9:41.

Numbered in flow order; each error state sits next to the step it belongs to.

| # | File | Screen |
|---|---|---|
| 01 | `01-splash.png` | Splash |
| 02–05 | `02-intro-1` … `05-intro-4` | The four intro slides |
| 06 | `06-create-account.png` | Create an Account — empty, Sign Up disabled |
| 07 | `07-create-account-filled.png` | Email entered, Sign Up live |
| 08 | `08-create-account-sending.png` | Sending |
| 09 | `09-error-email-unfinished.png` | Unfinished domain |
| 10 | `10-error-email-taken.png` | Address already has an account |
| 11 | `11-code-empty.png` | Six-digit code, resend on cooldown |
| 12 | `12-code-filled.png` | Code complete |
| 13 | `13-error-code-wrong.png` | Code didn't match |
| 14 | `14-error-offline.png` | Couldn't send the code |
| 15 | `15-name-empty.png` | Name — empty |
| 16 | `16-name-filled.png` | Name — filled |
| 17 | `17-birthday-empty.png` | Birthday — empty |
| 18 | `18-birthday-picker.png` | Choose Date of Birth dialog |
| 19 | `19-birthday-filled.png` | Birthday — set |
| 20 | `20-age-gate-under-13.png` | Under-13 gate |
| 21 | `21-level-empty.png` | Level — nothing chosen |
| 22 | `22-level-selected.png` | Level — chosen |
| 23 | `23-languages-empty.png` | Language grid — nothing chosen |
| 24 | `24-languages-selected.png` | Language grid — three chosen |
| 25 | `25-daily-minutes.png` | Daily minutes |
| 26 | `26-ready.png` | Setup complete |
| 27 | `27-home.png` | Home |

Source app: `kili-ios` (SwiftUI). To re-capture a screen:

```
xcrun simctl launch $DEV dev.curiousobjects.Kili -kShot <name>
xcrun simctl io $DEV screenshot out.png
```
