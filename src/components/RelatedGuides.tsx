import InfoCard from './InfoCard';
import { relatedGuides } from '@/lib/data';

interface RelatedGuidesProps {
  excludeHref?: string;
}

export default function RelatedGuides({ excludeHref }: RelatedGuidesProps) {
  const guides = relatedGuides
    .filter((guide) => guide.href !== excludeHref)
    .slice(0, 3);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
