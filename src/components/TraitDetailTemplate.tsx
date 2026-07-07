import DataNote from "./DataNote";
import PageHero from "./PageHero";
import SectionTitle from "./SectionTitle";
import SourceList from "./SourceList";
import {
  Breadcrumbs,
  DataTable,
  QuickFactsPanel,
  RelatedSection,
} from "./WikiBlocks";
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

        <section>
          <QuickFactsPanel
            title="Quick Facts"
            items={[
              { label: "Multiplier", value: displayValue(trait.multiplierDisplay) },
              { label: "Category", value: displayValue(trait.category) },
              { label: "Source", value: displayValue(trait.acquisitionMethod) },
              { label: "Availability", value: trait.availability },
              { label: "Last Verified", value: trait.verifiedAt },
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Overview" title="Overview" align="left" />
          <p className="mt-6 text-base leading-relaxed text-[#8a8884]">{trait.description}</p>
        </section>

        <section>
          <SectionTitle tag="Effect" title="Effect" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">{trait.effect}</p>
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

        <section>
          <SectionTitle tag="Obtain Method" title="How to Obtain" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">{displayValue(trait.acquisitionMethod)}</p>
        </section>
        {trait.conflictNote && (
          <section>
            <DataNote title="Data Note" description={trait.conflictNote} />
          </section>
        )}

        <section>
          <SectionTitle tag="Sources" title="Sources" align="left" />
          <SourceList sources={trait.sources} />
        </section>

        <RelatedSection currentHref="/traits" />
      </div>
    </div>
  );
}
