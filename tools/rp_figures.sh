#!/bin/bash
# Build the Route Planner case-study figures. House style: real bezel, plain
# white 16:9 canvas, no shadow.
#
# Light is the primary set. The app was designed dark-first, but on the site the
# figures sit in a white reading column, so light screens sit in it without
# punching a hole in the page. Dark still gets the theme figure and the card
# thumbnail, which is where the app's own look belongs.
set -eu
cd "/Users/nijin/Files/Code/portfolio 2"

L=route-planner-assets/screens/light
D=route-planner-assets/screens/dark
TMP=$(mktemp -d)
OUT=route-planner-assets

fig() {
  local name="$1"; shift
  local h="$1"; shift
  python3 tools/compose_bezels.py --height "$h" "$TMP/$name.png" "$@" >/dev/null
  cwebp -quiet -q 88 -resize 2400 0 -m 6 "$TMP/$name.png" -o "$OUT/$name.webp"
  printf '  %-20s %s\n' "$name.webp" "$(du -h "$OUT/$name.webp" | cut -f1)"
}

echo "── route planner figures ───────────────────────────"

fig hero    0.616 $L/01-home.png $L/04-overview.png $L/10-driving.png $L/11-arrived.png $L/20-summary.png
fig import  0.66  $L/02-import.png $L/03-review.png $L/05-reorder.png
fig drive   0.66  $L/04-overview.png $L/10-driving.png $L/11-arrived.png
fig after   0.66  $L/20-summary.png $L/21-history.png $L/22-settings.png
fig theme   0.616 $L/01-home.png $D/01-home.png $L/10-driving.png $D/10-driving.png

python3 tools/rp_thumb.py >/dev/null
cwebp -quiet -q 90 -resize 1600 0 -m 6 $OUT/thumb.png -o $OUT/thumb.webp
rm -f $OUT/thumb.png
printf '  %-20s %s\n' "thumb.webp" "$(du -h $OUT/thumb.webp | cut -f1)"

rm -rf "$TMP"
echo "→ $OUT"
