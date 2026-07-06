import type { Brainrot, FAQ, GuideLink, InfoItem, NavItem, PublicRoute, SiteConfig, Trait } from "./types";

const fallbackSiteUrl = "https://stealabrainrot.wiki";

export const siteConfig: SiteConfig = {
  name: "Steal a Brainrot Wiki",
  shortName: "Brainrot Wiki",
  gameName: "Steal a Brainrot",
  description:
    "A fan-made Steal a Brainrot wiki structure for verified brainrot data, traits, index progress, event guides, and FAQs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
  officialGameUrl: process.env.NEXT_PUBLIC_OFFICIAL_GAME_URL || "",
  defaultSocialImage: "/og-image.png",
};

export const publicRoutes: { href: PublicRoute; label: string; priority: number }[] = [
  { href: "/", label: "Home", priority: 1 },
  { href: "/brainrots", label: "Brainrots", priority: 0.9 },
  { href: "/traits", label: "Traits", priority: 0.9 },
  { href: "/index", label: "Index", priority: 0.8 },
  { href: "/best-brainrots", label: "Best Brainrots", priority: 0.8 },
  { href: "/admin-abuse", label: "Admin Abuse", priority: 0.8 },
  { href: "/taco-tuesday", label: "Taco Tuesday", priority: 0.8 },
  { href: "/faq", label: "FAQ", priority: 0.7 },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Brainrots", href: "/brainrots" },
  { label: "Traits", href: "/traits" },
  { label: "Index", href: "/index" },
  {
    label: "Guides",
    href: "/best-brainrots",
    submenu: [
      { label: "Best Brainrots", href: "/best-brainrots" },
      { label: "Admin Abuse", href: "/admin-abuse" },
      { label: "Taco Tuesday", href: "/taco-tuesday" },
    ],
  },
  {
    label: "More",
    href: "/faq",
    submenu: [{ label: "FAQ", href: "/faq" }],
  },
];

export const brainrots: Brainrot[] = [];

export const traits: Trait[] = [];

export const quickFacts: InfoItem[] = [
  { label: "Platform", value: "Pending verification" },
  { label: "Genre", value: "Pending verification" },
  { label: "Core Goal", value: "Collect and manage brainrots" },
  { label: "Primary Currency", value: "Pending verification" },
  { label: "Collection System", value: "Index data pending" },
];

export const relatedGuides: GuideLink[] = [
  {
    title: "Brainrots",
    description: "Prepared for verified brainrot costs, income, rarity, and availability.",
    href: "/brainrots",
    tag: "Database",
  },
  {
    title: "Traits",
    description: "Prepared for verified trait effects, multipliers, and sources.",
    href: "/traits",
    tag: "Database",
  },
  {
    title: "Index",
    description: "A structure for collection progress, rewards, and missing entries.",
    href: "/index",
    tag: "Reference",
  },
  {
    title: "Best Brainrots",
    description: "Ranking containers ready for verified comparison data.",
    href: "/best-brainrots",
    tag: "Guide",
  },
  {
    title: "Admin Abuse",
    description: "Event guide structure for schedule, rewards, and preparation notes.",
    href: "/admin-abuse",
    tag: "Event",
  },
  {
    title: "Taco Tuesday",
    description: "Event guide structure for schedule, rewards, and mechanics.",
    href: "/taco-tuesday",
    tag: "Event",
  },
  {
    title: "FAQ",
    description: "Common placeholder questions grouped by topic.",
    href: "/faq",
    tag: "Help",
  },
];

export const gameplayFaqs: FAQ[] = [
  {
    question: "What is this wiki prepared to cover?",
    answer:
      "This page structure is ready for verified gameplay notes, collection guidance, values, event information, and beginner-facing explanations.",
  },
  {
    question: "Why are some values marked as pending?",
    answer:
      "The site is intentionally avoiding unverified facts until reliable data is ready to publish.",
  },
  {
    question: "Will this wiki include strategy pages later?",
    answer:
      "Yes. Existing guide routes are prepared for concise strategy content once the data has been checked.",
  },
];

export const brainrotFaqs: FAQ[] = [
  {
    question: "Where will brainrot costs and income appear?",
    answer:
      "The brainrot database and detail templates include fields for verified base cost, base income, rarity, acquisition method, and availability.",
  },
  {
    question: "Why are no brainrot detail pages linked yet?",
    answer:
      "Detail pages are only generated when verified production entries exist, preventing fictional entities from appearing on the live site.",
  },
  {
    question: "Can images be added later?",
    answer:
      "Yes. The layouts include image placeholder regions so verified artwork or screenshots can be added without redesigning the page.",
  },
];

export const traitFaqs: FAQ[] = [
  {
    question: "Where will trait multipliers be listed?",
    answer:
      "The traits page is prepared for multiplier, category, source, availability, and detail-link columns.",
  },
  {
    question: "Are mutations handled separately from traits?",
    answer:
      "The traits page includes a comparison panel so future editors can explain the distinction with verified details.",
  },
  {
    question: "Will trait detail pages be public immediately?",
    answer:
      "No. Trait detail pages are generated only for verified trait entries.",
  },
];

export const indexFaqs: FAQ[] = [
  {
    question: "What is the Index page for?",
    answer:
      "It is prepared for collection progress, category completion, reward notes, and missing-entry tracking.",
  },
  {
    question: "Are completion rewards confirmed?",
    answer:
      "No. Reward areas are placeholders until the requirements and rewards are verified.",
  },
  {
    question: "Will there be a missing-entry tracker?",
    answer:
      "Yes. The page includes a structural placeholder for a tracker that can be populated later.",
  },
];

export const eventFaqs: FAQ[] = [
  {
    question: "Are event schedules final?",
    answer:
      "No. Schedule boxes are intentionally marked pending until event times are checked.",
  },
  {
    question: "Where will event rewards appear?",
    answer:
      "Each event page includes dedicated reward containers ready for verified reward data.",
  },
  {
    question: "How should event pages be updated?",
    answer:
      "Update the last-checked field, schedule disclaimer, rewards, and preparation guidance after verification.",
  },
];

export const allFaqs: FAQ[] = [
  ...gameplayFaqs,
  ...brainrotFaqs,
  ...traitFaqs,
  ...indexFaqs,
  ...eventFaqs,
];
