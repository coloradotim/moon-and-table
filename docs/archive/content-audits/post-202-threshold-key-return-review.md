> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Post-202 Threshold, Key, And Return Review

Status: hold for human review

## 1. PR / Branch Summary

- PR number and title: #215 - Strengthen threshold, key, and return forms
- Branch: `codex/issue-202-threshold-return-forms`
- Base branch: `main`
- Implementation commit SHA: `a7593e0f118df04d51440d609eac1a99060ea7de`
- Base commit at branch start: `4280ec366c7a72f42966aa8c8019f6a0cf341839`
- Issue addressed: #202
- Implementation summary: tightened threshold/key/return presentation, added source-backed threshold cards from existing approved notes, narrowed threshold eligibility, removed threshold as the generic low-capacity default, and added win/loss quality scenarios.

Files changed by purpose:

- SourceReviews / SourceNotes: no active SourceReviews or SourceNotes added. Existing approved Batch 1 SourceNotes are reused in `src/data/batch-1-ritual-library.ts`.
- SymbolicCards: `src/data/batch-1-ritual-library.ts` adds `threshold_arrival`, `returnable_key`, and `threshold_word`.
- RitualPatterns / RitualPresentation: `src/data/batch-1-ritual-library.ts` revises `threshold_bowl`, `carried_key_word`, `seasonal_entry_bowl`, and `last_word_first_word`.
- Composer/source summary changes: `src/lib/generate-weekly-brief.ts` updates threshold/key material phrases, bounded-form phrases, compressed lineage, and the low-capacity default fallback.
- Scenarios/tests: `tests/fixtures/recommendation-quality-scenarios.ts` adds Issue #202 win/loss scenarios; `tests/unit/recommendation-quality-report.test.ts` pins expected selections, blocked normal-copy phrases, and threshold-loss cases.
- Diagnostics/report changes: no debug/report output is hidden. The recommendation-quality bench gains new scenarios and assertions only.
- Docs: this review packet.

## 2. Scope Confirmation

- New visible categories added: no.
- New sources added: no.
- Active SourceNotes added: no.
- SymbolicCards added: yes, internal approved cards `threshold_arrival`, `returnable_key`, and `threshold_word`.
- RitualPatterns added: no.
- RitualPresentation changes: yes, for `threshold_bowl`, `carried_key_word`, `seasonal_entry_bowl`, and `last_word_first_word`.
- Scoring/reachability changes: yes, narrowly. The generic low-capacity default changed from `threshold_bowl` to `bank_the_house_light` so threshold is not the safe short fallback. No broad scoring or reachability pass was added.
- UI changes: no.
- Normal output changed: yes, for selected threshold/key/return forms and compressed source/boundary language.
- Debug/report output changed: recommendation-quality fixtures/tests changed; diagnostics are still available.
- Copied source text: no.
- Private data added: no.

## 3. Source Support

No #191 source packet content was made active as a new SourceNote in this PR. The active grounding uses approved Batch 1 notes that already include exact source locations.

### `threshold_arrival` card

- Source support used: `note.house_blessing_spatial_map`, `note.domestic_action_as_boundary_marker`, `note.calendar_customs_as_household_thresholds`.
- Exact existing basis: Carmina Gadelica house touchpoint map; Bergen domestic crossing/removing/placing mechanics; British Popular Customs calendar threshold context.
- Exact source locations used: existing approved SourceNote `locationNote` fields.
- Transformed: doorway/edge arrival becomes one crossing, one word, and one clean return.
- Avoided: protection, warding, bad-luck-if, first-foot rules, public festival reenactment.

### `returnable_key` card

- Source support used: `note.talisman_as_household_marker`, `note.domestic_action_as_boundary_marker`.
- Exact existing basis: Lawrence talismanic object mechanics and Bergen domestic action mechanics.
- Exact source locations used: existing approved SourceNote `locationNote` fields.
- Transformed: a key becomes an ordinary returnable carrier for one word.
- Avoided: luck charm, protection promise, security claim, control claim.

### `threshold_word` card

- Source support used: `note.domestic_action_as_boundary_marker`, `note.hearth_first_and_last`, `note.calendar_customs_as_household_thresholds`.
- Exact existing basis: crossing/removing/placing mechanics, hearth/table first-and-last attention, and calendar first/last threshold markers.
- Exact source locations used: existing approved SourceNote `locationNote` fields.
- Transformed: one spoken or written word marks a crossing when it has a close.
- Avoided: copied charm, journaling assignment, rule language, luck claim.

### `threshold_bowl` pattern

- Source support used: `note.house_blessing_spatial_map`, `note.talisman_as_household_marker`, `note.domestic_action_as_boundary_marker`, plus `threshold_arrival`, `bowl_vessel`, and `key` cards.
- Exact existing basis: house threshold map, ordinary object marker, domestic crossing/removing/placing mechanics.
- Transformed: the bowl now names what crosses in, crosses once, and closes by returning the object or moving the bowl.
- Avoided: "what stays outside" fear framing, protection claim, generic low-capacity fallback.

### `carried_key_word` pattern

- Source support used: `note.talisman_as_household_marker`, `note.domestic_action_as_boundary_marker`, plus `key`, `returnable_key`, `threshold_word`, and `folded_word` cards.
- Exact existing basis: key/small object as marker and domestic crossing mechanics.
- Transformed: key carrying is brief, tied to one crossing, and must return to ordinary use.
- Avoided: luck, protection, security, control, and universal carrying advice.

### `seasonal_entry_bowl` pattern

- Source support used: `note.house_blessing_spatial_map`, `note.calendar_customs_as_household_thresholds`, plus seasonal and threshold cards.
- Exact existing basis: entry/house touchpoint map and private calendar threshold markers.
- Transformed: seasonal entry becomes one ordinary marker, one first crossing, and a bowl left to rest.
- Avoided: holiday feed, public festival reenactment, seasonal decor fallback.

### `last_word_first_word` pattern

- Source support used: `note.hearth_first_and_last`, `note.domestic_action_as_boundary_marker`, plus `first_last`, `threshold_word`, and `folded_word` cards.
- Exact existing basis: first-and-last attention and domestic crossing/turning mechanics.
- Transformed: two words now hinge on a crossing, turn, or fold, with closure by not adding a third word.
- Avoided: copied formula, therapy homework, generic low-capacity word task.

## 4. Threshold Fallback Audit

Before baseline is the merged #201 quality bench: 45 scenarios, 22 distinct selected patterns, `carried_key_word` selected 3 times, and `threshold_bowl`, `seasonal_entry_bowl`, and `last_word_first_word` not selected. In test expectations before this patch, `home.threshold.arrival` and `issue183.home.tending_steady` were pinned to `carried_key_word`, which showed key carrying was too broad.

After #202:

- Scenarios sampled: 52
- Distinct selected patterns: 25
- `carried_key_word`: 1
- `threshold_bowl`: 1
- `seasonal_entry_bowl`: 1
- `last_word_first_word`: 1
- `first_day_last_day`: 1
- Broad pattern concentration: none
- Concentrated selected patterns: `bread_at_the_center`, `first_light_at_the_threshold`, `honeyed_word`, and `salt_clear_water_release` at 4 each

Threshold/key wins:

- `home.threshold.arrival` -> `threshold_bowl`
- `issue202.reflection.returnable_key` -> `carried_key_word`
- `issue202.reflection.last_first_word` -> `last_word_first_word`
- `issue202.seasonal.entry_first_crossing` -> `seasonal_entry_bowl`
- `calendar.month_turn.best_week` -> `first_day_last_day`

Threshold/key losses:

- Generic low capacity -> `bread_at_the_center`
- Clearing -> `salt_clear_water_release`
- Kitchen warmth -> `quiet_welcome`
- Plant beginning -> `seed_waiting`
- Surprise me -> resolves to Reflection and selects `folded_phrase_vessel`

Evaluation of named patterns:

- `carried_key_word`: now selected once, only for an explicit Reflection threshold phrase with returnable-key styles.
- `threshold_bowl`: now selected once, for Home + threshold + arrival.
- `seasonal_entry_bowl`: now selected once, for Seasonal + threshold + first crossing.
- `last_word_first_word`: now selected once, for Reflection + threshold + first/last wording.
- `doorway_arrival_word`: not added.

## 5. Required Scenario Table

| Scenario | Scenario id | Input summary | Selected pattern | Form family | Pass/fail | Warnings | Top rejected alternatives |
|---|---|---|---|---|---|---|---|
| Home + threshold + arrival | `home.threshold.arrival` | Home, me, marking a threshold, steady | `threshold_bowl` | threshold/crossing/bowl/key | Pass: bowl has doorway, crossing, return, and close | none | `table_reset`, `room_reset`, `close_the_evening` |
| Home + threshold + month turn | `calendar.month_turn.best_week` | Home, both, marking a threshold, steady, best week | `first_day_last_day` | first/last threshold, seasonal marker | Pass: month turn supports first/last threshold; not generic key | none | `table_reset`, `room_reset`, `close_the_evening` |
| Reflection + threshold phrase | `issue202.reflection.returnable_key` | Reflection, me, marking a threshold, low | `carried_key_word` | carried phrase, threshold/crossing/bowl/key | Pass: key carries one word only through one crossing, then returns | none | `table_reset`, `threshold_reset`, `room_reset` |
| Reflection + first/last threshold phrase | `issue202.reflection.last_first_word` | Reflection, me, marking a threshold, low, last day | `last_word_first_word` | first/last threshold, written/folded/container | Pass: two words and one crossing; no long reflection | none | `table_reset`, `threshold_reset`, `room_reset` |
| Seasonal + entry / first crossing | `issue202.seasonal.entry_first_crossing` | Seasonal, both, marking a threshold, steady, last day | `seasonal_entry_bowl` | seasonal marker, threshold/crossing/bowl/key | Pass: entry bowl marks one first crossing; no festival script | none | `table_reset`, `room_reset`, `close_the_evening` |
| Generic low capacity | `issue202.generic.low_not_threshold` | Home, me, getting grounded, low | `bread_at_the_center` | bread/grain center, welcome/offering/vessel | Pass: threshold/key did not win merely by being short | none | `table_reset`, `threshold_reset`, `room_reset` |
| Clearing | `issue202.clearing.not_key` | Home, me, clearing, low | `salt_clear_water_release` | salt/water release | Pass: clearing material wins; no key/arrival fallback | none | `table_reset`, `threshold_reset`, `room_reset` |
| Kitchen warmth | `issue202.kitchen.warmth.not_threshold` | Kitchen, both, tending us, low | `quiet_welcome` | welcome/offering/vessel, warm cup/bowl | Pass: kitchen welcome wins; threshold loses | none | `table_reset`, `threshold_reset`, `room_reset` |
| Plant | `issue202.plant.not_threshold` | Plant, me, beginning, low | `seed_waiting` | plant seed/beginning, grain/seed/bowl | Pass: plant material wins; threshold loses | none | `table_reset`, `threshold_reset`, `room_reset` |
| Surprise me | `batch1.surprise_me.resolves_visible_category` | Surprise me, me, saying clearly, steady | `folded_phrase_vessel` | written/folded/container, carried phrase | Pass: resolves to Reflection before form selection; threshold not used | none | `table_reset`, `room_reset`, `close_the_evening` |

## 6. Full Normal-Output Examples

These are normal user-facing fields only. Score dumps and raw diagnostics are intentionally excluded here.

### `home.threshold.arrival`

- Title/theme: Give the threshold a bowl.
- Ritual body: Use the bowl only when the doorway is the real ritual place. Keep the words plain and brief. Place a small bowl by a doorway, entry shelf, or table edge. Put in a key or ordinary object and name what crosses in with you. Cross the threshold once, then move the object back to ordinary use. Close when the object returns or the bowl is moved away from the threshold.
- Intention: Give the threshold a bowl.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What belongs with you after this crossing?
- Why this fits: You chose Home, marking a threshold, steady capacity. Waxing moon supports this form without making the timing a command. The bowl gives arrival a small place to gather, cross, and end. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for: Home, marking a threshold, steady capacity. Timing shaped it: Waxing moon supports this form without making the timing a command. Focus bridge: Marking a threshold stays inside the ritual action. Ritual form: A vessel at the edge of the home gives arrival a place to gather, cross, and end. Material lineage: Source lineage: threshold crossing and bowl-vessel household logic. Kept bounded: One object crosses in, then returns or the bowl moves. Household fit: Private context supports keeping this practical and contained.
- Source summary: Source lineage: threshold crossing and bowl-vessel household logic. Form kept contained.
- Warnings: none.

### `issue202.reflection.returnable_key`

- Title/theme: Let the key carry one word.
- Ritual body: Use a key or small object that already returns to a place. Keep the carrying brief: one crossing, then return. Hold a key or small household object. Say or write one word for what should cross with you. Carry it until the next doorway, table, or ordinary stopping place. Return the key to its hook, bowl, pocket, or usual place. Close when the key is back in ordinary use.
- Intention: Let the key carry one word.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What word can cross the threshold with you?
- Why this fits: You chose Reflection, marking a threshold, low capacity. Waxing moon supports this form without making the timing a command. The key gives the threshold one word to carry briefly, then return. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Chosen for: Reflection, marking a threshold, low capacity. Timing shaped it: Waxing moon supports this form without making the timing a command. Focus bridge: Marking a threshold stays inside the ritual action. Ritual form: A key is useful here because it already belongs to leaving, crossing, and returning. Material lineage: Source lineage: key, threshold, return, and household marker folklore. Kept bounded: One word, one crossing, then the key returns. Household fit: Private context supports clear structure and bounded action in a small, contained rite.
- Source summary: Source lineage: key, threshold, return, and household marker folklore. Form kept contained.
- Warnings: none.

### `issue202.reflection.last_first_word`

- Title/theme: Say the last word and the first word.
- Ritual body: Keep each word single and plain. Let the threshold, table, or turn mark the crossing. Say one last word for what is closing. Cross a threshold, turn toward the table, or fold the paper once. Say one first word for what begins after it. Close by not adding a third word.
- Intention: Say the last word and the first word.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What changes after the last word crosses into the first?
- Why this fits: You chose Reflection, marking a threshold, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The last word and first word give a crossing a clean hinge. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Chosen for: Reflection, marking a threshold, low capacity. Timing shaped it: The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. Focus bridge: Marking a threshold stays inside the ritual action. Ritual form: First-and-last attention gives a crossing a hinge without requiring a long reflection. Material lineage: Source lineage: first-and-last threshold and household crossing logic. Kept bounded: One last word, one crossing, one first word. Household fit: Private context supports clear structure and bounded action in a small, contained rite. Small accent: Numerology 3 stayed secondary to the ritual material and timing.
- Source summary: Source lineage: first-and-last threshold and household crossing logic. Form kept contained.
- Warnings: none.

### `issue202.seasonal.entry_first_crossing`

- Title/theme: Refresh the entry with a seasonal bowl.
- Ritual body: Mark the crossing, not the whole season. Use what is already here. Place a small bowl near the entry or table edge. Add one ordinary object that fits the season. Name the first crossing into this season. Step past the bowl once and leave it alone. Close when you have crossed once and the bowl is left in place.
- Intention: Refresh the entry with a seasonal bowl.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What seasonal threshold is this home crossing?
- Why this fits: You chose Seasonal, both of you, marking a threshold, steady capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The entry bowl marks one seasonal crossing without turning the season into display. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for: Seasonal, both of you, marking a threshold, steady capacity. Timing shaped it: The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. Focus bridge: Marking a threshold stays inside the ritual action. Ritual form: Seasonal customs can become a private threshold marker when the entry receives one ordinary object. Material lineage: Source lineage: seasonal threshold and first-crossing household logic. Kept bounded: One entry marker, one crossing, then the bowl rests. Household fit: For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action. Small accent: Numerology 9 stayed secondary to the ritual material and timing.
- Source summary: Source lineage: seasonal threshold and first-crossing household logic. Form kept contained.
- Warnings: none.

### `calendar.month_turn.best_week`

- Title/theme: Give the threshold a first word and a last word.
- Ritual body: Keep the words plain. Let the threshold hold the change. Name one last word for what is ending. Name one first word for what is beginning. Speak or place both at a doorway, table, or bowl. Close by crossing once or folding the words away.
- Intention: Give the threshold a first word and a last word.
- Best window: Around Monday, August 31. When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What word closes, and what word opens?
- Why this fits: You chose Home, both of you, marking a threshold, steady capacity. Monday, August 31 stood out this week. The window stood out because of calendar threshold. The month turn gives this a clean threshold without turning the calendar into a command. The first-and-last form gives the threshold one action and one close.
- How this was chosen: Chosen for: Home, both of you, marking a threshold, steady capacity. Timing shaped it: Monday, August 31 stood out this week. The window stood out because of calendar threshold. The month turn gives this a clean threshold without turning the calendar into a command. Focus bridge: Marking a threshold stays inside the ritual action. Ritual form: Calendar customs can become private first-and-last markers without becoming a holiday feed. Material lineage: Source lineage: Full Moon card. Kept bounded: One threshold action, one clean close. Household fit: For both of you, the fit leans toward clear structure and bounded action and warmth, beauty, and affection. Small accent: Numerology 9 stayed secondary to the ritual material and timing.
- Source summary: Source lineage: full moon card and first day / last day pattern. Form kept contained.
- Warnings: none.

### `issue202.generic.low_not_threshold`

- Title/theme: Put bread at the center.
- Ritual body: Use bread only if it already belongs here; one ordinary substitute that already works in this household is enough. Let the table hold one small sign of enough. Place a small piece of bread, or one ordinary household substitute, on a plate at the table center. Name what is enough for this household right now in one sentence. Return it to ordinary kitchen use. Close when the plate is clear: the bread is eaten, put away, or returned to ordinary use.
- Intention: Put bread at the center.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can sit at the center without needing to become more?
- Why this fits: You chose Home, getting grounded, low capacity. Seasonal timing asks for a small marker, not a public calendar performance. Bread or grain gives enoughness a table center, not a promise to prove. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for: Home, getting grounded, low capacity. Timing shaped it: Seasonal timing asks for a small marker, not a public calendar performance. Focus bridge: Getting grounded stays inside the ritual action. Ritual form: Bread or grain makes enoughness visible at the table: a center, not a promise. Material lineage: Source lineage: bread/grain table-center and welcome logic. Kept bounded: One table marker, one enoughness phrase, then ordinary return. Household fit: Private context supports keeping this practical and contained. Small accent: Numerology 7 stayed secondary to the ritual material and timing.
- Source summary: Source lineage: bread/grain table-center and welcome logic. Form kept contained.
- Warnings: none.

### `issue202.clearing.not_key`

- Title/theme: Let salt and clear water carry one release.
- Ritual body: Keep the release specific and small. Use the bowl to contain the clearing. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away and rinse the bowl. Close when the bowl is rinsed and empty.
- Intention: Let salt and clear water carry one release.
- Best window: When you have five quiet minutes.
- Optional accent: Let the empty bowl sit for one breath before putting it away.
- Carry prompt: What feels cleaner when it has somewhere ordinary to go?
- Why this fits: You chose Home, clearing something out, low capacity. Waning moon supports this form without making the timing a command. Salt and clear water give the release a vessel and a clean way out. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for: Home, clearing something out, low capacity. Timing shaped it: Waning moon supports this form without making the timing a command. Focus bridge: Clearing something out stays inside the ritual action. Ritual form: Salt and water give clearing a vessel and an outward direction without making danger the story. Material lineage: Source lineage: salt and boundary folklore. Kept bounded: One pinch, one bowl, one clean release. Household fit: Private context supports keeping this practical and contained. Small accent: Numerology 7 stayed secondary to the ritual material and timing.
- Source summary: Source lineage: salt and boundary folklore. Form kept contained.
- Warnings: none.

### `issue202.kitchen.warmth.not_threshold`

- Title/theme: Set out a quiet welcome.
- Ritual body: Welcome is the ritual form, not a performance. Choose one ordinary welcome vessel; a cup or small bowl is enough. Set the cup or bowl at the table or counter. Name what is welcome in this home today. Return or wash the vessel when finished. Close by returning the material to ordinary use.
- Intention: Set out a quiet welcome.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What welcome can the shared vessel hold for both of you?
- Why this fits: You chose Kitchen, both of you, tending us, low capacity. Seasonal timing asks for a small marker, not a public calendar performance. A cup or bowl makes welcome visible without making it a performance. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for: Kitchen, both of you, tending us, low capacity. Timing shaped it: Seasonal timing asks for a small marker, not a public calendar performance. Focus bridge: You chose tending us, so the ritual keeps the shared action small and embodied. Ritual form: A modest bowl, cup, bread, or sweetness can make hospitality visible without demanding belief. Material lineage: Source lineage: quiet household welcome forms. Kept bounded: One vessel, one welcome, then the vessel returns. Household fit: For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: none.

### `issue202.plant.not_threshold`

- Title/theme: Let the seed wait.
- Ritual body: Treat waiting as part of the ritual. Choose one seed or dry grain already available. Place one seed or dry grain where it can hold the beginning. Name the beginning that can wait before it grows. Leave the seed or grain in place and stop checking it. Close by leaving the seed or grain in place and not checking for proof.
- Intention: Let the seed wait.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What beginning can wait like a seed or grain?
- Why this fits: You chose Plant, making a beginning, low capacity. Seasonal timing asks for a small marker, not a public calendar performance. Seed or grain gives the beginning a body, and waiting is part of the rite. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for: Plant, making a beginning, low capacity. Timing shaped it: Seasonal timing asks for a small marker, not a public calendar performance. Focus bridge: Making a beginning is held as tone while the ritual stays within the available form. Ritual form: Seed and water make a beginning material without demanding immediate growth. Material lineage: Source lineage: seed-water beginning logic. Kept bounded: One seed or grain, one beginning, then waiting without proof. Household fit: Private context supports keeping this practical and contained. Small accent: Numerology 7 stayed secondary to the ritual material and timing.
- Source summary: Source lineage: seed-water beginning logic. Form kept contained.
- Warnings: none.

### `batch1.surprise_me.resolves_visible_category`

- Title/theme: Give the words a fold.
- Ritual body: Write one sentence only. Let the fold contain the words. Write one clear phrase on a small piece of paper. Fold it once toward itself. Place it in a bowl, book, pocket, or near a plant pot. Close when the folded phrase is placed.
- Intention: Give the words a fold.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What changes when the phrase has a place to be held?
- Why this fits: You chose Reflection, saying something clearly, steady capacity. The timing gives the phrase a clear place without turning it into a report. The fold turns the phrase into a held object instead of a long explanation. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Chosen for: Reflection, saying something clearly, steady capacity. Timing shaped it: The timing gives the phrase a clear place without turning it into a report. Focus bridge: Saying something clearly stays inside the ritual action. Ritual form: A written phrase becomes a ritual object when it is folded and placed, not expanded into journaling. Material lineage: Source lineage: folded-word and household container logic. Kept bounded: One phrase, one fold, one holding place. Household fit: Private context supports clear structure and bounded action in a small, contained rite.
- Source summary: Source lineage: folded-word and household container logic. Form kept contained.
- Warnings: none.

## 7. House-Voice Review

| Output | Authored? | Avoids fallback language? | Threshold/crossing/key function? | Closure clear? | Lineage light/specific? | Avoids protection/luck/security claims? |
|---|---|---|---|---|---|---|
| `home.threshold.arrival` | yes | yes | bowl holds arrival, crossing, return | yes | yes | yes |
| `issue202.reflection.returnable_key` | yes | yes | key carries one threshold word briefly | yes | yes | yes |
| `issue202.reflection.last_first_word` | yes | yes | last/first words hinge on crossing | yes | yes | yes |
| `issue202.seasonal.entry_first_crossing` | yes | yes | entry bowl marks first crossing | yes | yes | yes |
| `calendar.month_turn.best_week` | mostly | yes | month turn gives first/last threshold | yes | partly: source summary is generic Full Moon card | yes |
| `issue202.generic.low_not_threshold` | yes | yes | threshold intentionally absent | yes | yes | yes |
| `issue202.clearing.not_key` | yes | yes | clearing uses salt/water, not threshold | yes | yes | yes |
| `issue202.kitchen.warmth.not_threshold` | yes | yes | threshold intentionally absent | yes | yes | yes |
| `issue202.plant.not_threshold` | yes | yes | threshold intentionally absent | yes | yes | yes |
| `batch1.surprise_me.resolves_visible_category` | yes | yes | threshold intentionally absent | yes | yes | yes |

## 8. Diagnostics And Recommendation Quality

Warning counts:

- `pause_with_imperative_steps`: 0
- `generic_optional_candle`: 0
- `candle_ritual_with_candle_addon`: 0
- `focus_timing_unbridged`: 0
- `raw_score_language_in_user_copy`: 0
- `debug_key_in_user_copy`: 0
- `generic_closing_repeated`: 0
- `carry_prompt_contradicts_focus`: 0
- `best_window_reason_too_thin`: 0
- `source_id_visible_in_normal_copy`: 0
- `missing_presentation_selected`: 0
- `task_dressed_pattern_selected`: 0
- `surprise_me_unresolved`: 0

Scenario count: 52.

Distinct selected patterns: 25.

Top selected patterns:

- `bread_at_the_center`: 4
- `first_light_at_the_threshold`: 4
- `honeyed_word`: 4
- `salt_clear_water_release`: 4
- `folded_phrase_vessel`: 3
- `full_light_on_the_table`: 3
- `seasonal_marker_bowl`: 3
- `seed_waiting`: 3

Pattern concentration review:

- Broad pattern concentration: none.
- Threshold/key targeted forms are not concentrated; each selected exactly once.
- The four patterns at concentration threshold 4 are not threshold/key/return forms.

Selection changes from main:

- `home.threshold.arrival`: `carried_key_word` -> `threshold_bowl`.
- `issue183.home.tending_steady`: `carried_key_word` -> `house_from_root_to_roof`.
- Generic low-capacity default: `threshold_bowl` -> `bank_the_house_light`.
- New targeted scenarios select `carried_key_word`, `last_word_first_word`, and `seasonal_entry_bowl` only when requested by explicit threshold/key/first-crossing input.

Diagnostics added/changed:

- Recommendation-quality scenarios added for threshold/key wins and losses.
- Normal-copy blocked phrase assertions now include Issue #202 terms such as protection, warding, security, luck, prosperity, bad luck, and first-foot.
- Debug/report sections still include score reasons, rejected alternatives, and source keys where appropriate.

## 9. Awkward Outputs / Remaining Risks

- `calendar.month_turn.best_week` has strong ritual structure, but the source summary still says "full moon card and first day / last day pattern" rather than a more specific calendar-threshold lineage. This is not a #202 blocker, but it is less elegant than the new `seasonal_entry_bowl` and `last_word_first_word` lineage.
- `issue202.generic.low_not_threshold` now selects `bread_at_the_center`. This proves threshold is not the low-capacity fallback, but it also means bread/grain remains a strong Home grounding result after #201 and should keep being watched for concentration.
- `clear_the_threshold_bowl` can still win for seasonal clearing because it is a clearing/vessel form with threshold family labels. This is acceptable in the required clearing case because `salt_clear_water_release` wins there, but threshold-bowl clearing should remain monitored separately.
- The key language now has return and duration, but any future scenario that gives it broad `carrying` or `reflection` preference could make it feel universal again. The tests pin the current loss cases.
- No source-support weakness from newly activated SourceNotes, because none were added. The only source-summary weakness is presentation compression for the month-turn example.

## 10. Validation

Validation commands run:

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

- `npm run lint:content`: passed, no findings.
- `npm run typecheck`: passed.
- `npm run test`: passed, 26 files, 298 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 1 file, 9 tests.
- `npm run recommendation:quality`: passed, 52 scenarios, zero warning counts, 25 distinct selected patterns.
- `npm run diagnose:content`: passed, 91 scenarios sampled, no approved ritual patterns unevaluated.
- `npm run check`: passed, including lint, typecheck, build, unit tests, and 2 Playwright tests. Vite reported the existing large-chunk warning; Playwright reported the existing FORCE_COLOR/NO_COLOR warning.

## 11. PR Notes Draft

What changed:

- Added three internal symbolic cards: `threshold_arrival`, `returnable_key`, and `threshold_word`.
- Rewrote presentation for `threshold_bowl`, `carried_key_word`, `seasonal_entry_bowl`, and `last_word_first_word`.
- Changed the low-capacity default fallback away from `threshold_bowl`.
- Added Issue #202 quality scenarios proving threshold/key/return wins and losses.
- Added normal-copy blocked phrase assertions for forbidden threshold/luck/security language.

Source support:

- No new sources and no new active SourceNotes.
- Active grounding comes from approved Batch 1 notes: `note.house_blessing_spatial_map`, `note.talisman_as_household_marker`, `note.domestic_action_as_boundary_marker`, `note.hearth_first_and_last`, `note.calendar_customs_as_household_thresholds`, and related existing cards.
- No source wording was copied.

Before/after examples:

- Home + threshold arrival: before selected `carried_key_word`; after selects `threshold_bowl` with a doorway bowl, one crossing, and object return.
- Reflection + threshold phrase: after selects `carried_key_word` only for a real returnable-key phrase.
- Reflection + first/last phrase: after selects `last_word_first_word` with one last word, one crossing, and one first word.
- Seasonal + first crossing: after selects `seasonal_entry_bowl` with one entry marker and one crossing.
- Generic low capacity: after selects `bread_at_the_center`, not threshold/key.
- Kitchen warmth: after selects `quiet_welcome`, not threshold/key.

Warning counts:

- All recommendation-quality warning counts are 0 across 52 scenarios.

Concentration review:

- Threshold/key targeted forms each select once.
- Broad pattern concentration is none.
- Concentrated selected patterns are `bread_at_the_center`, `first_light_at_the_threshold`, `honeyed_word`, and `salt_clear_water_release` at 4 each.

Remaining risks:

- Month-turn source summary can still be more specific.
- Bread/grain remains strong for generic Home grounding after #201 and should be watched.
- Key carrying must stay tied to return and explicit threshold context in future scenarios.

Merge recommendation:

hold for human review
