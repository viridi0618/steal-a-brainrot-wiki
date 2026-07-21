#!/usr/bin/env node
/**
 * check-content-duplicates.mjs
 * Detects duplicate/repeated tips, descriptions, and template content across records.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const brainrotsRaw = readFileSync(resolve(rootDir, 'src/data/brainrots.ts'), 'utf8');
const traitsRaw = readFileSync(resolve(rootDir, 'src/data/traits.ts'), 'utf8');

function extractRecords(raw, varName) {
  const start = raw.indexOf(`export const ${varName}`);
  const arrStart = raw.indexOf('[', raw.indexOf('=', start));
  const arrEnd = raw.lastIndexOf(']');
  const arrStr = raw.slice(arrStart + 1, arrEnd);
  
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
          const fixed = current.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
          records.push(JSON.parse(fixed));
        } catch (e) { /* skip */ }
        current = '';
        continue;
      }
    }
    current += char;
  }
  return records;
}

const brainrots = extractRecords(brainrotsRaw, 'brainrots');

let errors = 0;

console.log('=== Content Duplicate Check ===\n');

// Check 1: Duplicate tips across records (same text in ≥3 records)
console.log('--- Duplicate tips (appearing in ≥3 brainrots) ---');
const tipFreq = new Map();
for (const r of brainrots) {
  for (const tip of (r.tips || [])) {
    if (!tipFreq.has(tip)) tipFreq.set(tip, new Set());
    tipFreq.get(tip).add(r.slug);
  }
}

for (const [tip, slugs] of tipFreq) {
  if (slugs.size >= 3) {
    console.log(`  ⚠️ tip "${tip}" repeats in ${slugs.size} records`);
    console.log(`     slugs: ${[...slugs].slice(0, 5).join(', ')}${slugs.size > 5 ? '...' : ''}`);
    errors++;
  }
}

// Check 2: Template descriptions (overview ≈ description)
console.log('\n--- Template descriptions (overview ≈ description) ---');
for (const r of brainrots) {
  const overview = (r.overview || '').trim();
  const description = (r.description || '').trim();
  const escapedName = (r.name || '').replace(/[.*+?^${}()|[\]\\]/g, '$&');
  
  const ovBody = overview.replace(new RegExp(escapedName, 'g'), '').replace(/\d+/g, '').trim();
  const descBody = description.replace(new RegExp(escapedName, 'g'), '').replace(/\d+/g, '').trim();
  
  if (ovBody && descBody && ovBody === descBody) {
    console.log(`  ⚠️ "${r.slug}" — overview and description are essentially the same (name/numbers removed)`);
    errors++;
  }
}

// Check 3: Description only restates stats
console.log('\n--- Descriptions that only restate stats ---');
for (const r of brainrots) {
  const desc = (r.description || '').toLowerCase();
  if (desc.length < 50) {
    console.log(`  ⚠️ "${r.slug}" — description is very short (${desc.length} chars)`);
    errors++;
  }
}

// Check 4: Records with no tips
console.log('\n--- Records with no tips ---');
for (const r of brainrots) {
  if (!r.tips || r.tips.length === 0) {
    console.log(`  ⚠️ "${r.slug}" has no tips`);
    errors++;
  }
}

console.log(`\nTotal errors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
