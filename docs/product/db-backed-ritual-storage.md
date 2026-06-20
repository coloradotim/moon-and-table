# DB-Backed Ritual Storage

Status: Historical design plus current DB/static relationship note.

Scope: Architecture reference. The original DB document design in this file has
now been partially implemented by the mirror/export/parity/backfill/runtime-read
and Manage Rituals review-action issues. Treat older staged-migration language
as historical where it conflicts with `docs/product/README.md` or current
GitHub issues.

## 1. Purpose

Moon & Table's source-backed Ritual library began as static TypeScript data.
That was useful because every content change got typed validation, test
coverage, git review, and a visible diff. The current hosted app now has
Firestore-backed Ritual documents, immutable versions, validation snapshots,
review decisions, audit events, runtime DB reads behind
`VITE_MOON_TABLE_USE_FIRESTORE_RITUALS=true`, and static fallback/export
tooling.

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

Normal Manage UI should not make household maintainers reason about all raw
lifecycle fields. Product-facing Manage language is:

```text
Draft
In library
Allowed in Choose with me
Archived
Needs attention
```

Internal fields such as `findable`, `directUseEligible`,
`recommendationEligible`, `recommendable`, `missingReadiness`, `reviewFlags`,
and `lifecycle.state` remain important for compatibility, validation, review
transactions, audit history, and diagnostics. They are not the normal filter or
table vocabulary.

## 2. Current Transition Decision

During the transition, Firestore is the active hosted Ritual content and review
store when DB reads are enabled. Source-controlled TypeScript remains the
reviewed static fallback/export artifact and preservation baseline.

In other words:

- Firestore stores full immutable Ritual versions, current lifecycle pointers,
  validation snapshots, review decisions, and audit history.
- Runtime can read published, validated DB versions when the DB read flag is
  enabled.
- Static TypeScript remains available for fallback, preservation audit, and
  PR-reviewable export/recovery.
- Firestore lifecycle/review state may intentionally move ahead of the static
  export; that is no longer a runtime fallback reason by itself.
- Manage Rituals edits canonical body fields through mutable
  `ritualEditDrafts` documents. Those draft saves do not mutate immutable
  `ritualVersions` or published pointers.

This avoids two failure modes:

- Firestore becoming an unreviewed CMS that bypasses source review and tests.
- Static TypeScript being treated as the only place where review state can
  exist after DB-backed review actions have begun.

## 3. Collection Shape

Recommended top-level collections:

```text
rituals/{ritualId}
ritualVersions/{ritualId_versionId}
ritualEditDrafts/{draftId}
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
- `findable=true` and `directUseEligible=true` map to the user-facing state
  `In library`. If they disagree, Manage should show a `Library state mismatch`
  attention condition.
- `recommendationEligible=true` and `recommendable=true` map to the
  user-facing state `Allowed in Choose with me`.
- A Ritual that is in the library but not allowed in Choose with me may be
  `Held by choice` only when an explicit recommendation hold signal exists. Do
  not infer intentional hold merely from `recommendationEligible=false`.

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

### `ritualEditDrafts/{draftId}`

The edit-draft document is the mutable editor workspace. It is not an immutable
version and must not be treated as published content.

```ts
type RitualEditDraftDocument = {
  id: string;
  schemaVersion: "ritual-db-v1";
  collection: "ritualEditDrafts";
  ritualId: string;
  baseVersionId?: string;
  baseContentHash?: string;
  draftSource: "existing_version" | "household_blank";
  status: "active" | "discarded" | "submitted" | "applied";
  saveState:
    | "idle"
    | "saving"
    | "saved"
    | "unsaved_changes"
    | "save_failed";
  draftBuffer: RitualEditDraftBuffer;
  createdBy: "owner" | "person_a" | "person_b" | "household" | "automation" | "codex";
  createdAtIso: string;
  updatedBy: "owner" | "person_a" | "person_b" | "household" | "automation" | "codex";
  updatedAtIso: string;
  lastAutosavedAtIso?: string;
  lastManuallySavedAtIso?: string;
  discardedBy?: "owner" | "person_a" | "person_b" | "household" | "automation" | "codex";
  discardedAtIso?: string;
  submittedBy?: "owner" | "person_a" | "person_b" | "household" | "automation" | "codex";
  submittedAtIso?: string;
  appliedBy?: "owner" | "person_a" | "person_b" | "household" | "automation" | "codex";
  appliedAtIso?: string;
  appliedVersionId?: string;
};
```

Rules:

- Drafts created from existing Ritual versions record `baseVersionId` and
  `baseContentHash` when available.
- Blank household-origin drafts do not require source grounding.
- Explicit editor saves update only `ritualEditDrafts`; UI autosave is deferred
  until quota-safe behavior is designed.
- Discard and submitted states must not mutate `ritualVersions`, published
  pointers, lifecycle review state, direct-use eligibility, or recommendation
  eligibility.
- Applied existing-version drafts record `appliedVersionId`, `appliedAtIso`,
  and `appliedBy` after the protected server transaction creates the immutable
  version and updates the live Ritual pointer.
- Applied household-blank drafts record the same applied fields after the
  protected `Add to library` transaction creates the first immutable version,
  creates the `rituals/{ritualId}` pointer/index, writes validation/review/audit
  records, makes the Ritual findable and direct-use eligible, and keeps Choose
  with me held with `recommendation_review`.
- Persistent actor fields use repo-safe IDs such as `person_a`, `person_b`, and
  `household`; private names are rendered only from private runtime context.

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
    | "add_review_note"
    | "add_household_ritual"
    | "apply_draft_changes"
    | "toggle_review_flag"
    | "archive_ritual"
    | "archive_version"
    | "supersede_version"
    | "reject_version"
    | "rollback_published_version";
  decision:
    | "approved"
    | "held"
    | "rejected"
    | "archived"
    | "superseded"
    | "noted";
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
    | "household_ritual_added"
    | "ritual_draft_applied"
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
  -> reviewed or held for content/source reasons
  -> direct-use promotion decision, for source/imported Rituals
  -> recommendation promotion decision
  -> optional static export / runtime publish
```

For a new household-origin Ritual, `Add to library` is the explicit household
approval step that creates the first immutable version and makes the Ritual
findable/direct-use eligible. It does not make the Ritual recommendation-ready;
that still requires a separate recommendation availability action.

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

Current migration stance:

1. Keep `src/data/rituals/source-backed-rituals.ts` as the reviewed static
   fallback/export artifact and preservation baseline.
2. Keep the DB mirror/backfill command as preservation and recovery tooling for
   writing Firestore documents from the current static Ritual library and
   recording validation snapshots.
3. Treat Manage Rituals lifecycle review actions as DB-backed current state;
   intentional lifecycle/review drift from the static export is expected.
4. Keep server/admin review decision tooling as the only path for browser
   review actions to change canonical Firestore Ritual lifecycle fields.
5. Keep the static export command available to generate PR-ready TypeScript
   diffs from Firestore for review or recovery.
6. Keep runtime DB reads behind explicit configuration until the team decides
   whether static fallback can ever be removed.
7. Do not remove static Rituals without a later explicit migration issue and a
   passing preservation audit.

Rollback:

- For static runtime, revert the generated TypeScript export through git.
- For DB runtime, move `publishedVersionId` back to an earlier immutable version
  and record a `rollback_performed` audit event.
- Recommendation instances and history must keep the original `versionId` and
  presentation snapshot so rollback does not rewrite what was shown.

The first mirror step is an in-memory dry run, not a Firestore write:

```bash
npm run rituals:mirror-static-to-db
```

That command generates DB-shaped Ritual pointer documents, immutable version
documents, validation snapshots, and audit events from
`src/data/rituals/source-backed-rituals.ts`. It reconciles static counts against
generated DB-shaped output and reports skipped or invalid records with reasons.
It does not read from or write to Firestore, import source packets, change
runtime selection, or modify Ritual content.

The deterministic static export step uses DB-shaped Ritual pointer documents,
published immutable version documents, and valid validation snapshots to produce
the reviewed TypeScript runtime export:

```bash
npm run rituals:export-db-to-static
```

By default the command is a dry run against the current in-memory DB-shaped
mirror records. It validates before generating source text, reports invalid,
unreviewed, unpublished, or unvalidated records, and performs no Firestore reads
or writes. Passing `-- --write` updates
`src/data/rituals/source-backed-rituals.ts` so the result can move through a
normal PR review and remain git-revertable.

Before a production backfill writes current Rituals to Firestore, run the
read-only parity report:

```bash
npm run rituals:db-parity
```

The current command compares the static runtime Ritual library against the
in-memory DB-shaped mirror records. It checks counts, Ritual IDs, published
version pointers, content hashes, presentation fields, source grounding,
recommendation/search metadata, availability/lifecycle flags, ritual words,
review flags, adaptation policy, validation snapshots, and whether the DB-shaped
records can export back to equivalent static Rituals. It performs no Firestore
reads or writes. The same parity logic should be reused by the production
backfill step when real Firestore payloads are available.

The production backfill runbook lives in
`docs/product/ritual-db-backfill-runbook.md`. The backfill command is dry-run by
default:

```bash
npm run rituals:backfill-static-to-db
```

It writes gitignored backup/report artifacts under
`.moon-table-private/ritual-backfills/`. A production write requires explicit
admin credentials and both `--write` and `--confirm-production-backfill`; it
refuses unsafe existing-document conflicts instead of silently overwriting newer
DB records.

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

While static TypeScript remains the fallback/export path, the static runtime
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
Ritual fields. It avoids unstable timestamps and keeps repo-backed and
Firestore-backed household state able to point at exact shown content even when
the current lifecycle pointer changes later.

Search visibility remains separate from feedback. A future
`never_recommend_this` signal can block Choose with me for a household while the
Ritual stays findable/direct-use eligible in Search.

## 10. Current Implementation State

The staged migration described by this design has moved past its initial
planning phase:

1. Typed DB document models, validators, version identity, and content hashes
   exist.
2. Static-to-DB mirror dry-run, deterministic DB-to-TypeScript export, DB
   parity, and production backfill preservation tooling exist.
3. Firestore security rules and query/index planning exist as separate
   artifacts.
4. The hosted app can read published, validated DB Ritual versions behind
   `VITE_MOON_TABLE_USE_FIRESTORE_RITUALS=true`.
5. Manage Rituals can record DB-backed lifecycle review actions through a
   server/admin boundary.
6. Firestore lifecycle/review state may intentionally differ from the static
   export after review actions. Runtime DB reads should report parity
   diagnostics but should not fall back solely because review state has moved
   ahead of the repo.

The current remaining work is not to repeat the migration sequence. It is to
design and implement the full versioned Ritual editor, improve review-action
labels, decide when/how DB edits export back to TypeScript, and keep
preservation audits green before any removal of static fallback data.

## 11. Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| Firestore bypasses review. | Keep server-side validation, review decisions, audit events, and export tooling; do not allow browser clients to write canonical Ritual versions directly. |
| Two content models diverge. | Store the existing `Ritual` object inside `ritualVersions`; do not create a parallel ritual schema. |
| Mutable content rewrites history. | Recommendation instances and history store `versionId` plus snapshots. |
| Direct-use and recommendation gates collapse. | Keep separate lifecycle flags and review decisions. |
| Private source text leaks into DB. | Store only source-safe summaries, labels, and provenance ids; keep raw artifacts local/gitignored. |
| Invalid records become recommendable. | Require validation snapshots and explicit promotion decisions before recommendation eligibility. |
| Firestore queries need denormalized fields. | Denormalize only index fields on `rituals/{ritualId}`; full content remains immutable in versions. |
| Rollback is unclear. | Use immutable versions and `publishedVersionId` pointer rollback with audit events. |

## 12. Open Questions For Review

- When, if ever, should static TypeScript stop shipping as fallback?
- Should source-backed app content be global for the private app, or nested under
  a household if multi-household support ever appears?
- Should all promotion decisions generate a PR export, or only changes that
  need source-controlled recovery/review?
- Who can write review decisions: owner only, both household members, or a
  future reviewer role?
- Should private source-run metadata be mirrored to Firestore at all, or should
  DB records only store source-run ids and packet paths?
- How long should archived versions stay in Firestore before cold storage, if
  ever?
- Should `Ritual.status` keep the current four values while DB lifecycle adds
  `held`, `rejected`, and `archived`, or should a later typed-data issue expand
  the runtime enum?
