'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { navItems, siteConfig } from '@/lib/data';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#05030c] shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-wider text-[#f0ece4] hover:text-[#d4af6a] transition-colors duration-200"
          >
            <img
              src="/icon.png"
              alt={siteConfig.gameName}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="hidden sm:inline">{siteConfig.siteName}</span>
            <span className="sm:hidden">SAB Guide</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((link) =>
              link.submenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdown(link.label)}
                  onMouseLeave={() => setDesktopDropdown(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-4 py-2 text-sm text-[#f0ece4] hover:text-[#d4af6a] transition-colors duration-200 rounded-md hover:bg-white/5"
                    onClick={() =>
                      setDesktopDropdown((current) =>
                        current === link.label ? null : link.label
                      )
                    }
                    aria-expanded={desktopDropdown === link.label}
                    aria-haspopup="menu"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        desktopDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {desktopDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 pt-1 z-50"
                      role="menu"
                    >
                      <div className="w-48 bg-[#05030c] border border-[#2a2826] rounded-md shadow-xl py-2">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-[#f0ece4] hover:text-[#d4af6a] hover:bg-white/5 transition-colors duration-200"
                          role="menuitem"
                        >
                          {sub.label}
                        </Link>
                      ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-[#f0ece4] hover:text-[#d4af6a] transition-colors duration-200 rounded-md hover:bg-white/5"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-[#f0ece4] hover:text-[#d4af6a] transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-[#05030c]/98 backdrop-blur-md transition-all duration-300 md:hidden ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-5 px-6" aria-label="Mobile navigation">
          {navItems.map((link) =>
            link.submenu ? (
              <div key={link.label} className="w-full max-w-xs text-center">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 w-full py-3 text-lg text-[#f0ece4] hover:text-[#d4af6a] transition-colors duration-200"
                  onClick={() =>
                    setMobileDropdown((current) =>
                      current === link.label ? null : link.label
                    )
                  }
                  aria-expanded={mobileDropdown === link.label}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileDropdown === link.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileDropdown === link.label
                      ? 'max-h-60 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={closeMobile}
                      className="block py-2 text-base text-[#8a8884] hover:text-[#d4af6a] transition-colors duration-200"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-lg text-[#f0ece4] hover:text-[#d4af6a] transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
