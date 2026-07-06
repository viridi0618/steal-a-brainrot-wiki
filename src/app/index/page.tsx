import type { Metadata } from "next";
import WikiPageLayout from "@/components/WikiPageLayout";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Complete Brainrot Index",
  description: "Placeholder complete Steal a Brainrot index with future search and full brainrot listings.",
  alternates: {
    canonical: "/index",
  },
};

export default function IndexPage() {
  return (
    <WikiPageLayout
      title="Complete Brainrot Index"
      description="Placeholder master index for every Steal a Brainrot entry."
      sections={["Overview", "Complete Brainrot Index", "Search Placeholder"]}
      faqs={faqs.slice(0, 5)}
      currentHref="/index"
    />
  );
}
