> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Post-201 Bread / Grain Material Review

## PR summary

- PR: #211, Strengthen bread and grain material lineage
- Branch: `codex/issue-201-bread-grain-materials`
- Base branch: `main`
- Issue: #201, Strengthen bread and grain as Kitchen, Home, and Seasonal ritual materials
- Implementation summary: Strengthens bread/grain presentations using existing approved Batch 1 source notes, keeps #191 packet direction in review documentation only, updates compressed source-summary language, and adds recommendation-quality scenarios for Kitchen, Home, and Seasonal bread/grain routes.

Files changed:

- Source support and ritual copy: `src/data/batch-1-ritual-library.ts`
- Source summary / boundary language: `src/lib/generate-weekly-brief.ts`
- Recommendation-quality fixtures: `tests/fixtures/recommendation-quality-scenarios.ts`
- Recommendation-quality assertions: `tests/unit/recommendation-quality-report.test.ts`
- Review packet: `docs/content-audits/post-201-bread-grain-material-review.md`

Scope confirmations:

- New sources added: No. Active source support uses existing approved Batch 1 notes only.
- New visible categories added: No.
- Recipe content added: No.
- Health, prosperity, protection, luck, or abundance claims added: No.
- Broad scoring/reachability changes: No.
- Source Packet 2 / #191 broad content implemented: No. The #191 packet remains review context only for this cleanup patch.
- Debug/report output hidden: No.
- Private data added: No.
- Source wording copied: No copied source prose; active notes and output are transformed summaries.

## Source support

Source-hygiene cleanup:

- Removed active SourceNote `note.bread_grain_table_center`.
- Reason: its location basis cited the #191 packet/review direction rather than exact source-location support, which is too loose for active source-backed content.
- Result: #191 packet references now remain in review documentation only, not active SourceNotes, card source references, or pattern source references.

Exact active source support after cleanup:

- `note.grain_work_rhythm_table`: supports grain as household rhythm, ordinary food, table warmth, and shared nourishment without recipe work.
- `note.seed_water_beginning`: supports seed/grain beginning logic through prepare, place, and wait.
- `note.hearth_first_and_last`: supports table/hearth center and first/last household attention.
- `note.quiet_offering_as_welcome`: supports modest bowl, cup, bread, or sweetness as symbolic welcome.
- `note.calendar_customs_as_household_thresholds`: supports private seasonal threshold markers without public festival reenactment.
- `note.autumn_threshold_as_private_household_moment`: supports private seasonal threshold work without spooky novelty or games.

Updated active cards:

- `grain`: strengthened table rhythm, enoughness, and seasonal continuity.
- `bread_grain`: new approved Batch 1 card for bread/grain table center, welcome, enoughness, beginning, and seasonal continuity.
- `quiet_welcome`: remains grounded in quiet welcome, grain rhythm, and hearth/table notes.
- `seasonal_bowl`: remains grounded in calendar/seasonal threshold notes plus grain rhythm.

Updated active patterns:

- `grain_bowl_beginning`: stronger bread/grain table-center lineage, single dry-grain material phrasing, and compressed source summary.
- `bread_at_the_center`: stronger authored body, together-action variant, clear activation/closure, and source lineage.
- `quiet_welcome`: trace support only; no new visible ritual body.
- `seasonal_marker_bowl`: stronger bread/grain seasonal-continuity lineage.

## Before / after recommendation examples

### Kitchen + both + beginning + waning

Before, representative pattern copy:

> Grain and seed give a beginning weight, rhythm, and table presence without turning it into work.

After:

- Pattern: `grain_bowl_beginning`
- Title/theme: Set a grain bowl for the beginning.
- Ritual body: Let this be a beginning held first, not launched. Choose one dry kitchen grain; rice, oats, or a single bean is enough. Put one dry kitchen grain in a small bowl and set the bowl at the table. One of you names the beginning; the other places the grain. Both touch the bowl briefly, then stop. Close by leaving the bowl where it can rest until tomorrow, or until the next time you both return to the table.
- Carry prompt: What beginning can be held between you before it becomes work?
- Why this fits: Waning timing turns the beginning toward preparation rather than launch. Grain gives the beginning table-weight; the bowl gives it a place to wait.
- Source summary: bread/grain table-center and seed-water beginning logic.

### Kitchen + bread + table center

Before, representative pattern copy:

> Use bread only if it already belongs here. Let the table center hold enoughness.

After:

- Pattern: `bread_at_the_center`
- Title/theme: Put bread at the center.
- Ritual body: Use bread only if it already belongs here; one ordinary substitute that already works in this household is enough. Let the table hold one small sign of enough. Place a small piece of bread, or one ordinary household substitute, on a plate at the table center. Name what is enough for this household right now in one sentence. Return it to ordinary kitchen use. Close when the plate is clear: the bread is eaten, put away, or returned to ordinary use.
- Carry prompt: What can sit at the center without needing to become more?
- Why this fits: Bread or grain gives enoughness a table center, not a promise to prove.
- Source summary: bread/grain table-center and welcome logic.

### Home + both + bread/grain table center

Before, representative pattern copy:

> Place bread or an ordinary substitute at the table center. Name what is enough for this household right now. Return it to ordinary kitchen use.

After:

- Pattern: `bread_at_the_center`
- Title/theme: Put bread at the center.
- Ritual body: Use bread only if it already belongs here; one ordinary substitute that already works in this household is enough. Let the table hold one small sign of enough. Place a small piece of bread, or one ordinary household substitute, on a plate at the table center. One of you names what is enough; the other turns the plate slightly toward the center. Both leave the plate alone until it returns to ordinary use. Close when the plate is clear: the bread is eaten, put away, or returned to ordinary use.
- Carry prompt: What can sit at the center between you without needing to become more?
- Why this fits: Bread or grain gives enoughness a table center, not a promise to prove.
- Source summary: bread/grain table-center and welcome logic.

## Substitute wording cleanup

Before:

- "one safe ordinary substitute is enough"
- "one safe bread substitute"

After:

- "one ordinary substitute that already works in this household is enough"
- "one ordinary household substitute"

Safety and allergy constraints remain in pattern metadata and safety notes rather than the normal ritual body.

### Seasonal + grain continuity

Before, representative composer copy:

> The bowl gives seasonal change a private household marker.

After:

- Pattern: `seasonal_marker_bowl`
- Title/theme: Let one bowl mark the season.
- Ritual body: Use one ordinary material already in the home. Let the bowl hold the season without decorating the house. Choose one small seasonal marker; a leaf, key, grain, or bread piece is enough. Place it in a small bowl and name what this season is asking the home to hold, begin, or release. Leave the bowl where it can rest until the next return to the table. Close by leaving the bowl alone until its next ordinary return.
- Carry prompt: What season is this home actually in?
- Why this fits: The bowl gives seasonal change one household marker, and grain or bread can hold continuity without display.
- Source summary: seasonal bowl, household-threshold, and bread/grain table logic.

## Recommendation-quality changes

Added scenarios:

- `issue201.kitchen.bread_center_enoughness` -> `bread_at_the_center`
- `issue201.home.bread_grain_table_center` -> `bread_at_the_center`
- `issue201.seasonal.grain_continuity` -> `seasonal_marker_bowl`

Updated assertion coverage:

- The #207 normal-copy guard test now includes the three #201 scenarios in expected pattern checks.
- The added scenarios are included in the blocked normal-copy phrase sweep through the shared required-scenario list.

## Warning counts

From `npm run recommendation:quality`:

- Scenarios sampled: 45
- Batch 1 SourceNotes: 19
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

## Selected pattern concentration

From `npm run recommendation:quality`:

- Distinct selected patterns: 22
- Broad pattern concentration: none
- Pattern concentration review: `first_light_at_the_threshold` 4, `honeyed_word` 4
- Bread/grain-related selected patterns: `bread_at_the_center` 3, `grain_bowl_beginning` 1, `seasonal_marker_bowl` 3

## Awkward outputs / review notes

- `seasonal_marker_bowl` still offers a controlled material set: "leaf, key, grain, or bread piece." This is acceptable for that pattern because seasonal markers vary by household, but it remains a place for human review if #201 wants more decisive material selection later.
- `quiet_welcome` remains cup/bowl-led in normal body copy unless the selected scenario specifically calls bread/grain to the center. This avoids making bread/grain a fallback welcome material for unrelated tending-us scenarios.
- `bread_at_the_center` now avoids "safe substitute" phrasing in normal ritual body. Food-fit constraints remain in metadata.

## Validation results

- `npm run test -- tests/unit/recommendation-quality-report.test.ts`: PASS
- `npm run recommendation:quality`: PASS
- `npm run lint:content`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS, 26 files / 297 tests
- `npm run diagnose:content`: PASS, 91 scenarios sampled / 64 selected source notes
- `npm run check`: PASS, including build and 2 Playwright tests

Build note:

- `npm run check` emitted the existing Vite chunk-size warning for the main JS bundle. No validation command failed.

## Merge recommendation

Review recommendation: ready for Tim/ChatGPT review. The patch is narrow, source-backed, and keeps bread/grain inside Kitchen/Home/Seasonal table, beginning, welcome, and continuity meanings. Do not merge until the PR review is complete.
