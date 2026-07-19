# Changelog

All notable ZeroTeX changes are recorded here. Releases follow semantic versioning for the application; portable resume documents use a separate schema version.

## [Unreleased]

Planned work is tracked in [ROADMAP.md](./ROADMAP.md). The next target is v1.1 — Editing Confidence.

## [1.0.0] — 2026-07-19

### Added

- Local-first resume builder with responsive live preview.
- Guided forms and dynamic ordering, visibility, creation, and removal of resume sections.
- Browser print/PDF export, LaTeX download, and explicit Overleaf handoff.
- Versioned `zerotex-resume` document format with guarded legacy migration.
- Validated JSON backup and restore with input-size, nesting, collection, duplicate-ID, and unsafe-key limits.
- Local autosave that waits for initial hydration and preserves invalid stored data for recovery.
- Light and dark themes with a modern, responsive Geist-based interface.
- Unit coverage for document migration and deterministic LaTeX generation.

### Changed

- Standardized dependency management on pnpm with a frozen lockfile.
- Upgraded the application to Next.js 16, React 19, and Node.js 22 CI.
- Consolidated resume types and export paths and removed unreachable legacy components.
- Strengthened CI to require lint, TypeScript, unit tests, and a production build.
- Hardened imported URLs and resume documents before rendering or persistence.

### Security and maintenance

- Patched critical and compatible transitive dependency advisories found during the repository audit.
- Reduced the production audit to one low transitive Babel advisory whose referenced compatible patch was not published at release time.
- Removed duplicate lockfiles, obsolete dependencies, dead CSS, and animation overhead.

### Known limitations

- One local resume is stored at a time.
- Undo/redo and explicit save-state feedback are not yet available.
- One primary resume layout is currently supported.
- The default PDF path uses the browser print dialog; server-grade LaTeX compilation is not included.
- Cloud sync, accounts, reviewer links, ATS analysis, and AI assistance are not part of v1.0.0.
