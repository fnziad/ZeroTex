# ZeroTeX Asset Notes

This directory documents project-owned design and template assets.

- **Project:** ZeroTeX v1.0.0
- **Repository:** https://github.com/fnziad/ZeroTex
- **Maintainer:** Fahad Nadim Ziad
- **License:** See the repository `LICENSE`

## Current assets

The primary LaTeX layout is implemented in `lib/latex-generator.ts`. The web interface uses self-hosted Geist files from the `geist` package, Lucide icons, Radix UI primitives, and Tailwind CSS. Third-party dependency versions and licenses are represented by `package.json` and `pnpm-lock.yaml`.

Static images used by the application belong in `public/`. Record the creator, source, license, and intended use when adding externally sourced images or fonts. Do not add an asset when its redistribution terms are unknown.

## Verification

No asset hash manifest is generated automatically in v1.0.0. If release artifacts later require integrity checks, generate and publish their checksums as part of the release process and document that behavior in `RELEASE_GUIDE.md`.

Last updated: 19 July 2026.
