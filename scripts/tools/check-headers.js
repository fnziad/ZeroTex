#!/usr/bin/env node

/**
 * © 2025 Fahad Nadim Ziad — https://github.com/fnziad
 * 
 * Script to verify all source files have copyright headers
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const COPYRIGHT_PATTERN = /©\s*2025\s*Fahad\s*Nadim\s*Ziad/;

// Directories to check
const INCLUDE_DIRS = ['app', 'components', 'lib', 'hooks'];
// File extensions to check
const EXTENSIONS = ['js', 'jsx', 'ts', 'tsx'];

async function checkHeaders() {
  console.log('🔍 Checking copyright headers...\n');
  
  let filesChecked = 0;
  let filesMissing = [];

  for (const dir of INCLUDE_DIRS) {
    const dirPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(dirPath)) {
      continue;
    }

    for (const ext of EXTENSIONS) {
      const pattern = `${dir}/**/*.${ext}`;
      const files = await glob(pattern, { cwd: process.cwd() });

      for (const file of files) {
        filesChecked++;
        const filePath = path.join(process.cwd(), file);
        const content = fs.readFileSync(filePath, 'utf8');

        if (!COPYRIGHT_PATTERN.test(content)) {
          filesMissing.push(file);
          console.log(`❌ ${file} (missing header)`);
        } else {
          console.log(`✓ ${file}`);
        }
      }
    }
  }

  console.log(`\n📊 Checked ${filesChecked} files`);

  if (filesMissing.length > 0) {
    console.error(`\n❌ ${filesMissing.length} files missing copyright headers:`);
    filesMissing.forEach(file => console.error(`   - ${file}`));
    console.error('\nRun: npm run add-copyrights');
    process.exit(1);
  }

  console.log('\n✅ All files have copyright headers!');
}

checkHeaders().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
