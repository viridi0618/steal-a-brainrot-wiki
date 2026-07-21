import fs from "node:fs";
import path from "node:path";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function read(file) {
  return fs.readFileSync(path.resolve(file), "utf8");
}

function extractArray(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`Missing export ${exportName}`);
  const assignment = source.indexOf("=", start);
  const open = source.indexOf("[", assignment);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;
    if (depth === 0) return source.slice(open, index + 1);
  }
  throw new Error(`Could not parse array ${exportName}`);
}

function extractObjects(arraySource) {
  const objects = [];
  let depth = 0;
  let start = -1;
  for (let index = 0; index < arraySource.length; index += 1) {
    const char = arraySource[index];
    if (char === "{") {
      if (depth === 0) start = index;
      depth += 1;
    }
    if (char === "}") {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        objects.push(arraySource.slice(start, index + 1));
        start = -1;
      }
    }
  }
  return objects;
}

function field(objectSource, name) {
  const patterns = [
    new RegExp(`${name}:\\s*"([^"]*)"`),
    new RegExp(`${name}:\\s*\`([\\s\\S]*?)\``),
    new RegExp(`${name}:\\s*(null|true|false|[-0-9.]+)`),
  ];
  for (const pattern of patterns) {
    const match = objectSource.match(pattern);
    if (match) return match[1];
  }
  return undefined;
}

function numberField(objectSource, name) {
  const value = field(objectSource, name);
  if (value === undefined || value === "null") return null;
  return Number(value);
}

function requireCount(label, records, expected) {
  if (records.length !== expected) {
    throw new Error(`${label} count expected ${expected}, found ${records.length}`);
  }
}

function requireUniqueSafeSlugs(label, records) {
  const seen = new Set();
  for (const record of records) {
    if (!record.slug || !slugPattern.test(record.slug)) {
      throw new Error(`${label} has unsafe slug: ${record.slug}`);
    }
    if (seen.has(record.slug)) {
      throw new Error(`${label} has duplicate slug: ${record.slug}`);
    }
    seen.add(record.slug);
  }
}

function parseRecords(file, exportName) {
  const objects = extractObjects(extractArray(read(file), exportName));
  return objects.map((objectSource) => ({
    source: objectSource,
    slug: field(objectSource, "slug"),
    name: field(objectSource, "name"),
    rarity: field(objectSource, "rarity"),
    baseCostDisplay: field(objectSource, "baseCostDisplay"),
    baseIncomeDisplay: field(objectSource, "baseIncomeDisplay"),
    multiplierDisplay: field(objectSource, "multiplierDisplay"),
    spawnRateDisplay: field(objectSource, "spawnRateDisplay"),
    multiplierValue: numberField(objectSource, "multiplierValue"),
    spawnRateValue: numberField(objectSource, "spawnRateValue"),
    availability: field(objectSource, "availability"),
    acquisitionMethod: field(objectSource, "acquisitionMethod"),
    verifiedAt: field(objectSource, "verifiedAt"),
    overview: field(objectSource, "overview"),
    description: field(objectSource, "description"),
  }));
}

function parseDisplayNumber(display) {
  if (!display || display === "null") return null;
  const match = display.match(/~?([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return null;
  return Number(match[1]);
}

const brainrots = parseRecords("src/data/brainrots.ts", "brainrots");
const traits = parseRecords("src/data/traits.ts", "traits");
const mutations = parseRecords("src/data/mutations.ts", "mutations");

requireCount("Brainrot", brainrots, 69);
requireCount("Trait", traits, 24);
requireCount("Mutation", mutations, 14);
requireUniqueSafeSlugs("Brainrot", brainrots);
requireUniqueSafeSlugs("Trait", traits);
requireUniqueSafeSlugs("Mutation", mutations);

for (const record of brainrots) {
  for (const required of ["name", "rarity", "baseCostDisplay", "baseIncomeDisplay", "availability", "acquisitionMethod", "verifiedAt", "overview", "description"]) {
    if (!record[required] || record[required] === "null") {
      throw new Error(`Brainrot ${record.slug} missing ${required}`);
    }
  }
  const otherName = brainrots.find((other) => (
    other.slug !== record.slug &&
    other.name &&
    record.overview?.includes(other.name) &&
    !record.name?.includes(other.name)
  ));
  if (otherName) {
    throw new Error(`Brainrot ${record.slug} overview contains another Brainrot name: ${otherName.name}`);
  }
  if (/\bCash\b/.test(record.overview ?? "") && !record.overview?.includes(record.baseCostDisplay ?? "")) {
    throw new Error(`Brainrot ${record.slug} overview mentions cost but not its own baseCostDisplay.`);
  }
  if (/Cash\/s/.test(record.overview ?? "") && !record.overview?.includes(record.baseIncomeDisplay ?? "")) {
    throw new Error(`Brainrot ${record.slug} overview mentions income but not its own baseIncomeDisplay.`);
  }
  const duplicateOverview = brainrots.find((other) => (
    other.slug !== record.slug &&
    other.overview === record.overview
  ));
  if (duplicateOverview) {
    throw new Error(`Brainrot ${record.slug} duplicates overview from ${duplicateOverview.slug}.`);
  }
  const duplicateDescription = brainrots.find((other) => (
    other.slug !== record.slug &&
    other.description === record.description &&
    !record.description?.includes(record.name ?? "")
  ));
  if (duplicateDescription) {
    throw new Error(`Brainrot ${record.slug} duplicates description from ${duplicateDescription.slug}.`);
  }
  if (!record.source.includes("tips: [")) {
    throw new Error(`Brainrot ${record.slug} missing tips array.`);
  }
  if (!record.source.includes("sources: [")) {
    throw new Error(`Brainrot ${record.slug} missing sources.`);
  }
}

for (const record of traits) {
  for (const required of ["name", "multiplierDisplay", "availability", "acquisitionMethod", "verifiedAt", "description"]) {
    if (!record[required] || record[required] === "null") {
      throw new Error(`Trait ${record.slug} missing ${required}`);
    }
  }
  if (!record.source.includes("effect:")) {
    throw new Error(`Trait ${record.slug} missing effect.`);
  }
}

for (const record of mutations) {
  for (const required of ["name", "multiplierDisplay", "availability", "acquisitionMethod", "verifiedAt", "description"]) {
    if (!record[required] || record[required] === "null") {
      throw new Error(`Mutation ${record.slug} missing ${required}`);
    }
  }
  if (record.spawnRateValue !== null) {
    const displayNumber = parseDisplayNumber(record.spawnRateDisplay);
    if (displayNumber === null || Math.abs(displayNumber - record.spawnRateValue) > 0.001) {
      throw new Error(`Mutation ${record.slug} spawn rate display/value mismatch.`);
    }
  }
}

console.log(`Data integrity verified: ${brainrots.length} brainrots, ${traits.length} traits, ${mutations.length} mutations.`);
