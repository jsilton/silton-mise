# Contributing to Silton Mise

This document defines the operational mandates and best practices for working on the `silton-mise` project. Adherence ensures consistency, quality, and stability.

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
- **No Placeholders:** Never leave "TODO", "lorem ipsum", or stubbed logic in committed code.
- **Dependency Awareness:** Check `package.json` before installing new packages to avoid redundancy.

## 4. The Silton Standard (Recipe Guidelines)

Every recipe in this library must be a "Keeper." We prioritize flavor layering, texture, and reliability.

### A. Taxonomy (The "Composable Menu")

Recipes are components, not just isolated instructions.

- **Role:** Every dish must have a role (`main`, `side`, `base`, `dessert`, `drink`, `condiment`).
- **Vibe:** Every dish must have a context (`speed`, `fuel`, `comfort`, `project`, `holiday`).

### B. The 7 Core Silton Patterns

1.  **Modularity:** Split complex dishes into reusable components (e.g., sauces, pickles, grains).
2.  **Modern Heritage:** Preserve family soul but replace legacy errors (Crisco, Boiling meat) with modern standards (Butter, Searing).
3.  **Menu-First:** Mains MUST suggest pairings (e.g., "Pairs with: Arugula Salad").
4.  **Texture Integrity:** No mixed-in mushy veg. Keep components distinct or roast separately to maintain "pop."
5.  **Gold Standard Choice:** Lead with the scratch recipe; offer shortcuts (H-Mart, jars) as options.
6.  **Structural Science:** Use specific techniques for mouthfeel (Alkaline rinses for shrimp snap, emulsion stirring for meat bounce).
7.  **The Acid Finish:** Ensure every savory dish has a "high note" (Lemon, Vinegar, Miso) to cut fat.

### C. Technique Over Convenience

- **No Boiled Meat:** Meat should be seared, roasted, or poached gently. Never boiled in plain water.
- **Source Authority:** Use Serious Eats, Bon Appétit, Alton Brown, Rick Bayless, Smitten Kitchen.

## 5. Documentation

- **Keep it Fresh:** If you change the architecture, scripts, or usage commands, update `README.md` immediately.
