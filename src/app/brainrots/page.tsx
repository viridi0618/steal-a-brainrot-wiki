import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  EmptyState,
  FAQSection,
  FilterBar,
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
    title: "Brainrots | Steal a Brainrot Wiki",
    description:
      "Browse known Steal a Brainrot entries and careful stat notes.",
    url: `${siteConfig.url}/brainrots`,
  },
};

export default function BrainrotsPage() {
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
            { label: "Entries", value: `${brainrots.length}` },
            { label: "Verified Costs", value: "1" },
            { label: "Verified Income", value: "1" },
            { label: "Availability", value: "Standard" },
          ]}
        />

        <section>
          <SectionTitle tag="Tools" title="Search and Filters" align="left" />
          <div className="mt-8">
            <FilterBar
              searchLabel="Search verified brainrots"
              filters={["Rarity", "Availability", "Acquisition"]}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="All Brainrots" title="All Brainrots" align="left" />
          <div className="mt-8">
            <DataTable
              headers={[
                "Name",
                "Rarity",
                "Base Cost",
                "Base Income",
                "Acquisition",
                "Availability",
              ]}
              rows={brainrots.map((brainrot) => [
                brainrot.name,
                brainrot.rarity,
                brainrot.baseCost,
                brainrot.baseIncome,
                brainrot.acquisitionMethod,
                brainrot.availability,
              ])}
            />
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
            description="Standard brainrots can appear through the conveyor rotation, while stealing depends on another player's base access and server timing."
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/brainrots" />
      </div>
    </div>
  );
}
