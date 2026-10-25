## What it does

Build deterministic HTML/CSS App Store panels with localization and optional generated art. Deterministic HTML/CSS and vendored fonts preserve frame geometry and typography; optional AI is limited to decorations or style grading.

## When to reach for it

Type `/hypershots`, or the agent can select it when the task fits. Use when you need reproducible App Store panels or localized variants from real captures. Name the desired skill explicitly when the screenshot workflows overlap.

## Prerequisites

Node.js and Chrome/Chromium; optional ImageMagick and genmedia/fal.ai. Font licenses are bundled. Keep captures, configs, generated files, caches, and dependency installations in the user's project. The source's store-size rules must be checked against current official store requirements before a real submission.

## Common questions

**Does this need an external image API?**

No. Core layout, rendering, localization, and validation work without an AI provider. Optional generated assets and grading require additional tooling and credentials.

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
