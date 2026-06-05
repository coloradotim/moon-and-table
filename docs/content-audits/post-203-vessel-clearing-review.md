# Post-203 Vessel And Clearing Review

Status: hold for human review

## PR / Branch Summary

- PR number and title: #216 - Strengthen vessel emptying and clearing forms
- Branch: `codex/issue-203-vessel-clearing-forms`
- Base branch: `main`
- Base commit at branch start: `f28acc8b7062962db8965e6f106d3637d91521d3`
- Implementation commit: `519daf1`
- Issue addressed: #203
- Implementation summary: strengthened vessel, emptying, rinsing, and return language without adding sources, active SourceNotes, visible categories, or a new ritual pattern. Salt/water remains selected for explicit clearing/release; vessel emptying now has clearer presentation and diagnostics.

Files changed by purpose:

- SourceNotes/cards/patterns: `src/data/batch-1-ritual-library.ts`
- Composer/source-summary language: `src/lib/generate-weekly-brief.ts`
- Diagnostics/report families: `src/lib/ritual-form-families.ts`
- Scenarios/tests: `tests/fixtures/recommendation-quality-scenarios.ts`, `tests/unit/recommendation-quality-report.test.ts`
- Docs: this review packet

Cleanup patch for PR #216:

- Removed the exact `clear_the_threshold_bowl` pattern key from `issue203.seasonal.end_empty_return`; the scenario now uses material/form styles only: seasonal, closing, emptying, return, bowl, vessel.
- Narrowed `vessel_empty_return` expected-family diagnostics so Seasonal scenarios do not all count as vessel-emptying work. The family is expected only when focus or styles point to clearing, emptying, return, rinsing, bowl, vessel, or closing.
- Changed `clear_the_threshold_bowl` normal closing copy from "empty, clean, or back in its place" to "empty, rinsed, or back in its place."

Scope confirmations:

- New visible categories added: no.
- New sources added: no.
- Active SourceNotes added: no.
- RitualPatterns added: no.
- Scoring/reachability changed: no broad scoring or reachability expansion. Pattern style metadata and internal diagnostic form-family labels were refined.
- Diagnostics/debug output hidden: no.
- Copied source text added: no.
- Private data added: no.

## Exact SourceNotes / Cards / Patterns Changed

Cards changed or added:

- `bowl_vessel`: revised from generic hold/receive/release to hold/empty/rinse/return.
- `empty_bowl`: new internal SymbolicCard grounded in existing notes.
- `rinsed_bowl`: new internal SymbolicCard grounded in existing notes.

Patterns changed:

- `salt_clear_water_release`: clearer release-only role, rinsing as closure, no threshold-arrival style.
- `clear_the_threshold_bowl`: stronger empty/rinse/return body and lineage.
- `seasonal_marker_bowl`: stronger marker/return body and lineage.
- `folded_phrase_vessel`: later return/put-away closure added.

Composer/diagnostic changes:

- `getPatternMaterialPhrase`, `getBoundaryPhrase`, and `getCompressedLineage` now distinguish salt-water clearing from vessel emptying/return.
- Internal `vessel_empty_return` ritual-form family added for diagnostics/reporting. This is not a visible category.

## Source Support And Exact Location Basis

No new active SourceNotes were added. Source support remains traceable through existing approved Batch 1 notes:

- `note.domestic_action_as_boundary_marker`
  - Source: Bergen, _Current Superstitions_, domestic boundary action context.
  - Used for: ordinary placing, removing, crossing, emptying, rinsing, returning.
  - Transformed: domestic action becomes bounded ritual mechanics, not superstition-as-rule.
  - Avoided: threats, omens, protection, warding, deterministic customs.
- `note.calendar_customs_as_household_thresholds`
  - Source: Thiselton-Dyer, _British Popular Customs_, calendar threshold context.
  - Used for: seasonal/end/month-turn closure and first/last household markers.
  - Transformed: public calendar custom becomes private household threshold/return.
  - Avoided: public festival reenactment, church obligation, universal framing.
- `note.salt_as_folk_clearing_material`
  - Source: Lawrence, _The Magic of the Horse-shoe_, salt and domestic folklore context.
  - Used for: salt only when clearing/release is explicit.
  - Transformed: salt is a small clearing material with outward close.
  - Guardrail: no protection guarantees, luck, bad-luck threats, or danger removal.
- `note.quiet_offering_as_welcome`
  - Source: Keightley, _The Fairy Mythology_, hospitality/offering mechanics.
  - Used for: bowl/cup/welcome as modest household vessel context.
  - Transformed: welcome vessel remains belief-neutral and ordinary.
  - Avoided: literal spirit feeding, bargains, servitor logic.
- `note.hearth_first_and_last`
  - Source: _The Homeric Hymns_, hearth/table first-and-last mechanics.
  - Used for: household center and first/last attention.
  - Transformed: hearth/table mechanics, not worship reenactment.
  - Avoided: deity invocation and copied hymn language.
- `note.flower_language_private_message`
  - Source: _Language of Flowers_, symbolic-message structure.
  - Used for: folded phrase as private held object.
  - Transformed: private phrase object, not fixed Victorian meaning.
  - Avoided: romance-book tone, universal meanings, copied entries.
- `note.new_moon_first_sighting` and `note.waxing_and_waning_visibility`
  - Sources: approved Carmina/NASA timing notes.
  - Used for: timing bridge and release/beginning honesty.
  - Guardrail: no prediction, obligation, or magical causality claims.

## Before / After Examples

### Salt and clear water

Before:

- "Salt and clear water give the release a vessel and a clean way out."
- Closure was present, but salt/water could still read as broadly useful clearing technology.

After:

- "Salt and clear water belong to explicit release: the named thing leaves, then the bowl returns."
- Ritual body now pours away, rinses the bowl, and returns it to ordinary use.

### Clear the threshold bowl

Before:

- "A vessel can release by being emptied, washed, and returned to ordinary use."
- Source summary often compressed to generic pattern/card language.

After:

- "A vessel can close by emptying what it held and becoming ordinary again."
- Source lineage is now "emptying, returning, and household threshold-vessel logic."

### Seasonal marker bowl

Before:

- Seasonal marker bowl held a marker until return, but the later return was less integrated.

After:

- The bowl holds one marker, then the marker returns or the bowl is emptied when done.
- Source lineage is now "seasonal marker and vessel-return logic."

### Folded phrase vessel

Before:

- Placement was the close: "Close when the folded phrase is placed."

After:

- The phrase has a place and a later ordinary return: "Close when the folded phrase has a place; its later return can stay ordinary."

## Salt-Water Overuse Audit

Baseline from merged #202:

- Scenarios sampled: 52.
- `salt_clear_water_release`: 4 selections.
- `clear_the_threshold_bowl`: 2 selections.
- `threshold_bowl`: 1 selection.
- `seasonal_marker_bowl`: 3 selections.
- `folded_phrase_vessel`: 3 selections.

After #203:

- Scenarios sampled: 53.
- `salt_clear_water_release`: 4 selections.
- `clear_the_threshold_bowl`: 3 selections.
- `threshold_bowl`: 1 selection.
- `seasonal_marker_bowl`: 3 selections.
- `folded_phrase_vessel`: 3 selections.

Salt/water correctly wins:

- `batch1.home.salt_water_clearing` -> `salt_clear_water_release`.
- `issue183.kitchen.clearing_salt` -> `salt_clear_water_release`.

Salt/water correctly loses:

- `home.threshold.arrival` -> `threshold_bowl`.
- `issue183.home.tending_steady` -> `house_from_root_to_roof`.
- `batch1.seasonal.marker_bowl` -> `seasonal_marker_bowl`.
- `batch1.surprise_me.resolves_visible_category` -> `folded_phrase_vessel`.

Concentration review:

- `salt_clear_water_release` remains at 4 selections, unchanged from #202.
- The new scenario increases `clear_the_threshold_bowl` to 3, proving vessel emptying can be reached without increasing salt/water concentration.
- After removing the exact pattern key from `issue203.seasonal.end_empty_return`, the scenario still selects `clear_the_threshold_bowl`.
- Broad pattern concentration: none.

## Vessel / Emptying Reachability Audit

Reachable vessel-emptying forms:

- `clear_the_threshold_bowl`: selected for last-day/seasonal end emptying.
- `seasonal_marker_bowl`: selected for seasonal marker/return.
- `folded_phrase_vessel`: selected for reflection phrase containment and return.
- `salt_clear_water_release`: selected for explicit Home/Kitchen clearing, with salt/water constrained to release.

Required scenario coverage:

| Required scenario | Scenario id | Selected pattern | Result |
|---|---|---|---|
| Home + clearing + waning | `batch1.home.salt_water_clearing` | `salt_clear_water_release` | Pass: salt/water belongs to clearing/release. |
| Kitchen + clearing + waning | `issue183.kitchen.clearing_salt` | `salt_clear_water_release` | Pass: kitchen clearing still reaches salt/water. |
| Seasonal + end/last day/month turn | `issue203.seasonal.end_empty_return` | `clear_the_threshold_bowl` | Pass: emptying/returning vessel wins without requiring salt-water. |
| Home + threshold arrival | `home.threshold.arrival` | `threshold_bowl` | Pass: arrival remains crossing/return, not salt-water. |
| Home + tending steady | `issue183.home.tending_steady` | `house_from_root_to_roof` | Pass: home tending does not become salt-water clearing. |
| Reflection + release | `issue183.reflection.waning_release` | `waning_phrase_release` | Pass: phrase/release form wins. |
| Seasonal marker bowl | `batch1.seasonal.marker_bowl` | `seasonal_marker_bowl` | Pass: marker/return, not generic bowl and not salt-water. |
| Surprise me | `batch1.surprise_me.resolves_visible_category` | `folded_phrase_vessel` | Pass: resolves to Reflection before vessel logic. |

## Warning Counts

`npm run recommendation:quality` after the patch:

- Scenarios sampled: 53.
- `pause_with_imperative_steps`: 0.
- `generic_optional_candle`: 0.
- `candle_ritual_with_candle_addon`: 0.
- `focus_timing_unbridged`: 0.
- `raw_score_language_in_user_copy`: 0.
- `debug_key_in_user_copy`: 0.
- `generic_closing_repeated`: 0.
- `carry_prompt_contradicts_focus`: 0.
- `best_window_reason_too_thin`: 0.
- `source_id_visible_in_normal_copy`: 0.
- `missing_presentation_selected`: 0.
- `task_dressed_pattern_selected`: 0.
- `surprise_me_unresolved`: 0.

## Selected Pattern Concentration

After #203:

- Distinct selected patterns: 25.
- `bread_at_the_center`: 4.
- `first_light_at_the_threshold`: 4.
- `honeyed_word`: 4.
- `salt_clear_water_release`: 4.
- `clear_the_threshold_bowl`: 3.
- `folded_phrase_vessel`: 3.
- `full_light_on_the_table`: 3.
- `seasonal_marker_bowl`: 3.
- `seed_waiting`: 3.

Broad pattern concentration: none.

## Full Normal-Output Examples

Normal user-facing copy only; score dumps are excluded.

### `batch1.home.salt_water_clearing`

- Title/theme: Let salt and clear water carry one release.
- Ritual body: Keep the release specific and small. Let rinsing be closure, not another ritual. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away. Rinse the bowl and return it to ordinary use. Close when the bowl is rinsed and empty.
- Intention: Let salt and clear water carry one release.
- Best window: When you have five quiet minutes.
- Optional accent: Let the empty bowl sit for one breath before putting it away.
- Carry prompt: What feels finished when it has somewhere ordinary to go?
- Why this fits: You chose Home, clearing something out, low capacity. Waning moon supports this form without making the timing a command. Salt and clear water belong to explicit release: the named thing leaves, then the bowl returns. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Home, clearing something out, low capacity. Timing shaped it through waning support. Focus stayed in clearing. Ritual form: salt and water belong because one named thing leaves and the bowl becomes ordinary again. Material lineage: salt-water clearing and rinsed-vessel logic. Kept bounded: one named release, one emptied bowl, then ordinary return.
- Source summary: Source lineage: salt-water clearing and rinsed-vessel logic. Form kept contained.
- Warnings: none.

### `issue183.kitchen.clearing_salt`

- Title/theme: Let salt and clear water carry one release.
- Ritual body: Keep the release specific and small. Let rinsing be closure, not another ritual. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away. Rinse the bowl and return it to ordinary use. Close when the bowl is rinsed and empty.
- Intention: Let salt and clear water carry one release.
- Best window: When you have five quiet minutes.
- Optional accent: Let the empty bowl sit for one breath before putting it away.
- Carry prompt: What feels finished when it has somewhere ordinary to go?
- Why this fits: You chose Kitchen, clearing something out, low capacity. Waning moon supports this form without making the timing a command. Salt and clear water belong to explicit release: the named thing leaves, then the bowl returns. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Kitchen, clearing something out, low capacity. Timing shaped it through waning support. Focus stayed in clearing. Ritual form: salt-water release, then vessel return. Material lineage: salt-water clearing and rinsed-vessel logic.
- Source summary: Source lineage: salt-water clearing and rinsed-vessel logic. Form kept contained.
- Warnings: none.

### `issue203.seasonal.end_empty_return`

- Title/theme: Empty the threshold bowl.
- Ritual body: Let emptying be the action. Do not add new meaning while closing the old one. Choose a bowl or vessel that has been holding a marker. Name what is finished or ready to be put away. Empty, rinse, or return the marker. Put the bowl back in its ordinary place. Close when the bowl is empty, rinsed, or back in its place.
- Intention: Empty the threshold bowl.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What changes when the vessel is empty again?
- Why this fits: You chose Seasonal, clearing something out, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The vessel closes by emptying what it held and becoming ordinary again. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Seasonal, clearing something out, low capacity. Timing shaped it as a closing rite. Ritual form: vessel emptying and return. Material lineage: emptying, returning, and household threshold-vessel logic. Kept bounded: one held marker, one emptying, then the vessel returns.
- Source summary: Source lineage: emptying, returning, and household threshold-vessel logic. Form kept contained.
- Warnings: none.

### `calendar.last_day.closing_bowl`

- Title/theme: Empty the threshold bowl.
- Ritual body: Let emptying be the action. Do not add new meaning while closing the old one. Choose a bowl or vessel that has been holding a marker. Name what is finished or ready to be put away. Empty, rinse, or return the marker. Put the bowl back in its ordinary place. Close when the bowl is empty, rinsed, or back in its place.
- Intention: Empty the threshold bowl.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What changes when the vessel is empty again?
- Why this fits: You chose Seasonal, clearing something out, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The vessel closes by emptying what it held and becoming ordinary again. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Seasonal, clearing something out, low capacity. Timing shaped it as a closing rite. Ritual form: vessel emptying and return. Material lineage: emptying, returning, and household threshold-vessel logic.
- Source summary: Source lineage: emptying, returning, and household threshold-vessel logic. Form kept contained.
- Warnings: none.

### `home.threshold.arrival`

- Title/theme: Give the threshold a bowl.
- Ritual body: Use the bowl only when the doorway is the real ritual place. Keep the words plain and brief. Place a small bowl by a doorway, entry shelf, or table edge. Put in a key or ordinary object and name what crosses in with you. Cross the threshold once, then move the object back to ordinary use. Close when the object returns or the bowl is moved away from the threshold.
- Intention: Give the threshold a bowl.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What belongs with you after this crossing?
- Why this fits: You chose Home, marking a threshold, steady capacity. Waxing moon supports this form without making the timing a command. The bowl gives arrival a small place to gather, cross, and end. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Home, marking a threshold, steady capacity. Ritual form: arrival/crossing/return, not clearing. Material lineage: threshold crossing and bowl-vessel household logic.
- Source summary: Source lineage: threshold crossing and bowl-vessel household logic. Form kept contained.
- Warnings: none.

### `issue183.home.tending_steady`

- Title/theme: Walk the house from root to roof.
- Ritual body: Move by places of contact, not by cleaning. Use plain household words instead of borrowed prayer language. Touch the floor or lowest safe point and name what supports the home. Touch a wall, beam, or table and name what holds. Stand at the threshold and name what the house carries forward. Close by touching the threshold and leaving the map complete.
- Intention: Walk the house from root to roof.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What part of this home is holding more than you noticed?
- Why this fits: You chose Home, tending the home, steady capacity. Seasonal timing asks for a small marker, not a public calendar performance. Touch simple house places to bless the structure in plain household words. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Home, tending the home, steady capacity. Ritual form: house map. Salt/water was not used because clearing was not explicit.
- Source summary: Source lineage: waxing moon card and house from root to roof pattern. Form kept contained.
- Warnings: none.

### `issue183.reflection.waning_release`

- Title/theme: Let the waning phrase leave.
- Ritual body: Keep the phrase concrete. Let removal be the ritual body. Write or speak one phrase about what is complete enough. Tear it, dissolve it in plain water, throw it away, or place it in a closed book. Open your hands when the phrase is gone or contained. Close with empty hands.
- Intention: Let the waning phrase leave.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What is complete enough to leave your hands?
- Why this fits: You chose Reflection, clearing something out, low capacity. Waning moon supports this form without making the timing a command. Give one completion phrase a clean removal, dissolving, tearing, or placing-away close. Private context supports warmth, beauty, and affection in a small, contained rite.
- How this was chosen: Chosen for Reflection, clearing something out, low capacity. Ritual form: phrase release, not salt-water clearing. Material lineage: waning-light and household removal logic.
- Source summary: Source lineage: waning-light and household removal logic. Form kept contained.
- Warnings: none.

### `batch1.seasonal.marker_bowl`

- Title/theme: Let one bowl mark the season.
- Ritual body: Use one ordinary material already in the home. Let the bowl hold the season without decorating the house. Choose one small seasonal marker; a leaf, key, grain, or bread piece is enough. Place it in a small bowl and name what this season is asking the home to hold, begin, or release. Leave the bowl where it can rest until the next return to the table. When the marker is done, return it to ordinary use or empty the bowl. Close by leaving the bowl alone until its next ordinary return.
- Intention: Let one bowl mark the season.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What season is this home actually in?
- Why this fits: You chose Seasonal, both of you, marking a threshold, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The bowl gives seasonal change one household marker to hold, then return. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for Seasonal, both of you, marking a threshold, low capacity. Ritual form: seasonal marker/return. Material lineage: seasonal marker and vessel-return logic.
- Source summary: Source lineage: seasonal marker and vessel-return logic. Form kept contained.
- Warnings: none.

### `batch1.surprise_me.resolves_visible_category`

- Title/theme: Give the words a fold.
- Ritual body: Write one sentence only. Let the fold contain the words. Write one clear phrase on a small piece of paper. Fold it once toward itself. Place it in a bowl, book, pocket, or near a plant pot. When the phrase has done its holding, return it or put it away. Close when the folded phrase has a place; its later return can stay ordinary.
- Intention: Give the words a fold.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What changes when the phrase has a place to be held?
- Why this fits: You chose Reflection, saying something clearly, steady capacity. The timing gives the phrase a clear place without turning it into a report. The fold turns the phrase into a held object with a place and a later return. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Surprise me resolved to Reflection before vessel logic. Ritual form: folded phrase with later return. Material lineage: folded-word and household container-return logic.
- Source summary: Source lineage: folded-word and household container-return logic. Form kept contained.
- Warnings: none.

### `batch1.reflection.folded_phrase`

- Title/theme: Give the words a fold.
- Ritual body: Write one sentence only. Let the fold contain the words. Write one clear phrase on a small piece of paper. Fold it once toward itself. Place it in a bowl, book, pocket, or near a plant pot. When the phrase has done its holding, return it or put it away. Close when the folded phrase has a place; its later return can stay ordinary.
- Intention: Give the words a fold.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What changes when the phrase has a place to be held?
- Why this fits: You chose Reflection, saying something clearly, low capacity. The timing gives the phrase a clear place without turning it into a report. The fold turns the phrase into a held object with a place and a later return. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Chosen for Reflection, saying something clearly, low capacity. Ritual form: folded phrase with later return. Material lineage: folded-word and household container-return logic.
- Source summary: Source lineage: folded-word and household container-return logic. Form kept contained.
- Warnings: none.

## Awkward Outputs / Remaining Risks

- `clear_the_threshold_bowl` still carries threshold family language because it can be a threshold vessel, even when the normal output is mostly emptying/return. The new `vessel emptying/return` diagnostic family helps separate it from salt-water.
- `salt_clear_water_release` remains at 4 selected scenarios. It did not increase, but it remains one of the concentrated patterns and should keep being monitored.
- The phrase "household field" remains in salt-water normal copy from earlier Batch 1 wording. It is not a prohibited claim, but it may be worth a later house-voice pass if it feels too abstract.
- No new exact #191 SourceNotes were activated; this keeps source hygiene tight, but the issue may still want future Tim-reviewed SourceNotes if deeper vessel work expands.

## Validation Results

Commands to run before PR publication:

```bash
npm run lint:content
npm run typecheck
npm run test
npm run test -- tests/unit/recommendation-quality-report.test.ts
npm run recommendation:quality
npm run diagnose:content
npm run check
```

Current completed validation:

- `npm run lint:content`: passed with no findings.
- `npm run typecheck`: passed.
- `npm run test`: passed, 26 files, 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 1 file, 9 tests.
- `npm run recommendation:quality`: passed, 53 scenarios, zero warning counts, 25 distinct selected patterns.
- `npm run diagnose:content`: passed, 91 sampled scenarios.
- `npm run check`: passed. Build completed with the existing Vite chunk-size notice; Playwright e2e passed 2 tests with the existing `NO_COLOR` / `FORCE_COLOR` warning.

## PR Notes Draft

What changed:

- Added internal `empty_bowl` and `rinsed_bowl` SymbolicCards using existing approved SourceNotes.
- Strengthened `bowl_vessel`, `salt_clear_water_release`, `clear_the_threshold_bowl`, `seasonal_marker_bowl`, and `folded_phrase_vessel`.
- Added internal `vessel_empty_return` form family for diagnostics/reporting.
- Added `issue203.seasonal.end_empty_return` and tests proving salt-water wins explicit clearing and loses arrival/tending/marker/surprise cases.
- Cleanup patch removed the exact target pattern key from `issue203.seasonal.end_empty_return`, narrowed Seasonal `vessel_empty_return` expectations, and changed threshold-bowl closure from "clean" to "rinsed."

Source support:

- No new sources and no active SourceNotes added.
- Grounding uses existing approved Batch 1 notes listed above.
- No copied source wording.

Before/after:

- Salt/water now says release leaves and the bowl returns.
- Seasonal emptying selects `clear_the_threshold_bowl` without naming that exact pattern key in preferred styles and without making salt-water required.
- Seasonal marker bowl now has marker/return closure.
- Folded phrase vessel now includes a later ordinary return.

Validation:

- `npm run lint:content`: passed with no findings.
- `npm run typecheck`: passed.
- `npm run test`: passed, 26 files, 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 1 file, 9 tests.
- `npm run recommendation:quality`: passed, 53 scenarios, zero warning counts.
- `npm run diagnose:content`: passed, 91 sampled scenarios.
- `npm run check`: passed, including build, unit tests, and 2 Playwright e2e tests.

Merge recommendation:

hold for human review
