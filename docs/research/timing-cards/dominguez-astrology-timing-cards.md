# Dominguez astrology timing/source-note cards

Status: draft research timing-card artifact for issue #355.

Source: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.

Source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`

Source gate: `docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md`

This document follows the #318 timing/source-note card model. It creates research-only timing interpretation cards that can later sit between computed timing facts and ritual selection. These are not runtime data, not Ritual candidates, and not recommendation logic.

## Operating rule

Computed timing facts do not create symbolic meaning by themselves. Dominguez supplies source-backed timing language for astrology as ritual support. These cards translate that source-backed material into soft ritual-shape hints.

Use these cards only after future review approves runtime influence.

## Claim boundaries

Good:

```text
This moment has a Mercury shape, so the ritual emphasizes naming, sorting, speaking clearly, and writing one clean sentence.
```

Bad:

```text
Mercury says your communication will fail today.
```

Good:

```text
A retrograde condition can shift the ritual toward return, review, repair, and foundations.
```

Bad:

```text
Retrograde means you should not do the ritual.
```

## Coverage

Cards included:

- `timing-card.dominguez.planetary-day` — Planetary Day
- `timing-card.dominguez.planetary-hour` — Planetary Hour
- `timing-card.dominguez.sun-family` — Sun family
- `timing-card.dominguez.moon-family` — Moon family
- `timing-card.dominguez.mercury-family` — Mercury family
- `timing-card.dominguez.venus-family` — Venus family
- `timing-card.dominguez.mars-family` — Mars family
- `timing-card.dominguez.jupiter-family` — Jupiter family
- `timing-card.dominguez.saturn-family` — Saturn family
- `timing-card.dominguez.glyph-as-marking` — Glyph as Marking
- `timing-card.dominguez.waxing-moon` — Waxing Moon
- `timing-card.dominguez.waning-moon` — Waning Moon
- `timing-card.dominguez.full-moon` — Full Moon
- `timing-card.dominguez.dark-moon` — Dark Moon
- `timing-card.dominguez.quarter-moons` — Quarter Moons
- `timing-card.dominguez.moon-sign-tone` — Moon Sign Tone
- `timing-card.dominguez.void-moon` — Void-of-Course Moon
- `timing-card.dominguez.aspect-before-culmination` — Aspect Before Culmination
- `timing-card.dominguez.retrograde-adaptation` — Retrograde Adaptation
- `timing-card.dominguez.imperfect-timing` — Imperfect Timing
- `timing-card.dominguez.magick-square-hold` — Magick Square Hold

## Cards

### timing-card.dominguez.planetary-day

```yaml
id: timing-card.dominguez.planetary-day
label: "Planetary Day"
cardKind: timing_feature
timingFactKind: planetary_day
timingFeature: planetary_day
featureLabel: "Planetary Day"
matchFacts:
  - factPath: planetaryDay.family
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 9, PDF pp. 91-97"
    supportKind: ritual_timing_support
    claimBoundary: "This timing can gently shape a ritual toward marking, opening, tending through table, words, candlelight."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "planetary day gives broad planetary background for the work"
preferredRuntimePurposes:
    - marking
    - opening
    - tending
preferredRuntimeCarriers:
    - table
    - words
    - candlelight
symbolicPurposeQualities:
  - "planetary day gives broad planetary background for the work"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - words
    - candlelight
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward marking, opening, tending through table, words, candlelight."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Planetary Day gives the ritual a source-backed timing accent."
  medium: "Planetary Day can support this ritual by turning the practice toward planetary day gives broad planetary background for the work."
  debugEvidence:
    - "sourceLocation: Chapter 9, PDF pp. 91-97"
    - "timingFactKind: planetary_day"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.planetary-hour

```yaml
id: timing-card.dominguez.planetary-hour
label: "Planetary Hour"
cardKind: timing_feature
timingFactKind: planetary_hour
timingFeature: planetary_hour
featureLabel: "Planetary Hour"
matchFacts:
  - factPath: planetaryHour.family
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 9, PDF pp. 96-97; Chapter 11, PDF pp. 123-124"
    supportKind: ritual_timing_support
    claimBoundary: "This timing can gently shape a ritual toward marking, steadying, blessing through table, words, candlelight."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "planetary hour can double a planet's support or add a second planetary quality"
preferredRuntimePurposes:
    - marking
    - steadying
    - blessing
preferredRuntimeCarriers:
    - table
    - words
    - candlelight
symbolicPurposeQualities:
  - "planetary hour can double a planet's support or add a second planetary quality"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - words
    - candlelight
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward marking, steadying, blessing through table, words, candlelight."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Planetary Hour gives the ritual a source-backed timing accent."
  medium: "Planetary Hour can support this ritual by turning the practice toward planetary hour can double a planet's support or add a second planetary quality."
  debugEvidence:
    - "sourceLocation: Chapter 9, PDF pp. 96-97; Chapter 11, PDF pp. 123-124"
    - "timingFactKind: planetary_hour"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.sun-family

```yaml
id: timing-card.dominguez.sun-family
label: "Sun family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: sun
timingSources: [planetary_day, planetary_hour, manual_note]
symbolicFunction: "purpose, vitality, integration, and visible center"
notForClaims: [personality typing, vitality guarantee, solar destiny claim]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [sun]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 29-30"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward opening, marking, blessing through candlelight, table, words."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "purpose, vitality, integration, true will, visible center"
preferredRuntimePurposes:
    - opening
    - marking
    - blessing
preferredRuntimeCarriers:
    - candlelight
    - table
    - words
symbolicPurposeQualities:
  - "purpose, vitality, integration, true will, visible center"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - candlelight
    - table
    - words
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward opening, marking, blessing through candlelight, table, words."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Sun family gives the ritual a source-backed timing accent."
  medium: "Sun family can support this ritual by turning the practice toward purpose, vitality, integration, true will, visible center."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 29-30"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.moon-family

```yaml
id: timing-card.dominguez.moon-family
label: "Moon family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: moon
timingSources: [planetary_day, planetary_hour, transit_context, manual_note]
symbolicFunction: "memory, story, rhythm, vessel, and reflected timing"
notForClaims: [mood prediction, personality typing, emotional determinism]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [moon]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 31-32"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward remembering, steadying, connecting through vessel, words, body."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "vessel, memory, instinct, astral plane, tides of life"
preferredRuntimePurposes:
    - remembering
    - steadying
    - connecting
preferredRuntimeCarriers:
    - vessel
    - words
    - body
symbolicPurposeQualities:
  - "vessel, memory, instinct, astral plane, tides of life"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - vessel
    - words
    - body
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward remembering, steadying, connecting through vessel, words, body."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Moon family gives the ritual a source-backed timing accent."
  medium: "Moon family can support this ritual by turning the practice toward vessel, memory, instinct, astral plane, tides of life."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 31-32"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.mercury-family

```yaml
id: timing-card.dominguez.mercury-family
label: "Mercury family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: mercury
timingSources: [planetary_day, planetary_hour, transit_context, manual_note]
symbolicFunction: "naming, speaking, sorting, writing, and message-carrying"
notForClaims: [communication failure prediction, intelligence claim, personality typing]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [mercury]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 32-33"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward voicing, marking, remembering through words, table."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "thought, speech, communication, naming, systems"
preferredRuntimePurposes:
    - voicing
    - marking
    - remembering
preferredRuntimeCarriers:
    - words
    - table
symbolicPurposeQualities:
  - "thought, speech, communication, naming, systems"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - words
    - table
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward voicing, marking, remembering through words, table."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Mercury family gives the ritual a source-backed timing accent."
  medium: "Mercury family can support this ritual by turning the practice toward thought, speech, communication, naming, systems."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 32-33"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.venus-family

```yaml
id: timing-card.dominguez.venus-family
label: "Venus family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: venus
timingSources: [planetary_day, planetary_hour, transit_context, manual_note]
symbolicFunction: "harmony, value, beauty, warmth, and chosen connection"
notForClaims: [love guarantee, attraction control, relationship compatibility claim]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [venus]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 33-34"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward connecting, blessing, tending through table, candlelight, words."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "beauty, harmony, values, relationship to meaning"
preferredRuntimePurposes:
    - connecting
    - blessing
    - tending
preferredRuntimeCarriers:
    - table
    - candlelight
    - words
symbolicPurposeQualities:
  - "beauty, harmony, values, relationship to meaning"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - candlelight
    - words
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward connecting, blessing, tending through table, candlelight, words."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Venus family gives the ritual a source-backed timing accent."
  medium: "Venus family can support this ritual by turning the practice toward beauty, harmony, values, relationship to meaning."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 33-34"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.mars-family

```yaml
id: timing-card.dominguez.mars-family
label: "Mars family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: mars
timingSources: [planetary_day, planetary_hour, transit_context, manual_note]
symbolicFunction: "directed will, assertion, heat, boundary, and disciplined action"
notForClaims: [violence, domination, aggression instruction, victory guarantee]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [mars]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 34-35"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward protecting, opening, marking through body, words, candlelight."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "directed will, assertion, energy, precision of force"
preferredRuntimePurposes:
    - protecting
    - opening
    - marking
preferredRuntimeCarriers:
    - body
    - words
    - candlelight
symbolicPurposeQualities:
  - "directed will, assertion, energy, precision of force"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - body
    - words
    - candlelight
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward protecting, opening, marking through body, words, candlelight."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Mars family gives the ritual a source-backed timing accent."
  medium: "Mars family can support this ritual by turning the practice toward directed will, assertion, energy, precision of force."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 34-35"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.jupiter-family

```yaml
id: timing-card.dominguez.jupiter-family
label: "Jupiter family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: jupiter
timingSources: [planetary_day, planetary_hour, transit_context, manual_note]
symbolicFunction: "expansion, trust, wisdom, generosity, and a wider view"
notForClaims: [prosperity guarantee, luck guarantee, legal or financial advice]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [jupiter]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 35-36"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward blessing, opening, tending through table, words, candlelight."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "vision, trust, opportunity, expansive pattern"
preferredRuntimePurposes:
    - blessing
    - opening
    - tending
preferredRuntimeCarriers:
    - table
    - words
    - candlelight
symbolicPurposeQualities:
  - "vision, trust, opportunity, expansive pattern"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - words
    - candlelight
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward blessing, opening, tending through table, words, candlelight."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Jupiter family gives the ritual a source-backed timing accent."
  medium: "Jupiter family can support this ritual by turning the practice toward vision, trust, opportunity, expansive pattern."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 35-36"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.saturn-family

```yaml
id: timing-card.dominguez.saturn-family
label: "Saturn family"
cardKind: planetary_family
timingFactKind: custom
planetFamily: saturn
timingSources: [planetary_day, planetary_hour, transit_context, manual_note]
symbolicFunction: "limit, structure, discipline, boundary, and foundation"
notForClaims: [punishment claim, fatalism, fear-based restriction]
matchFacts:
  - factPath: planetaryFamily
    allowedValues: [saturn]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 4, PDF pp. 36-37"
    supportKind: planetary_family
    claimBoundary: "This timing can gently shape a ritual toward protecting, steadying, marking through table, doorway, words."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "structure, boundary, discipline, limits, foundations"
preferredRuntimePurposes:
    - protecting
    - steadying
    - marking
preferredRuntimeCarriers:
    - table
    - doorway
    - words
symbolicPurposeQualities:
  - "structure, boundary, discipline, limits, foundations"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - doorway
    - words
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward protecting, steadying, marking through table, doorway, words."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Saturn family gives the ritual a source-backed timing accent."
  medium: "Saturn family can support this ritual by turning the practice toward structure, boundary, discipline, limits, foundations."
  debugEvidence:
    - "sourceLocation: Chapter 4, PDF pp. 36-37"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.glyph-as-marking

```yaml
id: timing-card.dominguez.glyph-as-marking
label: "Glyph as Marking"
cardKind: timing_feature
timingFactKind: custom
timingFeature: custom
featureFamily: "glyph_symbol"
featureLabel: "Glyph as Marking"
matchFacts:
  - factPath: manualTimingFeature
    allowedValues: [glyph_symbol]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 8, PDF pp. 80-84"
    supportKind: ritual_timing_support
    claimBoundary: "This timing can gently shape a ritual toward marking, voicing through words, table, body."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "glyphs can function as a magical alphabet and focused mark"
preferredRuntimePurposes:
    - marking
    - voicing
preferredRuntimeCarriers:
    - words
    - table
    - body
symbolicPurposeQualities:
  - "glyphs can function as a magical alphabet and focused mark"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - words
    - table
    - body
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward marking, voicing through words, table, body."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Glyph as Marking gives the ritual a source-backed timing accent."
  medium: "Glyph as Marking can support this ritual by turning the practice toward glyphs can function as a magical alphabet and focused mark."
  debugEvidence:
    - "sourceLocation: Chapter 8, PDF pp. 80-84"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.waxing-moon

```yaml
id: timing-card.dominguez.waxing-moon
label: "Waxing Moon"
cardKind: timing_feature
timingFactKind: moon_phase
timingFeature: custom
featureFamily: "moon_phase_arc"
featureLabel: "Waxing Moon Arc"
matchFacts:
  - factPath: moon.phaseArc
    allowedValues: [building]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 105-106"
    supportKind: phase_framework
    claimBoundary: "This timing can gently shape a ritual toward opening, tending, blessing through candlelight, plant, table."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "increase, growth, new beginning"
preferredRuntimePurposes:
    - opening
    - tending
    - blessing
preferredRuntimeCarriers:
    - candlelight
    - plant
    - table
symbolicPurposeQualities:
  - "increase, growth, new beginning"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - candlelight
    - plant
    - table
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward opening, tending, blessing through candlelight, plant, table."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Waxing Moon gives the ritual a source-backed timing accent."
  medium: "Waxing Moon can support this ritual by turning the practice toward increase, growth, new beginning."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 105-106"
    - "timingFactKind: moon_phase"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.waning-moon

```yaml
id: timing-card.dominguez.waning-moon
label: "Waning Moon"
cardKind: timing_feature
timingFactKind: moon_phase
timingFeature: custom
featureFamily: "moon_phase_arc"
featureLabel: "Waning Moon Arc"
matchFacts:
  - factPath: moon.phaseArc
    allowedValues: [waning]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 105-106"
    supportKind: phase_framework
    claimBoundary: "This timing can gently shape a ritual toward releasing, steadying, protecting through words, vessel, body."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "banish, diminish, transform, remove"
preferredRuntimePurposes:
    - releasing
    - steadying
    - protecting
preferredRuntimeCarriers:
    - words
    - vessel
    - body
symbolicPurposeQualities:
  - "banish, diminish, transform, remove"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - words
    - vessel
    - body
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward releasing, steadying, protecting through words, vessel, body."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Waning Moon gives the ritual a source-backed timing accent."
  medium: "Waning Moon can support this ritual by turning the practice toward banish, diminish, transform, remove."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 105-106"
    - "timingFactKind: moon_phase"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.full-moon

```yaml
id: timing-card.dominguez.full-moon
label: "Full Moon"
cardKind: moon_phase
timingFactKind: moon_phase
moonPhase: full
phaseArc: culminating
matchFacts:
  - factPath: moon.phase
    allowedValues: [full]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 106-107"
    supportKind: phase_framework
    claimBoundary: "This timing can gently shape a ritual toward blessing, marking, remembering through candlelight, table, vessel."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "peak, reinforcement, stability, revelation of strengths/flaws"
preferredRuntimePurposes:
    - blessing
    - marking
    - remembering
preferredRuntimeCarriers:
    - candlelight
    - table
    - vessel
symbolicPurposeQualities:
  - "peak, reinforcement, stability, revelation of strengths/flaws"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - candlelight
    - table
    - vessel
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward blessing, marking, remembering through candlelight, table, vessel."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Full Moon gives the ritual a source-backed timing accent."
  medium: "Full Moon can support this ritual by turning the practice toward peak, reinforcement, stability, revelation of strengths/flaws."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 106-107"
    - "timingFactKind: moon_phase"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.dark-moon

```yaml
id: timing-card.dominguez.dark-moon
label: "Dark Moon"
cardKind: moon_phase
timingFactKind: moon_phase
moonPhase: dark
phaseArc: resting
matchFacts:
  - factPath: moon.phase
    allowedValues: [dark, waning_crescent]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 107-108"
    supportKind: phase_framework
    claimBoundary: "This timing can gently shape a ritual toward releasing, steadying, remembering through vessel, words, body."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "receptivity, dissolution, inward essence, ending into transformation"
preferredRuntimePurposes:
    - releasing
    - steadying
    - remembering
preferredRuntimeCarriers:
    - vessel
    - words
    - body
symbolicPurposeQualities:
  - "receptivity, dissolution, inward essence, ending into transformation"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - vessel
    - words
    - body
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward releasing, steadying, remembering through vessel, words, body."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Dark Moon gives the ritual a source-backed timing accent."
  medium: "Dark Moon can support this ritual by turning the practice toward receptivity, dissolution, inward essence, ending into transformation."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 107-108"
    - "timingFactKind: moon_phase"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.quarter-moons

```yaml
id: timing-card.dominguez.quarter-moons
label: "Quarter Moons"
cardKind: timing_feature
timingFactKind: moon_phase
timingFeature: custom
featureFamily: "moon_phase_arc"
featureLabel: "Quarter Moon Turns"
matchFacts:
  - factPath: moon.phase
    allowedValues: [first_quarter, last_quarter]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 108"
    supportKind: phase_framework
    claimBoundary: "This timing can gently shape a ritual toward opening, releasing, marking through body, words, table."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "crisis/opportunity for change; breakthrough or resolving old circumstances"
preferredRuntimePurposes:
    - opening
    - releasing
    - marking
preferredRuntimeCarriers:
    - body
    - words
    - table
symbolicPurposeQualities:
  - "crisis/opportunity for change; breakthrough or resolving old circumstances"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - body
    - words
    - table
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward opening, releasing, marking through body, words, table."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Quarter Moons gives the ritual a source-backed timing accent."
  medium: "Quarter Moons can support this ritual by turning the practice toward crisis/opportunity for change; breakthrough or resolving old circumstances."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 108"
    - "timingFactKind: moon_phase"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.moon-sign-tone

```yaml
id: timing-card.dominguez.moon-sign-tone
label: "Moon Sign Tone"
cardKind: timing_feature
timingFactKind: custom
timingFeature: custom
featureFamily: "moon_sign"
featureLabel: "Moon Sign Tone"
matchFacts:
  - factPath: moon.sign
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 108-112"
    supportKind: source_note
    claimBoundary: "This timing can gently shape a ritual toward marking, tending, steadying through table, words, body."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "Moon sign as pervasive rhythm/caller that colors the rite"
preferredRuntimePurposes:
    - marking
    - tending
    - steadying
preferredRuntimeCarriers:
    - table
    - words
    - body
symbolicPurposeQualities:
  - "Moon sign as pervasive rhythm/caller that colors the rite"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - words
    - body
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward marking, tending, steadying through table, words, body."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Moon Sign Tone gives the ritual a source-backed timing accent."
  medium: "Moon Sign Tone can support this ritual by turning the practice toward Moon sign as pervasive rhythm/caller that colors the rite."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 108-112"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.void-moon

```yaml
id: timing-card.dominguez.void-moon
label: "Void-of-Course Moon"
cardKind: adaptation_rule
timingFactKind: void_moon
adaptationKind: void_moon
whenApplies:
  timingFacts: [moon.voidOfCourse]
adaptationMove: soften
explanationMove: "Void Moon timing softens the rite, reduces launch pressure, and favors small tending or completion."
matchFacts:
  - factPath: moon.voidOfCourse
    allowedValues: [true]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 112-114"
    supportKind: adaptation_rule
    claimBoundary: "This timing can gently shape a ritual toward steadying, remembering, releasing through words, vessel, table."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "coasting, off-course, less manifestation; useful for divination, fading, review, softening"
preferredRuntimePurposes:
    - steadying
    - remembering
    - releasing
preferredRuntimeCarriers:
    - words
    - vessel
    - table
symbolicPurposeQualities:
  - "coasting, off-course, less manifestation; useful for divination, fading, review, softening"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - words
    - vessel
    - table
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward steadying, remembering, releasing through words, vessel, table."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Void-of-Course Moon gives the ritual a source-backed timing accent."
  medium: "Void-of-Course Moon can support this ritual by turning the practice toward coasting, off-course, less manifestation; useful for divination, fading, review, softening."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 112-114"
    - "timingFactKind: void_moon"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.aspect-before-culmination

```yaml
id: timing-card.dominguez.aspect-before-culmination
label: "Aspect Before Culmination"
cardKind: timing_feature
timingFactKind: aspect_condition
timingFeature: aspect_condition
featureLabel: "Aspect Before Culmination"
matchFacts:
  - factPath: planetaryAspect.applying
    allowedValues: [true]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 10, PDF pp. 114-116"
    supportKind: ritual_timing_support
    claimBoundary: "This timing can gently shape a ritual toward marking, opening, tending through words, table."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "work before an aspect culminates; closer before peak is stronger"
preferredRuntimePurposes:
    - marking
    - opening
    - tending
preferredRuntimeCarriers:
    - words
    - table
symbolicPurposeQualities:
  - "work before an aspect culminates; closer before peak is stronger"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - words
    - table
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward marking, opening, tending through words, table."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Aspect Before Culmination gives the ritual a source-backed timing accent."
  medium: "Aspect Before Culmination can support this ritual by turning the practice toward work before an aspect culminates; closer before peak is stronger."
  debugEvidence:
    - "sourceLocation: Chapter 10, PDF pp. 114-116"
    - "timingFactKind: aspect_condition"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.retrograde-adaptation

```yaml
id: timing-card.dominguez.retrograde-adaptation
label: "Retrograde Adaptation"
cardKind: adaptation_rule
timingFactKind: retrograde
adaptationKind: retrograde
whenApplies:
  timingFacts: [planet.retrograde]
adaptationMove: use_foundation
explanationMove: "Retrograde timing shifts the rite toward review, foundations, retracing, and repair rather than panic or prohibition."
matchFacts:
  - factPath: planet.retrograde
    allowedValues: [true]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 11, PDF pp. 118-120"
    supportKind: adaptation_rule
    claimBoundary: "This timing can gently shape a ritual toward steadying, remembering, opening through words, table."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "review, foundations, retracing, hidden factors; not forward momentum"
preferredRuntimePurposes:
    - steadying
    - remembering
    - opening
preferredRuntimeCarriers:
    - words
    - table
symbolicPurposeQualities:
  - "review, foundations, retracing, hidden factors; not forward momentum"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - words
    - table
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward steadying, remembering, opening through words, table."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Retrograde Adaptation gives the ritual a source-backed timing accent."
  medium: "Retrograde Adaptation can support this ritual by turning the practice toward review, foundations, retracing, hidden factors; not forward momentum."
  debugEvidence:
    - "sourceLocation: Chapter 11, PDF pp. 118-120"
    - "timingFactKind: retrograde"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.imperfect-timing

```yaml
id: timing-card.dominguez.imperfect-timing
label: "Imperfect Timing"
cardKind: adaptation_rule
timingFactKind: imperfect_timing
adaptationKind: imperfect_timing
whenApplies:
  timingFacts: [fixed_timing, imperfect_timing, mixed_conditions]
adaptationMove: make_smaller
explanationMove: "Imperfect timing begins from available conditions and adjusts materials, pace, and emphasis instead of waiting for a perfect sky."
matchFacts:
  - factPath: timing.imperfect
    allowedValues: [true]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 11, PDF pp. 118-124"
    supportKind: adaptation_rule
    claimBoundary: "This timing can gently shape a ritual toward steadying, tending, marking through table, words, body."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "begin from available conditions, adjust details, use supportive cycles"
preferredRuntimePurposes:
    - steadying
    - tending
    - marking
preferredRuntimeCarriers:
    - table
    - words
    - body
symbolicPurposeQualities:
  - "begin from available conditions, adjust details, use supportive cycles"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - words
    - body
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward steadying, tending, marking through table, words, body."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Imperfect Timing gives the ritual a source-backed timing accent."
  medium: "Imperfect Timing can shape this ritual by beginning from available conditions and adjusting the details instead of waiting for perfect timing."
  debugEvidence:
    - "sourceLocation: Chapter 11, PDF pp. 118-124"
    - "timingFactKind: imperfect_timing"
    - "runtimeInfluenceEligible: false"
```

### timing-card.dominguez.magick-square-hold

```yaml
id: timing-card.dominguez.magick-square-hold
label: "Magick Square Hold"
cardKind: timing_feature
timingFactKind: custom
timingFeature: custom
featureFamily: "magick_square_specialized_review"
featureLabel: "Magick Square Hold"
matchFacts:
  - factPath: manualTimingFeature
    allowedValues: [magick_square]
    required: false
sourceGrounding:
  - packetId: packet.dominguez.practical_astrology.reextract
    sourceId: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS
    sourceGatePath: docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md
    sourceLocation: "Chapter 15 and Appendix C, PDF pp. 160-170 and appendices"
    supportKind: source_note
    claimBoundary: "This timing can gently shape a ritual toward marking, remembering through table, words."
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities:
  - "technical sigil construction from planetary squares is source-backed but held for specialized review"
preferredRuntimePurposes:
    - marking
    - remembering
preferredRuntimeCarriers:
    - table
    - words
symbolicPurposeQualities:
  - "technical sigil construction from planetary squares is source-backed but held for specialized review"
symbolicCarrierQualities:
  - "Use source-backed carriers only; do not invent a carrier because the timing sounds interesting."
softRitualShapeHints:
  actionVerbs:
    - "name"
    - "mark"
    - "adjust"
    - "place"
    - "close"
  materialHints:
    - table
    - words
  closureHints:
    - "Name what the timing changed about the ritual shape."
    - "Record the timing reason in the grimoire."
  capacityHints:
    low:
      - "Use one mark, one sentence, or one table object."
    steady:
      - "Add one source-backed timing accent."
    high:
      - "Use a fuller planning or observation cycle."
  audienceHints:
    me:
      - "Keep timing as personal ritual weather."
    both:
      - "Use timing to shape the shared table, not to diagnose the relationship."
explanationBoundaries:
  allowedPhrases:
    - "This timing can gently shape a ritual toward marking, remembering through table, words."
    - "This is timing support, not a command."
    - "This moment can shape the ritual without choosing it by itself."
  avoidClaims:
      - "do not use as a hard rule"
      - "do not make prediction, personality, medical, legal, financial, or relationship-compatibility claims"
      - "do not tell the user the sky forbids the ritual"
      - "do not override explicit user intent or capacity"
  deterministicRiskNotes:
    - "Timing cards are hints for selection and explanation; they are not recommendation logic."
whyThisMomentTemplate:
  short: "Magick Square Hold gives the ritual a source-backed timing accent."
  medium: "Magick Square Hold is held as source-backed technical material for specialized review; it should not shape normal ritual selection yet."
  debugEvidence:
    - "sourceLocation: Chapter 15 and Appendix C, PDF pp. 160-170 and appendices"
    - "timingFactKind: custom"
    - "runtimeInfluenceEligible: false"
```


## Review notes

- Planet-family cards should eventually be cross-checked against source packet candidate records and source gate limits.
- Moon-phase cards overlap with Moon Book but serve a different purpose: Dominguez contributes timing-use and adaptation logic, not devotional lunar-cycle structure.
- Moon sign cards should shape ritual tone only; they must not become horoscope/personality copy.
- Void Moon and retrograde cards should soften or redirect timing, not frighten the user or forbid ritual.
- Magick-square work remains held/source-note-only until a specialized review decides whether any of it belongs in runtime content.
