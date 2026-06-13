# Ritual DB Backfill Runbook

Status: Current safety runbook for production source-backed Ritual backfill.

Scope: Deployment/backfill safety. This runbook does not enable runtime DB
reads, import new source candidates, make Manage Rituals actionable, tune the
selector, remove static Ritual data, or change Ritual content.

## Purpose

The source-controlled Ritual library remains the production runtime gate while
Firestore becomes the versioned draft, review, provenance, validation, and audit
store. Before any runtime can rely on Firestore Ritual content, the existing
static source-backed Rituals must be backfilled with a preservation audit that
proves no Ritual was lost, changed, or made unreachable.

## Dry Run

Run the backfill in dry-run mode first:

```bash
npm run rituals:backfill-static-to-db
```

The dry run:

- reads `src/data/rituals/source-backed-rituals.ts`;
- generates the DB-shaped write payload in memory;
- writes a gitignored backup artifact under
  `.moon-table-private/ritual-backfills/`;
- writes a gitignored preservation report beside the backup artifact;
- performs no Firestore reads or writes.

The report includes:

- source static commit SHA;
- static Ritual count;
- static Ritual ID set hash;
- intended DB pointer count;
- intended DB version count;
- intended validation snapshot and audit event counts;
- published version count;
- content hash match count;
- missing/extra/hash/field mismatch counts;
- invalid DB record counts;
- unpublished or unvalidated record counts;
- backup/export artifact path;
- rollback procedure.

## Optional Firestore Read Check

To inspect existing Firestore content without writing:

```bash
npm run rituals:backfill-static-to-db -- --read-firestore
```

Authenticate the same way as the private seed script:

```bash
export FIREBASE_SERVICE_ACCOUNT_PATH="$PWD/private/firebase-service-account.local.json"
```

or:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/private/firebase-service-account.local.json"
```

The command uses `FIREBASE_PROJECT_ID`, `GCLOUD_PROJECT`, or
`VITE_FIREBASE_PROJECT_ID` from `.env.local` to select the project.

## Production Write

Only write after reviewing the dry-run backup and report:

```bash
npm run rituals:backfill-static-to-db -- --write --confirm-production-backfill
```

The command refuses to write unless all preservation gates pass:

- static-to-DB mirror is complete;
- all backfilled records are existing source-backed Rituals;
- static count matches intended DB pointer and version counts;
- every Ritual has an intended published version pointer;
- every intended version content hash matches static content;
- DB-shaped records export back to equivalent static Rituals;
- backup artifact path is recorded;
- existing Firestore documents are absent or exactly idempotent;
- rollback procedure is documented.

If an existing Firestore document has the same ID but different content, the
command refuses to write. It does not silently overwrite newer DB versions.

After a write, the command reads Firestore back and writes a post-write
preservation report. That post-write report must pass before runtime DB reads
can be considered.

## Rollback

Do not delete static Ritual source as part of this backfill.

If the static runtime needs rollback, revert the generated TypeScript export
through git.

If a DB write needs rollback, use the backup artifact to identify the exact
document IDs and content hashes written by the backfill. Restore a prior
Firestore export if one exists, or delete only the backfilled document IDs after
confirming no newer versions were written.

Recommendation instances, history, feedback, and favorites should continue to
refer to `ritualId` and exact `versionId` values; rollback must not rewrite what
was shown historically.
