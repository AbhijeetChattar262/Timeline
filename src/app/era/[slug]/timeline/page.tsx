import Image from "next/image";
import { getTimeline, getLocationMedia } from "@/lib/content";
import { TimelineStrip } from "@/components/era/TimelineStrip";
import { ArtworkCredit } from "@/components/era/ArtworkCredit";

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = await getTimeline(slug);

  const locationCounts = new Map<string, { name: string; count: number }>();
  for (const event of events) {
    if (!event.location) continue;
    const entry = locationCounts.get(event.location.slug);
    locationCounts.set(event.location.slug, {
      name: event.location.name,
      count: (entry?.count ?? 0) + 1,
    });
  }
  const primaryLocationSlug = [...locationCounts.entries()].sort(
    (a, b) => b[1].count - a[1].count
  )[0]?.[0];
  const locationMap = primaryLocationSlug
    ? await getLocationMedia(slug, primaryLocationSlug)
    : null;

  return (
    <div>
      <h1
        className="mb-6 text-3xl font-semibold text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Timeline
      </h1>

      {locationMap && (
        <div className="mb-10 max-w-xs">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-rule)]">
            <Image
              src={locationMap.filePathOrUrl}
              alt={locationMap.caption ?? "Map"}
              fill
              sizes="320px"
              className="object-contain"
            />
          </div>
          <ArtworkCredit
            caption={locationMap.caption}
            credit={locationMap.credit}
            license={locationMap.license}
          />
        </div>
      )}

      <TimelineStrip
        eraSlug={slug}
        events={events.map((event) => ({
          slug: event.slug,
          title: event.title,
          dateLabel: event.dateLabel,
          summary: event.summary,
          provenanceTag: event.provenanceTag,
          location: event.location ? { name: event.location.name } : null,
          image: event.image
            ? {
                filePathOrUrl: event.image.filePathOrUrl,
                caption: event.image.caption,
                credit: event.image.credit,
                license: event.image.license,
              }
            : null,
        }))}
      />
    </div>
  );
}
