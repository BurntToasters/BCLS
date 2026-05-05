<!-- bcls:partial -->

# EXAMPLE — Beta release: IYERIS `v2.2.0-beta.1`

**Source:** <https://github.com/BurntToasters/IYERIS/releases/tag/v2.2.0-beta.1>
**Type:** First beta of a new minor (`-beta.1`) — version-bump-only sync release.
**Stack:** Tauri V2.

The reference implementation of the "first beta is just a bump" convention.

---

## Annotated breakdown

```markdown
// Title (in GitHub release form):
//   "2.2.0-beta.1"   (or "2.2.0 Beta 1")
// Marked as Pre-release on GitHub.
// → §1, §7.

> [!NOTE]
> 🅱️ This is a Beta build.
// → §7: required beta marker, top of body.

# ⬇️ Downloads
// → §3.

| Windows | macOS | Linux |
| --- | --- | --- |
| EXE: x64 / arm64 | Universal DMG | AppImage: x64 |
|   | Universal ZIP | DEB: x64 |
|   |   | RPM: x64 |
|   |   | Flatpak: x64 |
// → §7: NO `See MSI note below` cell — betas don't ship MSI.

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures...
// → §4.

### ℹ️ Enjoying IYERIS? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

## Changes in `v2.2.0-beta.1:`
// → §5.1: pre-release suffix follows the version.

Beta 1 releases of IYERIS don't include any changes besides pkg updates, and are
meant to sync beta users to the latest STABLE.
// → §7: required convention for -beta.1 — explain the bump-only nature.

- **Ver:** Bumped version to `v2.2.0`.
// → §5.4 Ver category: version-bump-only line.
- **PKG:** Updated packages.

// Carry-forward back to the previous stable's milestone:
## Changes in `v2.1.0:`
- **Thumbnails:** Added more thumbnail file support...
- ...
- **PKG:** Updated Packages.

## Click below for the full `v2` Changelog
[FULL V2 CHANGELOG](<URL>)

> [!IMPORTANT]
> **Note:** MSI builds are NOT provided for beta releases. Use the EXE installer.
// → §7, §8.1.

## ℹ️ Release Info
// → §9.
- **GPG Signed:** ...
- ...
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- ✅ 🅱️ Beta marker at the very top — first thing the reader sees.
- ✅ Marked as Pre-release on GitHub.
- ✅ Version-bump-only intro paragraph explains why this beta has no real changes.
- ✅ `Ver` category used for the bump line (rather than misclassifying as `Codebase`).
- ✅ MSI explicitly excluded with a note.
- ✅ Carry-forward to previous stable so beta users see the latest stable's changes.
- ⚠️ Subsequent betas (`-beta.2`, `-beta.3 (RC)`) drop the bump-only paragraph and use real change bullets — see [`TEMPLATES/beta.md`](../TEMPLATES/beta.md) for both shapes.

<!-- bcls:ignore-end -->
