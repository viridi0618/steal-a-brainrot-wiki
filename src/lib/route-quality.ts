import type { BrainrotRecord, TraitRecord } from "./types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isUrlSafeSlug(slug: string) {
  return slugPattern.test(slug);
}

// Track repeated tips across records to detect generic content
export function buildTipFrequency(brainrots: BrainrotRecord[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const r of brainrots) {
    for (const tip of r.tips) {
      freq.set(tip, (freq.get(tip) ?? 0) + 1);
    }
  }
  return freq;
}

const GENERIC_TIP_FREQ_THRESHOLD = 3;

function hasGenericOnlyTips(brainrot: BrainrotRecord, tipFreq?: Map<string, number>): boolean {
  if (brainrot.tips.length === 0) return true;
  if (!tipFreq) return false;
  // Only fail if EVERY tip is repeated in ≥ GENERIC_TIP_FREQ_THRESHOLD records
  return brainrot.tips.every(
    (t) => (tipFreq.get(t) ?? 0) >= GENERIC_TIP_FREQ_THRESHOLD
  );
}

function hasRequiredStructuredData(record: BrainrotRecord): boolean {
  return (
    isUrlSafeSlug(record.slug) &&
    Boolean(record.name) &&
    Boolean(record.rarity) &&
    (record.baseCostDisplay !== null || record.baseCostValue !== null) &&
    (record.baseIncomeDisplay !== null || record.baseIncomeValue !== null) &&
    Boolean(record.availability) &&
    Boolean(record.acquisitionMethod) &&
    Boolean(record.overview) &&
    Boolean(record.description) &&
    record.tips.length > 0 &&
    record.sources.length > 0 &&
    Boolean(record.verifiedAt)
  );
}

function hasValidSources(record: BrainrotRecord): boolean {
  return record.sources.length > 0 && record.sources.every((s) => Boolean(s.name));
}

function isTemplateDescription(record: BrainrotRecord): boolean {
  const overview = record.overview.trim();
  const description = record.description.trim();

  // Same text body with different name/numbers = template
  const overviewBody = overview.replace(new RegExp(record.name.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&'), 'g'), '').replace(/\d+/g, '');
  const descBody = description.replace(new RegExp(record.name.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&'), 'g'), '').replace(/\d+/g, '');

  if (overviewBody.trim() === descBody.trim()) return true;
  return false;
}

function hasUniqueEditorialValue(record: BrainrotRecord): boolean {
  const meta = record.indexingMeta?.editorial;
  if (!meta) return false;

  const fields = [
    meta.useCase,
    meta.comparison,
    meta.acquisitionNotes,
    meta.strategyNotes,
    meta.defenseNotes,
    meta.limitations,
  ];

  const meaningful = fields.filter(isMeaningfulEditorialField).length;

  // Also count natural editorial signals in existing data
  let extra = 0;
  if (record.conflictNote) extra++;

  return (meaningful + extra) >= 2;
}

// Blocks TODO/TBD/placeholder strings from counting as real editorial value
const PLACEHOLDER_PREFIXES = /^(TODO|TBD|PLACEHOLDER|FIXME|WIP)[: ]/i;
const MIN_EDITORIAL_LENGTH = 30;

function isMeaningfulEditorialField(value: string | undefined | null): boolean {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < MIN_EDITORIAL_LENGTH) return false;
  if (PLACEHOLDER_PREFIXES.test(trimmed)) return false;
  return true;
}

function hasUnresolvedCoreConflict(record: BrainrotRecord): boolean {
  return record.needsReview;
}

export function isIndexableBrainrot(
  record: BrainrotRecord,
  tipFreq?: Map<string, number>
): boolean {
  return (
    record.indexingMeta.contentStatus === "complete" &&
    record.indexingMeta.indexable === true &&
    hasRequiredStructuredData(record) &&
    hasValidSources(record) &&
    hasUniqueEditorialValue(record) &&
    !hasGenericOnlyTips(record, tipFreq) &&
    !isTemplateDescription(record) &&
    !hasUnresolvedCoreConflict(record)
  );
}

export function isIndexableTrait(record: TraitRecord): boolean {
  const meta = record.indexingMeta?.editorial;
  const editorialFields = meta
    ? [meta.useCase, meta.comparison, meta.strategyNotes, meta.limitations, meta.acquisitionNotes]
    : [];
  const editorialCount = editorialFields.filter(isMeaningfulEditorialField).length;

  return (
    record.indexingMeta.contentStatus === "complete" &&
    record.indexingMeta.indexable === true &&
    isUrlSafeSlug(record.slug) &&
    Boolean(record.name) &&
    (record.multiplierDisplay !== null || record.multiplierValue !== null) &&
    Boolean(record.category) &&
    Boolean(record.availability) &&
    Boolean(record.acquisitionMethod) &&
    Boolean(record.effect) &&
    Boolean(record.description) &&
    record.sources.length > 0 &&
    Boolean(record.verifiedAt) &&
    !record.needsReview &&
    editorialCount >= 2
  );
}
