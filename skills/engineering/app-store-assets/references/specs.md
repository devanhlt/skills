# App Store asset specifications

Checked against Apple's pages in **October 2026**. Re-check before final export:

- Screenshots: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications
- App previews: https://developer.apple.com/help/app-store-connect/reference/app-information/app-preview-specifications
- Creative assets (Header, Search Results, In-App Events): https://developer.apple.com/help/app-store-connect/reference/app-information/creative-assets-specifications
- Or from the terminal: `asc asset-library specs`

Common to all images: `.png`, `.jpg` or `.jpeg`, RGB, **no alpha channel or transparency**.

## Screenshots

- 1 to **10** per device size and language. Up to **3** can appear in search results, depending on orientation.
- If the UI is the same across sizes, upload only the largest required size. App Store Connect scales it down for smaller classes. It never scales up.

### iPhone

| Display class (marketing size) | Portrait px | Notes |
|---|---|---|
| **Dynamic Island, large (6.9", 6.7")** | **1320×2868**, 1290×2796, 1260×2736 | Ship this one. It covers every smaller iPhone by scaling. |
| Face ID, large (6.5") | 1284×2778, 1242×2688 | Required only if you provide no Dynamic Island large set |
| Dynamic Island, medium (6.3", 6.1") | 1206×2622, 1179×2556 | Scaled from Face ID large if missing |
| Face ID, medium (6.1", 5.8") | 1170×2532, 1125×2436, 1080×2340 | Scaled |
| Home Button, large (5.5") | 1242×2208 | Scaled |
| Home Button, medium (4.7") | 750×1334 | Scaled |
| iPhone Duo outer / inner | 1398×2034 / 2007×2853 | Only if you support it |

Landscape is the same numbers swapped.

### iPad (required if the app runs on iPad)

| Display | Portrait px |
|---|---|
| **13"** | **2064×2752**, 2048×2732 |
| 12.9" (2nd gen), 11", 10.5", 9.7" | Scaled from 13" if missing |

Mac, Apple TV, Vision Pro and Watch each need their own set if you ship there.

## App previews (video)

| Rule | Value |
|---|---|
| Length | **15 to 30 s** |
| Count | Up to **3** per device size and language |
| File size | ≤ 500 MB |
| Frame rate | ≤ **30 fps** |
| Codecs | H.264 (.mov/.m4v/.mp4, 10–12 Mbps, High Profile ≤ 4.0) or ProRes 422 HQ (.mov) |
| Audio | Stereo, AAC 256 kbps or PCM, 44.1/48 kHz, all tracks enabled |
| Poster frame | Defaults to 5 s in. Choose it yourself; it can't be changed after approval. |
| Order | Previews always show **before** screenshots |

Resolutions: the *accepted* resolution, not the device resolution.

| Device class | Portrait | Landscape |
|---|---|---|
| iPhone 6.9"/6.7"/6.5" and 6.3"/6.1"/5.8" | **886×1920** | 1920×886 |
| iPhone 5.5" | 1080×1920 | 1920×1080 |
| iPhone 4.7" | 750×1334 | 1334×750 |
| iPad 13", 12.9", 11", 10.5" | 1200×1600 | 1600×1200 |
| Mac, Apple TV | — | 1920×1080 |
| Vision Pro | — | 3840×2160 |

Processing after upload can take up to 24 hours.

## Creative assets: product page Header and Search Results (new in 2026)

Introduced with the App Store Asset Library on 5 October 2026. They show only to people on **iOS 27 or iPadOS 27 and later**. They're optional and sit alongside screenshots and previews, not instead of them. If there's no Search Results asset, search shows In-App Events, previews or screenshots.

### Images

| Placement | Ratio | Size px | Formats |
|---|---|---|---|
| Product page header | 21:9 | **3840×1646** | png, jpg |
| Search results | 3:2 | **1920×1280 to 3840×2560** | png, jpg |
| **Universal** (either placement) | 16:9 | **5244×2950** | **png only** |

A universal asset can fill both placements. Using one asset for both strengthens brand recognition. You can also choose a dedicated asset for each.

### Videos

| Placement | Ratio | Size px | fps | Length | Formats |
|---|---|---|---|---|---|
| Product page header | 21:9 | 3840×1646 | 30 or 60 | **5–30 s** | mov, m4v, mp4 |
| Search results | 3:2 | 1920×1280 to 3840×2560 | 30 or 60 | 5–30 s | mov, m4v, mp4 |

Videos loop. In search they're muted and can't be unmuted. On the product page they start muted and people can turn sound on.

### Safe areas

Apple's help pages give no pixel safe areas; they say to design inside one and check in the **Preview tool** in App Store Connect. These rectangles were measured from Apple's Photoshop templates in October 2026. Use them as a starting point and confirm in Preview:

| Canvas | Safe area (w×h at x,y) |
|---|---|
| Universal 5244×2950, header crop | 1402×962 at (1921, 660) |
| Search results 3840×2560 | 2168×1030 at (836, 765) |

Keep the focal point centred. Treat everything outside the safe area as decoration that may be cropped.

Templates (Figma, Photoshop, Pixelmator, Sketch) are linked from https://developer.apple.com/app-store/asset-best-practices/ under Product page header and Search results.

## In-App Events

| Placement | Ratio | Image px | Video |
|---|---|---|---|
| Event card | 16:9, landscape | 1920×1080 to 3840×2160 | 15–30 s, 30/60 fps |
| Event details page | 9:16, portrait | 1080×1920 to 2160×3840 | 15–30 s, 30/60 fps |

Images: png or jpg, ≤ 500 MB. Use the same colours or illustration style on both. Don't repeat the event badge (Challenge, Competition, Live Event, Major Update, New Season, Premiere, Special Event) in the art.

## App icon

- One **1024×1024** master, square, no transparency, no rounded corners (the system masks it).
- With Xcode 26 and later, design layered Liquid Glass icons in **Icon Composer** from one source for iPhone, iPad, Mac and Watch.
- Check it at small sizes (Spotlight, Settings, the Home Screen) and in light, dark and tinted modes.
