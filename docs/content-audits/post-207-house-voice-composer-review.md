# Post-207 House Voice Composer Review

## 1. PR / Branch Summary

- PR number and title: #209, `Rewrite recommendation presentation composer`
- PR URL: https://github.com/coloradotim/moon-and-table/pull/209
- Branch name: `codex/issue-207-house-voice-composer`
- Base branch: `main`
- Implementation commit SHA: `7dddf5a823664af4223890f5e58d303b98843b3f`
- Issue addressed: #207
- PR state at packet creation: draft, open, human review required before merge

Short implementation summary:

- Refactored visible recommendation explanation composition away from separate scoring/report sections and toward compact house-voice sections: `Chosen for`, `Timing shaped it`, `Focus bridge`, `Ritual form`, `Material lineage`, `Boundary`, and `Household fit`.
- Added composer helpers for chosen-for phrasing, material/action meaning, timing/focus bridge language, boundary compression, and source lineage compression.
- Revised targeted Batch 1 presentation copy where optional accents held core ritual logic, material/action paths were menu-like, or activation/closure was ambiguous.
- Updated recommendation-quality scenarios and tests so the #207 golden examples check selected ritual form, normal-copy blocked phrases, warning counts, and Surprise me resolution.

Files changed, grouped by area:

- Presentation composer:
  - `src/lib/generate-weekly-brief.ts`
- Generated ritual copy:
  - `src/data/batch-1-ritual-library.ts`
- Source summary logic:
  - `src/lib/generate-weekly-brief.ts`
- Timing/focus bridge language:
  - `src/lib/generate-weekly-brief.ts`
  - `tests/fixtures/recommendation-quality-scenarios.ts`
- Optional accent / carry prompt handling:
  - `src/data/batch-1-ritual-library.ts`
  - `src/lib/generate-weekly-brief.ts`
- Tests / snapshots / fixtures:
  - `tests/fixtures/recommendation-quality-scenarios.ts`
  - `tests/unit/app-shell.test.ts`
  - `tests/unit/generate-weekly-brief.test.ts`
  - `tests/unit/recommendation-quality-report.test.ts`
- Docs:
  - `docs/content-audits/post-207-house-voice-composer-review.md`

Change confirmations:

- New sources added: no.
- New visible categories added: no.
- RitualPatterns added/revised/demoted: no new patterns and no demotions. A small set of existing `RitualPresentation` fields and optional accents were revised for composition quality.
- RitualPresentation data changed: yes, targeted copy changes for existing approved Batch 1 patterns.
- Scoring/reachability changed: no broad scoring or reachability changes. One scenario date was updated so the required grain-bowl golden case is actually waning timing.
- UI changed: yes, normal explanation section labels now reflect the compact composer (`Ritual form`, `Material lineage`, `Boundary`, `Household fit`).
- Normal output changed: yes.
- Debug/report output changed: yes, the recommendation-quality report now prints the new normal-copy fields while preserving score diagnostics, selected/rejected candidates, timing windows, and warnings.
- Source wording copied: no.
- Private data added: no.

Expected guardrail status:

- No new sources: confirmed.
- No new categories: confirmed.
- No broad scoring/reachability changes: confirmed.
- No copied source text: confirmed.
- No private data: confirmed.

## 2. Validation Commands

Required commands and current results:

```bash
npm run lint:content
```

Result: passed. `Content lint passed with no findings.`

```bash
npm run typecheck
```

Result: passed. `tsc --noEmit` completed successfully.

```bash
npm run test
```

Result: passed. 26 test files passed, 297 tests passed.

```bash
npm run test -- tests/unit/recommendation-quality-report.test.ts
```

Result: passed. 9 tests passed.

```bash
npm run recommendation:quality
```

Result: passed. 42 scenarios sampled. Automatic warning counts were all zero:

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

```bash
npm run diagnose:content
```

Result: passed. 91 scenarios sampled. The report still shows expected reachability gaps because `diagnose:content` is a broad curation diagnostic, not a #207 output-quality gate.

```bash
npm run check
```

Result: passed. Includes content lint, typecheck, build, 297 Vitest tests, and 2 Playwright tests. Vite still reports the existing large chunk warning.

## 3. Golden Scenario Review

The review bench now covers the requested #207 scenarios through `tests/fixtures/recommendation-quality-scenarios.ts` and `tests/unit/recommendation-quality-report.test.ts`.

| # | Scenario | Selected pattern / status | Review note |
| --- | --- | --- | --- |
| 1 | Plant + low + clearing + waning | `dead_leaf_release` | Uses spent-leaf material logic, clear closure, no plant damage. |
| 2 | Plant + beginning | `seed_waiting` | Waiting/checking logic moved into ritual body and closing; optional add-on removed. |
| 3 | Kitchen + both + beginning + waning | `grain_bowl_beginning` | Scenario date is now waning; together action is embodied. |
| 4 | Kitchen + rest/warmth | `quiet_welcome` or `warm_cup_between_us` | Current bench accepts `quiet_welcome` as equivalent warm welcome vessel. |
| 5 | Kitchen/Home + tending us | `honeyed_word` in `batch1.quiet_welcome` | Keeps shared action bounded; no relationship advice. |
| 6 | Home + threshold | `carried_key_word` | Key/object threshold form remains concrete. |
| 7 | Home + clearing | `salt_clear_water_release` | Salt/water vessel gives release a clean way out. |
| 8 | Candle/light + rest/dark | `bank_the_house_light` | Lowered-light rest form remains central. |
| 9 | Candle/light + full + saying clearly | `full_light_on_the_table` | Light holds one line and then closes. |
| 10 | Reflection + folded phrase | written/folded/container form matched | The test checks form family rather than forcing a single key. |
| 11 | Seasonal marker bowl | `seasonal_marker_bowl` | Single marker path, no festival feed. |
| 12 | Surprise me resolved | `resolved_open_preference` | Normal copy does not present Surprise me as a category. |

Each required scenario is checked for title/theme, ritual body, intention, best window, optional accent, carry prompt, why-this copy, how-this-was-chosen copy, source summary, selected form, warnings, and blocked diagnostic phrases.

## 4. Before / After Examples

### Kitchen grain bowl beginning

Before:

> Give the beginning a grain bowl. Use one ordinary kitchen material. Let the bowl hold the start so you do not have to push it. Place a pinch of grain, rice, oats, bean, or seed in a small bowl. Name the beginning in one sentence. Set the bowl at the table or return the grain when the phrase is complete. Close by placing the bowl or returning the grain to ordinary use.

After:

> Set a grain bowl for the beginning. Let this be a beginning held first, not launched. Choose one dry kitchen grain; rice, oats, or a single bean is enough. Put one dry kitchen grain in a small bowl and set the bowl at the table. One of you names the beginning; the other places the grain. Both touch the bowl briefly, then stop. Close by leaving the bowl where it can rest until tomorrow, or until the next time you both return to the table.

Review:

- Clearer title.
- Material menu reduced to one disciplined choice.
- Audience affects action.
- Closure is unambiguous.
- Optional add-on no longer carries core logic.
- Timing bridge now says waning timing turns beginning toward preparation rather than launch.

### Plant dead-leaf release

Before:

> Waning moon shaped the timing tone. Your plant choice helped point toward Dead Leaf Release.

After:

> You chose Plant, clearing something out, low capacity. Waning moon supports this form without making the timing a command. The spent leaf gives release a precise edge: only what is already finished is removed.

Review:

- Removes selection/report language.
- Keeps plant-release meaning specific.
- Boundary says no pruning living growth and no dramatic release.

### Plant beginning / seed waiting

Before:

> Use seed, grain, or a plant pot already available. Place one seed, grain, or plant pot where it can hold the beginning. Add a little water only if that is actually appropriate.

After:

> Treat waiting as part of the ritual. Choose one seed or dry grain already available. Place one seed or dry grain where it can hold the beginning. Name the beginning that can wait before it grows. Leave the seed or grain in place and stop checking it.

Review:

- Material path is clearer.
- Waiting and stop-checking are part of the ritual body/closing, not optional accent.
- Still may benefit later from a dedicated plant-beginning bridge if the product wants plant pot variants back.

### Honeyed word / tending us

Before:

> Place a drop of honey, sugar substitute, warm cup, bread piece, or empty cup as the sweetness cue. Say or write one word that can soften the home. Return or wash the material.

After:

> Place a tiny sweetness cue on a spoon or in an empty cup. Say or write one word that can soften the home. Return or wash the cue before adding more words.

Review:

- Material path is less menu-like.
- Boundary is explicit but not safety-forward: no control claim, no apology work, no long talk.
- Still worth reviewing whether `spoon or empty cup` is the right household default.

### Candle/light rest

Before:

> The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. Your candle or light choice helped point toward Bank the House Light.

After:

> You chose Candle or light, resting, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. Lowered light lets rest become visible without asking for more action.

Review:

- Timing shapes the ritual instead of narrating selection.
- The ritual remains light/dark/rest native.
- Source lineage is compressed to household fire-banking customs.

### Seasonal marker bowl

Before:

> Place one grain, leaf, key, bread piece, or ordinary object in a small bowl. Name what this season is asking the home to hold, begin, or release. Leave the bowl briefly, or empty it when the phrase feels complete. Close by placing, returning, or emptying the bowl.

After:

> Choose one small seasonal marker; a leaf, key, grain, or bread piece is enough. Place it in a small bowl and name what this season is asking the home to hold, begin, or release. Leave the bowl where it can rest until the next return to the table. Close by leaving the bowl alone until its next ordinary return.

Review:

- Closure is less ambiguous.
- Optional add-on no longer contains the empty/return decision.
- Still includes a small substitution set because the app cannot know the available household marker.

## 5. Normal-Copy Phrase Audit

The new regression test checks the #207 golden scenarios for these blocked normal-copy phrases:

- `approved ritual container`
- `selected ritual context`
- `symbolic fit context`
- `not as a prediction`
- `some approved options were set aside`
- `practical household constraints`
- `matched the selected ritual`
- `allowed in as a small accent`
- `about twenty minutes or less`
- `primary timing signal`
- raw `source.` ids
- raw `note.` ids
- raw `private_profile` keys
- `surprise me,` as if it were a real category

Current result: no blocked phrases in the #207 golden scenario normal copy.

Debug/report output still includes score reasons, selected timing windows, source IDs, source note IDs, private placeholder keys, and rejected alternatives in diagnostic sections. Those diagnostics were not hidden.

## 6. Source / Privacy / Scope Review

- New sources: none.
- Source packet #191 content: not implemented.
- Source-derived wording copied: no.
- Private data: none.
- Real names, emails, birth data, natal placements tied to people, relationship details, private schedules, private notes: none added.
- New visible categories: none.
- Broad ritual-library expansion: none.
- Broad scoring/reachability shortcuts: none.
- Safety/compliance-forward copy: not added; boundaries are compressed and material-specific.
- Therapy/productivity/wellness language: not added as a solution path.

## 7. Remaining Awkward Examples

- Some non-lunar timing bridges remain conservative, especially broad seasonal/current-sky phrasing. They avoid score language, but Tim should still review whether they feel specific enough.
- `kitchen.warmth.together` currently selects `quiet_welcome` in the quality bench. This is accepted as an equivalent warm welcome vessel, but if Tim wants warm-cup specificity, that should be a later scoring/content-tuning issue.
- `Household fit` can still be a little explanatory when both profile and natal-theme placeholders are present. It avoids raw private data, but it is not as grimoire-like as the ritual body.
- The composer still includes several compact `How this was chosen` sections when many influences are present. They are no longer trace dumps, but human review should decide whether the default collapsed detail is still too much.

## 8. Human Review Questions

For Tim and ChatGPT:

- Does `grain_bowl_beginning` now feel authored rather than assembled?
- Does the together/audience action feel embodied enough, especially in the grain, warm/welcome, and light scenarios?
- Are the boundary lines helpful, or should some be removed from normal `How this was chosen`?
- Are material substitution sets now disciplined enough, or should some patterns pick an even narrower default?
- Do seasonal/current-sky timing bridges feel meaningful enough without becoming generic?
- Should `kitchen.warmth.together` be left as `quiet_welcome`, or should a later issue tune it toward `warm_cup_between_us`?

## 9. Merge Recommendation

Do not merge until Tim reviews this packet and the draft PR examples.

Technical validation is green, and automatic recommendation-quality warnings are zero, but #207 is a house-voice issue. Human judgment remains the acceptance gate.
