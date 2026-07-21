#!/usr/bin/env node
import { loadRuntimeData } from "./load-runtime-data.mjs";

const { brainrots } = await loadRuntimeData();
let errors = 0;

console.log("=== Content Duplicate Check ===");
console.log(`Total brainrots imported: ${brainrots.length}`);

if (brainrots.length === 0) {
  console.log("ERROR: runtime brainrot import returned 0 records");
  process.exit(1);
}

const tipFreq = new Map();
for (const record of brainrots) {
  for (const tip of record.tips ?? []) {
    tipFreq.set(tip, (tipFreq.get(tip) ?? 0) + 1);
  }
}

const duplicateGroups = [...tipFreq.entries()]
  .filter(([, count]) => count >= 3)
  .map(([tip, count]) => ({
    tip,
    count,
    offenders: brainrots.filter((record) => record.tips?.includes(tip)).map((record) => record.slug),
  }));

console.log(`Duplicate tip groups (3+ records): ${duplicateGroups.length}`);
for (const group of duplicateGroups) {
  const indexableOffenders = group.offenders.filter((slug) => {
    const record = brainrots.find((item) => item.slug === slug);
    return record?.indexingMeta?.contentStatus === "complete" && record?.indexingMeta?.indexable === true;
  });
  console.log(`- "${group.tip}" (${group.count} records): ${group.offenders.slice(0, 5).join(", ")}${group.offenders.length > 5 ? ", ..." : ""}`);
  if (indexableOffenders.length > 0) {
    console.log(`  ERROR: duplicate generic tip appears on complete/indexable candidates: ${indexableOffenders.join(", ")}`);
    errors++;
  }
}

const noTips = brainrots.filter((record) => !record.tips || record.tips.length === 0);
if (noTips.length > 0) {
  console.log(`ERROR: records with no tips: ${noTips.map((record) => record.slug).join(", ")}`);
  errors += noTips.length;
} else {
  console.log("Records with no tips: 0");
}

console.log(`Errors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
