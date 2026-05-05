<!-- bcls:partial -->

# EXAMPLE — Security release: Zinnia `v0.4.0`

**Source:** <https://github.com/BurntToasters/Zinnia/releases/tag/v0.4.0>
**Type:** Security update requiring manual install (key rotation).
**Stack:** Tauri V2.

The blueprint for security/manual-update releases. Note the title subtitle, the in-section banner heading, and the apology + explanation paragraph.

---

## Annotated breakdown

```markdown
// Title (in GitHub release form, not in body):
//   "0.4.0 - SECURITY UPDATE: Manual Update Required"
// → §1, §8.3.

# ⬇️ Downloads
// → §3.

| Windows | macOS | Linux |
| --- | --- | --- |
| EXE: x64 / arm64 | Universal DMG | AppImage: x64 |
|   | Universal ZIP | DEB: x64 |
|   |   | RPM: x64 |
|   |   | Flatpak: x64 |

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures...
// → §4.

### ℹ️ Enjoying Zinnia? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)

Zinnia! A cross platform 7Z gui frontend built on Tauri V2!
// → §2 step 4 optional one-liner intro.

## Changes in `v0.4.0:`
// → §5.1.

### IMPORTANT: THIS IS A SECURITY UPDATE. UPDATE NOW!
// → §5.2 banner subtitle + §8.3 security banner. ALL CAPS for urgency.

- **Security:** Updated Tauri V2 updater signer key.
  - I accidentally leaked the (still encrypted) private key via a `package.json` entry
    on another project. Zinnia sadly shared the same signer key (bad practice;
    lessons learned). Rookie mistake — I am very sorry, I know how annoying this is.
    You will have to manually download and install `v0.9.2` from this release to
    update the pubkey.
// → §10 voice: apologize, be honest, plain-language explanation.
// → §5.3: sub-bullets carry the long-form explanation, parent stays a one-liner.
  - Since the private key that was leaked was still encrypted with a password, it is
    a better state than if it was the full unencrypted privkey.
  - All previous releases and accompanying binaries have been removed from github
    and my mirror. The tags still remain.
- **UNZIP:** Added the new Unarchive UI feature set to all OS's! If you open an archive
  via your OS's context menu with Zinnia, the quick unarchive UI will open instead :)
// → §5.3: smiley allowed in moderation (§10).
- **UNZIP:** Modified the behavior for the custom unarchiver where unarchived items
  now go into a folder of their own in the parent folder.
- **Licenses:** Cargo licenses are now included.
- **NEW - Basic / Advanced mode:** Added two new views for essential items only (Basic)
  and more for power users (Advanced).
  - Basic mode's UI is now a totally different UI from advanced with simple options
    and an easy/friendly UI!
  - Advanced mode's spacing has been compressed for better space efficiency.
- **PKG:** Updated packages.
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- ✅ Title subtitle signals manual-update requirement.
- ✅ Banner heading inside the changes section makes the urgency unmissable.
- ✅ Apologetic, honest paragraph in the `Security` sub-bullets — no spin.
- ✅ Manual-install instructions explicit (`download and install vX.Y.Z from this release`).
- ✅ Other shipped changes (UNZIP, Licenses, NEW - Basic/Advanced) coexist with the security note — they don't get hidden because of the security banner.
- ✅ `PKG` closer present.

<!-- bcls:ignore-end -->
