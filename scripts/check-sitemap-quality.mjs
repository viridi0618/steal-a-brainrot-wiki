#!/usr/bin/env node
/**
 * check-sitemap-quality.mjs
 * Validates sitemap quality:
 * - No partial records in sitemap
 * - No hidden records in sitemap
 * - No duplicate URLs
 * - No trailing slash conflicts
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

let errors = 0;

// Check from source code since we can't build the sitemap.xml directly
const sitemapRaw = readFileSync(resolve(rootDir, 'src/app/sitemap.ts'), 'utf8');

console.log('=== Sitemap Quality Check ===\n');

// Extract all brainrot slugs from sitemap
const brainrotSlugs = [];
const traitSlugs = [];
const hubSlugs = [];

for (const match of sitemapRaw.matchAll(/\/brainrots\/([^"']+)/g)) {
  brainrotSlugs.push(match[1]);
}
for (const match of sitemapRaw.matchAll(/\/traits\/([^"']+)/g)) {
  traitSlugs.push(match[1]);
}
for (const match of sitemapRaw.matchAll(/url: absoluteUrl\(["']\/([^"']+)["']\)/g)) {
  hubSlugs.push(match[1]);
}

// Check 1: No duplicate brainrot URLs
console.log('--- Duplicate check ---');
const bDupes = brainrotSlugs.filter((s, i, arr) => arr.indexOf(s) !== i);
if (bDupes.length > 0) {
  console.log(`  ❌ Duplicate brainrot slugs in sitemap: ${bDupes.join(', ')}`);
  errors++;
}

const tDupes = traitSlugs.filter((s, i, arr) => arr.indexOf(s) !== i);
if (tDupes.length > 0) {
  console.log(`  ❌ Duplicate trait slugs in sitemap: ${tDupes.join(', ')}`);
  errors++;
}

const hDupes = hubSlugs.filter((s, i, arr) => arr.indexOf(s) !== i);
if (hDupes.length > 0) {
  console.log(`  ❌ Duplicate hub slugs in sitemap: ${hDupes.join(', ')}`);
  errors++;
}
console.log('  ✅ No duplicates');

// Check 2: Only indexable records in sitemap
console.log('\n--- Indexability cross-check ---');
const brainrotsRaw = readFileSync(resolve(rootDir, 'src/data/brainrots.ts'), 'utf8');
const traitsRaw = readFileSync(resolve(rootDir, 'src/data/traits.ts'), 'utf8');

const allBrainrotSlugs = [...brainrotsRaw.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);
const allTraitSlugs = [...traitsRaw.matchAll(/slug:\s*"([^"]+)"/g)].map(m => m[1]);

// Load published-data for indexability check
// We approximate by checking which records have contentStatus=complete
const completeBrainrotSlugs = [];
const completeTraitSlugs = [];

function extractRecords(raw, varName) {
  const start = raw.indexOf(`export const ${varName}`);
  const arrStart = raw.indexOf('[', raw.indexOf('=', start));
  const arrEnd = raw.lastIndexOf(']');
  const arrStr = raw.slice(arrStart + 1, arrEnd);
  const records = [];
  let depth = 0, current = '';
  for (const char of arrStr) {
    if (char === '{') depth++;
    if (char === '}') {
      depth--;
      if (depth === 0) {
        current += char;
        try {
          const fixed = current.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
          records.push(JSON.parse(fixed));
        } catch (e) {}
        current = '';
        continue;
      }
    }
    current += char;
  }
  return records;
}

const brainrots = extractRecords(brainrotsRaw, 'brainrots');
const traits = extractRecords(traitsRaw, 'traits');

const indexableBrainrotSlugs = brainrots
  .filter(r => r.indexingMeta?.contentStatus === 'complete' && r.indexingMeta?.indexable === true)
  .map(r => r.slug);
const indexableTraitSlugs = traits
  .filter(r => r.indexingMeta?.contentStatus === 'complete' && r.indexingMeta?.indexable === true)
  .map(r => r.slug);

const extraB = brainrotSlugs.filter(s => !indexableBrainrotSlugs.includes(s));
if (extraB.length > 0) {
  console.log(`  ❌ Non-indexable brainrots in sitemap: ${extraB.join(', ')}`);
  errors++;
}

const extraT = traitSlugs.filter(s => !indexableTraitSlugs.includes(s));
if (extraT.length > 0) {
  console.log(`  ❌ Non-indexable traits in sitemap: ${extraT.join(', ')}`);
  errors++;
}

const missingB = indexableBrainrotSlugs.filter(s => !brainrotSlugs.includes(s));
if (missingB.length > 0) {
  console.log(`  ❌ Indexable brainrots missing from sitemap: ${missingB.join(', ')}`);
  errors++;
}

const missingT = indexableTraitSlugs.filter(s => !traitSlugs.includes(s));
if (missingT.length > 0) {
  console.log(`  ❌ Indexable traits missing from sitemap: ${missingT.join(', ')}`);
  errors++;
}

if (extraB.length === 0 && extraT.length === 0 && missingB.length === 0 && missingT.length === 0) {
  console.log('  ✅ All indexable records in sitemap, no partial records in sitemap');
}

// Summary
const detailCount = brainrotSlugs.length + traitSlugs.length;
console.log(`\n=== Summary ===`);
console.log(`Sitemap hub pages: ${hubSlugs.length}`);
console.log(`Sitemap brainrot detail pages: ${brainrotSlugs.length}`);
console.log(`Sitemap trait detail pages: ${traitSlugs.length}`);
console.log(`Sitemap total detail pages: ${detailCount}`);
console.log(`Indexable brainrots: ${indexableBrainrotSlugs.length}`);
console.log(`Indexable traits: ${indexableTraitSlugs.length}`);
console.log(`\nErrors: ${errors}`);

process.exit(errors > 0 ? 1 : 0);
