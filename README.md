# Mise (The Kitchen Standard)

The version-controlled culinary standard for the Master Kitchen.

## Overview

Mise is a high-performance, static recipe repository and site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It represents a curated collection of family heritage and technical "Kitchen Standard" recipes, professionalized and refined by the **Executive Chef (Gemini AI)**.

## The Kitchen Standard

Every recipe in this collection adheres to the Kitchen Standard:

- **Versatility:** Common bases (sauces, stocks, rubs) are separated for reuse.
- **Textural Balance:** Technical methods like the "Bone-Dry Standard" or "Staged Roasting" are applied to ensure perfect mouthfeel.
- **Modern Interpretation:** Traditional family recipes are updated with modern culinary science (e.g., Beurre Noisette, 137°F Pork Standard) while honoring their roots.
- **The Finishing Touch:** Every dish is finished with a balancing element (acid, salt, or aromatic) to bridge flavor profiles.

## Technical Features

- **Blazing Fast:** Static site generation for instant page loads.
- **Agentic Automation:** Integrated with **Gemini AI** for automatic issue triage, recipe refinement, and quality audits.
- **Self-Healing Pipeline:** The "Kitchen Brigade" CI/CD automatically formats code and validates recipe schema.
- **Automated Deployment:** Continuous deployment to [jordansilton.com/silton-mise/](https://jordansilton.com/silton-mise/) via GitHub Actions.

## Development

1.  **Install Ingredients:**

    ```bash
    npm install
    ```

2.  **Fire the Oven (Dev):**

    ```bash
    npm run dev
    ```

3.  **Service (Build):**
    ```bash
    npm run build
    ```

## Adding Recipes

New recipes are added as `.md` files in `src/content/recipes/`.

### Frontmatter Schema (Mandatory)

```yaml
---
title: 'Recipe Name (The [X] Standard)'
role: 'main | side | dessert | base | drink | condiment'
vibe: 'nutritious | comfort | technical | holiday | quick'
prepTime: '15 min'
cookTime: '20 min'
totalTime: '35 min'
servings: '4'
ingredients:
  - '--- Section Header ---'
  - 'Item 1'
  - '[Related Recipe](/silton-mise/recipes/related-slug)'
---
```

### Content Structure

Every file **must** include a `## Chef's Note` explaining the technical techniques applied and a `## Directions` section with bolded step headers.

```markdown
## Chef's Note

The key to this dish is **Culinary Technique** through **The [Method Name]**.

## Directions

1. **The Prep:** Step details...
2. **The Sear:** Step details...

## Serving Suggestions

- [Everyday Arugula Salad](/silton-mise/recipes/everyday-arugula-salad)
```

## AI Governance

This repository utilizes the **Kitchen Brigade** automation suite:

- **Triage:** Automatically labels and classifies new issues.
- **Invoke:** Can be called via `@gemini-cli` to implement features or fix bugs directly in the repository.
- **Refine:** Standardizes legacy recipes to the Kitchen Standard using the Codex of Culinary Mastery.

---

_Service is Go!_
