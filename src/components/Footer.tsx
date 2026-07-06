import Link from 'next/link';
import { navItems, relatedGuides, siteMeta } from '@/lib/data';

const footerColumns = [
  {
    title: 'Wiki',
    links: navItems.slice(1, 5),
  },
  {
    title: 'Events',
    links: navItems.slice(5, 7),
  },
  {
    title: 'Guides',
    links: relatedGuides.slice(0, 4).map((guide) => ({
      label: guide.title,
      href: guide.href,
    })),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#05030c] border-t border-[#2a2826]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
              About
            </h3>
            <div className="space-y-2">
              <p className="text-base font-semibold text-[#f0ece4]">
                {siteMeta.name}
              </p>
              <p className="text-sm text-[#8a8884] leading-relaxed">
                {siteMeta.description}
              </p>
              <p className="text-xs text-[#8a8884] pt-2">
                &copy; {new Date().getFullYear()} {siteMeta.shortName}. Fan-made placeholder wiki template.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
