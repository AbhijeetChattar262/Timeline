const PROVENANCE_META = {
  itihasa: { label: "Itihasa · epic", color: "#b8863b" },
  record: { label: "Historical record", color: "#5b7a9d" },
  observed: { label: "Observed · science", color: "#5c8a63" },
} as const;

export type ProvenanceTagValue = keyof typeof PROVENANCE_META;

/**
 * A fixed, cross-era convention distinguishing epic/legendary material from the
 * historical record and from scientific fact. Deliberately NOT driven by the
 * active era's accent token — this label means the same thing in every era.
 */
export function ProvenanceTag({ value }: { value: ProvenanceTagValue }) {
  const meta = PROVENANCE_META[value];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-none border px-2 py-0.5 text-[0.68rem] tracking-wide uppercase"
      style={{
        borderColor: meta.color,
        color: meta.color,
        fontFamily: "var(--font-utility)",
      }}
    >
      {meta.label}
    </span>
  );
}
