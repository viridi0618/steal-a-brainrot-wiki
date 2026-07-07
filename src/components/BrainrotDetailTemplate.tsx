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
              Image unavailable
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
            <DataTable
              headers={["Field", "Verified Value", "Notes"]}
              rows={[
                ["Value", brainrot.baseCost, "Base purchase cost when verified."],
                ["Income", brainrot.baseIncome, "Base income value when verified."],
                ["Rarity", brainrot.rarity, "Shown as listed for this entry."],
              ]}
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
            title="Use verified stats before ranking."
            description="Compare the in-game cost, income, rarity, and steal risk before treating this brainrot as a long-term keeper."
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/brainrots" />
      </div>
    </div>
  );
}
