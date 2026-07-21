#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let errors = 0;

console.log('=== Sitemap Quality Check ===\n');

const sitemapPath = resolve('out/sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.log('  ERROR: out/sitemap.xml not found');
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, 'utf8');

const allUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const brainrotUrls = allUrls.filter(u => u.includes('/brainrots/'));
const traitUrls = allUrls.filter(u => u.includes('/traits/'));
const hubUrls = allUrls.filter(u => !u.includes('/brainrots/') && !u.includes('/traits/'));

console.log(`Sitemap URLs: ${allUrls.length} (${hubUrls.length} hub + ${brainrotUrls.length} brainrots + ${traitUrls.length} traits)`);

// Check 1: No duplicate URLs
const urlSet = new Set(allUrls);
if (urlSet.size !== allUrls.length) {
  console.log(`  ERROR: ${allUrls.length - urlSet.size} duplicate URLs`);
  errors++;
} else {
  console.log('  OK: No duplicate URLs');
}

// Check 2: Count in expected range
if (allUrls.length < 20 || allUrls.length > 35) {
  console.log(`  ERROR: Expected 20-35 URLs, got ${allUrls.length}`);
  errors++;
} else {
  console.log('  OK: Count in expected range (20-35)');
}

// Check 3: Hub pages present
const expectedHubs = ['/brainrots', '/traits', '/mutations', '/brainrot-index', '/best-brainrots', '/unblocked', '/admin-abuse', '/taco-tuesday', '/faq'];
for (const hub of expectedHubs) {
  if (!allUrls.some(u => u.includes(hub))) {
    console.log(`  WARNING: Hub ${hub} missing from sitemap`);
  }
}

// Check 4: Sitemap detail slugs listed
console.log('\nBrainrot detail slugs in sitemap:');
brainrotUrls.forEach(u => console.log(`  - ${u.split('/brainrots/')[1]}`));
console.log('Trait detail slugs in sitemap:');
traitUrls.forEach(u => console.log(`  - ${u.split('/traits/')[1]}`));

console.log(`\nErrors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
