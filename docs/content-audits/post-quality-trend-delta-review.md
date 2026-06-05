# Post-238 Quality Trend / Delta Review

## 1. New Report / Delta Behavior

Issue #238 adds a machine-readable recommendation-quality summary and a
human-readable delta report.

New behavior:

- `createRecommendationQualitySummary(report)` reduces the full recommendation
  quality report into stable scenario counts, warning counts, verdict counts,
  selection distribution, concentration warnings, and per-scenario trend rows.
- `createRecommendationQualityDelta({ baseline, current })` compares two
  summary JSON files and reports changed selected patterns, changed warnings,
  changed contract verdicts, changed authored-output verdicts, improved
  scenarios, worsened scenarios, new warnings, and resolved warnings.
- `formatRecommendationQualityDelta(delta)` prints the required PR `Quality
  delta` section.
- `npm run recommendation:quality:delta` prints the current summary.
- `npm run recommendation:quality:delta -- --write-current <path>` writes a
  summary JSON file for a branch.
- `npm run recommendation:quality:delta -- --baseline <main.json> --current
  <pr.json>` prints the baseline/current delta.

This is reporting-only work. It does not change recommendation scoring,
warning rules, ritual content, sources, visible categories, or private-data
behavior.

## 2. Sample Baseline / Current Summary

Generated current summary command:

```bash
npm run recommendation:quality:delta -- --write-current /tmp/moon-table-quality-current.json
```

Sample output:

```text
Total scenarios: 107
Contract scenarios: 26
Authored-output scenarios: 26
High-capacity scenarios: 18
Both-of-us scenarios: 29
Open-preference / resolved-category scenarios: 11
Distinct selected patterns: 31
```

Same-baseline delta command:

```bash
npm run recommendation:quality:delta -- --baseline /tmp/moon-table-quality-current.json --current /tmp/moon-table-quality-current.json
```

Same-baseline delta correctly reports no movement:

```text
Total scenarios: 107 → 107
Contract request changes: 4 → 4
Authored request changes: 9 → 9
Review required: 17 → 17
High-capacity depth warnings: 7 → 7
Audience-only warnings: 12 → 12
Coverage-gap hidden warnings: 8 → 8
Option-menu warnings: 3 → 3
Distinct selected patterns: 31 → 31
Improved scenarios: none
Worsened scenarios: none
Changed selected patterns: none
New warnings: none
Resolved warnings: none
```

## 3. Warning-Count Table

| Warning ID | Current count |
| --- | ---: |
| `contract_request_changes` | 4 |
| `fragmentary_option_menu_body` | 3 |
| `audience_only_pronoun_change` | 12 |
| `high_capacity_no_deeper_ritual_shape` | 7 |
| `closest_match_overclaims_fit` | 1 |
| `coverage_gap_not_disclosed_in_expanded_explanation` | 8 |
| `coverage_gap_category_focus_capacity` | 7 |
| `closest_compatible_pattern_selected` | 7 |
| `recommendation_confidence_limited` | 7 |
| `timing_overrode_explicit_contract` | 0 |
| `resolved_surprise_category_not_preserved` | 0 |

The full summary JSON includes counts for every
`RECOMMENDATION_QUALITY_WARNING_IDS` warning, not only the required subset.

## 4. Verdict-Count Table

| Verdict set | Pass | Review required | Request changes |
| --- | ---: | ---: | ---: |
| Contract | 22 | 0 | 4 |
| Authored output | 0 | 17 | 9 |

The important product distinction remains visible: contract correctness and
authored-output readiness are separate. A scenario can be contract-correct and
still require product review.

## 5. Changed Scenario Examples

The same-baseline delta has no changed scenarios. Unit coverage uses a
synthetic baseline/current mutation to prove the delta reporter can detect:

- changed selected patterns
- changed warning sets
- changed contract verdicts
- changed authored-output verdicts
- improved scenarios
- worsened scenarios
- new warnings
- resolved warnings

Example changed-pattern line produced by the formatter:

```text
- <scenario-id>: synthetic_previous_pattern → <current-selected-pattern>
```

Future PRs with real behavior changes should include the real scenario IDs in
the PR notes and review packet.

## 6. Instructions For Future PRs

Before a recommendation-affecting PR:

```bash
git checkout main
npm run recommendation:quality:delta -- --write-current tmp/main-quality-summary.json
```

On the PR branch:

```bash
npm run recommendation:quality:delta -- --write-current tmp/pr-quality-summary.json
npm run recommendation:quality:delta -- --baseline tmp/main-quality-summary.json --current tmp/pr-quality-summary.json
```

Paste the generated Markdown under:

```markdown
## Quality delta

Baseline: <main SHA/report path>
Current: <PR SHA/report path>
...
```

The PR author must also state diagnostic integrity: no warning count should be
claimed as improved unless output improved. Lower counts caused by weakened
warnings, removed scenarios, hidden diagnostics, or narrower checks are not
quality improvement.

## 7. Validation Results

Validation run during implementation:

- `npm run lint:content` passed.
- `npm run typecheck` passed.
- `npm run test` passed: 27 files / 316 tests.
- `npm run test -- tests/unit/recommendation-quality-report.test.ts` passed:
  15 tests.
- `npm run recommendation:quality` passed and preserved existing warning
  counts.
- `npm run diagnose:content` passed.
- `npm run check` passed, including build and Playwright e2e.
- `npm run recommendation:quality:delta -- --write-current
  /tmp/moon-table-quality-current.json` passed and produced the sample summary.
- `npm run recommendation:quality:delta -- --baseline
  /tmp/moon-table-quality-current.json --current
  /tmp/moon-table-quality-current.json` passed and produced the same-baseline
  delta above.

## 8. Limitations

- The delta compares generated summary JSON files. It does not automatically
  know which summary came from `main`; PR authors must generate and preserve the
  baseline summary.
- Improved/worsened scenarios use verdict severity and warning-count movement.
  Human review is still required to decide whether a warning disappeared because
  output improved or because diagnostics were weakened.
- The same-baseline sample has no changed scenario IDs. Real changed examples
  will appear only when a PR changes selection/output/diagnostics.
- The reporter intentionally keeps existing request-change and review-required
  findings visible. It does not bless the current counts as acceptable product
  outcomes.

## 9. Merge Recommendation

Hold for human review.

This is good candidate infrastructure for the required PR quality-delta
baseline if Tim and ChatGPT confirm the summary/delta format is useful and that
the diagnostic-integrity language is strong enough.
