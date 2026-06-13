# DB Ritual Query And Index Checklist

Status: Design checklist for issue #449.

Scope: Architecture/design checklist only. This document does not implement
Firestore indexes, security rules, runtime DB reads, writes, source import,
Manage Rituals actions, selector tuning, UI changes, or Ritual content changes.

This checklist preserves `docs/product/app-flow-decisions.md`: Choose with me
uses recommendation-eligible Rituals, while I have something in mind uses
search/direct-use/library access and must not require recommendation
eligibility.

## 1. Query Principles

Firestore should not be treated as a full-text search engine, join engine, or
source review authority.

Use `rituals/{ritualId}` as the mutable pointer/index document for list,
search, direct-use, recommendation-candidate, and review-state queries. It may
denormalize lifecycle, availability, search, recommendation, source, validation,
and review summary fields.

Use `ritualVersions/{ritualId_versionId}` as the immutable content snapshot.
Read it by exact `versionId`, `publishedVersionId`, or a server/admin-selected
set of IDs. Do not use full version documents as the primary list/search query
surface.

Use explicit admin/server tooling for imports, promotion, rollback, validation,
audit views, and static export. Client code may read only published/findable
content surfaces allowed by security rules, and may write only household state
when authenticated and authorized.

## 2. Pointer Fields Needed On `rituals/{ritualId}`

The current `RitualDocument` type already includes these pointer/index fields:

```text
id
currentVersionId
publishedVersionId
latestValidationSnapshotId
latestReviewDecisionId
lifecycle.state
lifecycle.imported
lifecycle.findable
lifecycle.directUseEligible
lifecycle.recommendationEligible
lifecycle.recommendable
lifecycle.missingReadiness
lifecycle.holdReasons
origin.type
origin.sourceIds
origin.sourceRunIds
origin.importBatchIds
origin.packetCandidateIds
searchIndex.headline
searchIndex.sourceLabel
searchIndex.originLabel
searchIndex.primaryPurpose
searchIndex.primaryCarrier
searchIndex.tags
searchIndex.keywords
searchIndex.materials
searchIndex.places
versionHistory.versionIds
versionHistory.archivedVersionIds
versionHistory.supersededVersionIds
createdAtIso
updatedAtIso
archivedAtIso
```

Before DB-backed reads/writes are implemented, add or confirm denormalized
pointer fields for real queries:

```text
sort.headlineKey
sort.sourceLabelKey
searchIndex.purposeKeys
searchIndex.carrierKeys
searchIndex.searchTokens
recommendationIndex.purposeKeys
recommendationIndex.carrierKeys
recommendationIndex.audienceKeys
recommendationIndex.capacityKeys
recommendationIndex.timingKeys
recommendationIndex.eligibilityCells
recommendationIndex.productBoundaryKeys
validation.valid
validation.errorCount
validation.warningCount
validation.generatedAtIso
review.pendingDecisionTypes
review.openFlagKeys
review.lastDecisionType
review.lastDecisionAtIso
```

`recommendationIndex.eligibilityCells` is the escape hatch for Firestore's
multi-array-query limit. If Choose with me needs to filter by several dimensions
at once, generate stable cell keys such as:

```text
purpose:steadying|carrier:words|audience:me|capacity:low
```

Do not create cells that change Ritual identity. They are query aids only.

## 3. Immutable Version Fields

Keep these fields only in `ritualVersions/{ritualId_versionId}` unless a later
query explicitly requires a denormalized summary on `rituals/{ritualId}`:

```text
ritual.presentation.practice
ritual.presentation.intention
ritual.presentation.bestWindow
ritual.presentation.whyThisFits
ritual.presentation.questionToCarry
ritual.ritualWords
ritual.adaptationPolicy
ritual.recommendationMetadata full snapshot
ritual.searchMetadata full snapshot
ritual.origin.sourceGrounding
provenance.sourceGrounding
provenance.sourceLocationLabels
provenance.moonAndTableAdaptationNotes
reviewStateAtCreation
contentHash
supersedesVersionId
archivedAtIso
```

Pointer fields may repeat small summaries, labels, flags, and query keys. They
must not become the canonical prose store.

## 4. Manage Rituals Queries

Manage Rituals needs a table-oriented pointer query, not full version scans.

Required query shapes:

| View | Collection | Filters | Sort | Notes |
| --- | --- | --- | --- | --- |
| All current Rituals | `rituals` | optional `lifecycle.state`, `origin.type` | `sort.headlineKey` or `updatedAtIso desc` | Default admin/read-only table. |
| Needs review | `rituals` | `review.pendingDecisionTypes array-contains <type>` or `review.openFlagKeys array-contains <flag>` | `updatedAtIso desc` | For direct-use/recommendation/source review queues. |
| Validation failures | `rituals` | `validation.valid == false` or `validation.errorCount > 0` | `validation.generatedAtIso desc` | Use denormalized latest validation summary. |
| Held or missing readiness | `rituals` | `lifecycle.state == held` or `lifecycle.missingReadiness array-contains <key>` | `updatedAtIso desc` | Do not infer recommendation readiness from status alone. |
| Source family / source label | `rituals` | `origin.sourceIds array-contains <sourceId>` or `searchIndex.sourceLabel == <label>` | `sort.headlineKey` | Prefer stable source IDs over display labels. |

Likely composite indexes:

```text
rituals: lifecycle.state ASC, sort.headlineKey ASC
rituals: lifecycle.state ASC, updatedAtIso DESC
rituals: origin.type ASC, updatedAtIso DESC
rituals: validation.valid ASC, validation.generatedAtIso DESC
rituals: review.lastDecisionType ASC, review.lastDecisionAtIso DESC
```

If filtering by array fields such as `lifecycle.missingReadiness`,
`origin.sourceIds`, or `review.openFlagKeys`, avoid combining multiple
array-contains filters in one Firestore query. Use a single array filter plus a
sort/equality filter, or add a deterministic queue/cell key.

## 5. Search And Direct Selection Queries

Search belongs to the I have something in mind path. It may surface findable or
direct-use Rituals even when they are not recommendation-eligible.

Required query shapes:

| View | Collection | Filters | Sort | Notes |
| --- | --- | --- | --- | --- |
| Searchable library | `rituals` | `lifecycle.findable == true` | `sort.headlineKey` | Does not require recommendation eligibility. |
| Direct-use library | `rituals` | `lifecycle.findable == true`, `lifecycle.directUseEligible == true` | `sort.headlineKey` | Openable from the app. |
| Purpose filter | `rituals` | `lifecycle.findable == true`, `searchIndex.purposeKeys array-contains <purpose>` | `sort.headlineKey` | Use primary plus supported purposes if available. |
| Carrier filter | `rituals` | `lifecycle.findable == true`, `searchIndex.carrierKeys array-contains <carrier>` | `sort.headlineKey` | Use primary plus supported carriers if available. |
| Source filter | `rituals` | `lifecycle.findable == true`, `origin.sourceIds array-contains <sourceId>` | `sort.headlineKey` | Prefer source ID over `sourceLabel`. |
| Text-ish search | `rituals` | one `searchIndex.searchTokens array-contains <token>` | `sort.headlineKey` | Firestore is not full text; intersect/rank locally after bounded query if needed. |
| Favorites overlay | household state + `rituals` | active household favorites, then fetch matching Ritual pointers | favorite recency or Ritual headline | Favorites are household state, not Ritual content. |

Likely composite indexes:

```text
rituals: lifecycle.findable ASC, sort.headlineKey ASC
rituals: lifecycle.findable ASC, lifecycle.directUseEligible ASC, sort.headlineKey ASC
rituals: lifecycle.findable ASC, searchIndex.primaryPurpose ASC, sort.headlineKey ASC
rituals: lifecycle.findable ASC, searchIndex.primaryCarrier ASC, sort.headlineKey ASC
```

Array token searches may require indexes such as:

```text
rituals: lifecycle.findable ASC, searchIndex.searchTokens ARRAY, sort.headlineKey ASC
rituals: lifecycle.findable ASC, searchIndex.purposeKeys ARRAY, sort.headlineKey ASC
rituals: lifecycle.findable ASC, searchIndex.carrierKeys ARRAY, sort.headlineKey ASC
rituals: lifecycle.findable ASC, origin.sourceIds ARRAY, sort.headlineKey ASC
```

Do not attempt broad substring search, fuzzy ranking, source-grounding prose
search, or cross-source semantic search directly in Firestore. If needed later,
add a bounded search index or keep Firestore queries coarse and rank locally
after access-controlled reads.

## 6. Choose With Me Candidate Queries

Choose with me may query only recommendation-eligible candidate pointers.

Required query shapes:

| View | Collection | Filters | Sort | Notes |
| --- | --- | --- | --- | --- |
| Candidate pool | `rituals` | `lifecycle.recommendationEligible == true`, `lifecycle.recommendable == true` | deterministic stable key | Base pool only. Selector still validates full metadata. |
| Purpose lane | `rituals` | candidate pool + `recommendationIndex.purposeKeys array-contains <purpose>` | stable key | Must preserve explicit check-in purpose. |
| Carrier lane | `rituals` | candidate pool + `recommendationIndex.carrierKeys array-contains <carrier>` | stable key | Must preserve explicit carrier when asked. |
| Capacity/audience lane | `rituals` | candidate pool + `recommendationIndex.eligibilityCells array-contains <cell>` | stable key | Use cells when multiple dimensions are needed. |
| Timing-supported candidate | `rituals` | candidate pool + `recommendationIndex.timingKeys array-contains <timingKey>` | stable key | Timing shapes within explicit choices; it does not hijack them. |

Likely composite indexes:

```text
rituals: lifecycle.recommendationEligible ASC, lifecycle.recommendable ASC, sort.headlineKey ASC
rituals: lifecycle.recommendationEligible ASC, lifecycle.recommendable ASC, recommendationIndex.purposeKeys ARRAY, sort.headlineKey ASC
rituals: lifecycle.recommendationEligible ASC, lifecycle.recommendable ASC, recommendationIndex.carrierKeys ARRAY, sort.headlineKey ASC
rituals: lifecycle.recommendationEligible ASC, lifecycle.recommendable ASC, recommendationIndex.eligibilityCells ARRAY, sort.headlineKey ASC
rituals: lifecycle.recommendationEligible ASC, lifecycle.recommendable ASC, recommendationIndex.timingKeys ARRAY, sort.headlineKey ASC
```

Do not rely on the pointer query alone for recommendation truth. The runtime
selector must still validate the loaded Ritual/version data and preserve hard
gates for purpose, carrier, audience, capacity, timing requirements, source
review, and product boundaries.

## 7. Review, Validation, And Promotion Queries

Review tooling should use admin/server paths, not normal client writes.

Required query shapes:

| View | Collection | Filters | Sort | Notes |
| --- | --- | --- | --- | --- |
| Validation snapshots for a Ritual | `ritualValidationSnapshots` | `ritualId == <id>` | `generatedAtIso desc` | Exact history for one Ritual. |
| Failed validations | `ritualValidationSnapshots` | `valid == false` | `generatedAtIso desc` | Admin/review queue. |
| Review decisions for a Ritual | `reviewDecisions` | `ritualId == <id>` | `createdAtIso desc` | Audit trail. |
| Pending/recent decision type | `reviewDecisions` | `decisionType == <type>`, optional `decision == held` | `createdAtIso desc` | Review queue or history. |
| Version history | `ritualVersions` | `ritualId == <id>` | `createdAtIso desc` | Admin/review only unless published/openable. |

Likely composite indexes:

```text
ritualValidationSnapshots: ritualId ASC, generatedAtIso DESC
ritualValidationSnapshots: valid ASC, generatedAtIso DESC
reviewDecisions: ritualId ASC, createdAtIso DESC
reviewDecisions: decisionType ASC, createdAtIso DESC
reviewDecisions: decisionType ASC, decision ASC, createdAtIso DESC
ritualVersions: ritualId ASC, createdAtIso DESC
```

Promotion, hold, release, archive, rollback, and validation snapshot creation
must be server/admin actions with typed validation before writes. Firestore
rules can block client writes, but they cannot enforce the full Ritual doctrine.

## 8. Static Export Queries

Static export should be server/admin tooling.

Required query shape:

```text
Query rituals where:
  lifecycle.state in reviewed/recommendable
  publishedVersionId exists
  validation.valid == true
  lifecycle.findable/directUseEligible/recommendationEligible according to export target

Then fetch each ritualVersions/{publishedVersionId} by exact ID and validate
before writing TypeScript output.
```

Likely composite indexes:

```text
rituals: lifecycle.state ASC, validation.valid ASC, sort.headlineKey ASC
rituals: lifecycle.recommendationEligible ASC, validation.valid ASC, sort.headlineKey ASC
```

Do not export from unvalidated versions, unpublished `currentVersionId` pointers,
or client-visible query results. Export should produce PR-reviewable diffs and
remain git-revertable.

## 9. Favorites, Feedback, And History Joins

Firestore will not join household memory to Ritual content. Household state
queries should return household records first, then the app/server should fetch
matching Ritual pointer/version records by exact IDs.

Issue #457 implements the first runtime household-state writes through these
collections:

```text
households/{householdId}/ritualFavorites/{ritualId}
households/{householdId}/recommendationInstances/{recommendationInstanceId}
households/{householdId}/ritualInteractionEvents/{eventId}
```

Required fields:

```text
householdId or path-derived household boundary
ritualId
favoritedVersionId
selectedVersionId
recommendationInstanceId
active
eventType
surface
feedback.fit
feedback.reasons
createdAt
updatedAt
ritualSnapshot
presentationSnapshot
recommendationMetadataSnapshot
selectorSnapshot summary
```

The current runtime adapter lives in
`src/data/rituals/household-state-firestore.ts`. It hydrates active and inactive
favorites, recommendation instances, and interaction events after private
household data loads. It writes favorite active-state changes, recommendation
instances, recommendation-shown events, direct Search selections,
try-another requests, and recommendation feedback. Search selection remains a
`ritual_selected` event with no `feedback`, while `try_another_requested`
remains its own event type rather than negative feedback.

Required query shapes:

| View | Collection | Filters | Sort | Notes |
| --- | --- | --- | --- | --- |
| Active favorites | household favorites | `active == true` | `updatedAt desc` | Overlay onto Search/Choose surfaces. |
| Favorite by Ritual | household favorite doc | exact `ritualId` | none | Save/unsave idempotently. |
| Recommendation instances | household recommendation instances | optional `selectedRitualId == <id>` | `createdAt desc` | Historical recommendation context. |
| Feedback by instance | household interaction events | `recommendationInstanceId == <id>`, `eventType == feedback_submitted` | `createdAt desc` | Fit feedback belongs to a recommendation instance. |
| Feedback by Ritual | household interaction events | `ritualId == <id>`, `eventType == feedback_submitted` | `createdAt desc` | Reporting/tuning input. |
| Try another events | household interaction events | `eventType == try_another_requested` | `createdAt desc` | Not negative feedback by itself. |

Likely composite indexes for collection-group or top-level variants:

```text
ritualFavorites: householdId ASC, active ASC, updatedAt DESC
recommendationInstances: householdId ASC, createdAt DESC
recommendationInstances: householdId ASC, selectedRitualId ASC, createdAt DESC
ritualInteractionEvents: householdId ASC, eventType ASC, createdAt DESC
ritualInteractionEvents: householdId ASC, ritualId ASC, eventType ASC, createdAt DESC
ritualInteractionEvents: householdId ASC, recommendationInstanceId ASC, eventType ASC, createdAt DESC
```

Search selection is direct intent, not positive recommendation feedback.
`try_another_requested` is separate from negative feedback. `never_recommend_this`
can later exclude Choose with me for that household without hiding the Ritual
from Search.

## 10. Source, Import, And Audit Queries

Source/import/audit views are admin/server tooling. They must not expose private
source text, OCR dumps, page images, model transcripts, real names, emails, or
private profile data.

Required query shapes:

| View | Collection | Filters | Sort | Notes |
| --- | --- | --- | --- | --- |
| Source run history | `sourceRuns` | `sourceId == <sourceId>` | `updatedAtIso desc` | Safe metadata only. |
| Active source runs | `sourceRuns` | `currentStage == <stage>` | `updatedAtIso desc` | Admin/source pipeline. |
| Import batch history | `importBatches` | `sourceRunId == <id>` | `createdAtIso desc` | Candidate disposition review. |
| Import batches by source | `importBatches` | `sourceLabel == <label>` | `createdAtIso desc` | Prefer stable source ID if added. |
| Ritual audit history | `ritualAuditEvents` | `ritualId == <id>` | `createdAtIso desc` | Rollback/promotion/export trail. |
| Audit by event type | `ritualAuditEvents` | `eventType == <type>` | `createdAtIso desc` | Admin diagnostics. |

Likely composite indexes:

```text
sourceRuns: sourceId ASC, updatedAtIso DESC
sourceRuns: currentStage ASC, updatedAtIso DESC
importBatches: sourceRunId ASC, createdAtIso DESC
importBatches: sourceLabel ASC, createdAtIso DESC
ritualAuditEvents: ritualId ASC, createdAtIso DESC
ritualAuditEvents: eventType ASC, createdAtIso DESC
```

Do not query private source artifact paths or raw extracted text in Firestore.
Private artifacts stay in gitignored local/admin storage.

## 11. Client-Side Query Boundaries

Do not attempt these client-side:

- writes to canonical Ritual content;
- writes to lifecycle, review, validation, import, promotion, rollback, or audit
  records;
- reads of unpublished or unvalidated full Ritual versions for normal user
  surfaces;
- cross-household favorites, feedback, notes, recommendation instances, or
  history;
- static export;
- source/import/audit dashboards;
- full-text/fuzzy search over source grounding or Ritual prose;
- joins between household memory and Ritual content beyond exact-ID fetches
  allowed by security rules;
- selector tuning from raw feedback before #440 reporting has been reviewed.

## 12. Implementation Readiness Checklist

Before DB-backed Ritual reads or writes are implemented, confirm:

- pointer/index fields exist for every planned list/search/recommendation query;
- immutable version fields are not used as broad list/search filters;
- Firestore security rules protect canonical Ritual content from client writes;
- household state paths are separate from canonical Ritual collections;
- needed composite indexes are declared or documented with emulator coverage;
- query shapes preserve direct-use/search visibility separate from
  recommendation eligibility;
- Firestore multi-array-query limits are handled by single-array queries,
  deterministic cells, or server-side bounded post-filtering;
- export/import/review/audit queries are admin/server only;
- client surfaces validate loaded records before use and keep static fallback
  until DB parity and rollback are proven.
