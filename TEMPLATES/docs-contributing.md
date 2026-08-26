<!-- bcls:kind docs -->
<!-- bcls:partial -->
<!-- bcls:ignore-start -->
<!--
BCLS template — CONTRIBUTING (STANDARD.md §17.3).
Replace every <PLACEHOLDER>. Delete this comment block before publishing.
-->
<!-- bcls:ignore-end -->

# Contributing to <Project>

Thanks for taking a look. Here's how I work in this repo.

## Dev setup

<Imperative steps to run the project locally.>

```bash
<setup commands>
```

## Commit messages

This repo follows BCLS kind `commit` (`v1.x`). Subjects look like:

```
Category: Imperative description.
```

or

```
NEW - Feature: Imperative description.
```

Not Conventional Commits (`feat:`, `fix:`). Categories come from BCLS §5.4. See [STANDARD.md](https://github.com/BurntToasters/bcls/blob/main/STANDARD.md) §16.

## Release notes

This repo uses BCLS kind `<binary|web>` for GitHub release bodies. Pin: BCLS `v1.x`.

- Kind `binary`: installers, Downloads table, signing, Release Info.
- Kind `web`: no binaries — no Downloads / signing / MSI / Release Info.

See [AGENTS.md](https://github.com/BurntToasters/bcls/blob/main/AGENTS.md) if an agent is drafting the body.

## Project notes

<Lint, tests, branch naming, anything specific to this repo.>
