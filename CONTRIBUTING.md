# Contributing to Mise

This document defines the operational mandates and best practices for working on the `mise` project. Adherence ensures consistency, quality, and stability.

## 1. Safety & Verification (CRITICAL)

- **Verify First:** NEVER commit code without successfully running `npm run build`. If the build fails, the task is not complete.
- **Read First:** ALWAYS read a file's current content before editing to ensure context is accurate. Do not overwrite code based on assumptions.
- **No Secrets:** Never hardcode secrets, keys, or passwords.

## 2. Git Workflow

- **Atomic Commits:** Create small, focused commits with descriptive messages (e.g., "Fix: YAML escaping", "Feat: Add nutrition parser").
- **Push Immediately:** Push to `origin` immediately after completing a logical unit of work. Do not accumulate large stacks of unpushed commits.
- **Clean Workspace:** Delete temporary scripts, logs, or debug files before committing.

## 3. Code Quality & Formatting

- **Automated Formatting:** Run `npm run format` to automatically format code using Prettier before committing.
- **Recipe Maintenance Scripts:** Use `npm run validate`, `npm run refine`, and `npm run cleanup` to run automated recipe checks and repairs locally.
- **CI Automation:** A GitHub Action runs the maintenance scripts on a schedule and on pushes/PRs. If the scripts make changes, the workflow will either open an automated bot PR with the suggested fixes (for push/scheduled runs) or _fail the PR check_ (for pull requests) so maintainers can review and update the branch.
- **No Placeholders:** Never leave "TODO", "lorem ipsum", or stubbed logic in committed code.
- **Dependency Awareness:** Check `package.json` before installing new packages to avoid redundancy.

## 4. The Culinary Standard (Recipe Guidelines)

Every recipe in this library must be a "Keeper." We prioritize flavor layering, texture, and reliability.

### A. Taxonomy (The "Composable Menu")

Recipes are components, not just isolated instructions.

- **Role:** Every dish must have a role (`main`, `side`, `base`, `dessert`, `drink`, `condiment`).
- **Vibe:** Every dish must have a context (`quick`, `nutritious`, `comfort`, `technical`, `holiday`).

### B. The 7 Core Culinary Techniques

1.  **Traditional Roots:** Preserve the soul of a dish while updating it for modern equipment and quality ingredients.
2.  **Modern Interpretation:** Preserving family history while replacing legacy shortcuts (e.g., margarine, boiling meat) with professional standards (e.g., butter, searing).
3.  **Acid & Salt Balance:** Every dish must have a "High Note"—a finishing element of acidity or salt that cuts through richness.
4.  **Textural Balance:** Maintaining distinct textures. No overcooked or mushy vegetables; keep components distinct to maintain "pop."
5.  **Component-Based Cooking (Modularity):** Design recipes as versatile building blocks that can be reused across different meals.
6.  **Culinary Science:** Use specific techniques for mouthfeel (e.g., alkaline rinses for shrimp crispness, emulsion for meat texture).
7.  **Thermal Precision:** Using exact temperatures (e.g., 137°F for pork) rather than "until done."

### C. Technique Over Convenience

- **No Boiled Meat:** Meat should be seared, roasted, or poached gently. Never boiled in plain water.
- **Source Authority:** Use Serious Eats, Bon Appétit, Alton Brown, Rick Bayless, Smitten Kitchen.

## 5. Documentation

- **Keep it Fresh:** If you change the architecture, scripts, or usage commands, update `README.md` immediately.
