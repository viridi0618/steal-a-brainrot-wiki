import type { BrainrotRecord, TraitRecord } from "./types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isUrlSafeSlug(slug: string) {
  return slugPattern.test(slug);
}

export function isIndexableBrainrot(record: BrainrotRecord) {
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

export function isIndexableTrait(record: TraitRecord) {
  return (
    isUrlSafeSlug(record.slug) &&
    Boolean(record.name) &&
    (record.multiplierDisplay !== null || record.multiplierValue !== null) &&
    Boolean(record.category) &&
    Boolean(record.availability) &&
    Boolean(record.acquisitionMethod) &&
    Boolean(record.effect) &&
    Boolean(record.description) &&
    record.sources.length > 0 &&
    Boolean(record.verifiedAt)
  );
}
