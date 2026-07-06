import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "../src/generated/prisma/client";
import { mahabharatEra } from "../src/content/mahabharat/era";
import { mahabharatLocations } from "../src/content/mahabharat/locations";
import { mahabharatFigures } from "../src/content/mahabharat/figures";
import { mahabharatTimelineEvents } from "../src/content/mahabharat/timelineEvents";
import { mahabharatSources } from "../src/content/mahabharat/sources";
import {
  mahabharatFigureCitations,
  mahabharatEventCitations,
} from "../src/content/mahabharat/citations";

const prisma = new PrismaClient();

async function seedEra() {
  return prisma.era.upsert({
    where: { slug: mahabharatEra.slug },
    update: mahabharatEra,
    create: mahabharatEra,
  });
}

async function seedLocations(eraId: number) {
  const bySlug = new Map<string, number>();
  for (const location of mahabharatLocations) {
    const row = await prisma.location.upsert({
      where: { eraId_slug: { eraId, slug: location.slug } },
      update: { ...location, eraId },
      create: { ...location, eraId },
    });
    bySlug.set(location.slug, row.id);
  }
  return bySlug;
}

async function seedFigures(eraId: number) {
  const bySlug = new Map<string, number>();
  for (const figure of mahabharatFigures) {
    const row = await prisma.figure.upsert({
      where: { eraId_slug: { eraId, slug: figure.slug } },
      update: { ...figure, eraId },
      create: { ...figure, eraId },
    });
    bySlug.set(figure.slug, row.id);
  }
  return bySlug;
}

async function seedTimelineEvents(
  eraId: number,
  locationsBySlug: Map<string, number>,
  figuresBySlug: Map<string, number>
) {
  const bySlug = new Map<string, number>();
  for (const event of mahabharatTimelineEvents) {
    const { locationSlug, figures, ...eventFields } = event;
    const locationId = locationSlug ? locationsBySlug.get(locationSlug) : undefined;

    const row = await prisma.timelineEvent.upsert({
      where: { eraId_slug: { eraId, slug: event.slug } },
      update: { ...eventFields, eraId, locationId },
      create: { ...eventFields, eraId, locationId },
    });
    bySlug.set(event.slug, row.id);

    for (const { slug: figureSlug, roleInEvent } of figures) {
      const figureId = figuresBySlug.get(figureSlug);
      if (!figureId) continue;
      await prisma.figureEvent.upsert({
        where: { figureId_eventId: { figureId, eventId: row.id } },
        update: { roleInEvent },
        create: { figureId, eventId: row.id, roleInEvent },
      });
    }
  }
  return bySlug;
}

async function seedSources() {
  const byKey = new Map<string, number>();
  for (const source of mahabharatSources) {
    const { key, ...sourceFields } = source;
    const existing = await prisma.source.findFirst({ where: { title: sourceFields.title } });
    const row = existing
      ? await prisma.source.update({ where: { id: existing.id }, data: sourceFields })
      : await prisma.source.create({ data: sourceFields });
    byKey.set(key, row.id);
  }
  return byKey;
}

async function seedCitations(
  figuresBySlug: Map<string, number>,
  eventsBySlug: Map<string, number>,
  sourcesByKey: Map<string, number>
) {
  for (const { figureSlug, sourceKey } of mahabharatFigureCitations) {
    const figureId = figuresBySlug.get(figureSlug);
    const sourceId = sourcesByKey.get(sourceKey);
    if (!figureId || !sourceId) continue;
    await prisma.figureSource.upsert({
      where: { figureId_sourceId: { figureId, sourceId } },
      update: {},
      create: { figureId, sourceId },
    });
  }

  for (const { eventSlug, sourceKey, note } of mahabharatEventCitations) {
    const eventId = eventsBySlug.get(eventSlug);
    const sourceId = sourcesByKey.get(sourceKey);
    if (!eventId || !sourceId) continue;
    await prisma.eventSource.upsert({
      where: { eventId_sourceId: { eventId, sourceId } },
      update: { note },
      create: { eventId, sourceId, note },
    });
  }
}

async function main() {
  const era = await seedEra();
  const locationsBySlug = await seedLocations(era.id);
  const figuresBySlug = await seedFigures(era.id);
  const eventsBySlug = await seedTimelineEvents(era.id, locationsBySlug, figuresBySlug);
  const sourcesByKey = await seedSources();
  await seedCitations(figuresBySlug, eventsBySlug, sourcesByKey);

  console.log(
    `Seeded MySQL: 1 era, ${locationsBySlug.size} locations, ${figuresBySlug.size} figures, ${eventsBySlug.size} events, ${sourcesByKey.size} sources.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
