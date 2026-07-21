#!/usr/bin/env node
import { readFileSync } from 'fs';
import { resolve } from 'path';

function slugCount(file) {
  const src = readFileSync(resolve(file), 'utf8');
  return (src.match(/slug:\s*["'`]/g) || []).length;
}

function requireSlugCount(label, file, expected) {
  const count = slugCount(file);
  if (count !== expected) {
    throw new Error(`${label} slug count expected ${expected}, found ${count}`);
  }
  console.log(`${label} slug count: ${count} OK`);
}

requireSlugCount("Brainrot", "src/data/brainrots.ts", 69);
requireSlugCount("Trait", "src/data/traits.ts", 24);
requireSlugCount("Mutation", "src/data/mutations.ts", 14);

const brainrotsSrc = readFileSync(resolve("src/data/brainrots.ts"), 'utf8');
const traitsSrc = readFileSync(resolve("src/data/traits.ts"), 'utf8');

const completeBrainrots = (brainrotsSrc.match(/"contentStatus"\s*:\s*"complete"/g) || []).length;
const partialBrainrots = (brainrotsSrc.match(/"contentStatus"\s*:\s*"partial"/g) || []).length;
const hiddenBrainrots = (brainrotsSrc.match(/"contentStatus"\s*:\s*"hidden"/g) || []).length;

const completeTraits = (traitsSrc.match(/"contentStatus"\s*:\s*"complete"/g) || []).length;
const partialTraits = (traitsSrc.match(/"contentStatus"\s*:\s*"partial"/g) || []).length;
const hiddenTraits = (traitsSrc.match(/"contentStatus"\s*:\s*"hidden"/g) || []).length;

console.log('Brainrot status breakdown:');
console.log(`  Complete: ${completeBrainrots}`);
console.log(`  Partial: ${partialBrainrots}`);
console.log(`  Hidden: ${hiddenBrainrots}`);
console.log(`  Total: ${completeBrainrots + partialBrainrots + hiddenBrainrots}`);

console.log('Trait status breakdown:');
console.log(`  Complete: ${completeTraits}`);
console.log(`  Partial: ${partialTraits}`);
console.log(`  Hidden: ${hiddenTraits}`);
console.log(`  Total: ${completeTraits + partialTraits + hiddenTraits}`);

const todoInComplete = [...brainrotsSrc.matchAll(/contentStatus\s*:\s*"complete"[\s\S]*?indexingMeta:[\s\S]*?"(TODO|TBD|PLACEHOLDER):/g)];
if (todoInComplete.length > 0) {
  console.log(`ERROR: ${todoInComplete.length} TODO/TBD/PLACEHOLDER found in complete brainrot editorial fields`);
  process.exit(1);
}

const todoInTraits = [...traitsSrc.matchAll(/contentStatus\s*:\s*"complete"[\s\S]*?indexingMeta:[\s\S]*?"(TODO|TBD|PLACEHOLDER):/g)];
if (todoInTraits.length > 0) {
  console.log(`ERROR: ${todoInTraits.length} TODO/TBD/PLACEHOLDER found in complete trait editorial fields`);
  process.exit(1);
}

console.log('No TODO/TBD/PLACEHOLDER in complete records');
console.log('Data integrity verified');
