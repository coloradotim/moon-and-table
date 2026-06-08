> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Recommendation Tuning Notes

This note tracks small recommendation-behavior audits that do not belong in source reviews or card content.

## Issue 152: Recommendation Quality Scenario Report

The recommendation quality scenario bench is a human-review tool for output quality.
It does not tune scoring, rewrite ritual copy, add sources, or change the visible UI.

Run:

```sh
npm run recommendation:quality
```

The report samples privacy-safe scenarios across pause capacity, waning timing with
beginning focus, candle/light practice, plant practice, kitchen warmth, tending
us with low capacity, across-week timing, numerology accents, source/debug
leakage, and repeated filler. Each scenario prints the generated ritual, the
short `Why this fits`, expanded `How this was chosen` sections, timing and
practice diagnostics, selected score reasons, rejected near alternatives, and
automatic warnings.

Warnings are visibility, not verdicts. They help catch slop such as generic
candle add-ons, unbridged timing/focus tension, raw debug language in normal
copy, or generic filler phrases. A recommendation still needs human review for
whether it feels authored, coherent, specific, and worthy of the private
household grimoire.

## Issue 153: Grimoire Presentation Fields

Selected approved ritual patterns now carry authored `RitualPresentation`
fields. These fields give the generator better user-facing ritual material:
invitation, why the practice exists, approach, ritual body, carry prompt, and
closing.

This is the first implemented layer of the private household grimoire quality
model. It does not change scoring and it does not add new sources or ritual
categories. Existing `RitualPattern.steps` remain in place for validation,
safety review, source traceability, diagnostics, and fallback behavior.

The first presentation pass focuses on high-use home, plant, kitchen, light,
table, threshold, rest, evening, and seasonal patterns. The goal is to reduce
assembled step-list output and give rituals a clearer manner, carry, and close.
Meaning bridges and broader optional-accent cleanup remain separate work.

When a selected pattern has presentation, its presentation closing is the final
authored close. Runtime tone closings such as `Keep it simple and useful` are
legacy fallback behavior only for patterns without presentation. Theme/title
language also prefers the effective presentation invitation where available.

Recommendation quality report warning counts moved this way in the first pass:

| Warning | Before | After | Notes |
| --- | ---: | ---: | --- |
| `pause_with_imperative_steps` | 2 | 0 | Improved by pause variants that make stopping the ritual. |
| `generic_optional_candle` | 17 | 17 | Deferred to contextual optional-accent work. |
| `candle_ritual_with_candle_addon` | 0 | 0 | No regression. |
| `focus_timing_unbridged` | 1 | 1 | Deferred to meaning-bridge work. |
| `raw_score_language_in_user_copy` | 0 | 0 | No regression. |
| `debug_key_in_user_copy` | 0 | 0 | No regression. |
| `generic_closing_repeated` | 0 | 0 | No regression. |
| `carry_prompt_contradicts_focus` | 2 | 0 | Improved where presentation carry prompts are available. |
| `best_window_reason_too_thin` | 0 | 0 | No regression. |
| `source_id_visible_in_normal_copy` | 0 | 0 | No regression. |

## Issue 166: House Voice Over Runtime Tone Knobs

Moon & Table now treats house voice as part of the product, not as a user-facing
runtime writing-style setting. Normal profile settings no longer expose language
or broad avoid-style controls. The profile page keeps durable practical settings:
usual capacity, maximum ritual size, astrology visibility, broad practice-fit
preferences, and chart context.

Old private profile data may still contain `tonePreferences` or avoid-style
fields. Loading that data remains safe. Normal profile saves preserve existing
avoid values when no avoid controls are submitted, and do not actively write
tone preferences. Internal `toneGuidance`, safety blockers, burden constraints,
and practical avoid flags remain available for curation, eligibility, and
review.

## Issue 155: Contextual Accents, Carry Prompts, and Source Lineage

Optional accents now prefer the selected ritual's material and form instead of
defaulting to a generic candle add-on. The generator may add a small accent for
the same leaf, seed, bowl, cup, sweetness cue, key, folded phrase, threshold, or
seasonal vessel already present in the ritual. If an accent would become a
second ritual, the brief can still return `No add-on needed`.

Carry prompts now continue to prefer `RitualPresentation`, with presentation
variants used for focus-specific tensions such as making a beginning. New tests
cover material-specific carry prompts for dead leaf release, seed waiting, grain
bowl beginning, salt/water clearing, folded phrase vessel, seasonal marker bowl,
and honeyed word. Candle/light rituals still avoid generic candle add-ons, and
live-flame-avoided contexts use lamp/window-light language instead.

Batch 1 source summaries now name the source lineage lightly when a Batch 1
pattern materially shaped the ritual. Examples include household fire-banking
customs, hearth/table first-and-last logic, flower-language traditions, salt and
boundary folklore, quiet household welcome forms, seed/water beginning logic,
and grain/table household rhythm. These labels are user-facing summaries, not
raw source IDs.

Pattern-specific optional accents and Batch 1 lineage labels live on
`RitualPattern` data. The generator should read `optionalAccent`,
`candleFreeOptionalAccent`, and `sourceLineageLabel` rather than keeping Batch 1
pattern-key tables. `candleFreeOptionalAccent` means the live-flame-avoided form
of the accent; lamp, window, or light language can still be appropriate.

Recommendation quality report warning counts after this pass:

| Warning | After |
| --- | ---: |
| `generic_optional_candle` | 0 |
| `candle_ritual_with_candle_addon` | 0 |
| `carry_prompt_contradicts_focus` | 0 |
| `source_id_visible_in_normal_copy` | 0 |
| `raw_score_language_in_user_copy` | 0 |

## Metaphysical Integrity

Moon & Table should treat magical practice as meaningful on its own terms.
Safety should constrain recommendations; it should not rewrite the metaphysics
of the practice. Future content packets, especially for material practices such
as moon water, threshold charms, candle work, kitchen magic, plant magic, and
household rites, should check that source and safety boundaries are handled
quietly without flattening the practice into a wellness metaphor, decorative
prop, or safety disclaimer.

`docs/folk-household-magic-taxonomy.md` is the planning source for future folk
household magic packets. It keeps materials such as water, cinnamon, salt,
honey, keys, coins, jars, bowls, and paper as vehicles underneath existing
visible routes rather than top-level categories.

## Issue 156: Content Packet Workflow

New source-backed content batches should start as content packets under
`docs/content-packets/`. Draft and review-ready packets can organize source
candidates, proposed notes, cards, patterns, presentations, bridges, and
quality scenarios, but they are not active recommendation content.

Only packets marked `approved_for_implementation` should support later active
SourceReviews, SourceNotes, SymbolicCards, RitualPatterns, RitualPresentation,
RitualMeaningBridges, diagnostics, tests, scoring, generator behavior, or UI
changes. Issues #171 through #176 should use this packet workflow before
implementing moon water, threshold charms, boundary/clearing practices,
sweetening/warmth work, written charms, or container/object rites.

## Issue 180: Batch 1 Grimoire Ritual Library

Batch 1 is a coverage-driven content implementation for the six real visible
practice categories: Home, Plant, Kitchen, Candle or light, Reflection, and
Seasonal. It uses only the approved source set named in issue #180.

Added source reviews:

- Carmina Gadelica, Volume I
- NASA Science Moon Phases
- The Folk-lore of Plants
- Language of Flowers
- Culpeper's Complete Herbal and English Physician, symbolic context only
- The Magic of the Horse-shoe
- Current Superstitions
- The Fairy Mythology
- The Homeric Hymns
- The Book of Hallowe'en
- British Popular Customs

Added transformed SourceNotes for house light, house map, first moon sighting,
observable lunar light, seed/water, grain/table rhythm, plant witness, plant
growth and rest, flower-language private message, symbolic herbal limits,
salt/threshold/key mechanics, domestic boundary action, quiet welcome,
hearth first-and-last logic, autumn threshold, and calendar thresholds.

Added symbolic support cards for hearth, banked light, first/full/waning light,
dark moon support, threshold, key, bowl/vessel, cup, salt, clear water, grain,
bread, honey/sweetness, seed, root, leaf, dormancy, folded word, first/last,
quiet welcome, and seasonal bowl.

Added or rebuilt active RitualPatterns:

- `bank_the_house_light`
- `first_light_at_the_threshold`
- `house_from_root_to_roof`
- `threshold_bowl`
- `salt_clear_water_release`
- `seed_waiting`
- `plant_witness_to_growth`
- `dead_leaf_release`
- `dormant_green_rest`
- `grain_bowl_beginning`
- `warm_cup_between_us`
- `full_light_on_the_table`
- `folded_phrase_vessel`
- `waning_phrase_release`
- `two_words_at_the_table`
- `seasonal_marker_bowl`
- `quiet_welcome`
- `honeyed_word`
- `carried_key_word`
- `seasonal_entry_bowl`
- `bread_at_the_center`
- `first_day_last_day`
- `darkening_light`
- `plant_phrase_under_the_pot`
- `clear_the_threshold_bowl`
- `last_word_first_word`

Demoted older weak or overly task-like patterns:

- `close_the_evening`
- `room_reset`
- `one_clear_sentence`
- `simple_warm_drink`
- `ordinary_cooking_care_cue`
- `return_one_object`
- `soften_one_corner`
- `window_open_air_reset`
- `shared_space_reset`
- `small_repair`
- `end_of_week_closing`
- `prune_one_dead_leaf`
- `rotate_plant_for_light`
- `salt_boundary_bowl`
- `houseplant_check_in`
- `sage_clear_reflection_cue`

The generic optional candle add-on is no longer emitted as recommendation
filler. Candle/light appears when light is the ritual form, not as garnish.

`Surprise me` now resolves to one real visible practice before
recommendation. The decision record marks this as `resolved_open_preference`
so review can see that the user chose an open selection and what category was
used for scoring.

The recommendation quality report now includes content-health sections:
approved count, RitualPresentation coverage, scenario selection diversity,
Batch 1 source coverage, category coverage, must-support coverage,
nice-to-have status, weak-pattern flags, demotion list, and timing-honesty
warnings.

Known review note: the scenario report is warning-free after Batch 1, but the
selection suite still shows repeated selection of a few strong new patterns.
That is a review signal, not a reason to weaken scoring or diagnostics.

## Issue 165: Runtime-Sensitive Test Stabilization

Tests should keep catching real recommendation regressions without freezing
runtime-sensitive output. Exact selected pattern or timing-label assertions are
appropriate only when the fixture fully controls the competing inputs and the
product requirement demands that specific value. Otherwise, tests should assert
approved selection, capacity fit, safety boundaries, profile/timing traceability,
and human-readable explanation shape.

## Issue 129: Check-in Practice Choice Diagnostics

The check-in practice step now has explicit diagnostics in the recommendation decision record and content reachability report.

Representative scenario families reviewed:

- low-capacity `Surprise me` with a home-tending focus
- low-capacity plant practice with a clear-speech focus
- low-capacity home/plant/kitchen/candle choices
- steady-capacity reflection choices
- high-capacity seasonal choices
- across-week scenarios with real timing-window candidates

The diagnostic run sampled 77 privacy-safe scenarios. Practice-choice statuses were mixed: some visible choices matched the selected ritual, some were set aside by stronger fit signals, and `Surprise me` correctly stayed open.

Audited practice choices:

| Visible choice | Diagnosis | Action |
| --- | --- | --- |
| Home | Usable, but should be checked against selected pattern styles. | Sampled in reachability diagnostics. |
| Plant | Usable, but can be set aside when capacity, focus, or timing point elsewhere. | Sampled in reachability diagnostics. |
| Kitchen | Usable. | Sampled in reachability diagnostics. |
| Candle or light | Usable. | Sampled in reachability diagnostics. |
| Reflection | Usable for steady and high capacity. | Sampled in reachability diagnostics. |
| Seasonal | Usable for high capacity only. | Sampled in reachability diagnostics. |
| Surprise me | Open preference, not a style match. | No practice-style score boost. |
| Conversation | Needs a dedicated source/content pass before becoming a visible practice preference. | Removed from the visible check-in and profile surfaces for now. |

Practice diagnostics can classify the selected practice answer as:

- `not_asked`
- `open_preference`
- `matched_selected_pattern`
- `set_aside`

The goal is not to force every visible option to win. The goal is to make it clear when a visible answer shaped the ritual and when it was held but outweighed by capacity, timing, focus, profile fit, or safety.

## Issue 148: Numerology Accent Diagnostics

Universal date numerology remains computed in the timing layer. It is not a check-in question and should not become personal numerology.

The generator now records whether universal numerology was:

- not computed
- computed but not matched to the selected ritual context
- eligible but hidden behind stronger timing signals
- selected as a matched accent

A numerology signal can appear only as an accent after at least one stronger non-numerology timing signal is already selected. It may take the final timing-signal slot when its ritual-style hints match the selected ritual context. It must not become the first, only, or dominant reason for the brief.

The diagnostic run confirmed universal date numerology was computed and converted into eligible timing signals. Before this tuning pass, selected timing signals were capped tightly enough that numerology was structurally unlikely to surface. After this pass, matched numerology can appear as one secondary accent and receives an expanded `How this was chosen` section when selected.

Representative numerology outcomes from the diagnostic run:

| Outcome | Meaning |
| --- | --- |
| `matched_selected` | A universal date number matched the selected ritual context and appeared as a small accent. |
| `eligible_hidden` | A number matched some context, but stronger timing signals filled the visible selection. |
| `computed_unmatched` | Date numerology was computed but did not match the selected ritual context. |

Deferred:

- personal numerology
- life path numbers
- name numerology
- compatibility
- additional numerology source batches
- a numerology check-in step

## Issue 183: Ritual Form Reachability

Post-#180 content QA showed that clean warning counts were not enough. Strong
Batch 1 rituals existed, but broad multi-category patterns could still win too
many scenarios because scoring treated generic tag overlap as sufficient.

The generator now scores ritual form families separately from broad style tags.
Form-family fit asks whether the selected ritual material/action actually
matches the current combination: visible practice, focus, capacity,
timing, and audience.

Examples of form-family expectations:

- Plant + clearing should reach plant release/removal.
- Kitchen + beginning should reach grain, seed, or bowl.
- Reflection + clear speech should reach written/folded/container forms.
- Candle/light + rest should reach banked or darkening light, not full-light clarity.
- Home + threshold should reach threshold, crossing, key, bowl, or first-light forms.

The recommendation-quality report now shows selected ritual form family,
expected ritual form family, and whether the family matched. It also highlights
broad pattern concentration so `two_words_at_the_table` and
`full_light_on_the_table` can remain available without becoming catch-all
defaults.
