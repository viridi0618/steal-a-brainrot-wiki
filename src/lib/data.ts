import type { Brainrot, FAQ, GuideLink, NavItem, SiteMeta, Trait } from "./types";

export const siteMeta: SiteMeta = {
  name: "Steal a Brainrot Wiki",
  shortName: "Brainrot Wiki",
  gameName: "Steal a Brainrot",
  description:
    "A community wiki template for Steal a Brainrot with brainrots, traits, values, event guides, FAQs, and future strategy pages.",
  url: "https://steal-a-brainrot-wiki.vercel.app",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Brainrots", href: "/brainrots" },
  { label: "Traits", href: "/traits" },
  { label: "Index", href: "/index" },
  { label: "Best Brainrots", href: "/best-brainrots" },
  { label: "Admin Abuse", href: "/admin-abuse" },
  { label: "Taco Tuesday", href: "/taco-tuesday" },
  { label: "FAQ", href: "/faq" },
];

export const brainrots: Brainrot[] = [
  {
    slug: "starter-brainrot",
    name: "Starter Brainrot",
    rarity: "Common",
    value: "Placeholder value",
    income: "Placeholder income",
    traits: ["Starter", "Stable"],
    mutations: ["None listed"],
    description:
      "Placeholder overview for a beginner-friendly brainrot. Replace this summary when final game data is ready.",
  },
  {
    slug: "rare-brainrot",
    name: "Rare Brainrot",
    rarity: "Rare",
    value: "Placeholder value",
    income: "Placeholder income",
    traits: ["Value", "Income"],
    mutations: ["Placeholder mutation"],
    description:
      "Placeholder overview for a higher-value brainrot. This page is ready for stats, values, and strategy notes.",
  },
  {
    slug: "event-brainrot",
    name: "Event Brainrot",
    rarity: "Event",
    value: "Placeholder value",
    income: "Placeholder income",
    traits: ["Limited", "Event"],
    mutations: ["Placeholder mutation"],
    description:
      "Placeholder overview for an event brainrot. Add event availability, trading notes, and collection tips later.",
  },
];

export const traits: Trait[] = [
  {
    slug: "starter-trait",
    name: "Starter Trait",
    effect: "Placeholder effect",
    multiplier: "1x placeholder",
    obtainMethod: "Placeholder obtain method",
    bestUse: "Placeholder best use",
    description:
      "Placeholder trait summary for future details about effects, multipliers, and ideal brainrot pairings.",
  },
  {
    slug: "income-trait",
    name: "Income Trait",
    effect: "Placeholder income effect",
    multiplier: "Placeholder multiplier",
    obtainMethod: "Placeholder obtain method",
    bestUse: "Placeholder best use",
    description:
      "Placeholder trait summary for income-focused builds and value comparisons.",
  },
  {
    slug: "event-trait",
    name: "Event Trait",
    effect: "Placeholder event effect",
    multiplier: "Placeholder multiplier",
    obtainMethod: "Placeholder event source",
    bestUse: "Placeholder best use",
    description:
      "Placeholder trait summary for event-based gameplay and limited-time rewards.",
  },
];

export const featuredGuides: GuideLink[] = [
  {
    title: "Best Brainrots",
    description: "Placeholder tier list and progression recommendations.",
    href: "/best-brainrots",
    tag: "Guide",
  },
  {
    title: "Admin Abuse",
    description: "Placeholder event schedule, reward, and preparation guide.",
    href: "/admin-abuse",
    tag: "Event",
  },
  {
    title: "Taco Tuesday",
    description: "Placeholder weekly event notes, rewards, and tips.",
    href: "/taco-tuesday",
    tag: "Event",
  },
];

export const relatedGuides: GuideLink[] = [
  {
    title: "Brainrots",
    description: "Browse placeholder brainrot pages and future stat entries.",
    href: "/brainrots",
    tag: "Index",
  },
  {
    title: "Traits",
    description: "Review placeholder trait effects, multipliers, and uses.",
    href: "/traits",
    tag: "Index",
  },
  {
    title: "Complete Index",
    description: "A placeholder master index for all brainrot entries.",
    href: "/index",
    tag: "Reference",
  },
  ...featuredGuides,
];

export const faqs: FAQ[] = [
  {
    question: "What is Steal a Brainrot Wiki?",
    answer:
      "This is a placeholder wiki structure for Steal a Brainrot. Final gameplay details can be added later.",
  },
  {
    question: "Are the brainrot values final?",
    answer:
      "No. Values are placeholders so future editors can replace them with verified game data.",
  },
  {
    question: "Are trait multipliers final?",
    answer:
      "No. Trait multipliers are placeholder entries until the wiki is populated with accurate information.",
  },
  {
    question: "Does every listed page exist?",
    answer:
      "Yes. Navigation and related guide links point only to pages included in this template.",
  },
  {
    question: "Can this wiki support individual brainrot pages?",
    answer:
      "Yes. Dynamic brainrot pages are already scaffolded and can be expanded with real stats later.",
  },
  {
    question: "Can this wiki support individual trait pages?",
    answer:
      "Yes. Dynamic trait pages are scaffolded for future effect, multiplier, and obtain-method details.",
  },
  {
    question: "What should go in the Index page?",
    answer:
      "The Index page is reserved for a complete searchable brainrot list once final content is available.",
  },
  {
    question: "What should go in Best Brainrots?",
    answer:
      "Use it for a future tier list, early-game recommendations, and late-game recommendations.",
  },
  {
    question: "What is Admin Abuse?",
    answer:
      "This page is a placeholder for future event schedules, rewards, and preparation tips.",
  },
  {
    question: "What is Taco Tuesday?",
    answer:
      "This page is a placeholder for future weekly event schedules, rewards, and tips.",
  },
  {
    question: "Is there final artwork?",
    answer:
      "No. Placeholder branding and text are used until final assets are ready.",
  },
  {
    question: "Is this project ready for SEO content?",
    answer:
      "Yes. Metadata, structured data, sitemap, and robots files have been updated for the new wiki.",
  },
  {
    question: "Can more pages be added later?",
    answer:
      "Yes. The structure is designed so future guide pages can reuse the existing components and data patterns.",
  },
  {
    question: "Who maintains this wiki?",
    answer:
      "This placeholder answer can be replaced with community, author, or editorial information later.",
  },
  {
    question: "Where should corrections go?",
    answer:
      "This placeholder answer can be replaced with contribution instructions once the project workflow is finalized.",
  },
];

export const homeFaqs = faqs.slice(0, 5);
