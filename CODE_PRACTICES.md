# Code Practices & Development Standards

**Version:** 1.0 | **Last Updated:** January 4, 2026

This document defines the coding standards, architectural patterns, and best practices for the Mise recipe codex. All contributors should follow these guidelines to maintain consistency and sustainability.

---

## 1. Component Architecture

### Principle

**Keep it simple, don't over-engineer.** Create components only when they're:

- Reusable across multiple pages/contexts
- Self-contained with clear input/output contracts
- Reducing code duplication
- Improving maintainability

### When to Create a Component

✅ **DO create** if:

- Used in 2+ locations
- Encapsulates significant logic or styling
- Has distinct responsibility (SearchBar, RecipeCard, FilterPanel)
- Helps readers understand code structure

❌ **DON'T create** if:

- Single-use markup
- Would create unnecessary hierarchy
- Just wraps one or two HTML elements
- Scatters related code across files

### Component Organization

**Location:** `/src/components/`

**Types:**

1. **Reusable UI Components** (Pure, stateless, props-driven)
   - `SearchBar.astro` - Search input with icon
   - `FilterSelect.astro` - Single filter dropdown
   - `TagBadge.astro` - Tag display with colors
   - `TagSection.astro` - Tag category section
   - `RecipeCard.astro` - Recipe grid card

2. **Logical Unit Components** (Page-section containers, own scripts/state)
   - `FilterPanel.astro` - Complete filter UI + state management
   - `RecipeHeader.astro` - Recipe detail header + all metadata

3. **Layout Components** (Page-level structure)
   - `Layout.astro` - Base page layout with nav/footer

### Component Interface Pattern

```astro
---
// Component.astro
// Clear comments explaining purpose

interface Props {
  prop1: string;
  prop2?: number; // optional with default
  items: Array<{ id: string; label: string }>;
}

const { prop1, prop2 = 10, items = [] } = Astro.props;
---

<!-- Template --><!-- Self-contained, no external dependencies for styling -->
```

### Naming Conventions

- **File names:** PascalCase (e.g., `RecipeCard.astro`)
- **Props:** camelCase
- **CSS classes:** kebab-case, Tailwind only
- **Data attributes:** kebab-case (e.g., `data-difficulty`)

---

## 2. Styling Standards

### Technology

- **Framework:** Tailwind CSS only (no additional CSS files)
- **Philosophy:** Utility-first, inline in components
- **Color Palette:** Slate, indigo, blue, purple, green, amber, rose

### Color Categories (for tags)

```
- cooking-method: blue-50 / blue-700 / blue-200
- cuisine: purple-50 / purple-700 / purple-200
- dietary: green-50 / green-700 / green-200
- occasion: amber-50 / amber-700 / amber-200
- flavor: rose-50 / rose-700 / rose-200
- difficulty: slate-100 / slate-700 / slate-200
```

### Class Patterns (Reused Across Components)

**Text Labels:**

```html
<span class="text-xs uppercase tracking-wide text-slate-400 font-semibold"> Label </span>
```

**Form Controls:**

```html
<select
  class="text-xs bg-white border border-slate-300 rounded px-2 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
></select>
```

**Cards:**

```html
<div
  class="bg-white rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200"
></div>
```

**Responsive Grid:**

```html
<!-- Cards: 1 col mobile, 2 sm, 3 lg, 4 xl -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
```

---

## 3. Data & Content Layer

### Recipe Frontmatter Schema

Every recipe MUST have complete frontmatter:

```yaml
title: Recipe Name # clean, traditional name (no adjectives)
origin: CountryName # single country of origin
cuisines: # array of cuisine styles
  - Italian
  - Mediterranean
difficulty: easy|intermediate|advanced # single value
role: main|side|dessert|beverage # course category
vibe: comfort-food|date-night|weeknight # occasion/mood

# Metadata
prepTime: '15 mins'
cookTime: '30 mins'
totalTime: '45 mins'
servings: '4'

# Tags (auto-generated but verify)
cookingMethods:
  - bake
  - simmer
dietary:
  - vegetarian
  - gluten-free
occasions:
  - weeknight
  - entertaining
flavorProfile:
  - sweet
  - acidic
  - umami

# Content
ingredients:
  - '1 cup flour'
  - '2 eggs'

# Optional
aliases: # traditional names for search
  - Historic Name
  - Translation Name
audience: # who should make this
  - families
  - beginners
image: recipe-image.png # optional image
kb:
  disable: false # disable KB suggestions for this recipe
```

### Naming Convention

- **File:** `kebab-case.md` (e.g., `apple-pie.md`)
- **Title:** Lead with primary/traditional name, remove adjectives and cooking methods
- **Origin:** Single country (NOT "Italian/Mediterranean", NOT "Europe")

---

## 4. Frontend Architecture

### Page Templates

**Homepage** (`src/pages/index.astro`)

- Component-driven: SearchBar → FilterPanel → RecipeGrid
- Minimal logic: just data fetch + coordination
- Search + Filter + Sort all managed together

**Recipe Detail** (`src/pages/recipes/[slug].astro`)

- Component structure: RecipeHeader → ContentGrid
- RecipeHeader contains all metadata/tags
- ContentGrid: ingredients (left) + markdown content (right)
- No filtering/sorting logic

### Script Organization

**In-Component Scripts (for UI-specific logic):**

```astro
<script define:vars={{ data }}>
  // Filter initialization, event listeners
  // Expose functions to window for parent coordination
</script>
```

**Cross-Component State:**

- Use `window.filterState` and `window.updateFilterState()` for coordination
- Minimal - only for essential shared state

**Future: Extract to `.ts` files when:**

- Script exceeds 50 lines
- Used across multiple pages
- Contains complex business logic

### Data Flow

```
Page fetches recipes via getCollection()
  ↓
Component receives data via props
  ↓
Component renders UI + attaches data-* attributes
  ↓
Script reads data-* to filter/sort
```

---

## 5. Deployment Workflow

### Major Change Deployment Checklist

**Every major feature/refactor must include:**

1. **Pre-Deployment**
   - ✅ Run tests (see Testing section)
   - ✅ Build succeeds: `npm run build`
   - ✅ Check primary features work
   - ✅ Verify no regressions

2. **Testing**
   - ✅ Recipe validation: `npm run validate-recipes`
   - ✅ Build check: verify 475 pages generated
   - ✅ Spot-check homepage: search, filters, sorting
   - ✅ Spot-check 2-3 recipe pages: tags display, links work

3. **Deployment**
   - `npm run build` generates `/dist/` directory
   - Deploy `/dist/` to production
   - Run post-deployment validation

4. **Post-Deployment**
   - Verify site loads
   - Test search on live site
   - Verify links are correct
   - Check mobile responsiveness

### Deployment Command (when available)

```bash
npm run deploy  # builds + deploys to production
```

---

## 6. Testing & QA Standards

### Automated Tests

**Build Verification** (Always run)

```bash
npm run build
# Verifies: Astro compilation, no TypeScript errors, all 475 pages generate
```

**Recipe Validation** (Always run)

```bash
npm run validate-recipes
# Verifies: frontmatter correctness, required fields, KB suggestions
```

### Manual Testing Checklist

**Before any deployment, test these primary features:**

#### Homepage (`/`)

- [ ] Search works (try: "chicken", "vegetarian")
- [ ] Filter by difficulty (easy/intermediate/advanced)
- [ ] Filter by cuisine (Italian, Thai, Chinese, etc.)
- [ ] Filter by dietary (vegetarian, vegan, gluten-free)
- [ ] Sort alphabetically, by prep time, by difficulty
- [ ] Combine filters + search (e.g., vegetarian Italian)
- [ ] "No results" message appears when filters return 0
- [ ] Clear search button works
- [ ] Reset filters button works
- [ ] Cards display correct tags
- [ ] Cards show correct time metadata

#### Recipe Detail Page (any recipe, e.g., `/recipes/apple-pie/`)

- [ ] Title displays correctly
- [ ] Breadcrumb navigation works
- [ ] Time metadata displays (prep/cook/total/servings)
- [ ] All tags display in correct sections:
  - [ ] Difficulty (prominent, one badge)
  - [ ] Cuisines (multiple, if present)
  - [ ] Cooking Methods (multiple, if present)
  - [ ] Dietary (multiple, if present)
  - [ ] Occasions (multiple, if present)
  - [ ] Flavor Profile (multiple, if present)
- [ ] Ingredients list displays with checkboxes
- [ ] Markdown content renders (Chef's Note, Directions, etc.)
- [ ] Links in content work
- [ ] Mobile layout works (check responsiveness)

#### Cross-Site

- [ ] Links between pages work (homepage → recipe → back)
- [ ] Mobile layout (test on phone or DevTools 375px width)
- [ ] Performance: page loads in <2 seconds
- [ ] No console errors

### Regression Testing Matrix

| Feature         | Test Case                  | Expected Result           |
| --------------- | -------------------------- | ------------------------- |
| Search          | "chicken"                  | Shows ~20 recipes         |
| Filter          | difficulty=easy            | Shows only easy recipes   |
| Filter + Search | diet=vegan + "pasta"       | Shows vegan pasta recipes |
| Sort            | prepTime                   | Orders by ascending time  |
| Tags            | Recipe detail              | 6 tag sections visible    |
| Cards           | Homepage                   | Tags show on each card    |
| Links           | Click recipe from homepage | Detail page loads         |
| Responsive      | 375px width                | Stacks properly           |

### When to Add Tests

- After bug fixes (add test to prevent regression)
- Before deploying major changes
- When changing shared components
- When modifying recipe validation rules

---

## 7. Knowledge Base & Validation

### Recipe Validation Rules

All recipes checked via `/scripts/validate-recipes.mjs`:

**Required Fields:**

- title, origin, cuisines, difficulty, role, vibe
- prepTime, cookTime, totalTime, servings
- ingredients (array)
- directions/content

**Auto-Generated:**

- cookingMethods, dietary, occasions, flavorProfile

**Constraints:**

- origin: exactly 1 value (no arrays)
- difficulty: one of [easy, intermediate, advanced]
- cuisines: array of known cuisines
- tags: lowercase, kebab-case, consistent spelling

### KB Rules (Suggestions for Recipe Authors)

See `/src/knowledge/TAGGING_GUIDE.md` for:

- Cuisine detection and best practices
- Cooking method categorization
- Dietary tag guidelines
- Occasion matching patterns
- Flavor profile definitions
- Difficulty assessment rubric

---

## 8. Git & Version Control Practices

### Commit Message Format

```
type: brief description

Body (optional, for why):
- Changed X because Y
- Affects Z functionality
```

**Types:** `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

### Branch Strategy

- `main` - production-ready code only
- `develop` - integration branch for features
- Feature branches as needed

### Before Merging

- Code compiles: `npm run build`
- Tests pass: `npm run validate-recipes`
- Manual QA done (see Testing section)
- Deployment plan documented

---

## 9. Future Architecture Considerations

### Scalability Path (If Needed)

1. **Current:** Static Astro site, 474 recipes, ~500KB total
2. **Phase 2:** Add user-generated collections/favorites (needs backend)
3. **Phase 3:** Add search analytics, recommendations (needs database)
4. **Phase 4:** API for third-party integrations (Node.js backend)

### Code Improvements Pipeline

- Extract page scripts to `.ts` files (when needed)
- Create shared Tailwind class helpers (if repetition grows)
- Add end-to-end tests with Playwright (if content scales)
- Consider design tokens system (if styling becomes complex)

---

## 10. Checklist for Future Contributors

Before committing code:

- [ ] Follows component organization rules (reusable/self-contained)
- [ ] Uses Tailwind only, no new CSS files
- [ ] Props interface documented with JSDoc
- [ ] No console errors or TypeScript issues
- [ ] Build succeeds: `npm run build`
- [ ] Validation passes: `npm run validate-recipes`
- [ ] Primary features tested (search, filters, recipe pages)
- [ ] No regressions in existing functionality
- [ ] Mobile layout verified
- [ ] Git commit message descriptive

---

## Version History

| Version | Date        | Changes                                                                  |
| ------- | ----------- | ------------------------------------------------------------------------ |
| 1.0     | Jan 4, 2026 | Initial standards: components, styling, data schema, testing, deployment |

---

**Questions about these practices?** See the relevant section above or check `/CONTRIBUTING.md` for content guidelines.
