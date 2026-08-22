# Parcel — individual screen captures

2× (1206 × 2622) captures from the running SwiftUI app on an iPhone 17 Pro
simulator, status bar frozen at 9:41. The composites in `parcel-assets/*.webp`
are built from these — the individual captures are the real deliverable.

```bash
tools/parcel_capture.sh light
tools/parcel_capture.sh dark
tools/parcel_figures.sh      # composes the figures and the card thumbnail
```

Light is the primary set; dark appears only in the theme figure. Driven by
`-startScreen welcome|auth|home|activity|history|profile|tracking|booking|confirmation|rating`
and `-bookingStep 0..3`.

**The funnel is four steps, 0–3.** `-bookingStep 4` silently falls back to step
0, which looks like a working capture until you read the header.

| File | Screen |
|---|---|
| `01-welcome.png` | Welcome |
| `02-auth.png` | Phone sign-in |
| `03-home.png` | Home — leads with the shipment in flight |
| `10-booking-0.png` | Booking 1/4 — pickup |
| `11-booking-1.png` | Booking 2/4 — receiver |
| `12-booking-2.png` | Booking 3/4 — the parcel |
| `13-booking-3.png` | Booking 4/4 — review and pay |
| `15-confirm.png` | "Your package is booked" |
| `20-tracking.png` | Live tracking on the hand-drawn map |
| `21-rating.png` | The rating prompt |
| `30-activity.png` | Activity |
| `31-history.png` | Shipment history |
| `32-profile.png` | Profile |
