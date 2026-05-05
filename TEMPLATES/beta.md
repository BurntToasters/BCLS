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

<!--
Replace placeholders:
  <ORG>          GitHub user/org (e.g. BurntToasters)
  <APP>          GitHub repo name + asset filename prefix (e.g. IYERIS)
  <TAG>          Release tag including the leading v (e.g. v<X.Y.Z>-beta.<N>)
  <MS_STORE_ID>  Microsoft Store listing id; remove the badge cell if not on the Store
Betas do NOT ship MSI builds — the third Windows row is omitted (§7).
See STANDARD.md §3 for the canonical pattern.
-->

| <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/windows.png" /> Windows | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/mac.png" /> macOS | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/linux.png" /> Linux |
| :--- | :--- | :--- |
| **EXE:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-x64.exe) / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-arm64.exe) | **[Universal DMG](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.dmg)** | **AppImage:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.AppImage) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.AppImage) --> |
| <div align="center"><a href="https://apps.microsoft.com/detail/<MS_STORE_ID>?referrer=appbadge&mode=full"><img src="https://get.microsoft.com/images/en-us%20light.svg" width="150"/></a></div> | **[Universal ZIP](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.zip)** | **DEB:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-amd64.deb) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.deb) --> |
| | | **RPM:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.rpm) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.rpm) --> |
| | | **Flatpak:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.flatpak) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.flatpak) --> |

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
