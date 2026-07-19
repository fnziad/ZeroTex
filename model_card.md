# Component Card: ZeroTeX LaTeX Generator

## Component details

- **Name:** ZeroTeX LaTeX Generator
- **Type:** Deterministic, rule-based document generator; not a machine-learning model
- **Application version:** 1.0.0
- **Resume document schema:** 1
- **Release date:** 19 July 2026
- **Repository:** https://github.com/fnziad/ZeroTex
- **License:** See `LICENSE`

## Purpose

The generator transforms validated `ResumeData` into editable LaTeX source. It supports the section types defined in `lib/resume-types.ts`, preserves user-defined ordering and visibility, and escapes LaTeX-sensitive characters before interpolation.

## Inputs and outputs

- **Input:** Validated in-memory resume data or a migrated `zerotex-resume` document.
- **Output:** LaTeX source using the current professional template.
- **Related renderers:** The browser live preview and print/PDF path approximate the same content but are separate rendering implementations.

## Intended use

- Professional resumes and academic CVs.
- User-reviewed LaTeX export for local compilation or explicit submission to Overleaf.
- ATS-conscious layouts with structured textual content.

## Limitations

- v1.0.0 ships one primary LaTeX layout.
- The default layout targets A4; complete US Letter support is planned.
- Browser preview and browser print output are not byte-for-byte LaTeX renderings.
- The generator does not compile untrusted TeX on the server.
- Output quality depends on the accuracy and clarity of user-provided content.
- ZeroTeX does not guarantee acceptance by every ATS implementation.

## Safety and testing

- Imported documents are size-limited and schema-validated before use.
- User strings are escaped for LaTeX generation.
- Supported URL fields are restricted to HTTP and HTTPS where links are rendered.
- Fixture tests cover default generation, user content, and escaping behavior.
- Future templates require deterministic regression fixtures before release.

No integrity hash is embedded or computed automatically in v1.0.0. Release provenance is maintained through Git history, CI records, tags, and changelog entries.
