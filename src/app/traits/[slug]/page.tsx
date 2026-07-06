import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiPageLayout from "@/components/WikiPageLayout";
import { faqs, siteMeta, traits } from "@/lib/data";

interface TraitPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return traits.map((trait) => ({
    slug: trait.slug,
  }));
}

export async function generateMetadata({ params }: TraitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trait = traits.find((item) => item.slug === slug);

  if (!trait) {
    return {
      title: "Trait Not Found",
    };
  }

  return {
    title: trait.name,
    description: `${trait.name} placeholder guide for ${siteMeta.gameName}, including future effect, multiplier, obtain method, best uses, and FAQ.`,
    alternates: {
      canonical: `/traits/${trait.slug}`,
    },
    openGraph: {
      title: `${trait.name} | ${siteMeta.name}`,
      description: trait.description,
      url: `${siteMeta.url}/traits/${trait.slug}`,
    },
  };
}

export default async function TraitDetailPage({ params }: TraitPageProps) {
  const { slug } = await params;
  const trait = traits.find((item) => item.slug === slug);

  if (!trait) {
    notFound();
  }

  return (
    <WikiPageLayout
      title={trait.name}
      description={trait.description}
      sections={[
        "Overview",
        "Effect",
        "Multiplier",
        "How to Obtain",
        "Best Uses",
      ]}
      faqs={faqs.slice(0, 5)}
      currentHref={`/traits/${trait.slug}`}
    />
  );
}
