import type { Metadata } from "next";
import WikiPageLayout from "@/components/WikiPageLayout";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Abuse",
  description: "Placeholder Steal a Brainrot Admin Abuse event guide with future schedule, rewards, and tips.",
  alternates: {
    canonical: "/admin-abuse",
  },
};

export default function AdminAbusePage() {
  return (
    <WikiPageLayout
      title="Admin Abuse"
      description="Placeholder event page for future Admin Abuse schedule, rewards, and preparation notes."
      sections={["Overview", "Event Schedule Placeholder", "Rewards", "Tips"]}
      faqs={faqs.slice(0, 5)}
      currentHref="/admin-abuse"
    />
  );
}
