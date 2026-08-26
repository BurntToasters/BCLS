# BCLS — BurntToasters Changelog Standard

BCLS is the formal style guide for how I (BurntToasters) write GitHub release notes, git commit subjects, and documentation across my apps — [IYERIS](https://github.com/BurntToasters/IYERIS), [Dacx](https://github.com/BurntToasters/Dacx), [ROSI](https://github.com/BurntToasters/ROSI), [S3-Sidekick](https://github.com/BurntToasters/S3-Sidekick), [Zinnia](https://github.com/BurntToasters/Zinnia), websites, and anything new.

**Current spec version:** `v1.1.0` · see [CHANGELOG.md](CHANGELOG.md) for what changed.

It exists so that:

- Release notes, commits, and docs stay visually and structurally consistent across every project.
- I can hand an AI agent a one-line prompt + this repo and get back notes that look like I wrote them.
- Future me doesn't have to remember every micro-convention.

## Repo layout

| Path | Purpose |
| --- | --- |
| [`STANDARD.md`](STANDARD.md) | The canonical spec. Section order, bullet syntax, category vocabulary, casing rules, framework addendums, the carry-forward rule, etc. Start here. |
| [`AGENTS.md`](AGENTS.md) | Condensed checklist + DO/DON'T table tuned for AI agents drafting release notes. |
| [`TEMPLATES/`](TEMPLATES/) | Copy-paste markdown skeletons — `patch.md` / `web-patch.md` (and minor/major/beta/security), `commit.md`, `docs-readme.md`, plus reusable `_partials/`. |
| [`EXAMPLES/`](EXAMPLES/) | Annotated real release notes from my apps, mapped section-by-section to the spec. |
| [`site/`](site/) | Astro + Starlight documentation site and guided release-note builder. |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed between spec versions. |
| [`scripts/lint.mjs`](scripts/lint.mjs) | Minimal regex linter for the machine-checkable MUST rules. Run `node scripts/lint.mjs <file>`. |

## Quick start

1. Pick the closest template from [`TEMPLATES/`](TEMPLATES/) for the kind of release you're writing.
2. Fill in the placeholders (app name, version, changes).
3. Cross-check against the [`AGENTS.md`](AGENTS.md) checklist.
4. Paste into the GitHub release body.

## What "standardized" means here

BCLS `v1.1` is organized by **kind** (see STANDARD.md §0.1). Default is `binary`.

| Kind | What you are writing |
| --- | --- |
| `binary` | GitHub release for an app that ships installers |
| `web` | GitHub release with no binaries (a website) |
| `commit` | A git commit subject |
| `docs` | README, CONTRIBUTING, or a docs-site page |

Shared across kinds:

- **Tag format** (releases): `vMAJOR.MINOR.PATCH`, betas as `vX.Y.Z-beta.N`.
- **Bullet style** (releases): `- **Category:** Description.` (or `**NEW - Feature:**` for new features).
- **Commit subjects:** `Category: Description.` — not Conventional Commits.
- **Carry-forward:** patch releases include `## Changes in` for current + prior patch + minor + major milestones.
- **Tone (releases / docs intro):** first-person, casual, smileys allowed in moderation. Commits are imperative.

Kind `binary` section order: Downloads → Important callout → Support link → optional intro → `## Changes in \`vX.Y.Z:\`` → carry-forward → optional special callouts → `## ℹ️ Release Info`.

Kind `web` omits Downloads, signing, MSI, and Release Info. Body starts at the support link.

Full details and rationale live in [`STANDARD.md`](STANDARD.md).

## Website

The documentation site lives in [`site/`](site/) and is built with Astro + Starlight. Root markdown files remain the source of truth; the site syncs them into generated docs pages before each build.

For Cloudflare Pages:

- Build command: `cd site && npm ci && npm run build`
- Build output directory: `site/dist`

Local commands:

- `cd site && npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## License

This repo is dual-licensed — see [`LICENSE.md`](LICENSE.md) for the full breakdown.

- **Spec, prose, templates, examples** (`STANDARD.md`, `AGENTS.md`, `TEMPLATES/`, `EXAMPLES/`, `media/`, etc.) — [CC0 1.0](LICENSE-CC0). Public domain. Use, fork, adapt, or relicense however you want.
- **Source code** (`scripts/`, `site/`) — [MPL-2.0](LICENSE-MPL-2.0). File-level copyleft with patent grant; combines fine with permissive or proprietary code at the project level.

SPDX: `CC0-1.0 AND MPL-2.0`.
