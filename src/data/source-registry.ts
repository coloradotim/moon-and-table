export const SOURCE_USE_DECISIONS = [
  "use",
  "use_carefully",
  "context_only",
  "defer",
  "avoid",
] as const;

export type SourceUseDecision = (typeof SOURCE_USE_DECISIONS)[number];

export const SOURCE_REVIEW_STATUSES = [
  "candidate",
  "reviewed",
  "approved",
  "rejected",
] as const;

export type SourceReviewStatus = (typeof SOURCE_REVIEW_STATUSES)[number];

export const SOURCE_TYPES = [
  "book",
  "article",
  "site",
  "library",
  "api",
  "software",
  "documentation",
  "safety_reference",
  "other",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

export type SourceReview = {
  id: string;
  title: string;
  authorOrPublisher?: string;
  category: string;
  sourceType: SourceType;
  useDecision: SourceUseDecision;
  reviewStatus: SourceReviewStatus;
  bestFor: string[];
  concerns: string[];
  copyrightNotes: string[];
  safetyNotes: string[];
  culturalContextNotes: string[];
  extractionNotes: string[];
  confidence: "low" | "medium" | "high";
};

export type SourceNote = {
  id: string;
  sourceId: string;
  locationNote: string;
  paraphrasedNote: string;
  category: string;
  tags: string[];
  riskNotes: string[];
  safetyNotes: string[];
  copyrightNotes: string[];
  verbatimAllowed: false;
};

export type SourceValidationResult = {
  valid: boolean;
  errors: string[];
};

const MAX_PARAPHRASED_NOTE_LENGTH = 280;
const LONG_QUOTE_PATTERN = /"[^"]{80,}"|'[^']{80,}'/;
const FORBIDDEN_PRIVATE_TERMS = [
  "birth date",
  "birth time",
  "birth place",
  "natal placement",
  "relationship details",
  "private source text",
];

export const starterSourceReviews: SourceReview[] = [
  {
    id: "source.astronomy_engine",
    title: "Astronomy Engine",
    authorOrPublisher: "Cosine Kitty",
    category: "computed_timing",
    sourceType: "library",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: [
      "deterministic moon phase and sky timing facts",
      "separating computed facts from symbolic interpretation",
    ],
    concerns: [
      "should not be treated as an interpretation source",
    ],
    copyrightNotes: [
      "use library outputs and documentation references; do not copy documentation prose into cards",
    ],
    safetyNotes: [
      "computed timing facts do not override household capacity or safety constraints",
    ],
    culturalContextNotes: [],
    extractionNotes: [
      "extract fact keys and calculation provenance only",
    ],
    confidence: "high",
  },
  {
    id: "source.steven_forrest",
    title: "Steven Forrest astrology works",
    authorOrPublisher: "Steven Forrest",
    category: "astrology_interpretation",
    sourceType: "book",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "symbolic astrology grammar",
      "non-deterministic interpretive guardrails",
    ],
    concerns: [
      "do not copy delineations or use deterministic claims",
    ],
    copyrightNotes: [
      "manual review only; store short transformed notes rather than passages",
    ],
    safetyNotes: [
      "avoid fear-based relationship, health, or fate claims",
    ],
    culturalContextNotes: [
      "treat as modern interpretive astrology, not factual certainty",
    ],
    extractionNotes: [
      "extract reusable symbolic patterns only after manual review",
    ],
    confidence: "medium",
  },
  {
    id: "source.kevin_burk",
    title: "Kevin Burk astrology works",
    authorOrPublisher: "Kevin Burk",
    category: "astrology_interpretation",
    sourceType: "book",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "structured astrology fundamentals",
      "clear separation of symbols and synthesis",
    ],
    concerns: [
      "later astrology expansion may exceed MVP scope",
    ],
    copyrightNotes: [
      "manual review only; no copied delineation text",
    ],
    safetyNotes: [
      "keep interpretation invitational and low-stakes",
    ],
    culturalContextNotes: [
      "use as one modern astrology framework among several",
    ],
    extractionNotes: [
      "extract schema needs and symbolic relationships, not prose",
    ],
    confidence: "medium",
  },
  {
    id: "source.april_elliott_kent",
    title: "April Elliott Kent astrology works",
    authorOrPublisher: "April Elliott Kent",
    category: "astrology_interpretation",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "plain-language astrology framing",
      "beginner-safe timing prompts",
      "keeping transit language practical and modest",
    ],
    concerns: [
      "do not imitate voice or import horoscope-style certainty",
    ],
    copyrightNotes: [
      "manual review only; transform ideas into short product notes",
    ],
    safetyNotes: [
      "avoid advice about health, finances, danger, identity, or relationships",
    ],
    culturalContextNotes: [
      "use as modern practical astrology context, not as factual proof",
    ],
    extractionNotes: [
      "extract tone and transit prompt patterns without copying phrasing",
    ],
    confidence: "medium",
  },
  {
    id: "source.astrology_ethics_sources",
    title: "Astrology ethics source family",
    authorOrPublisher: "ISAR / OPA / NCGR and related ethics material",
    category: "astrology_ethics",
    sourceType: "other",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "interpretive boundaries",
      "consent-aware astrology language",
      "blocking prediction, fear, and certainty claims",
    ],
    concerns: [
      "specific ethics language should be checked directly before citation",
    ],
    copyrightNotes: [
      "cite organizations or source families; do not copy policy language",
    ],
    safetyNotes: [
      "ethical guardrails should override symbolic signal enthusiasm",
    ],
    culturalContextNotes: [
      "treat as professional conduct guidance for symbolic interpretation",
    ],
    extractionNotes: [
      "extract guardrail categories and avoid-saying rules only",
    ],
    confidence: "medium",
  },
  {
    id: "source.barnum_forer_guardrail",
    title: "Barnum / Forer effect guardrail material",
    authorOrPublisher: "Psychology and critical-thinking reference family",
    category: "interpretive_safety",
    sourceType: "article",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "quality checks against vague universal claims",
      "keeping symbolic language specific to selected facts and cards",
    ],
    concerns: [
      "use as an anti-manipulation guardrail, not as a source of ritual meaning",
    ],
    copyrightNotes: [
      "use only high-level transformed quality guidance",
    ],
    safetyNotes: [
      "avoid language that feels personally revealing without real support",
    ],
    culturalContextNotes: [
      "helps keep the product from overstating symbolic interpretation",
    ],
    extractionNotes: [
      "extract QA guardrails for specificity, humility, and non-determinism",
    ],
    confidence: "medium",
  },
  {
    id: "source.hans_decoz_tom_monte",
    title: "Hans Decoz / Tom Monte numerology works",
    authorOrPublisher: "Hans Decoz and Tom Monte",
    category: "numerology_interpretation",
    sourceType: "book",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "number 1-9 symbolic vocabulary",
      "universal date calculation framing",
      "keeping numerology structured instead of improvised",
    ],
    concerns: [
      "do not copy number descriptions or imply destiny, personality certainty, or prediction",
    ],
    copyrightNotes: [
      "manual review only; store short transformed notes rather than passages",
    ],
    safetyNotes: [
      "numerology stays secondary to capacity, safety, and stronger timing/profile signals",
    ],
    culturalContextNotes: [
      "treat as modern symbolic numerology, not factual proof",
    ],
    extractionNotes: [
      "extract reusable number themes, calculation boundaries, and avoid-saying rules",
    ],
    confidence: "medium",
  },
  {
    id: "source.david_phillips_numerology",
    title: "David Phillips numerology reference",
    authorOrPublisher: "David Phillips",
    category: "numerology_interpretation",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "secondary cross-check for number 1-9 themes",
      "guarding against one-source overconfidence",
    ],
    concerns: [
      "some frameworks can become personality-heavy; use only broad symbolic cross-checks",
    ],
    copyrightNotes: [
      "manual review only; no copied passages or distinctive number wording",
    ],
    safetyNotes: [
      "avoid personality certainty, compatibility claims, and life-path style inference",
    ],
    culturalContextNotes: [
      "use as one numerology framework among several",
    ],
    extractionNotes: [
      "extract only source-safe parallels and product guardrails",
    ],
    confidence: "medium",
  },
  {
    id: "source.sarah_faith_gottesdiener",
    title: "Sarah Faith Gottesdiener — lunar reflection source",
    authorOrPublisher: "Sarah Faith Gottesdiener",
    category: "moon_phase_symbolism",
    sourceType: "book",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "four-phase lunar reflection patterns",
      "low-overwhelm moon phase prompts and questions",
      "quiet intention, attention, release, and integration framing",
    ],
    concerns: [
      "do not imitate voice or copy reflective prompts",
      "do not let reflective material become emotional pressure",
    ],
    copyrightNotes: [
      "manual review only; transform observations into original source notes",
    ],
    safetyNotes: [
      "avoid urgency, manifestation guarantees, or emotional overreach",
    ],
    culturalContextNotes: [
      "keep lunar framing personal and invitational",
    ],
    extractionNotes: [
      "use to cross-check four-phase moon cards with short transformed notes only",
    ],
    confidence: "medium",
  },
  {
    id: "source.rachel_patterson_moon",
    title: "Rachel Patterson — lunar/domestic magic source",
    authorOrPublisher: "Rachel Patterson",
    category: "moon_phase_symbolism",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "practical lunar and domestic correspondences",
      "cross-checking simple moon phase action patterns",
      "connecting moon timing to ordinary home practices",
    ],
    concerns: [
      "filter spell-timing and correspondence material through Moon & Table safety and tone rules",
    ],
    copyrightNotes: [
      "manual review only; do not copy rituals, spells, prayers, chants, or distinctive instructions",
    ],
    safetyNotes: [
      "no smoke, oils, ingestion, or outcome claims should be imported as defaults; flame needs ordinary candle safety",
    ],
    culturalContextNotes: [
      "use broad lunar/home practice context without presenting it as universal fact",
    ],
    extractionNotes: [
      "extract short transformed lunar action themes only; do not import spell scripts",
    ],
    confidence: "medium",
  },
  {
    id: "source.laurel_woodward",
    title: "Laurel Woodward kitchen magic works",
    authorOrPublisher: "Laurel Woodward",
    category: "kitchen_magic",
    sourceType: "book",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "domestic kitchen symbolism",
      "ordinary ingredient card candidates",
    ],
    concerns: [
      "ingredient symbolism must be filtered through food and household safety",
    ],
    copyrightNotes: [
      "do not copy recipes, rituals, spells, prayers, chants, or affirmations",
    ],
    safetyNotes: [
      "food practices need normal-food-use framing and safety overrides",
    ],
    culturalContextNotes: [
      "avoid presenting correspondences as universal facts",
    ],
    extractionNotes: [
      "extract concise ingredient themes and safety needs",
    ],
    confidence: "medium",
  },
  {
    id: "source.arin_murphy_hiscock",
    title: "Arin Murphy-Hiscock home and green magic works",
    authorOrPublisher: "Arin Murphy-Hiscock",
    category: "home_green_magic",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "home tending framing",
      "plant care as gentle ritual",
    ],
    concerns: [
      "avoid medicinal herb claims and culturally loaded smoke practices",
    ],
    copyrightNotes: [
      "manual review only; no copied spells or distinctive phrasing",
    ],
    safetyNotes: [
      "plant and herb content needs pet, allergy, and ingestion review",
    ],
    culturalContextNotes: [
      "prefer plain home tending language over tradition-specific claims",
    ],
    extractionNotes: [
      "extract starter pattern candidates for plant and room tending",
    ],
    confidence: "medium",
  },
  {
    id: "source.cheryl_mendelson",
    title: "Cheryl Mendelson homekeeping source",
    authorOrPublisher: "Cheryl Mendelson",
    category: "home_tending",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "practical home maintenance framing",
      "distinguishing small care from moralized housekeeping",
    ],
    concerns: [
      "avoid making cleaning feel like moral failure or social performance",
    ],
    copyrightNotes: [
      "manual review only; transform concepts into product notes, not housekeeping prose",
    ],
    safetyNotes: [
      "cleaning practices must stay light, ventilated, and ordinary-use only",
    ],
    culturalContextNotes: [
      "homekeeping norms are culturally situated and should not be treated as universal",
    ],
    extractionNotes: [
      "extract practical sequence and burden guardrails only",
    ],
    confidence: "medium",
  },
  {
    id: "source.shoukei_matsumoto",
    title: "Shoukei Matsumoto cleaning and care source",
    authorOrPublisher: "Shoukei Matsumoto",
    category: "home_tending",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "cleaning as attention and care",
      "small embodied household practices",
    ],
    concerns: [
      "do not import religious instruction or tradition-specific practice as generic advice",
    ],
    copyrightNotes: [
      "manual review only; no copied meditation or practice wording",
    ],
    safetyNotes: [
      "avoid making discipline, purity, or duty claims",
    ],
    culturalContextNotes: [
      "use only broad transformed attention-and-care concepts with clear product voice",
    ],
    extractionNotes: [
      "extract low-overwhelm attention patterns, not devotional framing",
    ],
    confidence: "medium",
  },
  {
    id: "source.tess_whitehurst",
    title: "Tess Whitehurst home magic source",
    authorOrPublisher: "Tess Whitehurst",
    category: "home_magic",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "home atmosphere and blessing vocabulary",
      "simple symbolic home actions after safety filtering",
    ],
    concerns: [
      "filter out protection-from-danger, curse-breaking, smoke, oil, and outcome claims",
    ],
    copyrightNotes: [
      "manual review only; do not copy rituals, prayers, chants, or distinctive phrasing",
    ],
    safetyNotes: [
      "safety and low-overwhelm tone override magical correspondences",
    ],
    culturalContextNotes: [
      "avoid importing culturally loaded practices without context",
    ],
    extractionNotes: [
      "extract only broadly domestic symbolic concepts that fit Moon & Table tone",
    ],
    confidence: "medium",
  },
  {
    id: "source.scott_cunningham_cross_check",
    title: "Scott Cunningham correspondence cross-check",
    authorOrPublisher: "Scott Cunningham",
    category: "kitchen_plant_magic",
    sourceType: "book",
    useDecision: "context_only",
    reviewStatus: "reviewed",
    bestFor: [
      "cross-checking common herb and ingredient correspondences",
    ],
    concerns: [
      "do not import spell text, medicinal claims, or correspondence certainty",
    ],
    copyrightNotes: [
      "context only; no copied lists, recipes, spells, or distinctive phrasing",
    ],
    safetyNotes: [
      "normal household use and safety overrides must control ingredient suggestions",
    ],
    culturalContextNotes: [
      "treat as one modern correspondence source, not universal authority",
    ],
    extractionNotes: [
      "use only as a cross-check for already safe ingredient cards and patterns",
    ],
    confidence: "low",
  },
  {
    id: "source.cdc_cleaning_safety",
    title: "CDC cleaning and food safety references",
    authorOrPublisher: "Centers for Disease Control and Prevention",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: ["ordinary cleaning, food, and ventilation safety guardrails"],
    concerns: ["check directly before citing specific health guidance"],
    copyrightNotes: ["cite public reference family; do not paste passages"],
    safetyNotes: ["public safety guidance overrides symbolic ritual fit"],
    culturalContextNotes: [],
    extractionNotes: ["extract guardrail categories only"],
    confidence: "high",
  },
  {
    id: "source.epa_household_air",
    title: "EPA indoor air and household environment references",
    authorOrPublisher: "Environmental Protection Agency",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: ["smoke, scent, ventilation, and indoor-air guardrails"],
    concerns: ["check directly before citing specific exposure guidance"],
    copyrightNotes: ["cite public reference family; do not paste passages"],
    safetyNotes: ["avoid smoke and strong fragrance defaults"],
    culturalContextNotes: [],
    extractionNotes: ["extract ventilation and indoor-air caution categories"],
    confidence: "high",
  },
  {
    id: "source.nfpa_fire_safety",
    title: "NFPA fire safety references",
    authorOrPublisher: "National Fire Protection Association",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: ["candle and household fire safety guardrails"],
    concerns: ["check directly before citing specific fire guidance"],
    copyrightNotes: ["cite public reference family; do not paste passages"],
    safetyNotes: ["live flame must be optional, supervised, and declared"],
    culturalContextNotes: [],
    extractionNotes: ["extract flame-risk guardrail categories only"],
    confidence: "high",
  },
  {
    id: "source.fda_food_safety",
    title: "FDA food safety references",
    authorOrPublisher: "Food and Drug Administration",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: ["normal food-use and ingredient safety guardrails"],
    concerns: ["check directly before citing specific food safety guidance"],
    copyrightNotes: ["cite public reference family; do not paste passages"],
    safetyNotes: ["no medicinal food or herbal claims"],
    culturalContextNotes: [],
    extractionNotes: ["extract normal-food-use guardrail categories"],
    confidence: "high",
  },
  {
    id: "source.poison_control",
    title: "Poison Control household safety references",
    authorOrPublisher: "Poison Control",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: ["poison, essential oil, and accidental ingestion guardrails"],
    concerns: ["check directly before citing specific hazard guidance"],
    copyrightNotes: ["cite public reference family; do not paste passages"],
    safetyNotes: ["essential oil ingestion and risky household substances are blocked"],
    culturalContextNotes: [],
    extractionNotes: ["extract poison-prevention guardrail categories"],
    confidence: "high",
  },
  {
    id: "source.aspca_plant_safety",
    title: "ASPCA plant and pet safety references",
    authorOrPublisher: "ASPCA",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: ["pet-access and plant safety guardrails"],
    concerns: ["check directly before naming plant-specific safety claims"],
    copyrightNotes: ["cite public reference family; do not paste passages"],
    safetyNotes: ["pet access can block plant and herb recommendations"],
    culturalContextNotes: [],
    extractionNotes: ["extract pet-access review categories"],
    confidence: "high",
  },
  {
    id: "source.safety_reference_families",
    title: "FDA / CDC / ASPCA / Poison Control / NFPA safety references",
    authorOrPublisher: "Public safety reference families",
    category: "ritual_safety",
    sourceType: "safety_reference",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: [
      "food, pet, poison, fire, and household safety overrides",
      "blocking unsafe ritual recommendations",
    ],
    concerns: [
      "reference families must be checked directly for specific safety claims",
    ],
    copyrightNotes: [
      "cite public references; do not paste long safety passages",
    ],
    safetyNotes: [
      "safety overrides outrank symbolic correspondences",
    ],
    culturalContextNotes: [],
    extractionNotes: [
      "extract guardrail categories and review requirements",
    ],
    confidence: "high",
  },
  {
    id: "source.noaa_nws_seasonal_facts",
    title: "NOAA / NWS seasonal fact references",
    authorOrPublisher: "NOAA and National Weather Service",
    category: "seasonal_facts",
    sourceType: "site",
    useDecision: "use",
    reviewStatus: "approved",
    bestFor: [
      "factual seasonal and climate context",
      "keeping seasonal markers separate from symbolic interpretation",
    ],
    concerns: [
      "do not turn broad climate or weather context into user-specific safety advice",
    ],
    copyrightNotes: [
      "cite public reference family; do not copy forecast, climate, or educational prose",
    ],
    safetyNotes: [
      "weather and air-quality safety should be checked directly outside ritual symbolism",
    ],
    culturalContextNotes: [],
    extractionNotes: [
      "extract factual-source role and seasonal marker guardrails only",
    ],
    confidence: "high",
  },
  {
    id: "source.temperance_alden_seasonal_practice",
    title: "Temperance Alden seasonal practice source",
    authorOrPublisher: "Temperance Alden",
    category: "seasonal_home_practice",
    sourceType: "book",
    useDecision: "use",
    reviewStatus: "reviewed",
    bestFor: [
      "place-aware seasonal practice framing",
      "ordinary household attention to seasonal change",
    ],
    concerns: [
      "avoid importing culturally flattened holidays or local ecology claims",
    ],
    copyrightNotes: [
      "manual review only; store short transformed notes rather than seasonal rituals or distinctive phrasing",
    ],
    safetyNotes: [
      "seasonal practice should not override weather, health, capacity, or household safety",
    ],
    culturalContextNotes: [
      "treat place-based practice as a prompt for attention, not a universal calendar script",
    ],
    extractionNotes: [
      "extract domestic seasonal themes and guardrails, not festival instructions",
    ],
    confidence: "medium",
  },
  {
    id: "source.anna_franklin_seasonal_home",
    title: "Anna Franklin seasonal home source",
    authorOrPublisher: "Anna Franklin",
    category: "seasonal_home_practice",
    sourceType: "book",
    useDecision: "use_carefully",
    reviewStatus: "reviewed",
    bestFor: [
      "seasonal hearth and home rhythm",
      "light, warmth, harvest, rest, and transition themes",
    ],
    concerns: [
      "filter folklore, festival, and correspondence material through Moon & Table tone and safety rules",
    ],
    copyrightNotes: [
      "manual review only; do not copy rituals, prayers, chants, folklore entries, recipes, or distinctive seasonal phrasing",
    ],
    safetyNotes: [
      "avoid smoke, flame, food, herbs, or outdoor practices as defaults",
    ],
    culturalContextNotes: [
      "do not flatten culturally specific festivals into generic household advice",
    ],
    extractionNotes: [
      "extract short transformed seasonal home themes only",
    ],
    confidence: "medium",
  },
  {
    id: "source.old_farmers_almanac_context",
    title: "Old Farmer's Almanac context source",
    authorOrPublisher: "Old Farmer's Almanac",
    category: "almanac_context",
    sourceType: "site",
    useDecision: "context_only",
    reviewStatus: "reviewed",
    bestFor: [
      "almanac format and seasonal context",
      "distinguishing folklore context from scientific authority",
    ],
    concerns: [
      "do not scrape, copy entries, or treat folklore as factual seasonal proof",
    ],
    copyrightNotes: [
      "context only; no copied almanac entries, tables, poems, forecasts, or distinctive wording",
    ],
    safetyNotes: [
      "almanac context cannot provide safety, weather, medical, or household-risk advice",
    ],
    culturalContextNotes: [
      "folklore and holidays need context and should not become generic requirements",
    ],
    extractionNotes: [
      "use only as format/context guardrail for what Moon & Table should not dump",
    ],
    confidence: "low",
  },
];

type SourceNoteSeed = Omit<SourceNote, "locationNote" | "category" | "copyrightNotes" | "verbatimAllowed"> & {
  category?: string;
  locationNote?: string;
};

function makeAstrologySourceNote(seed: SourceNoteSeed): SourceNote {
  return {
    ...seed,
    locationNote:
      seed.locationNote ??
      "docs/source-research-synthesis.md Batch 8 astrology accent layer",
    category: seed.category ?? "astrology_interpretation",
    copyrightNotes: [
      "short transformed note only; no copied delineation or horoscope text",
    ],
    verbatimAllowed: false,
  };
}

function makeSeasonalSourceNote(seed: SourceNoteSeed): SourceNote {
  return {
    ...seed,
    locationNote:
      seed.locationNote ??
      "docs/source-research-synthesis.md seasonal and almanac source synthesis",
    category: seed.category ?? "seasonal_home_practice",
    copyrightNotes: [
      "short transformed note only; no copied almanac entry, ritual, folklore text, or seasonal prose",
    ],
    verbatimAllowed: false,
  };
}

const seasonalSourceNotes: SourceNote[] = [
  makeSeasonalSourceNote({
    id: "note.seasonal_facts_as_markers",
    sourceId: "source.astronomy_engine",
    category: "seasonal_facts",
    paraphrasedNote:
      "Use solstices and equinoxes as computed seasonal markers; interpretation must come from reviewed symbolic cards and rules.",
    tags: ["seasonal", "computed_fact", "solstice", "equinox"],
    riskNotes: ["avoid treating a computed marker as a ritual instruction"],
    safetyNotes: ["capacity and household safety still choose ritual size"],
  }),
  makeSeasonalSourceNote({
    id: "note.noaa_seasons_fact_guardrail",
    sourceId: "source.noaa_nws_seasonal_facts",
    category: "seasonal_facts",
    paraphrasedNote:
      "Use NOAA/NWS as factual seasonal context only; do not turn broad weather or climate material into personal safety advice.",
    tags: ["seasonal", "facts", "weather_guardrail"],
    riskNotes: ["avoid forecast-like or safety-advice claims"],
    safetyNotes: ["specific weather safety should be checked directly outside the brief"],
  }),
  makeSeasonalSourceNote({
    id: "note.spring_equinox_opening_balance",
    sourceId: "source.temperance_alden_seasonal_practice",
    paraphrasedNote:
      "Use spring equinox as a symbolic cue for opening, balance, freshening, and one small reset without demanding a new life.",
    tags: ["seasonal", "spring_equinox", "opening"],
    riskNotes: ["avoid reinvention or spring-cleaning pressure"],
    safetyNotes: ["freshening should not require fragrance, smoke, or heavy cleaning"],
  }),
  makeSeasonalSourceNote({
    id: "note.summer_solstice_light_tending",
    sourceId: "source.anna_franklin_seasonal_home",
    paraphrasedNote:
      "Use summer solstice as a symbolic cue for light, warmth, visibility, gratitude, and tending what is fully present.",
    tags: ["seasonal", "summer_solstice", "light"],
    riskNotes: ["avoid heat, sun, productivity, or celebration pressure"],
    safetyNotes: ["do not make sun exposure, flame, or outdoor activity a requirement"],
  }),
  makeSeasonalSourceNote({
    id: "note.autumn_equinox_harvest_storing",
    sourceId: "source.anna_franklin_seasonal_home",
    paraphrasedNote:
      "Use autumn equinox as a symbolic cue for gratitude, gathering, storing, balance, and choosing what is worth keeping.",
    tags: ["seasonal", "autumn_equinox", "harvest"],
    riskNotes: ["avoid harvest abundance claims or shopping/decor pressure"],
    safetyNotes: ["food and storage actions must stay normal household use only"],
  }),
  makeSeasonalSourceNote({
    id: "note.winter_solstice_rest_warmth",
    sourceId: "source.temperance_alden_seasonal_practice",
    paraphrasedNote:
      "Use winter solstice as a symbolic cue for quiet, warmth, rest, attention protection, and a small return of light.",
    tags: ["seasonal", "winter_solstice", "rest"],
    riskNotes: ["avoid darkness fear, isolation, or forced hope"],
    safetyNotes: ["warmth and light cues should not require flame or outdoor exposure"],
  }),
  makeSeasonalSourceNote({
    id: "note.seasonal_opening_airing_freshening",
    sourceId: "source.temperance_alden_seasonal_practice",
    paraphrasedNote:
      "Seasonal opening can mean airing, freshening, or making one threshold easier, without smoke, scent, or a large cleanout.",
    tags: ["seasonal", "opening", "freshening", "threshold"],
    riskNotes: ["avoid smoke cleansing or deep-cleaning pressure"],
    safetyNotes: ["check weather, air quality, pets, children, allergies, and security before opening windows"],
  }),
  makeSeasonalSourceNote({
    id: "note.seasonal_warmth_light_rest",
    sourceId: "source.anna_franklin_seasonal_home",
    paraphrasedNote:
      "Seasonal warmth and light can support a rest cue, a lamp, a blanket, or a brief candle only when capacity and safety fit.",
    tags: ["seasonal", "warmth", "light", "rest"],
    riskNotes: ["avoid requiring flame, shopping, or forced cheer"],
    safetyNotes: ["live flame stays optional and supervised"],
  }),
  makeSeasonalSourceNote({
    id: "note.seasonal_harvest_gratitude_storing",
    sourceId: "source.anna_franklin_seasonal_home",
    paraphrasedNote:
      "Harvest symbolism can become gratitude, using what is already present, and storing one useful thing without abundance claims.",
    tags: ["seasonal", "harvest", "gratitude", "storing"],
    riskNotes: ["avoid prosperity guarantees or moralizing plenty"],
    safetyNotes: ["do not add food, preservation, or storage safety advice"],
  }),
  makeSeasonalSourceNote({
    id: "note.wintering_quiet_attention_protection",
    sourceId: "source.temperance_alden_seasonal_practice",
    paraphrasedNote:
      "Wintering can mean protecting attention, choosing quiet, reducing inputs, and making rest easier without protection-from-danger claims.",
    tags: ["seasonal", "wintering", "attention"],
    riskNotes: ["avoid spiritual danger, curse, or guaranteed protection language"],
    safetyNotes: ["rest cues should not replace practical safety needs"],
  }),
  makeSeasonalSourceNote({
    id: "note.seasonal_table_home_reset",
    sourceId: "source.anna_franklin_seasonal_home",
    paraphrasedNote:
      "A seasonal table or home reset can mark transition with one ordinary object or cleared spot, not a decorative obligation.",
    tags: ["seasonal", "table", "home_reset"],
    riskNotes: ["avoid shopping lists, decor pressure, or festival scripts"],
    safetyNotes: ["use only ordinary household items already safe and available"],
  }),
  makeSeasonalSourceNote({
    id: "note.almanac_context_not_authority",
    sourceId: "source.old_farmers_almanac_context",
    category: "almanac_context",
    paraphrasedNote:
      "Use almanac material as context for seasonal format and folk texture, not as scientific authority or copied content.",
    tags: ["seasonal", "almanac", "context"],
    riskNotes: ["avoid copied folklore, forecast claims, or authority confusion"],
    safetyNotes: ["almanac context does not provide household safety advice"],
  }),
];

const strengthenedAstrologySourceNotes: SourceNote[] = [
  makeAstrologySourceNote({
    id: "note.astrology_body_sun_focus_visibility",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use the Sun for focus, visibility, vitality, and the central household theme that wants steady attention.",
    tags: ["astrology", "sun", "focus"],
    riskNotes: ["avoid life-purpose certainty or identity claims"],
    safetyNotes: ["keep solar language modest and practical"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_body_moon_care_rhythm",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use the Moon for care rhythms, felt needs, habit, memory, and pacing a ritual so it fits the home.",
    tags: ["astrology", "moon", "care"],
    riskNotes: ["avoid claiming the Moon causes moods or behavior"],
    safetyNotes: ["keep emotional prompts optional"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_body_mercury_words_sorting",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Mercury for naming, sorting, messages, lists, small decisions, and careful household communication.",
    tags: ["astrology", "mercury", "communication"],
    riskNotes: ["avoid predicting confusion or forcing conversation"],
    safetyNotes: ["conversation prompts require consent"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_body_venus_warmth_worth",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Use Venus for warmth, beauty, affection, sweetness, appreciation, and what feels worth tending.",
    tags: ["astrology", "venus", "warmth"],
    riskNotes: ["avoid attraction claims or relationship-control language"],
    safetyNotes: ["avoid scent, food, or flame when not a fit"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_body_mars_bounded_action",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use Mars for directness, courage, movement, friction, and one bounded action that does not become escalation.",
    tags: ["astrology", "mars", "action"],
    riskNotes: ["avoid conflict, anger, or danger predictions"],
    safetyNotes: ["keep Mars rituals contained and non-confrontational"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_body_jupiter_perspective_support",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Jupiter for wider perspective, generosity, learning, encouragement, and making room without overexpanding.",
    tags: ["astrology", "jupiter", "perspective"],
    riskNotes: ["avoid luck, abundance, or guaranteed growth claims"],
    safetyNotes: ["do not suggest spending or larger commitments by default"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_body_saturn_limits_structure",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Saturn for limits, structure, responsibility, steadiness, boundaries, and durable support.",
    tags: ["astrology", "saturn", "structure"],
    riskNotes: ["avoid punishment, hardship, or moralizing productivity"],
    safetyNotes: ["structure should protect rest and capacity"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_aries_direct_start",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Aries as a direct starting style: courage, heat, initiative, and one clear action with a stopping point.",
    tags: ["astrology", "aries", "sign"],
    riskNotes: ["avoid urgency, aggression, or personality labels"],
    safetyNotes: ["keep action bounded"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_taurus_steady_care",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Taurus as a steady care style: comfort, consistency, sensory grounding, and practical maintenance.",
    tags: ["astrology", "taurus", "sign"],
    riskNotes: ["avoid stubbornness or indulgence stereotypes"],
    safetyNotes: ["check scent, food, and touch fit before suggesting them"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_gemini_light_sorting",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Gemini as a light sorting style: curiosity, naming, exchange, and making one small tangle clearer.",
    tags: ["astrology", "gemini", "sign"],
    riskNotes: ["avoid scattered or inconsistent personality labels"],
    safetyNotes: ["keep communication light and optional"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_cancer_home_containment",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Use Cancer for care, containment, memory, kitchen or home focus, and a gentler household pace.",
    tags: ["astrology", "cancer", "sign"],
    riskNotes: ["avoid emotional pressure or family assumptions"],
    safetyNotes: ["care rituals should not require disclosure"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_leo_visible_warmth",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Use Leo for visible warmth, appreciation, playfulness, heartfelt expression, and making care easier to feel.",
    tags: ["astrology", "leo", "sign"],
    riskNotes: ["avoid drama or attention stereotypes"],
    safetyNotes: ["celebration should stay optional"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_virgo_useful_tending",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Virgo for useful tending, practical order, repair, enoughness, and noticing what is needed without perfection.",
    tags: ["astrology", "virgo", "sign"],
    riskNotes: ["avoid criticism, cleaning pressure, or perfectionism"],
    safetyNotes: ["capacity should limit any repair impulse"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_libra_shared_balance",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Use Libra for balance, beauty, shared space, fairness, and small adjustments that make relating easier.",
    tags: ["astrology", "libra", "sign"],
    riskNotes: ["avoid fixed relationship-fit claims or forced relationship talk"],
    safetyNotes: ["shared prompts need consent"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_scorpio_private_release",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use Scorpio for privacy, discernment, depth, release, and choosing what no longer deserves attention.",
    tags: ["astrology", "scorpio", "sign"],
    riskNotes: ["avoid crisis, secrecy, or exposure language"],
    safetyNotes: ["depth should stay optional"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_sagittarius_wider_view",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Sagittarius for a wider view, learning, humor, meaning, and one encouraging perspective shift.",
    tags: ["astrology", "sagittarius", "sign"],
    riskNotes: ["avoid forced positivity or escape from practical needs"],
    safetyNotes: ["expansion should stay realistic"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_capricorn_bounded_effort",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Capricorn for bounded effort, structure, realistic commitment, durable action, and protecting time.",
    tags: ["astrology", "capricorn", "sign"],
    riskNotes: ["avoid overwork or moralized discipline"],
    safetyNotes: ["limits should support care"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_aquarius_system_experiment",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use Aquarius for pattern-seeing, systems, friendship, fresh distance, and small reversible experiments.",
    tags: ["astrology", "aquarius", "sign"],
    riskNotes: ["avoid detachment or oddness stereotypes"],
    safetyNotes: ["experiments should be low-risk"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_sign_pisces_soft_release",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Use Pisces for compassion, imagination, rest, porousness, and gentle release without emotional flooding.",
    tags: ["astrology", "pisces", "sign"],
    riskNotes: ["avoid sacrifice, confusion, or overwhelm framing"],
    safetyNotes: ["keep prompts simple"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_aspect_conjunction_joined_focus",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use conjunctions as joined focus or emphasis, not automatic intensity or a demand for action.",
    tags: ["astrology", "conjunction", "aspect"],
    riskNotes: ["avoid urgent or fated emphasis"],
    safetyNotes: ["one focus is enough"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_aspect_opposition_balance_contrast",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use oppositions as contrast, mirroring, and balance, not conflict by default.",
    tags: ["astrology", "opposition", "aspect"],
    riskNotes: ["avoid relationship-crisis language"],
    safetyNotes: ["do not force shared processing"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_aspect_square_useful_adjustment",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use squares as useful friction or adjustment points, not crisis, conflict, or failure.",
    tags: ["astrology", "square", "aspect"],
    riskNotes: ["avoid difficulty predictions"],
    safetyNotes: ["keep the adjustment small"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_aspect_trine_available_support",
    sourceId: "source.steven_forrest",
    paraphrasedNote:
      "Use trines as available support or ease, not a promised outcome or proof that effort is unnecessary.",
    tags: ["astrology", "trine", "aspect"],
    riskNotes: ["avoid guaranteed ease or luck claims"],
    safetyNotes: ["real constraints still matter"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_aspect_sextile_small_opening",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Use sextiles as a cooperative small opening or opportunity that still needs a conscious choice.",
    tags: ["astrology", "sextile", "aspect"],
    riskNotes: ["avoid obligation or success claims"],
    safetyNotes: ["keep opportunities optional"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_mercury_cancer_careful_words",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Mercury plus Cancer can support naming one household need gently, with careful words and no heavy talk.",
    tags: ["astrology", "mercury", "cancer", "combination"],
    riskNotes: ["avoid making family or feeling conversations mandatory"],
    safetyNotes: ["keep communication small and consent-based"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_mercury_virgo_practical_detail",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Mercury plus Virgo can support sorting one practical detail and naming the next useful step without perfectionism.",
    tags: ["astrology", "mercury", "virgo", "combination"],
    riskNotes: ["avoid criticism, over-editing, or cleaning pressure"],
    safetyNotes: ["stop at one useful detail"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_venus_leo_visible_warmth",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Venus plus Leo can support visible warmth, appreciation, beauty, affection, and making care easier to feel.",
    tags: ["astrology", "venus", "leo", "combination"],
    riskNotes: ["avoid performance, attraction, or relationship-control claims"],
    safetyNotes: ["keep warmth optional and practical"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_mars_capricorn_bounded_action",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Mars plus Capricorn can support one bounded practical action, disciplined effort, and stopping before overwork.",
    tags: ["astrology", "mars", "capricorn", "combination"],
    riskNotes: ["avoid grind, pressure, or conflict language"],
    safetyNotes: ["capacity limits the action"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_moon_virgo_useful_tending",
    sourceId: "source.kevin_burk",
    paraphrasedNote:
      "Moon plus Virgo can support small useful tending, repairing one detail, and noticing need without chasing perfection.",
    tags: ["astrology", "moon", "virgo", "combination"],
    riskNotes: ["avoid emotional cleaning pressure or self-criticism"],
    safetyNotes: ["keep tending gentle and finite"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_moon_cancer_home_rhythm",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Moon plus Cancer can support care, containment, kitchen or home rhythm, and gentler pacing without emotional pressure.",
    tags: ["astrology", "moon", "cancer", "combination"],
    riskNotes: ["avoid implying someone must process feelings"],
    safetyNotes: ["care should be concrete and low-pressure"],
  }),
  makeAstrologySourceNote({
    id: "note.astrology_combo_sun_cancer_household_attention",
    sourceId: "source.april_elliott_kent",
    paraphrasedNote:
      "Sun plus Cancer can support home focus, belonging, nourishment, and putting household care at the center briefly.",
    tags: ["astrology", "sun", "cancer", "combination"],
    riskNotes: ["avoid identity or family-duty claims"],
    safetyNotes: ["household attention should stay modest"],
  }),
];

const numerologyNumberNotes: SourceNote[] = [
  {
    id: "note.numerology_calculation_reduced_universal_dates",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology timing synthesis",
    paraphrasedNote:
      "For MVP, universal year, month, and day numbers are reduced to 1-9 and used as public date accents, not personal numerology.",
    category: "numerology_interpretation",
    tags: ["numerology", "calculation", "universal_date"],
    riskNotes: ["avoid master-number claims, life path numbers, names, or compatibility"],
    safetyNotes: ["keep date numerology secondary and non-predictive"],
    copyrightNotes: ["short transformed note only; no copied calculation prose"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_guardrail_accent_only",
    sourceId: "source.barnum_forer_guardrail",
    locationNote: "docs/source-research-synthesis.md numerology guardrails",
    paraphrasedNote:
      "Numerology copy should stay concrete, modest, and tied to the chosen ritual so it does not sound like a vague personal reading.",
    category: "interpretive_safety",
    tags: ["numerology", "guardrail", "accent"],
    riskNotes: ["avoid destiny, personality certainty, prediction, and compatibility language"],
    safetyNotes: ["do not let numerology become the sole reason for a recommendation"],
    copyrightNotes: ["short transformed guardrail only"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_1_beginning_focus",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 1 as a light cue for beginning, focus, initiative, and choosing one first step without promising success.",
    category: "numerology_interpretation",
    tags: ["numerology", "1", "beginning"],
    riskNotes: ["avoid individual pressure or guarantee language"],
    safetyNotes: ["keep action bounded by capacity"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_2_cooperation_balance",
    sourceId: "source.david_phillips_numerology",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 2 as a light cue for cooperation, listening, balance, and gentle pairing without forcing a conversation.",
    category: "numerology_interpretation",
    tags: ["numerology", "2", "cooperation"],
    riskNotes: ["avoid compatibility claims or relationship diagnosis"],
    safetyNotes: ["shared prompts need consent and low pressure"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_3_expression_warmth",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 3 as a light cue for expression, warmth, creative ease, and making a small moment feel more alive.",
    category: "numerology_interpretation",
    tags: ["numerology", "3", "expression"],
    riskNotes: ["avoid forced cheer or performance"],
    safetyNotes: ["keep expression optional and brief"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_4_structure_repair",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 4 as a light cue for structure, steadiness, repair, and making one practical thing easier.",
    category: "numerology_interpretation",
    tags: ["numerology", "4", "structure"],
    riskNotes: ["avoid rigidity or moralizing mess"],
    safetyNotes: ["do not recommend large cleanup by default"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_5_change_freshness",
    sourceId: "source.david_phillips_numerology",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 5 as a light cue for change, freshness, movement, and a small reversible adjustment.",
    category: "numerology_interpretation",
    tags: ["numerology", "5", "change"],
    riskNotes: ["avoid restless disruption or novelty pressure"],
    safetyNotes: ["prefer safe, reversible actions"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_6_home_care",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 6 as a light cue for home care, harmony, repair, and tending what supports the household without assigning duty.",
    category: "numerology_interpretation",
    tags: ["numerology", "6", "home"],
    riskNotes: ["avoid making care sound like obligation"],
    safetyNotes: ["food and shared-care practices stay optional"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_7_reflection_pause",
    sourceId: "source.david_phillips_numerology",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 7 as a light cue for reflection, quiet attention, discernment, and pausing before adding more.",
    category: "numerology_interpretation",
    tags: ["numerology", "7", "reflection"],
    riskNotes: ["avoid isolation claims or spiritual superiority"],
    safetyNotes: ["keep reflection gentle and non-diagnostic"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_8_capacity_power",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 8 as a light cue for capacity, stewardship, practical strength, and using effort responsibly.",
    category: "numerology_interpretation",
    tags: ["numerology", "8", "capacity"],
    riskNotes: ["avoid money, success, or power guarantees"],
    safetyNotes: ["capacity and safety override ambitious framing"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
  {
    id: "note.numerology_9_completion_release",
    sourceId: "source.hans_decoz_tom_monte",
    locationNote: "docs/source-research-synthesis.md numerology 1-9 source batch",
    paraphrasedNote:
      "Use 9 as a light cue for completion, release, compassion, and closing one loop gently.",
    category: "numerology_interpretation",
    tags: ["numerology", "9", "completion"],
    riskNotes: ["avoid fate, endings, or emotional pressure"],
    safetyNotes: ["release prompts should stay gentle"],
    copyrightNotes: ["short transformed note only; no copied number description"],
    verbatimAllowed: false,
  },
];

export const starterSourceNotes: SourceNote[] = [
  {
    id: "note.computed_facts_are_not_meanings",
    sourceId: "source.astronomy_engine",
    locationNote: "docs/source-research-synthesis.md computed timing synthesis",
    paraphrasedNote:
      "Use computed sky facts as inputs. Symbolic meaning should come from reviewed cards, not from the timing library itself.",
    category: "computed_timing",
    tags: ["timing", "separation_of_concerns"],
    riskNotes: [
      "avoid turning a computed fact into a deterministic interpretation",
    ],
    safetyNotes: [],
    copyrightNotes: [
      "repository note is transformed product guidance, not copied library text",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.four_phase_moon_mvp",
    sourceId: "source.sarah_faith_gottesdiener",
    locationNote: "docs/source-research-synthesis.md moon phase MVP recommendation",
    paraphrasedNote:
      "Start with four moon phase meanings so the weekly brief stays calm and readable before adding finer lunar nuance.",
    category: "moon_phase_symbolism",
    tags: ["moon", "mvp", "low_overwhelm"],
    riskNotes: [
      "avoid manifestation guarantees or urgency language",
    ],
    safetyNotes: [
      "emotional intensity should stay low unless explicitly chosen",
    ],
    copyrightNotes: [
      "short transformed note only; no source prompt text",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.new_moon_quiet_reset",
    sourceId: "source.sarah_faith_gottesdiener",
    locationNote: "docs/source-research-synthesis.md Batch 5 four lunar phase card batch",
    paraphrasedNote:
      "Treat new moon timing as a quiet reset for one modest intention, not as pressure to reinvent the household.",
    category: "moon_phase_symbolism",
    tags: ["moon", "new_moon", "intention", "reset"],
    riskNotes: [
      "avoid manifestation guarantees and urgent fresh-start language",
    ],
    safetyNotes: [
      "keep prompts optional and emotionally light",
    ],
    copyrightNotes: [
      "short transformed note only; no copied prompt or ritual language",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.waxing_moon_steady_support",
    sourceId: "source.rachel_patterson_moon",
    locationNote: "docs/source-research-synthesis.md Batch 5 four lunar phase card batch",
    paraphrasedNote:
      "Use waxing moon timing for steady tending and support of what already exists, not productivity pressure.",
    category: "moon_phase_symbolism",
    tags: ["moon", "waxing_moon", "tending", "support"],
    riskNotes: [
      "avoid implying that growth must be constant",
    ],
    safetyNotes: [
      "plant, kitchen, and candle actions still need ordinary household safety",
    ],
    copyrightNotes: [
      "short transformed note only; no copied spell or correspondence text",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.full_moon_visibility_without_fear",
    sourceId: "source.sarah_faith_gottesdiener",
    locationNote: "docs/source-research-synthesis.md Batch 5 four lunar phase card batch",
    paraphrasedNote:
      "Frame full moon visibility as noticing clarity, completion, or gratitude without fear, exposure, or intensity claims.",
    category: "moon_phase_symbolism",
    tags: ["moon", "full_moon", "visibility", "gratitude"],
    riskNotes: [
      "avoid fear-based full moon language and deterministic emotion claims",
    ],
    safetyNotes: [
      "keep reflection optional; offer fire-free options when the household feels busy",
    ],
    copyrightNotes: [
      "short transformed note only; no copied reflective prompt language",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.waning_moon_clear_and_rest",
    sourceId: "source.rachel_patterson_moon",
    locationNote: "docs/source-research-synthesis.md Batch 5 four lunar phase card batch",
    paraphrasedNote:
      "Use waning moon timing for small clearing, integration, and rest without making release feel mandatory.",
    category: "moon_phase_symbolism",
    tags: ["moon", "waning_moon", "clearing", "rest"],
    riskNotes: [
      "avoid emotional pressure, smoke defaults, and large cleanup framing",
    ],
    safetyNotes: [
      "clearing actions should stay physically light and low-scent by default",
    ],
    copyrightNotes: [
      "short transformed note only; no copied spell or ritual instructions",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.lunar_cards_stay_invitational",
    sourceId: "source.rachel_patterson_moon",
    locationNote: "docs/source-research-synthesis.md lunar and domestic moon source family",
    paraphrasedNote:
      "Lunar cards can suggest small domestic actions, but the phase should never make the action feel required or result-driven.",
    category: "moon_phase_symbolism",
    tags: ["moon", "domestic", "tone"],
    riskNotes: [
      "avoid spell-result framing, urgency, or copied ritual instructions",
    ],
    safetyNotes: [
      "default actions should avoid smoke, oils, and special supplies; candle actions need ordinary flame safety",
    ],
    copyrightNotes: [
      "short transformed note only; no ritual or source wording",
    ],
    verbatimAllowed: false,
  },
  ...numerologyNumberNotes,
  {
    id: "note.astrology_symbolic_not_predictive",
    sourceId: "source.steven_forrest",
    locationNote: "docs/source-research-synthesis.md astrology interpretation synthesis",
    paraphrasedNote:
      "Use astrology as symbolic timing grammar for reflection and ritual fit, not as prediction, fate, diagnosis, or certainty.",
    category: "astrology_interpretation",
    tags: ["astrology", "symbolic", "guardrail"],
    riskNotes: [
      "avoid deterministic claims and horoscope-feed framing",
    ],
    safetyNotes: [
      "do not use astrology for health, danger, finance, or relationship advice",
    ],
    copyrightNotes: [
      "short transformed note only; no copied delineation",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.astrology_planets_as_functions",
    sourceId: "source.kevin_burk",
    locationNote: "docs/source-research-synthesis.md Batch 8 astrology accent layer",
    paraphrasedNote:
      "Treat planets as symbolic functions, such as attention, care, action, learning, or limits, that can color a household ritual.",
    category: "astrology_interpretation",
    tags: ["astrology", "planets", "timing"],
    riskNotes: [
      "avoid saying a planet causes events or describes a person completely",
    ],
    safetyNotes: [
      "keep planetary signals secondary to capacity, schedule, and safety",
    ],
    copyrightNotes: [
      "short transformed note only; no copied planet descriptions",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.astrology_signs_as_styles",
    sourceId: "source.kevin_burk",
    locationNote: "docs/source-research-synthesis.md Batch 8 astrology accent layer",
    paraphrasedNote:
      "Use signs as symbolic styles or textures for action, never as fixed identity labels or personal judgments.",
    category: "astrology_interpretation",
    tags: ["astrology", "zodiac", "tone"],
    riskNotes: [
      "avoid personality certainty and fixed relationship-fit language",
    ],
    safetyNotes: [
      "do not expose private chart material or personal labels in brief copy",
    ],
    copyrightNotes: [
      "short transformed note only; no copied sign delineations",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.astrology_aspects_as_relationships",
    sourceId: "source.steven_forrest",
    locationNote: "docs/source-research-synthesis.md Batch 8 astrology accent layer",
    paraphrasedNote:
      "Treat aspects as symbolic relationships between timing factors, such as blend, friction, support, or opportunity.",
    category: "astrology_interpretation",
    tags: ["astrology", "aspects", "timing"],
    riskNotes: [
      "avoid claiming aspects produce conflict, ease, success, or failure",
    ],
    safetyNotes: [
      "aspect signals should remain optional context, not urgent instruction",
    ],
    copyrightNotes: [
      "short transformed note only; no copied aspect delineations",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.astrology_retrograde_slow_review",
    sourceId: "source.april_elliott_kent",
    locationNote: "docs/source-research-synthesis.md astrology interpretation synthesis",
    paraphrasedNote:
      "Use retrograde periods conservatively as review or slowing-down cues, not as blame, disruption, or warning language.",
    category: "astrology_interpretation",
    tags: ["astrology", "retrograde", "review"],
    riskNotes: [
      "avoid fear-based Mercury retrograde jokes and deterministic disruption claims",
    ],
    safetyNotes: [
      "do not use retrograde signals to discourage necessary action",
    ],
    copyrightNotes: [
      "short transformed note only; no copied transit text",
    ],
    verbatimAllowed: false,
  },
  ...strengthenedAstrologySourceNotes,
  ...seasonalSourceNotes,
  {
    id: "note.astrology_ethics_no_personal_certainty",
    sourceId: "source.astrology_ethics_sources",
    locationNote: "docs/source-research-synthesis.md astrology ethics source family",
    paraphrasedNote:
      "Astrology copy should stay consent-aware, nonjudgmental, and humble about what a timing signal can support.",
    category: "astrology_ethics",
    tags: ["astrology", "ethics", "tone"],
    riskNotes: [
      "avoid exposed private-profile language, fate claims, and advice beyond ritual fit",
    ],
    safetyNotes: [
      "capacity, consent, privacy, and safety override symbolic interpretation",
    ],
    copyrightNotes: [
      "short transformed ethics summary only; no copied policy text",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.barnum_forer_specificity_guardrail",
    sourceId: "source.barnum_forer_guardrail",
    locationNote: "docs/source-research-synthesis.md astrology and numerology guardrails",
    paraphrasedNote:
      "Keep interpretations tied to selected facts and concrete ritual choices so they do not sound vaguely personal or manipulative.",
    category: "interpretive_safety",
    tags: ["guardrail", "specificity", "qa"],
    riskNotes: [
      "avoid flattering, ominous, or broadly applicable claims that feel artificially personal",
    ],
    safetyNotes: [
      "prefer concrete household language over sweeping self-description",
    ],
    copyrightNotes: [
      "short transformed quality guardrail only",
    ],
    verbatimAllowed: false,
  },
  {
    id: "note.home_tending_small_enough",
    sourceId: "source.cheryl_mendelson",
    locationNote: "docs/source-research-synthesis.md home-tending MVP depth",
    paraphrasedNote:
      "Useful home care should be scaled to one bounded action so order supports living instead of becoming a standard to perform.",
    category: "home_tending",
    tags: ["home", "capacity", "bounded_action"],
    riskNotes: ["avoid moralizing housekeeping or implying failure"],
    safetyNotes: ["keep cleaning actions light and finite"],
    copyrightNotes: ["short transformed note only; no copied housekeeping prose"],
    verbatimAllowed: false,
  },
  {
    id: "note.home_tending_attention_care",
    sourceId: "source.shoukei_matsumoto",
    locationNote: "docs/source-research-synthesis.md home-tending MVP depth",
    paraphrasedNote:
      "A small cleaning action can become attention and care when it is finite, embodied, and not framed as purity or discipline.",
    category: "home_tending",
    tags: ["home", "attention", "care"],
    riskNotes: ["avoid importing devotional or purity framing"],
    safetyNotes: ["do not turn care into duty"],
    copyrightNotes: ["short transformed note only; no copied practice text"],
    verbatimAllowed: false,
  },
  {
    id: "note.home_threshold_as_transition",
    sourceId: "source.arin_murphy_hiscock",
    locationNote: "docs/source-research-synthesis.md home-tending MVP depth",
    paraphrasedNote:
      "Thresholds work well as practical transition cues when the action stays physical, simple, and free of danger-protection claims.",
    category: "home_tending",
    tags: ["home", "threshold", "transition"],
    riskNotes: ["avoid protection-from-danger and curse-breaking language"],
    safetyNotes: ["doorways and paths must remain clear"],
    copyrightNotes: ["short transformed note only; no copied spell language"],
    verbatimAllowed: false,
  },
  {
    id: "note.home_atmosphere_without_overclaim",
    sourceId: "source.tess_whitehurst",
    locationNote: "docs/source-research-synthesis.md home-magic MVP depth",
    paraphrasedNote:
      "Home atmosphere work is safest when framed as a small blessing or sensory cue, not as control, protection from danger, or guaranteed change.",
    category: "home_magic",
    tags: ["home", "atmosphere", "blessing"],
    riskNotes: ["avoid curse, danger, and outcome claims"],
    safetyNotes: ["symbolic atmosphere work still follows smoke, scent, flame, and allergy guardrails"],
    copyrightNotes: ["short transformed note only; no copied ritual or blessing text"],
    verbatimAllowed: false,
  },
  {
    id: "note.kitchen_magic_normal_use",
    sourceId: "source.laurel_woodward",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Kitchen magic should use ordinary foods and drinks already known to fit the household, with symbolism secondary to normal safe use.",
    category: "kitchen_magic",
    tags: ["kitchen", "food", "normal_use"],
    riskNotes: ["avoid recipes, medicinal claims, or unfamiliar ingredients"],
    safetyNotes: ["normal household food use only"],
    copyrightNotes: ["short transformed note only; no copied recipe or ritual text"],
    verbatimAllowed: false,
  },
  {
    id: "note.ingredient_symbolism_cross_check",
    sourceId: "source.scott_cunningham_cross_check",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Common ingredient correspondences can cross-check symbolism, but they should not override food, allergy, pet, or household safety.",
    category: "kitchen_plant_magic",
    tags: ["ingredient", "cross_check", "safety"],
    riskNotes: ["avoid correspondence certainty or medicinal claims"],
    safetyNotes: ["safety references override ingredient symbolism"],
    copyrightNotes: ["short transformed note only; no copied correspondence lists"],
    verbatimAllowed: false,
  },
  {
    id: "note.plant_tending_check_first",
    sourceId: "source.arin_murphy_hiscock",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Plant tending is strongest when the first step is observation: check soil, leaves, light, and pet access before acting.",
    category: "plant_magic",
    tags: ["plant", "observation", "care"],
    riskNotes: ["avoid treating plant care as a symbolic substitute for actual care"],
    safetyNotes: ["pet and child access require review"],
    copyrightNotes: ["short transformed note only; no copied plant ritual text"],
    verbatimAllowed: false,
  },
  {
    id: "note.light_focus_optional_flame",
    sourceId: "source.nfpa_fire_safety",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Light practices should work with daylight, lamp light, or an optional supervised candle; live flame is never required.",
    category: "ritual_safety",
    tags: ["light", "candle", "fire"],
    riskNotes: ["avoid making live flame mandatory"],
    safetyNotes: ["declare flame risk when candle flame is used"],
    copyrightNotes: ["short transformed safety note only; no copied safety passage"],
    verbatimAllowed: false,
  },
  {
    id: "note.air_reset_without_smoke",
    sourceId: "source.epa_household_air",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "A freshness reset can use open air or a window cue without smoke, fragrance, oils, or claims about cleansing the air.",
    category: "ritual_safety",
    tags: ["air", "window", "no_smoke"],
    riskNotes: ["avoid smoke and fragrance defaults"],
    safetyNotes: ["only open windows when weather, air quality, and household safety fit"],
    copyrightNotes: ["short transformed safety note only; no copied safety passage"],
    verbatimAllowed: false,
  },
  {
    id: "note.food_herb_safety_override",
    sourceId: "source.fda_food_safety",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Food and herb symbolism must remain ordinary household use, with no health claims, supplements, essential oils, or unfamiliar ingredients.",
    category: "ritual_safety",
    tags: ["food", "herb", "safety"],
    riskNotes: ["avoid herbal medicine and essential oil ingestion"],
    safetyNotes: ["food safety and allergies override symbolism"],
    copyrightNotes: ["short transformed safety note only; no copied safety passage"],
    verbatimAllowed: false,
  },
  {
    id: "note.pet_plant_access_review",
    sourceId: "source.aspca_plant_safety",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Plant and herb rituals need pet-access review before suggesting touching, pruning, moving, or leaving plant material out.",
    category: "ritual_safety",
    tags: ["plant", "pet", "safety"],
    riskNotes: ["avoid casual pet-access assumptions"],
    safetyNotes: ["keep plant material away from pets unless reviewed safe"],
    copyrightNotes: ["short transformed safety note only; no copied safety passage"],
    verbatimAllowed: false,
  },
  {
    id: "note.poison_control_essential_oil_block",
    sourceId: "source.poison_control",
    locationNote: "docs/source-research-synthesis.md kitchen plant light MVP depth",
    paraphrasedNote:
      "Essential oils and household substances should never be ingested or casually added to food, drink, plant, or cleaning rituals.",
    category: "ritual_safety",
    tags: ["poison", "essential_oils", "safety"],
    riskNotes: ["avoid ingestion or internal-use language"],
    safetyNotes: ["essential oil ingestion is blocked"],
    copyrightNotes: ["short transformed safety note only; no copied safety passage"],
    verbatimAllowed: false,
  },
  {
    id: "note.safety_overrides_symbolism",
    sourceId: "source.safety_reference_families",
    locationNote: "docs/source-research-synthesis.md safety source families",
    paraphrasedNote:
      "Food, fire, pets, smoke, plants, and health-related risks should block or reshape a ritual before symbolic correspondences are considered.",
    category: "ritual_safety",
    tags: ["safety", "guardrail", "home"],
    riskNotes: [
      "do not offer medical, pregnancy, fertility, legal, financial, or physical safety advice",
    ],
    safetyNotes: [
      "safety references need direct review for specific claims",
    ],
    copyrightNotes: [
      "summary is product guidance, not copied reference text",
    ],
    verbatimAllowed: false,
  },
];

function hasRequiredString(value: string): boolean {
  return value.trim().length > 0;
}

function containsForbiddenPrivateTerm(value: string): boolean {
  const lowerValue = value.toLowerCase();

  return FORBIDDEN_PRIVATE_TERMS.some((term) => lowerValue.includes(term));
}

export function validateSourceReview(
  review: SourceReview,
): SourceValidationResult {
  const errors: string[] = [];

  if (!hasRequiredString(review.id)) {
    errors.push("source review id is required");
  }

  if (!hasRequiredString(review.title)) {
    errors.push(`${review.id}: source review title is required`);
  }

  if (!SOURCE_USE_DECISIONS.includes(review.useDecision)) {
    errors.push(`${review.id}: use decision is not supported`);
  }

  if (!SOURCE_REVIEW_STATUSES.includes(review.reviewStatus)) {
    errors.push(`${review.id}: review status is not supported`);
  }

  if (!SOURCE_TYPES.includes(review.sourceType)) {
    errors.push(`${review.id}: source type is not supported`);
  }

  if (containsForbiddenPrivateTerm(JSON.stringify(review))) {
    errors.push(`${review.id}: source review contains private-data language`);
  }

  return { valid: errors.length === 0, errors };
}

export function validateSourceNote(
  note: SourceNote,
  sourceReviews: SourceReview[] = starterSourceReviews,
): SourceValidationResult {
  const errors: string[] = [];
  const sourceIds = new Set(sourceReviews.map((review) => review.id));

  if (!hasRequiredString(note.id)) {
    errors.push("source note id is required");
  }

  if (!sourceIds.has(note.sourceId)) {
    errors.push(`${note.id}: source id does not match a reviewed source`);
  }

  if (!hasRequiredString(note.locationNote)) {
    errors.push(`${note.id}: location note is required`);
  }

  if (!hasRequiredString(note.paraphrasedNote)) {
    errors.push(`${note.id}: paraphrased note is required`);
  }

  if (note.paraphrasedNote.length > MAX_PARAPHRASED_NOTE_LENGTH) {
    errors.push(`${note.id}: paraphrased note is too long`);
  }

  if (LONG_QUOTE_PATTERN.test(note.paraphrasedNote)) {
    errors.push(`${note.id}: paraphrased note appears to include a long quote`);
  }

  if (note.verbatimAllowed !== false) {
    errors.push(`${note.id}: verbatimAllowed must be false`);
  }

  if (containsForbiddenPrivateTerm(JSON.stringify(note))) {
    errors.push(`${note.id}: source note contains private-data language`);
  }

  return { valid: errors.length === 0, errors };
}

export function getApprovedSourceReviews(
  sourceReviews: SourceReview[] = starterSourceReviews,
): SourceReview[] {
  return sourceReviews.filter((review) => review.reviewStatus === "approved");
}
