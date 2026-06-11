# Moon Book lunar timing source-note cards

Status: draft research artifact for issue #349.

Source: Sarah Faith Gottesdiener, *The Moon Book: Lunar Magic to Change Your Life*, St. Martin's Essentials, 2020.

Packet feed: `docs/research/ritual-candidates/packet-moon-book-lunar-cycle.md`

Source ID: `SRC-MOD-MOON-GOTTESDIENER-2020`

This file follows the #318 timing/source-note card model. It is research content only. It does not create runtime data, scoring logic, SourceNotes, SymbolicCards, RitualPatterns, UI copy, or recommendation behavior.

## Product boundary

Computed lunar facts do not create symbolic meaning by themselves. These cards provide source-backed timing interpretation that may later feed explanation and selection as **soft ritual-shape hints**, not hard rules.

Allowed language:

```text
supports
leans toward
can shape
helps frame
keeps the ritual close to
```

Disallowed language:

```text
requires
guarantees
causes
predicts
means you are
means your relationship is
will heal
will manifest
bad luck if you miss it
```

## Shared source grounding

```yaml
sourceGrounding:
  packetId: packet.moon_book.lunar_cycle.reextract
  sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
  sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
  claimBoundary: "Lunar phase timing shapes ritual tone and purpose; it does not determine fate or guarantee outcome."
reviewStatus: draft_research
runtimeInfluenceEligible: false
```

## Card index

| Card ID | Kind | Timing feature | Main runtime purposes | Main runtime carriers |
| --- | --- | --- | --- | --- |
| `timing.moon_book.new_moon` | moon_phase | new Moon | opening, marking | words, table, vessel, plant |
| `timing.moon_book.waxing_crescent` | moon_phase | waxing crescent / early waxing | tending, marking | words, body, table |
| `timing.moon_book.first_quarter` | moon_phase | first quarter | tending, voicing | body, words |
| `timing.moon_book.waxing_gibbous` | moon_phase | waxing gibbous | tending, blessing | body, table, words |
| `timing.moon_book.full_moon` | moon_phase | full Moon | marking, blessing, remembering | table, body, candlelight, words |
| `timing.moon_book.waning_gibbous` | moon_phase | waning gibbous | remembering, voicing | words, table |
| `timing.moon_book.last_quarter` | moon_phase | last quarter | releasing, steadying | words, vessel, body |
| `timing.moon_book.waning_crescent` | moon_phase | waning crescent | steadying, releasing | vessel, body, words |
| `timing.moon_book.dark_moon` | moon_phase | dark / balsamic Moon | steadying, remembering, releasing | table, words, vessel, body |
| `timing.moon_book.whole_lunation` | lunation_cycle | whole cycle | opening, tending, remembering | words, table |
| `timing.moon_book.imperfect_timing` | adaptation_rule | phase mismatch | steadying | words, table |
| `timing.moon_book.eclipse_caution` | timing_feature | eclipse | releasing, steadying | words, body, vessel |
| `timing.moon_book.moon_as_water_mirror` | timing_feature | lunar symbolic base | remembering, steadying | words, vessel, body |

## Cards

### `timing.moon_book.new_moon`

```yaml
id: timing.moon_book.new_moon
label: New Moon — seed and space
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [new, dark_to_new]
    required: true
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 40, 82-107; New Moon chapter and New Moon Magic
    supportKind: phase_framework
    claimBoundary: new Moon supports beginning, intention, seed, dream, and space; no manifestation guarantee
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [seed, space, beginning, vision, quiet, renewal]
preferredRuntimePurposes: [opening, marking]
preferredRuntimeCarriers: [words, table, vessel, plant]
symbolicPurposeQualities: [beginning, intention, dreaming, seeding, making-space]
symbolicCarrierQualities: [seed, bowl, altar, grimoire, page]
discouragedRuntimePurposes: [releasing]
softRitualShapeHints:
  actionVerbs: [clear, write, fold, place, plant, begin]
  materialHints: [words, table, vessel, plant]
  closureHints: [leave quiet, do not add another wish, return later]
  capacityHints:
    low: [one paper, one bowl, one sentence]
    steady: [small altar, seed or plant, first follow-up action]
    high: [moon map the full cycle]
  audienceHints:
    me: [private intention]
    both: [one shared household beginning]
explanationBoundaries:
  allowedPhrases:
    - "The new Moon gives this work a quiet beginning."
    - "This timing supports seeding one intention without forcing it to bloom tonight."
  avoidClaims:
    - "This will manifest."
    - "You must set intentions tonight."
    - "Missing the new Moon ruins the cycle."
```

### `timing.moon_book.waxing_crescent`

```yaml
id: timing.moon_book.waxing_crescent
label: Waxing Crescent — first thread
timingFactKind: moon_phase
cardKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [waxing_crescent, waxing]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 40, 108-126; Waxing Moon chapter
    supportKind: phase_framework
    claimBoundary: early waxing supports following threads, first actions, growth, and movement; no forced productivity claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [growth, first-action, curiosity, thread, emergence]
preferredRuntimePurposes: [tending, marking]
preferredRuntimeCarriers: [words, body, table]
symbolicPurposeQualities: [beginning-to-build, exploring, trying, following]
symbolicCarrierQualities: [thread, marked page, small object, step]
softRitualShapeHints:
  actionVerbs: [notice, move, mark, follow, ask, try]
  materialHints: [words, body, table]
  closureHints: [mark one step, return tomorrow]
explanationBoundaries:
  allowedPhrases:
    - "The waxing Moon supports one real step rather than a finished outcome."
    - "This phase can help the ritual follow a thread that has started to show itself."
  avoidClaims:
    - "Growth is guaranteed."
    - "You must act publicly."
```

### `timing.moon_book.first_quarter`

```yaml
id: timing.moon_book.first_quarter
label: First Quarter — choose the active step
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [first_quarter]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 40-42; phase overview, with Waxing Moon chapter pp. 108-126
    supportKind: phase_framework
    claimBoundary: first quarter supports action and challenge within the building arc; no crisis or urgency claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [choice, action, commitment, pressure, effort]
preferredRuntimePurposes: [tending, voicing]
preferredRuntimeCarriers: [body, words]
symbolicPurposeQualities: [deciding, acting, making-contact, meeting-resistance]
symbolicCarrierQualities: [body step, spoken purpose, written commitment]
softRitualShapeHints:
  actionVerbs: [choose, name, take, cross, commit]
  materialHints: [body, words]
  closureHints: [mark what was done, do not add a second task]
explanationBoundaries:
  allowedPhrases:
    - "First quarter timing supports choosing one active step."
    - "This moment can hold a small commitment without making the whole path happen at once."
  avoidClaims:
    - "Conflict must happen now."
    - "This phase forces action."
```

### `timing.moon_book.waxing_gibbous`

```yaml
id: timing.moon_book.waxing_gibbous
label: Waxing Gibbous — refine before fullness
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [waxing_gibbous]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 40-42, 108-134; waxing overview and magic
    supportKind: phase_framework
    claimBoundary: waxing gibbous supports continued work, refinement, and preparation for fullness; no perfectionism claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [refinement, preparation, almost-visible, adjustment]
preferredRuntimePurposes: [tending, blessing]
preferredRuntimeCarriers: [body, table, words]
symbolicPurposeQualities: [adjusting, preparing, strengthening]
symbolicCarrierQualities: [object tending, practice repetition, table arrangement]
softRitualShapeHints:
  actionVerbs: [refine, tend, arrange, repeat, strengthen]
  materialHints: [table, words, body]
  closureHints: [leave the work ready, not perfect]
explanationBoundaries:
  allowedPhrases:
    - "Waxing gibbous timing supports refinement without requiring perfection."
  avoidClaims:
    - "Everything should be ready now."
    - "The ritual will make the outcome perfect."
```

### `timing.moon_book.full_moon`

```yaml
id: timing.moon_book.full_moon
label: Full Moon — visibility and embodiment
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [full]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 40-42, 136-166; Full Moon chapter, Full Moon Magic, mirror magic, tarot pull
    supportKind: phase_framework
    claimBoundary: full Moon supports harvest, embodiment, illumination, consciousness, witness, and emotional information; no claim that the Moon causes emotion or outcome
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [harvest, fullness, witness, embodiment, illumination, celebration]
preferredRuntimePurposes: [marking, blessing, remembering]
preferredRuntimeCarriers: [table, body, candlelight, words]
symbolicPurposeQualities: [ripening, witnessing, reflecting, embodying]
symbolicCarrierQualities: [mirror, table object, candle, card spread]
discouragedRuntimePurposes: [opening]
softRitualShapeHints:
  actionVerbs: [witness, name, reflect, show, celebrate, integrate]
  materialHints: [table, body, candlelight, words]
  closureHints: [let the visible thing stand, write what ripened]
  audienceHints:
    me: [mirror, card, grimoire]
    both: [shared witness, table object, spoken recognition]
explanationBoundaries:
  allowedPhrases:
    - "The full Moon supports witnessing what has become visible."
    - "This timing gives the ritual a reason to mark what has ripened."
  avoidClaims:
    - "The full Moon makes you emotional."
    - "Everything is complete now."
```

### `timing.moon_book.waning_gibbous`

```yaml
id: timing.moon_book.waning_gibbous
label: Waning Gibbous — share and integrate
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [waning_gibbous, disseminating]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 40-42, 168-176; phase overview and waning gateway
    supportKind: phase_framework
    claimBoundary: post-full waning supports sharing inner wisdom, integration, and beginning release; no compelled disclosure
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [integration, dissemination, teaching-back, first-release]
preferredRuntimePurposes: [remembering, voicing]
preferredRuntimeCarriers: [words, table]
symbolicPurposeQualities: [integrating, sharing, digesting]
symbolicCarrierQualities: [journal, table note, spoken witness]
softRitualShapeHints:
  actionVerbs: [write, name, share, digest, return]
  materialHints: [words, table]
  closureHints: [keep one lesson, release the rest]
explanationBoundaries:
  allowedPhrases:
    - "The waning gibbous can help the ritual digest what the full Moon showed."
  avoidClaims:
    - "You must share what you learned."
```

### `timing.moon_book.last_quarter`

```yaml
id: timing.moon_book.last_quarter
label: Last Quarter — cut and clear
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [last_quarter, third_quarter]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 41-43, 168-198; phase overview and Waning Moon chapter
    supportKind: phase_framework
    claimBoundary: last quarter supports releasing, clearing, choosing what ends; no punitive or enemy-working claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [clearing, choice, release, boundary, simplification]
preferredRuntimePurposes: [releasing, steadying]
preferredRuntimeCarriers: [words, vessel, body]
symbolicPurposeQualities: [cutting, emptying, reducing, letting-go]
symbolicCarrierQualities: [paper, water, bowl, handwashing]
softRitualShapeHints:
  actionVerbs: [name, fold, tear, dissolve, empty, wash]
  materialHints: [words, vessel, body]
  closureHints: [dispose plainly, do not replace it with another task]
explanationBoundaries:
  allowedPhrases:
    - "Last quarter timing supports choosing what can be cleared."
  avoidClaims:
    - "This will banish all problems."
    - "This phase is for harming others."
```

### `timing.moon_book.waning_crescent`

```yaml
id: timing.moon_book.waning_crescent
label: Waning Crescent — lower the light
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [waning_crescent, balsamic]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 41-43, 168-198; waning phase and rest material
    supportKind: phase_framework
    claimBoundary: waning crescent supports rest, lowering, grief, quiet release, and preparation for dark; no depression/medical claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [lowering, quiet, grief, rest, near-dark]
preferredRuntimePurposes: [steadying, releasing]
preferredRuntimeCarriers: [vessel, body, words]
symbolicPurposeQualities: [resting, lowering, softening, preparing]
symbolicCarrierQualities: [empty bowl, folded paper, body rest]
softRitualShapeHints:
  actionVerbs: [lower, fold, empty, rest, place-away]
  materialHints: [vessel, body, words]
  closureHints: [leave it alone overnight]
explanationBoundaries:
  allowedPhrases:
    - "Waning crescent timing supports lowering the work rather than adding more."
  avoidClaims:
    - "You should feel sad."
    - "This timing means nothing can happen."
```

### `timing.moon_book.dark_moon`

```yaml
id: timing.moon_book.dark_moon
label: Dark Moon — the void before return
cardKind: moon_phase
timingFactKind: moon_phase
matchFacts:
  - factPath: moon.phase
    allowedValues: [dark, balsamic, pre_new]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 200-226; Dark Moon chapter and Dark Moon Magic
    supportKind: phase_framework
    claimBoundary: dark Moon supports rest, void, transformation, banishing, reinvention, and rebirth; no fear-based timing claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [void, rest, shadow, rebirth, transmutation, liberation]
preferredRuntimePurposes: [steadying, remembering, releasing]
preferredRuntimeCarriers: [table, words, vessel, body]
symbolicPurposeQualities: [resting, entering-void, transforming, dreaming, rebirthing]
symbolicCarrierQualities: [empty table, dream journal, token, bowl]
discouragedRuntimePurposes: [opening]
softRitualShapeHints:
  actionVerbs: [empty, wait, dream, name, release, choose]
  materialHints: [table, words, vessel, body]
  closureHints: [do not begin the next thing yet, leave space until morning]
explanationBoundaries:
  allowedPhrases:
    - "The dark Moon supports rest and transformation before the next beginning."
    - "This timing gives the ritual permission not to fill the space yet."
  avoidClaims:
    - "Dark Moon work is dangerous."
    - "You must do shadow work."
    - "Nothing works now."
```

### `timing.moon_book.whole_lunation`

```yaml
id: timing.moon_book.whole_lunation
label: Whole lunation — one desire through many phases
cardKind: lunation_cycle
timingFactKind: lunation_cycle
matchFacts:
  - factPath: lunation.cycleActive
    allowedValues: [true]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 27-29, 48-52; lunar magic as full-cycle practice and moon mapping
    supportKind: phase_framework
    claimBoundary: a lunation can shape a repeated practice arc; no claim that every day must have a spell
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [cycle, repetition, spiral, beginning-building-fullness-release-rest]
preferredRuntimePurposes: [opening, tending, remembering]
preferredRuntimeCarriers: [words, table]
symbolicPurposeQualities: [mapping, returning, tracking, integrating]
symbolicCarrierQualities: [moon map, grimoire, cycle page]
softRitualShapeHints:
  actionVerbs: [map, return, date, record, close, begin-again]
  materialHints: [words, table]
  closureHints: [close the cycle before naming the next one]
explanationBoundaries:
  allowedPhrases:
    - "The whole lunar cycle supports returning to one intention in different ways."
  avoidClaims:
    - "You must perform a spell every phase."
    - "The cycle guarantees transformation."
```

### `timing.moon_book.imperfect_timing`

```yaml
id: timing.moon_book.imperfect_timing
label: Imperfect timing — use the Moon you have
cardKind: adaptation_rule
timingFactKind: imperfect_timing
matchFacts:
  - factPath: ritual.desiredTimingMatchesCurrentTiming
    allowedValues: [false]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 8-9, 27-29, 48-52, 82-99; personal relationship with Moon, adaptation, cycle practice
    supportKind: adaptation_rule
    claimBoundary: phase mismatch invites honest adaptation; no shame, no missed-window fatalism
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [adaptation, no-shame, personal-cycle, enough]
preferredRuntimePurposes: [steadying]
preferredRuntimeCarriers: [words, table]
symbolicPurposeQualities: [adjusting, softening, reframing]
symbolicCarrierQualities: [page, note, timing sentence]
softRitualShapeHints:
  actionVerbs: [name, adjust, reduce, shift, use]
  materialHints: [words, table]
  closureHints: [write what the actual phase can support]
explanationBoundaries:
  allowedPhrases:
    - "This is not the perfect phase, but the source supports adapting practice to the cycle you are actually in."
    - "The timing can shape the ritual rather than cancel it."
  avoidClaims:
    - "You missed your chance."
    - "The ritual will not work now."
```

### `timing.moon_book.eclipse_caution`

```yaml
id: timing.moon_book.eclipse_caution
label: Eclipse timing — intense anomaly, softer form
timingFactKind: timing_feature
cardKind: timing_feature
timingFeature: eclipse
matchFacts:
  - factPath: moon.eclipseWindow
    allowedValues: [true]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 228-241; Lunar Lore and Literacy: Eclipses, Blue Moons, and More
    supportKind: adaptation_rule
    claimBoundary: eclipse timing can be treated as potent/intense and worthy of caution; no fear claim or deterministic omen
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [intensity, anomaly, interruption, revelation, caution]
preferredRuntimePurposes: [releasing, steadying]
preferredRuntimeCarriers: [words, body, vessel]
symbolicPurposeQualities: [unblocking, pausing, softening, witnessing]
symbolicCarrierQualities: [journal, water, body rest, contained bowl]
softRitualShapeHints:
  actionVerbs: [pause, notice, write, soften, release-one-thing]
  materialHints: [words, vessel, body]
  closureHints: [do less, ground, return later]
explanationBoundaries:
  allowedPhrases:
    - "Eclipse timing is treated here as an intense timing feature, so the ritual should stay contained."
  avoidClaims:
    - "Eclipses are bad omens."
    - "This event predicts upheaval."
    - "You must do unblocking work."
```

### `timing.moon_book.moon_as_water_mirror`

```yaml
id: timing.moon_book.moon_as_water_mirror
label: Moon as water and mirror
cardKind: timing_feature
timingFactKind: custom
timingFeature: lunar_symbolic_base
matchFacts:
  - factPath: timingContext.includesMoonWork
    allowedValues: [true]
sourceGrounding:
  - packetId: packet.moon_book.lunar_cycle.reextract
    sourceId: SRC-MOD-MOON-GOTTESDIENER-2020
    sourceLabel: Sarah Faith Gottesdiener, The Moon Book, St. Martin's Essentials, 2020
    sourceLocation: PDF pp. 16-19; The Moon is a Mirror / The Moon is Our Water
    supportKind: source_note
    claimBoundary: moon symbolism can support reflection, water, inner tides, and emotional information; no medical/psychological causation claim
reviewStatus: draft_research
runtimeInfluenceEligible: false
symbolicQualities: [mirror, water, reflection, inner-tide, intuition, memory]
preferredRuntimePurposes: [remembering, steadying]
preferredRuntimeCarriers: [words, vessel, body]
symbolicPurposeQualities: [reflecting, noticing, softening, remembering]
symbolicCarrierQualities: [water bowl, mirror, journal, handwashing]
softRitualShapeHints:
  actionVerbs: [reflect, notice, wash, hold, write]
  materialHints: [vessel, words, body]
  closureHints: [pour out, close the journal, return the bowl]
explanationBoundaries:
  allowedPhrases:
    - "The source frames the Moon as mirror and water, so this timing can support reflection and inner-tide work."
  avoidClaims:
    - "The Moon causes your emotions."
    - "This ritual heals emotional patterns."
```

## QA checklist for this timing-card artifact

```yaml
runtime_data_created: false
recommendation_logic_changed: false
ritual_candidates_created_here: false
cards_are_source_backed: true
cards_cite_packet_and_source_id: true
phase_cards_use_runtime_enum_safe_purposes_and_carriers: true
symbolic_language_kept_out_of_runtime_enum_fields: true
deterministic_or_horoscope_claims_present: false
medical_or_relationship_compatibility_claims_present: false
claim_boundaries_present: true
review_status_draft_only: true
runtimeInfluenceEligible_false: true
```
