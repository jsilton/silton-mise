## Recipe submission checklist

Please ensure your recipe follows the repository conventions before opening a PR.

- [ ] Recipe file placed under `src/content/recipes/<slug>.md`
- [ ] Frontmatter contains `title`, `role`, `vibe`, `prepTime`, `cookTime`/`totalTime`, `servings`, and (recommended) `image`.
- [ ] Includes `## Chef's Note` and `## Directions` sections. Directions should use numbered steps; bold step headers help readability.
- [ ] Run locally: `npm ci && npm run validate:recipes` and fix any errors or address suggestions reported by the validator (safety issues are blocking).
- [ ] If renaming a recipe, add `aliases: ["old-slug"]` in frontmatter.
- [ ] See the Omnivore's Codex guidance in `src/knowledge/codex` for suggestions on flavor balance, texture, and safety.

After submitting, maintainers will review KB-based suggestions and provide editorial guidance if needed.
