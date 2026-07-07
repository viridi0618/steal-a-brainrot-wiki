import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedGuides from "@/components/RelatedGuides";
import SectionTitle from "@/components/SectionTitle";
import {
  allFaqs,
  brainrotFaqs,
  eventFaqs,
  gameplayFaqs,
  indexFaqs,
  siteConfig,
  traitFaqs,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Steal a Brainrot Wiki FAQ for gameplay, brainrots, traits, index progress, Admin Abuse, and Taco Tuesday.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Steal a Brainrot Wiki",
    description:
      "Categorized Steal a Brainrot answers for gameplay, brainrots, traits, index progress, and events.",
    url: `${siteConfig.url}/faq`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Steal a Brainrot Guide",
    description:
      "Answers for Steal a Brainrot gameplay, Brainrots, Traits, Index progress, and events.",
    images: [siteConfig.defaultSocialImage],
  },
};

const categories = [
  { id: "gameplay", title: "Gameplay FAQ", faqs: gameplayFaqs },
  { id: "brainrots", title: "Brainrot FAQ", faqs: brainrotFaqs },
  { id: "traits", title: "Trait FAQ", faqs: traitFaqs },
  { id: "index", title: "Index FAQ", faqs: indexFaqs },
  { id: "events", title: "Event FAQ", faqs: eventFaqs },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="min-h-screen">
      <PageHero
        tag="Help"
        title="FAQ"
        description="Short answers for Steal a Brainrot gameplay, brainrots, traits, the Index, Admin Abuse, and Taco Tuesday."
      />

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        <section>
          <SectionTitle tag="Categories" title="FAQ Category Navigation" align="left" />
          <div className="flex flex-wrap gap-3 mt-8">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-full border border-[#2a2826] px-4 py-2 text-sm text-[#d4af6a] hover:border-[#d4af6a] transition-colors"
              >
                {category.title}
              </a>
            ))}
          </div>
        </section>

        {categories.map((category) => (
          <section key={category.id} id={category.id}>
            <SectionTitle tag="FAQ" title={category.title} align="left" />
            <div className="mt-8">
              <FAQAccordion faqs={category.faqs} />
            </div>
          </section>
        ))}

        <section>
          <SectionTitle tag="Links" title="Useful Links" align="left" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Brainrots", href: "/brainrots" },
              { label: "Traits", href: "/traits" },
              { label: "Index", href: "/index" },
              { label: "Events", href: "/admin-abuse" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-4 text-sm text-[#f0ece4] hover:border-[#d4af6a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Related" title="Related Guides" align="left" />
          <RelatedGuides excludeHref="/faq" />
        </section>
      </div>
    </div>
    </>
  );
}
