import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrainrotDetailTemplate from "@/components/BrainrotDetailTemplate";
import { brainrots, siteConfig } from "@/lib/data";
import { absoluteUrl } from "@/lib/site-config";
import { getBrainrotBySlug } from "@/data/brainrots";

interface BrainrotPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return brainrots.map((brainrot) => ({ slug: brainrot.slug }));
}

export async function generateMetadata({
  params,
}: BrainrotPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brainrot = getBrainrotBySlug(slug);

  if (!brainrot) {
    return {
      title: "Brainrot Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${brainrot.name} | Steal a Brainrot Guide`;
  const description = `${brainrot.name} Brainrot record with rarity, base cost, base income, availability, verification status, and source notes.`;

  return {
    title,
    description,
    alternates: { canonical: `/brainrots/${brainrot.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/brainrots/${brainrot.slug}`),
      images: [siteConfig.defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.defaultSocialImage],
    },
  };
}

export default async function BrainrotPage({ params }: BrainrotPageProps) {
  const { slug } = await params;
  const brainrot = getBrainrotBySlug(slug);

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
