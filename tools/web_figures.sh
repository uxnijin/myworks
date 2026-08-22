#!/bin/bash
# Convert desktop web captures into case-study figures.
#
# Unlike the iOS case studies there is no bezel here — a desktop app is a
# desktop app, and the site's own figure frame supplies the border. So this is
# just a resize to 2400px wide and a webp pass.
#
#   tools/web_figures.sh <asset-dir> <name>:<screen> [<name>:<screen> …]
set -eu
cd "/Users/nijin/Files/Code/portfolio 2"

DIR="$1"; shift
for pair in "$@"; do
  name="${pair%%:*}"
  src="${pair#*:}"
  cwebp -quiet -q 86 -resize 2400 0 -m 6 "$DIR/screens/$src.png" -o "$DIR/$name.webp"
  printf '  %-22s %s\n' "$name.webp" "$(du -h "$DIR/$name.webp" | cut -f1)"
done
