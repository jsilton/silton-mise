# Meal Planning Strategy & Recipe Library Analysis

## Vision

Build an AI-powered culinary decision support system that:
1. Maintains 474 restaurant-quality recipes with rich metadata
2. Suggests weekly menus based on time, season, variety, nutrition, and preference
3. Generates shopping lists and manages pantry creativity
4. Balances indulgence with health across cultural cuisines
5. Integrates with Paprika for recipe management and Google Calendar for planning

## Current State (January 2026)

### What We Have ✅
- 474 recipes with frontmatter metadata
- Rich classification: role, vibe, difficulty, cuisine, cooking methods, dietary, flavor profile
- Time data: prepTime, cookTime, totalTime
- Basic occasion tagging (99 comfort-food, 32 holiday, 7 kids-approved)

### What We're Adding 🚧
- **Extended Schema Fields:**
  - `seasons` - ingredient availability and dish appropriateness
  - `nutritionalDensity` - light/moderate/hearty for meal balance
  - `leftovers` - reheating quality for meal prep
  - `advancePrep` - overnight marination, make-ahead sauces
  - `equipment` - special tools required
  - `pairsWith` - suggested complementary dishes
  - `origin` - recipe attribution/source

- **Comprehensive Occasion Tags:**
  - Time-based: `weeknight`, `weekend-project`, `quick-lunch`, `meal-prep`
  - Social: `entertaining`, `date-night`, `kids-approved`, `potluck`
  - Seasonal: `holiday`, `summer`, `winter`, `spring`, `fall`
  - Intent: `comfort-food`, `light-and-fresh`, `post-workout`, `indulgent`

### What We Need 📋

#### Recipe Distribution Analysis
1. **By Role:**
   - Mains: ? recipes
   - Sides: ? recipes
   - Bases: ? recipes (rice, pasta, grains)
   - Desserts: ? recipes
   - Drinks: ? recipes
   - Condiments: ? recipes

2. **By Time Constraint:**
   - Quick (<30 min): ? recipes
   - Weeknight (30-45 min): ? recipes
   - Weekend (45-90 min): ? recipes
   - Project (90+ min): ? recipes

3. **By Cuisine Balance:**
   - American: 179, Southern: 19
   - Chinese: 58, Japanese: 11, Korean: 12, Thai: 16, Vietnamese: 6, Indian: 10
   - Italian: 60, French: 18, Spanish: 4, Greek: 5
   - Mexican: 30, Caribbean: 2
   - Middle Eastern: 5, Israeli: 1, Lebanese: 1
   - Mediterranean: 19, Jewish: 10

4. **By Nutritional Density:**
   - Light: ? (salads, seafood, vegetable-forward)
   - Moderate: ? (balanced plates)
   - Hearty: ? (pasta, stews, comfort food)

#### Gaps to Address

**Missing Essential Categories:**
- Not enough salads (need 20-30 versatile salads)
- Insufficient vegetable sides (need 30-40 different preparations)
- Limited grain/starch bases (need more rice, quinoa, couscous, polenta options)
- Few breakfast items for weekday mornings
- Limited "clean" protein preparations (simply grilled/pan-seared)

**Cuisine Depth Needed:**
- Chinese: need more Cantonese, Sichuan depth
- Japanese: need basics (teriyaki, katsu, donburi)
- Indian: need regional variety (North vs South)
- Thai: need curries, stir-fries, noodles
- Mediterranean: need Greek, Turkish, Lebanese classics

**Time Distribution Gaps:**
- Need more 15-20 min emergency meals
- Need more meal-prep friendly options
- Need more slow-cooker/instant-pot set-and-forget

## Phase 1: Complete Metadata (In Progress)

### Step 1: Update All 474 Recipes ⏳
For each recipe, add:
- `occasions` - appropriate contexts
- `seasons` - when ingredients are best
- `nutritionalDensity` - meal weight
- `leftovers` - reheating quality
- `equipment` - special tools
- `pairsWith` - complementary dishes

### Step 2: Statistical Analysis
Run queries to determine:
- Distribution by all metadata fields
- Time clustering (quick/weeknight/weekend/project)
- Cuisine diversity scores
- Role balance (main/side/base ratios)
- Seasonal coverage

### Step 3: Gap Identification
Generate "needed recipes" list:
- 20-30 essential salads
- 30-40 vegetable sides
- Missing cultural classics
- Time constraint fillers
- Seasonal specialties

## Phase 2: Recipe Quality Audit

### Quality Scoring Rubric
For each recipe, evaluate:

1. **Culinary Technique Adherence** (1-5)
   - Follows 7 core principles?
   - Proper searing, acid balance, texture?
   - Modern techniques vs legacy shortcuts?

2. **Source Authority** (1-5)
   - From trusted sources (Serious Eats, Kenji, Smitten Kitchen)?
   - Tested and reliable?
   - Best-in-class version?

3. **Flavor Complexity** (1-5)
   - Restaurant-quality depth?
   - Proper layering?
   - Finishing "high note"?

4. **Practical Reliability** (1-5)
   - Works every time?
   - Clear instructions?
   - Forgiving or finicky?

5. **Family Adoption** (1-5)
   - Actually gets made?
   - Requested repeats?
   - Worth the effort?

**Scoring:**
- 20-25: "Keeper" - Core rotation recipe
- 15-19: "Good" - Occasional use, maybe refine
- 10-14: "Replace" - Find better version
- <10: "Remove" - Not worth keeping

### Action Items from Audit
- Flag top 50-100 "keeper" recipes
- Identify 20-30 to replace with better versions
- Remove 10-20 that never get made
- Find authoritative sources for improvements

## Phase 3: Meal Architecture

### Complete Meal Templates

**Template 1: Balanced Dinner Plate**
- Protein (4-6 oz)
- Starch/Grain (1 cup)
- Vegetable (1-2 cups)
- Optional: Salad, Sauce

**Template 2: Bowl**
- Base (rice, grain, noodles)
- Protein
- Vegetables (2-3 types)
- Sauce/Dressing
- Toppings/Texture

**Template 3: Pasta Night**
- Pasta
- Sauce (red, white, oil-based)
- Protein or vegetables
- Salad

**Template 4: Soup + Side**
- Hearty soup (protein, veg, starch)
- Bread or salad
- Optional: Cheese

### Day-of-Week Profiles

**Monday:** "Recovery Day"
- Time: 30-40 min max
- Density: Light-moderate
- Cuisine: Comfort but not heavy
- Examples: Stir-fry, pasta, grain bowls

**Tuesday:** "Variety Day"
- Time: 40-50 min
- Density: Moderate
- Cuisine: Try something different from Monday
- Examples: Curry, tacos, Mediterranean

**Wednesday:** "Hump Day"
- Time: 30-45 min
- Density: Moderate-hearty
- Cuisine: Crowd-pleaser
- Examples: Roasted chicken, meatballs, casserole

**Thursday:** "Pre-Weekend"
- Time: 45-60 min
- Density: Hearty
- Cuisine: More adventurous okay
- Examples: Braised dishes, complex stir-fries

**Friday:** "Easy Street"
- Time: 20-30 min or takeout
- Density: Light-moderate
- Cuisine: Simple or special order
- Examples: Pizza, sandwiches, simple seafood

**Saturday:** "Project Day"
- Time: 60-120 min
- Density: Any
- Cuisine: Learning opportunity
- Examples: Dumplings, bread, slow-roasted

**Sunday:** "Prep + Feast"
- Time: Split (30 min cook + meal prep)
- Density: Moderate-hearty
- Cuisine: Family favorites
- Examples: Roasts, big batches for week

### Pairing Database
Build relationships:
- Grilled chicken → pairs with: garlic roasted potatoes, green beans, arugula salad
- Pasta marinara → pairs with: garlic bread, caesar salad
- Thai curry → pairs with: jasmine rice, cucumber salad
- Etc.

## Phase 4: AI Planner

### Constraint Solver Inputs

**User Context:**
- Family size: ?
- Dietary restrictions: ?
- Disliked ingredients: ?
- Skill level comfort: ?
- Equipment available: ?

**Weekly Constraints:**
- Time available each night
- Special events (entertaining, kids' activities)
- Previous week's meals (avoid repetition)
- Pantry current state
- Season/month
- Shopping trip frequency

### Planning Algorithm

```
For each week:
  1. Analyze constraints (time, variety, nutrition)
  2. Select 7 dinner templates
  3. For each night:
     - Match time constraint to recipe pool
     - Ensure cuisine variety (no repeats within 3 days)
     - Balance nutritional density across week
     - Check complementary pairings
     - Verify ingredient overlap for efficiency
  4. Generate shopping list
  5. Suggest prep tasks (Sunday: marinate for Tuesday, etc.)
  6. Export to calendar with recipe links
```

### Integration Points

**Paprika Integration:**
- Import recipes from Paprika format
- Export validated recipes back
- Sync ingredient lists
- Maintain native iOS experience

**Google Calendar Integration:**
- Create meal events with recipe links
- Include prep time in calendar blocks
- Attach shopping lists to weekend
- Set reminders for advance prep

**Future: Pantry Management:**
- Track what's on hand
- Suggest recipes using existing ingredients
- Alert for expiring items
- Generate minimal shopping lists

## Success Metrics

**Meal Planning:**
- 80%+ of planned meals actually cooked
- <30 min average planning time per week
- 20%+ reduction in food waste
- 90%+ family satisfaction

**Recipe Library:**
- All 474 recipes have complete metadata
- Top 100 "keepers" identified
- Zero recipes unused for 6+ months
- 30+ new recipes added per year

**Variety:**
- 10+ different cuisines per month
- 25+ unique recipes per month
- No recipe repeated within 30 days
- Seasonal ingredients used appropriately

## Next Actions

1. ✅ Update schema with new fields
2. ✅ Document occasion taxonomy
3. ⏳ Tag all 474 recipes with occasions
4. ⏳ Add seasons, density, leftovers, equipment to all recipes
5. ⏳ Run statistical analysis
6. ⏳ Generate gap list
7. ⏳ Begin quality audit
8. ⏳ Build pairing database
9. ⏳ Prototype constraint solver
10. ⏳ Calendar integration proof-of-concept
