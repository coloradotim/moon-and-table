# Source Packet QA Report

Status: `qa_complete_import_prep_ready_for_owner_review`  
PR: #433  
Scope: eight no-API extraction packets for owner review before import.

## Executive Finding

The packet set is strong enough for owner content review. A normalization/import-prep manifest has been added so the next import issue can consume the packet prose without guessing at runtime fields.

The most important product boundary is intact: ritual existence, search/direct-use visibility, and recommendation eligibility remain separate. Adult, explicit, adversarial, spirit, target-linked, medical-adjacent, and high-capacity material is visible in repository-safe paraphrase rather than silently excluded.

Import-prep result:

- Approved candidates normalized: 291
- Findable/direct-use after import: 291
- Recommendation-eligible now: 260
- Recommendation-held pending gate/owner decision: 31
- Normalization manifest: `docs/research/ritual-candidates/source-packet-import-prep-manifest.md`

## Mechanical QA

| Packet | Candidate count | Count status | User-facing field status |
| --- | ---: | --- | --- |
| Herstik, _Sacred Sex_ | 69 | matches import notes | headline, summary, practice, intention, question present |
| Miller, _Sex, Sorcery, and Spirit_ | 22 | matches import notes | headline, summary, practice, intention, question present |
| Carrellas, _Urban Tantra_ | 55 | matches import notes | headline, summary, practice, intention, question present |
| Madame Pamita, _The Book of Candle Magic_ | 42 | matches import notes | headline, summary, practice, intention, question present |
| Henri Gamache, _The Master Book of Candle Burning_ | 24 | matches import notes | headline, summary, practice, intention, question present |
| Dykes/Gibson, _Astrological Magic_ | 26 | matches import notes | headline, summary, practice, intention, question present |
| Tess Whitehurst, _Magical Housekeeping_ | 27 | matches import notes | headline, summary, practice, intention, question present |
| Jennie Blonde, _Hearth and Home Witchcraft_ | 26 | matches import notes | headline, summary, practice, intention, question present |

Checks performed:

- candidate headings against approved-count notes;
- required basic user-facing fields per candidate;
- obvious artifact strings and watermark leakage;
- whitespace/diff check;
- high-risk label scan for explicit/adult/spirit/target-linked/adversarial/medical-adjacent records.

## Import-Prep Manifest

The packets themselves remain the canonical prose artifacts. The import-prep
manifest is the normalized runtime mapping layer.

The manifest supplies:

- per-candidate `ritualizationType`;
- importable availability defaults;
- enum-ready purpose/carrier/capacity/audience/timing fields;
- recommendation eligibility/status;
- missing gates for recommendation-held records;
- a best-window basis for candidates whose packet prose did not already include one.

The later mechanical import should consume the packet prose for runtime
presentation and source grounding, then consume the manifest for enum metadata,
availability, timing, and recommendation eligibility.

## Content QA

### Recommendation Eligibility

Recommendation target language is intentionally conservative but inconsistent:

- Herstik uses mostly `yes_constrained`.
- Miller and Carrellas use `later_review` for many explicit, spirit, fluid, BDSM, group, grief, or medical-adjacent records.
- Pamita uses `later_review` for hidden, spirit, target, multi-day, hot-wax, numerology, jar, and prosperity cases.
- Gamache and Whitehurst use `no` for direct-use-only adversarial, target-linked, spirit, medical-adjacent, or house-sale records.
- Dykes/Gibson and Blonde mostly use `yes`, with constraints in labels/notes.

For import, use the manifest's separated fields:

- `findable: true` for all approved candidates;
- `directUseEligible: true` for all approved candidates;
- `recommendationEligible: true | false`;
- `recommendationReviewStatus: ready | constrained | owner_review | hold`;
- constraint labels for adult/private, high-capacity, explicit, spirit, target-linked, adversarial, medical-adjacent, multi-day, timing-required, and group.

### House Voice

The strongest packets are Herstik, Carrellas, Gamache, Whitehurst, Blonde, and Dykes/Gibson. They mostly read as Moon & Table ritual summaries rather than source summaries.

Minor house-voice repairs made during QA:

- removed generic safety-disclaimer texture from several candle/home practice bodies;
- changed Blonde's office productivity charm to a work-space focus charm;
- updated the QA handoff status and scope from six packets to eight.

Remaining watch areas for owner review:

- Dykes/Gibson ceremonial rites are accurate but compact; import may need shorter runtime presentation bodies.
- Pamita layout candidates are useful but some may feel abstract unless import metadata makes their purpose/carrier searchable.
- Carrellas and Herstik adult/body records are intentionally explicit in labels and sometimes direct in practice; owner should decide how much of that remains visible in normal search cards versus detail pages.
- Gamache adversarial records are preserved honestly; owner should decide if they need a distinct search filter such as adversarial/target-linked before import.

## Packet-Specific Notes

### Herstik

Coverage looks broad and no adult lane appears silently suppressed. The packet is strong for owner review. Mechanical import needs normalization of `yes_constrained` and adult/private/high-capacity constraints.

### Miller

Coverage preserves spirit, fluid, BDSM, and appendix rites. The `later_review` target should not mean "do not import"; it should map to findable/direct-use with recommendation held unless owner promotes specific records.

### Carrellas

Coverage is broad and appropriately includes explicit solo, partnered, group, pain, grief, and medical-adjacent material. Many `later_review` records are likely importable as findable/direct-use. Recommendation eligibility should be decided through constraint metadata, not by re-extraction.

### Pamita

Very strong domestic/candle coverage. The main import risk is over-recommending hidden, target-linked, jar, hot-wax, and multi-day work before the selector has gates. Search/direct-use should remain broad.

### Gamache

The packet correctly keeps adversarial and coercive candle exercises visible rather than sanitizing them. Recommendation holds make sense until adversarial/target-linked gates exist.

### Dykes/Gibson

The packet captures all named elemental, planetary, zodiacal, and culmination rites. Timing metadata matters more here than in any other packet. Import should preserve sign, planet, day/hour, triplicity, and high-capacity prerequisites.

### Whitehurst

The packet is highly aligned with Moon & Table's home magic lane. A few target-linked/spirit/medical-adjacent records should be findable/direct-use while held from recommendation pending gates.

### Blonde

The packet is useful for low-capacity home/kitchen/altar routines. Recipe/support separation is mostly correct. The main import task is avoiding wellness/productivity flattening and preserving household magic.

## QA Recommendation

Do not merge this PR as an import-ready artifact.

Do merge it, after owner approval, as:

- no-API/manual extraction workflow documentation;
- repository-safe extraction packets;
- owner review source packets;
- a QA handoff for normalization/import-prep.

Then create a follow-up issue:

```text
Normalize approved no-API source packets into mechanical Ritual import schema
```

That issue should not reopen source extraction unless owner review marks a missing candidate. Its job is to convert reviewed packet content into enum-ready, importable records while preserving findable/direct-use breadth and applying recommendation eligibility separately.
