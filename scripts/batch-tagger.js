#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Recipe Batch Tagger
 *
 * Helps efficiently add metadata to groups of similar recipes.
 * Run with: node scripts/batch-tagger.js [category]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPES_DIR = path.join(__dirname, '../src/content/recipes');

// Common metadata templates
const TEMPLATES = {
  chineseStirFry: {
    occasions: ['weeknight', 'quick-lunch', 'meal-prep'],
    seasons: ['year-round'],
    nutritionalDensity: 'moderate',
    leftovers: 'excellent',
    equipment: ['wok'],
    pairsWith: ['basmati-rice', 'steamed-broccoli', 'garlic-sesame-spinach'],
  },

  italianPasta: {
    occasions: ['weeknight', 'comfort-food'],
    seasons: ['year-round'],
    nutritionalDensity: 'hearty',
    leftovers: 'good',
    equipment: [],
    pairsWith: ['garlic-bread', 'caesar-salad', 'arugula-salad'],
  },

  salad: {
    occasions: ['light-and-fresh', 'quick-lunch'],
    nutritionalDensity: 'light',
    leftovers: 'poor',
    equipment: [],
    advancePrep: [],
  },

  roastedVegetable: {
    occasions: ['weeknight', 'entertaining'],
    nutritionalDensity: 'light',
    leftovers: 'good',
    equipment: ['sheet-pan'],
    advancePrep: [],
  },

  slowCooker: {
    occasions: ['meal-prep', 'weekend-project', 'comfort-food'],
    seasons: ['year-round', 'fall', 'winter'],
    nutritionalDensity: 'hearty',
    leftovers: 'excellent',
    equipment: ['slow-cooker'],
    advancePrep: [],
  },

  dessert: {
    occasions: ['indulgent', 'entertaining', 'holiday'],
    nutritionalDensity: 'hearty',
    equipment: [],
    advancePrep: [],
  },
};

// Helper to find recipes by pattern
function findRecipes(pattern) {
  const files = fs.readdirSync(RECIPES_DIR);
  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({
      filename: f,
      path: path.join(RECIPES_DIR, f),
      content: fs.readFileSync(path.join(RECIPES_DIR, f), 'utf8'),
    }))
    .filter((recipe) => {
      if (pattern.cuisine) {
        return recipe.content.includes(`cuisines: [${pattern.cuisine}]`);
      }
      if (pattern.role) {
        return recipe.content.includes(`role: ${pattern.role}`);
      }
      if (pattern.cookingMethod) {
        return recipe.content.includes(pattern.cookingMethod);
      }
      return false;
    });
}

// Helper to check if recipe needs tagging
function needsMetadata(content, field) {
  const hasField = new RegExp(`^${field}:`, 'm').test(content);
  if (!hasField) return true;

  // Check if field is empty
  const emptyArray = new RegExp(`^${field}: \\[\\]`, 'm').test(content);
  const noValue = new RegExp(`^${field}:$`, 'm').test(content);

  return emptyArray || noValue;
}

// Analysis function
function analyzeCategory(category) {
  console.log(`\n🔍 Analyzing ${category}...\n`);

  let pattern = {};
  switch (category) {
    case 'chinese':
      pattern = { cuisine: 'Chinese' };
      break;
    case 'italian':
      pattern = { cuisine: 'Italian' };
      break;
    case 'sides':
      pattern = { role: 'side' };
      break;
    case 'desserts':
      pattern = { role: 'dessert' };
      break;
    case 'slow-cooker':
      pattern = { cookingMethod: 'slow-cooker' };
      break;
    default:
      console.error('Unknown category:', category);
      process.exit(1);
  }

  const recipes = findRecipes(pattern);
  console.log(`Found ${recipes.length} recipes\n`);

  // Check metadata completeness
  const fields = [
    'occasions',
    'seasons',
    'nutritionalDensity',
    'leftovers',
    'equipment',
    'pairsWith',
  ];

  const report = {};
  fields.forEach((field) => {
    report[field] = {
      missing: 0,
      present: 0,
      recipes: [],
    };

    recipes.forEach((recipe) => {
      if (needsMetadata(recipe.content, field)) {
        report[field].missing++;
        report[field].recipes.push(recipe.filename);
      } else {
        report[field].present++;
      }
    });
  });

  // Display report
  console.log('Metadata Completeness:');
  console.log('────────────────────────────────');
  fields.forEach((field) => {
    const pct = Math.round((report[field].present / recipes.length) * 100);
    console.log(
      `${field.padEnd(20)} ${pct}% complete (${report[field].present}/${recipes.length})`
    );
  });

  console.log('\n📊 Detailed Breakdown:');
  console.log('────────────────────────────────');
  fields.forEach((field) => {
    if (report[field].missing > 0) {
      console.log(`\n${field} (${report[field].missing} missing):`);
      report[field].recipes.slice(0, 10).forEach((r) => {
        console.log(`  - ${r}`);
      });
      if (report[field].recipes.length > 10) {
        console.log(`  ... and ${report[field].recipes.length - 10} more`);
      }
    }
  });

  console.log('\n\n💡 Suggested Template for this category:');
  console.log('────────────────────────────────');

  const template = getTemplateForCategory(category);
  console.log(JSON.stringify(template, null, 2));
}

function getTemplateForCategory(category) {
  switch (category) {
    case 'chinese':
      return TEMPLATES.chineseStirFry;
    case 'italian':
      return TEMPLATES.italianPasta;
    case 'sides':
      return TEMPLATES.roastedVegetable;
    case 'desserts':
      return TEMPLATES.dessert;
    case 'slow-cooker':
      return TEMPLATES.slowCooker;
    default:
      return {};
  }
}

// Main
const category = process.argv[2];

if (!category) {
  console.log('Usage: node scripts/batch-tagger.js [category]');
  console.log('\nAvailable categories:');
  console.log('  chinese      - Chinese cuisine recipes');
  console.log('  italian      - Italian cuisine recipes');
  console.log('  sides        - Side dish recipes');
  console.log('  desserts     - Dessert recipes');
  console.log('  slow-cooker  - Slow cooker recipes');
  process.exit(1);
}

analyzeCategory(category);
