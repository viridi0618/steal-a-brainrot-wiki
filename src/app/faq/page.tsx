import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedGuides from "@/components/RelatedGuides";
import SectionTitle from "@/components/SectionTitle";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Placeholder Steal a Brainrot Wiki FAQ with common questions ready for future verified answers.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <section className="py-24 md:py-32 border-b border-[#2a2826]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-[#f0ece4]">FAQ</h1>
          <p className="mt-5 text-base md:text-lg text-[#8a8884]">
            Placeholder questions and answers for the Steal a Brainrot Wiki.
          </p>
          <div className="mt-6 h-0.5 w-16 rounded-full mx-auto bg-[#d4af6a]" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Questions" title="Frequently Asked Questions" align="left" />
          <div className="mt-8">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Related" title="Related Guides" align="left" />
          <RelatedGuides excludeHref="/faq" />
        </section>
      </div>
    </div>
  );
}
