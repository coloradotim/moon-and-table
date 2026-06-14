# Product Docs

> Status: Current product-doc index.
> Future Ritual, library, intake, and recommendation work should begin from the
> controlling current docs, not from archived docs.

## Controlling Current Docs

- `docs/product/moon-and-table-current-direction.md`
- `docs/product/app-flow-decisions.md`
- `docs/product/codex-ritual-work-rules.md`

These docs control the Ritual-first reset. If an older doc conflicts with them, these docs control unless a later issue explicitly supersedes them.

## Current Supporting Artifacts

- `docs/product/manage-ritual-editor-design.md`
- `docs/product/db-backed-ritual-storage.md`
- `docs/product/db-ritual-firestore-rules.md`
- `docs/product/db-ritual-query-index-checklist.md`
- `docs/product/ritual-db-backfill-runbook.md`
- `docs/product/ritual-review-action-boundary.md`
- `docs/product/manage-rituals-workflow.md`
- `docs/product/ritual-model-pilot-extraction-review.md`
- `docs/product/ritual-pattern-purpose-migration-audit.md`
- `docs/product/ritual-content-architecture-audit.md`
- `docs/product/source-ingestion-prompt-workflow.md`
- `docs/product/source-pipeline.md`

These docs support current Ritual storage, review, editor design, model review,
and migration planning. Prefer their status notes and the current GitHub issues
over older migration sequencing sections inside the docs.

## Current Ritual Storage Summary

Firestore is now the active hosted Ritual content and review store for the
private app when `VITE_MOON_TABLE_USE_FIRESTORE_RITUALS=true`. Runtime reads
load published, validated Ritual versions from Firestore and fall back to the
source-controlled static library when DB reads are disabled or unavailable.

The repo still matters:

- `src/data/rituals/source-backed-rituals.ts` is the static fallback/export
  artifact and preservation baseline.
- DB mirror, export, parity, and backfill commands remain safety/audit tooling.
- Static Ritual data must not be deleted without a later explicit product
  decision and a passing preservation audit.
- Manage Rituals can record DB-backed lifecycle review actions; full Ritual
  body editing is still design-only in `manage-ritual-editor-design.md`.

## Source Indexes / Source Research

- `docs/product/ritual-source-index.md`
- `docs/archive/content-packets/`

Archived content packets are source research and source trail only. Their implementation recommendations are superseded unless a future issue explicitly revives them.

## Archived / Historical

See `docs/archive/README.md`.

Archived docs are preserved for history, failure analysis, source trail, and migration context. They should not be used as implementation guidance unless a future issue explicitly references the archived doc and explains what is being revived.

## Pre-Reset Issue Triage

Open issues created before the Ritual-first reset should be reviewed before implementation. Issues that assume direct `RitualPattern`, `SymbolicCard`, `SourceNote`, content-packet, Part B, or composer expansion may need to be closed, revised, or superseded.

A later issue will handle GitHub issue triage.
