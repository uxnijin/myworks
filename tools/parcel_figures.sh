#!/bin/bash
# Build the Parcel case-study figures. House style: real bezel, plain white
# 16:9 canvas, no shadow. Light is the primary set; dark only appears in the
# theme figure.
set -eu
cd "/Users/nijin/Files/Code/portfolio 2"

L=parcel-assets/screens/light
D=parcel-assets/screens/dark
TMP=$(mktemp -d)
OUT=parcel-assets

fig() {
  local name="$1"; shift
  local h="$1"; shift
  python3 tools/compose_bezels.py --height "$h" "$TMP/$name.png" "$@" >/dev/null
  cwebp -quiet -q 88 -resize 2400 0 -m 6 "$TMP/$name.png" -o "$OUT/$name.webp"
  printf '  %-20s %s\n' "$name.webp" "$(du -h "$OUT/$name.webp" | cut -f1)"
}

echo "── parcel figures ──────────────────────────────────"

fig hero      0.616 $L/03-home.png $L/12-booking-2.png $L/13-booking-3.png $L/20-tracking.png $L/15-confirm.png
fig shell     0.66  $L/01-welcome.png $L/02-auth.png $L/03-home.png
fig booking   0.66  $L/10-booking-0.png $L/11-booking-1.png $L/12-booking-2.png $L/13-booking-3.png
fig tracking  0.66  $L/15-confirm.png $L/20-tracking.png $L/21-rating.png
fig after     0.66  $L/30-activity.png $L/31-history.png $L/32-profile.png
fig theme     0.616 $L/03-home.png $D/03-home.png $L/20-tracking.png $D/20-tracking.png

python3 tools/parcel_thumb.py >/dev/null
cwebp -quiet -q 90 -resize 1600 0 -m 6 $OUT/thumb.png -o $OUT/thumb.webp
rm -f $OUT/thumb.png
printf '  %-20s %s\n' "thumb.webp" "$(du -h $OUT/thumb.webp | cut -f1)"

rm -rf "$TMP"
echo "→ $OUT"
