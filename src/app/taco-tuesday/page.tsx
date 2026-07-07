import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  EmptyState,
  FAQSection,
  RelatedSection,
  ScheduleBox,
} from "@/components/WikiBlocks";
import { eventFaqs, eventVerification, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Taco Tuesday",
  description:
    "Steal a Brainrot Taco Tuesday event guide with schedule notes, Taco Trait context, rewards, and preparation tips.",
  alternates: { canonical: "/taco-tuesday" },
  openGraph: {
    title: "Taco Tuesday | Steal a Brainrot Wiki",
    description:
      "Taco Tuesday schedule notes, Taco Trait context, and preparation guide for Steal a Brainrot.",
    url: `${siteConfig.url}/taco-tuesday`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taco Tuesday | Steal a Brainrot Guide",
    description:
      "Taco Tuesday event timing, Taco Trait context, and preparation tips.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function TacoTuesdayPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Event Guide"
        title="Taco Tuesday"
        description="Weekly event notes for Taco Tuesday, including the Taco Trait source, schedule caveats, and preparation advice."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <ScheduleBox
          title="Taco Tuesday Schedule"
          description="Taco Tuesday is commonly listed as a Tuesday event tied to the Taco Trait. Check the live game near the window because event timing can shift after updates."
          time="Tuesday around 6:00 PM ET"
          checkedAt={eventVerification.tacoTuesdayVerifiedAt}
        />

        <section>
          <SectionTitle tag="Overview" title="Event Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Taco Tuesday is the weekly event page for players tracking Taco-related mechanics. It is especially useful for checking whether the Taco Trait is currently obtainable and whether event activity changes the best time to join.
          </p>
        </section>

        <section>
          <SectionTitle tag="Trait" title="Taco Trait Information" align="left" />
          <EmptyState
            title="Taco Trait"
            description="The Taco Trait is associated with Taco Tuesday. The current multiplier is marked Unknown here until verified against live game data."
          />
        </section>

        <section>
          <SectionTitle tag="Mechanics" title="Event Mechanics" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Event Window" description="Use the listed Tuesday time as a reminder, then confirm the event in game." />
            <EmptyState title="Participation" description="Join early enough to load in, secure your base, and watch for trait opportunities." />
            <EmptyState title="Availability" description="Taco-related availability should be treated as event-linked, not always active." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Rewards" title="Rewards" align="left" />
          <DataTable
            headers={["Reward", "Source", "Availability", "Notes"]}
            rows={[
              ["Taco Trait", "Taco Tuesday", "Weekly event window", "Multiplier shown as Unknown until checked."],
              ["Event rewards", "Live event activity", "Varies by event state", "Record names only after the active event confirms them."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Preparation" title="Preparation Checklist" align="left" />
          <DataTable
            headers={["Step", "Purpose", "Notes"]}
            rows={[
              ["Check the event window", "Avoid waiting at the wrong time", "Use Eastern Time as the listed reference."],
              ["Secure high-value brainrots", "Busy event servers increase steal risk", "Defend before chasing event activity."],
              ["Keep cash available", "React to useful spawns or purchases", "Avoid using all cash before the event starts."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Disclaimer" title="Schedule Disclaimer" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-[#8a8884]">
            Event timing and mechanics can change. Official announcements and the live game take priority over community schedule notes.
          </p>
        </section>

        <FAQSection faqs={eventFaqs} />
        <RelatedSection currentHref="/taco-tuesday" />
      </div>
    </div>
  );
}
