# Silton Mise

The version-controlled culinary standard for the Silton kitchen.

## Overview

This project is a static recipe site built with [Astro](https://astro.build). It manages a collection of family recipes, providing a fast, searchable, and clean interface for cooking.

## Features

-   **Static Site Generation:** Fast, pre-built HTML pages.
-   **Content Collections:** Recipes are stored as Markdown files in `src/content/recipes`.
-   **Search:** Instant client-side search by recipe name or ingredient.
-   **Clean UI:** A distraction-free reading experience optimized for the kitchen.

## Development

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Adding Recipes

Add new recipes as `.md` files in `src/content/recipes/`. 

**Frontmatter Schema:**

```yaml
---
title: "Recipe Name"
prepTime: "15 min"
cookTime: "20 min"
totalTime: "35 min"
servings: "4"
ingredients:
  - "Item 1"
  - "Item 2"
---
```

**Body Content:**

The body of the markdown file should contain the description, directions, notes, and nutrition info using standard Markdown headers.

```markdown
## Description
A brief description of the dish.

## Directions
1. Step 1
2. Step 2

## Notes
Any special notes.

## Nutrition
Nutritional information.
```