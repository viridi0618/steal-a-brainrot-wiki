import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import InfoCard from "@/components/InfoCard";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedGuides from "@/components/RelatedGuides";
import {
  brainrots,
  featuredGuides,
  homeFaqs,
  siteMeta,
  traits,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Steal a Brainrot Wiki",
  description: siteMeta.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: siteMeta.gameName,
    url: siteMeta.url,
    description: siteMeta.description,
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
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-6 text-[#d4af6a]">
            {siteMeta.name}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Steal a Brainrot Wiki
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-[#8a8884]">
            Placeholder hub for brainrots, traits, values, event schedules, tier lists, and future Steal a Brainrot guides.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Brainrots", value: "Placeholder" },
              { label: "Traits", value: "Placeholder" },
              { label: "Events", value: "2" },
              { label: "Guides", value: "Ready" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg p-4 text-center transition-all duration-300 hover:border-[#d4af6a]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid #2a2826",
                }}
              >
                <div className="text-xl md:text-2xl font-bold mb-1 text-[#d4af6a]">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[#8a8884]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        <section>
          <SectionTitle tag="Overview" title="Game Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Placeholder introduction for Steal a Brainrot. Replace this overview with concise gameplay context once final content is available.
          </p>
        </section>

        <section>
          <SectionTitle tag="Brainrots" title="Popular Brainrots" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {brainrots.map((brainrot) => (
              <InfoCard
                key={brainrot.slug}
                tag={brainrot.rarity}
                title={brainrot.name}
                description={brainrot.description}
                href={`/brainrots/${brainrot.slug}`}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Traits" title="Popular Traits" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {traits.map((trait) => (
              <InfoCard
                key={trait.slug}
                tag={trait.multiplier}
                title={trait.name}
                description={trait.description}
                href={`/traits/${trait.slug}`}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Featured" title="Featured Guides" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {featuredGuides.map((guide) => (
              <InfoCard
                key={guide.href}
                tag={guide.tag}
                title={guide.title}
                description={guide.description}
                href={guide.href}
              />
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <SectionTitle tag="FAQ" title="FAQ Preview" />
          <div className="mt-10">
            <FAQAccordion faqs={homeFaqs} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Related" title="Related Guides" />
          <RelatedGuides excludeHref="/" />
        </section>
      </div>
    </>
  );
}
