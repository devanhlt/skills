# Uploading, review and the Asset Library

## Where assets live

- **Version page / Media Manager:** screenshots and app previews per device size and language. They're reviewed with an app version.
- **Asset Library** (App Store Connect → your app → Asset Library): every approved image and video, where each one is used, and standalone uploads.
  - **Creative assets** (Header, Search Results) can be submitted **on their own, without a new app version**, but only once the app has an approved version. For the very first version, submit them with that version.
  - Roles allowed: Account Holder, Admin, App Manager, Marketing.
- **Placing creative assets:** Product Page Information → **Header and Search Results** → choose Header or Search Results → drag in a file or Browse Assets → Save. Custom product pages, product page optimization and In-App Events can use them too.
- **Poster frames** for videos can't be edited after approval.
- Only assets in **Prepared for Submission** can be deleted. Approved ones can be archived instead.
- An asset attached to a version that is in review shows as locked ("locked by embedded review submission"). That's expected; it ships with that version.

## With the `asc` CLI

`asc` (App Store Connect CLI) uses an App Store Connect API key. Device types: `IPHONE_69` (6.9"), `IPHONE_65`, `IPAD_PRO_3GEN_129` and so on; `asc screenshots upload --help` lists them.

### Screenshots

```bash
# Preview, then upload one locale's 6.9" set (the file order sets the screenshot order)
asc screenshots upload --app APP_ID --version 1.0.0 --locale en-US \
  --path store/screenshots --device-type IPHONE_69 --dry-run
asc screenshots upload --app APP_ID --version 1.0.0 --locale en-US \
  --path store/screenshots --device-type IPHONE_69

# Replace an existing set (deletes the old ones first)
asc screenshots upload --app APP_ID --version 1.0.0 --locale en-US \
  --path store/screenshots --device-type IPHONE_69 --replace --confirm

# Every locale at once: store/screenshots/<locale>/*.png
asc screenshots upload --app APP_ID --version 1.0.0 --path store/screenshots --device-type IPHONE_69

# Verify
asc screenshots list --app APP_ID --version 1.0.0 --locale en-US --output json
```

Name files so they sort in story order (`01-today.png`, `02-…`).

### App previews

```bash
asc localizations list --app APP_ID --version 1.0.0 --locale en-US   # gets VERSION_LOCALIZATION_ID
asc video-previews upload --version-localization VERSION_LOCALIZATION_ID \
  --path store/previews --device-type IPHONE_69
```

### Creative assets (Asset Library)

```bash
asc asset-library specs                         # Apple's current sizes and placement rules
asc asset-library view --app APP_ID             # the library ID and what's in it
asc asset-library images upload --library-id LIBRARY_ID --file store/creative/header.png
asc asset-library images upload --library-id LIBRARY_ID --file store/creative/search-results.png
asc asset-library images placements --id IMAGE_ID
asc asset-library videos upload --library-id LIBRARY_ID --file store/creative/header.mp4

# Standalone review (only after the app has an approved version)
asc review items add --submission SUBMISSION_ID --item-type appAssetLibraryImages --item-id IMAGE_ID
asc review submissions-submit --id SUBMISSION_ID --confirm
```

Choosing the Header and Search Results placement may still need the web UI. If the CLI can't set it, give the user the click path above.

## Before you submit

1. `bash "${CLAUDE_SKILL_DIR}/scripts/check-assets.sh"` passes on every file.
2. Screenshots exist for every required device class (iPhone 6.9", plus iPad 13" if the app supports iPad) and every language you list.
3. Header and Search Results crops look right in App Store Connect's Preview tool.
4. Nothing from the "never" list in `best-practices.md` appears anywhere.
5. Previews have a deliberately chosen poster frame.
