# Post-287 Source-Backed Ritual Import Review

Issue: #287

This packet documents the mechanical import of QA-accepted extraction packet candidates into runtime `Ritual` records.

## Scope confirmation

- Runtime selection/scoring changed: no
- Recommendation output changed: no
- UI structure changed: no
- Search direct-use gating changed: yes; Search now requires `directUseEligible` by default
- Manage Rituals inspection surface changed: yes; it now reads source-backed draft records
- Runtime Ritual collection changed: yes
- Legacy pilot Rituals remain in app surface: no
- Imported records are draft: yes
- Imported records are findable: yes
- Imported records are direct-use eligible: no
- Imported records are recommendation eligible: no
- Imported records are recommendable: no
- Packet prose rewritten during import: no
- New sources added: no
- New visible categories added: no

## Packets included

| Packet | Approved candidates found | Imported as draft/findable | Skipped |
| --- | ---: | ---: | ---: |
| Buckland candlelight complete extraction | 13 | 13 | 0 |
| House Witch complete extraction | 15 | 15 | 0 |
| Magical Household domestic threshold altar | 15 | 15 | 0 |
| Green Witch's Garden plant household practice | 16 | 16 | 0 |
| Whitehurst flower table magic | 36 | 36 | 0 |
| Saint Thomas sex witch | 47 | 47 | 0 |
| Woodward kitchen vessel magic | 14 | 14 | 0 |

## Packets deferred

- Moon Book lunar timing/source-note work (#349)
- Any remaining timing/source-note extraction work (#354)
- Dominguez practical astrology timing/source-note work (#355)

## Count reconciliation

- Packets included: 7
- Packets deferred: 3
- Total approved_for_mechanical_import candidates found: 156
- Imported as draft/findable: 156
- Skipped due to malformed packet record: 0
- Skipped due to unsupported runtime enum: 0
- Skipped due to unsupported metadata shape: 0
- Skipped due to stale ritualWords/private excerpt metadata: 0
- Skipped due to non-approved import readiness: 0
- Records with ritualWords: 8
- Records with reviewFlags: 156
- Runtime files changed: `src/data/rituals/source-backed-rituals.ts`, app/search/manage/readiness imports, tests

## Imported posture

Every imported record is mechanically forced to:

```ts
status: "draft"
availability: {
  findable: true,
  directUseEligible: false,
  recommendationEligible: false,
}
recommendationMetadata.eligibility: {
  recommendable: false,
  missing: ["direct_use_review", "recommendation_review"],
}
```

This follows Tim's #287 direction to make the seven QA'd packets visible for inspection while keeping them unusable and non-recommendable.

## Skipped candidates

None.

## Primary purpose distribution

| Purpose | Count |
| --- | ---: |
| opening | 22 |
| steadying | 11 |
| releasing | 22 |
| tending | 19 |
| marking | 12 |
| protecting | 6 |
| remembering | 13 |
| blessing | 30 |
| voicing | 11 |
| connecting | 10 |

## Primary carrier distribution

| Carrier | Count |
| --- | ---: |
| candlelight | 29 |
| table | 19 |
| vessel | 29 |
| doorway | 8 |
| body | 17 |
| words | 15 |
| plant | 39 |

## Import fidelity notes

- Headline, ritual body/practice, intention, best window, and question-to-carry are copied from packet fields.
- `whyThisFits` is mechanically assembled from packet `sourceBackedRationale` and `materialPlaceCarrierPurposeFit` ingredients because the runtime type requires a string field and the packet provides approved ingredients rather than a separate rendered paragraph.
- `howThisWasChosenIngredients` is not imported because the current runtime `Ritual` schema has no field for it.
- Packet availability values are intentionally overridden to draft/findable/not usable/not recommendable per #287 and Tim's latest direction.
- Legacy pilot Rituals are no longer used by Search, Manage Rituals, or readiness reporting.
- Draft/findable does not make a Ritual selectable for direct practice. Manage Rituals shows all 156 draft records for inspection; the warm Search rituals flow filters to direct-use eligible records, so these imports do not appear there yet.

## Validation results

- `npm run lint:content` - passed. Long imported ritual bodies/source summaries remain visible as `long-quoted-text` warnings for review; no content-lint errors.
- `npm run typecheck` - passed.
- `npm run test` - passed, 31 files / 361 tests.
- `npm run diagnose:content` - passed.
- `npm run check` - passed, including lint:content, typecheck, build, unit tests, and 4 Playwright e2e tests.

## Merge recommendation

Merge. The seven approved packet families are imported as draft/findable inspection records, legacy pilot rituals are removed from app surfaces, Search remains direct-use gated, and validation is green.
