import PageHero from "./PageHero";
import SectionTitle from "./SectionTitle";
import {
  Breadcrumbs,
  EmptyState,
  FAQSection,
  PlaceholderTable,
  QuickFactsPanel,
  RelatedSection,
} from "./WikiBlocks";
import { brainrotFaqs } from "@/lib/data";
import type { Brainrot } from "@/lib/types";

export default function BrainrotDetailTemplate({ brainrot }: { brainrot: Brainrot }) {
  return (
    <div className="min-h-screen">
      <PageHero tag={brainrot.rarity} title={brainrot.name} description={brainrot.description} />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <Breadcrumbs items={[{ label: "Brainrots", href: "/brainrots" }, { label: brainrot.name }]} />

        <section className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] aspect-square flex items-center justify-center text-[#8a8884]">
              Image placeholder
            </div>
          </div>
          <div className="lg:col-span-3">
            <QuickFactsPanel
              title="Quick Facts"
              items={[
                { label: "Rarity", value: brainrot.rarity },
                { label: "Base Cost", value: brainrot.baseCost },
                { label: "Base Income", value: brainrot.baseIncome },
                { label: "Availability", value: brainrot.availability },
                { label: "Acquisition", value: brainrot.acquisitionMethod },
              ]}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="Overview" title="Overview" align="left" />
          <p className="mt-6 text-base leading-relaxed text-[#8a8884]">{brainrot.description}</p>
        </section>

        <section>
          <SectionTitle tag="Stats" title="Stats Table" align="left" />
          <div className="mt-8">
            <PlaceholderTable
              headers={["Field", "Verified Value", "Notes"]}
              emptyTitle="Additional stat rows are pending."
              emptyDescription="This area is prepared for verified value, income, rarity, and availability notes."
            />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Traits" description="Verified trait interactions for this brainrot will appear here." />
          <EmptyState title="Mutations" description="Verified mutation notes for this brainrot will appear here." />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Practical Tips" align="left" />
          <EmptyState
            title="Tips are pending verification."
            description="This section is reserved for concise, checked usage notes once gameplay data is available."
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/brainrots" />
      </div>
    </div>
  );
}
