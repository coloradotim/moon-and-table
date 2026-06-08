import type { Ritual } from "./types";

const pilotAdaptationPolicy = {
  purposeChange: "not_allowed",
  materialSubstitution: "authored_only",
  capacityAdaptation: "allowed_if_authored",
  audienceAdaptation: "allowed_if_authored",
  timingAdaptation: "may_shape_best_window",
} satisfies Ritual["adaptationPolicy"];

export const pilotRituals: Ritual[] = [
  {
    id: "ritual.wet_the_seed_and_wait",
    status: "pilot",
    origin: {
      type: "source",
      sourceGrounding: [
        {
          citationLabel: "Carmina Gadelica",
          sourceLocation: "Consecration of the Seed page",
          sourceSummary:
            "Repo note: seed and water give beginning a material form: prepare, moisten, place, and wait for growth.",
          sourceSupports:
            "The source supports seed/water as material beginning and waiting.",
          moonAndTableChanges:
            "Moon & Table removes crop blessing/outcome claims and keeps the structure of prepare, moisten, place, wait.",
          doNotImport: [
            "crop blessing or agricultural outcome claims",
            "pressure for the seed to prove growth",
          ],
        },
      ],
    },
    presentation: {
      headline: "Wet the seed and wait.",
      practice:
        "Place one seed in a small dish. Touch it with a little water. Name the beginning it will hold in one sentence. Set the dish where it can wait undisturbed. Do not ask it to prove anything tonight. The ritual is complete when the seed has been placed into waiting.",
      intention: "Let the beginning have a small body and enough time to wait.",
      bestWindow:
        "When beginning something that should not become work immediately. Spring, new-phase, or first-step timing can strengthen the fit.",
      whyThisFits:
        "Seed and water make beginning material without promising the result. The Ritual ends by placing the seed into waiting, not by demanding growth.",
      questionToCarry: "What beginning can be placed into waiting?",
    },
    recommendationMetadata: {
      purposes: {
        primary: "opening",
        secondary: ["tending", "steadying"],
        refinement: "beginning_into_waiting",
      },
      carriers: {
        primary: "plant",
        secondary: ["vessel"],
      },
      capacity: {
        supports: ["only_a_little", "enough_to_participate"],
      },
      audience: {
        supports: ["me", "both_of_us"],
      },
      timing: {
        relationship: "helpful",
      },
      eligibility: {
        recommendable: true,
      },
    },
    searchMetadata: {
      tags: ["beginning", "waiting", "seed", "water", "plant", "vessel"],
      keywords: ["seed", "water", "beginning", "wait", "growth", "dish"],
      materials: ["seed", "water", "small dish"],
      places: ["table", "shelf", "undisturbed place"],
      sourceLabel: "Carmina Gadelica seed/water material",
      originLabel: "Repo-grounded household cluster",
    },
    availability: {
      findable: true,
      directUseEligible: true,
      recommendationEligible: true,
    },
    adaptationPolicy: pilotAdaptationPolicy,
  },
  {
    id: "ritual.set_grain_at_the_table",
    status: "pilot",
    origin: {
      type: "source",
      sourceGrounding: [
        {
          citationLabel: "Carmina Gadelica",
          sourceLocation: "Quern/grain material",
          sourceSummary:
            "Repo note: grain can link household rhythm, ordinary food, table warmth, and shared nourishment without recipe work.",
          sourceSupports:
            "The source supports grain/table as household rhythm and nourishment.",
          moonAndTableChanges:
            "Moon & Table narrows this to tending the household table, not prosperity or abundance.",
          doNotImport: [
            "prosperity or abundance claims",
            "recipe work or meal preparation requirements",
            "generic object-ritual identity detached from grain and table",
          ],
        },
      ],
    },
    presentation: {
      headline: "Set grain at the table.",
      practice:
        "Place one small piece of bread at the center of the table. Name one way this household is being fed or held right now. Let the table hold that sentence for one breath. Eat the bread, share it, or put it away. The ritual is complete when the table is clear again.",
      intention: "Let ordinary nourishment have one clear place at the center.",
      bestWindow:
        "Near a meal, after the room has scattered, or when the household needs one ordinary point of care.",
      whyThisFits:
        "The source connects grain with household rhythm and table warmth. This Ritual keeps the table and food-family material specific so it does not become a generic object ritual.",
      questionToCarry: "What ordinary thing is holding more than you noticed?",
    },
    recommendationMetadata: {
      purposes: {
        primary: "tending",
        secondary: ["blessing", "steadying"],
        refinement: "household_nourishment",
      },
      carriers: {
        primary: "table",
        secondary: [],
      },
      capacity: {
        supports: ["only_a_little", "enough_to_participate"],
      },
      audience: {
        supports: ["me", "both_of_us"],
      },
      timing: {
        relationship: "none",
      },
      eligibility: {
        recommendable: true,
      },
    },
    searchMetadata: {
      tags: ["grain", "bread", "table", "nourishment", "household", "tending"],
      keywords: ["bread", "grain", "table", "fed", "held", "nourishment"],
      materials: ["bread", "grain", "table"],
      places: ["table"],
      sourceLabel: "Carmina Gadelica quern/grain material",
      originLabel: "Repo-grounded household cluster",
    },
    availability: {
      findable: true,
      directUseEligible: true,
      recommendationEligible: true,
    },
    adaptationPolicy: pilotAdaptationPolicy,
  },
  {
    id: "ritual.kindle_the_first_household_light",
    status: "pilot",
    origin: {
      type: "source",
      sourceGrounding: [
        {
          citationLabel: "Carmina Gadelica, Vol. I",
          sourceLocation:
            "Entries 82-83, Blessing of the Kindling / Kindling the Fire",
          sourceSummary:
            "Repo note: kindling can open the house as a ritual field: floor, hearth, people, and threshold are treated together.",
          sourceSupports:
            "The source supports first household fire/light as an opening action.",
          moonAndTableChanges:
            "Moon & Table changes hearth fire into an ordinary household light form.",
          doNotImport: [
            "literal hearth-fire requirement",
            "copied prayer language",
            "claims beyond first household light as an opening act",
          ],
        },
      ],
    },
    presentation: {
      headline: "Kindle the first household light.",
      practice:
        "Turn on one lamp before you begin anything else. Let it be the first household light of this ritual. Stand near it and name what is beginning in one plain sentence. Leave the lamp on while you take the first ordinary step. The ritual is complete when the beginning has been named and the light remains.",
      intention: "Let one first light make the beginning visible.",
      bestWindow:
        "At the beginning of the day, a task, a conversation, or a new phase. Strong beginning timing can make this especially fitting.",
      whyThisFits:
        "The source structure treats kindling as an opening act for the household. This Ritual keeps the first-light structure but uses ordinary household light rather than hearth fire.",
      questionToCarry: "What beginning wants one clear first sign?",
    },
    recommendationMetadata: {
      purposes: {
        primary: "opening",
        secondary: ["blessing", "steadying"],
        refinement: "first_light_beginning",
      },
      carriers: {
        primary: "candlelight",
        secondary: [],
      },
      capacity: {
        supports: [
          "only_a_little",
          "enough_to_participate",
          "room_for_something_deeper",
        ],
      },
      audience: {
        supports: ["me", "both_of_us"],
      },
      timing: {
        relationship: "preferred",
      },
      eligibility: {
        recommendable: true,
      },
    },
    searchMetadata: {
      tags: ["first light", "lamp", "light", "beginning", "household", "opening"],
      keywords: ["lamp", "light", "kindle", "first", "beginning", "household"],
      materials: ["lamp", "household light"],
      places: ["home", "room", "near a lamp"],
      sourceLabel: "Carmina Gadelica kindling material",
      originLabel: "Repo-grounded household cluster",
    },
    availability: {
      findable: true,
      directUseEligible: true,
      recommendationEligible: true,
    },
    adaptationPolicy: pilotAdaptationPolicy,
  },
];
