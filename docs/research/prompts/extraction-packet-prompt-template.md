# Extraction packet prompt template

Use this template for Moon & Table extraction packets after a source has been approved for extraction.

This template is intentionally inventory-first. Do not remove the inventory requirements.

---

You are working on Moon & Table ritual research.

This is extraction from an approved source.

Use only the assigned source and the source-gate record. Do not search for new sources. Do not use outside summaries. Do not fill gaps from memory.

Follow these canonical policies:

```text
docs/research/private-source-text-policy.md
docs/research/extraction-depth-policy.md
```

## Hard rules

Do not approve runtime use.
Do not mark anything `reviewed`, `recommendable`, `findable`, `directUseEligible`, or `recommendationEligible`.
Do not skip source material just because you already found several strong candidates.
Do not flatten magical practice into generic wellness mechanics.

Words, blessings, prayers, invocations, prompts, meditations, spells, charms, spoken formulas, recipes, and exact questions are valid Ritual mechanics and may be central to a Ritual.

You may extract exact short phrase anchors, exact questions, rite titles, spoken cues, blessing names, invocation cues, and wording anchors when ritually important.

You may closely summarize or rewrite the ritual while preserving the source’s structure, materials, sequence, carrier, purpose, tone, and magical force.

Do not reproduce long copyrighted passages, full rituals, full prayers, full guided meditations, full prompt sets, full recipes, or whole distinctive spell texts.

When exact wording matters, add `sourceTextUse` / `privateExcerptSupport` and point Tim to the source page/section for private review.

## Required extraction layers

You must produce both:

1. **Source rite inventory**
2. **Moon & Table candidate records**

The source rite inventory must list every ritual-like item you find in the approved extraction ranges, including:

- rituals;
- spells;
- blessings;
- prayers;
- invocations;
- prompts;
- meditations;
- recipes;
- charms;
- spoken formulas;
- crafts;
- cleansing practices;
- consecrations;
- correspondence material that includes action;
- source material that should become private excerpt references.

For every source item, assign a disposition:

- `candidate_extract_now`
- `candidate_extract_later`
- `private_excerpt_reference`
- `source_note_only`
- `context_only`
- `hold`
- `reject`

If the packet becomes too large, split the candidate records into batches, but still provide the source rite inventory and remaining extraction backlog.

## Source rite inventory table

Include this table:

| Source item | Source pages | Type | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed item types:

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

Include:

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

## Candidate requirements

Each Ritual candidate must be a whole practice, not a symbol note.

Each candidate needs:

- beginning;
- concrete action or sequence;
- primary carrier;
- primary purpose;
- close/completion;
- source grounding;
- enough presentation copy to preview;
- metadata aligned to Moon & Table’s Ritual model;
- private source text handling when exact words/questions/blessings/prompts matter.

## Default status

Every candidate must default to draft/unavailable/not recommendable.

Use:

```ts
status: "draft"

availability: {
  findable: false,
  directUseEligible: false,
  recommendationEligible: false,
}

recommendationMetadata: {
  eligibility: {
    recommendable: false,
    missing: ["human_review", "source_verification"],
  },
}
```

## Source text support

Where relevant, include:

```ts
sourceTextUse?: {
  exactPhraseAnchors?: string[];
  exactQuestions?: string[];
  exactSpokenCues?: string[];
  privateExcerptRecommended: boolean;
  excerptType?:
    | "blessing"
    | "prayer"
    | "invocation"
    | "prompt"
    | "meditation"
    | "recipe"
    | "spell"
    | "charm"
    | "spoken_formula"
    | "ritual_sequence"
    | "other";
  sourceLocation: string;
  whyExactTextMatters?: string;
  agentUseLimit:
    | "short_phrases_only"
    | "close_paraphrase_allowed"
    | "mechanics_only"
    | "do_not_use";
  storagePolicy: [
    "private_app_only",
    "cited",
    "not_public_repo",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
}
```

## Output format

Return one Markdown packet:

```text
# Ritual candidate packet: [Source / packet name]
```

Include:

1. Packet metadata.
2. Assignment.
3. Allowed source.
4. Source policy note.
5. Disallowed/limited source material.
6. Source sections used.
7. Source rite inventory.
8. Packet metrics.
9. Coverage summary.
10. Candidate research records.
11. Source notes.
12. Coverage records.
13. Rejected / held leads.
14. Duplicate check.
15. Gap notes.
16. Remaining extraction backlog.
17. Validation checklist.
18. Open questions / Tim decisions.

Do not produce a small sample and stop. The inventory must account for the source’s usable ritual material.
