import InfoCard from './InfoCard';
import { publicRoutes, relatedGuides } from '@/lib/data';
import type { PublicRoute } from '@/lib/types';

const validRoutes = new Set(publicRoutes.map((route) => route.href));

interface RelatedGuidesProps {
  excludeHref?: PublicRoute;
  include?: PublicRoute[];
}

export default function RelatedGuides({ excludeHref, include }: RelatedGuidesProps) {
  const guides = relatedGuides
    .filter((guide) => validRoutes.has(guide.href))
    .filter((guide) => guide.href !== excludeHref)
    .filter((guide) => !include || include.includes(guide.href))
    .slice(0, 4);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {guides.map((guide) => (
        <InfoCard
          key={guide.href}
          tag={guide.tag}
          title={guide.title}
          description={guide.description}
          href={guide.href}
        />
      ))}
    </div>
  );
}
