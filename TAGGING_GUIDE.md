# Recipe Metadata Tagging Guide

## Purpose

This guide helps systematically add complete planning metadata to all 474 recipes for AI-powered meal planning.

## Tagging Decision Trees

### OCCASIONS (Multiple allowed)

**Step 1: Time-Based**

- Total time ≤30 min AND simple → `quick-lunch`
- Total time ≤45 min AND weekday-appropriate → `weeknight`
- Total time >45 min AND leisurely → `weekend-project`
- Makes ahead + reheats well → `meal-prep`

**Step 2: Social Context**

- Impressive presentation OR multi-component → `entertaining`
- Intimate, special but manageable → `date-night`
- Mild flavors, familiar ingredients → `kids-approved`
- Travels well, room temp okay, serves crowd → `potluck`

**Step 3: Seasonal/Calendar**

- Traditional holiday dish → `holiday`
- Peak summer produce (tomatoes, berries, corn) → `summer`
- Root vegetables, warm spices → `winter`
- Light, fresh, spring produce (asparagus, peas) → `spring`
- Squash, apples, warming → `fall`

**Step 4: Nutritional Intent**

- Rich, indulgent, soul-satisfying → `comfort-food`
- Light proteins, lots of vegetables → `light-and-fresh`
- Protein-forward, nutrient-dense → `post-workout`
- Celebration, no compromises → `indulgent`

### SEASONS (Multiple allowed)

**year-round**: No seasonal dependencies, pantry/frozen ingredients
**spring**: Asparagus, peas, spring onions, lamb, lighter dishes
**summer**: Tomatoes, zucchini, berries, corn, grilling, refreshing
**fall**: Squash, apples, sweet potatoes, warming spices
**winter**: Root vegetables, hearty greens, citrus, comfort

### NUTRITIONAL DENSITY (Single)

**light**:

- Salads, seafood, vegetable-forward
- Leaves you energized, not stuffed
- <500 calories likely

**moderate**:

- Balanced protein + starch + veg
- Standard portion feels satisfying
- 500-700 calories likely

**hearty**:

- Pasta dishes, stews, casseroles
- Rich sauces, generous portions
- > 700 calories likely

### LEFTOVERS (Single)

**poor**:

- Texture degrades (crispy, delicate fish, salads)
- Best eaten immediately
- Examples: fried foods, fresh salads, seared scallops

**good**:

- Reheats okay, slight quality loss
- Works for next-day lunch
- Examples: grilled chicken, roasted vegetables, simple pastas

**excellent**:

- Improves with time OR reheats perfectly
- Meal prep friendly
- Examples: stews, curries, marinated dishes, soups

### ADVANCE PREP (Multiple allowed)

**Common values**:

- `marinate-overnight` - proteins need 4+ hours
- `make-ahead-sauce` - sauce can be prepped days before
- `dough-rest` - bread/pasta dough needs time
- `brine` - requires brining step
- `pickle` - vegetables need pickling time
- `chill-overnight` - desserts that set in fridge
- `freeze-ahead` - can make and freeze before cooking

**If none needed**: Leave empty `[]`

### EQUIPMENT (Multiple allowed)

Only list if REQUIRED (not optional):

- `grill` - must grill, no oven substitute
- `slow-cooker` - recipe specifically for slow cooker
- `instant-pot` - pressure cooker required
- `stand-mixer` - hand mixing insufficient
- `food-processor` - manual chopping impractical
- `blender` - essential for texture
- `dutch-oven` - specific pot needed
- `wok` - high heat stir-frying
- `sheet-pan` - specific technique
- `cast-iron` - particular heat properties needed

**Common items NOT listed**: Regular pots, pans, knives, cutting boards

### PAIRS WITH (3-5 suggestions)

Suggest actual recipe slugs from library:

- For mains: sides, starches, salads
- For sides: proteins they complement
- For bases: proteins and vegetables

Use recipe slug format: `garlic-bread`, `steamed-broccoli`, `basmati-rice`

## Tagging Patterns by Category

### Chinese Mains (58 recipes)

- **Occasions**: Usually `weeknight`, often `kids-approved`, sometimes `meal-prep`
- **Seasons**: Mostly `year-round`
- **Density**: Usually `moderate`, occasionally `hearty`
- **Leftovers**: Typically `excellent` (stir-fries, braised)
- **Equipment**: Often `wok` or `large-skillet`
- **Pairs**: `basmati-rice`, `steamed-broccoli`, `garlic-sesame-spinach`

### Italian Pastas (many of 60 Italian)

- **Occasions**: `weeknight`, `comfort-food`, `entertaining`
- **Seasons**: `year-round` unless specific produce
- **Density**: Usually `hearty`
- **Leftovers**: `good` to `excellent`
- **Equipment**: Usually just basics
- **Pairs**: `garlic-bread`, `caesar-salad`, `arugula-salad`

### Salads (need more!)

- **Occasions**: `light-and-fresh`, `quick-lunch`, often seasonal
- **Seasons**: Match produce
- **Density**: `light`
- **Leftovers**: `poor` (dressing makes wilty)
- **Equipment**: Usually none
- **Pairs**: Heartier mains, grilled proteins

### Southern Comfort (19 recipes)

- **Occasions**: `comfort-food`, `weekend-project`, `holiday`, `entertaining`
- **Seasons**: Often `year-round`, some `fall`/`winter`
- **Density**: `hearty`
- **Leftovers**: Usually `excellent`
- **Equipment**: Sometimes `slow-cooker`, `cast-iron`, `dutch-oven`
- **Pairs**: Multiple sides make a spread

### Quick Lunches (need more!)

- **Occasions**: `quick-lunch`, `weeknight`
- **Seasons**: `year-round`
- **Density**: `light` to `moderate`
- **Leftovers**: Varies
- **Total time**: ≤30 min

### Vegetable Sides (need 30-40 more!)

- **Occasions**: `weeknight`, seasonal tags, `entertaining`
- **Seasons**: Match peak produce
- **Density**: `light`
- **Leftovers**: Usually `poor` to `good`
- **Equipment**: Often `sheet-pan`, sometimes `grill`
- **Pairs**: List complementary proteins

### Meal Prep Winners

- **Occasions**: `meal-prep`, `weeknight`
- **Leftovers**: `excellent`
- **Makes**: Large batches
- **Examples**: Curries, stews, marinated proteins, grain bowls

### Weekend Projects

- **Occasions**: `weekend-project`, `entertaining`, `indulgent`
- **Total time**: >90 min
- **Skill**: Often `intermediate` or `hard`
- **Payoff**: Restaurant-quality, learning experience

## Systematic Tagging Process

### Phase 1: Quick Wins (Do these in batches)

1. All Chinese mains (58) - similar patterns
2. All Italian pastas (~40) - similar patterns
3. All sides (70) - seasonal + pairing focused
4. All desserts (59) - occasion + season
5. All drinks (15) - occasion focused

### Phase 2: Deep Analysis (Recipe by recipe)

6. American mains (179) - highly varied
7. All other cuisines - cultural context
8. Bases (30) - pairing critical
9. Condiments (9) - pairing critical

### Phase 3: Quality Audit (Simultaneous)

While tagging, flag for quality review:

- **KEEP**: Clear winner, makes rotation
- **TEST**: Unsure if it's best version
- **REPLACE**: Find better source
- **REMOVE**: Never made, doesn't fit

## Efficiency Tips

### Batch by Similarity

- Do all stir-fries together
- Do all soups together
- Do all grain bowls together
- Do all roasted vegetables together

### Use Find/Replace for Common Patterns

```bash
# All Chinese stir-fries likely need:
equipment: [wok]
pairsWith: [basmati-rice, steamed-broccoli]
leftovers: excellent

# All fresh salads likely need:
leftovers: poor
nutritionalDensity: light
occasions: [light-and-fresh]
```

### Reference Existing Tagged Recipes

Look at similar recipes already tagged to maintain consistency.

### When Unsure

- **Occasions**: Be generous, multiple tags okay
- **Seasons**: If year-round possible, include it
- **Density**: Think about how full you feel after
- **Leftovers**: Be honest (poor is okay!)
- **Equipment**: Only if truly required

## Quality Questions While Tagging

For each recipe, note:

1. Is this actually restaurant-quality?
2. Do we make this regularly?
3. Is the source authoritative?
4. Does it follow our 7 culinary principles?
5. Could we find a better version?

Flag recipes scoring <15/25 on quality rubric for replacement.

## Output Format

Each recipe should have:

```yaml
---
title: Recipe Name
origin: Source/Attribution (if known)
difficulty: easy|intermediate|medium|hard
cookingMethods: [method1, method2]
dietary: [dietary1, dietary2] # vegetarian, vegan, gluten-free, dairy-free, etc.
occasions: [occasion1, occasion2, occasion3] # Be generous
flavorProfile: [flavor1, flavor2]
cuisines: [cuisine1]
role: main|side|base|dessert|drink|condiment
vibe: quick|nutritious|comfort|technical|holiday
prepTime: X min
cookTime: X min
totalTime: X min
servings: 'X'
seasons: [season1, season2] # or year-round
nutritionalDensity: light|moderate|hearty
leftovers: poor|good|excellent
advancePrep: [prep1, prep2] # or empty []
equipment: [tool1, tool2] # or empty []
pairsWith: [recipe-slug-1, recipe-slug-2, recipe-slug-3]
ingredients:
  - ingredient1
  - ingredient2
---
```

## Progress Tracking

Use todo list to track:

- [ ] Chinese mains (58) - 3 done, 55 remaining
- [ ] Italian pastas (~40)
- [ ] Sides (70) - 1 done, 69 remaining
- [ ] Desserts (59)
- [ ] And so on...

## Next Steps After Tagging

1. Run distribution analysis
2. Identify gaps (cuisines, times, densities)
3. Quality audit flagged recipes
4. Build pairing database
5. Create meal planning algorithm
6. Integrate with calendar
