import { prisma } from "@/lib/db/mysql";
import { connectMongo } from "@/lib/db/mongo";
import { EraThemeModel } from "@/lib/db/models";
import type { EraTheme } from "@/types/era";

export async function getEra(slug: string) {
  return prisma.era.findUnique({ where: { slug } });
}

export async function getEraTheme(slug: string): Promise<EraTheme | null> {
  await connectMongo();
  return EraThemeModel.findOne({ eraSlug: slug }).lean<EraTheme>();
}
