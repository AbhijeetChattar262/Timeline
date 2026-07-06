import type { MotifPlacement } from "@/components/era/EraAmbientMotifs";
import {
  ChariotWheel,
  CrossedSwords,
  Bow,
  Shield,
  Khanda,
  ConchShell,
} from "@/components/era/icons";

/**
 * Per-era ambient decoration set. SVG icons are React components, so unlike the
 * palette/paper tokens (which live in Mongo) the motif set lives in code — each
 * era registers the faint background emblems that should recur across all of
 * its screens. Add a new era's entry here when its icon set exists.
 */
const ERA_MOTIFS: Record<string, MotifPlacement[]> = {
  mahabharat: [
    { icon: <ChariotWheel size={230} />, position: { top: "4%", left: "-4%" }, opacity: 0.05, rotate: -6 },
    { icon: <CrossedSwords size={280} />, position: { top: "8%", right: "-5%" }, opacity: 0.045, rotate: 4 },
    { icon: <Bow size={210} />, position: { top: "46%", left: "-3%" }, opacity: 0.05, rotate: -4 },
    { icon: <Khanda size={170} />, position: { top: "60%", right: "3%" }, opacity: 0.05, rotate: 8 },
    { icon: <Shield size={200} />, position: { bottom: "5%", left: "6%" }, opacity: 0.05, rotate: -5 },
    { icon: <ConchShell size={190} />, position: { bottom: "8%", right: "-3%" }, opacity: 0.045, rotate: 6 },
  ],
};

export function getEraMotifs(slug: string): MotifPlacement[] {
  return ERA_MOTIFS[slug] ?? [];
}
