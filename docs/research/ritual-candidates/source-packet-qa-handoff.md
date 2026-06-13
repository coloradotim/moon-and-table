# Source Packet QA Handoff

Status: `qa_reviewed_import_prep_ready_for_owner_review`
PR: #433  
Scope: no-API/manual extraction workflow plus eight repository-safe extraction packets.

## QA Status

These packets are ready for owner review as repository-safe extraction packets,
with an import-prep manifest now added for mechanical normalization:

```text
docs/research/ritual-candidates/source-packet-import-prep-manifest.md
```

The manifest normalizes all approved candidates into runtime enum fields,
availability decisions, timing relationships, and recommendation eligibility.
It keeps every approved candidate findable and direct-use eligible, while
holding only the records whose recommendation lane needs a selector gate or
owner-review decision that the current model cannot express cleanly.

Before import, the mechanical import issue should:

- consume the packet prose for headline, practice, intention, question, and source grounding;
- consume the import-prep manifest for `ritualizationType`, enum metadata, availability, timing, and recommendation eligibility;
- assemble `whyThisFits` and `howThisWasChosenIngredients` from the manifest plus packet source-support lines;
- preserve adult/private/explicit/spirit/target-linked/adversarial/high-capacity labels as search/review metadata, not import blockers.

Import-prep result:

- Approved candidates normalized: 291
- Findable/direct-use after import: 291
- Recommendation-eligible now: 260
- Recommendation-held pending gate/owner decision: 31

## Packets Ready For Review

| Packet | Approved candidates | Held/support items | Main QA focus |
| --- | ---: | ---: | --- |
| Herstik, _Sacred Sex_ | 69 | 8 | Adult/private labels, chapter coverage, recommendation constraints for explicit/high-capacity practices. |
| Miller, _Sex, Sorcery, and Spirit_ | 22 | 7 | Spirit/sexual magic fit, direct-use versus recommendation gates, ritual architecture completeness. |
| Carrellas, _Urban Tantra_ | 55 | 12 | Body/breath/partner practice coverage, house voice, capacity/audience metadata. |
| Madame Pamita, _The Book of Candle Magic_ | 42 | 7 | Candle method coverage, coercive/souring/direct-use labels, avoiding table/catalog over-import. |
| Henri Gamache, _The Master Book of Candle Burning_ | 24 | 6 | Adversarial candle work labels, Psalm/sacred-text optionality, direct-use/recommendation separation. |
| Dykes/Gibson, _Astrological Magic_ | 26 | 8 | Timing metadata, high-capacity gates, ceremonial-source transformation, element/planet/sign coverage. |
| Tess Whitehurst, _Magical Housekeeping_ | 27 | 7 | Home clearing/blessing/protection coverage, spirit/target-linked holds, timing notes for moon and thresholds. |
| Jennie Blonde, _Hearth and Home Witchcraft_ | 26 | 9 | Low-capacity home/kitchen/altar coverage, recipe/support separation, deity/faery optionality. |

## QA Questions To Answer

1. Is anything ritual-shaped missing from the approved candidate list?
2. Is anything approved that is really only a technique, correspondence table, glossary entry, recipe, or reading note?
3. Are all approved candidates appropriate to be findable in search/direct-use after import?
4. Which approved candidates should be recommendation-eligible immediately, and which should be findable/direct-use only?
5. Do the headline, summary, practice, intention, and question feel like Moon & Table rather than a source paraphrase or generic wellness copy?
6. Are timing, capacity, audience, carrier, purpose, explicit/private, spirit, adversarial, target-linked, and high-capacity labels accurate enough for import?
7. Are any recommendation constraints too timid given the private two-adult app context?
8. Are any user-facing fields too source-close and needing a stronger transformation pass before import?

## Suggested Review Order

1. Scan each packet's Source Map and Held / Later Review Items first.
2. Review approved candidates by family rather than linearly:
   - body/breath/sex/private practices
   - candle and altar practices
   - spirit/adversarial/target-linked practices
   - astrology/timing-heavy practices
3. Mark decisions inline with one of:
   - `import_ready`
   - `import_after_wording`
   - `findable_only`
   - `recommendable_with_constraints`
   - `hold_as_support`
   - `missing_candidate`
4. After owner QA, create a mechanical import issue for the accepted packet set.

## Import Doctrine Reminder

- A Ritual may exist when it is self-contained, source-backed, and performable from the app.
- A Ritual does not have to be recommendation-eligible to exist.
- Explicit adult content, coercive material, adversarial work, spirit work, and high-capacity ceremonial work should be labeled and constrained, not silently excluded.
- Search/direct-use and `Choose with me` recommendations are separate decisions.
