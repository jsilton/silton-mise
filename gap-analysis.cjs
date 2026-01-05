const fs = require('fs');

// Read the stats
const stats = JSON.parse(fs.readFileSync('stats.json', 'utf8'));

console.log('# Recipe Collection Gap Analysis\n');
console.log(`**Total Recipes:** ${stats.total}\n`);

// Analyze combinations that might be underrepresented
console.log('## Gap Analysis by Combination\n');

// Low-represented cuisines
console.log('### Underrepresented Cuisines (< 10 recipes)');
const lowCuisines = stats.cuisines.filter(([_, count]) => count < 10);
lowCuisines.forEach(([cuisine, count]) => {
  console.log(`- ${cuisine}: ${count} recipes`);
});

// Season gaps
console.log('\n### Seasonal Distribution');
stats.seasons.forEach(([season, count]) => {
  const pct = ((count / stats.total) * 100).toFixed(1);
  console.log(`- ${season}: ${count} (${pct}%)`);
});

// Occasion gaps
console.log('\n### Occasion Distribution');
const lowOccasions = stats.occasions.filter(([_, count]) => count < 30);
console.log('Low representation (< 30 recipes):');
lowOccasions.forEach(([occasion, count]) => {
  console.log(`- ${occasion}: ${count}`);
});

// Difficulty
console.log('\n### Difficulty Balance');
stats.difficulty.forEach(([level, count]) => {
  const pct = ((count / stats.total) * 100).toFixed(1);
  console.log(`- ${level}: ${count} (${pct}%)`);
});
console.log('**Gap:** Only 2 difficulty levels (missing "advanced" level)');

// Dietary
console.log('\n### Dietary Options');
console.log(`- Vegetarian: ${stats.dietary.find(d => d[0] === 'vegetarian')[1]} (${((stats.dietary.find(d => d[0] === 'vegetarian')[1] / stats.total) * 100).toFixed(1)}%)`);
console.log(`- Vegan: ${stats.dietary.find(d => d[0] === 'vegan')[1]} (${((stats.dietary.find(d => d[0] === 'vegan')[1] / stats.total) * 100).toFixed(1)}%)`);
console.log('**Gap:** Very few vegan options (only 8 recipes)');

// Time distribution
console.log('\n### Time Requirements');
console.log('\n**Prep Time:**');
Object.entries(stats.prepTimeRanges).forEach(([range, count]) => {
  const pct = ((count / stats.total) * 100).toFixed(1);
  console.log(`- ${range} mins: ${count} (${pct}%)`);
});

console.log('\n**Cook Time:**');
Object.entries(stats.cookTimeRanges).forEach(([range, count]) => {
  const pct = ((count / stats.total) * 100).toFixed(1);
  console.log(`- ${range} mins: ${count} (${pct}%)`);
});

// Suggested additions
console.log('\n## Recommended Recipe Additions\n');
console.log('### Priority 1: Fill Cuisine Gaps');
console.log('- More Vietnamese recipes (currently 6)');
console.log('- More Middle Eastern recipes (currently 9)');
console.log('- Add Turkish, Persian, Ethiopian cuisines');
console.log('- More authentic regional Chinese (beyond general Chinese)\n');

console.log('### Priority 2: Seasonal Balance');
const springCount = stats.seasons.find(s => s[0] === 'spring')[1];
const winterCount = stats.seasons.find(s => s[0] === 'winter')[1];
console.log(`- Spring recipes (currently ${springCount} - need ~20 more)`);
console.log(`- Winter recipes (currently ${winterCount} - need ~15 more)`);
console.log('- Focus on seasonal produce recipes\n');

console.log('### Priority 3: Dietary Diversity');
console.log('- Add 30-40 more vegan main dishes');
console.log('- More gluten-free options (currently only 3)');
console.log('- Add dairy-free desserts\n');

console.log('### Priority 4: Advanced Techniques');
console.log('- Add "advanced" difficulty category');
console.log('- Recipes with: sous-vide, fermentation, charcuterie');
console.log('- Complex pastries and bread baking\n');

console.log('### Priority 5: Specific Gaps');
console.log('- More date-night recipes (currently 29)');
console.log('- More potluck options (currently 15)');
console.log('- Quick post-workout meals (currently 39, could use 20 more)');
console.log('- Breakfast/brunch category (analyze current breakfast items)');
