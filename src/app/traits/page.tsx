import type { Metadata } from "next";
import Link from "next/link";
import TraitExplorer from "@/components/explorers/TraitExplorer";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  EmptyState,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { mutations, siteConfig, traitFaqs, traits } from "@/lib/data";

export const metadata: Metadata = {
  title: "Traits",
  description:
    "Steal a Brainrot Traits page with Mutation notes, event Trait sources, multipliers, availability, and usage guidance.",
  alternates: { canonical: "/traits" },
  openGraph: {
    title: "Traits | Steal a Brainrot Guide",
    description:
      "Review Steal a Brainrot trait sources, categories, and multiplier fields.",
    url: `${siteConfig.url}/traits`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traits | Steal a Brainrot Guide",
    description:
      "Trait records separated from Mutations for Steal a Brainrot.",
    images: [siteConfig.defaultSocialImage],
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
            <EmptyState title="Traits" description="Traits may be applied through events or special mechanics and are tracked separately from Mutations." />
            <EmptyState title="Mutations" description="Mutations are a separate modification system. Gold, Diamond, and Rainbow are not counted as Traits." />
          </div>
        </section>

        <StatGrid
          items={[
            { label: "Trait Records", value: `${traits.length}` },
            { label: "Mutation Records", value: `${mutations.length}` },
            { label: "Multipliers", value: "Unknown" },
            { label: "Event Trait", value: "Taco" },
          ]}
        />

        <section>
          <SectionTitle tag="Traits List" title="Searchable Trait Explorer" align="left" />
          <div className="mt-8">
            <TraitExplorer records={traits} />
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
