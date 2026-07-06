export const mahabharatTimelineEvents = [
  {
    slug: "game-of-dice",
    title: "The Game of Dice at Hastinapura",
    dateLabel: "Before the war",
    sequenceOrder: 1,
    locationSlug: "hastinapura",
    provenanceTag: "itihasa" as const,
    summary:
      "Shakuni, uncle to the Kauravas, goads Yudhishthira into a rigged game of dice. Yudhishthira stakes and loses his kingdom, his brothers, and finally Draupadi — who is dragged into the court and humiliated. The Pandavas are exiled for thirteen years as a condition of the wager.",
    figures: [
      { slug: "draupadi", roleInEvent: "Staked and humiliated in the court" },
    ],
  },
  {
    slug: "krishnas-peace-embassy",
    title: "Krishna's Embassy for Peace",
    dateLabel: "On the eve of war",
    sequenceOrder: 2,
    locationSlug: "hastinapura",
    provenanceTag: "itihasa" as const,
    summary:
      "As the Pandavas' envoy, Krishna asks Duryodhana for a settlement as small as five villages, one for each brother. Duryodhana refuses to yield land 'without war, not even enough to fit on the point of a needle' — making the conflict unavoidable.",
    figures: [{ slug: "krishna", roleInEvent: "Envoy for peace" }],
  },
  {
    slug: "bhagavad-gita",
    title: "The Bhagavad Gita on the Battlefield",
    dateLabel: "Day 1 of the war",
    sequenceOrder: 3,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "With both armies arrayed and ready, Arjuna asks Krishna to draw his chariot between the lines — and seeing teachers, elders, and kin on the opposing side, he loses the will to fight. Krishna's response, on duty, the self, and acting without attachment to outcome, becomes the Bhagavad Gita.",
    figures: [
      { slug: "krishna", roleInEvent: "Counsels Arjuna" },
      { slug: "arjuna", roleInEvent: "In crisis of conscience" },
    ],
  },
  {
    slug: "fall-of-bhishma",
    title: "The Fall of Bhishma",
    dateLabel: "Day 10 of the war",
    sequenceOrder: 4,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "Bhishma has vowed never to fight one born a woman. Arjuna advances behind Shikhandi, and Bhishma lowers his weapons — falling to a bed of arrows. Having been granted the power to choose the hour of his own death, he lingers there until an auspicious moment before he dies.",
    figures: [
      { slug: "bhishma", roleInEvent: "Falls, mortally wounded" },
      { slug: "arjuna", roleInEvent: "Fells Bhishma" },
    ],
  },
  {
    slug: "death-of-abhimanyu",
    title: "The Death of Abhimanyu",
    dateLabel: "Day 13 of the war",
    sequenceOrder: 5,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "With the elder Pandavas drawn off and blocked from following, the Kaurava army closes the Chakravyuha formation around Abhimanyu, who knows how to break in but never learned how to break out. Multiple warriors converge on him at once — a breach of the war's one-on-one code that becomes one of the Pandavas' deepest grievances.",
    figures: [{ slug: "abhimanyu", roleInEvent: "Trapped and killed" }],
  },
  {
    slug: "fall-of-drona",
    title: "The Fall of Drona",
    dateLabel: "Day 15 of the war",
    sequenceOrder: 6,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "Unable to defeat Drona in open combat, the Pandavas let him hear that 'Ashwatthama is dead' — true only of an elephant given that name, not his son. Drona lays down his weapons to grieve, and is killed by Dhrishtadyumna, Draupadi's brother, born for the purpose of ending him.",
    figures: [{ slug: "krishna", roleInEvent: "Suggests the deception" }],
  },
  {
    slug: "death-of-karna",
    title: "The Death of Karna",
    dateLabel: "Day 17 of the war",
    sequenceOrder: 7,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "With his chariot wheel caught in the mud and a curse robbing him of the incantation for his greatest weapon, Karna is killed by Arjuna — Krishna having kept silent, until near the very end, on the fact that Karna was Kunti's eldest son, and so the Pandavas' own brother.",
    figures: [
      { slug: "karna", roleInEvent: "Killed" },
      { slug: "arjuna", roleInEvent: "Kills Karna" },
      { slug: "krishna", roleInEvent: "Guides Arjuna's chariot" },
    ],
  },
  {
    slug: "death-of-duryodhana",
    title: "The Death of Duryodhana",
    dateLabel: "Day 18 of the war",
    sequenceOrder: 8,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "In the war's final duel, Bhima and Duryodhana fight to exhaustion with maces. At Krishna's private signal, Bhima strikes below the waist — against the rules of fair combat — and breaks Duryodhana's thigh, fulfilling the vow he swore at the dice game years before.",
    figures: [
      { slug: "duryodhana", roleInEvent: "Mortally wounded" },
      { slug: "krishna", roleInEvent: "Signals the killing blow" },
    ],
  },
  {
    slug: "ashwatthamas-night-raid",
    title: "Ashwatthama's Night Raid",
    dateLabel: "Night after Day 18",
    sequenceOrder: 9,
    locationSlug: "kurukshetra",
    provenanceTag: "itihasa" as const,
    summary:
      "Enraged by his father Drona's death and Duryodhana's dying wish for revenge, Ashwatthama slips into the sleeping Pandava camp with two allies and kills the camp's defenders and the five sons born to the Pandavas — a massacre the epic does not let the 'winning' side walk away from cleanly.",
    figures: [],
  },
];
