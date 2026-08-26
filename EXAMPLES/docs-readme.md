<!-- bcls:kind docs -->
<!-- bcls:partial -->

# EXAMPLE — README skeleton

**Kind:** `docs` (STANDARD.md §17)

READMEs are not changelog bodies. Do not use `- **Category:**` as the primary outline. First person for "what this is"; imperative for procedures. Link releases instead of inlining the patch chain.

---

## Annotated breakdown

```markdown
# S3-Sidekick
// → §17.2 title + one-line what-it-is (the line below).

A small desktop app for browsing S3-compatible buckets.

I built this because I was tired of clicking through a web console to check
one prefix. It's not a full-featured console replacement.
// → §17.1 first-person intro, no marketing fluff.

## Install
// → §17.2 Install / Use (imperative).

Download a build from GitHub Releases and run it.

## Use

Open the app, add a profile, and browse.

## Configuration

Optional. Bucket defaults live in `Settings`.

### ℹ️ Enjoying S3-Sidekick? Consider [❤️ Supporting Me! ❤️](https://rosie.run/support)
// → §17.2 support link (same shape as release notes).

## Contributing

See CONTRIBUTING.md. Commits follow BCLS kind `commit`. Release notes are kind `binary`.
// → §17.2 CONTRIBUTING pointer.

## License

MPL-2.0 AND CC0-1.0 — see LICENSE.md.
```

<!-- bcls:ignore-start -->

## Why this is "good BCLS"

- Topic headings, not `## Changes in`.
- No category-prefixed changelog bullets as the README outline.
- Changelog is not inlined; Install points at Releases.
- Support link + Contributing + License in that order.

<!-- bcls:ignore-end -->
