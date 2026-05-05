<!-- bcls:partial -->
<!-- bcls:ignore-start -->
<!--
BCLS template — MINOR release (new features, no breaking changes).
Replace every <PLACEHOLDER>. Delete comments before publishing.
GitHub release title: <X.Y.0>   (subtitle optional, e.g. " - Even more features")
Tag: v<X.Y.0>

Note: minor releases are themselves milestones. They do NOT carry-forward the
prior minor's patch chain — link to a "Full <X.(Y-1)> changelog" if useful.
-->

# ⬇️ Downloads

<!--
Replace placeholders:
  <ORG>          GitHub user/org (e.g. BurntToasters)
  <APP>          GitHub repo name + asset filename prefix (e.g. IYERIS)
  <TAG>          Release tag including the leading v (e.g. v<X.Y.0>)
  <MS_STORE_ID>  Microsoft Store listing id; remove the badge cell if not on the Store
Drop unsupported cells/rows. Comment out arch links you haven't built yet.
See STANDARD.md §3 for the canonical pattern.
-->

| <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/windows.png" /> Windows | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/mac.png" /> macOS | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/linux.png" /> Linux |
| :--- | :--- | :--- |
| **EXE:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-x64.exe) / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-arm64.exe) | **[Universal DMG](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.dmg)** | **AppImage:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.AppImage) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.AppImage) --> |
| <div align="center"><a href="https://apps.microsoft.com/detail/<MS_STORE_ID>?referrer=appbadge&mode=full"><img src="https://get.microsoft.com/images/en-us%20light.svg" width="150"/></a></div> | **[Universal ZIP](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.zip)** | **DEB:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-amd64.deb) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.deb) --> |
| *See MSI note below* | | **RPM:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.rpm) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.rpm) --> |
| | | **Flatpak:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.flatpak) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.flatpak) --> |

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures — they are for Tauri V2's
> updater to verify the integrity of updates before downloading and installing.
>
> The `.asc` files are my normal GPG signatures which you can verify using my GPG Public
> Key: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc

### ℹ️ Enjoying <APP>? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

## Changes in `v<X.Y.0>:`

### <Optional banner subtitle for thematic minors, e.g. "v0.6.0 is a large feature packed update :)">

- **NEW - <Feature Name>:** <What it does, in one or two sentences.>
  - <Optional sub-bullet with extra detail.>
- **NEW - <Feature Name>:** <Description.>
- **<Category>:** <Description.>
- **<Category>:** <Description.>
- **Testing:** <Test additions.>
- **PKG:** Updated packages.

<!-- Optional link to a longer changelog -->

[Full changelog](<URL>)

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
