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
