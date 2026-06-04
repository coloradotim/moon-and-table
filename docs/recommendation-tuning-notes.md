# Recommendation Tuning Notes

This note tracks small recommendation-behavior audits that do not belong in source reviews or card content.

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
