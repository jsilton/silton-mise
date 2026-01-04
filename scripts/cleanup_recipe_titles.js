import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const RECIPES_DIR = path.join(process.cwd(), 'src/content/recipes');

function cleanupRecipeTitles() {
  if (!fs.existsSync(RECIPES_DIR)) {
    console.error('❌ Recipe directory not found!');
    process.exit(1);
  }

  const files = fs.readdirSync(RECIPES_DIR).filter((file) => file.endsWith('.md'));
  let changesMade = false;

  console.log(`✨ Cleaning up titles for ${files.length} recipes...\n`);

  files.forEach((file) => {
    const filePath = path.join(RECIPES_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);
    let { data, content } = parsed;
    let modified = false;

    if (data.title && typeof data.title === 'string') {
      const originalTitle = data.title;
      // Regex to find and remove parenthetical expressions (e.g., "(The Sunday Feast)", "(the crunch Standard)")
      // It handles various capitalizations and content within the parentheses.
      const cleanedTitle = originalTitle
        .replace(/\s*\([\w\s'-]+\s*(?:Standard|Feast|Base|Hack|Method)\)\s*/gi, '')
        .trim();

      if (cleanedTitle !== originalTitle) {
        data.title = cleanedTitle;
        modified = true;
        console.log(`✅ Cleaned title for ${file}: "${originalTitle}" -> "${cleanedTitle}"`);
      }
    }

    if (modified) {
      const newContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newContent);
      changesMade = true;
    }
  });

  if (changesMade) {
    console.log('\n🧹 Title cleanup complete. Changes were written to disk.');
  } else {
    console.log('✅ All titles are sparkling clean! No changes needed.');
  }
}

cleanupRecipeTitles();
