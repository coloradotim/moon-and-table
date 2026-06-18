export const RITUAL_STATUSES = [
  "pilot",
  "draft",
  "reviewed",
  "recommendable",
] as const;

export type RitualStatus = (typeof RITUAL_STATUSES)[number];

export const RITUAL_PURPOSES = [
  "steadying",
  "opening",
  "releasing",
  "tending",
  "connecting",
  "voicing",
  "marking",
  "blessing",
  "protecting",
  "remembering",
] as const;

export type RitualPurpose = (typeof RITUAL_PURPOSES)[number];

export const RITUAL_CARRIERS = [
  "candlelight",
  "table",
  "doorway",
  "plant",
  "words",
  "vessel",
  "body",
] as const;

export type RitualCarrier = (typeof RITUAL_CARRIERS)[number];

export const RITUAL_CAPACITY_MODES = [
  "barely_any",
  "only_a_little",
  "enough_to_participate",
  "room_for_something_deeper",
] as const;

export type RitualCapacityMode = (typeof RITUAL_CAPACITY_MODES)[number];

export const RITUAL_AUDIENCES = ["me", "both_of_us"] as const;

export type RitualAudience = (typeof RITUAL_AUDIENCES)[number];

export const RITUAL_TIMING_RELATIONSHIPS = [
  "required",
  "preferred",
  "helpful",
  "none",
] as const;

export type RitualTimingRelationship =
  (typeof RITUAL_TIMING_RELATIONSHIPS)[number];

export type RitualSourceGrounding = {
  citationLabel: string;
  sourceLocation: string;
  sourceSummary: string;
  sourceSupports: string;
  moonAndTableChanges: string;
  doNotImport: string[];
};

export type SourceRitualOrigin = {
  type: "source";
  sourceGrounding: RitualSourceGrounding[];
};

export type HouseholdRitualOrigin = {
  type: "household";
  contributedBy?: "Tim" | "Jessica" | "Both";
  householdContext: string;
};

export type RitualOrigin = SourceRitualOrigin | HouseholdRitualOrigin;

export type RitualPresentation = {
  headline: string;
  practice: string;
  intention: string;
  bestWindow: string;
  /**
   * Legacy/fallback compatibility field. Choose with me generates user-facing
   * "why this fits" text per recommendation result after selection.
   */
  whyThisFits: string;
  questionToCarry: string;
};

export const RITUAL_CANONICAL_BODY_FIELD_KEYS = [
  "headline",
  "practice",
  "intention",
  "bestWindow",
  "questionToCarry",
] as const;

export type RitualCanonicalBodyFieldKey =
  (typeof RITUAL_CANONICAL_BODY_FIELD_KEYS)[number];

export type RitualCanonicalBody = Pick<
  RitualPresentation,
  RitualCanonicalBodyFieldKey
>;

export const RITUAL_WORD_MODES = [
  "source_exact_short",
  "adapted_source_words",
] as const;

export type RitualWordMode = (typeof RITUAL_WORD_MODES)[number];

export const RITUAL_WORD_USE_CONTEXTS = [
  "spoken",
  "written",
  "chanted",
  "prayer",
  "blessing",
  "incantation",
  "invocation",
  "petition",
  "closing",
  "question",
  "vow",
  "song",
  "other",
] as const;

export type RitualWordUseContext =
  (typeof RITUAL_WORD_USE_CONTEXTS)[number];

export type RitualWords = {
  mode: RitualWordMode;
  text?: string;
  citationLabel?: string;
  sourceLocation?: string;
  useContext: RitualWordUseContext;
  note?: string;
};

export type RitualReviewFlags = {
  sourceTextReviewRequired?: boolean;
  materialSafetyReviewRequired?: boolean;
  sourceVerificationRequired?: boolean;
  productBoundaryReviewRequired?: boolean;
  notes?: string[];
};

export type RitualRecommendationMetadata = {
  purposes: {
    primary: RitualPurpose;
    secondary: RitualPurpose[];
    refinement: string;
  };
  carriers: {
    primary: RitualCarrier;
    secondary: RitualCarrier[];
  };
  capacity: {
    supports: RitualCapacityMode[];
    default?: RitualCapacityMode;
  };
  audience: {
    supports: RitualAudience[];
    default?: RitualAudience;
    bothOfUsStructure?: string;
  };
  timing: {
    relationship: RitualTimingRelationship;
    contexts?: string[];
  };
  eligibility: {
    recommendable: boolean;
    missing?: string[];
    notFor?: string[];
  };
};

export type RitualSearchMetadata = {
  tags: string[];
  keywords: string[];
  materials?: string[];
  places?: string[];
  sourceLabel?: string;
  originLabel?: string;
};

export type RitualAvailability = {
  findable: boolean;
  directUseEligible: boolean;
  recommendationEligible: boolean;
};

export type RitualAdaptationPolicy = {
  purposeChange: "not_allowed";
  materialSubstitution?: "none" | "defined_only" | "authored_only";
  capacityAdaptation?: "not_allowed" | "allowed_if_authored";
  audienceAdaptation?: "not_allowed" | "allowed_if_authored";
  timingAdaptation?:
    | "none"
    | "may_shape_best_window"
    | "may_shape_why_this_fits";
};

export type Ritual = {
  id: string;
  status: RitualStatus;
  origin: RitualOrigin;
  presentation: RitualPresentation;
  recommendationMetadata: RitualRecommendationMetadata;
  searchMetadata: RitualSearchMetadata;
  availability: RitualAvailability;
  ritualWords?: RitualWords[];
  reviewFlags?: RitualReviewFlags;
  adaptationPolicy?: RitualAdaptationPolicy;
};
