# Ritual Review Action Boundary

Status: Current implementation note for issue #478 and the #427 Manage Rituals
review-action UI.

## Purpose

Manage Rituals review actions must not write canonical Ritual state directly
from the browser. Promotion, hold, archive, rollback, and review-note actions
change the canonical Firestore lifecycle pointer and must record explicit
review decision and audit documents.

The server/admin boundary is implemented in:

```text
api/ritual-review-action.ts
src/data/rituals/db-review-action-boundary.ts
src/server/ritual-review-action-api.ts
```

It is intentionally narrow. It accepts only:

- `ritualId`
- `versionId`
- one supported review action
- a bounded list of review reasons or notes

It then loads the current Ritual pointer, target version, and validation
snapshot server-side, calls `createRitualReviewTransactionPlan(...)`, and commits
the planned writes atomically through an injected admin Firestore store.

## Browser Boundary

Browser clients should continue to treat canonical Ritual collections as
read-only. Firestore rules should keep denying client writes to:

- `rituals`
- `ritualVersions`
- `reviewDecisions`
- `ritualValidationSnapshots`
- `ritualAuditEvents`

Manage Rituals UI work should call a server-side wrapper around
`applyRitualReviewAction(...)`; it should not duplicate lifecycle logic or open
write access through client rules.

## Server Wrapper Shape

A hosting-specific wrapper may be a Firebase callable function, HTTPS function,
or another protected server endpoint. The wrapper should:

1. authenticate the caller;
2. authorize the caller for Ritual review;
3. pass only the constrained request object to `applyRitualReviewAction(...)`;
4. return either the non-private validation findings or the successful review
   decision/audit ids;
5. reload DB-backed Rituals in the app after success.

The wrapper should not accept arbitrary Ritual fields, source text, private
profile data, or raw Firestore write payloads.

The current Vercel wrapper is:

```text
/api/ritual-review-action
```

It expects:

```text
Authorization: Bearer <Firebase ID token>
Content-Type: application/json
```

and a body shaped like:

```json
{
  "ritualId": "ritual-id",
  "versionId": "ritual-version-id",
  "action": "hold_recommendation",
  "reasons": ["short reviewer note"]
}
```

The wrapper uses Firebase Admin credentials from one of:

```text
FIREBASE_SERVICE_ACCOUNT_JSON
FIREBASE_SERVICE_ACCOUNT_BASE64
application default credentials
```

and authorizes reviewers through server-only allowlists:

```text
MOON_TABLE_RITUAL_REVIEW_ADMIN_UIDS
MOON_TABLE_RITUAL_REVIEW_ADMIN_EMAILS
```

Do not expose these allowlists through `VITE_` client environment variables.

## Validation

Promotion, archive, and rollback actions require a passing validation snapshot.
The boundary loads the pointer's latest validation snapshot when it matches the
target version, and otherwise falls back to the deterministic validation snapshot
id for the requested version. If no matching snapshot exists, the transaction
planner rejects the action.

Hold and note actions preserve reasons without requiring a passing validation
snapshot, but still create explicit review decision and audit records.

## Manage Rituals

The Manage Rituals review-action UI should:

- show current lifecycle and version context;
- compute available actions from the row state and validation state;
- submit actions through the server wrapper around this boundary;
- show clear success/failure messages;
- reload the DB Ritual repository after a successful action;
- avoid raw JSON editing.

The broader Ritual body and metadata editor is tracked separately in #480. It
should create a new versioned draft/superseding Ritual version rather than
mutating a published version in place.
