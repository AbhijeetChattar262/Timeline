const SOURCE_TYPE_LABEL: Record<string, string> = {
  primary: "Primary source",
  secondary: "Secondary source",
  archival: "Archival record",
};

export function SourceFootnote({
  title,
  author,
  sourceType,
  url,
  note,
}: {
  title: string;
  author?: string | null;
  sourceType: string;
  url?: string | null;
  note?: string | null;
}) {
  const Wrapper = url ? "a" : "div";
  return (
    <Wrapper
      {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block border-b border-[var(--color-rule)] py-4 last:border-none group"
    >
      <p
        className="text-[0.68rem] tracking-[0.1em] uppercase text-[var(--color-muted)]"
        style={{ fontFamily: "var(--font-utility)" }}
      >
        {SOURCE_TYPE_LABEL[sourceType] ?? sourceType}
      </p>
      <p
        className="mt-1 text-lg text-[var(--color-ink)] group-hover:text-[var(--color-accent)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </p>
      {author && <p className="text-sm text-[var(--color-muted)]">{author}</p>}
      {note && <p className="mt-1 text-sm text-[var(--color-ink)] opacity-80">{note}</p>}
    </Wrapper>
  );
}
