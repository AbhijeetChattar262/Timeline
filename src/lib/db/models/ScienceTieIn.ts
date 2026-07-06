import { Schema, model, models, type InferSchemaType } from "mongoose";

const ScienceTieInSchema = new Schema(
  {
    eraSlug: { type: String, required: true },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    bodyMarkdown: { type: String, required: true },
    relatedConcepts: { type: [String], default: [] },
  },
  { timestamps: true }
);

ScienceTieInSchema.index({ eraSlug: 1, slug: 1 }, { unique: true });

export type ScienceTieIn = InferSchemaType<typeof ScienceTieInSchema>;

export const ScienceTieInModel =
  models.ScienceTieIn || model("ScienceTieIn", ScienceTieInSchema);
