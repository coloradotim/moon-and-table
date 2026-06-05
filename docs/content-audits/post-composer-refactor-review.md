# Post-237 Composer Refactor Review

## 1. PR / Branch Summary

- PR: #242, Refactor recommendation presentation composer for house voice
- Branch: `codex/issue-237-composer-refactor`
- Base branch: `main`
- Baseline main SHA when local delta was generated: `e0af53c`
- Issue addressed: #237

Issue #237 changes the final recommendation presentation composer so normal
copy reads less like a stitched report and more like one authored household
grimoire entry. This PR does not add sources, SourceNotes, SymbolicCards,
RitualPatterns, visible categories, UI, private data, or copied source wording.

Files changed:

| Purpose | Files |
| --- | --- |
| Presentation composer | `src/lib/generate-weekly-brief.ts` |
| Ritual body / presentation copy | `src/data/batch-1-ritual-library.ts`, `src/data/ritual-patterns.ts` |
| Authored-output expectations and scenarios | `tests/fixtures/recommendation-quality-scenarios.ts` |
| Recommendation-quality report diagnostics | `scripts/recommendation-quality-report.ts` |
| Review packet | `docs/content-audits/post-composer-refactor-review.md` |

Scope confirmation:

| Question | Answer |
| --- | --- |
| Runtime selection/scoring changed? | Yes, narrowly: release-primary patterns are strongly rejected when the explicit focus is not clearing. No broad scoring or reachability expansion. |
| Recommendation output changed? | Yes, normal presentation copy changed. |
| Ritual content changed? | Presentation wording and variants changed; no new RitualPatterns were added. |
| Sources / SourceNotes / cards changed? | No. |
| Visible categories changed? | No. |
| UI changed? | Normal UI rendering changed only through normal recommendation copy; debug UI changed to show diagnostic explanation in `?debug=true`. |
| Debug/report output hidden? | No. Detailed `diagnosticHowThisWasChosen` is preserved for reports and appears in the `?debug=true` Developer decision record. |
| Private data added? | No. |
| Copied source wording added? | No. |

## 2. Composer Changes

The patch addresses composer-level failure classes rather than only individual
examples:

- Wrong-function main cards: release/clearing-primary forms no longer win
  explicit grounding, resting, beginning, tending, or saying-clearly requests.
  Timing may shape the rite, but it cannot rename the ritual function.
- One ritual body: selected bodies use one primary place/material/action/close
  path instead of leaving the core ritual undecided.
- Body/explanation integrity: high and both-of-us variants preserve staged
  action, shared roles, held moments, and return arcs in the body when the
  explanation names them.
- High-capacity integrity: high-depth warnings remain where the body is still
  thin or only closest-compatible.
- Both-of-us integrity: audience warnings resolve only where the body gives
  both people a role or makes one shared object the mechanism.
- Closest-compatible honesty: coverage gaps remain visible in normal expanded
  explanation while detailed diagnostics remain in report output.

`How this was chosen` was also simplified for normal copy. The old expanded
section could expose 7-10 diagnostic fragments. Normal copy now usually renders
3 compact sections, or 4 when a closest-compatible disclosure is required:

1. Material and ritual fit
2. Timing fit
3. Capacity and audience fit
4. Closest compatible, only when needed

The detailed diagnostic chain is still available as
`diagnosticHowThisWasChosen`, is used by the recommendation-quality report, and
is visible only in the debug Developer decision record when `?debug=true` is
enabled.

## 3. Quality Delta

Baseline:

```bash
npm run recommendation:quality:delta -- --write-current /tmp/moon-table-237-main-summary.json
```

Current:

```bash
npm run recommendation:quality:delta -- --write-current /tmp/moon-table-237-current-summary.json
npm run recommendation:quality:delta -- --baseline /tmp/moon-table-237-main-summary.json --current /tmp/moon-table-237-current-summary.json
```

Summary:

| Metric | Before | After |
| --- | ---: | ---: |
| Total scenarios | 107 | 111 |
| Contract request changes | 4 | 4 |
| Authored request changes | 9 | 5 |
| Review required | 17 | 8 |
| High-capacity depth warnings | 7 | 5 |
| Audience-only warnings | 12 | 0 |
| Coverage-gap hidden warnings | 8 | 0 |
| Option-menu warnings | 3 | 0 |
| Closest-match overclaims warnings | 1 | 1 |
| Distinct selected patterns | 31 | 31 |

Improved scenario IDs:

- `batch1.quiet_welcome`
- `calendar.month_turn.best_week`
- `contract.best_week.month_turn_may_lead`
- `contract.candle.high_beginning`
- `contract.candle.high_resting`
- `contract.home.high_tending_waning`
- `contract.home.low_tending_waning_not_release`
- `contract.plant.both_high_tending_waning`
- `contract.plant.high_rest_companionship`
- `contract.plant.high_tending_no_timing`
- `contract.seasonal.high_month_turn_threshold`
- `contract.surprise.both_preserves_audience`
- `contract.surprise.forced_kitchen_preserved`
- `contract.surprise.high_preserves_resolved_category`
- `contract.tending_us.both_low_embodied`
- `issue202.kitchen.warmth.not_threshold`
- `issue204.kitchen.bounded_sweetness`
- `issue205.kitchen.warmth.not_phrase`
- `issue205.seasonal.first_last_words`
- `issue222.candle.best_week_lunation_window`
- `issue222.candle.venus_warmth_tending_us`
- `tending_us.low.bounded`

Worsened scenario IDs:

- none

Changed selected patterns:

- `contract.surprise.low_resolves_real_category`:
  `waning_light_release` -> `bank_the_house_light`
- `issue222.candle.no_strong_timing`:
  `waning_light_release` -> `bank_the_house_light`

Resolved warning IDs:

- `fragmentary_option_menu_body`: 3 -> 0
- `high_capacity_no_deeper_ritual_shape`: 7 -> 5
- `audience_only_pronoun_change`: 12 -> 0
- `coverage_gap_not_disclosed_in_expanded_explanation`: 8 -> 0

Remaining blockers:

- `contract_request_changes`: 4
- authored-output `request_changes`: 5
- authored-output `review_required`: 8

Diagnostic integrity:

- Warnings decreased because normal output changed: option menus were removed,
  both-of-us actions were added, deeper bodies were added where the body earns
  them, and closest-compatible disclosures are visible.
- High-depth and coverage warnings remain where the grimoire still lacks
  deeper content.
- The quality report still has detailed diagnostic sections; normal copy no
  longer exposes them as the user-facing explanation.

## 4. PM Body Review Table

| Scenario | Before body problem | After body change | Warning impact | PM judgment |
| --- | --- | --- | --- | --- |
| Low capacity Candle/light grounding: `issue222.candle.no_strong_timing` and `issue237.candle.both_grounding_low` | Grounding could select `waning_light_release` and read as removal: "release", "leaving path", "take up less room", "nothing more is removed." | `bank_the_house_light` now uses a grounded light edge: set one light, name one place attention can return to, lower the light, and close at the table. The both-of-us variant gives one person the naming and the other the table touch. | `closest_match_overclaims_fit` is no longer added for the fixed solo grounding case. New regression scenario passes with no warnings. | Showable for low grounding. |
| High capacity Candle/light: `contract.candle.high_beginning` | Explanation claimed a later return, but high beginning could still look like a tiny threshold gesture. | Body now includes first light near the doorway, written sentence, threshold placement, crossing, held light until return, paper lifted later, and ordinary put-away closure. | `high_capacity_no_deeper_ritual_shape` resolved because the body visibly includes the staged/held/return arc. | Showable. |
| Kitchen both-of-us: `tending_us.low.bounded` | Both-of-us could live in pronouns or explanation rather than action. | The vessel sits between both people; one names what is welcome, the other touches the vessel, then it returns or is washed. | `audience_only_pronoun_change` resolved for the relevant Kitchen/Home tending examples. | Showable. |
| Plant high-capacity: `contract.plant.both_high_tending_waning` | Plant category was preserved, but high + both explanation named a return arc the merged body did not always show. | Added a combined high + both variant: one plant or leaf is set where both can see it, each person names one part of the household tending, the plant witnesses through one quiet minute, then returns to its ordinary place. | Body/explanation integrity improved, but coverage/depth warnings remain because deeper Plant + home-tending content is still a #227/Part B gap. | Review required, but honest. |
| Plant both-of-us release: `issue237.plant.both_dead_leaf_release` | The compact explanation could claim both-person structure while a release body stayed solo/neutral. | Added a narrow shared dead-leaf body: one person identifies what is spent; the other removes or receives it; closure leaves the plant alone. Also added a general composer guard so audience language appears only when the rendered body earns it. | `audience_only_pronoun_change` stays at 0 for honest reasons; the new scenario passes with no warnings. | Showable. |
| Candle/light high + both beginning: `issue237.candle.both_high_beginning` | Separate high and together variants could compete, risking either a high solo arc or a small together arc. | Added a combined high + both variant with first light, written sentence, threshold placement, shared crossing, held light, and later return together. | No high-capacity or audience warning because the body contains both structures. | Showable. |
| `first_day_last_day` | Old body left the core place/action undecided: doorway/table/bowl and crossing/folding could read like a menu. | One doorway path, one crossing, no third word; both-of-us variant gives one last-word role and one first-word role. | `fragmentary_option_menu_body` and `audience_only_pronoun_change` resolved. | Showable. |
| Closest-compatible case: `contract.surprise.high_preserves_resolved_category` | High-capacity Reflection phrase coverage was thin and the gap could be hidden in smoother prose. | Normal expanded copy keeps a plain closest-compatible note while preserving the resolved practice. | `coverage_gap_not_disclosed_in_expanded_explanation` resolved; coverage warnings remain. | Transparent closest-compatible output, not complete high-depth coverage. |

## 5. Live Smoke Outputs

These are normal user-facing fields only. Score dumps and raw diagnostics are
omitted.

### Candle/light + Both + Grounding + Low

- Scenario: `issue237.candle.both_grounding_low`
- Selected visible practice: Candle or light
- Selected pattern: `bank_the_house_light`
- Title/theme: Settle one light between you.
- Ritual body: Use the light as a shared settling place; keep the action small enough to end cleanly. Set one table lamp or supervised candle between you. One of you names one place in the room that can hold attention; the other touches the table once. Lower the light slightly together. Leave one ordinary warm thing beside the light: a cup, blanket, or quiet table. Close when the light is lowered and both hands have left the table.
- Intention: Settle one light between you.
- Best window: No strong timing window stood out this week. When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can both of you return to without working on it?
- Why this fits: A lowered household light can give both people one shared edge to return to. The material gives attention one edge to return to, then stops. No single timing window stood out strongly this week, so the ritual can happen whenever capacity allows. For both of you, the rite works through one small role each, or one shared object touched together. Low capacity keeps the rite to one material action and one close. Kept bounded: one lowered light, one ending, then no more work.
- How this was chosen: Material and ritual fit: Candle or light stays in the material action: the material gives attention one edge to return to, then stops. The ritual form gives it a clear shape: a lowered household light can give both people one shared edge to return to. Source lineage: household fire-banking customs. Timing fit: Timing does not need to lead here; the rite can stay close to capacity. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One lowered light, one ending, then no more work.
- Source summary: Source lineage: household fire-banking customs. Form kept contained.
- Warnings: none
- Main function matches selected focus? Yes. The card is grounding, not release.
- Body/explanation agree? Yes. Shared light, role split, lowered-light close, and bounded ending appear in the body.
- High capacity deeper? Not applicable.
- Warnings changed for honest reasons? Yes. Selection moved away from release because wrong-function release is now rejected for non-clearing focus.

### Kitchen/Home + Both + Tending Us + Low

- Scenario: `tending_us.low.bounded`
- Selected visible practice: Home
- Selected pattern: `quiet_welcome`
- Title/theme: Set out a quiet welcome.
- Ritual body: Welcome is the ritual form, not a performance; choose one ordinary welcome vessel; a cup or small bowl is enough. Set one cup or small bowl at the table between you. One of you names what is welcome here; the other touches the vessel once. Return or wash the vessel when finished. Close when the vessel has been returned or washed.
- Intention: Set out a quiet welcome.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What welcome can the shared vessel hold for both of you?
- Why this fits: A modest bowl, cup, bread, or grain can make hospitality visible without demanding belief. The shared material carries tending-us as a small action, not a long talk. Seasonal timing asks for a small marker, not a public calendar performance. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close. Kept bounded: one vessel, one welcome, then the vessel returns.
- How this was chosen: Material and ritual fit: Home stays in the material action: the shared material carries tending-us as a small action, not a long talk. The ritual form gives it a clear shape: a modest bowl, cup, bread, or grain can make hospitality visible without demanding belief. Source lineage: quiet household welcome forms. Timing fit: Seasonal timing asks for a small marker, not a public calendar performance. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One vessel, one welcome, then the vessel returns.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: none
- Main function matches selected focus? Yes. The rite is welcome/tending, not clearing or release.
- Body/explanation agree? Yes. The vessel between both people, role split, and return/wash closure all appear in the body.
- High capacity deeper? Not applicable.
- Warnings changed for honest reasons? Yes. `audience_only_pronoun_change` resolves because the body gives both people action.

### Candle/light + High + Beginning

- Scenario: `contract.candle.high_beginning`
- Selected visible practice: Candle or light
- Selected pattern: `first_light_at_the_threshold`
- Title/theme: Let first light mark the threshold.
- Ritual body: Use light as the first mark, not as pressure; let the doorway hold the beginning. Set one first household light near the doorway. Write the beginning in one sentence and place the paper just inside the threshold. Step across once and touch the doorframe. Let the light hold the sentence until the next return to the room. Return later, lift the paper, and put it in an ordinary holding place. Close when the paper has been returned or put away.
- Intention: Let first light mark the threshold.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Carry prompt: What beginning becomes stronger when it waits at the threshold first?
- Why this fits: Kindling and first-sighting traditions make a beginning visible before it becomes a project. The ritual gives the beginning a first body before it becomes work. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. High capacity asks for a fuller arc: staged action, a held moment, and a return. Private context supports keeping this practical and contained. Kept bounded: one first light, one crossing, one later return.
- How this was chosen: Material and ritual fit: Candle or light stays in the material action: the ritual gives the beginning a first body before it becomes work. The ritual form gives it a clear shape: kindling and first-sighting traditions make a beginning visible before it becomes a project. Source lineage: household fire-kindling and first-light threshold logic. Timing fit: New-moon darkness makes the first light small: it opens the beginning, then stops before proof. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. One first light, one crossing, one later return.
- Source summary: Source lineage: household fire-kindling and first-light threshold logic. Form kept contained.
- Warnings: none
- Main function matches selected focus? Yes. The rite is a held beginning, not release.
- Body/explanation agree? Yes. The body includes the held sentence and later return named in explanation.
- High capacity deeper? Yes. It has a staged first-light sequence, threshold placement, held moment, later return, and closure.
- Warnings changed for honest reasons? Yes. The high-capacity warning resolves because the body actually deepened.

### Plant + Both + High + Tending Home

- Scenario: `contract.plant.both_high_tending_waning`
- Selected visible practice: Plant
- Selected pattern: `plant_witness_to_growth`
- Title/theme: Let the plant witness the household tending.
- Ritual body: Let the plant hold attention without becoming a task; speak softly or silently. Set one plant, leaf, seed, or plant image where both of you can see it. One of you names what in the home is still living; the other names what can be left undisturbed. Let the plant witness both words through one quiet minute. Return the plant or image to its ordinary place without adding a task. Close when the plant is back in its ordinary place and no new task has been added.
- Intention: Let the plant witness the household tending.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What in the home can be tended by being witnessed and left steady?
- Why this fits: Plant folklore and flower-language traditions can make a living thing a witness, not a prop. The household material makes tending visible, then returns to ordinary use. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. High capacity asks for a fuller arc: staged action, a held moment, and a return. Kept bounded: one primary ritual, no task list.
- How this was chosen: Material and ritual fit: Plant stays in the material action: the household material makes tending visible, then returns to ordinary use. The ritual form gives it a clear shape: plant folklore and flower-language traditions can make a living thing a witness, not a prop. Source lineage: plant-lore living witness and flower-message logic. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One primary ritual, no task list. Closest compatible: The grimoire does not yet have a deeper Plant + home-tending rite. It keeps Plant at the center rather than drifting to a stronger non-Plant form.
- Source summary: Source lineage: plant-lore living witness and flower-message logic. Form kept contained.
- Warnings: `coverage_gap_category_focus_capacity`, `recommendation_confidence_limited`, `high_capacity_depth_gap`, `closest_compatible_pattern_selected`, `stronger_wrong_category_rejected`
- Main function matches selected focus? Yes. The rite tends by witnessing what is living/undisturbed.
- Body/explanation agree? Yes. The shared roles, held minute, and return appear in the body.
- High capacity deeper? Still a content gap. The body is deeper than the low variant, but the warning remains because the library still lacks a fully source-backed deeper Plant + home-tending rite.
- Warnings changed for honest reasons? Yes. Body integrity improved, but coverage/depth warnings remain.

## 6. How This Was Chosen Restructure

| Scenario | Old section count | New section count | Closest-compatible disclosure remains? | Debug/report diagnostics remain available elsewhere? |
| --- | ---: | ---: | --- | --- |
| `issue237.candle.both_grounding_low` | 7 | 3 | Not needed | Yes, in `diagnosticHowThisWasChosen`, the recommendation-quality report, and `?debug=true`. |
| `tending_us.low.bounded` | 8 | 3 | Not needed | Yes, in `diagnosticHowThisWasChosen`, the recommendation-quality report, and `?debug=true`. |
| `contract.candle.high_beginning` | 8 | 3 | Not needed | Yes, in `diagnosticHowThisWasChosen`, the recommendation-quality report, and `?debug=true`. |
| `contract.plant.both_high_tending_waning` | 9 | 4 | Yes | Yes, in `diagnosticHowThisWasChosen`, the recommendation-quality report, and `?debug=true`. |

Before style:

```text
Chosen for
Timing shaped it
Focus bridge
Ritual form
Material lineage
Closest compatible
Kept bounded
Private timing fit
Small accent
```

After style:

```text
Material and ritual fit
Timing fit
Capacity and audience fit
Closest compatible, only when needed
```

Normal copy no longer shows redundant `Private timing fit` / `Household fit`
sections, generic secondary numerology notes, or a check-in recap as a visible
section. The quality report and the `?debug=true` Developer decision record
still export diagnostic fragments for review.

## 7. Six-Path Normal Output Spot Check

These are after-only normal user-facing outputs generated from the current
branch after the final audience/explanation integrity patch. The open-preference
case is described as an open preference resolving to a visible practice;
`Surprise me` is not treated as a category.

### Candle/light + Both + Grounding + Low

- Scenario: `issue237.candle.both_grounding_low`
- Selected visible practice: Candle or light
- Selected pattern: `bank_the_house_light`
- Title/theme: Settle one light between you.
- Ritual body: Use the light as a shared settling place; keep the action small enough to end cleanly. Set one table lamp or supervised candle between you. One of you names one place in the room that can hold attention; the other touches the table once. Lower the light slightly together. Leave one ordinary warm thing beside the light: a cup, blanket, or quiet table. Close when the light is lowered and both hands have left the table.
- Intention: Settle one light between you.
- Best window: No strong timing window stood out this week. When you have five quiet minutes.
- Optional accent: No add-on needed.
- Why this fits: A lowered household light can give both people one shared edge to return to. The material gives attention one edge to return to, then stops. No single timing window stood out strongly this week, so the ritual can happen whenever capacity allows. For both of you, the rite works through one small role each, or one shared object touched together. Low capacity keeps the rite to one material action and one close.
- Carry prompt: What can both of you return to without working on it?
- How this was chosen:
  - Material and ritual fit: Candle or light remains the material path. The material gives attention one edge to return to, then stops. A lowered household light can give both people one shared edge to return to. Source lineage: household fire-banking customs.
  - Timing fit: Timing does not need to lead here; the rite can stay close to capacity.
  - Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One lowered light, one ending, then no more work.
- Source summary: Source lineage: household fire-banking customs. Form kept contained.
- Warnings: none.
- Agreement: audience yes; capacity yes; closure yes.

### Kitchen + Both + Tending Us + Low

- Scenario: `issue204.kitchen.bounded_sweetness`
- Selected visible practice: Kitchen
- Selected pattern: `honeyed_word`
- Title/theme: Give one word a little sweetness.
- Ritual body: Use one tiny sweetness cue already ordinary in the household; let the cue hold one word, then end the rite. Place a tiny sweetness cue on a spoon or in an empty cup between you. One of you speaks the bounded word; the other returns or washes the cue. Both leave the cup or spoon empty before adding more words. Close when the cue is returned or washed and both hands have left the cup or spoon.
- Intention: Give one word a little sweetness.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Why this fits: Sweetness belongs here as a material cue for one bounded word that can be set down and ended. The shared material carries tending-us as a small action, not a long talk. Waxing moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close.
- Carry prompt: What word can be sweetened between you and then set down?
- How this was chosen:
  - Material and ritual fit: Kitchen remains the material path. The shared material carries tending-us as a small action, not a long talk. Sweetness belongs here as a material cue for one bounded word that can be set down and ended. Source lineage: quiet welcome and household sweetness forms.
  - Timing fit: Waxing moon supports this form without making the timing a command.
  - Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One bounded word, one sweetness cue, then the cup is returned.
- Source summary: Source lineage: quiet welcome and household sweetness forms. Form kept contained.
- Warnings: none.
- Agreement: audience yes; capacity yes; closure yes.

### Candle/light + Both + Beginning + High

- Scenario: `issue237.candle.both_high_beginning`
- Selected visible practice: Candle or light
- Selected pattern: `first_light_at_the_threshold`
- Title/theme: Let first light mark the threshold.
- Ritual body: Use light as the first mark, not as pressure; let the doorway hold the beginning. Set one first household light near the doorway. One of you writes the beginning in one sentence and places the paper just inside the threshold; the other touches the doorframe. Step across once together. Let the light hold the sentence until the next return to the room. Return later together, lift the paper, and put it in an ordinary holding place. Close when the paper has been returned or put away and both of you have crossed back into ordinary use.
- Intention: Let first light mark the threshold.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Why this fits: Kindling and first-sighting traditions make a beginning visible before it becomes a project. The ritual gives the beginning a first body before it becomes work. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. For both of you, the rite works through one small role each, or one shared object touched together. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- Carry prompt: What beginning becomes stronger when both of you let it wait at the threshold first?
- How this was chosen:
  - Material and ritual fit: Candle or light remains the material path. The ritual gives the beginning a first body before it becomes work. Kindling and first-sighting traditions make a beginning visible before it becomes a project. Source lineage: household fire-kindling and first-light threshold logic.
  - Timing fit: New-moon darkness makes the first light small: it opens the beginning, then stops before proof.
  - Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One first light, one crossing, one later return.
- Source summary: Source lineage: household fire-kindling and first-light threshold logic. Form kept contained.
- Warnings: none.
- Agreement: audience yes; capacity yes; closure yes.

### Plant + Both + Tending The Home + High

- Scenario: `contract.plant.both_high_tending_waning`
- Selected visible practice: Plant
- Selected pattern: `plant_witness_to_growth`
- Title/theme: Let the plant witness the household tending.
- Ritual body: Let the plant hold attention without becoming a task; speak softly or silently. Set one plant, leaf, seed, or plant image where both of you can see it. One of you names what in the home is still living; the other names what can be left undisturbed. Let the plant witness both words through one quiet minute. Return the plant or image to its ordinary place without adding a task. Close when the plant is back in its ordinary place and no new task has been added.
- Intention: Let the plant witness the household tending.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Why this fits: Plant folklore and flower-language traditions can make a living thing a witness, not a prop. The household material makes tending visible, then returns to ordinary use. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- Carry prompt: What in the home can be tended by being witnessed and left steady?
- How this was chosen:
  - Material and ritual fit: Plant remains the material path. The household material makes tending visible, then returns to ordinary use. Plant folklore and flower-language traditions can make a living thing a witness, not a prop. Source lineage: plant-lore living witness and flower-message logic.
  - Timing fit: Waning moon supports this form without making the timing a command.
  - Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One primary ritual, no task list.
  - Closest compatible: The grimoire does not yet have a deeper Plant + home-tending rite. It keeps Plant at the center rather than drifting to a stronger non-Plant form.
- Source summary: Source lineage: plant-lore living witness and flower-message logic. Form kept contained.
- Warnings: `coverage_gap_category_focus_capacity`, `recommendation_confidence_limited`, `high_capacity_depth_gap`, `closest_compatible_pattern_selected`, `stronger_wrong_category_rejected`.
- Agreement: audience yes; capacity yes, with high-depth content gap disclosed; closure yes.

### Plant + Both + Clearing/Release + Low

- Scenario: `issue237.plant.both_dead_leaf_release`
- Selected visible practice: Plant
- Selected pattern: `dead_leaf_release`
- Title/theme: Release only the dead leaf.
- Ritual body: Look before touching; do not make release larger than the leaf. Stand together near one plant or one already fallen leaf. One of you identifies what is clearly spent; the other removes it or receives it for disposal. Name what is complete and place the leaf in trash, compost, or outside if appropriate. Close when the leaf has left both hands and the plant is left alone.
- Intention: Release only the dead leaf.
- Best window: When you have five quiet minutes.
- Optional accent: Let the plant remain untouched after the spent leaf is gone.
- Why this fits: A spent leaf gives release a precise edge: remove what is already finished, not what is alive. The material gives release one path out and one clear stop. Waning moon supports this form without making the timing a command. For both of you, the rite works through one small role each, or one shared object touched together. Low capacity keeps the rite to one material action and one close.
- Carry prompt: What can both of you leave complete after the spent leaf is gone?
- How this was chosen:
  - Material and ritual fit: Plant remains the material path. The material gives release one path out and one clear stop. A spent leaf gives release a precise edge: remove what is already finished, not what is alive. Source lineage: plant growth and rest traditions.
  - Timing fit: Waning moon supports this form without making the timing a command.
  - Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One spent leaf, one release, then the plant is left alone.
- Source summary: Source lineage: plant growth and rest traditions. Form kept contained.
- Warnings: none.
- Agreement: audience yes; capacity yes; closure yes.

### Open Preference + Both + Resting + Low

- Scenario: `issue237.surprise.both_resting_low`
- Open preference resolved to visible practice: Candle or light
- Selected pattern: `full_light_on_the_table`
- Title/theme: Let one light hold a line between you.
- Ritual body: Use the light only long enough to mark the pause; let the close make the room quieter. Place one table light between you. Each offer one word or share one short line. Lower the light together. Close when the light is lowered between you.
- Intention: Let one light hold a line between you.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Why this fits: If full light is selected for rest, the ritual should end by reducing brightness rather than sharpening it. The action lets rest be held by material instead of explained into more work. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close.
- Carry prompt: What can the shared light hold for both of you?
- How this was chosen:
  - Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. If full light is selected for rest, the ritual should end by reducing brightness rather than sharpening it. Source lineage: hearth/table first-and-last logic.
  - Timing fit: Waning moon supports this form without making the timing a command.
  - Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One light, one line, then the light changes.
- Source summary: Source lineage: hearth/table first-and-last logic. Form kept contained.
- Warnings: none.
- Agreement: open preference resolved before selection; audience yes; capacity yes; closure yes.

## 8. Remaining Awkward Outputs / Risks

- `contract.home.high_tending_waning` still selects
  `first_light_at_the_threshold`; the high body is deeper now, but it remains
  too beginning/threshold-forward for Home + tending the home.
- `contract.home.low_tending_waning_not_release` avoids salt/water release but
  still marks a first-light threshold instead of placing/returning/arranging a
  home object.
- `contract.reflection.high_saying_new` remains too threshold/light-forward for
  high-capacity Reflection phrase work.
- `contract.kitchen.high_tending_full` is shared and coherent but not deep
  enough for high capacity.
- Plant high-capacity outputs preserve Plant and disclose the gap, but still
  need stronger source-backed high-depth Plant ritual architecture later.
- Normal `How this was chosen` is now much cleaner, but the material-fit
  sentence can still feel a little compressed in some outputs.

## 9. Validation

Full validation was rerun after the final patch:

```bash
npm run lint:content
npm run typecheck
npm run test
npm run test -- tests/unit/recommendation-quality-report.test.ts
npm run recommendation:quality
npm run diagnose:content
npm run check
```

Results:

- `npm run lint:content` passed.
- `npm run typecheck` passed.
- `npm run test` passed: 27 files / 316 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts` passed:
  1 file / 15 tests.
- `npm run recommendation:quality` passed and reported the warning counts in
  this packet.
- `npm run diagnose:content` passed.
- `npm run check` passed, including build and Playwright e2e: 2 tests passed.

## 10. PR Notes Draft

Summary:

- Refactored presentation composition so normal ritual bodies read more
  authored while preserving ordered ritual steps.
- Added a narrow wrong-function guard so release forms do not dominate
  grounding/rest/beginning/tending/saying-clearly requests.
- Reworked `Why this fits` around material/action meaning, focus bridge,
  timing bridge, audience embodiment, and capacity depth.
- Simplified normal `How this was chosen` into 3-4 compact sections while
  preserving detailed diagnostics in report output.
- Added debug-only diagnostic explanation rendering to the `?debug=true`
  Developer decision record.
- Added `Closest compatible` expanded explanation for thin coverage cases.
- Removed core option menus from selected ritual presentations.

Scope:

- No new sources.
- No new SourceNotes.
- No new SymbolicCards.
- No new RitualPatterns.
- No new visible categories.
- No broad scoring/reachability expansion.
- No normal UI feature changes; debug UI now shows diagnostic explanation under `?debug=true`.
- No copied source wording.
- Normal output changed; debug/report diagnostics remain available.

Quality delta:

- Total scenarios: 107 -> 111.
- Authored request changes: 9 -> 5.
- Review required: 17 -> 8.
- Option-menu warnings: 3 -> 0.
- Audience-only warnings: 12 -> 0.
- Hidden coverage-gap warnings: 8 -> 0.
- High-capacity depth warnings: 7 -> 5.
- Closest-match overclaims warnings: 1 -> 1.
- Worsened scenarios: none.
- Changed selected patterns:
  `contract.surprise.low_resolves_real_category`,
  `issue222.candle.no_strong_timing`.

Merge recommendation:

- Hold for human review.

Handoff prompt:

Please review PR #242 for issue #237. Primary review doc: docs/content-audits/post-composer-refactor-review.md. Context: composer-level house-voice refactor for final recommendation presentation. Focus on wrong-function main cards, normal How this was chosen simplification, body/explanation integrity, high-capacity warning honesty, Both-of-us embodied action, closest-compatible disclosure, source-summary compression, and diagnostic integrity. Confirm scope, inspect full normal outputs, review quality delta/warning changes, check validation, and give blocking issues / non-blocking concerns / scenario IDs to fix later / merge recommendation.
