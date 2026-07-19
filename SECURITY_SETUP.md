# ZeroTeX Security and Privacy Guide

This document records the current v1.0.0 security posture and the checks required for future work. It is operational guidance, not a claim that unlisted controls are already deployed.

## Current trust boundaries

- Resume editing and persistence are local to the browser.
- Imported backup files are untrusted input and must pass document size and schema validation.
- Generated LaTeX leaves the browser only when the user explicitly opens the Overleaf flow.
- Vercel hosts the application and Vercel Analytics records aggregate usage; resume content must never be added to analytics events or logs.
- The repository is source-available under the terms in `LICENSE`.

## Local verification

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm audit --prod
```

Optional local secret scanning may be run with `detect-secrets` when installed. The pre-commit hook treats it as optional; CI and code review must not assume it ran locally.

## Required implementation rules

- Never commit credentials, private keys, environment files, or production resume data.
- Validate imported document size before parsing and validate every field before persistence or rendering.
- Reject unsafe object keys and unsupported URL schemes.
- Do not inject resume content through raw HTML.
- Sanitize filenames and keep downloads user-initiated.
- Do not log resume documents, generated LaTeX, or personally identifying form fields.
- Threat-model authentication, cloud sync, sharing, AI, and server-side LaTeX compilation before implementation.
- Isolate and resource-limit any future LaTeX compiler; never execute imported TeX directly in the web application process.

## Deployment controls

- Merge through a pull request after lint, types, tests, build, and Vercel preview pass.
- Confirm the production deployment SHA matches the merged `main` commit.
- Verify the public production alias, not only the protected unique deployment URL.
- Add a restrictive Content Security Policy after the analytics and Overleaf destinations are fully enumerated.

## Vulnerability reporting

Do not post exploitable details in a public issue. Use GitHub's private vulnerability reporting when enabled, or contact the maintainer at f.n.ziad@gmail.com with reproduction steps, affected version, and impact. Avoid including real resume data.

Supported version: v1.0.x. Security fixes should be documented in `CHANGELOG.md` without exposing exploit details before users can update.
