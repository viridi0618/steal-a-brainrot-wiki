import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  EmptyState,
  FAQSection,
  RelatedSection,
} from "@/components/WikiBlocks";
import { brainrotFaqs, brainrots, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Brainrots",
  description:
    "Steal a Brainrot best brainrots guide with ranking criteria for income, rarity, value, availability, and steal risk.",
  alternates: { canonical: "/best-brainrots" },
  openGraph: {
    title: "Best Brainrots | Steal a Brainrot Guide",
    description:
      "Compare Steal a Brainrot entries with clear ranking criteria and no invented stats.",
    url: `${siteConfig.url}/best-brainrots`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Brainrots | Steal a Brainrot Guide",
    description:
      "Ranking criteria for Steal a Brainrot records with disputed values excluded.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function BestBrainrotsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Guide"
        title="Best Brainrots"
        description="Ranking criteria and current tracked picks for choosing brainrots without inventing unverified values."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Methodology" title="Ranking Methodology" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            The strongest brainrots are judged by income, rarity, cost efficiency, availability, event status, and how hard they are to protect. Unknown values are not used to force a fake tier position.
          </p>
        </section>

        <section>
          <SectionTitle tag="Tier List" title="Tier List" align="left" />
          <div className="space-y-3 mt-8">
            {[
              ["S Tier", "Reserved for fully verified high-income or high-value entries."],
              ["A Tier", "Strong choices once income, rarity, and availability are confirmed."],
              ["B Tier", "Useful progression entries with clear tradeoffs."],
              ["Early Game", "Starter picks require cross-checked cost and income data before ranking."],
            ].map(([tier, description]) => (
              <div key={tier} className="grid md:grid-cols-[120px_1fr] rounded-lg overflow-hidden border border-[#2a2826]">
                <div className="bg-[#d4af6a] text-[#05030c] font-bold px-5 py-4">{tier}</div>
                <div className="bg-white/[0.03] px-5 py-4 text-[#8a8884]">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <EmptyState title="Best Early Game" description="Noobini Pizzanini has a low-confidence starter data record and should be cross-checked before being used in rankings." />
          <EmptyState title="Best Late Game" description="Late-game recommendations require verified high-end income and availability data before ranking." />
          <EmptyState title="Best for Beginners" description="Choose cheap, easy-to-replace brainrots until your base income can support riskier purchases." />
          <EmptyState title="Best Currently Obtainable" description="Standard rotation entries are easier to recommend than event-only or limited entries." />
          <EmptyState title="Limited or Event" description="Event picks should be ranked only after the active event source and rewards are checked." />
        </section>

        <section>
          <SectionTitle tag="Comparison" title="Full Comparison Table" align="left" />
          <DataTable
            headers={["Rank", "Brainrot", "Rarity", "Income", "Availability", "Reason"]}
            rows={[
              ["Unranked", "Noobini Pizzanini", "Common", "1 Cash/s", "Obtainable", "Low-confidence record; excluded from verified rankings."],
              ...brainrots
                .filter((brainrot) => brainrot.name !== "Noobini Pizzanini")
                .map((brainrot) => [
                  "Unranked",
                  brainrot.name,
                  brainrot.rarity ?? "Unknown",
                  brainrot.baseIncomeDisplay ?? "Unknown",
                  brainrot.availability,
                  "Needs verified stats before tier placement.",
                ]),
            ]}
          />
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/best-brainrots" />
      </div>
    </div>
  );
}
