import Link from 'next/link';
import SectionTitle from './SectionTitle';
import type { FAQ, InfoItem, PublicRoute } from '@/lib/types';
import FAQAccordion from './FAQAccordion';
import RelatedGuides from './RelatedGuides';

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: PublicRoute }[];
}) {
  return (
    <nav className="text-sm text-[#8a8884] mb-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-[#d4af6a] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-[#d4af6a] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#f0ece4]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StatGrid({ items }: { items: InfoItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg p-5 text-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid #2a2826',
          }}
        >
          <span className="block text-xl md:text-2xl font-bold text-[#d4af6a] mb-1">
            {item.value}
          </span>
          <span className="text-xs md:text-sm text-[#8a8884]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function QuickFactsPanel({ title, items }: { title: string; items: InfoItem[] }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid #2a2826',
      }}
    >
      <h3 className="text-lg font-bold mb-4 text-[#d4af6a]">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between gap-4 text-sm">
            <span className="text-[#8a8884]">{item.label}</span>
            <span className="text-[#f0ece4] text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-lg p-8 text-center"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px dashed #2a2826',
      }}
    >
      <h3 className="font-serif text-xl text-[#f0ece4] mb-2">{title}</h3>
      <p className="text-sm text-[#8a8884] max-w-xl mx-auto">{description}</p>
    </div>
  );
}

export function FilterBar({
  searchLabel,
  filters,
}: {
  searchLabel: string;
  filters: string[];
}) {
  return (
    <div
      className="grid gap-4 md:grid-cols-4 rounded-lg p-4"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid #2a2826',
      }}
    >
      <label className="md:col-span-2">
        <span className="block text-xs uppercase tracking-wider text-[#d4af6a] mb-2">
          Search
        </span>
        <input
          type="search"
          disabled
          placeholder={searchLabel}
          className="w-full rounded-md border border-[#2a2826] bg-[#05030c] px-3 py-2 text-sm text-[#8a8884]"
        />
      </label>
      {filters.map((filter) => (
        <label key={filter}>
          <span className="block text-xs uppercase tracking-wider text-[#d4af6a] mb-2">
            {filter}
          </span>
          <select
            disabled
            className="w-full rounded-md border border-[#2a2826] bg-[#05030c] px-3 py-2 text-sm text-[#8a8884]"
            defaultValue=""
          >
            <option value="">Pending data</option>
          </select>
        </label>
      ))}
    </div>
  );
}

export function PlaceholderTable({
  headers,
  emptyTitle,
  emptyDescription,
}: {
  headers: string[];
  emptyTitle: string;
  emptyDescription: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#2a2826]">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#d4af6a]">
            {headers.map((header) => (
              <th
                key={header}
                className="px-5 py-3.5 text-left font-sans text-xs font-semibold uppercase tracking-widest text-[#05030c] whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={headers.length} className="p-0">
              <EmptyState title={emptyTitle} description={emptyDescription} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function ScheduleBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-lg p-6 md:p-8"
      style={{
        backgroundColor: 'rgba(212,175,106,0.1)',
        border: '1px solid rgba(212,175,106,0.35)',
      }}
    >
      <span className="text-xs uppercase tracking-[0.2em] text-[#d4af6a]">
        Schedule Placeholder
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#f0ece4] mt-2 mb-3">
        {title}
      </h2>
      <p className="text-sm md:text-base text-[#8a8884] leading-relaxed">
        {description}
      </p>
      <div className="grid gap-3 sm:grid-cols-2 mt-6">
        <div className="rounded-md border border-[#2a2826] bg-[#05030c]/60 p-4">
          <span className="block text-xs text-[#8a8884] mb-1">Timezone</span>
          <span className="text-[#f0ece4]">Pending verification</span>
        </div>
        <div className="rounded-md border border-[#2a2826] bg-[#05030c]/60 p-4">
          <span className="block text-xs text-[#8a8884] mb-1">Last Checked</span>
          <span className="text-[#f0ece4]">Not yet verified</span>
        </div>
      </div>
    </div>
  );
}

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section>
      <SectionTitle tag="FAQ" title="Frequently Asked Questions" align="left" />
      <div className="mt-8">
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}

export function RelatedSection({ currentHref }: { currentHref: PublicRoute }) {
  return (
    <section>
      <SectionTitle tag="Related" title="Related Guides" align="left" />
      <RelatedGuides excludeHref={currentHref} />
    </section>
  );
}
