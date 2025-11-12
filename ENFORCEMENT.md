# Enforcement & Legal Protection Guide

## Copyright Protection

This software is protected by copyright law under:

- **Copyright**: © 2025 Fahad Nadim Ziad. All Rights Reserved.
- **License**: See LICENSE file (All Rights Reserved by default)
- **Repository**: https://github.com/fnziad/resume-builder

---

## Evidence Collection for Plagiarism Cases

If you discover unauthorized copying, distribution, or modification of this software, collect the following evidence:

### 1. Cryptographic Proof of Authorship

✅ **Signed Git Commits**

```bash
# Show your signed commits
git log --show-signature

# Export commit signatures
git log --pretty=format:"%H %G? %GK %GS" > commit-signatures.txt
```

✅ **Signed Git Tags**

```bash
# Verify all tags are signed
git tag -v v1.0.0

# Export tag information
git tag -l --format="%(refname:short) %(signature:subject)" > tag-signatures.txt
```

✅ **Signed Release Artifacts**

- Save all `.asc` signature files from GitHub Releases
- Save `SHA256SUMS` and `SHA256SUMS.asc` files
- These prove the build artifacts came from you

### 2. Timestamped Evidence

✅ **Git History**

```bash
# Export complete git history with timestamps
git log --all --pretty=format:"%H | %an | %ae | %ad | %s" > git-history.txt

# Show first commit (proves earliest date)
git log --reverse --pretty=format:"%H | %ad | %s" | head -1
```

✅ **GitHub Evidence**

- Screenshot of repository creation date
- Screenshot of commit history page
- Screenshot of release dates
- Download "Download ZIP" with commit SHA

✅ **Third-Party Timestamps**

- GitHub repository URL with creation date
- npm package publish date (if published)
- Archive.org Wayback Machine snapshots
- Zenodo DOI (see below)

### 3. Watermark Evidence

✅ **Build Watermarks**
Every build contains a hidden cryptographic watermark in `out/index.html`:

```html
<!-- ZIAD-SIGNATURE: DO NOT REMOVE
  Author: Fahad Nadim Ziad (fnziad)
  Copyright: © 2025 Fahad Nadim Ziad
  Built: [timestamp]
  Bundle SHA-256: [hash]
-->
```

- Check if the infringer's build contains your watermark
- Compare bundle hashes
- Watermark removal is evidence of intentional infringement

### 4. Code Similarity Evidence

✅ **Unique Identifiers**

- Copyright headers in every source file: `// © 2025 Fahad Nadim Ziad — https://github.com/fnziad`
- Specific code patterns and architecture
- LaTeX generator implementation
- Component structure and naming

✅ **Forensic Comparison**

```bash
# Compare code similarity (if they published source)
diff -r your-project/ their-project/ > code-differences.txt

# Check for your copyright headers in their code
grep -r "© 2025 Fahad Nadim Ziad" their-project/
```

---

## Legal Actions Available

### 1. DMCA Takedown (GitHub)

GitHub respects DMCA. File a takedown request at:
https://github.com/contact/dmca

**Required information:**

- Your contact details
- Link to your original repository
- Link to infringing repository
- Statement: "I have a good faith belief that use of the copyrighted materials described above as allegedly infringing is not authorized by the copyright owner, its agent, or the law."
- Statement: "I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or authorized to act on behalf of the owner."
- Your signature

**Evidence to attach:**

- Screenshots of both repositories
- Signed commit history
- Release signatures
- This ENFORCEMENT.md file

### 2. Cease and Desist Letter

Send a formal letter demanding:

- Immediate removal of all infringing copies
- Public acknowledgment of infringement
- Compensation for damages (optional)

**Template**: (consult a lawyer for your jurisdiction)

### 3. Legal Action

For serious commercial infringement:

- **Copyright infringement lawsuit**: Statutory damages, actual damages, attorney fees
- **Trademark infringement** (if you registered a trademark)
- **Unfair competition** claims

**Consult a lawyer** specializing in intellectual property law.

---

## Archival & Additional Protection

### Zenodo DOI (Permanent Record)

Create a permanent, citable record with DOI:

1. Go to https://zenodo.org/
2. Connect your GitHub account
3. Enable Zenodo for your repository
4. Create a release on GitHub
5. Zenodo automatically creates a DOI

**Benefits:**

- Immutable timestamp
- Citable academic record
- Trusted third-party archive
- Survives even if GitHub account is deleted

### Software Heritage Archive

Submit to Software Heritage for permanent archival:
https://archive.softwareheritage.org/

**Benefits:**

- Permanent preservation of source code
- Legal evidence of publication date
- Trusted by courts and institutions

---

## Monitoring for Plagiarism

### Automated Monitoring (Optional)

Use `scripts/search-clones.sh` to search for potential clones:

```bash
# Search GitHub for repositories with similar code
gh search repos "resume builder latex" --limit 100

# Search for your unique strings
gh search code "© 2025 Fahad Nadim Ziad" --limit 50
```

### Manual Checks

Periodically search:

- GitHub: `"professional resume builder" latex`
- Google: `"Resume Builder" "LaTeX export" site:github.com`
- npm: Search for similar package names

---

## Contact for Licensing

If someone wants to legally use your code:

- **Email**: f.n.ziad@gmail.com
- **GitHub**: @fnziad

You can offer:

- Commercial licenses
- Consulting services
- Custom development

---

## Record Keeping

**Maintain these records securely:**

1. **GPG Keys**

   - Private key backup (encrypted)
   - Public key fingerprint
   - Revocation certificate

2. **Git Evidence**

   - Complete git history export
   - Signed commit/tag exports
   - All release artifacts with signatures

3. **Timestamps**

   - Repository creation screenshot
   - First commit date
   - All release dates
   - Zenodo DOI

4. **Legal Documents**
   - This ENFORCEMENT.md
   - LICENSE file
   - CITATION.cff
   - Any correspondence about licensing

---

## Disclaimer

This guide provides general information and is not legal advice. For specific legal matters, consult with a qualified intellectual property attorney in your jurisdiction.

Copyright laws vary by country. This guide assumes:

- Berne Convention member countries (automatic copyright)
- US DMCA provisions
- GitHub's jurisdiction

---

**Remember**: Your copyright is automatic upon creation. The evidence collection methods here help **prove** your authorship if challenged.

Last updated: January 13, 2025
