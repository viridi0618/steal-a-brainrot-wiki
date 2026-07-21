import { brainrots } from "@/data/brainrots";
import { traits } from "@/data/traits";
import {
  buildTipFrequency,
  isIndexableBrainrot,
  isIndexableTrait,
} from "@/lib/route-quality";

const brainrotTipFrequency = buildTipFrequency(brainrots);

// Visible records still get public detail pages unless explicitly hidden.
export const visibleBrainrots = brainrots.filter(
  (record) => record.indexingMeta?.contentStatus !== "hidden"
);
export const visibleTraits = traits.filter(
  (record) => record.indexingMeta?.contentStatus !== "hidden"
);

// Indexable records are the only detail pages allowed into sitemap/search.
export const indexableBrainrots = brainrots.filter((record) =>
  isIndexableBrainrot(record, brainrotTipFrequency)
);
export const indexableTraits = traits.filter(isIndexableTrait);

export const partialBrainrots = visibleBrainrots.filter(
  (record) => !isIndexableBrainrot(record, brainrotTipFrequency)
);
export const partialTraits = visibleTraits.filter(
  (record) => !isIndexableTrait(record)
);

// Legacy aliases: these mean "visible records", not necessarily indexable.
export const publishedBrainrots = visibleBrainrots;
export const publishedTraits = visibleTraits;

export function getPublishedBrainrotBySlug(slug: string) {
  return visibleBrainrots.find((brainrot) => brainrot.slug === slug);
}

export function getPublishedTraitBySlug(slug: string) {
  return visibleTraits.find((trait) => trait.slug === slug);
}
