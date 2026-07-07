import type { Metadata } from "next";
import BrainrotExplorer from "@/components/explorers/BrainrotExplorer";
import PageHero from "@/components/PageHero";
import InfoCard from "@/components/InfoCard";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { indexFaqs, publishedBrainrots, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Complete Brainrot Index",
  description:
    "Steal a Brainrot Index guide: collection progress, Index rewards, mutation index types, and completion planning.",
  alternates: { canonical: "/brainrot-index" },
  openGraph: {
    title: "Complete Brainrot Index | Steal a Brainrot Guide",
    description:
      "Complete Index guide: collection progress, rewards, and completion requirements for Steal a Brainrot.",
    url: `${siteConfig.url}/brainrot-index`,
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
  const obtainable = publishedBrainrots.filter((brainrot) => brainrot.availability === "Obtainable");
  const limited = publishedBrainrots.filter((brainrot) => brainrot.availability === "Limited");
  const removed = publishedBrainrots.filter((brainrot) => brainrot.availability === "Removed" || brainrot.availability === "Unobtainable");

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Collection"
        title="Complete Brainrot Index"
        description="The Index is your permanent collection tracker for owned, missing, and mutation-specific brainrot entries."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="What is the Index?" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>The Index is the collection reference system that tracks which brainrots you have obtained.</p>
            <p><strong className="text-[#f0ece4]">Black silhouettes</strong> represent brainrots you have not collected yet. Once obtained, the silhouette fills in with the brainrot&apos;s actual appearance.</p>
            <p>There are multiple Index types, including Normal, Gold, Diamond, Rainbow, and Divine, with each type connected to a mutation category.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Stats" title="Collection Stats" align="left" />
          <StatGrid
            items={[
              { label: "Tracked Brainrots", value: `${publishedBrainrots.length}` },
              { label: "Obtainable", value: `${obtainable.length}` },
              { label: "Limited/Event", value: `${limited.length}` },
              { label: "Removed/Unobtainable", value: `${removed.length}` },
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Index Types" title="Index Types and Rewards" align="left" />
          <DataTable
            headers={["Index Type", "Completion Requirement", "Reward", "Notes"]}
            rows={[
              ["Normal (Default)", "~75% of all brainrots", "+0.5x Base Multiplier + Normal Base Skin", "Start here; easiest to complete."],
              ["Gold Index", "~75% of Gold mutation brainrots", "+0.5x Base Multiplier + Gold Base Skin", "Gold mutation spawns at ~10% on Red Carpet."],
              ["Diamond Index", "~75% of Diamond mutation brainrots", "+0.5x Base Multiplier + Diamond Base Skin", "Diamond mutation spawns at ~20.4% on Red Carpet."],
              ["Rainbow Index", "~75% of Rainbow mutation brainrots", "+0.5x Base Multiplier + Rainbow Base Skin", "Rainbow mutation is rare (~1% spawn rate)."],
              ["Divine Index", "~60% of Divine mutation brainrots", "+0.5x Base Multiplier + Divine Base Skin", "Divine is event-locked."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Rewards" title="How Rewards Stack" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>Each completed Index grants a <strong className="text-[#f0ece4]">+0.5x permanent cash multiplier</strong> that applies to all your brainrots.</p>
            <p>Each Index also unlocks a <strong className="text-[#f0ece4]">corresponding base skin</strong>, a visual upgrade for your base themed around that mutation type.</p>
            <p>The <strong className="text-[#f0ece4]">Divine Index</strong> uses a lower listed completion percentage, but is harder in practice because Divine mutations only appear during Divine events in Admin Abuse.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Categories" title="Brainrot Categories" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <InfoCard tag="Standard" title="Obtainable" description={`${obtainable.length} brainrots currently available through listed obtain methods.`} />
            <InfoCard tag="Limited" title="Event / Limited" description={`${limited.length} brainrots tied to events or limited-time availability.`} />
            <InfoCard tag="Removed" title="Unobtainable" description={`${removed.length} brainrots no longer available in the current dataset.`} />
            <InfoCard tag="Index" title="Indexable" description="Use the explorer below to filter entries by Index availability." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Table" title="Complete Index Tracker" align="left" />
          <div className="mt-8">
            <BrainrotExplorer records={publishedBrainrots} compact />
          </div>
        </section>

        <section>
          <SectionTitle tag="Tips" title="Completion Strategy" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p><strong className="text-[#f0ece4]">1. Start with Normal Index.</strong> Focus on accessible brainrots before chasing rare event entries.</p>
            <p><strong className="text-[#f0ece4]">2. Prioritize Obtainable entries.</strong> Do not waste time chasing event-exclusive brainrots until you have exhausted standard rotation entries.</p>
            <p><strong className="text-[#f0ece4]">3. Use Admin Abuse.</strong> Saturday events with boosted spawns are the best time to fill missing slots, especially for mutation indexes.</p>
            <p><strong className="text-[#f0ece4]">4. Watch for re-runs.</strong> Removed brainrots may return if events are repeated.</p>
          </div>
        </section>

        <FAQSection faqs={indexFaqs} />
        <RelatedSection currentHref="/brainrot-index" />
      </div>
    </div>
  );
}
