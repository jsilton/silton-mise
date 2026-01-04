import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const RECIPES_DIR = path.join(process.cwd(), 'src/content/recipes');

function validateAndFix() {
    if (!fs.existsSync(RECIPES_DIR)) {
        console.error('❌ Recipe directory not found!');
        process.exit(1);
    }

    const files = fs.readdirSync(RECIPES_DIR).filter(file => file.endsWith('.md'));
    let changesMade = false;
    let errorsFound = false;

    console.log(`👨‍🍳 Expeditor checking ${files.length} recipes...\n`);

    files.forEach(file => {
        const filePath = path.join(RECIPES_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(fileContent);
        let { data, content } = parsed;
        let modified = false;

        // 1. Missing Title
        if (!data.title) {
            console.warn(`⚠️  ${file}: Missing title. Adding placeholder.`);
            data.title = "Untitled Recipe (" + file.replace('.md', '') + ")";
            modified = true;
        }

        // 2. Missing Ingredients
        if (!data.ingredients) {
            console.warn(`⚠️  ${file}: Missing ingredients. Adding empty list.`);
            data.ingredients = [];
            modified = true;
        }

        // 3. Missing Servings
        if (!data.servings) {
             console.warn(`⚠️  ${file}: Missing servings. Defaulting to 'Unknown'.`);
             data.servings = "Unknown";
             modified = true;
        }

        // 4. Time Check (Optional fix, just ensure fields exist)
        if (!data.prepTime && !data.cookTime && !data.totalTime) {
             // We won't invent time, but we ensure the field exists for consistency if strict mode requires it
             // For now, we just log it as a non-breaking issue or leave it be.
        }

        // Save changes if any
        if (modified) {
            const newContent = matter.stringify(content, data);
            fs.writeFileSync(filePath, newContent);
            changesMade = true;
            console.log(`✅ Fixed issues in ${file}`);
        }
    });

    if (changesMade) {
        console.log('\n🧹 Expeditor tidied up the station. Changes were written to disk.');
        // We exit with 0 so the CI continues, but the git step in CI will catch the changes
    } else {
        console.log('✅ Service is running smooth! No data repairs needed.');
    }
}

validateAndFix();