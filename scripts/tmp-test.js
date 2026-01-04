const fs = require('fs');
const content = fs.readFileSync('src/content/recipes/boston-style-peking-ravioli.md', 'utf8');
const dm = content.match(/##\s*Directions[\s\S]*?(?=##|$)/i);
console.log('hasDirections=', !!dm);
if (dm) {
  console.log('formatMatch=', /\d+\.\s+\*\*/.test(dm[0]));
  console.log('--- snippet ---');
  console.log(dm[0]);
}