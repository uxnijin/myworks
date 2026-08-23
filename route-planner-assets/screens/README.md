# Route Planner — individual screen captures

Every screen used by the case study, captured 2× (1206 × 2622) from the running
SwiftUI app on an iPhone 17 Pro simulator with the status bar frozen at 9:41.
**None of the figures on the site are composed from these files any more.**
Every figure in `route-planner-assets/*.webp` is now a supplied slide, prepared
with `tools/prep_figures.py` — the same screens, framed better, plus close-ups
and a full dark set that the composites never had. `tools/rp_figures.sh` and
`tools/rp_thumb.py` are deleted rather than left lying around, because running
either one would have overwritten every figure with the old look; `git log` has
them if the capture pipeline is ever wanted back.

These captures are still the real deliverable and still worth keeping: they are
the running app, and `rp_capture.sh` still regenerates them.

Regenerate:

```bash
tools/rp_capture.sh light
tools/rp_capture.sh dark
```

**The app is dark-first**, so `dark/` is the primary set — every figure except
the theme comparison is built from it. `light/` exists for that comparison and
to prove the tokens resolve.

Driven entirely by launch arguments (`AppStore.applyLaunchArguments`):
`-startScreen home|importRoute|reviewImport|routeOverview|manualReorder|navigation|summary|history|settings`,
`-drivePhase driving|arrived`, and `-simulateProgress`, which fast-forwards the
day so the summary and history have real numbers in them. 7s of settle is
enough for every screen.

Valid `--batteryState` values are only `charging|charged|discharging`;
`discharged` errors out.

| File | Screen |
|---|---|
| `01-home.png` | Home — what today is |
| `02-import.png` | Import Route — five ways in |
| `03-review.png` | Review, leading with what is broken |
| `04-overview.png` | The route overview, line drawn |
| `05-reorder.png` | Drag to re-sequence |
| `10-driving.png` | Navigation, driving |
| `11-arrived.png` | The arrival sheet — both outcomes at equal reach |
| `20-summary.png` | End-of-day recap |
| `21-history.png` | The last seven working days |
| `22-settings.png` | Settings, deliberately small |

**No launch argument reaches the failed-delivery reason grid or the delivery
details sheet** — they need real taps, so they are not in the figure set.
