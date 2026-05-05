<!-- bcls:partial -->

# EXAMPLE — Minor release: IYERIS `v2.1.0`

**Source:** <https://github.com/BurntToasters/IYERIS/releases/tag/v2.1.0>
**Type:** Minor (feature release)
**Stack:** Tauri V2.

A typical feature-bearing minor release: a banner-free intro, several `NEW -` bullets, sub-bullets for nested explanation, and a `PKG` closer.

---

## Annotated breakdown

```markdown
# ⬇️ Downloads
// → §3 Downloads block.

| Windows | macOS | Linux |
| --- | --- | --- |
| EXE: x64 / arm64 | Universal DMG | AppImage: x64 |
|   | Universal ZIP | DEB: x64 |
| See MSI note below |   | RPM: x64 |
|   |   | Flatpak: x64 |

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures...
> The `.asc` files are my normal GPG signatures...
// → §4: full Tauri V2 signing block (sig + asc paragraphs).

### ℹ️ Enjoying IYERIS? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
// → §2 step 3.

### Please checkout the readme for more info on IYERIS!
// → §2 step 4 optional one-liner intro.

## Changes in `v2.1.0:`
// → §5.1.

- **Thumbnails:** Added more thumbnail file support and fixed some issues where certain video
  files wouldn't preview.
- **... More actions button:** Fixed an issue where the more actions button was rendering
  its content out of view.
// → §5.3: category names can be UI-element labels including ellipses.
- **Licenses:** Added cargo licenses to the license credits in `Settings` > `About`.
// → §11: backticked menu path.
- **Testing:** Added a lot more back-end headless testing for IYERIS.
- **Updater:** Added new information for beta users if they check for updates and the updater
  does not find the JSON Manifest for betas.
  - This is usually because when I release a new STABLE version of IYERIS, I will
    then release an accompanying beta for IYERIS so that the beta JSONS sync up with
    the repos `/releases/latest`.
// → §5.3: sub-bullet (two-space indent in markdown source) for explanatory detail.
  - **Typescript:** Updated to Typescript V6.
// → Notice: nested category-style sub-bullet when the parent topic groups it.
- **PKG:** Updated Packages.
// → §5.5: classic closer.

## Click below for the full `v2` Changelog
// → §2 step 7 optional Full-changelog link.

[FULL V2 CHANGELOG](<URL>)

### MSI Installer Support (MSI builds are NOT provided for betas)
// → §8.1: enterprise note. Stable release → MSI included.

> [!IMPORTANT]
> **Enterprise Users:** We now support Windows X64/ARM64 `.MSI` installers for MDM/AD deployment.
> ...

## ℹ️ Release Info
// → §9: footer.

- **GPG Signed:** ...
- **GPG Key:** ...
- **Code Signing:** ...
- **Legacy Binaries:** ...
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- ✅ Tauri V2 sig + GPG paragraphs both present in the Important callout.
- ✅ Bullets show variety: simple categories, sub-bullets, inline-code menu paths, nested category-style sub-bullet (`Typescript`).
- ✅ MSI note included (stable release).
- ✅ `PKG` closer present.
- ✅ Full changelog link offered as the "Did you mean to read more?" exit.
- ⚠️ The minor itself is a milestone — no carry-forward of patch chain from the previous minor. (`v2.1.x` patches will carry back here.)

<!-- bcls:ignore-end -->
