<!-- bcls:partial -->

# EXAMPLE — Patch release: ROSI `v4.0.8`

**Source:** <https://github.com/BurntToasters/ROSI/releases/tag/v4.0.8>
**Type:** Patch
**Stack:** Electron + Tauri-style updater (treat as Electron for sig rules — no `.sig` paragraph needed if you don't ship updater sigs).

A textbook tiny patch release. Three bullets, classic carry-forward back to the v4.0.0 milestone.

---

## Annotated breakdown

> Each `// →` callout maps the line above to a section in [`STANDARD.md`](../STANDARD.md).

```markdown
# ⬇️ Downloads
// → §3 Downloads block. Always first.

| Windows | macOS | Linux |
| --- | --- | --- |
| Universal EXE (Both x64 and arm64) | Universal DMG | AppImage: x64 / arm64 |
| Other: x64 / arm64 |   | DEB: x64 / arm64 |
|   |   | RPM: x64 / arm64 |
// → §3: Three columns, OS order Windows | macOS | Linux. ROSI ships a
//   Microsoft Store badge above this table; omitted here for brevity.

### ℹ️ Enjoying ROSI? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
// → §2 step 3 (support link). Sits immediately above the Changes section.

## Changes in `v4.0.8:`
// → §5.1: backticked version with trailing colon INSIDE the backticks.

- **Testing:** Added more headless testing to ROSI.
- **Electron:** Updated electron to `41.3.0`.
// → §5.3: bold category, colon, sentence, period. Version inline-coded.
- **PKG:** Updated packages.
// → §5.5: the canonical PKG closer.

## Changes in `v4.0.7:`
// → §6 carry-forward, newest first.
- **Electron:** Updated electron to `41.2.2`.
- **PKG:** Updated packages.

## Changes in `v4.0.6:`
- **PKG:** Updated packages.

## Changes in `v4.0.5:`
- **Splash screen:** Fixed incorrect version being displayed on the splash launch screen.
- **PKG:** Updated packages.
- **Electron:** Updated electron to `41.2.0`.

## Changes in `v4.0.4:`
- **FFMPEG:** Fixed a MAJOR issue where users using ROSI's default settings (most people)
  would have YT-DLP fail as FFMPEG options were passing `null`.
- **PKG:** Updated packages.
- **Testing:** Added more test coverage for headless testing.

## Changes in `v4.0.3:`
- **License:** Added missing FFMPEG license notice to app License Credits GUI.
- **PKG:** Updated packages.

## Changes in `v4.0.2:`
- **Logo:** Updated the `.ico` ROSI logo with multiple resolutions for better scaling.
- **Electron:** Updated electron to `41.1.1`.

## Changes in `v4.0.1:`
- **MacOS:** Fixed an issue that prevented ROSI from quitting cleanly.
// → §11: legacy `MacOS` casing tolerated as a category label; new notes
//   should prefer `macOS`.
- **Codebase:** Fixed issues with FFMPEG and the video conversion logic.

## Changes in `v4.0.0`:
// → §6: the milestone. Carry-forward stops here. (Note: trailing colon is
//   OUTSIDE the backticks here — historical inconsistency, not preferred.
//   New notes use `vX.Y.Z:` inside the backticks.)

### Welcome to ROSI v4!
// → §5.2 banner subtitle for the milestone.

<...full v4.0.0 content...>
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- ✅ Three-column download table.
- ✅ Support link placed directly before changes.
- ✅ Carry-forward complete back to `v4.0.0`.
- ✅ `PKG: Updated packages.` in every changes block where deps moved.
- ✅ Inline-coded version numbers (`` `41.3.0` ``).
- ⚠️ `v4.0.0` heading uses backticks-then-colon — kept for legacy parity. New milestone headings should be `` ## Changes in `v4.0.0:` ``.

<!-- bcls:ignore-end -->
