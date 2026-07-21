#!/usr/bin/env node
import { loadRuntimeData } from "./load-runtime-data.mjs";

const {
  brainrots,
  traits,
  mutations,
  routeQuality,
  published,
} = await loadRuntimeData();

const placeholderPattern = /\b(TODO|TBD|PLACEHOLDER|FIXME|WIP)\b/i;
let errors = 0;
let paybackErrors = 0;
let mutationCalculationErrors = 0;

function fail(message) {
  console.log(`ERROR: ${message}`);
  errors++;
}

function countByStatus(records, status) {
  return records.filter((record) => record.indexingMeta?.contentStatus === status).length;
}

function stringsForRecord(record) {
  const editorial = record.indexingMeta?.editorial ?? {};
  return [
    record.overview,
    record.description,
    record.effect,
    record.conflictNote,
    ...(record.tips ?? []),
    ...Object.values(editorial),
  ].filter((value) => typeof value === "string");
}

function completeStrings(records) {
  return records
    .filter((record) => record.indexingMeta?.contentStatus === "complete")
    .flatMap(stringsForRecord);
}

function parseDisplayNumber(text) {
  const match = String(text).replace(/,/g, "").match(/([0-9]+(?:\.[0-9]+)?)\s*([KMB])?/i);
  if (!match) return null;
  const unit = (match[2] ?? "").toUpperCase();
  const multiplier = unit === "K" ? 1_000 : unit === "M" ? 1_000_000 : unit === "B" ? 1_000_000_000 : 1;
  return Number(match[1]) * multiplier;
}

function extractPaybackSeconds(tip) {
  const match = tip.match(/^Base payback time:\s*([0-9]+(?:\.[0-9]+)?)/i);
  return match ? Number(match[1]) : null;
}

function checkPayback(record) {
  if (!record.baseCostValue || !record.baseIncomeValue) return;
  const expected = record.baseCostValue / record.baseIncomeValue;
  for (const tip of record.tips ?? []) {
    const actual = extractPaybackSeconds(tip);
    if (actual === null) continue;
    if (Math.abs(actual - expected) > 1) {
      fail(`${record.slug}: payback tip ${actual}s does not match ${expected.toFixed(1)}s`);
      paybackErrors++;
    }
  }
}

function checkMutationCalculations(record) {
  if (!record.baseIncomeValue) return;
  const fields = stringsForRecord(record);
  for (const mutation of mutations) {
    if (!mutation.multiplierValue) continue;
    const escapedName = mutation.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const multiplierPattern = new RegExp(`${escapedName}\\s+mutation\\s*\\((\\d+(?:\\.\\d+)?)x\\)`, "i");
    const incomePattern = new RegExp(`${escapedName}\\s+mutation[^.\\n]*?(?:reaches|reach|to)\\s+([0-9]+(?:\\.[0-9]+)?\\s*[KMB]?)\\s*Cash/s`, "i");

    for (const value of fields) {
      const multiplierMatch = value.match(multiplierPattern);
      if (multiplierMatch) {
        const written = Number(multiplierMatch[1]);
        if (Math.abs(written - mutation.multiplierValue) > 0.001) {
          fail(`${record.slug}: ${mutation.name} multiplier text says ${written}x, data says ${mutation.multiplierValue}x`);
          mutationCalculationErrors++;
        }
      }

      const incomeMatch = value.match(incomePattern);
      if (incomeMatch) {
        const writtenIncome = parseDisplayNumber(incomeMatch[1]);
        const expectedIncome = record.baseIncomeValue * mutation.multiplierValue;
        if (writtenIncome !== null && Math.abs(writtenIncome - expectedIncome) > Math.max(1, expectedIncome * 0.01)) {
          fail(`${record.slug}: ${mutation.name} income text says ${incomeMatch[1]} Cash/s, expected ${expectedIncome}`);
          mutationCalculationErrors++;
        }
      }
    }
  }
}

function validateStatus(record, kind, isIndexable) {
  const status = record.indexingMeta?.contentStatus;
  const declaredIndexable = record.indexingMeta?.indexable;

  if (!status) fail(`${kind} ${record.slug}: missing contentStatus`);
  if (status === "complete" && declaredIndexable === false) fail(`${kind} ${record.slug}: complete but indexable=false`);
  if (status === "partial" && declaredIndexable === true) fail(`${kind} ${record.slug}: partial but indexable=true`);
  if (status === "hidden" && declaredIndexable === true) fail(`${kind} ${record.slug}: hidden but indexable=true`);
  if (status === "complete" && !isIndexable) fail(`${kind} ${record.slug}: complete record does not pass runtime quality gate`);
  if (status !== "complete" && isIndexable) fail(`${kind} ${record.slug}: non-complete record is in indexable set`);
  if (record.confidence === "low" && (status !== "partial" || declaredIndexable !== false)) {
    fail(`${kind} ${record.slug}: low confidence must be partial and indexable=false`);
  }
  if ((record.needsReview || record.conflictStatus === "unresolved") && isIndexable) {
    fail(`${kind} ${record.slug}: needsReview/unresolved conflict cannot be indexable`);
  }
  if (status === "complete" && record.conflictNote) {
    if (!["none", "resolved", "unresolved"].includes(record.conflictStatus ?? "")) {
      fail(`${kind} ${record.slug}: complete record with conflictNote must set conflictStatus`);
    }
  }
}

if (brainrots.length === 0) fail("brainrots import returned 0 records");
if (traits.length === 0) fail("traits import returned 0 records");
if (mutations.length === 0) fail("mutations import returned 0 records");

const tipFrequency = routeQuality.buildTipFrequency(brainrots);
const indexableBrainrotSlugs = new Set(published.indexableBrainrots.map((record) => record.slug));
const indexableTraitSlugs = new Set(published.indexableTraits.map((record) => record.slug));

for (const record of brainrots) {
  validateStatus(record, "Brainrot", indexableBrainrotSlugs.has(record.slug));
  checkPayback(record);
  checkMutationCalculations(record);
  const runtimeGate = routeQuality.isIndexableBrainrot(record, tipFrequency);
  if (runtimeGate !== indexableBrainrotSlugs.has(record.slug)) {
    fail(`Brainrot ${record.slug}: published indexable set disagrees with runtime gate`);
  }
}

for (const record of traits) {
  validateStatus(record, "Trait", indexableTraitSlugs.has(record.slug));
  const runtimeGate = routeQuality.isIndexableTrait(record);
  if (runtimeGate !== indexableTraitSlugs.has(record.slug)) {
    fail(`Trait ${record.slug}: published indexable set disagrees with runtime gate`);
  }
}

const completeText = [...completeStrings(brainrots), ...completeStrings(traits)];
const placeholderCount = completeText.filter((value) => placeholderPattern.test(value)).length;
if (placeholderCount > 0) fail(`${placeholderCount} TODO/TBD/PLACEHOLDER/FIXME/WIP strings found in complete records`);

const needsReviewCount = [...brainrots, ...traits].filter((record) => record.needsReview).length;
const lowConfidenceIndexableCount = [...brainrots, ...traits].filter(
  (record) => {
    if (record.confidence !== "low") return false;
    if ("baseIncomeValue" in record) return indexableBrainrotSlugs.has(record.slug);
    return indexableTraitSlugs.has(record.slug);
  }
).length;
if (lowConfidenceIndexableCount > 0) fail(`${lowConfidenceIndexableCount} low-confidence records are indexable`);

console.log("Data:");
console.log(`- total brainrots: ${brainrots.length}`);
console.log(`- complete brainrots: ${countByStatus(brainrots, "complete")}`);
console.log(`- partial brainrots: ${countByStatus(brainrots, "partial")}`);
console.log(`- hidden brainrots: ${countByStatus(brainrots, "hidden")}`);
console.log(`- indexable brainrots: ${indexableBrainrotSlugs.size}`);
console.log(`- total traits: ${traits.length}`);
console.log(`- complete traits: ${countByStatus(traits, "complete")}`);
console.log(`- partial traits: ${countByStatus(traits, "partial")}`);
console.log(`- hidden traits: ${countByStatus(traits, "hidden")}`);
console.log(`- indexable traits: ${indexableTraitSlugs.size}`);
console.log(`- total mutations: ${mutations.length}`);
console.log(`- placeholder count: ${placeholderCount}`);
console.log(`- needsReview count: ${needsReviewCount}`);
console.log(`- low-confidence indexable count: ${lowConfidenceIndexableCount}`);
console.log(`- payback errors: ${paybackErrors}`);
console.log(`- mutation calculation errors: ${mutationCalculationErrors}`);

if (errors > 0) {
  console.log(`\nData integrity errors: ${errors}`);
  process.exit(1);
}

console.log("\nData integrity verified");
