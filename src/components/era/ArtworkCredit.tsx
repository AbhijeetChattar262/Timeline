export function ArtworkCredit({
  caption,
  credit,
  license,
}: {
  caption?: string | null;
  credit?: string | null;
  license?: string | null;
}) {
  if (!caption && !credit) return null;
  return (
    <p
      className="mt-1.5 text-xs text-[var(--color-muted)]"
      style={{ fontFamily: "var(--font-utility)" }}
    >
      {caption}
      {caption && credit ? " — " : ""}
      {credit}
      {license ? ` · ${license}` : ""}
    </p>
  );
}
