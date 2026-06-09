# Ritual candidate packet: candlelight Buckland pilot

## Packet metadata

Packet ID: `packet-candlelight-buckland-pilot`  
Packet status: `draft_extraction_packet`  
Researcher: ChatGPT, revised by research-ops coordinator  
Date drafted: 2026-06-09  
Assigned reviewer: Tim  
Allowed model version / commit: not specified  
Parent issue: #276  
Related issues: #272, #274

## Assignment

Assigned source mode: single assigned source only  
Assigned carrier: `candlelight`  
Assigned cells: `steadying`, `opening`, `releasing`, `tending`, `connecting`, `voicing`, `marking`, `blessing`, `protecting`, `remembering`

Using the attached Buckland PDF as the working source copy; the revised sections below preserve the PDF page references already used from that copy. 

## Change summary

* Restored **real flame** as the default ritual carrier; LED is now adaptation/fallback only.
* Restored **multi-candle mechanics** where Buckland supports them.
* Kept **candle dressing/anointing** in scope with concise adult-use caution.
* Revised `Boundary Light` into a real spiritual protection/boundary practice without guarantee claims.
* Kept `connecting` as a Buckland gap.
* Restored stronger grimoire-like language while keeping candidates `draft`, unavailable, and not recommendable.
* Reclassified `First Light at the Table` to `draft_record_ready`; `Boundary Light` remains `needs_authoring_revision`; `Seven Marks`, `Settle the House`, and `Object in the Light` remain `needs_authoring_revision`.

## Allowed source

Source ID: `SRC-MOD-CANDLE-BUCKLAND-2002`
Citation: Raymond Buckland, *Practical Candleburning Rituals: Spells & Rituals for Every Purpose*. Llewellyn Publications, third edition PDF copy reviewed, nineteenth printing, 1995.
Edition / copy reviewed: Attached PDF copy; third edition; nineteenth printing; 1995; ISBN `0-87542-048-6`.
Access/source note: User-directed attached PDF source. Treat source locations as page references from the reviewed PDF copy, not verified 2002 paperback pagination.
Approved extraction scope for this packet: candle-magic mechanics only: room/table/altar preparation, candle roles, candle dressing/anointing, lighting/extinguishing sequence, symbolic placement, repeated sessions, candle movement, photograph/object marker use, spoken/prayer/script structure as mechanics, concentration/meditation periods, and completion/closing patterns.

Real candles/flame are the default ritual carrier for this packet. LED candles may be noted later as fallback/adaptation, but they are not the core ritual form. Multi-candle structures remain multi-candle where Buckland supports them, with concise adult-use flame cautions.

## Disallowed / excluded source material

* Buckland’s exact ritual scripts.
* Exact poems, exact prayers, exact Psalms.
* Buckland’s Psalm-to-purpose mapping.
* Christian/Pagan paired scripts as copied systems.
* Exact diagrams copied as diagrams.
* Coercive love/influence workings.
* Jealousy, enemy, pressure, domination, “power over others” workings.
* Guaranteed health, money, success, protection, or magical-efficacy claims.
* “Darker Side” appendix material.
* Rituals without candles appendix as candidate source material for this candlelight packet.
* Any direct import of source wording into user-facing Ritual text.

## Coverage summary

| Carrier     | Purpose     | Candidate count | Primary candidates | Draft-ready | Needs verification | Needs revision | Hold | Rejected | Notes                                                                                               |
| ----------- | ----------- | --------------: | -----------------: | ----------: | -----------------: | -------------: | ---: | -------: | --------------------------------------------------------------------------------------------------- |
| candlelight | steadying   |               2 |                  2 |           2 |                  2 |              0 |    0 |        0 | Strong support through meditation, quieting, concentration, candle focus, and closing sequence.     |
| candlelight | opening     |               1 |                  1 |           1 |                  1 |              0 |    0 |        0 | Supported by preparation, candle dressing, lighting order, table/altar setup, and deliberate close. |
| candlelight | releasing   |               1 |                  1 |           1 |                  1 |              0 |    0 |        0 | Strong bad-habit mechanics; avoid medical/addiction claims and guaranteed results.                  |
| candlelight | tending     |               1 |                  1 |           0 |                  1 |              1 |    0 |        0 | Supported by home-settling structure, but still requires authoring review to avoid overclaiming.    |
| candlelight | connecting  |               0 |                  0 |           0 |                  0 |              0 |    1 |        0 | Keep as gap. Love/marriage/attraction material excluded.                                            |
| candlelight | voicing     |               1 |                  1 |           1 |                  1 |              0 |    0 |        0 | Supported by spoken structure / own-words mechanics, not copied text.                               |
| candlelight | marking     |               1 |                  1 |           0 |                  1 |              1 |    0 |        0 | Supported by repeated sessions, candle movement, multi-day timing; needs authoring polish.          |
| candlelight | blessing    |               1 |                  1 |           0 |                  1 |              1 |    0 |        0 | Supported by consecration/blessing mechanics; flame-passing adapted safely.                         |
| candlelight | protecting  |               1 |                  1 |           0 |                  1 |              1 |    0 |        0 | Supported as spiritual protection / boundary candle mechanics without guarantee claims.             |
| candlelight | remembering |               1 |                  1 |           1 |                  1 |              0 |    0 |        0 | Strong photo/object + peace candle + repeated nights.                                               |

## Candidate research records

```ts
export const packetCandidateResearchRecords = [
  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-opening-altar-first-light",
    ritual: {
      id: "ritual-candlelight-buckland-opening-altar-first-light",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "Preparation, PDF pp. 12-15",
            sourceSummary: "Buckland instructs the practitioner to choose a quiet, undisturbed room, prepare a simple altar/table, use candle holders, dress candles with focused attention, light altar candles first, and extinguish in reverse order or with a snuffer.",
            sourceSupports: "Room preparation, table/altar setup, candle roles, candle dressing, lighting sequence, extinguishing sequence, concentration, and timing by least-interrupted time of day.",
            moonAndTableChanges: "Adapted into a private household opening practice with one dressed candle as the primary flame. Buckland's altar system, scripts, incense requirement, and color tables are not copied.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "First Light at the Table",
        practice: "Clear the table and make a small place for the candle. Dress the candle lightly, from center outward, while holding the purpose of the moment in mind. Set it in a stable holder. Light it as the first act of the ritual. Let the flame stand for the threshold you are crossing, then close by extinguishing it with care.",
        intention: "Open the practice by making the table, the candle, and the moment ready.",
        bestWindow: "At the beginning of an evening, ritual, lunar window, household reset, or private working.",
        whyThisFits: "Buckland makes preparation central: an undisturbed room, a prepared table/altar, dressed candles, ordered lighting, concentration, and deliberate extinguishing.",
        questionToCarry: "What is this flame opening?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "opening",
          secondary: ["steadying", "marking"],
          refinement: ["threshold_moment", "dressed_candle", "table_opening"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["table", "words"]
        },
        capacity: {
          supports: ["only_a_little", "enough_to_participate"],
          default: "only_a_little"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "One shared candle may be dressed and lit together, or one person may prepare the candle while both sit with the opening."
        },
        timing: {
          relationship: "helpful",
          contexts: ["start_of_practice", "evening_reset", "household_reset", "beginning_window"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["opening", "steadying", "marking"],
        keywords: ["opening", "first light", "altar", "table", "beginning", "dressed candle"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "opening"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "opening" },
      { carrier: "candlelight", purpose: "steadying" },
      { carrier: "candlelight", purpose: "marking" }
    ],
    mechanicSignature: "quiet-table-preparation -> candle-dressing -> single-candle-lighting -> own-words-purpose -> brief-attention -> deliberate-extinguishing",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "draft_record_ready",
    sourceSupportConfidence: "high",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "candle_dressing", "heat_safe_surface_required", "active_monitoring_required"],
    culturalFlags: ["modern_witchcraft_context", "religious_language_removed"],
    researcherNotes: {
      sourceSupport: "Strongly supported by Buckland's preparation section: room, altar/table, candle holders, candle dressing, candle roles, lighting/extinguishing, timing, and concentration.",
      adaptationNotes: "Restores candle dressing as source-faithful preparation while keeping the ritual domestic and concise.",
      safetyNotes: "Real flame default. Dress lightly; keep flame monitored on a heat-safe surface.",
      culturalNotes: "Christian/Pagan language and Buckland's ritual scripts omitted.",
      openQuestions: ["Should this become the default opening form for other candlelight rituals after review?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-steadying-blue-meditation",
    ritual: {
      id: "ritual-candlelight-buckland-steadying-blue-meditation",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "To Meditate, PDF pp. 86-87",
            sourceSummary: "Buckland gives a candle meditation structure using altar candles, a day candle, a petitioner/meditator candle, light blue candles associated with peace/tranquility, meditation, and reverse-order extinguishing.",
            sourceSupports: "Candlelight as a steadying focus, quiet meditation period, personal marker candle, light sequence, and closing sequence.",
            moonAndTableChanges: "Adapted away from Buckland's prayers and exact layout while preserving candlelight meditation, quiet concentration, and deliberate closing.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Quiet Flame for Steadying",
        practice: "Prepare one candle and set it where the flame can be watched safely. Light it with care. Let the room grow quiet around the candle. Sit before the flame and return to it whenever the mind scatters. When the practice is complete, extinguish the candle deliberately and let the dark return gently.",
        intention: "Let candlelight gather the scattered parts of attention.",
        bestWindow: "When the day feels frayed, before a deeper working, or when quiet needs a visible center.",
        whyThisFits: "Buckland’s meditation structure treats candlelight as a focus for peace, concentration, and ordered closing.",
        questionToCarry: "What steadies when I stay with the flame?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "steadying",
          secondary: ["opening"],
          refinement: ["quiet_attention", "flame_meditation", "gentle_centering"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["body"]
        },
        capacity: {
          supports: ["only_a_little", "enough_to_participate"],
          default: "only_a_little"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "Shared silence beside one candle; no required speaking."
        },
        timing: {
          relationship: "none",
          contexts: ["scattered_attention", "quiet_pause", "pre_ritual", "reset"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["steadying"],
        keywords: ["meditation", "quiet", "steadying", "flame", "pause"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "light"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "steadying"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "steadying" },
      { carrier: "candlelight", purpose: "opening" }
    ],
    mechanicSignature: "candle-lighting -> meditative attention -> flame focus -> deliberate close",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "draft_record_ready",
    sourceSupportConfidence: "high",
    adaptationDistance: "light",
    safetyFlags: ["live_flame", "active_monitoring_required"],
    culturalFlags: ["religious_prayer_removed"],
    researcherNotes: {
      sourceSupport: "Directly grounded in Buckland's meditation ritual structure.",
      adaptationNotes: "Kept candle focus and closing mechanics; removed prayer and exact multi-candle diagram.",
      safetyNotes: "Real flame default; monitor until extinguished.",
      culturalNotes: "Prayer/theological framing not imported.",
      openQuestions: ["Should this support both_of_us as a quiet shared pause by default?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-releasing-habit-surrounded",
    ritual: {
      id: "ritual-candlelight-buckland-releasing-habit-surrounded",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "To Overcome a Bad Habit, PDF pp. 19-21",
            sourceSummary: "Buckland uses a central dark/problem candle, surrounding white/support candles, concentration on the habit fading, a repeated weekly rhythm, and gradual candle movement toward the central candle until contact.",
            sourceSupports: "Releasing structure, problem marker candle, support candles, repeated sessions, movement across the altar/table, and extinguishing/closing.",
            moonAndTableChanges: "Adapted from 'overcome a bad habit' into a non-medical, non-guaranteed letting-go practice for releasing a small pattern, phrase, or behavior. Exact Psalm and Old Religion wording omitted.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Surround the Pattern",
        practice: "Place one candle for the pattern at the center of the table. Around it, place the support candles that will close in over repeated sessions. Dress each candle lightly while holding its role in mind. Light the center candle, then the surrounding candles. Sit with the image of the pattern being met, contained, and changed. At the close, extinguish the candles. In later sessions, move the surrounding candles nearer.",
        intention: "Release a pattern by surrounding it with chosen strength.",
        bestWindow: "When a small habit, phrase, or pattern is ready to be worked with over repeated sessions.",
        whyThisFits: "Buckland’s bad-habit ritual uses a central problem candle, surrounding support candles, repeated timing, and progressive candle movement.",
        questionToCarry: "What strength is ready to move closer?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "releasing",
          secondary: ["marking", "steadying"],
          refinement: ["pattern_release", "repeated_practice", "surrounding_candles"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["words", "table"]
        },
        capacity: {
          supports: ["enough_to_participate", "room_for_something_deeper"],
          default: "enough_to_participate"
        },
        audience: {
          supports: ["me"],
          default: "me",
          bothOfUsStructure: "Not recommended as a shared practice unless separately reviewed; the pattern should belong to the practitioner."
        },
        timing: {
          relationship: "helpful",
          contexts: ["waning_moon", "weekly_repetition", "personal_release", "habit_pattern"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["releasing", "marking", "steadying"],
        keywords: ["release", "habit", "pattern", "support candles", "repeated"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "releasing"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "releasing" },
      { carrier: "candlelight", purpose: "marking" },
      { carrier: "candlelight", purpose: "steadying" }
    ],
    mechanicSignature: "problem-candle -> surrounding-support-candles -> repeated movement inward -> close",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "draft_record_ready",
    sourceSupportConfidence: "high",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "multi_candle", "candle_dressing", "active_monitoring_required"],
    culturalFlags: ["psalm_removed", "ritual_script_removed"],
    researcherNotes: {
      sourceSupport: "Strong support from bad-habit ritual's central problem candle, support candles, repetition, and movement mechanics.",
      adaptationNotes: "Restores the source-backed multi-candle structure while avoiding addiction/medical framing and efficacy claims.",
      safetyNotes: "Multiple candles require clear spacing, heat-safe surface, and active monitoring.",
      culturalNotes: "Christian/Pagan scripts omitted.",
      openQuestions: ["Should this candidate explicitly exclude substance-use, self-harm, or medical behavior patterns?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-tending-home-settling",
    ritual: {
      id: "ritual-candlelight-buckland-tending-home-settling",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "To Settle a Disturbed Condition in the Home, PDF pp. 22-23",
            sourceSummary: "Buckland includes a home-settling structure using altar candles, incense, a petitioner candle, candles associated with peace/understanding/love, repeated spoken structure, repeated contemplation periods, extinguishing, and three consecutive nights.",
            sourceSupports: "Household tending, repeated candle sessions, home attention, spoken structure as mechanics, and three-night rhythm.",
            moonAndTableChanges: "Adapted into a non-claiming household candle rite for settling the home. Exact words and claims that peace is magically achieved are omitted.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Settle the House Light",
        practice: "Prepare the table or household center as a small altar. Set one candle for the home and additional candles for the qualities being invited back into the room, such as peace, patience, warmth, or understanding. Dress the candles lightly. Light them in order, sit with the house in mind, and speak a simple line in your own words. Repeat over the chosen nights, then close the working by extinguishing the candles with care.",
        intention: "Tend the spirit of the home and call it back toward peace.",
        bestWindow: "After a tense day, after conflict, before resetting a room, or when the home feels unsettled.",
        whyThisFits: "Buckland’s home-settling ritual uses multiple candles, home focus, spoken structure, contemplation, repetition, and a deliberate close.",
        questionToCarry: "What quality does this house need tended first?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "tending",
          secondary: ["steadying"],
          refinement: ["home_tending", "household_peace", "multi_night"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["table", "words"]
        },
        capacity: {
          supports: ["enough_to_participate", "room_for_something_deeper"],
          default: "enough_to_participate"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "both_of_us",
          bothOfUsStructure: "Shared candle-lighting for the home, with each person naming one quality silently or aloud."
        },
        timing: {
          relationship: "helpful",
          contexts: ["tense_day", "household_reset", "shared_room_reset", "multi_night"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["tending", "steadying"],
        keywords: ["home", "settle", "tending", "peace", "household", "multi-candle"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "tending"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "tending" },
      { carrier: "candlelight", purpose: "steadying" }
    ],
    mechanicSignature: "home-candle -> quality-candles -> spoken/intention structure -> quiet contemplation -> repeated nights -> close",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "needs_authoring_revision",
    sourceSupportConfidence: "medium",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "multi_candle", "candle_dressing", "active_monitoring_required"],
    culturalFlags: ["religious_script_removed", "magical_home_claims_softened"],
    researcherNotes: {
      sourceSupport: "Supported by the home-settling ritual's multi-candle structure and repeated-night mechanics.",
      adaptationNotes: "Restores ritual force while avoiding guaranteed claims that the home condition will be fixed.",
      safetyNotes: "Multiple candles require spacing, a heat-safe surface, and active monitoring.",
      culturalNotes: "No imported script, deity language, or magical guarantee.",
      openQuestions: ["Does this need a second domestic source before becoming review-ready?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-voicing-own-words-flame",
    ritual: {
      id: "ritual-candlelight-buckland-voicing-own-words-flame",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "Preparation / Rituals / A Final Word Before Starting, PDF pp. 14-15",
            sourceSummary: "Buckland notes that ritual words should carry meaning, that spontaneous words from the heart may be ideal, and that the practitioner's own comfort and intention matter more than flawless recitation.",
            sourceSupports: "Spoken structure as ritual mechanics, intentional reading/speaking, preparation before words, and comfort with personally fitting language.",
            moonAndTableChanges: "Adapted into a Moon & Table voicing practice using internally authored or user-authored words. No Buckland scripts, prayers, Psalms, or poems are used.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Words Beside the Flame",
        practice: "Prepare a safe place for one candle. Dress it lightly if that belongs to the night. Write or choose one sentence that names what is true. Light the candle, say the sentence aloud once, sit with it in silence, then say it once more, changed if needed. Extinguish the candle to close.",
        intention: "Let one true sentence become spoken before the flame.",
        bestWindow: "When something needs to be named, vowed, released, or remembered without turning into a long conversation.",
        whyThisFits: "Buckland treats spoken words as meaningful ritual mechanics and values sincere, personally fitting language over perfect recitation.",
        questionToCarry: "What sentence is ready for the flame to witness?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "voicing",
          secondary: ["marking", "steadying"],
          refinement: ["own_words", "spoken_truth", "brief_expression"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["words"]
        },
        capacity: {
          supports: ["only_a_little", "enough_to_participate"],
          default: "only_a_little"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "Each person may speak one sentence or choose silence; no response required."
        },
        timing: {
          relationship: "none",
          contexts: ["need_to_name", "brief_expression", "private_truth", "shared_pause"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight", "words"],
        purposes: ["voicing", "marking", "steadying"],
        keywords: ["words", "voice", "speak", "sentence", "flame"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "voicing"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "voicing" },
      { carrier: "candlelight", purpose: "marking" },
      { carrier: "candlelight", purpose: "steadying" }
    ],
    mechanicSignature: "prepare-candle -> user-authored sentence -> speak -> silence -> revise/repeat -> extinguish",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "draft_record_ready",
    sourceSupportConfidence: "high",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "candle_dressing_optional", "active_monitoring_required"],
    culturalFlags: ["source_prayers_not_imported", "source_poems_not_imported"],
    researcherNotes: {
      sourceSupport: "Grounded in Buckland's explicit treatment of words as meaningful ritual mechanics and his statement that one's own words may be ideal.",
      adaptationNotes: "Turns the source's script-heavy model into internally/user-authored voicing.",
      safetyNotes: "Real flame default; candle dressing optional.",
      culturalNotes: "Avoids Christian/Pagan scripts and Psalm structures.",
      openQuestions: ["Should this default to me rather than both_of_us to avoid relationship-processing pressure?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-marking-seven-night-increase",
    ritual: {
      id: "ritual-candlelight-buckland-marking-seven-night-increase",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "To Increase Your Power, PDF pp. 90-93; repeated candle movement patterns also appear in bad-habit and happiness/luck structures, PDF pp. 19-21 and pp. 36-37",
            sourceSummary: "Buckland uses repeated daily or weekly candle sequences, including adding or moving candles over successive sessions and timing one ritual seven days before the full moon.",
            sourceSupports: "Multi-session timing, incremental candle count or movement, daily repetition, and completion by reaching a final arrangement.",
            moonAndTableChanges: "Adapted from power/occult ability language into a non-claiming seven-night readiness marker. Keeps multi-candle progression where appropriate while omitting power-over, efficacy, and script language.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Seven Marks of Readiness",
        practice: "Set seven candles for the seven steps of approach. Each night, dress and light the candle for that night, letting the row of flame mark the work moving forward. Name the quality or preparation belonging to that step. When the night’s candle is complete, extinguish it with care. On the final night, light the full pattern and close the sequence.",
        intention: "Mark a gradual approach toward a known threshold.",
        bestWindow: "Before a full moon, trip, conversation, decision, seasonal threshold, or other known date.",
        whyThisFits: "Buckland repeatedly uses multi-session timing, candle movement, candle addition, and final arrangements to give a working shape over time.",
        questionToCarry: "What is tonight’s mark of readiness?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "marking",
          secondary: ["opening", "steadying"],
          refinement: ["multi_day", "readiness", "candle_sequence"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["table"]
        },
        capacity: {
          supports: ["enough_to_participate", "room_for_something_deeper"],
          default: "enough_to_participate"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "A shared seven-night candle sequence, with one candle or step named together each session."
        },
        timing: {
          relationship: "helpful",
          contexts: ["full_moon_window", "countdown", "transition", "known_date", "multi_session"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["marking", "opening", "steadying"],
        keywords: ["seven days", "readiness", "marking", "countdown", "full moon", "repetition", "multi-candle"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "heavy"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "marking"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "marking" },
      { carrier: "candlelight", purpose: "opening" },
      { carrier: "candlelight", purpose: "steadying" }
    ],
    mechanicSignature: "multi-session-timing -> candle-sequence -> incremental lighting/movement -> final arrangement/closure",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "needs_authoring_revision",
    sourceSupportConfidence: "medium",
    adaptationDistance: "heavy",
    safetyFlags: ["live_flame", "multi_candle", "candle_dressing", "active_monitoring_required"],
    culturalFlags: ["power_claims_removed", "psalm_removed", "moon_timing_not_imported_as_required"],
    researcherNotes: {
      sourceSupport: "Buckland strongly supports repeated sessions, incremental movement/addition, and multi-day timing. The specific 'increase power' purpose needs heavy adaptation.",
      adaptationNotes: "Restores multi-candle progression while removing power/magical ability claims.",
      safetyNotes: "Multiple candles require spacing, heat-safe surface, and active monitoring.",
      culturalNotes: "Avoids Psalm and occult-power framing.",
      openQuestions: ["Should full moon timing be allowed as helpful timing metadata, or omitted from this Buckland-derived candidate?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-protecting-boundary-circle",
    ritual: {
      id: "ritual-candlelight-buckland-protecting-boundary-circle",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "To Protect Against Evil, PDF pp. 30-32; related uncrossing/protection index references also appear in the TOC",
            sourceSummary: "Buckland uses a petitioner candle surrounded by candles associated with purity/strength, repeated attention, and a protective framing.",
            sourceSupports: "Spiritual protection framing, boundary-light mechanics, central personal marker, surrounding lights, concentration period, and extinguishing/closing.",
            moonAndTableChanges: "Adapted away from anti-evil certainty, uncrossing systems, and guaranteed protection. Keeps spiritual protection and boundary mechanics through a central candle and surrounding protective lights.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Boundary Light",
        practice: "Dress and set one candle for the person, room, or household being protected. Around it, place the boundary candles. Light the center candle first, then the surrounding lights. Name, in your own words, what is being held within the boundary and what does not belong inside it. Sit with the circle of flame, then extinguish the candles in reverse order to close.",
        intention: "Set a spiritual boundary without claiming certainty or control.",
        bestWindow: "Before sleep, after unsettling contact, before focused work, or when the home needs protective attention.",
        whyThisFits: "Buckland’s protection structure supports a central candle, surrounding protective candles, concentration, and deliberate closing; Moon & Table keeps the protection mechanics while omitting anti-evil claims, Psalms, and scripts.",
        questionToCarry: "What is this boundary here to guard?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "protecting",
          secondary: ["steadying", "marking"],
          refinement: ["spiritual_boundary", "protective_circle", "household_protection"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["table", "words"]
        },
        capacity: {
          supports: ["enough_to_participate", "room_for_something_deeper"],
          default: "enough_to_participate"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "A shared boundary may be named for the room, household, rest, or the relationship’s private space."
        },
        timing: {
          relationship: "helpful",
          contexts: ["before_sleep", "after_unsettling_contact", "focus_time", "household_boundary", "protective_working"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["protecting", "steadying", "marking"],
        keywords: ["boundary", "protection", "spiritual protection", "circle", "center", "protective candles"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "protecting"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "protecting" },
      { carrier: "candlelight", purpose: "steadying" },
      { carrier: "candlelight", purpose: "marking" }
    ],
    mechanicSignature: "central-protected-candle -> surrounding-boundary-candles -> own-words-boundary -> flame-concentration -> reverse-close",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "needs_authoring_revision",
    sourceSupportConfidence: "medium",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "multi_candle", "candle_dressing", "active_monitoring_required", "no_guarantee_claim"],
    culturalFlags: ["anti_evil_certainty_removed", "uncrossing_language_removed", "psalm_removed"],
    researcherNotes: {
      sourceSupport: "Supported by Buckland's central/surrounding candle protection structures and protective framing.",
      adaptationNotes: "Restores spiritual protection language while removing guarantees, anti-evil certainty, Psalms, and uncrossing system import.",
      safetyNotes: "Multiple candles require spacing, heat-safe surface, and active monitoring.",
      culturalNotes: "Protecting is retained as spiritual protection, but not as a guarantee of safety or outcome.",
      openQuestions: ["Should this remain needs_authoring_revision until the team decides how much spiritual protection language the product voice allows?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-remembering-photo-peace-light",
    ritual: {
      id: "ritual-candlelight-buckland-remembering-photo-peace-light",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "For the Dead, PDF pp. 23-26",
            sourceSummary: "Buckland's ritual for the dead includes a photograph placed before the deceased's astral candle, a light-blue candle for peace/tranquility, a burn period, extinguishing, and repetition over seven nights.",
            sourceSupports: "Photograph/object marker, remembrance candle, peace candle, repeated nights, attention to the dead as remembered, and closing.",
            moonAndTableChanges: "Adapted into a grief-sensitive remembrance practice using candlelight, an optional photo/object, and a peace candle. Exact scripture, poetry, deity language, and claims about the dead are omitted.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Remembering Light",
        practice: "Place the photo or small object on the table. Set a remembrance candle beside it, and a second candle for peace if the night can safely hold two flames. Light the remembrance candle first, then the peace candle. Name who or what is being remembered. Sit with one memory. Close by extinguishing the candles and returning the photo or object with care.",
        intention: "Make a lit place for memory and peace.",
        bestWindow: "Near anniversaries, seasonal remembrance, quiet grief, or a night when memory asks to be honored.",
        whyThisFits: "Buckland’s ritual for the dead supports a photo marker, remembrance candle, peace candle, repeated attention, and a deliberate close; Moon & Table removes scripture, poetry, and claims about the dead.",
        questionToCarry: "What memory wants a little light tonight?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "remembering",
          secondary: ["blessing", "steadying"],
          refinement: ["photo_marker", "grief_sensitive", "memory_light", "peace_candle"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["table"]
        },
        capacity: {
          supports: ["only_a_little", "enough_to_participate", "room_for_something_deeper"],
          default: "enough_to_participate"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "Shared silence around one remembered person, pet, place, or season; no required interpretation."
        },
        timing: {
          relationship: "helpful",
          contexts: ["anniversary", "seasonal_remembrance", "quiet_grief", "memory"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight"],
        purposes: ["remembering", "blessing", "steadying"],
        keywords: ["remembering", "memory", "photo", "grief", "peace candle", "ancestor"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "remembering"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "remembering" },
      { carrier: "candlelight", purpose: "steadying" },
      { carrier: "candlelight", purpose: "blessing" }
    ],
    mechanicSignature: "photo/object-marker -> remembrance-candle -> peace-candle -> quiet attention -> careful close",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "draft_record_ready",
    sourceSupportConfidence: "high",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "multi_candle_optional", "active_monitoring_required", "grief_sensitive"],
    culturalFlags: ["scripture_removed", "deity_language_removed", "claims_about_dead_removed"],
    researcherNotes: {
      sourceSupport: "Strong support from Buckland's photo marker, remembrance candle, peace candle, repeated-night remembrance structure.",
      adaptationNotes: "Restores the peace candle as source-backed candle magic while removing claims about afterlife, scripture, poetry, and deity language.",
      safetyNotes: "One or two flames depending on safety and reviewer decision.",
      culturalNotes: "Keep grief-safe; avoid ancestor/deity claims unless separately sourced.",
      openQuestions: ["Should the peace candle be required or optional in the final reviewed version?"]
    }
  },

  {
    packetId: "packet-candlelight-buckland-pilot",
    candidateId: "ritual-candlelight-buckland-blessing-object-in-light",
    ritual: {
      id: "ritual-candlelight-buckland-blessing-object-in-light",
      status: "draft",
      origin: {
        sourceType: "source_adapted",
        sourceGrounding: [
          {
            citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
            sourceLocation: "Consecration of an Amulet or Talisman, PDF pp. 93-94",
            sourceSummary: "Buckland gives a ritual for placing a talisman/amulet in relation to candles, passing it through flame and smoke, speaking over it, leaving it undisturbed, and later carrying it.",
            sourceSupports: "Object marker, candle-adjacent blessing/consecration, table placement, resting period, and completion by returning/carrying the object.",
            moonAndTableChanges: "Adapted into a safer candle blessing for an ordinary object: no passing through flame, no required smoke, no talisman efficacy claim, no exact words.",
            doNotImport: [
              "Exact Buckland wording not copied.",
              "Psalm mapping not imported.",
              "Exact ritual script not copied.",
              "Coercive or guaranteed-effect material omitted where applicable."
            ]
          }
        ]
      },
      presentation: {
        headline: "Object in the Light",
        practice: "Choose the object to be blessed and place it on the table between or beside the candles. Dress and light the candles. Hold the purpose of the blessing clearly, then speak over the object in your own words. Let it rest in the candlelight. Close by extinguishing the candles and returning the object to use.",
        intention: "Bless an ordinary object so it can carry a purpose back into daily life.",
        bestWindow: "Before a day, trip, transition, conversation, protection working, or home reset.",
        whyThisFits: "Buckland’s talisman/amulet consecration structure supports object placement, candlelight, spoken intention, resting time, and return-to-use; Moon & Table keeps blessing language while removing flame-passing and efficacy claims.",
        questionToCarry: "What blessing should this object carry?"
      },
      recommendationMetadata: {
        purposes: {
          primary: "blessing",
          secondary: ["marking", "remembering"],
          refinement: ["object_blessing", "candle_consecration", "return_to_use"]
        },
        carriers: {
          primary: "candlelight",
          secondary: ["vessel", "table", "words"]
        },
        capacity: {
          supports: ["enough_to_participate", "room_for_something_deeper"],
          default: "enough_to_participate"
        },
        audience: {
          supports: ["me", "both_of_us"],
          default: "me",
          bothOfUsStructure: "One shared household object or two separate objects may be blessed beside the same candles."
        },
        timing: {
          relationship: "helpful",
          contexts: ["before_transition", "object_marker", "travel", "household_reset", "blessing_working"]
        },
        eligibility: {
          recommendable: false,
          missing: ["human_review", "source_verification"]
        }
      },
      searchMetadata: {
        carriers: ["candlelight", "vessel"],
        purposes: ["blessing", "marking", "remembering"],
        keywords: ["object", "blessing", "light", "talisman", "marker", "consecration"]
      },
      availability: {
        findable: false,
        directUseEligible: false,
        recommendationEligible: false
      },
      adaptationPolicy: {
        sourceWording: "do_not_use",
        sourceScripts: "do_not_use",
        internalWordingAllowed: true,
        adaptationDistance: "moderate"
      }
    },
    primaryCoverageCell: {
      carrier: "candlelight",
      purpose: "blessing"
    },
    coverageCells: [
      { carrier: "candlelight", purpose: "blessing" },
      { carrier: "candlelight", purpose: "marking" },
      { carrier: "candlelight", purpose: "remembering" }
    ],
    mechanicSignature: "object-marker -> candlelight-blessing -> own-words-purpose -> resting-period -> return-to-use",
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    sourceFamilies: ["modern-witchcraft-candle-kitchen-moon"],
    researchStatus: "needs_authoring_revision",
    sourceSupportConfidence: "medium",
    adaptationDistance: "moderate",
    safetyFlags: ["live_flame", "multi_candle", "candle_dressing", "do_not_pass_object_through_flame", "heat_safe_distance_required"],
    culturalFlags: ["talisman_claims_softened", "consecration_language_adapted"],
    researcherNotes: {
      sourceSupport: "Supported by Buckland's object/candle/resting mechanics, but source includes unsafe flame-passing and stronger talisman claims.",
      adaptationNotes: "Restores blessing language and candle blessing mechanics while avoiding literal flame-passing.",
      safetyNotes: "Keep object near candlelight, not through flame.",
      culturalNotes: "Blessing language retained; efficacy claims omitted.",
      openQuestions: ["Should this candidate require two candles, or allow one candle depending on final source review?"]
    }
  }
] satisfies RitualCandidateResearchRecord[];
```

## Source notes

```ts
export const packetSourceNotes = [
  {
    noteId: "source-note-buckland-preparation-fire-safety",
    packetId: "packet-candlelight-buckland-pilot",
    sourceId: "SRC-MOD-CANDLE-BUCKLAND-2002",
    citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
    sourceLocation: "Preparation, PDF pp. 12-13",
    relatedCells: [
      { carrier: "candlelight", purpose: "opening" },
      { carrier: "candlelight", purpose: "steadying" }
    ],
    noteType: "safety_context",
    sourceSummary: "Buckland emphasizes choosing an undisturbed place with no fire risk and gives the example of candles too near curtains or drapes as dangerous.",
    sourceSupports: "Heat-safe placement, uninterrupted setup, active attention, and ordinary household fire caution.",
    doNotImport: ["Do not normalize live flame near fabric.", "Do not omit active monitoring."],
    importUse: "future_candidate_support",
    sourceSupportConfidence: "high"
  },
  {
    noteId: "source-note-buckland-candle-dressing",
    packetId: "packet-candlelight-buckland-pilot",
    sourceId: "SRC-MOD-CANDLE-BUCKLAND-2002",
    citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
    sourceLocation: "Preparation, PDF pp. 13-14",
    relatedCells: [
      { carrier: "candlelight", purpose: "opening" },
      { carrier: "candlelight", purpose: "marking" },
      { carrier: "candlelight", purpose: "blessing" },
      { carrier: "candlelight", purpose: "protecting" },
      { carrier: "candlelight", purpose: "releasing" }
    ],
    noteType: "mechanic_context",
    sourceSummary: "Buckland describes dressing/anointing candles with oil while concentrating on the matter at hand.",
    sourceSupports: "Focused preparation of the candle before use.",
    doNotImport: ["Do not import specific oil claims.", "Do not omit concise flare-risk caution."],
    importUse: "future_candidate_support",
    sourceSupportConfidence: "high"
  },
  {
    noteId: "source-note-buckland-verbal-structure",
    packetId: "packet-candlelight-buckland-pilot",
    sourceId: "SRC-MOD-CANDLE-BUCKLAND-2002",
    citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
    sourceLocation: "Preparation / A Final Word Before Starting, PDF pp. 14-15",
    relatedCells: [
      { carrier: "candlelight", purpose: "voicing" },
      { carrier: "candlelight", purpose: "opening" },
      { carrier: "candlelight", purpose: "blessing" },
      { carrier: "candlelight", purpose: "protecting" }
    ],
    noteType: "mechanic_context",
    sourceSummary: "Buckland treats ritual words as meaningful and says the user's own sincere words may be ideal.",
    sourceSupports: "Voicing as ritual mechanics without copying source scripts.",
    doNotImport: ["Do not copy scripts.", "Do not copy prayers.", "Do not copy Psalms.", "Do not copy poems."],
    importUse: "future_candidate_support",
    sourceSupportConfidence: "high"
  },
  {
    noteId: "source-note-buckland-repeated-movement",
    packetId: "packet-candlelight-buckland-pilot",
    sourceId: "SRC-MOD-CANDLE-BUCKLAND-2002",
    citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
    sourceLocation: "Repeated movement examples across PDF pp. 19-21, 36-37, 90-93",
    relatedCells: [
      { carrier: "candlelight", purpose: "marking" },
      { carrier: "candlelight", purpose: "releasing" }
    ],
    noteType: "mechanic_context",
    sourceSummary: "Several Buckland rituals repeat over multiple nights or weeks and move candles incrementally across the altar/table until a final arrangement is reached.",
    sourceSupports: "Multi-session marking, incremental movement, candle addition, and completion by spatial change.",
    doNotImport: ["Do not copy diagrams.", "Do not import coercive or guaranteed-effect goals."],
    importUse: "future_candidate_support",
    sourceSupportConfidence: "high"
  },
  {
    noteId: "source-note-buckland-excluded-dark-side",
    packetId: "packet-candlelight-buckland-pilot",
    sourceId: "SRC-MOD-CANDLE-BUCKLAND-2002",
    citationLabel: "Buckland, Practical Candleburning Rituals, 1995/third edition PDF copy reviewed",
    sourceLocation: "Appendix / The Darker Side, PDF p. 95 onward",
    relatedCells: [
      { carrier: "candlelight", purpose: "protecting" },
      { carrier: "candlelight", purpose: "releasing" }
    ],
    noteType: "safety_context",
    sourceSummary: "The appendix includes darker-side material such as voodoo candle, curse, Hands of Glory, and black-magic framing.",
    sourceSupports: "Exclusion boundary only.",
    doNotImport: ["Do not import appendix darker-side practices.", "Do not import curses.", "Do not import voodoo-candle framing."],
    importUse: "do_not_import",
    sourceSupportConfidence: "high"
  }
] satisfies RitualSourceNote[];
```

## Coverage records

```ts
export const packetCoverage = [
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "steadying",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-steadying-blue-meditation",
      "ritual-candlelight-buckland-opening-altar-first-light"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Strong support through meditation, quiet room setup, concentration, and calming candle structures."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "opening",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-opening-altar-first-light"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported through preparation, candle dressing, lighting order, altar/table setup, and final-word framing."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "releasing",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-releasing-habit-surrounded"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported by bad-habit structure. Medical/addiction claims excluded."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "tending",
    status: "thin_supported",
    candidateIds: [
      "ritual-candlelight-buckland-tending-home-settling"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported by home-settling ritual, but still requires authoring review and possibly a domestic source comparison."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "connecting",
    status: "gap",
    candidateIds: [],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Keep as gap. Non-coercive connecting is thin. Love/marriage/influence workings are not imported."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "voicing",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-voicing-own-words-flame"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported by spoken/prayer/script structure as mechanics and own-words framing. No Buckland wording imported."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "marking",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-marking-seven-night-increase"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported by repeated sessions, timing, candle dressing, and incremental candle movement/addition; candidate needs authoring review because source purpose was heavily adapted."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "blessing",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-blessing-object-in-light"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported through object/candle blessing and consecration mechanics, with flame-passing removed."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "protecting",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-protecting-boundary-circle"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Supported as spiritual protection / boundary candle mechanics without guarantee claims; candidate needs product-voice review."
  },
  {
    packetId: "packet-candlelight-buckland-pilot",
    carrier: "candlelight",
    purpose: "remembering",
    status: "draft_supported",
    candidateIds: [
      "ritual-candlelight-buckland-remembering-photo-peace-light"
    ],
    sourceIds: ["SRC-MOD-CANDLE-BUCKLAND-2002"],
    notes: "Strong support through photo/object marker, remembrance candle, peace candle, and repeated nights."
  }
];
```

## Gap notes

| Cell                     | Gap type                   | Why unresolved                                                                                                                                 | Recommended next action                                                         |
| ------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| candlelight + connecting | gap                        | Buckland’s connection/love/marriage material is largely coercive, attraction-oriented, influence-oriented, or relationship-repair with claims. | Keep as gap for Buckland. Use another source for mutual, consenting connection. |
| candlelight + tending    | thin support               | Home-settling source exists but needs authoring review to avoid guaranteed home-settling claims.                                               | Human review required; compare with domestic sources before finalizing.         |
| candlelight + blessing   | safety adaptation required | Talisman/consecration mechanics include passing object through flame/smoke.                                                                    | Keep candle blessing, but do not pass object through flame.                     |
| candlelight + protecting | product-voice review       | Source supports spiritual protection, but final wording must avoid guarantee claims and imported anti-evil/uncrossing language.                | Review product voice for spiritual protection language.                         |
| candlelight + marking    | source-purpose adaptation  | Best multi-day source is “increase power,” which includes power/occult claims.                                                                 | Use repeated-session and candle-sequence mechanics only; avoid source purpose.  |

## Open questions

1. Should `Boundary Light` allow explicit language like “spiritual protection,” or should it stay with “protective boundary” in user-facing copy?
2. Should `Seven Marks of Readiness` require seven real candles, or allow fewer candles moved/reused over seven sessions?
3. Should `Object in the Light` require two candles, or allow one candle depending on space and safety?
4. Should `Remembering Light` require a separate peace candle, or keep it optional when the user has capacity and a safe surface?
5. Should candle dressing be part of every Buckland-derived candlelight candidate, or only those where preparation is central?

## Tim product decisions

These decisions supersede earlier softened draft language and should guide review:

- Real candles/flame are the default ritual carrier.
- LED candles are fallback/adaptation only, not the core ritual form.
- Multi-candle mechanics should remain multi-candle where Buckland supports them.
- Candle dressing/anointing remains in scope.
- Spiritual protection language is allowed; do not flatten `protecting` into only attention/rest/time/home-feeling.
- No guarantee claims.
- `candlelight + connecting` remains a gap for Buckland.
- Use “blessing”; do not soften it to “setting aside” or “placing in light.”

## Candidate review status

### Draft-record-ready after review/schema validation

- `ritual-candlelight-buckland-opening-altar-first-light` — First Light at the Table
- `ritual-candlelight-buckland-steadying-blue-meditation` — Quiet Flame for Steadying
- `ritual-candlelight-buckland-releasing-habit-surrounded` — Surround the Pattern
- `ritual-candlelight-buckland-voicing-own-words-flame` — Words Beside the Flame
- `ritual-candlelight-buckland-remembering-photo-peace-light` — Remembering Light

### Needs authoring / product-voice review

- `ritual-candlelight-buckland-tending-home-settling` — Settle the House Light
- `ritual-candlelight-buckland-marking-seven-night-increase` — Seven Marks of Readiness
- `ritual-candlelight-buckland-protecting-boundary-circle` — Boundary Light
- `ritual-candlelight-buckland-blessing-object-in-light` — Object in the Light

### Gap

- `candlelight + connecting` remains a gap for this source.

## Rejected / held leads

| Cell | Source location | Lead | Reason | Future condition for reopening |
| --- | --- | --- | --- | --- |
| `candlelight + connecting` | Love / marriage rituals, PDF pp. 59–75 | Love, marriage, attraction, relationship influence | Too much coercion / influence risk; not appropriate for Moon & Table connecting. | Reopen only if a non-coercive mutual connection structure is identified without attraction/control mechanics. |
| `candlelight + protecting` | Enemy / pressure / uncrossing material, PDF pp. 35–45, 135–145 | Pressure on enemy, uncrossing, anti-evil | Power-over-others, adversarial, curse/uncrossing risk, protection guarantees. | Reopen only for neutral boundary mechanics, not opponent-focused practice. |
| `candlelight + marking` | Power-over-others, PDF pp. 99–101 | Power over others | Explicit domination / control language. | Do not reopen. |
| `candlelight + releasing` | Break up love affair, PDF pp. 15–19 | Separation through candle movement | Coercive relationship interference. | Do not reopen for relationship targets; movement mechanics already captured elsewhere. |
| `candlelight + blessing` | Talisman flame-passing, PDF pp. 93–94 | Passing object through flame/smoke | Unsafe if imported literally; talisman efficacy claims. | Reopen only as safe candle blessing / object-near-light mechanics. |
| all cells | Darker Side appendix, PDF p. 95 onward | Voodoo candle, curse, Hands of Glory, black-magic framing | Explicitly excluded by assignment. | Do not reopen in this packet. |
| all cells | Rituals without candles appendix, PDF p. 95 onward | Visualization, white light, moon, goal setting | Outside assigned carrier; source scope is candlelight. | Could be context in a separate non-candle packet only. |

## Duplicate check

| Candidate ID | Mechanic signature | Possible duplicate | Decision |
| --- | --- | --- | --- |
| `ritual-candlelight-buckland-opening-altar-first-light` | quiet-table-preparation -> candle-dressing -> single-candle-lighting -> own-words-purpose -> brief-attention -> deliberate-extinguishing | overlaps with steadying meditation | keep; primary opening |
| `ritual-candlelight-buckland-steadying-blue-meditation` | candle-lighting -> meditative attention -> flame focus -> deliberate close | overlaps with opening first light | keep; primary steadying |
| `ritual-candlelight-buckland-releasing-habit-surrounded` | problem-candle -> surrounding-support-candles -> repeated movement inward -> close | overlaps with marking repeated movement | keep; primary releasing |
| `ritual-candlelight-buckland-tending-home-settling` | home-candle -> quality-candles -> spoken/intention structure -> quiet contemplation -> repeated nights -> close | possible overlap with home/table rituals from other sources | keep as needs authoring revision |
| `ritual-candlelight-buckland-voicing-own-words-flame` | prepare-candle -> user-authored sentence -> speak -> silence -> revise/repeat -> extinguish | overlaps with opening | keep; primary voicing |
| `ritual-candlelight-buckland-marking-seven-night-increase` | multi-session-timing -> candle-sequence -> incremental lighting/movement -> final arrangement/closure | overlaps with releasing | keep; primary marking; needs authoring revision |
| `ritual-candlelight-buckland-protecting-boundary-circle` | central-protected-candle -> surrounding-boundary-candles -> own-words-boundary -> flame-concentration -> reverse-close | possible overlap with source-independent boundary light | keep; needs authoring revision |
| `ritual-candlelight-buckland-remembering-photo-peace-light` | photo/object-marker -> remembrance-candle -> peace-candle -> quiet attention -> careful close | none | keep |
| `ritual-candlelight-buckland-blessing-object-in-light` | object-marker -> candlelight-blessing -> own-words-purpose -> resting-period -> return-to-use | possible overlap with object placement rituals | keep as needs authoring revision |

## Validation checklist

- Used only assigned source: yes
- No source pool IDs: yes
- All source locations specific: yes, page references from reviewed PDF copy
- All candidate objects valid TypeScript-shaped objects: research-shape draft only; runtime schema validation still required before import
- All enum values valid: appears valid for provided enum values; confirm against current repo types before import
- All candidates unavailable by default: yes
- All candidates not recommendable by default: yes
- All candidates have sourceGrounding: yes
- All candidate IDs unique in packet: yes
- No household-origin rituals emitted: yes
- No copied Buckland scripts/prayers/poems/Psalms: yes
- No exact diagrams copied: yes
- No coercive workings imported: yes
- Adult-use candle cautions included where relevant: yes
- Real flame retained as default: yes
- Multi-candle mechanics preserved where source-supported: yes
- Candle dressing retained where source-supported: yes
- `connecting` preserved as a gap: yes

## Review notes / next actions

1. Preserve this packet as Markdown research content first.
2. Review candidate wording and source support before schema normalization.
3. Normalize against the actual repo `Ritual` model only after review.
4. Do not add any candidate to runtime data until Tim approves it.
5. Do not mark any candidate reviewed, recommendable, findable, or direct-use eligible from this packet alone.
