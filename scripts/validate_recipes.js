import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const RECIPES_DIR = path.join(process.cwd(), 'src/content/recipes');

function validateAndFix() {
  if (!fs.existsSync(RECIPES_DIR)) {
    console.error('❌ Recipe directory not found!');
    process.exit(1);
  }

  const files = fs.readdirSync(RECIPES_DIR).filter((file) => file.endsWith('.md'));
  let changesMade = false;

  console.log(`👨‍🍳 Expeditor checking ${files.length} recipes...\n`);

  files.forEach((file) => {
    const filePath = path.join(RECIPES_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);
    let { data, content } = parsed;
    let modified = false;

    // 1. Title: Capitalize first letter and handle section headers
    if (data.title && typeof data.title === 'string') {
      const originalTitle = data.title;
      // Capitalize the first letter of the title
      let cleanedTitle = originalTitle.charAt(0).toUpperCase() + originalTitle.slice(1);

      if (cleanedTitle !== originalTitle) {
        data.title = cleanedTitle;
        modified = true;
        console.log(`✅ Capitalized title for ${file}: "${originalTitle}" -> "${cleanedTitle}"`);
      }
    }

    // 2. Ingredients: Filter out section headers
    if (data.ingredients && Array.isArray(data.ingredients)) {
      const originalIngredients = data.ingredients;
      const filteredIngredients = originalIngredients.filter(
        (ingredient) => !/^\s*---\s*[\w\s'-]+\s*---\s*$/.test(ingredient)
      );
      if (filteredIngredients.length !== originalIngredients.length) {
        data.ingredients = filteredIngredients;
        modified = true;
        console.log(`✅ Removed ingredient section headers from ${file}`);
      }
    }

    // Previous checks
    // 3. Missing Title (moved to above, keeping for reference if needed)
    if (!data.title) {
      console.warn(`⚠️  ${file}: Missing title. Adding placeholder.`);
      data.title = 'Untitled Recipe (' + file.replace('.md', '') + ')';
      modified = true;
    }

    // 4. Missing Ingredients (moved to above, keeping for reference if needed)
    if (!data.ingredients || data.ingredients.length === 0) {
      console.warn(`⚠️  ${file}: Missing ingredients. Adding empty list.`);
      data.ingredients = [];
      modified = true;
    }

    // 3. Missing Servings or Wrong Type
    if (!data.servings) {
      console.warn(`⚠️  ${file}: Missing servings. Defaulting to 'Unknown'.`);
      data.servings = 'Unknown';
      modified = true;
    } else if (typeof data.servings === 'number') {
      console.warn(`⚠️  ${file}: Servings is a number (${data.servings}). Converting to string.`);
      data.servings = String(data.servings);
      modified = true;
    }

    // 4. Time Metadata (Ensure Strings)
    ['prepTime', 'cookTime', 'totalTime'].forEach((field) => {
      if (data[field] && typeof data[field] === 'number') {
        console.warn(`⚠️  ${file}: ${field} is a number (${data[field]}). Converting to string.`);
        data[field] = String(data[field]);
        modified = true;
      }
    });

    // Save changes if any
    if (modified) {
      // Force strict yaml output options if needed, but standard stringify usually works.
      // We need to ensure we don't quote-wrap everything unnecessarily, but strings with numbers usually get quoted by gray-matter if ambiguous.
      const newContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newContent);
      changesMade = true;
      console.log(`✅ Fixed issues in ${file}`);
    }
  });

  if (changesMade) {
    console.log('\n🧹 Expeditor tidied up the station. Changes were written to disk.');
  } else {
    console.log('✅ Service is running smooth! No data repairs needed.');
  }
}

validateAndFix();
