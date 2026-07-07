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
  title: "Taco Tuesday",
  description:
    "Steal a Brainrot Taco Tuesday event guide: schedule, Taco Trait (3x), Fat Sammy feeding, Tacorita Bicicleta crafting, and preparation tips.",
  alternates: { canonical: "/taco-tuesday" },
  openGraph: {
    title: "Taco Tuesday | Steal a Brainrot Guide",
    description:
      "Complete Taco Tuesday guide: Tuesday 6 PM ET schedule, Taco Trait details, Fat Sammy mechanics, and event preparation.",
    url: `${siteConfig.url}/taco-tuesday`,
    type: "article",
    locale: "en_US",
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taco Tuesday | Steal a Brainrot Guide",
    description:
      "Taco Tuesday event: schedule, Taco Trait (3x), Fat Sammy feeding, and crafting.",
    images: [siteConfig.defaultSocialImage],
  },
};

export default function TacoTuesdayPage() {
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
              { "@type": "ListItem", position: 2, name: "Events", item: absoluteUrl("/taco-tuesday") },
              { "@type": "ListItem", position: 3, name: "Taco Tuesday", item: absoluteUrl("/taco-tuesday") },
            ],
          }),
        }}
      />
    <div className="min-h-screen">
      <PageHero
        tag="Event Guide"
        title="Taco Tuesday"
        description="Weekly Taco Tuesday event: schedule, Taco Trait (3x), Fat Sammy feeding mechanics, Tacorita Bicicleta crafting, and event preparation."
      />

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <ScheduleBox
          title="Taco Tuesday Schedule"
          description="Taco Tuesday is a weekly event occurring on Tuesdays. It features taco-themed brainrot spawns, the Taco Trait (3x), and the Fat Sammy feeding mechanic."
          time="Tuesday around 6:00 PM ET"
          checkedAt={eventVerification.tacoTuesdayVerifiedAt}
        />

        <section>
          <SectionTitle tag="Overview" title="What is Taco Tuesday?" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>Taco Tuesday is a weekly event that introduces taco-themed content to Steal a Brainrot. It is one of the two main weekly events alongside Saturday&apos;s Admin Abuse.</p>
            <p>During Taco Tuesday, <strong className="text-[#f0ece4]">taco-themed brainrots</strong> (Capi Taco, Tipi Topi Taco, Gattito Tacoto, Chihuanini Taconini, etc.) have increased spawn rates on the Red Carpet.</p>
            <p>The <strong className="text-[#f0ece4]">Taco Trait (3x)</strong> becomes available — random brainrots can gain the Taco trait, multiplying their income by 3x with a taco visual effect.</p>
            <p><strong className="text-[#f0ece4]">Fat Sammy</strong> appears during the event. Feeding him specific taco-themed brainrots can reward special items or craft limited brainrots.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Trait" title="Taco Trait (3x)" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>The Taco Trait is a <strong className="text-[#f0ece4]">3x income multiplier</strong> that can be applied to random brainrots during Taco Tuesday events. It is an Admin Abuse-type trait, meaning it activates during the event window and affects newly spawned brainrots.</p>
            <p>Affected brainrots display a <strong className="text-[#f0ece4]">taco-themed visual effect</strong>. The trait stacks additively with mutations and other traits using the standard formula:</p>
            <p className="font-mono text-sm bg-white/[0.03] p-3 rounded-lg">Base Income × (Mutation Multiplier + (Trait Multiplier − 1) + …) = Final Income</p>
            <p>Example: A Noobini Pizzanini with Diamond (1.5x) and Taco (3x) earns 25 × (1.5 + (3 − 1)) = 25 × 3.5 = <strong className="text-[#f0ece4]">87.5 Cash/s</strong></p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Fat Sammy" title="Fat Sammy Feeding" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>Fat Sammy is a special NPC that appears during Taco Tuesday. By feeding him <strong className="text-[#f0ece4]">three taco-themed brainrots</strong>, players can trigger special rewards.</p>
            <p>One notable reward is the <strong className="text-[#f0ece4]">Tacorita Bicicleta</strong> — a Secret brainrot limited to 1 million units. Its current supply is well below this cap because many were used to craft Los Tacoritas.</p>
            <p>Feeding Fat Sammy outside of Taco Tuesday has no effect.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Brainrots" title="Taco-Themed Brainrots" align="left" />
          <DataTable
            headers={["Brainrot", "Rarity", "Income", "Cost"]}
            rows={[
              ["Chihuanini Taconini", "Brainrot God", "45K/s", "8.5M"],
              ["Capi Taco", "Brainrot God", "155K/s", "31M"],
              ["Gattito Tacoto", "Brainrot God", "165K/s", "32.5M"],
              ["Tipi Topi Taco", "Brainrot God", "75K/s", "20M"],
              ["Los Tipi Tacos", "Brainrot God", "260K/s", "46M"],
              ["Tacorita Bicicleta", "Secret", "16.5M/s", "2.2B"],
              ["Los Tacoritas", "Secret", "32M/s", "4B"],
            ]}
          />
          <p className="mt-4 text-sm text-[#8a8884]">Taco-themed brainrots have significantly higher spawn rates during Taco Tuesday. This is the best time to acquire them.</p>
        </section>

        <section>
          <SectionTitle tag="Preparation" title="Preparation Checklist" align="left" />
          <DataTable
            headers={["Step", "Purpose", "Notes"]}
            rows={[
              ["Check the schedule", "Do not miss the window", "Tuesday ~6:00 PM ET. Confirm in-game."],
              ["Save taco brainrots", "Have 3 ready for Fat Sammy", "Do not accidentally sell or fuse them."],
              ["Secure your base", "Event servers get busy", "High-value brainrots become steal targets."],
              ["Keep cash available", "Buy taco brainrots from Red Carpet", "Spiked spawn rates are temporary."],
              ["Use a private server", "Avoid competition for spawns", "Better for controlled feeding/trait farming."],
            ]}
          />
        </section>

        <section>
          <SectionTitle tag="Tips" title="Event Tips" align="left" />
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-relaxed text-[#8a8884]">
            <p>• The Taco Trait is <strong className="text-[#f0ece4]">not guaranteed</strong> — it applies randomly like other Admin Abuse traits.</p>
            <p>• Farm traits during Taco Tuesday on <strong className="text-[#f0ece4]">high-rarity brainrots</strong> (Brainrot God or Secret) for maximum benefit.</p>
            <p>• Tacorita Bicicleta crafting requires feeding Fat Sammy during the event. If you miss the window, wait until next Tuesday.</p>
            <p>• Taco Tuesday can coincide with Admin Abuse if Tuesday is also a Saturday update day — double the opportunity.</p>
            <p>• The Sleepy trait (0.5x) is the worst outcome — avoid brainrots with it during trait farming.</p>
          </div>
        </section>

        <section>
          <SectionTitle tag="Disclaimer" title="Schedule Disclaimer" align="left" />
          <p className="mt-6 text-sm leading-relaxed text-[#8a8884]">
            Event timing and mechanics can change. Taco Tuesday may be postponed or rescheduled. Official announcements and the live game take priority. Last checked: {eventVerification.tacoTuesdayVerifiedAt}.
          </p>
        </section>

        <FAQSection faqs={eventFaqs} />
        <RelatedSection currentHref="/taco-tuesday" />
      </div>
    </div>
    </>
  );
}
