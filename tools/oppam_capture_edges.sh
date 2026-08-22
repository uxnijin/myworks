#!/bin/bash
# The rough-weather set: every empty and error state, rendered on its own from
# the real state views (-oppamState), plus the lamplight subset.
#
#   tools/oppam_capture_edges.sh light
#   tools/oppam_capture_edges.sh dark
set -u
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer

DEV=A7537BF7-0DE5-4579-AD53-73356854077A
APP=dev.curiousobjects.Oppam
MODE="${1:-light}"
OUT="/Users/nijin/Files/Code/portfolio 2/oppam-assets/screens/$MODE"
mkdir -p "$OUT"

xcrun simctl ui $DEV appearance "$MODE" >/dev/null 2>&1
xcrun simctl status_bar $DEV override --time "9:41" --cellularMode active \
  --cellularBars 4 --wifiMode active --wifiBars 3 \
  --batteryState discharging --batteryLevel 92 >/dev/null 2>&1

shot() {
  local name="$1"; shift
  local settle="$1"; shift
  xcrun simctl terminate $DEV $APP >/dev/null 2>&1
  xcrun simctl launch $DEV $APP "$@" >/dev/null 2>&1
  sleep "$settle"
  xcrun simctl io $DEV screenshot "$OUT/$name.png" >/dev/null 2>&1
  printf '  %-28s %s\n' "$name" "$*"
}

echo "── edges · $MODE ───────────────────────────────────"

n=80
for state in offlineBanner offlinePage paymentDeclined paymentNetwork \
             paymentOffline callFailed emptyUpcoming emptyHistory \
             emptySearch emptyJournal genericError; do
  shot "$n-edge-$state" 2.5 -oppamDemo -oppamState "$state"
  n=$((n+1))
done

xcrun simctl terminate $DEV $APP >/dev/null 2>&1
echo "→ $OUT"
