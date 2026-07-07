import type { BrainrotRecord } from "@/lib/types";
import { brainrotsWikiSource, officialGameSource } from "./sources";

export const brainrots: BrainrotRecord[] = [
  {
    slug: "noobini-pizzanini",
    name: "Noobini Pizzanini",
    rarity: "Common",
    baseCostValue: 25,
    baseCostDisplay: "25 Cash",
    baseIncomeValue: 1,
    baseIncomeDisplay: "1 Cash/s",
    availability: "Obtainable",
    acquisitionMethod: "Buy from the conveyor when it appears",
    indexable: true,
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [brainrotsWikiSource],
    needsReview: true,
    conflictNote:
      "Cost and income are sourced from one community wiki source only; keep excluded from high-confidence ranking logic until cross-checked in game.",
    description:
      "Noobini Pizzanini is an early Common brainrot used as a starter economy piece. Its low cost and low income make it useful for opening a run while learning the buy, steal, and defend loop.",
  },
  {
    slug: "lirili-larila",
    name: "Lirili Larila",
    rarity: null,
    baseCostValue: null,
    baseCostDisplay: null,
    baseIncomeValue: null,
    baseIncomeDisplay: null,
    availability: "Unknown",
    acquisitionMethod: null,
    indexable: null,
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [brainrotsWikiSource],
    needsReview: true,
    conflictNote:
      "Current rarity, cost, income, availability, and index status need direct in-game or cross-source confirmation.",
    description:
      "Lirili Larila is tracked as a known brainrot name. Exact economy values are not shown until they are verified from current sources.",
  },
  {
    slug: "tralalero-tralala",
    name: "Tralalero Tralala",
    rarity: null,
    baseCostValue: null,
    baseCostDisplay: null,
    baseIncomeValue: null,
    baseIncomeDisplay: null,
    availability: "Unknown",
    acquisitionMethod: null,
    indexable: null,
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [brainrotsWikiSource],
    needsReview: true,
    conflictNote:
      "The entry name is known, but current gameplay stats and availability are not confirmed with enough evidence for rankings.",
    description:
      "Tralalero Tralala is included as a tracked brainrot entry. The guide keeps uncertain stats out of player recommendations.",
  },
  {
    slug: "tung-tung-tung-sahur",
    name: "Tung Tung Tung Sahur",
    rarity: null,
    baseCostValue: null,
    baseCostDisplay: null,
    baseIncomeValue: null,
    baseIncomeDisplay: null,
    availability: "Unknown",
    acquisitionMethod: null,
    indexable: null,
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [brainrotsWikiSource],
    needsReview: true,
    conflictNote:
      "Current obtainable status is not verified here; do not describe it as standard conveyor rotation until a current source confirms that.",
    description:
      "Tung Tung Tung Sahur is tracked for collection reference, but this guide does not currently treat it as confirmed obtainable.",
  },
  {
    slug: "brr-brr-patapim",
    name: "Brr Brr Patapim",
    rarity: null,
    baseCostValue: null,
    baseCostDisplay: null,
    baseIncomeValue: null,
    baseIncomeDisplay: null,
    availability: "Unknown",
    acquisitionMethod: null,
    indexable: null,
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [brainrotsWikiSource],
    needsReview: true,
    conflictNote:
      "Current rarity, value, income, acquisition method, and index status require additional verification.",
    description:
      "Brr Brr Patapim is listed for tracking and future verification. Unknown values are omitted from ranking decisions.",
  },
  {
    slug: "cappuccino-assassino",
    name: "Cappuccino Assassino",
    rarity: null,
    baseCostValue: null,
    baseCostDisplay: null,
    baseIncomeValue: null,
    baseIncomeDisplay: null,
    availability: "Unknown",
    acquisitionMethod: null,
    indexable: null,
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [brainrotsWikiSource, officialGameSource],
    needsReview: true,
    conflictNote:
      "The game source verifies the game context, but specific current stats for this entry still need direct evidence.",
    description:
      "Cappuccino Assassino is tracked as a known brainrot entry. It is not ranked until current stats are confirmed.",
  },
];

export function getBrainrotBySlug(slug: string) {
  return brainrots.find((brainrot) => brainrot.slug === slug);
}

export const verifiedBrainrotRecords = brainrots.filter(
  (brainrot) => !brainrot.needsReview
);
