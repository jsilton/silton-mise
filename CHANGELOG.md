# Changelog

All notable changes to the Mise Recipe Codex will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-05

### Added

- ESLint configuration with Astro and TypeScript support
- Husky pre-commit hooks with lint-staged
- VS Code workspace settings and recommended extensions
- Comprehensive .gitignore for generated files and build artifacts
- CHANGELOG.md for tracking project changes
- MIT License file
- Lint npm script for code quality checks

### Changed

- Updated .gitignore to exclude generated files (ai-context, ai-suggest, validation reports)
- Fixed GitHub Actions workflow script name (validate-recipes instead of validate:recipes)
- Enhanced package.json with lint script and lint-staged configuration
- Updated dependencies to latest patch versions

### Removed

- Obsolete root-level analysis scripts (analyze-recipes.cjs, check-batch.cjs, gap-analysis.cjs, rewrite-chefs-notes.cjs)
- Stale stats files (stats.json, stats-output.json)

### Fixed

- GitHub workflow npm script mismatch
- Broken internal recipe link from tarragon-potatoes to herb-marinated-pork-tenderloin

---

## [0.9.0] - 2026-01-04

### Added

- Complete project documentation suite
- CODE_PRACTICES.md with development standards
- DEPLOYMENT.md with deployment workflow
- KNOWLEDGE_PRESERVATION.md for AI model guidance
- CONTRIBUTING.md with contribution guidelines
- QA test suite (qa-test.mjs)
- Recipe validation script (validate-recipes.mjs)
- Extended recipe schema with meal planning metadata
- 474 recipes with structured frontmatter
- Search, filter, and sort functionality
- 7 reusable Astro components
- Tailwind CSS styling system
- GitHub Actions CI/CD pipeline

### Technical Stack

- Astro 5.1.4 (Static Site Generator)
- Tailwind CSS 3.4.17
- TypeScript support
- Markdown with YAML frontmatter
- Node.js validation and testing tools

---

## Notes

**Version Numbering:**

- Major (X.0.0): Breaking changes, major features
- Minor (0.X.0): New features, non-breaking changes
- Patch (0.0.X): Bug fixes, documentation updates

**Categories:**

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
