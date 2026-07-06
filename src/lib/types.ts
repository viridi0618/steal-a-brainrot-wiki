export interface NavItem {
  label: string;
  href: PublicRoute;
  submenu?: NavItem[];
}

export interface SiteConfig {
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

export interface Brainrot {
  slug: string;
  name: string;
  rarity: string;
  baseCost: string;
  baseIncome: string;
  acquisitionMethod: string;
  availability: string;
  traits: string[];
  mutations: string[];
  description: string;
}

export interface Trait {
  slug: string;
  name: string;
  multiplier: string;
  category: string;
  acquisitionSource: string;
  availability: string;
  effect: string;
  description: string;
}

export type PublicRoute =
  | "/"
  | "/brainrots"
  | "/traits"
  | "/index"
  | "/best-brainrots"
  | "/admin-abuse"
  | "/taco-tuesday"
  | "/faq";
