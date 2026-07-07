import type { MutationRecord } from "@/lib/types";
import { mutationsWikiSource } from "./sources";

export const mutations: MutationRecord[] = [
  {
    slug: "gold",
    name: "Gold",
    multiplierValue: null,
    multiplierDisplay: null,
    acquisitionMethod: "Mutation system",
    availability: "Unknown",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [mutationsWikiSource],
    needsReview: true,
    conflictNote:
      "Classified separately from Traits; current multiplier and availability need confirmation.",
    description:
      "Gold is tracked as a Mutation, not a Trait. It should not be counted in the Traits database.",
  },
  {
    slug: "diamond",
    name: "Diamond",
    multiplierValue: null,
    multiplierDisplay: null,
    acquisitionMethod: "Mutation system",
    availability: "Unknown",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [mutationsWikiSource],
    needsReview: true,
    conflictNote:
      "Classified separately from Traits; current multiplier and availability need confirmation.",
    description:
      "Diamond is tracked as a Mutation, not a Trait. It is shown only for comparison on the Traits page.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    multiplierValue: null,
    multiplierDisplay: null,
    acquisitionMethod: "Mutation system",
    availability: "Unknown",
    verifiedAt: "2026-07-07",
    updatedAt: "2026-07-07",
    confidence: "low",
    sources: [mutationsWikiSource],
    needsReview: true,
    conflictNote:
      "Classified separately from Traits; current multiplier and availability need confirmation.",
    description:
      "Rainbow is tracked as a Mutation, not a Trait. It must not appear as a Trait detail route.",
  },
];
