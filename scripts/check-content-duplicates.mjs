#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve } from 'path';

const brainrotsSrc = readFileSync(resolve('src/data/brainrots.ts'), 'utf8');

const records = [];
const tipsRe = /slug:\s*"([^"]+)"[\s\S]*?tips:\s*\[([\s\S]*?)\]/g;
let m;
while ((m = tipsRe.exec(brainrotsSrc)) !== null) {
  const slug = m[1];
  const tipsRaw = m[2];
  const tips = [...tipsRaw.matchAll(/"([^"]+)"/g)].map(t => t[1]);
  records.push({ slug, tips });
}

console.log('=== Content Duplicate Check ===');
console.log(`Total brainrots parsed: ${records.length}`);

let errors = 0;
let warnings = 0;

if (records.length < 60) {
  console.log(`  ERROR: Expected 60+ brainrots, got ${records.length}`);
  errors++;
}

// Build tip frequency
const tipFreq = new Map();
for (const r of records) {
  for (const tip of r.tips) {
    tipFreq.set(tip, (tipFreq.get(tip) ?? 0) + 1);
  }
}

// Find duplicate tips (in >= 3 records)
console.log('\n--- Duplicate tips (3+ records) ---');
let dupCount = 0;
for (const [tip, count] of tipFreq) {
  if (count >= 3) {
    dupCount++;
    const offenders = records.filter(r => r.tips.includes(tip)).map(r => r.slug);
    console.log(`  WARNING: "${tip}" — ${count} records: ${offenders.slice(0, 3).join(', ')}...`);
  }
}
if (dupCount === 0) console.log('  OK: No tips repeated in 3+ records');
else console.log(`  Found ${dupCount} duplicate tip groups (WARNING only — partial records)`);

// Find records with zero tips
console.log('\n--- Records with no tips ---');
const noTips = records.filter(r => r.tips.length === 0);
if (noTips.length > 0) {
  noTips.forEach(r => console.log(`  WARNING: "${r.slug}" has no tips`));
  warnings += noTips.length;
} else {
  console.log('  OK: All records have tips');
}

console.log(`\nErrors: ${errors}, Warnings: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
