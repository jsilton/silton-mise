# Recipe Naming Standards

## Overview

Recipe names should be clear, searchable, and respectful of their cultural origins. This guide establishes naming conventions for the Silton Mise recipe collection.

---

## Core Principles

### 1. **Use Native Language Names When Appropriate**

For dishes with well-known native names, prefer the native name over English translations or descriptions.

**Good:**

- `Phở Gà` (not "Vietnamese Chicken Noodle Soup")
- `Char Siu` (not "Chinese BBQ Pork")
- `Pad Kee Mao` (not "Drunken Noodles")
- `Shumai` (not "Pork and Shrimp Dumplings")

**When to use English:**

- The English name is universally recognized (e.g., "Fried Rice")
- The dish is a Western adaptation (e.g., "General Tso's Tofu")
- Multiple translations exist and none are standard

### 2. **Remove Parenthetical Translations**

If a recipe title includes a translation in parentheses, move the translation to context or remove it.

**Before:** `Drunken Noodles (Pad Kee Mao)`  
**After:** `Pad Kee Mao` (native name in title, "Drunken Noodles" can appear in descriptor/notes)

**Before:** `Garlic Paste (Toum)`  
**After:** `Toum` (with descriptor: "Lebanese garlic sauce")

### 3. **Remove Marketing Language & Qualifiers**

Strip superlatives, subjective claims, and unnecessary descriptors from titles.

**Remove these patterns:**

- "Best", "Perfect", "Ultimate", "Amazing"
- "Easy", "Quick", "Simple" (unless part of official recipe name)
- "(Copycat)", "(Restaurant-Style)", "(Authentic)"
- Source attributions in title (move to `source` frontmatter)

**Before:** `The Best Chocolate Chip Cookies (Science-Backed)`  
**After:** `Chocolate Chip Cookies`

**Before:** `Easy Baked Turkey Meatballs`  
**After:** `Turkey Meatballs`

**Before:** `Boston Style Peking Ravioli (Bernard's Clone)`  
**After:** `Peking Ravioli` (with origin: China, and notes about Boston/Bernard's)

### 4. **Use `origin` Frontmatter Instead of Title**

If a title includes origin information in parentheses, move it to the `origin` frontmatter field.

```yaml
# Before
title: Arroz Rojo (Mexican Red Rice)
origin: Mexico

# After
title: Arroz Rojo
origin: Mexico
```

### 5. **Simplify Ingredient Lists in Titles**

Don't enumerate all ingredients in the title unless they're essential to distinguish the dish.

**Before:** `Lime and Honey Glazed Salmon with Warm Black Bean and Corn Salad`  
**After:** `Honey Lime Salmon with Black Bean Salad`

**Before:** `Chipotle Pork & Sweet Corn "Tamale" Bowls`  
**After:** `Pork and Corn Bowls` (with cuisines: [Mexican])

---

## Special Cases

### Fusion & Adapted Dishes

For Western adaptations or fusion dishes, use descriptive English titles:

- `Korean-Style Tacos` (fusion)
- `General Tso's Cauliflower` (Western adaptation)
- `Shakshuka` (native name, though adapted globally)

### Family Recipes

When a recipe is specifically associated with a family member, include their name if culturally significant:

- `Grandmommy's Pound Cake`
- `Nana Ruth's Applesauce`
- `Chef Kriger's Shabbat Brisket`

### Common Dishes with Regional Variants

Use the most specific, recognizable name:

- `Cornbread` (not "Southern Cornbread")
- `Fried Rice` (not "Chinese Fried Rice" unless specifically needed)
- `Chocolate Cake` (unless a distinct style: "Blackout Chocolate Cake")

---

## Implementation Examples

### Full Transformation Examples

| Original Title                                | New Title        | Origin Added | Notes                           |
| --------------------------------------------- | ---------------- | ------------ | ------------------------------- |
| Drunken Noodles (Pad Kee Mao)                 | Pad Kee Mao      | Thailand     | Native name preferred           |
| Chicken Pho (Phở Gà)                          | Phở Gà           | Vietnam      | Use Vietnamese spelling         |
| Easy Wonton Soup                              | Wonton Soup      | China        | Remove "Easy" qualifier         |
| The Best Belgian Waffles                      | Belgian Waffles  | Belgium      | Remove "The Best"               |
| Garlic Paste (Toum)                           | Toum             | Lebanon      | Native name for cultural dish   |
| Quick & Easy Drop Biscuits                    | Drop Biscuits    | —            | Remove marketing language       |
| Lamb Keema Matar (Spiced Mince with Peas)     | Lamb Keema Matar | India        | Native name, remove translation |
| Boston Style Peking Ravioli (Bernard's Clone) | Peking Ravioli   | China        | Move provenance to notes        |

---

## Validation

Recipe naming is validated by `scripts/validate-recipes.mjs` using the following checks:

1. **No parenthetical translations:** Titles should not contain translations in parentheses
2. **No marketing qualifiers:** "Best", "Easy", "Perfect" should be removed
3. **No source attribution in title:** Move to `source` or `notes` frontmatter
4. **Native names preferred:** For well-known international dishes, use native language names

---

## Related Documentation

- [TAGGING_GUIDE.md](./TAGGING_GUIDE.md) - Cuisine and classification tags
- [CONTRIBUTING.md](../../CONTRIBUTING.md) - Full recipe contribution guide
- [src/content/config.ts](../config.ts) - Recipe schema definition

---

**Last Updated:** January 4, 2026  
**Migration Completed:** 57 recipes renamed following these standards
