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
FIREBASE_SERVICE_ACCOUNT_PATH
application default credentials
```

Any caller with a verified Firebase ID token may use the review-action endpoint.
This keeps the private pilot simple: app access is controlled by Firebase Auth
and Firestore private-data access, not a second reviewer allowlist.

## Product Labels

The stored action values are implementation/API values and should stay stable.
Manage Rituals should render clearer product labels and descriptions:

| Stored action | Visible label | Meaning |
| --- | --- | --- |
| `hold_direct_use` | Remove from direct use | Keep the record visible in Manage, but remove it from Search/direct selection and recommendations. |
| `promote_direct_use` | Restore direct use | Restore Search/direct selection without automatically making the Ritual recommendation-ready. |
| `hold_recommendation` | Remove from recommendations | Keep direct use available, but stop Choose with me from offering it. |
| `promote_recommendation` | Make recommendation-ready | Allow Choose with me to offer the Ritual once direct use and validation are clear. |
| `mark_needs_source_recheck` | Needs source recheck | Hold the Ritual until source grounding is reviewed. |
| `mark_needs_packet_correction` | Needs packet correction | Hold the Ritual until extraction/import correction is reviewed. |
| `add_review_note` | Add review note | Record a note without changing lifecycle availability. |
| `archive_ritual` | Archive Ritual | Remove the Ritual from active use paths. |

Disabled reasons should explain the next practical step. In particular, the
path from direct-use hold back to recommendation-ready is two steps: first
Restore direct use, then Make recommendation-ready.

## Troubleshooting

If the Manage Rituals UI reports:

```text
Review action API was blocked by Vercel deployment protection.
```

the browser reached Vercel's preview protection layer instead of the review
action function. Test from a deployment where the current browser session is
authorized for the protected preview, use the production deployment if that is
the intended test surface, or configure a preview bypass for trusted testing.

If the UI reports:

```text
Review action API endpoint was not found.
```

the app is likely running under a Vite-only dev server without the local API
middleware. The project Vite config serves `/api/ritual-review-action` during
local development; restart the dev server after pulling this configuration.

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
- patch the local lifecycle row from the successful action result instead of
  reloading the full DB Ritual repository;
- avoid raw JSON editing.

The signed-in app should also lazy-load the DB Ritual repository only when a
Ritual surface needs it, such as Search rituals, Choose with me selection, or
Manage Rituals. Private-data startup should not read the full Ritual library.

The broader Ritual body and metadata editor is tracked separately in #480. It
should create a new versioned draft/superseding Ritual version rather than
mutating a published version in place.
