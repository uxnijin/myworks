#!/bin/bash
# Capture every Parcel screen used by the case study, from the running app on
# an iPhone 17 Pro simulator. tools/parcel_figures.sh composes them.
#
#   tools/parcel_capture.sh light|dark
#
# Light is the primary set; dark only appears in the theme figure.
set -u
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer

DEV=A7537BF7-0DE5-4579-AD53-73356854077A
APP=dev.curiousobjects.Parcel
MODE="${1:-light}"
OUT="/Users/nijin/Files/Code/portfolio 2/parcel-assets/screens/$MODE"
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

echo "── parcel · $MODE ──────────────────────────────────"

shot 01-welcome     5 -startScreen welcome
shot 02-auth        5 -startScreen auth
shot 03-home        5 -startScreen home
# The funnel is four steps, 0-3. -bookingStep 4 silently falls back to step 0.
shot 10-booking-0   6 -startScreen booking -bookingStep 0
shot 11-booking-1   6 -startScreen booking -bookingStep 1
shot 12-booking-2   6 -startScreen booking -bookingStep 2
shot 13-booking-3   6 -startScreen booking -bookingStep 3
shot 15-confirm     6 -startScreen confirmation
shot 20-tracking    7 -startScreen tracking
shot 21-rating      6 -startScreen rating
shot 30-activity    5 -startScreen activity
shot 31-history     5 -startScreen history
shot 32-profile     5 -startScreen profile

xcrun simctl terminate $DEV $APP >/dev/null 2>&1
echo "→ $OUT"
