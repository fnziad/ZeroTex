# ZeroTeX v1.0.0 Improvements Summary

This document is a compact historical summary of the audit and modernization completed for the 19 July 2026 release. [CHANGELOG.md](./CHANGELOG.md) is the authoritative release record, and [ROADMAP.md](./ROADMAP.md) contains future work.

## Product

- Replaced the legacy presentation with a modern, minimal, responsive landing page and builder.
- Improved preview sizing, mobile toolbar behavior, dialog accessibility, and light/dark theming.
- Added guarded local autosave, a versioned resume document, legacy migration, and portable JSON backup/restore.
- Kept PDF/print, LaTeX download, and explicit Overleaf export available from one focused builder.

## Engineering

- Consolidated resume schemas and deterministic export logic.
- Removed unreachable components, duplicate lockfiles, unused dependencies, dead CSS, and animation overhead.
- Upgraded Next.js, React, TypeScript tooling, pnpm, jsPDF, and GitHub Actions runtimes.
- Added migration and LaTeX regression tests and made lint, types, tests, and build mandatory CI gates.

## Security and reliability

- Added import size, shape, depth, unsafe-key, duplicate-ID, and URL validation.
- Prevented initial hydration from overwriting an existing saved resume.
- Preserved malformed saved data in a recovery key before falling back safely.
- Reduced production dependency findings to one low transitive advisory without a published compatible patch at release time.

## Validation

- ESLint and TypeScript passed.
- Vitest passed 8/8 tests.
- Clean frozen installation and production build passed.
- Desktop and mobile browser flows passed with no framework overlay or console errors.
- GitHub CI, Vercel preview, merge-to-main CI, and public production verification passed.
