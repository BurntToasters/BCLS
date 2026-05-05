# BCLS — BurntToasters Changelog Standard

> **Spec version:** `v1.0.0`
> **Status:** Stable
> **Scope:** GitHub release notes for all BurntToasters apps (IYERIS, Dacx, ROSI, S3-Sidekick, Zinnia, and future projects).
> **Changelog:** [CHANGELOG.md](CHANGELOG.md)

This document is the canonical specification for how release notes are written in BurntToasters repositories. It is written to be unambiguous enough that an AI agent given only this file plus a list of changes can produce notes indistinguishable from hand-written ones.

If you're an agent: also read [AGENTS.md](AGENTS.md) for a condensed checklist.

---

## 0. Conformance

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** in this document are to be interpreted as in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

- **MUST / MUST NOT** — load-bearing rules. A note violating any MUST is non-conformant and should be edited before publishing.
- **SHOULD / SHOULD NOT** — strong recommendations. Deviate only with a reason worth writing down.
- **MAY** — optional; pick what fits the release.

Where a rule below isn't tagged, treat it as MUST if it's in §§1–6, §9, §11; SHOULD otherwise. The lint script in [`scripts/lint.mjs`](scripts/lint.mjs) checks the machine-checkable MUSTs.

### Pinning a spec version

Downstream apps MAY note conformance like this in their own contributor docs:

> Release notes for this app conform to BCLS `v1.x`.

Use the **MAJOR** of the spec — minor bumps are additive and won't invalidate prior notes.

## 1. Tagging & Versioning

- **Tag format:** `vMAJOR.MINOR.PATCH` (e.g. `v2.1.2`, `v0.6.3`).
- **Pre-releases:** `vMAJOR.MINOR.PATCH-beta.N` (e.g. `v2.1.0-beta.3`). RC builds reuse the beta channel and are marked in the title (`Beta 3 (RC2)`).
- **GitHub release "title":** drops the leading `v` and may append a subtitle:
  - `2.1.2`
  - `2.1.2 - Manual update required if you are on a version below 2.1.1`
  - `4.0.0 - The Biggest Update Yet!`
  - `2.1.0 Beta 3 (RC2)`
- **When to use a subtitle:** security updates, manual-update-required releases, major versions, thematically named releases. Patch releases without a story do not need one.
- **Subtitle inheritance across early patches of a major:** patches `vN.0.1` … `vN.0.x` MAY inherit the major's subtitle (e.g. ROSI `4.0.1 - The Biggest Update Yet!`) to keep early follow-ups visually grouped under the major launch. Inherited subtitles SHOULD stop once the next minor (`vN.1.0`) ships, or sooner if the major has clearly settled in.

## 2. Top-of-Body Structure (Required Order)

Every release body uses these sections in this order. Optional sections are marked.

1. **Downloads block** — `# ⬇️ Downloads` heading + OS table (see §3).
2. **Important callout** — GitHub `> [!IMPORTANT]` / `Important` block with signing/asset notes (see §4).
3. **Support link** — `### ℹ️ Enjoying <App>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)`
4. *(Optional)* **App intro** — one-line tagline if the app is not yet well known, or a "Welcome to vN!" banner for major releases.
5. **Changes section(s)** — `## Changes in \`vX.Y.Z:\`` (see §5).
6. **Carry-forward sections** — prior versions' `## Changes in` blocks: immediately previous patch, current minor milestone, current major milestone. Newest first (see §6).
7. *(Optional)* **Full vN changelog link** — collapsible link to the long-form changelog for everything older (see §6.1).
8. *(Optional)* **Special callouts** — MSI/enterprise notes, Linux arm64 status, breaking-change blocks.
9. **Release Info** — `## ℹ️ Release Info` with GPG, code signing, legacy-binary notes (see §9).

## 3. Downloads Block

The canonical form uses OS-icon column headers and **linkified asset cells** so users can click directly to download each binary. Placeholders (`<ORG>`, `<APP>`, `<TAG>`, `<MS_STORE_ID>`) are filled in per release.

```markdown
# ⬇️ Downloads

| <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/windows.png" /> Windows | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/mac.png" /> macOS | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/linux.png" /> Linux |
| :--- | :--- | :--- |
| **EXE:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-x64.exe) / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-arm64.exe) | **[Universal DMG](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.dmg)** | **AppImage:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.AppImage) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.AppImage) --> |
| <div align="center"><a href="https://apps.microsoft.com/detail/<MS_STORE_ID>?referrer=appbadge&mode=full"><img src="https://get.microsoft.com/images/en-us%20light.svg" width="150"/></a></div> | **[Universal ZIP](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.zip)** | **DEB:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-amd64.deb) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.deb) --> |
| *See MSI note below* | | **RPM:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.rpm) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.rpm) --> |
| | | **Flatpak:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.flatpak) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.flatpak) --> |
```

**MUSTs:**

- Always three columns in the order **Windows | macOS | Linux**.
- Omit (leave blank) cells for unsupported platforms; do not write "N/A".
- The column header text is exactly `Windows`, `macOS`, `Linux` (§11). The leading OS-icon `<img>` is part of the canonical header.

**SHOULDs (linkification & layout):**

- Stable releases SHOULD use linkified asset cells (above pattern) so users don't have to scroll the Assets dropdown.
- Use `Universal` for fat binaries shipping both arches in one file.
- For Microsoft-Store-distributed apps (ROSI), put the Store badge in the second-row Windows cell as shown above. Non-Store apps leave that cell blank (or keep the badge HTML inside an HTML comment as a discoverable scaffold).
- If MSI builds exist for a stable release, put `*See MSI note below*` (italic) in the third-row Windows cell and add the MSI note callout (§8.1).
- Beta releases MAY use the same linkified table, but MUST omit the MSI placeholder row (§7).

### 3.1 Cell-Formatting Conventions

| Cell type | Form |
| --- | --- |
| Single fat-binary asset | `**[Label](URL)**` — e.g. `**[Universal DMG](.../app-MacOS-universal.dmg)**` |
| Multi-arch single format | `**Format:** [arch1](URL) / [arch2](URL)` — e.g. `**EXE:** [x64](...) / [arm64](...)` |
| Arch not yet shipped | Keep the link inside an HTML comment so it's a one-line edit to enable later: `[x64](...) <!-- / [arm64](...) -->` |
| MS Store badge | A single-cell `<div align="center"><a><img></a></div>` block as shown in the canonical example. |
| MSI placeholder | `*See MSI note below*` (italic), pointing at the MSI callout in §8.1. |
| Empty cell | Leave blank — no `N/A`, no em-dash. |

### 3.2 URL & Asset-Naming Pattern

Asset URLs follow GitHub's standard release-asset path:

```
https://github.com/<ORG>/<APP>/releases/download/<TAG>/<ASSET>
```

- `<TAG>` includes the leading `v` (e.g. `v2.1.2`, `v4.0.0`, `v2.1.0-beta.3`).
- `<APP>` is the GitHub repo name and asset filename prefix.
- `<ORG>` is the GitHub user/org (e.g. `BurntToasters`).

Asset filename conventions used across the BurntToasters apps (BCLS doesn't mandate these — they're recorded for convenience; apps on different stacks MAY use a different naming scheme so long as it's consistent within the app):

| Platform | Pattern | Example |
| --- | --- | --- |
| Windows EXE | `<APP>-Win-<arch>.exe` | `IYERIS-Win-x64.exe`, `IYERIS-Win-arm64.exe` |
| Windows MSI | `<APP>-Win-<arch>.msi` | `IYERIS-Win-x64.msi` |
| macOS DMG | `<APP>-MacOS-universal.dmg` | `IYERIS-MacOS-universal.dmg` |
| macOS ZIP | `<APP>-MacOS-universal.zip` | `IYERIS-MacOS-universal.zip` |
| Linux AppImage | `<APP>-Linux-<x86_64\|arm64>.AppImage` | `IYERIS-Linux-x86_64.AppImage` |
| Linux DEB | `<APP>-Linux-<amd64\|arm64>.deb` | `IYERIS-Linux-amd64.deb` |
| Linux RPM | `<APP>-Linux-<x86_64\|aarch64>.rpm` | `IYERIS-Linux-x86_64.rpm` |
| Linux Flatpak | `<APP>-Linux-<x86_64\|aarch64>.flatpak` | `IYERIS-Linux-x86_64.flatpak` |

> Asset filenames retain the legacy `MacOS` casing because they are tied to existing build pipelines and renaming would break update URLs. User-facing prose and column headers still use canonical `macOS` (§11).

## 4. Important Callout

Use a GitHub `Important` callout immediately under the downloads table. Required content varies by stack:

**Tauri V2 apps (IYERIS, Zinnia, S3-Sidekick, ROSI):**
```markdown
> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures — they are for Tauri V2's
> updater to verify the integrity of updates before downloading and installing.
>
> The `.asc` files are my normal GPG signatures which you can verify using my GPG Public
> Key: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc
>
> ⚠️ Arm64 Linux Binaries are NOT available at the moment. Its something I may get around to
> in the future but its not a priority. However, I do have the logic setup in the repo
> in-case people would like to build their own :)
```

**Non-updater apps (Dacx / Flutter, etc.):** drop the `.sig` paragraph; keep the `.asc` paragraph and any arch-availability warning. Add a stability disclaimer if the app is pre-1.0:
> This app is currently unstable. Bugs, issues, and rough edges are expected.

## 5. The `Changes in` Section

### 5.1 Heading

```markdown
## Changes in `vX.Y.Z:`
```

- **Invariant:** the heading is **always** `## Changes in \`vX.Y.Z:\`` — leading `v`, version inside backticks, **trailing colon inside the backticks too**. This applies to every release, including major milestones (`v4.0.0`) and pre-releases. Variants seen in older notes (`v4.0.0\`:` with the colon outside, or `2.1.2:` with no `v`) are non-conformant and SHOULD be corrected on next edit.
- Pre-releases: `## Changes in \`vX.Y.Z-beta.N:\``. RC builds keep the parenthetical inside the backticks: `## Changes in \`vX.Y.Z-beta.N (RC):\``, `## Changes in \`vX.Y.Z-beta.N (RC2):\``.

### 5.2 Optional Banner / Intro

For thematic, security, or major releases, a banner subtitle and/or short intro paragraph may follow the heading:

```markdown
## Changes in `v0.4.0:`

### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!
```

```markdown
## Changes in `v0.6.0:`

### v0.6.0 is a large feature packed update :) I hope you enjoy this project getting close to my vision of 1.0!
```

Apologetic / informational paragraphs are allowed (and encouraged for security and manual-update releases).

### 5.3 Bullet Format

```markdown
- **Category:** Description sentence ending with a period.
  - Sub-bullet for nested detail.
- **NEW - Feature Name:** Description of the new feature.
```

Rules:
- One bullet per logical change.
- `Category:` (or `NEW - Feature:`) is **bold**, followed by a colon, then a space, then a sentence-cased description ending in `.` or `!`.
- Sub-items are nested with two-space indent.
- Inline code (`` `like-this` ``) for version numbers, file paths, settings names, package names.
- Emojis allowed sparingly (`:)`, `:P`, `❤️`, `⚠️`).

> **Note on rendered bullets:** GitHub renders `-` bullets as `•` and nested ones as `◦`. Always author with markdown `-` / two-space indent — never paste literal `•` / `◦` characters.

### 5.4 Canonical Category Vocabulary

The table below is the **closed core list** for BCLS. Notes MUST use a category from this table when one applies; if nothing fits, an app MAY register an app-specific category in its own repo's `CONTRIBUTING.md` (or equivalent) and use it consistently. Ad-hoc one-off categories SHOULD NOT be invented per release.

| Category | Use for |
| --- | --- |
| `PKG` | Package / dependency updates. Almost every release ends with `**PKG:** Updated packages.` |
| `Electron` | Electron version bumps (Electron apps only). |
| `Tauri` | Tauri version bumps. |
| `Typescript` | TypeScript version / typing changes. |
| `Codebase` | Internal refactors, dead-code removal, scripting tweaks. |
| `Testing` | Test coverage additions, headless test changes. |
| `UI` | User-facing UI changes that aren't a discrete new feature. |
| `Logo` | Logo / icon changes. |
| `Updater` | App self-updater behavior. |
| `Security` | Security fixes, key rotations. |
| `Licenses` | License-credit / SBOM additions. |
| `Ver` | Version bumps without functional changes (typical for `-beta.1` builds). |
| `macOS`, `Windows`, `Linux` | OS-specific fixes. The historical category form `MacOS` is non-conformant; new notes MUST use `macOS` (see §11). |
| `Misc` | Catch-all bucket; sub-bullets for grouped small items. The uppercase form `MISC` seen in older notes is non-conformant; new notes MUST use `Misc`. |
| `NEW - <Feature>` | A discrete new feature. The feature name is a noun phrase. |

If a new category recurs across more than one app, propose adding it to this table via a spec MINOR bump (see [CHANGELOG.md](CHANGELOG.md)).

### 5.5 PKG Bullet Convention

`PKG` bullets are nearly always present and almost always read:

```markdown
- **PKG:** Updated packages.
```

- `PKG` is uppercase (acronym). The descriptive word is `packages` (lowercase). Variants in older notes (`Updated Packages.`, `Updated packges.`) are typos / drift, not house style.

## 6. Carry-Forward Rule

The goal of carry-forward is to give a user landing on any release enough recent context to understand what they're getting, without bloating the body. The canonical shape is:

**A release body MUST contain `## Changes in` sections for, in this order:**

1. The current release (`vX.Y.Z`).
2. The immediately previous patch on the same minor line (`vX.Y.(Z-1)`), if one exists — so the latest user-visible fix isn't hidden one click away.
3. The current minor milestone (`vX.Y.0`), if not already covered above.
4. The current major milestone (`vX.0.0`), if not already covered above.

Everything older than that is linked out via a single **Full vN changelog** section (see §6.1).

### Worked examples

- **`v4.0.5`** body shows: `v4.0.5`, `v4.0.4`, `v4.0.0`. Older `v4.0.x` patches → Full v4 changelog link.
- **`v4.1.3`** body shows: `v4.1.3`, `v4.1.2`, `v4.1.0`, `v4.0.0`. Everything else → Full v4 changelog link.
- **`v4.1.0`** (a fresh minor) body shows: `v4.1.0`, `v4.0.0`. The whole `v4.0.x` chain → Full v4 changelog link.
- **`v5.0.0`** (a fresh major) body shows: `v5.0.0` only. The hero block (§8.2) replaces inherited context. Full v4 changelog is no longer relevant.

Order: newest version first, descending.

### 6.1 The `Full vN changelog` Section

When older entries get truncated by the rule above, include a single `## Click below for the full \`vN\` Changelog` section near the bottom of the body (above §9 Release Info), containing one collapsible `<details>` block that links to a long-form per-major changelog body — typically a Gist, a `CHANGELOG.md` in the app repo, or a release tagged for the purpose.

```markdown
## Click below for the full `v4` Changelog

<details>
<summary>Full v4 changelog</summary>

See the [full v4 changelog](https://github.com/<org>/<app>/blob/main/CHANGELOG-v4.md).

</details>
```

This section MUST exist whenever any patch is being truncated; it MAY be omitted on `vN.0.0` itself (nothing to link to yet) and on releases where the carry-forward chain already covers everything.

### 6.2 Heading Anchors

GitHub auto-generates anchors from headings. The canonical `## Changes in \`vX.Y.Z:\`` form produces the anchor `#changes-in-vxyz` (backticks and the trailing colon are stripped). Authors MUST NOT change the heading shape just to influence the anchor — downstream links rely on this slug being stable.

### 6.3 Dates

Release bodies MUST NOT include a publication date in the title or in any heading. GitHub's release UI already surfaces the publish date next to the tag; duplicating it invites drift if a release is edited or re-published. Dates MAY appear inside prose (e.g., "the keyserver migration on 2026-04-12").

## 7. Beta / RC Conventions

- Title: `2.1.0 Beta 1`, `2.1.0 Beta 2`, `2.1.0 Beta 3 (RC2)`.
- Mark as GitHub Pre-release.
- Add the beta callout at the very top of the body:
  ```markdown
  > [!NOTE]
  > 🅱️ This is a Beta build.
  ```
- The first beta of a new version (`-beta.1`) is conventionally a version-bump-only release that syncs beta-channel users to the most recent stable. Its `Changes in` body should say so:
  ```markdown
  Beta 1 releases of <App> don't include any changes besides pkg updates, and are
  meant to sync beta users to the latest STABLE.

  - **Ver:** Bumped version to `vX.Y.Z`.
  - **PKG:** Updated packages.
  ```
- Betas do **not** ship MSI builds. State this in the MSI note (§8).
- **Carry-forward for betas:** §6's stable-release chain doesn't apply directly. A beta body SHOULD include `## Changes in` for the current beta, the immediately previous beta on the same target version (if any), and the most recent stable release that the beta line is iterating from. Older betas of the same target MAY be linked from a Full vN changelog block, or omitted once they're irrelevant to the next stable.

## 8. Special Callouts (Optional)

### 8.1 MSI / Enterprise

```markdown
### MSI Installer Support (MSI builds are NOT provided for betas)

> [!IMPORTANT]
> **Enterprise Users:** We now support Windows X64/ARM64 `.MSI` installers for MDM/AD deployment.
>
> - `.MSI` installers do NOT support auto-updates. You must deploy the new MSI manually.
> - These are strictly for enterprise management; standard users should use the EXE above.
> - Files available in the "Assets" dropdown below.
```

### 8.2 Major-Version Hero Sections

Major releases (e.g., `v2.0.0`, `v4.0.0`) add a hero block above the changes section:

```markdown
# Welcome to <App> vN!!!

<Optional hook line>

## Why are we already on N.0 when (N-1).0 was released just a few weeks ago?!
<Story / motivation paragraphs>

## App Size Difference
<Comparison numbers, if relevant>

## Breaking Changes
<What users must do>

## <Platform-specific caveats>
<e.g., "Linux arm64:" missing-arch note>
```

#### 8.2.1 Hero Persistence Across the `vN.0.x` Patch Line

The hero block from `vN.0.0` SHOULD be carried forward unchanged in every `vN.0.x` patch body, sitting between the support link (item 3 of §2) and the `## Changes in` section. This way users landing on a recent patch still get the major launch story.

The hero MUST be removed once `vN.1.0` ships — by then the major has settled in and the hero becomes noise. From `vN.1.0` onward the carry-forward chain (§6) and the Full vN changelog link (§6.1) carry the historical context instead.

### 8.3 Manual-Update / Security Banner

For releases requiring a manual download (key rotations, EOL transitions, etc.):

- Title subtitle: `- Manual Update Required` or `- SECURITY UPDATE: Manual Update Required`.
- Banner inside `Changes in`: `### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!`
- Apologetic paragraph explaining the cause.

## 9. Release Info Footer

```markdown
## ℹ️ Release Info

- **GPG Signed:** My public key is attached to every release to ensure authenticity.
- **GPG Key:** You can get my public GPG key here: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc
- **Code Signing:** macOS releases are fully signed. Windows releases are not signed by an org, but
  are signed by my GPG signature (same with Linux).
- **Legacy Binaries:** Separate x64/arm64 Windows binaries are deprecated in favor of the Universal
  installer. They are still listed in the downloads section, but the universal installer is recommended
  for simplicity.
```

- The footer heading MUST be exactly `## ℹ️ Release Info`. Alternative names seen in older notes (`# ℹ️ Installation & Notes`, `### 🔐 GPG Signing`) are non-conformant and SHOULD be migrated.
- Bullets MAY be added (e.g., a Microsoft-Store-codesigning bullet for Store-distributed apps) or omitted if they don't apply (e.g., apps without legacy binaries skip the `Legacy Binaries` bullet). The four bullets above are the canonical baseline; they SHOULD all appear unless inapplicable.

## 10. Tone & Voice

- **First person, casual.** "I", "me", "my".
- **Smileys allowed** in moderation: `:)`, `:P`, `❤️`.
- **Apologize when warranted.** Security incidents, manual-update inconveniences, removed features.
- **No marketing fluff.** Describe what changed, not why it's amazing.
- **Use "Fixed an issue where..."** rather than "Fixed bug".
- **Use "Added"** for new things, **"Updated"** for existing things, **"Removed"** for deletions.

## 11. Casing & Formatting Rules

- **Acronyms uppercase:** `PKG`, `UI`, `UX`, `MSI`, `GPG`, `RPM`, `DEB`, `DMG`, `EXE`. Note: the catch-all category is `Misc` (capitalized first letter, not `MISC`) — it's not an acronym.
- **Operating systems (canonical):** `macOS`, `Windows`, `Linux`, `iOS`, `Android`. Historical variants in older notes (`MacOS`) are non-conformant and SHOULD be migrated to `macOS`.
- **Frameworks/libs:** as the project styles itself — `Electron`, `Tauri`, `TypeScript`, `Flutter`, `FFMPEG` (the project uses uppercase even though canonical is "FFmpeg" — keep house style).
- **Beta callout casing:** `Beta build` (sentence case), not `BETA build`.
- **Version references:** backticked — `` `v2.1.0` ``, `` `41.3.0` ``.
- **Setting / menu paths:** backticked — `` `Settings` > `About` ``.
- **Trailing punctuation:** every bullet description ends with `.` (or `!` for emphasis).

## 12. Framework Addendums

The core spec is framework-agnostic. Stack-specific additions:

| Stack | `.sig` para in §4 | MSI builds | Self-updater bullet | Legacy-binary bullet | Notes |
| --- | --- | --- | --- | --- | --- |
| Tauri V2 | **Required** | Stable only (none on betas) | Yes — Tauri V2 updater | Yes (Universal supersedes split arch) | Bump `Tauri` category on version changes. |
| Electron | Not used | Stable only (if shipped) | Yes — Electron auto-updater | Yes | Bump `Electron` category on version changes. |
| Flutter (Dacx) | Not used | N/A | None (no self-updater) | Omit | Mention Flutter version moves under `Codebase`. Add stability disclaimer in §4 callout while pre-1.0. Dacx's older app-specific footer (`## Features` / `## Supported Platforms and Archs` / `## Codebase` / `## Info`) is **not** a substitute for §9 Release Info — those sections MAY appear *in addition*, but the canonical §9 footer MUST also be present. |
| MS Store distribution (ROSI) | Inherit from underlying stack | Inherit | Inherit | Inherit | Add Store badge above downloads table. Note Microsoft-Store codesigning in Release Info. |

## 12.1 Images & Screenshots

- Patch and minor releases SHOULD NOT include screenshots or GIFs in the changes section. Bullet text is enough.
- Major-release hero sections (§8.2) MAY include screenshots, GIFs, or short videos to illustrate the new direction.
- Images MUST be hosted on GitHub (drag-and-drop into the release body) — never hot-link from external CDNs that could rot or rate-limit.
- Provide alt text for accessibility.

## 12.2 Language

BCLS assumes English-language release notes. Translations MAY be appended in collapsible `<details>` blocks below the canonical English body, preserving the same section structure.

## 13. Don'ts

- Don't paste literal `•` / `◦` characters — use markdown `-` and let GitHub render them.
- Don't write `## Changes in v1.2.3` without backticks. Don't write `## Changes in \`v1.2.3\`:` with the colon outside either — the canonical form is `## Changes in \`v1.2.3:\`` with the colon **inside** the backticks (§5.1).
- Don't drop the `v` prefix from the version inside the heading (`## Changes in \`2.1.2:\`` is wrong).
- Don't forget the carry-forward sections (immediate prior patch + minor + major milestones) on patch releases.
- Don't carry forward the entire patch chain inline once a Full vN changelog link exists — use the link (§6.1).
- Don't keep a major-version hero block past the next minor (§8.2.1).
- Don't rename the footer (`Installation & Notes`, `GPG Signing` headings are non-conformant; use `## ℹ️ Release Info`).
- Don't use marketing voice ("revolutionary", "blazing fast"). The voice is a developer talking to users.
- Don't list every commit. One bullet per user-visible change.
- Don't mix categories inside one bullet — split it.
- Don't omit the `PKG` bullet if dependencies were updated (they almost always are).
- Don't reference issue numbers / PR numbers in the bullet text. Keep notes user-facing.
- Don't write `MISC:` — the catch-all is `Misc:`.
- Don't write `BETA build` — the beta callout is `Beta build`.

## 14. Worked Mini-Example (Patch Release)

```markdown
# ⬇️ Downloads

| <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/windows.png" /> Windows | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/mac.png" /> macOS | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/linux.png" /> Linux |
| :--- | :--- | :--- |
| **EXE:** [x64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Win-x64.exe) / [arm64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Win-arm64.exe) | **[Universal DMG](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-MacOS-universal.dmg)** | **AppImage:** [x64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Linux-x86_64.AppImage) / [arm64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Linux-arm64.AppImage) |
| <div align="center"><a href="https://apps.microsoft.com/detail/9pkgd6lkcl5j?referrer=appbadge&mode=full"><img src="https://get.microsoft.com/images/en-us%20light.svg" width="150"/></a></div> | **[Universal ZIP](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-MacOS-universal.zip)** | **DEB:** [x64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Linux-amd64.deb) / [arm64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Linux-arm64.deb) |
| | | **RPM:** [x64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Linux-x86_64.rpm) / [arm64](https://github.com/BurntToasters/ROSI/releases/download/v4.0.8/ROSI-Linux-aarch64.rpm) |

### ℹ️ Enjoying ROSI? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

## Changes in `v4.0.8:`

- **Testing:** Added more headless testing to ROSI.
- **Electron:** Updated electron to `41.3.0`.
- **PKG:** Updated packages.

## Changes in `v4.0.7:`

- **Electron:** Updated electron to `41.2.2`.
- **PKG:** Updated packages.

## Changes in `v4.0.0:`

### Welcome to ROSI v4!

<...milestone summary content...>

## Click below for the full `v4` Changelog

<details>
<summary>Full v4 changelog</summary>

See the [full v4 changelog](https://github.com/BurntToasters/ROSI/blob/main/CHANGELOG-v4.md).

</details>
```

See [`EXAMPLES/`](EXAMPLES/) for full annotated walkthroughs.

---

## Appendix A — Section Order Cheat Sheet

```
# ⬇️ Downloads
<table>

> [!IMPORTANT]
> <signing / arch / stability>

### ℹ️ Enjoying <App>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

(optional intro)
(persistent hero block on vN.0.x patches — §8.2.1)

## Changes in `vX.Y.Z:`
- **Category:** ...

## Changes in `vX.Y.(Z-1):`     ← immediately previous patch
...
## Changes in `vX.Y.0:`         ← minor milestone
...
## Changes in `vX.0.0:`         ← major milestone
...

## Click below for the full `vN` Changelog   ← §6.1, when older patches are truncated
<details>...</details>

(optional MSI / breaking-change callouts)

## ℹ️ Release Info
- **GPG Signed:** ...
- **GPG Key:** ...
- **Code Signing:** ...
- **Legacy Binaries:** ...
```
