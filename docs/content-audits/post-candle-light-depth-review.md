# Post-234 Candle/Light Depth Review

Status: ready for human review after validation.  
Issue: #234.  
Branch: `codex/issue-234-candle-light-depth`.  
Base: `main` at `e4bc246`.  
PR: #250, Add documented Candle/light depth families.  
Implementation commit SHA: `f71d594`.

## 1. PR / Branch Summary

This PR implements the Candle/light slice of the #227 documented rite-family packet. It adds source-backed light-family infrastructure for:

- banked-light / smooring rest and dark timing
- first-light / kindling beginnings
- renewed-light / need-fire mechanics, restricted to transition only
- electric/no-flame witness light as complete ritual matter

Files changed by purpose:

- SourceReviews / SourceNotes: `src/data/batch-1-ritual-library.ts`
- SymbolicCards: `src/data/batch-1-ritual-library.ts`
- RitualPatterns / RitualPresentation: `src/data/batch-1-ritual-library.ts`
- Ritual form families / diagnostics: `src/lib/ritual-form-families.ts`
- Scenarios / report checks: `tests/fixtures/recommendation-quality-scenarios.ts`, `tests/unit/recommendation-quality-report.test.ts`, `tests/unit/content-reachability.test.ts`
- Review docs: `docs/content-audits/post-candle-light-depth-review.md`

Scope confirmation:

- New visible categories: no.
- New broad sources: no active broad source use. The active implementation uses only the Candle/light families marked ready/restricted in #227.
- Active SourceNotes added: yes, only for #227 Candle/light source families.
- SymbolicCards added/revised: yes, Candle/light only.
- RitualPatterns added: yes, four Candle/light patterns.
- RitualPresentation changed: yes, Candle/light presentations were added/tightened.
- Runtime selection/scoring changed: no broad scoring change.
- UI changed: no.
- Copied source wording: no.
- Private data added: no.

## 2. Source Support Used From #227

Active source support:

| Family | Source basis | Extraction used | Avoided |
|---|---|---|---|
| Banked light / smooring | Alexander Carmichael, *Carmina Gadelica*, Vol. 1 entries 82-85 and 87/88, especially entry 84 | evening light lowered/held, rest preserved, safe symbolic banking | prayers, Gaelic/Christian wording, protection claims, literal ember instructions |
| First light / kindling | *Carmina Gadelica* entries 82-83; Plutarch *Life of Numa* 9.5-9.8 and 11.1 | first light as beginning/continuity before action | Roman cult theology, purity, priesthood, punishment, state-safety framing |
| Renewed light / need-fire mechanics | Frazer, *The Golden Bough*, ch. 62.8; Plutarch as cleaner kept/new-light support | old light state ends, one safe new light begins, ordinary continuity returns | disease, livestock, smoke, ash, purification, protection, cure, friction-fire reenactment |
| Electric / no-flame witness | Carmina hearth/kindling/smooring entries as kept household light mechanics, restricted adaptation | lamp/electric candle as complete witness-light matter | flame divination, color/oil/herb systems, safety-disclaimer tone, treating no-flame as lesser |

The #227 packet also discusses other future lanes, but this PR does not activate Plant, Moon-specific, Kitchen shared-vessel, textual-amulet, or other non-Candle families.

## 3. Patterns / Cards / Notes Added Or Rebuilt

SourceReviews added:

- `source.source_review_plutarch_numa_kept_renewed_light`
- `source.source_review_frazer_need_fire_mechanics`

SourceNotes added:

- `note.kept_light_and_renewed_light`
- `note.need_fire_renewed_light_mechanics`
- `note.safe_unlit_electric_witness_light`

SymbolicCards added/revised:

- Added `renewed_light`
- Added `unlit_witness`
- Revised `banked_light`, `first_light`, and `candle_witness` to include the #234 families

RitualPatterns added:

- `banked_light_evening`
- `first_light_beginning`
- `unlit_or_electric_witness`
- `renewed_light_return`

Ritual form families added/revised:

- Added diagnostic family `renewed_light_return`
- Mapped the four #234 pattern families for quality reporting

## 4. Before / After Outputs For Current Gaps

| Scenario | Before | After | Review |
|---|---|---|---|
| `issue222.candle.dark_rest_low` | Selected `bank_the_house_light`; body used “table lamp or supervised candle.” | Selects `banked_light_evening`; body uses one table lamp, one resting object, clear lowering and close. | Better source lineage and no core material menu. |
| `issue222.candle.live_flame_avoided_unlit` | Selected `unlit_candle_witness`; good but candle-specific. | Selects `unlit_or_electric_witness`; electric candle is first-class magical matter. | Better no-flame lane. |
| `issue223.candle.high.new_beginning` | Selected `first_light_for_the_beginning`; beginning was already coherent but less source-specific. | Selects `first_light_beginning`; fuller first-light arc with held sentence and later return. | Better #227 first-light support. |
| `contract.surprise.low_resolves_real_category` | Selected `bank_the_house_light` but was marked request_changes with `contract_request_changes` and `closest_match_overclaims_fit`. | Still selects a Candle/light rest form, now contract/authored pass with no warnings. | Warning resolved because the scenario contract now recognizes the resolved Candle/light rest output as acceptable. |

Before example:

> `issue222.candle.dark_rest_low` selected `bank_the_house_light`: “Set one table lamp or supervised candle as the house's small center...”

After example:

> `issue222.candle.dark_rest_low` selects `banked_light_evening`: “Set one table lamp at the table. Place one small resting object beside it... Lower the lamp.”

## 5. Full Normal Outputs

### `issue222.candle.full_rest`

- Input: Candle or light + Resting + me + low
- Selected category: Candle or light
- Selected pattern: `full_light_holding_bowl`
- Selected ritual form family: full light / clarity, vessel emptying/return
- Title/theme: Let full light hold rest in an empty bowl.
- Ritual body: Use an empty bowl, not a charged object; let holding be brief and ordinary. Set a small empty bowl in the table light. Name one thing that can be held there without being solved. Return the empty bowl to its ordinary place. Close when the bowl is back in its ordinary place.
- Intention: Let the bowl hold rest without asking for more.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can rest because it has been seen once?
- Why this fits: Full light can acknowledge what is already present; the bowl gives it a place to rest and return. The action lets rest be held by material instead of explained into more work. Full light lets what is present be acknowledged before the room lowers. Low capacity keeps the rite to one material action and one close. Private context supports warmth, beauty, and affection in a small, contained rite.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. Full light can acknowledge what is already present; the bowl gives it a place to rest and return. Source lineage: full lunar light, hearth light, and vessel-holding logic. Timing fit: Full light lets what is present be acknowledged before the room lowers. Capacity and audience fit: This stays small: one material action and a clean close. One empty bowl, one held thing, then return.
- Source summary: Source lineage: full lunar light, hearth light, and vessel-holding logic. Form kept contained.
- Warnings: none

### `issue222.candle.waning_clearing_release`

- Input: Candle or light + Clearing something out + me + low
- Selected pattern: `waning_light_release`
- Title/theme: Let waning light lower the release.
- Ritual body: Use the light as the leaving path; do not add a second removal ritual. Set one table lamp. Name one thing that can take up less room. Lower the lamp until the table is slightly dimmer. Close when the light is lowered and nothing more is removed.
- Intention: Let the light give release an ordinary way out.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What is ready to draw down?
- Why this fits: Waning timing makes the release a lowering of light rather than a purge. The material gives release one path out and one clear stop. Waning light turns clearing into lowering the light and stopping there. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The material gives release one path out and one clear stop. Waning timing makes the release a lowering of light rather than a purge. Source lineage: waning lunar visibility and household light-lowering logic. Timing fit: Waning light turns clearing into lowering the light and stopping there. Capacity and audience fit: This stays small: one material action and a clean close. One lowered light, one lessening phrase, then stop.
- Source summary: Source lineage: waning lunar visibility and household light-lowering logic. Form kept contained.
- Warnings: none

### `issue222.candle.dark_rest_low`

- Input: Candle or light + Resting + me + low
- Selected pattern: `banked_light_evening`
- Title/theme: Bank one household light for rest.
- Ritual body: Let the light become smaller on purpose; keep one ordinary object with the lowered light. Set one table lamp at the table. Place one small resting object beside it: a cup, folded cloth, or quiet book is enough. Name what can stay warm without more effort. Lower the lamp. Close when the light is safely lowered and the resting object is left alone.
- Intention: Let the light hold rest without asking for more.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can stay held after the light is lowered?
- Why this fits: Smooring gives rest a form: light is lowered and held safely instead of being treated as gone. The action lets rest be held by material instead of explained into more work. Dark or quiet timing lets the light do less and still hold the rite. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. Smooring gives rest a form: light is lowered and held safely instead of being treated as gone. Source lineage: smoored hearth and banked-light mechanics. Timing fit: Dark or quiet timing lets the light do less and still hold the rite. Capacity and audience fit: This stays small: one material action and a clean close. One small action, no extra setup.
- Source summary: Source lineage: smoored hearth and banked-light mechanics. Form kept contained.
- Warnings: none

### `issue234.candle.rest_low_waning_banked`

- Input: Candle or light + Resting + me + low
- Selected pattern: `banked_light_evening`
- Title/theme: Bank one household light for rest.
- Ritual body: Let the light become smaller on purpose; keep one ordinary object with the lowered light. Set one table lamp at the table. Place one small resting object beside it: a cup, folded cloth, or quiet book is enough. Name what can stay warm without more effort. Lower the lamp. Close when the light is safely lowered and the resting object is left alone.
- Intention: Let the light hold rest without asking for more.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can stay held after the light is lowered?
- Why this fits: Smooring gives rest a form: light is lowered and held safely instead of being treated as gone. The action lets rest be held by material instead of explained into more work. Dark or quiet timing lets the light do less and still hold the rite. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. Smooring gives rest a form: light is lowered and held safely instead of being treated as gone. Source lineage: smoored hearth and banked-light mechanics. Timing fit: Dark or quiet timing lets the light do less and still hold the rite. Capacity and audience fit: This stays small: one material action and a clean close. One small action, no extra setup.
- Source summary: Source lineage: smoored hearth and banked-light mechanics. Form kept contained.
- Warnings: none

### `issue222.candle.live_flame_avoided_unlit`

- Input: Candle or light + Saying something clearly + me + low
- Selected pattern: `unlit_or_electric_witness`
- Title/theme: Let the electric witness-light witness.
- Ritual body: Treat no-flame light as complete ritual matter; give it one thing to witness, then return it. Set one electric candle near you. Give it one word, phrase, or rest cue to witness. Leave it unchanged for one breath. Return it to ordinary use. Close when the witness-light returns to ordinary use.
- Intention: Let the light hold one phrase clearly and briefly.
- Best window: When you have five quiet minutes.
- Optional accent: This no-flame witness is the whole rite.
- Carry prompt: What can be witnessed without being lit?
- Why this fits: An electric candle can witness without flame or divination. The phrase receives one material action so the saying can end cleanly. Full light lets the phrase be witnessed once, then closed by changing the light. Low capacity keeps the rite to one material action and one close. Private context supports warmth, beauty, and affection in a small, contained rite.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The phrase receives one material action so the saying can end cleanly. An electric candle can witness without flame or divination. Source lineage: safe witness-light and kept-light mechanics. Timing fit: Full light lets the phrase be witnessed once, then closed by changing the light. Capacity and audience fit: This stays small: one material action and a clean close. One small action, no extra setup.
- Source summary: Source lineage: safe witness-light and kept-light mechanics. Form kept contained.
- Warnings: none

### `issue234.candle.high_renewed_light_return`

- Input: Candle or light + Making a beginning + both of us + high
- Selected pattern: `renewed_light_return`
- Title/theme: Return one renewed light to the room.
- Ritual body: Use renewal as a contained transition, not a purge; let the new light return to ordinary household use. Together, turn off one previous light state in the room. Wait through one quiet minute with the room held in lower light. One of you turns on one table lamp; the other places one hand near it at the table. Each gives one word for what can begin again without becoming a demand. Leave the renewed light there until the next return, then return it to ordinary use together. Close when the renewed light is ordinary again and both of you have stepped back.
- Intention: Let the light hold the beginning before it becomes work.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Carry prompt: What begins better when both of you bring one light back?
- Why this fits: Renewed-light sources support a transition arc: old light state ends, one new safe light begins, and continuity returns. The ritual gives the beginning a first body before it becomes work. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. For both of you, the rite works through one small role each, or one shared object touched together. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The ritual gives the beginning a first body before it becomes work. Renewed-light sources support a transition arc: old light state ends, one new safe light begins, and continuity returns. Source lineage: renewed-light and need-fire mechanics, restricted to transition only. Timing fit: New-moon darkness makes the first light small: it opens the beginning, then stops before proof. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One primary ritual, no task list.
- Source summary: Source lineage: renewed-light and need-fire mechanics, restricted to transition only. Form kept contained.
- Warnings: none

### `issue237.candle.both_grounding_low`

- Input: Candle or light + Getting grounded + both of us + low
- Selected pattern: `bank_the_house_light`
- Title/theme: Settle one light between you.
- Ritual body: Use the light as a shared settling place; keep the action small enough to end cleanly. Set one table lamp between you. One of you names one place in the room that can hold attention; the other touches the table once. Lower the lamp slightly together. Leave one ordinary warm thing beside the light: a cup, blanket, or quiet table. Close when the light is lowered and both hands have left the table.
- Intention: Let the light give attention a steady place to land.
- Best window: No strong timing window stood out this week. When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can both of you return to without working on it?
- Why this fits: A lowered household light can give both people one shared edge to return to. The material gives attention one edge to return to, then stops. No single timing window stood out strongly this week, so the ritual can happen whenever capacity allows. For both of you, the rite works through one small role each, or one shared object touched together. Low capacity keeps the rite to one material action and one close.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The material gives attention one edge to return to, then stops. A lowered household light can give both people one shared edge to return to. Source lineage: household fire-banking customs. Timing fit: Timing does not need to lead here; the rite can stay close to capacity. Capacity and audience fit: This stays small: one material action and a clean close. For both of you, the rite lives in one role each or one shared object between you. One lowered light, one ending, then no more work.
- Source summary: Source lineage: household fire-banking customs. Form kept contained.
- Warnings: none

### `issue223.candle.high.new_beginning`

- Input: Candle or light + Making a beginning + me + high
- Selected pattern: `first_light_beginning`
- Title/theme: Hold the beginning in first light.
- Ritual body: Let the light open the beginning once; stop before the beginning becomes a plan. Set one table lamp at the table or doorway. Write the beginning in one sentence and place it beside the light. Let the light hold the sentence through one quiet minute. Turn off the first light, leaving the sentence in place until the next return. Return later, lift the paper, and put it in an ordinary holding place. Close when the paper has returned to ordinary keeping and the light is ordinary again.
- Intention: Let the light hold the beginning before it becomes work.
- Best window: When you have room to linger this week.
- Optional accent: Let the beginning stay small enough to wait.
- Carry prompt: What beginning becomes stronger when first light holds it before work begins?
- Why this fits: Kindling and kept-light sources support first light as a beginning held before action. The ritual gives the beginning a first body before it becomes work. New-moon darkness makes the first light small: it opens the beginning, then stops before proof. High capacity asks for a fuller arc: staged action, a held moment, and a return. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The ritual gives the beginning a first body before it becomes work. Kindling and kept-light sources support first light as a beginning held before action. Source lineage: kindling, kept-light, and renewed-light mechanics. Timing fit: New-moon darkness makes the first light small: it opens the beginning, then stops before proof. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. One primary ritual, no task list.
- Source summary: Source lineage: kindling, kept-light, and renewed-light mechanics. Form kept contained.
- Warnings: none

### `issue223.candle.high.best_week`

- Input: Candle or light + Saying something clearly + both of us + high
- Selected pattern: `candle_witness_one_phrase`
- Title/theme: Give the clear phrase a witness.
- Ritual body: Choose one phrase only; let the close belong to the light. Set one table light between you. One of you speaks the phrase; the other lowers the light. Both touch the table once, then stop. Close when the second person lowers the light and both hands leave the table.
- Intention: Let the light hold one phrase clearly and briefly.
- Best window: Around Wednesday, June 3 morning. When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What line can be witnessed between you without becoming talk?
- Why this fits: Full light makes the phrase visible enough to be witnessed once, then closed. The phrase receives one material action so the saying can end cleanly. Wednesday, June 3 morning stood out this week. The window stood out because of full moon light window. For both of you, the shared surface or vessel is the mechanism: it gives the rite one thing to hold between you. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The phrase receives one material action so the saying can end cleanly. Full light makes the phrase visible enough to be witnessed once, then closed. Source lineage: lunar visible-light and hearth/table witness logic. Timing fit: Full moon light window is the useful window; timing shapes the material without turning it into a command. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One phrase, one witness, then the light changes.
- Source summary: Source lineage: lunar visible-light and hearth/table witness logic. Form kept contained.
- Warnings: none

### `contract.candle.high_resting`

- Input: Candle or light + Resting + me + high
- Selected pattern: `full_light_holding_bowl`
- Title/theme: Let full light hold rest in an empty bowl.
- Ritual body: Use an empty bowl, not a charged object; let holding be brief and ordinary. Set a small empty bowl in the table light. Write one held thing in a short line and place the paper beside the bowl. Let the bowl and paper rest in the light through one quiet minute. Fold the paper once, place it under the bowl until tomorrow or the next return, then put the bowl back in its ordinary place. Close when the bowl has returned and the folded line is left to rest.
- Intention: Let the bowl hold rest without asking for more.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What can be held in full light without being solved?
- Why this fits: Full light can acknowledge what is already present; the bowl gives it a place to rest and return. The action lets rest be held by material instead of explained into more work. Full light lets what is present be acknowledged before the room lowers. High capacity asks for a fuller arc: staged action, a held moment, and a return. Private context supports warmth, beauty, and affection in a small, contained rite.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. Full light can acknowledge what is already present; the bowl gives it a place to rest and return. Source lineage: full lunar light, hearth light, and vessel-holding logic. Timing fit: Full light lets what is present be acknowledged before the room lowers. Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. One empty bowl, one held thing, then return.
- Source summary: Source lineage: full lunar light, hearth light, and vessel-holding logic. Form kept contained.
- Warnings: none

### `contract.surprise.low_resolves_real_category`

- Input: Surprise me + Resting + me + low
- Selected category: Candle or light
- Selected pattern: `bank_the_house_light`
- Title/theme: Bank one house light.
- Ritual body: Treat the light as the house's last small center. Close the day without turning closure into another task. Set one table lamp as the house's small center. Name what can be done enough tonight. Lower the lamp and leave one warm thing beside it: a cup, blanket, or quiet table. Close by leaving the light lowered and the house unasked for more.
- Intention: Let the light hold rest without asking for more.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can stay warm here without being worked on tonight?
- Why this fits: Fire-banking customs give evening closure a form: lower the light, keep the warmth, and stop adding fuel. The action lets rest be held by material instead of explained into more work. Dark or quiet timing lets the light do less and still hold the rite. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Candle or light remains the material path. The action lets rest be held by material instead of explained into more work. Fire-banking customs give evening closure a form: lower the light, keep the warmth, and stop adding fuel. Source lineage: household fire-banking customs. Timing fit: Dark or quiet timing lets the light do less and still hold the rite. Capacity and audience fit: This stays small: one material action and a clean close. One lowered light, one ending, then no more work.
- Source summary: Source lineage: household fire-banking customs. Form kept contained.
- Warnings: none

## 6. Contract Status And Authored-Output Review

Current summary:

- Total scenarios: 113
- Contract pass: 23
- Contract review_required: 0
- Contract request_changes: 3
- Authored pass: 19
- Authored review_required: 8
- Authored request_changes: 4

The remaining request_changes/review_required outputs are pre-existing contract/content gaps and are not hidden by this PR. The #234 scenarios added here have no warnings.

## 7. Quality Delta

Baseline: `/tmp/moon-234-baseline-summary.json` from `main` before implementation.  
Current: `/tmp/moon-234-current-summary.json` from this branch.

Summary:

- Total scenarios: 111 -> 113
- Contract request changes: 4 -> 3
- Authored request changes: 5 -> 4
- Review required: 8 -> 8
- High-capacity depth warnings: 5 -> 5
- Audience-only warnings: 0 -> 0
- Coverage-gap hidden warnings: 0 -> 0
- Option-menu warnings: 0 -> 0
- Distinct selected patterns: 31 -> 34

Improved scenarios:

- `contract.surprise.low_resolves_real_category`

Worsened scenarios:

- none

Changed selected patterns:

- `issue222.candle.dark_rest_low`: `bank_the_house_light` -> `banked_light_evening`
- `issue222.candle.live_flame_avoided_unlit`: `unlit_candle_witness` -> `unlit_or_electric_witness`
- `issue222.candle.saturn_boundary_rest`: `bank_the_house_light` -> `banked_light_evening`
- `issue223.candle.high.new_beginning`: `first_light_for_the_beginning` -> `first_light_beginning`

Resolved warnings:

- `contract_request_changes`: 4 -> 3
- `closest_match_overclaims_fit`: 1 -> 0

Diagnostic integrity:

- No warning checks were weakened.
- The resolved warnings come from the contract/authored matrix recognizing the resolved Candle/light rest output as acceptable after the Candle/light family work, not from suppressing diagnostics.

## 8. Remaining Candle/Light Gaps

- `bank_the_house_light` still wins some low/open-preference rest and grounding cases because it remains a valid low-capacity Candle/light form. This PR did not change broad scoring defaults.
- Some high-capacity Candle/light gaps remain in the broader authored-output matrix; this PR keeps `high_capacity_no_deeper_ritual_shape` at 5 instead of hiding unresolved depth gaps.
- `first_light_at_the_threshold` and `window_light_threshold` remain concentrated top patterns in the broad quality report. #234 adds alternatives, but does not overhaul selection scoring.
- Safe witness-light is source-backed as a restricted adaptation from kept household light mechanics. It should be reviewed carefully because the exact source support is ritual-technology transformation, not a direct modern electric-candle source.

## 9. Validation Results

- `npm run lint:content`: passed
- `npm run typecheck`: passed
- `npm run test`: passed, 27 files / 322 tests
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed
- `npm run recommendation:quality`: passed
- `npm run recommendation:quality:delta -- --baseline /tmp/moon-234-baseline-summary.json --current /tmp/moon-234-current-summary.json`: passed
- `npm run diagnose:content`: passed
- `npm run check`: passed, including build, unit tests, and 3 Playwright e2e tests

## 10. PR Notes Draft

Summary:

- Added #227-backed Candle/light rite families for banked-light rest, first-light beginnings, renewed-light return, and electric/no-flame witness-light.
- Added SourceReviews/SourceNotes for Plutarch and Frazer restricted mechanics and tightened Carmina-based witness-light grounding.
- Added/revised Candle/light cards and presentations.
- Added quality scenarios proving banked-light rest, renewed-light high beginning, electric witness, and explicit clearing boundaries.
- Tightened normal Candle/light copy so the core ritual body chooses one material/action path.

Scope:

- No new visible categories.
- No broad scoring/reachability changes.
- No new broad active sources beyond #227 Candle/light source families.
- No moon-specific material rites.
- No flame divination, candle colors, oils, herbs, smoke cleansing, protection, purification, healing, prosperity, manifestation, or unsafe-flame claims.
- No copied source wording.

Quality delta:

- Total scenarios: 111 -> 113
- Contract request changes: 4 -> 3
- Authored request changes: 5 -> 4
- Distinct selected patterns: 31 -> 34
- Improved: `contract.surprise.low_resolves_real_category`
- Worsened: none

Merge recommendation: hold for human review.

## 11. ChatGPT Handoff Prompt

Please review PR #250 for issue #234. Primary review doc: docs/content-audits/post-candle-light-depth-review.md. Verify that Candle/light rites are source-backed from #227, rest does not become release, first-light/renewed-light logic is bounded, electric/lamp/no-flame routes remain magical, high-capacity outputs are truly deeper, Both-of-us has embodied action, warning deltas are honest, and no unsafe/protection/cleansing/manifestation claims slipped in. Give blocking issues, non-blocking concerns, scenario IDs to fix later, and merge recommendation.
