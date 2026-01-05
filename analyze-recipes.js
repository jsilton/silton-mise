const fs = require('fs');
const path = require('path');

// Read all recipe files
const recipesDir = './src/content/recipes';
const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.md'));

// Statistics accumulators
const stats = {
  total: files.length,
  occasions: {},
  seasons: {},
  cuisines: {},
  dietary: {},
  cookingMethods: {},
  difficulty: {},
  flavorProfile: {},
  nutritionalDensity: {},
  leftovers: {},
  equipment: {},
  advancePrep: {},
  pairsWith: {},
  prepTimeRanges: { '0-15': 0, '15-30': 0, '30-60': 0, '60+': 0 },
  cookTimeRanges: { '0-15': 0, '15-30': 0, '30-60': 0, '60+': 0 }
};

// Helper to parse frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const data = {};
  
  // Parse arrays
  const arrayRegex = /^(\w+):\s*\[(.*?)\]/gm;
  let arrayMatch;
  while ((arrayMatch = arrayRegex.exec(yaml)) !== null) {
    const key = arrayMatch[1];
    const values = arrayMatch[2].split(',').map(v => v.trim().replace(/['"]/g, ''));
    data[key] = values.filter(v => v);
  }
  
  // Parse strings
  const stringRegex = /^(\w+):\s*['"]?([^'"\n]+?)['"]?$/gm;
  let stringMatch;
  while ((stringMatch = stringRegex.exec(yaml)) !== null) {
    const key = stringMatch[1];
    if (!data[key]) {
      data[key] = stringMatch[2].trim();
    }
  }
  
  return data;
}

// Process each recipe
files.forEach(file => {
  const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
  const data = parseFrontmatter(content);
  if (!data) return;
  
  // Count occurrences
  ['occasions', 'seasons', 'cuisines', 'dietary', 'cookingMethods', 'flavorProfile', 'equipment'].forEach(field => {
    if (data[field]) {
      data[field].forEach(value => {
        stats[field][value] = (stats[field][value] || 0) + 1;
      });
    }
  });
  
  // Count single values
  ['difficulty', 'nutritionalDensity', 'leftovers', 'advancePrep'].forEach(field => {
    if (data[field]) {
      stats[field][data[field]] = (stats[field][data[field]] || 0) + 1;
    }
  });
  
  // Track pairsWith connections
  if (data.pairsWith) {
    data.pairsWith.forEach(pair => {
      stats.pairsWith[pair] = (stats.pairsWith[pair] || 0) + 1;
    });
  }
  
  // Parse time ranges
  if (data.prepTime) {
    const mins = parseInt(data.prepTime);
    if (mins <= 15) stats.prepTimeRanges['0-15']++;
    else if (mins <= 30) stats.prepTimeRanges['15-30']++;
    else if (mins <= 60) stats.prepTimeRanges['30-60']++;
    else stats.prepTimeRanges['60+']++;
  }
  
  if (data.cookTime) {
    const mins = parseInt(data.cookTime);
    if (mins <= 15) stats.cookTimeRanges['0-15']++;
    else if (mins <= 30) stats.cookTimeRanges['15-30']++;
    else if (mins <= 60) stats.cookTimeRanges['30-60']++;
    else stats.cookTimeRanges['60+']++;
  }
});

// Sort objects by count
function sortByCount(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

console.log(JSON.stringify({
  total: stats.total,
  occasions: sortByCount(stats.occasions),
  seasons: sortByCount(stats.seasons),
  cuisines: sortByCount(stats.cuisines),
  dietary: sortByCount(stats.dietary),
  cookingMethods: sortByCount(stats.cookingMethods),
  difficulty: sortByCount(stats.difficulty),
  flavorProfile: sortByCount(stats.flavorProfile),
  nutritionalDensity: sortByCount(stats.nutritionalDensity),
  leftovers: sortByCount(stats.leftovers),
  equipment: sortByCount(stats.equipment),
  advancePrep: sortByCount(stats.advancePrep),
  topPairings: sortByCount(stats.pairsWith).slice(0, 20),
  prepTimeRanges: stats.prepTimeRanges,
  cookTimeRanges: stats.cookTimeRanges
}, null, 2));
