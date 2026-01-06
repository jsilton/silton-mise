import { defineCollection, z } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    origin: z.string().optional(), // Source/attribution

    // What is this dish?
    role: z.enum(['main', 'side', 'base', 'dessert', 'drink', 'condiment']).optional(),

    // When should I cook it?
    vibe: z.enum(['quick', 'nutritious', 'comfort', 'technical', 'holiday']).optional(),
    difficulty: z.enum(['easy', 'intermediate', 'medium', 'hard']).optional(),

    // Time constraints
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalTime: z.string().optional(),
    servings: z.string().optional(),

    // Classification arrays
    cookingMethods: z.array(z.string()).optional(),
    dietary: z.array(z.string()).optional(),
    occasions: z.array(z.string()).optional(), // Time-based, social, seasonal, nutritional intent
    flavorProfile: z.array(z.string()).optional(),
    cuisines: z.array(z.string()).optional(),

    // Planning metadata
    seasons: z.array(z.string()).optional(), // spring, summer, fall, winter, year-round
    nutritionalDensity: z.enum(['light', 'moderate', 'hearty']).optional(), // meal weight
    leftovers: z.enum(['poor', 'good', 'excellent']).optional(), // reheating quality
    advancePrep: z.array(z.string()).optional(), // marinate-overnight, make-ahead-sauce, etc.
    equipment: z.array(z.string()).optional(), // grill, slow-cooker, instant-pot, stand-mixer, etc.

    // Pairing suggestions
    pairsWith: z.array(z.string()).optional(), // Suggested complementary dishes (must be valid recipe slugs)

    ingredients: z.array(z.string()).optional(),
  }),
});

// Composed meals - curated combinations of recipes
const mealsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),

    // Meal template type
    template: z
      .enum(['plate', 'bowl', 'pasta-night', 'soup-and-side', 'one-pot', 'grazing'])
      .optional(),

    // Component recipes (slugs)
    main: z.string().optional(), // Main dish recipe slug
    sides: z.array(z.string()).optional(), // Side dish recipe slugs
    base: z.string().optional(), // Starch/grain recipe slug
    salad: z.string().optional(), // Salad recipe slug
    sauce: z.string().optional(), // Sauce/condiment recipe slug
    dessert: z.string().optional(), // Optional dessert
    // Note: drink pairings planned for future expansion

    // Computed/curated aggregates
    totalPrepTime: z.string().optional(), // Sum of all prep times
    totalCookTime: z.string().optional(), // Longest cook time (parallel cooking)
    totalActiveTime: z.string().optional(), // Hands-on time estimate
    overallDifficulty: z.enum(['easy', 'intermediate', 'medium', 'hard']).optional(),

    // Planning metadata
    cuisines: z.array(z.string()).optional(), // Primary cuisine(s)
    occasions: z.array(z.string()).optional(), // weeknight, entertaining, etc.
    seasons: z.array(z.string()).optional(),
    nutritionalDensity: z.enum(['light', 'moderate', 'hearty']).optional(),
    servings: z.string().optional(),

    // Day-of-week suitability
    bestFor: z.array(z.string()).optional(), // sunday, monday, weekend-project, etc.
  }),
});

// Meal history - track what was made and feedback
const mealHistoryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // What was made
    meal: z.string().optional(), // Meal slug if from curated meal
    recipes: z.array(z.string()).optional(), // Recipe slugs if ad-hoc combination

    // When
    date: z.string(), // ISO date string (YYYY-MM-DD)
    dayOfWeek: z.string().optional(),

    // Feedback
    rating: z.number().min(1).max(5).optional(), // Overall meal rating
    recipeRatings: z
      .array(
        z.object({
          recipe: z.string(),
          rating: z.number().min(1).max(5),
          notes: z.string().optional(),
        })
      )
      .optional(),

    // Notes
    notes: z.string().optional(), // General meal notes
    wouldMakeAgain: z.boolean().optional(),
    modifications: z.array(z.string()).optional(), // What was changed

    // Context
    occasion: z.string().optional(), // weeknight, date-night, etc.
    guests: z.number().optional(), // How many people
  }),
});

// Weekly calendar plans
const calendarsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    weekStart: z.coerce.date().optional(), // ISO date YYYY-MM-DD
    weekEnd: z.coerce.date().optional(), // ISO date YYYY-MM-DD
  }),
});

export const collections = {
  recipes: recipesCollection,
  meals: mealsCollection,
  'meal-history': mealHistoryCollection,
  calendars: calendarsCollection,
};
