#!/usr/bin/env node

/**
 * © 2025 Fahad Nadim Ziad — https://github.com/fnziad
 * 
 * Script to inject watermark into build output
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BUILD_DIR = path.join(process.cwd(), 'out');
const INDEX_HTML = path.join(BUILD_DIR, 'index.html');

function calculateSHA256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function injectWatermark() {
  console.log('💧 Injecting cryptographic watermark...');

  if (!fs.existsSync(INDEX_HTML)) {
    console.error('❌ Build output not found. Run `npm run build` first.');
    process.exit(1);
  }

  // Find main JS bundle
  const buildFiles = fs.readdirSync(BUILD_DIR, { recursive: true });
  const mainBundle = buildFiles
    .filter(f => f.includes('.js') && !f.includes('.map'))
    .find(f => f.includes('main') || f.includes('index'));

  let bundleHash = 'unknown';
  if (mainBundle) {
    const bundlePath = path.join(BUILD_DIR, mainBundle);
    bundleHash = calculateSHA256(bundlePath);
    console.log(`✓ Main bundle hash: ${bundleHash.substring(0, 16)}...`);
  }

  // Read index.html
  let html = fs.readFileSync(INDEX_HTML, 'utf8');

  // Create watermark
  const timestamp = new Date().toISOString();
  const watermark = `
<!-- ZIAD-SIGNATURE: DO NOT REMOVE
  Project: Professional Resume Builder
  Author: Fahad Nadim Ziad (fnziad)
  Copyright: © 2025 Fahad Nadim Ziad. All Rights Reserved.
  Built: ${timestamp}
  Bundle SHA-256: ${bundleHash}
  Signed-By: fahadnadimziad
  Repository: https://github.com/fnziad/resume-builder
  License: See LICENSE file
  
  This software is protected by copyright law. Unauthorized copying,
  distribution, or modification is strictly prohibited.
-->`;

  // Inject after <head>
  html = html.replace('<head>', '<head>' + watermark);

  // Write back
  fs.writeFileSync(INDEX_HTML, html, 'utf8');

  console.log('✅ Watermark injected successfully!');
  console.log(`   Hash: ${bundleHash.substring(0, 32)}...`);
}

injectWatermark();
