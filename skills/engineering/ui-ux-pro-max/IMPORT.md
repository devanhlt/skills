# Upstream import

Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Commit: `d14efff8ed1faa4187f004f79926f428c8074ec7`

Upstream skill version: 2.15.0. License: MIT, included as `LICENSE`.

Imported the primary `ui-ux-pro-max` skill with its full `data/`, `references/`, and `scripts/` trees. The scripts and CSV data were verified against the canonical `src/ui-ux-pro-max/` files. Unrelated CLI, gallery, companion skills, and project examples are outside this import.

Integration changes in `SKILL.md`:

- Replace the upstream plugin-specific script prefix with `${CLAUDE_SKILL_DIR}/scripts/search.py`.
- Use `python3` in command examples.
- Explain absolute-path fallback when a host does not substitute `${CLAUDE_SKILL_DIR}`.
- State the Python requirement locally instead of pointing to an absent upstream README.

Scripts, datasets, and reference documents are otherwise unchanged. The original workflow text and its punctuation are retained. Additional `agents/openai.yaml` metadata supports discovery in the collection.

For future updates, compare against the pinned commit, preserve `LICENSE`, reapply the documented path changes, run data validation and the applicable upstream runtime tests, then rebuild `downloads/`.
