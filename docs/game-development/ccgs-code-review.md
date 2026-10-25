## What it does

Review game code for architecture, quality, and testability. It uses the bundled workflow and references rather than assuming the original game-studio repository is installed.

## When to reach for it

Type `/ccgs-code-review`, or Claude can select it when a task fits. Review a specified implementation before accepting it.

## Prerequisites

Studio workflows that write project artifacts need access to the game project's folder. Unity implementation and review skills need the relevant code and available design or story requirements. The design-and-rewards skill also works on a brief pasted into chat.

## Common questions

**Does cloning this repository install the skill?**

No. Install the Claude Code plugin, or upload this skill's ZIP in Claude. The repository README describes both routes.

**Are the original PDF books required?**

No. The design-and-rewards skill includes an applied synthesis and page references; the collection does not include the original PDFs.

## It's working if

- The response or artifact addresses the requested workflow and identifies unresolved assumptions.
- Referenced project decisions can be traced to the files or brief provided.

## Where it fits

This is part of the [game-development collection](https://github.com/devanhlt/skills/tree/main/skills/game-development). Use [ccgs-start](https://github.com/devanhlt/skills/blob/main/skills/game-development/ccgs-start/SKILL.md) for studio onboarding or [game-design-and-rewards](https://github.com/devanhlt/skills/blob/main/skills/game-development/game-design-and-rewards/SKILL.md) for focused design analysis. [ask-matt](https://github.com/devanhlt/skills/blob/main/skills/engineering/ask-matt/SKILL.md) maps the engineering workflows and this collection.
