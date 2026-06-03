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
      "avoid personality certainty and compatibility language",
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
