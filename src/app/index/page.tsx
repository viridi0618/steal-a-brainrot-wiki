import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InfoCard from "@/components/InfoCard";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  EmptyState,
  FAQSection,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import { brainrots, indexFaqs, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Complete Brainrot Index",
  description:
    "Steal a Brainrot Index guide for collection progress, known entries, missing brainrots, and completion planning.",
  alternates: { canonical: "/index" },
  openGraph: {
    title: "Complete Brainrot Index | Steal a Brainrot Wiki",
    description:
      "Track Steal a Brainrot collection progress and known Index categories.",
    url: `${siteConfig.url}/index`,
  },
};

export default function IndexPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Collection"
        title="Complete Brainrot Index"
        description="Collection progress help for brainrots you own, entries you still need, and event-linked availability notes."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="What the Index Is" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            The Index is the collection reference for Steal a Brainrot. Use it to track which brainrots have been obtained, which names still need checking, and which entries may depend on events or rotations.
          </p>
        </section>

        <section>
          <SectionTitle tag="Progress" title="Collection Progress" align="left" />
          <StatGrid
            items={[
              { label: "Tracked Entries", value: `${brainrots.length}` },
              { label: "Verified Values", value: "1" },
              { label: "Event Guide Pages", value: "2" },
              { label: "Open Fields", value: "Unknown" },
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Categories" title="Index Category Cards" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {["Rarity Groups", "Availability", "Event Entries", "Rewards"].map((title) => (
              <InfoCard
                key={title}
                tag="Index"
                title={title}
                description="Use this category to separate standard entries, event-linked entries, and rewards once checked."
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Index" title="Complete Brainrot Index" align="left" />
          <DataTable
            headers={["Brainrot", "Rarity", "Availability", "Index Note"]}
            rows={brainrots.map((brainrot) => [
              brainrot.name,
              brainrot.rarity,
              brainrot.availability,
              brainrot.baseIncome === "Unknown"
                ? "Entry tracked; economy values need a current check."
                : "Entry tracked with verified early economy values.",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Rewards" title="Reward Cards" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Index Rewards" description="Record reward names only after the requirement and reward are checked in game." />
            <EmptyState title="Base Skins" description="If Index progress unlocks base skins, list the exact requirement and skin name here." />
            <EmptyState title="Completion Bonuses" description="Use this area for verified completion bonuses, not guesses from older versions." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Tracker" title="Missing-Entry Tracker" align="left" />
          <EmptyState
            title="Track missing entries by name."
            description="Compare your in-game Index with the table above, then mark unowned standard, event, or limited entries separately."
          />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Completion Tips" align="left" />
          <EmptyState
            title="Prioritize obtainable entries first."
            description="Standard rotation brainrots are easier to chase than event-linked entries. Fill reliable gaps before waiting for limited windows."
          />
        </section>

        <FAQSection faqs={indexFaqs} />
        <RelatedSection currentHref="/index" />
      </div>
    </div>
  );
}
