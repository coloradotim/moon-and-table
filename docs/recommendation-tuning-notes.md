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
