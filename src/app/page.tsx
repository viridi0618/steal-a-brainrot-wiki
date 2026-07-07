import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import InfoCard from "@/components/InfoCard";
import CTALink from "@/components/CTALink";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedGuides from "@/components/RelatedGuides";
import {
  DataTable,
  QuickFactsPanel,
  StatGrid,
} from "@/components/WikiBlocks";
import { allFaqs, brainrots, quickFacts, siteConfig, traits } from "@/lib/data";

export const metadata: Metadata = {
  title: "Steal a Brainrot Wiki - Brainrots, Traits, Index & Event Guides",
  description:
    "Steal a Brainrot Wiki homepage with concise brainrot entries, trait notes, event guides, index help, and FAQs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Steal a Brainrot Wiki",
    description:
      "A fan-made Steal a Brainrot wiki for brainrots, traits, events, index progress, and practical game guidance.",
    url: siteConfig.url,
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
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
            {siteConfig.name}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Steal a Brainrot Wiki
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-[#8a8884]">
            Track brainrots, trait sources, event windows, Index progress, and beginner decisions for the Roblox game Steal a Brainrot.
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
              { label: "Brainrots", value: `${brainrots.length}` },
              { label: "Traits", value: `${traits.length}` },
              { label: "Index Guide", value: "1" },
              { label: "Event Guides", value: "2" },
            ]}
          />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="About the Game" title="Game Introduction" align="left" />
          <div className="grid md:grid-cols-5 gap-8 mt-10">
            <div className="md:col-span-3 space-y-4">
              <p className="text-base leading-relaxed text-[#f0ece4]">
                Steal a Brainrot is a Roblox tycoon and collection game about buying brainrots, earning cash from them, stealing stronger ones from other players, and protecting your own base.
              </p>
              <p className="text-base leading-relaxed text-[#8a8884]">
                This wiki focuses on concise reference pages: known brainrot entries, trait and mutation notes, event schedules, Index guidance, and practical tips that avoid invented numbers.
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
              { title: "Brainrots", href: "/brainrots", tag: "Database", description: "Known entries with rarity, cost, income, acquisition, and availability fields." },
              { title: "Traits", href: "/traits", tag: "Database", description: "Mutation and event-trait notes with multiplier fields marked carefully." },
              { title: "Index", href: "/index", tag: "Reference", description: "Collection progress help for owned, missing, and event-linked brainrots." },
              { title: "Best Brainrots", href: "/best-brainrots", tag: "Guide", description: "Ranking criteria based on income, rarity, access, and steal risk." },
            ].map((item) => (
              <InfoCard key={item.href} tag={item.tag} title={item.title} description={item.description} href={item.href} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Popular Brainrots" title="Popular Brainrots" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Name", "Rarity", "Base Cost", "Base Income", "Availability"]}
              rows={brainrots.slice(0, 5).map((brainrot) => [
                brainrot.name,
                brainrot.rarity,
                brainrot.baseCost,
                brainrot.baseIncome,
                brainrot.availability,
              ])}
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Popular Traits" title="Popular Traits" align="left" />
          <div className="mt-8">
            <DataTable
              headers={["Trait", "Multiplier", "Source", "Availability"]}
              rows={traits.map((trait) => [
                trait.name,
                trait.multiplier,
                trait.acquisitionSource,
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
            <InfoCard tag="Event" title="Admin Abuse" description="A commonly watched event window around the weekly update period." href="/admin-abuse" />
            <InfoCard tag="Event" title="Taco Tuesday" description="A weekly Taco Trait event reference with schedule caveats and prep tips." href="/taco-tuesday" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Featured" title="Featured Guides" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
            {[
              { title: "Best Brainrots", href: "/best-brainrots", tag: "Guide", description: "How to compare income, rarity, and risk." },
              { title: "Index Guide", href: "/index", tag: "Reference", description: "How collection progress is organized." },
              { title: "Admin Abuse", href: "/admin-abuse", tag: "Event", description: "Schedule notes and preparation advice." },
              { title: "Taco Tuesday", href: "/taco-tuesday", tag: "Event", description: "Taco Trait context and event timing." },
              { title: "Traits Guide", href: "/traits", tag: "Guide", description: "Trait categories, sources, and unknown values." },
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
            <InfoCard title="Brainrots" description="Browse known brainrot entries and stat fields." href="/brainrots" />
            <InfoCard title="Traits" description="Review mutation and event trait notes." href="/traits" />
            <InfoCard title="Index" description="Open the collection index page." href="/index" />
            <InfoCard title="FAQ" description="Read short answers by topic." href="/faq" />
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
            Start with the brainrot list, compare trait notes, then use event pages to plan around weekly activity.
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
