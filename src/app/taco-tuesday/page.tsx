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
  title: "Taco Tuesday",
  description:
    "Steal a Brainrot Taco Tuesday event page prepared for verified schedules, Taco Trait notes, rewards, mechanics, and preparation tips.",
  alternates: { canonical: "/taco-tuesday" },
  openGraph: {
    title: "Taco Tuesday | Steal a Brainrot Wiki",
    description:
      "Event guide structure prepared for verified Taco Tuesday schedule, rewards, and mechanics.",
    url: `${siteConfig.url}/taco-tuesday`,
  },
};

export default function TacoTuesdayPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Event Guide"
        title="Taco Tuesday"
        description="A dedicated weekly event structure for verified schedule details, Taco Trait information, rewards, and preparation notes."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <ScheduleBox
          title="Taco Tuesday Schedule"
          description="Schedule information is pending verification. Add confirmed timing, timezone, and last-checked information here."
        />

        <section>
          <SectionTitle tag="Overview" title="Event Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            This section is prepared for a concise explanation of Taco Tuesday once mechanics, timing, and reward behavior are verified.
          </p>
        </section>

        <section>
          <SectionTitle tag="Trait" title="Taco Trait Information" align="left" />
          <EmptyState
            title="Taco Trait details are pending."
            description="Verified effect, multiplier, source, and availability details can be added here later."
          />
        </section>

        <section>
          <SectionTitle tag="Mechanics" title="Event Mechanics" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Mechanic Slot" description="Verified event mechanic details will appear here." />
            <EmptyState title="Participation" description="Verified participation notes will appear here." />
            <EmptyState title="Availability" description="Verified availability notes will appear here." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Rewards" title="Possible Rewards" align="left" />
          <PlaceholderTable
            headers={["Reward", "Source", "Availability", "Verification Status"]}
            emptyTitle="Reward data is pending."
            emptyDescription="Verified Taco Tuesday reward information can be added to this table."
          />
        </section>

        <section>
          <SectionTitle tag="Preparation" title="Preparation Checklist" align="left" />
          <PlaceholderTable
            headers={["Step", "Purpose", "Verification Status"]}
            emptyTitle="Preparation steps are pending."
            emptyDescription="Verified preparation checklist items can be added after event behavior is confirmed."
          />
        </section>

        <section>
          <SectionTitle tag="Disclaimer" title="Schedule Disclaimer" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-[#8a8884]">
            Event timing and mechanics should be checked before publishing exact schedule or multiplier information.
          </p>
        </section>

        <FAQSection faqs={eventFaqs} />
        <RelatedSection currentHref="/taco-tuesday" />
      </div>
    </div>
  );
}
