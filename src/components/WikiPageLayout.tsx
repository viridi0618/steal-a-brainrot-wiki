import FAQAccordion from './FAQAccordion';
import RelatedGuides from './RelatedGuides';
import SectionTitle from './SectionTitle';
import type { FAQ } from '@/lib/types';

interface WikiPageLayoutProps {
  title: string;
  description: string;
  sections: string[];
  faqs: FAQ[];
  currentHref: string;
}

export default function WikiPageLayout({
  title,
  description,
  sections,
  faqs,
  currentHref,
}: WikiPageLayoutProps) {
  return (
    <div className="min-h-screen">
      <section className="py-24 md:py-32 border-b border-[#2a2826]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-[#f0ece4]">
            {title}
          </h1>
          <p className="mt-5 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#8a8884]">
            {description}
          </p>
          <div className="mt-6 h-0.5 w-16 rounded-full mx-auto bg-[#d4af6a]" />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {sections.map((section) => (
          <section key={section}>
            <SectionTitle tag="Placeholder" title={section} align="left" />
            <p className="mt-6 text-base leading-relaxed text-[#8a8884]">
              Placeholder content for the {section.toLowerCase()} section. Replace this with verified Steal a Brainrot details when the guide is ready for publication.
            </p>
          </section>
        ))}

        <section>
          <SectionTitle tag="FAQ" title="Frequently Asked Questions" align="left" />
          <div className="mt-8">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section>
          <SectionTitle tag="Related" title="Related Guides" align="left" />
          <RelatedGuides excludeHref={currentHref} />
        </section>
      </div>
    </div>
  );
}
