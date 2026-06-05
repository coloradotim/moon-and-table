# Post-247 Intention Copy Review

## PR Summary

Issue #247 fixes the presentation regression where `Intention` repeated the recommendation title/headline after the composer refactor. The patch keeps selection, scoring, sources, ritual patterns, and ritual bodies unchanged. It changes only final recommendation intention composition and the recommendation-quality guardrail for title/intention duplication.

## Scope Confirmation

- Runtime selection/scoring changed: no
- Sources changed: no
- Ritual content or patterns changed: no
- Visible categories changed: no
- UI changed: no
- Normal output changed: yes, `Intention` is now distinct from title/theme
- Diagnostics changed: yes, `title_intention_duplicate_without_depth` now catches normalized duplication even when the ritual body is longer

## Files Changed

- Presentation composer: `src/lib/generate-weekly-brief.ts`
- Recommendation-quality report checks: `scripts/recommendation-quality-report.ts`
- Tests: `tests/unit/recommendation-quality-report.test.ts`
- Docs: `docs/content-audits/post-247-intention-copy-review.md`

## Before / After Normal Outputs

### Candle/light + both + grounding + low

Scenario: `issue237.candle.both_grounding_low`

Selected pattern: `bank_the_house_light`

Before:
- Title/theme: Settle one light between you.
- Ritual body: Use the light as a shared settling place; keep the action small enough to end cleanly. Set one table lamp or supervised candle between you. One of you names one place in the room that can hold attention; the other touches the table once. Lower the light slightly together. Leave one ordinary warm thing beside the light: a cup, blanket, or quiet table. Close when the light is lowered and both hands have left the table.
- Intention: Settle one light between you.
- Best window: No strong timing window stood out this week. When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can both of you return to without working on it?
- Why this fits: A lowered household light can give both people one shared edge to return to. The material gives attention one edge to return to, then stops. No single timing window stood out strongly this week, so the ritual can happen whenever capacity allows. For both of you, the rite works through one small role each, or one shared object touched together. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The material gives attention one edge to return to, then stops. A lowered household light can give both people one shared edge to return to. Source lineage: household fire-banking customs. Timing fit: Timing does not need to lead here; the rite can stay close to capacity. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One lowered light, one ending, then no more work.
- Source summary: Source lineage: household fire-banking customs. Form kept contained.
- Warnings: none

After:
- Title/theme: Settle one light between you.
- Ritual body: Use the light as a shared settling place; keep the action small enough to end cleanly. Set one table lamp or supervised candle between you. One of you names one place in the room that can hold attention; the other touches the table once. Lower the light slightly together. Leave one ordinary warm thing beside the light: a cup, blanket, or quiet table. Close when the light is lowered and both hands have left the table.
- Intention: Let the light give attention a steady place to land.
- Best window: No strong timing window stood out this week. When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can both of you return to without working on it?
- Why this fits: A lowered household light can give both people one shared edge to return to. The material gives attention one edge to return to, then stops. No single timing window stood out strongly this week, so the ritual can happen whenever capacity allows. For both of you, the rite works through one small role each, or one shared object touched together. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The material gives attention one edge to return to, then stops. A lowered household light can give both people one shared edge to return to. Source lineage: household fire-banking customs. Timing fit: Timing does not need to lead here; the rite can stay close to capacity. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One lowered light, one ending, then no more work.
- Source summary: Source lineage: household fire-banking customs. Form kept contained.
- Warnings: none

### Kitchen/Home + both + tending us + low

Scenario: `tending_us.low.bounded`

Selected pattern: `quiet_welcome`

Before:
- Title/theme: Set out a quiet welcome.
- Ritual body: Welcome is the ritual form, not a performance; choose one ordinary welcome vessel; a cup or small bowl is enough. Set one cup or small bowl at the table between you. One of you names what is welcome here; the other touches the vessel once. Return or wash the vessel when finished. Close when the vessel has been returned or washed.
- Intention: Set out a quiet welcome.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What welcome can the shared vessel hold for both of you?
- Why this fits: A modest bowl, cup, bread, or grain can make hospitality visible without demanding belief. The shared material carries tending-us as a small action, not a long talk. Seasonal timing asks for a small marker, not a public calendar performance. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Home remains the material path. The shared material carries tending-us as a small action, not a long talk. A modest bowl, cup, bread, or grain can make hospitality visible without demanding belief. Source lineage: quiet household welcome forms. Timing fit: Seasonal timing asks for a small marker, not a public calendar performance. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One vessel, one welcome, then the vessel returns.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: none

After:
- Title/theme: Set out a quiet welcome.
- Ritual body: Welcome is the ritual form, not a performance; choose one ordinary welcome vessel; a cup or small bowl is enough. Set one cup or small bowl at the table between you. One of you names what is welcome here; the other touches the vessel once. Return or wash the vessel when finished. Close when the vessel has been returned or washed.
- Intention: Let the table give care a small shared form.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What welcome can the shared vessel hold for both of you?
- Why this fits: A modest bowl, cup, bread, or grain can make hospitality visible without demanding belief. The shared material carries tending-us as a small action, not a long talk. Seasonal timing asks for a small marker, not a public calendar performance. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Home remains the material path. The shared material carries tending-us as a small action, not a long talk. A modest bowl, cup, bread, or grain can make hospitality visible without demanding belief. Source lineage: quiet household welcome forms. Timing fit: Seasonal timing asks for a small marker, not a public calendar performance. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One vessel, one welcome, then the vessel returns.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: none

### Candle/light + high + beginning

Scenario: `issue237.candle.both_high_beginning`

Selected pattern: `first_light_at_the_threshold`

Before:
- Title/theme: Let first light mark the threshold.
- Ritual body: Use light as the first mark, not as pressure; let the doorway hold the beginning. Set one first household light near the doorway. One of you writes the beginning in one sentence and places the paper just inside the threshold; the other touches the doorframe. Step across once together. Let the light hold the sentence until the next return to the room. Return later together, lift the paper, and put it in an ordinary holding place. Close when the paper has been returned or put away and both of you have crossed back into ordinary use.
- Intention: Let first light mark the threshold.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Carry prompt: What beginning becomes stronger when both of you let it wait at the threshold first?
- Why this fits: Kindling and first-sighting traditions make a beginning visible before it becomes a project. The ritual gives the beginning a first body before it becomes work. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. For both of you, the rite works through one small role each, or one shared object touched together. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The ritual gives the beginning a first body before it becomes work. Kindling and first-sighting traditions make a beginning visible before it becomes a project. Source lineage: household fire-kindling and first-light threshold logic. Timing fit: New-moon darkness makes the first light small: it opens the beginning, then stops before proof. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One first light, one crossing, one later return.
- Source summary: Source lineage: household fire-kindling and first-light threshold logic. Form kept contained.
- Warnings: none

After:
- Title/theme: Let first light mark the threshold.
- Ritual body: Use light as the first mark, not as pressure; let the doorway hold the beginning. Set one first household light near the doorway. One of you writes the beginning in one sentence and places the paper just inside the threshold; the other touches the doorframe. Step across once together. Let the light hold the sentence until the next return to the room. Return later together, lift the paper, and put it in an ordinary holding place. Close when the paper has been returned or put away and both of you have crossed back into ordinary use.
- Intention: Let the threshold hold the beginning before it becomes work.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Carry prompt: What beginning becomes stronger when both of you let it wait at the threshold first?
- Why this fits: Kindling and first-sighting traditions make a beginning visible before it becomes a project. The ritual gives the beginning a first body before it becomes work. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. For both of you, the rite works through one small role each, or one shared object touched together. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The ritual gives the beginning a first body before it becomes work. Kindling and first-sighting traditions make a beginning visible before it becomes a project. Source lineage: household fire-kindling and first-light threshold logic. Timing fit: New-moon darkness makes the first light small: it opens the beginning, then stops before proof. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One first light, one crossing, one later return.
- Source summary: Source lineage: household fire-kindling and first-light threshold logic. Form kept contained.
- Warnings: none

### Plant + both + high + tending home

Scenario: `contract.plant.both_high_tending_waning`

Selected pattern: `plant_witness_to_growth`

Before:
- Title/theme: Let the plant witness the household tending.
- Ritual body: Let the plant hold attention without becoming a task; speak softly or silently. Set one plant, leaf, seed, or plant image where both of you can see it. One of you names what in the home is still living; the other names what can be left undisturbed. Let the plant witness both words through one quiet minute. Return the plant or image to its ordinary place without adding a task. Close when the plant is back in its ordinary place and no new task has been added.
- Intention: Let the plant witness the household tending.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What in the home can be tended by being witnessed and left steady?
- Why this fits: Plant folklore and flower-language traditions can make a living thing a witness, not a prop. The household material makes tending visible, then returns to ordinary use. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Plant remains the material path. The household material makes tending visible, then returns to ordinary use. Plant folklore and flower-language traditions can make a living thing a witness, not a prop. Source lineage: plant-lore living witness and flower-message logic. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One primary ritual, no task list. Closest compatible: The grimoire does not yet have a deeper Plant + home-tending rite. It keeps Plant at the center rather than drifting to a stronger non-Plant form.
- Source summary: Source lineage: plant-lore living witness and flower-message logic. Form kept contained.
- Warnings: coverage_gap_category_focus_capacity, recommendation_confidence_limited, high_capacity_depth_gap, closest_compatible_pattern_selected, stronger_wrong_category_rejected

After:
- Title/theme: Let the plant witness the household tending.
- Ritual body: Let the plant hold attention without becoming a task; speak softly or silently. Set one plant, leaf, seed, or plant image where both of you can see it. One of you names what in the home is still living; the other names what can be left undisturbed. Let the plant witness both words through one quiet minute. Return the plant or image to its ordinary place without adding a task. Close when the plant is back in its ordinary place and no new task has been added.
- Intention: Let the plant give household care one concrete place to land.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What in the home can be tended by being witnessed and left steady?
- Why this fits: Plant folklore and flower-language traditions can make a living thing a witness, not a prop. The household material makes tending visible, then returns to ordinary use. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Plant remains the material path. The household material makes tending visible, then returns to ordinary use. Plant folklore and flower-language traditions can make a living thing a witness, not a prop. Source lineage: plant-lore living witness and flower-message logic. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One primary ritual, no task list. Closest compatible: The grimoire does not yet have a deeper Plant + home-tending rite. It keeps Plant at the center rather than drifting to a stronger non-Plant form.
- Source summary: Source lineage: plant-lore living witness and flower-message logic. Form kept contained.
- Warnings: coverage_gap_category_focus_capacity, recommendation_confidence_limited, high_capacity_depth_gap, closest_compatible_pattern_selected, stronger_wrong_category_rejected

### Plant + clearing/release + low

Scenario: `batch1.plant.dead_leaf_release`

Selected pattern: `dead_leaf_release`

Before:
- Title/theme: Release only the dead leaf.
- Ritual body: Look before touching; do not make release larger than the leaf. Choose one already dead or fallen leaf. Remove only that spent matter, or choose observation if none is ready. Name what is complete and place the leaf in trash, compost, or outside if appropriate. Close when the leaf has left your hand.
- Intention: Release only the dead leaf.
- Best window: When you have five quiet minutes.
- Optional accent: Let the plant remain untouched after the spent leaf is gone.
- Carry prompt: What is as complete as the spent leaf?
- Why this fits: A spent leaf gives release a precise edge: remove what is already finished, not what is alive. The material gives release one path out and one clear stop. Waning moon supports this form without making the timing a command. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Plant remains the material path. The material gives release one path out and one clear stop. A spent leaf gives release a precise edge: remove what is already finished, not what is alive. Source lineage: plant growth and rest traditions. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: This stays small: one material action and a clean close. One spent leaf, one release, then the plant is left alone.
- Source summary: Source lineage: plant growth and rest traditions. Form kept contained.
- Warnings: none

After:
- Title/theme: Release only the dead leaf.
- Ritual body: Look before touching; do not make release larger than the leaf. Choose one already dead or fallen leaf. Remove only that spent matter, or choose observation if none is ready. Name what is complete and place the leaf in trash, compost, or outside if appropriate. Close when the leaf has left your hand.
- Intention: Let what is already finished leave cleanly.
- Best window: When you have five quiet minutes.
- Optional accent: Let the plant remain untouched after the spent leaf is gone.
- Carry prompt: What is as complete as the spent leaf?
- Why this fits: A spent leaf gives release a precise edge: remove what is already finished, not what is alive. The material gives release one path out and one clear stop. Waning moon supports this form without making the timing a command. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Plant remains the material path. The material gives release one path out and one clear stop. A spent leaf gives release a precise edge: remove what is already finished, not what is alive. Source lineage: plant growth and rest traditions. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: This stays small: one material action and a clean close. One spent leaf, one release, then the plant is left alone.
- Source summary: Source lineage: plant growth and rest traditions. Form kept contained.
- Warnings: none

### Open preference resolved to Candle/light + resting + low

Scenario: `issue237.surprise.both_resting_low`

Selected pattern: `full_light_on_the_table`

Before:
- Title/theme: Let one light hold a line between you.
- Ritual body: Use the light only long enough to mark the pause; let the close make the room quieter. Place one table light between you. Each offer one word or share one short line. Lower the light together. Close when the light is lowered between you.
- Intention: Let one light hold a line between you.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can the shared light hold for both of you?
- Why this fits: If full light is selected for rest, the ritual should end by reducing brightness rather than sharpening it. The action lets rest be held by material instead of explained into more work. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. If full light is selected for rest, the ritual should end by reducing brightness rather than sharpening it. Source lineage: hearth/table first-and-last logic. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One light, one line, then the light changes.
- Source summary: Source lineage: hearth/table first-and-last logic. Form kept contained.
- Warnings: none

After:
- Title/theme: Let one light hold a line between you.
- Ritual body: Use the light only long enough to mark the pause; let the close make the room quieter. Place one table light between you. Each offer one word or share one short line. Lower the light together. Close when the light is lowered between you.
- Intention: Let the light hold rest without asking for more.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can the shared light hold for both of you?
- Why this fits: If full light is selected for rest, the ritual should end by reducing brightness rather than sharpening it. The action lets rest be held by material instead of explained into more work. Waning moon supports this form without making the timing a command. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. If full light is selected for rest, the ritual should end by reducing brightness rather than sharpening it. Source lineage: hearth/table first-and-last logic. Timing fit: Waning moon supports this form without making the timing a command. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One light, one line, then the light changes.
- Source summary: Source lineage: hearth/table first-and-last logic. Form kept contained.
- Warnings: none

## Quality Delta

Baseline: `origin/main` at `f3f82bc`

Current: `codex/issue-247-distinct-intentions`

Summary:
- Total scenarios: 111 -> 111
- Contract request changes: 4 -> 4
- Authored request changes: 5 -> 5
- Review required: 8 -> 8
- High-capacity depth warnings: 5 -> 5
- Audience-only warnings: 0 -> 0
- Coverage-gap hidden warnings: 0 -> 0
- Option-menu warnings: 0 -> 0
- Distinct selected patterns: 31 -> 31
- Changed selected patterns: none
- New warnings: none
- Resolved warnings: none

Improved scenario IDs:
- `issue237.candle.both_grounding_low`
- `tending_us.low.bounded`
- `issue237.candle.both_high_beginning`
- `contract.plant.both_high_tending_waning`
- `batch1.plant.dead_leaf_release`
- `issue237.surprise.both_resting_low`

Worsened scenario IDs:
- none observed

Warning integrity:
- Warnings did not decrease because diagnostics were weakened.
- `title_intention_duplicate_without_depth` is stricter: normalized title/intention duplication now warns regardless of ritual body length.
- The headline delta counts are unchanged because the old detector did not catch these longer generated outputs. The before/after evidence above shows normal copy improved while selection and warnings stayed stable.

## Validation

Passed:
- `npm run lint:content`
- `npm run typecheck`
- `npm run test`
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`
- `npm run recommendation:quality`
- `npm run diagnose:content`
- `npm run check`

## Merge Recommendation

Hold for human review of the six before/after normal outputs.
