import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/WikiBlocks";
import RelatedGuides from "@/components/RelatedGuides";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search placeholder for Steal a Brainrot Guide. Use the published Brainrots, Traits, Mutations, Index, and guide pages while full search is prepared.",
  alternates: {
    canonical: absoluteUrl("/search"),
  },
  openGraph: {
    title: `Search | ${siteConfig.siteName}`,
    description:
      "Search placeholder for Steal a Brainrot Guide. Use the published wiki pages while full search is prepared.",
    url: absoluteUrl("/search"),
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Search | ${siteConfig.siteName}`,
    description:
      "Search placeholder for Steal a Brainrot Guide. Use the published wiki pages while full search is prepared.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumbs items={[{ label: "Search" }]} />

        <section className="mt-8 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-[#d4af6a]">Utility</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-[#f0ece4]">
            Search
          </h1>
          <p className="mt-5 text-lg text-[#c7c0b5] leading-8">
            Search is reserved for a future interactive finder. For now, use the
            published Brainrots, Traits, Mutations, Index, and guide pages to
            browse available wiki content.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-[#f0ece4]">Search Placeholder</h2>
          <p className="mt-4 max-w-3xl text-[#c7c0b5] leading-7">
            This utility page is intentionally excluded from search indexing
            because it does not yet contain stable canonical guide content.
          </p>
        </section>

        <RelatedGuides />
      </div>
    </div>
  );
}
