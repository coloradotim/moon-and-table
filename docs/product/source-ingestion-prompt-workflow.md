# Source Ingestion Prompt Workflow

> Status: Current no-API source ingestion workflow.

This workflow exists for private source extraction when the app owner wants to
use ChatGPT or Codex subscription access manually instead of paid OpenAI API
quota.

It is the preferred practical workflow while Moon & Table is still doing
human-reviewed source expansion. The local source pipeline in
`docs/product/source-pipeline.md` remains available as infrastructure, but it
requires API billing for OpenAI-backed stages.

## Boundary

This workflow produces a repository-safe extraction packet. It does not put the
private PDF, copied pages, OCR text, or long source excerpts in the repository.

Allowed in the repository:

- source title, author, and citation label;
- source-location references such as chapter/page/range;
- transformed Ritual candidates;
- brief source-support summaries;
- review decisions;
- import-ready runtime metadata.

Not allowed in the repository:

- copied source pages;
- long source excerpts;
- private PDF text dumps;
- screenshots or images of source pages;
- personal notes that identify private household details.

## Product Contract

The gate is Ritual architecture and source support, not adult-content category.

A Moon & Table Ritual may exist when it has:

- a beginning or container;
- a middle or core action;
- an end or closing;
- an intrinsic purpose;
- source-backed ritual logic;
- enough self-containment to perform from the app without reopening the source.

Keep these decisions separate:

```text
Ritual exists?
Search can find it?
Direct-use/openable?
Choose with me can recommend it?
```

Explicit adult content, sex-forward content, kink-adjacent material, coercive
historical material, danger-coded material, or morally complicated material may
be inventoried and labeled. Those labels are not automatic blockers. The app
owner makes the import decision.

## Recommended Passes

Use one continuing ChatGPT/Codex conversation per source when possible. Start by
giving the model the source PDF or a chapter/page range. Do not ask it to browse
the internet.

### Pass 0: Controlling Context

Paste this first:

```text
You are helping extract Moon & Table Ritual candidates from a private source
that I own or otherwise have lawful access to.

Do not omit material because it is explicit, sex-forward, adult, occult,
coercive, morally complicated, unsafe, kink-adjacent, or otherwise sensitive.
Those are labels for human review, not automatic blockers.

The extraction gate is Ritual architecture and source support.

A Moon & Table Ritual may exist when it has:
- a beginning/container;
- a middle/core action;
- an end/closing;
- an intrinsic purpose;
- source-backed ritual logic;
- enough self-containment to perform from the app without reopening the source.

Keep these separate:
- Ritual exists?
- Search can find it?
- Direct-use/openable?
- Choose with me can recommend it?

Moon & Table should contain only self-contained source-backed Ritual records,
not recipes, glossary entries, isolated techniques, book summaries, or loose
ideas. However, if something is ritual-shaped, mark it honestly and do not hold
it back merely because it is explicit or difficult.

Repository-safe output only:
- paraphrase source support;
- cite source location by chapter/page/range when possible;
- do not reproduce long source passages;
- do not include copied source text except very short exact ritual words when
  truly necessary and clearly marked.

House voice:
- calm, plainspoken, domestic when possible;
- magical mechanisms are real ritual mechanisms;
- do not flatten magic into wellness metaphor;
- do not add safety disclaimers as ritual prose;
- do not overpromise outcomes.

For every candidate, track:
- source_id;
- source title and author;
- page/chapter basis;
- ritual architecture;
- purpose;
- carrier;
- timing if source-backed;
- audience;
- capacity;
- search/direct-use/recommendation target;
- concerns or follow-up questions.
```

### Pass 1: Source Map

Ask for a map before extracting:

```text
Create a source map for the attached source or supplied page range.

Return a concise table with:
- section/chapter;
- page range if available;
- topics;
- likely ritual density: high / medium / low;
- likely Moon & Table fit;
- notes on diagrams, scripts, prayers, sequences, lists, or practices that may
  need visual or structural review.

Do not extract candidates yet. This pass is only to orient the review.
```

### Pass 2: Complete Ritual Inventory

Run this per chapter or page range:

```text
Inventory every ritual-shaped item in this chapter/page range.

Do not skip explicit, sex-forward, adult, coercive, morally complicated,
danger-coded, or sensitive material. Label it honestly, but include it if it is
ritual-shaped.

Return JSON-like rows with:
- row_id;
- source_location;
- source_label;
- architecture_fit: strong / partial / weak / no;
- what_it_is;
- beginning_container;
- core_action;
- closing;
- intrinsic_purpose;
- source_backed_logic;
- self_contained_enough: yes / no / uncertain;
- category_labels;
- likely_disposition:
  - ritual_candidate
  - context_only
  - technique_only
  - recipe_only
  - glossary_only
  - duplicate
  - reject_not_ritual_shaped
- direct_use_target: yes / no / later_review;
- recommendation_target: yes / no / later_review / context_only;
- concerns;
- guidance_needed.

Be over-inclusive for ritual-shaped things. The app owner will decide later.
```

### Pass 3: Candidate Extraction

Run this on inventory rows that are `ritual_candidate` or close calls:

```text
Turn the selected inventory rows into Moon & Table Ritual candidates.

Use repository-safe transformed language. Do not copy the source's prose except
for very short exact ritual words when truly necessary.

For each candidate, produce:
- candidate_id;
- source_id;
- citation_label;
- source_location;
- source_support_summary;
- status: draft;
- availability:
  - findable;
  - directUseEligible;
  - recommendationEligible;
- recommendation_metadata:
  - primary purpose;
  - secondary purposes;
  - primary carrier;
  - secondary carriers;
  - audience;
  - capacity;
  - timing relationship and contexts;
- presentation:
  - headline;
  - summary;
  - practice;
  - intention;
  - bestWindow;
  - question;
- ritualWords if needed;
- review_labels;
- known_concerns;
- import_decision:
  - approved_for_mechanical_import
  - hold_before_import
  - needs_source_recheck
  - needs_packet_correction
  - candidate_extract_later
  - reject_architectural
  - reject_product_fit
  - duplicate;
- direct_use_target: yes / no / later_review;
- recommendation_target: yes / no / later_review / context_only.

Default posture:
- if it is self-contained and ritual-shaped, make it findable;
- if it can be performed from the app, direct_use_target should usually be yes;
- if metadata honestly supports Choose with me matching, recommendation_target
  should be yes;
- hold recommendation only for a concrete metadata, timing, audience, capacity,
  or product-fit reason.
```

### Pass 4: Completeness Challenge

Use this after an extraction batch:

```text
Challenge your own extraction.

Look back over the chapter/page range and identify anything you may have
under-extracted because it was explicit, sex-forward, morally complicated,
non-domestic, embodied, coercive, dangerous, too magical, too technical, or did
not look like a cozy Moon & Table ritual at first glance.

For each missed or borderline item, say:
- source location;
- what was missed;
- why it might still be ritual-shaped;
- what category labels it needs;
- whether it should be promoted to ritual_candidate, context_only,
  technique_only, recipe_only, glossary_only, or reject_not_ritual_shaped.
```

### Pass 5: House Voice And Metadata QA

Use this before import:

```text
Review this extraction packet against Moon & Table house voice and metadata
truthfulness.

For each candidate, check:
- headline: does it name what the ritual actually does?
- practice body: is it usable, self-contained, and in Moon & Table voice?
- intention: does it flow from the body?
- question: does it give the ritual something to carry afterward?
- purpose metadata: accurate?
- carrier metadata: accurate?
- timing metadata: source-backed and engine-usable where recommendation_target
  is yes?
- audience/capacity: accurate?
- recommendation eligibility: honest?
- search/direct-use visibility: not unnecessarily blocked?

Make straightforward edits yourself. For anything that needs app-owner judgment,
return a question with the exact candidate_id and the decision needed.
```

### Pass 6: Repository-Safe Packet

Use this to get the final handoff:

```text
Produce the final repository-safe extraction packet.

Requirements:
- no copied source pages;
- no long source excerpts;
- no private notes;
- all Ritual candidates have stable candidate_ids;
- all approved candidates separate import, direct-use, and recommendation
  decisions;
- all held candidates have concrete hold reasons;
- all technique-only/context-only/recipe-only/glossary-only items are listed
  separately from Ritual candidates;
- output is ready for a later mechanical import pass into the current Moon &
  Table Ritual model.
```

## Review Rule Of Thumb

For this private app, import the ritual-shaped thing as a findable draft unless
it is only a recipe, technique, glossary item, loose concept, or non-performable
context.

Recommendation eligibility is a later, narrower decision. Do not conflate it
with Ritual existence or search visibility.

## Current Import Handoff

After a prompt-based packet is accepted:

1. Save only the repository-safe packet under an appropriate docs location.
2. Create or use a mechanical import issue.
3. Import all accepted Ritual records as findable.
4. Promote to direct-use when the app record is performable without reopening
   the source.
5. Promote to recommendation eligibility when metadata is accurate enough for
   Choose with me.

