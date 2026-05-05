<!-- bcls:partial -->
<!-- bcls:ignore-start -->
<!--
BCLS template — MAJOR release (vN.0.0).
Replace every <PLACEHOLDER>. Delete comments before publishing.
GitHub release title: <N.0.0 - <Hook subtitle>>   e.g. "4.0.0 - The Biggest Update Yet!"
Tag: v<N.0.0>

Major releases add a hero block (Welcome / Why now / Size diff / Breaking changes).
Hero persistence (§8.2.1): copy the hero block UNCHANGED into every vN.0.x patch body until vN.1.0 ships.
-->

# ⬇️ Downloads

| Windows | macOS | Linux |
| --- | --- | --- |
| EXE: x64 / arm64 | Universal DMG | AppImage: x64 |
|   | Universal ZIP | DEB: x64 |
| See MSI note below |   | RPM: x64 |
|   |   | Flatpak: x64 |

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures — they are for Tauri V2's
> updater to verify the integrity of updates before downloading and installing.
>
> The `.asc` files are my normal GPG signatures which you can verify using my GPG Public
> Key: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc

### ℹ️ Enjoying <APP>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

# Welcome to <APP> v<N>!!!

<Optional one-line hook, e.g. "<N>.0... Already?! I hear you say. Yes, here we are.">

## Why are we already on <N>.0?

<Story / motivation. What pushed the version. Lessons learned along the way.
Mention sister projects that informed the work, if any.>

## App Size Difference

<Optional comparison block. Numbers + a percentage delta:>

<Old framework> exe x64: <X> MB vs <Y> MB with <New framework>.

- Yes you read that right, a staggering <Z>% decrease in file size not just for windows, but to ALL operating systems as well!

## Breaking Changes

<What users must do (uninstall old version, re-import data, etc.).
Be specific and apologetic if migration is painful.>

## <Platform-specific caveats>

<e.g., "Linux arm64:" missing-arch explanation, or "Windows: WebView2 requirement", etc.>

## Changes in `v<N.0.0>:`

### Welcome to <APP> v<N>!

<Optional intro paragraph.>

- **NEW - <Feature>:** <Description.>
  - <Optional sub-bullet.>
- **NEW - <Feature>:** <Description.>
- **<Category>:** <Description.>
- **Misc:** <Catch-all summary line for everything else.>
- **PKG:** Updated packages.

### FULL CHANGELOG:

[Click here to see the full change-log for v<N>!](<URL>)

### MSI Installer Support (MSI builds are NOT provided for betas)

> [!IMPORTANT]
> **Enterprise Users:** We support Windows X64/ARM64 `.MSI` installers for MDM/AD deployment.
>
> - `.MSI` installers do NOT support auto-updates. You must deploy the new MSI manually.
> - These are strictly for enterprise management; standard users should use the EXE above.
> - Files available in the "Assets" dropdown below.

## ℹ️ Release Info

- **GPG Signed:** My public key is attached to every release to ensure authenticity.
- **GPG Key:** You can get my public GPG key here: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc
- **Code Signing:** macOS releases are fully signed. Windows releases are not signed by an org, but
  are signed by my GPG signature (same with Linux).
- **Legacy Binaries:** Separate x64/arm64 Windows binaries are deprecated in favor of the Universal
  installer. They are still listed in the downloads section, but the universal installer is recommended
  for simplicity.
<!-- bcls:ignore-end -->
