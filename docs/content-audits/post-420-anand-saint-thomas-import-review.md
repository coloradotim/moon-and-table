# Post-420 Anand/Saint Thomas Import Review

Issue: #420

Follow-up to #413, #414, and #287.

This packet documents the mechanical import of the superseding Anand/Saint Thomas adult re-extraction packet into runtime `Ritual` records.

## Scope confirmation

- Runtime selection/scoring changed: no
- Recommendation output changed: no
- UI structure changed: no
- Search direct-use gating changed: no
- Manage Rituals inspection surface changed: no
- Runtime Ritual collection changed: yes
- Legacy pilot Rituals remain in app surface: no
- Mechanically imported records begin as draft/findable before review overlays: yes
- Direct-use review overlays can promote imported records: yes
- Recommendation review overlays can promote records whose metadata supports recommendation: yes
- Packet prose rewritten during import: no
- New source documents added: no
- New visible categories added: no

## Anand/Saint Thomas doctrine applied

- The canonical extraction ledger is `docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md`.
- The two older Anand and Saint Thomas packets are superseded as doctrine, but their existing approved candidate blocks are reused as import scaffolding where the canonical ledger approved the same source-backed lanes.
- Explicit adult content is not a hold reason.
- Search visibility, direct-use eligibility, and recommendation eligibility remain separate decisions.
- If a Ritual has complete metadata that supports recommendation and is direct-use reviewed, it is eligible for `Choose with me`.

## Packets included

| Packet | Approved candidate blocks found | Imported as source-backed records | Skipped | Notes |
| --- | ---: | ---: | ---: | --- |
| Buckland candlelight complete extraction | 13 | 13 | 0 |  |
| House Witch complete extraction | 15 | 15 | 0 |  |
| Magical Household domestic threshold altar | 15 | 15 | 0 |  |
| Green Witch's Garden plant household practice | 16 | 16 | 0 |  |
| Whitehurst flower table magic | 36 | 36 | 0 |  |
| Saint Thomas sex witch | 47 | 47 | 0 | Superseded by `docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md`; reused as import-block scaffolding. |
| Woodward kitchen vessel magic | 14 | 14 | 0 |  |
| Moon Book lunar cycle | 21 | 21 | 0 |  |
| Anand connection | 28 | 28 | 0 | Superseded by `docs/research/ritual-candidates/packet-anand-saint-thomas-ritual-only-reextract.md`; reused as import-block scaffolding. |
| Anand and Saint Thomas ritual-only adult re-extraction | 7 | 7 | 0 | Canonical Anand/Saint Thomas ledger plus seven complete inline records. |
| Dominguez practical astrology | 13 | 13 | 0 |  |
| Herstik Sacred Sex complete extraction | 69 | 69 | 0 |  |
| Miller Sex, Sorcery, and Spirit complete extraction | 22 | 22 | 0 |  |
| Carrellas Urban Tantra complete extraction | 55 | 55 | 0 |  |
| Pamita Book of Candle Magic complete extraction | 42 | 42 | 0 |  |
| Gamache Master Book of Candle Burning complete extraction | 24 | 24 | 0 |  |
| Dykes/Gibson Astrological Magic complete extraction | 26 | 26 | 0 |  |
| Whitehurst Magical Housekeeping complete extraction | 27 | 27 | 0 |  |
| Blonde Hearth and Home Witchcraft complete extraction | 26 | 26 | 0 |  |
| Diaz Plant Witchery complete extraction | 12 | 12 | 0 |  |

## Count reconciliation

- Packets included: 20
- Packets deferred: 0
- Total approved_for_mechanical_import candidates found: 528
- Imported as draft/findable: 528
- Anand/Saint Thomas approved ledger rows: 71
- Anand/Saint Thomas structural non-import rows: 14
- Anand/Saint Thomas runtime records after this import: 82
- Existing Anand/Saint Thomas records overwritten/reused from superseded packet blocks: 75
- Newly added Anand/Saint Thomas inline records from the canonical packet: 7
- Expected reused old Anand/Saint Thomas records: 75
- Expected new inline Anand/Saint Thomas records: 7
- Removed/superseded runtime records: 0
- Reconciliation note: approved source-visible ledger rows are not one-to-one with runtime records. Some canonical ledger rows are broad source lanes, while the reused older packet blocks split those lanes into finer-grained Ritual records.
- Skipped due to malformed packet record: 0
- Skipped due to unsupported runtime enum: 0
- Skipped due to unsupported metadata shape: 0
- Skipped due to stale ritualWords/private excerpt metadata: 0
- Skipped due to non-approved import readiness: 0
- Records with ritualWords: 8
- Records with reviewFlags: 225
- Runtime files changed: `src/data/rituals/source-backed-rituals.ts`, tests

## Baseline imported posture

Every imported record is mechanically created as:

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

The exported runtime collection then applies `direct-use-review.ts` and `recommendation-eligibility-review.ts`. For #420, the Anand/Saint Thomas records that have direct-use review and recommendation metadata are promoted to direct-use and recommendation eligibility. Records without that review remain findable drafts rather than being hidden.

## Skipped candidates

None.

## Primary purpose distribution

| Purpose | Count |
| --- | ---: |
| opening | 44 |
| steadying | 73 |
| releasing | 62 |
| tending | 32 |
| marking | 51 |
| protecting | 39 |
| remembering | 26 |
| blessing | 59 |
| voicing | 71 |
| connecting | 71 |

## Primary carrier distribution

| Carrier | Count |
| --- | ---: |
| candlelight | 165 |
| table | 35 |
| vessel | 49 |
| doorway | 17 |
| body | 95 |
| words | 118 |
| plant | 49 |

## Import fidelity notes

- Headline, ritual body/practice, intention, best window, and question-to-carry are copied from packet fields.
- `whyThisFits` is mechanically assembled from packet `sourceBackedRationale` and `materialPlaceCarrierPurposeFit` ingredients because the runtime type requires a string field and the packet provides approved ingredients rather than a separate rendered paragraph.
- `howThisWasChosenIngredients` is not imported because the current runtime `Ritual` schema has no field for it.
- Packet availability values are intentionally normalized on raw import, then the review overlays set direct-use and recommendation readiness.
- Legacy pilot Rituals are no longer used by Search, Manage Rituals, or readiness reporting.
- Findability does not require recommendation eligibility. Direct-use and recommendation remain review decisions after import.

## Validation results

Run before merge:

```bash
npm run lint:content
npm run typecheck
npm run test
npm run diagnose:content
```

## Merge recommendation

Ready for human review of imported count, app visibility, and import fidelity before merge.
