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
