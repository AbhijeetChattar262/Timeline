import { connectMongo } from "@/lib/db/mongo";
import { ChapterModel, MediaAssetModel } from "@/lib/db/models";
import type { Chapter, MediaAsset } from "@/types/era";

export async function getChapters(eraSlug: string): Promise<Chapter[]> {
  await connectMongo();
  return ChapterModel.find({ eraSlug }).sort({ chapterNumber: 1 }).lean<Chapter[]>();
}

export async function getChapterBySlug(
  eraSlug: string,
  chapterSlug: string
): Promise<(Chapter & { heroMedia: MediaAsset | null }) | null> {
  await connectMongo();
  const chapter = await ChapterModel.findOne({ eraSlug, slug: chapterSlug }).lean<Chapter>();
  if (!chapter) return null;

  const heroMedia = chapter.heroMediaId
    ? await MediaAssetModel.findById(chapter.heroMediaId).lean<MediaAsset>()
    : null;

  return { ...chapter, heroMedia: heroMedia ?? null };
}
