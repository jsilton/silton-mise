# Recipe Classification & Tagging Guide

## Overview

All recipes are now tagged with standardized metadata to enable discovery, filtering, and contextual suggestions. Tags are organized into six categories:

---

## Tag Categories & Values

### 1. **cookingMethods** (Array)

Techniques used in the recipe. Helps users find recipes by cooking method.

- `bake` — oven baking
- `roast` — high-heat roasting
- `grill` — grilling (char/flame)
- `fry` — shallow or deep frying
- `sauté` — pan cooking over medium-high heat
- `simmer` — gentle low heat cooking
- `boil` — cooking in boiling liquid
- `steam` — cooking via steam
- `poach` — cooking in gently simmering liquid
- `braise` — searing then slow-cooking in liquid
- `slow-cook` — low and slow (Crock-Pot, etc.)
- `no-cook` — requires no cooking
- `blend` — blending/food processor
- `assemble` — no cooking, just assembly
- `sous-vide` — precise temperature water bath
- `smoke` — smoking
- `candied` — sugar/syrup preserved

Example: `cookingMethods: [bake, fry]`

---

### 2. **cuisines** (Array)

Cultural/regional origin(s). Supports multiple if fusion.

- `Italian` — Italian cuisine
- `Chinese` — Chinese cuisine
- `Japanese` — Japanese cuisine
- `Indian` — Indian cuisine
- `Mexican` — Mexican cuisine
- `Thai` — Thai cuisine
- `Vietnamese` — Vietnamese cuisine
- `Korean` — Korean cuisine
- `French` — French cuisine
- `Greek` — Greek cuisine
- `Spanish` — Spanish cuisine
- `Middle Eastern` — Middle Eastern cuisine
- `Lebanese` — Lebanese cuisine
- `American` — American cuisine
- `Brazilian` — Brazilian cuisine
- `Israeli` — Israeli cuisine
- `Caribbean` — Caribbean cuisine
- `Filipino` — Filipino cuisine
- `Portuguese` — Portuguese cuisine
- `Fusion` — Fusion/contemporary

Example: `cuisines: [Italian, French]` for a fusion dish

**Note:** This overlaps with the `origin` field (single country). Use `cuisines` for broader cultural classification and multiple origins.

---

### 3. **dietary** (Array)

Dietary attributes & restrictions.

- `vegetarian` — no meat/fish
- `vegan` — no animal products
- `gluten-free` — no gluten
- `dairy-free` — no dairy
- `nut-free` — no tree nuts or peanuts
- `egg-free` — no eggs
- `low-sugar` — minimal added sugar
- `high-protein` — significant protein content
- `keto-friendly` — low carb
- `paleo` — paleo-compatible ingredients
- `whole-30` — Whole-30 compliant
- `low-sodium` — minimal salt
- `kosher` — kosher certified or compliant
- `halal` — halal-friendly ingredients

Example: `dietary: [vegetarian, gluten-free]`

---

### 4. **occasions** (Array)

When/why you'd make this recipe.

- `weeknight` — quick, no-fuss, family-friendly (under 60 min total)
- `entertaining` — impressive, company-worthy
- `holiday` — holiday/celebration
- `comfort-food` — soul-satisfying, nostalgic
- `date-night` — romantic, elegant
- `meal-prep` — stores well, batch-friendly
- `make-ahead` — can be prepared in advance
- `picnic` — portable, travel-friendly
- `brunch` — breakfast/lunch
- `potluck` — shareable, transport-friendly
- `kids-approved` — child-friendly flavors/textures
- `game-day` — snack/party food

Example: `occasions: [weeknight, comfort-food]`

---

### 5. **flavorProfile** (Array)

Primary taste/sensory characteristics.

- `spicy` — heat/peppers
- `sweet` — sugary/dessert
- `savory` — umami/salty
- `acidic` — bright/tangy (citrus, vinegar)
- `umami` — deep, savory richness
- `rich` — heavy/luxurious (cream, butter, fat)
- `fresh` — light, bright ingredients
- `smoky` — smoke/char flavor
- `herbaceous` — herbs dominant
- `nutty` — nuts or toasted flavor
- `fruity` — fruit-forward
- `earthy` — mushrooms, root vegetables
- `floral` — delicate, fragrant (flowers, herbs)
- `balanced` — no single dominant taste

Example: `flavorProfile: [spicy, savory, umami]`

---

### 6. **difficulty** (Single Value)

Skill level & time commitment.

- `easy` — straightforward, 5-10 steps, beginner-friendly
- `intermediate` — some technique or timing required, 10-20 steps
- `advanced` — precise technique, multiple stages, professional skills

Example: `difficulty: intermediate`

---

### 7. **seasons** (Array)

Best time of year to cook this recipe.

- `spring` — asparagus, peas, spring onions, lamb, lighter dishes
- `summer` — tomatoes, zucchini, berries, corn, grilling, refreshing
- `fall` — squash, apples, sweet potatoes, warming spices
- `winter` — root vegetables, hearty greens, citrus, comfort
- `year-round` — no seasonal dependencies, pantry/frozen ingredients

Example: `seasons: [summer, fall]`

---

### 8. **nutritionalDensity** (Single Value)

Meal weight and perceived heaviness.

- `light` — salads, seafood, veg-forward (<500 cal feel)
- `moderate` — balanced protein + starch + veg (500-700 cal feel)
- `hearty` — pasta, stews, rich sauces, casseroles (>700 cal feel)

Example: `nutritionalDensity: moderate`

---

### 9. **leftovers** (Single Value)

Reheating quality.

- `poor` — texture degrades (crispy, delicate fish, dressed salads)
- `good` — reheats okay, minimal quality loss
- `excellent` — improves with time or perfect reheat (stews, curries)

Example: `leftovers: excellent`

---

### 10. **advancePrep** (Array)

Preparation steps required hours or days before cooking.

- `marinate-overnight` — proteins need 4+ hours
- `make-ahead-sauce` — sauce can be prepped early
- `dough-rest` — needing resting time
- `brine` — require brining
- `pickle` — pickling time
- `chill-overnight` — setting time (desserts)
- `freeze-ahead` — can be frozen before cooking

Example: `advancePrep: [marinate-overnight]`

---

## Schema Example

```yaml
---
title: Chicken Parmesan
origin: Italy
cuisines: [Italian]
role: main
vibe: comfort
difficulty: intermediate
cookingMethods: [fry, bake]
flavorProfile: [savory, rich, acidic]
dietary: []
occasions: [weeknight, comfort-food]
prepTime: 15 min
cookTime: 25 min
totalTime: 40 min
servings: '4'
---
```

---

## Notes

- **origin** (single country) vs. **cuisines** (array of cultural regions): Use `origin` for strict country of origin; use `cuisines` for broader cultural classification or fusion context.
- **Empty arrays**: Use `[]` for no applicable tags (e.g., `dietary: []` for recipes with no special restrictions).
- **No Conflicts**: A recipe CAN be both `vegetarian` AND `comfort-food`. Use all applicable tags.
- **Manual Review**: Some tags (especially `occasions`, `flavorProfile`) require human judgment. Automated detection is a future enhancement.

---

## Maintenance

- Update this guide if new tags are needed.
- Tags are case-sensitive; use exact spelling.
- Add tags to new recipes during submission.
- Use the PR template to ensure tags are included.
