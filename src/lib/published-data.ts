import { brainrots } from "@/data/brainrots";
import { traits } from "@/data/traits";
import {
  isIndexableBrainrot,
  isIndexableTrait,
} from "@/lib/route-quality";

export const publishedBrainrots = brainrots.filter(isIndexableBrainrot);
export const publishedTraits = traits.filter(isIndexableTrait);

export function getPublishedBrainrotBySlug(slug: string) {
  return publishedBrainrots.find((brainrot) => brainrot.slug === slug);
}

export function getPublishedTraitBySlug(slug: string) {
  return publishedTraits.find((trait) => trait.slug === slug);
}
