# BCLS Changelog

This changelog tracks changes to the BCLS specification itself. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/) **applied to the spec's contract**:

- **MAJOR** — a previously-conformant release note would now be non-conformant (rules removed, renamed, or tightened).
- **MINOR** — additive: new optional rules, new templates, new categories, new framework addendums. Older notes still pass.
- **PATCH** — typos, clarifications, example fixes, reworded rationale. Zero behavior change.

Downstream apps SHOULD pin to the **MAJOR** of the spec they conform to.

## Archival policy

- The repo root **always** holds the current MAJOR of the spec.
- When `v(N+1).0.0` ships, the final `vN.x` snapshot is copied into `Legacy/vN/` (mirroring root paths) and frozen.
- MINOR / PATCH versions are not snapshotted — use `git checkout vX.Y.Z` if you need an exact intermediate.
- An archived MAJOR receives no edits except typo fixes, noted here as `[X.Y.Z-archive]`.

---

## [1.0.0] — 2026-05-05

Initial public release of the spec.

### Added
- §0 **Conformance** — RFC 2119 keywords (MUST / SHOULD / MAY) and downstream version-pinning guidance.
- §1 Tagging & versioning rules.
- §2 Required top-of-body section order.
- §3 Downloads block (3-column OS table).
- §4 Important callout (with stack-specific signing paragraphs).
- §5 The `Changes in` section: heading format (**`vX.Y.Z:` invariant** — `v` prefix and trailing colon both inside backticks), optional banners, bullet syntax, **closed canonical category list** (with `Misc` canonical and `MISC` flagged non-conformant), `PKG: Updated packages.` convention.
- §6 **Carry-forward rule** — every body MUST contain `## Changes in` for current + immediately previous patch + current minor milestone + current major milestone, in that order; older patches link out via §6.1.
- §6.1 `Full vN changelog` collapsible link section.
- §6.2 heading-anchor pin + §6.3 dates policy.
- §7 Beta / RC conventions (RC parenthetical inside backticks).
- §8 Special callouts (MSI, major-version hero sections, manual-update / security banner).
- §8.2.1 **Hero persistence** — the `vN.0.0` hero block carries through every `vN.0.x` patch body and MUST be removed at `vN.1.0`.
- §9 Release Info footer — heading is **exactly** `## ℹ️ Release Info` (alternative names non-conformant).
- §10 Tone & voice.
- §11 Casing & formatting rules — `Misc` (not `MISC`), `Beta build` (not `BETA build`), `macOS` (not `MacOS`).
- §12 Framework addendums matrix (Tauri V2 / Electron / Flutter / MS Store) — Dacx's Flutter footer additions allowed *in addition to*, not in place of, the canonical §9 footer.
- §12.1 Image & screenshot policy.
- §12.2 Language / i18n note.
- §13 Don'ts.
- §14 Worked mini-example + Appendix A cheat sheet.
- §1 **Subtitle inheritance** — `vN.0.x` patches MAY inherit the major's subtitle.

### Repo
- `AGENTS.md` — condensed checklist for AI agents, with sync-version stamp.
- `TEMPLATES/` — `patch.md`, `minor.md`, `major.md`, `beta.md`, `security.md`, plus reusable `_partials/`.
- `EXAMPLES/` — annotated walkthroughs from real releases (lint-passing as `partial`).
- `scripts/lint.mjs` — regex linter for the machine-checkable MUST rules (M001–M009), with `<!-- bcls:partial -->` and `<!-- bcls:ignore-start/end -->` pragmas.
- CC0-1.0 license.
