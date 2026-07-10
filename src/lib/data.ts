import { brainrots, verifiedBrainrotRecords } from "@/data/brainrots";
import { checkedAt } from "@/data/sources";
import { mutations } from "@/data/mutations";
import { traits, verifiedTraitRecords } from "@/data/traits";
import {
  publishedBrainrots,
  publishedTraits,
} from "@/lib/published-data";
import { siteConfig } from "./site-config";
import type { FAQ, GuideLink, InfoItem, NavItem, PublicRoute } from "./types";

export {
  brainrots,
  mutations,
  publishedBrainrots,
  publishedTraits,
  siteConfig,
  traits,
  verifiedBrainrotRecords,
  verifiedTraitRecords,
};

export const eventVerification = {
  adminAbuseVerifiedAt: checkedAt.adminAbuse,
  tacoTuesdayVerifiedAt: checkedAt.tacoTuesday,
};

export const publicRoutes: { href: PublicRoute; label: string; priority: number }[] = [
  { href: "/", label: "Home", priority: 1 },
  { href: "/brainrots", label: "Brainrots", priority: 0.9 },
  { href: "/traits", label: "Traits", priority: 0.9 },
  { href: "/mutations", label: "Mutations", priority: 0.9 },
  { href: "/brainrot-index", label: "Index", priority: 0.8 },
  { href: "/best-brainrots", label: "Best Brainrots", priority: 0.8 },
  { href: "/unblocked", label: "Unblocked Guide", priority: 0.8 },
  { href: "/admin-abuse", label: "Admin Abuse", priority: 0.8 },
  { href: "/taco-tuesday", label: "Taco Tuesday", priority: 0.8 },
  { href: "/faq", label: "FAQ", priority: 0.7 },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Database",
    href: "/brainrots",
    submenu: [
      { label: "Brainrots", href: "/brainrots" },
      { label: "Traits", href: "/traits" },
      { label: "Mutations", href: "/mutations" },
      { label: "Index", href: "/brainrot-index" },
    ],
  },
  {
    label: "Guides",
    href: "/best-brainrots",
    submenu: [
      { label: "Best Brainrots", href: "/best-brainrots" },
      { label: "Unblocked Guide", href: "/unblocked" },
    ],
  },
  {
    label: "Events",
    href: "/admin-abuse",
    submenu: [
      { label: "Admin Abuse", href: "/admin-abuse" },
      { label: "Taco Tuesday", href: "/taco-tuesday" },
    ],
  },
  { label: "FAQ", href: "/faq" },
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
    description: "Browse published brainrot records with rarity, income, cost, acquisition, and availability.",
    href: "/brainrots",
    tag: "Database",
  },
  {
    title: "Traits",
    description: "Review published trait records with multipliers, categories, obtain methods, and availability.",
    href: "/traits",
    tag: "Database",
  },
  {
    title: "Mutations",
    description: "Compare mutation multipliers, availability, obtain methods, and structured spawn-rate notes.",
    href: "/mutations",
    tag: "Database",
  },
  {
    title: "Index",
    description: "Understand how the collection Index helps track owned and missing brainrots.",
    href: "/brainrot-index",
    tag: "Reference",
  },
  {
    title: "Best Brainrots",
    description: "Compare brainrots by income, availability, value, and usefulness without fake rankings.",
    href: "/best-brainrots",
    tag: "Guide",
  },
  {
    title: "Unblocked Guide",
    description: "Understand safe options when Roblox is blocked and use the wiki to plan your next run.",
    href: "/unblocked",
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
      "Brainrots generate cash over time after they are placed in your base. Higher-value brainrots are usually more important because they can improve income faster, but they also become targets for other players. This wiki keeps record sources and data notes attached to each detail page so players can judge income choices with context.",
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
  {
    question: "What is the fastest way to make money in Steal a Brainrot?",
    answer:
      "The fastest income comes from stacking high-rarity brainrots with high-multiplier mutations and traits. A Mythic or Secret brainrot with Rainbow mutation and multiple stacked traits can generate much more income than a plain version. During normal grinding, focus on brainrots with stronger base income instead of rarity alone. The largest income spikes usually happen during events, when rare modifiers and boosted opportunities may appear.",
  },
  {
    question: "How does Rebirth work in Steal a Brainrot?",
    answer:
      "Rebirth resets your current cash and brainrots in exchange for permanent progression bonuses such as movement, wallet, or spawn-related improvements. Each rebirth level can require specific cash and brainrot goals. Before rebirthing, plan around what will be lost, keep important trade decisions separate from the reset, and confirm the current in-game requirements because rebirth balance can change after updates.",
  },
  {
    question: "Should I collect brainrots or focus on rebirth first?",
    answer:
      "Most players should make rebirth progress before treating rare collecting as the main goal. Rebirth resets can remove brainrots, so building a permanent collection too early can waste effort. Use accessible brainrots to meet rebirth requirements, protect anything especially valuable, and start serious collecting once the rebirth grind is no longer interrupting your base.",
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
      "Unknown means the current value is not supported strongly enough to publish as fact. Steal a Brainrot updates can change economy balance, event availability, and player demand, so guessed costs or income are excluded from recommendations and comparison tables.",
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
  {
    question: "How do I get Strawberry Elephant?",
    answer:
      "Strawberry Elephant is treated as an extremely rare OG brainrot. The practical options are watching high-luck Red Carpet sessions, joining busy event windows when rare spawns are more likely, running multiple attempts over time, or trading for it if waiting is not realistic. Because exact spawn rates can change, confirm the current in-game behavior before planning around a fixed probability.",
  },
  {
    question: "How do I get good brainrots quickly as a beginner?",
    answer:
      "Start with the Red Carpet and buy low-cost brainrots that improve your cash flow. Chain upgrades from Common into higher rarities as your income grows, then look for mid-tier brainrots that add better money per second. Join Admin Abuse and other event windows when possible because boosted spawns can make stronger brainrots easier to find. Avoid spending premium currency early unless you understand the value tradeoff.",
  },
  {
    question: "What's the difference between a trait and a mutation?",
    answer:
      "Mutations usually change a brainrot's appearance and income multiplier, while traits are additional modifiers that can stack on top of the base brainrot and mutation. For example, a strong mutation plus strong traits can multiply income far beyond the plain version. The exact stacking and availability rules should always be checked in game because events and updates can change how modifiers appear.",
  },
];

export const traitFaqs: FAQ[] = [
  {
    question: "What are traits and mutations?",
    answer:
      "Traits and mutations are modifiers attached to brainrots. They can change the way a brainrot is valued, displayed, or compared. Traits and Mutations use separate pages so their multipliers, categories, obtain methods, and availability do not get mixed together.",
  },
  {
    question: "Does a higher multiplier always mean the best choice?",
    answer:
      "Not always. A multiplier matters only when paired with a brainrot that is worth protecting or using for income. Availability, base income, rarity, and how easy the brainrot is to steal all affect the final decision. A weaker brainrot with a flashy modifier may still lose to a better base entry.",
  },
  {
    question: "How do I get the Taco Trait?",
    answer:
      "The Taco Trait is associated with Taco Tuesday. Because event behavior and timing can change, players should check the live game and the Taco Tuesday page before relying on a specific method.",
  },
  {
    question: "Can multiple modifiers affect one brainrot?",
    answer:
      "Some brainrots may appear with modifier-style variants, but exact stacking rules should be checked before making value claims. The safest approach is to compare the final in-game income shown for the unit instead of assuming that two labels combine in a specific way. This keeps trading and ranking advice grounded.",
  },
  {
    question: "Can you add traits to brainrots you already have in your base?",
    answer:
      "In most cases, traits and mutations need to appear before the brainrot is safely placed in your base. Once a brainrot reaches the collection zone, it may no longer have the same chance to receive new event modifiers. This is why players often pay attention to timing on the Red Carpet during Admin Abuse instead of buying too early.",
  },
  {
    question: "How do I farm traits efficiently during Admin Abuse?",
    answer:
      "Join early, keep enough cash ready, and focus on brainrots that stay exposed to event effects long enough to receive traits. Some players coordinate with a friend or alternate account to keep a target moving through buying and trading patterns, but the safest solo habit is to watch the Red Carpet carefully and buy only when the risk and timing make sense.",
  },
  {
    question: "What are the best traits in Steal a Brainrot?",
    answer:
      "The best traits are usually the ones with the strongest multipliers, especially when placed on a high-value brainrot. Event-only traits such as Strawberry, Meowl, and John Pork are often discussed as top targets, while regular strong traits can still be useful for progression. A trait's real value depends on the base brainrot, mutation, stack, and current demand.",
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
  {
    question: "When is Admin Abuse and what time should I join?",
    answer:
      "Admin Abuse is commonly discussed around the Saturday update window, and Taco Tuesday is associated with Tuesday evening Eastern Time. Join 5 to 10 minutes early so you have time to enter a server before it fills. Always confirm the current schedule in game or from official channels because event timing can change.",
  },
  {
    question: "What actually happens during Admin Abuse?",
    answer:
      "Admin Abuse can include server-wide effects such as boosted Red Carpet spawns, special mutations, Admin Lucky Blocks, and trait application events. The exact mix depends on the current update and developer activity. Treat the event as the best window for rare modifier hunting, but check the live server before assuming every reward or effect is active.",
  },
  {
    question: "Is Taco Tuesday different from Saturday Admin Abuse?",
    answer:
      "Taco Tuesday is a recurring Tuesday event associated with Taco-themed rewards and the Taco Trait, while Saturday Admin Abuse is usually treated as the larger weekly event window. Both can involve boosted opportunities, but the rewards, length, and activity level may differ. Check the Taco Tuesday page and the live game before planning around a specific reward.",
  },
];

export const tradeSafetyFaqs: FAQ[] = [
  {
    question: "How do I trade safely without getting scammed?",
    answer:
      "Use the official Trade Machine when it is available because it reduces trust-trade risk. For high-value trades outside a protected system, use a verified middleman from a trusted community source and avoid rushing. Never go first in trust trades, never click links promising free Robux or free VIP servers, and never share your Roblox login details.",
  },
  {
    question: "What is a brainrot worth in trading?",
    answer:
      "Brainrot values change constantly with updates, availability, mutations, traits, and player demand. Common through Epic brainrots usually have lower trade value, while Legendary, Mythic, Brainrot God, Secret, and OG entries can be much more important. Mutation and trait stacks can dramatically change value, so check current community value references before making a major trade.",
  },
];

export const allFaqs: FAQ[] = [
  ...gameplayFaqs,
  ...brainrotFaqs,
  ...traitFaqs,
  ...indexFaqs,
  ...eventFaqs,
  ...tradeSafetyFaqs,
];
