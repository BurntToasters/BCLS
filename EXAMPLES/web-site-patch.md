<!-- bcls:kind web -->
<!-- bcls:partial -->

# EXAMPLE — Web patch: BCLS site `v1.1.0`

**Source:** synthetic (this spec's own website GitHub release)
**Type:** Patch (additive minor of the spec, published as a site/docs release)
**Kind:** `web`

A website GitHub release: no Downloads table, no signing callout, no MSI, no Release Info. Body starts at the support link. Same `## Changes in` heading and carry-forward rules as kind `binary`.

---

## Annotated breakdown

> Each `// →` callout maps the line above to a section in [`STANDARD.md`](../STANDARD.md).

```markdown
### ℹ️ Enjoying BCLS? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
// → §15.1 step 2 (support link SHOULD). First real heading — no Downloads.

BCLS lives at the docs site; this tag is the spec + site together.
// → §15: optional one-line intro. A live URL MAY appear here as prose.

## Changes in `v1.1.0:`
// → §5.1 (shared with binary): backticked version, colon inside backticks.

- **Docs:** Added kinds for commit subjects, documentation pages, and website releases.
// → §5.4: new closed-core category `Docs`.
- **Codebase:** Extended the lint script so it can take `--kind=` and a `bcls:kind` pragma.
- **PKG:** Updated packages.
// → §5.5: canonical PKG closer.

## Changes in `v1.0.0:`
// → §6 carry-forward to the previous milestone (here the initial public spec).

- **Docs:** Initial public release of the spec.
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- No `# ⬇️ Downloads`, no `> [!IMPORTANT]` signing block, no `## ℹ️ Release Info`.
- Support link is the top of the body.
- `` ## Changes in `v1.1.0:` `` shape is unchanged from kind `binary`.
- Carry-forward includes the `v1.0.0` milestone.
- `Docs` is used for spec/copy changes; lint/script work is `Codebase`.

<!-- bcls:ignore-end -->
