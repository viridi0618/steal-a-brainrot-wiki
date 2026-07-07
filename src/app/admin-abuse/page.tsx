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
  title: "Admin Abuse",
  description:
    "Steal a Brainrot Admin Abuse event guide with schedule notes, rewards section, preparation tips, and timing caveats.",
  alternates: { canonical: "/admin-abuse" },
  openGraph: {
    title: "Admin Abuse | Steal a Brainrot Wiki",
    description:
      "Admin Abuse schedule notes and preparation guide for Steal a Brainrot.",
    url: `${siteConfig.url}/admin-abuse`,
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Abuse | Steal a Brainrot Guide",
    description:
      "Admin Abuse schedule caveats, rewards notes, and preparation tips.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function AdminAbusePage() {
  return (
    <div className="min-h-screen">
      <PageHero
        tag="Event Guide"
        title="Admin Abuse"
        description="Schedule notes, reward tracking, and preparation advice for the Admin Abuse event window."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <ScheduleBox
          title="Admin Abuse Schedule"
          description="Admin Abuse is commonly watched around the weekly update window. Treat the time as a planning note because live timing can shift with updates and server activity."
          time="Saturday around 3:00 PM ET, commonly tied to the weekly update window"
          checkedAt={eventVerification.adminAbuseVerifiedAt}
        />

        <section>
          <SectionTitle tag="Overview" title="Event Overview" align="left" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#8a8884]">
            Admin Abuse is an event period where developer-driven effects, unusual spawns, or server-wide activity may appear. Players usually join early because busy servers make both rewards and stealing attempts more competitive.
          </p>
        </section>

        <section>
          <SectionTitle tag="Features" title="Event Features" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Server Effects" description="Watch for server-wide events and unusual activity during the update window." />
            <EmptyState title="High Traffic" description="More players usually means more competition, more stealing, and more pressure on base defense." />
            <EmptyState title="Short Windows" description="Join before the expected window so you are not loading in after key activity starts." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Rewards" title="Reward Cards" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <EmptyState title="Event Rewards" description="List reward names only after the active event confirms them." />
            <EmptyState title="Early Join" description="Joining early is safer because event servers can fill or become chaotic quickly." />
            <EmptyState title="Limited Items" description="If limited rewards appear, record the event date and obtain method beside the reward." />
          </div>
        </section>

        <section>
          <SectionTitle tag="Preparation" title="Preparation Checklist" align="left" />
          <DataTable
            headers={["Step", "Purpose", "Notes"]}
            rows={[
              ["Join early", "Avoid missing short event actions", "Use the common schedule as a planning cue."],
              ["Protect top brainrots", "Reduce steal risk during busy servers", "Stay near high-value income pieces."],
              ["Keep cash ready", "React to event spawns or purchases", "Do not spend down right before the window."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Event Tips" align="left" />
          <EmptyState
            title="Play defensively during the first minutes."
            description="High-activity windows attract stealing attempts. Secure valuable brainrots first, then chase rewards once your base is stable."
          />
        </section>

        <section>
          <SectionTitle tag="Disclaimer" title="Schedule Disclaimer" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-[#8a8884]">
            Event times can change. Official announcements and the live game take priority over community schedule notes.
          </p>
        </section>

        <FAQSection faqs={eventFaqs} />
        <RelatedSection currentHref="/admin-abuse" />
      </div>
    </div>
  );
}
