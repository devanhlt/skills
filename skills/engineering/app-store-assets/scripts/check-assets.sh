#!/usr/bin/env bash
# Checks App Store images before upload: accepted pixel size, no alpha channel, sRGB/RGB, allowed format.
#
#   bash check-assets.sh store/screenshots store/creative     # dirs or files
#
# Exit code 1 if anything fails. Needs ImageMagick 7 (magick) or 6 (identify).
set -uo pipefail

if command -v magick >/dev/null 2>&1; then ID=(magick identify); else ID=(identify); fi

# Accepted sizes (portrait and landscape are both listed where Apple accepts both).
ACCEPTED="
1320x2868 2868x1320 1290x2796 2796x1290 1260x2736 2736x1260 iPhone-6.9
1284x2778 2778x1284 1242x2688 2688x1242 iPhone-6.5
1206x2622 2622x1206 1179x2556 2556x1179 iPhone-6.3
1170x2532 2532x1170 1125x2436 2436x1125 1080x2340 2340x1080 iPhone-6.1
1242x2208 2208x1242 iPhone-5.5
750x1334 1334x750 iPhone-4.7
1398x2034 2034x1398 2007x2853 2853x2007 iPhone-Duo
2064x2752 2752x2064 2048x2732 2732x2048 iPad-13
5244x2950 Universal-creative-PNG-only
3840x1646 Header-21:9
1024x1024 App-icon
"

label_for() {
  local size=$1 line
  while read -r line; do
    [ -z "$line" ] && continue
    for tok in $line; do
      if [ "$tok" = "$size" ]; then echo "${line##* }"; return 0; fi
    done
  done <<< "$ACCEPTED"
  # Search results: any 3:2 from 1920x1280 to 3840x2560. In-App Events: 16:9 or 9:16 within range.
  local w=${size%x*} h=${size#*x}
  if [ $((w * 2)) -eq $((h * 3)) ] && [ "$w" -ge 1920 ] && [ "$w" -le 3840 ]; then echo "Search-results-3:2"; return 0; fi
  if [ $((w * 9)) -eq $((h * 16)) ] && [ "$w" -ge 1920 ] && [ "$w" -le 3840 ]; then echo "In-App-Event-card-16:9"; return 0; fi
  if [ $((w * 16)) -eq $((h * 9)) ] && [ "$h" -ge 1920 ] && [ "$h" -le 3840 ]; then echo "In-App-Event-details-9:16"; return 0; fi
  return 1
}

fail=0
files=()
for arg in "$@"; do
  if [ -d "$arg" ]; then
    while IFS= read -r f; do files+=("$f"); done < <(find "$arg" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) ! -name 'sheet.jpg' ! -name '*-guides.png' | sort)
  else
    files+=("$arg")
  fi
done
[ ${#files[@]} -eq 0 ] && { echo "usage: check-assets.sh <dir|file>..."; exit 1; }

for f in "${files[@]}"; do
  info=$("${ID[@]}" -format '%w|%h|%A|%[colorspace]|%m' "$f[0]" 2>/dev/null) || { echo "FAIL  $f  (unreadable)"; fail=1; continue; }
  IFS='|' read -r w h alpha colorspace format <<< "$info"
  size="${w}x${h}"
  problems=()
  label=$(label_for "$size") || problems+=("size $size is not an accepted App Store size")
  case "$alpha" in Undefined|False|false) ;; *) problems+=("has an alpha channel: flatten it (magick in.png -background '#000' -alpha remove -alpha off out.png)") ;; esac
  case "$colorspace" in sRGB|RGB) ;; *) problems+=("colorspace $colorspace: convert to sRGB") ;; esac
  case "$format" in PNG|JPEG) ;; *) problems+=("format $format: use PNG or JPEG") ;; esac
  if [ "${label:-}" = "Universal-creative-PNG-only" ] && [ "$format" != "PNG" ]; then problems+=("the 5244x2950 universal asset must be PNG"); fi
  if [ ${#problems[@]} -eq 0 ]; then
    echo "ok    $f  ($size, $label)"
  else
    fail=1
    for p in "${problems[@]}"; do echo "FAIL  $f  $p"; done
  fi
done
exit $fail
