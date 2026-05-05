<!-- bcls:partial -->
<!-- bcls:ignore-start -->
<!--
BCLS template — SECURITY / manual-update-required release.
Replace every <PLACEHOLDER>. Delete comments before publishing.
GitHub release title:
  "<X.Y.Z> - SECURITY UPDATE: Manual Update Required"
  or
  "<X.Y.Z> - Manual Update Required"
Tag: v<X.Y.Z>

Be honest. Apologize. Tell users exactly what to do.
-->

# ⬇️ Downloads

<!--
Replace placeholders:
  <ORG>          GitHub user/org (e.g. BurntToasters)
  <APP>          GitHub repo name + asset filename prefix (e.g. IYERIS)
  <TAG>          Release tag including the leading v (e.g. v<X.Y.Z>)
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

## Changes in `v<X.Y.Z>:`

### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!

<Apologetic, honest paragraph: what happened, what was exposed, why a manual
update is required, what users have to do.

Example pattern (key rotation):

  Hi everyone, sorry for the need to download the installer and run it instead of
  using the in-app updater for this release. The reason for this was that I
  accidentally committed an encrypted private key to one of my other Tauri V2
  projects on GitHub. <APP> was NOT directly affected by the exposure of that
  key — <APP>'s updater signatures were never signed by it. As a precautionary
  measure, and per my new protocols after this dumb-on-my-part incident, I have
  also rotated <APP>'s keys, requiring a one-time manual update. I'm sorry for
  this :(
>

- **Security:** <What was changed (key rotation, etc.).>
  - <Sub-bullet with extra context if needed.>
- **<Category>:** <Other changes shipped alongside.>
- **PKG:** Updated packages.

<!--
Carry-forward (§6): include `## Changes in` for the immediately previous patch,
current minor milestone, and current major milestone (skipping any duplicates).
Older patches go behind a `Full vN changelog` link.
-->

## ℹ️ Release Info

- **GPG Signed:** My public key is attached to every release to ensure authenticity.
- **GPG Key:** You can get my public GPG key here: https://tuxedo.rosie.run/GPG/BurntToasters_0xF2FBC20F_public.asc
- **Code Signing:** macOS releases are fully signed. Windows releases are not signed by an org, but
  are signed by my GPG signature (same with Linux).
- **Legacy Binaries:** Separate x64/arm64 Windows binaries are deprecated in favor of the Universal
  installer.
<!-- bcls:ignore-end -->
