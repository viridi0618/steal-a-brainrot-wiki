import type { Metadata } from "next";
import Link from "next/link";
import CTALink from "@/components/CTALink";
import FAQAccordion from "@/components/FAQAccordion";
import SectionTitle from "@/components/SectionTitle";
import {
  Breadcrumbs,
  DataTable,
  RelatedSection,
  StatGrid,
} from "@/components/WikiBlocks";
import {
  mutations,
  publishedBrainrots,
  publishedTraits,
  siteConfig,
} from "@/lib/data";

const pageTitle = "How to Play Steal a Brainrot Unblocked at School – No Download Guide";
const pageDescription =
  "Want to play Steal a Brainrot at school but Roblox is blocked? Learn why networks block it, safe access options, and study strategy guides while you wait.";
const pageUrl = `${siteConfig.url}/unblocked`;

const faqItems = [
  {
    question: "Can I play Steal a Brainrot unblocked without downloading anything?",
    answer:
      "The real Steal a Brainrot is played through Roblox. If Roblox is available on your network, you can play it in the normal Roblox app or browser flow. Some cloud gaming services may offer browser-based Roblox access, but availability depends on your device, region, and network policy.",
  },
  {
    question: "Is there a Steal a Brainrot HTML5 version?",
    answer:
      "No. Steal a Brainrot is a Roblox game only. There is no official standalone HTML5 or web version. Sites claiming to offer Steal a Brainrot unblocked are usually separate browser games or knock-offs, not the real Roblox game.",
  },
  {
    question: "Will I get in trouble for playing at school?",
    answer:
      "That depends on your school's rules. Many schools do not allow gaming during class time or on school devices. Always follow your school's acceptable use policy and save gaming for allowed times.",
  },
  {
    question: "What is the difference between this and Steal Brainrot Online games on other sites?",
    answer:
      "Steal Brainrot Online games on browser game sites are separate games inspired by similar meme characters. They are not the same as the Roblox game Steal a Brainrot. This wiki covers the Roblox version and its brainrot stats, traits, mutations, events, and strategy.",
  },
  {
    question: "What should I do if I cannot play right now?",
    answer:
      "Use the wiki to prepare. Check the brainrot database, best brainrots, trait multipliers, mutation guide, Admin Abuse event guide, and Taco Tuesday schedule so you know what to target when you can play again.",
  },
];

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "article",
    images: [siteConfig.defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [siteConfig.defaultSocialImage],
  },
};

function byIncomeDesc<T extends { baseIncomeValue: number | null }>(records: T[]) {
  return [...records].sort((a, b) => (b.baseIncomeValue ?? 0) - (a.baseIncomeValue ?? 0));
}

function brainrotLink(brainrot: (typeof publishedBrainrots)[number]) {
  return (
    <Link href={`/brainrots/${brainrot.slug}`} className="text-[#d4af6a] hover:text-[#f0ece4]">
      {brainrot.name}
    </Link>
  );
}

const quickLinks = [
  { label: "Best brainrots for income", href: "/best-brainrots" },
  { label: "Brainrot database", href: "/brainrots" },
  { label: "Trait multipliers", href: "/traits" },
  { label: "Mutation guide", href: "/mutations" },
  { label: "Admin Abuse event", href: "/admin-abuse" },
  { label: "Taco Tuesday schedule", href: "/taco-tuesday" },
] as const;

export default function UnblockedPage() {
  const topBrainrots = byIncomeDesc(
    publishedBrainrots.filter((brainrot) => brainrot.baseIncomeValue !== null)
  ).slice(0, 8);
  const rarityTiers = new Set(publishedBrainrots.map((brainrot) => brainrot.rarity).filter(Boolean));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Unblocked Guide",
        item: pageUrl,
      },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: pageDescription,
    mainEntityOfPage: pageUrl,
    about: siteConfig.gameName,
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-16 border-b border-[#2a2826]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,175,106,0.08) 0%, transparent 60%), linear-gradient(180deg, #05030c 0%, #0a0720 35%, #05030c 100%)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 text-center">
          <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-6 text-[#d4af6a]">
            Unblocked Guide
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-6 text-[#f0ece4]">
            Can&apos;t Play Steal a Brainrot at School? Here&apos;s What To Do
          </h1>
          <p className="text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed text-[#8a8884]">
            Roblox blocked on school WiFi? You&apos;re not alone. Many players search for ways to play Steal a Brainrot unblocked every month. Here&apos;s why it may be blocked - and what you can safely do next.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTALink href={siteConfig.officialGameUrl} external>
              Official Roblox Game
            </CTALink>
            <CTALink href="/brainrots" variant="secondary">
              Browse Brainrot Database
            </CTALink>
            <CTALink href="/best-brainrots" variant="secondary">
              Best Brainrots
            </CTALink>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <Breadcrumbs items={[{ label: "Unblocked Guide" }]} />

        <section>
          <SectionTitle tag="Context" title="Why Schools Block Roblox" align="left" />
          <div className="grid gap-5 md:grid-cols-3 mt-8">
            {[
              {
                title: "Distraction",
                description:
                  "Roblox is highly engaging, and schools usually want students focused on classwork instead of games.",
              },
              {
                title: "Bandwidth",
                description:
                  "Roblox uses real-time network traffic. If many students play at once, it can slow down school WiFi for learning tools, research, and online testing.",
              },
              {
                title: "Content filtering policies",
                description:
                  "Many school networks use content filters that block entertainment or gaming sites by default. Roblox often falls into that category.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-[#f0ece4] mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#8a8884]">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#8a8884]">
            Understanding why it is blocked helps you choose a safer option. The best approach is to use official Roblox access when allowed, play on your own device/network, or use the wiki to plan your next strategy until you can log in again.
          </p>
        </section>

        <section>
          <SectionTitle tag="Options" title="Safe Options for Steal a Brainrot Unblocked" align="left" />
          <div className="grid gap-5 md:grid-cols-2 mt-8">
            <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af6a]">Option 1</span>
              <h3 className="text-xl font-semibold text-[#f0ece4] mt-2 mb-3">Official Roblox Access</h3>
              <p className="text-sm leading-relaxed text-[#8a8884] mb-5">
                The safest way to play the real Steal a Brainrot is through Roblox. If Roblox is allowed on your current network, open the official game page and play normally.
              </p>
              <CTALink href={siteConfig.officialGameUrl} external>
                Play on Roblox
              </CTALink>
            </div>

            <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af6a]">Option 2</span>
              <h3 className="text-xl font-semibold text-[#f0ece4] mt-2 mb-3">Cloud Gaming, If Allowed</h3>
              <p className="text-sm leading-relaxed text-[#8a8884]">
                Some players use cloud gaming platforms that run Roblox remotely and stream gameplay to the browser. Now.gg is one example players may see mentioned online, but access is not guaranteed and depends on your region, network, device, and account. Only use it if your school or workplace policy allows it.
              </p>
            </div>

            <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af6a]">Option 3</span>
              <h3 className="text-xl font-semibold text-[#f0ece4] mt-2 mb-3">Use Your Own Device or Network</h3>
              <p className="text-sm leading-relaxed text-[#8a8884]">
                If you are outside class time and allowed to play, using your own phone, tablet, home WiFi, or mobile data is usually simpler than trying to use a restricted school computer.
              </p>
            </div>

            <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#d4af6a]">Option 4</span>
              <h3 className="text-xl font-semibold text-[#f0ece4] mt-2 mb-3">Use the Wiki While You Wait</h3>
              <p className="text-sm leading-relaxed text-[#8a8884] mb-5">
                If you cannot play right now, use the wiki to plan your next run: check the best brainrots, trait multipliers, mutations, event schedules, and brainrot income data.
              </p>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-[#2a2826] px-3 py-1.5 text-xs text-[#d4af6a] hover:border-[#d4af6a] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle tag="Clarification" title="Is There a Steal a Brainrot HTML5 Version?" align="left" />
          <div className="mt-8 space-y-4 max-w-4xl text-base leading-relaxed text-[#8a8884]">
            <p>
              No. Steal a Brainrot is a Roblox game. There is no official standalone HTML5 or web browser version.
            </p>
            <p>
              Some sites may list games with similar names such as Steal Brainrot Online or Steal a Brainrot unblocked. These are usually separate browser games inspired by the same meme culture. They are not the same as the Roblox game, and the stats on this wiki apply only to the Roblox version.
            </p>
            <p>
              If this site later embeds a similar H5 game, it must be clearly labeled as: Similar browser game, not the official Roblox Steal a Brainrot.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 mt-8">
            {[
              { label: "Brainrot database", href: "/brainrots" },
              { label: "Brainrot index", href: "/brainrot-index" },
              { label: "Best Brainrots", href: "/best-brainrots" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-4 text-sm text-[#f0ece4] hover:border-[#d4af6a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle tag="Meta" title="Make the Most of Downtime - Learn the Meta" align="left" />
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#8a8884]">
            If you can&apos;t get Roblox unblocked right now, you can still get ahead. Study brainrot stats, plan your next rebirth, learn which traits are worth hunting, and decide which brainrots to target before you jump back in. Search results for roblox unblocked games can be confusing, so use this page as a guide resource rather than a promise that any browser method will work.
          </p>

          <div className="mt-8">
            <SectionTitle tag="Targets" title="Top Brainrots to Target" align="left" />
            <DataTable
              headers={["Brainrot", "Rarity", "Base Cost", "Base Income", "Availability"]}
              rows={topBrainrots.map((brainrot) => [
                brainrotLink(brainrot),
                brainrot.rarity ?? "Unknown",
                brainrot.baseCostDisplay ?? "Unknown",
                brainrot.baseIncomeDisplay ?? "Unknown",
                brainrot.availability ?? "Unknown",
              ])}
            />
            <p className="mt-4 text-sm text-[#8a8884]">
              This table uses the current published Brainrot dataset and the same income-first sorting used by the Best Brainrots page. Missing fields are shown as Unknown.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-4 text-sm text-[#f0ece4] hover:border-[#d4af6a] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/faq"
              className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-4 text-sm text-[#f0ece4] hover:border-[#d4af6a] transition-colors"
            >
              FAQ
            </Link>
          </div>
        </section>

        <section>
          <SectionTitle tag="Overview" title="About Steal a Brainrot" align="left" />
          <div className="mt-6 space-y-4 max-w-4xl text-base leading-relaxed text-[#8a8884]">
            <p>
              Steal a Brainrot is a Roblox tycoon and collection game. Players buy brainrots, earn cash from them over time, steal stronger ones from other players, and defend their own base.
            </p>
            <p>
              This page is a guide and wiki resource for players searching how to play Steal a Brainrot at school. It is not a bypass tool, and it does not provide an official web version of the game.
            </p>
          </div>
          <div className="mt-8">
            <StatGrid
              items={[
                { label: "Platform", value: "Roblox" },
                { label: "Genre", value: "Tycoon / Collection" },
                { label: "Brainrot Records", value: `${publishedBrainrots.length}` },
                { label: "Traits", value: `${publishedTraits.length}` },
                { label: "Mutations", value: `${mutations.length}` },
                { label: "Rarity Tiers", value: `${rarityTiers.size}` },
              ]}
            />
          </div>
        </section>

        <section>
          <SectionTitle tag="FAQ" title="Steal a Brainrot Unblocked FAQ" align="left" />
          <div className="mt-8">
            <FAQAccordion faqs={faqItems} />
          </div>
        </section>

        <RelatedSection currentHref="/unblocked" />
      </div>
    </>
  );
}
