import { defineCollection, z } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // What is this dish?
    role: z.enum(['main', 'side', 'base', 'dessert', 'drink', 'condiment']).optional(),
    // When should I cook it?
    vibe: z.enum(['quick', 'nutritious', 'comfort', 'technical', 'holiday']).optional(),
    difficulty: z.enum(['easy', 'intermediate', 'medium', 'hard']).optional(),
    
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalTime: z.string().optional(),
    servings: z.string().optional(),
    
    cookingMethods: z.array(z.string()).optional(),
    dietary: z.array(z.string()).optional(),
    occasions: z.array(z.string()).optional(),
    flavorProfile: z.array(z.string()).optional(),
    cuisines: z.array(z.string()).optional(),
    
    ingredients: z.array(z.string()).optional(),
  }),
});

export const collections = {
  recipes: recipesCollection,
};
