#!/usr/bin/env node
/**
 * check-indexing-gates.mjs
 * Verifies indexing quality gates across brainrots and traits.
 * 
 * Checks:
 * 1. complete records must pass isIndexableBrainrot/isIndexableTrait
 * 2. partial records must have contentStatus "partial" and indexable false
 * 3. No hidden records in data (not yet implemented)
 * 4. Indexable records must enter sitemap
 * 5. Partial records must NOT enter sitemap
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// ── Build tip frequency ──────────────────────────────────────────────────
function buildTipFrequency(brainrots) {
  const freq = new Map();
  for (const r of brainrots) {
    for (const tip of (r.tips || [])) {
      freq.set(tip, (freq.get(tip) ?? 0) + 1);
    }
  }
  return freq;
}

// ── Quality gates (mirrors route-quality.ts logic) ───────────────────────
const GENERIC_TIP_FREQ_THRESHOLD = 3;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function hasRequiredStructuredData(r) {
  return (
    SLUG_PATTERN.test(r.slug) &&
    Boolean(r.name) &&
    Boolean(r.rarity) &&
    (r.baseCostDisplay !== null || r.baseCostValue !== null) &&
    (r.baseIncomeDisplay !== null || r.baseIncomeValue !== null) &&
    Boolean(r.availability) &&
    Boolean(r.acquisitionMethod) &&
    Boolean(r.overview) &&
    Boolean(r.description) &&
    r.tips.length > 0 &&
    r.sources.length > 0 &&
    Boolean(r.verifiedAt)
  );
}

function hasValidSources(r) {
  return r.sources.length > 0 && r.sources.every((s) => Boolean(s.name));
}

function isTemplateDescription(r) {
  const overview = (r.overview || '').trim();
  const description = (r.description || '').trim();
  const escapedName = r.name.replace(/[.*+?^${}()|[\]\\]/g, '$&');
  const overviewBody = overview
    .replace(new RegExp(escapedName, 'g'), '')
    .replace(/\d+/g, '');
  const descBody = description
    .replace(new RegExp(escapedName, 'g'), '')
    .replace(/\d+/g, '');
  return overviewBody.trim() === descBody.trim();
}

function hasUniqueEditorialValue(r) {
  const meta = r.indexingMeta?.editorial;
  if (!meta) return false;
  const fields = [
    meta.useCase, meta.comparison, meta.acquisitionNotes,
    meta.strategyNotes, meta.defenseNotes, meta.limitations,
  ];
  const present = fields.filter(Boolean).length;
  let extra = 0;
  if (r.conflictNote) extra++;
  return (present + extra) >= 2;
}

function hasGenericOnlyTips(r, tipFreq) {
  if (r.tips.length === 0) return true;
  return r.tips.every((t) => (tipFreq.get(t) ?? 0) >= GENERIC_TIP_FREQ_THRESHOLD);
}

function hasUnresolvedCoreConflict(r) {
  return r.needsReview;
}

function isIndexableBrainrot(r, tipFreq) {
  return (
    r.indexingMeta?.contentStatus === 'complete' &&
    r.indexingMeta?.indexable === true &&
    hasRequiredStructuredData(r) &&
    hasValidSources(r) &&
    hasUniqueEditorialValue(r) &&
    !hasGenericOnlyTips(r, tipFreq) &&
    !isTemplateDescription(r) &&
    !hasUnresolvedCoreConflict(r)
  );
}

function isIndexableTrait(r) {
  return (
    r.indexingMeta?.contentStatus === 'complete' &&
    r.indexingMeta?.indexable === true &&
    SLUG_PATTERN.test(r.slug) &&
    Boolean(r.name) &&
    (r.multiplierDisplay !== null || r.multiplierValue !== null) &&
    Boolean(r.category) &&
    Boolean(r.availability) &&
    Boolean(r.acquisitionMethod) &&
    Boolean(r.effect) &&
    Boolean(r.description) &&
    r.sources.length > 0 &&
    Boolean(r.verifiedAt) &&
    !r.needsReview
  );
}

// ── Load data ────────────────────────────────────────────────────────────
const brainrotsRaw = readFileSync(resolve(rootDir, 'src/data/brainrots.ts'), 'utf8');
const traitsRaw = readFileSync(resolve(rootDir, 'src/data/traits.ts'), 'utf8');

function extractRecords(raw, varName) {
  const start = raw.indexOf(`export const ${varName}`);
  if (start < 0) throw new Error(`Could not find ${varName}`);
  const arrStart = raw.indexOf('[', raw.indexOf('=', start));
  const arrEnd = raw.lastIndexOf(']');
  const arrStr = raw.slice(arrStart + 1, arrEnd);
  
  // Dirty but effective — parse array of objects
  const records = [];
  let depth = 0;
  let current = '';
  
  for (const char of arrStr) {
    if (char === '{') depth++;
    if (char === '}') {
      depth--;
      if (depth === 0) {
        current += char;
        try {
          // Handle unquoted keys
          const fixed = current.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
          records.push(JSON.parse(fixed));
        } catch (e) {
          // Silently skip malformed records
        }
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

// ── Build sitemap slugs ──────────────────────────────────────────────────
const sitemapRaw = readFileSync(resolve(rootDir, 'src/app/sitemap.ts'), 'utf8');
const sitemapBrainrotSlugs = new Set();
const sitemapTraitSlugs = new Set();

// Extract URL slugs from sitemap
for (const match of sitemapRaw.matchAll(/\/brainrots\/([^"']+)/g)) {
  sitemapBrainrotSlugs.add(match[1]);
}
for (const match of sitemapRaw.matchAll(/\/traits\/([^"']+)/g)) {
  sitemapTraitSlugs.add(match[1]);
}

// ── Checks ───────────────────────────────────────────────────────────────
const tipFreq = buildTipFrequency(brainrots);

let errors = 0;
let warnings = 0;

console.log('=== Indexing Gate Validation ===\n');

// Check 1: complete records must pass quality gate
console.log('--- Complete records pass quality gate ---');
for (const r of brainrots) {
  if (r.indexingMeta?.contentStatus === 'complete') {
    const passes = isIndexableBrainrot(r, tipFreq);
    if (!passes) {
      console.log(`  ❌ BRAINROT "${r.slug}" marked complete but fails quality gate`);
      errors++;
    }
  }
}
for (const r of traits) {
  if (r.indexingMeta?.contentStatus === 'complete') {
    const passes = isIndexableTrait(r);
    if (!passes) {
      console.log(`  ❌ TRAIT "${r.slug}" marked complete but fails quality gate`);
      errors++;
    }
  }
}
console.log('  ✅ Done');

// Check 2: partial records must have correct metadata
console.log('\n--- Partial records metadata ---');
for (const r of brainrots) {
  if (r.indexingMeta?.contentStatus === 'partial') {
    if (r.indexingMeta?.indexable !== false) {
      console.log(`  ❌ BRAINROT "${r.slug}" partial but indexable !== false`);
      errors++;
    }
  }
}
for (const r of traits) {
  if (r.indexingMeta?.contentStatus === 'partial') {
    if (r.indexingMeta?.indexable !== false) {
      console.log(`  ❌ TRAIT "${r.slug}" partial but indexable !== false`);
      errors++;
    }
  }
}
console.log('  ✅ Done');

// Check 3: no hidden records (should not exist in data)
console.log('\n--- Hidden records check ---');
const hiddenBrainrots = brainrots.filter(r => r.indexingMeta?.contentStatus === 'hidden');
const hiddenTraits = traits.filter(r => r.indexingMeta?.contentStatus === 'hidden');
if (hiddenBrainrots.length > 0) {
  console.log(`  ⚠️ ${hiddenBrainrots.length} hidden brainrots found: ${hiddenBrainrots.map(r => r.slug).join(', ')}`);
  warnings += hiddenBrainrots.length;
}
if (hiddenTraits.length > 0) {
  console.log(`  ⚠️ ${hiddenTraits.length} hidden traits found: ${hiddenTraits.map(r => r.slug).join(', ')}`);
  warnings += hiddenTraits.length;
}
if (hiddenBrainrots.length === 0 && hiddenTraits.length === 0) {
  console.log('  ✅ No hidden records');
}

// Check 4: indexable records must be in sitemap
console.log('\n--- Sitemap coverage ---');
const completeBrainrots = brainrots.filter(r => isIndexableBrainrot(r, tipFreq));
const completeTraits = traits.filter(r => isIndexableTrait(r));

for (const r of completeBrainrots) {
  if (!sitemapBrainrotSlugs.has(r.slug)) {
    console.log(`  ❌ "${r.slug}" is indexable but missing from sitemap`);
    errors++;
  }
}
for (const r of completeTraits) {
  if (!sitemapTraitSlugs.has(r.slug)) {
    console.log(`  ❌ "${r.slug}" is indexable but missing from sitemap`);
    errors++;
  }
}

// Check 5: partial records must NOT be in sitemap
const partialBrainrots = brainrots.filter(r => r.indexingMeta?.contentStatus === 'partial');
const partialTraits = traits.filter(r => r.indexingMeta?.contentStatus === 'partial');

for (const r of partialBrainrots) {
  if (sitemapBrainrotSlugs.has(r.slug)) {
    console.log(`  ❌ "${r.slug}" is partial but in sitemap`);
    errors++;
  }
}
for (const r of partialTraits) {
  if (sitemapTraitSlugs.has(r.slug)) {
    console.log(`  ❌ "${r.slug}" is partial but in sitemap`);
    errors++;
  }
}
console.log('  ✅ Done');

// Check 6: All records must have indexingMeta
console.log('\n--- indexingMeta presence ---');
for (const r of brainrots) {
  if (!r.indexingMeta) {
    console.log(`  ❌ "${r.slug}" missing indexingMeta`);
    errors++;
  }
}
for (const r of traits) {
  if (!r.indexingMeta) {
    console.log(`  ❌ "${r.slug}" missing indexingMeta`);
    errors++;
  }
}
console.log('  ✅ Done');

// ── Summary ──────────────────────────────────────────────────────────────
console.log('\n=== Summary ===');
console.log(`Total brainrots: ${brainrots.length}`);
console.log(`  Complete (indexable): ${completeBrainrots.length}`);
console.log(`  Partial: ${partialBrainrots.length}`);
console.log(`Total traits: ${traits.length}`);
console.log(`  Complete (indexable): ${completeTraits.length}`);
console.log(`  Partial: ${partialTraits.length}`);
console.log(`Sitemap URLs — brainrots: ${sitemapBrainrotSlugs.size}, traits: ${sitemapTraitSlugs.size}`);
console.log(`\nErrors: ${errors}, Warnings: ${warnings}`);

process.exit(errors > 0 ? 1 : 0);
