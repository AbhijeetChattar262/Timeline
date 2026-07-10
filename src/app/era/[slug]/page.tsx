import Link from "next/link";
import Image from "next/image";
import { getEra, getChapters, getFigures, getScienceTieIns } from "@/lib/content";
import { getFigureMediaMap, getEventMediaMap } from "@/lib/content/media";
import { getEraVerses } from "@/content/eraVerses";
import { EraHero } from "@/components/era/EraHero";
import { Shloka } from "@/components/era/Shloka";
import { CarvedDivider } from "@/components/era/CarvedDivider";
import { ArtworkCredit } from "@/components/era/ArtworkCredit";

// Which events, in what order, headline the "epic in paint" gallery. The Gita
// chariot is reserved for the hero, so it is intentionally not repeated here.
const GALLERY_EVENT_ORDER = [
  "game-of-dice",
  "krishnas-peace-embassy",
  "fall-of-bhishma",
  "death-of-abhimanyu",
  "death-of-karna",
  "death-of-duryodhana",
];

export default async function EraHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [era, chapters, figures, scienceTieIns, figureMedia, eventMedia] = await Promise.all([
    getEra(slug),
    getChapters(slug),
    getFigures(slug),
    getScienceTieIns(slug),
    getFigureMediaMap(slug),
    getEventMediaMap(slug),
  ]);

  if (!era) return null;

  const verseBySlug = new Map(getEraVerses(slug).map((v) => [v.slug, v]));
  const heroVerse = verseBySlug.get("gita-1-1");
  const featureVerse = verseBySlug.get("gita-2-47");
  const closingVerse = verseBySlug.get("gita-4-7");

  const firstChapter = chapters[0];
  const portraitFigures = figures.filter((f) => figureMedia.has(f.slug)).slice(0, 8);
  const gallery = GALLERY_EVENT_ORDER.map((s) => eventMedia.get(s)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  );

  const heroCover =
    eventMedia.get("bhagavad-gita")?.filePathOrUrl ??
    figureMedia.get("krishna")?.filePathOrUrl ??
    "/assets/mahabharat/arjuna-krishna-chariot.jpg";

  return (
    <div>
      <EraHero
        cover={heroCover}
        eyebrow={[era.startYear, era.endYear].filter(Boolean).join(" – ")}
        title={era.name}
        subtitle={era.subtitle ?? undefined}
        ctaHref={
          firstChapter
            ? `/era/${slug}/chapters/${firstChapter.slug}`
            : `/era/${slug}/chapters`
        }
        ctaLabel={firstChapter ? "Enter the story" : "Browse chapters"}
        verse={
          heroVerse
            ? {
                devanagari: heroVerse.devanagari,
                translation: heroVerse.translation,
                source: heroVerse.source,
              }
            : undefined
        }
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="era-kicker">Begin the story</h2>
          {firstChapter ? (
            <Link href={`/era/${slug}/chapters/${firstChapter.slug}`} className="leaf-card p-6">
              <p
                className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-utility)" }}
              >
                Chapter {firstChapter.chapterNumber}
              </p>
              <p
                className="mt-2 text-2xl font-semibold text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {firstChapter.title}
              </p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                From a king on a riverbank to the great war and its long aftermath —{" "}
                {chapters.length} chapter{chapters.length === 1 ? "" : "s"} in all.
              </p>
              <span
                className="mt-4 inline-block text-sm text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-utility)" }}
              >
                Read chapter one →
              </span>
            </Link>
          ) : (
            <p className="text-[var(--color-muted)]">No chapters written yet.</p>
          )}
        </section>

        <section>
          <h2 className="era-kicker">Walk the era</h2>
          <div className="leaf-card p-6">
            <div className="flex gap-8">
              <div>
                <p
                  className="text-3xl font-semibold text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {chapters.length}
                </p>
                <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  chapters
                </p>
              </div>
              <div>
                <p
                  className="text-3xl font-semibold text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {figures.length}
                </p>
                <p className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                  figures
                </p>
              </div>
            </div>
            <nav className="mt-5 flex flex-col gap-1.5 border-t border-[var(--color-rule)] pt-4">
              {[
                { href: `/era/${slug}/chapters`, label: "All chapters" },
                { href: `/era/${slug}/figures`, label: "The figures" },
                { href: `/era/${slug}/timeline`, label: "The timeline" },
                { href: `/era/${slug}/sources`, label: "Sources" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {item.label} <span className="text-[var(--color-accent)]">→</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </div>

      {featureVerse && (
        <section className="verse-panel mt-14">
          <Shloka
            align="center"
            devanagari={featureVerse.devanagari}
            transliteration={featureVerse.transliteration}
            translation={featureVerse.translation}
            source={featureVerse.source}
          />
        </section>
      )}

      {portraitFigures.length > 0 && (
        <section className="mt-14">
          <CarvedDivider className="mb-8" />
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="era-kicker" style={{ marginBottom: 0 }}>
              The people of the epic
            </h2>
            <Link
              href={`/era/${slug}/figures`}
              className="text-sm text-[var(--color-accent)]"
              style={{ fontFamily: "var(--font-utility)" }}
            >
              All {figures.length} figures →
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {portraitFigures.map((figure) => {
              const img = figureMedia.get(figure.slug);
              return (
                <li key={figure.slug}>
                  <Link
                    href={`/era/${slug}/figures/${figure.slug}`}
                    className="leaf-card overflow-hidden"
                  >
                    <div className="relative aspect-[3/4] w-full">
                      {img && (
                        <Image
                          src={img.filePathOrUrl}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 25vw, 50vw"
                          className="object-cover"
                        />
                      )}
                      <div className="portrait-scrim" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p
                          className="text-lg font-semibold leading-tight"
                          style={{ fontFamily: "var(--font-display)", color: "#f7ecd2" }}
                        >
                          {figure.name}
                        </p>
                        {figure.epithet && (
                          <p className="text-xs" style={{ color: "rgba(247,236,210,0.72)" }}>
                            {figure.epithet}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="mt-14">
          <CarvedDivider className="mb-8" />
          <h2 className="era-kicker">The epic in paint</h2>
          <p className="mb-6 max-w-[62ch] text-[var(--color-muted)]">
            The story as India has pictured it across the centuries — Mughal court manuscripts,
            temple stone, and the oil paintings of Raja Ravi Varma.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((m, i) => (
              <figure key={i}>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-rule)]">
                  <Image
                    src={m.filePathOrUrl}
                    alt={m.caption ?? ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <ArtworkCredit caption={m.caption} credit={m.credit} license={m.license} />
              </figure>
            ))}
          </div>
        </section>
      )}

      {closingVerse && (
        <section className="verse-panel mt-14">
          <Shloka
            align="center"
            devanagari={closingVerse.devanagari}
            transliteration={closingVerse.transliteration}
            translation={closingVerse.translation}
            source={closingVerse.source}
          />
        </section>
      )}

      {scienceTieIns.length > 0 && (
        <section className="mt-14">
          <CarvedDivider className="mb-8" />
          <h2 className="era-kicker">Where science meets myth</h2>
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
