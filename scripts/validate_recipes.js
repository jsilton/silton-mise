import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const RECIPES_DIR = path.join(process.cwd(), 'src/content/recipes');

function validate() {
    if (!fs.existsSync(RECIPES_DIR)) {
        console.error('❌ Recipe directory not found!');
        process.exit(1);
    }

    const files = fs.readdirSync(RECIPES_DIR).filter(file => file.endsWith('.md'));
    let hasErrors = false;

    console.log(`👨‍🍳 Expeditor checking ${files.length} recipes...\n`);

    files.forEach(file => {
        const filePath = path.join(RECIPES_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        const errors = [];

        // Check Frontmatter
        if (!data.title) errors.push('Missing "title"');
        if (!data.ingredients || data.ingredients.length === 0) errors.push('Missing "ingredients" list');
        
        // Check Metadata presence (warn if missing, error if all missing?)
        // We decided in the Codex that standards must be high.
        if (!data.prepTime && !data.cookTime && !data.totalTime) {
            errors.push('Missing time metadata (prepTime, cookTime, or totalTime)');
        }
        if (!data.servings) errors.push('Missing "servings"');

        // Check Content Structure
        if (!content.includes('## Directions')) errors.push('Missing "## Directions" section');
        
        if (errors.length > 0) {
            hasErrors = true;
            console.error(`❌ ${file}:`);
            errors.forEach(err => console.error(`   - ${err}`));
        }
    });

    if (hasErrors) {
        console.error('\n🚫 The pass ended. Several dishes were sent back to the kitchen.');
        process.exit(1);
    } else {
        console.log('✅ Service is running smooth! All recipes meet the Silton Standard.');
    }
}

validate();
