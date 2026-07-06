import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d4af6a]">
          Page Not Found
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-[#f0ece4] mt-3 mb-5">
          This page does not exist
        </h1>
        <p className="text-base text-[#8a8884] leading-relaxed mb-8">
          The requested wiki page is not available. Use the links below to return to a public section of the Steal a Brainrot Wiki.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Home", href: "/" },
            { label: "Brainrots", href: "/brainrots" },
            { label: "Traits", href: "/traits" },
            { label: "FAQ", href: "/faq" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: link.href === "/" ? "#d4af6a" : "transparent",
                color: link.href === "/" ? "#05030c" : "#d4af6a",
                border: "1px solid #d4af6a",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
