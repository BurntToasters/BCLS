<!-- bcls:partial -->

# EXAMPLE — Major release: IYERIS `v2.0.8` (representing the v2.0 line)

**Source:** <https://github.com/BurntToasters/IYERIS/releases/tag/v2.0.8>
**Type:** Major-line patch carrying the full v2.0 hero block.
**Stack:** Tauri V2 (migrated from Electron in v2.0).

The v2.0 line of IYERIS reuses a hero block on every release — the framework migration was a big deal. This example shows the **major-release shape**: hero, "why now", size diff, breaking changes, platform caveats.

---

## Annotated breakdown

```markdown
# ⬇️ Downloads
// → §3.

| Windows | macOS | Linux |
| --- | --- | --- |
| EXE: x64 / arm64 | Universal DMG | AppImage: x64 |
|   | Universal ZIP | DEB: x64 |
| See MSI note below |   | RPM: x64 |
|   |   | Flatpak: x64 |

> [!IMPORTANT]
> The `.sig` files in this repo are NOT normal gpg signatures...
// → §4.

### ℹ️ Enjoying IYERIS? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
// → §2 step 3.

# Welcome to IYERIS 2.0!!!
// → §8.2: hero. Triple-`!!!` is house style for major releases.

2.0... Already?! I hear you say. Yes, here we are.
// → §8.2: optional hook.

## Why are we already on 2.0 when 1.0 was released just a few weeks ago?!
// → §8.2: story / motivation section.

I'm glad you asked! I started working on fun cross-platform apps with electronjs
because it was the easiest way to integrate everything together...
// → §10 voice: first-person, casual, conversational.

## App Size Difference
// → §8.2: comparison block.

The difference is noticeable even without a direct comparison, but I'm still
going to show a comparison :P

Windows exe x64: 116 MB (Electron) vs 7.88 MB with Tauri V2.

- Yes you read that right, a staggering 91% decrease in file size not just for windows,
  but to ALL operating systems as well!

## Breaking Changes
// → §8.2: required for majors with migration pain.

IYERIS v1 is EOL and you cant update in the app from V1 to V2...
You SHOULD uninstall the old IYERIS V1 before installing and using IYERIS V2...

## Linux arm64:
// → §8.2: platform-specific caveat.

One thing I wanted to make work for the initial V2 release isn't possible right
now for me. Rust requires x64 and arm64 c compilers and packages...

### Please checkout the readme for more info on IYERIS!
// → §2 step 4 optional intro line.

## Changes in `v2.0.8:`
// → §5.1.

- **Windows:** Fixed multiple issues with WebView2.
- **PKG:** Updated packages.
- **MacOS:** Added a warning under the start on login option in settings and a current issue
  with Tauri V2 may prevent IYERIS from opening minimized on login.

## Click below for the full `v2` Changelog
// → §2 step 7.

[FULL V2 CHANGELOG](<URL>)
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- ✅ Hero (`# Welcome to IYERIS 2.0!!!`) sits between the support link and the changes section.
- ✅ Story sections (`Why now?`, `App Size Difference`, `Breaking Changes`, `Linux arm64`) tell users why this version is special.
- ✅ Voice is conversational and apologetic where warranted (Linux arm64 caveat, EOL of v1).
- ✅ Carry-forward is replaced by a "Full v2 changelog" link — appropriate for a long-running major line.
- ⚠️ For a true `v2.0.0` you'd put the `Welcome to IYERIS 2.0!` block inside the `Changes in` section as a banner subtitle (per §5.2). On subsequent v2.0.x patches the hero hoists out above the changes — both shapes are acceptable in the v2 line.

<!-- bcls:ignore-end -->
