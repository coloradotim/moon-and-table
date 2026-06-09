# Extraction depth policy

Moon & Table extraction is inventory-first.

The goal is ritual depth and variety, not a small polished sample. Agents must not stop after finding a few strong Ritual candidates. A source extraction packet must account for the source’s usable ritual material, even when only some items become draft Moon & Table Ritual candidates in the first pass.

## Pilot does not mean small sample

In Moon & Table research, a pilot is a process-control term, not a content cap.

A pilot packet may test source handling, schema, product voice, and review workflow, but it must not hide, skip, or discard the rest of the source’s ritual material.

## Required extraction layers

Every approved extraction source requires three layers:

1. **Source rite inventory**
   - A source-facing inventory of rituals, spells, blessings, prayers, prompts, recipes, meditations, invocations, charms, exercises, correspondences-with-action, and other practice material.

2. **Candidate extraction packet**
   - Moon & Table-shaped draft Ritual candidates derived from selected inventory items.

3. **Disposition tracking**
   - Every inventoried source item must receive a disposition:
     - `candidate_extract_now`
     - `candidate_extract_later`
     - `private_excerpt_reference`
     - `source_note_only`
     - `context_only`
     - `hold`
     - `reject`

## Definition of done

An extraction packet is not complete until it includes:

- source sections reviewed;
- source rite inventory;
- candidate research records;
- source notes;
- coverage records;
- rejected / held leads;
- duplicate check;
- gap notes;
- validation checklist;
- remaining extraction backlog.

## Required source rite inventory table

Every extraction packet must include this table:

| Source item | Source pages | Type | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed item types include:

- `ritual`
- `spell`
- `blessing`
- `prayer`
- `invocation`
- `prompt`
- `meditation`
- `recipe`
- `charm`
- `spoken_formula`
- `craft`
- `cleansing`
- `consecration`
- `correspondence_with_action`
- `context_only`

## Required packet metrics

Every extraction packet must report:

```text
source_items_inventoried:
candidate_extract_now:
candidate_extract_later:
private_excerpt_reference:
source_note_only:
context_only:
hold:
reject:
remaining_unreviewed_source_sections:
remaining_extraction_backlog:
```

## Anti-under-extraction rule

Agents must not stop after 8–12 strong candidates if the source contains more usable ritual material.

If the packet becomes too large, split the candidate records into batches. Batching is allowed for delivery and review, but the source rite inventory must still show what remains.

A packet that extracts only a handful of candidates without accounting for the rest of the source is incomplete.

## Batch rule

Batches are allowed for delivery and review.

Batches are not allowed to erase source material.

A batch must include:

- what was extracted now;
- what was intentionally deferred;
- what remains;
- why it remains;
- recommended next batch.

## Review rule

Reviewers must check whether the packet under-extracted the source.

If a source contains many rituals but the packet only extracts a small sample without an inventory/backlog, return it for revision.

## Relationship to private source text policy

This policy works together with:

```text
docs/research/private-source-text-policy.md
```

Agents should inventory and classify exact wording, blessings, prayers, invocations, prompts, recipes, spells, charms, and meditations instead of erasing them.

## Coordinator instruction

No extraction packet should be treated as complete unless it accounts for the source’s ritual material through inventory and disposition tracking.

Depth and variety are required outcomes, not nice-to-have extras.
