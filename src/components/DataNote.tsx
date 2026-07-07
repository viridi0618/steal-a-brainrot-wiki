export default function DataNote({
  title = "Data Note",
  description,
}: {
  title?: string;
  description: string | null;
}) {
  if (!description) return null;

  return (
    <div className="rounded-lg border border-[#2a2826] bg-white/[0.03] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d4af6a] mb-2">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#8a8884]">{description}</p>
    </div>
  );
}
