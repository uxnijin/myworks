# Working on this portfolio

## Figures — the house style

**Every figure is a screenshot of the real running app.** No generated
illustrations, no composed "anatomy" panels, no painted hero banners, no
invented research, pilots, metrics or user quotes. If a claim can't be
screenshotted, cut it or write it as prose.

**Screenshots go into a bezel, on a plain white 16:9 canvas, with no shadow.**

```
Canvas        1920 × 1080, pure white (#FFFFFF), nothing else on it
Bezel         onboarding-assets/iphone-bezels/Bezel.png (852 × 1741)
Screen hole   x 46–804, y 44–1695  → 759 × 1652, matches a 1206 × 2622 2× capture
Phone height  61.6% of the canvas height (665px on a 1080 canvas)
Layout        evenly spaced, centred horizontally and vertically
Shadows       none. No drop shadow, no glow, no gradient canvas, no tint.
```

Build them with `tools/compose_bezels.py` — it does the geometry, so don't
hand-place phones:

```bash
python3 tools/compose_bezels.py out.png 01-splash.png 02-intro.png 03-account.png
```

Five phones per figure reads best; four is fine for a shorter set.

## Screenshots

**Save every screen individually first, then compose.** Nijin makes his own
composites sometimes, so the individual captures are the real deliverable.

```
onboarding-assets/<app>-screens/           individual 2× PNGs, numbered in flow order
onboarding-assets/<app>-screens/images/    the finished 16:9 composites
```

Number the screens in flow order and put each error state next to the step it
belongs to (`09-error-email-unfinished.png` sits after `08-…-sending.png`).
Include a `README.md` in the screens folder mapping every file to its screen.

Capture at 2× on an iPhone 17 Pro simulator, status bar frozen:

```bash
xcrun simctl status_bar $DEV override --time "9:41" --cellularMode active \
  --cellularBars 4 --wifiMode active --wifiBars 3 --batteryState discharging --batteryLevel 92
```

This Mac's `xcode-select` points at CommandLineTools, so the iOS Simulator MCP
refuses. Use `export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`
and drive the simulator through Bash instead — and say so rather than switching
silently.

## Onboarding case studies

**One project per flow.** Each onboarding flow is its own entry in `DESIGNS`
with its own file under `designs/` — they are not collected into a single page.

**One heading and one paragraph is the whole entry.** Around 130 words. Say
what the app is, and why the flow is shaped the way it is. The figures carry
the rest. Long case studies get rejected.

**Never name a reference app or say the flow is derived from anything.** Each
entry is presented as its own design.

**Names:** short, pronounceable English product names. Not Malayalam words.

**Provider marks are the real ones.** SF Symbol `apple.logo` for Apple; Google's
four-colour G from its published outline data — there is an SVG path parser in
the Kili app (`Design/Logos.swift`) to reuse.

## Paywalls

**Opposite rule to onboarding: they all collect on one page.** A paywall is one
or two screens, so `designs/paywalls.js` holds every one of them — a new offer
is an `h2` + a paragraph + its figures, not a new entry in `DESIGNS`. Same
length discipline as onboarding: around 130 words a paywall.

**One app, with a menu.** They all live in `/Users/nijin/Files/Code/paywalls-ios`
(`dev.curiousobjects.Paywalls`, `-pShot`, `-pSelfTest`) under a `Design` enum,
each with its own `Skin` — brand colour, its shade, a second colour, the wash
behind the hero. Shared: tokens, type, the small parts in `Design/Components`.

**Not one layout in six colours.** Each paywall answers a different problem — a
bundle, a quiet two-price switch, a mid-task limit, a comparison table, a tier
list, a one-off purchase — and gets the layout that problem wants. A re-skin
reads as filler. Pick the product to fit the design, as with onboarding.

**Screens live in `paywall-assets/<app>-screens/`** with the composites in
`images/` beside them, same as onboarding.

**Derive every number, then assert it.** A wrong number on a paywall is a
refund, so the monthly equivalent, the saving on the badge and the charge date
are computed from the prices in `Model/Offer.swift`, never typed into a label —
and `-pSelfTest` fails if they drift. Pin "today" to a fixed date so a
re-capture says the same thing.

**Capture the states either side of the button** — a plan switched, restore
with nothing to restore, a declined card. They're the part that makes it a
design rather than a poster.

**No confirmation screens.** What happens once the money moves belongs to the
app being sold, not to the paywall, and a "you're in" screen per paywall is the
same screen over and over. A paywall stops at the button.

**Two screens is a fine figure** — compose it with `--height 0.76` so the
phones fill the canvas instead of floating in white.

The onboarding rules about never naming a reference app, and about short
pronounceable English names, apply here too — and go further: a reference is a
style to learn from, never a composition to reproduce. The published original
has to be unrecognisable in the result.

## Adding a design entry

1. `designs/<slug>.js` exporting `const DESIGN_<NAME> = { … }`
2. `<script src="/designs/<slug>.js"></script>` in `index.html`, before `data.js`
3. Push `DESIGN_<NAME>` into the `DESIGNS` array in `data.js`
4. A new `category` also needs adding to the order list in `renderNav`
   (`script.js`) and to `groupIcons` right below it, or it sorts last with a
   fallback icon.

Block DSL reference is at the top of `data.js`. Callouts are a hairline rule
and a lead-in line — no tinted boxes with an icon in a circle.

## Prototypes

The iOS apps behind the case studies live outside this repo, in
`/Users/nijin/Files/Code/<app>-ios`, and get their own GitHub repo. Note that
`/Users/nijin/Files/Code` is itself a git repo pointing at `uxnijin/parcel-copy`
with a large pile of unrelated pending changes — never push app work through it.

This repo is `uxnijin/myworks` and deploys from `main`.
