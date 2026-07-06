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
import { siteConfig, traitFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Traits",
  description:
    "Steal a Brainrot traits page prepared for verified multipliers, categories, acquisition sources, availability, and usage notes.",
  alternates: { canonical: "/traits" },
  openGraph: {
    title: "Traits | Steal a Brainrot Wiki",
    description:
      "Prepared trait database layout for verified Steal a Brainrot multipliers and sources.",
    url: `${siteConfig.url}/traits`,
  },
};

export default function TraitsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Database"
        title="Traits"
        description="A dedicated structure for verified trait effects, multipliers, sources, availability, and best-use notes."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Trait System Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            This page is ready to document verified trait behavior and avoid mixing unconfirmed multipliers with production wiki content.
          </p>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Traits vs Mutations" align="left" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <EmptyState title="Traits" description="Reserved for verified trait definitions, sources, and multiplier rules." />
            <EmptyState title="Mutations" description="Reserved for verified mutation definitions and how they differ from traits." />
          </div>
        </section>

        <StatGrid
          items={[
            { label: "Traits", value: "Pending" },
            { label: "Categories", value: "Pending" },
            { label: "Multipliers", value: "Pending" },
            { label: "Sources", value: "Pending" },
          ]}
        />

        <section>
          <SectionTitle tag="Tools" title="Search and Filters" align="left" />
          <div className="mt-8">
            <FilterBar
              searchLabel="Search verified traits"
              filters={["Category", "Availability"]}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="All Traits" title="Traits List" align="left" />
          <div className="mt-8">
            <PlaceholderTable
              headers={["Image", "Trait", "Multiplier", "Category", "Source", "Availability", "Details"]}
              emptyTitle="Trait data will be added after verification."
              emptyDescription="The table supports images, trait names, multipliers, categories, acquisition sources, availability, and detail links."
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Multiplier Comparison" align="left" />
          <EmptyState
            title="Multiplier comparison is pending."
            description="This area is prepared for verified multiplier ranges, stacking notes, and comparison guidance."
          />
        </section>

        <section>
          <SectionTitle tag="Sources" title="Acquisition Sources" align="left" />
          <EmptyState
            title="Acquisition source notes are pending."
            description="Verified sources can be added here once trait availability and obtain methods are confirmed."
          />
        </section>

        <FAQSection faqs={traitFaqs} />
        <RelatedSection currentHref="/traits" />
      </div>
    </div>
  );
}
