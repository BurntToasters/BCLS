# BCLS Site

Astro + Starlight documentation site for BCLS.

Root markdown files remain canonical. `npm run sync-content` copies the current standard, agent checklist, changelog, templates, and examples into ignored generated docs pages before development and production builds.

## Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run sync-content`

## Cloudflare Pages

- Build command: `cd site && npm ci && npm run build`
- Build output directory: `site/dist`

The site is fully static and does not use the Astro Cloudflare adapter.
