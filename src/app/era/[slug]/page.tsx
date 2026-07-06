import Link from "next/link";
import Image from "next/image";
import { getEra, getChapters, getFigures, getScienceTieIns, getEraArtifacts } from "@/lib/content";
import { Hero } from "@/components/era/Hero";
import { CarvedDivider } from "@/components/era/CarvedDivider";
import { ArtworkCredit } from "@/components/era/ArtworkCredit";

export default async function EraHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [era, chapters, figures, scienceTieIns, artifacts] = await Promise.all([
    getEra(slug),
    getChapters(slug),
    getFigures(slug),
    getScienceTieIns(slug),
    getEraArtifacts(slug),
  ]);

  if (!era) return null;

  const firstChapter = chapters[0];

  return (
    <div>
      <Hero
        eyebrow={[era.startYear, era.endYear].filter(Boolean).join(" – ")}
        title={era.name}
        subtitle={era.subtitle ?? undefined}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <section>
          <h2
            className="mb-3 text-xs tracking-[0.14em] uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            Begin the story
          </h2>
          {firstChapter ? (
            <Link href={`/era/${slug}/chapters/${firstChapter.slug}`} className="leaf-card p-5">
              <p
                className="text-lg font-semibold text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Chapter {firstChapter.chapterNumber}: {firstChapter.title}
              </p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {chapters.length} chapter{chapters.length === 1 ? "" : "s"} so far
              </p>
            </Link>
          ) : (
            <p className="text-[var(--color-muted)]">No chapters written yet.</p>
          )}
        </section>

        <section>
          <h2
            className="mb-3 text-xs tracking-[0.14em] uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            Meet the figures
          </h2>
          <ul className="flex flex-wrap gap-2">
            {figures.slice(0, 8).map((figure) => (
              <li key={figure.slug}>
                <Link
                  href={`/era/${slug}/figures/${figure.slug}`}
                  className="inline-block border border-[var(--color-rule)] px-3 py-1.5 text-sm text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-raised)]"
                >
                  {figure.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {artifacts.length > 0 && (
        <section className="mt-12">
          <CarvedDivider className="mb-8" />
          <h2
            className="mb-4 text-xs tracking-[0.14em] uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            Arms of the era
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {artifacts.map((artifact) => (
              <div key={artifact.filePathOrUrl}>
                <div className="relative aspect-square w-full overflow-hidden border border-[var(--color-rule)]">
                  <Image
                    src={artifact.filePathOrUrl}
                    alt={artifact.caption ?? ""}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <ArtworkCredit
                  caption={artifact.caption}
                  credit={artifact.credit}
                  license={artifact.license}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {scienceTieIns.length > 0 && (
        <section className="mt-12">
          <CarvedDivider className="mb-8" />
          <h2
            className="mb-3 text-xs tracking-[0.14em] uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            Where science meets myth
          </h2>
          {scienceTieIns.map((tieIn) => (
            <div key={tieIn.slug} className="max-w-[65ch]">
              <p
                className="text-lg font-semibold text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tieIn.title}
              </p>
              <p className="mt-2 text-[var(--color-ink)] opacity-90">
                {tieIn.bodyMarkdown.split("\n\n")[0]}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
