import type { Metadata } from "next";
import Link from "next/link";
import DataNote from "@/components/DataNote";
import TraitExplorer from "@/components/explorers/TraitExplorer";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { mutations, publishedTraits, siteConfig, traitFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Traits",
  description:
    "Steal a Brainrot Traits database with multipliers, categories, obtain methods, availability, and separate Mutation notes.",
  alternates: { canonical: "/traits" },
  openGraph: {
    title: "Traits | Steal a Brainrot Guide",
    description:
      "Review Steal a Brainrot trait multipliers, categories, obtain methods, and availability.",
    url: `${siteConfig.url}/traits`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traits | Steal a Brainrot Guide",
    description:
      "Trait records with multipliers separated from Mutations for Steal a Brainrot.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function TraitsPage() {
  const categories = new Set(publishedTraits.map((trait) => trait.category).filter(Boolean));
  const eventTraits = publishedTraits.filter((trait) => trait.availability === "Event");
  const highestTrait = [...publishedTraits]
    .filter((trait) => trait.multiplierValue !== null)
    .sort((a, b) => (b.multiplierValue ?? 0) - (a.multiplierValue ?? 0))[0];

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Database"
        title="Traits"
        description="A searchable Trait database for Steal a Brainrot, covering multipliers, categories, obtain methods, and availability."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Trait System Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Traits and mutations can change how a brainrot is valued, compared, or prioritized. This page focuses on published Trait records, while Mutations are tracked separately.
          </p>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Traits vs Mutations" align="left" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <DataNote title="Traits" description="Traits may be applied through events or special mechanics and are tracked separately from Mutations." />
            <DataNote title="Mutations" description="Mutations use their own database so mutation multipliers and spawn notes do not get mixed into Trait records." />
          </div>
        </section>

        <StatGrid
          items={[
            { label: "Trait Records", value: `${publishedTraits.length}` },
            { label: "Trait Categories", value: `${categories.size}` },
            { label: "Highest Multiplier", value: highestTrait?.multiplierDisplay ?? "Unknown" },
            { label: "Event Traits", value: `${eventTraits.length}` },
          ]}
        />

        <section>
          <SectionTitle tag="Traits List" title="Searchable Trait Explorer" align="left" />
          <div className="mt-8">
            <TraitExplorer records={publishedTraits} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Multiplier Comparison" align="left" />
          <DataNote
            title="Compare the final in-game income."
            description="Use the Trait multiplier alongside the brainrot's displayed income, rarity, and availability before making ranking or trade decisions."
          />
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Mutation Preview" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Mutation", "Multiplier", "Availability", "Note"]}
              rows={mutations.slice(0, 5).map((mutation) => [
                mutation.name,
                mutation.multiplierDisplay ?? "Unknown",
                mutation.availability,
                "Mutation record, not a Trait.",
              ])}
            />
          </div>
          <p className="mt-4 text-sm text-[#8a8884]">
            See the complete mutation list on the <Link href="/mutations" className="text-[#d4af6a] hover:text-[#f0ece4]">Mutations page</Link>.
          </p>
        </section>

        <FAQSection faqs={traitFaqs} />
        <RelatedSection currentHref="/traits" />
      </div>
    </div>
  );
}
