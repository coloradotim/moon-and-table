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
    "timing_engine_wiring",
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

  "candidate.moon_book.lunation_map_one_desire": ["timing_engine_wiring"],
  "candidate.moon_book.new_moon_table_seed": ["timing_engine_wiring"],
  "candidate.moon_book.waxing_one_thread": ["timing_engine_wiring"],
  "candidate.moon_book.full_moon_mirror": ["timing_engine_wiring"],
  "candidate.moon_book.full_moon_table_witness": ["timing_engine_wiring"],
  "candidate.moon_book.waning_release_one_extra": ["timing_engine_wiring"],
  "candidate.moon_book.dark_moon_void_table": ["timing_engine_wiring"],
  "candidate.moon_book.cycle_close_and_begin_again": ["timing_engine_wiring"],

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

  "candidate.dominguez.astrology-journal-timing-record": [
    "timing_engine_wiring",
  ],
  "candidate.dominguez.glyph-as-mark": ["timing_engine_wiring"],
  "candidate.dominguez.planetary-card-attunement": ["timing_engine_wiring"],
  "candidate.dominguez.seven-day-planetary-cycle": [
    "timing_engine_wiring",
  ],
  "candidate.dominguez.planetary-hour-support": ["timing_engine_wiring"],
  "candidate.dominguez.moon-phase-timing-check": ["timing_engine_wiring"],
  "candidate.dominguez.moon-sign-tone": ["timing_engine_wiring"],
  "candidate.dominguez.void-moon-softening": ["timing_engine_wiring"],
  "candidate.dominguez.aspect-before-peak": ["timing_engine_wiring"],
  "candidate.dominguez.retrograde-foundation": ["timing_engine_wiring"],
  "candidate.dominguez.change-details-not-date": ["timing_engine_wiring"],
  "candidate.dominguez.conditions-as-outline": ["timing_engine_wiring"],
  "candidate.dominguez.planetary-representation": ["timing_engine_wiring"],
};

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
};

function applyMetadataUpdate(
  ritual: Ritual,
  update: RecommendationMetadataUpdate | undefined,
): Ritual {
  if (!update) {
    return ritual;
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
        ...ritual.recommendationMetadata.timing,
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
