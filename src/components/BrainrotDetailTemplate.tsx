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
import type { BrainrotRecord } from "@/lib/types";

function displayValue(value: string | null) {
  return value ?? "Unknown";
}

function publicTips(brainrot: BrainrotRecord) {
  const hasEldoradoSource = brainrot.sources.some((source) =>
    source.name.toLowerCase().includes("eldorado")
  );

  return brainrot.tips.filter((tip) => {
    if (tip.toLowerCase().includes("check eldorado") && !hasEldoradoSource) {
      return false;
    }

    return true;
  });
}

export default function BrainrotDetailTemplate({ brainrot }: { brainrot: BrainrotRecord }) {
  const tips = publicTips(brainrot);

  return (
    <div className="min-h-screen">
      <PageHero tag={brainrot.rarity ?? brainrot.availability} title={brainrot.name} description={brainrot.description} />
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <Breadcrumbs items={[{ label: "Brainrots", href: "/brainrots" }, { label: brainrot.name }]} />

        <section>
          <QuickFactsPanel
            title="Quick Facts"
            items={[
              { label: "Rarity", value: displayValue(brainrot.rarity) },
              { label: "Base Cost", value: displayValue(brainrot.baseCostDisplay) },
              { label: "Base Income", value: displayValue(brainrot.baseIncomeDisplay) },
              { label: "Availability", value: brainrot.availability },
              { label: "Acquisition", value: displayValue(brainrot.acquisitionMethod) },
              { label: "Indexable", value: brainrot.indexable === null ? "Unknown" : brainrot.indexable ? "Yes" : "No" },
              { label: "Last Verified", value: brainrot.verifiedAt },
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Overview" title="Overview" align="left" />
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[#8a8884]">
            <p>{brainrot.overview}</p>
            <p>{brainrot.description}</p>
          </div>
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
        {brainrot.conflictNote && (
          <section>
            <DataNote title="Data Note" description={brainrot.conflictNote} />
          </section>
        )}

        <section>
          <SectionTitle tag="Tips" title="Practical Tips" align="left" />
          <ul className="mt-6 grid gap-3 text-sm text-[#8a8884]">
            {tips.map((tip) => (
              <li key={tip} className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-4">
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle tag="Sources" title="Sources" align="left" />
          <SourceList sources={brainrot.sources} />
        </section>

        <RelatedSection currentHref="/brainrots" />
      </div>
    </div>
  );
}
