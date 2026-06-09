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

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed source location precision values:

- `exact_page`
- `page_range`
- `chapter_range`
- `needs_tightening`

Allowed research use values:

- `ritual_candidate`
- `product_followup_pattern`
- `both`
- `source_note_only`
- `context_only`
- `hold`
- `reject`

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
items_with_private_excerpt_recommended:
source_note_only:
context_only:
hold:
reject:
remaining_unreviewed_source_sections:
remaining_extraction_backlog:
```

`private_excerpt_reference` counts source items whose main disposition is private excerpt reference.

`items_with_private_excerpt_recommended` counts any inventoried source item or candidate where exact prayers, blessings, spoken cues, prompts, recipes, meditations, charms, spells, or distinctive wording should be reviewed privately by Tim, even if the item’s disposition is also `candidate_extract_now` or `candidate_extract_later`.

## Coverage accounting rule

Only primary carrier/purpose cells count toward coverage satisfaction.

Secondary carriers and purposes may be listed when genuinely source-supported, but they must not be used to claim a coverage cell is solved.

Do not let a rich Ritual candidate make the coverage matrix lie. A source item that touches a doorway, a candle, words, and a vessel may still have only one primary carrier and one primary purpose for recommendation-driving coverage.

## Variant / split ledger

Every extraction packet must include a variant / split ledger when a source item could reasonably support multiple future Ritual variants or product patterns.

Use this format:

```text
Variant / split candidates:
- keep together now:
- split later:
- reason:
- trigger for split:
```

Use the ledger instead of bloating one candidate or silently losing future variants.

Examples include:

- house blessing vs room blessing;
- threshold wash vs whole-house circuit;
- kitchen candle vs oil lamp;
- cauldron vs bowl/jar;
- spell bottle variants;
- food awareness vs recipe-specific rituals;
- grimoire entry as ritual vs product follow-up.

## Ritual candidate vs product follow-up pattern

Some source-backed practices may be Ritual candidates, product follow-up patterns, or both.

Extraction packets must explicitly classify this using:

```text
researchUse:
  - ritual_candidate
  - product_followup_pattern
  - both
```

A product follow-up pattern may be useful for Moon & Table without being a runtime Ritual. Do not force it into the Ritual model merely to preserve it.

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

Reviewers must also check:

- whether primary coverage claims are inflated by secondary support;
- whether private excerpt recommendations are counted even when the item is also a candidate;
- whether broad candidates need variant/split tracking;
- whether rough source locations are marked `needs_tightening` or `chapter_range` rather than treated as exact page support;
- whether product follow-up patterns have been wrongly forced into Ritual candidate status.

## Runtime / schema normalization wall

Extraction is not runtime integration.

No extraction packet may mark any candidate reviewed, recommendable, findable, direct-use eligible, recommendation eligible, or runtime-ready.

Every extraction candidate must remain research-only until later human review and source verification:

```text
status: draft
findable: false
directUseEligible: false
recommendationEligible: false
recommendable: false
missing: ["human_review", "source_verification"]
```

Schema normalization belongs in a later issue after human review. Do not use extraction to quietly import research candidates into runtime data.

## Relationship to private source text policy

This policy works together with:

```text
docs/research/private-source-text-policy.md
```

Agents should inventory and classify exact wording, blessings, prayers, invocations, prompts, recipes, spells, charms, and meditations instead of erasing them.

## Coordinator instruction

No extraction packet should be treated as complete unless it accounts for the source’s ritual material through inventory and disposition tracking.

Depth and variety are required outcomes, not nice-to-have extras.
