import { connectMongo } from "@/lib/db/mongo";
import { MediaAssetModel } from "@/lib/db/models";
import type { MediaAsset } from "@/types/era";

export async function getFigureMediaMap(eraSlug: string): Promise<Map<string, MediaAsset>> {
  await connectMongo();
  const assets = await MediaAssetModel.find({
    eraSlug,
    figureSlug: { $exists: true, $ne: null },
  }).lean<MediaAsset[]>();
  return new Map(assets.map((asset) => [asset.figureSlug as string, asset]));
}

export async function getEventMediaMap(eraSlug: string): Promise<Map<string, MediaAsset>> {
  await connectMongo();
  const assets = await MediaAssetModel.find({
    eraSlug,
    eventSlug: { $exists: true, $ne: null },
  }).lean<MediaAsset[]>();
  return new Map(assets.map((asset) => [asset.eventSlug as string, asset]));
}

export async function getLocationMedia(
  eraSlug: string,
  locationSlug: string
): Promise<MediaAsset | null> {
  await connectMongo();
  return MediaAssetModel.findOne({ eraSlug, locationSlug }).lean<MediaAsset>();
}

/** General era imagery not tied to a specific figure/event/location — weapons, artifacts, etc. */
export async function getEraArtifacts(eraSlug: string): Promise<MediaAsset[]> {
  await connectMongo();
  return MediaAssetModel.find({ eraSlug, type: "artifact" }).lean<MediaAsset[]>();
}

/** Every media asset for an era, for a consolidated image/texture credits list. */
export async function getAllMedia(eraSlug: string): Promise<MediaAsset[]> {
  await connectMongo();
  return MediaAssetModel.find({ eraSlug }).sort({ type: 1, caption: 1 }).lean<MediaAsset[]>();
}
