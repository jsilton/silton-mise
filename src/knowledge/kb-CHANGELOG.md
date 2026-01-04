# KB Changelog

This changelog documents notable changes to the Omnivore's Codex KB rules (files in `src/knowledge/codex/`). Each entry should be a short note describing what changed and why.

## 2026-01-04 — Seed KB added
- Added initial set of KB rules: `missing-acid`, `missing-crisp`, `missing-salt`, `low-temp-poultry-safety`, `missing-resting`, `maillard-note`, `insufficient-umami`, `plating-suggestion`.
- Integrated KB into `scripts/validate-recipes.mjs` to emit suggestions and write `public/recipes/validation-report.json` for CI consumption.
- CI will now post sample KB suggestions as a PR comment on recipe PRs.


<!-- When updating: add YYYY-MM-DD — brief note -->