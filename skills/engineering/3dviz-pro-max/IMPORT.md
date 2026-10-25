# Upstream import

Source: https://github.com/viettranx/3dviz-pro-max

Commit: `d077e0e68915c25be8e71d74684d3144fd1c2aca`

Upstream skill/data version: 0.1.0. MIT license included as `LICENSE`.

Scope: the entire canonical `skills/3dviz-pro-max/` folder, including catalog data, references, scripts, agents metadata, templates, reusable kits, and shipped GLB assets. Repository-level examples, website, showcase media, evidence archive, schemas, and maintenance scripts are outside this standalone import, following the upstream portable-skill scope.

Adaptations:

- Prefix executable command examples in `SKILL.md` and `templates/README.md` with `${CLAUDE_SKILL_DIR}` for installation-independent script paths.
- Add a host-path fallback and explicit project-output guidance.
- Explain Python, project scaffold, optional capture/baking dependencies, and the standalone hero-tier helper's optional upstream-harness limitation.

All other canonical files are unchanged. Existing attribution and source/proof metadata remain intact; retained proof declarations are not newly executed observations. No scientific source-truth, rendering quality, or host-specific Claude import success is claimed by this migration.

When updating, compare to the pinned commit, preserve the MIT license, reapply the two documented Markdown adaptations, validate catalog/index integrity and helper behavior, then rebuild the collection's upload ZIPs.
