# ZeroTeX

[![Release](https://img.shields.io/badge/release-v1.0.0-2563eb)](./CHANGELOG.md)
[![CI](https://github.com/fnziad/ZeroTex/actions/workflows/ci.yml/badge.svg)](https://github.com/fnziad/ZeroTex/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

ZeroTeX is a local-first resume builder that turns structured career details into an ATS-friendly resume, printable PDF, and editable LaTeX source. No account or LaTeX knowledge is required.

**Current release:** v1.0.0 · 19 July 2026

**Live application:** [zerotex.vercel.app](https://zerotex.vercel.app/)

**License:** Source-available; all rights reserved. See [LICENSE](./LICENSE).

## Current features

- Guided editing for personal details, education, experience, research, projects, publications, skills, awards, certifications, interests, and custom sections.
- Reorderable, hideable, and removable resume sections with a responsive live preview.
- Local-first autosave using a versioned resume document format.
- Size-limited and schema-validated JSON backup and restore, including migration from legacy local data.
- Browser print/PDF flow, `.tex` download, and an explicit Overleaf handoff.
- Responsive light and dark interfaces with self-hosted Geist typography.
- Deterministic LaTeX generation covered by unit tests.

Resume content remains in the browser during normal editing. Data leaves the browser only when the user deliberately invokes an external flow such as opening generated LaTeX in Overleaf. Vercel Analytics is enabled for aggregate application usage and does not intentionally receive resume content.

## Development

### Requirements

- Node.js 22 or newer
- pnpm 11.11.0, as declared by `packageManager`

### Run locally

```sh
git clone https://github.com/fnziad/ZeroTex.git
cd ZeroTex
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Quality checks

```sh
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
```

Run the complete local gate with `pnpm run check`. GitHub Actions repeats linting, type checks, tests, and the production build for pull requests and protected branches.

## Project structure

```text
app/                 Next.js routes, layouts, and the resume builder
components/resume/   Editor forms, section management, preview, and export UI
components/ui/       Shared interface primitives
lib/                 Resume schema, document migration, LaTeX, and PDF logic
public/              Static assets
```

The versioned document contract in `lib/resume-document.ts` is the source of truth for browser persistence and portable backups. Product versioning is tracked in `package.json`; document schema versions evolve independently so older resume files can be migrated safely.

## Release and roadmap

- [Changelog](./CHANGELOG.md) — shipped behavior and known limitations
- [Upgrade roadmap](./ROADMAP.md) — prioritized v1.1–v2.0 feature plan
- [Release guide](./RELEASE_GUIDE.md) — release verification and publishing process

The next planned release is v1.1, focused on reducer-based editor state, undo/redo, visible save status, storage-failure handling, and browser-level regression tests.

## Author and citation

Created by [Fahad Nadim Ziad](https://github.com/fnziad).

```text
Fahad Nadim Ziad. ZeroTeX: Local-first LaTeX Resume Builder.
https://github.com/fnziad/ZeroTex
```

Copyright © 2025–2026 Fahad Nadim Ziad. All rights reserved.
