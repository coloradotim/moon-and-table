# Timing source-note cards

Status: draft research model for issue #318.

This document defines a research/data model for source-backed timing cards that sit between computed timing facts and ritual selection.

This is not runtime data. It does not import Rituals, update recommendation logic, add UI copy, or retrofit existing packets. Moon Book and Dominguez packet material are named here only as future source inputs for later issues.

## Purpose

Moon & Table can compute timing facts, but computed facts do not create symbolic meaning by themselves.

The intended later flow is:

```text
computed timing facts
-> reviewed timing source-note cards
-> soft ritual-shape hints
-> candidate matching / recommendation scoring
-> one recommendation
-> why-this-moment copy
```

The timing card layer answers a narrow research question:

```text
When this timing fact is present, what source-backed ritual purposes, carriers,
tones, and adaptations does it gently support?
```

It does not answer:

```text
What ritual should the app choose?
```

## Non-goals

Do not use this model to:

- create runtime data in this issue;
- import Rituals;
- create or update `SourceNotes`, `SymbolicCards`, `RitualPatterns`, or active recommendation data;
- update recommendation scoring or reachability;
- create UI copy;
- calculate astrology inside Ritual records;
- turn timing into a horoscope feed;
- make personality, fate, medical, fertility, legal, financial, or relationship-compatibility claims.

## Terms

### Computed timing fact

A machine-derived timing observation from the timing engine.

Examples:

```text
moon.phase = "new"
moon.phase = "waning_gibbous"
moon.voidOfCourse = true
planetaryHour.family = "venus"
mercury.retrograde = true
lunation.daysSinceNew = 14.7
```

Computed facts are astronomy/calendar facts or app timing calculations. They are not symbolic interpretations.

### Timing source-note card

A reviewed source-backed interpretation card that maps timing facts to symbolic ritual hints.

Examples:

```text
new moon -> beginning, seed, vessel, words, table
waning moon -> release, clearing, emptying, return
Venus hour -> warmth, harmony, shared table, sweetness, beauty
void Moon -> soften, pause, avoid overbuilding, use a contained form
```

Timing cards are source-backed content records. They are not Rituals.

### Ritual

An imported app ritual record using the canonical Ritual data model. A Ritual has its own source grounding, practice body, close, materials, purpose, carrier, capacity, audience, and eligibility state.

A Ritual may declare timing affinity, but it does not calculate astrology.

### Ritual candidate

A source-backed or household-authored candidate still living in an extraction/review packet. It is not yet an app Ritual.

### Held candidate

A Ritual candidate intentionally excluded from import pending product, source, safety, adaptation, or completeness review.

## How timing cards differ from Ritual candidates

Timing cards describe timing meaning. Ritual candidates describe a performable ritual.

| Question | Timing source-note card | Ritual candidate |
| --- | --- | --- |
| What does it represent? | Source-backed timing meaning and ritual-shape hints. | A possible ritual record with practice body, intention, close, and source grounding. |
| Does it contain a ritual body? | No. It may contain shape hints only. | Yes, if importable. |
| Can a user perform it? | No. | Not until imported/reviewed as a Ritual. |
| Does it choose a recommendation? | No. | No, but it may later be eligible for recommendation. |
| Does it cite sources? | Yes: packets, source IDs, page/section support. | Yes: packet/source grounding for the ritual. |
| Runtime effect before review? | None. | None until imported and eligible. |

A timing card may say:

```text
Waning timing supports release, return, emptying, and lowering.
```

It must not say:

```text
Choose `salt_clear_water_release`.
```

## How timing cards differ from recommendation logic

Timing cards are content. Recommendation logic is engine behavior.

Timing cards may provide:

- preferred purposes;
- supported carriers;
- discouraged purposes/carriers;
- capacity shifts;
- audience hints;
- ritual-shape hints;
- explanation templates;
- source lineage.

Recommendation logic decides:

- which candidate Rituals are reachable;
- how user inputs, profile, timing, capacity, and constraints are balanced;
- when a timing hint is outweighed by explicit focus or capacity;
- whether a closest-compatible gap exists;
- which single recommendation is returned.

Product rule:

```text
Timing cards are hints, not hard rules.
```

If the user asks for rest during waning timing, a waning card may shape the rest as lowering, banking, or setting down. It must not rename rest as release unless the selected focus is clearing/release or a reviewed closest-compatible disclosure is made.

## Source citation model

Each timing card cites:

- source packet IDs;
- source IDs;
- source gate paths when available;
- source locations with page/section labels;
- extraction boundaries;
- review status;
- exact claim boundaries.

Example:

```ts
sourceGrounding: [
  {
    packetId: "packet-moon-book-lunar-cycle",
    sourceId: "SRC-MOD-MOON-GOTTESDIENER-2020",
    sourceGatePath: "docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md",
    sourceLocation: "PDF pp. 82-107 / New Moon sections",
    supportKind: "future_feed_example",
    claimBoundary: "new moon as seed/space/beginning timing; no manifestation guarantee"
  }
]
```

For this issue, Moon Book and Dominguez are examples of future feeds only. Their packet content is not converted here into active cards.

## Review states

Timing cards must not influence runtime until reviewed.

Recommended review states:

```ts
type TimingCardReviewStatus =
  | "draft_research"
  | "source_review_needed"
  | "source_reviewed"
  | "approved_for_runtime_influence"
  | "held"
  | "rejected";
```

Runtime influence requires all of:

- `reviewStatus: "approved_for_runtime_influence"`;
- source grounding reviewed;
- claim boundaries reviewed;
- no deterministic/medical/personality/compatibility drift;
- source packet approved for this timing-card use;
- examples reviewed against house voice;
- recommendation-layer behavior reviewed separately.

## Claim boundaries

Timing cards may say:

- "supports";
- "leans toward";
- "can shape";
- "is good for";
- "may be used as";
- "keeps the ritual";
- "softens";
- "turns the rite toward";
- "asks for a smaller form";
- "gives this work a timing reason."

Timing cards must not say:

- "guarantees";
- "causes";
- "proves";
- "predicts";
- "means you are";
- "means your relationship is";
- "will heal";
- "will protect";
- "will manifest";
- "is unsafe unless";
- "bad luck if";
- "the chart says you must";
- "because Mercury is retrograde, communication will fail";
- "Venus means love will improve";
- "the full moon makes you emotional";
- "void Moon means nothing works."

## Draft schemas

These are research schemas, not TypeScript source files.

Runtime-facing fields must use the current Ritual vocabulary. Extra timing language such as "beginning", "resting", "clearing", "threshold", "kitchen", "home", or "object" belongs in `symbolicPurposeQualities`, `symbolicCarrierQualities`, `symbolicQualities`, or `softRitualShapeHints`, not in runtime-purpose or runtime-carrier arrays.

### Shared types

```ts
type ReviewStatus =
  | "draft_research"
  | "source_review_needed"
  | "source_reviewed"
  | "approved_for_runtime_influence"
  | "held"
  | "rejected";

type TimingFactKind =
  | "moon_phase"
  | "lunation_cycle"
  | "planetary_day"
  | "planetary_hour"
  | "retrograde"
  | "void_moon"
  | "aspect_condition"
  | "imperfect_timing"
  | "custom";

type RitualPurpose =
  | "opening"
  | "marking"
  | "voicing"
  | "tending"
  | "connecting"
  | "steadying"
  | "releasing"
  | "remembering"
  | "blessing"
  | "protecting";

type RitualCarrier =
  | "words"
  | "table"
  | "candlelight"
  | "vessel"
  | "body"
  | "plant"
  | "doorway";

type SourceGroundingRef = {
  packetId: string;
  sourceId: string;
  sourceGatePath?: string;
  sourceLocation: string;
  supportKind:
    | "future_feed_example"
    | "source_note"
    | "phase_framework"
    | "planetary_family"
    | "adaptation_rule"
    | "ritual_timing_support";
  claimBoundary: string;
};
```

### TimingSourceNoteCard

Base card for a source-backed timing interpretation.

```ts
type TimingSourceNoteCard = {
  id: string;
  label: string;
  cardKind:
    | "timing_feature"
    | "moon_phase"
    | "lunation_cycle"
    | "planetary_family"
    | "adaptation_rule"
    | "why_this_moment_template";

  timingFactKind: TimingFactKind;
  matchFacts: {
    factPath: string;
    allowedValues?: string[];
    range?: {
      min?: number;
      max?: number;
      unit?: "days" | "hours" | "degrees" | "percent";
    };
    required?: boolean;
  }[];

  sourceGrounding: SourceGroundingRef[];
  reviewStatus: ReviewStatus;
  runtimeInfluenceEligible: boolean;

  symbolicQualities: string[];
  preferredRuntimePurposes: RitualPurpose[];
  preferredRuntimeCarriers: RitualCarrier[];
  symbolicPurposeQualities: string[];
  symbolicCarrierQualities: string[];
  discouragedRuntimePurposes?: RitualPurpose[];
  discouragedRuntimeCarriers?: RitualCarrier[];

  softRitualShapeHints: {
    actionVerbs: string[];
    materialHints: RitualCarrier[];
    closureHints: string[];
    capacityHints?: {
      low?: string[];
      steady?: string[];
      high?: string[];
    };
    audienceHints?: {
      me?: string[];
      both?: string[];
    };
  };

  explanationBoundaries: {
    allowedPhrases: string[];
    avoidClaims: string[];
    deterministicRiskNotes: string[];
  };

  examples?: {
    computedFacts: Record<string, unknown>;
    hintSummary: string;
    notARecommendation: string;
  }[];
};
```

### TimingFeatureCard

Generic card for timing features that are not cleanly a Moon phase, lunation cycle, planetary family, or adaptation rule.

```ts
type TimingFeatureCard = TimingSourceNoteCard & {
  cardKind: "timing_feature";
  timingFeature:
    | "planetary_day"
    | "planetary_hour"
    | "void_moon"
    | "retrograde"
    | "aspect_condition"
    | "imperfect_timing"
    | "custom";
  featureFamily?: string;
  featureLabel: string;
};
```

### MoonPhaseCard

Specialized timing card for a named Moon phase.

```ts
type MoonPhaseCard = TimingSourceNoteCard & {
  cardKind: "moon_phase";
  moonPhase:
    | "new"
    | "waxing_crescent"
    | "first_quarter"
    | "waxing_gibbous"
    | "full"
    | "waning_gibbous"
    | "last_quarter"
    | "waning_crescent"
    | "dark";
  phaseArc:
    | "beginning"
    | "building"
    | "culminating"
    | "waning"
    | "resting";
  illuminationRange?: {
    minPercent: number;
    maxPercent: number;
  };
};
```

### LunationCycleCard

Card for whole-cycle position or phase transitions.

```ts
type LunationCycleCard = TimingSourceNoteCard & {
  cardKind: "lunation_cycle";
  cyclePosition:
    | "near_new"
    | "first_visible_crescent"
    | "near_first_quarter"
    | "near_full"
    | "post_full"
    | "near_last_quarter"
    | "pre_new"
    | "month_turn"
    | "phase_transition";
  cycleWindow: {
    relation: "before" | "after" | "within";
    anchor: "new_moon" | "first_quarter" | "full_moon" | "last_quarter";
    amount: number;
    unit: "hours" | "days";
  };
  transitionMeaning: string;
};
```

### PlanetaryFamilyCard

Card for symbolic planetary families such as Venus, Mercury, Saturn, or Mars. This is not natal astrology and not personality typing.

```ts
type PlanetaryFamilyCard = TimingSourceNoteCard & {
  cardKind: "planetary_family";
  planetFamily:
    | "sun"
    | "moon"
    | "mercury"
    | "venus"
    | "mars"
    | "jupiter"
    | "saturn"
    | "outer_planet_context";
  timingSources: ("planetary_day" | "planetary_hour" | "transit_context" | "manual_note")[];
  symbolicFunction: string;
  notForClaims: string[];
};
```

### TimingAdaptationRule

Card for imperfect, difficult, or mixed timing. These rules keep the app from pretending the sky is perfect or turning rough timing into alarm.

```ts
type TimingAdaptationRule = TimingSourceNoteCard & {
  cardKind: "adaptation_rule";
  adaptationKind:
    | "imperfect_timing"
    | "retrograde"
    | "void_moon"
    | "conflicting_timing"
    | "low_capacity_overrides_symbolic_timing"
    | "explicit_user_focus_overrides_timing";
  whenApplies: {
    timingFacts: string[];
    userContextFacts?: string[];
    exclusions?: string[];
  };
  adaptationMove:
    | "soften"
    | "make_smaller"
    | "shift_to_review"
    | "use_foundation"
    | "hold_not_launch"
    | "choose_neutral_carrier"
    | "preserve_explicit_focus";
  explanationMove: string;
};
```

### RitualTimingAffinity

Declared by a Ritual or Ritual candidate. It describes what timing the ritual can receive well. It does not calculate astrology and does not decide selection.

```ts
type RitualTimingAffinity = {
  ritualId: string;
  sourcePacketId?: string;
  preferredTimingCardIds?: string[];
  preferredTimingFactKinds?: TimingFactKind[];
  receptivePhaseArcs?: MoonPhaseCard["phaseArc"][];
  receptivePlanetFamilies?: PlanetaryFamilyCard["planetFamily"][];
  receptiveAdaptationKinds?: TimingAdaptationRule["adaptationKind"][];

  affinityStrength: "light" | "moderate" | "strong";
  timingRole:
    | "core_to_ritual"
    | "supports_material"
    | "supports_purpose"
    | "shapes_closure"
    | "optional_accent_only";

  timingMustNotOverride: {
    purpose: boolean;
    carrier: boolean;
    audience: boolean;
    capacity: boolean;
    safety: boolean;
  };

  declarationNote: string;
};
```

Example:

```ts
const ritualAffinity = {
  ritualId: "ritual.example.seed_waiting",
  preferredTimingCardIds: ["timing.moon.new.seed_space"],
  receptivePhaseArcs: ["beginning"],
  affinityStrength: "strong",
  timingRole: "supports_purpose",
  timingMustNotOverride: {
    purpose: true,
    carrier: true,
    audience: true,
    capacity: true,
    safety: true
  },
  declarationNote: "The ritual receives new-moon beginning timing, but it does not calculate the Moon phase itself."
};
```

### WhyThisMomentTemplate

Template for normal user-facing explanation. It should be compact and secondary, not a diagnostics report.

```ts
type WhyThisMomentTemplate = {
  id: string;
  timingCardIds: string[];
  reviewStatus: ReviewStatus;
  runtimeInfluenceEligible: boolean;
  sourceGrounding: SourceGroundingRef[];

  inputSlots: {
    timingPhrase: string;
    ritualAction: string;
    purposePhrase: string;
    carrierPhrase: string;
    adaptationPhrase?: string;
  };

  normalCopyPattern: string;
  debugCopyPattern?: string;
  avoidPhrases: string[];
  closestCompatibleDisclosure?: string;
};
```

Good normal pattern:

```text
New-moon timing turns this beginning toward seed and space. The ritual keeps
the work small: one named beginning, one object to hold it, and no demand that
it prove itself tonight.
```

Bad normal pattern:

```text
The timing engine selected a new moon card with high symbolic confidence and
matched it to the selected ritual context.
```

## Runtime use as hints

When runtime influence is later approved, recommendation logic may use timing cards to:

- add a small preference to rituals with matching timing affinity;
- shape explanation copy;
- choose between two otherwise comparable rituals;
- soften a recommendation when timing is imperfect;
- preserve explicit user focus when timing points elsewhere;
- disclose closest-compatible timing gaps.

Recommendation logic must not use timing cards to:

- override explicit user focus;
- override capacity;
- turn rest into release;
- turn tending into clearing;
- select a threshold or vessel form just because it is short;
- make a source-unsupported ritual feel source-backed;
- suppress diagnostics;
- claim prediction or fate.

## Examples

All examples below are draft research examples. They are not runtime data.

Example source locations are illustrative until #349/#355 verify them against the approved packet/source material during timing-card extraction. Do not treat the examples as reviewed timing cards.

### New moon

```ts
const newMoonCard: MoonPhaseCard = {
  id: "timing.moon.new.seed_space",
  label: "New moon seed and space",
  cardKind: "moon_phase",
  timingFactKind: "moon_phase",
  moonPhase: "new",
  phaseArc: "beginning",
  illuminationRange: { minPercent: 0, maxPercent: 5 },
  matchFacts: [
    { factPath: "moon.phase", allowedValues: ["new"], required: true }
  ],
  sourceGrounding: [
    {
      packetId: "packet-moon-book-lunar-cycle",
      sourceId: "SRC-MOD-MOON-GOTTESDIENER-2020",
      sourceGatePath: "docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md",
      sourceLocation: "PDF pp. 82-107 / New Moon sections",
      supportKind: "future_feed_example",
      claimBoundary: "new moon as seed/space/beginning timing; no manifestation guarantee"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["seed", "space", "beginning", "quiet start"],
  preferredRuntimePurposes: ["opening", "voicing", "marking"],
  preferredRuntimeCarriers: ["words", "table", "vessel", "candlelight", "plant"],
  symbolicPurposeQualities: ["beginning", "seeded start", "quiet start"],
  symbolicCarrierQualities: ["seed", "small held object", "place for the beginning"],
  discouragedRuntimePurposes: ["releasing"],
  softRitualShapeHints: {
    actionVerbs: ["name", "place", "begin", "wait"],
    materialHints: ["table", "vessel", "plant", "words"],
    closureHints: ["leave it to begin slowly", "close without launching"],
    capacityHints: {
      low: ["one sentence", "one small object"],
      high: ["staged beginning with later return"]
    }
  },
  explanationBoundaries: {
    allowedPhrases: ["supports a beginning", "gives the beginning space"],
    avoidClaims: ["manifest", "guarantee", "make it happen"],
    deterministicRiskNotes: ["Do not imply the new moon creates success."]
  }
};
```

### Full moon

```ts
const fullMoonCard: MoonPhaseCard = {
  id: "timing.moon.full.visible_witness",
  label: "Full moon visible witness",
  cardKind: "moon_phase",
  timingFactKind: "moon_phase",
  moonPhase: "full",
  phaseArc: "culminating",
  illuminationRange: { minPercent: 95, maxPercent: 100 },
  matchFacts: [
    { factPath: "moon.phase", allowedValues: ["full"], required: true }
  ],
  sourceGrounding: [
    {
      packetId: "packet-moon-book-lunar-cycle",
      sourceId: "SRC-MOD-MOON-GOTTESDIENER-2020",
      sourceGatePath: "docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md",
      sourceLocation: "PDF pp. 136-167 / Full Moon sections",
      supportKind: "future_feed_example",
      claimBoundary: "full moon as culmination/witness/illumination; no emotional prediction"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["visibility", "witness", "culmination", "naming"],
  preferredRuntimePurposes: ["marking", "voicing", "blessing", "remembering"],
  preferredRuntimeCarriers: ["candlelight", "table", "words", "vessel"],
  symbolicPurposeQualities: ["witnessing", "culmination", "naming what is visible"],
  symbolicCarrierQualities: ["visible light", "table witness", "held line"],
  softRitualShapeHints: {
    actionVerbs: ["witness", "name", "hold up", "mark"],
    materialHints: ["candlelight", "table", "words"],
    closureHints: ["close after the line is witnessed", "return the object to ordinary place"]
  },
  explanationBoundaries: {
    allowedPhrases: ["visible light can witness the line", "full timing supports naming what is ready to be seen"],
    avoidClaims: ["the full moon makes you emotional", "reveals the truth", "guarantees clarity"],
    deterministicRiskNotes: ["Use as ritual witness, not prediction."]
  }
};
```

### Waning moon

```ts
const waningMoonCard: MoonPhaseCard = {
  id: "timing.moon.waning.lower_return",
  label: "Waning moon lowering and return",
  cardKind: "moon_phase",
  timingFactKind: "moon_phase",
  moonPhase: "waning_gibbous",
  phaseArc: "waning",
  matchFacts: [
    { factPath: "moon.phaseArc", allowedValues: ["waning"], required: true }
  ],
  sourceGrounding: [
    {
      packetId: "packet-moon-book-lunar-cycle",
      sourceId: "SRC-MOD-MOON-GOTTESDIENER-2020",
      sourceGatePath: "docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md",
      sourceLocation: "PDF pp. 168-199 / Waning Moon sections",
      supportKind: "future_feed_example",
      claimBoundary: "waning as release/decrease/return; no banishing guarantee"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["lowering", "return", "release", "lessening"],
  preferredRuntimePurposes: ["releasing", "steadying"],
  preferredRuntimeCarriers: ["vessel", "candlelight", "body", "words"],
  symbolicPurposeQualities: ["clearing", "lowering", "resting by setting down"],
  symbolicCarrierQualities: ["empty bowl", "lowered light", "returned object"],
  softRitualShapeHints: {
    actionVerbs: ["lower", "empty", "return", "set down"],
    materialHints: ["vessel", "candlelight", "words"],
    closureHints: ["return the object", "empty the bowl", "let the light lower"]
  },
  explanationBoundaries: {
    allowedPhrases: ["waning timing can lower the work", "turns the action toward return"],
    avoidClaims: ["remove all harm", "banish", "protects you", "release as rest"],
    deterministicRiskNotes: ["Do not let waning timing rename non-clearing focuses as release."]
  }
};
```

### Venus day/hour

```ts
const venusFamilyCard: PlanetaryFamilyCard = {
  id: "timing.planet.venus.warmth_harmony",
  label: "Venus warmth and harmony",
  cardKind: "planetary_family",
  timingFactKind: "planetary_hour",
  planetFamily: "venus",
  timingSources: ["planetary_day", "planetary_hour"],
  symbolicFunction: "warmth, harmony, beauty, value, relational sweetness",
  notForClaims: ["relationship compatibility", "love guarantee", "attraction control"],
  matchFacts: [
    { factPath: "planetaryHour.family", allowedValues: ["venus"] }
  ],
  sourceGrounding: [
    {
      packetId: "packet-dominguez-practical-astrology",
      sourceId: "SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS",
      sourceGatePath: "docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md",
      sourceLocation: "Chapter 4 planetary family; Chapter 10 planetary day/hour timing",
      supportKind: "future_feed_example",
      claimBoundary: "Venus as harmony/value/beauty/love family; no compatibility or outcome claim"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["warmth", "harmony", "sweetness", "beauty", "shared value"],
  preferredRuntimePurposes: ["connecting", "tending", "blessing", "voicing"],
  preferredRuntimeCarriers: ["table", "candlelight", "words"],
  symbolicPurposeQualities: ["warmth", "harmony", "sweetening", "shared value"],
  symbolicCarrierQualities: ["cup", "kitchen warmth", "shared table"],
  softRitualShapeHints: {
    actionVerbs: ["sweeten", "warm", "offer", "soften"],
    materialHints: ["table", "candlelight", "words"],
    closureHints: ["return the cup", "let the shared object rest"]
  },
  explanationBoundaries: {
    allowedPhrases: ["Venus timing supports warmth", "the timing leans toward harmony and shared value"],
    avoidClaims: ["Venus means love will improve", "this fixes relationship tension"],
    deterministicRiskNotes: ["Never use Venus as compatibility or love-outcome logic."]
  }
};
```

### Mercury retrograde

```ts
const mercuryRetrogradeRule: TimingAdaptationRule = {
  id: "timing.adaptation.mercury_retrograde.review_foundation",
  label: "Mercury retrograde review and foundation",
  cardKind: "adaptation_rule",
  timingFactKind: "retrograde",
  adaptationKind: "retrograde",
  whenApplies: {
    timingFacts: ["mercury.retrograde = true"],
    exclusions: ["urgent explicit beginning without review frame"]
  },
  adaptationMove: "shift_to_review",
  explanationMove: "turns the rite toward review, repair, retracing, or foundation rather than launch",
  matchFacts: [
    { factPath: "mercury.retrograde", allowedValues: ["true"], required: true }
  ],
  sourceGrounding: [
    {
      packetId: "packet-dominguez-practical-astrology",
      sourceId: "SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS",
      sourceGatePath: "docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md",
      sourceLocation: "Chapter 11 / Adapting to the When",
      supportKind: "future_feed_example",
      claimBoundary: "retrograde as adaptation/review timing; no alarm or failure prediction"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["review", "retracing", "foundation", "repair"],
  preferredRuntimePurposes: ["remembering", "tending", "steadying", "voicing"],
  preferredRuntimeCarriers: ["words", "table"],
  symbolicPurposeQualities: ["review", "retracing", "repair", "foundation"],
  symbolicCarrierQualities: ["ordinary object", "written note", "table record"],
  softRitualShapeHints: {
    actionVerbs: ["review", "rename", "return to", "repair"],
    materialHints: ["words", "table"],
    closureHints: ["close with one thing clarified, not completed"]
  },
  explanationBoundaries: {
    allowedPhrases: ["retrograde timing can support review", "turns the action toward foundation"],
    avoidClaims: ["communication will fail", "do not sign", "Mercury is broken"],
    deterministicRiskNotes: ["No fear-based Mercury retrograde copy."]
  }
};
```

### Void Moon

```ts
const voidMoonRule: TimingAdaptationRule = {
  id: "timing.adaptation.void_moon.soften",
  label: "Void Moon soften and contain",
  cardKind: "adaptation_rule",
  timingFactKind: "void_moon",
  adaptationKind: "void_moon",
  whenApplies: {
    timingFacts: ["moon.voidOfCourse = true"]
  },
  adaptationMove: "soften",
  explanationMove: "keeps the rite contained and low-stakes rather than turning it into a launch",
  matchFacts: [
    { factPath: "moon.voidOfCourse", allowedValues: ["true"], required: true }
  ],
  sourceGrounding: [
    {
      packetId: "packet-moon-book-lunar-cycle",
      sourceId: "SRC-MOD-MOON-GOTTESDIENER-2020",
      sourceGatePath: "docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md",
      sourceLocation: "PDF pp. 228-245 / Lunar Lore and Literacy",
      supportKind: "future_feed_example",
      claimBoundary: "void Moon as timing context; no nothing-works claim"
    },
    {
      packetId: "packet-dominguez-practical-astrology",
      sourceId: "SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS",
      sourceGatePath: "docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md",
      sourceLocation: "Chapter 10 / Choosing the When",
      supportKind: "future_feed_example",
      claimBoundary: "void Moon as caution/softening condition; no deterministic failure"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["softening", "pause", "containment", "low stakes"],
  preferredRuntimePurposes: ["steadying", "remembering"],
  preferredRuntimeCarriers: ["body", "words", "vessel", "candlelight"],
  symbolicPurposeQualities: ["rest", "pause", "containment", "low-stakes holding"],
  symbolicCarrierQualities: ["held question", "small vessel", "quiet body"],
  softRitualShapeHints: {
    actionVerbs: ["pause", "hold", "set down", "contain"],
    materialHints: ["vessel", "body", "words"],
    closureHints: ["close without adding an outcome", "leave the question held"]
  },
  explanationBoundaries: {
    allowedPhrases: ["void Moon timing keeps the rite small", "this timing asks for containment rather than launch"],
    avoidClaims: ["nothing works", "bad timing", "do not act"],
    deterministicRiskNotes: ["Void Moon softens; it does not forbid."]
  }
};
```

### Imperfect timing adaptation

```ts
const imperfectTimingRule: TimingAdaptationRule = {
  id: "timing.adaptation.imperfect.use_available_sky",
  label: "Use the timing you have",
  cardKind: "adaptation_rule",
  timingFactKind: "imperfect_timing",
  adaptationKind: "imperfect_timing",
  whenApplies: {
    timingFacts: ["selectedWindow.hasMixedSignals = true"],
    userContextFacts: ["user.explicitFocusPresent = true"]
  },
  adaptationMove: "preserve_explicit_focus",
  explanationMove: "uses timing as a shaping influence without pretending the window is perfect",
  matchFacts: [
    { factPath: "selectedWindow.hasMixedSignals", allowedValues: ["true"] }
  ],
  sourceGrounding: [
    {
      packetId: "packet-dominguez-practical-astrology",
      sourceId: "SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS",
      sourceGatePath: "docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md",
      sourceLocation: "Chapter 11 / Adapting to the When",
      supportKind: "future_feed_example",
      claimBoundary: "adapt to available timing; no perfect-election requirement"
    }
  ],
  reviewStatus: "draft_research",
  runtimeInfluenceEligible: false,
  symbolicQualities: ["adaptation", "honesty", "available support"],
  preferredRuntimePurposes: ["steadying", "tending", "marking"],
  preferredRuntimeCarriers: ["words", "table", "candlelight"],
  symbolicPurposeQualities: ["adaptation", "honest timing", "available support"],
  symbolicCarrierQualities: ["available object", "borrowed light", "table mark"],
  softRitualShapeHints: {
    actionVerbs: ["adapt", "name", "borrow", "keep"],
    materialHints: ["words", "table", "candlelight"],
    closureHints: ["close by naming what was supported, not perfected"]
  },
  explanationBoundaries: {
    allowedPhrases: ["the timing is not perfect, but it can still shape the rite", "this uses the support available"],
    avoidClaims: ["best possible timing", "perfect window", "the app could not find a better match"],
    deterministicRiskNotes: ["Disclose mixed timing plainly without apology or fake confidence."]
  }
};
```

## Future implementation sequence

Later issues should proceed in separate slices:

1. Review and approve the timing-card schema.
2. Extract timing cards from approved source packets.
3. Add inert typed data only after review.
4. Add tests that prove timing cards do not select rituals by themselves.
5. Add recommendation-layer hinting separately.
6. Add why-this-moment rendering separately.

Do not combine schema approval, source extraction, runtime hinting, and recommendation copy in one implementation issue.

## Open questions for Moon Book and Dominguez follow-up extraction issues (#349 and #355)

- Should timing cards live in `src/data` eventually, or remain generated from reviewed research packets?
- Should Moon phase cards and planetary family cards share one runtime table or separate tables?
- Should void Moon and retrograde be first-class timing facts or adaptation rules only?
- What minimum source review state is required before a card can influence scoring?
- How should a card disclose mixed timing in collapsed "How this was chosen" without sounding diagnostic?
- What quality scenarios should prove that timing shapes but does not override selected focus?
