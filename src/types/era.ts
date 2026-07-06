import type { EraTheme } from "@/lib/db/models/EraTheme";
import type { Chapter } from "@/lib/db/models/Chapter";
import type { MediaAsset } from "@/lib/db/models/MediaAsset";
import type { ScienceTieIn } from "@/lib/db/models/ScienceTieIn";

export type PaletteTokens = EraTheme["palette"]["light"];
export type TypographyTokens = EraTheme["typography"];
export type MotifTokens = EraTheme["motif"];

export type { EraTheme, Chapter, MediaAsset, ScienceTieIn };

/** CSS custom property names every era-engine component reads from — never a hardcoded color or font. */
export const THEME_CSS_VARS = {
  bg: "--color-bg",
  bgRaised: "--color-bg-raised",
  ink: "--color-ink",
  muted: "--color-muted",
  accent: "--color-accent",
  rule: "--color-rule",
  fontDisplay: "--font-display",
  fontBody: "--font-body",
  fontUtility: "--font-utility",
} as const;
