# DB Ritual Firestore Rules

Status: Security-rule design for issue #448.

Scope: Firestore security-rule design and tests only. This document does not
deploy production rules, implement DB reads or writes, import Ritual content,
change runtime selection, make Manage Rituals actionable, or change Ritual
content.

## Rules Posture

Canonical Ritual content is not client-writable.

Client code cannot create, update, or delete:

- `rituals/{ritualId}`;
- `ritualVersions/{ritualId_versionId}`;
- `sourceRuns/{sourceRunId}`;
- `importBatches/{importBatchId}`;
- `reviewDecisions/{decisionId}`;
- `ritualValidationSnapshots/{snapshotId}`;
- `ritualAuditEvents/{eventId}`.

Admin/server tooling is responsible for source imports, immutable version
creation, lifecycle changes, review decisions, promotion, rollback, validation
snapshots, audit events, static export, and any future production publish
operation.

## Read Boundary

Authenticated clients may read only published/findable Ritual content:

- `rituals/{ritualId}` is readable when the pointer is schema-compatible,
  findable, and has a `publishedVersionId`.
- `rituals` collection queries are allowed only when constrained to
  schema-compatible, findable Ritual pointers. Broad Ritual pointer listing is
  denied.
- `ritualVersions/{versionId}` is readable by exact document lookup when the
  matching Ritual pointer is findable and points at that version as published.

The rules do not allow broad client listing of immutable version documents.
Unpublished, held, rejected, archived, or unfindable Ritual content remains
blocked from normal client reads.

## Household State Boundary

Household Ritual memory is separate from canonical Ritual content.

Authenticated household members may read/write only these household-scoped
paths:

```text
households/{householdId}/ritualFavorites/{ritualId}
households/{householdId}/recommendationInstances/{recommendationInstanceId}
households/{householdId}/ritualInteractionEvents/{eventId}
households/{householdId}/ritualHistory/{eventId}
```

Household state writes must stay within the path household. If a document
includes `householdId`, it must match the path. Favorite documents must use the
Ritual ID as the document ID. Recommendation instances, interaction events, and
history records must carry the basic ID fields needed to preserve traceability.

The rules also reject top-level private/source residue keys such as raw source
text, copied source text, OCR text, page images, real names, emails, birth data,
natal placements, private profile payloads, and private artifact paths.

## Tested Cases

The emulator-backed rules tests cover:

- authenticated reads of published/findable Ritual pointers and versions;
- allowed constrained queries for findable Ritual pointers;
- denied broad Ritual pointer and immutable version collection reads;
- denied unauthenticated Ritual reads;
- denied reads of unfindable Ritual pointers and versions;
- denied client writes to canonical Ritual pointers and immutable versions;
- denied client writes to source/import/review/validation/audit collections;
- allowed household-member writes to favorites, recommendation instances,
  feedback/interaction events, and history;
- denied unauthenticated and cross-household household-state access;
- denied household-state writes with mismatched household or Ritual IDs;
- denied household-state writes carrying private/source residue fields;
- allowed household-state deletion without allowing canonical Ritual deletion.

Run the rules tests with:

```bash
npm run test:firestore:rules
```

The Firestore emulator requires a Java runtime. CI installs Java before running
the rules tests. Local machines need Java installed before this script can run.
