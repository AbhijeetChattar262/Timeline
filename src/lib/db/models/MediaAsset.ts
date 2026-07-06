import { Schema, model, models, type InferSchemaType } from "mongoose";

const MediaAssetSchema = new Schema(
  {
    eraSlug: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "illustration", "map", "diagram", "artifact"],
      required: true,
    },
    filePathOrUrl: { type: String, required: true },
    caption: { type: String },
    credit: { type: String },
    license: { type: String },
    // Optional tags linking this asset to a specific MySQL figure/event by slug —
    // media lives in Mongo, so this is how content helpers join across the two stores.
    figureSlug: { type: String },
    eventSlug: { type: String },
    locationSlug: { type: String },
  },
  { timestamps: true }
);

MediaAssetSchema.index({ eraSlug: 1 });
MediaAssetSchema.index({ eraSlug: 1, figureSlug: 1 });
MediaAssetSchema.index({ eraSlug: 1, eventSlug: 1 });
MediaAssetSchema.index({ eraSlug: 1, locationSlug: 1 });

export type MediaAsset = InferSchemaType<typeof MediaAssetSchema>;

export const MediaAssetModel = models.MediaAsset || model("MediaAsset", MediaAssetSchema);
