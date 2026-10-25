## What it does

Builds expressive 3D scenes, explainers, and interactive models through a workflow that connects subject reasoning, construction, interaction, and actual visual inspection. The catalog offers candidates, while the agent remains responsible for choosing a representation and checking what appears on screen.

## When to reach for it

Type `/3dviz-pro-max`, or the agent can select it when a 3D creation or editing task fits. It applies to creative worlds, product or architectural studies, scientific explanations, and spatial puzzles. An existing artifact needs only the workflow steps affected by the requested edit.

## Prerequisites

| Capability | Requirement |
|---|---|
| Search recipes, resolve records, and gather design context | Python 3, standard library only |
| Run the bundled Vite/Three.js scaffold | Node.js, a package manager, and project dependencies |
| Automated frame capture | Optional Playwright and Chromium in the execution environment |
| Suitable modeling or hero-tier baking | Optional Blender; some bake paths also need a supplied T1 GLB or the upstream export harness |

The package includes the canonical skill folder and shipped kit assets. It does not include the upstream repository's example projects, website, historical demo videos, full evidence archive, or repository maintenance tooling. Templates should be copied into the user's project before installing dependencies or editing them.

## Grounded representations and observed frames

Separate illustration, discrete state, simulation, and playback. A moving model does not become a validated scientific simulation solely because it animates. Retrieved source metadata is a starting point for verification, not proof of a new source read.

Likewise, a successful build does not establish visual quality. Inspect the real scene, important close-ups, and controls with whatever authorized visual tools are available. Report missing capture or rendering capabilities rather than describing frames that were never observed.

## Common questions

**Do I need Blender for every scene?**

No. The skill includes procedural Three.js kits and existing asset routes. Use Blender when it fits the construction task, rather than treating its presence as a visual-quality score.

**Can I use it in Claude/Cowork?**

The individual ZIP carries the standalone skill. Helper execution requires Python; running scenes or automated capture needs the corresponding environment capabilities. If the host leaves the skill-directory placeholder unchanged, use the loaded skill's actual absolute directory. Claude/Cowork import itself has not been tested in this migration.

**Are the source repository's demos included?**

No. This is the standalone skill package, with its own templates and kits. It preserves the source records' evidence limits and does not claim that every recipe was rendered.

## It's working if

- The construction method and level of detail fit the subject and viewing distance.
- Interactions visibly affect the intended model state.
- Claims distinguish what was authored, calculated, built, and actually observed.

## Where it fits

This is a reach-for-it-anytime 3D creation aid. [ui-ux-pro-max](https://github.com/devanhlt/skills/blob/main/skills/engineering/ui-ux-pro-max/SKILL.md) helps with interface design, while [prototype](https://aihero.dev/skills-prototype) targets a specific unresolved question with runnable evidence. [ask-matt](https://aihero.dev/skills-ask-matt) maps the engineering collection.
