# Omnivore's Codex (KB)

This folder contains small, human-editable JSON rule files for the culinary knowledge base. Each file is a rule object with:

- id: unique id
- title
- category
- severity: "hint" | "warn" | "fail"
- description
- appliesToTags: optional array of tags (method, vibe, role) to narrow applicability
- detection: array of detection clauses (see example)
- suggestionTemplate: string to present to contributors
- examples: optional example notes

Keep rules short and referencable; add tests/examples where useful.
