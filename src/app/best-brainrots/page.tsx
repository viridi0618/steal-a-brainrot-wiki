import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  FAQSection,
  RelatedSection,
} from "@/components/WikiBlocks";
import { brainrotFaqs, publishedBrainrots, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Brainrots",
  description:
    "Steal a Brainrot best brainrots guide with ranking criteria for income, rarity, value, availability, and steal risk.",
  alternates: { canonical: "/best-brainrots" },
  openGraph: {
    title: "Best Brainrots | Steal a Brainrot Guide",
    description:
      "Compare Steal a Brainrot entries with clear ranking criteria and published stats.",
    url: `${siteConfig.url}/best-brainrots`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Brainrots | Steal a Brainrot Guide",
    description:
      "Ranking criteria for Steal a Brainrot records using the published dataset.",
    images: [siteConfig.defaultSocialImage],
  },
};

function byIncomeDesc<T extends { baseIncomeValue: number | null }>(records: T[]) {
  return [...records].sort((a, b) => (b.baseIncomeValue ?? 0) - (a.baseIncomeValue ?? 0));
}

function brainrotLink(brainrot: (typeof publishedBrainrots)[number]) {
  return (
    <Link href={`/brainrots/${brainrot.slug}`} className="text-[#d4af6a] hover:text-[#f0ece4]">
      {brainrot.name}
    </Link>
  );
}

export default function BestBrainrotsPage() {
  const ranked = byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.baseIncomeValue !== null));

  const byRarity = {
    common: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Common" && brainrot.baseIncomeValue !== null)),
    rare: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Rare" && brainrot.baseIncomeValue !== null)),
    epic: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Epic" && brainrot.baseIncomeValue !== null)),
    legendary: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Legendary" && brainrot.baseIncomeValue !== null)),
    mythic: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Mythic" && brainrot.baseIncomeValue !== null)),
    brainrotGod: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Brainrot God" && brainrot.baseIncomeValue !== null)),
    secret: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "Secret" && brainrot.baseIncomeValue !== null)),
    og: byIncomeDesc(publishedBrainrots.filter((brainrot) => brainrot.rarity === "OG" && brainrot.baseIncomeValue !== null)),
  };

  return (
    <div className="min-h-screen">
      <PageHero
        tag="Guide"
        title="Best Brainrots"
        description="Rankings by income across rarity tiers using the current published Brainrot dataset."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Methodology" title="How We Rank" align="left" />
          <div className="mt-6 space-y-3 text-base leading-relaxed text-[#8a8884] max-w-3xl">
            <p>Brainrots are ranked by <strong className="text-[#f0ece4]">base income per second</strong> within each rarity tier. Higher rarity brainrots often outperform lower tiers, but cost efficiency and availability still matter.</p>
            <p>Rankings use the current structured base-income dataset. Individual detail pages list the sources and data notes attached to each record.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Top 10" title="Top 10 Highest Income" align="left" />
          <DataTable
            headers={["#", "Brainrot", "Rarity", "Income", "Cost", "Availability"]}
            rows={ranked.slice(0, 10).map((brainrot, index) => [
              `${index + 1}`,
              brainrotLink(brainrot),
              brainrot.rarity ?? "Unknown",
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
              brainrot.availability,
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Ranking by base income only. Mutation and trait multipliers can change actual performance.</p>
        </section>

        <section>
          <SectionTitle tag="Common" title="Best Common Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost", "Cost/Income Ratio"]}
            rows={byRarity.common.slice(0, 5).map((brainrot) => {
              const ratio = brainrot.baseCostValue && brainrot.baseIncomeValue ? (brainrot.baseCostValue / brainrot.baseIncomeValue).toFixed(0) : "Unknown";
              return [brainrotLink(brainrot), brainrot.baseIncomeDisplay ?? "Unknown", brainrot.baseCostDisplay ?? "Unknown", `${ratio} seconds`];
            })}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Cost/income ratio shows how many seconds it takes to earn back the purchase cost. Lower is better.</p>
        </section>

        <section>
          <SectionTitle tag="Rare" title="Best Rare Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost", "Availability"]}
            rows={byRarity.rare.slice(0, 5).map((brainrot) => [
              brainrotLink(brainrot),
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
              brainrot.availability,
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Epic" title="Best Epic Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.epic.slice(0, 5).map((brainrot) => [
              brainrotLink(brainrot),
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Legendary" title="Best Legendary Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.legendary.slice(0, 5).map((brainrot) => [
              brainrotLink(brainrot),
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Pity system guarantees a Legendary spawn every 5 minutes.</p>
        </section>

        <section>
          <SectionTitle tag="Mythic" title="Best Mythic Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.mythic.slice(0, 5).map((brainrot) => [
              brainrotLink(brainrot),
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Pity system guarantees a Mythic spawn every 15 minutes.</p>
        </section>

        <section>
          <SectionTitle tag="Brainrot God" title="Best Brainrot Gods" align="left" />
          <DataTable
            headers={["Brainrot", "Income", "Cost"]}
            rows={byRarity.brainrotGod.slice(0, 5).map((brainrot) => [
              brainrotLink(brainrot),
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
            ])}
          />
        </section>

        <section>
          <SectionTitle tag="Secret+OG" title="Best Secret and OG Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Rarity", "Income", "Cost", "Availability"]}
            rows={[...byRarity.secret, ...byRarity.og].slice(0, 10).map((brainrot) => [
              brainrotLink(brainrot),
              brainrot.rarity ?? "Unknown",
              brainrot.baseIncomeDisplay ?? "Unknown",
              brainrot.baseCostDisplay ?? "Unknown",
              brainrot.availability,
            ])}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Secret and OG brainrots are high-risk targets. See individual detail pages for sources and data notes attached to each record.</p>
        </section>

        <section>
          <SectionTitle tag="Beginner" title="Beginner Recommendation" align="left" />
          <div className="mt-8 p-6 rounded-lg border border-[#d4af6a] bg-[#d4af6a]/5">
            <h3 className="text-lg font-semibold text-[#f0ece4] mb-3">Start Here</h3>
            <ol className="space-y-2 text-[#8a8884] list-decimal list-inside">
              <li>Buy <strong className="text-[#f0ece4]">Noobini Pizzanini</strong> (25 Cash, 1/s) as your first income source.</li>
              <li>Upgrade to <strong className="text-[#f0ece4]">Lirili Larila</strong> (250 Cash, 3/s) or <strong className="text-[#f0ece4]">Tim Cheese</strong> (500 Cash, 5/s).</li>
              <li>Build up to <strong className="text-[#f0ece4]">Pipi Corni</strong> (1.7K, 14/s), the strongest Common in the current dataset.</li>
              <li>Break into Rare tier with records such as <strong className="text-[#f0ece4]">Trippi Troppi</strong> or <strong className="text-[#f0ece4]">Cacto Hipopotamo</strong>.</li>
              <li>Once you can afford Legendary+, defend aggressively because high-income records attract steal attempts.</li>
            </ol>
          </div>
        </section>

        <FAQSection faqs={brainrotFaqs} />
        <RelatedSection currentHref="/best-brainrots" />
      </div>
    </div>
  );
}
