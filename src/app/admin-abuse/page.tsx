import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import {
  DataTable,
  FAQSection,
  RelatedSection,
  ScheduleBox,
} from "@/components/WikiBlocks";
import { eventFaqs, eventVerification, siteConfig } from "@/lib/data";
import { absoluteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admin Abuse",
  description:
    "Steal a Brainrot Admin Abuse event guide: schedule, boosted spawns, lucky block drops, mutation/trait farming, event mutations, and preparation tips.",
  alternates: { canonical: "/admin-abuse" },
  openGraph: {
    title: "Admin Abuse | Steal a Brainrot Guide",
    description:
      "Complete Admin Abuse guide for Steal a Brainrot: Saturday schedule, boosted spawns, event mutations list, and farming tips.",
    url: `${siteConfig.url}/admin-abuse`,
    type: "article",
    locale: "en_US",
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Abuse | Steal a Brainrot Guide",
    description:
      "Complete Admin Abuse event guide with schedule, boosted spawns, and mutation farming tips.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function AdminAbusePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Admin Abuse", item: absoluteUrl("/admin-abuse") },
            ],
          }),
        }}
      />
    <div className="min-h-screen">
      <PageHero
        tag="Event Guide"
        title="Admin Abuse"
        description="The weekly Admin Abuse event massively boosts spawn rates, introduces event mutations, and enables trait farming. Occurs on Saturdays at ~3:00 PM ET."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <ScheduleBox
          title="Admin Abuse Schedule"
          description="Admin Abuse is the weekly developer event where Sammy activates boosted spawn rates, event mutations, and special effects. Duration is typically 30–45 minutes."
          time="Saturday around 3:00 PM ET (weekly)"
          checkedAt={eventVerification.adminAbuseVerifiedAt}
        />

        <section>
          <SectionTitle tag="Overview" title="What is Admin Abuse?" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>Admin Abuse is the most important weekly event in Steal a Brainrot. During this window, the game developer (Sammy) activates special server-wide effects that dramatically change gameplay.</p>
            <p>Key effects include: <strong className="text-[#f0ece4]">massively increased brainrot spawn rates</strong> on the Red Carpet, <strong className="text-[#f0ece4]">event mutation availability</strong> (Bloodrot, Candy, Lava, Galaxy, Yin Yang, Radioactive, Cursed, Divine, Cyber, Phantom), <strong className="text-[#f0ece4]">Admin Lucky Block spawns</strong>, and <strong className="text-[#f0ece4]">trait application events</strong>.</p>
            <p>Admin Abuse typically lasts 30–45 minutes. Joining before the expected window is critical — late arrivals may miss the best spawns entirely.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Luck" title="Luck Boosters Summary" align="left" />
          <DataTable
            headers={["Luck Multiplier", "Source", "Availability"]}
            rows={[
              ["2x", "Robux Shop, Admin Abuse, wheel spin, Admin Machine, Advent Calendar", "Regular"],
              ["4x", "Robux Shop, Admin Abuse, Admin Machine, Advent Calendar", "Regular"],
              ["6x", "Admin Abuse, Admin Machine", "Event"],
              ["8x", "Admin Abuse, Admin Machine", "Event"],
              ["10x", "Admin Abuse, Admin Machine", "Event"],
              ["12x", "Admin Abuse, Admin Machine", "Event (best regular)"],
              ["15x", "Christmas Admin Abuse", "Seasonal"],
              ["20x", "Valentine's Day Admin Abuse", "Seasonal"],
            ]}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Higher luck dramatically improves Red Carpet spawn rates. With 12x luck, Strawberry Elephant&apos;s spawn chance improves from ~1-in-6B to ~1-in-508M.</p>
        </section>

        <section>
          <SectionTitle tag="Mutations" title="Event Mutations (Admin Abuse Only)" align="left" />
          <DataTable
            headers={["Mutation", "Multiplier", "Event Required"]}
            rows={[
              ["Bloodrot", "2x", "Bloodmoon event"],
              ["Candy", "4x", "Candy Aurora event"],
              ["Lava", "6x", "Molten event"],
              ["Galaxy", "7x", "Galactic event"],
              ["Yin Yang", "7.5x", "Yin Yang event"],
              ["Radioactive", "8.5x", "Radioactive event"],
              ["Cursed", "9x", "Cursed event"],
              ["Divine", "10x", "Divine event (+ free Halo 6x trait)"],
              ["Cyber", "11x", "Cyber event"],
              ["Phantom", "12x", "Phantom event (best overall since Update 53)"],
            ]}
          />
          <p className="mt-4 text-sm text-[#8a8884]">These mutations only appear during their specific Admin Abuse events. Regular mutations (Gold 1.25x, Diamond 1.5x, Rainbow 10x) are available anytime.</p>
        </section>

        <section>
          <SectionTitle tag="Features" title="What Happens During Admin Abuse" align="left" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Boosted Spawns", description: "Red Carpet spawns accelerate dramatically. Higher-rarity brainrots become far more common. The pity timer (Legendary every 5 min, Mythic every 15 min) is effectively bypassed." },
              { title: "Admin Lucky Blocks", description: "Special lucky blocks spawn containing exclusive brainrots and items not available through normal means." },
              { title: "Event Mutations", description: "Rare event-exclusive mutations (Phantom 12x, Cyber 11x, Divine 10x, etc.) become available. Rainbow (10x) is the best permanent alternative." },
              { title: "Trait Application", description: "Random brainrots receive traits (Fire, Nyan, Lightning, Bubblegum, Paint, :3, etc.) via event effects. Active ritual traits also trigger." },
              { title: "Ritual Events", description: "Rituals like La Vacca Saturno Saturnita, Chicleteira Bicicleteira, and Los Mi Gatito can trigger, applying special traits." },
              { title: "High Traffic", description: "Servers fill quickly. More players = more competition for spawns and more stealing attempts. Base defense becomes critical." },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-5">
                <h3 className="text-sm font-semibold text-[#d4af6a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#8a8884] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Preparation" title="Preparation Checklist" align="left" />
          <DataTable
            headers={["Step", "Purpose", "Notes"]}
            rows={[
              ["Use a private server", "Avoid competition and theft from randoms", "Private servers let you control the farming environment."],
              ["Join 5-10 min early", "Servers fill fast; do not miss the start", "Event window is short (30-45 min)."],
              ["Protect top brainrots", "High activity = high steal risk", "Stay near your most valuable units."],
              ["Stack cash reserves", "Buy expensive spawns immediately", "Do not spend to zero before the event."],
              ["Prepare ritual brainrots", "Ritual events may trigger unpredictably", "Have backup copies of ritual-required brainrots."],
              ["Activate luck boosters", "Maximize spawn rate during the window", "Use highest available luck multiplier."],
              ["Set up trait farming", "Position best brainrots for trait application", "Farm traits on high-rarity brainrots only."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Farming" title="Trait Farming During Admin Abuse" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>Admin Abuse is the best time to farm traits because nearly all trait application events are active simultaneously.</p>
            <p><strong className="text-[#f0ece4]">Optimal setup:</strong> ~6 players (4 running rituals, 2 handling rebuys). Use a private server. Farm traits on Brainrot God or Secret rarity brainrots — higher base income benefits more from each multiplier.</p>
            <p><strong className="text-[#f0ece4]">Watch for:</strong> Solar flares (Fire 6x), Nyan cats (Nyan 6x), lightning (Lightning 6x), spray paint (Paint 6x), crabs (Crab Claw 5x), cats (:3 5.5x), comets (Galactic 4x), explosions (Explosive 4x).</p>
            <p><strong className="text-[#f0ece4]">⚠️ Avoid Sleepy trait:</strong> The Sleepy trait (0.5x) halves income after all other calculations. A $1.4B/s brainrot drops to $700M/s.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Disclaimer" title="Schedule Disclaimer" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-[#8a8884]">
            Event times can change. Sammy may postpone or reschedule Admin Abuse. Official announcements and the live game take priority over community schedule notes. Last checked: {eventVerification.adminAbuseVerifiedAt}.
          </p>
        </section>

        <FAQSection faqs={eventFaqs} />
        <RelatedSection currentHref="/admin-abuse" />
      </div>
    </div>
    </>
  );
}
