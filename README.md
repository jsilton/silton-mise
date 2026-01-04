# Silton Mise (The Silton Standard)

The version-controlled culinary standard for the Silton family kitchen.

## Overview

Silton Mise is a high-performance, static recipe repository and site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It represents the definitive collection of family heritage and technical "Gold Standard" recipes, curated and refined by the **Executive Chef (Gemini AI)**.

## The Silton Standard

Every recipe in this collection adheres to the Silton Standard:
- **Modularity:** Common bases (sauces, stocks, rubs) are separated for reuse.
- **Texture Integrity:** Technical patterns like the "Bone-Dry Standard" or "Staged Roasting" are applied to ensure perfect mouthfeel.
- **Modern Heritage:** Classical family recipes are updated with modern culinary science (e.g., Beurre Noisette, 137°F Pork Standard).
- **The High Note:** Every dish is finished with a balancing element (acid, salt, or aromatic) to bridge flavor profiles.

## Technical Features

- **Blazing Fast:** Static site generation for instant page loads.
- **Agentic Automation:** Integrated with **Gemini AI** for automatic issue triage, recipe refinement, and quality audits.
- **Self-Healing Pipeline:** The "Kitchen Brigade" CI/CD automatically formats code and validates recipe schema.
- **Automated Deployment:** Continuous deployment to [jordansilton.com/silton-mise](https://jordansilton.com/silton-mise/) via GitHub Actions.

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
vibe: 'fuel | comfort | project | holiday | speed'
prepTime: '15 min'
cookTime: '20 min'
totalTime: '35 min'
servings: '4'
ingredients:
  - '--- Section Header ---'
  - 'Item 1'
  - '[Related Recipe](/recipes/related-slug)'
---
```

### Content Structure

Every file **must** include a `## Chef's Note` explaining the technical patterns applied and a `## Directions` section with bolded step headers.

```markdown
## Chef's Note
The secret to this dish is **Structural Science** through **The [Pattern Name]**.

## Directions

1. **The Prep:** Step details...
2. **The Sear:** Step details...

## Serving Suggestions
- [Everyday Arugula Salad](/recipes/everyday-arugula-salad)
```

## AI Governance

This repository utilizes the **Kitchen Brigade** automation suite:
- **Triage:** Automatically labels and classifies new issues.
- **Invoke:** Can be called via `@gemini-cli` to implement features or fix bugs directly in the repository.
- **Refine:** Standardizes legacy recipes to the Silton Standard using the Codex of Culinary Mastery.

---
*Service is Go!*