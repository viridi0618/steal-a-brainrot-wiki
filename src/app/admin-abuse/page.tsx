import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  EmptyState,
  FAQSection,
  PlaceholderTable,
  RelatedSection,
  ScheduleBox,
} from "@/components/WikiBlocks";
import { eventFaqs, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Abuse",
  description:
    "Steal a Brainrot Admin Abuse event page prepared for verified schedules, rewards, preparation notes, and event tips.",
  alternates: { canonical: "/admin-abuse" },
  openGraph: {
    title: "Admin Abuse | Steal a Brainrot Wiki",
    description:
      "Event guide structure prepared for verified Admin Abuse schedule and rewards.",
    url: `${siteConfig.url}/admin-abuse`,
  },
};

export default function AdminAbusePage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Event Guide"
        title="Admin Abuse"
        description="A dedicated event guide structure for verified schedule information, rewards, early-join notes, and preparation tips."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <ScheduleBox
          title="Admin Abuse Schedule"
          description="Schedule information is pending verification. Add confirmed event windows, timezone, and last-checked details here."
        />

        <section>
          <SectionTitle tag="Overview" title="Event Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            This section is prepared for a concise explanation of the Admin Abuse event once mechanics and timing are verified.
          </p>
        </section>

        <section>
          <SectionTitle tag="Features" title="Possible Event Features" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Feature Slot" description="Verified event feature details will appear here." />
            <EmptyState title="Server Effects" description="Verified server-wide effect notes will appear here." />
            <EmptyState title="Participation Notes" description="Verified joining and participation guidance will appear here." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Rewards" title="Reward Cards" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Reward Slot" description="Verified reward information will appear here." />
            <EmptyState title="Early-Join Reward" description="Early-join reward details are pending verification." />
            <EmptyState title="Limited Reward" description="Limited reward details are pending verification." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Preparation" title="Preparation Checklist" align="left" />
          <PlaceholderTable
            headers={["Step", "Purpose", "Verification Status"]}
            emptyTitle="Preparation steps are pending."
            emptyDescription="Verified preparation checklist items can be added after event details are checked."
          />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Event Tips" align="left" />
          <EmptyState
            title="Event tips are pending verification."
            description="This section is reserved for short, practical tips once the event behavior is confirmed."
          />
        </section>

        <section>
          <SectionTitle tag="Disclaimer" title="Schedule Disclaimer" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-[#8a8884]">
            Event times can change. This page should only show schedule details after they have been checked against a reliable source.
          </p>
        </section>

        <FAQSection faqs={eventFaqs} />
        <RelatedSection currentHref="/admin-abuse" />
      </div>
    </div>
  );
}
