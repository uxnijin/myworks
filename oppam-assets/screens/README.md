# Oppam — individual screen captures

Every screen used by the case study, captured 2× (1206 × 2622) from the running
SwiftUI app on an iPhone 17 Pro simulator with the status bar frozen at 9:41.
The 16:9 composites in `oppam-assets/*.webp` are built from these files — the
individual captures are the real deliverable.

Regenerate:

```bash
tools/oppam_capture.sh light        # the main set
tools/oppam_capture_edges.sh light  # every empty and error state
tools/oppam_capture.sh dark         # the same, in lamplight
tools/oppam_capture_edges.sh dark
tools/oppam_figures.sh              # compose the figures and the card thumbnail
```

Both `light/` and `dark/` hold the same filenames. The app is driven entirely
by launch arguments — see `Oppam/DesignSystem/Shots.swift`.

## Onboarding

| File | Screen |
|---|---|
| `01-onboarding-0.png` | Welcome — the sunrise, "I'd like some company" |
| `02-onboarding-1.png` | A name, any name — "I'd rather not say" |
| `03-onboarding-2.png` | Language of the heart |
| `04-onboarding-3.png` | What's sitting with you (optional) |
| `05-onboarding-4.png` | The privacy promise |

## Home

| File | Screen |
|---|---|
| `10-home-morning.png` | Home at morning |
| `11-home-day.png` | Home at midday |
| `12-home-evening.png` | Home in the evening |
| `13-home-night.png` | Home after 9 PM — sleepy companion, lantern |
| `14-checkin.png` | The inner-weather check-in |
| `15-checkin-saved.png` | Check-in saved, with a warm line back |
| `16-breathe.png` | The 4-2-6 breathing exercise, mid-inhale |

## Care and booking

| File | Screen |
|---|---|
| `20-care-start.png` | Care — naming a feeling |
| `21-care-matches.png` | Three introductions, each with its reason |
| `22-therapist.png` | A therapist profile — voice note, "how I work" |
| `23-booking.png` | Booking 1 — choose a rhythm |
| `25-bookingSlot.png` | Booking 2 — when would suit you |
| `26-bookingMode.png` | Booking 3 — video, voice or chat |
| `27-bookingReview.png` | Booking 4 — the itemised bill |
| `24-booking-done.png` | "You're booked" |

## Sessions

| File | Screen |
|---|---|
| `30-session-room.png` | The connected session room |
| `31-history.png` | Session history, rebookable in a tap |

## Pages

| File | Screen |
|---|---|
| `40-pages.png` | Pages — the garden and your entries |
| `41-write.png` | The writing composer |
| `42-letter.png` | A letter to your future self |
| `43-locked-door.png` | The Face-ID door — "these pages are only yours" |

## You, privacy, companion

| File | Screen |
|---|---|
| `50-you.png` | The You tab — deliberately tiny |
| `51-privacy-room.png` | The Privacy Room, with the live notification preview |
| `52-cover.png` | What the app switcher shows |
| `60-moods.png` | The five companion moods, rendered live by the app |

## The therapist console

| File | Screen |
|---|---|
| `70-p-today.png` | Today — who's next, who needs something |
| `71-p-people.png` | People, with care signals |
| `72-p-client.png` | One person's file |
| `73-p-calendar.png` | The week — hours you open yourself |
| `74-p-practice.png` | Practice — identity, earnings, what people said |
| `75-p-earnings.png` | Earnings in full, with the 70/30 split written out |
| `76-p-requests.png` | Incoming first-session requests |
| `77-p-notes.png` | Unfinished notes |
| `78-p-room.png` | The session room from the therapist's chair |
| `79-p-note-write.png` | Writing a session note |
| `7a-p-listing.png` | Your public listing |
| `7b-p-support.png` | Supervision and support |

## Empty and error states

Each is the real state view rendered on its own via `-oppamState <case>`.

| File | Screen |
|---|---|
| `80-edge-offlineBanner.png` | The app-wide offline ribbon |
| `81-edge-offlinePage.png` | A page that couldn't load |
| `82-edge-paymentDeclined.png` | Card declined — nothing charged |
| `83-edge-paymentNetwork.png` | The line dropped mid-payment |
| `84-edge-paymentOffline.png` | Booking with no signal |
| `85-edge-callFailed.png` | The call can't connect |
| `86-edge-emptyUpcoming.png` | Nothing booked yet |
| `87-edge-emptyHistory.png` | No sessions yet |
| `88-edge-emptySearch.png` | Nobody matched the search |
| `89-edge-emptyJournal.png` | Pages, still blank |
| `90-edge-genericError.png` | The gentle catch-all |
