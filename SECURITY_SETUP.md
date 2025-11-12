# 🔐 Security & Legal Protection Setup Guide

## ⚠️ IMPORTANT: Complete These Steps BEFORE Making Repository Public

This guide will help you set up cryptographic protections, automated copyright enforcement, and legal safeguards for your Resume Builder project.

---

## 📋 Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [One-Time Setup (GPG & Git)](#one-time-setup-gpg--git)
3. [Add Copyright Headers](#add-copyright-headers)
4. [Setup Git Hooks](#setup-git-hooks)
5. [Configure CI/CD](#configure-cicd)
6. [Create Your First Signed Release](#create-your-first-signed-release)
7. [Optional: Advanced Protection](#optional-advanced-protection)
8. [Verification](#verification)

---

## ✅ Quick Start Checklist

Before making your repository public, complete these steps:

- [ ] Install dependencies
- [ ] Generate GPG key
- [ ] Configure Git signing
- [ ] Add GPG key to GitHub
- [ ] Add copyright headers to all source files
- [ ] Install Husky hooks
- [ ] Test the build process
- [ ] Create a signed release
- [ ] Make repository public

**Estimated time**: 30-45 minutes

---

## 🔑 One-Time Setup (GPG & Git)

### 1. Install Required Tools

```bash
# Install Node dependencies
cd /Users/viruzxero/SE_Projects/resume-builder
npm install

# Install GPG (if not already installed)
# macOS:
brew install gnupg

# Install husky for git hooks
npm install --save-dev husky
npx husky install

# Install detect-secrets (optional but recommended)
pip3 install detect-secrets
```

### 2. Generate GPG Key

```bash
# Generate a new GPG key
gpg --full-generate-key

# When prompted, choose:
# - Key type: (1) RSA and RSA
# - Key size: 4096 bits
# - Expiration: 0 (never expires) or set your preference
# - Real name: Fahad Nadim Ziad
# - Email: f.n.ziad@gmail.com
# - Comment: Resume Builder Project (optional)

# Set a STRONG passphrase - you'll need this for signing
```

### 3. Get Your GPG Key ID

```bash
# List your GPG keys
gpg --list-secret-keys --keyid-format=long

# Output will look like:
# sec   rsa4096/ABCD1234EFGH5678 2025-01-13 [SC]
#       FULL_FINGERPRINT_HERE
# uid           [ultimate] Fahad Nadim Ziad <f.n.ziad@gmail.com>
# ssb   rsa4096/ANOTHER_ID 2025-01-13 [E]

# Copy the part after "rsa4096/" → that's your KEY_ID
# Example: ABCD1234EFGH5678
```

### 4. Configure Git to Use GPG

```bash
# Set your GPG key for Git (replace KEY_ID with your actual key ID)
git config --global user.signingkey YOUR_KEY_ID

# Enable automatic commit signing
git config --global commit.gpgsign true

# Enable automatic tag signing
git config --global tag.gpgsign true

# Configure GPG program
git config --global gpg.program gpg

# Fix GPG TTY issues (important for terminal usage)
echo 'export GPG_TTY=$(tty)' >> ~/.zshrc
source ~/.zshrc
```

### 5. Add GPG Key to GitHub

```bash
# Export your PUBLIC key (not the private one!)
gpg --armor --export f.n.ziad@gmail.com

# This will output something like:
# -----BEGIN PGP PUBLIC KEY BLOCK-----
# ...
# -----END PGP PUBLIC KEY BLOCK-----

# Copy the ENTIRE output (including BEGIN/END lines)
```

Then:

1. Go to GitHub.com → Settings → SSH and GPG keys
2. Click "New GPG key"
3. Paste your public key
4. Click "Add GPG key"

### 6. Backup Your GPG Key (CRITICAL!)

```bash
# Export your PRIVATE key to a secure location
gpg --export-secret-keys --armor f.n.ziad@gmail.com > ~/resume-builder-gpg-backup.asc

# ⚠️ KEEP THIS FILE EXTREMELY SECURE!
# - Store in password manager (1Password, LastPass, etc.)
# - Or store on encrypted USB drive
# - Or store in secure cloud storage (encrypted)
# - You'll need this if you change computers

# Generate a revocation certificate (in case key is compromised)
gpg --gen-revoke f.n.ziad@gmail.com > ~/resume-builder-gpg-revoke.asc

# Store this securely too!
```

---

## 📝 Add Copyright Headers

### Add Headers to All Source Files

```bash
# Navigate to project directory
cd /Users/viruzxero/SE_Projects/resume-builder

# Install glob dependency if not present
npm install glob

# Run the copyright injection script
npm run add-copyrights

# Expected output:
# 🔒 Adding copyright headers to source files...
# ✨ app/page.tsx (header added)
# ✨ components/resume-preview.tsx (header added)
# ... (all files)
# ✅ Processed X files, updated Y files
```

### Verify Headers

```bash
# Check that all files have headers
npm run check-headers

# Expected output:
# 🔍 Checking copyright headers...
# ✓ app/page.tsx
# ✓ components/resume-preview.tsx
# ... (all files)
# ✅ All files have copyright headers!
```

### Commit the Headers

```bash
# This will be your first SIGNED commit!
git add .
git commit -m "Add copyright headers to all source files"

# Verify the commit is signed
git log --show-signature -1

# You should see "Good signature from Fahad Nadim Ziad"
```

---

## 🪝 Setup Git Hooks

### Initialize Husky

```bash
# Initialize husky (creates .husky directory)
npm run prepare

# Make hook scripts executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

# Test the pre-commit hook
git add .
git commit -m "Test commit hook"

# You should see:
# 🔍 Running pre-commit checks...
# 📝 Checking copyright headers...
# 🧹 Running linter...
# ✅ Pre-commit checks passed!
```

### Initialize Secrets Baseline (Optional)

```bash
# If you installed detect-secrets:
detect-secrets scan --baseline .secrets.baseline

# This creates a baseline of "known secrets" (usually false positives)
# The hook will fail if new secrets are detected
```

---

## 🔄 Configure CI/CD

The CI/CD workflow (`.github/workflows/ci.yml`) will automatically run on every push and pull request.

It checks:

1. ✅ All files have copyright headers
2. ✅ LICENSE file exists and contains proper copyright
3. ✅ ESLint passes
4. ✅ No secrets detected
5. ✅ Build succeeds
6. ✅ Watermark injected into build

**No action needed** - it will run automatically when you push to GitHub!

---

## 🚀 Create Your First Signed Release

### Step 1: Update Version

```bash
# Update package.json version (creates signed commit + tag)
npm version 1.0.0

# Or for patch/minor updates:
# npm version patch
# npm version minor
```

### Step 2: Build and Sign Artifacts

```bash
# Make the signing script executable (if not already)
chmod +x scripts/sign-build.sh

# Build and sign (this will take a minute)
./scripts/sign-build.sh v1.0.0

# Expected output:
# 🔐 Building and signing release artifacts...
# 📦 Building production bundle...
# 📦 Creating release tarball...
# 🔢 Generating checksums...
# ✍️  Signing tarball with GPG...
# ✍️  Signing checksums with GPG...
# ✅ Build signed successfully!

# Check the dist/ folder
ls -la dist/

# You should see:
# - resume-builder-v1.0.0.tar.gz (the build)
# - resume-builder-v1.0.0.tar.gz.asc (GPG signature)
# - SHA256SUMS (checksums)
# - SHA256SUMS.asc (signed checksums)
```

### Step 3: Create Signed Git Tag

```bash
# Create a signed, annotated tag
git tag -s v1.0.0 -m "Release version 1.0.0

- Initial public release
- Professional LaTeX resume builder
- 14 section types
- Copyright protection enabled"

# Verify the tag is signed
git tag -v v1.0.0

# You should see: "Good signature from Fahad Nadim Ziad"

# Push everything to GitHub
git push origin main --follow-tags
```

### Step 4: Create GitHub Release

1. Go to https://github.com/fnziad/resume-builder/releases
2. Click "Draft a new release"
3. Choose tag: `v1.0.0`
4. Release title: `Version 1.0.0 - Initial Public Release`
5. Description:

   ````markdown
   ## Professional Resume Builder v1.0.0

   First official release! 🎉

   ### Features

   - 14 customizable resume section types
   - Professional LaTeX export
   - Real-time preview
   - Flexible, all-optional fields
   - ATS-friendly formatting

   ### Verification

   Download and verify signatures:

   ```bash
   gpg --verify resume-builder-v1.0.0.tar.gz.asc resume-builder-v1.0.0.tar.gz
   gpg --verify SHA256SUMS.asc SHA256SUMS
   sha256sum -c SHA256SUMS
   ```
   ````

   ### Copyright

   © 2025 Fahad Nadim Ziad. All Rights Reserved.

   ```

   ```

6. Attach these files from `dist/`:

   - ✅ `resume-builder-v1.0.0.tar.gz`
   - ✅ `resume-builder-v1.0.0.tar.gz.asc`
   - ✅ `SHA256SUMS`
   - ✅ `SHA256SUMS.asc`

7. Click "Publish release"

---

## 🛡️ Optional: Advanced Protection

### Create Zenodo DOI (Permanent Archive)

1. Go to https://zenodo.org/
2. Log in with GitHub
3. Go to Settings → GitHub
4. Enable Zenodo for `resume-builder` repository
5. Create a new release on GitHub
6. Zenodo automatically creates a DOI

**Benefits:**

- Permanent, immutable record
- Citable with DOI
- Survives even if GitHub is deleted
- Legal proof of authorship date

### Monitor for Clones

```bash
# Requires GitHub CLI (gh)
brew install gh
gh auth login

# Search for potential clones (run periodically)
./scripts/search-clones.sh

# This will search GitHub for:
# - Similar repository names
# - Your copyright strings in code
# - Related keywords
```

### Software Heritage Archive

Submit to Software Heritage for permanent preservation:

1. Go to https://archive.softwareheritage.org/
2. Click "Save code now"
3. Enter your repository URL
4. Software Heritage archives it permanently

---

## ✅ Verification

### Verify Everything Works

```bash
# 1. Check copyright headers
npm run check-headers

# 2. Test build
npm run build

# 3. Verify watermark in build
grep "ZIAD-SIGNATURE" out/index.html

# 4. Verify commit signing
git log --show-signature -1

# 5. Verify tag signing
git tag -v v1.0.0

# 6. Test hooks
git commit --allow-empty -m "Test hooks"
```

### Test Signature Verification (as a user would)

```bash
# Export your public key
gpg --armor --export f.n.ziad@gmail.com > your-public-key.asc

# In a new terminal (simulate a user):
gpg --import your-public-key.asc

# Verify the tarball
gpg --verify dist/resume-builder-v1.0.0.tar.gz.asc dist/resume-builder-v1.0.0.tar.gz

# Should show: "Good signature from Fahad Nadim Ziad <f.n.ziad@gmail.com>"

# Verify checksums
gpg --verify dist/SHA256SUMS.asc dist/SHA256SUMS
cd dist && sha256sum -c SHA256SUMS
```

---

## 🎉 You're Ready to Go Public!

Once all steps are complete and verified:

1. Make repository public:

   - GitHub → Settings → Danger Zone → Change visibility → Make public

2. Update README.md with:

   - Project description
   - Features
   - Installation instructions
   - Copyright notice

3. Share your project:
   - LinkedIn post
   - Twitter/X
   - Reddit (r/webdev, r/programming)
   - Hacker News
   - Dev.to

---

## 📚 Additional Resources

- **RELEASE_GUIDE.md** - Detailed release process
- **ENFORCEMENT.md** - What to do if someone plagiarizes
- **CITATION.cff** - How others should cite your work
- **LICENSE** - Legal copyright notice

---

## 🐛 Troubleshooting

### "gpg: signing failed: Inappropriate ioctl for device"

```bash
export GPG_TTY=$(tty)
echo 'export GPG_TTY=$(tty)' >> ~/.zshrc
```

### "error: gpg failed to sign the data"

```bash
# Test GPG
echo "test" | gpg --clearsign

# Restart GPG agent
gpgconf --kill gpg-agent
gpg-agent --daemon
```

### "npm run check-headers fails"

```bash
# Re-run the copyright injection
npm run add-copyrights

# Then commit
git add .
git commit -m "Fix missing copyright headers"
```

### Hooks not running

```bash
# Reinstall hooks
npm run prepare
chmod +x .husky/*

# Test
git commit --allow-empty -m "Test"
```

---

## 🔒 Security Best Practices

1. ✅ **Never commit** `.env` files or private keys
2. ✅ **Always sign** releases and commits
3. ✅ **Backup your GPG key** in multiple secure locations
4. ✅ **Use strong passphrases** for GPG keys
5. ✅ **Review PRs carefully** before merging
6. ✅ **Keep dependencies updated** (`npm audit`)
7. ✅ **Monitor for clones** periodically

---

## 📞 Questions?

- **Email**: f.n.ziad@gmail.com
- **GitHub**: [@fnziad](https://github.com/fnziad)
- **Issues**: https://github.com/fnziad/resume-builder/issues

---

**Copyright © 2025 Fahad Nadim Ziad. All Rights Reserved.**

This setup guide ensures your work is protected, attributable, and enforceable under copyright law.
