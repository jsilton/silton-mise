# Deployment Guide

**Last Updated:** January 4, 2026

This document outlines the deployment process for the Mise recipe codex, including pre-deployment checks, deployment steps, and post-deployment verification.

---

## Deployment Overview

### Current Setup
- **Hosting:** Static site (Astro)
- **Build Output:** `/dist/` directory
- **Trigger:** Manual (run `npm run deploy` when ready)

### Deployment Checklist

**Do this before deploying any major changes:**

```bash
# 1. Run full QA suite
npm run qa

# 2. Verify builds without errors
npm run build

# 3. Manually test primary features (see code-practices.md)

# 4. Commit changes to git with descriptive message
git add .
git commit -m "feat: add new feature - describe what changed"

# 5. Deploy when ready
npm run deploy
```

---

## Pre-Deployment Workflow

### 1. Run QA Tests

```bash
npm run qa
```

This runs:
- ✅ Build verification (all 475 pages compile)
- ✅ Recipe validation (all frontmatter correct)
- ✅ File structure checks (components exist)
- ✅ Component integrity (imports correct)
- ✅ Content quality (sample recipes valid)
- ✅ Documentation checks (guides complete)

**Expected output:** "Tests Passed: X/Y (100%)"

If any test fails, fix it before continuing.

### 2. Manual Testing

Test these primary features on `http://localhost:4321/silton-mise/` (dev server):

#### Homepage Search & Filters
```bash
# Start dev server if not running
npm run dev

# Test in browser at http://localhost:4321/silton-mise/
```

**Test cases:**
- [ ] Search "chicken" → returns ~20 recipes
- [ ] Search "vegetarian" → filters results
- [ ] Difficulty = Easy → shows only easy recipes
- [ ] Cuisine = Italian → shows only Italian recipes
- [ ] Combine filters: Vegetarian + Pasta → works
- [ ] Sort by prep time → ascending order
- [ ] Sort by difficulty → easy → intermediate → advanced
- [ ] Reset filters → clears all
- [ ] No results message → appears when no matches

#### Recipe Detail Page
```
Test any recipe, e.g. /recipes/apple-pie/
```

- [ ] Title displays correctly
- [ ] Breadcrumb: "Codex > [Recipe Name]" clickable
- [ ] Time metadata: Prep, Cook, Total, Servings display
- [ ] All 6 tag categories display:
  - [ ] Difficulty (single prominent badge)
  - [ ] Cuisines (multiple badges if present)
  - [ ] Cooking Methods (multiple badges)
  - [ ] Dietary (multiple badges if present)
  - [ ] Occasions (multiple badges if present)
  - [ ] Flavor Profile (multiple badges if present)
- [ ] Ingredients: list with checkboxes
- [ ] Content: Markdown renders correctly
- [ ] Links in content: work and external links open in new tab
- [ ] Mobile: layout responsive on small screens

#### Cross-Site Navigation
- [ ] Click recipe from homepage → detail page loads
- [ ] Click breadcrumb "Codex" → back to homepage
- [ ] Mobile layout: stacks properly at 375px width
- [ ] No console errors: `F12` → Console tab empty
- [ ] Load time: < 2 seconds

### 3. Git Workflow

```bash
# Make sure all changes are committed
git status

# If uncommitted changes exist:
git add .
git commit -m "type: description of changes

More details about what changed and why."
```

**Commit types:**
- `feat:` - new feature
- `fix:` - bug fix
- `refactor:` - code reorganization
- `docs:` - documentation
- `perf:` - performance improvement
- `chore:` - build, dependencies

---

## Deployment Steps

### For Manual Hosting (Vercel, Netlify, GitHub Pages)

```bash
# 1. Build the site
npm run build

# 2. This generates /dist/ directory
# 3. Commit changes:
git add .
git commit -m "build: production build for deployment"

# 4. Push to repository
git push origin main

# 5. Hosting platform automatically deploys from main branch
```

### For Direct Server Deployment

```bash
# 1. Build locally
npm run build

# 2. SSH into server
ssh user@server.com

# 3. Copy /dist/ to web root
scp -r ./dist/* user@server.com:/var/www/html/

# Or use your deployment tool (e.g., GitHub Actions)
```

### Using npm Script (When Configured)

```bash
# All-in-one deployment (when hosting is configured):
npm run deploy

# This will:
# 1. Run QA tests
# 2. Build the site
# 3. Deploy to production
# 4. Run post-deployment verification
```

---

## Post-Deployment Verification

### Immediate Checks (First 5 minutes)

1. **Site Loads**
   ```
   Open https://your-domain.com
   Should load in < 2 seconds
   ```

2. **Homepage Works**
   - [ ] Search box visible and functional
   - [ ] Filters visible and can be clicked
   - [ ] Recipe cards display with tags
   - [ ] No 404 errors

3. **Recipe Detail Pages**
   - [ ] Click 3 random recipes
   - [ ] All render correctly
   - [ ] Tags display in all sections
   - [ ] Content is readable

4. **Mobile Check**
   - [ ] Responsive design works
   - [ ] Touch interactions work
   - [ ] No layout breaks

### Detailed Checks (First Hour)

1. **Search & Filter Functionality**
   - [ ] Search "vegetarian" returns results
   - [ ] Difficulty filter works
   - [ ] Cuisine filter works
   - [ ] Combining filters works
   - [ ] Sort options work

2. **Content Integrity**
   - [ ] Ingredients display correctly
   - [ ] Markdown content renders
   - [ ] Numbers/measurements are readable
   - [ ] Links in content work

3. **Performance**
   - [ ] Images load quickly (if any)
   - [ ] No slow interactions
   - [ ] Network tab shows < 20 requests

4. **Error Monitoring**
   - [ ] Check server logs for errors
   - [ ] Monitor browser console for JS errors
   - [ ] Check 404 reports (broken links)

### Monitoring (Ongoing)

- **Set up alerts for:**
  - Site downtime
  - High error rates
  - Slow page loads (> 3s)
  - High traffic spikes

- **Weekly checks:**
  - Search still works
  - Random recipes load correctly
  - No indexing issues

---

## Rollback Procedure

If deployment causes issues:

### Quick Rollback (< 5 minutes)

```bash
# Revert to previous version
git revert HEAD

# Rebuild
npm run build

# Redeploy previous version
# (steps depend on your hosting)
```

### Full Rollback (If Needed)

```bash
# Go back to previous commit
git checkout [previous-commit-hash]

# Rebuild
npm run build

# Redeploy
```

---

## Deployment Schedule

### Current Approach
- **Manual deployment after each major feature**
- Deploy after: new components, major refactors, new recipe collections
- Always test before deploying

### Future: Continuous Deployment
When ready, configure CI/CD pipeline:
1. Push to main
2. GitHub Actions runs: `npm run qa` && `npm run build`
3. If tests pass, automatically deploys to production
4. Rollback available for quick reversion

---

## Deployment Tracking

### What Was Deployed

| Date | Change | Deployed By | Commit |
|------|--------|-------------|--------|
| Jan 4, 2026 | Frontend componentization | Jordan | abc123d |
| Jan 3, 2026 | Comprehensive tagging system | Jordan | def456e |

---

## Common Issues & Solutions

### Issue: Build Fails After Changes

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules .astro
npm install
npm run build
```

### Issue: Recipes Don't Appear

**Solution:**
```bash
# Validate recipes
npm run validate-recipes

# Check frontmatter in src/content/recipes/
# Ensure title, origin, cuisines, difficulty present
```

### Issue: Search/Filters Not Working

**Solution:**
1. Verify FilterPanel component loads: dev tools > Network
2. Check if JavaScript errors in console
3. Rebuild: `npm run build`
4. Clear browser cache: hard refresh (Cmd+Shift+R)

### Issue: Tags Not Displaying

**Solution:**
1. Verify recipe has tagging fields in frontmatter
2. Check TagSection component renders in RecipeHeader
3. Run validator: `npm run validate-recipes`

---

## Support & Questions

- **Code standards:** See `CODE_PRACTICES.md`
- **Content guidelines:** See `CONTRIBUTING.md`
- **Tagging system:** See `src/knowledge/TAGGING_GUIDE.md`
- **Validator rules:** See `/scripts/validate-recipes.mjs`

---

**Next deployment?** Run:
```bash
npm run qa        # verify everything
npm run build     # compile
npm run deploy    # deploy when ready
```
