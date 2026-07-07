import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
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
      "Compare Steal a Brainrot entries with clear ranking criteria and verified stats.",
    url: `${siteConfig.url}/best-brainrots`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Brainrots | Steal a Brainrot Guide",
    description:
      "Ranking criteria for Steal a Brainrot records backed by verified data.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function BestBrainrotsPage() {
  // Rankings based on verified income data
  const ranked = brainrots
    .filter((b) => b.baseIncomeValue !== null && !b.needsReview)
    .sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0));

  // Best by tier
  const byRarity = {
    common: brainrots.filter((b) => b.rarity === "Common" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    rare: brainrots.filter((b) => b.rarity === "Rare" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    epic: brainrots.filter((b) => b.rarity === "Epic" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    legendary: brainrots.filter((b) => b.rarity === "Legendary" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    mythic: brainrots.filter((b) => b.rarity === "Mythic" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    brainrotGod: brainrots.filter((b) => b.rarity === "Brainrot God" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    secret: brainrots.filter((b) => b.rarity === "Secret" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
    og: brainrots.filter((b) => b.rarity === "OG" && b.baseIncomeValue !== null).sort((a, b) => (b.baseIncomeValue || 0) - (a.baseIncomeValue || 0)),
  };

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Guide"
        title="Best Brainrots"
        description="Rankings by income across all rarity tiers, backed by verified data from GameRant and Eldorado.gg."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Methodology" title="How We Rank" align="left" />
          <div className="mt-6 space-y-3 text-base leading-relaxed text-[#8a8884] max-w-3xl">
            <p>Brainrots are ranked by <strong className="text-[#f0ece4]">base income per second</strong> within each rarity tier. Higher rarity brainrots almost always outperform lower tiers, but cost efficiency matters too.</p>
            <p>Key factors: income rate, cost-to-income ratio, availability (Obtainable vs Limited/Removed), steal risk (high-value units are targets), and mutation/trait stacking potential.</p>
            <p>All stats sourced from GameRant (March 2026) and cross-checked against Eldorado.gg market data where available. Conflict notes are shown inline.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Top 10" title="Top 10 Highest Income" align="left" />
          <DataTable
            headers={["#", "Brainrot", "Rarity", "Income", "Cost", "Availability"]}
            rows={ranked.slice(0, 10).map((b, i) => [
              `${i + 1}`,
              b.name,
              b.rarity ?? "—",
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
              b.availability,
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Note: Ranking by base income only. Mutation and trait multipliers can dramatically change actual performance.</p>
        </section>

        <section>
          <SectionTitle tag="Common" title="Best Common Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost", "Cost/Income Ratio"]}
            rows={byRarity.common.slice(0, 5).map((b) => {
              const ratio = b.baseCostValue && b.baseIncomeValue ? (b.baseCostValue / b.baseIncomeValue).toFixed(0) : "—";
              return [b.name, b.baseIncomeDisplay ?? "—", b.baseCostDisplay ?? "—", `${ratio} seconds`];
            })}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Cost/income ratio shows how many seconds it takes to earn back the purchase cost. Lower is better.</p>
        </section>

        <section>
          <SectionTitle tag="Rare" title="Best Rare Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost", "Notes"]}
            rows={byRarity.rare.slice(0, 5).map((b) => [
              b.name,
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
              b.availability === "Removed" ? "⚠️ Removed from rotation" : "Obtainable",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Epic" title="Best Epic Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.epic.slice(0, 5).map((b) => [
              b.name,
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Legendary" title="Best Legendary Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.legendary.slice(0, 5).map((b) => [
              b.name,
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Pity system guarantees a Legendary spawn every 5 minutes.</p>
        </section>

        <section>
          <SectionTitle tag="Mythic" title="Best Mythic Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.mythic.slice(0, 5).map((b) => [
              b.name,
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Pity system guarantees a Mythic spawn every 15 minutes.</p>
        </section>

        <section>
          <SectionTitle tag="Brainrot God" title="Best Brainrot Gods" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.brainrotGod.slice(0, 5).map((b) => [
              b.name,
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Secret+OG" title="Best Secret & OG Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Rarity", "Income", "Cost", "Availability"]}
            rows={[...byRarity.secret, ...byRarity.og].slice(0, 10).map((b) => [
              b.name,
              b.rarity ?? "—",
              b.baseIncomeDisplay ?? "—",
              b.baseCostDisplay ?? "—",
              b.availability,
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Secret and OG brainrots can be worth real money. See individual detail pages for trading values and exist counts.</p>
        </section>

        <section>
          <SectionTitle tag="Beginner" title="Beginner Recommendation" align="left" />
          <div className="mt-8 p-6 rounded-lg border border-[#d4af6a] bg-[#d4af6a]/5">
            <h3 className="text-lg font-semibold text-[#f0ece4] mb-3">Start Here</h3>
            <ol className="space-y-2 text-[#8a8884] list-decimal list-inside">
              <li>Buy <strong className="text-[#f0ece4]">Noobini Pizzanini</strong> (25 Cash, 1/s) — your first income source</li>
              <li>Upgrade to <strong className="text-[#f0ece4]">Lirili Larila</strong> (250 Cash, 3/s) or <strong className="text-[#f0ece4]">Tim Cheese</strong> (500 Cash, 5/s)</li>
              <li>Build up to <strong className="text-[#f0ece4]">Pipi Corni</strong> (1.7K, 14/s) — strongest Common</li>
              <li>Break into Rare tier: <strong className="text-[#f0ece4]">Trippi Troppi</strong> (2K, 15/s) or <strong className="text-[#f0ece4]">Cacto Hipopotamo</strong> (6.5K, 50/s)</li>
              <li>Aim for Epic tier: <strong className="text-[#f0ece4]">Brr Brr Patapim</strong> (15K, 100/s) or <strong className="text-[#f0ece4]">Penguino Cocosino</strong> (45K, 300/s)</li>
              <li>Always keep cash in reserve — never spend to zero before events</li>
              <li>Once you can afford Legendary+, defend aggressively — these are steal magnets</li>
            </ol>
          </div>
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/best-brainrots" />
      </div>
    </div>
  );
}
