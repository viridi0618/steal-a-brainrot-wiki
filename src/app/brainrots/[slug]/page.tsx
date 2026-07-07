import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrainrotDetailTemplate from "@/components/BrainrotDetailTemplate";
import { siteConfig } from "@/lib/data";
import {
  getPublishedBrainrotBySlug,
  publishedBrainrots,
} from "@/lib/published-data";
import { absoluteUrl } from "@/lib/site-config";

interface BrainrotPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedBrainrots.map((brainrot) => ({ slug: brainrot.slug }));
}

export async function generateMetadata({
  params,
}: BrainrotPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brainrot = getPublishedBrainrotBySlug(slug);

  if (!brainrot) {
    return {
      title: "Brainrot Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = brainrot.name;
  const overviewSnippet = brainrot.overview
    ? brainrot.overview.replace(/`/g, '').slice(0, 150) + (brainrot.overview.length > 150 ? '…' : '')
    : `${brainrot.name} — ${brainrot.rarity || 'Brainrot'} in Steal a Brainrot. Cost: ${brainrot.baseCostDisplay || 'N/A'}, Income: ${brainrot.baseIncomeDisplay || 'N/A'}.`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: overviewSnippet,
    alternates: { canonical: `/brainrots/${brainrot.slug}` },
    openGraph: {
      title,
      description: overviewSnippet,
      url: absoluteUrl(`/brainrots/${brainrot.slug}`),
      type: "article",
      locale: "en_US",
      images: [siteConfig.defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: overviewSnippet,
      images: [siteConfig.defaultSocialImage],
    },
  };
}

export default async function BrainrotPage({ params }: BrainrotPageProps) {
  const { slug } = await params;
  const brainrot = getPublishedBrainrotBySlug(slug);

  if (!brainrot) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Brainrots",
        item: absoluteUrl("/brainrots"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brainrot.name,
        item: absoluteUrl(`/brainrots/${brainrot.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BrainrotDetailTemplate brainrot={brainrot} />
    </>
  );
}
