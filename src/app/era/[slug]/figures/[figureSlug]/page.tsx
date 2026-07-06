import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFigureBySlug } from "@/lib/content";
import { ProvenanceTag } from "@/components/era/ProvenanceTag";
import { SourceFootnote } from "@/components/era/SourceFootnote";
import { ArtworkCredit } from "@/components/era/ArtworkCredit";
import { CarvedDivider } from "@/components/era/CarvedDivider";

export default async function FigurePage({
  params,
}: {
  params: Promise<{ slug: string; figureSlug: string }>;
}) {
  const { slug, figureSlug } = await params;
  const figure = await getFigureBySlug(slug, figureSlug);

  if (!figure) notFound();

  return (
    <div className="max-w-[70ch]">
      {figure.image && (
        <div className="mb-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-rule)]">
            <Image
              src={figure.image.filePathOrUrl}
              alt={figure.image.caption ?? figure.name}
              fill
              sizes="(min-width: 640px) 70ch, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <ArtworkCredit
            caption={figure.image.caption}
            credit={figure.image.credit}
            license={figure.image.license}
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-4xl font-semibold text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
          >
            {figure.name}
          </h1>
          {figure.epithet && (
            <p className="mt-1 text-lg italic text-[var(--color-muted)]">{figure.epithet}</p>
          )}
        </div>
        <ProvenanceTag value={figure.provenanceTag} />
      </div>

      {figure.role && (
        <p
          className="mt-3 text-xs tracking-[0.1em] uppercase text-[var(--color-accent)]"
          style={{ fontFamily: "var(--font-utility)" }}
        >
          {figure.role}
        </p>
      )}

      <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink)]">{figure.summary}</p>

      {figure.events.length > 0 && (
        <section className="mt-10">
          <CarvedDivider className="mb-8" />
          <h2
            className="mb-3 text-xs tracking-[0.14em] uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            Appears in
          </h2>
          <ul className="flex flex-col gap-2">
            {figure.events.map(({ event, roleInEvent }) => (
              <li key={event.slug}>
                <Link
                  href={`/era/${slug}/timeline#${event.slug}`}
                  className="text-[var(--color-ink)] hover:text-[var(--color-accent)]"
                >
                  {event.title}
                </Link>
                {roleInEvent && (
                  <span className="ml-2 text-sm text-[var(--color-muted)]">
                    — {roleInEvent}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {figure.sources.length > 0 && (
        <section className="mt-10">
          <CarvedDivider className="mb-8" />
          <h2
            className="mb-3 text-xs tracking-[0.14em] uppercase text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-utility)" }}
          >
            Sources
          </h2>
          <div className="flex flex-col">
            {figure.sources.map(({ source }) => (
              <SourceFootnote
                key={source.id}
                title={source.title}
                author={source.author}
                sourceType={source.sourceType}
                url={source.url}
                note={source.note}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
