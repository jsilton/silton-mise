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
    pairsWith: z.array(z.string()).optional(), // Suggested complementary dishes

    ingredients: z.array(z.string()).optional(),
  }),
});

export const collections = {
  recipes: recipesCollection,
};
