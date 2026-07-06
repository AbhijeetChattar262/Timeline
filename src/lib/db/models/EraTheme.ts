import { Schema, model, models, type InferSchemaType } from "mongoose";

const PaletteSchema = new Schema(
  {
    bg: { type: String, required: true },
    bgRaised: { type: String, required: true },
    ink: { type: String, required: true },
    muted: { type: String, required: true },
    accent: { type: String, required: true },
    rule: { type: String, required: true },
  },
  { _id: false }
);

const TypographySchema = new Schema(
  {
    display: { type: String, required: true }, // font family for headings/hero
    body: { type: String, required: true }, // font family for reading text
    utility: { type: String, required: true }, // font family for dates, labels, captions
  },
  { _id: false }
);

const MotifSchema = new Schema(
  {
    texture: { type: String }, // era-authored ambient glow (css gradient string), optional
    dividerStyle: { type: String, required: true }, // e.g. "carved", "telegraph-line", "orbit-arc"
    // Photographic paper/surface textures used as real component backgrounds
    // (chapter card, leaf-cards). One per theme so the material matches the ground.
    paperLight: { type: String }, // asset path used in light mode
    paperDark: { type: String }, // asset path used in dark mode
    // Full-page cover image sitting behind everything (e.g. an aged map),
    // dimmed by a theme-aware wash so components still read on top.
    cover: { type: String }, // asset path, optional
  },
  { _id: false }
);

const PaletteSetSchema = new Schema(
  {
    light: { type: PaletteSchema, required: true },
    dark: { type: PaletteSchema, required: true },
  },
  { _id: false }
);

const EraThemeSchema = new Schema(
  {
    eraSlug: { type: String, required: true, unique: true },
    palette: { type: PaletteSetSchema, required: true },
    typography: { type: TypographySchema, required: true },
    motif: { type: MotifSchema, required: true },
    navMetaphor: { type: String, required: true }, // e.g. "turning a palm-leaf folio"
    heroTreatment: { type: String, required: true }, // short art-direction note for the hero
  },
  { timestamps: true }
);

export type EraTheme = InferSchemaType<typeof EraThemeSchema>;

export const EraThemeModel = models.EraTheme || model("EraTheme", EraThemeSchema);
