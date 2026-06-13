# DB-Backed Ritual Storage

Status: Design proposal for issue #422.

Scope: Documentation only. This document does not implement Firestore reads,
writes, runtime selection, Manage Rituals actions, imports, migrations, or
selector behavior.

## 1. Purpose

Moon & Table's current source-backed Ritual library is static TypeScript data.
That has been useful because every content change gets typed validation, test
coverage, git review, and a visible diff. It is not enough for the next review
workflow, where source pipeline imports, draft revisions, promotion decisions,
rollback, favorites, feedback, and recommendation instances need stable
database references and immutable version history.

This design introduces a Firestore-compatible content model while preserving the
current product doctrine:

- `Ritual` remains the canonical content object.
- A Ritual is a whole authored practice with intrinsic purpose.
- Metadata supports search, direct selection, recommendation, and review.
- Metadata must not assemble a ritual.
- Ritual existence, search visibility, direct use, and recommendation
  eligibility remain separate decisions.
- Choose with me uses only recommendation-eligible Rituals.
- Search and direct selection do not require recommendation eligibility.

## 2. Transition Decision

During the transition, source-controlled TypeScript remains the production
runtime gate for reviewed source-backed Rituals. Firestore becomes the versioned
draft, review, provenance, validation, and audit store.

In other words:

- Firestore stores full immutable Ritual versions and review history.
- The repo keeps the reviewed production export until DB validation, promotion,
  and rollback tooling are proven.
- Runtime may later read published DB versions, but only after a separate issue
  adds read adapters, validation, fallback, and deployment checks.

This avoids two failure modes:

- Firestore becoming an unreviewed CMS that bypasses source review and tests.
- Static TypeScript becoming the only place where draft and review state can
  exist.

## 3. Collection Shape

Recommended top-level collections:

```text
rituals/{ritualId}
ritualVersions/{ritualId_versionId}
sourceRuns/{sourceRunId}
importBatches/{importBatchId}
reviewDecisions/{decisionId}
ritualValidationSnapshots/{snapshotId}
ritualAuditEvents/{eventId}
```

Household state such as favorites, recommendation instances, feedback, and
practice history should reference `ritualId` and, when the exact shown content
matters, `versionId`. Those household state collections are separate from the
canonical Ritual content collections.

## 4. Firestore Documents

The TypeScript-like shapes below are design targets, not implemented types.

### `rituals/{ritualId}`

The `rituals` document is the current-state index and pointer. It is not the
canonical prose store. Full content lives in immutable `ritualVersions`.

```ts
type RitualDocument = {
  id: string;
  schemaVersion: "ritual-db-v1";
  currentVersionId: string;
  publishedVersionId?: string;
  latestValidationSnapshotId?: string;
  latestReviewDecisionId?: string;

  lifecycle: {
    state:
      | "draft"
      | "reviewed"
      | "recommendable"
      | "held"
      | "rejected"
      | "archived";
    imported: boolean;
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
    holdReasons: string[];
  };

  origin: {
    type: "source" | "household";
    sourceIds?: string[];
    sourceRunIds?: string[];
    importBatchIds?: string[];
    packetCandidateIds?: string[];
  };

  searchIndex: {
    headline: string;
    sourceLabel?: string;
    originLabel?: string;
    primaryPurpose: string;
    primaryCarrier: string;
    tags: string[];
    keywords: string[];
    materials?: string[];
    places?: string[];
  };

  versionHistory: {
    versionIds: string[];
    archivedVersionIds: string[];
    supersededVersionIds: string[];
  };

  createdAtIso: string;
  updatedAtIso: string;
  archivedAtIso?: string;
};
```

Rules:

- This document may denormalize fields for lists and filters.
- It must not be treated as the source of full Ritual text.
- A promotion action updates this pointer only after a matching immutable
  version, review decision, and validation snapshot exist.

### `ritualVersions/{ritualId_versionId}`

The version document stores the immutable canonical content snapshot.

```ts
type RitualVersionDocument = {
  id: string;
  ritualId: string;
  versionId: string;
  schemaVersion: "ritual-db-v1";
  ritualSchemaVersion: "src/data/rituals/types.ts";
  contentHash: string;

  ritual: Ritual;

  provenance: {
    sourceIds?: string[];
    sourceRunId?: string;
    importBatchId?: string;
    packetPath?: string;
    packetCandidateId?: string;
    sourceLocationLabels: string[];
    sourceGrounding: RitualSourceGrounding[];
    moonAndTableAdaptationNotes: string[];
  };

  reviewStateAtCreation: {
    lifecycleState: RitualDocument["lifecycle"]["state"];
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
    reviewFlags: string[];
  };

  createdBy: "owner" | "person_a" | "person_b" | "automation" | "codex";
  createdAtIso: string;
  supersedesVersionId?: string;
  archivedAtIso?: string;
};
```

#### Content version versus current lifecycle

`ritualVersions` may store a full `Ritual` snapshot for compatibility with the
current runtime model. Lifecycle and availability fields inside that snapshot
are historical snapshot values.

Current lifecycle, availability, recommendation readiness, missing-readiness,
and hold state are controlled by `rituals/{ritualId}.lifecycle` and explicit
`reviewDecisions`.

A promotion, hold, release, archive, rollback, or eligibility decision does not
create a new immutable content version unless the underlying Ritual content or
selector-relevant metadata changed.

Version naming:

```text
<ritualId>__v001
<ritualId>__v002
```

Version numbers are monotonically increasing per Ritual. They do not encode
status. Status can change through review decisions without rewriting the
immutable content version.

New immutable Ritual versions are required when content or selector-relevant
metadata changes:

- presentation fields;
- source grounding;
- `ritualWords`;
- recommendation metadata that affects selection/scoring;
- search metadata that affects search/filtering/direct selection;
- adaptation policy;
- origin/source identity;
- Ritual body/content;
- selector-relevant timing/purpose/carrier/capacity/audience metadata.

New immutable Ritual versions are not required for lifecycle-only changes:

- direct-use promotion;
- recommendation promotion;
- hold/release decisions;
- validation snapshots;
- review notes;
- audit events;
- lifecycle state changes;
- missing-readiness changes;
- current availability flags;
- rollback pointer changes.

Old versions remain readable. They may be archived or superseded but not
deleted as part of normal review workflow.

### `sourceRuns/{sourceRunId}`

The DB source run document stores safe run metadata only. Private source text,
page images, OCR chunks, and model transcripts stay in the gitignored local
source-run directory.

```ts
type SourceRunDocument = {
  id: string;
  sourceId: string;
  title: string;
  author?: string;
  sourceType: "private_pdf" | "manual_packet" | "public_reference";
  currentStage:
    | "init"
    | "preprocess"
    | "scan"
    | "classify"
    | "extract"
    | "qa_packet"
    | "review"
    | "import"
    | "validate_import"
    | "promote"
    | "audit";
  privateArtifactRootLabel?: string;
  packetPaths: string[];
  importBatchIds: string[];
  createdAtIso: string;
  updatedAtIso: string;
};
```

`privateArtifactRootLabel` may say that artifacts exist under a local private
run directory. It must not store raw paths containing private user names, source
text, page images, or extracted chunks.

### `importBatches/{importBatchId}`

Import batches connect source review output to created Ritual versions.

```ts
type ImportBatchDocument = {
  id: string;
  sourceRunId?: string;
  packetPath?: string;
  sourceLabel: string;
  importer: "owner" | "automation" | "codex";
  createdAtIso: string;
  candidateResults: Array<{
    packetCandidateId: string;
    ritualId?: string;
    versionId?: string;
    disposition:
      | "imported"
      | "held_before_import"
      | "candidate_extract_later"
      | "rejected"
      | "duplicate";
    directUseTarget?: "yes" | "no" | "later_review";
    recommendationTarget?: "yes" | "no" | "later_review" | "context_only";
    notes: string[];
  }>;
};
```

### `reviewDecisions/{decisionId}`

Review decisions are explicit audit records. Promotion is never just a silent
field edit on a Ritual document.

```ts
type ReviewDecisionDocument = {
  id: string;
  ritualId: string;
  versionId: string;
  decisionType:
    | "approve_import"
    | "hold_import"
    | "promote_direct_use"
    | "hold_direct_use"
    | "promote_recommendation"
    | "hold_recommendation"
    | "mark_needs_source_recheck"
    | "mark_needs_packet_correction"
    | "toggle_review_flag"
    | "archive_version"
    | "supersede_version"
    | "reject_version";
  decision: "approved" | "held" | "rejected" | "archived" | "superseded";
  reasons: string[];
  reviewer: "owner" | "person_a" | "person_b" | "automation" | "codex";
  sourceRunId?: string;
  importBatchId?: string;
  before: {
    lifecycleState: string;
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
  };
  after: {
    lifecycleState: string;
    findable: boolean;
    directUseEligible: boolean;
    recommendationEligible: boolean;
    recommendable: boolean;
    missingReadiness: string[];
  };
  createdAtIso: string;
};
```

Reviewer values must stay repository-safe. Real names, emails, profile details,
or private relationship labels do not belong in source-controlled examples.

### `ritualValidationSnapshots/{snapshotId}`

Validation snapshots preserve what was checked before a version was promoted,
held, exported, or published.

```ts
type RitualValidationSnapshotDocument = {
  id: string;
  ritualId: string;
  versionId: string;
  validatorVersion: string;
  contentHash: string;
  generatedAtIso: string;
  valid: boolean;
  findings: Array<{
    path: string;
    message: string;
    severity: "error" | "warning";
  }>;
  readiness: {
    sourceGroundingComplete: boolean;
    presentationComplete: boolean;
    directUseReady: boolean;
    recommendationMetadataComplete: boolean;
    recommendationReady: boolean;
    missingReadiness: string[];
  };
};
```

### `ritualAuditEvents/{eventId}`

Review decisions are the main audit trail. Audit events capture non-review
system actions such as mirror import, export, validation, rollback, or runtime
publish.

```ts
type RitualAuditEventDocument = {
  id: string;
  ritualId?: string;
  versionId?: string;
  eventType:
    | "db_mirror_created"
    | "validation_snapshot_created"
    | "static_export_generated"
    | "published_pointer_changed"
    | "runtime_read_fallback_used"
    | "rollback_performed";
  actor: "owner" | "automation" | "codex";
  summary: string;
  relatedReviewDecisionId?: string;
  relatedValidationSnapshotId?: string;
  createdAtIso: string;
};
```

## 5. Lifecycle And Gates

Lifecycle state and capability flags are separate.

| State | Meaning | Findable | Direct use | Recommendation |
| --- | --- | --- | --- | --- |
| `draft` | Imported or authored but still being revised. | Optional | Usually no | No |
| `reviewed` | Content/source or household review passed. | Optional | Optional | No unless separately promoted |
| `recommendable` | Reviewed, validation-clean, and recommendation-approved. | Yes | Yes | Yes |
| `held` | Real candidate/version, but blocked by source, safety, product, timing, or metadata gate. | Optional | Optional | No |
| `rejected` | Not a Moon & Table Ritual or not acceptable for import. | No | No | No |
| `archived` | Old or retired version retained for history. | No for current selection | Historical only | No |

Promotion gates:

```text
Ritual exists/imported
  -> validation snapshot created
  -> reviewed or held for content/source/household reasons
  -> direct-use promotion decision
  -> recommendation promotion decision
  -> optional static export / runtime publish
```

Direct-use promotion requires:

- valid `Ritual` shape;
- complete presentation fields;
- source grounding for source-origin Rituals;
- household context for household-origin Rituals;
- direct-use review decision;
- no unresolved direct-use blocking flags;
- no long private source text or private profile material.

Recommendation promotion additionally requires:

- direct-use eligibility;
- `status: "recommendable"` or equivalent lifecycle after promotion;
- recommendation metadata complete;
- `availability.recommendationEligible: true`;
- `recommendationMetadata.eligibility.recommendable: true`;
- timing contexts supported by the current selector when required;
- capacity and audience metadata reviewed;
- validation clean;
- explicit recommendation review decision.

## 6. Validation Rules

The existing `validateRitual(...)` function remains the runtime validator
foundation. DB import and promotion should call the same validation logic or a
server-side equivalent generated from the same schema.

Validation must cover:

- valid enum values;
- required presentation fields;
- source grounding for source-origin Rituals;
- household context for household-origin Rituals;
- `ritualWords` mode and source-location constraints;
- availability and recommendation consistency;
- no stale private excerpt fields;
- no private source text, private source images, emails, birth data, or private
  profile notes;
- no unsupported runtime metadata shape;
- content hash recorded before promotion;
- validation snapshot tied to the exact version being promoted.

Firestore security rules cannot understand the full Ritual doctrine by
themselves. Writes that change Ritual content, lifecycle, or eligibility should
go through admin tooling that validates the whole document before writing.

## 7. Source Provenance Boundary

The database may store:

- source id;
- source run id;
- import batch id;
- packet candidate id;
- packet path;
- citation label;
- source location label;
- repository-safe source summary;
- repository-safe source support summary;
- Moon & Table adaptation notes;
- do-not-import notes and review flags.

The database must not store:

- private PDFs;
- page images;
- OCR text dumps;
- long copied source text;
- private source excerpts beyond approved short operative words;
- raw model transcripts from private extraction;
- personal profile notes, real names, emails, birth data, or schedules.

Private source artifacts remain in `.moon-table-private/source-runs/<source-id>/`
or another gitignored local/admin store.

## 8. Static Export And Runtime Fallback

The DB query and index checklist for the transition lives in
`docs/product/db-ritual-query-index-checklist.md`. That checklist names the
query shapes, denormalized pointer fields, likely composite indexes, and
client-side query boundaries that should be reviewed before DB-backed Ritual
reads or writes are implemented.

Recommended staged migration:

1. Keep `src/data/rituals/source-backed-rituals.ts` as production canonical.
2. Add a DB mirror/export command that writes Firestore documents from the
   current static Ritual library and records validation snapshots.
3. Keep Manage Rituals read-only against static data until DB mirror parity is
   verified.
4. Add admin tooling that imports draft versions into Firestore from source
   pipeline packets.
5. Add review decision tooling that can promote direct-use and recommendation
   eligibility in Firestore.
6. Add a static export command that generates a PR-ready TypeScript diff from
   reviewed DB versions.
7. Only after review, add runtime DB reads behind a feature flag with static
   TypeScript fallback.
8. Eventually decide whether Firestore becomes runtime-primary or remains the
   review/workflow source that exports to the repo.

Rollback:

- For static runtime, revert the generated TypeScript export through git.
- For DB runtime, move `publishedVersionId` back to an earlier immutable version
  and record a `rollback_performed` audit event.
- Recommendation instances and history must keep the original `versionId` and
  presentation snapshot so rollback does not rewrite what was shown.

## 9. Relationship To Favorites, Feedback, And History

Favorites should target Ritual identity:

```text
ritualId
```

They may also record the version that was current when the favorite was added:

```text
ritualId
favoritedVersionId
```

Recommendation instances, feedback, and practice history should target both
identity and exact shown content:

```text
ritualId
versionId
presentationSnapshot
recommendationMetadataSnapshot
selectorSnapshot
```

That preserves the historical recommendation even if the Ritual is revised
later. A recommendation instance should never depend on the current mutable
`rituals/{ritualId}` pointer to explain what happened in the past.

While static TypeScript remains the production runtime gate, the static runtime
library should still expose or derive stable version identity. Favorites may
reference `ritualId` plus `favoritedVersionId`; recommendation instances,
feedback, and history should store `ritualId`, `versionId`, presentation
snapshot, recommendation metadata snapshot, and selector snapshot.

The static runtime helper uses content-derived identity for now:

```text
versionId = <ritualId>__<first 12 hex characters of contentHash>
contentHash = fnv1a128:<32 hex characters>
```

The hash is a deterministic content fingerprint over selector/content-relevant
Ritual fields. It avoids unstable timestamps and keeps repo-backed household
state able to point at the exact shown content while static TypeScript remains
the production gate.

Search visibility remains separate from feedback. A future
`never_recommend_this` signal can block Choose with me for a household while the
Ritual stays findable/direct-use eligible in Search.

## 10. Manage Rituals Dependency Order

Recommended follow-up order:

1. Review and accept this design.
2. Add typed DB document models and pure validators.
3. Define the DB query and index checklist before DB reads or writes.
4. Design and test Firestore security rules for canonical content and household
   state.
5. Add static-to-DB mirror dry-run tooling for current static Rituals.
6. Add deterministic static export from promoted DB versions to TypeScript.
7. Add read-only Manage Rituals DB parity checks.
8. Add source pipeline import into draft `ritualVersions`.
9. Add review decision tooling for direct-use and recommendation promotion.
10. Make Manage Rituals actionable for draft edit and review decisions.
11. Add runtime DB read adapter only after parity, validation, fallback, and
   rollback are proven.

Issues #435 and #436 can proceed after this design if they reference
`ritualId` now and leave room for `versionId` and presentation snapshots.
Selector tuning should wait until feedback/reporting work has landed and been
reviewed.

## 11. Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| Firestore bypasses git review. | Keep repo export as production gate until DB tooling proves validation, review decisions, and PR-ready diffs. |
| Two content models diverge. | Store the existing `Ritual` object inside `ritualVersions`; do not create a parallel ritual schema. |
| Mutable content rewrites history. | Recommendation instances and history store `versionId` plus snapshots. |
| Direct-use and recommendation gates collapse. | Keep separate lifecycle flags and review decisions. |
| Private source text leaks into DB. | Store only source-safe summaries, labels, and provenance ids; keep raw artifacts local/gitignored. |
| Invalid records become recommendable. | Require validation snapshots and explicit promotion decisions before recommendation eligibility. |
| Firestore queries need denormalized fields. | Denormalize only index fields on `rituals/{ritualId}`; full content remains immutable in versions. |
| Rollback is unclear. | Use immutable versions and `publishedVersionId` pointer rollback with audit events. |

## 12. Open Questions For Review

- When should runtime read from Firestore instead of static TypeScript?
- Should source-backed app content be global for the private app, or nested under
  a household if multi-household support ever appears?
- Should all promotion decisions generate a PR export, or only changes that
  affect production runtime?
- Who can write review decisions: owner only, both household members, or a
  future reviewer role?
- Should private source-run metadata be mirrored to Firestore at all, or should
  DB records only store source-run ids and packet paths?
- How long should archived versions stay in Firestore before cold storage, if
  ever?
- Should `Ritual.status` keep the current four values while DB lifecycle adds
  `held`, `rejected`, and `archived`, or should a later typed-data issue expand
  the runtime enum?
