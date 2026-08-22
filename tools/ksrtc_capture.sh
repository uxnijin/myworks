#!/bin/bash
# Capture every KSRTC screen used by the case study, from the running app on an
# iPhone 17 Pro simulator. Individual 2x PNGs first; tools/ksrtc_figures.sh
# composes them into the house 16:9 figures.
#
#   tools/ksrtc_capture.sh light|dark
#
# Note: -openFunnel N deep-links through ResultsView, which must finish a
# simulated-latency search before the funnel pushes. It needs ~11s of settle;
# 4-5s returns a blank frame that looks exactly like a crash.
set -u
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer

DEV=A7537BF7-0DE5-4579-AD53-73356854077A
APP=dev.curiousobjects.KSRTCBooking
MODE="${1:-light}"
OUT="/Users/nijin/Files/Code/portfolio 2/ksrtc-assets/screens/$MODE"
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
  printf '  %-26s %s\n' "$name" "$*"
}

echo "── ksrtc · $MODE ───────────────────────────────────"

# ── Arriving ───────────────────────────────────────────────────────────────
shot 01-onboarding   4 -forceState none
shot 02-home         5 -signedIn -seedRoute TVM EKM
shot 03-results      7 -openResults -seedRoute TVM EKM
shot 04-filters      8 -openResults -seedRoute TVM EKM -ksrtcShot filters
shot 05-sort         8 -openResults -seedRoute TVM EKM -ksrtcShot sort

# ── The funnel — one surface, five steps ───────────────────────────────────
shot 10-seats        12 -openFunnel 0 -seedRoute TVM EKM
shot 11-points       12 -openFunnel 1 -seedRoute TVM EKM
shot 12-passengers   12 -openFunnel 2 -seedRoute TVM EKM
shot 13-review       12 -openFunnel 3 -seedRoute TVM EKM
shot 14-payment      12 -openFunnel 4 -seedRoute TVM EKM

# ── After the money moves ──────────────────────────────────────────────────
shot 20-trips        6 -startTab 1 -seedBookings
shot 21-ticket       8 -startTab 1 -seedBookings -ksrtcShot trip
shot 22-cancel       9 -startTab 1 -seedBookings -ksrtcShot cancel
shot 23-profile      5 -startTab 2 -seedBookings

# ── Rough weather ──────────────────────────────────────────────────────────
shot 30-loading      3 -openResults -seedRoute TVM EKM -forceState loading
shot 31-error        6 -openResults -seedRoute TVM EKM -forceState error
shot 32-empty        6 -openResults -seedRoute TVM EKM -forceState empty
shot 33-trips-empty  6 -startTab 1

xcrun simctl terminate $DEV $APP >/dev/null 2>&1
echo "→ $OUT"
