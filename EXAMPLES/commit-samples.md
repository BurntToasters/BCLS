<!-- bcls:kind commit -->
<!-- bcls:partial -->
<!-- bcls:ignore-start -->

# EXAMPLE — Commit subjects

**Kind:** `commit` (STANDARD.md §16)

Commit subjects reuse BCLS categories. They are imperative, one line, end with a period, and are **not** Conventional Commits.

---

## Conformant subjects

These lines are valid input for `node scripts/lint.mjs --kind=commit`.

<!-- bcls:ignore-end -->
UI: Improve settings navigation.
Security: Validate updater signatures.
PKG: Update packages.
Codebase: Remove obsolete migration logic.
Docs: Document web release kind.
NEW - Search: Add fuzzy result matching.
<!-- bcls:ignore-start -->

## Non-conformant (do not copy)

```
feat: add search
Fix bug
UI: Improve settings navigation
Updated packages
I added fuzzy matching.
```

- `feat:` is Conventional Commits — non-conformant.
- `Fix bug` has no category prefix and no period.
- Missing trailing period.
- No category.
- First-person release-note voice.

## Why this is "good BCLS"

- Category from §5.4 (`Docs`, `UI`, `PKG`, …) or `NEW - <Feature>`.
- Imperative present tense.
- ≤72 characters.
- No emojis, no em dashes, no issue numbers, no git trailers.

<!-- bcls:ignore-end -->
