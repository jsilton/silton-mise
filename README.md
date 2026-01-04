# Mise (The Kitchen Standard)

The version-controlled culinary standard for the Master Kitchen.

## Overview

**Mise** is a high-performance, static recipe codex built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It represents a curated collection of family heritage and technical "Kitchen Standard" recipes, professionalized, validated, and discoverable.

### What is Mise?

A searchable, filterable recipe repository with 474+ family recipes organized by:
- **Cuisine** (Italian, Thai, Chinese, American, Mediterranean, etc.)
- **Difficulty** (Easy, Intermediate, Advanced)
- **Cooking Methods** (Bake, Roast, Fry, Steam, Slow-Cook, etc.)
- **Dietary** (Vegetarian, Vegan, Gluten-Free, Dairy-Free, etc.)
- **Occasions** (Weeknight, Entertaining, Holiday, Comfort-Food, etc.)
- **Flavor Profile** (Spicy, Sweet, Savory, Acidic, Umami, Fresh, etc.)

## The Kitchen Standard

Every recipe adheres to the Kitchen Standard:

- **Versatility:** Common bases (sauces, stocks, rubs) are separated for reuse.
- **Textural Balance:** Technical methods like "Bone-Dry Standard" or "Staged Roasting" ensure perfect mouthfeel.
- **Modern Interpretation:** Traditional family recipes updated with culinary science while honoring their roots.
- **The Finishing Touch:** Every dish is balanced with acid, salt, or aromatic to bridge flavor profiles.

## Features

### For Cooks
- 🔍 **Search** by recipe name or ingredients
- 🏷️ **Filter** by difficulty, cuisine, dietary, cooking method, occasion
- 📊 **Sort** by alphabetical, prep time, or difficulty
- 📱 **Responsive** design works on phone, tablet, desktop
- 📝 **Detailed** recipes with ingredients, chef's notes, directions

### For Developers
- ⚡ **Blazing Fast** - Static site generation for instant loads
- 🏗️ **Component-Driven** - Reusable, maintainable Astro components
- 🧪 **Validated** - Automated recipe validation and quality checks
- 📚 **Well-Documented** - Code practices, standards, and deployment guides
- 🚀 **QA Testing** - Pre-deployment verification suite

## Technical Stack

- **Framework:** Astro 5 (Static Site Generator)
- **Styling:** Tailwind CSS (Utility-First)
- **Data:** Markdown with YAML frontmatter
- **Validation:** Custom Node.js recipe validator
- **Testing:** Automated QA suite

## Development

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens: http://localhost:4321/silton-mise/

# Build production site
npm run build

# Validate all recipes
npm run validate-recipes

# Run QA tests (before deployment)
npm run qa
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.astro
│   ├── FilterPanel.astro
│   ├── RecipeCard.astro
│   ├── RecipeHeader.astro
│   ├── TagBadge.astro
│   └── TagSection.astro
├── content/
│   └── recipes/         # 474+ recipes in Markdown
├── layouts/
│   └── Layout.astro     # Base page layout
├── pages/
│   ├── index.astro      # Homepage with search/filter
│   └── recipes/
│       └── [slug].astro # Recipe detail pages
└── knowledge/
    └── codex/           # Validation rules & standards
scripts/
├── validate-recipes.mjs # Recipe validation
└── qa-test.mjs          # QA test suite
```

### Key Documentation

- **[CODE_PRACTICES.md](./CODE_PRACTICES.md)** - Development standards, component architecture, testing guidelines
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment workflow, pre-deployment checklist, rollback procedures
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to add recipes and follow conventions
- **[src/knowledge/TAGGING_GUIDE.md](./src/knowledge/TAGGING_GUIDE.md)** - Recipe tagging best practices

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


