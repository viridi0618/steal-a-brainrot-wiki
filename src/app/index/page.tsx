import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InfoCard from "@/components/InfoCard";
import SectionTitle from "@/components/SectionTitle";
import {
  EmptyState,
  FAQSection,
  PlaceholderTable,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { indexFaqs, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Complete Brainrot Index",
  description:
    "Steal a Brainrot Index page prepared for collection progress, category cards, completion requirements, rewards, and missing-entry tracking.",
  alternates: { canonical: "/index" },
  openGraph: {
    title: "Complete Brainrot Index | Steal a Brainrot Wiki",
    description:
      "Collection index structure prepared for verified progress and reward data.",
    url: `${siteConfig.url}/index`,
  },
};

export default function IndexPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Collection"
        title="Complete Brainrot Index"
        description="A dedicated collection index page prepared for progress tracking, requirements, rewards, and missing-entry notes."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="What the Index Is" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            This page is reserved for verified in-game collection Index information. It is intentionally separate from the brainrot database so progress, rewards, and completion requirements can be documented clearly.
          </p>
        </section>

        <section>
          <SectionTitle tag="Progress" title="Collection Progress Placeholder" align="left" />
          <StatGrid
            items={[
              { label: "Collected", value: "Pending" },
              { label: "Missing", value: "Pending" },
              { label: "Rewards", value: "Pending" },
              { label: "Base Skins", value: "Pending" },
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Categories" title="Index Category Cards" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {["Rarity Groups", "Availability", "Event Entries", "Rewards"].map((title) => (
              <InfoCard
                key={title}
                tag="Pending"
                title={title}
                description="This category card is ready for verified collection data."
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Requirements" title="Completion Requirements" align="left" />
          <PlaceholderTable
            headers={["Requirement", "Verified Criteria", "Reward", "Notes"]}
            emptyTitle="Completion requirements are pending."
            emptyDescription="This table is prepared for verified index requirements and reward conditions."
          />
        </section>

        <section>
          <SectionTitle tag="Rewards" title="Reward Cards" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Reward Slot" description="Verified reward details will appear here." />
            <EmptyState title="Base Skin Reward" description="Base Skin reward information is pending verification." />
            <EmptyState title="Completion Bonus" description="Completion bonus details will be added after verification." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Tracker" title="Missing-Entry Tracker" align="left" />
          <EmptyState
            title="Tracker is waiting for verified entries."
            description="This area can later list missing index entries, filters, and completion notes."
          />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Completion Tips" align="left" />
          <EmptyState
            title="Completion tips are pending."
            description="Concise verified tips can be added here once Index mechanics are confirmed."
          />
        </section>

        <FAQSection faqs={indexFaqs} />
        <RelatedSection currentHref="/index" />
      </div>
    </div>
  );
}
