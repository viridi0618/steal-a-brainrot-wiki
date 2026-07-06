import type { Metadata } from "next";
import InfoCard from "@/components/InfoCard";
import RelatedGuides from "@/components/RelatedGuides";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";
import { brainrots, faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Brainrots",
  description: "Placeholder Steal a Brainrot brainrots list with future stats, values, income, traits, and mutations.",
  alternates: {
    canonical: "/brainrots",
  },
};

export default function BrainrotsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-24 md:py-32 border-b border-[#2a2826]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-[#f0ece4]">Brainrots</h1>
          <p className="mt-5 text-base md:text-lg text-[#8a8884]">
            Placeholder overview for all Steal a Brainrot entries.
          </p>
          <div className="mt-6 h-0.5 w-16 rounded-full mx-auto bg-[#d4af6a]" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Overview" title="Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Placeholder content for the brainrots overview. Add collection notes, value context, and progression details later.
          </p>
        </section>

        <section>
          <SectionTitle tag="List" title="All Brainrots" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
          <SectionTitle tag="FAQ" title="Frequently Asked Questions" align="left" />
          <div className="mt-8">
            <FAQAccordion faqs={faqs.slice(0, 5)} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Related" title="Related Guides" align="left" />
          <RelatedGuides excludeHref="/brainrots" />
        </section>
      </div>
    </div>
  );
}
