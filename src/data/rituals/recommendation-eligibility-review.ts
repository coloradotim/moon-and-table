import type {
  Ritual,
  RitualAudience,
  RitualCarrier,
  RitualCapacityMode,
  RitualPurpose,
  RitualTimingRelationship,
} from "./types";

type RecommendationMetadataUpdate = {
  purposes?: {
    primary?: RitualPurpose;
    secondary?: RitualPurpose[];
    refinement?: string;
  };
  carriers?: {
    primary?: RitualCarrier;
    secondary?: RitualCarrier[];
  };
  capacity?: {
    supports?: RitualCapacityMode[];
    default?: RitualCapacityMode;
  };
  audience?: {
    supports?: RitualAudience[];
    default?: RitualAudience;
    bothOfUsStructure?: string;
  };
  timing?: {
    relationship?: RitualTimingRelationship;
    contexts?: string[];
  };
};

const RECOMMENDATION_HOLDS: Record<string, string[]> = {
  "ritual-candlelight-buckland-marking-seven-night-increase": [
    "full_moon_lead_time_not_supported",
  ],

  "candidate.saint_thomas.grimoire_record_after_rite": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.first_date_threshold_blessing": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.long_distance_calendar_light": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.three_month_marker": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.moving_in_room_blessing": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.former_lover_release": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.friendship_benefits_vessel": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.breakup_boldness_mirror": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.unsent_contact_boundary": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.saint_thomas.bed_linen_reset": [
    "too_context_specific_for_recommendation",
  ],

  "candidate.anand.practice_night_commitment": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.anand.read_the_steps_together": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.anand.afterglow_grimoire": [
    "too_context_specific_for_recommendation",
  ],
  "candidate.anand.keep_symbol_warm": [
    "too_context_specific_for_recommendation",
  ],

  "candidate.dominguez.glyph-as-mark": [
    "planetary_day_or_hour_not_supported",
  ],
  "candidate.dominguez.planetary-card-attunement": [
    "planetary_day_or_hour_not_supported",
  ],
  "candidate.dominguez.seven-day-planetary-cycle": [
    "planetary_day_or_hour_not_supported",
  ],
  "candidate.dominguez.planetary-hour-support": [
    "planetary_day_or_hour_not_supported",
  ],
  "candidate.dominguez.void-moon-softening": ["void_moon_not_supported"],
  "candidate.dominguez.aspect-before-peak": [
    "applying_aspect_timing_not_supported",
  ],
  "candidate.dominguez.planetary-representation": [
    "planetary_day_or_hour_not_supported",
  ],
};

const ENGINE_UNSUPPORTED_REQUIRED_TIMING = new Set([
  "ritual-candlelight-buckland-releasing-habit-surrounded",
  "ritual-candlelight-buckland-tending-home-settling",
  "ritual-candlelight-buckland-protecting-boundary-circle",
  "ritual-candlelight-buckland-remembering-photo-peace-light",
  "ritual-buckland-candle-courage-circle",
  "ritual-buckland-candle-welcome-joy",
  "ritual-buckland-candle-dream-door",
  "ritual-house-witch-bank-the-inner-flame",
  "ritual-house-witch-kitchen-sacred-flame",
  "ritual-house-witch-consecrate-candle-fuel",
  "ritual-house-witch-cauldron-blessing",
  "ritual-house-witch-create-small-sacred-space",
  "ritual-house-witch-household-grimoire-entry",
  "ritual-magical-household-center-house-mind",
  "ritual-magical-household-working-rug",
  "ritual-magical-household-leave-old-rooms-clear",
  "ritual-magical-household-altar-place",
  "ritual-green-garden-welcome-new-plant",
  "ritual-green-garden-harvest-gratitude",
  "whitehurst-ask-before-gathering",
  "whitehurst-small-offering",
  "whitehurst-return-flower-earth",
  "whitehurst-tend-flower-intention",
  "ritual-woodward-center-at-counter",
  "ritual-woodward-kitchen-table-intention",
  "ritual-woodward-clear-table-closing",
  "ritual-woodward-repeated-recipe-memory",
]);

const RECOMMENDATION_METADATA_UPDATES: Record<
  string,
  RecommendationMetadataUpdate
> = {
  "ritual-buckland-candle-prepare-table": {
    carriers: {
      primary: "table",
      secondary: ["candlelight", "words"],
    },
  },
  "ritual-buckland-candle-dream-door": {
    purposes: {
      primary: "opening",
      secondary: ["remembering", "steadying"],
      refinement: "dream opening",
    },
  },
  "ritual-house-witch-spiritual-hearth-recognition": {
    purposes: {
      primary: "marking",
      secondary: ["opening", "tending"],
      refinement: "recognizing the home's center",
    },
  },
  "ritual-house-witch-cauldron-harmony": {
    purposes: {
      primary: "steadying",
      secondary: ["connecting", "tending"],
      refinement: "holding household harmony",
    },
  },
  "ritual-magical-household-working-rug": {
    carriers: {
      primary: "table",
      secondary: ["body", "words"],
    },
  },
  "ritual-magical-household-green-living-room": {
    purposes: {
      primary: "tending",
      secondary: ["steadying", "blessing"],
      refinement: "tending the room through a living plant",
    },
  },
  "whitehurst-bowl-of-petals": {
    purposes: {
      primary: "blessing",
      secondary: ["marking", "steadying"],
      refinement: "letting a bowl hold the flower's quality",
    },
  },
  "whitehurst-hydrangea-boundary-bowl": {
    carriers: {
      primary: "vessel",
      secondary: ["plant", "words"],
    },
    purposes: {
      primary: "protecting",
      secondary: ["steadying", "tending"],
      refinement: "letting hydrangea help a boundary hold",
    },
  },
  "whitehurst-water-lily-still-bowl": {
    purposes: {
      primary: "steadying",
      secondary: ["releasing", "tending"],
      refinement: "cooling the moment",
    },
  },
  "ritual-woodward-candle-beside-bowl": {
    carriers: {
      primary: "candlelight",
      secondary: ["vessel", "table", "words"],
    },
  },
  "candidate.saint_thomas.private_object_consecration": {
    carriers: {
      primary: "vessel",
      secondary: ["body", "words"],
    },
    purposes: {
      primary: "blessing",
      secondary: ["marking", "protecting"],
      refinement: "blessing a private object before use",
    },
  },
  "candidate.saint_thomas.paired_candle_repair": {
    purposes: {
      primary: "tending",
      secondary: ["connecting", "voicing"],
      refinement: "small repair after rupture",
    },
  },
  "candidate.saint_thomas.clear_communication_goblet": {
    purposes: {
      primary: "voicing",
      secondary: ["steadying", "connecting"],
      refinement: "letting water hold the sentence first",
    },
  },
  "candidate.saint_thomas.home_after_intimacy_reset": {
    purposes: {
      primary: "steadying",
      secondary: ["releasing", "tending"],
      refinement: "returning after intensity",
    },
  },
  "candidate.anand.melting_hug": {
    purposes: {
      primary: "steadying",
      secondary: ["connecting", "blessing"],
      refinement: "settling back together",
    },
  },
  "candidate.anand.prepare_candlelit_room": {
    purposes: {
      primary: "opening",
      secondary: ["connecting", "marking"],
      refinement: "preparing a shared candlelit room",
    },
  },
  "candidate.anand.water_between_us": {
    purposes: {
      primary: "steadying",
      secondary: ["connecting", "marking"],
      refinement: "placing water between you",
    },
  },
  "candidate.dominguez.seven-day-planetary-cycle": {
    capacity: {
      supports: ["room_for_something_deeper"],
      default: "room_for_something_deeper",
    },
  },
  "candidate.moon_book.dark_moon_void_table": {
    timing: {
      contexts: ["new moon", "dark moon", "balsamic moon", "pre-new moon"],
    },
  },
  "candidate.moon_book.cycle_close_and_begin_again": {
    timing: {
      contexts: ["new moon", "dark moon", "end of lunation", "before new moon"],
    },
  },
  "candidate.dominguez.astrology-journal-timing-record": {
    timing: {
      contexts: [
        "moon phase",
        "moon sign",
        "planetary aspect",
        "retrograde planet",
        "calendar threshold",
      ],
    },
  },
  "candidate.dominguez.change-details-not-date": {
    timing: {
      contexts: [
        "moon sign",
        "planetary aspect",
        "retrograde planet",
        "imperfect timing",
      ],
    },
  },
  "candidate.dominguez.conditions-as-outline": {
    timing: {
      contexts: [
        "moon phase",
        "moon sign",
        "planetary aspect",
        "retrograde planet",
        "calendar threshold",
      ],
    },
  },
};

function getReviewedTimingMetadata(ritual: Ritual): Ritual["recommendationMetadata"]["timing"] {
  const baseTiming = ritual.recommendationMetadata.timing;
  const contexts =
    baseTiming.contexts && baseTiming.contexts.length > 0
      ? baseTiming.contexts
      : [ritual.presentation.bestWindow];
  const relationship =
    baseTiming.relationship === "required" &&
    ENGINE_UNSUPPORTED_REQUIRED_TIMING.has(ritual.id)
      ? "helpful"
      : baseTiming.relationship;

  return {
    ...baseTiming,
    relationship,
    contexts,
  };
}

function applyMetadataUpdate(
  ritual: Ritual,
  update: RecommendationMetadataUpdate | undefined,
): Ritual {
  const reviewedTiming = getReviewedTimingMetadata(ritual);

  if (!update) {
    return {
      ...ritual,
      recommendationMetadata: {
        ...ritual.recommendationMetadata,
        timing: reviewedTiming,
      },
    };
  }

  return {
    ...ritual,
    recommendationMetadata: {
      ...ritual.recommendationMetadata,
      purposes: {
        ...ritual.recommendationMetadata.purposes,
        ...update.purposes,
      },
      carriers: {
        ...ritual.recommendationMetadata.carriers,
        ...update.carriers,
      },
      capacity: {
        ...ritual.recommendationMetadata.capacity,
        ...update.capacity,
      },
      audience: {
        ...ritual.recommendationMetadata.audience,
        ...update.audience,
      },
      timing: {
        ...reviewedTiming,
        ...update.timing,
      },
    },
  };
}

function markRecommendationEligible(ritual: Ritual): Ritual {
  return {
    ...ritual,
    status: "recommendable",
    availability: {
      ...ritual.availability,
      findable: true,
      directUseEligible: true,
      recommendationEligible: true,
    },
    recommendationMetadata: {
      ...ritual.recommendationMetadata,
      eligibility: {
        recommendable: true,
        missing: [],
      },
    },
  };
}

function keepDirectUseOnly(ritual: Ritual, missing: string[]): Ritual {
  return {
    ...ritual,
    status: "reviewed",
    availability: {
      ...ritual.availability,
      findable: true,
      directUseEligible: true,
      recommendationEligible: false,
    },
    recommendationMetadata: {
      ...ritual.recommendationMetadata,
      eligibility: {
        recommendable: false,
        missing,
      },
    },
  };
}

export function applySourceBackedRecommendationEligibilityReview(
  rituals: Ritual[],
): Ritual[] {
  return rituals.map((ritual) => {
    const reviewed = applyMetadataUpdate(
      ritual,
      RECOMMENDATION_METADATA_UPDATES[ritual.id],
    );
    const holdReasons = RECOMMENDATION_HOLDS[ritual.id];

    if (!reviewed.availability.directUseEligible) {
      return reviewed;
    }

    if (holdReasons) {
      return keepDirectUseOnly(reviewed, holdReasons);
    }

    return markRecommendationEligible(reviewed);
  });
}
