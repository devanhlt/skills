## What it does

Composite real captures into branded App Store, Google Play, and website screenshot designs. Real captures are composited locally; the default store workflow uses HTML/Chrome, with Pillow-based engines for other layouts and web graphics.

## When to reach for it

Type `/store-screenshots`, or the agent can select it when the task fits. Use for App Store or Google Play sets, website mockups, OG cards, or portfolio boards that must preserve the captured interface. Name the desired skill explicitly when the screenshot workflows overlap.

## Prerequisites

Python 3.9+, Pillow and NumPy. The HTML engine needs Chrome. Font fetches need network initially; offline system-font fallbacks are macOS-specific. Keep captures, configs, generated files, caches, and dependency installations in the user's project. The source's store-size rules must be checked against current official store requirements before a real submission.

## Common questions

**Does this need an external image API?**

No image-generation API is required for the local compositor. Font downloads may still need network access, and optional background art is separate from preserving app UI.

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
