#!/bin/bash

# © 2025 Fahad Nadim Ziad — https://github.com/fnziad
# Optional script to search for potential clones

echo "🔍 Searching for potential clones..."
echo ""
echo "⚠️  This script requires GitHub CLI (gh) to be installed and authenticated."
echo "   Install: https://cli.github.com/"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found. Please install it first."
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "   Run: gh auth login"
    exit 1
fi

echo "📊 Searching GitHub for repositories with similar keywords..."
echo ""

# Search for repositories with similar names
gh search repos "resume builder latex" --limit 20 --json name,owner,url,description | \
    jq -r '.[] | "[\(.owner.login)/\(.name)](\(.url)) - \(.description // "No description")"'

echo ""
echo "🔎 Searching for code containing your copyright..."
echo ""

# Search for your copyright string
gh search code "© 2025 Fahad Nadim Ziad" --limit 10 --json repository,path,url | \
    jq -r '.[] | "Found in: \(.repository.fullName) - \(.path)\n  URL: \(.url)"'

echo ""
echo "💡 Tips for manual investigation:"
echo "   1. Check if repos above have similar code structure"
echo "   2. Look for your watermark in their builds"
echo "   3. Compare package.json dependencies"
echo "   4. Check commit history dates (should be after yours)"
echo ""
echo "   If you find infringement, see ENFORCEMENT.md for next steps."
