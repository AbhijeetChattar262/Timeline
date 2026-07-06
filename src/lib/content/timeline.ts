import { prisma } from "@/lib/db/mysql";
import { getEventMediaMap } from "./media";

export async function getTimeline(eraSlug: string) {
  const [events, mediaByEvent] = await Promise.all([
    prisma.timelineEvent.findMany({
      where: { era: { slug: eraSlug } },
      orderBy: { sequenceOrder: "asc" },
      include: {
        location: true,
        figures: { include: { figure: true } },
      },
    }),
    getEventMediaMap(eraSlug),
  ]);

  return events.map((event) => ({
    ...event,
    image: mediaByEvent.get(event.slug) ?? null,
  }));
}

export async function getTimelineEventBySlug(eraSlug: string, eventSlug: string) {
  const [event, mediaByEvent] = await Promise.all([
    prisma.timelineEvent.findFirst({
      where: { era: { slug: eraSlug }, slug: eventSlug },
      include: {
        location: true,
        figures: { include: { figure: true } },
        sources: { include: { source: true } },
      },
    }),
    getEventMediaMap(eraSlug),
  ]);

  if (!event) return null;

  return { ...event, image: mediaByEvent.get(event.slug) ?? null };
}
