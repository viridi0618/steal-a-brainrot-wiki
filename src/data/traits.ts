import type { TraitRecord } from "@/lib/types";
import { tacoTuesdayWikiSource, traitsWikiSource } from "./sources";

export const traits: TraitRecord[] = [
  {
    slug: "taco",
    name: "Taco",
    multiplierValue: null,
    multiplierDisplay: null,
    category: "Event Trait",
    acquisitionMethod: "Associated with Taco Tuesday",
    availability: "Event",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [traitsWikiSource, tacoTuesdayWikiSource],
    needsReview: true,
    conflictNote:
      "The event association is documented, but the current multiplier needs direct in-game or current announcement verification.",
    effect:
      "Associated with Taco Tuesday. The current multiplier is not displayed until verified.",
    description:
      "Taco is tracked as an event Trait associated with Taco Tuesday. This guide keeps the multiplier Unknown until current evidence confirms it.",
  },
];

export function getTraitBySlug(slug: string) {
  return traits.find((trait) => trait.slug === slug);
}

export const verifiedTraitRecords = traits.filter((trait) => !trait.needsReview);
