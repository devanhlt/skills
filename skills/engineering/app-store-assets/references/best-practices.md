# App Store asset best practices

A working summary of Apple's **App Store Asset Best Practices and Resources** (https://developer.apple.com/app-store/asset-best-practices/), App Review Guideline **2.3 Accurate Metadata** (https://developer.apple.com/app-store/review/guidelines/#metadata), and lessons from shipping real apps. Read Apple's page for the full wording.

## The one rule

Assets set expectations. People decide to download from them, and App Review checks that the app matches. **Show the real app, doing what it really does, with honest data.**

## Never put these in any asset

- Prices, discounts or "free" offers. They go stale and differ by country.
- Website URLs.
- © copyright symbols.
- Awards, rankings, press quotes or recognition you haven't received or can't prove.
- Apple's own recognitions: Editor's Choice, App of the Day, Game of the Day, Apple Design Award. The App Store shows these itself.
- Logos of, or references to, other platforms or stores (Android, Google Play and so on).
- Made-up star ratings, review counts, download or user counts, or testimonials.
- Data presented as real when it's invented. Sample content is fine when it's plausible and clearly the app's own UI.
- UI that doesn't exist in the build under review, or features behind a paywall shown as free.

## Make it work for everyone

- **4+ for every asset**, even if the app is rated 17+. That means no gore, sexual content, drugs, self-harm, hate or profanity, and no weapons aimed at the viewer.
- Appeal to a global audience with inclusive imagery.
- Localize text overlays for every language the app supports. App Store Connect takes separate media per language.
- Legible at small sizes. Assets appear in many places, and search shows them small.

## Images

- One clear focal point and strong composition. Reflect the **current UI** and the app's own look.
- Text is a short phrase that adds to the picture, not a caption of it. "Move with the Moon" beats "This screen shows the Moon phase".
- Overlays may point out a gesture or a feature, but they must not cover the UI they explain.
- Design inside the safe area and keep the focal point centred (see `specs.md`).

## Videos (previews, header and search videos)

- **Poster frame** first: it's what most people see. Pick a frame that works as a still.
- **Lead with the best thing** in the first seconds, then pace the cuts so they can be followed. Avoid fast flashing cuts; they're hard to follow and inaccessible.
- **Loop seamlessly.** Creative-asset videos autoplay and repeat, so the last frame must flow into the first.
- **Silent first.** Audio is muted by default. If you add sound, keep it a soft music bed with no sudden loud moments, and make it loop cleanly.
- App previews: real UI or gameplay, with a beginning, middle and end (for example features in order of popularity).

## Each asset's job

| Asset | Job | Do | Don't |
|---|---|---|---|
| **Icon** | Recognisable at a glance | Unique, expresses the app's purpose, legible small; Icon Composer for Liquid Glass | Text, photos, tiny detail |
| **Product page header** | Brand and tone for a first-time visitor | One single, clear idea; seasonal or new content | Dense collages, clutter, small text |
| **Search results** | Say what the app does at a glance | Show the first-hand experience: real screens, content, gameplay | Pure brand art with no product |
| **Screenshots** (≤10) | Tell the story | Real app in use, strongest features first, a cohesive sequence | Using a whole screenshot for accolades or a "Download now" call to action |
| **App previews** (≤3) | Show it in motion | Real UI, best visuals in the first seconds | Long logo intros, cinematic footage that isn't the app |
| **In-App Event** | A timely moment | Same style on the card and the details page | Repeating the badge text in the art |

All of them together should tell one story, with one palette, one icon set, one type pair and one tone.

## Testing and placement

- Use **product page optimization** to A/B test icons, screenshots and header visuals.
- Use **custom product pages** with their own creative assets for ads and campaigns.
- Always check crops in the **Preview tool** before publishing.

## Resources

- Asset best practices and templates: https://developer.apple.com/app-store/asset-best-practices/
- Creating your product page: https://developer.apple.com/app-store/product-page/
- App icons (HIG): https://developer.apple.com/design/human-interface-guidelines/app-icons
- Icon Composer: https://developer.apple.com/icon-composer/
- Product page optimization: https://developer.apple.com/app-store/product-page-optimization/
- Custom product pages: https://developer.apple.com/app-store/custom-product-pages/
- In-App Events: https://developer.apple.com/app-store/in-app-events/
- Manage your App Store assets (Asset Library): https://developer.apple.com/help/app-store-connect/manage-app-information/manage-your-app-store-assets/
- WWDC26 "Enhance your presence on the App Store": https://developer.apple.com/videos/play/wwdc2026/205/
- Marketing and identity guidelines (badges, product images): https://developer.apple.com/app-store/marketing/guidelines/
