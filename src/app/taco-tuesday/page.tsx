import type { Metadata } from "next";
import WikiPageLayout from "@/components/WikiPageLayout";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Taco Tuesday",
  description: "Placeholder Steal a Brainrot Taco Tuesday event guide with future schedule, rewards, and tips.",
  alternates: {
    canonical: "/taco-tuesday",
  },
};

export default function TacoTuesdayPage() {
  return (
    <WikiPageLayout
      title="Taco Tuesday"
      description="Placeholder weekly event page for future Taco Tuesday schedule, rewards, and strategy notes."
      sections={["Overview", "Schedule Placeholder", "Rewards", "Tips"]}
      faqs={faqs.slice(0, 5)}
      currentHref="/taco-tuesday"
    />
  );
}
