#!/bin/bash

# © 2025 Fahad Nadim Ziad — https://github.com/fnziad
# Script to sign build artifacts with GPG

set -e

echo "🔐 Building and signing release artifacts..."

# Configuration
PROJECT_NAME="resume-builder"
VERSION="${1:-dev}"
BUILD_DIR="out"
DIST_DIR="dist"

# Build the project
echo "📦 Building production bundle..."
npm run build

# Create distribution directory
mkdir -p "$DIST_DIR"

# Create tarball of build output
echo "📦 Creating release tarball..."
TARBALL="$DIST_DIR/${PROJECT_NAME}-${VERSION}.tar.gz"
tar -czf "$TARBALL" -C "$BUILD_DIR" .

# Generate SHA256 checksums
echo "🔢 Generating checksums..."
cd "$DIST_DIR"
sha256sum "${PROJECT_NAME}-${VERSION}.tar.gz" > SHA256SUMS
cd ..

# Sign the tarball
echo "✍️  Signing tarball with GPG..."
gpg --detach-sign --armor "$TARBALL"

# Sign the checksums
echo "✍️  Signing checksums with GPG..."
gpg --clearsign --armor "$DIST_DIR/SHA256SUMS"

# Verify signatures
echo "✅ Verifying signatures..."
gpg --verify "${TARBALL}.asc" "$TARBALL"
gpg --verify "$DIST_DIR/SHA256SUMS.asc"

echo ""
echo "✅ Build signed successfully!"
echo ""
echo "📦 Artifacts created:"
echo "   - $TARBALL"
echo "   - ${TARBALL}.asc (GPG signature)"
echo "   - $DIST_DIR/SHA256SUMS"
echo "   - $DIST_DIR/SHA256SUMS.asc (signed checksums)"
echo ""
echo "Upload these to GitHub Release!"
