interface PageHeroProps {
  tag?: string;
  title: string;
  description: string;
}

export default function PageHero({ tag, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#2a2826]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4af6a]/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-4xl px-4 py-24 md:py-32 text-center">
        {tag && (
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#d4af6a]">
            {tag}
          </span>
        )}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-[#f0ece4] mt-3">
          {title}
        </h1>
        <p className="mt-6 text-base md:text-lg text-[#8a8884] max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-8 mx-auto h-0.5 w-20 rounded-full bg-[#d4af6a]" />
      </div>
    </section>
  );
}
