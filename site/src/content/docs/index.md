---
title: BCLS
description: BurntToasters Changelog Standard for release notes, commits, and docs.
---

BCLS is the writing standard I use across BurntToasters apps and sites (`v1.1.0`). It keeps release bodies, commit subjects, and docs consistent, easy to scan, and easy for an AI agent to draft without wandering away from the house style.

## Quick Start

1. Pick the **kind**: `binary` (installers), `web` (no binaries), `commit`, or `docs`.
2. Pick the closest template for that kind (and release type, if any).
3. Fill in name, version, and changes. For `binary`, also fill stack and downloads.
4. Check the carry-forward chain (releases only).
5. Run the draft through the linter (`--kind=` or a `bcls:kind` pragma) or the website builder.
6. Publish.

## What BCLS Locks Down

- Four kinds: `binary`, `web`, `commit`, `docs` (default `binary`).
- Kind `binary` section order: downloads, signing, support, changes, carry-forward, release-info.
- Kind `web`: no downloads / signing / MSI / release-info; same `## Changes in` rules.
- Kind `commit`: `Category: Description.` subjects, not Conventional Commits.
- Kind `docs`: README / CONTRIBUTING / docs-page structure and voice.
- The exact `` ## Changes in `vX.Y.Z:` `` heading shape.
- The canonical category vocabulary (including `Docs`) and bullet format.
- Stack-specific callouts for Tauri V2, Electron, Flutter, Microsoft Store, and web / docs-site.
- The early-major hero persistence rule and security/manual-update language.

## Handy Links

- [Read the full standard](/generated/standard/)
- [Use the release builder](/builder/)
- [Browse templates](/generated/templates/)
- [Review examples](/generated/examples/)
- [Agent checklist](/generated/agents/)
