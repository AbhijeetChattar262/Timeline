import { prisma } from "@/lib/db/mysql";
import { getFigureMediaMap } from "./media";

export async function getFigures(eraSlug: string) {
  const [figures, mediaByFigure] = await Promise.all([
    prisma.figure.findMany({
      where: { era: { slug: eraSlug } },
      orderBy: { sequenceOrder: "asc" },
    }),
    getFigureMediaMap(eraSlug),
  ]);

  return figures.map((figure) => ({
    ...figure,
    image: mediaByFigure.get(figure.slug) ?? null,
  }));
}

export async function getFigureBySlug(eraSlug: string, figureSlug: string) {
  const [figure, mediaByFigure] = await Promise.all([
    prisma.figure.findFirst({
      where: { era: { slug: eraSlug }, slug: figureSlug },
      include: {
        events: { include: { event: { include: { location: true } } } },
        sources: { include: { source: true } },
      },
    }),
    getFigureMediaMap(eraSlug),
  ]);

  if (!figure) return null;

  return { ...figure, image: mediaByFigure.get(figure.slug) ?? null };
}
