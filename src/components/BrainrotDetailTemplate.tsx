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
import type { BrainrotRecord } from "@/lib/types";

function displayValue(value: string | null) {
  return value ?? "Unknown";
}

export default function BrainrotDetailTemplate({ brainrot }: { brainrot: BrainrotRecord }) {
  return (
    <div className="min-h-screen">
      <PageHero tag={brainrot.rarity ?? brainrot.availability} title={brainrot.name} description={brainrot.description} />
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
                { label: "Rarity", value: displayValue(brainrot.rarity) },
                { label: "Base Cost", value: displayValue(brainrot.baseCostDisplay) },
                { label: "Base Income", value: displayValue(brainrot.baseIncomeDisplay) },
                { label: "Availability", value: brainrot.availability },
                { label: "Acquisition", value: displayValue(brainrot.acquisitionMethod) },
                { label: "Last Verified", value: brainrot.verifiedAt },
                { label: "Confidence", value: brainrot.confidence },
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
                ["Base Cost", displayValue(brainrot.baseCostDisplay), "Unmodified purchase value only."],
                ["Base Income", displayValue(brainrot.baseIncomeDisplay), "Unmodified income value only."],
                ["Indexable", brainrot.indexable === null ? "Unknown" : brainrot.indexable ? "Yes" : "No", "Shown only when supported by sources."],
              ]}
            />
          </div>
        </section>
        {brainrot.needsReview && brainrot.conflictNote && (
          <section>
            <SectionTitle tag="Review" title="Verification Note" align="left" />
            <EmptyState title="Values need review" description={brainrot.conflictNote} />
          </section>
        )}

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Traits" description="Trait interactions are shown only when the source data supports them." />
          <EmptyState title="Mutations" description="Mutation notes are tracked separately from Traits." />
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
