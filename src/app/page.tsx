import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import InfoCard from "@/components/InfoCard";
import CTALink from "@/components/CTALink";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedGuides from "@/components/RelatedGuides";
import {
  PlaceholderTable,
  QuickFactsPanel,
  StatGrid,
} from "@/components/WikiBlocks";
import { allFaqs, quickFacts, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Steal a Brainrot Wiki",
  description:
    "Steal a Brainrot Wiki homepage prepared for verified brainrot data, traits, event guides, index progress, and FAQs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Steal a Brainrot Wiki",
    description:
      "A structured fan-made wiki prepared for verified Steal a Brainrot data and guides.",
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
            A structured wiki foundation for verified brainrot entries, traits, index progress, event schedules, and future guide content.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <CTALink href="/brainrots" variant="primary">
              Browse Brainrots
            </CTALink>
            <CTALink href="/traits" variant="secondary">
              View Traits
            </CTALink>
          </div>
          <StatGrid
            items={[
              { label: "Brainrots", value: "Data Pending" },
              { label: "Traits", value: "Data Pending" },
              { label: "Indexes", value: "Data Pending" },
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
                This homepage is prepared to introduce Steal a Brainrot once verified gameplay information is ready.
              </p>
              <p className="text-base leading-relaxed text-[#8a8884]">
                The structure supports concise overview copy, collection guidance, and links into the main database and event guide pages without publishing unverified facts.
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
              { title: "Brainrots", href: "/brainrots", tag: "Database", description: "Prepared for verified costs, income, rarity, and availability." },
              { title: "Traits", href: "/traits", tag: "Database", description: "Prepared for verified effects, multipliers, and acquisition sources." },
              { title: "Index", href: "/index", tag: "Reference", description: "Prepared for collection progress, rewards, and missing entries." },
              { title: "Best Brainrots", href: "/best-brainrots", tag: "Guide", description: "Prepared for verified ranking methodology and comparison data." },
            ].map((item) => (
              <InfoCard key={item.href} tag={item.tag} title={item.title} description={item.description} href={item.href} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Preview" title="Brainrot Database Preview" align="left" />
          <div className="mt-8">
            <PlaceholderTable
              headers={["Image", "Name", "Rarity", "Base Cost", "Base Income", "Availability"]}
              emptyTitle="Brainrot data is being prepared."
              emptyDescription="This table is ready for verified brainrot entries. No fictional brainrot names are published."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Preview" title="Trait Database Preview" align="left" />
          <div className="mt-8">
            <PlaceholderTable
              headers={["Trait", "Multiplier", "Source", "Availability"]}
              emptyTitle="Trait data is being prepared."
              emptyDescription="Verified trait names, multipliers, sources, and availability will be added here."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Events" title="Event Guides" />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <InfoCard tag="Event" title="Admin Abuse" description="A schedule and rewards guide structure for verified Admin Abuse information." href="/admin-abuse" />
            <InfoCard tag="Event" title="Taco Tuesday" description="A weekly event guide structure for verified Taco Tuesday information." href="/taco-tuesday" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle tag="Featured" title="Featured Guides" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
            {[
              { title: "Best Brainrots", href: "/best-brainrots", tag: "Guide", description: "Ranking containers for verified data." },
              { title: "Index Guide", href: "/index", tag: "Reference", description: "Collection progress and reward structure." },
              { title: "Admin Abuse", href: "/admin-abuse", tag: "Event", description: "Schedule and preparation placeholders." },
              { title: "Taco Tuesday", href: "/taco-tuesday", tag: "Event", description: "Reward and mechanics placeholders." },
              { title: "Traits Guide", href: "/traits", tag: "Guide", description: "Trait effect and source structure." },
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
            <InfoCard title="Brainrots" description="Browse the prepared database layout." href="/brainrots" />
            <InfoCard title="Traits" description="Review the prepared trait structure." href="/traits" />
            <InfoCard title="Index" description="Open the collection index page." href="/index" />
            <InfoCard title="FAQ" description="Read placeholder questions by topic." href="/faq" />
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
            Ready for Verified Wiki Data
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto text-[#2a2826]">
            The structure is ready for verified entries, schedules, and guide content once the data is checked.
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
