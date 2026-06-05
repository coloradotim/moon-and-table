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

- Refactored visible recommendation explanation composition away from separate scoring/report sections and toward compact house-voice sections: `Chosen for`, `Timing shaped it`, `Focus bridge`, `Ritual form`, `Material lineage`, `Kept bounded`, and `Household fit`.
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
- UI changed: yes, normal explanation section labels now reflect the compact composer (`Ritual form`, `Material lineage`, `Kept bounded`, `Household fit`).
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
| 10 | Reflection + folded phrase | `folded_phrase_vessel` | The test now forces the folded/written vessel output for the golden packet. |
| 11 | Seasonal marker bowl | `seasonal_marker_bowl` | Single marker path, no festival feed. |
| 12 | Surprise me resolved | `resolved_open_preference` | Normal copy does not present Surprise me as a category. |

Each required scenario is checked for title/theme, ritual body, intention, best window, optional accent, carry prompt, why-this copy, how-this-was-chosen copy, source summary, selected form, warnings, and blocked diagnostic phrases. Appendix A includes the full after-only normal copy for all 12 golden scenarios.

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
- The visible `Kept bounded` line now says one spent leaf, one release, then the plant is left alone.

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
- The visible `Kept bounded` line now says one word, one sweetness cue, then the cup is returned.
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
- `timing tone`
- `score reason`
- `raw score`
- `exact pattern match`
- `ritual form family matched`
- `selected pattern`
- `approved`
- `safety`
- `constraints`
- `tradeoff`
- raw `source.` ids
- raw `note.` ids
- raw `private_profile` keys
- `surprise me,` as if it were a real category
- `surprise me ->` as unresolved open-preference wording

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
- Safety/compliance-forward copy: reduced in normal output; visible containment language now uses `Kept bounded` phrasing instead of hard-guardrail lists.
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
- Are the `Kept bounded` lines helpful, or should some be removed from normal `How this was chosen`?
- Are material substitution sets now disciplined enough, or should some patterns pick an even narrower default?
- Do seasonal/current-sky timing bridges feel meaningful enough without becoming generic?
- Should `kitchen.warmth.together` be left as `quiet_welcome`, or should a later issue tune it toward `warm_cup_between_us`?

## 9. Merge Recommendation

Do not merge until Tim reviews this packet and the draft PR examples.

Technical validation is green, and automatic recommendation-quality warnings are zero, but #207 is a house-voice issue. Human judgment remains the acceptance gate.

## Appendix A. Full After-Output Evidence

These are after-only normal user-facing outputs from the #207 golden scenarios. They omit debug score dumps, raw trace keys, rejected candidates, and diagnostic IDs.

### 1. Plant + low + clearing + waning

- Scenario fixture: `batch1.plant.dead_leaf_release`
- Resulting ritual: Dead Leaf Release

**Title / Theme**

Release only the dead leaf.

**Ritual Body**

Look before touching. Do not make release larger than the leaf. Choose one already dead or fallen leaf. Remove only that spent matter, or choose observation if none is ready. Name what is complete and place the leaf in trash, compost, or outside if appropriate. Close when the leaf has left your hand.

**Intention**

Release only the dead leaf.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

Let the plant remain untouched after the spent leaf is gone.

**Carry Prompt**

What is as complete as the spent leaf?

**Why This Fits**

You chose Plant, clearing something out, low capacity. Waning moon supports this form without making the timing a command. The spent leaf gives release a precise edge: only what is already finished is removed. This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Plant, clearing something out, low capacity
- Timing shaped it: Waning moon supports this form without making the timing a command.
- Focus bridge: Clearing something out stays inside the ritual action.
- Ritual form: A spent leaf gives release a precise edge: remove what is already finished, not what is alive.
- Material lineage: Source lineage: plant growth and rest traditions.
- Kept bounded: One spent leaf, one release, then the plant is left alone.
- Household fit: This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags.
- Small accent: Numerology 7 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: plant growth and rest traditions. Form kept contained.

### 2. Plant + beginning

- Scenario fixture: `issue183.plant.beginning.seed`
- Resulting ritual: Seed Waiting

**Title / Theme**

Let the seed wait.

**Ritual Body**

Treat waiting as part of the ritual. Choose one seed or dry grain already available. Place one seed or dry grain where it can hold the beginning. Name the beginning that can wait before it grows. Leave the seed or grain in place and stop checking it. Close by leaving the seed or grain in place and not checking for proof.

**Intention**

Let the seed wait.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What beginning can wait like a seed or grain?

**Why This Fits**

You chose Plant, making a beginning, low capacity. Seasonal timing asks for a small marker, not a public calendar performance. Seed or grain gives the beginning a body, and waiting is part of the rite. This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Plant, making a beginning, low capacity
- Timing shaped it: Seasonal timing asks for a small marker, not a public calendar performance.
- Focus bridge: Making a beginning is held as tone while the ritual stays within the available form.
- Ritual form: Seed and water make a beginning material without demanding immediate growth.
- Material lineage: Source lineage: seed-water beginning logic.
- Kept bounded: One seed or grain, one beginning, then waiting without proof.
- Household fit: This fits at least one saved profile theme around practical home-tending magic without conflicting with household avoid flags.
- Small accent: Numerology 7 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: seed-water beginning logic. Form kept contained.

### 3. Kitchen + both + beginning + waning

- Scenario fixture: `batch1.kitchen.grain_beginning`
- Resulting ritual: Grain Bowl Beginning

**Title / Theme**

Set a grain bowl for the beginning.

**Ritual Body**

Let this be a beginning held first, not launched. Choose one dry kitchen grain; rice, oats, or a single bean is enough. Put one dry kitchen grain in a small bowl and set the bowl at the table. One of you names the beginning; the other places the grain. Both touch the bowl briefly, then stop. Close by leaving the bowl where it can rest until tomorrow, or until the next time you both return to the table.

**Intention**

Set a grain bowl for the beginning.

**Best Window**

When you have a little space this week.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What beginning can be held between you before it becomes work?

**Why This Fits**

You chose Kitchen, both of you, making a beginning, steady capacity. Waning timing turns the beginning toward preparation rather than launch. Grain gives the beginning weight; the bowl gives it a place to rest. For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action.

**How This Was Chosen**

- Chosen for: Kitchen, both of you, making a beginning, steady capacity
- Timing shaped it: Waning timing turns the beginning toward preparation rather than launch.
- Focus bridge: You chose making a beginning, and the timing makes the beginning a held preparation rather than a launch.
- Ritual form: Waning timing makes this a beginning held in reserve rather than launched.
- Material lineage: Source lineage: grain/table household rhythm and seed-water beginning logic.
- Kept bounded: One grain, one sentence, one night of waiting.
- Household fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action.
- Small accent: Numerology 7 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: grain/table household rhythm and seed-water beginning logic. Form kept contained.

### 4. Kitchen + rest/warmth

- Scenario fixture: `kitchen.warmth.together`
- Resulting ritual: Quiet Welcome

**Title / Theme**

Set out a quiet welcome.

**Ritual Body**

Welcome is the ritual form, not a performance. Choose one ordinary welcome vessel; a cup or small bowl is enough. Set the cup or bowl at the table or counter. Name what is welcome in this home today. Return or wash the vessel when finished. Close by returning the material to ordinary use.

**Intention**

Set out a quiet welcome.

**Best Window**

When you have a little space this week.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What welcome can the shared vessel hold for both of you?

**Why This Fits**

You chose Kitchen, both of you, tending us, steady capacity. Seasonal timing asks for a small marker, not a public calendar performance. A cup or bowl makes welcome visible without making it a performance. For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action.

**How This Was Chosen**

- Chosen for: Kitchen, both of you, tending us, steady capacity
- Timing shaped it: Seasonal timing asks for a small marker, not a public calendar performance.
- Focus bridge: You chose tending us, so the ritual keeps the shared action small and embodied.
- Ritual form: A modest bowl, cup, bread, or sweetness can make hospitality visible without demanding belief.
- Material lineage: Source lineage: quiet household welcome forms.
- Kept bounded: One vessel, one welcome, then the vessel returns.
- Household fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action.
- Small accent: Numerology 4 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: quiet household welcome forms. Form kept contained.

### 5. Kitchen/Home + tending us

- Scenario fixture: `batch1.quiet_welcome`
- Resulting ritual: Honeyed Word

**Title / Theme**

Give one word a little sweetness.

**Ritual Body**

Use a tiny material cue or imagine one if food is not a fit. Do not turn this into advice or apology work. Place a tiny sweetness cue on a spoon or in an empty cup. Say or write one word that can soften the home. Return or wash the cue before adding more words. Close when the sweetness cue is returned or washed away.

**Intention**

Give one word a little sweetness.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What word can the sweetness cue hold and then release?

**Why This Fits**

You chose Kitchen, both of you, tending us, low capacity. Waxing moon supports this form without making the timing a command. A tiny sweetness cue lets one word soften and then return to ordinary use. For a together recommendation, saved profile and natal-chart themes for Person B balance practical home-tending magic with warmth, beauty, and affection.

**How This Was Chosen**

- Chosen for: Kitchen, both of you, tending us, low capacity
- Timing shaped it: Waxing moon supports this form without making the timing a command.
- Focus bridge: You chose tending us, so the ritual keeps the shared action small and embodied.
- Ritual form: Sweetness and welcome can soften speech when the phrase stays bounded and ordinary.
- Material lineage: Source lineage: quiet welcome and household sweetness forms.
- Kept bounded: One word, one sweetness cue, then the cup is returned.
- Household fit: For a together recommendation, saved profile and natal-chart themes for Person B balance practical home-tending magic with warmth, beauty, and affection.

**Source Summary**

Source lineage: quiet welcome and household sweetness forms. Form kept contained.

### 6. Home + threshold

- Scenario fixture: `home.threshold.arrival`
- Resulting ritual: Carried Key Word

**Title / Theme**

Let the key carry one word.

**Ritual Body**

Use an ordinary object that can safely return to use. Keep the word portable. Hold a key or small household object. Say or write one word for what should cross with you. Carry it briefly or return it to its place. Close when the key is carried or returned.

**Intention**

Let the key carry one word.

**Best Window**

When you have a little space this week.

**Optional Accent**

Return the key to its ordinary place when the word has crossed.

**Carry Prompt**

What word can cross the threshold with you?

**Why This Fits**

You chose Home, marking a threshold, steady capacity. Waxing moon supports this form without making the timing a command. The key gives the threshold something ordinary to carry and return. Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Home, marking a threshold, steady capacity
- Timing shaped it: Waxing moon supports this form without making the timing a command.
- Focus bridge: Marking a threshold stays inside the ritual action.
- Ritual form: A key can mark threshold and return without promising luck or protection.
- Material lineage: Source lineage: key, threshold, and household marker folklore.
- Kept bounded: The key carries the word briefly, then returns.
- Household fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**Source Summary**

Source lineage: key, threshold, and household marker folklore. Form kept contained.

### 7. Home + clearing

- Scenario fixture: `batch1.home.salt_water_clearing`
- Resulting ritual: Salt and Clear Water Release

**Title / Theme**

Let salt and clear water carry one release.

**Ritual Body**

Keep the release specific and small. Use the bowl to contain the clearing. Put clear water in a small bowl and add a pinch of salt. Name one spent thing that can leave this household field. Pour the water away and rinse the bowl. Close when the bowl is rinsed and empty.

**Intention**

Let salt and clear water carry one release.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

Let the empty bowl sit for one breath before putting it away.

**Carry Prompt**

What feels cleaner when it has somewhere ordinary to go?

**Why This Fits**

You chose Home, clearing something out, low capacity. Waning moon supports this form without making the timing a command. Salt and clear water give the release a vessel and a clean way out. Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Home, clearing something out, low capacity
- Timing shaped it: Waning moon supports this form without making the timing a command.
- Focus bridge: Clearing something out stays inside the ritual action.
- Ritual form: Salt and water give clearing a vessel and an outward direction without making danger the story.
- Material lineage: Source lineage: salt and boundary folklore.
- Kept bounded: One pinch, one bowl, one clean release.
- Household fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.
- Small accent: Numerology 7 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: salt and boundary folklore. Form kept contained.

### 8. Candle/light + rest/dark

- Scenario fixture: `issue183.candle.rest_dark`
- Resulting ritual: Bank the House Light

**Title / Theme**

Bank one house light.

**Ritual Body**

Treat the light as the house's last small center. Close the day without turning closure into another task. Choose a lamp, window light, or supervised candle. Lower or extinguish it while naming what can be done enough. Leave one warm thing in place: a cup, blanket, or quiet table. Close by leaving the light lowered and the house unasked for more.

**Intention**

Bank one house light.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What can stay warm here without being worked on tonight?

**Why This Fits**

You chose Candle or light, resting, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. Lowered light lets rest become visible without asking for more action. Saved profile and natal-chart themes for Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Candle or light, resting, low capacity
- Timing shaped it: The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down.
- Focus bridge: Resting stays inside the ritual action.
- Ritual form: Fire-banking customs give evening closure a form: lower the light, keep the warmth, and stop adding fuel.
- Material lineage: Source lineage: household fire-banking customs.
- Kept bounded: One lowered light, one ending, then no more work.
- Household fit: Saved profile and natal-chart themes for Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.
- Small accent: Numerology 6 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: household fire-banking customs. Form kept contained.

### 9. Candle/light + full + saying clearly

- Scenario fixture: `issue183.candle.full_saying_clearly`
- Resulting ritual: Full Light on the Table

**Title / Theme**

Put one line where the light can hold it.

**Ritual Body**

Use the light as witness. Let the ending be as deliberate as the saying. Set a lamp, window light, or supervised candle at the table. Put one spoken or written line where the light falls. Dim, turn away from, or extinguish the light to close. Close by changing the light.

**Intention**

Put one line where the light can hold it.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What line is ready to be witnessed once?

**Why This Fits**

You chose Candle or light, saying something clearly, low capacity. Full timing supports naming what is already visible once, then closing the light. Light gives the line a place to be witnessed and then ended. Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Candle or light, saying something clearly, low capacity
- Timing shaped it: Full timing supports naming what is already visible once, then closing the light.
- Focus bridge: Saying something clearly stays inside the ritual action.
- Ritual form: Full timing and a light practice can make the ritual simple: a line is placed, witnessed, and closed.
- Material lineage: Source lineage: hearth/table first-and-last logic.
- Kept bounded: One light, one line, then the light changes.
- Household fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.
- Small accent: Numerology 7 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: hearth/table first-and-last logic. Form kept contained.

### 10. Reflection + folded phrase

- Scenario fixture: `batch1.reflection.folded_phrase`
- Resulting ritual: Folded Phrase Vessel

**Title / Theme**

Give the words a fold.

**Ritual Body**

Write one sentence only. Let the fold contain the words. Write one clear phrase on a small piece of paper. Fold it once toward itself. Place it in a bowl, book, pocket, or near a plant pot. Close when the folded phrase is placed.

**Intention**

Give the words a fold.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What changes when the phrase has a place to be held?

**Why This Fits**

You chose Reflection, saying something clearly, low capacity. The timing gives the phrase a clear place without turning it into a report. The fold turns the phrase into a held object instead of a long explanation. Saved profile and natal-chart themes for Person A fit at least one profile around clear structure and bounded action without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Reflection, saying something clearly, low capacity
- Timing shaped it: The timing gives the phrase a clear place without turning it into a report.
- Focus bridge: Saying something clearly stays inside the ritual action.
- Ritual form: A written phrase becomes a ritual object when it is folded and placed, not expanded into journaling.
- Material lineage: Source lineage: folded-word and household container logic.
- Kept bounded: One phrase, one fold, one holding place.
- Household fit: Saved profile and natal-chart themes for Person A fit at least one profile around clear structure and bounded action without conflicting with household avoid flags.
- Small accent: Numerology 7 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: folded-word and household container logic. Form kept contained.

### 11. Seasonal marker bowl

- Scenario fixture: `batch1.seasonal.marker_bowl`
- Resulting ritual: Seasonal Marker Bowl

**Title / Theme**

Let one bowl mark the season.

**Ritual Body**

Use one ordinary material already in the home. Let the bowl hold the season without decorating the house. Choose one small seasonal marker; a leaf, key, grain, or bread piece is enough. Place it in a small bowl and name what this season is asking the home to hold, begin, or release. Leave the bowl where it can rest until the next return to the table. Close by leaving the bowl alone until its next ordinary return.

**Intention**

Let one bowl mark the season.

**Best Window**

When you have five quiet minutes.

**Optional Accent**

No add-on needed.

**Carry Prompt**

What season is this home actually in?

**Why This Fits**

You chose Seasonal, both of you, marking a threshold, low capacity. The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down. The bowl gives seasonal change a private household marker. For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action.

**How This Was Chosen**

- Chosen for: Seasonal, both of you, marking a threshold, low capacity
- Timing shaped it: The last day of the month makes this a closing rite: one marker can be emptied, returned, or set down.
- Focus bridge: Marking a threshold stays inside the ritual action.
- Ritual form: A seasonal bowl gives calendar change a private household form instead of a public festival script.
- Material lineage: Source lineage: seasonal bowl and household-threshold customs.
- Kept bounded: The bowl holds one marker until its ordinary return.
- Household fit: For a together recommendation, saved profile and natal-chart themes for Person A and Person B balance practical home-tending magic with clear structure and bounded action.
- Small accent: Numerology 6 stayed secondary to the ritual material and timing.

**Source Summary**

Source lineage: seasonal bowl and household-threshold customs. Form kept contained.

### 12. Surprise me resolved to a real category

- Scenario fixture: `batch1.surprise_me.resolves_visible_category`
- Resulting ritual: Carried Key Word

**Title / Theme**

Let the key carry one word.

**Ritual Body**

Use an ordinary object that can safely return to use. Keep the word portable. Hold a key or small household object. Say or write one word for what should cross with you. Carry it briefly or return it to its place. Close when the key is carried or returned.

**Intention**

Let the key carry one word.

**Best Window**

When you have a little space this week.

**Optional Accent**

Return the key to its ordinary place when the word has crossed.

**Carry Prompt**

What word can cross the threshold with you?

**Why This Fits**

You chose Reflection, saying something clearly, steady capacity. The timing gives the phrase a clear place without turning it into a report. The key gives the threshold something ordinary to carry and return. Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**How This Was Chosen**

- Chosen for: Reflection, saying something clearly, steady capacity
- Timing shaped it: The timing gives the phrase a clear place without turning it into a report.
- Focus bridge: Saying something clearly stays inside the ritual action.
- Ritual form: A key can mark threshold and return without promising luck or protection.
- Material lineage: Source lineage: key, threshold, and household marker folklore.
- Kept bounded: The key carries the word briefly, then returns.
- Household fit: Saved profile and natal-chart themes for Person A and Person B fit at least one profile around practical home-tending magic without conflicting with household avoid flags.

**Source Summary**

Source lineage: key, threshold, and household marker folklore. Form kept contained.
