import type { SourceReference } from "@/lib/types";

export default function SourceList({ sources }: { sources: SourceReference[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-6">
      <h3 className="text-lg font-bold mb-4 text-[#d4af6a]">Sources</h3>
      <ul className="space-y-3">
        {sources.map((source) => (
          <li key={`${source.name}-${source.checkedAt}`} className="text-sm text-[#8a8884]">
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0ece4] hover:text-[#d4af6a] transition-colors"
              >
                {source.name}
              </a>
            ) : (
              <span className="text-[#f0ece4]">{source.name}</span>
            )}
            <span className="ml-2">Checked {source.checkedAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
