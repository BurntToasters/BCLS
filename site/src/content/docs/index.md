---
title: BCLS
description: BurntToasters Changelog Standard for consistent GitHub release notes.
---

BCLS is the release-note standard I use across BurntToasters apps. It keeps every release body consistent, easy to scan, and easy for an AI agent to draft without wandering away from the house style.

## Quick Start

1. Pick the closest template for the release type.
2. Fill in app name, stack, version, release type, downloads, and changes.
3. Check the carry-forward chain.
4. Run the release body through the linter or the website builder checks.
5. Publish on GitHub.

## What BCLS Locks Down

- The required downloads, signing, support, changes, carry-forward, and release-info section order.
- The exact `## Changes in \`vX.Y.Z:\`` heading shape.
- The canonical category vocabulary and bullet format.
- Stack-specific callouts for Tauri V2, Electron, Flutter, and Microsoft Store releases.
- The early-major hero persistence rule and security/manual-update language.

## Handy Links

- [Read the full standard](/generated/standard/)
- [Use the release builder](/builder/)
- [Browse templates](/generated/templates/)
- [Review examples](/generated/examples/)
- [Agent checklist](/generated/agents/)
