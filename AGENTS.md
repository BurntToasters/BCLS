# BCLS — Agent Quick Reference

> **Synced against:** STANDARD.md `v1.0.0`

Condensed checklist for AI agents drafting BurntToasters release notes. Read [`STANDARD.md`](STANDARD.md) for rationale and full rules. This file is the operational checklist.

If the **Synced against** version above doesn't match the `Spec version` at the top of [`STANDARD.md`](STANDARD.md), trust STANDARD.md and flag the drift.

## Inputs you need before writing

- App name (e.g. `IYERIS`, `Dacx`, `ROSI`, `S3-Sidekick`, `Zinnia`).
- GitHub org/user (e.g. `BurntToasters`) — for asset URLs.
- Stack (`Tauri V2`, `Electron`, `Flutter`).
- New version tag (e.g. `v2.1.3`).
- Release type: `patch` | `minor` | `major` | `beta` | `security`.
- List of changes (with rough categories if possible).
- Last "milestone" version on the same minor/major line (for the carry-forward rule).
- Whether MSI builds are included (stable Tauri/Electron only).
- MS Store listing ID (only for Store-distributed apps; ROSI uses one).

If anything is missing, ask before drafting.

## Pick the right template

| Situation | Template |
| --- | --- |
| Bug fixes / dep bumps only | [`TEMPLATES/patch.md`](TEMPLATES/patch.md) |
| New features, no breaking changes | [`TEMPLATES/minor.md`](TEMPLATES/minor.md) |
| New major version (vN.0.0) | [`TEMPLATES/major.md`](TEMPLATES/major.md) |
| Pre-release | [`TEMPLATES/beta.md`](TEMPLATES/beta.md) |
| Security / manual-update required | [`TEMPLATES/security.md`](TEMPLATES/security.md) |

## Required body skeleton (in this order)

1. `# ⬇️ Downloads` + 3-column OS table (`Windows | macOS | Linux`) with linkified asset cells (STANDARD §3 / §3.1 / §3.2).
2. `> [!IMPORTANT]` callout — signing info, arch availability, stability disclaimer if applicable.
3. `### ℹ️ Enjoying <App>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)`
4. *(major releases only, plus all `vN.0.x` patches until `vN.1.0` ships)* Hero `# Welcome to <App> vN!!!` + story sections.
5. `` ## Changes in `vX.Y.Z:` `` — bullets.
6. **Carry-forward** sections in this order: immediately previous patch (`vX.Y.(Z-1)`), current minor milestone (`vX.Y.0`), current major milestone (`vX.0.0`). Skip any that's already the current release.
7. *(when older patches are truncated)* `## Click below for the full \`vN\` Changelog` collapsible link.
8. *(optional)* MSI / breaking-change callouts.
9. `## ℹ️ Release Info` — GPG, code signing, legacy binaries.

## Bullet rules

- Author with markdown `-` and two-space-indent sub-bullets. **Never** paste literal `•` / `◦`.
- Format: `- **Category:** Description ending with a period.`
- New feature format: `- **NEW - Feature Name:** Description.`
- Inline code (backticks) for versions, paths, package names, settings.
- One change per bullet. Group related small items under a `Misc` parent.

## Canonical category names

`PKG`, `Electron`, `Tauri`, `Typescript`, `Codebase`, `Testing`, `UI`, `Logo`, `Updater`, `Security`, `Licenses`, `Ver`, `Windows`, `Linux`, `macOS`, `Misc`, `NEW - <Feature>`.

(`MacOS` in older notes is non-conformant; new notes MUST use `macOS`. The catch-all is `Misc`, not `MISC`.)

App-specific categories (e.g. `Thumbnails`, `Album Art`, `UNZIP`, `FFMPEG`) MAY be defined in the app's own `CONTRIBUTING.md`. The list above is the closed core.

Almost every release ends with: `- **PKG:** Updated packages.`

## Casing reference

- Acronyms uppercase: `PKG`, `UI`, `UX`, `MSI`, `GPG`, `RPM`, `DEB`, `DMG`, `EXE`. (`Misc` is **not** an acronym — capitalized first letter only.)
- OSes: `macOS`, `Windows`, `Linux`.
- Frameworks: `Electron`, `Tauri`, `TypeScript`, `Flutter`, `FFMPEG` (house style).
- Beta callout: `Beta build` (sentence case), not `BETA build`.
- Versions in backticks: `` `v2.1.0` ``, `` `41.3.0` ``.

## Carry-forward rule (don't forget)

A release body **must** include `## Changes in` sections for, in this order: current release, immediately previous patch (`vX.Y.(Z-1)`), current minor milestone (`vX.Y.0`), current major milestone (`vX.0.0`). Older patches go behind a Full vN changelog link.

- `v4.0.5` body: `v4.0.5`, `v4.0.4`, `v4.0.0` + Full v4 changelog link.
- `v4.1.3` body: `v4.1.3`, `v4.1.2`, `v4.1.0`, `v4.0.0` + Full v4 changelog link.
- `v4.1.0` body: `v4.1.0`, `v4.0.0` + Full v4 changelog link.
- `v5.0.0` body: `v5.0.0` only (with hero block).
- Order: newest first, descending.

## Hero persistence (§8.2.1)

- The major's `# Welcome to <App> vN!!!` hero block sits in every `vN.0.x` body.
- Remove the hero starting from `vN.1.0`.

## Beta-specific

- Mark release as Pre-release on GitHub.
- Add `> [!NOTE]\n> 🅱️ This is a Beta build.` at the top of the body.
- A `-beta.1` is conventionally version-bump-only ("sync beta users to latest stable"). Body mentions this.
- Betas do NOT ship MSI builds. State this in the MSI note.

## Security / manual-update specific

- Title subtitle: `- Manual Update Required` or `- SECURITY UPDATE: Manual Update Required`.
- Inside `Changes in`: banner heading `### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!`.
- Apologetic paragraph. Be honest about what happened.
- Tell users the manual install steps.

## DO / DON'T

| ✅ DO | ❌ DON'T |
| --- | --- |
| Use markdown `-` bullets | Paste literal `•` / `◦` characters |
| Backtick the version *and* trailing colon: `` `vX.Y.Z:` `` | Write `## Changes in v1.2.3` plain, or `` `v1.2.3` `` with the colon outside |
| Always include the `v` prefix in the heading version | Write `## Changes in \`2.1.2:\`` |
| Carry forward immediate-prior + minor + major milestones | Show only the current version's changes |
| Use a `Full vN changelog` link for older patches | Inline every patch back to `vN.0.0` once a Full vN changelog exists |
| Include `**PKG:** Updated packages.` if deps moved | Skip the PKG bullet "because it's boring" |
| Write `Misc:` (catch-all) | Write `MISC:` |
| Write `Beta build` in the beta callout | Write `BETA build` |
| Use `## ℹ️ Release Info` for the footer | Rename to `Installation & Notes`, `GPG Signing`, etc. |
| Keep the major hero on `vN.0.x` patches | Keep it past `vN.1.0` |
| Write in first-person, casual voice | Use marketing language |
| End every bullet with `.` (or `!`) | Leave bullets unpunctuated |
| Apologize for security/manual-update inconvenience | Pretend nothing happened |
| Split mixed changes into separate bullets | Cram two unrelated changes into one bullet |
| Use `Fixed an issue where ...` | Say "Fixed bug" |
| Reference user-visible behavior | Reference commit hashes, PR numbers, internal jira-style IDs |

## Final pre-publish checklist

- [ ] Title format correct (`X.Y.Z` or `X.Y.Z - <subtitle>`).
- [ ] Downloads table present, 3 columns, correct OS order.
- [ ] Important callout has the right signing paragraphs for the stack.
- [ ] Support link line included with the right app name.
- [ ] `` ## Changes in `vX.Y.Z:` `` heading: `v` prefix, version inside backticks, **colon inside backticks**.
- [ ] Every bullet has a bold `**Category:**` prefix.
- [ ] Carry-forward chain present: prior patch + minor milestone + major milestone (skipping any already covered).
- [ ] `Full vN changelog` link present whenever older patches are truncated.
- [ ] `## ℹ️ Release Info` footer present (exactly that heading; not renamed).
- [ ] On `vN.0.x` patches: the major's hero block is included. On `vN.1.0`+: hero removed.
- [ ] Beta builds: 🅱️ callout (sentence-case `Beta build`) + Pre-release flag + MSI-not-included note.
- [ ] Security builds: banner heading + apology paragraph + manual-update instructions.
- [ ] No literal `•` / `◦` characters anywhere.
- [ ] No `MISC:`, no `BETA build`, no `MacOS:` (use `Misc`, `Beta build`, `macOS`).
- [ ] No marketing fluff. No PR numbers. No commit hashes.
