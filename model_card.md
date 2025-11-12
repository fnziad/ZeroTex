# Model Card: Resume LaTeX Generator

## Model/Component Details

- **Name**: Professional LaTeX Resume Generator
- **Type**: Rule-based template system
- **Version**: 1.0.0
- **Author**: Fahad Nadim Ziad (fnziad)
- **Date**: January 2025
- **License**: All Rights Reserved
- **Repository**: https://github.com/fnziad/resume-builder

## Description

A custom-built LaTeX generator that transforms structured resume data into professional, ATS-friendly LaTeX documents. The system uses carefully crafted templates with optimal spacing, typography, and formatting rules.

## Technical Specifications

- **Input**: JSON-structured resume data (TypeScript interfaces)
- **Output**: LaTeX source code (article document class)
- **Template System**: Single professional template with modular sections
- **Packages Used**:
  - fontawesome5 (icons)
  - hyperref (links)
  - xcolor (colors)
  - enumitem (list formatting)
  - titlesec (section styling)
  - multicol (multi-column layouts)

## Features

1. **Section Types** (14 total):

   - Executive Summary
   - Education (with GPA, coursework, achievements)
   - Research Interests & Experience
   - Professional Experience
   - Projects (with bullets and descriptions)
   - Publications (IEEE/ACM format)
   - Certifications
   - Technical Skills
   - Awards & Recognitions
   - Languages & Interests
   - Custom sections

2. **Formatting**:

   - Compact spacing (0.7mm-2mm controlled gaps)
   - Professional typography (10pt, A4)
   - FontAwesome5 icons for social links
   - Colored hyperlinks
   - Horizontal rule separators
   - Custom bullet environments

3. **Flexibility**:
   - All fields optional
   - Dynamic section ordering
   - Ampersand escaping for special characters
   - Multi-page support
   - Export to .tex file

## Known Limitations

- Single template (extensible architecture for future templates)
- A4 paper size (US Letter requires margin adjustment)
- Requires LaTeX distribution for compilation (pdflatex, xelatex)
- Browser PDF preview uses approximation (actual LaTeX output may differ)

## Usage Context

Intended for:

- Job seekers creating professional resumes
- Academics building CVs
- Researchers documenting publications
- Anyone needing LaTeX-quality typesetting

Not suitable for:

- Creative/graphic designer portfolios (use design tools)
- Non-technical users uncomfortable with LaTeX

## Performance

- **Generation Speed**: < 100ms for typical resume
- **Browser Render**: Real-time preview
- **LaTeX Compilation**: 1-3 seconds (external)

## Author Attribution

**Created by**: Fahad Nadim Ziad  
**GitHub**: https://github.com/fnziad  
**Email**: f.n.ziad@gmail.com

**Copyright**: © 2025 Fahad Nadim Ziad. All Rights Reserved.

## Changelog

### v1.0.0 (January 2025)

- Initial release
- 14 section types
- Professional template with compact spacing
- FontAwesome5 icon integration
- Flexible optional fields
- LaTeX special character escaping
- Multi-page preview support

## Citation

If you reference this work, please cite:

```bibtex
@software{ziad2025resumebuilder,
  author = {Ziad, Fahad Nadim},
  title = {Professional Resume Builder with LaTeX Export},
  year = {2025},
  url = {https://github.com/fnziad/resume-builder},
  note = {LaTeX template generation system}
}
```

---

**Integrity Hash** (SHA-256 of lib/latex-generator.ts):

```
[Will be computed during build - see scripts/inject-watermark.js]
```

This file serves as provenance documentation for the custom LaTeX generation system.
