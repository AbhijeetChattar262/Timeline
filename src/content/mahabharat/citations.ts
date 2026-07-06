// Which sources back which facts. Every figure cites the two textual sources;
// the astronomical-dating source is attached to the war's opening event, where
// its dating argument is most relevant.

export const mahabharatFigureCitations = mahabharatFigureSlugs().flatMap((figureSlug) => [
  { figureSlug, sourceKey: "bori-critical-edition" as const },
  { figureSlug, sourceKey: "debroy-translation" as const },
]);

export const mahabharatEventCitations = [
  { eventSlug: "game-of-dice", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "krishnas-peace-embassy", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "bhagavad-gita", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "bhagavad-gita", sourceKey: "debroy-translation" as const },
  {
    eventSlug: "bhagavad-gita",
    sourceKey: "achar-astronomical-dating" as const,
    note: "Discusses dating the war's start via the eclipses described around this point in the narrative.",
  },
  { eventSlug: "bhagavad-gita", sourceKey: "easwaran-gita" as const },
  { eventSlug: "fall-of-bhishma", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "death-of-abhimanyu", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "fall-of-drona", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "death-of-karna", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "death-of-duryodhana", sourceKey: "bori-critical-edition" as const },
  { eventSlug: "ashwatthamas-night-raid", sourceKey: "bori-critical-edition" as const },
];

function mahabharatFigureSlugs() {
  return [
    "krishna",
    "arjuna",
    "karna",
    "bhishma",
    "draupadi",
    "duryodhana",
    "yudhishthira",
    "bhima",
    "shakuni",
    "abhimanyu",
  ];
}
