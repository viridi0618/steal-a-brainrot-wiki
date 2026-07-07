import type { Metadata } from "next";
import BrainrotExplorer from "@/components/explorers/BrainrotExplorer";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  EmptyState,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { brainrotFaqs, brainrots, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Brainrots",
  description:
    "Steal a Brainrot brainrots database with known entries, rarity, cost, income, acquisition, and availability fields.",
  alternates: { canonical: "/brainrots" },
  openGraph: {
    title: "Brainrots | Steal a Brainrot Guide",
    description:
      "Browse known Steal a Brainrot entries and careful stat notes.",
    url: `${siteConfig.url}/brainrots`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainrots | Steal a Brainrot Guide",
    description:
      "Known Steal a Brainrot records with source-aware stat fields.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function BrainrotsPage() {
  const rarityCount = new Set(brainrots.map((item) => item.rarity).filter(Boolean)).size;
  const obtainableCount = brainrots.filter((item) => item.availability === "Obtainable").length;
  const limitedOrRemovedCount = brainrots.filter((item) => ["Limited", "Removed", "Unobtainable"].includes(item.availability)).length;

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Database"
        title="Brainrots"
        description="Known brainrot entries with rarity, value, income, acquisition, and availability fields kept accurate or marked Unknown."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Brainrot Database Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Brainrots are the core collectibles and income generators in Steal a Brainrot. Use this page to compare known names, early verified stats, obtain methods, and open data fields before deciding what to buy, steal, or protect.
          </p>
        </section>

        <StatGrid
          items={[
            { label: "Records", value: `${brainrots.length}` },
            { label: "Rarity Tiers", value: `${rarityCount}` },
            { label: "Obtainable", value: `${obtainableCount}` },
            { label: "Limited/Removed", value: `${limitedOrRemovedCount}` },
          ]}
        />

        <section>
          <SectionTitle tag="All Brainrots" title="Searchable Brainrot Explorer" align="left" />
          <div className="mt-8">
            <BrainrotExplorer records={brainrots} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Reference" title="Rarity Explanation" align="left" />
          <EmptyState
            title="Rarity affects both demand and risk."
            description="Rarer brainrots are usually more attractive targets, so compare rarity with income and how easily you can defend the base."
          />
        </section>

        <section>
          <SectionTitle tag="Reference" title="Acquisition Methods" align="left" />
          <EmptyState
            title="Most listed entries come from buying or stealing."
            description="Common acquisition methods include buying from in-game offers and stealing from another player's base, but each record keeps its current method separate."
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/brainrots" />
      </div>
    </div>
  );
}
