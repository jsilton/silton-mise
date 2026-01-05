# Implementation Roadmap

## What We've Built (January 4, 2026)

### ✅ Foundation Complete

1. **Extended Schema** - Added 7 new metadata fields for AI meal planning
2. **Occasion Taxonomy** - 16 occasion tags across 4 categories
3. **MEAL_PLANNING_STRATEGY.md** - Complete vision and architecture
4. **TAGGING_GUIDE.md** - Decision trees and systematic approach
5. **batch-tagger.js** - Analysis tool for tracking progress
6. **Sample Tagged Recipes** - 3 complete examples showing patterns

### 📊 Current State

**Recipe Distribution:**

- 291 mains, 70 sides, 59 desserts, 30 bases, 15 drinks, 9 condiments
- 210 quick (≤30min), 105 weeknight (31-45min), 96 weekend, 56 project
- 58 Chinese, 60 Italian, 179 American, 19 Southern, and 16 other cuisines

**Metadata Completeness:**

- cuisines: 100% ✅
- role, vibe, difficulty: 100% ✅
- time data: 98%+ ✅
- occasions: 30% ⚠️
- NEW fields (seasons, density, leftovers, equipment, pairsWith): 1% ⚠️

### 🎯 Immediate Next Steps

## Phase 1: Complete Metadata (Weeks 1-2)

**Week 1: High-Volume Categories**

- [ ] Chinese mains (58) - Use template, batch process
- [ ] Italian mains (~40) - Similar patterns
- [ ] American sides (70) - Season + pairing focused
- [ ] All desserts (59) - Occasion + season

**Week 2: Remaining Categories**

- [ ] American mains (179) - Most varied, needs case-by-case
- [ ] Other cuisines (Thai, Korean, Japanese, Mexican, etc.)
- [ ] Bases (30) - Critical for pairing
- [ ] Condiments (9) - Quick wins

**Tools Available:**

```bash
# Analyze any category
node scripts/batch-tagger.js chinese
node scripts/batch-tagger.js italian
node scripts/batch-tagger.js sides

# Check progress
grep -h "^seasons:" src/content/recipes/*.md | grep -v "seasons: \[\]" | wc -l

# Find recipes still needing work
grep -L "seasons:" src/content/recipes/*.md | head -20
```

## Phase 2: Statistical Analysis (Week 3)

Once all metadata is complete, run comprehensive analysis:

### Time Distribution Analysis

```bash
# Count recipes by time bucket
node scripts/analyze-distribution.js time

# Expected output:
# Emergency (<20 min): X recipes
# Quick (20-30 min): X recipes
# Weeknight (30-45 min): X recipes
# Weekend (45-90 min): X recipes
# Project (>90 min): X recipes
```

### Cuisine Balance Analysis

```bash
node scripts/analyze-distribution.js cuisine

# Check for:
# - Overrepresented cuisines (>50 recipes)
# - Underrepresented cuisines (<10 recipes)
# - Missing classics within each cuisine
```

### Meal Architecture Analysis

```bash
node scripts/analyze-distribution.js meals

# Ensure we can build complete meals:
# - Protein options per cuisine
# - Starch/base options
# - Vegetable side options
# - Pairing coverage (what mains lack sides?)
```

### Nutritional Density Balance

```bash
node scripts/analyze-distribution.js density

# Week needs mix:
# - Light: 2-3 nights
# - Moderate: 3-4 nights
# - Hearty: 1-2 nights
```

### Seasonal Coverage

```bash
node scripts/analyze-distribution.js seasons

# Ensure adequate options for each season
# Flag seasonal ingredients only used once
```

## Phase 3: Gap Identification (Week 4)

Create prioritized "needed recipes" list:

### Critical Gaps

1. **Salads** - Need 20-30 versatile salads
   - Caesar, Greek, Asian Slaw, Kale varieties
   - Quick lunch options
   - Side salads for entertaining

2. **Vegetable Sides** - Need 30-40 more preparations
   - Roasted: carrots, cauliflower, brussels sprouts, sweet potatoes
   - Sautéed: spinach, chard, cabbage, green beans
   - Grilled: zucchini, eggplant, peppers, corn

3. **Clean Proteins** - Need 15-20 simple preparations
   - Pan-seared chicken breast variations
   - Grilled fish (salmon, cod, halibut)
   - Simple beef (flank steak, sirloin)
   - Shrimp preparations

4. **Grain Bases** - Need 10-15 more
   - Rice varieties (jasmine, brown, wild)
   - Quinoa preparations
   - Couscous, farro, bulgur
   - Polenta, grits

5. **Emergency Meals** - Need 20 recipes <20 min
   - Egg dishes
   - Simple pastas
   - Quick stir-fries
   - Sandwiches/wraps

### Cuisine-Specific Gaps

**Chinese** (58 recipes, fairly complete)

- Missing: Cantonese greens, more dim sum, congee

**Italian** (60 recipes, pasta-heavy)

- Missing: More risottos, polentas, regional specialties

**Japanese** (11 recipes, MAJOR GAP)

- Need: Teriyaki, katsu, donburi, more ramen, yakitori

**Thai** (16 recipes, decent base)

- Need: More curries, pad see ew, som tam

**Indian** (10 recipes, MAJOR GAP)

- Need: Regional variety, dal, paneer dishes, biryanis

**Mexican** (30 recipes, solid)

- Need: More tacos, enchiladas, rice/beans variations

**Mediterranean** (19 recipes, good variety)

- Need: More Greek, Turkish, Lebanese specifics

## Phase 4: Quality Audit (Weeks 5-6)

Score all 474 recipes using rubric:

### Quality Rubric (5 points each, 25 total)

1. **Culinary Technique** - Follows 7 principles?
2. **Source Authority** - Trusted source?
3. **Flavor Complexity** - Restaurant-quality?
4. **Practical Reliability** - Works every time?
5. **Family Adoption** - Actually gets made?

### Actions by Score

- **20-25** (Keepers): Core 100-150 recipes, protect these
- **15-19** (Good): Occasional use, maybe refine, 200-250 recipes
- **10-14** (Replace): Find better versions, ~50 recipes
- **<10** (Remove): Not worth keeping, ~20 recipes

### Quality Audit Outputs

```bash
# Generate report
node scripts/quality-audit.js

# Creates:
# - KEEPERS.md (top 100-150 core rotation)
# - REFINEMENTS.md (good recipes to improve)
# - REPLACEMENTS.md (recipes to replace with better versions)
# - REMOVALS.md (candidates for removal)
```

## Phase 5: Pairing Database (Week 7)

Build structured pairing suggestions:

### Automated Pairing Generation

```bash
node scripts/generate-pairings.js

# For each main:
# - Suggest 3-5 compatible sides (by cuisine, density, flavor)
# - Suggest starches/bases
# - Suggest salads

# For each side:
# - List compatible proteins
```

### Manual Curation

Review auto-generated pairings, adjust for:

- Flavor conflicts (too much acid, too much sweet)
- Texture redundancy (all mushy or all crunchy)
- Color variety (avoid all brown/beige)
- Effort balance (not all technical)

## Phase 6: Meal Planning Prototype (Weeks 8-9)

### Build Constraint Solver

**Inputs:**

```javascript
const constraints = {
  family: {
    size: 2 - 4,
    restrictions: ['no-shellfish', 'no-cilantro'],
    preferences: ['loves-asian', 'likes-spicy'],
  },
  week: {
    monday: { time: 30, energy: 'low' },
    tuesday: { time: 45, energy: 'medium' },
    wednesday: { time: 40, energy: 'medium' },
    thursday: { time: 45, energy: 'medium' },
    friday: { time: 20, energy: 'low', optional: true },
    saturday: { time: 90, energy: 'high' },
    sunday: { time: 60, energy: 'medium' },
  },
  variety: {
    minCuisines: 4,
    maxRepeatDays: 2,
    balanceDensity: true,
  },
  pantry: ['chicken', 'ground-beef', 'pasta', 'rice', 'eggs'],
  lastWeek: ['pad-thai', 'chicken-parm', 'tacos'],
};
```

**Algorithm:**

```javascript
function planWeek(constraints) {
  // 1. Filter recipe pool by restrictions
  // 2. For each day, rank recipes by:
  //    - Time fit (exact match > close > wrong bucket)
  //    - Cuisine variety (new > recent)
  //    - Density balance (alternate heavy/light)
  //    - Pantry usage (prefer existing ingredients)
  //    - Family preferences (favorites boost)
  // 3. Select top recipes ensuring:
  //    - No cuisine repeats within 2 days
  //    - Density distributes across week
  //    - Min X cuisines represented
  // 4. Add complementary sides
  // 5. Generate shopping list
  // 6. Suggest prep tasks
}
```

**Output:**

```javascript
{
  menu: {
    monday: {
      main: 'honey-sesame-chicken',
      side: 'basmati-rice',
      vegetable: 'steamed-broccoli',
      time: 25,
      density: 'moderate'
    },
    // ... rest of week
  },
  shopping: {
    produce: ['broccoli', 'green onions', ...],
    proteins: ['chicken thighs', ...],
    pantry: ['honey', 'soy sauce', ...]
  },
  prep: {
    sunday: ['marinate-tuesday-chicken', 'make-wednesday-sauce']
  }
}
```

## Phase 7: Integration (Weeks 10-11)

### Paprika Export

```bash
node scripts/export-paprika.js

# Generates Paprika-compatible JSON
# Maintains ingredient parsing
# Preserves categories and tags
```

### Google Calendar Integration

```javascript
// Create calendar events with:
// - Recipe name + link
// - Prep time block
// - Cooking time block
// - Ingredients in description
// - Shopping list on Sunday
```

### Future: Pantry Tracking

- Integrate with existing pantry apps
- Track what's on hand
- Suggest recipes using existing ingredients
- Alert for expiring items

## Success Metrics

### Short-term (3 months)

- [ ] All 474 recipes have complete metadata
- [ ] Top 100 "keepers" identified
- [ ] 50 gap recipes added
- [ ] Prototype meal planner working

### Medium-term (6 months)

- [ ] 80% of planned meals actually cooked
- [ ] <30 min planning time per week
- [ ] 20% reduction in food waste
- [ ] Family satisfaction >90%

### Long-term (1 year)

- [ ] 600+ recipe library
- [ ] AI suggests menus automatically
- [ ] Pantry integration working
- [ ] Calendar fully automated
- [ ] Shopping lists optimize efficiency

## Development Approach

### Incremental + Test-Driven

1. Tag 10-20 recipes → test meal planner
2. Get feedback → refine algorithm
3. Tag next 50 → test with more variety
4. Iterate on constraints → improve suggestions
5. Full rollout once confident

### Family Involvement

- Weekly review: did we follow the plan?
- Recipe feedback: keepers vs. replace
- Constraint adjustments: more/less time, variety
- New recipe requests: what are we missing?

## Tools to Build

### Analysis Scripts

- `analyze-distribution.js` - Statistical breakdowns
- `quality-audit.js` - Score all recipes
- `generate-pairings.js` - Auto-suggest compatible dishes
- `find-gaps.js` - Identify needed recipes

### Planning Tools

- `meal-planner.js` - Core constraint solver
- `shopping-list.js` - Aggregate ingredients
- `calendar-export.js` - Generate calendar events
- `pantry-match.js` - Find recipes using on-hand items

### Maintenance Tools

- `validate-metadata.js` - Ensure all fields present
- `check-pairings.js` - Verify paired recipes exist
- `update-seasons.js` - Adjust seasonal tags
- `find-unused.js` - Flag recipes never planned

## Next Action

**Right now, let's:**

1. Start batch-tagging Chinese mains (58 recipes)
2. Use the patterns established in sample recipes
3. Leverage batch-tagger.js to track progress
4. Commit in logical batches (10-20 recipes)

**Want me to start tagging Chinese recipes systematically?**
