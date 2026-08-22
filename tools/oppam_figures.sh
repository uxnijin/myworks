#!/bin/bash
# Build every Oppam case-study figure from the individual captures, in the
# house style: real bezel, plain white 16:9 canvas, no shadow.
set -eu
cd "/Users/nijin/Files/Code/portfolio 2"

L=oppam-assets/screens/light
D=oppam-assets/screens/dark
TMP=$(mktemp -d)
OUT=oppam-assets

fig() {                       # fig <name> <height> <shot…>
  local name="$1"; shift
  local h="$1"; shift
  python3 tools/compose_bezels.py --height "$h" "$TMP/$name.png" "$@" >/dev/null
  cwebp -quiet -q 88 -resize 2400 0 -m 6 "$TMP/$name.png" -o "$OUT/$name.webp"
  printf '  %-24s %s\n' "$name.webp" "$(du -h "$OUT/$name.webp" | cut -f1)"
}

echo "── figures ─────────────────────────────────────────"

# The story, seeker side
fig hero          0.616 $L/01-onboarding-0.png $L/10-home-morning.png $L/22-therapist.png $L/40-pages.png $L/70-p-today.png
fig onboarding    0.616 $L/01-onboarding-0.png $L/02-onboarding-1.png $L/03-onboarding-2.png $L/04-onboarding-3.png $L/05-onboarding-4.png
fig home-times    0.616 $L/10-home-morning.png $L/11-home-day.png $L/12-home-evening.png $L/13-home-night.png
fig care          0.66  $L/20-care-start.png $L/21-care-matches.png $L/22-therapist.png
fig booking       0.616 $L/23-booking.png $L/25-bookingSlot.png $L/26-bookingMode.png $L/27-bookingReview.png $L/24-booking-done.png
fig session       0.76  $L/30-session-room.png $L/31-history.png
fig pages         0.66  $L/40-pages.png $L/41-write.png $L/42-letter.png
fig privacy       0.616 $L/43-locked-door.png $L/51-privacy-room.png $L/52-cover.png $L/50-you.png
fig companion     0.66  $L/60-moods.png $L/16-breathe.png $L/13-home-night.png

# The therapist console
fig practice-day  0.616 $L/70-p-today.png $L/76-p-requests.png $L/78-p-room.png $L/79-p-note-write.png
fig practice-people 0.66 $L/71-p-people.png $L/72-p-client.png $L/77-p-notes.png
fig practice-work 0.616 $L/73-p-calendar.png $L/74-p-practice.png $L/75-p-earnings.png $L/7a-p-listing.png $L/7b-p-support.png

# Rough weather
fig edges         0.616 $L/81-edge-offlinePage.png $L/82-edge-paymentDeclined.png $L/83-edge-paymentNetwork.png $L/85-edge-callFailed.png $L/90-edge-genericError.png
fig empties       0.616 $L/80-edge-offlineBanner.png $L/86-edge-emptyUpcoming.png $L/87-edge-emptyHistory.png $L/88-edge-emptySearch.png $L/89-edge-emptyJournal.png

# Lamplight
fig dark          0.616 $D/13-home-night.png $D/21-care-matches.png $D/22-therapist.png $D/40-pages.png $D/51-privacy-room.png
fig dark-practice 0.616 $D/70-p-today.png $D/72-p-client.png $D/30-session-room.png $D/24-booking-done.png $D/81-edge-offlinePage.png

# The card thumbnail — its own composition, see the note in the script
python3 tools/oppam_thumb.py >/dev/null
cwebp -quiet -q 90 -resize 1600 0 -m 6 oppam-assets/thumb.png -o oppam-assets/thumb.webp
rm -f oppam-assets/thumb.png
printf '  %-24s %s\n' "thumb.webp" "$(du -h oppam-assets/thumb.webp | cut -f1)"

rm -rf "$TMP"
echo "→ $OUT"
