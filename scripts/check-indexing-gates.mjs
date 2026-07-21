#!/usr/bin/env node
/**
 * check-indexing-gates.mjs
 * Verifies indexing quality gates by inspecting built output.
 * Must run after `npm run build`.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

let errors = 0;
let warnings = 0;

console.log('=== Indexing Gate Validation ===\n');

// ── Check sitemap from built output ─────────────────────────────────────
const sitemapPath = resolve(rootDir, 'out/sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.log('  ❌ out/sitemap.xml not found — run `npm run build` first');
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, 'utf8');
const allUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const brainrotUrls = allUrls.filter(u => u.includes('/brainrots/'));
const traitUrls = allUrls.filter(u => u.includes('/traits/'));
const hubUrls = allUrls.filter(u => !u.includes('/brainrots/') && !u.includes('/traits/'));

console.log(`Sitemap URLs: ${allUrls.length}`);
console.log(`  Hub: ${hubUrls.length}`);
console.log(`  Brainrot detail: ${brainrotUrls.length}`);
console.log(`  Trait detail: ${traitUrls.length}`);

if (allUrls.length < 20 || allUrls.length > 35) {
  console.log(`  ❌ Expected 20-35 sitemap URLs, got ${allUrls.length}`);
  errors++;
}

// ── Check built HTML for robots meta ────────────────────────────────────
console.log('\n--- Robots meta check ---');

// Sample a complete brainrot
const completeSample = readFileSync(resolve(rootDir, 'out/brainrots/sigma-boy.html'), 'utf8');
const partialSample = readFileSync(resolve(rootDir, 'out/brainrots/noobini-pizzanini.html'), 'utf8');

const completeRobots = completeSample.match(/<meta name="robots" content="([^"]+)"/)?.[1];
const partialRobots = partialSample.match(/<meta name="robots" content="([^"]+)"/)?.[1];

console.log(`  Complete (sigma-boy): robots = "${completeRobots}"`);
console.log(`  Partial (noobini-pizzanini): robots = "${partialRobots}"`);

if (completeRobots !== 'index, follow') {
  console.log(`  ❌ Complete page should have robots="index, follow"`);
  errors++;
}
if (partialRobots !== 'noindex, follow') {
  console.log(`  ❌ Partial page should have robots="noindex, follow"`);
  errors++;
}

// ── Check partial notice in HTML ─────────────────────────────────────────
if (partialSample.includes('not yet passed the editorial quality gate')) {
  console.log('  ✅ Partial page has editorial gate notice');
} else {
  console.log('  ❌ Partial page missing editorial gate notice');
  errors++;
}

// ── Check /brainrots list page has no sr-only link dump ──────────────────
const brainrotsPage = readFileSync(resolve(rootDir, 'out/brainrots.html'), 'utf8');
const srOnlyCount = (brainrotsPage.match(/sr-only/g) || []).length;
if (srOnlyCount > 0) {
  console.log(`\n  ❌ /brainrots page has ${srOnlyCount} sr-only references`);
  errors++;
} else {
  console.log('\n  ✅ /brainrots page has no sr-only elements');
}

// Check Featured section exists
if (brainrotsPage.includes('Featured')) {
  console.log('  ✅ /brainrots page has Featured section');
} else {
  console.log('  ⚠️ /brainrots page missing Featured section');
  warnings++;
}

// ── Check og:title consistency ──────────────────────────────────────────
const completeOgTitle = completeSample.match(/<meta property="og:title" content="([^"]+)"/)?.[1];
const completeTitle = completeSample.match(/<title>([^<]+)<\/title>/)?.[1];
console.log(`\n  Complete title: "${completeTitle}"`);
console.log(`  Complete og:title: "${completeOgTitle}"`);
if (!completeTitle?.includes(completeOgTitle?.split('|')[0]?.trim() || '')) {
  console.log('  ⚠️ og:title does not match page title');
  warnings++;
}

// ── Summary ──────────────────────────────────────────────────────────────
console.log('\n=== Summary ===');
console.log(`Sitemap: ${allUrls.length} URLs`);
console.log(`Brainrot slugs in sitemap:`);
brainrotUrls.forEach(u => console.log(`  - ${u.split('/brainrots/')[1]}`));
console.log(`Trait slugs in sitemap:`);
traitUrls.forEach(u => console.log(`  - ${u.split('/traits/')[1]}`));
console.log(`\nErrors: ${errors}, Warnings: ${warnings}`);

process.exit(errors > 0 ? 1 : 0);
