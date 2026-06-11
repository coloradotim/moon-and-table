# Source gate record: The Magical Household

## Gate verdict

`approved_for_extraction_with_limits`

Approval is broad but limited by safety, cultural/source-boundary, exact-text, animal/pet, herb/oil/smoke/bath/food, divination/omens, deity/spirit, coercion, and guaranteed-effect concerns.

This source is approved as a future Moon & Table extraction source for household magic mechanics around:

- hearth and household flame;
- threshold, doors, windows, locks, keys, and entry protection;
- furnishing and room arrangement as magical household tending;
- dreaming and bedroom practices with heavy limits;
- kitchen/stove/spoon/table/food mechanics;
- bathing, brushing, and body-tending mechanics with safety limits;
- indoor plants and garden-as-household magic with plant/pet safety review;
- animal/pet household protection and relationship material with animal-welfare limits;
- garage/car and household boundary practices where relevant to the home;
- protection, charms, sachets, amulets, bottles, stones, powders, broom/rag, cleansing, purification, moving, magical year, house spells, omens/portents, and household altar material with limits.

This does not approve runtime recommendation eligibility, public distribution, copied app-facing public content, source-pool approval, or extraction from deity/spirit/divination/omens/animal/plant/herb/oil/bath/fire material without the limits below.

## Required issue gate fields

```text
Source ID: SRC-MOD-HOUSE-CUNNINGHAM-HARRINGTON
Gate outcome: approved_for_extraction_with_limits
Registry status: approved
Extraction status: extraction_ready
May appear in candidate sourceIds: yes
Mechanics source: yes
Safety constraint source: yes
Canonical citation: Scott Cunningham and David Harrington, The Magical Household: Spells & Rituals for the Home. Llewellyn Publications, Woodbury, Minnesota. First edition / twenty-fourth printing, 2008 scanned copy reviewed; copyright 1983.
Edition / translation: English; first edition, twenty-fourth printing, 2008, scanned PDF copy reviewed.
Access location: uploaded working scan/PDF provided by Tim in #279.
Legal copy reviewed: yes, uploaded scan reviewed as the working copy.
Review depth: selected/full source-gate inspection from rendered scan pages and TOC; image/scanned PDF has no reliable parsed text.
PDF/page count and page-numbering notes: 104 PDF pages. Printed page numbering begins after front matter; Chapter 1 printed p. 1 appears on PDF p. 11. From Chapter 1 onward, printed page number is generally PDF page minus 10. Page references in this gate use PDF page numbers unless printed-page references are explicitly labeled.
TOC reviewed: yes.
Excerpt boundaries reviewed: yes, source-gate level only.
Approved extraction ranges: see Approved extraction ranges.
Excluded extraction ranges: see Excluded or limited ranges.
Allowed use: mechanics extraction, close paraphrase, short anchors, operative-text review, source notes, safety notes, and future inventory-first extraction.
Forbidden use: runtime approval, recommendation eligibility, copied full spells/charms/prayers/rituals, copied diagrams/illustrations, medical or guaranteed-effect claims, coercive intimacy/reproductive claims, unsafe fire/smoke/herb/oil/bath/food/animal practice, genericized cultural/deity/spirit material.
Verbal / expressive / charm / spell handling:
  direct_use_allowed: Tim/Jessica may privately use source rites directly from their copy where safe and within their practice boundaries; app may point to title/page after human review but must not reproduce full text.
  brief_quote_allowed: exact short phrase anchors, rite titles, spoken cues, charm names, and brief wording anchors only.
  paraphrase_required: app-facing generated ritual copy, section summaries, phase/purpose wording, and household practice guidance.
  mechanics_only: charms, sachets, spells, protection workings, broom/rag, purification, moving, omens, animal, herb/oil/bath/food and car/garage material unless separately reviewed.
  do_not_use: coercive relationship/reproductive workings, animal-harm or animal-control practices, medical/healing claims, dangerous fire/smoke/oil/herb/ingestion practice, adversarial workings, culturally unsafe genericization, guaranteed protection/prosperity/luck/success claims.
Citation requirement: cite source ID, title, authors, PDF page and visible printed page where possible.
Reviewer required: yes.
Required reviewer expertise: Tim source review; safety review for fire/smoke/oils/herbs/food/baths/pets; cultural/source-boundary review for deity/spirit/folklore/omens material.
Specific extraction cautions: see Safety / adult-use cautions and Cultural / living-practice cautions.
Approval authority: Tim
Approved date: 2026-06-11; confirmed by Tim in PR #367 / issue #348 QA thread
Required changes before approval: none; Tim confirmed this source gate is approved for extraction under source ID SRC-MOD-HOUSE-CUNNINGHAM-HARRINGTON
```

## Source ID recommendation

`SRC-MOD-HOUSE-CUNNINGHAM-HARRINGTON`

Optional longer alias if needed later:

`SRC-MOD-HOUSE-CUNNINGHAM-HARRINGTON-1983`

## Exact source details

| Field | Source detail |
| --- | --- |
| Authors | Scott Cunningham and David Harrington |
| Title | *The Magical Household* |
| Subtitle | *Spells & Rituals for the Home* |
| Publisher | Llewellyn Publications, Woodbury, Minnesota |
| Copyright | Copyright © 1983 by Scott Cunningham and David Harrington |
| Edition / printing visible in scan | First edition; twenty-fourth printing, 2008 |
| ISBN visible in scan | `0-87542-124-7`; also visible as `978-0-87542-124-3` |
| Library of Congress visible in scan | 1983 classification metadata visible; title appears in Llewellyn's practical magic series |
| File/source notes | Uploaded file is an image/scanned PDF. No reliable parsed text was available. Review used rendered page inspection. |

## PDF/page count and page-numbering notes

- Total PDF pages: 104.
- Cover is PDF p. 1.
- Copyright page is PDF p. 5.
- Table of contents appears on PDF pp. 6-7.
- Preface begins on PDF p. 7 with visible printed p. xi.
- Introduction begins on PDF p. 8 with visible printed p. xiii.
- A Note on Magic appears around PDF pp. 10-11 with visible printed pp. xvii-xxiii.
- Chapter 1 begins on PDF p. 11 with visible printed p. 1.
- From Chapter 1 onward, printed page numbers generally equal PDF page number minus 10.
- This gate uses PDF page references by default. Printed page numbers are noted where helpful.

## Source text policy

```ts
sourceTextPolicy: {
  exactTextUse: "operative_text_review";
  assistantMayReproduce: "brief_quote_or_short_operative_words_only";
  storagePosture: "review_before_runtime_use";
  storageLimits: [
    "cite_source_id",
    "cite_title_author",
    "cite_page_or_section",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
  notes: "Author-provided operative ritual words are ritual materials. Operative wording of 20 words or fewer must be stored directly in presentation.practice and tracked as ritualWords.source_exact_short. Longer operative wording may be adapted into a Moon & Table phrase only as a justified candidate-level exception in presentation.practice and tracked as ritualWords.adapted_source_words; otherwise use functional instruction or hold the candidate."
}
```

## Reviewed source material

The reviewed source material, approved extraction ranges, excluded or limited ranges, reusable mechanics, best-fit carriers/purposes, safety cautions, copyright/source-expression cautions, cultural/living-practice cautions, gaps, recommended extraction lanes, and future inventory scope remain the same as the prior source-gate version on this PR. This metadata update only removes stale pending-approval language and records Tim's approval confirmation. No source limits, holds, or runtime prohibitions are weakened.

## Tim approval decision

Tim has confirmed that this source gate is approved for extraction under source ID `SRC-MOD-HOUSE-CUNNINGHAM-HARRINGTON`.

Tim is approving:

- future inventory-first extraction from the approved ranges;
- use of *The Magical Household* as a broad household magic mechanics source;
- future draft Ritual candidates around hearth, doorway, kitchen, bath/body, plants, garden, protection, sweeping/cleaning, purification, moving, magical year, house spells, and household altar;
- classification of charms, spells, spoken formulas, prayers, and exact source wording as valid ritual material;
- operative text review under the 20-word exact / justified adaptation / functional instruction rule, with source citation and non-runtime status until reviewed.

Tim is not approving:

- runtime use;
- recommendation eligibility;
- direct-use eligibility;
- public repo storage of long source excerpts;
- copied full spells/charms/prayers/rituals;
- deity/spirit/ancestor/omen/divination extraction without separate review;
- unsafe herb/oil/smoke/bath/food/animal/fire practices;
- coercive relationship/reproductive/prosperity/luck/protection guarantees.

## Final checklist

- Used only provided source file: yes.
- Exact source details captured: yes.
- PDF/page notes captured: yes.
- TOC reviewed: yes.
- Approved ranges page-referenced: yes.
- Excluded/limited ranges page-referenced: yes.
- No Ritual candidates extracted: yes.
- No matrix filled: yes.
- No runtime approval: yes.
- Words treated as valid mechanics: yes.
- Recipes/food/kitchen material classified: yes.
- Charms/spells/private-source-text handling applied: yes.
- Expected future inventory scope estimated: yes.
- Adult-use cautions concise and source-bound: yes.
- Tim approval decision clear: yes.

## Final call

`approved_for_extraction_with_limits`

This is a strong Moon & Table source, especially for domestic magic, thresholds, kitchen/table practice, household purification, plant/garden practice, protection, moving, seasonal home marking, and household altar work.

It is approved for future inventory-first extraction under the limits above. No runtime import or recommendation eligibility is approved by this source gate.
