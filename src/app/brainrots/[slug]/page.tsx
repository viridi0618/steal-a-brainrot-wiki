import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WikiPageLayout from "@/components/WikiPageLayout";
import { brainrots, faqs, siteMeta } from "@/lib/data";

interface BrainrotPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return brainrots.map((brainrot) => ({
    slug: brainrot.slug,
  }));
}

export async function generateMetadata({ params }: BrainrotPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brainrot = brainrots.find((item) => item.slug === slug);

  if (!brainrot) {
    return {
      title: "Brainrot Not Found",
    };
  }

  return {
    title: brainrot.name,
    description: `${brainrot.name} placeholder guide for ${siteMeta.gameName}, including future stats, value, income, rarity, traits, mutations, and tips.`,
    alternates: {
      canonical: `/brainrots/${brainrot.slug}`,
    },
    openGraph: {
      title: `${brainrot.name} | ${siteMeta.name}`,
      description: brainrot.description,
      url: `${siteMeta.url}/brainrots/${brainrot.slug}`,
    },
  };
}

export default async function BrainrotDetailPage({ params }: BrainrotPageProps) {
  const { slug } = await params;
  const brainrot = brainrots.find((item) => item.slug === slug);

  if (!brainrot) {
    notFound();
  }

  return (
    <WikiPageLayout
      title={brainrot.name}
      description={brainrot.description}
      sections={[
        "Overview",
        "Stats",
        "Value",
        "Income",
        "Rarity",
        "Traits",
        "Mutations",
        "Tips",
      ]}
      faqs={faqs.slice(0, 5)}
      currentHref={`/brainrots/${brainrot.slug}`}
    />
  );
}
