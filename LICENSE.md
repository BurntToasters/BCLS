# BCLS — License

This repository is **dual-licensed** because it contains two different kinds of work:

| Subject matter | License | File |
| --- | --- | --- |
| **Specification, prose, templates, examples, agent docs** — i.e. everything in [`STANDARD.md`](STANDARD.md), [`AGENTS.md`](AGENTS.md), [`README.md`](README.md), [`CHANGELOG.md`](CHANGELOG.md), [`TEMPLATES/`](TEMPLATES/), [`EXAMPLES/`](EXAMPLES/), and [`media/`](media/) | **CC0 1.0 Universal** (public domain dedication) | [`LICENSE-CC0`](LICENSE-CC0) |
| **Source code** — i.e. everything in [`scripts/`](scripts/) and [`site/`](site/) (excluding any third-party files those directories contain, which keep their own licenses) | **Mozilla Public License 2.0** | [`LICENSE-MPL-2.0`](LICENSE-MPL-2.0) |

## Why split it

- The **standard itself** (rules, templates, examples) is meant to be copied, adapted, and reused without attribution friction. CC0 makes that explicit.
- The **tooling** (the linter, the Astro/Starlight site, the React release-note builder) is real software that benefits from MPL-2.0's file-level copyleft and patent grant — modifications to MPL-licensed files must be shared back, while letting the code be combined with permissive or proprietary code at the project level.

## SPDX identifiers

For machine-readable consumers, the SPDX expression for this repository is:

```
SPDX-License-Identifier: CC0-1.0 AND MPL-2.0
```

Per-file SPDX headers SHOULD be used in source files to disambiguate which license applies to which file. New code files in `scripts/` and `site/` SHOULD include:

```
// SPDX-License-Identifier: MPL-2.0
```

Markdown content files do not need an SPDX header — they default to CC0 by virtue of their location in this repo.

## Contributions

By contributing to this repository, you agree that your contributions will be licensed under the license that already governs the file(s) you are modifying — CC0 for prose/spec content, MPL-2.0 for source code.
