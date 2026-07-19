# ZeroTeX Upgrade Roadmap

ZeroTeX should become the fastest privacy-friendly path from structured career data to a polished, ATS-safe resume and clean LaTeX source. The roadmap prioritizes data durability first, then editing quality, job-specific guidance, and optional cloud capabilities.

## Delivery principles

- Keep core resume creation usable without an account.
- Treat the versioned resume document as the source of truth across browser storage, files, and future cloud sync.
- Keep PDF and LaTeX output deterministic and covered by fixture tests.
- Make AI-assisted features optional, explainable, and explicit about data handling.
- Ship each phase with accessibility, mobile, security, performance, and migration checks.

## Prioritized feature track

| Phase | Upgrade | User value | Effort | Depends on | Completion signal |
| --- | --- | --- | --- | --- | --- |
| 1 — In progress | Versioned resume documents, safe autosave, JSON backup/restore | Prevents data loss and makes resumes portable | Medium | — | Legacy data migrates; malformed imports fail safely; round-trip tests pass |
| 1 | Undo/redo and visible save status | Makes editing forgiving and trustworthy | Medium | Versioned documents | Keyboard shortcuts work; history is bounded; save failures are visible |
| 1 | Multiple local resumes | Lets users maintain role-specific versions without accounts | Medium | Versioned documents | Create, rename, duplicate, switch, and delete with confirmation |
| 2 | Template system with typography and spacing controls | Produces visibly distinct professional resumes | High | Stable document model | At least three ATS-safe templates; deterministic PDF/LaTeX snapshots |
| 2 | ATS and content quality analyzer | Finds missing keywords, vague bullets, length issues, and parsing risks | High | Stable section schemas | Actionable scoring rubric with explanations and no opaque score-only output |
| 2 | Job-description tailoring workspace | Compares a resume with a target role and suggests focused changes | High | Analyzer | Keyword coverage and suggestions are traceable to supplied job text |
| 2 | First-class mobile editor and accessibility pass | Makes the full workflow usable beyond desktop | Medium | Editor component cleanup | WCAG 2.2 AA checks, keyboard flow, and responsive preview controls pass |
| 3 | Optional accounts and encrypted cloud sync | Enables cross-device continuity | High | Versioned documents, authentication, database | Offline-first conflict handling and export/delete controls are verified |
| 3 | Version history and named snapshots | Lets users safely experiment and restore earlier drafts | Medium | Cloud or local resume library | Diff, label, restore, and retention behavior are tested |
| 3 | Private share links and reviewer comments | Supports feedback without sending editable source files | High | Accounts and authorization | Revocable links, expiration, access logs, and comment permissions work |
| 4 | Sandboxed LaTeX compilation service | Produces server-grade PDFs without requiring local TeX | High | Queue, sandbox, storage, abuse controls | Compilation is isolated, resource-limited, cached, and observable |
| 4 | Template marketplace and organization themes | Expands design choice and supports schools/teams | High | Template system, moderation | Signed template packages and safe rendering validation are enforced |

## Engineering and operations track

### Reliability and testing

- Add browser-level tests for autosave, migration, import/export, editing, print flow, and downloads.
- Add fixture-based regression tests for every supported section type and template.
- Test fresh-checkout CI separately from incremental local builds.
- Add explicit storage quota, corrupted document, offline, and migration failure scenarios.

### Security and privacy

- Add a restrictive Content Security Policy after auditing the Overleaf submission and analytics paths.
- Keep imported documents size-limited, schema-validated, and free of executable content.
- Threat-model any future authentication, sharing, AI, and LaTeX compilation features before implementation.
- Provide clear local-data deletion and cloud account export/deletion controls.

### Performance and observability

- Lazy-load PDF generation and editor-only dependencies to reduce initial JavaScript.
- Track Core Web Vitals, route errors, PDF failures, and migration failures without collecting resume content.
- Add bundle budgets and route-level bundle analysis to CI.
- Virtualize or progressively render large section collections if real documents show editor lag.

### Maintainability

- Replace remaining `any` section payloads with a discriminated `ResumeSection` union.
- Extract the builder state transitions into a tested reducer before adding undo/redo.
- Centralize file download and filename sanitization helpers.
- Keep dependency and GitHub Actions updates automated, grouped, and gated by the full verification suite.

## Recommended next implementation order

1. Finish Phase 1 document portability and autosave hardening.
2. Add a reducer-based editor history with undo/redo and save status.
3. Build the multiple-resume local library on the same document schema.
4. Introduce a typed template contract and ship two additional ATS-safe templates.
5. Add deterministic analyzer rules before introducing optional AI suggestions.
