import { brainrots } from "@/data/brainrots";
import { traits } from "@/data/traits";
import {
  isIndexableBrainrot,
  isIndexableTrait,
  buildTipFrequency,
} from "@/lib/route-quality";

// All non-hidden records (visible on list pages, generate static pages)
export const visibleBrainrots = brainrots.filter(
  (r) => r.indexingMeta?.contentStatus !== "hidden"
);
export const visibleTraits = traits.filter(
  (r) => r.indexingMeta?.contentStatus !== "hidden"
);

// Indexable = contentStatus complete + passes quality gate → sitemap + search
export const indexableBrainrots = brainrots.filter((r) => {
  const tipFreq = buildTipFrequency(brainrots);
  return isIndexableBrainrot(r, tipFreq);
});
export const indexableTraits = traits.filter(isIndexableTrait);

// Partial = visible but not indexable → no sitemap, noindex
export const partialBrainrots = visibleBrainrots.filter(
  (r) => !isIndexableBrainrot(r, buildTipFrequency(brainrots))
);
export const partialTraits = visibleTraits.filter(
  (r) => !isIndexableTrait(r)
);

// Legacy aliases (for backward compat during migration)
export const publishedBrainrots = visibleBrainrots;
export const publishedTraits = visibleTraits;

export function getPublishedBrainrotBySlug(slug: string) {
  return visibleBrainrots.find((brainrot) => brainrot.slug === slug);
}

export function getPublishedTraitBySlug(slug: string) {
  return visibleTraits.find((trait) => trait.slug === slug);
}
