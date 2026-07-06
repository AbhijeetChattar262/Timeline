import Link from "next/link";
import Image from "next/image";
import { ProvenanceTag, type ProvenanceTagValue } from "./ProvenanceTag";
import { ArtworkCredit } from "./ArtworkCredit";
import { ChariotWheel } from "./icons";

export type TimelineStripEvent = {
  slug: string;
  title: string;
  dateLabel: string;
  summary: string;
  provenanceTag: ProvenanceTagValue;
  location?: { name: string } | null;
  image?: {
    filePathOrUrl: string;
    caption?: string | null;
    credit?: string | null;
    license?: string | null;
  } | null;
};

export function TimelineStrip({
  eraSlug,
  events,
}: {
  eraSlug: string;
  events: TimelineStripEvent[];
}) {
  return (
    <ol className="relative border-l border-[var(--color-rule)] pl-8">
      {events.map((event) => (
        <li key={event.slug} className="relative mb-12 last:mb-0">
          <span
            className="absolute -left-[calc(2rem+9px)] top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-accent)]"
            aria-hidden
          >
            <ChariotWheel size={18} />
          </span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <p
                className="mb-1 text-sm tabular-nums tracking-wide text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-utility)" }}
              >
                {event.dateLabel}
                {event.location && ` · ${event.location.name}`}
              </p>
              <Link
                href={`/era/${eraSlug}/timeline#${event.slug}`}
                id={event.slug}
                className="text-lg font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {event.title}
              </Link>
              <p className="mt-2 max-w-[65ch] text-[var(--color-ink)] opacity-90">
                {event.summary}
              </p>
              <div className="mt-2">
                <ProvenanceTag value={event.provenanceTag} />
              </div>
            </div>
            {event.image && (
              <div className="w-full sm:w-40 sm:shrink-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--color-rule)]">
                  <Image
                    src={event.image.filePathOrUrl}
                    alt={event.image.caption ?? event.title}
                    fill
                    sizes="(min-width: 640px) 160px, 100vw"
                    className="object-cover"
                  />
                </div>
                <ArtworkCredit
                  caption={event.image.caption}
                  credit={event.image.credit}
                  license={event.image.license}
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
