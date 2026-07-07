import Link from 'next/link';
import { siteConfig } from '@/lib/data';

const footerColumns = [
  {
    title: 'Wiki',
    links: [
      { label: 'Brainrots', href: '/brainrots' },
      { label: 'Traits', href: '/traits' },
      { label: 'Mutations', href: '/mutations' },
      { label: 'Index', href: '/index' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Best Brainrots', href: '/best-brainrots' },
      { label: 'Admin Abuse', href: '/admin-abuse' },
      { label: 'Taco Tuesday', href: '/taco-tuesday' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Brainrots', href: '/brainrots' },
      { label: 'Traits', href: '/traits' },
      { label: 'Mutations', href: '/mutations' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

export default function Footer() {
  const officialLinks = siteConfig.officialGameUrl
    ? [{ label: 'Official Roblox Game', href: siteConfig.officialGameUrl }]
    : [];

  return (
    <footer className="bg-[#05030c] border-t border-[#2a2826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-[#d4af6a] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#8a8884] hover:text-[#f0ece4] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#d4af6a] mb-4">
              Official
            </h3>
            {officialLinks.length > 0 ? (
              <ul className="space-y-2.5">
                {officialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#8a8884] hover:text-[#f0ece4] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#8a8884] leading-relaxed">
                Official links will be added after verification.
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#d4af6a] mb-4">
              About
            </h3>
            <div className="space-y-2">
              <p className="text-base font-semibold text-[#f0ece4]">
                {siteConfig.siteName}
              </p>
              <p className="text-sm text-[#8a8884] leading-relaxed">
                {siteConfig.description}
              </p>
              <p className="text-xs text-[#8a8884] pt-2">
                Copyright {new Date().getFullYear()} {siteConfig.shortName}. Fan-made site. Not affiliated with the game developers unless stated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
