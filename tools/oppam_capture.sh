#!/bin/bash
# Capture every Oppam screen used by the case study, straight from the running
# app on an iPhone 17 Pro simulator. Individual 2x PNGs first — the composites
# are built from these by tools/compose_bezels.py.
#
#   tools/oppam_capture.sh light   # sunlit set
#   tools/oppam_capture.sh dark    # lamplight set
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

# shot <file> <settle-seconds> <launch args…>
shot() {
  local name="$1"; shift
  local settle="$1"; shift
  xcrun simctl terminate $DEV $APP >/dev/null 2>&1
  xcrun simctl launch $DEV $APP "$@" >/dev/null 2>&1
  sleep "$settle"
  xcrun simctl io $DEV screenshot "$OUT/$name.png" >/dev/null 2>&1
  printf '  %-28s %s\n' "$name" "$*"
}

echo "── $MODE ───────────────────────────────────────────"

# ── Onboarding — the five moments ──────────────────────────────────────────
for i in 0 1 2 3 4; do
  shot "0$((i+1))-onboarding-$i" 3 -oppamSeeker -oppamOnboarding -oppamStep $i
done

# ── Home across the day ────────────────────────────────────────────────────
shot 10-home-morning  3 -oppamDemo -oppamTime morning
shot 11-home-day      3 -oppamDemo -oppamTime day
shot 12-home-evening  3 -oppamDemo -oppamTime evening
shot 13-home-night    3 -oppamDemo -oppamTime night
shot 14-checkin       3 -oppamDemo -oppamShot checkin
shot 15-checkin-saved 3 -oppamDemo -oppamShot checkinSaved
shot 16-breathe       6 -oppamDemo -oppamShot breathe

# ── Care — introduction, not directory ─────────────────────────────────────
shot 20-care-start    3 -oppamDemo -oppamTab care
shot 21-care-matches  3 -oppamDemo -oppamTab care -oppamIntents
shot 22-therapist     4 -oppamDemo -oppamTab care -oppamIntents -oppamShot therapist
shot 23-booking       4 -oppamDemo -oppamTab care -oppamIntents -oppamShot booking
shot 24-booking-done  4 -oppamDemo -oppamTab care -oppamIntents -oppamShot bookingDone

# ── The session ────────────────────────────────────────────────────────────
shot 30-session-room  5 -oppamDemo -oppamShot live
shot 31-history       4 -oppamDemo -oppamTab you -oppamShot history

# ── Pages ──────────────────────────────────────────────────────────────────
shot 40-pages         3 -oppamDemo -oppamTab pages
shot 41-write         4 -oppamDemo -oppamTab pages -oppamShot write
shot 42-letter        4 -oppamDemo -oppamTab pages -oppamShot letter
shot 43-locked-door   3 -oppamDemo -oppamTab pages -oppamShot lock

# ── You & privacy ──────────────────────────────────────────────────────────
shot 50-you           3 -oppamDemo -oppamTab you
shot 51-privacy-room  4 -oppamDemo -oppamTab you -oppamShot privacy
shot 52-cover         3 -oppamDemo -oppamShot cover
shot 60-moods         3 -oppamDemo -oppamShot moods

# ── The therapist console ──────────────────────────────────────────────────
shot 70-p-today       3 -oppamTherapist -oppamPracticeTab today
shot 71-p-people      3 -oppamTherapist -oppamPracticeTab people
shot 72-p-client      4 -oppamTherapist -oppamShot pClient
shot 73-p-calendar    3 -oppamTherapist -oppamPracticeTab calendar
shot 74-p-practice    3 -oppamTherapist -oppamPracticeTab practice
shot 75-p-earnings    4 -oppamTherapist -oppamPracticeTab practice -oppamShot pEarnings
shot 76-p-requests    4 -oppamTherapist -oppamShot pRequests
shot 77-p-notes       4 -oppamTherapist -oppamShot pNotes
shot 78-p-room        5 -oppamTherapist -oppamShot pRoom
shot 79-p-note-write  4 -oppamTherapist -oppamShot pNote
shot 7a-p-listing     4 -oppamTherapist -oppamPracticeTab practice -oppamShot pListing
shot 7b-p-support     4 -oppamTherapist -oppamPracticeTab practice -oppamShot pSupport

xcrun simctl terminate $DEV $APP >/dev/null 2>&1
echo "→ $OUT"
