export const mahabharatSources = [
  {
    key: "bori-critical-edition",
    title: "The Mahabharata: Critical Edition",
    author: "Bhandarkar Oriental Research Institute (BORI), Pune",
    sourceType: "primary" as const,
    url: "https://www.bori.ac.in/",
    note: "The standard scholarly edition, compiled between 1919 and 1966 by comparing manuscripts from across the Indian subcontinent. This site's baseline text for events and figures.",
  },
  {
    key: "debroy-translation",
    title: "The Mahabharata (unabridged translation, 10 volumes)",
    author: "Bibek Debroy",
    sourceType: "secondary" as const,
    url: null,
    note: "A complete, unabridged English translation based on the BORI critical edition, published by Penguin — used here in preference to condensed or folk retellings.",
  },
  {
    key: "achar-astronomical-dating",
    title: "Astronomical dating of the Kurukshetra war",
    author: "B. N. Narahari Achar",
    sourceType: "secondary" as const,
    url: null,
    note: "Uses planetarium software to test the eclipses and planetary conjunctions described in the epic against the sky, arguing for a date around the 3rd millennium BCE. One of several competing astronomical dating attempts, not a settled consensus.",
  },
  {
    key: "easwaran-gita",
    title: "The Bhagavad Gita (translation and commentary)",
    author: "Eknath Easwaran",
    sourceType: "secondary" as const,
    url: null,
    note: "A widely used translation of the Gita itself, used here for the philosophical content of Krishna's counsel to Arjuna rather than the surrounding narrative.",
  },
];
