import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const RECIPES_DIR = path.resolve('src/content/recipes');
const allowedRoles = new Set(['main', 'side', 'dessert', 'base', 'drink', 'condiment']);
const allowedVibes = new Set(['nutritious', 'comfort', 'technical', 'holiday', 'quick']);

async function listMdFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const res = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await listMdFiles(res)));
    else if (entry.isFile() && res.endsWith('.md')) files.push(res);
  }
  return files;
}

function extractInternalLinks(body) {
  const re = /\(\/mise\/recipes\/([^)\/\s)]+)\)/g;
  const links = [];
  let m;
  while ((m = re.exec(body)) !== null) links.push(m[1]);
  return links;
}

// Normalize a string for lookup (title -> slug etc.)
function normalizeKey(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

(async function main() {
  const files = await listMdFiles(RECIPES_DIR);
  const report = {
    total: files.length,
    missing: {
      title: [],
      role: [],
      vibe: [],
      ingredients: [],
      prepTime: [],
      cookTime: [],
      totalTime: [],
      servings: [],
      image: [],
      chefNote: [],
      directions: [],
      directionsFormatting: [],
    },
    invalidValues: { role: [], vibe: [] },
    brokenInternalLinks: [],
    brokenWikiLinks: [],
    // suggestions: map of slug -> [{ruleId, title, severity, suggestion}]
    suggestions: {},
  };

  // Load KB rules (small JSON files in src/knowledge/codex)
  const KB_DIR = path.resolve('src', 'knowledge', 'codex');
  const kbRules = [];
  async function loadKb() {
    try {
      const entries = await fs.readdir(KB_DIR, { withFileTypes: true });
      for (const e of entries) {
        if (e.isFile() && e.name.endsWith('.json')) {
          const p = path.join(KB_DIR, e.name);
          const raw = await fs.readFile(p, 'utf8');
          try {
            const obj = JSON.parse(raw);
            kbRules.push(obj);
          } catch (err) {
            console.warn(`Failed to parse KB file ${e.name}: ${err.message}`);
          }
        }
      }
    } catch (err) {
      // no KB yet; that's fine
    }
  }
  await loadKb();

  // Build maps: slug -> meta (title, aliases), and title/alias -> slug
  const slugToMeta = new Map();
  const linkTargetMap = new Map(); // key -> canonical slug (keys are slug, alias, normalized title)

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);
    const slug = path.basename(file, '.md');

    // Collect meta
    const title = data.title || slug;
    const aliases = Array.isArray(data.aliases) ? data.aliases : data.aliases ? [data.aliases] : [];
    slugToMeta.set(slug, { title, aliases, file });

    // keys
    linkTargetMap.set(slug, slug);
    linkTargetMap.set(normalizeKey(title), slug);
    for (const a of aliases) linkTargetMap.set(a, slug);
  }

  // Helper: resolve a wiki-link or /recipes/slug link
  function resolveLinkToken(token) {
    // tokens may be slug, title, or 'Title | Custom text'
    const raw = token.split('|')[0].trim();
    const slugCandidate = raw.replace(/\s+/g, '-').toLowerCase();
    if (linkTargetMap.has(raw)) return linkTargetMap.get(raw);
    if (linkTargetMap.has(slugCandidate)) return linkTargetMap.get(slugCandidate);
    const norm = normalizeKey(raw);
    if (linkTargetMap.has(norm)) return linkTargetMap.get(norm);
    return null;
  }

  // Helpers for KB checks
  function extractIngredientTokens(data, content) {
    const tokens = new Set();
    if (Array.isArray(data.ingredients)) {
      for (const it of data.ingredients) {
        const s = String(it || '').toLowerCase();
        s.replace(/[^a-z0-9\s\-]/g, ' ')
          .split(/\s+/)
          .forEach((t) => t && tokens.add(t));
      }
    } else if (typeof data.ingredients === 'string') {
      const s = data.ingredients.toLowerCase();
      s.replace(/[^a-z0-9\s\-]/g, ' ')
        .split(/\s+/)
        .forEach((t) => t && tokens.add(t));
    }
    // scan content as fallback
    const c = (content || '').toLowerCase().replace(/[^a-z0-9\s\-]/g, ' ');
    c.split(/\s+/).forEach((t) => t && tokens.add(t));
    return tokens;
  }

  function runKbChecks(slug, data, content) {
    const suggestions = [];
    if (!kbRules || !kbRules.length) return suggestions;
    const ingredientTokens = extractIngredientTokens(data, content);
    const lowerContent = (content || '').toLowerCase();

    // detect audience hints from frontmatter or content (simple heuristics)
    function detectAudiences(data, content) {
      const audiences = new Set();
      const source =
        `${data.audience || ''} ${data.tags || ''} ${data.description || ''} ${content || ''}`.toLowerCase();
      const map = {
        kids: ['kid', 'kids', 'child', 'children', 'baby', 'toddler', 'smash cake', 'toddler'],
      };
      for (const [key, tokens] of Object.entries(map)) {
        for (const t of tokens)
          if (source.includes(t)) {
            audiences.add(key);
            break;
          }
      }
      // honor explicit frontmatter audience field if present
      if (data.audience) {
        if (Array.isArray(data.audience))
          data.audience.forEach((a) => audiences.add(String(a).toLowerCase()));
        else audiences.add(String(data.audience).toLowerCase());
      }
      return [...audiences];
    }

    const recipeAudiences = detectAudiences(data, content);
    const recipeDisabledRules = data.kb && Array.isArray(data.kb.disable) ? data.kb.disable : [];
    const recipeTags = new Set(
      (data.tags || '')
        .toString()
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(Boolean)
    );

    for (const rule of kbRules) {
      // skip if the recipe explicitly disables this rule
      if (recipeDisabledRules.includes(rule.id)) continue;

      // skip if rule declares audiences to exclude
      if (rule.excludeIf && Array.isArray(rule.excludeIf.audiences)) {
        if (rule.excludeIf.audiences.some((a) => recipeAudiences.includes(String(a).toLowerCase())))
          continue;
      }

      // if rule defines appliesToTags, require at least one matching tag
      if (Array.isArray(rule.appliesToTags) && rule.appliesToTags.length > 0) {
        const matched = rule.appliesToTags.some((t) => recipeTags.has(String(t).toLowerCase()));
        if (!matched) continue;
      }

      let ruleMatched = true;

      for (const clause of rule.detection || []) {
        const type = clause.type;
        const words = clause.words || [];
        const optional = clause.optional || false;

        let clauseMatched = false;
        if (type === 'ingredient_absence') {
          clauseMatched = words.every((w) => {
            const token = String(w || '').toLowerCase();
            return ![...ingredientTokens].some(
              (t) => t === token || t.includes(token) || token.includes(t)
            );
          });
        } else if (type === 'ingredient_presence') {
          clauseMatched = words.some((w) => {
            const token = String(w || '').toLowerCase();
            return [...ingredientTokens].some((t) => t === token || t.includes(token));
          });
        } else if (type === 'method_presence') {
          clauseMatched = words.some((w) => lowerContent.includes(String(w || '').toLowerCase()));
        } else if (type === 'text_presence') {
          clauseMatched = words.some((w) => lowerContent.includes(String(w || '').toLowerCase()));
        } else if (type === 'text_absence') {
          clauseMatched = words.every((w) => !lowerContent.includes(String(w || '').toLowerCase()));
        }

        if (!clauseMatched && !optional) {
          ruleMatched = false;
          break;
        }
      }

      if (ruleMatched) {
        suggestions.push({
          ruleId: rule.id,
          title: rule.title,
          severity: rule.severity,
          suggestion: rule.suggestionTemplate,
        });
      }
    }

    return suggestions;
  }

  // Now validate each file contents
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const { data, content } = matter(raw);
    const slug = path.basename(file, '.md');

    // frontmatter existence
    if (!data.title) report.missing.title.push(slug);
    if (!data.role) report.missing.role.push(slug);
    if (!data.vibe) report.missing.vibe.push(slug);
    if (!data.ingredients) report.missing.ingredients.push(slug);
    if (!data.prepTime) report.missing.prepTime.push(slug);
    if (!data.cookTime && !data.totalTime) report.missing.cookTime.push(slug);
    if (!data.totalTime && !data.cookTime) report.missing.totalTime.push(slug);
    if (!data.servings) report.missing.servings.push(slug);
    if (!data.image) report.missing.image.push(slug);

    // value checks
    if (data.role && !allowedRoles.has(String(data.role)))
      report.invalidValues.role.push({ slug, value: data.role });
    if (data.vibe && !allowedVibes.has(String(data.vibe)))
      report.invalidValues.vibe.push({ slug, value: data.vibe });

    // sections
    if (!/##\s*Chef's Note/i.test(content)) report.missing.chefNote.push(slug);
    if (!/##\s*Directions/i.test(content)) report.missing.directions.push(slug);

    // directions formatting (numbered steps with bold header)
    const directionsMatch = content.match(/##\s*Directions[\s\S]*?(?=^##\s|\z)/im);
    if (directionsMatch) {
      if (!/\d+\.\s+\*\*/.test(directionsMatch[0]))
        ((report.missing.directionsFormatting = report.missing.directionsFormatting || []),
          report.missing.directionsFormatting && report.missing.directionsFormatting.push(slug));
    } else {
      report.missing.directionsFormatting = report.missing.directionsFormatting || [];
      report.missing.directionsFormatting.push(slug);
    }

    // internal links check: /mise/recipes/slug
    const links = extractInternalLinks(content);
    for (const link of links) {
      if (!linkTargetMap.has(link)) {
        report.brokenInternalLinks.push({ from: slug, to: link });
      }
    }

    // wiki-links check: [[...]]
    const wikiRe = /\[\[([^\]]+)\]\]/g;
    let m;
    while ((m = wikiRe.exec(content)) !== null) {
      const token = m[1].trim();
      const resolved = resolveLinkToken(token);
      if (!resolved) report.brokenWikiLinks.push({ from: slug, token });
    }

    // KB-based suggestions (non-blocking unless rule is 'fail')
    try {
      const kbSuggestions = runKbChecks(slug, data, content || '');
      if (kbSuggestions && kbSuggestions.length) {
        report.suggestions[slug] = kbSuggestions;
      }
    } catch (err) {
      console.warn(`KB check failed for ${slug}: ${err && err.message}`);
    }
  }

  // Reduce large arrays to samples
  const sample = (arr, n = 20) => arr.slice(0, n);
  // write a small index file to public/recipes/index.json for optional client or tooling use
  const indexArray = [];
  for (const [slug, meta] of slugToMeta.entries()) {
    indexArray.push({ slug, title: meta.title, aliases: meta.aliases || [] });
  }
  await fs.mkdir(path.resolve('public', 'recipes'), { recursive: true }).catch(() => {});
  await fs.writeFile(
    path.resolve('public', 'recipes', 'index.json'),
    JSON.stringify(indexArray, null, 2)
  );

  // Build output and include KB suggestions summary
  const output = {
    totalRecipes: report.total,
    missingCounts: Object.fromEntries(
      Object.entries(report.missing).map(([k, v]) => [k, v.length])
    ),
    invalidValuesCount: {
      role: report.invalidValues.role.length,
      vibe: report.invalidValues.vibe.length,
    },
    samples: {
      missingTitle: sample(report.missing.title),
      missingChefNote: sample(report.missing.chefNote),
      missingDirections: sample(report.missing.directions),
      missingDirectionsFormatting: sample(report.missing.directionsFormatting || []),
      missingImage: sample(report.missing.image),
      invalidRoles: sample(report.invalidValues.role),
      invalidVibes: sample(report.invalidValues.vibe),
      brokenInternalLinks: sample(report.brokenInternalLinks, 50),
      brokenWikiLinks: sample(report.brokenWikiLinks || [], 50),
    },
  };

  // suggestions summary
  const suggestionsSample = [];
  let totalSuggestions = 0;
  for (const [s, arr] of Object.entries(report.suggestions)) {
    totalSuggestions += arr.length;
    for (const a of arr) {
      suggestionsSample.push(Object.assign({ slug: s }, a));
    }
  }
  output.suggestionsCount = totalSuggestions;
  output.sampleSuggestions = sample(suggestionsSample, 50);

  // write report JSON for CI consumers
  const reportPath = path.resolve('public', 'recipes', 'validation-report.json');
  await fs.writeFile(reportPath, JSON.stringify(output, null, 2));
  console.log(JSON.stringify(output, null, 2));

  // generate Codex scaffolding: per-recipe context files for external tools
  const ctxDir = path.resolve('public', 'recipes', 'kitchen-context');
  const reviewDir = path.resolve('public', 'recipes', 'kitchen-reviews');
  await fs.mkdir(ctxDir, { recursive: true }).catch(() => {});
  await fs.mkdir(reviewDir, { recursive: true }).catch(() => {});

  // build a simple features extractor for metadata analysis
  function detectAudiencesFromData(data, content) {
    const audiences = new Set();
    const source =
      `${data.audience || ''} ${data.tags || ''} ${data.description || ''} ${content || ''}`.toLowerCase();
    const map = {
      kids: ['kid', 'kids', 'child', 'children', 'baby', 'toddler', 'smash cake', 'toddler'],
    };
    for (const [key, tokens] of Object.entries(map)) {
      for (const t of tokens)
        if (source.includes(t)) {
          audiences.add(key);
          break;
        }
    }
    if (data.audience) {
      if (Array.isArray(data.audience))
        data.audience.forEach((a) => audiences.add(String(a).toLowerCase()));
      else audiences.add(String(data.audience).toLowerCase());
    }
    return [...audiences];
  }

  async function writeAnalysisFiles() {
    // iterate each recipe file to emit context and placeholder suggestions
    for (const file of files) {
      const raw = await fs.readFile(file, 'utf8');
      const { data, content } = matter(raw);
      const slug = path.basename(file, '.md');
      const title = data.title || slug;
      const audiences = detectAudiencesFromData(data, content);
      const ingredientTokens = [...extractIngredientTokens(data, content)];
      const methods = [];
      const methodWords = [
        'sear',
        'roast',
        'bake',
        'fry',
        'braise',
        'sous-vide',
        'steam',
        'grill',
        'pan-fry',
        'pan sear',
      ];
      const lowerContent = (content || '').toLowerCase();
      for (const m of methodWords) if (lowerContent.includes(m)) methods.push(m);

      const kbSuggestions =
        report.suggestions && report.suggestions[slug] ? report.suggestions[slug] : [];
      const considered = kbSuggestions.map((s) => ({
        ruleId: s.ruleId,
        title: s.title,
        severity: s.severity,
        suggestion: s.suggestion,
      }));

      const contextData = {
        slug,
        title,
        frontmatter: data || {},
        audiences,
        ingredientTokens,
        methods,
        kbSuggestions: considered,
        notes:
          'Generated analysis context: use this to provide reviewed, human-verified suggestions. Do not auto-apply changes without human approval.',
      };

      const ctxPath = path.join(ctxDir, `${slug}.json`);
      await fs.writeFile(ctxPath, JSON.stringify(contextData, null, 2));

      const reviewPath = path.join(reviewDir, `${slug}.review.json`);
      // placeholder structure for future automated outputs
      const placeholder = { slug, suggestions: [], generatedAt: null, generatedBy: null };
      if (
        !(await fs
          .stat(reviewPath)
          .then(() => true)
          .catch(() => false))
      ) {
        await fs.writeFile(reviewPath, JSON.stringify(placeholder, null, 2));
      }
    }

    // write a batch summary file
    const batchPath = path.join(ctxDir, 'batch-summary.json');
    const batch = {
      generatedAt: new Date().toISOString(),
      totalRecipes: files.length,
      totalKbSuggestions: output.suggestionsCount,
    };
    await fs.writeFile(batchPath, JSON.stringify(batch, null, 2));
  }

  await writeAnalysisFiles();

  // exit non-zero only on critical failures: missing Chef's Note, missing Directions formatting, invalid enums, or broken links
  const criticalMissing =
    (report.missing.chefNote && report.missing.chefNote.length > 0) ||
    (report.missing.directions && report.missing.directions.length > 0);
  const failSuggestionsCount = Object.values(report.suggestions || {})
    .flat()
    .filter((s) => s.severity === 'fail').length;
  const issuesFound =
    criticalMissing ||
    output.invalidValuesCount.role > 0 ||
    output.invalidValuesCount.vibe > 0 ||
    output.samples.brokenInternalLinks.length > 0 ||
    output.samples.brokenWikiLinks.length > 0 ||
    failSuggestionsCount > 0;

  if (output.missingCounts.image > 0) {
    console.warn(
      `Warning: ${output.missingCounts.image} recipes missing an 'image' frontmatter. This is recommended for social sharing, but not critical.`
    );
  }

  process.exit(issuesFound ? 2 : 0);
})();
