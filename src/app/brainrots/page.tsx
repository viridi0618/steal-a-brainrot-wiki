import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  EmptyState,
  FAQSection,
  FilterBar,
  PlaceholderTable,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { brainrotFaqs, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Brainrots",
  description:
    "Steal a Brainrot brainrots database structure prepared for verified rarity, cost, income, acquisition, and availability data.",
  alternates: { canonical: "/brainrots" },
  openGraph: {
    title: "Brainrots | Steal a Brainrot Wiki",
    description:
      "Prepared brainrot database layout for verified Steal a Brainrot entries.",
    url: `${siteConfig.url}/brainrots`,
  },
};

export default function BrainrotsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Database"
        title="Brainrots"
        description="A structured database page ready for verified brainrot entries, values, income, acquisition methods, and availability."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Brainrot Database Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            This page is prepared to organize verified brainrot data without publishing fictional entries. Future data can be added to the table and detail templates when confirmed.
          </p>
        </section>

        <StatGrid
          items={[
            { label: "Entries", value: "Pending" },
            { label: "Rarities", value: "Pending" },
            { label: "Income Data", value: "Pending" },
            { label: "Availability", value: "Pending" },
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
            <PlaceholderTable
              headers={[
                "Image",
                "Name",
                "Rarity",
                "Base Cost",
                "Base Income",
                "Acquisition",
                "Availability",
                "Details",
              ]}
              emptyTitle="Brainrot data will be added after verification."
              emptyDescription="The table supports image, name, rarity, base cost, base income, acquisition method, availability, and detail links."
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Reference" title="Rarity Explanation" align="left" />
          <EmptyState
            title="Rarity notes are pending."
            description="This section is reserved for verified rarity definitions, rarity ordering, and how rarity affects collection decisions."
          />
        </section>

        <section>
          <SectionTitle tag="Reference" title="Acquisition Methods" align="left" />
          <EmptyState
            title="Acquisition method data is pending."
            description="This section will explain verified sources such as standard acquisition, event availability, or other confirmed methods."
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/brainrots" />
      </div>
    </div>
  );
}
