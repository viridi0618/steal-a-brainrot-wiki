import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  EmptyState,
  FAQSection,
  PlaceholderTable,
  RelatedSection,
} from "@/components/WikiBlocks";
import { brainrotFaqs, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Brainrots",
  description:
    "Steal a Brainrot ranking page prepared for verified methodology, tier lists, income comparisons, beginner picks, and obtainable entries.",
  alternates: { canonical: "/best-brainrots" },
  openGraph: {
    title: "Best Brainrots | Steal a Brainrot Wiki",
    description:
      "Ranking structure prepared for verified Steal a Brainrot comparison data.",
    url: `${siteConfig.url}/best-brainrots`,
  },
};

export default function BestBrainrotsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Guide"
        title="Best Brainrots"
        description="A ranking guide structure prepared for verified data, comparison methodology, and future tier-list content."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Methodology" title="Ranking Methodology" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Rankings will be based on verified value, income, availability, event status, and practical use. No ranking slots are populated until data is checked.
          </p>
        </section>

        <section>
          <SectionTitle tag="Tier List" title="Tier-List Visual Container" align="left" />
          <div className="space-y-3 mt-8">
            {["S Tier", "A Tier", "B Tier", "Situational"].map((tier) => (
              <div key={tier} className="grid md:grid-cols-[120px_1fr] rounded-lg overflow-hidden border border-[#2a2826]">
                <div className="bg-[#d4af6a] text-[#05030c] font-bold px-5 py-4">{tier}</div>
                <div className="bg-white/[0.03] px-5 py-4 text-[#8a8884]">
                  Empty ranking slots reserved for verified brainrots.
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Best Overall" description="Verified overall picks will appear here." />
          <EmptyState title="Best for Income" description="Verified income-focused picks will appear here." />
          <EmptyState title="Best for Beginners" description="Verified beginner-friendly picks will appear here." />
          <EmptyState title="Best Currently Obtainable" description="Verified obtainable picks will appear here." />
          <EmptyState title="Limited or Event" description="Verified limited and event notes will appear here." />
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Full Comparison Table" align="left" />
          <PlaceholderTable
            headers={["Rank", "Brainrot", "Rarity", "Income", "Availability", "Reason"]}
            emptyTitle="Comparison data is pending."
            emptyDescription="This table is ready for verified brainrot comparisons without fictional rankings."
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/best-brainrots" />
      </div>
    </div>
  );
}
