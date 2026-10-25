# Screenshot and creative asset playbook

How to design and build store art that converts and passes review, with a pipeline you can rerun.

## 1. Study the category first

Open the top 5 apps for your main keyword on the App Store and look at their screenshots in search results, where only the first 3 show. Note:
- what the first screenshot promises;
- headline length and size;
- phone frame or full-bleed UI;
- light or dark;
- how they handle the brand character or art.

If you're inspired by a reference app, copy the *style* (layout rhythm, type scale, use of floating art) and never their wording, art or brand.

## 2. Capture real screens

- Simulator at the largest size you ship: iPhone **6.9" (1320×2868)**, plus iPad **13" (2064×2752)** if the app runs on iPad.
- Clean status bar:
  ```
  xcrun simctl status_bar <udid> override --time 9:41 --batteryState charged --batteryLevel 100 --cellularBars 4 --wifiBars 3
  xcrun simctl io <udid> screenshot raw/today.png
  ```
- **Seed sample data** that looks lived in (a realistic history, names and dates) through a debug-only seed path, never shipped. Write it down, for example "sample birth date 14 Mar 1996, Lisbon", so captures can be reproduced.
- Jump to each screen with deep links (`xcrun simctl openurl <udid> "myapp://route"`) instead of tapping through.
- Turn off debug overlays and dev-only banners before capturing.

## 3. Write the sequence

| Slot | Purpose |
|---|---|
| 1 | The core promise, the screen people open every day. Must make sense alone in search. |
| 2–3 | The two strongest features. Also visible in search. |
| 4–7 | Depth: other features, personalisation, widgets and Live Activities, the companion character. |
| 8–10 | Trust and breadth: privacy ("No account needed", only if true), accessibility, offline. |

Headlines: two lines at most, about 2–5 words per line, so they read at thumbnail size. Use an italic or colour accent on one key word. The subhead is optional, one line, and describes the benefit.

## 4. A layout that works (1320×2868 canvas)

- Headline block in the top ~22%: display serif or bold sans at 120–140 px, tight tracking.
- Real screen inside a simple phone frame, 1000–1060 px wide, starting about 690 px from the top. It may run off the bottom edge.
- 1–3 pieces of **floating art** from the app's own illustration set (mascot, objects). Some go behind the phone, some in front, with a soft drop shadow.
- 1–2 **chips**: frosted pills with a real feature name ("Moon phases"), tilted ±5°.
- A background in the app's theme colour with a soft radial glow. Vary the glow position per shot so the set feels alive but consistent.
- No badges, ratings, prices or user counts (see `best-practices.md`).

## 5. Build pipeline

`scripts/build-screenshots.mjs` takes a config describing each shot and produces exact-size, alpha-free PNGs plus a contact sheet:

```
node "${CLAUDE_SKILL_DIR}/scripts/build-screenshots.mjs" store/screenshots.config.mjs        # all
node "${CLAUDE_SKILL_DIR}/scripts/build-screenshots.mjs" store/screenshots.config.mjs 3      # only shot 3
```

How it works:
1. Writes one HTML page per shot (fonts, theme, frame, art, chips, the raw capture).
2. Renders it with headless Chrome at a device scale factor of 1 and the exact window size.
3. Flattens it with ImageMagick to 8-bit sRGB `PNG24` with the alpha removed, so App Store Connect never rejects it for transparency.
4. Builds `sheet.jpg`, a contact sheet for review.

`scripts/build-creative.mjs` does the same for the **Header** (universal 5244×2950 PNG, or 3840×1646) and **Search Results** (3840×2560). `--guides` draws the safe area so you can check framing.

Requirements: Node 18+, Google Chrome (or set `CHROME=`), ImageMagick 7 (`magick`).

## 6. Creative assets: header and search

- **Header:** a brand moment, not a screenshot. One idea centred in the safe area (the character with the hero object, for example), with decorative art toward the edges where cropping is fine. Little or no text. If you add text, keep it inside the safe area and localize it.
- **Search Results:** what the app is at a glance. A short line plus 2–3 real screens. It replaces your first screenshots in search for iOS 27 users, so it has to sell on its own.
- Build a universal 5244×2950 PNG when one composition can serve both. Otherwise make dedicated files.

## 7. Check before upload

```
bash "${CLAUDE_SKILL_DIR}/scripts/check-assets.sh" store/screenshots store/creative
```

It checks each file's size against the accepted sizes, that there is no alpha, the colour space and the format. Then open the contact sheet and ask:
- Does shot 1 explain the app with nothing else visible?
- Is every number on screen real or obviously sample data?
- Is text readable at about 300 px wide?
- Is there anything from the "never" list?

## 8. App preview video (optional)

- Record with `xcrun simctl io <udid> recordVideo --codec h264 raw.mov`. Script the taps so the flow is smooth and repeatable.
- Edit to 15–30 s, put the strongest moment in the first 3 s, and make it work silently.
- Export with ffmpeg at the accepted resolution and ≤ 30 fps:
  ```
  ffmpeg -i edit.mov -vf "scale=886:1920:force_original_aspect_ratio=decrease,pad=886:1920:(ow-iw)/2:(oh-ih)/2,fps=30" \
    -c:v libx264 -profile:v high -level 4.0 -b:v 11M -pix_fmt yuv420p \
    -c:a aac -b:a 256k -ar 44100 -ac 2 preview.mp4
  ```
  If the edit has no sound, adding a silent stereo track is the safe default (`-f lavfi -i anullsrc=r=44100:cl=stereo -shortest`), because uploads without one are sometimes rejected.
- Choose the poster frame deliberately in App Store Connect before submitting. It can't be changed after approval.
