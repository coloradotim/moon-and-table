# Post-387 Remaining Packet Import Review

Issue: #387

Follow-up to #287.

This packet documents the mechanical import of QA-accepted extraction packet candidates into runtime `Ritual` records.

## Scope confirmation

- Runtime selection/scoring changed: no
- Recommendation output changed: no
- UI structure changed: no
- Search direct-use gating changed: no; Search still requires `directUseEligible` by default
- Manage Rituals inspection surface changed: no; it continues to read source-backed draft records
- Runtime Ritual collection changed: yes
- Legacy pilot Rituals remain in app surface: no
- Imported records are draft: yes
- Imported records are findable: yes
- Imported records are direct-use eligible: no
- Imported records are recommendation eligible: no
- Imported records are recommendable: no
- Packet prose rewritten during import: no
- New source documents added: no
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
| Moon Book lunar cycle | 21 | 21 | 0 |
| Anand connection | 28 | 28 | 0 |
| Dominguez practical astrology | 13 | 13 | 0 |

## Count reconciliation

- Packets included: 10
- Packets deferred: 0
- Total approved_for_mechanical_import candidates found: 218
- Imported as draft/findable: 218
- Skipped due to malformed packet record: 0
- Skipped due to unsupported runtime enum: 0
- Skipped due to unsupported metadata shape: 0
- Skipped due to stale ritualWords/private excerpt metadata: 0
- Skipped due to non-approved import readiness: 0
- Records with ritualWords: 8
- Records with reviewFlags: 218
- Runtime files changed: `src/data/rituals/source-backed-rituals.ts`, tests

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

This follows #387 direction to import the remaining QA-approved packet families as draft inspection records while keeping them unusable and non-recommendable.

## Skipped candidates

None.

## Primary purpose distribution

| Purpose | Count |
| --- | ---: |
| opening | 30 |
| steadying | 18 |
| releasing | 26 |
| tending | 22 |
| marking | 24 |
| protecting | 6 |
| remembering | 23 |
| blessing | 33 |
| voicing | 17 |
| connecting | 19 |

## Primary carrier distribution

| Carrier | Count |
| --- | ---: |
| candlelight | 32 |
| table | 33 |
| vessel | 34 |
| doorway | 8 |
| body | 25 |
| words | 46 |
| plant | 40 |

## Import fidelity notes

- Headline, ritual body/practice, intention, best window, and question-to-carry are copied from packet fields.
- `whyThisFits` is mechanically assembled from packet `sourceBackedRationale` and `materialPlaceCarrierPurposeFit` ingredients because the runtime type requires a string field and the packet provides approved ingredients rather than a separate rendered paragraph.
- `howThisWasChosenIngredients` is not imported because the current runtime `Ritual` schema has no field for it.
- Packet availability values are intentionally overridden to draft/findable/not usable/not recommendable per #287/#387 direction.
- Legacy pilot Rituals are no longer used by Search, Manage Rituals, or readiness reporting.
- Draft/findable does not make a Ritual selectable for direct practice. Manage Rituals shows all 218 draft records for inspection; the warm Search rituals flow filters to direct-use eligible records, so these imports do not appear there yet.

## Representative imported draft records

These examples are imported as draft/findable inspection records only. They are not direct-use eligible or recommendation eligible.

### `candidate.moon_book.new_moon_table_seed`

- Headline: Set the seed on the dark table.
- Practice: Clear a small space on the table. Place a dark or empty bowl in the center and write one beginning on a slip of paper. Fold the paper toward you once and place it in the bowl. Let the bowl stay plain. Do not add a second wish. Close by touching the rim of the bowl and leaving the beginning quiet.
- Intention: Give a new beginning a protected place before it has to grow.
- Best window: At the new Moon, or during the first quiet night of a new cycle.
- Question: What wants a beginning but not yet an audience?
- Source label: Gottesdiener, The Moon Book

### `candidate.anand.speak_before_circle`

- Headline: Speak Before the Circle
- Practice: Before lighting the candle or entering the circle, each partner names one thing that might complicate connection tonight. The other partner answers only by saying that they heard it. Place both named things outside the circle, literally or with a gesture, then enter.
- Intention: Let the room know what needs tenderness before the work begins.
- Best window: Before shared ritual when either partner arrives distracted, tender, or guarded.
- Question: What needs to be heard before we enter?
- Source label: Margot Anand, The Art of Sexual Magic

### `candidate.dominguez.glyph-as-mark`

- Headline: Trace one planetary mark cleanly.
- Practice: Choose one planet whose quality belongs to the work. Draw its glyph slowly on paper, on an index card, or in the air over the table. Say the planet name once as identification, not invocation. Set the mark beside the ritual object and let it define the tone of the rite.
- Intention: Use a single astrological glyph as a focused ritual mark.
- Best window: When a ritual needs one clear planetary emphasis.
- Question: What power is this mark holding, and where should it stop?
- Source label: Dominguez, Practical Astrology for Witches and Pagans

## Validation results

- `npm run lint:content` - passed with `long-quoted-text` warnings on imported draft ritual bodies; no lint errors.
- `npm run typecheck` - passed.
- `npm run test` - passed, 31 files / 362 tests.
- `npm run rituals:readiness` - passed: 218 Rituals; 218 draft; 218 findable; 0 direct-use eligible; 0 recommendation eligible; 0 recommendable; validation valid true; 0 findings.
- `npm run diagnose:content` - passed.
- `npm run check` - passed, including content lint, typecheck, build, unit tests, and 4 Playwright e2e tests.

## Merge recommendation

Ready for human review of imported count, app visibility, and import fidelity. These records are still draft-only; a later #288-style review must decide direct-use or recommendation eligibility.
