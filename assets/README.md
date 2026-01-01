# Assets Documentation

## Overview

This directory contains static assets for the Professional Resume Builder project.

**Author**: Fahad Nadim Ziad (fnziad)  
**Copyright**: © 2025 Fahad Nadim Ziad. All Rights Reserved.  
**Repository**: https://github.com/fnziad/resume-builder

---

## Asset Inventory

### Templates

All resume templates are custom-designed and implemented by Fahad Nadim Ziad.

1. **Classic Professional Template** (`lib/latex-generator.ts`)
   - **Format**: LaTeX article document class
   - **Features**: FontAwesome5 icons, compact spacing, professional typography
   - **Hash**: [Computed during build]
   - **Date**: January 2025
   - **License**: All Rights Reserved

### Fonts

- **System**: Uses system-installed LaTeX fonts
- **Icons**: FontAwesome5 (via LaTeX package)
- **No embedded fonts**: Project relies on user's LaTeX distribution

### Images

Currently none. Any future images will be documented here with:

- Source/creator attribution
- License information
- SHA-256 hash
- Usage purpose

### Third-Party Dependencies

All third-party packages are listed in `package.json` with their respective licenses:

- **React** (MIT) - UI framework
- **Next.js** (MIT) - React framework
- **Tailwind CSS** (MIT) - Styling
- **Radix UI** (MIT) - UI components
- **Lucide React** (ISC) - Icons for UI
- **jsPDF** (MIT) - PDF generation

All dependencies are properly licensed and used in compliance with their terms.

---

## Asset Guidelines

### Adding New Assets

When adding new assets to this project:

1. **Document Here**: Update this README with asset details
2. **Compute Hash**: Generate SHA-256 hash for verification
   ```bash
   sha256sum your-asset-file.png
   ```
3. **Attribution**: Include creator, source, and license
4. **Copyright**: Add copyright header if applicable

### Asset Verification

To verify asset integrity:

```bash
# Verify a specific asset
sha256sum -c asset-hashes.txt

# Generate new hash
sha256sum assets/your-file.png
```

---

## LaTeX Template Components

### Custom Environments

**Project Bullet Environment** (in `lib/latex-generator.ts`):

```latex
\newenvironment{project}{
    \begin{itemize}[leftmargin=3ex, rightmargin=2ex, noitemsep,
                    labelsep=1.2mm, itemsep=0mm, topsep=0mm]\small
}{
    \end{itemize}
}
```

- **Author**: Fahad Nadim Ziad
- **Purpose**: Ultra-compact bullet lists
- **Spacing**: Custom values for professional appearance

### Section Formatting

Custom `\titleformat` and `\titlespacing` rules:

- **Author**: Fahad Nadim Ziad
- **Design**: Horizontal rules under section titles
- **Spacing**: 0.7mm between sections, 2mm after section titles

---

## File Hashes (for verification)

| File                     | SHA-256             | Date    | Purpose               |
| ------------------------ | ------------------- | ------- | --------------------- |
| `lib/latex-generator.ts` | [Computed at build] | 2025-01 | LaTeX template engine |
| `lib/resume-types.ts`    | [Computed at build] | 2025-01 | Type definitions      |

To generate:

```bash
find lib -type f -name "*.ts" -exec sha256sum {} \; > assets/file-hashes.txt
```

---

## Usage Rights

**All custom templates, designs, and code are proprietary and protected by copyright.**

- ✅ **Allowed**: Personal use of the application as-is
- ❌ **Not Allowed**:
  - Copying template designs
  - Extracting LaTeX generation code
  - Creating derivative works
  - Commercial redistribution

For licensing inquiries: f.n.ziad@gmail.com

---

## Reporting Issues

If you discover:

- Missing attribution
- Incorrect hash
- Unauthorized asset usage

Please report to: f.n.ziad@gmail.com or open a GitHub issue.

---

Last Updated: January 13, 2025  
Maintainer: Fahad Nadim Ziad (@fnziad)
