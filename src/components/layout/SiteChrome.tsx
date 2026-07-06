import Link from "next/link";

/**
 * The one piece of chrome that does NOT reskin per era — the "cockpit" a
 * visitor stays inside while the window it looks through changes underneath.
 * Intentionally styled from the root :root tokens only, never era tokens.
 */
export function SiteChrome() {
  return (
    <div className="border-b border-[var(--color-rule)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] uppercase text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-utility)" }}
        >
          Yuga
        </Link>
        <span className="text-xs text-[var(--color-muted)]">a journey through time</span>
      </div>
    </div>
  );
}
