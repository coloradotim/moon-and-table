# Ritual candidate packet: Anand and Saint Thomas ritual-only adult re-extraction

## Packet metadata

- packet ID: `packet-anand-saint-thomas-ritual-only-adult-reextract`
- issue: `#414`
- depends on: `#413`, PR `#415`, and the #287 mechanical import contract
- source IDs:
  - `SRC-CONNECTION-ANAND-ART-SEXUAL-MAGIC`
  - `SRC-CONNECTION-SAINT-THOMAS-SEX-WITCH`
- source gates:
  - `docs/research/source-gates/src-connection-anand-art-sexual-magic.md`
  - `docs/research/source-gates/src-connection-saint-thomas-sex-witch.md`
- source PDFs inspected locally:
  - `.moon-table-private/sources/The_Art_of_Sexual_Magic_-_Margot_Anand.pdf`
  - `.moon-table-private/sources/Sex_Witch_-_Sophie_Saint_Thomas.pdf`
- baseline packets:
  - `docs/research/ritual-candidates/packet-anand-connection.md`
  - `docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md`
- supersedes:
  - `docs/research/ritual-candidates/packet-anand-connection.md`
  - `docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md`
  - use this combined packet as the controlling Anand and Saint Thomas extraction/disposition packet for later mechanical import planning
- output status: extraction packet only; no runtime Ritual records, UI copy, selector logic, direct-use eligibility, or recommendation eligibility changes
- product posture: private adult household ritual material for consenting adults; explicit adult content is allowed when it is a complete source-backed Ritual
- source text posture: repository-safe paraphrase only; no long copied source text, full exercises, full spells, full prayers, full guided meditations, or explicit technique instructions
- Tim review note: Tim reviewed the prior tentative candidate rows and directed that all of them be promoted to `ritual_candidate`. Recommendation/direct-use/import readiness remains governed by each row's disposition.
- Tim import doctrine: for this private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary/context, source-support note, or non-standalone follow-up pattern.

## Doctrine applied

The extraction gate in this packet is ritual architecture and source support, not adult-content category.

A candidate can proceed when it has:

- a beginning/container;
- a middle/core action;
- an end/closing;
- an intrinsic purpose;
- source-backed ritual logic;
- enough self-containment to perform from the app without opening the source.

Recommendation eligibility is separate. Every row marked `approved_for_direct_import` or `approved_for_mechanical_import` below is intended for later #287-style import only as:

```ts
status: "draft";
availability: {
  findable: true,
  directUseEligible: false,
  recommendationEligible: false,
};
recommendationMetadata: {
  eligibility: {
    recommendable: false,
    missing: ["direct_use_review", "recommendation_review"],
  },
};
```

## Source sections reviewed

| Source | Sections reviewed for this re-extraction | Notes |
| --- | --- | --- |
| Anand | Hints; Chapters 2-6; Chapters 7-8; Chapter 9; Epilogue | Rechecked existing connection candidates, explicit partner technique lanes, Magic Symbol body lanes, and Magical Congress. |
| Saint Thomas | Chapter 1; Chapter 2; Chapters 3-7; Chapter 8; Chapter 9 | Rechecked existing intimate candidates, previously excluded Chapter 2 and Chapter 8, body-fluid material, partner sex magic, fantasy/intention, former-lover, breakup, and bed-reset lanes. |

## Source rite inventory and disposition

This is the corrected complete extraction ledger for the #414 repair pass. The prior version of this packet collapsed too much into broad hold/reject rows. This table names the source-visible lanes separately so "not import-ready" does not mean "not extracted."

Items may be complete enough to exist in search later without being direct-use eligible or recommendation eligible. Items marked `approved_for_direct_import` are approved for later draft/findable import under Tim's private-app doctrine. Items marked `approved_for_mechanical_import` are the seven newly authored rows that already include full inline candidate records below. All other rows are inventory-visible source support, recipe-only, technique-only, glossary/context, or non-standalone pattern material.

This packet supersedes the standalone Anand and Saint Thomas packets listed above. Those earlier packets remain in the repository as source trail and historical extraction evidence, but this packet is the controlling extraction ledger for Anand and Saint Thomas after Tim's complete-extraction review.

### Anand complete ledger

| Source item / lane | Source pages | Type | Research use | Review labels | Likely carriers | Likely purposes | Disposition | Tim decision needed? | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Practice cadence and partner commitment | PDF 18-23 | practice container | source_support | adult_intimacy | words, table | connecting, tending | not_direct_import_nonstandalone_support | no | Already extracted into low-pressure practice-night and connection records. | No new import. |
| Boundaries, discomfort, and not pushing past readiness | PDF 21-23 | practice container | source_note | adult_intimacy, consent_sensitive | words | protecting, steadying | not_direct_import_source_support | no | Process support for adult lanes, not a standalone Ritual. | Preserve as reviewer context. |
| Magic Circle setup with altar, candle, markers, purpose, and close | PDF 51-68 | ritual | ritual_candidate | adult_intimacy, exact_text_sensitive, cultural_or_gender_load | table, candlelight, words | opening, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Sexual power objects and gendered organ symbolism | PDF 51-68 | ritual material | source_note / ritual_candidate | explicit, cultural_or_gender_load, house_voice_challenge | table, body | opening, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Melting Hug | PDF 68-69 | exercise / ritual | ritual_candidate | adult_intimacy, consent_sensitive | body, words | connecting, steadying | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Heart Salutation | PDF 68-69 | exercise / ritual | ritual_candidate | adult_intimacy, cultural_or_gender_load | body, words | blessing, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Remembering times of magic | PDF 69-73 | prompt rite | ritual_candidate | adult_intimacy, exact_text_sensitive | words, table | remembering, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Inner magician initiation | PDF 73-80 | guided rite | ritual_candidate | exact_text_sensitive, cultural_or_gender_load, house_voice_challenge | words, body, table | marking, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Anchoring the magical state | PDF 129-135 | body exercise | ritual_candidate | adult_intimacy, technique_heavy, therapy_adjacent | body, words | steadying, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Partner movement / witnessed dance | PDF 136-144 | partner rite | ritual_candidate | adult_intimacy, explicit, sex_forward, consent_sensitive, technique_heavy, house_voice_challenge | body, words | connecting, opening, blessing | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Shame / wound processing rite | PDF 145-166 | guided rite | ritual_candidate | therapy_adjacent, exact_text_sensitive, medical_or_somatic_claim, house_voice_challenge | words, body | releasing, tending | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Laughing pelvis / explicit body laughter | PDF 172-179 | movement rite | ritual_candidate | adult_intimacy, explicit, technique_heavy, house_voice_challenge | body | releasing, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Fire Meditation | PDF 180-186 | movement / visualization | ritual_candidate | technique_heavy, exact_text_sensitive, cultural_or_gender_load | body, candlelight | marking, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Wild animal practice | PDF 187-195 | movement / role exercise | ritual_candidate | explicit, cultural_or_gender_load, technique_heavy, house_voice_challenge | body | opening, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Solo vision and Magic Symbol work | PDF 214-232 | symbol rite | ritual_candidate | adult_intimacy, exact_text_sensitive | table, words | opening, voicing, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| New relationship vision | PDF 233-237 | vision rite | ritual_candidate | adult_intimacy, coercive_or_target_control, exact_text_sensitive | words, table | opening, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Shared love vision and shared Magic Symbol | PDF 238-242 | partner symbol rite | ritual_candidate | adult_intimacy, consent_sensitive, exact_text_sensitive | words, table, body | connecting, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Making love with the Magic Symbol | PDF 243-249 | partner body rite | ritual_candidate | explicit, sex_forward, adult_intimacy, technique_heavy, consent_sensitive, direct_source_only_candidate | body, table, words | connecting, opening, marking | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chakra Rub atmosphere/materials | PDF 270-277 | body/material exercise | ritual_candidate | explicit, technique_heavy, medical_or_somatic_claim, cultural_or_gender_load, exact_text_sensitive | body, plant, vessel | connecting, steadying, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chakra Breathing / Chakra Wave | PDF 278-310 | body / breath exercise | ritual_candidate | technique_heavy, cultural_or_gender_load, medical_or_somatic_claim, exact_text_sensitive | body | steadying, opening, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chapters 7-8 explicit partner pleasuring lessons | PDF 312-410 | technique lesson | direct_source_only_candidate | explicit, sex_forward, technique_heavy, consent_sensitive, medical_or_somatic_claim, house_voice_challenge | body | connecting | not_direct_import_technique_or_context | yes | The material is visible and valuable, but it is technique pedagogy rather than a self-contained Moon & Table Ritual unless wrapped by a separate container. | Do not import as app instruction from this packet. |
| Channeling orgasmic energy with partner | PDF 411-420 | partner energy rite | ritual_candidate | explicit, sex_forward, technique_heavy, cultural_or_gender_load, medical_or_somatic_claim, exact_text_sensitive | body, words | connecting, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Sexual self-empowerment with a symbol | PDF 421-429 | symbol/body rite | ritual_candidate | adult_intimacy, explicit, sex_forward, exact_text_sensitive | body, words, table | opening, voicing, connecting | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Magical Congress classical/spontaneous container | PDF 430-462 | culminating partner rite | ritual_candidate | adult_intimacy, explicit, sex_forward, consent_sensitive, technique_heavy, cultural_or_gender_load, exact_text_sensitive | body, candlelight, table, words, vessel | connecting, marking, steadying | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Ongoing symbol practice and integration | PDF 375-390; 463-474 | follow-up pattern | product_followup_pattern | adult_intimacy | words, table, body | remembering, tending | not_direct_import_nonstandalone_support | no | Existing symbol-memory and integration records cover this as non-import-new support. | No new import. |

### Saint Thomas complete ledger

| Source item / lane | Source pages | Type | Research use | Review labels | Likely carriers | Likely purposes | Disposition | Tim decision needed? | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chapter 1 circle/candle/altar baseline | Ch. 1 | ritual method | source_support | exact_text_sensitive | candlelight, table, words | opening, marking | not_direct_import_nonstandalone_support | no | Existing Saint Thomas records already use candle, altar, and spoken/written spell architecture. | No new import. |
| Bodily-fluid correspondences | Ch. 1 pp. 28-29; Ch. 5 pp. 105-106 | correspondence / material | source_support | adult_intimacy, explicit, body_fluid, sex_forward, house_voice_challenge | body, candlelight, words | voicing, opening, connecting | not_direct_import_source_support | yes before direct use | Source supports body-fluid material as ritual material, but the correspondence row is not itself a Ritual. | Supports the approved sigil/candle candidate below; no separate import. |
| Herbs, oils, crystals, and general correspondences | Ch. 1 | source material | source_support | medical_or_somatic_claim, exact_text_sensitive | plant, vessel, candlelight | blessing, protecting, opening | not_direct_import_source_support | no | Useful for source grounding but not standalone Rituals. | Preserve as packet source support. |
| Chapter 2 sex education and anatomy overview | PDF 59-69 | context | context_only | explicit, medical_or_somatic_claim, technique_heavy | body, words | connecting, protecting | not_direct_import_technique_or_context | yes | Useful reviewer context, but not a Ritual and not Moon & Table instruction. | Keep out of app content unless a later non-Ritual content type exists. |
| Chapter 2 consent, kink, and relationship-format glossary | PDF 59-69 | context | source_note | explicit, kink_adjacent, consent_sensitive, medical_or_somatic_claim | words | protecting, connecting | not_direct_import_source_support | yes | Helps reviewers avoid coy extraction, but should not become app-facing instruction in the Ritual model. | Reviewer context only. |
| Gender identity rite | Ch. 3 pp. 72-73 | blessing / meditation | ritual_candidate | cultural_or_gender_load, exact_text_sensitive, house_voice_challenge | words, body | blessing, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Divine feminine / divine masculine rites | Ch. 3 pp. 73-75 | blessing / meditation | ritual_candidate | cultural_or_gender_load, exact_text_sensitive, house_voice_challenge | words, body | blessing, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Solo erotic self-practice | Ch. 3 pp. 75-76 | body rite | ritual_candidate | explicit, sex_forward, technique_heavy, direct_source_only_candidate | body | connecting, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Psychoactive self-love / flying ointment / topical recipes | Ch. 3 pp. 77-89 | recipe | source_support | explicit, medical_or_somatic_claim, technique_heavy, house_voice_challenge | plant, body, vessel | opening, blessing | not_direct_import_recipe_only | yes | Recipe/material and psychoactive boundaries make this unsuitable for mechanical import. | Likely reject app text; source-note-only if Tim wants. |
| Targeted partner summoning | Ch. 4 pp. 91-93 | spell | ritual_candidate | coercive_or_target_control, explicit, sex_forward | candlelight, words | opening, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Obsession oil / enthrallment powder | Ch. 4 pp. 94-97 | recipe / spell | ritual_candidate | coercive_or_target_control, body_fluid, explicit, medical_or_somatic_claim | plant, vessel, body | opening, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Baby gay / sexual becoming spell | Ch. 4 | rite | ritual_candidate | adult_intimacy, cultural_or_gender_load, house_voice_challenge | words, body | opening, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Venus powder / attraction powder | Ch. 4 | recipe / glamour | ritual_candidate | medical_or_somatic_claim, coercive_or_target_control, house_voice_challenge | plant, vessel | opening, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Scarlet soak / body confidence bath | Ch. 4 | bath rite | ritual_candidate | adult_intimacy, medical_or_somatic_claim | vessel, body | blessing, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| First date glamour | Ch. 4 | glamour rite | ritual_candidate | adult_intimacy, sex_forward, house_voice_challenge | candlelight, words, body | opening, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Demons tarot / hesitation check | Ch. 4 | divination prompt | ritual_candidate | adult_intimacy, exact_text_sensitive | words, table | opening, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Just-sex boundary ritual | Ch. 4 pp. 101-102 | words rite | ritual_candidate | adult_intimacy, explicit, consent_sensitive, sex_forward | words, body | connecting, protecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Sex positivity prayer | Ch. 5 pp. 103-104 | prayer | ritual_candidate | adult_intimacy, explicit, sex_forward, exact_text_sensitive | words, candlelight | blessing, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Erotic sigil | Ch. 5 pp. 104-106 | sigil rite | ritual_candidate | adult_intimacy, explicit, sex_forward, exact_text_sensitive | words, table, body | voicing, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Body-fluid sigil candle variant | Ch. 5 pp. 105-106 | sigil/body material rite | ritual_candidate | adult_intimacy, explicit, body_fluid, sex_forward, house_voice_challenge | body, candlelight, words | voicing, opening, connecting | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Play party goal/boundary material | Ch. 5 pp. 106-108 | planning rite | ritual_candidate | kink_adjacent, explicit, consent_sensitive, technique_heavy, house_voice_challenge | words, body | protecting, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Kink clarity candle/rope rite | Ch. 5 pp. 108-110 | candle/body rite | ritual_candidate | adult_intimacy, explicit, kink_adjacent, consent_sensitive | candlelight, words, body | voicing, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Kink shame-release body variant | Ch. 5 pp. 108-110 | body/word rite | ritual_candidate | adult_intimacy, explicit, kink_adjacent, consent_sensitive, technique_heavy | body, candlelight, words | voicing, opening, connecting | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Massage oil / intimacy oil | Ch. 5 pp. 110-111 | recipe | source_support | explicit, medical_or_somatic_claim, technique_heavy | plant, vessel, body | connecting, blessing | not_direct_import_recipe_only | yes | Recipe/material safety and exact proportions make this non-importable as a Ritual. | Source-note-only at most. |
| Anal technique / explicit technique instruction | Ch. 5 pp. 111-113 | technique lesson | direct_source_only_candidate | explicit, technique_heavy, medical_or_somatic_claim | body | connecting | not_direct_import_technique_or_context | yes | Valuable source content, but it is technique instruction rather than a self-contained Ritual. | Do not import as app text. |
| Fantasy apple | Ch. 5 pp. 113-115 | object rite | ritual_candidate | adult_intimacy, explicit, sex_forward | table, plant, words | opening, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Toy consecration / object preparation | Ch. 5 pp. 115-116 | object rite | ritual_candidate | adult_intimacy, explicit, exact_text_sensitive | table, body, words | blessing, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Hot sex incense / psychic sex smoke | Ch. 5 pp. 116-118 | recipe / smoke | source_support | explicit, medical_or_somatic_claim, technique_heavy | plant, vessel, body | opening, connecting | not_direct_import_recipe_only | yes | Smoke/recipe and somatic claims block import. | Source-note-only if retained. |
| Fantasy rose | Ch. 5 pp. 118-120 | object/plant rite | ritual_candidate | adult_intimacy, explicit, sex_forward | plant, words, table | opening, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Threesome / third-party invitation lane | Ch. 5 pp. 120-121 | planning rite | ritual_candidate | explicit, consent_sensitive, kink_adjacent, house_voice_challenge | words, body, table | connecting, opening | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Partner sex magic | Ch. 5 pp. 121-122 | partner rite | ritual_candidate | explicit, sex_forward, adult_intimacy, consent_sensitive, direct_source_only_candidate | body, candlelight, words | connecting, marking | approved_for_mechanical_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Dry spell / desire rekindling | Ch. 5 pp. 122-123 | candle/water rite | ritual_candidate | adult_intimacy, explicit, sex_forward | candlelight, vessel, words | opening, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Makeup sex / repair lane | Ch. 5 pp. 124-125 | partner rite | ritual_candidate | adult_intimacy, explicit, sex_forward, consent_sensitive | body, words, candlelight | tending, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Aftercare ointment | Ch. 5 pp. 127-128 | recipe | source_support | explicit, medical_or_somatic_claim, technique_heavy | plant, vessel, body | steadying, tending | not_direct_import_recipe_only | yes | Recipe/material boundary blocks import. | Source-note-only if retained. |
| Relationship format tarot | Ch. 6 pp. 129-131 | divination prompt | context / ritual_candidate | adult_intimacy, exact_text_sensitive | words, table | voicing, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Jealousy, forgiveness, and clear communication lanes | Ch. 6 pp. 132-136 | spell / prompt rite | ritual_candidate | adult_intimacy, therapy_adjacent, exact_text_sensitive | words, candlelight | tending, voicing, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Intercultural relationship and family/social glamour | Ch. 6 pp. 134-138 | protection / glamour | ritual_candidate | cultural_or_gender_load, therapy_adjacent, house_voice_challenge | words, candlelight, body | protecting, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Relationship level-up | Ch. 6 pp. 138-139 | candle/words rite | ritual_candidate | adult_intimacy, exact_text_sensitive | candlelight, words | opening, marking | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Honey jar / compassion work | Ch. 6 pp. 139-140 | jar/sweetening rite | ritual_candidate | adult_intimacy, coercive_or_target_control, exact_text_sensitive | vessel, words | blessing, tending | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Love necromancy / relationship revival | Ch. 6 pp. 140-141 | spell | ritual_candidate | coercive_or_target_control, therapy_adjacent, house_voice_challenge | candlelight, words | opening, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Three-month marker and moving-in rites | Ch. 6 pp. 142-145 | milestone rite | ritual_candidate | adult_intimacy, exact_text_sensitive | table, words, vessel | marking, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Wedding / commitment doll work | Ch. 6 pp. 147-148 | object rite | ritual_candidate | adult_intimacy, exact_text_sensitive, house_voice_challenge | table, words | marking, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Sex worker protection prayer | Ch. 7 pp. 154-155 | prayer | ritual_candidate | cultural_or_gender_load, exact_text_sensitive, house_voice_challenge | words, candlelight | protecting, blessing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Former-lover release | Ch. 7 pp. 150-153 | release rite | ritual_candidate | adult_intimacy, consent_sensitive, therapy_adjacent | words, candlelight | releasing, protecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Friendship-with-benefits boundary | Ch. 7 pp. 152-153 | boundary rite | ritual_candidate | adult_intimacy, explicit, consent_sensitive, recommendation_lane_unclear | vessel, words, body | connecting, protecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Exes-be-gone / digital boundary / dating app lanes | Ch. 7 pp. 153-165 | boundary/protection | ritual_candidate | adult_intimacy, consent_sensitive, therapy_adjacent, house_voice_challenge | words, candlelight, body | protecting, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Uncrossing / light-shield protection | Ch. 7 pp. 155-165 | protection rite | ritual_candidate | adult_intimacy, consent_sensitive, therapy_adjacent | words, candlelight, body | protecting, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Psychic vampire / energy-drain boundary lane | Ch. 7 pp. 160-165 | protection / boundary | ritual_candidate | therapy_adjacent, house_voice_challenge, exact_text_sensitive | words, body, candlelight | protecting, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Legal action / sexual health / secrecy / abuse-adjacent protection | Ch. 7 pp. 157-160 | protection | ritual_candidate | medical_or_somatic_claim, therapy_adjacent, coercive_or_target_control, house_voice_challenge | words, candlelight, vessel | protecting, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chapter 8 mirror-bed banishing / identity-protection hex lanes | Ch. 8 pp. 166-169 | hex / protection | ritual_candidate | coercive_or_target_control, house_voice_challenge, exact_text_sensitive | candlelight, body, words | protecting, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chapter 8 money/rebound/revenge attraction lanes | Ch. 8 pp. 169-171 | spell / recipe | ritual_candidate | coercive_or_target_control, explicit, sex_forward, body_fluid, medical_or_somatic_claim | vessel, body, candlelight | opening, protecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chapter 8 slut-shamer / psychic truth / breakup courage lanes | Ch. 8 pp. 171-174 | spell / tarot / fire rite | ritual_candidate | coercive_or_target_control, exact_text_sensitive, house_voice_challenge | words, candlelight, table | protecting, releasing, voicing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Chapter 8 assault/revenge jar / karma / cemetery-fruit lanes | Ch. 8 pp. 175-177 | hex / revenge | ritual_candidate | coercive_or_target_control, therapy_adjacent, exact_text_sensitive, house_voice_challenge | vessel, plant, words | protecting, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Breakup boldness | Ch. 9 pp. 178-180 | glamour / courage rite | ritual_candidate | adult_intimacy, therapy_adjacent | body, words | opening, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Relationship mending and trust | Ch. 9 pp. 180-183 | mending rite | ritual_candidate | adult_intimacy, therapy_adjacent, exact_text_sensitive | words, candlelight, vessel | tending, connecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Bed reset / linen cleansing | Ch. 9 pp. 183-184 | cleansing rite | ritual_candidate | adult_intimacy, therapy_adjacent | body, vessel, plant | releasing, steadying | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Home/body after intimacy reset | Ch. 9 pp. 188-189 | cleansing rite | ritual_candidate | adult_intimacy, explicit, sex_forward | body, vessel | steadying, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Assault survivor / cheating / gaslighting lanes | Ch. 9 pp. 185-192 | prayer / clarity / recovery | ritual_candidate | therapy_adjacent, exact_text_sensitive, house_voice_challenge | words, candlelight, body | protecting, releasing, tending | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Body smoke / enemy bath bomb / smoke/body purification lanes | Ch. 9 pp. 189-191 | smoke / bath / revenge | ritual_candidate | explicit, body_fluid, medical_or_somatic_claim, coercive_or_target_control | body, vessel, plant | releasing, protecting | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |
| Remove cynicism / forgive self | Ch. 9 pp. 192-194 | closing / repair rite | ritual_candidate | therapy_adjacent, exact_text_sensitive | words, candlelight | tending, releasing | approved_for_direct_import | no | Tim doctrine: for the private app, import the ritual-shaped thing as a findable draft unless it is only a recipe, technique lesson, glossary, or context. | Promote into the draft/findable import set; direct-use and recommendation review remain separate. |

## Closeout accounting

```text
Source sections reviewed: 14
Existing candidates reconsidered: 75
Complete inventory rows in this repaired packet: 85
Anand source-visible rows: 25
Saint Thomas source-visible rows: 60
Rows promoted from tentative candidate to ritual_candidate after Tim review: 31
Rows approved for direct draft/findable import under Tim doctrine: 71
  - `approved_for_direct_import`: 64
  - `approved_for_mechanical_import`: 7
Rows not approved for direct import because they are source support, recipe-only, technique-only, glossary/context, or non-standalone pattern material: 14
Newly authored inline candidate records in this packet: 7
Primary body + connecting candidates: 5 surfaced; all 5 approved for direct draft/findable import
Explicit adult / sex-forward lanes inventoried: yes, including technique, body-fluid, kink, partner-sex, and revenge/hex lanes
Candidates with body-fluid metadata: 1 newly authored inline candidate; additional ritual-shaped body-fluid/revenge lanes approved for direct draft/findable import when not only recipe/source-support material
Candidates with spirit/deity metadata: 0
Candidates not recommendation-ready but import-ready as draft/findable: 71
Validation commands run: see Validation checklist
```

Count reconciliation:

- 85 complete inventory rows = 25 Anand rows + 60 Saint Thomas rows.
- All source-visible rows that had been marked tentative were promoted to `ritual_candidate` after Tim review; their dispositions now record whether they are approved for direct import or excluded only because they are source support, recipe-only, technique-only, glossary/context, or non-standalone pattern material.
- 71 rows are approved for direct draft/findable import under Tim's private-app doctrine: 64 as `approved_for_direct_import` and 7 as `approved_for_mechanical_import`.
- 7 of those 71 rows are newly authored with full inline candidate records below.
- The other approved rows either correspond to existing candidate material in the superseded packets/runtime records or require candidate-block expansion during the later #287-style mechanical import pass. They are no longer held for product/safety/consent concerns.
- 14 rows remain outside direct import because they are source support, recipe-only, technique-only, glossary/context, or non-standalone follow-up pattern material.

## Approved candidate index

| Candidate ID | Headline | Primary carrier | Primary purpose | Source | Explicit adult? | Body-fluid metadata? | Import readiness |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `candidate.anand.partner_dance_witness` | Let the Body Be Witnessed | `body` | `connecting` | Anand Ch. 3 | yes | no | `approved_for_mechanical_import` |
| `candidate.anand.shared_symbol_lovemaking` | Carry the Shared Symbol Into Touch | `body` | `connecting` | Anand Ch. 5 | yes | no | `approved_for_mechanical_import` |
| `candidate.anand.body_symbol_charge` | Charge the Symbol With the Body | `body` | `opening` | Anand Ch. 9 | yes | no | `approved_for_mechanical_import` |
| `candidate.anand.magical_congress_container` | Prepare the Congress Container | `body` | `connecting` | Anand Ch. 9 | yes | no | `approved_for_mechanical_import` |
| `candidate.saint_thomas.body_fluid_sigil_candle` | Mark Desire With the Body | `body` | `voicing` | Saint Thomas Ch. 5 | yes | yes | `approved_for_mechanical_import` |
| `candidate.saint_thomas.kink_desire_body_release` | Cut the Shame From the Desire | `body` | `voicing` | Saint Thomas Ch. 5 | yes | no | `approved_for_mechanical_import` |
| `candidate.saint_thomas.partner_body_intention` | Carry One Intention Through the Body | `body` | `connecting` | Saint Thomas Ch. 5 | yes | no | `approved_for_mechanical_import` |

## Approved candidate records

### `candidate.anand.partner_dance_witness` — Let the Body Be Witnessed

- candidate ID: `candidate.anand.partner_dance_witness`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Let the Body Be Witnessed

#### Ritual body / practice

Choose a private room and agree who will move first and who will witness. Light one candle or dim one lamp. The moving partner dances, undresses, stays clothed, stands, or lets the body take the shape that feels true for this rite. The witnessing partner keeps attention on appreciation, not correction. When the movement is complete, the witness names one thing they received. Switch roles if both want to, or close by touching hands and naming that the offering has been received.

#### Intention

Let the body be met without turning it into performance.

#### Best window

When both of you want explicit embodied connection without turning the evening into a technique lesson.

#### Question to carry

What becomes possible when the body is witnessed without being corrected?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "body-based connecting"
    - "partner witnessing"
    - "explicit private intimacy"
  timingHooks:
    - "not phase-specific"
    - "best when there is privacy and enough room for attention"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "room_for_something_deeper"
  audienceHooks:
    - "both partners have a chosen role and an equal chance to stop, switch, or close"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: candle or lamp. Place: private room or bedroom."
  sourceBackedRationale:
    - "Anand supports partner movement/witnessing as part of erotic-magical preparation and shared body connection."
  notForOrHoldNotes:
    - "Not for performance pressure, correction, public display, third-party participation, therapy claims, or technique instruction."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "ritualizationType:source_backed_moon_and_table_form"
  secondarySelectionSignals:
    - "adult_intimacy"
    - "partner witnessing"
    - "candle or lamp"
  exclusionSignals:
    - "exclude from Choose with me until direct-use and recommendation review"
    - "exclude when the request is for low-capacity or solo practice"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source architecture supports the lane, but runtime import should remain draft/findable and not direct-use or recommendation eligible."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 136-144 / Chapter 3, partner movement and witnessing material"
      sourceSummary: "The source presents partner movement/witnessing as an embodied erotic preparation lane."
      sourceSupports: "A private container, chosen roles, embodied offering, partner witnessing, and completion through acknowledgment."
      moonAndTableChanges: "Converted the source-supported movement lane into a high-level household ritual without copied exercise text or technique instruction."
      doNotImport:
        - "Copied source exercise text"
        - "Explicit technique instruction"
        - "Performance pressure"
        - "Therapy or body-image treatment claims"
        - "Third-party participation"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - opening
      - blessing
    refinement: "embodied partner witnessing"
  carriers:
    primary: body
    secondary:
      - candlelight
      - words
  capacity:
    supports:
      - room_for_something_deeper
    default: room_for_something_deeper
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "One partner offers embodied movement while the other witnesses; roles may switch or close."
  timing:
    relationship: none
    contexts:
      - "private room with enough time for chosen embodied attention"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - adult intimacy
    - body
    - connecting
    - partner witness
    - movement
  keywords:
    - embodied connection
    - private room
    - dance
    - witness
    - erotic offering
    - appreciation
  materials:
    - candle or lamp
  places:
    - private room
    - bedroom
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit adult private partner practice"
    - "consent-sensitive role structure"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "embodied erotic witnessing is the ritual action"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: none
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Import-ready as draft/findable, but not appropriate for Choose with me until direct-use and recommendation review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; purpose change not allowed; material substitution limited to candle/lamp/no-flame light.

operative words metadata: []

### `candidate.anand.shared_symbol_lovemaking` — Carry the Shared Symbol Into Touch

- candidate ID: `candidate.anand.shared_symbol_lovemaking`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Carry the Shared Symbol Into Touch

#### Ritual body / practice

Draw or place the shared symbol where both of you can see it. Sit together and name the shared intention the symbol is holding. Choose whether the rite will continue into touch, sex, or quiet closeness. If it does, keep the symbol in view or near the bed as the body carries the intention. When the touch is complete, return attention to the symbol. Cover it, fold it, or place it back on the altar, then each person names one word for what should come forward from the rite.

#### Intention

Give shared desire a visible sign before touch carries it.

#### Best window

Before consensual private touch or lovemaking that both of you want to treat as ritual.

#### Question to carry

What symbol can hold our shared desire lightly enough to let it move?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "body-based connecting"
    - "shared intention"
    - "symbol work"
  timingHooks:
    - "not phase-specific"
    - "best before chosen private intimacy"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "room_for_something_deeper"
  audienceHooks:
    - "both partners name and carry the shared intention"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: shared symbol, paper, pen, altar or bedside."
  sourceBackedRationale:
    - "Anand supports shared Magic Symbol work and carrying the symbol through lovemaking/sexual energy."
  notForOrHoldNotes:
    - "Not for coercive manifestation, fertility claims, guaranteed outcomes, or technique instruction."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "shared Magic Symbol"
  secondarySelectionSignals:
    - "secondary_carriers:table,words"
    - "adult private ritual"
  exclusionSignals:
    - "exclude from recommendation until direct-use and recommendation review"
    - "exclude if the intention targets a third party or promised outcome"
  timingSignal:
    - "timing relationship:helpful"
  confidenceNotes:
    - "Source supports the symbol/body architecture; packet avoids copied technique and outcome guarantees."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 238-249 / Chapter 5, shared Magic Symbol and lovemaking lane"
      sourceSummary: "The source links shared Magic Symbol work with adult partner lovemaking and sexual energy."
      sourceSupports: "A shared symbol, shared intention, visible placement, adult body practice, and return/integration."
      moonAndTableChanges: "Authored a high-level private household form that preserves symbol/body logic without importing explicit technique."
      doNotImport:
        - "Copied source visualization or technique text"
        - "Fertility, manifestation, or guaranteed-outcome claims"
        - "Third-party targeting"
        - "Pressure to proceed into touch"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - opening
      - marking
      - voicing
    refinement: "shared desire carried through the body"
  carriers:
    primary: body
    secondary:
      - table
      - words
  capacity:
    supports:
      - room_for_something_deeper
    default: room_for_something_deeper
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "Both partners name the shared intention and decide whether the ritual continues into touch."
  timing:
    relationship: helpful
    contexts:
      - "before consensual private touch or lovemaking"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - Magic Symbol
    - adult intimacy
    - body
    - connecting
    - shared intention
  keywords:
    - shared symbol
    - lovemaking
    - sexual energy
    - altar
    - bedside
    - desire
  materials:
    - shared symbol
    - paper
    - pen
  places:
    - altar
    - bedside
    - bedroom
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit adult partner ritual"
    - "source supports symbol/body logic"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "sex or chosen touch may be the ritual action"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: shared_intention_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Findable draft candidate for a private adult lane; should not be recommended until reviewed."
```

adaptation policy notes: `source_backed_moon_and_table_form`; the symbol and body connection are source-supported; no invented props beyond paper/pen/altar or bedside placement.

operative words metadata: []

### `candidate.anand.body_symbol_charge` — Charge the Symbol With the Body

- candidate ID: `candidate.anand.body_symbol_charge`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Charge the Symbol With the Body

#### Ritual body / practice

Place your Magic Symbol where you can see it. Put one hand on or near your own body and name the desire the symbol is carrying. Let private pleasure, arousal, breath, or body attention gather around the symbol without forcing a result. When the charge feels complete, touch the paper once, fold it, and place it on the altar, in a journal, or beside the bed. Close by washing your hands or drinking a little water.

#### Intention

Let the body give warmth to a chosen sign without demanding an outcome.

#### Best window

When a personal desire needs a private embodied container.

#### Question to carry

What does the body know about this desire before I explain it?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "solo body ritual"
    - "desire clarity"
    - "symbol work"
  timingHooks:
    - "not phase-specific"
    - "best when privacy is available"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
    - "room_for_something_deeper"
  audienceHooks:
    - "supports me"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: Magic Symbol, paper, pen, water optional."
  sourceBackedRationale:
    - "Anand supports charging a symbol through sexual/embodied energy and later placing or keeping the symbol."
  notForOrHoldNotes:
    - "Not for fertility claims, medical claims, third-party targeting, or orgasm-performance pressure."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:opening"
    - "carrier:body"
    - "Magic Symbol body lane"
  secondarySelectionSignals:
    - "secondary_purposes:voicing,connecting"
    - "secondary_carriers:words,table,vessel"
  exclusionSignals:
    - "exclude from recommendation until reviewed"
    - "exclude if request needs a shared partner rite"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source support is strong for body/symbol charging; packet keeps wording high-level and non-technique."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 421-429 / Chapter 9, sexual self-empowerment and symbol lane"
      sourceSummary: "The source supports using personal sexual/embodied energy with a symbol."
      sourceSupports: "A personal symbol, body energy, private attention, and later keeping/placing the symbol."
      moonAndTableChanges: "Converted the explicit body-symbol lane into a self-contained Moon & Table form without technique instruction or outcome claims."
      doNotImport:
        - "Copied source exercise text"
        - "Orgasm-performance instructions"
        - "Fertility, therapy, medical, or manifestation guarantees"
        - "Third-party target work"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: opening
    secondary:
      - voicing
      - connecting
    refinement: "private embodied desire"
  carriers:
    primary: body
    secondary:
      - words
      - table
      - vessel
  capacity:
    supports:
      - enough_to_participate
      - room_for_something_deeper
    default: enough_to_participate
  audience:
    supports:
      - me
    default: me
  timing:
    relationship: none
    contexts:
      - "private embodied desire work"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - Magic Symbol
    - body
    - desire
    - adult intimacy
  keywords:
    - symbol
    - arousal
    - private pleasure
    - body attention
    - desire
    - altar
  materials:
    - Magic Symbol
    - paper
    - pen
    - water
  places:
    - altar
    - journal
    - bedside
    - bedroom
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit solo adult body ritual"
    - "no body-fluid material"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "private pleasure or arousal may charge the symbol"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: self_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Draft/findable only; direct-use and recommendation review must decide whether solo explicit body ritual belongs in active use."
```

adaptation policy notes: `source_backed_moon_and_table_form`; purpose change not allowed; water is only a closing/grounding material.

operative words metadata: []

### `candidate.anand.magical_congress_container` — Prepare the Congress Container

- candidate ID: `candidate.anand.magical_congress_container`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Prepare the Congress Container

#### Ritual body / practice

Prepare the private room before the rite begins. Set the shared symbol, one candle or lamp, and a cup of water where both of you can reach them. Stand together and name the work of the night in one sentence. Greet each other as partners in the rite. If both of you choose to continue, let touch, sex, breath, stillness, or closeness carry the shared symbol without following instructions from the app. When the rite is complete, return to the cup of water. Each person drinks or touches the cup and names one word for the return. Extinguish the candle or turn off the lamp.

#### Intention

Let explicit private intimacy live inside a beginning, a shared sign, and a real return.

#### Best window

When both of you have room for a deeper private adult ritual and want the whole encounter held as ritual.

#### Question to carry

What kind of container lets the body go deep and still come home?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "room for something deeper"
    - "explicit body-based connecting"
    - "shared symbol"
  timingHooks:
    - "best with privacy and recovery time"
  lunarPlanetarySeasonalHooks:
    - "A later selector may prefer strong timing windows, but this candidate does not require computed timing."
  capacityHooks:
    - "room_for_something_deeper only"
  audienceHooks:
    - "both partners enter and return together"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: shared symbol, candle or lamp, cup of water. Place: bedroom/private room."
  sourceBackedRationale:
    - "Anand's Magical Congress material supports a prepared room, shared symbol/intention, adult sexual energy, ritual greeting, and grounding return."
  notForOrHoldNotes:
    - "Not for low capacity, technique instruction, fertility/manifestation guarantees, or pressure to continue into sex."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "Magical Congress container"
  secondarySelectionSignals:
    - "secondary_carriers:candlelight,table,words,vessel"
    - "capacity:room_for_something_deeper"
  exclusionSignals:
    - "exclude from recommendation until reviewed"
    - "exclude for low capacity or solo requests"
  timingSignal:
    - "timing relationship:helpful"
  confidenceNotes:
    - "Source support is strong for the ritual container; explicit sequence is deliberately not reproduced."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Margot Anand, The Art of Sexual Magic"
      sourceLocation: "PDF pp. 331-374 / Chapter 9, Magical Congress"
      sourceSummary: "The source presents a culminating adult ritual with preparation, symbol, intention, sexual energy, and grounding return."
      sourceSupports: "Prepared private room, shared symbol, candle/atmosphere, intention, adult body practice, greeting/recognition, and return/grounding."
      moonAndTableChanges: "Authored only the high-level ritual container and close; did not import explicit technique sequence or long source text."
      doNotImport:
        - "Copied explicit sequence"
        - "Technique instruction"
        - "Fertility, manifestation, therapy, medical, or guaranteed-outcome claims"
        - "Pressure to continue into sex"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - marking
      - steadying
      - opening
    refinement: "full private adult ritual container"
  carriers:
    primary: body
    secondary:
      - candlelight
      - table
      - words
      - vessel
  capacity:
    supports:
      - room_for_something_deeper
    default: room_for_something_deeper
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "Both partners prepare, name the work, choose whether to continue into touch/sex, and return together."
  timing:
    relationship: helpful
    contexts:
      - "private time with room for a deeper adult ritual and return"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Anand
    - Magical Congress
    - adult intimacy
    - body
    - connecting
    - shared symbol
  keywords:
    - private adult ritual
    - lovemaking
    - sexual energy
    - symbol
    - candle
    - water
    - grounding
  materials:
    - shared symbol
    - candle or lamp
    - cup of water
  places:
    - bedroom
    - private room
  sourceLabel: "Margot Anand, The Art of Sexual Magic"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit adult partner ritual"
    - "high-level container only; no technique instruction"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "sex or chosen adult touch may be the central ritual action"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: shared_intention_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Import-ready as draft/findable for later review; too deep and context-dependent for current guided recommendation."
```

adaptation policy notes: `source_backed_moon_and_table_form`; no technique sequence; water completes the source-supported grounding/return function.

operative words metadata: []

### `candidate.saint_thomas.body_fluid_sigil_candle` — Mark Desire With the Body

- candidate ID: `candidate.saint_thomas.body_fluid_sigil_candle`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Mark Desire With the Body

#### Ritual body / practice

Write one erotic intention that belongs to you. Reduce it to a simple sigil or mark. Set one candle on a plate or holder. Touch the sigil to the candle with one body-sourced material, or keep the body material on the paper if the candle should stay clean. Light the candle and let the mark stand for the desire. When the candle work is complete, fold the paper and put it away or discard it.

#### Intention

Let private desire speak through the body and take a visible mark.

#### Best window

When a private erotic desire needs to be named, marked, and contained.

#### Question to carry

What desire wants a mark of its own?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "explicit desire"
    - "body-fluid material"
    - "sigil or written intention"
  timingHooks:
    - "not phase-specific"
    - "best when privacy and cleanup are available"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
  audienceHooks:
    - "solo private rite"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: candle, plate or holder, paper, pen, body-sourced material."
  sourceBackedRationale:
    - "Saint Thomas supports erotic sigil/candle work and names body fluids among possible sex-magic materials."
  notForOrHoldNotes:
    - "Not for targeting another person, attraction-control, medical claims, public sharing, or recommendation before review."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:voicing"
    - "carrier:body"
    - "body_fluid_present:true"
  secondarySelectionSignals:
    - "secondary_carriers:candlelight,words"
    - "sex-forward sigil lane"
  exclusionSignals:
    - "exclude from recommendation until product-boundary and direct-use review"
    - "exclude if intention targets a specific person without consent"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source support is explicit; packet keeps candidate non-targeted and repository-safe."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Sophie Saint Thomas, Sex Witch"
      sourceLocation: "Chapter 1 pp. 28-29 and Chapter 5 pp. 105-106, body-fluid and sex-sigil/candle material"
      sourceSummary: "The source identifies body fluids as sex-magic material and gives erotic sigil/candle architecture."
      sourceSupports: "Written erotic intention, sigil creation, candle work, and body-fluid material as a possible carrier."
      moonAndTableChanges: "Narrowed the candidate to a non-targeted private desire rite without copied spell text, oils, smoke, or attraction-control claims."
      doNotImport:
        - "Copied spell text"
        - "Targeted attraction or control"
        - "Medical, STI, fertility, or guaranteed-effect claims"
        - "Oil/smoke/recipe requirements"
        - "Public or shared body-fluid handling"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: voicing
    secondary:
      - opening
      - connecting
    refinement: "private erotic intention"
  carriers:
    primary: body
    secondary:
      - candlelight
      - words
  capacity:
    supports:
      - enough_to_participate
    default: enough_to_participate
  audience:
    supports:
      - me
    default: me
  timing:
    relationship: none
    contexts:
      - "private erotic intention and candle work"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Saint Thomas
    - Sex Witch
    - body fluid
    - sigil
    - candle
    - explicit
    - desire
  keywords:
    - body fluid
    - sexual fluid
    - sigil
    - erotic intention
    - candle
    - desire
    - non-targeted
  materials:
    - candle
    - plate or holder
    - paper
    - pen
    - body-sourced material
  places:
    - private room
    - altar
    - bedside
  sourceLabel: "Sophie Saint Thomas, Sex Witch"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "body-fluid material present"
    - "explicit solo adult ritual"
    - "non-targeted formulation required"
    - "not direct-use or recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "body-sourced material and erotic intention are ritual materials"
sexualEnergyCarrier: body
bodyFluidPresent: true
bodyFluidType: "self-sourced sexual or menstrual fluid, source-supported; later review must decide direct-use handling"
targetingMode: self_only_non_targeted
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Import-ready as draft/findable so the lane is not lost; direct-use and recommendation require explicit human review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; material substitution must be reviewed; no oils, smoke, glitter, or recipe materials are required.

operative words metadata: []

### `candidate.saint_thomas.kink_desire_body_release` — Cut the Shame From the Desire

- candidate ID: `candidate.saint_thomas.kink_desire_body_release`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Cut the Shame From the Desire

#### Ritual body / practice

Set two candles or two steady lights on the table. Sit with one loose length of cord, ribbon, or thread around one wrist or held between both hands. Name the desire, kink, or fantasy in one plain sentence. Let the cord hold the shame, fear, or embarrassment around that sentence. When the desire has been named, cut the cord or untie it. Put the cord away from the body. Close by writing one honest conversation or boundary the desire asks for next.

#### Intention

Let desire be named without letting shame keep the body bound.

#### Best window

When a private kink, fantasy, or desire needs voice before it becomes a conversation.

#### Question to carry

What desire needs a clean sentence before it needs action?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "kink-adjacent desire"
    - "body and words"
    - "voicing"
  timingHooks:
    - "not phase-specific"
    - "best before a conversation, not during conflict"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
  audienceHooks:
    - "solo rite before possible shared conversation"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: two candles or lights, cord/ribbon/thread, scissors optional, paper, pen."
  sourceBackedRationale:
    - "Saint Thomas supports a kink/desire clarity rite using candles, symbolic binding, meditation on desire, and cutting/releasing the restraint."
  notForOrHoldNotes:
    - "Not a rope technique lesson, not consent negotiation by itself, not pressure on a partner."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:voicing"
    - "carrier:body"
    - "kink_adjacent"
  secondarySelectionSignals:
    - "secondary_carriers:candlelight,words"
    - "cord release"
  exclusionSignals:
    - "exclude from recommendation until adult-lane review"
    - "exclude if user asks for immediate partner action rather than self-clarity"
  timingSignal:
    - "timing relationship:none"
  confidenceNotes:
    - "Source support is strong for symbolic body/cord clarity; packet omits rope instruction and keeps the rite self-contained."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Sophie Saint Thomas, Sex Witch"
      sourceLocation: "Chapter 5 pp. 108-110, kink/desire clarity rite"
      sourceSummary: "The source uses candles, symbolic restraint, reflection on kink/desire, and cutting/release."
      sourceSupports: "Two lights/candles, symbolic cord, naming desire, releasing shame/fear, and a next communication step."
      moonAndTableChanges: "Removed rope technique instruction and preserved the ritual function as a body/voicing clarity rite."
      doNotImport:
        - "Rope technique instruction"
        - "Partner pressure"
        - "Consent negotiation replacement"
        - "Copied source spell text"
        - "Guarantees that a partner will agree"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: voicing
    secondary:
      - opening
      - releasing
      - connecting
    refinement: "desire clarity"
  carriers:
    primary: body
    secondary:
      - candlelight
      - words
  capacity:
    supports:
      - enough_to_participate
      - room_for_something_deeper
    default: enough_to_participate
  audience:
    supports:
      - me
    default: me
  timing:
    relationship: none
    contexts:
      - "before a desire or kink conversation"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Saint Thomas
    - Sex Witch
    - kink
    - desire
    - body
    - voicing
  keywords:
    - kink
    - fantasy
    - desire
    - cord
    - ribbon
    - shame
    - voice
    - candles
  materials:
    - two candles or steady lights
    - cord, ribbon, or thread
    - scissors
    - paper
    - pen
  places:
    - private room
    - altar
    - table
  sourceLabel: "Sophie Saint Thomas, Sex Witch"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: true
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "kink-adjacent adult ritual"
    - "symbolic cord only; not technique instruction"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "desire/kink is named as the ritual subject"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: self_clarity_before_conversation
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Findable draft candidate for explicit adult clarity; guided recommendation needs later review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; material substitution limited to cord/ribbon/thread and candles/lights.

operative words metadata: []

### `candidate.saint_thomas.partner_body_intention` — Carry One Intention Through the Body

- candidate ID: `candidate.saint_thomas.partner_body_intention`
- disposition: `candidate_extract_now`
- ritualizationType: `source_backed_moon_and_table_form`
- import readiness label: `approved_for_mechanical_import`

#### Headline

Carry One Intention Through the Body

#### Ritual body / practice

Sit or stand together before private touch begins. Each person names one word for what the shared time should carry. Choose one word together and write it on a small paper. Place the paper near the bed, under a candle, or under a shared object. If both of you choose to continue into sex or touch, let the body carry that one word without adding instructions. Close by returning to the paper, reading the word once, and deciding whether to keep, fold, or discard it.

#### Intention

Let the body carry one shared word without turning touch into pressure.

#### Best window

Before consensual private touch, sex, or a shared connecting rite.

#### Question to carry

What one word belongs between us before the body speaks?

#### Why this fits ingredients

```yaml
whyThisFitsIngredients:
  checkInHooks:
    - "body-based connecting"
    - "partner sex magic"
    - "shared intention"
  timingHooks:
    - "not phase-specific"
    - "best before consensual private time"
  lunarPlanetarySeasonalHooks: []
  capacityHooks:
    - "enough_to_participate"
    - "room_for_something_deeper"
  audienceHooks:
    - "both partners choose and return to the shared word"
  materialPlaceCarrierPurposeFit:
    - "Carrier: body. Materials: paper, pen, candle or shared object optional. Place: bedroom or private room."
  sourceBackedRationale:
    - "Saint Thomas supports partner sex magick around shared intention and focused adult energy."
  notForOrHoldNotes:
    - "Not for coercion, partner pressure, performance goals, or guaranteed outcomes."
```

#### How this was chosen ingredients

```yaml
howThisWasChosenIngredients:
  primarySelectionSignals:
    - "purpose:connecting"
    - "carrier:body"
    - "partner sex magick"
  secondarySelectionSignals:
    - "secondary_carriers:words,candlelight,table"
    - "shared word"
  exclusionSignals:
    - "exclude from recommendation until direct-use and recommendation review"
    - "exclude for solo requests"
  timingSignal:
    - "timing relationship:helpful"
  confidenceNotes:
    - "Source supports partner intention and sex-magic architecture; packet uses high-level body language only."
```

#### Source grounding

```yaml
origin:
  type: source
  sourceGrounding:
    - citationLabel: "Sophie Saint Thomas, Sex Witch"
      sourceLocation: "Chapter 5 pp. 121-122, partner sex magick"
      sourceSummary: "The source describes partnered sex magick around shared intention and focused adult energy."
      sourceSupports: "Shared intention, adult partner body practice, symbolic support object/light, and intentional close."
      moonAndTableChanges: "Re-centered the existing lane as primary body+connecting while avoiding explicit technique and outcome claims."
      doNotImport:
        - "Technique instruction"
        - "Coercive partner pressure"
        - "Third-party targeting"
        - "Copied spell text"
        - "Guaranteed outcome"
```

#### Recommendation metadata

```yaml
recommendationMetadata:
  purposes:
    primary: connecting
    secondary:
      - voicing
      - marking
    refinement: "shared adult intention"
  carriers:
    primary: body
    secondary:
      - words
      - candlelight
      - table
  capacity:
    supports:
      - enough_to_participate
      - room_for_something_deeper
    default: enough_to_participate
  audience:
    supports:
      - both_of_us
    default: both_of_us
    bothOfUsStructure: "Both partners choose one word, decide whether to continue into touch, and close by returning to the word."
  timing:
    relationship: helpful
    contexts:
      - "before consensual private touch or sex"
  eligibility:
    recommendable: false
    missing:
      - direct_use_review
      - recommendation_review
```

#### Availability on later #287 import

```yaml
status: draft
availability:
  findable: true
  directUseEligible: false
  recommendationEligible: false
```

#### Search metadata

```yaml
searchMetadata:
  tags:
    - Saint Thomas
    - Sex Witch
    - partner sex magick
    - body
    - connecting
    - shared intention
  keywords:
    - partner
    - sex magic
    - shared word
    - body
    - touch
    - bedroom
    - candle
  materials:
    - paper
    - pen
    - candle or shared object
  places:
    - bedroom
    - private room
    - bedside
  sourceLabel: "Sophie Saint Thomas, Sex Witch"
  originLabel: "source"
```

#### Review flags

```yaml
reviewFlags:
  sourceTextReviewRequired: true
  materialSafetyReviewRequired: false
  sourceVerificationRequired: true
  productBoundaryReviewRequired: true
  notes:
    - "explicit partner adult ritual"
    - "primary body+connecting variant of an existing candlelight lane"
    - "not recommendation-ready"
```

#### Packet review metadata

```yaml
explicitnessLevel: explicit_adult
sexRoleInRitual: "sex or chosen adult touch may carry the shared intention"
sexualEnergyCarrier: body
bodyFluidPresent: false
targetingMode: shared_intention_only
spiritOrDeityPresent: false
recommendationStatus: search_only_after_import
rationaleForRecommendationStatus: "Draft/findable body+connecting variant; guided recommendation requires later human review."
```

adaptation policy notes: `source_backed_moon_and_table_form`; body connection is primary; candle/object is secondary.

operative words metadata: []

## Direct-import disposition ledger

The complete disposition surface is the 85-row ledger above. This section preserves the decision logic without repeating the whole table.

| Status family | Meaning in this packet | Examples |
| --- | --- | --- |
| `approved_for_direct_import` | Ritual-shaped source lane approved for later draft/findable import under Tim's private-app doctrine. Direct-use and recommendation eligibility remain separate later decisions. | Anand chakra lanes, Saint Thomas Chapter 8 hex/revenge lanes, gendered rites, targeted attraction lanes, breakup and boundary rites. |
| `approved_for_mechanical_import` | Newly authored subset of approved direct-import rows with full inline candidate records already present in this packet. | Anand partner movement, Anand Magical Congress container, Saint Thomas body-fluid sigil candle. |
| `not_direct_import_source_support` | Material informs extraction but is not itself a standalone Ritual. | Anand boundaries, Saint Thomas body-fluid correspondences, Saint Thomas Chapter 2 glossary. |
| `not_direct_import_nonstandalone_support` | Non-standalone source-support or follow-up rows already represented by broader imported material; not a separate Ritual row under the current doctrine. | Anand practice cadence, Saint Thomas Chapter 1 baseline mechanics. |
| `not_direct_import_technique_or_context` | Source content is visible and may be valuable, but it is only technique instruction, glossary/context, or otherwise not a self-contained Moon & Table Ritual. | Saint Thomas Chapter 2 education, Anand explicit technique lessons, Saint Thomas anal technique. |
| `not_direct_import_recipe_only` | Remaining row is recipe-only or source-support material rather than a self-contained Ritual. | Saint Thomas psychoactive/topical recipes, massage oil, hot sex incense, aftercare ointment. |

## Variant / split ledger

Variant / split candidates:

- keep together now: `candidate.anand.shared_symbol_lovemaking` keeps symbol, touch/sex, and return together because the source lane is one shared-symbol body rite.
- approved for direct import, may still need block expansion: Melting Hug metadata repair, Heart Salutation body+connecting variant, Saint Thomas friendship-with-benefits body variant, and Chapter 8 mechanics-only boundary/release forms are no longer waiting on product/safety permission.
- reason: the existing runtime already contains complete records for several lanes, but #414 surfaced where the primary carrier/purpose may not match the source's strongest connection logic.
- import handling: later mechanical import should either reuse the existing superseded candidate block, repair metadata in place, or create a distinct draft/findable variant when the ledger row names a genuinely separate ritual lane.

## Coverage accounting

Primary coverage counts the newly authored inline `approved_for_mechanical_import` candidates. The broader 71-row `approved_for_direct_import` set is governed by the complete ledger above and will need import-block expansion or reuse of superseded packet records during mechanical import.

| Primary carrier | Primary purpose | Count | Candidate IDs |
| --- | --- | ---: | --- |
| body | connecting | 4 | `candidate.anand.partner_dance_witness`, `candidate.anand.shared_symbol_lovemaking`, `candidate.anand.magical_congress_container`, `candidate.saint_thomas.partner_body_intention` |
| body | opening | 1 | `candidate.anand.body_symbol_charge` |
| body | voicing | 2 | `candidate.saint_thomas.body_fluid_sigil_candle`, `candidate.saint_thomas.kink_desire_body_release` |

Secondary support was not counted as primary coverage.

## Validation checklist

- Existing gates reviewed: yes.
- Issue #414 reviewed: yes.
- Issue #413 and PR #415 reviewed: yes.
- Issue #287 mechanical import contract reviewed: yes.
- Runtime `Ritual` model reviewed: yes.
- Runtime authoring, operative-words, and extraction-depth policies reviewed: yes.
- Recent accepted packets reviewed for format: yes.
- Working PDFs inspected locally: yes.
- Repository-safe paraphrase used: yes.
- Long source text copied into repo: no.
- Runtime data changed: no.
- Recommendation eligibility changed: no.
- Direct-use eligibility changed: no.
- Rows marked `approved_for_direct_import` are approved at the extraction-disposition level and still need existing-record reuse or candidate-block expansion before mechanical import.
- Candidates marked `approved_for_mechanical_import` include complete user-facing fields: yes.
- Candidates marked `approved_for_mechanical_import` include runtime-compatible recommendation metadata: yes.
- Candidates marked `approved_for_mechanical_import` include runtime-compatible search metadata: yes.
- Candidates marked `approved_for_mechanical_import` include source grounding and review flags: yes.

Validation commands run for the original #414 PR:

```text
npm run lint:content (passes with existing long-text warnings in runtime data)
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

Validation commands run for this repair branch:

```text
npm run lint:content
git diff --check
```

Result: content lint passes with existing long-text warnings in runtime data. `git diff --check` passes. No runtime data, tests, selector logic, or UI files were changed in this repair branch.
