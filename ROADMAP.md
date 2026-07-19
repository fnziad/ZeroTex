# ZeroTeX Upgrade Roadmap

**Roadmap baseline:** v1.0.0 · 19 July 2026

**Next planned release:** v1.1 — Editing Confidence

**Status:** Planning; implementation intentionally deferred

ZeroTeX should become the fastest privacy-friendly path from structured career data to a polished, ATS-safe resume and clean LaTeX source. Data durability and editing reliability come before templates, analysis, accounts, or AI.

## Shipped baseline: v1.0.0

- Modern responsive landing page and builder with light and dark themes.
- Versioned `zerotex-resume` document schema and legacy-data migration.
- Guarded local autosave with invalid-data recovery preservation.
- Size-limited, schema-validated JSON backup and restore.
- Live preview, browser PDF/print flow, LaTeX download, and Overleaf handoff.
- Dynamic resume sections and deterministic LaTeX generation.
- Reproducible pnpm installs and CI gates for lint, types, tests, and builds.
- Dependency, security, dead-code, performance, and maintainability hardening.

Current limitations are documented in [CHANGELOG.md](./CHANGELOG.md).

## Release plan

| Release | Theme | Planned user-facing work | Foundation and acceptance criteria |
| --- | --- | --- | --- |
| **v1.1** | Editing Confidence | Undo/redo, keyboard shortcuts, visible save status, safer reset/restore flows | Tested reducer; bounded history; quota and storage failures are visible; autosave and refresh recovery pass browser tests |
| **v1.2** | Resume Library | Create, rename, duplicate, search, switch, archive, and delete multiple local resumes | Stable resume IDs and metadata; safe migration from the single-resume store; confirmed destructive actions |
| **v1.3** | Templates and Layout | Three ATS-safe templates, typography and spacing controls, page-overflow warnings | Typed template contract; deterministic LaTeX/PDF fixtures; A4 and US Letter coverage |
| **v1.4** | Explainable ATS Review | Weak-bullet, missing-section, length, parsing-risk, and content-quality guidance | Deterministic rules; explanations for every finding; no opaque score-only result |
| **v1.5** | Job Tailoring | Compare a resume with pasted job text and suggest focused changes | Keywords and suggestions trace back to supplied text; original resume is never overwritten automatically |
| **v2.0** | Optional Continuity | Accounts, encrypted cloud sync, version history, named snapshots, and private review links | Offline-first conflicts; authorization tests; revocable links; export and deletion controls |

## v1.1 implementation plan

1. Replace remaining loosely typed section payloads with a discriminated `ResumeSection` union.
2. Move builder mutations into a tested reducer with explicit actions.
3. Add bounded undo/redo history and `Cmd/Ctrl+Z` shortcuts without recording hydration or autosave events.
4. Surface `Saving`, `Saved locally`, and `Save failed` states with accessible status announcements.
5. Handle storage quota, disabled storage, corrupt documents, and failed restores without losing the current draft.
6. Add browser tests for autosave, refresh recovery, legacy migration, import/export, reset, undo, and redo.
7. Lazy-load editor-only PDF code and add route-level bundle budgets.
8. Add a restrictive Content Security Policy after verifying analytics and Overleaf flows.

### v1.1 completion gate

- Lint, TypeScript, unit tests, browser tests, and production build pass from a clean checkout.
- Keyboard and screen-reader save feedback work on desktop and mobile layouts.
- Undo history is bounded and cannot cross resume import/reset boundaries unexpectedly.
- Storage and migration failure fixtures demonstrate that recoverable user data is preserved.
- Public production smoke checks pass with no browser-console errors.

## Later feature ideas

- GitHub and user-approved profile imports.
- One-click Overleaf project creation.
- Cover letters generated from a reusable career profile.
- Application-specific resume variants and an application tracker.
- Side-by-side version comparison and named checkpoints.
- Multilingual resumes and locale-aware dates.
- Optional, privacy-conscious AI rewriting with explicit data-handling controls.
- School and organization template packs.
- Sandboxed, resource-limited server-side LaTeX compilation.

## Ongoing engineering track

### Reliability

- Add fixtures for every supported section and template.
- Test fresh-checkout CI separately from incremental local builds.
- Cover corrupted data, offline operation, storage quotas, and migrations.

### Security and privacy

- Threat-model authentication, sharing, AI, imports, and LaTeX compilation before implementation.
- Keep imports size-limited, schema-validated, and free of executable content.
- Provide clear local-data deletion and future cloud export/deletion controls.

### Performance and observability

- Track Core Web Vitals, route failures, export failures, and migrations without collecting resume content.
- Lazy-load editor-only dependencies and enforce bundle budgets in CI.
- Progressively render unusually large resumes only if real measurements show editor lag.

### Maintainability

- Keep the resume document contract versioned and migration-tested.
- Centralize filename sanitization and browser download helpers.
- Automate dependency and GitHub Actions updates behind the full verification suite.
- Update README, changelog, roadmap, and package version together for every release.
