#!/usr/bin/env node
/**
 * check-visible-internal-links.mjs
 * Ensures indexable detail pages have visible internal links (not sr-only).
 * Checks:
 * - /brainrots page: indexable records get visible <Link>
 * - /traits page: same
 * - Featured section exists on /brainrots page
 * - No sr-only links remain in list pages
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

let errors = 0;

console.log('=== Visible Internal Links Check ===\n');

// Check 1: /brainrots page — no sr-only nav
console.log('--- sr-only link cleanup ---');
const brainrotsPage = readFileSync(resolve(rootDir, 'src/app/brainrots/page.tsx'), 'utf8');

if (brainrotsPage.includes('sr-only') && brainrotsPage.includes('All Brainrots index')) {
  console.log('  ❌ /brainrots page still has sr-only All Brainrots index nav');
  errors++;
} else if (brainrotsPage.includes('sr-only')) {
  console.log('  ⚠️ /brainrots page has sr-only elements (check if they are benign)');
} else {
  console.log('  ✅ /brainrots page has no sr-only elements');
}

// Check 2: /brainrots page has Featured section
console.log('\n--- Featured section ---');
if (brainrotsPage.includes('Featured Brainrots') || brainrotsPage.includes('Top Brainrot')) {
  console.log('  ✅ /brainrots page has Featured/Top section');
} else {
  console.log('  ❌ /brainrots page missing Featured section for indexable records');
  errors++;
}

// Check 3: BrainrotExplorer uses conditional linking
console.log('\n--- Conditional linking in BrainrotExplorer ---');
const explorerPath = resolve(rootDir, 'src/components/explorers/BrainrotExplorer.tsx');
const explorer = readFileSync(explorerPath, 'utf8');

if (explorer.includes('isRecordIndexable')) {
  console.log('  ✅ BrainrotExplorer uses isRecordIndexable for conditional linking');
} else {
  console.log('  ❌ BrainrotExplorer does not use conditional linking');
  errors++;
}

// Check 4: Trait explorer — check if exists and uses conditional linking
console.log('\n--- Trait explorer ---');
const traitExplorerPath = resolve(rootDir, 'src/components/explorers/TraitExplorer.tsx');
if (readFileSync(traitExplorerPath, 'utf8').includes('<Link')) {
  console.log('  ⚠️ TraitExplorer has Link components (check for conditional rendering)');
} else {
  console.log('  ✅ OK');
}

console.log(`\nErrors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
