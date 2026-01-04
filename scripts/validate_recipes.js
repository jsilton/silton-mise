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

        // 3. Missing Servings or Wrong Type
        if (!data.servings) {
             console.warn(`⚠️  ${file}: Missing servings. Defaulting to 'Unknown'.`);
             data.servings = "Unknown";
             modified = true;
        } else if (typeof data.servings === 'number') {
             console.warn(`⚠️  ${file}: Servings is a number (${data.servings}). Converting to string.`);
             data.servings = String(data.servings);
             modified = true;
        }

        // 4. Time Metadata (Ensure Strings)
        ['prepTime', 'cookTime', 'totalTime'].forEach(field => {
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