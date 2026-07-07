import PageHero from "./PageHero";
import SectionTitle from "./SectionTitle";
import {
  Breadcrumbs,
  DataTable,
  EmptyState,
  FAQSection,
  QuickFactsPanel,
  RelatedSection,
} from "./WikiBlocks";
import { traitFaqs } from "@/lib/data";
import type { Trait } from "@/lib/types";

export default function TraitDetailTemplate({ trait }: { trait: Trait }) {
  return (
    <div className="min-h-screen">
      <PageHero tag={trait.multiplier} title={trait.name} description={trait.description} />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <Breadcrumbs items={[{ label: "Traits", href: "/traits" }, { label: trait.name }]} />

        <section className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] aspect-square flex items-center justify-center text-[#8a8884]">
              Image unavailable
            </div>
          </div>
          <div className="lg:col-span-3">
            <QuickFactsPanel
              title="Quick Facts"
              items={[
                { label: "Multiplier", value: trait.multiplier },
                { label: "Category", value: trait.category },
                { label: "Source", value: trait.acquisitionSource },
                { label: "Availability", value: trait.availability },
              ]}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Overview" title="Overview" align="left" />
          <p className="mt-6 text-base leading-relaxed text-[#8a8884]">{trait.description}</p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Effect" description={trait.effect} />
          <EmptyState title="Best Uses" description="Use this modifier on brainrots whose final income, rarity, and steal risk justify protecting them." />
        </section>

        <section>
          <SectionTitle tag="Details" title="Multiplier Details" align="left" />
          <DataTable
            headers={["Rule", "Verified Value", "Notes"]}
            rows={[
              ["Multiplier", trait.multiplier, "Exact value is shown only when verified."],
              ["Source", trait.acquisitionSource, "Current obtain method for this entry."],
              ["Availability", trait.availability, "Event and rotation status."],
            ]}
          />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Obtain Method" description={trait.acquisitionSource} />
          <EmptyState title="Stacking Information" description="Check the final in-game income display before assuming modifiers stack in a specific order." />
        </section>

        <FAQSection faqs={traitFaqs} />
        <RelatedSection currentHref="/traits" />
      </div>
    </div>
  );
}
