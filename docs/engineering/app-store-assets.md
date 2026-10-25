## What it does

Build and check App Store screenshots, previews, icons, and creative assets. A real-capture build pipeline and asset checker cover screenshots and wider Apple store creative workflows.

## When to reach for it

Type `/app-store-assets`, or the agent can select it when the task fits. Use for Apple-focused store assets, previews, creative headers, or pre-submission checks. Name the desired skill explicitly when the screenshot workflows overlap.

## Prerequisites

Node.js 18+, Chrome, ImageMagick; optional asc CLI for store uploads. Keep captures, configs, generated files, caches, and dependency installations in the user's project. The source's store-size rules must be checked against current official store requirements before a real submission.

## Common questions

**Does this need an external image API?**

No image-generation API is required by the included build scripts. Uploading is a separate account-authenticated workflow and is not performed by installation.

**Can HyperShots and Shots share one workspace?**

No. Both default to `.shots/`, but their configuration and output contracts differ. Use separate project directories or explicitly separate workspace paths.

**Does installation upload assets or spend provider credits?**

No. Importing this skill packages files only. Generation, scraping, browser rendering, and store uploads require the corresponding runtime and task context.

## It's working if

- The chosen screenshot workflow matches the user's need for exact UI preservation or deliberate generated marketing art.
- Outputs are checked for dimensions, legibility, and correspondence with the real product.
- Results distinguish locally checked properties from anything not rendered or tested.

## Where it fits

This is a reach-for-it-anytime screenshot and store-asset workflow. Compare the [screenshot skills](https://github.com/devanhlt/skills#screenshots-and-store-assets) before choosing one. [ask-matt](https://github.com/devanhlt/skills/blob/main/skills/engineering/ask-matt/SKILL.md) maps the broader collection.
