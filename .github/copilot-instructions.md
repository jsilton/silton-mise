# Mise Copilot Instructions

You are assisting with **Mise**, a statically generated recipe codex built with **Astro 5** and **Tailwind CSS**.

## Project Architecture & Context

- **Framework**: Astro 5 (SSG) with extensive use of Content Collections (`src/content/`).
- **Styling**: Tailwind CSS utility-first. No external stylesheets except `print.css`.
- **Data Source**: Recipes are Markdown files in `src/content/recipes/` with strict YAML frontmatter (defined in `src/content/config.ts`).
- **Components** (`src/components/`):
  - **UI**: Stateless, props-driven (e.g., `SearchBar.astro`, `TagBadge.astro`).
  - **Logical**: Manage state/logic (e.g., `FilterPanel.astro`).
  - **Layouts**: Page structures (e.g., `Layout.astro`).

## Critical Workflows

- **Recipe Validation**: ALWAYS run `npm run validate-recipes` after modifying content or schema.
- **QA Testing**: Run `npm run qa` before finalizing changes. This checks links, images, and content integrity.
- **Verification**: `npm run build` is the source of truth. If it fails, the task is incomplete.
- **Git**: Commits must be atomic. Push immediately after successful build (CI/CD relies on this).

## Code & Content Conventions

### Recipe Standards (The Kitchen Standard)

- **Mandatory Fields**: Every recipe must have `role`, `vibe`, and `difficulty` defined in frontmatter.
- **Tagging Rules**:
  - **Cuisine**: Use atomic origins (e.g., `Italian`, `American`), NEVER compound tags (`Italian-American`).
  - **Occasions**: Use specific time/social constraints (`weeknight`, `date-night`).
- **Schema**: Refer to `src/content/config.ts` for allowed enums (e.g., `nutritionalDensity`, `leftovers`).

### Component Practices

- **Strict Props**: Use TypeScript interfaces for all component props.
- **Styling**: Use inline Tailwind classes.
- **Tag Colors**: Follow specific color mappings:
  - Cuisine: `purple`
  - Dietary: `green`
  - Occasion: `amber`
  - Flavor: `rose`
  - Difficulty: `slate`

### Development Rules

- **No Secrets**: Never hardcode keys or credentials.
- **Read First**: Always read `CONTRIBUTING.md` and `CODE_PRACTICES.md` for detailed specific questions.
- **Avoid Over-engineering**: Create new components only when reused in 2+ locations or if they encapsulate significant logic.

## Key Files

- `src/content/config.ts`: The definitive schema for recipe data.
- `scripts/validate-recipes.mjs`: The logic enforcing content quality.
- `CODE_PRACTICES.md`: Detailed component and architectural guidelines.
- `CONTRIBUTING.md`: Operational mandates and workflow details.

## Analysis & Optimization (The Logic of the Chef)

### 1. Multi-Perspective Critique

Do not settle for a single viewpoint. When asked to analyze or improve a recipe, iteratively apply these three distinct lenses to identify improvements:

- **The Food Scientist** (Technique-Driven):
  - _Goal_: Empirical perfection and efficiency.
  - _Questions_: Is the searing temperature specified? Is the pH balanced? Is there a reason for this step order? Are we blooming the spices?
  - _Action_: Suggest scientific tweaks (e.g., "Add baking soda to onions to speed caramelization").

- **The Flavor Architect** (Palate-Driven):
  - _Goal_: Maximum sensory impact.
  - _Questions_: Where is the acid? Is there enough fat to carry flavor? Is there a texture contrast (crunch vs. creamy)?
  - _Action_: Recommend finishing touches (e.g., "Finish with lemon zest and flaky salt").

- **The Purist** (Ingredient-Driven):
  - _Goal_: Authenticity and respect for the produce.
  - _Questions_: Is this seasonal? Is this the authentic preparation? Are we masking good ingredients?
  - _Action_: Flag out-of-season parings (e.g., "Asparagus in Winter") or non-traditional shortcuts.

### 2. Collection Curation & Gap Analysis

When asked to evaluate the library:

- **Identify Gaps**: Look for underrepresented cuisines, seasons (e.g., "Lack of Summer Desserts"), or roles.
- **Prune**: Flag recipes that are redundant, vague, or lack "Kitchen Standard" quality.
- **Source of Truth**: Use `public/recipes/kitchen-context/` json files for rapid scanning of metadata.

### 3. Intelligent Meal Planning

When generating menus:

- **Structure**: Build around a Main. Add Sides/Starters that contrast in texture/flavor but share a Vibe.
- **Constraints**:
  - **Weeknight**: Total active time < 45m. Minimal cookware.
  - **Weekend/Entertaining**: multi-stage cooking allowed.
- **Pairing Logic**:
  - Match intensity (Hearty Main + Acidic Side).
  - Match Cuisine tags (or compatible fusion).
