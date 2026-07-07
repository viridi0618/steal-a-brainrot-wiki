import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TraitDetailTemplate from "@/components/TraitDetailTemplate";
import { siteConfig, traits } from "@/lib/data";
import { absoluteUrl } from "@/lib/site-config";
import { getTraitBySlug } from "@/data/traits";

interface TraitPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return traits.map((trait) => ({ slug: trait.slug }));
}

export async function generateMetadata({
  params,
}: TraitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trait = getTraitBySlug(slug);

  if (!trait) {
    return {
      title: "Trait Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${trait.name} Trait | Steal a Brainrot Guide`;
  const description = `${trait.name} Trait record with multiplier, source, availability, verification status, and source notes.`;

  return {
    title,
    description,
    alternates: { canonical: `/traits/${trait.slug}` },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/traits/${trait.slug}`),
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

export default async function TraitPage({ params }: TraitPageProps) {
  const { slug } = await params;
  const trait = getTraitBySlug(slug);

  if (!trait) {
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
        name: "Traits",
        item: absoluteUrl("/traits"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: trait.name,
        item: absoluteUrl(`/traits/${trait.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TraitDetailTemplate trait={trait} />
    </>
  );
}
