# BCLS — Agent Guide

> **Synced against:** STANDARD.md `v1.0.0`

Operational guide for AI agents drafting **BurntToasters** GitHub release notes. [`STANDARD.md`](STANDARD.md) is the canonical spec (rationale, edge cases, RFC 2119 semantics). This file is what you follow while writing.

**If the Synced against version above ≠ the `Spec version` at the top of [`STANDARD.md`](STANDARD.md), trust STANDARD.md and tell the user the versions drifted.**

---

## What BCLS is

**BCLS** (BurntToasters Changelog Standard) defines structure, wording, and layout for release bodies across apps like IYERIS, Dacx, ROSI, S3-Sidekick, and Zinnia. A conformant note should read like Burnt wrote it: first-person, casual, structured, no marketing fluff, no PR/commit references.

| Path | Use when |
| --- | --- |
| [`STANDARD.md`](STANDARD.md) | You need the full rule, a "why", or an edge case |
| [`TEMPLATES/`](TEMPLATES/) | You are starting a draft — copy the closest skeleton |
| [`TEMPLATES/_partials/`](TEMPLATES/_partials/) | Reusable snippets (downloads table, Tauri sig block, MSI note, Release Info) |
| [`EXAMPLES/`](EXAMPLES/) | You want a real release annotated section-by-section |
| [`scripts/lint.mjs`](scripts/lint.mjs) | You want to verify machine-checkable MUSTs before publish |

**MUST** = non-conformant if violated. **SHOULD** = strong default; deviate only with a reason. **MAY** = optional. Untagged rules in STANDARD §§1–6, §9, §11 are treated as MUST.

---

## Agent workflow (do this in order)

1. **Collect inputs** (below). If anything critical is missing, **ask** — do not guess org, tag, stack, or carry-forward source text.
2. **Classify** the release: `patch` | `minor` | `major` | `beta` | `security`.
3. **Open** the matching template from [`TEMPLATES/`](TEMPLATES/) and fill placeholders.
4. **Draft** the body following the section order in [Mandatory section order](#mandatory-section-order).
5. **Apply** carry-forward (stable vs beta rules differ).
6. **Run** `node scripts/lint.mjs path/to/draft.md` (or pipe stdin with `-`).
7. **Walk** the [Final pre-publish checklist](#final-pre-publish-checklist).

Do not publish a body that fails lint on MUST rules unless the user explicitly accepts a documented exception.

---

## Required inputs (ask if missing)

| Input | Why you need it |
| --- | --- |
| **App name** (display) | Support line, hero, prose — e.g. `IYERIS`, `ROSI`, `Zinnia` |
| **GitHub `<ORG>` / `<APP>`** | Asset URLs — usually `BurntToasters` + repo name |
| **Stack** | `Tauri V2`, `Electron`, `Flutter` — drives §4 callout, MSI, updater bullets |
| **Tag** | `vX.Y.Z` or `vX.Y.Z-beta.N` — used in headings and download URLs |
| **Release type** | Picks template and carry-forward / hero rules |
| **Change list** | Rough categories per change — you turn these into bullets |
| **Prior release bodies or bullets** | Carry-forward sections are copied/adapted from real prior notes — not invented |
| **Milestones on this line** | For carry-forward: what is `vX.Y.(Z-1)`, `vX.Y.0`, `vX.0.0`? |
| **MSI shipped?** | Stable Tauri/Electron only; never on betas |
| **MS Store ID** | Only for Store apps (ROSI) — badge in downloads table |
| **Full vN changelog URL** | When older patches are truncated (§6.1) |
| **Hero block text** | For `vN.0.x` patches: copy unchanged from `vN.0.0` until `vN.1.0` |

**Optional but useful:** subtitle for GitHub title, Linux arm64 status, breaking-change steps, security incident explanation, app-specific categories from the app's `CONTRIBUTING.md`.

---

## Release type → template

| Situation | Template | GitHub title (no leading `v`) | Tag |
| --- | --- | --- | --- |
| Bug fixes, dep bumps only | [`TEMPLATES/patch.md`](TEMPLATES/patch.md) | `X.Y.Z` | `vX.Y.Z` |
| New features, no breaking changes | [`TEMPLATES/minor.md`](TEMPLATES/minor.md) | `X.Y.Z` or `X.Y.0` with subtitle | `vX.Y.Z` |
| New major `vN.0.0` | [`TEMPLATES/major.md`](TEMPLATES/major.md) | `N.0.0 - <Hook>` | `vN.0.0` |
| Pre-release | [`TEMPLATES/beta.md`](TEMPLATES/beta.md) | `X.Y.Z Beta N` or `X.Y.Z Beta N (RC2)` | `vX.Y.Z-beta.N` |
| Security / manual update | [`TEMPLATES/security.md`](TEMPLATES/security.md) | `X.Y.Z - Manual Update Required` or `... SECURITY UPDATE: Manual Update Required` | `vX.Y.Z` |

**Subtitle on title (SHOULD use when):** security, manual-update-required, major launch, themed release. Plain patches often have no subtitle.

**Early `vN.0.x` patches MAY inherit** the major's title subtitle (e.g. `4.0.1 - The Biggest Update Yet!`) until `vN.1.0` or the major has clearly settled.

**Pre-release:** mark GitHub release as **Pre-release** for all betas.

---

## Tag, title, and body version strings

| Context | Format | Example |
| --- | --- | --- |
| Git tag | `vMAJOR.MINOR.PATCH` | `v4.0.8` |
| Beta tag | `vX.Y.Z-beta.N` | `v2.1.0-beta.3` |
| GitHub release **title** | No leading `v`; optional subtitle after ` - ` | `4.0.8` or `4.0.0 - The Biggest Update Yet!` |
| Beta title | `X.Y.Z Beta N` or `X.Y.Z Beta 3 (RC2)` | `2.1.0 Beta 3 (RC2)` |
| `## Changes in` heading | `` ## Changes in `vX.Y.Z:` `` | `` ## Changes in `v4.0.8:` `` |
| Beta heading | Colon **inside** backticks | `` ## Changes in `v2.1.0-beta.3:` `` |
| RC heading | Parenthetical **inside** backticks | `` ## Changes in `v2.1.0-beta.3 (RC2):` `` |
| Download URL `<TAG>` | **Includes** `v` | `.../releases/download/v4.0.8/...` |

**Do not put publication dates** in the title or any heading (GitHub shows the date). Dates MAY appear inside prose when relevant.

---

## Mandatory section order

Every release body uses these blocks **in this order**. Optional blocks are marked.

```
1.  (beta only)     > [!NOTE] 🅱️ Beta build callout — BEFORE downloads
2.  # ⬇️ Downloads   + 3-column table (Windows | macOS | Linux)
3.  > [!IMPORTANT]  signing / arch / stability (stack-specific)
4.  ### ℹ️ Enjoying <App>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
5.  (optional)      one-line app intro
6.  (vN.0.x only)   # Welcome to <App> vN!!! hero — unchanged from vN.0.0
7.  ## Changes in `vX.Y.Z:` + bullets (+ optional banner under heading)
8.  ## Changes in …  carry-forward sections (newest first)
9.  (when needed)   ## Click below for the full `vN` Changelog <details>
10. (optional)      MSI / breaking-change callouts
11. ## ℹ️ Release Info footer
```

Beta callout is the **only** section that goes above `# ⬇️ Downloads`. Everything else follows the table above.

---

## Downloads block (agents)

**Start from:** [`TEMPLATES/_partials/downloads-table.md`](TEMPLATES/_partials/downloads-table.md) or the table in your release template.

**MUST:**

- Heading exactly: `# ⬇️ Downloads`
- Three columns in order: **Windows | macOS | Linux** (with OS icon `<img>` headers per template)
- Column header text exactly: `Windows`, `macOS`, `Linux`
- Linkified cells: users click to download, not plain labels
- Empty cells for unsupported platforms — never `N/A` or `—`

**URL pattern:**

```
https://github.com/<ORG>/<APP>/releases/download/<TAG>/<ASSET_FILENAME>
```

`<TAG>` always includes `v`. `<APP>` is the repo name and filename prefix.

**Cell patterns:**

| Pattern | Markdown shape |
| --- | --- |
| Single universal binary | `**[Universal DMG](url)**` |
| Multi-arch one format | `**EXE:** [x64](url) / [arm64](url)` |
| Arch not built yet | `[x64](url) <!-- / [arm64](url) -->` |
| MSI (stable only) | Third Windows row: `*See MSI note below*` (italic) + MSI callout later |
| MS Store (ROSI) | Badge in row 2 Windows cell per template |
| Beta | **Omit** MSI placeholder row entirely |

**Asset filenames** often use legacy `MacOS` in the file (e.g. `IYERIS-MacOS-universal.dmg`) — that is pipeline legacy. **Prose and column headers** still say `macOS`.

---

## Important callout (by stack)

Place `> [!IMPORTANT]` immediately under the downloads table.

| Stack | Content |
| --- | --- |
| **Tauri V2** (IYERIS, Zinnia, S3-Sidekick, ROSI) | Use [`TEMPLATES/_partials/tauri-sig-info.md`](TEMPLATES/_partials/tauri-sig-info.md): `.sig` vs `.asc`, GPG key URL, Linux arm64 note |
| **Electron** (updater) | `.asc` / GPG; omit `.sig` unless the app ships Tauri-style sigs |
| **Flutter / Dacx** | `.asc` / GPG only; add pre-1.0 stability disclaimer if applicable |
| **No self-updater** | Drop updater `.sig` paragraph entirely |

---

## Support link

Exact shape (only `<App>` changes):

```markdown
### ℹ️ Enjoying <App>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
```

---

## Major hero block

For `vN.0.0`, add after the support link (see [`TEMPLATES/major.md`](TEMPLATES/major.md)):

- `# Welcome to <App> vN!!!`
- Optional sections: Why version jump, App size difference, Breaking changes, platform caveats

**Hero persistence (critical):**

| Release | Hero |
| --- | --- |
| `vN.0.0` | Write the full hero |
| `vN.0.1` … `vN.0.x` | **Copy the `vN.0.0` hero unchanged** between support link and first `## Changes in` |
| `vN.1.0` and later | **Remove** hero — use carry-forward + Full vN link instead |

---

## `## Changes in` sections

### Heading (invariant)

```markdown
## Changes in `vX.Y.Z:`
```

- Leading `v` always
- Version and **trailing colon** both inside backticks
- Wrong: `## Changes in v4.0.8` · Wrong: `## Changes in `v4.0.8`:` (colon outside)

### Optional banner (under heading)

Use for security, major themes, large minors:

```markdown
## Changes in `v0.4.0:`

### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!
```

Short intro paragraphs are allowed (and encouraged for security / manual-update releases).

### Bullets

```markdown
- **Category:** Sentence ending with a period.
  - Nested detail with two-space indent.
- **NEW - Feature Name:** What the feature does for users.
- **PKG:** Updated packages.
```

**Rules:**

- Author with markdown `-` only — **never** paste literal `•` or `◦` (GitHub renders those from `-`)
- Every top-level change bullet: `- **Category:**` then description
- One logical change per bullet; split unrelated items
- End descriptions with `.` or `!`
- Backtick versions, paths, package names, menu paths: `` `v2.1.0` ``, `` `Settings` > `About` ``
- Voice: first person (`I`, `my`), casual; use **Added** / **Updated** / **Removed** / **Fixed an issue where…**
- Do **not** cite PR numbers, issue numbers, or commit hashes

### PKG bullet

Almost every release ends with:

```markdown
- **PKG:** Updated packages.
```

Include it whenever dependencies moved. `PKG` is uppercase; `packages` is lowercase.

### Category vocabulary (closed core)

Use a category from this table when one applies. If nothing fits, check the app's `CONTRIBUTING.md` for app-specific categories (e.g. `FFMPEG`, `Thumbnails`). Do not invent one-off categories.

| Category | Use for |
| --- | --- |
| `PKG` | Dependency / package updates |
| `Electron` | Electron version bumps |
| `Tauri` | Tauri version bumps |
| `Typescript` | TypeScript / typing changes |
| `Codebase` | Refactors, scripts, internal cleanup |
| `Testing` | Tests, headless coverage |
| `UI` | User-visible UI tweaks (not a named new feature) |
| `Logo` | Icons / logos |
| `Updater` | Self-updater behavior |
| `Security` | Security fixes, key rotation |
| `Licenses` | License credits / SBOM |
| `Ver` | Version-only bumps (typical `-beta.1`) |
| `macOS`, `Windows`, `Linux` | OS-specific fixes |
| `Misc` | Catch-all; group small items as sub-bullets |
| `NEW - <Feature>` | Discrete new feature (noun phrase name) |

**Non-conformant legacy (do not use in new notes):** `MISC` → use `Misc`; `MacOS` category → use `macOS`; `BETA build` → `Beta build`.

---

## Carry-forward rule (stable releases)

**Goal:** Someone landing on any patch sees recent context without the entire patch chain inlined.

### Algorithm

Given current version `vX.Y.Z` (stable, not beta):

1. Always include `` ## Changes in `vX.Y.Z:` `` (current).
2. If `Z > 0`, include `` ## Changes in `vX.Y.(Z-1):` `` (immediate prior patch).
3. If not already included, include `` ## Changes in `vX.Y.0:` `` (minor milestone).
4. If not already included, include `` ## Changes in `vX.0.0:` `` (major milestone).
5. If any patch between milestones is **skipped**, add [Full vN changelog](#full-vn-changelog-link) linking the long-form changelog.

**Order:** newest first, descending.

### Worked matrix

| You are releasing | `## Changes in` sections required (in order) | Full `vN` link? |
| --- | --- | --- |
| `v5.0.0` | `v5.0.0` only (+ hero) | No (nothing older on this major) |
| `v4.1.0` | `v4.1.0`, `v4.0.0` | Yes — all of `v4.0.x` patch chain |
| `v4.1.3` | `v4.1.3`, `v4.1.2`, `v4.1.0`, `v4.0.0` | Yes — other `v4.0.x` / `v4.1.x` patches |
| `v4.0.5` | `v4.0.5`, `v4.0.4`, `v4.0.0` | Yes — `v4.0.1`–`v4.0.3` |

**Copy prior sections from actual prior release bodies** when possible. Do not fabricate historical bullets.

### Full vN changelog link

When truncating older patches:

```markdown
## Click below for the full `v4` Changelog

<details>
<summary>Full v4 changelog</summary>

See the [full v4 changelog](https://github.com/<org>/<app>/blob/main/CHANGELOG-v4.md).

</details>
```

Place **above** `## ℹ️ Release Info`. Omit on `vN.0.0` when there is nothing older to link.

---

## Beta / RC (different rules)

**Top of body (before downloads):**

```markdown
> [!NOTE]
> 🅱️ This is a Beta build.
```

**`-beta.1` convention:** version-bump-only sync to latest stable — prose explains that; bullets are typically `Ver` + `PKG`:

```markdown
## Changes in `vX.Y.Z-beta.1:`

Beta 1 releases of <App> don't include any changes besides pkg updates, and are
meant to sync beta users to the latest STABLE.

- **Ver:** Bumped version to `vX.Y.Z-beta.1`.
- **PKG:** Updated packages.
```

**MSI:** not shipped — state in MSI note; omit `*See MSI note below*` row in downloads table.

**Carry-forward for betas (SHOULD):**

- Current beta `## Changes in`
- Immediately previous beta on same target version (if any)
- Most recent **stable** release the beta line builds on

Older betas MAY be omitted or linked via Full vN changelog when irrelevant.

---

## Security / manual-update releases

- Title: `X.Y.Z - Manual Update Required` or `X.Y.Z - SECURITY UPDATE: Manual Update Required`
- Under current `## Changes in`: `### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!`
- Honest apologetic paragraph — what happened, what users must do (download, install, verify)
- See [`TEMPLATES/security.md`](TEMPLATES/security.md)

---

## MSI / enterprise callout (stable only)

When MSI builds exist, use [`TEMPLATES/_partials/msi-note.md`](TEMPLATES/_partials/msi-note.md). Heading:

```markdown
### MSI Installer Support (MSI builds are NOT provided for betas)
```

Betas: MSI callout should say MSI is **not** provided.

---

## Release Info footer

**Heading MUST be exactly:**

```markdown
## ℹ️ Release Info
```

Use [`TEMPLATES/_partials/release-info.md`](TEMPLATES/_partials/release-info.md). Baseline bullets: GPG Signed, GPG Key, Code Signing, Legacy Binaries — omit bullets that do not apply; add Store codesigning bullet for ROSI.

**Flutter (Dacx):** older footers (`## Features`, `## Supported Platforms…`) MAY appear **in addition** to §9 — they do **not** replace `## ℹ️ Release Info`.

---

## Framework quick reference

| Stack | `.sig` in Important | MSI | Updater | Legacy binaries bullet | Extra |
| --- | --- | --- | --- | --- | --- |
| Tauri V2 | Yes | Stable only | Yes | Yes | `Tauri` category on bump |
| Electron | No | If shipped | Yes | Yes | `Electron` category on bump |
| Flutter | No | N/A | No | Omit | Stability disclaimer; `Codebase` for Flutter bumps |
| MS Store (ROSI) | Per underlying stack | Per stack | Per stack | Per stack | Store badge + Store codesigning in Release Info |

**Images:** patch/minor SHOULD NOT add screenshots in changes. Major hero MAY include GitHub-hosted images with alt text.

**Language:** English body required; translations MAY go in `<details>` below, same structure.

---

## Lint script (run before publish)

```bash
node scripts/lint.mjs path/to/release-body.md
# or: cat body.md | node scripts/lint.mjs -
```

| ID | Checks |
| --- | --- |
| M001 | No literal `•` / `◦` |
| M002 | `## Changes in \`vX.Y.Z:\`` shape (colon inside backticks) |
| M003 | Top-level bullets start with `- **Category:**` |
| M004 | `# ⬇️ Downloads` present |
| M005 | `## ℹ️ Release Info` present |
| M006 | Bullets end with `.` / `!` / `…` |
| M007 | No un-backticked `## Changes in v…` |
| M008 | No `MISC:` |
| M009 | No `BETA build` |

**Lint does NOT check:** carry-forward completeness, category vocabulary, tone, hero persistence, download URL correctness, or subtitle wording. You enforce those.

Templates/examples use `<!-- bcls:partial -->` or `<!-- bcls:ignore-start -->` so lint skips incomplete snippets — **remove** those comments from the final published body.

---

## Legacy patterns in old releases (do not copy)

When reading historical ROSI/IYERIS notes for carry-forward content, **normalize** these if you touch the section:

| Old pattern | Conformant now |
| --- | --- |
| `## Changes in v4.0.0` (no backticks) | `` ## Changes in `v4.0.0:` `` |
| `` ## Changes in `v4.0.0`: `` (colon outside backticks) | `` ## Changes in `v4.0.0:` `` |
| `- **MISC:**` | `- **Misc:**` |
| `- **MacOS:**` category | `- **macOS:**` |
| Plain-text downloads table (no links) | Linkified table per §3 |
| Entire `v4.0.1`–`v4.0.7` chain on `v4.0.8` | Truncate per carry-forward + Full v4 link |
| `## Installation & Notes` footer | `## ℹ️ Release Info` |

See [`EXAMPLES/patch-rosi-v4.0.8.md`](EXAMPLES/patch-rosi-v4.0.8.md) for annotated contrast between historical and preferred forms.

---

## Reference examples (read one matching your task)

| File | Teaches |
| --- | --- |
| [`EXAMPLES/patch-rosi-v4.0.8.md`](EXAMPLES/patch-rosi-v4.0.8.md) | Small patch + carry-forward to milestone |
| [`EXAMPLES/minor-iyeris-v2.1.0.md`](EXAMPLES/minor-iyeris-v2.1.0.md) | Minor feature release |
| [`EXAMPLES/major-iyeris-v2.0.8.md`](EXAMPLES/major-iyeris-v2.0.8.md) | Major hero + breaking changes |
| [`EXAMPLES/beta-iyeris-v2.2.0-beta.1.md`](EXAMPLES/beta-iyeris-v2.2.0-beta.1.md) | `-beta.1` sync release |
| [`EXAMPLES/security-zinnia-v0.4.0.md`](EXAMPLES/security-zinnia-v0.4.0.md) | Security banner + manual update |

STANDARD §14 contains a minimal conformant patch example (ROSI `v4.0.8`).

---

## DO / DON'T

| DO | DON'T |
| --- | --- |
| Use markdown `-` bullets | Paste literal `•` / `◦` |
| `` ## Changes in `vX.Y.Z:` `` (colon inside backticks) | `## Changes in v1.2.3` or colon outside backticks |
| Include `v` in heading version | `` ## Changes in `2.1.2:` `` |
| Carry forward prior patch + minor + major milestones | Only show current version |
| Add Full vN link when truncating older patches | Inline every patch back to `vN.0.0` once a Full link exists |
| End with `- **PKG:** Updated packages.` when deps moved | Skip PKG as "boring" |
| Write `Misc:` | Write `MISC:` |
| Write `Beta build` in beta callout | Write `BETA build` |
| Use `## ℹ️ Release Info` | Rename footer (`Installation & Notes`, etc.) |
| Keep hero on `vN.0.x` patches | Keep hero past `vN.1.0` |
| First-person casual voice | Marketing hype ("revolutionary", "blazing fast") |
| `Fixed an issue where…` | `Fixed bug` |
| User-visible behavior | PR numbers, issue numbers, commit hashes |
| Split mixed changes into separate bullets | One bullet, two unrelated changes |
| Run `node scripts/lint.mjs` on the final body | Ship without checking lint |
| Ask for missing org/tag/stack/prior bodies | Guess URLs or invent history |

---

## Final pre-publish checklist

### Metadata
- [ ] Git tag `vX.Y.Z` (or `-beta.N`) matches headings and download URLs
- [ ] GitHub title drops `v`; subtitle only when appropriate
- [ ] Pre-release flag set for betas

### Structure
- [ ] Section order matches [Mandatory section order](#mandatory-section-order)
- [ ] `# ⬇️ Downloads` — 3 columns, Windows \| macOS \| Linux, linkified cells
- [ ] `> [!IMPORTANT]` matches stack (Tauri sig partial vs Flutter disclaimer)
- [ ] Support link with correct app name
- [ ] Beta: `> [!NOTE]` 🅱️ callout **above** downloads
- [ ] `vN.0.x`: hero copied from `vN.0.0`; `vN.1.0+`: no hero

### Changes sections
- [ ] Every `` ## Changes in `v…:` `` — `v` prefix, backticks, colon inside
- [ ] Every bullet `- **Category:**` with closing `.` or `!`
- [ ] `- **PKG:** Updated packages.` when deps updated
- [ ] Carry-forward chain complete (stable algorithm or beta SHOULD)
- [ ] Full vN `<details>` link when older patches truncated

### Footer & callouts
- [ ] `## ℹ️ Release Info` (exact heading)
- [ ] MSI note only when MSI ships (stable); betas state MSI omitted
- [ ] Security: banner + apology + manual steps

### Quality
- [ ] No literal `•` / `◦`; no `MISC` / `BETA build` / `MacOS:` category
- [ ] No marketing fluff; no PR/issue/commit references
- [ ] `node scripts/lint.mjs` passes on final body (no `bcls:partial` left in publish copy)

---

## When unsure

1. Match the closest [`EXAMPLES/`](EXAMPLES/) file.
2. Read the matching section in [`STANDARD.md`](STANDARD.md).
3. Ask the user rather than inventing carry-forward history or asset URLs.
