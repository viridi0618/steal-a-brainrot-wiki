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
import { siteConfig, traitFaqs, traits } from "@/lib/data";

export const metadata: Metadata = {
  title: "Traits",
  description:
    "Steal a Brainrot traits page with mutation notes, event-trait sources, multipliers, availability, and usage guidance.",
  alternates: { canonical: "/traits" },
  openGraph: {
    title: "Traits | Steal a Brainrot Wiki",
    description:
      "Review Steal a Brainrot trait sources, categories, and multiplier fields.",
    url: `${siteConfig.url}/traits`,
  },
};

export default function TraitsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Database"
        title="Traits"
        description="Trait and mutation notes for Steal a Brainrot, with unverified multipliers kept clearly marked as Unknown."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Trait System Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Traits and mutations can change how a brainrot is valued, compared, or prioritized. Exact multipliers matter, so this page separates known sources from values that still need a current check.
          </p>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Traits vs Mutations" align="left" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <EmptyState title="Traits" description="Event or modifier labels tied to source, availability, and potential value changes." />
            <EmptyState title="Mutations" description="Variant-style modifiers such as Gold, Diamond, and Rainbow that can affect how a brainrot is evaluated." />
          </div>
        </section>

        <StatGrid
          items={[
            { label: "Traits", value: `${traits.length}` },
            { label: "Categories", value: "2" },
            { label: "Multipliers", value: "Unknown" },
            { label: "Event Trait", value: "Taco" },
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
            <DataTable
              headers={["Trait", "Multiplier", "Category", "Source", "Availability"]}
              rows={traits.map((trait) => [
                trait.name,
                trait.multiplier,
                trait.category,
                trait.acquisitionSource,
                trait.availability,
              ])}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Multiplier Comparison" align="left" />
          <EmptyState
            title="Compare the final in-game income."
            description="When a multiplier is Unknown, use the unit's displayed income and base value before making ranking or trade decisions."
          />
        </section>

        <section>
          <SectionTitle tag="Sources" title="Acquisition Sources" align="left" />
          <EmptyState
            title="Sources depend on rotation and events."
            description="Standard mutation-style modifiers are tracked separately from event traits such as Taco, which is associated with Taco Tuesday."
          />
        </section>

        <FAQSection faqs={traitFaqs} />
        <RelatedSection currentHref="/traits" />
      </div>
    </div>
  );
}
