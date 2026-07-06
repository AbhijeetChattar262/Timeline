import Link from "next/link";
import { prisma } from "@/lib/db/mysql";

export default async function Home() {
  const eras = await prisma.era.findMany({ orderBy: { sequenceOrder: "asc" } });

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="mb-3 text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">
        Choose an era
      </p>
      <h1 className="mb-10 max-w-[20ch] text-4xl font-semibold text-[var(--color-ink)]">
        Every age looks, feels, and reads differently here.
      </h1>

      {eras.length === 0 ? (
        <p className="text-[var(--color-muted)]">No eras published yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--color-rule)]">
          {eras.map((era) => (
            <li key={era.slug} className="py-5">
              <Link
                href={`/era/${era.slug}`}
                className="group flex items-baseline justify-between gap-4"
              >
                <span className="text-2xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                  {era.name}
                </span>
                <span className="text-sm tabular-nums text-[var(--color-muted)]">
                  {[era.startYear, era.endYear].filter(Boolean).join(" – ")}
                </span>
              </Link>
              {era.subtitle && (
                <p className="mt-1 text-sm text-[var(--color-muted)]">{era.subtitle}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
