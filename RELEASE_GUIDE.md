# ZeroTeX Release Guide

This guide describes the verified release process as of v1.0.0. Releases are published from `main` only after the full local and remote quality gates pass.

## Prerequisites

- Node.js 22 or newer
- pnpm version declared in `package.json`
- Authenticated GitHub CLI for maintainers publishing a release
- A clean worktree based on the latest `origin/main`

## Prepare a release

1. Choose the semantic version and update `package.json`.
2. Update `CHANGELOG.md` with the release date, shipped changes, security notes, and known limitations.
3. Update the current release and next target in `README.md` and `ROADMAP.md`.
4. Install and validate from the lockfile:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm audit --prod
```

An unresolved audit item must be documented with its dependency path, practical exposure, and upgrade constraint. Do not force a breaking override merely to make the count zero.

## Publish through a pull request

1. Commit the version and documentation changes on a `codex/` or other feature branch.
2. Push the branch and open a pull request targeting `main`.
3. Wait for GitHub Lint, Build & Test, and Vercel preview checks.
4. Exercise `/` and `/builder` on desktop and mobile. Check the browser console and the export/import flows affected by the release.
5. Merge only the exact green head commit.
6. Confirm the post-merge CI run and Vercel Production deployment reference the new `main` commit.
7. Verify [zerotex.vercel.app](https://zerotex.vercel.app/) directly; a successful deployment record alone does not prove that the public alias works.

## Tag and GitHub release

After production verification:

```sh
git switch main
git pull --ff-only origin main
git tag -a vX.Y.Z -m "ZeroTeX vX.Y.Z"
git push origin vX.Y.Z
gh release create vX.Y.Z --verify-tag --title "ZeroTeX vX.Y.Z" --notes-file CHANGELOG.md
```

Maintainers may use signed tags when a signing key is already configured. Never generate, export, or store private signing keys inside this repository.

## Rollback

- Preserve the failed release and logs for diagnosis.
- Revert the faulty commit through a reviewed pull request rather than rewriting `main` history.
- Verify CI and the replacement production deployment using the same gates above.
- Record the rollback and follow-up fix in `CHANGELOG.md`.
