import type { Metadata } from "next";
import CTALink from "@/components/CTALink";
import FAQAccordion from "@/components/FAQAccordion";
import InfoCard from "@/components/InfoCard";
import RelatedGuides from "@/components/RelatedGuides";
import SectionTitle from "@/components/SectionTitle";
import { DataTable, QuickFactsPanel, StatGrid } from "@/components/WikiBlocks";
import {
  allFaqs,
  mutations,
  publishedBrainrots,
  publishedTraits,
  quickFacts,
  siteConfig,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Steal a Brainrot Guide – Brainrots, Traits, Mutations & Events",
  },
  description:
    "A fan-made Steal a Brainrot guide with documented brainrot stats, trait multipliers, mutations, collection help, and event guides.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Steal a Brainrot Guide",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steal a Brainrot Guide",
    description: siteConfig.description,
    images: [siteConfig.defaultSocialImage],
  },
};

export default function Home() {
  const rarityTiers = new Set(publishedBrainrots.map((brainrot) => brainrot.rarity).filter(Boolean));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.url,
    description: siteConfig.description,
    about: {
      "@type": "VideoGame",
      name: siteConfig.gameName,
      url: siteConfig.officialGameUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,175,106,0.08) 0%, transparent 60%), linear-gradient(180deg, #05030c 0%, #0a0720 30%, #05030c 100%)",
          }}
        />
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,106,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-6 text-[#d4af6a]">
            {siteConfig.siteName}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Steal a Brainrot Guide
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-[#8a8884]">
            Your complete guide to Brainrot stats, Traits, Mutations, events, and collection progress.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <CTALink href="/brainrots" variant="primary">
              Browse Brainrots
            </CTALink>
            <CTALink href="/traits" variant="secondary">
              View Traits
            </CTALink>
            <CTALink href="/admin-abuse" variant="secondary">
              Check Admin Abuse
            </CTALink>
          </div>
          <StatGrid
            items={[
              { label: "Brainrot Records", value: `${publishedBrainrots.length}` },
              { label: "Trait Records", value: `${publishedTraits.length}` },
              { label: "Mutation Records", value: `${mutations.length}` },
              { label: "Rarity Tiers", value: `${rarityTiers.size}` },
            ]}
          />
          <span className="sr-only">Canonical domain: {absoluteUrl("/")}</span>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="About the Game" title="Game Introduction" align="left" />
          <div className="grid md:grid-cols-5 gap-8 mt-10">
            <div className="md:col-span-3 space-y-4">
              <p className="text-base leading-relaxed text-[#f0ece4]">
                Steal a Brainrot is a Roblox tycoon and collection game about buying Brainrots, earning cash from them, stealing stronger ones from other players, and protecting your own base.
              </p>
              <p className="text-base leading-relaxed text-[#8a8884]">
                Detailed guides, verified stats, and practical tips for every brainrot, trait, mutation, and event.
              </p>
            </div>
            <div className="md:col-span-2">
              <QuickFactsPanel title="Quick Facts" items={quickFacts} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Wiki Categories" title="Core Wiki Categories" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: "Brainrots", href: "/brainrots", tag: "Database", description: "Published entries with rarity, cost, income, acquisition, and availability fields." },
              { title: "Traits", href: "/traits", tag: "Database", description: "Trait multipliers, categories, obtain methods, and availability." },
              { title: "Mutations", href: "/mutations", tag: "Database", description: "Mutation multipliers, availability, obtain methods, and spawn rate notes." },
              { title: "Index", href: "/brainrot-index", tag: "Reference", description: "Collection progress help for owned, missing, and event-linked Brainrots." },
              { title: "Best Brainrots", href: "/best-brainrots", tag: "Guide", description: "Ranking criteria based on income, rarity, access, and steal risk." },
            ].map((item) => (
              <InfoCard key={item.href} tag={item.tag} title={item.title} description={item.description} href={item.href} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Popular Brainrots" title="Brainrot Records" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Name", "Rarity", "Base Cost", "Base Income", "Availability"]}
              rows={publishedBrainrots.slice(0, 5).map((brainrot) => [
                brainrot.name,
                brainrot.rarity ?? "Unknown",
                brainrot.baseCostDisplay ?? "Unknown",
                brainrot.baseIncomeDisplay ?? "Unknown",
                brainrot.availability,
              ])}
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Popular Traits" title="Trait Records" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Trait", "Multiplier", "Source", "Availability"]}
              rows={publishedTraits.slice(0, 8).map((trait) => [
                trait.name,
                trait.multiplierDisplay ?? "Unknown",
                trait.acquisitionMethod ?? "Unknown",
                trait.availability,
              ])}
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Events" title="Event Guides" />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <InfoCard tag="Event" title="Admin Abuse" description="Weekly Saturday event: boosted spawns, event mutations, and trait farming." href="/admin-abuse" />
            <InfoCard tag="Event" title="Taco Tuesday" description="Weekly Tuesday event: Taco Trait (3x), Fat Sammy feeding, and limited brainrots." href="/taco-tuesday" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Featured" title="Featured Guides" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
            {[
              { title: "Best Brainrots", href: "/best-brainrots", tag: "Guide", description: "Compare income, rarity, and risk to pick your next purchase." },
              { title: "Index Guide", href: "/brainrot-index", tag: "Reference", description: "Track your collection and earn permanent income boosts." },
              { title: "Admin Abuse", href: "/admin-abuse", tag: "Event", description: "Saturday event schedule, luck boosts, and mutation farming." },
              { title: "Taco Tuesday", href: "/taco-tuesday", tag: "Event", description: "Tuesday event: Taco Trait, Fat Sammy, and taco-themed brainrots." },
              { title: "Traits Guide", href: "/traits", tag: "Guide", description: "Trait multipliers, categories, and how they stack with mutations." },
            ].map((guide) => (
              <InfoCard key={guide.href} tag={guide.tag} title={guide.title} description={guide.description} href={guide.href} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Resources" title="Useful Resources" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <InfoCard title="Brainrots" description="Browse all 69 brainrots with stats, income, and acquisition details." href="/brainrots" />
            <InfoCard title="Traits" description="24 traits with multipliers, categories, and how to get them." href="/traits" />
            <InfoCard title="Mutations" description="Compare Mutation multipliers and obtain methods." href="/mutations" />
            <InfoCard title="Index" description="Open the collection Index page." href="/brainrot-index" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle tag="FAQ" title="FAQ Preview" />
          <div className="mt-10">
            <FAQAccordion faqs={allFaqs.slice(0, 5)} />
          </div>
          <div className="text-center mt-10">
            <CTALink href="/faq" variant="secondary">
              View All FAQ
            </CTALink>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Related" title="Related Guides" />
          <RelatedGuides excludeHref="/" />
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center rounded-xl py-16 bg-[#d4af6a]">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#05030c]">
            Build Your Collection With Checked Notes
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto text-[#2a2826]">
            Start with the Brainrot list, compare Trait notes, then use event pages to plan around weekly activity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTALink href="/brainrots" variant="primary">
              Browse Brainrots
            </CTALink>
            <CTALink href="/faq" variant="secondary">
              View the FAQ
            </CTALink>
          </div>
        </div>
      </section>
    </>
  );
}
