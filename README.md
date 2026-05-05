# BCLS — BurntToasters Changelog Standard

BCLS is the formal style guide for how I (BurntToasters) write GitHub release notes across my apps — [IYERIS](https://github.com/BurntToasters/IYERIS), [Dacx](https://github.com/BurntToasters/Dacx), [ROSI](https://github.com/BurntToasters/ROSI), [S3-Sidekick](https://github.com/BurntToasters/S3-Sidekick), [Zinnia](https://github.com/BurntToasters/Zinnia), and anything new.

**Current spec version:** `v1.0.0` · see [CHANGELOG.md](CHANGELOG.md) for what changed.

It exists so that:

- My release notes stay visually and structurally consistent across every project.
- I can hand an AI agent a one-line prompt + this repo and get back notes that look like I wrote them.
- Future me doesn't have to remember every micro-convention.

## Repo layout

| Path | Purpose |
| --- | --- |
| [`STANDARD.md`](STANDARD.md) | The canonical spec. Section order, bullet syntax, category vocabulary, casing rules, framework addendums, the carry-forward rule, etc. Start here. |
| [`AGENTS.md`](AGENTS.md) | Condensed checklist + DO/DON'T table tuned for AI agents drafting release notes. |
| [`TEMPLATES/`](TEMPLATES/) | Copy-paste markdown skeletons — `patch.md`, `minor.md`, `major.md`, `beta.md`, `security.md`, plus reusable `_partials/`. |
| [`EXAMPLES/`](EXAMPLES/) | Annotated real release notes from my apps, mapped section-by-section to the spec. |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed between spec versions. |
| [`scripts/lint.mjs`](scripts/lint.mjs) | Minimal regex linter for the machine-checkable MUST rules. Run `node scripts/lint.mjs <file>`. |

## Quick start

1. Pick the closest template from [`TEMPLATES/`](TEMPLATES/) for the kind of release you're writing.
2. Fill in the placeholders (app name, version, changes).
3. Cross-check against the [`AGENTS.md`](AGENTS.md) checklist.
4. Paste into the GitHub release body.

## What "standardized" means here

- **Tag format:** `vMAJOR.MINOR.PATCH`, betas as `vX.Y.Z-beta.N`.
- **Section order:** Downloads → Important callout → Support link → optional intro → `## Changes in \`vX.Y.Z:\`` → carry-forward sections → optional special callouts → `## ℹ️ Release Info`.
- **Bullet style:** `- **Category:** Description.` (or `**NEW - Feature:**` for new features).
- **Carry-forward:** patch releases include all prior `## Changes in` sections back to the last minor/major milestone.
- **Tone:** first-person, casual, smileys allowed in moderation.

Full details and rationale live in [`STANDARD.md`](STANDARD.md).

## License

[CC0-1.0](LICENSE) — public-domain dedication. Use, fork, adapt, or relicense BCLS however you want; no attribution required (though it's appreciated).
