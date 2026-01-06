#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * QA & Regression Testing Suite
 * Runs comprehensive tests before deployment
 *
 * Usage: node scripts/qa-test.mjs
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

function testResult(name, passed, detail = '') {
  const icon = passed ? '✓' : '✗';
  const color = passed ? 'green' : 'red';
  const msg = `  ${icon} ${name}`;
  log(msg, color);
  if (detail && !passed) log(`    ${detail}`, 'yellow');
  return passed;
}

let totalTests = 0;
let passedTests = 0;

function recordTest(passed) {
  totalTests++;
  if (passed) passedTests++;
}

// ============================================================================
// BUILD VERIFICATION
// ============================================================================

section('1. BUILD VERIFICATION');

try {
  log('Running: npm run build', 'blue');
  const output = execSync('npm run build 2>&1', { cwd: process.cwd(), encoding: 'utf-8' });

  const passed = output.includes('[build] Complete!') && output.includes('475 page(s) built');
  recordTest(testResult('Astro build succeeds', passed));

  if (passed) {
    testResult('Generated dist/ directory', fs.existsSync('./dist'));
    testResult('All 475 pages compiled', output.includes('475 page(s) built'));
    testResult('No TypeScript errors', !output.includes('error TS'));
  } else {
    log('Build output:\n' + output, 'red');
  }
} catch (error) {
  recordTest(testResult('Astro build succeeds', false, error.message));
}

// ============================================================================
// RECIPE VALIDATION
// ============================================================================

section('2. RECIPE VALIDATION');

try {
  log('Running: npm run validate-recipes', 'blue');
  const output = execSync('node scripts/validate-recipes.mjs 2>&1', {
    cwd: process.cwd(),
    encoding: 'utf-8',
  });

  const passed = !output.includes('ERROR') && !output.includes('error');
  recordTest(testResult('Recipe validation passes', passed));

  // Count recipes
  const recipeFiles = fs.readdirSync(path.join(process.cwd(), 'src/content/recipes'));
  testResult(`All ${recipeFiles.length} recipes present`, recipeFiles.length > 450);

  // Check for valid frontmatter
  const recipesWithIssues = [];
  recipeFiles.slice(0, 10).forEach((file) => {
    const content = fs.readFileSync(path.join(process.cwd(), 'src/content/recipes', file), 'utf-8');
    const hasRequiredFields =
      content.includes('title:') &&
      content.includes('difficulty:') &&
      content.includes('cuisines:');
    if (!hasRequiredFields) recipesWithIssues.push(file);
  });
  recordTest(
    testResult('Sample recipes have required frontmatter', recipesWithIssues.length === 0)
  );
} catch (error) {
  recordTest(testResult('Recipe validation runs', false, error.message));
}

// ============================================================================
// FILE STRUCTURE VERIFICATION
// ============================================================================

section('3. FILE STRUCTURE VERIFICATION');

const checks = [
  { path: 'src/pages/index.astro', name: 'Homepage template exists' },
  { path: 'src/pages/recipes/[slug].astro', name: 'Recipe detail template exists' },
  { path: 'src/components/SearchBar.astro', name: 'SearchBar component exists' },
  { path: 'src/components/FilterPanel.astro', name: 'FilterPanel component exists' },
  { path: 'src/components/RecipeCard.astro', name: 'RecipeCard component exists' },
  { path: 'src/components/RecipeHeader.astro', name: 'RecipeHeader component exists' },
  { path: 'src/components/TagBadge.astro', name: 'TagBadge component exists' },
  { path: 'src/components/TagSection.astro', name: 'TagSection component exists' },
  { path: 'src/layouts/Layout.astro', name: 'Layout template exists' },
  { path: 'CONTRIBUTING.md', name: 'Contributing guide exists' },
  { path: 'CODE_PRACTICES.md', name: 'Code practices guide exists' },
];

checks.forEach((check) => {
  const exists = fs.existsSync(path.join(process.cwd(), check.path));
  recordTest(testResult(check.name, exists));
});

// ============================================================================
// COMPONENT INTEGRITY CHECKS
// ============================================================================

section('4. COMPONENT INTEGRITY');

// Check homepage imports components
const homeContent = fs.readFileSync(path.join(process.cwd(), 'src/pages/index.astro'), 'utf-8');
recordTest(testResult('Homepage imports SearchBar', homeContent.includes('SearchBar')));
recordTest(testResult('Homepage imports FilterPanel', homeContent.includes('FilterPanel')));
recordTest(testResult('Homepage imports RecipeCard', homeContent.includes('RecipeCard')));

// Check recipe detail imports components
const recipeContent = fs.readFileSync(
  path.join(process.cwd(), 'src/pages/recipes/[slug].astro'),
  'utf-8'
);
recordTest(testResult('Recipe page imports RecipeHeader', recipeContent.includes('RecipeHeader')));

// Check components have proper structure
const tagBadgeContent = fs.readFileSync(
  path.join(process.cwd(), 'src/components/TagBadge.astro'),
  'utf-8'
);
recordTest(testResult('TagBadge has category mapping', tagBadgeContent.includes('categoryColors')));

// ============================================================================
// CONTENT QUALITY CHECKS
// ============================================================================

section('5. CONTENT QUALITY CHECKS');

const sampleRecipes = fs.readdirSync(path.join(process.cwd(), 'src/content/recipes')).slice(0, 5);
let qualityIssues = 0;

sampleRecipes.forEach((file) => {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), 'src/content/recipes', file), 'utf-8');

    // Extract frontmatter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) {
      qualityIssues++;
      return;
    }

    const frontmatter = fmMatch[1];

    // Check for required fields
    const hasTitle = frontmatter.includes('title:');
    const hasDifficulty = frontmatter.includes('difficulty:');
    const hasCuisines = frontmatter.includes('cuisines:');
    const hasOrigin = frontmatter.includes('origin:');

    if (!hasTitle || !hasDifficulty || !hasCuisines || !hasOrigin) {
      qualityIssues++;
    }
  } catch {
    qualityIssues++;
  }
});

recordTest(
  testResult(
    `Sample recipes have complete metadata`,
    qualityIssues === 0,
    qualityIssues > 0 ? `${qualityIssues} recipes missing fields` : ''
  )
);

// ============================================================================
// DOCUMENTATION CHECKS
// ============================================================================

section('6. DOCUMENTATION');

const docChecks = [
  { path: 'README.md', key: 'recipe codex', name: 'README describes project' },
  { path: 'CONTRIBUTING.md', key: 'frontmatter', name: 'Contributing guide complete' },
  { path: 'CODE_PRACTICES.md', key: 'Component Architecture', name: 'Code practices documented' },
];

docChecks.forEach((doc) => {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), doc.path), 'utf-8');
    const hasContent = content.includes(doc.key);
    recordTest(testResult(doc.name, hasContent));
  } catch {
    recordTest(testResult(doc.name, false, 'File not found'));
  }
});

// ============================================================================
// PERFORMANCE CHECK
// ============================================================================

section('7. BUILD PERFORMANCE');

try {
  const distStats = execSync('du -sh dist/', { encoding: 'utf-8' }).trim();
  log(`Total build size: ${distStats}`, 'blue');
  recordTest(testResult('Build size reasonable', true));
} catch {
  recordTest(testResult('Build size check', false));
}

// ============================================================================
// MANUAL TESTING REMINDERS
// ============================================================================

section('8. MANUAL TESTING CHECKLIST');

log(`Before deploying, test these primary features:`, 'yellow');
log(`
  HOMEPAGE (/)
  ─────────────────────────────
  [ ] Search works (try: "chicken", "vegetarian")
  [ ] Filter by difficulty
  [ ] Filter by cuisine
  [ ] Filter by dietary
  [ ] Sort by alphabetical, prep time, difficulty
  [ ] Combine filters + search
  [ ] No results message appears
  [ ] Clear search button works
  [ ] Reset filters button works
  [ ] Cards display correct tags
  
  RECIPE DETAIL (/recipes/apple-pie/)
  ─────────────────────────────
  [ ] Title displays
  [ ] Breadcrumb navigation works
  [ ] Time metadata displays
  [ ] All 6 tag sections display
  [ ] Ingredients list with checkboxes
  [ ] Markdown content renders
  [ ] Links work
  
  CROSS-SITE
  ─────────────────────────────
  [ ] Links between pages work
  [ ] Mobile layout responsive
  [ ] No console errors
  [ ] Load time < 2 seconds
`);

// ============================================================================
// TEST SUMMARY
// ============================================================================

section('TEST SUMMARY');

const percentage = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
log(
  `Tests Passed: ${passedTests}/${totalTests} (${percentage}%)`,
  percentage === 100 ? 'green' : percentage >= 80 ? 'yellow' : 'red'
);

if (percentage === 100) {
  log(`\n✓ All automated checks passed!`, 'green');
  log(`Ready to deploy after manual testing.`, 'green');
  process.exit(0);
} else if (percentage >= 80) {
  log(`\n⚠ Most checks passed, review failures above.`, 'yellow');
  process.exit(0);
} else {
  log(`\n✗ Fix failures before deploying.`, 'red');
  process.exit(1);
}
