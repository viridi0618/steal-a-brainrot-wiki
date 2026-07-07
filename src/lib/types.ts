export interface NavItem {
  label: string;
  href: PublicRoute;
  submenu?: NavItem[];
}

export interface SiteConfig {
  siteName: string;
  name: string;
  shortName: string;
  gameName: string;
  description: string;
  url: string;
  officialGameUrl: string;
  defaultSocialImage: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GuideLink {
  title: string;
  description: string;
  href: PublicRoute;
  tag?: string;
}

export interface InfoItem {
  label: string;
  value: string;
}

export type ConfidenceLevel = "high" | "medium" | "low";

export type AvailabilityStatus =
  | "Obtainable"
  | "Limited"
  | "Event"
  | "Removed"
  | "Unobtainable"
  | "Unknown";

export interface SourceReference {
  name: string;
  url?: string;
  type:
    | "official"
    | "in-game"
    | "community-wiki"
    | "editorial-guide"
    | "marketplace"
    | "other";
  publishedAt?: string;
  checkedAt: string;
}

export interface BrainrotRecord {
  slug: string;
  name: string;
  rarity: string | null;
  baseCostValue: number | null;
  baseCostDisplay: string | null;
  baseIncomeValue: number | null;
  baseIncomeDisplay: string | null;
  availability: AvailabilityStatus;
  acquisitionMethod: string | null;
  indexable: boolean | null;
  verifiedAt: string;
  updatedAt?: string;
  confidence: ConfidenceLevel;
  sources: SourceReference[];
  needsReview: boolean;
  overview: string;
  tips: string[];
  conflictNote: string | null;
  description: string;
}

export interface TraitRecord {
  slug: string;
  name: string;
  multiplierValue: number | null;
  multiplierDisplay: string | null;
  category: string | null;
  acquisitionMethod: string | null;
  availability: AvailabilityStatus;
  verifiedAt: string;
  updatedAt?: string;
  confidence: ConfidenceLevel;
  sources: SourceReference[];
  needsReview: boolean;
  conflictNote: string | null;
  effect: string;
  description: string;
}

export interface MutationRecord {
  slug: string;
  name: string;
  multiplierValue: number | null;
  multiplierDisplay: string | null;
  spawnRateValue: number | null;
  spawnRateDisplay: string | null;
  acquisitionMethod: string | null;
  availability: AvailabilityStatus;
  verifiedAt: string;
  updatedAt?: string;
  confidence: ConfidenceLevel;
  sources: SourceReference[];
  needsReview: boolean;
  conflictNote: string | null;
  description: string;
}

export type PublicRoute =
  | "/"
  | "/brainrots"
  | "/traits"
  | "/mutations"
  | "/index"
  | "/best-brainrots"
  | "/admin-abuse"
  | "/taco-tuesday"
  | "/faq";
