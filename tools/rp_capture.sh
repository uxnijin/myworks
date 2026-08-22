#!/bin/bash
# Capture every Route Planner screen used by the case study, from the running
# app on an iPhone 17 Pro simulator. tools/rp_figures.sh composes them.
#
#   tools/rp_capture.sh light|dark
#
# 7s of settle is enough for every screen here. Valid --batteryState values are
# only charging|charged|discharging.
set -u
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer

DEV=A7537BF7-0DE5-4579-AD53-73356854077A
APP=dev.curiousobjects.RoutePlanner
MODE="${1:-light}"
OUT="/Users/nijin/Files/Code/portfolio 2/route-planner-assets/screens/$MODE"
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
  printf '  %-24s %s\n' "$name" "$*"
}

echo "── route planner · $MODE ───────────────────────────"

shot 01-home          7 -startScreen home
shot 02-import        7 -startScreen importRoute
shot 03-review        7 -startScreen reviewImport
shot 04-overview      7 -startScreen routeOverview
shot 05-reorder       7 -startScreen manualReorder
shot 10-driving       8 -startScreen navigation -drivePhase driving
shot 11-arrived       8 -startScreen navigation -drivePhase arrived
shot 20-summary       8 -startScreen summary -simulateProgress
shot 21-history       7 -startScreen history -simulateProgress
shot 22-settings      7 -startScreen settings

xcrun simctl terminate $DEV $APP >/dev/null 2>&1
echo "→ $OUT"
