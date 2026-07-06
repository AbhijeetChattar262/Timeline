import { Schema, model, models, type InferSchemaType } from "mongoose";

const ChapterSchema = new Schema(
  {
    eraSlug: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    provenanceTag: {
      type: String,
      enum: ["itihasa", "record", "observed"] as const,
      required: true,
    },
    bodyMarkdown: { type: String, required: true },
    heroMediaId: { type: Schema.Types.ObjectId, ref: "MediaAsset" },
    relatedFigureSlugs: { type: [String], default: [] },
    relatedEventSlugs: { type: [String], default: [] },
  },
  { timestamps: true }
);

ChapterSchema.index({ eraSlug: 1, chapterNumber: 1 });
ChapterSchema.index({ eraSlug: 1, slug: 1 }, { unique: true });

export type Chapter = InferSchemaType<typeof ChapterSchema>;

export const ChapterModel = models.Chapter || model("Chapter", ChapterSchema);
