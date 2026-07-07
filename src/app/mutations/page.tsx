import type { Metadata } from "next";
import Link from "next/link";
import MutationExplorer from "@/components/explorers/MutationExplorer";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  EmptyState,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { mutations, siteConfig, traitFaqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mutations",
  description:
    "Steal a Brainrot Mutations database with multipliers, availability, obtain methods, and structured spawn rate notes.",
  alternates: { canonical: "/mutations" },
  openGraph: {
    title: "Mutations | Steal a Brainrot Guide",
    description:
      "Compare Steal a Brainrot mutation multipliers, event availability, and known spawn rate fields.",
    url: `${siteConfig.url}/mutations`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutations | Steal a Brainrot Guide",
    description:
      "Mutation records separated from Traits for Steal a Brainrot.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function MutationsPage() {
  const permanentMutations = mutations.filter((mutation) => mutation.availability === "Obtainable");
  const eventMutations = mutations.filter((mutation) => mutation.availability === "Event");
  const structuredSpawnRates = mutations.filter((mutation) => mutation.spawnRateDisplay);

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Database"
        title="Mutations"
        description="Mutation records for Steal a Brainrot, separated from Traits so multipliers, event availability, and spawn notes can be checked cleanly."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Mutation System Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Mutations modify a brainrot separately from Traits. This page keeps the known mutation list, multiplier fields, availability status, and obtain method in one searchable table.
          </p>
        </section>

        <StatGrid
          items={[
            { label: "Mutation Records", value: `${mutations.length}` },
            { label: "Permanent Records", value: `${permanentMutations.length}` },
            { label: "Event Records", value: `${eventMutations.length}` },
            { label: "Spawn Rates", value: `${structuredSpawnRates.length}` },
          ]}
        />

        <section>
          <SectionTitle tag="Tools" title="Mutation Explorer" align="left" />
          <div className="mt-8">
            <MutationExplorer records={mutations} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Reference" title="Traits vs Mutations" align="left" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <EmptyState title="Mutations" description="Mutations are tracked here with multiplier, availability, obtain method, and spawn rate fields when those rates are already present in the dataset." />
            <EmptyState title="Traits" description="Traits remain on the Traits page because they use a separate data model and detail route." />
          </div>
          <p className="mt-6 text-sm text-[#8a8884]">
            Open the <Link href="/traits" className="text-[#d4af6a] hover:text-[#f0ece4]">Traits page</Link> for trait-specific effects and detail pages.
          </p>
        </section>

        <section>
          <SectionTitle tag="Availability" title="Availability Groups" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Group", "Records", "Notes"]}
              rows={[
                ["Obtainable", `${permanentMutations.length}`, "Permanent or regular mutation records in the current dataset."],
                ["Event", `${eventMutations.length}`, "Mutation records tied to Admin Abuse event windows in the current dataset."],
              ]}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Spawn Rates" title="Structured Spawn Rate Notes" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Mutation", "Spawn Rate", "Source Field"]}
              rows={structuredSpawnRates.map((mutation) => [
                mutation.name,
                mutation.spawnRateDisplay ?? "Unknown",
                mutation.acquisitionMethod ?? "Unknown",
              ])}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Multiplier Comparison" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Mutation", "Multiplier", "Availability"]}
              rows={[...mutations]
                .sort((a, b) => (b.multiplierValue ?? -1) - (a.multiplierValue ?? -1))
                .map((mutation) => [
                  mutation.name,
                  mutation.multiplierDisplay ?? "Unknown",
                  mutation.availability,
                ])}
            />
          </div>
        </section>

        <FAQSection faqs={traitFaqs} />
        <RelatedSection currentHref="/mutations" />
      </div>
    </div>
  );
}
