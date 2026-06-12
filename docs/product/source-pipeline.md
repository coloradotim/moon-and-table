# Local Source Pipeline

> Status: MVP implementation notes for issue #417.

The source pipeline is a private local/admin workflow for turning a purchased or
otherwise private PDF source into repository-safe source inventory,
classification, draft Moon & Table Ritual candidates, packet QA, and Tim review
state.

It does not build an admin UI, does not import a real new source by itself, and
does not create a second app content model. Candidate data is shaped around the
current runtime `Ritual` model in `src/data/rituals/types.ts`.

## Private Artifacts

Source-run artifacts live under:

```text
.moon-table-private/source-runs/<source-id>/
```

That directory is gitignored. It may contain extracted private text, page
images, chunks, AI output, review decisions, and candidate revisions. Do not
commit those artifacts.

## Commands

```bash
npm run source:init -- --source-id <source-id> --pdf <private-pdf-path> --title "<title>" --author "<author>"
npm run source:preprocess -- --source-id <source-id>
npm run source:scan -- --source-id <source-id>
npm run source:classify -- --source-id <source-id>
npm run source:extract -- --source-id <source-id>
npm run source:qa-packet -- --source-id <source-id>
npm run source:state -- --source-id <source-id>
npm run source:review -- --source-id <source-id> --init
npm run source:review -- --source-id <source-id> --list
npm run source:review -- --source-id <source-id> --candidate-id <candidate-id> --decision approved_for_mechanical_import --direct-use yes --recommendation later_review
npm run source:review -- --source-id <source-id> --candidate-id <candidate-id> --instruction "Revise the headline and make the carrier metadata more honest."
```

OpenAI-backed stages require:

```bash
OPENAI_API_KEY=...
```

`OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`.

The PDF preprocess stage uses local Poppler tools:

```text
pdfinfo
pdftotext
pdftoppm
```

## Current MVP Boundary

Implemented:

- `source:init`
- `source:preprocess`
- `source:scan`
- `source:classify`
- `source:extract`
- `source:qa-packet`
- `source:review` with decision recording and AI revision loop

Wired but intentionally stubbed for follow-up:

- `source:import`
- `source:validate-import`
- `source:promote`
- `source:audit`

Those later stages already have state fields and command slots, but they should
be completed before using the pipeline for mechanical runtime imports or
eligibility promotion.

## Review Decisions

Every candidate should end with one disposition:

```text
approved_for_mechanical_import
hold_before_import
needs_source_recheck
needs_packet_correction
candidate_extract_later
reject_architectural
reject_product_fit
duplicate
```

Import approval is separate from target eligibility:

```text
direct_use_target: yes | no | later_review
recommendation_target: yes | no | later_review | context_only
```

A candidate can be approved for import and direct use while remaining out of
Choose with me.
