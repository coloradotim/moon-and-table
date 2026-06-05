# Authored Output Quality Matrix

Issue: #225

This packet is the companion to the recommendation-contract matrix from #224.
The #224 matrix asks whether the engine selected the right kind of ritual. This
matrix asks whether the final recommendation text is good enough to show: clear,
authored, coherent, respectful, magical, source-aware, and specific.

## 1. Authored-Output Doctrine

Technically valid is not enough.

Moon & Table should read like a private household grimoire with a recommendation
engine underneath. The output should feel selected with care by a person who
understands why the ritual was chosen, how the material works, what the timing
does, and how the rite closes.

Authored output requires:

- one primary material/action path
- clear activation and closure
- visible ritual function
- material/action logic, not decor or psychology metaphor
- high-capacity depth in the ritual body when capacity is high
- embodied both-of-us action when the audience is shared
- `Why this fits` that explains meaning
- `How this was chosen` that is readable and secondary
- light, specific source lineage
- honest closest-compatible language when coverage is thin

`pass` means good enough to show in the product, not merely coherent. A
contract-correct recommendation can still be `review_required` or
`request_changes` if the final copy is shallow, too small for capacity,
pronoun-only for a shared audience, or hiding an imperfect match.

Authored-output warnings are product review findings. Warning counts are not
acceptable baselines.

High capacity should require deeper ritual architecture where appropriate:
staged action, a material/place relationship, a held/resting/return arc,
meaningful closure, and enough ritual shape to feel like more than low/steady
copy with a later return pasted on.

For `both_of_us`, audience must be embodied unless shared stillness or an
object held between the two is explicitly the mechanism. Merely saying `both of
you` in `Why this fits`, the carry prompt, or private-context language is not
enough.

Coverage-gap honesty belongs in collapsed `How this was chosen`, diagnostics,
or review reports. It should not become apology in the main ritual body.

## 2. Relationship To #224

#224 owns the recommendation contract:

- explicit practice or resolved practice
- focus
- capacity
- audience
- time scope
- timing authority
- coverage-gap diagnostics

#225 owns final-copy quality after that contract has been evaluated. A
recommendation can be contract-correct and still fail #225 because the body is
an option menu, the audience only changes pronouns, high capacity stays tiny, or
the explanation hides a closest-compatible match.

Any scenario marked closest-compatible or coverage-gap must disclose that in
collapsed `How this was chosen` or report/review output. If expanded explanation
hides the gap, the scenario is at least `review_required`; if the copy also
overclaims fit, it is `request_changes`.

## 3. Output-Quality Dimensions

| Dimension | Required behavior |
| --- | --- |
| Authored coherence | Theme, body, intention, window, accent, carry prompt, fit explanation, chosen explanation, and source summary feel like one rite. |
| One ritual body | The body chooses one place, material, action, and closure. |
| Ritual function | The body makes the function legible: witness, beginning, clearing, rest, threshold, welcome, tending, holding, lowering, returning, or saying clearly. |
| Material/action logic | Matter does ritual work: light witnesses, bowl holds, key carries, grain gives weight, plant witnesses, cup carries warmth. |
| Source respect | Lineage is compressed and specific, not raw ids, author lists, or academic compliance. |
| Why this fits | Explains why the ritual answers the check-in, not why the score matched. |
| How this was chosen | Secondary, readable, compact; may disclose coverage gaps without apology. |
| Capacity depth | High capacity adds ritual architecture, not just more explanation. |
| Audience embodiment | `Both of us` changes the ritual body, not only the explanation. |
| Mismatch honesty | Closest-compatible output stays dignified and does not overclaim exact fit. |

## 4. Warning / Check Table

| Warning id | What it catches |
| --- | --- |
| `fragmentary_option_menu_body` | Core place/action/closure is offered as a menu. |
| `title_intention_duplicate_without_depth` | Title and intention duplicate without enough ritual depth. |
| `why_this_fits_describes_matching_not_meaning` | Fit copy sounds like matching mechanics instead of meaning. |
| `how_chosen_reads_like_system_report` | Expanded explanation sounds like diagnostics. |
| `source_lineage_too_raw_or_academic` | Source lineage is raw, academic, or compliance-forward. |
| `high_capacity_no_deeper_ritual_shape` | High capacity lacks deeper ritual architecture. |
| `audience_only_pronoun_change` | Shared audience is present only in pronouns/explanation. |
| `normal_copy_rationalizes_mismatch` | Normal copy smooths over an ignored input. |
| `ritual_body_lacks_activation_or_closure` | Body lacks a clear start or end. |
| `material_used_as_prop_not_ritual_matter` | Material is described as reminder, prop, cue, or psychology. |
| `closest_match_overclaims_fit` | Closest-compatible output pretends to be an exact strong fit. |
| `coverage_gap_not_disclosed_in_expanded_explanation` | A coverage gap is hidden from expanded explanation. |
| `coverage_gap_disclosed_as_broken_app_language` | Gap disclosure sounds like apology or broken software. |

## 5. Scenario Matrix

| Scenario | Selected pattern | Match type | Authored verdict | Key expected quality | Current warnings |
| --- | --- | --- | --- | --- | --- |
| `contract.candle.high_beginning` | `first_light_at_the_threshold` | exact strong | review required | first-light beginning needs deeper high-capacity architecture | high-capacity shape thin |
| `contract.candle.high_resting` | `full_light_holding_bowl` | exact strong | review required | full-light holding/resting bowl needs a more substantial high-capacity arc | high-capacity shape thin |
| `contract.plant.both_high_tending_waning` | `plant_witness_to_growth` | closest compatible | review required | plant witness with two roles; disclose Plant high-depth gap | coverage-gap hidden |
| `contract.plant.high_rest_companionship` | `dormant_green_rest` | closest compatible | review required | plant dormancy/rest, not candle darkness | coverage-gap hidden |
| `contract.kitchen.high_tending_full` | `warm_cup_between_us` | exact strong | review required | cup/table warmth needs a deeper high-capacity shared arc | high-capacity shape thin |
| `contract.kitchen.high_beginning_waning` | `grain_bowl_beginning` | exact strong | review required | grain beginning held before launch, but high depth still feels thin | high-capacity shape thin |
| `contract.home.high_tending_waning` | `first_light_at_the_threshold` | review gap | request changes | Home tending should not become light-threshold beginning | coverage-gap hidden; high shape weak; contract request changes |
| `contract.home.high_threshold_full` | `window_light_threshold` | exact strong | review required | threshold/window edge has roles but is too slight for high capacity | high-capacity shape thin |
| `contract.reflection.high_saying_new` | `window_light_threshold` | review gap | request changes | Reflection-first phrase work, not threshold-light default | high shape weak; contract request changes |
| `contract.seasonal.high_month_turn_threshold` | `seasonal_marker_bowl` | closest compatible | review required | seasonal marker bowl with return | coverage-gap hidden |
| `contract.surprise.high_preserves_resolved_category` | `window_light_threshold` | closest compatible | review required | resolved practice preserved; disclose high-depth gap | coverage-gap hidden |
| `contract.surprise.both_preserves_audience` | `warm_cup_between_us` | closest compatible | review required | resolved practice and embodied shared warmth | coverage-gap hidden |
| `contract.best_week.month_turn_may_lead` | `first_day_last_day` | exact strong | request changes | one threshold path, not place/action menu | option menu; audience-only |
| `contract.tending_us.both_low_embodied` | `quiet_welcome` | exact strong | request changes | shared Kitchen welcome with roles for both people | audience-only |
| `contract.surprise.low_resolves_real_category` | `waning_light_release` | review gap | request changes | resting should not become release | closest match overclaims fit |

## 6. Full Normal Outputs

These examples are after-only normal user-facing output. Score reasons and debug
dumps are intentionally omitted.

### contract.candle.high_beginning

- Input summary: Candle or light / Making a beginning / high / me
- Selected pattern: `first_light_at_the_threshold`
- Title/theme: Let first light mark the threshold.
- Ritual body: Use light as the first mark, not as pressure. Let the doorway hold the beginning. Stand at the doorway with first household light behind you or beside you. Name the first step in one plain phrase. Step across the threshold once to close the opening. Close when both feet are inside and no plan has been added.
- Intention: Let first light mark the threshold.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Carry prompt: What is the first step small enough to cross with?
- Why this fits: You chose Candle or light, making a beginning, high capacity. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. Use first light at the doorway to mark a beginning. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Candle or light, making a beginning, high capacity. Timing shaped it through new-moon darkness and first light. Ritual form uses household fire-kindling and first-light logic.
- Source summary: Source lineage: household fire-kindling and first-light logic. Form kept contained.
- Warnings: `high_capacity_no_deeper_ritual_shape`

### contract.candle.high_resting

- Input summary: Candle or light / Resting / high / me
- Selected pattern: `full_light_holding_bowl`
- Title/theme: Let full light hold rest in an empty bowl.
- Ritual body: Use an empty bowl, not a charged object. Let holding be brief and ordinary. Set a small empty bowl in the table light. Write one held thing in a short line and place the paper beside the bowl. Let the bowl and paper rest in the light through one quiet minute. Fold the paper once, place it under the bowl until tomorrow or the next return, then put the bowl back in its ordinary place. Close when the bowl has returned and the folded line is left to rest.
- Intention: Let full light hold rest in an empty bowl.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What can be held in full light without being solved?
- Why this fits: You chose Candle or light, resting, high capacity. Full light lets what is present be acknowledged before the room lowers. The bowl gives full light a place to hold what is named, then return. Private context supports warmth, beauty, and affection in a small, contained rite.
- How this was chosen: Chosen for Candle or light, resting, high capacity. Full light holds what is present before the room lowers. The bowl gives it a place to rest and return.
- Source summary: Source lineage: full lunar light, hearth light, and vessel-holding logic. Form kept contained.
- Warnings: `high_capacity_no_deeper_ritual_shape`

### contract.plant.both_high_tending_waning

- Input summary: Plant / Tending the home / high / both_of_us
- Selected pattern: `plant_witness_to_growth`
- Title/theme: Let the plant witness the household tending.
- Ritual body: Let the plant hold attention without becoming a task. Speak softly or silently. Set one plant, leaf, seed, or plant image where both of you can see it. One of you names what in the home is still living; the other names what can be left undisturbed. Let the plant witness both words through one quiet minute. Return the plant or image to its ordinary place without adding a task. Close when the plant is back in its ordinary place and no new task has been added.
- Intention: Let the plant witness the household tending.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What in the home can be tended by being witnessed and left steady?
- Why this fits: You chose Plant, both of you, tending the home, high capacity. Waning moon supports this form without making the timing a command. Let a plant witness one thing that is growing without turning it into processing. For both of you, the fit leans toward practical home-tending magic and warmth, beauty, and affection.
- How this was chosen: Chosen for Plant, both of you, tending the home, high capacity. The current expanded copy does not disclose that this is closest-compatible Plant coverage.
- Source summary: Source lineage: waning moon card and plant witness to growth pattern. Form kept contained.
- Warnings: `coverage_gap_not_disclosed_in_expanded_explanation`, coverage-gap diagnostics

### contract.plant.high_rest_companionship

- Input summary: Plant / Resting / high / me
- Selected pattern: `dormant_green_rest`
- Title/theme: Let the green thing keep a deeper rest.
- Ritual body: Use the plant as a rest teacher, not a task. Do not water, prune, or fix unless care is truly needed. Place one plant, seed, leaf, or plant image where it can be seen. Name one household thing that does not need to grow today. Let the green thing hold the rest through three slow breaths. Return the plant or image to its ordinary place and leave it untouched until the next ordinary care moment. Close when the plant is back in place and nothing has been fixed.
- Intention: Let the green thing keep a deeper rest.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What becomes more alive when it is not asked to grow tonight?
- Why this fits: You chose Plant, resting, high capacity. Darker or quieter timing lets the ritual lower the room instead of sharpening attention. Use plant dormancy as a rest rite for what does not need to grow today. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Plant, resting, high capacity. The current expanded copy does not disclose high-depth Plant rest coverage is thin.
- Source summary: Source lineage: new moon card and dormant green rest pattern. Form kept contained.
- Warnings: `coverage_gap_not_disclosed_in_expanded_explanation`, coverage-gap diagnostics

### contract.kitchen.high_tending_full

- Input summary: Kitchen / Tending us / high / both_of_us
- Selected pattern: `warm_cup_between_us`
- Title/theme: Let the cup hold the warmth.
- Ritual body: Use what is already ordinary here. Let the cup do the holding. Place two cups, or one cup between you, at the table. Each offer one word for what warmth can stay here. Let the cup or cups rest between you through one quiet minute. Set the cup or cups down and leave them until the next ordinary return. Close when the cup or cups are set down and the shared surface is left quiet.
- Intention: Let the cup hold the warmth.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What warmth can be held between you, then left alone?
- Why this fits: You chose Kitchen, both of you, tending us, high capacity. Full moon supports this form without making the timing a command. The cup holds warmth without asking it to become a conversation. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for Kitchen, both of you, tending us, high capacity. The cup is the vessel for warmth and closure.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: `high_capacity_no_deeper_ritual_shape`

### contract.kitchen.high_beginning_waning

- Input summary: Kitchen / Making a beginning / high / me
- Selected pattern: `grain_bowl_beginning`
- Title/theme: Set the grain bowl to hold the beginning longer.
- Ritual body: Let this be a beginning held first, not launched. Choose one dry kitchen grain; rice, oats, or a single bean is enough. Put one dry kitchen grain in a small bowl and set the bowl at the table. Name the beginning in one sentence and place one hand near the bowl without moving it. Let the bowl hold the beginning through one quiet minute. Leave the bowl at the table until tomorrow or the next ordinary return, then return the grain to its jar or ordinary place. Close when the grain has been returned and the bowl is empty.
- Intention: Set the grain bowl to hold the beginning longer.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What beginning becomes steadier when the grain holds it first?
- Why this fits: You chose Kitchen, making a beginning, high capacity. Waning timing turns the beginning toward preparation rather than launch. Grain gives the beginning table-weight; the bowl gives it a place to wait. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Kitchen, making a beginning, high capacity. Waning makes the beginning a held preparation rather than a launch.
- Source summary: Source lineage: bread/grain table-center and seed-water beginning logic. Form kept contained.
- Warnings: `high_capacity_no_deeper_ritual_shape`

### contract.home.high_tending_waning

- Input summary: Home / Tending the home / high / me
- Selected pattern: `first_light_at_the_threshold`
- Title/theme: Let first light mark the threshold.
- Ritual body: Use light as the first mark, not as pressure. Let the doorway hold the beginning. Stand at the doorway with first household light behind you or beside you. Name the first step in one plain phrase. Step across the threshold once to close the opening. Close when both feet are inside and no plan has been added.
- Intention: Let first light mark the threshold.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What is the first step small enough to cross with?
- Why this fits: You chose Home, tending the home, high capacity. Waning moon supports this form without making the timing a command. Use first light at the doorway to mark a beginning. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Home, tending the home, high capacity. Current copy does not disclose that this is a review gap, and the ritual is too light/beginning-forward for Home tending.
- Source summary: Source lineage: household fire-kindling and first-light logic. Form kept contained.
- Warnings: coverage-gap diagnostics, `contract_request_changes`, `high_capacity_no_deeper_ritual_shape`

### contract.home.high_threshold_full

- Input summary: Home / Marking a threshold / high / both_of_us
- Selected pattern: `window_light_threshold`
- Title/theme: Give the phrase a window threshold.
- Ritual body: Use the window as the crossing place. Let closing the curtain be the close. Stand together near the window light. One of you names the phrase; the other closes the curtain. Let the edge stand. Close when the curtain is closed.
- Intention: Give the phrase a window threshold.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What phrase can meet the edge between you?
- Why this fits: You chose Home, both of you, marking a threshold, high capacity. Full moon supports this form without making the timing a command. Window light gives the phrase an edge to meet and leave. For both of you, the fit leans toward clear structure and bounded action and warmth, beauty, and affection.
- How this was chosen: Chosen for Home, both of you, marking a threshold, high capacity. The window is the threshold and the curtain is closure.
- Source summary: Source lineage: first-light threshold and lunar visible-light logic. Form kept contained.
- Warnings: `high_capacity_no_deeper_ritual_shape`

### contract.reflection.high_saying_new

- Input summary: Reflection / Saying something clearly / high / me
- Selected pattern: `window_light_threshold`
- Title/theme: Give the phrase a window threshold.
- Ritual body: Use the window as the crossing place. Let closing the curtain be the close. Stand or sit where window light reaches the room. Speak or place one written phrase at that edge. Close the curtain to end the crossing. Close when the curtain is closed.
- Intention: Give the phrase a window threshold.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What phrase can meet the threshold and stop there?
- Why this fits: You chose Reflection, saying something clearly, high capacity. The timing gives the phrase a clear place without turning it into a report. Window light gives the phrase an edge to meet and leave. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Chosen for Reflection, saying something clearly, high capacity. Current copy does not admit that this is phrase-compatible but too threshold/light-forward.
- Source summary: Source lineage: first-light threshold and lunar visible-light logic. Form kept contained.
- Warnings: `contract_request_changes`, `high_capacity_no_deeper_ritual_shape`

### contract.seasonal.high_month_turn_threshold

- Input summary: Seasonal / Marking a threshold / high / both_of_us
- Selected pattern: `seasonal_marker_bowl`
- Title/theme: Let one bowl mark the season.
- Ritual body: Use one ordinary material already in the home. Let the bowl hold the season without decorating the house. Choose one small seasonal marker; a leaf, key, grain, or bread piece is enough. One of you places it in a small bowl; the other names what this season is asking the home to hold. Both touch the table once, then leave the bowl where it can rest until the next return. When the marker is done, return it to ordinary use or empty the bowl. Close when both of you have left the bowl alone until its next ordinary return.
- Intention: Let one bowl mark the season.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What season can the bowl hold between you without becoming display?
- Why this fits: You chose Seasonal, both of you, marking a threshold, high capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The bowl gives seasonal change one household marker to hold, then return. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for Seasonal, both of you, marking a threshold, high capacity. Current expanded copy does not disclose closest-compatible seasonal threshold coverage.
- Source summary: Source lineage: seasonal marker and vessel-return logic. Form kept contained.
- Warnings: `coverage_gap_not_disclosed_in_expanded_explanation`, coverage-gap diagnostics

### contract.surprise.high_preserves_resolved_category

- Input summary: Surprise me / Saying something clearly / high / me
- Selected pattern: `window_light_threshold`
- Title/theme: Give the phrase a window threshold.
- Ritual body: Use the window as the crossing place. Let closing the curtain be the close. Stand or sit where window light reaches the room. Speak or place one written phrase at that edge. Close the curtain to end the crossing. Close when the curtain is closed.
- Intention: Give the phrase a window threshold.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What phrase can meet the threshold and stop there?
- Why this fits: You chose Reflection, saying something clearly, high capacity. Full light lets the phrase be witnessed once, then closed by changing the light. Window light gives the phrase an edge to meet and leave. Private context supports clear structure and bounded action in a small, contained rite.
- How this was chosen: Chosen for Reflection, saying something clearly, high capacity. Current expanded copy hides the closest-compatible high-capacity gap.
- Source summary: Source lineage: first-light threshold and lunar visible-light logic. Form kept contained.
- Warnings: `coverage_gap_not_disclosed_in_expanded_explanation`, coverage-gap diagnostics

### contract.surprise.both_preserves_audience

- Input summary: Surprise me / Tending us / high / both_of_us
- Selected pattern: `warm_cup_between_us`
- Title/theme: Let the cup hold the warmth.
- Ritual body: Use what is already ordinary here. Let the cup do the holding. Place two cups, or one cup between you, at the table. Each offer one word for what warmth can stay here. Let the cup or cups rest between you through one quiet minute. Set the cup or cups down and leave them until the next ordinary return. Close when the cup or cups are set down and the shared surface is left quiet.
- Intention: Let the cup hold the warmth.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What warmth can be held between you, then left alone?
- Why this fits: You chose Kitchen, both of you, tending us, high capacity. Full moon supports this form without making the timing a command. The cup holds warmth without asking it to become a conversation. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for Kitchen, both of you, tending us, high capacity. Current expanded copy hides closest-compatible resolved-practice coverage.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: `coverage_gap_not_disclosed_in_expanded_explanation`, coverage-gap diagnostics

### contract.best_week.month_turn_may_lead

- Input summary: Home / Marking a threshold / steady / both_of_us
- Selected pattern: `first_day_last_day`
- Title/theme: Give the threshold a first word and a last word.
- Ritual body: Keep the words plain. Let the threshold hold the change. Name one last word for what is ending. Name one first word for what is beginning. Speak or place both at a doorway, table, or bowl. Close by crossing once or folding the words away.
- Intention: Give the threshold a first word and a last word.
- Best window: Around Monday, August 31. When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What word closes, and what word opens?
- Why this fits: You chose Home, both of you, marking a threshold, steady capacity. Monday, August 31 stood out this week. The window stood out because of calendar threshold. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The first-and-last form gives the threshold one action and one close.
- How this was chosen: Chosen for Home, both of you, marking a threshold, steady capacity. Timing is legitimate, but body copy still offers a place/action menu.
- Source summary: Source lineage: first-and-last calendar threshold logic. Form kept contained.
- Warnings: `fragmentary_option_menu_body`, `audience_only_pronoun_change`

### contract.tending_us.both_low_embodied

- Input summary: Kitchen / Tending us / low / both_of_us
- Selected pattern: `quiet_welcome`
- Title/theme: Set out a quiet welcome.
- Ritual body: Welcome is the ritual form, not a performance. Choose one ordinary welcome vessel; a cup or small bowl is enough. Set the cup or bowl at the table or counter. Name what is welcome in this home today. Return or wash the vessel when finished. Close by returning the material to ordinary use.
- Intention: Set out a quiet welcome.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What welcome can the shared vessel hold for both of you?
- Why this fits: You chose Kitchen, both of you, tending us, low capacity. Seasonal timing asks for a small marker, not a public calendar performance. A cup or bowl makes welcome visible without making it a performance. For both of you, the fit leans toward practical home-tending magic and clear structure and bounded action.
- How this was chosen: Chosen for Kitchen, both of you, tending us, low capacity. Current body is shared in explanation more than action.
- Source summary: Source lineage: quiet household welcome forms. Form kept contained.
- Warnings: `audience_only_pronoun_change`

### contract.surprise.low_resolves_real_category

- Input summary: Surprise me / Resting / low / me
- Selected pattern: `waning_light_release`
- Title/theme: Let waning light lower the release.
- Ritual body: Use the light as the leaving path. Do not add a second removal ritual. Set one table lamp or supervised candle. Name one thing that can take up less room. Lower the light until the table is slightly dimmer. Close when the light is lowered and nothing more is removed.
- Intention: Let waning light lower the release.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What is ready to draw down?
- Why this fits: You chose Candle or light, resting, low capacity. Waning moon supports this form without making the timing a command. Lowered light gives release a way to lessen without drama. Private context supports keeping this practical and contained.
- How this was chosen: Chosen for Candle or light, resting, low capacity. Current output preserves a category but reads as release rather than rest.
- Source summary: Source lineage: waning lunar visibility and household light-lowering logic. Form kept contained.
- Warnings: `contract_request_changes`, `closest_match_overclaims_fit`

## 7. Exact Strong Match Vs Closest-Compatible Examples

Exact strong match that reads well:

- `contract.kitchen.high_beginning_waning` selects `grain_bowl_beginning`.
- The body chooses grain, bowl, table, waiting, return, and closure.
- No gap disclosure is needed.

Closest-compatible match that needs better expanded honesty:

- `contract.plant.both_high_tending_waning` selects `plant_witness_to_growth`.
- The body is coherent, but high-capacity Plant + home-tending coverage is thin.
- `How this was chosen` should say that the grimoire does not yet have a deeper
  Plant + home-tending rite and that the engine preserved Plant instead of
  drifting to Candle/light or salt/water.

Review-gap match:

- `contract.home.high_tending_waning` selects `first_light_at_the_threshold`.
- The body is coherent on its own, but it answers Home tending with
  light-threshold beginning language.
- This should feed #225/#227-style presentation and coverage repair, not become
  an acceptable baseline.

## 8. Bad Copy And Corrected Direction

Bad:

- `Speak or place both at a doorway, table, or bowl. Close by crossing once or folding the words away.`

Direction:

- Choose the doorway or the folded-word path, not both. If doorway: each person
  speaks one word, both cross once, close when both feet are inside.

Bad:

- `Welcome is the ritual form... Name what is welcome in this home today.`

Direction:

- For both of us, one person sets the cup and the other names the welcome, or
  each gives one word before the vessel returns.

Bad:

- Hidden closest-compatible gap in Plant high-capacity scenarios.

Direction:

- `Closest strong match: the grimoire does not yet have a deeper Plant + home-tending rite. This keeps Plant as the center rather than drifting to Candle/light.`

## 9. Review Of The Four #224 `contract_request_changes`

| Scenario | Current selection | #225 judgment |
| --- | --- | --- |
| `contract.home.high_tending_waning` | `first_light_at_the_threshold` | Still request changes. It is too light/beginning-forward for Home tending and high-capacity shape is thin. |
| `contract.reflection.high_saying_new` | `window_light_threshold` | Still request changes. Phrase-compatible, but too threshold/light-forward for Reflection + high capacity. |
| `contract.home.low_tending_waning_not_release` | `first_light_at_the_threshold` | Still request changes. It avoids clearing, but Home tending should place/return/arrange a home object. |
| `contract.surprise.low_resolves_real_category` | `waning_light_release` | Still request changes. Surprise me resolves to Candle/light, but Resting reads as release. |

## 10. Remaining Weak Output Patterns

- Both-of-us actions are still too often shared in explanation but not embodied
  in the ritual body.
- `first_day_last_day` still contains core place/action option menus.
- Closest-compatible coverage gaps are visible in report warnings but are not
  disclosed in `How this was chosen`.
- Some Plant source summaries fall back to timing-card/pattern wording instead
  of compressed material lineage.
- Home tending remains thin when the engine has to preserve Home without
  drifting to Candle/light.

## 11. Human Review Questions

- Should every closest-compatible coverage gap be disclosed in collapsed `How this was chosen`, or only high-capacity gaps?
- Should the `quiet_welcome` and `honeyed_word` bodies be patched so both-of-us
  roles are embodied?
- Should `first_day_last_day` split into doorway and folded-word variants, or
  should presentation choose one path based on context?
- Should Plant high-capacity tending/rest get deeper source-backed forms, or is
  closest-compatible Plant coverage acceptable for now with honest explanation?
- Which request-change outputs should feed #225 follow-up versus #227 composer
  rework?

## 12. Merge Recommendation

Hold for human review.

This PR is mergeable only as an authored-output diagnostic baseline. It should
not be read as saying the current warned outputs are acceptable. The warnings
make the weak outputs visible in docs, report output, and tests so future
presentation work cannot accidentally bless them.

## Validation Snapshot

Latest local recommendation-quality snapshot while creating this packet:

- Scenario count: 107
- Authored-output expectation scenarios: 26
- `fragmentary_option_menu_body`: 3
- `audience_only_pronoun_change`: 12
- `high_capacity_no_deeper_ritual_shape`: 7
- `closest_match_overclaims_fit`: 1
- `normal_copy_rationalizes_mismatch`: 0
- `coverage_gap_not_disclosed_in_expanded_explanation`: 8
- `coverage_gap_disclosed_as_broken_app_language`: 0
- `contract_request_changes`: 4
