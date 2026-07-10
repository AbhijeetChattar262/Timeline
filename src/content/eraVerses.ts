import { mahabharatVerses } from "./mahabharat/verses";

/**
 * Per-era Sanskrit/scriptural verse set. Mirrors eraMotifs: content that lives
 * in code rather than the DB, registered per era. Add a new era's entry here
 * when its verses exist. Each era supplies its own language and sources.
 */
export type Verse = {
  slug: string;
  devanagari: string;
  transliteration: string;
  translation: string;
  source: string;
};

const ERA_VERSES: Record<string, readonly Verse[]> = {
  mahabharat: mahabharatVerses,
};

export function getEraVerses(slug: string): readonly Verse[] {
  return ERA_VERSES[slug] ?? [];
}
