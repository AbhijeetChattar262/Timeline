/**
 * Sanskrit verses for the Mahabharat era — shown as atmospheric shloka bands
 * across the era's screens. Devanagari + IAST transliteration + a plain-English
 * rendering, each anchored to a source. Like eraMotifs, this is content that
 * lives in code (not the DB) and is registered per era in src/content/eraVerses.
 *
 * Devanagari verified against holy-bhagavad-gita.org (public-domain scripture).
 */
export const mahabharatVerses = [
  {
    slug: "gita-1-1",
    devanagari:
      "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
    transliteration:
      "dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
    translation:
      "On the field of dharma, on the field of the Kurus, gathered and hungry for battle — what did my sons and the sons of Pandu do, O Sanjaya?",
    source: "Bhagavad Gita 1.1 — the epic's blind king asks how the war began",
  },
  {
    slug: "gita-2-47",
    devanagari:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration:
      "karmaṇy evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    translation:
      "To action alone you have a right, never to its fruits. Let not the fruit of action be your motive, nor cling to inaction.",
    source: "Bhagavad Gita 2.47 — Krishna to Arjuna on the battlefield",
  },
  {
    slug: "gita-2-23",
    devanagari:
      "नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥",
    transliteration:
      "nainaṃ chindanti śastrāṇi nainaṃ dahati pāvakaḥ\nna cainaṃ kledayanty āpo na śoṣayati mārutaḥ",
    translation:
      "Weapons do not cut it, fire does not burn it, water does not wet it, the wind does not wither it.",
    source: "Bhagavad Gita 2.23 — on the imperishable self",
  },
  {
    slug: "gita-4-7",
    devanagari:
      "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration:
      "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṃ sṛjāmy aham",
    translation:
      "Whenever dharma declines and adharma rises, O Bharata, then do I send forth myself.",
    source: "Bhagavad Gita 4.7 — Krishna on why he enters the world",
  },
] as const;
