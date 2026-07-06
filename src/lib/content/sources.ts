import { prisma } from "@/lib/db/mysql";

/** All sources cited by any figure or event in an era, deduplicated. */
export async function getSources(eraSlug: string) {
  const [viaFigures, viaEvents] = await Promise.all([
    prisma.source.findMany({
      where: { figures: { some: { figure: { era: { slug: eraSlug } } } } },
    }),
    prisma.source.findMany({
      where: { events: { some: { event: { era: { slug: eraSlug } } } } },
    }),
  ]);

  const bySlug = new Map(viaFigures.map((s) => [s.id, s]));
  for (const s of viaEvents) bySlug.set(s.id, s);

  return Array.from(bySlug.values()).sort((a, b) => a.title.localeCompare(b.title));
}
