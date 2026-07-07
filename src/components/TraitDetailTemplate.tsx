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
import type { TraitRecord } from "@/lib/types";

function displayValue(value: string | null) {
  return value ?? "Unknown";
}

export default function TraitDetailTemplate({ trait }: { trait: TraitRecord }) {
  return (
    <div className="min-h-screen">
      <PageHero tag={trait.multiplierDisplay ?? "Unknown"} title={trait.name} description={trait.description} />
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
                { label: "Multiplier", value: displayValue(trait.multiplierDisplay) },
                { label: "Category", value: displayValue(trait.category) },
                { label: "Source", value: displayValue(trait.acquisitionMethod) },
                { label: "Availability", value: trait.availability },
                { label: "Last Verified", value: trait.verifiedAt },
                { label: "Confidence", value: trait.confidence },
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
              ["Multiplier", displayValue(trait.multiplierDisplay), "Exact value is shown only when verified."],
              ["Source", displayValue(trait.acquisitionMethod), "Current obtain method for this entry."],
              ["Availability", trait.availability, "Event and rotation status."],
            ]}
          />
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Obtain Method" description={displayValue(trait.acquisitionMethod)} />
          <EmptyState title="Stacking Information" description="Check the final in-game income display before assuming modifiers stack in a specific order." />
        </section>
        {trait.needsReview && trait.conflictNote && (
          <section>
            <SectionTitle tag="Review" title="Verification Note" align="left" />
            <EmptyState title="Values need review" description={trait.conflictNote} />
          </section>
        )}

        <FAQSection faqs={traitFaqs} />
        <RelatedSection currentHref="/traits" />
      </div>
    </div>
  );
}
