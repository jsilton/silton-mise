import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const RECIPES_DIR = path.join(process.cwd(), 'src/content/recipes');

const ROLE_RULES = [
  { type: 'drink', match: ['smoothie', 'cocktail', 'martini', 'syrup', 'fizz', 'spritzer'] },
  {
    type: 'dessert',
    match: ['cake', 'cookie', 'pie', 'brownie', 'ice cream', 'truffle', 'pudding'],
  },
  { type: 'base', match: ['rice', 'quinoa', 'dough', 'stock', 'dressing', 'sauce', 'vinaigrette'] },
  {
    type: 'side',
    match: [
      'salad',
      'vegetable',
      'beans',
      'sprouts',
      'broccoli',
      'corn',
      'potatoes',
      'carrots',
      'asparagus',
    ],
  },
  {
    type: 'main',
    match: [
      'chicken',
      'beef',
      'pork',
      'lamb',
      'shrimp',
      'fish',
      'salmon',
      'trout',
      'burger',
      'pasta',
      'lasagna',
      'stew',
      'soup',
      'chili',
      'tacos',
      'enchiladas',
    ],
  },
];

const VIBE_RULES = [
  {
    type: 'holiday',
    match: ['thanksgiving', 'turkey', 'stuffing', 'cranberry', 'rosh hashanah', 'brisket'],
  },
  { type: 'technical', match: ['lasagna', 'risotto', 'paella', 'dumpling', 'pie', 'cake', 'wonton'] },
  {
    type: 'comfort',
    match: [
      'mac and cheese',
      'alfredo',
      'marsala',
      'parmesan',
      'meatloaf',
      'braise',
      'stew',
      'soup',
      'chili',
    ],
  },
  { type: 'nutritious', match: ['salad', 'bowl', 'grilled', 'roasted', 'smoothie', 'oats'] },
  { type: 'quick', match: ['stir-fry', 'taco', 'burger', 'skillet', 'shrimp', 'salmon'] },
];

const PAIRINGS = [
  { keyword: 'chicken', suggestion: 'Near East Rice Pilaf Hack, Everyday Arugula Salad' },
  { keyword: 'salmon', suggestion: 'Jasmine Rice, Smashed Cucumber Salad' },
  { keyword: 'shrimp', suggestion: 'Couscous or Crusty Bread, Everyday Arugula Salad' },
  { keyword: 'steak', suggestion: 'Roasted Potatoes, Everyday Arugula Salad' },
  { keyword: 'taco', suggestion: 'Mexican Rice, Black Beans, Corn Salad' },
  { keyword: 'curry', suggestion: 'Basmati Rice, Naan' },
  { keyword: 'pasta', suggestion: 'Everyday Arugula Salad, Garlic Bread' },
  { keyword: 'soup', suggestion: 'Grilled Cheese, Crusty Bread' },
];

function inferTag(title, rules, defaultTag) {
  const lowerTitle = title.toLowerCase();
  for (const rule of rules) {
    for (const keyword of rule.match) {
      if (lowerTitle.includes(keyword)) {
        return rule.type;
      }
    }
  }
  return defaultTag;
}

function getPairing(title) {
  const lowerTitle = title.toLowerCase();
  for (const pair of PAIRINGS) {
    if (lowerTitle.includes(pair.keyword)) {
      return pair.suggestion;
    }
  }
  return null;
}

function refine() {
  const files = fs.readdirSync(RECIPES_DIR).filter((file) => file.endsWith('.md'));
  console.log(`👨‍🍳 Maître d' refining ${files.length} recipes...\n`);

  files.forEach((file) => {
    const filePath = path.join(RECIPES_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);
    let { data, content } = parsed;
    let modified = false;

    // 1. Infer Role
    if (!data.role) {
      data.role = inferTag(data.title, ROLE_RULES, 'main'); // Default to main if unsure
      modified = true;
    }

    // 2. Infer Vibe
    if (!data.vibe) {
      // Logic: Short cook time = Speed, Long cook time = Project/Comfort
      const totalMin = parseInt(data.totalTime) || 0;
      let vibe = inferTag(data.title, VIBE_RULES, null);

      if (!vibe) {
        if (totalMin > 0 && totalMin <= 30) vibe = 'quick';
        else if (totalMin > 60) vibe = 'comfort';
        else vibe = 'nutritious'; // Middle ground
      }
      data.vibe = vibe;
      modified = true;
    }

    // 3. Inject Serving Suggestions (only for Mains)
    if (
      data.role === 'main' &&
      !content.includes('## Serving Suggestions') &&
      !content.includes('## Pairs With')
    ) {
      const suggestion = getPairing(data.title);
      if (suggestion) {
        content += `\n## Serving Suggestions\n${suggestion}\n`;
        modified = true;
      }
    }

    if (modified) {
      const newContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newContent);
      // console.log(`✨ Refined ${data.title} (${data.role}/${data.vibe})`);
    }
  });

  console.log('✅ Menu refinement complete.');
}

refine();
