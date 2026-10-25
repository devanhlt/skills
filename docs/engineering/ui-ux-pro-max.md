## What it does

Searches a bundled UI/UX knowledge base and generates design-system recommendations for web, mobile, and desktop interfaces. The local Python search engine and CSV data ship with the skill, so recommendations do not depend on the upstream CLI installer or a live search service.

## When to reach for it

Type `/ui-ux-pro-max`, or the agent can select it when an interface-design task fits. Use it for layout, color, typography, interaction, accessibility, charts, or stack-specific UI guidance. Pure backend and infrastructure work falls outside its trigger.

## Prerequisites

Python 3 must be available in the Claude execution environment. The search engine uses only the Python standard library. A known stack helps implementation searches, but the skill detects the stack rather than assuming one.

## Search mode follows the question

| Need | Mode |
|---|---|
| New page or product-wide visual direction | Design-system generation |
| One component, accessibility issue, or interaction | A focused domain search |
| Framework-specific implementation detail | A detected-stack search |

The skill checks result relevance and narrows an unsuccessful query once before labeling general guidance as fallback. Persisted design-system files belong in the user's project, with an explicit output directory; existing decisions are preserved unless replacement is authorized.

## Common questions

**Do I need the upstream CLI or additional Python packages?**

No. The collection includes the primary skill's Python scripts, references, and datasets. Python 3 is the runtime requirement.

**Does this generate screenshots or a complete app automatically?**

No. It returns design guidance and optionally writes a design-system specification. The agent still needs to implement and verify the interface in the actual project.

**Can I use the standalone ZIP outside Claude Code?**

Yes, in a Claude environment that can execute Python. When a host does not substitute the skill-directory placeholder, the agent should use the actual absolute path of the loaded skill. A text-only environment cannot run the local search engine.

## It's working if

- Search results match the product, platform, and specific interface concern.
- The proposed interface has a coherent visual direction and explains its design tradeoffs.
- Existing design-system decisions survive subsequent searches unless you authorize replacing them.

## Where it fits

This is a reach-for-it-anytime design aid. [prototype](https://aihero.dev/skills-prototype) produces runnable evidence for an unresolved design question; this skill supplies searchable design guidance. [ask-matt](https://aihero.dev/skills-ask-matt) maps the collection's engineering flows.
