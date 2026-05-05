<!-- bcls:partial -->
<!-- bcls:ignore-start -->
<!--
BCLS template — BETA / pre-release.
Replace every <PLACEHOLDER>. Delete comments before publishing.
GitHub release title:
  - First beta: "<X.Y.Z> Beta 1"
  - Subsequent: "<X.Y.Z> Beta 2", "<X.Y.Z> Beta 3 (RC)", "<X.Y.Z> Beta 3 (RC2)"
Tag: v<X.Y.Z>-beta.<N>
Mark as "Pre-release" on GitHub.
-->

> [!NOTE]
> 🅱️ This is a Beta build.

# ⬇️ Downloads

| Windows | macOS | Linux |
| --- | --- | --- |
| EXE: x64 / arm64 | Universal DMG | AppImage: x64 |
|   | Universal ZIP | DEB: x64 |
|   |   | RPM: x64 |
|   |   | Flatpak: x64 |

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures — they are for Tauri V2's
> updater to verify the integrity of updates before downloading and installing.
>
> The `.asc` files are my normal GPG signatures which you can verify using my GPG Public
> Key: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc

### ℹ️ Enjoying <APP>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

<!--
For -beta.1 releases, use the version-bump-only intro:
-->

## Changes in `v<X.Y.Z>-beta.1:`

The first beta is always just a version bump to bump users to the latest stable
before beta development.

- **Ver:** Updated version to `v<X.Y.Z>-beta.1`.
- **PKG:** Updated packages.

<!--
For later betas (-beta.2, -beta.3 (RC), etc.), use real change bullets:
-->

## Changes in `v<X.Y.Z>-beta.<N>:`

- **<Category>:** <Description.>
- **PKG:** Updated packages.

<!-- Carry-forward prior beta + last stable Changes-in sections, newest first. -->

> [!IMPORTANT]
> **Note:** MSI builds are NOT provided for beta releases. Use the EXE installer.

## ℹ️ Release Info

- **GPG Signed:** My public key is attached to every release to ensure authenticity.
- **GPG Key:** You can get my public GPG key here: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc
- **Code Signing:** macOS releases are fully signed. Windows releases are not signed by an org, but
  are signed by my GPG signature (same with Linux).
<!-- bcls:ignore-end -->
