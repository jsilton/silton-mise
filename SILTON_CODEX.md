# The Silton Codex: Development Standards & Best Practices

This document outlines the core mandates and operational guidelines for developing the `silton-mise` project. These rules apply to both human developers and AI assistants to ensure consistency, quality, and stability.

## Core Mandates

1.  **Commit & Push Often:** Commit and push changes to the remote repository immediately after completing any major task or logical unit of work to avoid large, unwieldy pushes.
2.  **Verify Before Committing:** Always run the project's build command (`npm run build`) or tests to catch errors *before* committing.
3.  **Read Before Writing:** Always read the current content of a file before applying changes to ensure accurate context and prevent overwriting unrelated code.
4.  **Docs Up-to-Date:** Automatically check and update `README.md` or documentation whenever architectural changes, new scripts, or major features are introduced.
5.  **Atomic Commits:** Prefer smaller, focused commits with descriptive messages (e.g., "Fix: ...", "Feat: ...") over bundling unrelated changes.

## Code Quality & Style

6.  **Style Mimicry:** Match the existing code style (indentation, semicolons, naming conventions) of the file you are editing.
7.  **No Placeholder Left Behind:** Never leave "TODO" comments, "lorem ipsum", or placeholder logic in committed code unless explicitly agreed upon.
8.  **Context-Aware Refactoring:** Before renaming or moving a file/function, always search the codebase for references to ensure nothing breaks.
9.  **Dependency Check:** Before installing a new package, check `package.json` to see if it (or a viable alternative) is already there.
10. **Explain the 'Why':** When adding a non-obvious fix or workaround, add a code comment explaining *why* it's needed (not just *what* it does).

## Security & Stability

11. **Security-First Defaults:** Never hardcode secrets or keys. Use environment variables by default and ensure `.env` is in `.gitignore`.
12. **Defensive Coding:** When adding data fetching or async operations, always include basic error handling (`try/catch`) to prevent silent crashes.
13. **Self-Correction:** If a shell command fails, stop and analyze the error output to fix the issue or ask for clarification, rather than ignoring it or blindly retrying.

## Workflow & Hygiene

14. **Incremental Feedback:** For complex tasks, stop after critical milestones to report status and verify direction.
15. **Clean Workspace:** Automatically delete temporary scripts or log files created during a task once they are no longer needed.
16. **Mobile-First Defaults:** When writing CSS (especially Tailwind), assume a mobile-first approach (base styles are for mobile, `md:`/`lg:` for desktop).
