import type { Brainrot, FAQ, GuideLink, InfoItem, NavItem, PublicRoute, SiteConfig, Trait } from "./types";

const fallbackSiteUrl = "https://stealabrainrot.wiki";

export const siteConfig: SiteConfig = {
  name: "Steal a Brainrot Wiki",
  shortName: "Brainrot Wiki",
  gameName: "Steal a Brainrot",
  description:
    "A fan-made Steal a Brainrot wiki for brainrot entries, trait notes, index progress, event timing, and practical beginner guides.",
  url: process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
  officialGameUrl:
    process.env.NEXT_PUBLIC_OFFICIAL_GAME_URL ||
    "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot",
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

export const lastChecked = "July 7, 2026";

export const brainrots: Brainrot[] = [
  {
    slug: "noobini-pizzanini",
    name: "Noobini Pizzanini",
    rarity: "Common",
    baseCost: "$25",
    baseIncome: "$1/s",
    acquisitionMethod: "Buy from the conveyor when it appears",
    availability: "Standard rotation",
    traits: ["Unknown"],
    mutations: ["Unknown"],
    description:
      "Noobini Pizzanini is an early Common brainrot used as a starter economy piece. Its low cost and low income make it useful for opening a run, filling index progress, and learning the buy-steal-defend loop before chasing rarer spawns.",
  },
  {
    slug: "lirili-larila",
    name: "Lirili Larila",
    rarity: "Unknown",
    baseCost: "Unknown",
    baseIncome: "Unknown",
    acquisitionMethod: "Buy from the conveyor when it appears",
    availability: "Standard rotation",
    traits: ["Unknown"],
    mutations: ["Unknown"],
    description:
      "Lirili Larila is a listed brainrot entry. This wiki keeps its cost, income, and rarity marked Unknown until those values are checked directly against an in-game source or a reliable data table.",
  },
  {
    slug: "tralalero-tralala",
    name: "Tralalero Tralala",
    rarity: "Unknown",
    baseCost: "Unknown",
    baseIncome: "Unknown",
    acquisitionMethod: "Buy from the conveyor or steal from another base",
    availability: "Standard rotation",
    traits: ["Unknown"],
    mutations: ["Unknown"],
    description:
      "Tralalero Tralala is a recognizable brainrot name from the game roster. Exact economy values change the usefulness of a brainrot, so this entry avoids ranking claims until verified numbers are available.",
  },
  {
    slug: "tung-tung-tung-sahur",
    name: "Tung Tung Tung Sahur",
    rarity: "Unknown",
    baseCost: "Unknown",
    baseIncome: "Unknown",
    acquisitionMethod: "Buy from the conveyor or steal from another base",
    availability: "Standard rotation",
    traits: ["Unknown"],
    mutations: ["Unknown"],
    description:
      "Tung Tung Tung Sahur is tracked as a brainrot collection entry. Players should compare its in-game price and money-per-second value before deciding whether to keep it, protect it, or replace it.",
  },
  {
    slug: "brr-brr-patapim",
    name: "Brr Brr Patapim",
    rarity: "Unknown",
    baseCost: "Unknown",
    baseIncome: "Unknown",
    acquisitionMethod: "Buy from the conveyor or steal from another base",
    availability: "Standard rotation",
    traits: ["Unknown"],
    mutations: ["Unknown"],
    description:
      "Brr Brr Patapim is included as a known roster name, with economy values left Unknown on this site until verified. That keeps the entry useful without turning unconfirmed stats into guide advice.",
  },
  {
    slug: "cappuccino-assassino",
    name: "Cappuccino Assassino",
    rarity: "Unknown",
    baseCost: "Unknown",
    baseIncome: "Unknown",
    acquisitionMethod: "Buy from the conveyor or steal from another base",
    availability: "Standard rotation",
    traits: ["Unknown"],
    mutations: ["Unknown"],
    description:
      "Cappuccino Assassino is tracked for future rarity, value, trait, and mutation notes. Until exact stats are verified, it should not be treated as a ranked recommendation.",
  },
];

export const traits: Trait[] = [
  {
    slug: "gold",
    name: "Gold",
    multiplier: "Unknown",
    category: "Mutation",
    acquisitionSource: "Appears on brainrots through mutation mechanics",
    availability: "Game rotation",
    effect: "Changes the brainrot variant and may affect value or income; exact multiplier is not verified on this site.",
    description:
      "Gold is tracked as a mutation-style modifier. The name is useful for filtering and comparison, while exact multiplier behavior remains Unknown until checked against reliable current data.",
  },
  {
    slug: "diamond",
    name: "Diamond",
    multiplier: "Unknown",
    category: "Mutation",
    acquisitionSource: "Appears on brainrots through mutation mechanics",
    availability: "Game rotation",
    effect: "Changes the brainrot variant and may affect value or income; exact multiplier is not verified on this site.",
    description:
      "Diamond is a mutation-style modifier used for brainrot variants. This wiki records the trait name and source type without publishing unverified multiplier numbers.",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    multiplier: "Unknown",
    category: "Mutation",
    acquisitionSource: "Appears on brainrots through mutation mechanics",
    availability: "Game rotation",
    effect: "Changes the brainrot variant and may affect value or income; exact multiplier is not verified on this site.",
    description:
      "Rainbow is listed as a mutation-style modifier. Because ranking and value advice depend on exact multipliers, this entry keeps its numerical effect marked Unknown until validated.",
  },
  {
    slug: "taco",
    name: "Taco",
    multiplier: "Unknown",
    category: "Event Trait",
    acquisitionSource: "Taco Tuesday event",
    availability: "Weekly event window",
    effect: "Associated with Taco Tuesday; exact current multiplier should be checked before publishing value advice.",
    description:
      "Taco is associated with the Taco Tuesday event. The event source is documented, while the current multiplier remains Unknown here until it is checked against the live game or a reliable current wiki table.",
  },
];

export const quickFacts: InfoItem[] = [
  { label: "Platform", value: "Roblox" },
  { label: "Genre", value: "Tycoon / collection" },
  { label: "Core Goal", value: "Buy, steal, defend" },
  { label: "Primary Currency", value: "Cash" },
  { label: "Collection System", value: "Index" },
];

export const relatedGuides: GuideLink[] = [
  {
    title: "Brainrots",
    description: "Browse known brainrot names, verified early stats, acquisition notes, and open value fields.",
    href: "/brainrots",
    tag: "Database",
  },
  {
    title: "Traits",
    description: "Review mutation and event trait notes with current multipliers marked only when verified.",
    href: "/traits",
    tag: "Database",
  },
  {
    title: "Index",
    description: "Understand how the collection Index helps track owned and missing brainrots.",
    href: "/index",
    tag: "Reference",
  },
  {
    title: "Best Brainrots",
    description: "Compare brainrots by income, availability, value, and usefulness without fake rankings.",
    href: "/best-brainrots",
    tag: "Guide",
  },
  {
    title: "Admin Abuse",
    description: "Check the Admin Abuse event window, preparation notes, and schedule caveats.",
    href: "/admin-abuse",
    tag: "Event",
  },
  {
    title: "Taco Tuesday",
    description: "Read Taco Tuesday timing notes, Taco Trait context, and event preparation tips.",
    href: "/taco-tuesday",
    tag: "Event",
  },
  {
    title: "FAQ",
    description: "Quick answers for gameplay, brainrots, traits, the Index, and recurring events.",
    href: "/faq",
    tag: "Help",
  },
];

export const gameplayFaqs: FAQ[] = [
  {
    question: "What is Steal a Brainrot?",
    answer:
      "Steal a Brainrot is a Roblox tycoon and collection game built around buying brainrots, earning cash from them, stealing from other players, and defending your own base. The important loop is simple: improve your income, protect valuable units, and use event windows or rare spawns to expand the collection.",
  },
  {
    question: "How do players earn money?",
    answer:
      "Brainrots generate cash over time after they are placed in your base. Higher-value brainrots are usually more important because they can improve income faster, but they also become targets for other players. This wiki separates verified stats from Unknown values so players can judge income choices without relying on guessed numbers.",
  },
  {
    question: "Can other players steal my brainrots?",
    answer:
      "Yes. Stealing is part of the game loop. If another player gets access to your base at the wrong time, a valuable brainrot can be taken. Good habits include watching the base timer, staying near high-value pieces during busy servers, and avoiding upgrades that leave your best income source exposed.",
  },
  {
    question: "What should beginners focus on first?",
    answer:
      "Beginners should build steady cash flow before chasing expensive targets. Cheap brainrots help start the economy, but every purchase should be compared with the income it adds. Once income is stable, the next goals are filling the Index, learning common steal routes, and saving for stronger brainrots or event opportunities.",
  },
];

export const brainrotFaqs: FAQ[] = [
  {
    question: "What are brainrots used for?",
    answer:
      "Brainrots are the main collectible and income source in Steal a Brainrot. Each entry can have a rarity, price, money-per-second value, traits, mutations, and availability state. The best brainrot for a player depends on current cash, server risk, event access, and whether the entry helps complete the Index.",
  },
  {
    question: "Why are some brainrot stats marked Unknown?",
    answer:
      "Unknown means this site has not verified the current value from a reliable source. Steal a Brainrot updates can change economy balance, event availability, and player demand, so publishing guessed costs or income would make the wiki less useful. Unknown fields are kept visible so future editors know exactly what to check.",
  },
  {
    question: "What makes a brainrot valuable?",
    answer:
      "Value usually comes from income, rarity, event availability, mutations, traits, and trade or steal demand. A brainrot with high money-per-second output can be better for progression, while a limited or rare entry may matter more for collectors. This wiki avoids tier claims unless the supporting stats are known.",
  },
  {
    question: "Should I buy or steal brainrots?",
    answer:
      "Buying is safer and predictable when the conveyor offers a useful entry. Stealing can be faster, especially if another player owns a stronger brainrot, but it carries more risk and depends on timing. New players should learn both methods, then decide based on base security, server activity, and the value of the target.",
  },
];

export const traitFaqs: FAQ[] = [
  {
    question: "What are traits and mutations?",
    answer:
      "Traits and mutations are modifiers attached to brainrots. They can change the way a brainrot is valued, displayed, or compared. Exact effects are important, so this wiki lists the source and category first, then leaves the multiplier Unknown unless it has been checked against current game data.",
  },
  {
    question: "Does a higher multiplier always mean the best choice?",
    answer:
      "Not always. A multiplier matters only when paired with a brainrot that is worth protecting or using for income. Availability, base income, rarity, and how easy the brainrot is to steal all affect the final decision. A weaker brainrot with a flashy modifier may still lose to a better base entry.",
  },
  {
    question: "How do I get the Taco Trait?",
    answer:
      "The Taco Trait is associated with Taco Tuesday. Because event behavior and timing can change, players should check the live game and the Taco Tuesday page before relying on a specific method or multiplier. This wiki treats the source as known but keeps current numerical effects marked Unknown until verified.",
  },
  {
    question: "Can multiple modifiers affect one brainrot?",
    answer:
      "Some brainrots may appear with modifier-style variants, but exact stacking rules should be checked before making value claims. The safest approach is to compare the final in-game income shown for the unit instead of assuming that two labels combine in a specific way. This keeps trading and ranking advice grounded.",
  },
];

export const indexFaqs: FAQ[] = [
  {
    question: "What is the Index?",
    answer:
      "The Index is the collection reference for brainrots. It helps players see which entries they have already obtained and which ones still need to be collected. For a wiki, the Index is separate from the brainrot database because completion progress, rewards, and missing entries are different from raw stat comparison.",
  },
  {
    question: "How do I fill Index entries?",
    answer:
      "Index progress is tied to obtaining brainrots in game. Buying from the conveyor, stealing from other players, and participating in events can all matter based on the entry. If a brainrot is event-only or limited, the Index page should mark that clearly once the availability is checked.",
  },
  {
    question: "Do all brainrots stay available forever?",
    answer:
      "Not necessarily. Some entries may be tied to events, rotations, updates, or special availability windows. This wiki uses availability labels so players can distinguish standard rotation entries from event-linked entries. When availability is not confirmed, it is safer to mark it Unknown than to imply the brainrot can always be found.",
  },
];

export const eventFaqs: FAQ[] = [
  {
    question: "When does Admin Abuse happen?",
    answer:
      "Admin Abuse is commonly tied to the weekly update window and is often discussed as happening around Saturday afternoon Eastern Time. Exact timing can change with game updates, developer activity, or server conditions, so players should treat the listed time as a planning note and confirm it in game before waiting.",
  },
  {
    question: "When does Taco Tuesday happen?",
    answer:
      "Taco Tuesday is a weekly event associated with Tuesdays and the Taco Trait. Community references commonly list the event around 6:00 PM Eastern Time, but the safest habit is to check the live game close to the event window. This wiki marks the last checked date beside schedule notes.",
  },
  {
    question: "How should I prepare for events?",
    answer:
      "Join early, keep enough cash ready, and make sure valuable brainrots are protected before the event starts. Events can increase server activity, which means more competition and more stealing attempts. If the event grants traits or special spawns, a secure base lets you focus on collecting instead of recovering losses.",
  },
  {
    question: "Can event information change?",
    answer:
      "Yes. Event timing, rewards, and mechanics can shift after updates. A wiki should record when a schedule was checked and avoid promising exact behavior unless the source is current. For this reason, the event pages use short schedule notes, caveats, and practical preparation steps rather than permanent guarantees.",
  },
];

export const allFaqs: FAQ[] = [
  ...gameplayFaqs,
  ...brainrotFaqs,
  ...traitFaqs,
  ...indexFaqs,
  ...eventFaqs,
];
