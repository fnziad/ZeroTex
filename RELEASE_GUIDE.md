# Release Guide

## Prerequisites for Signed Releases

Before creating a signed release, you must complete these one-time setup steps locally.

### 1. Generate GPG Key (One-Time Setup)

```bash
# Generate a new GPG key pair
gpg --full-generate-key

# Choose:
# - Key type: (1) RSA and RSA
# - Key size: 4096 bits
# - Expiration: 0 (never expires) or set to your preference
# - Name: Fahad Nadim Ziad
# - Email: f.n.ziad@gmail.com
# - Comment: Resume Builder Project

# List your keys to get the key ID
gpg --list-secret-keys --keyid-format=long

# Output will show something like:
# sec   rsa4096/ABCD1234EFGH5678 2025-01-13
# Copy the part after rsa4096/ → that's your KEY_ID
```

### 2. Configure Git to Sign Commits (One-Time Setup)

```bash
# Set GPG key for signing commits
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# Tell git to use GPG
git config --global gpg.program gpg
```

### 3. Add GPG Key to GitHub (One-Time Setup)

```bash
# Export your public key
gpg --armor --export f.n.ziad@gmail.com

# Copy the entire output (including BEGIN/END lines)
# Go to GitHub → Settings → SSH and GPG keys → New GPG key
# Paste your public key
```

### 4. Backup Your GPG Key (CRITICAL!)

```bash
# Export private key (KEEP THIS SAFE!)
gpg --export-secret-keys --armor f.n.ziad@gmail.com > ~/resume-builder-gpg-private-backup.asc

# Store this file in a secure location (password manager, encrypted drive)
# You'll need it if you change computers
```

---

## Creating a Signed Release

### Step 1: Update Version

```bash
# Update version in package.json
npm version patch  # or minor, or major

# This will create a signed commit and tag automatically
```

### Step 2: Build and Sign Artifacts

```bash
# Make the signing script executable (first time only)
chmod +x scripts/sign-build.sh

# Build and sign (replace v1.0.0 with your version)
./scripts/sign-build.sh v1.0.0

# This will create in dist/:
# - resume-builder-v1.0.0.tar.gz (the build)
# - resume-builder-v1.0.0.tar.gz.asc (GPG signature)
# - SHA256SUMS (checksums)
# - SHA256SUMS.asc (signed checksums)
```

### Step 3: Create Signed Git Tag

```bash
# Create an annotated, signed tag
git tag -s v1.0.0 -m "Release version 1.0.0"

# Verify the tag is signed
git tag -v v1.0.0

# Push the tag
git push origin v1.0.0
```

### Step 4: Create GitHub Release

```bash
# Push your changes
git push origin main

# Go to GitHub → Releases → Create a new release
# - Choose the tag: v1.0.0
# - Title: "Version 1.0.0"
# - Description: Release notes
# - Attach these files from dist/:
#   * resume-builder-v1.0.0.tar.gz
#   * resume-builder-v1.0.0.tar.gz.asc
#   * SHA256SUMS
#   * SHA256SUMS.asc
```

---

## Verification (For Users)

Users can verify your releases with:

```bash
# Import your public key
gpg --keyserver keys.openpgp.org --recv-keys YOUR_KEY_ID

# Verify the signature
gpg --verify resume-builder-v1.0.0.tar.gz.asc resume-builder-v1.0.0.tar.gz

# Verify checksums
gpg --verify SHA256SUMS.asc SHA256SUMS
sha256sum -c SHA256SUMS
```

---

## Troubleshooting

### "gpg: signing failed: Inappropriate ioctl for device"

```bash
export GPG_TTY=$(tty)
echo 'export GPG_TTY=$(tty)' >> ~/.bashrc  # or ~/.zshrc
```

### "error: gpg failed to sign the data"

```bash
# Test GPG signing
echo "test" | gpg --clearsign

# If it fails, restart gpg-agent
gpgconf --kill gpg-agent
gpg-agent --daemon
```

### Cannot find secret key

```bash
# List your keys
gpg --list-secret-keys

# If empty, restore from backup
gpg --import ~/resume-builder-gpg-private-backup.asc
```

---

## Security Best Practices

1. **Never commit private keys** to the repository
2. **Never share your GPG private key** with anyone
3. **Use a strong passphrase** for your GPG key
4. **Backup your GPG key** securely (encrypted drive, password manager)
5. **Revoke compromised keys** immediately and create new ones
6. **Sign all releases** to maintain trust
7. **Verify signatures** before distributing builds

---

## Key Management

### If Your Key is Compromised

```bash
# Generate a revocation certificate
gpg --gen-revoke YOUR_KEY_ID > revoke.asc

# Publish revocation
gpg --import revoke.asc
gpg --send-keys YOUR_KEY_ID

# Generate a new key and update GitHub
```

### Rotating Keys (Recommended Every 2-3 Years)

1. Generate a new GPG key
2. Update git config with new key ID
3. Add new public key to GitHub
4. Sign a transition statement with both keys
5. Gradually phase out old key
6. Revoke old key after transition period
