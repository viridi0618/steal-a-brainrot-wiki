import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InfoCard from "@/components/InfoCard";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { brainrots, indexFaqs, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Complete Brainrot Index",
  description:
    "Steal a Brainrot Index guide: how to complete the collection, Index rewards (+0.5x multiplier & base skins), Normal/Gold/Diamond/Rainbow/Divine Index types, and 75% completion guide.",
  alternates: { canonical: "/index" },
  openGraph: {
    title: "Complete Brainrot Index | Steal a Brainrot Guide",
    description:
      "Complete Index guide: collection progress, rewards, and completion requirements for Steal a Brainrot.",
    url: `${siteConfig.url}/index`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Brainrot Index | Steal a Brainrot Guide",
    description:
      "Index guide with reward details, completion requirements, and tips for Steal a Brainrot.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function IndexPage() {
  const obtainable = brainrots.filter((b) => b.availability === "Obtainable");
  const limited = brainrots.filter((b) => b.availability === "Limited");
  const removed = brainrots.filter((b) => b.availability === "Removed" || b.availability === "Unobtainable");

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Collection"
        title="Complete Brainrot Index"
        description="The Index is your permanent collection tracker. Complete each tier to earn +0.5x base multiplier boosts and unlock exclusive base skins."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="What is the Index?" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>The Index is the collection reference system that tracks which brainrots you have obtained.</p>
            <p><strong className="text-[#f0ece4]">Black silhouettes</strong> represent brainrots you haven't collected yet. Once obtained, the silhouette fills in with the brainrot's actual appearance.</p>
            <p>There are <strong className="text-[#f0ece4]">5 Index types</strong>: Normal (Default), Gold, Diamond, Rainbow, and Divine — one for each major mutation category.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Stats" title="Collection Stats" align="left" />
          <StatGrid
            items={[
              { label: "Tracked Brainrots", value: `${brainrots.length}` },
              { label: "Obtainable", value: `${obtainable.length}` },
              { label: "Limited/Event", value: `${limited.length}` },
              { label: "Removed/Unobtainable", value: `${removed.length}` },
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Index Types" title="Index Types & Rewards" align="left" />
          <DataTable
            headers={["Index Type", "Completion Requirement", "Reward", "Notes"]}
            rows={[
              ["Normal (Default)", "~75% of all brainrots", "+0.5x Base Multiplier + Normal Base Skin", "Start here — easiest to complete."],
              ["Gold Index", "~75% of Gold mutation brainrots", "+0.5x Base Multiplier + Gold Base Skin", "Gold mutation spawns at ~10% on Red Carpet."],
              ["Diamond Index", "~75% of Diamond mutation brainrots", "+0.5x Base Multiplier + Diamond Base Skin", "Diamond mutation spawns at ~20.4% on Red Carpet."],
              ["Rainbow Index", "~75% of Rainbow mutation brainrots", "+0.5x Base Multiplier + Rainbow Base Skin", "Rainbow mutation is rare (~1% spawn rate)."],
              ["Divine Index", "~60% of Divine mutation brainrots", "+0.5x Base Multiplier + Divine Base Skin", "Exception: only 60% required. Divine is event-locked."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Rewards" title="How Rewards Stack" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>Each completed Index grants a <strong className="text-[#f0ece4]">+0.5x permanent cash multiplier</strong> that applies to all your brainrots. These multipliers <strong className="text-[#f0ece4]">stack</strong> across Index types.</p>
            <p>Completing all 5 Index types gives you a total of <strong className="text-[#f0ece4]">+2.5x base multiplier</strong> permanently.</p>
            <p>Each Index also unlocks a <strong className="text-[#f0ece4]">corresponding base skin</strong> — a visual upgrade for your base themed around that mutation type.</p>
            <p>The <strong className="text-[#f0ece4]">Divine Index</strong> is the easiest to complete percentage-wise (60%), but hardest in practice because Divine mutations only appear during Divine events in Admin Abuse.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Categories" title="Brainrot Categories" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <InfoCard tag="Standard" title="Obtainable" description={`${obtainable.length} brainrots currently available through the Red Carpet, Lucky Blocks, or crafting.`} />
            <InfoCard tag="Limited" title="Event / Limited" description={`${limited.length} brainrots tied to events, Taco Tuesday, or limited-time availability.`} />
            <InfoCard tag="Removed" title="Unobtainable" description={`${removed.length} brainrots no longer available. May reappear if Sammy re-runs events.`} />
            <InfoCard tag="OG" title="OG Tier" description="3 OG brainrots (Meowl, Strawberry Elephant, Skibidi Toilet) with astronomically rare spawn rates." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Table" title="Complete Index Tracker" align="left" />
          <DataTable
            headers={["Brainrot", "Rarity", "Availability", "Indexable"]}
            rows={brainrots.map((brainrot) => [
              brainrot.name,
              brainrot.rarity ?? "—",
              brainrot.availability,
              brainrot.indexable === false ? "No" : brainrot.indexable === null ? "—" : "Yes",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Completion Strategy" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p><strong className="text-[#f0ece4]">1. Start with Normal Index.</strong> Focus on Common through Mythic brainrots — they're the most accessible and fill the most slots.</p>
            <p><strong className="text-[#f0ece4]">2. Prioritize Obtainable entries.</strong> Don't waste time chasing event-exclusive brainrots until you've exhausted standard rotation entries.</p>
            <p><strong className="text-[#f0ece4]">3. Use Admin Abuse.</strong> Saturday events with boosted spawns are the best time to fill missing slots, especially for Gold/Diamond mutations.</p>
            <p><strong className="text-[#f0ece4]">4. Watch for re-runs.</strong> Removed brainrots (like Tung Tung Tung Sahur) may return if Sammy brings back old events. Stay subscribed to official channels.</p>
            <p><strong className="text-[#f0ece4]">5. Trade for the impossible.</strong> OG-tier brainrots (Meowl, Strawberry Elephant) are virtually impossible to spawn naturally. The Eldorado.gg marketplace is where most transactions happen.</p>
            <p><strong className="text-[#f0ece4]">6. Seasonal Indexes exist.</strong> Halloween, Christmas, and other seasonal events have their own temporary Index variants with unique rewards.</p>
          </div>
        </section>

        <FAQSection faqs={indexFaqs} />
        <RelatedSection currentHref="/index" />
      </div>
    </div>
  );
}
