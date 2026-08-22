#!/bin/bash
# Build every KSRTC case-study figure from the individual captures, in the
# house style: real bezel, plain white 16:9 canvas, no shadow.
set -eu
cd "/Users/nijin/Files/Code/portfolio 2"

L=ksrtc-assets/screens/light
D=ksrtc-assets/screens/dark
TMP=$(mktemp -d)
OUT=ksrtc-assets

fig() {                       # fig <name> <height> <shot…>
  local name="$1"; shift
  local h="$1"; shift
  python3 tools/compose_bezels.py --height "$h" "$TMP/$name.png" "$@" >/dev/null
  cwebp -quiet -q 88 -resize 2400 0 -m 6 "$TMP/$name.png" -o "$OUT/$name.webp"
  printf '  %-20s %s\n' "$name.webp" "$(du -h "$OUT/$name.webp" | cut -f1)"
}

echo "── ksrtc figures ───────────────────────────────────"

fig hero      0.616 $L/02-home.png $L/03-results.png $L/10-seats.png $L/13-review.png $L/21-ticket.png
fig search    0.66  $L/02-home.png $L/03-results.png $L/04-filters.png
fig funnel    0.616 $L/10-seats.png $L/11-points.png $L/12-passengers.png $L/13-review.png $L/14-payment.png
fig seats     0.76  $L/10-seats.png $L/11-points.png
fig money     0.66  $L/13-review.png $L/14-payment.png $L/22-cancel.png
fig after     0.66  $L/20-trips.png $L/21-ticket.png $L/23-profile.png
fig states    0.616 $L/30-loading.png $L/31-error.png $L/32-empty.png $L/33-trips-empty.png
fig dark      0.616 $D/02-home.png $D/10-seats.png $D/13-review.png $D/21-ticket.png $D/20-trips.png

# The card thumbnail — its own composition, see tools/ksrtc_thumb.py
python3 tools/ksrtc_thumb.py >/dev/null
cwebp -quiet -q 90 -resize 1600 0 -m 6 $OUT/thumb.png -o $OUT/thumb.webp
rm -f $OUT/thumb.png
printf '  %-20s %s\n' "thumb.webp" "$(du -h $OUT/thumb.webp | cut -f1)"

rm -rf "$TMP"
echo "→ $OUT"
