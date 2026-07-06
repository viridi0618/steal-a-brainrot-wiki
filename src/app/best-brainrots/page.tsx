import type { Metadata } from "next";
import WikiPageLayout from "@/components/WikiPageLayout";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Best Brainrots",
  description: "Placeholder Steal a Brainrot tier list page with future early-game and late-game recommendations.",
  alternates: {
    canonical: "/best-brainrots",
  },
};

export default function BestBrainrotsPage() {
  return (
    <WikiPageLayout
      title="Best Brainrots"
      description="Placeholder page for future Steal a Brainrot rankings and progression recommendations."
      sections={["Overview", "Tier List Placeholder", "Best Early Game", "Best Late Game"]}
      faqs={faqs.slice(0, 5)}
      currentHref="/best-brainrots"
    />
  );
}
