# Source-gate prompt template

Use this template before extraction begins for any new source.

Source-gate review decides whether a source can be used for future Moon & Table extraction, and if so, which ranges and handling rules apply.

Do not extract Ritual candidates during source gate.

---

You are completing source-gate review for Moon & Table using the provided source file.

This is source-gate only.

Do not extract Ritual candidates.
Do not fill the coverage matrix.
Do not approve runtime use.
Do not create TypeScript candidate objects.

Use only the provided source file. Do not rely on outside summaries except for bibliographic clarification.

Follow:

```text
docs/research/private-source-text-policy.md
docs/research/extraction-depth-policy.md
```

## Purpose of this source gate

Decide whether this source can be used for future Moon & Table extraction, and if so, exactly which sections/ranges may be used, how they may be used, and what must be excluded or limited.

A source can be approved narrowly. It does not need to support every carrier or every purpose.

## Text and ritual language posture

Words, prayers, blessings, invocations, prompts, meditations, spells, charms, and recipes are valid Ritual mechanics and may be central to a Ritual.

Do not erase or downgrade verbal, recipe, prayer, blessing, invocation, spell, prompt, or meditation material. Classify it.

Research agents should not reproduce long copyrighted passages in generated packets. However, exact short phrase anchors, exact questions, rite titles, spoken cues, blessing names, invocation cues, and wording anchors may be extracted when ritually important.

When exact wording is important, mark it for Tim private excerpt review with source page/section.

## Required tasks

1. Identify exact edition/publication details from the uploaded file.
2. Identify PDF/page count and page-numbering notes.
3. Record TOC and major inspected sections.
4. Identify reusable Ritual mechanics.
5. Identify exact source text areas that may matter ritually.
6. Identify excluded or limited material.
7. Separate mechanics from authored wording, scripts, prayers, spells, meditations, recipes, prompts, diagrams, and distinctive sequence language.
8. Classify verbal/expressive/recipe handling:
   - `use_directly_from_source`
   - `private_excerpt_allowed`
   - `private_recipe_excerpt_allowed`
   - `brief_quote_allowed`
   - `close_paraphrase_allowed`
   - `paraphrase_required`
   - `mechanics_only`
   - `do_not_use`
9. Give concise adult-use cautions only where they matter.
10. Identify likely supported carriers:
   - `candlelight`
   - `table`
   - `doorway`
   - `plant`
   - `words`
   - `vessel`
   - `body`
11. Identify likely supported purposes:
   - `steadying`
   - `opening`
   - `releasing`
   - `tending`
   - `connecting`
   - `voicing`
   - `marking`
   - `blessing`
   - `protecting`
   - `remembering`
12. Identify likely high-yield extraction lanes for a future extraction issue.
13. Identify sections that should remain context-only and never become direct extraction material.
14. Identify likely source inventory scope: estimate how many source rite inventory items a future extraction packet should expect.

## Output required

Return:

# Source gate record: [Source name]

## Gate verdict

Use one:

- `approved_for_extraction`
- `approved_for_extraction_with_limits`
- `keep_candidate`
- `hold`
- `reject`

If approved, state whether approval is broad or limited to specific sections/carriers/purposes.

## Source ID recommendation

Recommend a stable source ID.

## Exact source details

Include:

- author;
- title;
- subtitle;
- publisher;
- publication year;
- edition/printing if available;
- ISBN;
- copyright page details;
- file/source notes.

## PDF/page count and page-numbering notes

Include:

- total PDF pages;
- printed page numbering;
- mismatches between PDF page numbers and printed page numbers;
- how all page references in this gate record should be interpreted.

## Source text policy

Include the source’s specific exact-text handling using:

```ts
sourceTextPolicy: {
  exactTextUse: "private_excerpt_allowed";
  assistantMayReproduce: "brief_quote_only";
  timManualEntry: "allowed_for_private_app";
  storageLimits: [
    "private_app_only",
    "not_public_repo",
    "not_public_runtime_content",
    "cite_source_id",
    "cite_title_author",
    "cite_page_or_section",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
  notes: "Tim may manually enter exact source wording from his copy for private household use. Research agents should identify important exact wording and source location but should not reproduce long copyrighted passages."
}
```

## Reviewed source material

Use a table:

| PDF pages | Printed pages if visible | Section | Reviewed material | Gate decision | Notes |
| --- | --- | --- | --- | --- | --- |

## Approved extraction ranges

Use page/chapter references.

For each approved range, specify:

- approved mechanics;
- exact-text/private-excerpt opportunities;
- approved carriers;
- approved purposes;
- allowed use;
- required adaptation level;
- key cautions.

## Excluded or limited ranges

Use page/chapter references.

For each excluded/limited range, specify why:

- authored wording requires private excerpt handling;
- exact spell/prayer/meditation/prompt/recipe handling;
- deity/cosmology issue;
- medical/safety issue;
- cultural/living-practice issue;
- not a Ritual mechanics source;
- outside Moon & Table scope.

## Reusable mechanics

Use this table:

| Mechanic | Source section/pages | Carrier(s) | Purpose(s) | Use classification | Notes |
| --- | --- | --- | --- | --- | --- |

## Personally usable source material

List source rituals, blessings, prompts, meditations, recipes, invocations, or spells that Tim/Jessica could use directly from the source.

| Source rite / material | Source pages | Use type | Likely carriers | Likely purposes | Exact text importance | Notes |
| --- | --- | --- | --- | --- | --- | --- |

Use type:

- `use_directly_from_source`
- `private_excerpt_allowed`
- `private_recipe_excerpt_allowed`
- `short_excerpt_possible`
- `paraphrase_for_app`
- `mechanics_only`
- `do_not_use`

## Best-fit carriers

| Carrier | Support level | Source basis | Notes |
| --- | --- | --- | --- |

Support level:

- `strong`
- `moderate`
- `thin`
- `absent`

## Best-fit purposes

| Purpose | Support level | Source basis | Notes |
| --- | --- | --- | --- |

Support level:

- `strong`
- `moderate`
- `thin`
- `absent`

## Safety / adult-use cautions

Keep concise. Do not overbuild safety.

## Copyright / source-expression cautions

Be explicit about what may be privately excerpted and what agents should not reproduce wholesale.

## Cultural / living-practice cautions

Identify only what actually appears in the source.

## Gaps / weak areas

Identify carriers/purposes this source does not support well.

## Recommended extraction lanes

| Future extraction lane | Source sections/pages | Likely carriers | Likely purposes | Why high-yield | Cautions |
| --- | --- | --- | --- | --- | --- |

Do not create candidate rituals. Just name lanes.

## Expected future inventory scope

Estimate likely source rite inventory size for extraction:

```text
expected_source_items_to_inventory:
likely_candidate_extract_now:
likely_candidate_extract_later:
likely_private_excerpt_references:
likely_context_only_or_source_notes:
likely_hold_or_reject:
```

## Tim approval decision

State exactly what Tim would be approving.

## Final checklist

- Used only provided source file:
- Exact source details captured:
- PDF/page notes captured:
- Approved ranges page-referenced:
- Excluded/limited ranges page-referenced:
- No Ritual candidates extracted:
- No matrix filled:
- No runtime approval:
- Words treated as valid mechanics:
- Recipes classified:
- Private source text policy applied:
- Expected future inventory scope estimated:
- Adult-use cautions concise:
- Tim approval decision clear:
