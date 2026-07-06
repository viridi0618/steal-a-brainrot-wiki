export interface NavItem {
  label: string;
  href: string;
}

export interface SiteMeta {
  name: string;
  shortName: string;
  description: string;
  url: string;
  gameName: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GuideLink {
  title: string;
  description: string;
  href: string;
  tag?: string;
}

export interface Brainrot {
  slug: string;
  name: string;
  rarity: string;
  value: string;
  income: string;
  traits: string[];
  mutations: string[];
  description: string;
}

export interface Trait {
  slug: string;
  name: string;
  effect: string;
  multiplier: string;
  obtainMethod: string;
  bestUse: string;
  description: string;
}

export interface PageIntro {
  title: string;
  description: string;
}
