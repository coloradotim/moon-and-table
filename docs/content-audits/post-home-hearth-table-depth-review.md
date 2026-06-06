# Post-231 Home Hearth/Table Depth Review

Issue: #231  
Branch: `codex/issue-231-home-hearth-table-depth`  
Base: `main`  
PR: pending

## 1. PR Summary

This PR implements the narrow #231 Home/hearth/table slice that #227 marks implementation-ready:

- `hearth_object_return`: Home tending through one ordinary household object placed beside table light, held briefly, and returned.
- `last_household_light`: Home rest/closing through one last household light and one resting place left alone.
- `home_hearth_table_return`: a diagnostic ritual-form family so Home/hearth/table work can be measured separately from threshold fallback and Candle/light takeover.

It does not implement broader table-center, household shrine, house blessing, generic object-return, Moon-specific, Plant, Kitchen, or Reflection work.

## 2. Scope Confirmation

- New visible categories: no.
- Broad scoring changes: no.
- UI changes: no.
- New broad source families: no.
- Active SourceNotes added: no.
- RitualPatterns added: yes, two narrow Home/hearth patterns.
- RitualPresentation changed: yes, for the two new patterns only.
- Ritual form diagnostics changed: yes, one new `home_hearth_table_return` family.
- Recommendation output changed: yes, Home+tending contract scenarios now select `hearth_object_return`.
- Copied source wording: no.
- Private data added: no.

## 3. Source Support And Boundaries

Source support used from #227:

- *Carmina Gadelica*, Vol. 1, entries 82-85 and 87/88, especially entry 84, via existing `note.smooring_fire_as_evening_closure`.
- Existing `note.hearth_first_and_last` for hearth/table first-and-last attention.

Extracted mechanics:

- lowered or last household light;
- evening/hearth settling;
- one object left/held briefly;
- return as closure.

Guardrail exclusions:

- copied blessing/prayer language;
- no protection, warding, security, purification, cleansing, healing, prosperity, manifestation, or guaranteed-effect claims;
- live ember instructions or unattended flame;
- cleaning/chore/productivity reset;
- household shrine or deity/offering structure;
- broad table-center expansion beyond already-existing #201 bread/grain scenarios.

## 4. Files Changed By Purpose

- Home/hearth patterns and card references: `src/data/batch-1-ritual-library.ts`
- Composer meaning/lineage/timing boundary language: `src/lib/generate-weekly-brief.ts`
- Ritual-form diagnostics: `src/lib/ritual-form-families.ts`
- Content reachability diagnostics: `src/lib/content-reachability.ts`
- Quality scenarios and authored-output expectations: `tests/fixtures/recommendation-quality-scenarios.ts`
- Regression checks: `tests/unit/recommendation-quality-report.test.ts`, `tests/unit/content-reachability.test.ts`
- Review packet: `docs/content-audits/post-home-hearth-table-depth-review.md`

## 5. Before / After Highlights

| Scenario | Before | After | Review |
|---|---|---|---|
| `contract.home.low_tending_waning_not_release` | `first_light_at_the_threshold`; too threshold-light-forward for low Home tending. | `hearth_object_return`; one object placed beside table light and returned. | Pass; warning resolved through output improvement. |
| `contract.home.high_tending_waning` | `first_light_at_the_threshold`; compatible but too beginning/threshold-forward. | `hearth_object_return`; room-edge return, held pause, ordinary return. | Pass; high-depth warning resolved through actual ritual architecture. |
| `issue231.home.high_tending_no_timing` | Not previously covered. | `hearth_object_return`; timing stays quiet. | Pass; proves material form carries neutral timing. |
| `issue231.home.dark_rest_closing` | Not previously covered. | `last_household_light`; Home rest via last-light settling. | Pass; Candle/light does not take over category. |
| `contract.home.high_threshold_full` | Threshold selected when threshold explicit. | Still threshold/light-window form; warning remains for high-capacity thinness. | Correctly not displaced by new Home tending form. |

## 6. Quality Delta

Baseline: `/tmp/moon-231-baseline-summary.json`  
Current: `/tmp/moon-231-current-summary.json`

- Total scenarios: 113 -> 116
- Contract request changes: 3 -> 1
- Authored request changes: 4 -> 2
- Review required: 8 -> 8
- High-capacity depth warnings: 5 -> 4
- Audience-only warnings: 0 -> 0
- Coverage-gap hidden warnings: 0 -> 0
- Option-menu warnings: 0 -> 0
- Distinct selected patterns: 34 -> 36

Improved scenarios:

- `contract.home.high_tending_waning`
- `contract.home.low_tending_waning_not_release`

Worsened scenarios:

- none

Changed selected patterns:

- `contract.home.high_tending_waning`: `first_light_at_the_threshold` -> `hearth_object_return`
- `contract.home.low_tending_waning_not_release`: `first_light_at_the_threshold` -> `hearth_object_return`
- `contract.numerology.minor_accent_only`: `bread_at_the_center` -> `hearth_object_return`
- `numerology.accent.secondary`: `first_light_at_the_threshold` -> `hearth_object_return`

Resolved warnings:

- `coverage_gap_category_focus_capacity`: 7 -> 6
- `closest_compatible_pattern_selected`: 7 -> 6
- `high_capacity_depth_gap`: 7 -> 6
- `stronger_wrong_category_rejected`: 7 -> 6
- `recommendation_confidence_limited`: 7 -> 6
- `contract_request_changes`: 3 -> 1
- `high_capacity_no_deeper_ritual_shape`: 5 -> 4

Diagnostic integrity: warnings decreased because the Home contract outputs changed from threshold-light fallback to sourced Home/hearth/object-return forms. No warning checks were removed or weakened.

## 7. Full Normal Outputs

### `contract.home.low_tending_waning_not_release`

- Input: Home; Tending the home; me; low; today
- Selected pattern: `hearth_object_return`
- Selected family: Home hearth/table return, vessel emptying/return
- Title/theme: Return one hearth-side object.
- Ritual body: Choose an object that already belongs here; let the return, not cleaning, be the close. Choose one ordinary household object that already has a place. Set it beside the table light and name what can settle here. Return it to its place. Close when the object is back where it belongs.
- Intention: Let the returned object give household care one concrete place to land.
- Best window: When you have five quiet minutes.
- Optional accent: No add-on needed.
- Carry prompt: What can settle through one return?
- Why this fits: Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. The household material makes tending visible, then returns to ordinary use. Waning timing makes this a settling return, not a purge or a cleaning reset. Low capacity keeps the rite to one material action and one close. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Home remains the material path. The household material makes tending visible, then returns to ordinary use. Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. Source lineage: smoored hearth and household object-return mechanics. / Timing fit: Waning timing makes this a settling return, not a purge or a cleaning reset. / Capacity and audience fit: This stays small: one material action and a clean close. One household object, one settled pause, then ordinary return.
- Source summary: Source lineage: smoored hearth and household object-return mechanics. Form kept contained.
- Warnings: none

### `contract.home.high_tending_waning`

- Input: Home; Tending the home; me; high; today
- Selected pattern: `hearth_object_return`
- Selected family: Home hearth/table return, vessel emptying/return
- Title/theme: Settle the house through one returned object.
- Ritual body: Choose an object that already belongs here; let the return, not cleaning, be the close. Choose one ordinary object from the room and set it beside the table light. Walk once to the room's edge and back to the table. Name what the home can keep settled without becoming a project. Let the object rest beside the light through one quiet minute. Return it to its ordinary place. Close when the object is back in ordinary use and the table is left alone.
- Intention: Let the returned object give household care one concrete place to land.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What kind of care returns with the object?
- Why this fits: Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. The household material makes tending visible, then returns to ordinary use. Waning timing makes this a settling return, not a purge or a cleaning reset. High capacity asks for a fuller arc: staged action, a held moment, and a return. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Home remains the material path. The household material makes tending visible, then returns to ordinary use. Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. Source lineage: smoored hearth and household object-return mechanics. / Timing fit: Waning timing makes this a settling return, not a purge or a cleaning reset. / Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. One household object, one settled pause, then ordinary return.
- Source summary: Source lineage: smoored hearth and household object-return mechanics. Form kept contained.
- Warnings: none

### `issue231.home.high_tending_no_timing`

- Input: Home; Tending the home; me; high; today
- Selected pattern: `hearth_object_return`
- Selected family: Home hearth/table return, vessel emptying/return
- Title/theme: Settle the house through one returned object.
- Ritual body: Choose an object that already belongs here; let the return, not cleaning, be the close. Choose one ordinary object from the room and set it beside the table light. Walk once to the room's edge and back to the table. Name what the home can keep settled without becoming a project. Let the object rest beside the light through one quiet minute. Return it to its ordinary place. Close when the object is back in ordinary use and the table is left alone.
- Intention: Let the returned object give household care one concrete place to land.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What kind of care returns with the object?
- Why this fits: Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. The household material makes tending visible, then returns to ordinary use. The timing can stay quiet while the household form does the tending. High capacity asks for a fuller arc: staged action, a held moment, and a return. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Home remains the material path. The household material makes tending visible, then returns to ordinary use. Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. Source lineage: smoored hearth and household object-return mechanics. / Timing fit: The timing can stay quiet while the household form does the tending. / Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. One household object, one settled pause, then ordinary return.
- Source summary: Source lineage: smoored hearth and household object-return mechanics. Form kept contained.
- Warnings: none

### `issue231.home.dark_rest_closing`

- Input: Home; Resting; me; steady; today
- Selected pattern: `last_household_light`
- Selected family: Home hearth/table return, banked/darkening light
- Title/theme: Settle the last household light.
- Ritual body: Let one light become the last household center; leave one resting place undisturbed. Set one household light at the table or room center. Place one hand near the light and name what can stop asking tonight. Lower the light. Leave one resting place undisturbed until the next return. Close when the light is lowered and the resting place is left alone.
- Intention: Let the last household light hold rest without asking for more.
- Best window: When you have a little space this week.
- Optional accent: No add-on needed.
- Carry prompt: What can stay warm here without more tending?
- Why this fits: Smooring gives Home rest a last-light shape: the light lowers, the room keeps warmth, and nothing else is asked. The action lets rest be held by material instead of explained into more work. Dark or quiet timing lets the house lower one light and leave the rest alone. Steady capacity gives the material a little room to be placed, held, and returned. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Home remains the material path. The action lets rest be held by material instead of explained into more work. Smooring gives Home rest a last-light shape: the light lowers, the room keeps warmth, and nothing else is asked. Source lineage: smoored hearth, last-light, and household settling mechanics. / Timing fit: Dark or quiet timing lets the house lower one light and leave the rest alone. / Capacity and audience fit: The material gets room to be placed, held, and returned. One last light, one resting place, then no more tending.
- Source summary: Source lineage: smoored hearth, last-light, and household settling mechanics. Form kept contained.
- Warnings: none

### `contract.home.high_threshold_full`

- Input: Home; Marking a threshold; both_of_us; high; today
- Selected pattern: `window_light_threshold`
- Selected family: first light / threshold, threshold/crossing/bowl/key, written/folded/container, first/last threshold
- Title/theme: Give the phrase a window threshold.
- Ritual body: Use the window as the crossing place; let closing the curtain be the close. Stand together near the window light. One of you names the phrase; the other closes the curtain. Let the edge stand. Close when the curtain is closed.
- Intention: Let the threshold mark the crossing and return to ordinary use.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What phrase can meet the edge between you?
- Why this fits: Window light lets a phrase meet a threshold without requiring flame or outdoor viewing. The ritual gives the threshold one action and one close. Full moon supports this form without making the timing a command. For both of you, the rite works through one small role each, or one shared object touched together. High capacity asks for a fuller arc: staged action, a held moment, and a return.
- How this was chosen: Material and ritual fit: Home remains the material path. The ritual gives the threshold one action and one close. Window light lets a phrase meet a threshold without requiring flame or outdoor viewing. Source lineage: first-light threshold and observable-light timing logic. / Timing fit: Full moon supports this form without making the timing a command. / Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. For both of you, the rite lives in one role each or one shared object between you. One window edge, one phrase, then the curtain closes.
- Source summary: Source lineage: first-light threshold and observable-light timing logic. Form kept contained.
- Warnings: `high_capacity_no_deeper_ritual_shape`

### `issue231.surprise.home_high_resolved`

- Input: Surprise me; Tending the home; me; high; today
- Selected category: Surprise me -> Home
- Selected pattern: `hearth_object_return`
- Selected family: Home hearth/table return, vessel emptying/return
- Title/theme: Settle the house through one returned object.
- Ritual body: Choose an object that already belongs here; let the return, not cleaning, be the close. Choose one ordinary object from the room and set it beside the table light. Walk once to the room's edge and back to the table. Name what the home can keep settled without becoming a project. Let the object rest beside the light through one quiet minute. Return it to its ordinary place. Close when the object is back in ordinary use and the table is left alone.
- Intention: Let the returned object give household care one concrete place to land.
- Best window: When you have room to linger this week.
- Optional accent: No add-on needed.
- Carry prompt: What kind of care returns with the object?
- Why this fits: Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. The household material makes tending visible, then returns to ordinary use. The timing can stay quiet while the household form does the tending. High capacity asks for a fuller arc: staged action, a held moment, and a return. Private context supports keeping this practical and contained.
- How this was chosen: Material and ritual fit: Home remains the material path. The household material makes tending visible, then returns to ordinary use. Hearth-settling mechanics give household care a small shape: one object is placed, held, and returned. Source lineage: smoored hearth and household object-return mechanics. / Timing fit: The timing can stay quiet while the household form does the tending. / Capacity and audience fit: The larger shape needs staged action, a held moment, and a real return. One household object, one settled pause, then ordinary return.
- Source summary: Source lineage: smoored hearth and household object-return mechanics. Form kept contained.
- Warnings: none

### `issue183.home.tending_steady`

- Selected pattern: `house_from_root_to_roof`
- Ritual body: Move by places of contact, not by cleaning; use plain household words instead of borrowed prayer language. Touch the floor or lowest safe point and name what supports the home. Touch a wall, beam, or table and name what holds. Stand at the threshold and name what the house carries forward. Close by touching the threshold and leaving the map complete.
- Warnings: none

### `contract.pause.grounded_complete`

- Selected pattern: `threshold_bowl`
- Ritual body: Use the bowl only when the doorway is the real ritual place; keep the words plain and brief. Touch the threshold or the bowl. Name one word for crossing in. Step away from the threshold. Close when your hand leaves the threshold.
- Warnings: none

### `issue201.home.bread_grain_table_center`

- Selected pattern: `bread_at_the_center`
- Ritual body: Use bread only if it already belongs here; one ordinary substitute that already works in this household is enough. Let the table hold one small sign of enough. Place a small piece of bread, or one ordinary household substitute, on a plate at the table center. One of you names what is enough; the other turns the plate slightly toward the center. Both leave the plate alone until it returns to ordinary use. Close when the plate is clear: the bread is eaten, put away, or returned to ordinary use.
- Warnings: none

### `batch1.home.salt_water_clearing`

- Selected pattern: `salt_clear_water_release`
- Ritual body: Keep the release specific and small; let rinsing be closure, not another ritual. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away. Rinse the bowl and return it to ordinary use. Close when the bowl is rinsed and empty.
- Warnings: none

## 8. Remaining Home Gaps And Risks

- `contract.home.high_threshold_full` still has `high_capacity_no_deeper_ritual_shape`; this is intentionally preserved because threshold high-capacity depth is not solved by #231.
- `house_from_root_to_roof` remains older house-map coverage and still has less elegant source lineage than the new hearth/object-return patterns.
- Broader table-center, household shrine, and generic object-return remain out of scope until exact sources are pinned and approved.
- `hearth_object_return` appears 6 times in the quality matrix; concentration is worth watching, but the count is from targeted #231 scenarios and generic Home-tending numerology fixtures.

## 9. Validation Results

- `npm run lint:content`: passed.
- `npm run typecheck`: passed.
- `npm run test`: passed, 27 files / 323 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: passed, 18 tests.
- `npm run test -- tests/unit/content-reachability.test.ts`: passed, 4 tests.
- `npm run recommendation:quality`: passed, 116 scenarios.
- `npm run recommendation:quality:delta -- --write-current /tmp/moon-231-current-summary.json`: passed.
- `npm run recommendation:quality:delta -- --baseline /tmp/moon-231-baseline-summary.json --current /tmp/moon-231-current-summary.json`: passed.
- `npm run diagnose:content`: passed, 104 sampled scenarios; `hearth_object_return` and `last_household_light` are selected in the diagnostic sample.
- `npm run check`: passed, including build, unit tests, and 3 Playwright smoke tests.

## 10. Merge Recommendation

Hold for Tim/ChatGPT review. The target Home request-change cases are fixed and no new warnings appear, but #231 explicitly asks for human review before merge.

## 11. PR Notes Draft

Implemented the narrow #231 Home/hearth/table source-ready slice from #227:

- Added `hearth_object_return` and `last_household_light`.
- Added `home_hearth_table_return` diagnostics.
- Updated Home+tending scenarios so low/high waning and high/no-strong-timing select Home/hearth/table object-return rather than threshold-light fallback.
- Preserved threshold output when threshold is explicit.
- No new visible categories, broad scoring changes, UI changes, broad sources, copied source text, or private data.
- No protection/warding/security, cleansing, healing, prosperity, manifestation, chore/productivity, or copied prayer language.

Quality delta: contract request changes 3 -> 1; authored request changes 4 -> 2; high-capacity depth warnings 5 -> 4; worsened scenarios none.

Handoff prompt:

Please review PR <PR number> for issue #231. Primary review doc: docs/content-audits/post-home-hearth-table-depth-review.md. Verify that Home + tending uses documented Home/hearth/table/object-return structure, not threshold/light fallback or chores. Review before/after for #224 Home request-change cases, source support, outputs, quality delta, and merge recommendation.
