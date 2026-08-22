# KSRTC Booking — individual screen captures

Every screen used by the case study, captured 2× (1206 × 2622) from the running
SwiftUI app on an iPhone 17 Pro simulator with the status bar frozen at 9:41.
The 16:9 composites in `ksrtc-assets/*.webp` are built from these files — the
individual captures are the real deliverable.

Regenerate:

```bash
tools/ksrtc_capture.sh light
tools/ksrtc_capture.sh dark
tools/ksrtc_figures.sh      # composes the figures and the card thumbnail
```

`light/` and `dark/` hold the same filenames. The app is driven entirely by
launch arguments — `-signedIn`, `-startTab`, `-seedRoute`, `-openResults`,
`-openFunnel 0..4`, `-forceState`, `-seedBookings`, and the `-ksrtcShot` names
in `KSRTCBooking/App/Shots.swift`.

**`-openFunnel N` needs ~11s of settle**, not 4–5s: it deep-links through
ResultsView, which has to finish a simulated-latency search before the funnel
pushes. At 4.5s every funnel shot comes back blank, which looks exactly like a
crash but is pure timing. Everything else is fine at 5–8s.

**Never run two capture scripts at once.** A second script's terminate/launch
yanks the app out from under the one that is screenshotting.

## Arriving

| File | Screen |
|---|---|
| `01-onboarding.png` | Sign-in |
| `02-home.png` | Home — one connected origin/destination control |
| `03-results.png` | Results, as cards |
| `04-filters.png` | The filter sheet |
| `05-sort.png` | The sort sheet |

## The funnel — one surface, five steps

| File | Screen |
|---|---|
| `10-seats.png` | Choose seats — the deck drawn as a bus |
| `11-points.png` | Boarding and dropping points |
| `12-passengers.png` | One passenger card per seat |
| `13-review.png` | Review, with the fare itemised |
| `14-payment.png` | Payment — the button states the amount |

## After the money moves

| File | Screen |
|---|---|
| `20-trips.png` | My trips — upcoming and past |
| `21-ticket.png` | The ticket: perforation, mono PNR, on-device QR |
| `22-cancel.png` | The cancellation quote, before you commit |
| `23-profile.png` | Profile |

## Rough weather

| File | Screen |
|---|---|
| `30-loading.png` | Results loading — skeletons matching the real row |
| `31-error.png` | Results failed to load |
| `32-empty.png` | No service on this route |
| `33-trips-empty.png` | Trips, with nothing booked |
