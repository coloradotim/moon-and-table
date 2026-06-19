# Source Packet: Dominguez, *Practical Astrology for Witches and Pagans* — Practical Astrology Ritual Candidates

## Packet metadata

- packet ID: `packet.dominguez.practical_astrology.reextract`
- issue: `#355`
- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- source gate: `docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md`
- source status: approved for extraction with limits
- extraction mode: canonical re-extraction from uploaded review PDF and source gate
- output status: extraction packet only; no runtime Ritual records, UI copy, selection logic, scoring, timing-card runtime data, or eligibility changes
- source text posture: no copied pathworkings, no copied tables, no copied technical procedures, no exact ritual scripts, no deterministic timing claims
- source PDF used: user-provided working PDF, `_OceanofPDF.com_Practical_Astrology_for_Witches_and_Pagans_-_Ivo_Dominguez.pdf`

## Scope and boundaries

This packet re-runs the Dominguez practical astrology extraction under the current canonical extraction model. The source is a timing-heavy astrology-for-magick source; many useful artifacts belong in timing/source-note cards rather than runtime Ritual candidates.

This packet preserves practical astrology mechanics where they can be made household-scale: glyphs as marks, planetary cards, planetary day/hour support, Moon phase direction, Moon sign tone, void Moon softening, aspect-before-culmination planning, retrograde foundation work, and adapting fixed ritual details to the sky available.

This packet does not make any candidate reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready. `approved_for_mechanical_import` means only that the packet block is complete enough for a later importer to mechanically create a draft Ritual record for human review.

## Source sections used

- Front matter and TOC, PDF pp. 1-6: source identity and chapter map.
- Chapter 1, PDF pp. 7-9: astrology as sacred symbolic language and applied ritual technology.
- Chapter 2, PDF pp. 10-17: sacred science, as above/so below, Celestial Temple pathworking; source-note only.
- Chapter 3, PDF pp. 18-28: planets/signs/houses/aspects as symbolic language; source-note scaffolding.
- Chapter 4, PDF pp. 29-45: planet-family logic, especially seven elder planets; timing-card source support.
- Chapters 5-7, PDF pp. 46-79: signs, houses, aspects; source-note/timing-card support, not horoscope copy.
- Chapter 8, PDF pp. 80-90: glyphs for magick, planetary attunement, seven-day planetary cycle, glyph marks.
- Chapter 9, PDF pp. 91-104: astrology of time, planetary days/hours, timing sequences.
- Chapter 10, PDF pp. 105-117: choosing timing by Moon phase, Moon sign, void Moon, aspects, retrogrades.
- Chapter 11, PDF pp. 118-125: adapting to imperfect or fixed timing.
- Chapters 12-17 and appendices, PDF pp. 126-194: aura, spirit work, magick squares, Great Year, correspondences; mostly source-note, hold, or later specialized review.

## Coverage and accounting metrics

```yaml
source_items_inventoried: 43
source_inventory_coverage_counts_nonexclusive:
  ritual_candidate_extract_now: 13
  timing_card_extract_now: 21
  source_note_or_boundary_record: 16
  context_only: 2
  hold_before_import: 2
  reject: 0
candidate_records:
  total: 14
  approved_for_mechanical_import: 13
  hold_before_import: 1
timing_card_records:
  total: 21
  draft_research_only: 21
source_note_coverage_records:
  total: 16
remaining_unreviewed_source_sections: "none within approved gate ranges for research extraction; ceremonial/spirit/magick-square lanes remain intentionally held from runtime import"
remaining_extraction_backlog: "runtime-ready planet-family Ritual variants, sign-family tone variants, magick-square specialized-review lane, spirit-work lane, and direct correspondence tables remain future product decisions rather than missing #355 extraction"
```

## Source rite / item inventory

| Source item ID | Source location | Disposition | Notes |
|---|---|---|---|
| `frontmatter` | PDF pp. 1-6 | `context_only` | publication/citation data only |
| `ch1.introduction` | PDF pp. 7-9 | `ritual_candidate_extract_now` + `source_note_or_boundary_record` | astrology as sacred symbolic language for magic; candidate 1 plus source-note coverage |
| `ch2.worldview` | PDF pp. 10-17 | `source_note_or_boundary_record` | sacred science, as above/so below, Celestial Temple pathworking held |
| `ch3.core-concepts` | PDF pp. 18-28 | `source_note_or_boundary_record` | planet/sign/house/aspect language framework |
| `ch4.planets-sun` | PDF pp. 29-30 | `timing_card_extract_now` | Sun family timing card and source-note support |
| `ch4.planets-moon` | PDF pp. 31-32 | `timing_card_extract_now` | Moon family timing card and source-note support |
| `ch4.planets-mercury` | PDF pp. 32-33 | `timing_card_extract_now` | Mercury family timing card and source-note support |
| `ch4.planets-venus` | PDF pp. 33-34 | `timing_card_extract_now` | Venus family timing card and source-note support |
| `ch4.planets-mars` | PDF pp. 34-35 | `timing_card_extract_now` | Mars family timing card and source-note support; care with power/adversarial framing |
| `ch4.planets-jupiter` | PDF pp. 35-36 | `timing_card_extract_now` | Jupiter family timing card and source-note support |
| `ch4.planets-saturn` | PDF pp. 36-37 | `timing_card_extract_now` | Saturn family timing card and source-note support |
| `ch4.outer-planets` | PDF pp. 37-45 | `source_note_or_boundary_record` | outer planet context not first runtime lane |
| `ch5.signs` | PDF pp. 46-60 | `source_note_or_boundary_record` | sign qualities as modifiers, not horoscope copy |
| `ch6.houses` | PDF pp. 61-72 | `source_note_or_boundary_record` | houses as arenas; not personality reading |
| `ch7.aspects` | PDF pp. 73-79 | `source_note_or_boundary_record` | aspect theory supports aspect timing card and boundaries |
| `ch8.glyphs-overview` | PDF pp. 80-84 | `ritual_candidate_extract_now` + `timing_card_extract_now` | glyphs as magical alphabet and simple scribing; candidate 2 plus glyph timing feature |
| `ch8.planetary-attunement` | PDF pp. 84-87 | `ritual_candidate_extract_now` | planetary card/day attunement |
| `ch8.seven-day-cycle` | PDF pp. 86-88 | `ritual_candidate_extract_now` | seven elder planets through week cycle |
| `ch8.glyphs-on-objects` | PDF pp. 87-88 | `ritual_candidate_extract_now` | glyphs on candles/objects/tools held household-scale |
| `ch8.bind-glyphs` | PDF pp. 88-89 | `source_note_or_boundary_record` | combined glyph mechanics inventoried; runtime ritual variant deferred for review |
| `ch8.sign-glyphs` | PDF pp. 89-90 | `source_note_or_boundary_record` | sign glyph circle support inventoried; ceremonial complexity deferred |
| `ch9.time-overview` | PDF pp. 91-97 | `source_note_or_boundary_record` + `timing_card_extract_now` | astrology of time and Qabala context; planetary day/hour cards |
| `ch9.planetary-hours` | PDF pp. 96-97 | `ritual_candidate_extract_now` + `timing_card_extract_now` | planetary hour and day support |
| `ch9.planetary-order` | PDF pp. 97-100 | `source_note_or_boundary_record` | cycle sequence source note; not first import |
| `ch9.star-of-time` | PDF pp. 100-104 | `source_note_or_boundary_record` | symbolic timing model; not runtime |
| `ch10.moon-phase` | PDF pp. 105-108 | `ritual_candidate_extract_now` + `timing_card_extract_now` | waxing/waning/full/dark/quarter timing logic |
| `ch10.moon-sign` | PDF pp. 108-112 | `ritual_candidate_extract_now` + `timing_card_extract_now` | Moon sign as tone/rhythm |
| `ch10.void-moon` | PDF pp. 112-114 | `ritual_candidate_extract_now` + `timing_card_extract_now` | void-of-course Moon adaptation/softening |
| `ch10.aspects` | PDF pp. 114-116 | `ritual_candidate_extract_now` + `timing_card_extract_now` | aspect before culmination timing window |
| `ch10.retrograde` | PDF pp. 116-117 | `ritual_candidate_extract_now` + `timing_card_extract_now` | retrograde timing support via Chapter 10 and Chapter 11 adaptation |
| `ch11.conditions-start` | PDF pp. 118-120 | `ritual_candidate_extract_now` + `timing_card_extract_now` | use available conditions as starting point |
| `ch11.change-details` | PDF pp. 120-122 | `ritual_candidate_extract_now` + `timing_card_extract_now` | change props/pacing/style when date cannot move |
| `ch11.cycle-correspondence` | PDF pp. 122-123 | `source_note_or_boundary_record` | day/moon/season/zodiac resonance; avoid over-systematizing |
| `ch11.planetary-hour-support` | PDF pp. 123-124 | `ritual_candidate_extract_now` + `timing_card_extract_now` | represent planetary hour physically/verbally/symbolically |
| `ch11.plane-casting` | PDF pp. 124-125 | `source_note_or_boundary_record` | planes/castings too ceremonial; source note only for now |
| `ch12.aura` | PDF pp. 126-142 | `source_note_or_boundary_record` | Moon sign/aura/body content; avoid medical/personality claims |
| `ch13.spirit-work` | PDF pp. 143-151 | `hold_before_import` + `source_note_or_boundary_record` | spirit work and ceremonial context outside current lane |
| `ch14.spiritual-evolution` | PDF pp. 152-160 | `source_note_or_boundary_record` | long-cycle context only |
| `ch15.magick-squares` | PDF pp. 160-170 | `hold_before_import` + `timing_card_extract_now` | magick-square sigil method held from runtime import; timing/source-note hold card included |
| `ch16.great-year` | PDF pp. 170-180 | `context_only` + `source_note_or_boundary_record` | large-cycle context only |
| `appendix-a` | Appendix A | `source_note_or_boundary_record` | planet/sign correspondences not copied as tables |
| `appendix-c` | Appendix C | `hold_before_import` + `source_note_or_boundary_record` | magick squares tables not imported/copied |
| `appendix-f` | Appendix F | `source_note_or_boundary_record` | Three Gates of the Moon context if later reviewed |

## Non-candidate extraction coverage

The source has more extractable ritual technology than can honestly become direct Ritual candidates in this first Dominguez packet. The table below records the non-candidate extraction decisions so "not a Ritual candidate" does not mean "not extracted."

| Coverage ID | Source location | Extracted as | Runtime posture | Boundary |
|---|---|---|---|---|
| `source-note.dominguez.worldview-sacred-science` | Chapter 2, PDF pp. 10-17 | source-note / boundary record | no runtime record | Use as metaphysical framing only; do not copy the Celestial Temple pathworking. |
| `source-note.dominguez.core-symbolic-language` | Chapter 3, PDF pp. 18-28 | source-note / boundary record | no runtime record | Planets, signs, houses, and aspects can structure timing interpretation; do not turn them into chart-reading copy. |
| `timing-card.dominguez.sun-family` | Chapter 4, PDF pp. 29-30 | timing/source-note card | draft research only | Sun family supports visible center, purpose, and integration without vitality guarantees or destiny claims. |
| `timing-card.dominguez.moon-family` | Chapter 4, PDF pp. 31-32 | timing/source-note card | draft research only | Moon family supports rhythm, memory, vessel, and reflection without mood prediction. |
| `timing-card.dominguez.mercury-family` | Chapter 4, PDF pp. 32-33 | timing/source-note card | draft research only | Mercury family supports naming, sorting, speech, and writing without communication-failure prediction. |
| `timing-card.dominguez.venus-family` | Chapter 4, PDF pp. 33-34 | timing/source-note card | draft research only | Venus family supports joining, beauty, sweetness, and affinity without love, attraction-control, or compatibility claims. |
| `timing-card.dominguez.mars-family` | Chapter 4, PDF pp. 34-35 | timing/source-note card | draft research only | Mars family supports heat, courage, severing, and directed force without violence, domination, or victory guarantees. |
| `timing-card.dominguez.jupiter-family` | Chapter 4, PDF pp. 35-36 | timing/source-note card | draft research only | Jupiter family supports blessing, breadth, law/order, and generosity without prosperity, luck, legal, or financial guarantees. |
| `timing-card.dominguez.saturn-family` | Chapter 4, PDF pp. 36-37 | timing/source-note card | draft research only | Saturn family supports boundary, time, weight, and structure without fear, punishment, or fatalism. |
| `source-note.dominguez.outer-planets` | Chapter 4, PDF pp. 37-45 | source-note / boundary record | no runtime record | Outer planets remain context for later research; not first-lane household timing. |
| `source-note.dominguez.signs-as-tone` | Chapter 5, PDF pp. 46-60 | source-note / boundary record plus Moon-sign timing card | no runtime record except draft timing-card hints | Signs may color ritual tone; they must not become personality or horoscope descriptions. |
| `source-note.dominguez.houses-as-arena` | Chapter 6, PDF pp. 61-72 | source-note / boundary record | no runtime record | Houses may describe arena or placement logic later; do not expose house interpretation as personal diagnosis. |
| `source-note.dominguez.aspect-theory` | Chapter 7, PDF pp. 73-79 | source-note / boundary record plus aspect timing card | draft research only | Aspects may shape timing windows and relational force between planets; no deterministic prediction. |
| `source-note.dominguez.bound-glyphs` | Chapter 8, PDF pp. 88-89 | source-note / boundary record | no runtime record | Combined glyph construction is inventoried but deferred until symbol-building review. |
| `source-note.dominguez.sign-glyph-circle` | Chapter 8, PDF pp. 89-90 | source-note / boundary record | no runtime record | Sign glyph circle support is too ceremonial for V1 import. |
| `source-note.dominguez.planetary-order` | Chapter 9, PDF pp. 97-100 | source-note / boundary record | no runtime record | Planetary sequence supports timing-card evidence; no table copy. |
| `source-note.dominguez.star-of-time` | Chapter 9, PDF pp. 100-104 | source-note / boundary record | no runtime record | Symbolic timing model only; Qabala/tree material is not imported into household ritual copy. |
| `source-note.dominguez.cycle-correspondence` | Chapter 11, PDF pp. 122-123 | source-note / boundary record | no runtime record | Day, Moon, season, and zodiac resonance can inform later timing cards; avoid correspondence-system sprawl. |
| `source-note.dominguez.plane-casting` | Chapter 11, PDF pp. 124-125 | source-note / boundary record | no runtime record | Plane/casting material is too ceremonial for this first import lane. |
| `source-note.dominguez.aura` | Chapter 12, PDF pp. 126-142 | source-note / boundary record | no runtime record | Aura/body material is non-medical context only; no diagnosis, healing, or body-claim language. |
| `source-note.dominguez.spirit-work-boundary` | Chapter 13, PDF pp. 143-151 | held boundary record | no runtime record | Spirit-work material is outside the current Moon & Table lane. |
| `source-note.dominguez.spiritual-evolution` | Chapter 14, PDF pp. 152-160 | source-note / boundary record | no runtime record | Long-cycle spiritual-development material remains context only. |
| `timing-card.dominguez.magick-square-hold` | Chapter 15 and Appendix C | timing/source-note hold card | draft research only; no runtime import | Magick-square tables and technical sigil procedure are inventoried but held from runtime use. |
| `source-note.dominguez.great-year` | Chapter 16, PDF pp. 170-180 | source-note / boundary record | no runtime record | Great Year material remains large-cycle context only. |
| `source-note.dominguez.appendix-correspondences` | Appendices A-F | source-note / boundary record | no runtime record | Correspondence tables and Three Gates material are not copied; use only for future cross-checking. |

## Candidate index

| # | Candidate ID | Title | Disposition | Import readiness |
|---:|---|---|---|---|
| 1 | `candidate.dominguez.astrology-journal-timing-record` | Keep the Timing in the Grimoire | `candidate_extract_now` | `approved_for_mechanical_import` |
| 2 | `candidate.dominguez.glyph-as-mark` | Trace One Planetary Glyph | `candidate_extract_now` | `approved_for_mechanical_import` |
| 3 | `candidate.dominguez.planetary-card-attunement` | Set the Planetary Card | `candidate_extract_now` | `approved_for_mechanical_import` |
| 4 | `candidate.dominguez.seven-day-planetary-cycle` | Seven-Day Planetary Round | `candidate_extract_now` | `approved_for_mechanical_import` |
| 5 | `candidate.dominguez.planetary-hour-support` | Add the Planetary Hour | `candidate_extract_now` | `approved_for_mechanical_import` |
| 6 | `candidate.dominguez.moon-phase-timing-check` | Choose the Moon’s Direction | `candidate_extract_now` | `approved_for_mechanical_import` |
| 7 | `candidate.dominguez.moon-sign-tone` | Let the Moon Sign Set the Tone | `candidate_extract_now` | `approved_for_mechanical_import` |
| 8 | `candidate.dominguez.void-moon-softening` | Soften the Void Moon | `candidate_extract_now` | `approved_for_mechanical_import` |
| 9 | `candidate.dominguez.aspect-before-peak` | Work Before the Aspect Peaks | `candidate_extract_now` | `approved_for_mechanical_import` |
| 10 | `candidate.dominguez.retrograde-foundation` | Use Retrograde for the Foundations | `candidate_extract_now` | `approved_for_mechanical_import` |
| 11 | `candidate.dominguez.change-details-not-date` | Change the Details, Not the Date | `candidate_extract_now` | `approved_for_mechanical_import` |
| 12 | `candidate.dominguez.conditions-as-outline` | Use the Conditions as the Outline | `candidate_extract_now` | `approved_for_mechanical_import` |
| 13 | `candidate.dominguez.planetary-representation` | Give the Planet a Small Body | `candidate_extract_now` | `approved_for_mechanical_import` |
| 14 | `candidate.dominguez.magick-square-focal-note` | Name the Square, Hold the Sigil | `hold_before_import` | `hold_before_import` |

## Candidate records

### `candidate.dominguez.astrology-journal-timing-record` — Keep the timing beside the work.

- candidate ID: `candidate.dominguez.astrology-journal-timing-record`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Keep the timing beside the work.

#### Ritual body / practice

Open the grimoire or ritual notebook before choosing a working. Write the date, the visible timing facts you are using, and the reason those facts matter for this rite. Choose one timing signal to guide the work, then close the notebook until after the ritual.

#### Intention

Let astrology shape the ritual without turning the ritual into a horoscope.

#### Best window

Before selecting or beginning a timed ritual.

#### Question to carry

Which timing fact is actually shaping this work, and which facts are only noise?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for meaning, source backing, or timing clarity"
    - "low capacity: one notebook action"
    - "works for solo or shared planning"
    - "keeps computed timing in a source-backed role"
  timingHooks:
    - "any computed timing review; pre-ritual planning"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: table; household-scale materials only."
  sourceBackedRationale:
    - "Introduction and Chapter 1, PDF pp. 7-9; source frames astrology as a sacred symbolic language useful for magickal practice and recommends journaling/questions while learning."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:remembering"
    - "carrier:words"
    - "source signal: astrology as applied symbolic language"
    - "exclusion: not chart reading or personality interpretation"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Keep the Timing in the Grimoire"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "any computed timing review; pre-ritual planning"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Introduction and Chapter 1, PDF pp. 7-9
- source basis: Introduction and Chapter 1, PDF pp. 7-9; source frames astrology as a sacred symbolic language useful for magickal practice and recommends journaling/questions while learning.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: remembering
    secondary: ["marking"]
    refinement: "Dominguez practical astrology: Keep the Timing in the Grimoire."
  carriers:
    primary: words
    secondary: ["table"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: helpful
    contexts: ["any computed timing review", "pre-ritual planning"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - remembering
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.glyph-as-mark` — Trace one planetary mark cleanly.

- candidate ID: `candidate.dominguez.glyph-as-mark`
- disposition: `candidate_extract_now`
- ritualizationType: `direct_source_ritual`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Trace one planetary mark cleanly.

#### Ritual body / practice

Choose one planet whose quality belongs to the work. Draw its glyph slowly on paper, on an index card, or in the air over the table. Say the planet name once as identification, not invocation. Set the mark beside the ritual object and let it define the tone of the rite.

#### Intention

Use a single astrological glyph as a focused ritual mark.

#### Best window

When a ritual needs one clear planetary emphasis.

#### Question to carry

What power is this mark holding, and where should it stop?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for one symbol or mark"
    - "material/place fit: paper, hand, table"
    - "timing can select the planet but does not have to"
    - "keeps glyph work household-scale"
  timingHooks:
    - "planetary day; planetary hour; planet family chosen by source logic"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: table, body; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 8, PDF pp. 80-84; source teaches astrological glyphs as a magical alphabet and gives a simple five-step glyph-scribing method."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking"
    - "carrier:words/table"
    - "source signal:glyphs as magical alphabet"
    - "exclusion: no technical talisman construction"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Trace One Planetary Glyph"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "planetary day; planetary hour; planet family chosen by source logic"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 8, PDF pp. 80-84
- source basis: Chapter 8, PDF pp. 80-84; source teaches astrological glyphs as a magical alphabet and gives a simple five-step glyph-scribing method.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["opening"]
    refinement: "Dominguez practical astrology: Trace One Planetary Glyph."
  carriers:
    primary: words
    secondary: ["table", "body"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: helpful
    contexts: ["planetary day", "planetary hour", "planet family chosen by source logic"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.planetary-card-attunement` — Set the day’s planet on the table.

- candidate ID: `candidate.dominguez.planetary-card-attunement`
- disposition: `candidate_extract_now`
- ritualizationType: `direct_source_ritual`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Set the day’s planet on the table.

#### Ritual body / practice

Make or choose one small card for the planet of the day. Place it on the table or altar. Trace the glyph with your finger. Name what you notice in the card, then close your eyes and hold its image briefly. Leave the card visible for the day or return it to the grimoire.

#### Intention

Practice relationship with planetary timing through one visible card.

#### Best window

On the day ruled by the planet, near morning or before a related rite.

#### Question to carry

What did this planet make easier to notice today?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for repeated practice"
    - "timing hook: planetary day"
    - "low/steady capacity: card plus observation"
    - "good grimoire follow-up"
  timingHooks:
    - "planetary day"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: words; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 8, PDF pp. 84-87; source gives a seven-day planetary attunement exercise using planetary cards, daily meditation, tracing the glyph, and observation."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:remembering/tending"
    - "carrier:table"
    - "source signal: planetary attunement exercise"
    - "exclusion: no incense/herb additions required"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Set the Planetary Card"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "planetary day"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 8, PDF pp. 84-87
- source basis: Chapter 8, PDF pp. 84-87; source gives a seven-day planetary attunement exercise using planetary cards, daily meditation, tracing the glyph, and observation.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: remembering
    secondary: ["marking", "tending"]
    refinement: "Dominguez practical astrology: Set the Planetary Card."
  carriers:
    primary: table
    secondary: ["words"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: preferred
    contexts: ["planetary day"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - remembering
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.seven-day-planetary-cycle` — Move once through the seven lights.

- candidate ID: `candidate.dominguez.seven-day-planetary-cycle`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Move once through the seven lights.

#### Ritual body / practice

Choose one simple card, mark, candle color, or table object for each of the seven elder planets. Each day, place that day’s planet at the center, trace its glyph, and write one line about where that quality appeared. At the end of seven days, gather the cards and name the pattern you saw.

#### Intention

Let a week become a planetary teaching cycle.

#### Best window

Begin on any day when seven days of observation are realistic.

#### Question to carry

Which planet kept returning, and which one asked for more attention?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for repeated pattern or practice arc"
    - "timing hook: seven days/planetary days"
    - "material fit: cards, table, optional candle"
    - "keeps source’s cycle structure"
  timingHooks:
    - "seven-day planetary sequence; planetary days"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: words, candlelight; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 8, PDF pp. 84-88; source recommends a seven-day planetary attunement cycle and notes seven-day patterns invoke the seven elder planets."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:tending"
    - "carrier:table/words"
    - "source signal: seven-day attunement"
    - "exclusion: not direct candle spellcraft"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Seven-Day Planetary Round"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "seven-day planetary sequence; planetary days"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 8, PDF pp. 84-88
- source basis: Chapter 8, PDF pp. 84-88; source recommends a seven-day planetary attunement cycle and notes seven-day patterns invoke the seven elder planets.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: tending
    secondary: ["remembering", "marking"]
    refinement: "Dominguez practical astrology: Seven-Day Planetary Round."
  carriers:
    primary: table
    secondary: ["words", "candlelight"]
  capacity:
    supports: ["enough_to_participate", "room_for_something_deeper"]
    default: enough_to_participate
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: preferred
    contexts: ["seven-day planetary sequence", "planetary days"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - tending
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.planetary-hour-support` — Let the hour lend one color.

- candidate ID: `candidate.dominguez.planetary-hour-support`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Let the hour lend one color.

#### Ritual body / practice

Look up the planetary hour for the chosen ritual time. If the hour supports the work, place one matching mark, color, object, or word at the table. If it does not support the work, do not force it; write that the hour is background weather and proceed with the stronger ritual purpose.

#### Intention

Use planetary hour as support, not command.

#### Best window

When a ritual time is known and the planetary hour is available.

#### Question to carry

Is this hour helping the ritual, or should it stay in the background?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for timing without overcomplication"
    - "timing hook: planetary hour"
    - "source says hour can add a planetary quality"
    - "keeps timing as soft support"
  timingHooks:
    - "planetary hour; planetary day plus hour"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: words, candlelight; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 9, PDF pp. 91-97 and Chapter 11, PDF pp. 123-124; source explains planetary hours and recommends physical representations, verbal calls, and symbolic marks to access planetary-hour support."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking/steadying"
    - "carrier:table"
    - "source signal: government of hours"
    - "exclusion: no hard electional rule"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Add the Planetary Hour"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "planetary hour; planetary day plus hour"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 9, PDF pp. 91-97 and Chapter 11, PDF pp. 123-124
- source basis: Chapter 9, PDF pp. 91-97 and Chapter 11, PDF pp. 123-124; source explains planetary hours and recommends physical representations, verbal calls, and symbolic marks to access planetary-hour support.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["steadying"]
    refinement: "Dominguez practical astrology: Add the Planetary Hour."
  carriers:
    primary: table
    secondary: ["words", "candlelight"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: preferred
    contexts: ["planetary hour", "planetary day plus hour"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.moon-phase-timing-check` — Choose whether the Moon is building or releasing.

- candidate ID: `candidate.dominguez.moon-phase-timing-check`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Choose whether the Moon is building or releasing.

#### Ritual body / practice

Before the ritual, name whether the Moon is waxing, waning, full, dark, or at a quarter turn. Match the action to that direction: build, reinforce, dissolve, or change course. If the ritual’s purpose does not match the phase, keep the purpose and adjust the action so it works with the available Moon.

#### Intention

Let the Moon phase shape the action without ruling the choice.

#### Best window

Before any lunar-shaped ritual or recommendation explanation.

#### Question to carry

Is this rite building, revealing, dissolving, or changing direction?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for lunar timing"
    - "timing hook: Moon phase"
    - "supports choose-with-me explanation later"
    - "turns phase into ritual shape, not command"
  timingHooks:
    - "moon phase; waxing moon; waning moon; full moon; dark moon; quarter moon"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: table, body; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 10, PDF pp. 105-108; source presents Moon phase as the first and simplest timing consideration, with waxing for increase/growth, waning for banish/diminish/transform, and full/dark/quarter phases as special conditions."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking/timing"
    - "carrier:words"
    - "source signal: Moon phase choosing"
    - "exclusion: no deterministic phase rule"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Choose the Moon’s Direction"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "moon phase; waxing moon; waning moon; full moon; dark moon; quarter moon"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 10, PDF pp. 105-108
- source basis: Chapter 10, PDF pp. 105-108; source presents Moon phase as the first and simplest timing consideration, with waxing for increase/growth, waning for banish/diminish/transform, and full/dark/quarter phases as special conditions.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["opening", "releasing", "steadying"]
    refinement: "Dominguez practical astrology: Choose the Moon’s Direction."
  carriers:
    primary: words
    secondary: ["table", "body"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: preferred
    contexts: ["new moon", "waxing moon", "waning moon", "full moon", "dark moon", "quarter moon"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.moon-sign-tone` — Let the Moon’s sign choose the accent.

- candidate ID: `candidate.dominguez.moon-sign-tone`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Let the Moon’s sign choose the accent.

#### Ritual body / practice

Look up the Moon’s sign. Choose one tone from that sign—beauty, detail, hearth, courage, depth, structure, dream, or another source-supported quality. Add that tone through one material, one word, or one gesture. Do not change the ritual’s purpose; let the sign color how it is done.

#### Intention

Use Moon sign as tone and rhythm, not fate.

#### Best window

When the Moon sign is known and a ritual can be gently styled.

#### Question to carry

What accent does this sign add without taking over?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks why this moment changes the style"
    - "timing hook: Moon sign"
    - "keeps sign as accent not prediction"
    - "fits table/word/material selection"
  timingHooks:
    - "moon sign; sign qualities"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: words, body; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 10, PDF pp. 108-112; source describes Moon sign as a broad rhythm that shapes action and gives brief qualities for all twelve signs."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking/tending"
    - "carrier:table/words"
    - "source signal: Moon sign rhythm"
    - "exclusion: no personality horoscope"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Let the Moon Sign Set the Tone"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "moon sign; sign qualities"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 10, PDF pp. 108-112
- source basis: Chapter 10, PDF pp. 108-112; source describes Moon sign as a broad rhythm that shapes action and gives brief qualities for all twelve signs.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["tending", "steadying"]
    refinement: "Dominguez practical astrology: Let the Moon Sign Set the Tone."
  carriers:
    primary: table
    secondary: ["words", "body"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: helpful
    contexts:
      - "moon in Aries"
      - "moon in Taurus"
      - "moon in Gemini"
      - "moon in Cancer"
      - "moon in Leo"
      - "moon in Virgo"
      - "moon in Libra"
      - "moon in Scorpio"
      - "moon in Sagittarius"
      - "moon in Capricorn"
      - "moon in Aquarius"
      - "moon in Pisces"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.void-moon-softening` — Let the void Moon make the rite smaller.

- candidate ID: `candidate.dominguez.void-moon-softening`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Let the void Moon make the rite smaller.

#### Ritual body / practice

If the Moon is void-of-course, choose a softer form of the ritual. Favor divination, review, dream, release, quiet disclosure, or a contained symbolic action. Avoid treating the void as failure. Close by naming what may fade and what should wait for firmer timing.

#### Intention

Work with an unsteered Moon by softening the ritual’s ambition.

#### Best window

During a void-of-course Moon when the ritual should still proceed.

#### Question to carry

What should be allowed to drift, and what should wait?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "timing hook: void Moon"
    - "low capacity: smaller/softer form"
    - "keeps ritual possible without alarm"
    - "prevents hard no-go timing"
  timingHooks:
    - "void-of-course moon"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: vessel, table; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 10, PDF pp. 112-114; source distinguishes mundane cautions from magical uses and notes void Moon can support divination, journeying, regression, fading-away, and stealth/low-course actions while weakening manifestation and some boundaries."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:steadying/releasing"
    - "carrier:words/vessel"
    - "source signal: void-of-course Moon"
    - "exclusion: no anxiety-producing warning"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Soften the Void Moon"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "void-of-course moon"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 10, PDF pp. 112-114
- source basis: Chapter 10, PDF pp. 112-114; source distinguishes mundane cautions from magical uses and notes void Moon can support divination, journeying, regression, fading-away, and stealth/low-course actions while weakening manifestation and some boundaries.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: steadying
    secondary: ["remembering", "releasing"]
    refinement: "Dominguez practical astrology: Soften the Void Moon."
  carriers:
    primary: words
    secondary: ["vessel", "table"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: required
    contexts: ["void-of-course moon"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - steadying
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.aspect-before-peak` — Begin while the aspect is still building.

- candidate ID: `candidate.dominguez.aspect-before-peak`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Begin while the aspect is still building.

#### Ritual body / practice

When using an aspect for ritual timing, identify the faster planet and the exact peak time. Schedule the ritual before culmination, close to the peak if practical. In the grimoire, write the two planets, the aspect, and the ritual quality you are using.

#### Intention

Use aspect timing as a building current rather than an afterthought.

#### Best window

Before a selected planetary aspect culminates.

#### Question to carry

What is still building, and what should not be started after it peaks?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "timing hook: aspect weather"
    - "source supports before-peak timing"
    - "works as planning/grimoire practice"
    - "not a compatibility/personality claim"
  timingHooks:
    - "planetary aspect; applying aspect; before culmination"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: table; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 10, PDF pp. 114-116; source says workings using aspects should occur before the aspect peaks and that the faster planet determines the window of opportunity."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking/opening"
    - "carrier:words/table"
    - "source signal: aspect timing before culmination"
    - "exclusion: no relationship prediction"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Work Before the Aspect Peaks"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "planetary aspect; applying aspect; before culmination"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 10, PDF pp. 114-116
- source basis: Chapter 10, PDF pp. 114-116; source says workings using aspects should occur before the aspect peaks and that the faster planet determines the window of opportunity.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["opening", "tending"]
    refinement: "Dominguez practical astrology: Work Before the Aspect Peaks."
  carriers:
    primary: words
    secondary: ["table"]
  capacity:
    supports: ["enough_to_participate", "room_for_something_deeper"]
    default: enough_to_participate
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: required
    contexts: ["applying planetary aspect", "before culmination"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.retrograde-foundation` — Turn retrograde toward the foundations.

- candidate ID: `candidate.dominguez.retrograde-foundation`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Turn retrograde toward the foundations.

#### Ritual body / practice

If a related planet is retrograde and the work cannot wait, shift the ritual toward review, preparation, retracing, foundations, or visioning. Write what will be prepared now and what will wait for forward motion. Close by placing one tool or note where it can be returned to later.

#### Intention

Let retrograde timing support review and foundations instead of false forward motion.

#### Best window

When a related planet is retrograde and the work still needs a ritual form.

#### Question to carry

What can be prepared now, and what should not be forced yet?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "timing hook: retrograde"
    - "supports review/return rather than panic"
    - "keeps work possible but reframed"
    - "fits grimoire/table action"
  timingHooks:
    - "retrograde planet; imperfect timing adaptation"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: table; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 11, PDF pp. 118-120; source says retrogrades are weak for forward momentum but useful for carefully crafted foundations, retracing steps, visioning, brainstorming, purification, and uncovering underlying factors."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:steadying/remembering"
    - "carrier:words/table"
    - "source signal: retrograde adaptation"
    - "exclusion: no deterministic do-not-do claim"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Use Retrograde for the Foundations"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "retrograde planet; imperfect timing adaptation"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 11, PDF pp. 118-120
- source basis: Chapter 11, PDF pp. 118-120; source says retrogrades are weak for forward momentum but useful for carefully crafted foundations, retracing steps, visioning, brainstorming, purification, and uncovering underlying factors.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: steadying
    secondary: ["remembering", "opening"]
    refinement: "Dominguez practical astrology: Use Retrograde for the Foundations."
  carriers:
    primary: words
    secondary: ["table"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: helpful
    contexts:
      - "Mercury retrograde"
      - "Venus retrograde"
      - "Mars retrograde"
      - "Jupiter retrograde"
      - "Saturn retrograde"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - steadying
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.change-details-not-date` — Adjust the table to the sky you have.

- candidate ID: `candidate.dominguez.change-details-not-date`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Adjust the table to the sky you have.

#### Ritual body / practice

When the date cannot change, look at the strongest available timing signal. Adjust emphasis, rhythm, pacing, props, colors, flowers, tablecloth, words, or style so the ritual leans with the moment. Keep the original purpose intact and make only one or two changes.

#### Intention

Let astrology shape the ritual details without overtaking the ritual.

#### Best window

When a ritual must happen at a fixed time.

#### Question to carry

What small detail would let this ritual move with the weather?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for doable adaptation"
    - "timing hook: imperfect/fixed timing"
    - "table/carrier fit: props and presentation"
    - "low-overwhelm adjustment"
  timingHooks:
    - "fixed timing; imperfect timing; Moon sign; aspect condition"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: words, body; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 11, PDF pp. 120-122; source recommends changing emphasis, rhythm, pacing, ritual props, and presentation style to align with available astrological conditions when timing cannot be changed."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:tending/marking"
    - "carrier:table"
    - "source signal: changing ritual details"
    - "exclusion: no full electional rescheduling"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Change the Details, Not the Date"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "fixed timing; imperfect timing; Moon sign; aspect condition"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 11, PDF pp. 120-122
- source basis: Chapter 11, PDF pp. 120-122; source recommends changing emphasis, rhythm, pacing, ritual props, and presentation style to align with available astrological conditions when timing cannot be changed.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: tending
    secondary: ["marking", "steadying"]
    refinement: "Dominguez practical astrology: Change the Details, Not the Date."
  carriers:
    primary: table
    secondary: ["words", "body"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: helpful
    contexts:
      - "exact timing not required"
      - "new moon"
      - "full moon"
      - "moon in Cancer"
      - "Mercury retrograde"
      - "Venus trine Mars"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - tending
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.conditions-as-outline` — Let the timing give you an outline.

- candidate ID: `candidate.dominguez.conditions-as-outline`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Let the timing give you an outline.

#### Ritual body / practice

When you are out of ideas, list the Moon phase, Moon sign, active aspects, retrogrades, and planetary day or hour. Choose one or two that matter most. Turn them into an outline: one opening, one material gesture, one sentence, and one close.

#### Intention

Use the astrological atmosphere as a creative constraint.

#### Best window

When a regular ritual or gathering needs a shape and the timing is already set.

#### Question to carry

What is the sky already asking this ritual to include?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "check-in asks for ritual shape from timing"
    - "timing hook: multiple computed facts"
    - "works for scheduled practice"
    - "good bridge to Choose with me explanation"
  timingHooks:
    - "current astrological conditions; scheduled ritual"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: words; secondary carriers: table; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 11, PDF pp. 118-120; source recommends looking up Moon sign/phase, aspects, retrogrades, and other conditions for a planned gathering, then using the atmosphere as an outline of ideas or components."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:opening/marking"
    - "carrier:words/table"
    - "source signal: conditions as starting point"
    - "exclusion: not horoscope copy"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Use the Conditions as the Outline"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "current astrological conditions; scheduled ritual"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 11, PDF pp. 118-120
- source basis: Chapter 11, PDF pp. 118-120; source recommends looking up Moon sign/phase, aspects, retrogrades, and other conditions for a planned gathering, then using the atmosphere as an outline of ideas or components.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: opening
    secondary: ["marking", "tending"]
    refinement: "Dominguez practical astrology: Use the Conditions as the Outline."
  carriers:
    primary: words
    secondary: ["table"]
  capacity:
    supports: ["enough_to_participate", "room_for_something_deeper"]
    default: enough_to_participate
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: helpful
    contexts: ["current astrological conditions", "scheduled ritual"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - opening
    - words
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.planetary-representation` — Give the planet a small body on the table.

- candidate ID: `candidate.dominguez.planetary-representation`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Give the planet a small body on the table.

#### Ritual body / practice

Choose one physical representation for the planetary power you want to support the ritual: a glyph card, color, stone, metal, written word, or simple object. Place it beside the candle or central object. Name the quality it contributes, then remove it when the ritual is complete.

#### Intention

Anchor timing support in a visible household object.

#### Best window

During a planetary day, planetary hour, or planet-family ritual.

#### Question to carry

What quality does this object carry, and when should it leave?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "timing hook: planetary family/hour"
    - "material fit: simple object"
    - "keeps timing visible"
    - "avoids technical sigil/magick square procedure"
  timingHooks:
    - "planetary day; planetary hour; planet family"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: candlelight, words, vessel; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 11, PDF pp. 123-124 and Chapter 8, PDF pp. 87-88; source recommends physical representations, verbal calls, symbolic marks, and glyphs as supports for planetary hours and planetary work."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking/blessing"
    - "carrier:table"
    - "source signal: physical representation of planetary power"
    - "exclusion: no wholesale correspondence table import"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Give the Planet a Small Body"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "planetary day; planetary hour; planet family"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 11, PDF pp. 123-124 and Chapter 8, PDF pp. 87-88
- source basis: Chapter 11, PDF pp. 123-124 and Chapter 8, PDF pp. 87-88; source recommends physical representations, verbal calls, symbolic marks, and glyphs as supports for planetary hours and planetary work.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["blessing", "steadying"]
    refinement: "Dominguez practical astrology: Give the Planet a Small Body."
  carriers:
    primary: table
    secondary: ["candlelight", "words", "vessel"]
  capacity:
    supports: ["only_a_little", "enough_to_participate"]
    default: only_a_little
  audience:
    supports: ["me", "both_of_us"]
    default: me
  timing:
    relationship: preferred
    contexts: ["planetary day", "planetary hour", "planet family"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```

### `candidate.dominguez.magick-square-focal-note` — Hold the planetary square as a later source-note lane.

- candidate ID: `candidate.dominguez.magick-square-focal-note`
- disposition: `hold_before_import`
- ritualizationType: `metadata_symbolism_only`
- import readiness label: `hold_before_import`

#### Headline

Hold the planetary square as a later source-note lane.

#### Ritual body / practice

Do not import this as a runtime ritual yet. Keep magick-square work as a source-note/specialized-review lane until technical procedure, tables, copyright boundaries, and symbol creation are reviewed.

#### Intention

Prevent technical talisman work from becoming casual app content.

#### Best window

Later specialized review only.

#### Question to carry

Is this a household mark, or a technical talismanic method?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "source has important technical method but not first import"
    - "copyright/table procedure risk"
    - "talisman complexity"
    - "needs specialized review"
  timingHooks:
    - "magick square; specialized review only"
  lunarPlanetarySeasonalHooks:
    - "Use only source-backed timing facts already computed by the app; do not calculate astrology inside the Ritual."
  capacityHooks:
    - "Capacity support comes from the number of steps and required planning in this candidate."
  audienceHooks:
    - "Audience support is limited to what the candidate's structure can honestly carry."
  materialPlaceCarrierPurposeFit:
    - "Primary carrier: table; secondary carriers: words; household-scale materials only."
  sourceBackedRationale:
    - "Chapter 15 and Appendix C, PDF pp. 152-170 and appendices; source gives magick-square history, squares, and sigil-construction procedure."
  notForOrHoldNotes:
    - "No horoscope, personality, relationship-compatibility, medical, legal, financial, or deterministic claims."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:marking"
    - "carrier:table"
    - "source signal: magick squares"
    - "exclusion: not import-ready"
  secondarySelectionSignals:
    - "source ID: SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS"
    - "candidate title: Name the Square, Hold the Sigil"
  exclusionSignals:
    - "exclude if the request requires a prediction, personality reading, compatibility claim, medical advice, or hard timing rule"
  timingSignal:
    - "magick square; specialized review only"
  confidenceNotes:
    - "Runtime import still requires mechanical import review and later direct-use/recommendation review."
```

#### Source grounding

- source ID: `SRC-ASTROLOGY-DOMINGUEZ-PRACTICAL-ASTROLOGY-WITCHES-PAGANS`
- citation label: Ivo Dominguez Jr., Practical Astrology for Witches and Pagans: Using the Planets and the Stars for Effective Spellwork, Rituals, and Magick. Weiser Books / Red Wheel/Weiser, 2016.
- source location: Chapter 15 and Appendix C, PDF pp. 152-170 and appendices
- source basis: Chapter 15 and Appendix C, PDF pp. 152-170 and appendices; source gives magick-square history, squares, and sigil-construction procedure.
- source transformation: Converted source timing/glyph mechanics into a small household ritual form without copying long procedures, tables, or pathworking text.
- excluded source material: no copied pathworkings, no copied tables, no technical magick-square procedure, no deterministic interpretation.

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: marking
    secondary: ["remembering"]
    refinement: "Dominguez practical astrology: Name the Square, Hold the Sigil."
  carriers:
    primary: table
    secondary: ["words"]
  capacity:
    supports: ["room_for_something_deeper"]
    default: room_for_something_deeper
  audience:
    supports: ["me"]
    default: me
  timing:
    relationship: none
    contexts: ["magick square", "specialized review only"]
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability

```yaml
availability:
  findable: false
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - dominguez
    - astrology
    - timing
    - marking
    - table
  keywords:
    - "astrology"
    - "timing"
    - "glyph"
    - "planetary"
    - "moon"
  materials:
    - "paper"
    - "pen"
    - "table"
  places:
    - "table"
    - "altar"
    - "ritual notebook"
  sourceLabel: "Ivo Dominguez Jr., Practical Astrology for Witches and Pagans"
  originLabel: source
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "Research-only candidate. Not reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready."
    - "Keep timing symbolic and source-backed; do not convert into prediction or hard rule."
```

#### Adaptation policy notes

- The candidate preserves source timing, glyph, or adaptation mechanics first.
- Runtime import must mechanically import the candidate wording above or skip the candidate if the packet is judged incomplete.
- No user-facing ritual words are hidden in metadata.

#### Operative words metadata

```yaml
ritualWords: []
operativeWordsNotes:
  status: functional_instruction_only
  reason: "This candidate uses functional instructions rather than source-provided spell wording."
```


## Variant and split notes

### Planet family timing

Planet-family logic is best handled primarily in the timing-card artifact. Runtime Ritual candidates should not multiply into one ritual per planet unless the source provides a household-scale practice form. The seven-day planetary cycle and planetary-card attunement candidates are sufficient first Ritual forms.

### Moon sign timing

Moon sign timing is source-backed but should usually shape tone and material style rather than produce twelve separate runtime rituals. The timing-card artifact contains sign-family cards.

### Magick squares

Magick-square and planetary-square material is intentionally held from first mechanical import. It can produce source notes and specialized-review prompts later, but not public runtime tables or technical talisman procedures.

### Aspect weather

Aspects are better modeled as timing cards and selector explanation inputs. The one importable ritual candidate here is a planning/grimoire practice for using an aspect before culmination.

## Held / later / source-note leads

| Lead | Disposition | Reason |
|---|---|---|
| Celestial Temple full pathworking | hold | long guided visualization; do not reproduce |
| Full planetary correspondences | source_note_or_boundary_record | useful for source-backed meaning, not copied tables |
| Sign-by-sign personality interpretation | source_note_or_boundary_record / hold | horoscope/personality drift risk |
| House interpretation as life prediction | source_note_or_boundary_record / hold | not product lane |
| Magick-square sigil procedure | timing_card_extract_now / hold_before_import | technical talismanic method and table copyright/procedure risk |
| Spirit-work astrology | hold | ceremonial/spirit-work gate needed |
| Aura/Moon-sign body claims | source_note_or_boundary_record / hold | avoid medical/personality claims |
| Electional exact chart method | source_note_or_boundary_record | too complex for first import; timing cards can hold soft rules |
| Retrograde as prohibition | reject conceptually | source supports adaptation, not panic or no-go rules |

## Duplicate / relationship check

| Area | Relationship |
|---|---|
| Moon phase timing | Complementary to Moon Book; Dominguez adds timing/use rules, quarter/dark/full distinctions, void Moon, aspect timing. |
| Planetary timing | Primary source for planetary day/hour and planet-family ritual-shape cards. |
| Glyphs and symbolic marks | Distinct from Buckland candle work and household table rites; Dominguez supports glyph-as-mark. |
| Timing adaptation | Strong unique source contribution: adapt to the conditions available rather than waiting for perfect timing. |

## Final checklist

- Source-accounting inventory present: yes.
- Every inventoried item has a disposition: yes.
- Accepted candidates use full canonical records: yes.
- Runtime enum values checked against `src/data/rituals/types.ts`: yes.
- Operative words are functional-instruction only unless later reviewed: yes.
- No private-source-excerpt/private-wording/Moon & Table line language: yes.
- No runtime Ritual records created: yes.
- No direct-use/recommendation eligibility changed: yes.
- Timing-card artifact required by #355: see `docs/research/timing-cards/dominguez-astrology-timing-cards.md`.
