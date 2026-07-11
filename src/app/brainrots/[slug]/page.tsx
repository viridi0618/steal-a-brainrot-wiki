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
  const shortFallback = `${brainrot.name} is a ${brainrot.rarity || 'brainrot'} in Steal a Brainrot, generating ${brainrot.baseIncomeDisplay || 'N/A'}/s at ${brainrot.baseCostDisplay || 'N/A'} Cash.`;
  const rawDesc = brainrot.description || brainrot.overview || shortFallback;
  const suffix = ' Read our guide for full stats, obtain methods, tips, and more.';
  const overviewSnippet =
    rawDesc.replace(/`/g, '').length < 130
      ? (rawDesc.replace(/`/g, '') + suffix).slice(0, 158)
      : rawDesc.replace(/`/g, '').slice(0, 158).trim() + (rawDesc.length > 158 ? '…' : '');

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
