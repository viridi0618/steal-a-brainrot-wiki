import type { TraitRecord } from "@/lib/types";
import { tacoTuesdayWikiSource, traitsWikiSource } from "./sources";

export const traits: TraitRecord[] = [
  {
    slug: "taco",
    name: "Taco",
    multiplierValue: null,
    multiplierDisplay: null,
    category: "Event Trait",
    acquisitionMethod: "Associated with Taco Tuesday. Feed taco-themed brainrots to Fat Sammy during the event.",
    availability: "Event",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "medium",
    sources: [traitsWikiSource],
    needsReview: false,
    conflictNote: null,
    effect: `The Taco trait is associated with Taco Tuesday. Current multiplier values vary and are not confirmed by a single reliable source. Check in-game during the event.`,
    description: `Taco is an event Trait tied to Taco Tuesday. It can appear on brainrots spawned or obtained during the event window. Exact multiplier effects should be checked in-game during active Taco Tuesday.`,
  },
  {
    slug: "cookie",
    name: "Cookie",
    multiplierValue: null,
    multiplierDisplay: null,
    category: "Holiday Trait",
    acquisitionMethod: "Christmas event brainrots",
    availability: "Event",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [traitsWikiSource],
    needsReview: true,
    conflictNote: null,
    effect: `A holiday trait; multiplier needs verification.`,
    description: `Cookie is a holiday-associated trait.`,
  },
  {
    slug: "pumpkin",
    name: "Pumpkin",
    multiplierValue: null,
    multiplierDisplay: null,
    category: "Holiday Trait",
    acquisitionMethod: "Halloween event brainrots",
    availability: "Event",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [traitsWikiSource],
    needsReview: true,
    conflictNote: null,
    effect: `A Halloween-associated trait; multiplier needs verification.`,
    description: `Pumpkin is a Halloween event trait.`,
  },
];

export function getTraitBySlug(slug: string) {
  return traits.find((trait) => trait.slug === slug);
}

export const verifiedTraitRecords = traits.filter((trait) => !trait.needsReview);