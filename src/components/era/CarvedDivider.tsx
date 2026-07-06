/**
 * The era's "carved" divider motif — two rules flanking a cut diamond, the way
 * a stone inscription or temple lintel marks a break, instead of a plain <hr>.
 */
export function CarvedDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-[var(--color-rule)]" />
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        className="shrink-0 text-[var(--color-accent)]"
        aria-hidden
      >
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" opacity="0.85" />
      </svg>
      <span className="h-px flex-1 bg-[var(--color-rule)]" />
    </div>
  );
}
