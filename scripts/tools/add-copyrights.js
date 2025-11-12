#!/usr/bin/env node

/**
 * © 2025 Fahad Nadim Ziad — https://github.com/fnziad
 * 
 * Script to add copyright headers to all source files
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const COPYRIGHT_HEADER = '// © 2025 Fahad Nadim Ziad — https://github.com/fnziad\n';

// Directories to process
const INCLUDE_DIRS = ['app', 'components', 'lib', 'hooks', 'styles'];
// File extensions to process
const EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];

async function addCopyrightHeaders() {
  console.log('🔒 Adding copyright headers to source files...\n');
  
  let filesProcessed = 0;
  let filesUpdated = 0;

  for (const dir of INCLUDE_DIRS) {
    const dirPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  Directory not found: ${dir}`);
      continue;
    }

    for (const ext of EXTENSIONS) {
      const pattern = `${dir}/**/*.${ext}`;
      const files = await glob(pattern, { cwd: process.cwd() });

      for (const file of files) {
        filesProcessed++;
        const filePath = path.join(process.cwd(), file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Check if header already exists
        if (content.startsWith(COPYRIGHT_HEADER) || content.includes('© 2025 Fahad Nadim Ziad')) {
          console.log(`✓ ${file} (already has header)`);
          continue;
        }

        // Add header
        const newContent = COPYRIGHT_HEADER + '\n' + content;
        fs.writeFileSync(filePath, newContent, 'utf8');
        filesUpdated++;
        console.log(`✨ ${file} (header added)`);
      }
    }
  }

  console.log(`\n✅ Processed ${filesProcessed} files, updated ${filesUpdated} files`);
}

addCopyrightHeaders().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
