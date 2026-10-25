## What it does

Research, generate, revise, and translate AI-assisted store screenshot composites. Research and a saved strategy brief drive image-provider generation of three-panel composites, followed by cropping and revision.

## When to reach for it

Type `/shots`, or the agent can select it when the task fits. Use when you deliberately want an AI-generated store-marketing screenshot workflow. Name the desired skill explicitly when the screenshot workflows overlap.

## Prerequisites

Node.js 18+, the bundled npm dependencies, and OPENAI_API_KEY or FAL_KEY. SEARCHAPI_KEY is optional. Keep captures, configs, generated files, caches, and dependency installations in the user's project. The source's store-size rules must be checked against current official store requirements before a real submission.

## Common questions

**Does this need an external image API?**

Yes, for image generation. This collection does not supply keys or run a paid generation during installation. Cropping and workspace setup are local operations.

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
