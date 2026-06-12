# Anand / Saint Thomas adult-intimacy inventory audit

> Status: Post-410 source research audit.
> Scope: source inventory and decision surface only.
> No runtime Ritual data, recommendation eligibility, direct-use eligibility, UI,
> search behavior, or source packet candidate prose changes are made here.

## Why this audit exists

Issue #410 follows the #409 process repair. The old source gates and packets
noticed adult intimacy material in Margot Anand and Sophie Saint Thomas, but
some of the richest body/connecting material was compressed, held, rejected, or
routed away before Tim had a clean decision surface.

This audit re-reads the two working PDFs against the corrected rule:

```text
Inventory first. Eligibility later.
```

Adult, explicit, sex-forward, consent-sensitive, kink-adjacent,
body-fluid-related, technique-heavy, culturally loaded, therapy-adjacent, or
house-voice-challenging material is not omitted for those reasons alone. It is
named in repository-safe paraphrase, labeled, and surfaced for Tim decision.

## Sources and reviewed files

| Source | Working PDF | Existing source gate | Existing packet |
| --- | --- | --- | --- |
| Margot Anand, *The Art of Sexual Magic* | `.moon-table-private/sources/The_Art_of_Sexual_Magic_-_Margot_Anand.pdf` | `docs/research/source-gates/src-connection-anand-art-sexual-magic.md` | `docs/research/ritual-candidates/packet-anand-connection.md` |
| Sophie Saint Thomas, *Sex Witch* | `.moon-table-private/sources/Sex_Witch_-_Sophie_Saint_Thomas.pdf` | `docs/research/source-gates/src-connection-saint-thomas-sex-witch.md` | `docs/research/ritual-candidates/packet-saint-thomas-sex-witch.md` |

The PDFs were inspected locally. This audit does not quote long source text and
does not commit private source text.

## Result

The hypothesis is confirmed with nuance.

The source gate and extraction process did not entirely miss body/connecting
material. It noticed it. But the previous guardrails caused three distortions:

1. Some explicit or technique-heavy material was compressed into broad
   `hold` / `reject` rows instead of being visible as Tim decision-required
   source lanes.
2. Saint Thomas Chapter 2 and Chapter 8 were excluded from extraction in a way
   that made sense under the old safety posture, but under the new rule they
   still need inventory-level representation.
3. Runtime metadata later made several intimate connection records easier to
   recommend for `steadying`, `opening`, `tending`, `voicing`, or `blessing`
   than for primary `body + connecting`, even when the source support is
   connection-forward.

No runtime changes are made here. The correct next step is Tim decision on the
queues below.

## Accounting

| Source | Prior packet inventory | Runtime records imported | Runtime recommendation eligible | Post-410 inventory finding |
| --- | ---: | ---: | ---: | --- |
| Anand | 54 source rows, 28 candidate records | 28 | 24 | Broadly inventoried, but explicit Chapters 7-8 and parts of Chapters 3, 4, 6, and 9 need expanded Tim decision lanes. |
| Saint Thomas | 100 source rows, 47 candidate records | 47 | 37 | Broadly inventoried inside approved ranges, but Chapter 2 and Chapter 8 need inventory-level representation; several adult lanes need Tim decision rather than automatic hold/reject. |

## Review labels used

This audit uses the #409 labels:

```text
adult_intimacy
explicit
sex_forward
consent_sensitive
kink_adjacent
body_fluid
technique_heavy
cultural_or_gender_load
therapy_adjacent
medical_or_somatic_claim
coercive_or_target_control
exact_text_sensitive
house_voice_challenge
direct_source_only_candidate
recommendation_lane_unclear
```

## Anand complete decision inventory

The existing Anand packet remains the baseline inventory for non-decision
rows. This table makes every adult-intimacy decision lane explicit under the
new policy.

| Source item / lane | Source pages | Type | Research use | Review labels | Proposed disposition | Tim decision needed? | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Practice cadence and partner commitment | PDF 18-23 / Hints | practice container | ritual_candidate | adult_intimacy | already_imported | no | Already extracted into low-pressure words/connection records. | No source rework needed. |
| Boundaries, discomfort, and not pushing past readiness | PDF 21-23 / Hints | practice container | both | adult_intimacy, consent_sensitive | already_imported / source_note_only | no | Good process support; should remain shaping metadata and packet notes. | Preserve in future adult lane prompts. |
| Magic Circle setup with altar, candle, markers, purpose, and close | PDF 51-68 / Ch. 2 | ritual | ritual_candidate | adult_intimacy, exact_text_sensitive, cultural_or_gender_load | already_imported / adaptation_review | no for current records; yes for any closer source form | Current record is softened into table/opening. A closer circle rite would need review of cultural/gendered language and exact words. | Optional later closer-source candidate. |
| Sexual power objects and gendered organ symbolism | PDF 51-68 / Ch. 2 | ritual material | hold | explicit, cultural_or_gender_load, house_voice_challenge | tim_decision_required | yes | Source has clear ritual objects, but current Moon & Table import avoided explicit object symbolism. | Decide: reject, private_household_only, or direct_source_only. |
| Melting Hug | PDF 68-69 / Ch. 2 | exercise | ritual_candidate | adult_intimacy, consent_sensitive | already_imported / metadata_review | yes | Runtime currently treats it as `body + steadying` with `connecting` secondary, though source function is shared arrival/connection. | Decide whether later metadata repair should restore primary `body + connecting`. |
| Heart Salutation | PDF 68-69 / Ch. 2 | exercise | ritual_candidate | adult_intimacy, cultural_or_gender_load | already_imported / metadata_review | yes | Runtime makes it `body + blessing`; it may also be valid as `body + connecting` depending on Tim's lane preference. | Decide whether later metadata repair should split or reclassify. |
| Remembering times of magic | PDF 69-73 / Ch. 2 | prompt / reflection | ritual_candidate | adult_intimacy, exact_text_sensitive | already_imported | no | Current packet uses functional prompt structure without copying the source. | No source rework needed. |
| Inner magician initiation | PDF 73-80 / Ch. 2 | guided rite | ritual_candidate | exact_text_sensitive, cultural_or_gender_load, house_voice_challenge | candidate_extract_later / tim_decision_required | yes | Long guided structure and ceremonial identity language were deferred. | Decide whether Moon & Table wants a private initiation/marking lane. |
| Anchoring the magical state | PDF 129-135 / Ch. 3 | body exercise | ritual_candidate | adult_intimacy, technique_heavy, therapy_adjacent | tim_decision_required | yes | Prior packet did not surface it as its own Tim decision lane. | Decide direct_source_only vs extract a non-technique grounding variant. |
| Partner striptease / partner dancing | PDF 136-144 / Ch. 3 | partner exercise | ritual_candidate | adult_intimacy, explicit, sex_forward, consent_sensitive, technique_heavy, house_voice_challenge | tim_decision_required | yes | Clear body/connecting source support, but performance/technique language is not current runtime copy. | Decide private_household_only, direct_source_only, or adapted body+connecting candidate. |
| Shame / wound processing rite | PDF 145-166 / Ch. 3 | guided rite | hold | therapy_adjacent, exact_text_sensitive, medical_or_somatic_claim, house_voice_challenge | tim_decision_required | yes | Old packet held this for therapy boundary. It still must be visible. | Decide reject, direct_source_only, or private review backlog. |
| Laughing pelvis | PDF 172-179 / Ch. 4 | movement exercise | ritual_candidate | adult_intimacy, explicit, technique_heavy, house_voice_challenge | tim_decision_required | yes | Packet extracted a softened laughter/release record, but not the explicit body lane. | Decide whether explicit body release belongs in private grimoire lane. |
| Fire Meditation | PDF 180-186 / Ch. 4 | movement / visualization | ritual_candidate | technique_heavy, exact_text_sensitive, cultural_or_gender_load | candidate_extract_later / tim_decision_required | yes | Long source sequence and visualization; usable only by source-safe adaptation. | Decide later adapted movement/marking candidate or direct_source_only. |
| Wild animal practice | PDF 187-195 / Ch. 4 | movement / role exercise | hold | explicit, cultural_or_gender_load, technique_heavy, house_voice_challenge | tim_decision_required | yes | Old packet held it; source lane remains visible. | Decide reject, direct_source_only, or private_household_only. |
| Solo vision and Magic Symbol work | PDF 214-232 / Ch. 5 | symbol rite | ritual_candidate | adult_intimacy, exact_text_sensitive | already_imported | no | Already extracted into desire, symbol, and altar/table records. | No source rework needed. |
| New relationship vision | PDF 233-237 / Ch. 5 | vision rite | ritual_candidate | adult_intimacy, coercive_or_target_control, exact_text_sensitive | tim_decision_required | yes | New-lover/manifestation framing may become target-control if imported carelessly. | Decide reject or rewrite only as non-targeted opening. |
| Shared love vision and shared Magic Symbol | PDF 238-242 / Ch. 5 | partner rite | ritual_candidate | adult_intimacy, consent_sensitive, exact_text_sensitive | already_imported / metadata_review | yes | Current runtime has strong words/table connecting but not body+connecting. | Decide whether enough or whether to add a later body/connecting shared-symbol variant. |
| Making love with Magic Symbol | PDF 243-249 / Ch. 5 | partner rite | ritual_candidate | explicit, sex_forward, adult_intimacy, technique_heavy, consent_sensitive, direct_source_only_candidate | tim_decision_required | yes | This is a major source-backed body+connecting lane that prior process did not make decision-visible. | Decide direct_source_only, private_household_only, or adapted high-level candidate. |
| Chakra Rub atmosphere/materials | PDF 270-277 / Ch. 6 | body exercise | ritual_candidate | explicit, technique_heavy, medical_or_somatic_claim, cultural_or_gender_load, exact_text_sensitive | tim_decision_required | yes | Old packet kept atmosphere/materials only; explicit body/oil/chakra sequence remains a decision lane. | Decide reject, direct_source_only, or non-technique atmosphere-only extraction. |
| Chakra Breathing / Chakra Wave | PDF 278-310 / Ch. 6 | body / breath exercise | ritual_candidate | technique_heavy, cultural_or_gender_load, medical_or_somatic_claim, exact_text_sensitive | tim_decision_required | yes | Clear body practice, but heavy chakra/somatic claims and long guided sequence. | Decide whether any non-claim body/steadying variant belongs later. |
| Chapters 7-8 explicit partner pleasuring exercises | PDF 312-410 / Chs. 7-8 | partner technique | ritual_candidate | explicit, sex_forward, technique_heavy, consent_sensitive, medical_or_somatic_claim, house_voice_challenge, direct_source_only_candidate | tim_decision_required | yes | Previously collapsed as rejected technique instruction. Under #409 it remains inventory-visible. | Decide reject for app text, direct_source_only, or private_household_only. |
| Channeling orgasmic energy with partner | PDF 411-420 / Ch. 9 | partner energy rite | ritual_candidate | explicit, sex_forward, technique_heavy, cultural_or_gender_load, medical_or_somatic_claim, exact_text_sensitive | tim_decision_required | yes | Strong body+connecting source support but depends on explicit energetic technique. | Decide direct_source_only vs high-level private candidate. |
| Sexual self-empowerment with a symbol | PDF 421-429 / Ch. 9 | symbol/body rite | ritual_candidate | adult_intimacy, explicit, exact_text_sensitive, direct_source_only_candidate | tim_decision_required | yes | Old packet surfaced symbol work, but not this explicit body-symbol lane as a decision. | Decide adapted symbol candidate or direct_source_only. |
| Magical Congress classical/spontaneous styles | PDF 430-462 / Ch. 9 | partner rite | ritual_candidate | explicit, sex_forward, technique_heavy, consent_sensitive, cultural_or_gender_load, exact_text_sensitive, direct_source_only_candidate | tim_decision_required | yes | Source's culminating body+connecting ritual. Prior packet extracted the container, atmosphere, intention, and return, but held the explicit sequence. | Decide whether app should ever point to source pages, create a private-household-only high-level container, or keep reject for app text. |
| Ongoing symbol practice and integration | PDF 375-390 / Epilogue | follow-up pattern | product_followup_pattern | adult_intimacy | already_imported | no | Already appears as symbol-memory follow-up. | No source rework needed. |

### Anand decision queue

These are the Anand decisions Tim needs to make before any later import or
metadata repair:

1. Should explicit partner technique chapters stay `reject_for_app_text`, become
   `direct_source_only`, or become `private_household_only` pointers?
2. Should the culminating Magical Congress be represented only by its safe
   container pieces, or should Moon & Table have a high-level private adult
   ritual that points back to the source?
3. Should `candidate.anand.melting_hug` return to primary `body + connecting`,
   or is `body + steadying` the desired recommendation lane?
4. Should Heart Salutation remain `body + blessing`, or should a separate
   `body + connecting` variant exist?
5. Should the Magic Symbol + body lanes become later private adult candidates,
   or remain direct-source-only?

## Saint Thomas complete decision inventory

The existing Saint Thomas packet remains the baseline inventory for Chapters 1,
3, 4, 5, 6, 7, and 9. This table adds the omitted Chapter 2 / Chapter 8 lanes
and marks all adult-intimacy decision lanes that need Tim choice rather than
automatic hold/reject.

| Source item / lane | Source pages | Type | Research use | Review labels | Proposed disposition | Tim decision needed? | Reason | Future action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Chapter 2 sex education and anatomy overview | PDF 59-69 / Ch. 2 | context | context_only | explicit, medical_or_somatic_claim, technique_heavy | direct_source_only / reject_for_app_text | yes | Old packet excluded the chapter. It should remain visible but should not become Moon & Table instruction. | Decide whether to keep as source context only or reject entirely for app work. |
| Chapter 2 kink glossary and risk-aware framing | PDF 59-69 / Ch. 2 | context | source_note_only | kink_adjacent, explicit, consent_sensitive, medical_or_somatic_claim | source_note_only / tim_decision_required | yes | Useful context for not being coy, but contains sex education and safety advice outside app scope. | Decide whether future adult-lane prompts may use this as reviewer context only. |
| Chapter 1 bodily-fluid correspondence material | PDF 28-29 / Ch. 1 | correspondence | hold | body_fluid, explicit, house_voice_challenge | tim_decision_required | yes | Old packet held it. Under #409 it remains visible, not silently excluded. | Decide reject, direct_source_only, or private_household_only; do not import by default. |
| Gender identity / divine feminine / divine masculine rites | PDF 72-75 / Ch. 3 | blessing / meditation | ritual_candidate | cultural_or_gender_load, exact_text_sensitive, house_voice_challenge | candidate_extract_later / tim_decision_required | yes | Old packet deferred/held these. They may matter but need sensitivity and house-voice review. | Decide later identity/blessing lane or reject. |
| Solo erotic self-practice | PDF 75-76 / Ch. 3 | body rite | ritual_candidate | explicit, sex_forward, technique_heavy, direct_source_only_candidate | tim_decision_required | yes | Old packet held it. It is body ritual but not current recommendation copy. | Decide direct_source_only, private_household_only, or reject. |
| Psychoactive self-love / flying ointment / topical recipes | PDF 77-89 / Ch. 3 | recipe | hold | explicit, medical_or_somatic_claim, technique_heavy, house_voice_challenge | reject_for_app_text / direct_source_only | yes | Old packet held these for material and medical boundary reasons. | Likely reject for app text; Tim can decide if source-only note remains. |
| Targeted partner summoning / obsession oil / enthrallment powder | PDF 91-97 / Ch. 4 | spell | reject | coercive_or_target_control, body_fluid, explicit, sex_forward | tim_decision_required | yes | Old packet held/rejected for coercive attraction. Under #409, it remains named. | Decide final reject vs direct_source_only note. |
| Date / glamour / invitation lanes | PDF 93-100 / Ch. 4 | spell / glamour | ritual_candidate | adult_intimacy, sex_forward, house_voice_challenge | already_imported / metadata_review | yes | Several were imported as opening/blessing/marking rather than connecting. | Decide whether any later search/recommendation metadata should emphasize connection/desire. |
| Just-sex boundary ritual | PDF 101-102 / Ch. 4 | words rite | ritual_candidate | adult_intimacy, explicit, consent_sensitive, sex_forward | already_imported / metadata_review | yes | Current runtime has a primary `words + connecting` record; this is a good explicit-adult lane already preserved safely. | No source rework; decide whether recommendation copy is frank enough. |
| Sex positivity prayer / erotic sigil / two-candle kink clarity | PDF 103-110 / Ch. 5 | prayer / sigil / candle rite | ritual_candidate | adult_intimacy, explicit, sex_forward, kink_adjacent, exact_text_sensitive | already_imported / metadata_review | yes | Imported as candlelight blessing/connecting/voicing; exact source words avoided. | Decide whether these are enough for body/connecting needs or remain candle/words lanes. |
| Play party goal/boundary material | PDF 106-108 / Ch. 5 | planning rite | hold | kink_adjacent, explicit, consent_sensitive, technique_heavy, house_voice_challenge | tim_decision_required | yes | Old packet held as event safety/social advice. | Decide reject for app text or private adult direct-source pointer. |
| Massage oil / incense / smoke / aftercare recipes | PDF 110-117, 127-128 / Ch. 5 | recipe | hold | explicit, medical_or_somatic_claim, technique_heavy, house_voice_challenge | reject_for_app_text / direct_source_only | yes | Recipe/material safety and exact text boundaries. | Likely reject app text; source-only if Tim wants. |
| Anal technique / explicit technique instruction | PDF 111-113 / Ch. 5 | technique | reject | explicit, technique_heavy, medical_or_somatic_claim, direct_source_only_candidate | tim_decision_required | yes | Old packet rejected. Under #409 it stays visible. | Decide reject for app text vs direct_source_only. |
| Fantasy apple / rose fantasy / partner shared intention | PDF 113-122 / Ch. 5 | symbol / partner rite | ritual_candidate | adult_intimacy, explicit, sex_forward, consent_sensitive | already_imported / metadata_review | yes | Strong connection/desire support. Runtime has candle/table connecting but little primary body+connecting. | Decide whether a later body+connecting private candidate is wanted. |
| Threesome / third-party invitation lane | PDF 120-121 / Ch. 5 | planning rite | hold | explicit, consent_sensitive, kink_adjacent, house_voice_challenge | tim_decision_required | yes | Old packet held for third-party consent/product review. | Decide reject, direct_source_only, or private_household_only. |
| Partner sex magic rite | PDF 121-122 / Ch. 5 | partner rite | ritual_candidate | explicit, sex_forward, adult_intimacy, consent_sensitive, direct_source_only_candidate | already_imported / tim_decision_required | yes | Imported safely as candlelight/connecting, but the source's body component was softened. | Decide whether high-level body+connecting private variant should exist. |
| Dry spell / makeup sex / repair lanes | PDF 122-125 / Ch. 5 | water / candle / partner rite | ritual_candidate | adult_intimacy, explicit, sex_forward, consent_sensitive | already_imported / metadata_review | yes | Current runtime shifted one repair lane to `tending`; connection remains secondary. | Decide whether repair-after-rupture should be primary connecting or tending. |
| Public/event confidence charm | PDF 125-126 / Ch. 5 | charm | candidate_extract_later | explicit, sex_forward, house_voice_challenge | tim_decision_required | yes | Old packet deferred. | Decide if Moon & Table wants outward/public adult confidence material. |
| Relationship format tarot / communication / jealousy / forgiveness | PDF 129-136 / Ch. 6 | prompt / spell | ritual_candidate | adult_intimacy, therapy_adjacent, exact_text_sensitive | already_imported / source_note_only | no for current safe forms | Current records are safe relationship tending/voicing. | No source rework unless Tim wants more direct adult framing. |
| Intercultural relationship and family/social glamour | PDF 134-138 / Ch. 6 | protection / glamour | candidate_extract_later | cultural_or_gender_load, therapy_adjacent, house_voice_challenge | tim_decision_required | yes | Deferred for sensitivity/product fit. | Decide later review or reject. |
| Relationship level-up / honey jar / compassion / milestone / moving-in | PDF 138-145 / Ch. 6 | candle / jar / home rite | ritual_candidate | adult_intimacy, coercive_or_target_control, exact_text_sensitive | already_imported / metadata_review | yes | Mostly preserved safely; honey/love-repair must stay non-coercive. | Decide if any remain too controlling or too context-specific. |
| Love necromancy / relationship revival | PDF 140-141 / Ch. 6 | spell | hold | coercive_or_target_control, therapy_adjacent, house_voice_challenge | tim_decision_required | yes | Old packet held; visible now as pressure/control risk. | Decide reject vs direct_source_only. |
| Wedding / commitment doll work | PDF 147-148 / Ch. 6 | object rite | candidate_extract_later | adult_intimacy, exact_text_sensitive, house_voice_challenge | tim_decision_required | yes | Deferred, but could become marking/blessing for relationship milestone. | Decide later extraction or hold. |
| Sex worker protection prayer | PDF 154-155 / Ch. 7 | prayer | hold | cultural_or_gender_load, exact_text_sensitive, house_voice_challenge | tim_decision_required | yes | Old packet held community-specific prayer. | Decide reject, source_note_only, or private/community-specific review. |
| Ex / boundary / digital / dating safety lanes | PDF 150-165 / Ch. 7 | boundary / protection | ritual_candidate | adult_intimacy, consent_sensitive, therapy_adjacent, house_voice_challenge | mixed already_imported / candidate_extract_later / hold | yes for deferred rows | Some are imported safely; dating safety advice held. | Decide which context-specific rows stay direct-use only or reject. |
| Legal action / sexual health / secrecy / abuse-adjacent protection | PDF 157-160 / Ch. 7 | protection | hold / reject | medical_or_somatic_claim, therapy_adjacent, coercive_or_target_control, house_voice_challenge | tim_decision_required | yes | Old packet held/rejected. Under #409, this remains visible. | Likely reject app text; Tim decision needed. |
| Chapter 8 mirror-bed banishing / identity-protection hex lanes | PDF 166-169 / Ch. 8 | hex / protection | reject | coercive_or_target_control, house_voice_challenge, exact_text_sensitive | tim_decision_required | yes | Old source gate excluded all of Chapter 8. New rule requires inventory-level visibility. | Decide final reject vs source_note_only. |
| Chapter 8 money/rebound/revenge attraction lanes | PDF 169-171 / Ch. 8 | spell / recipe | reject | coercive_or_target_control, explicit, sex_forward, body_fluid, medical_or_somatic_claim | tim_decision_required | yes | Targeted outcome and recipe/body-fluid issues. | Likely reject app text. |
| Chapter 8 slut-shamer / psychic truth / breakup courage lanes | PDF 171-174 / Ch. 8 | spell / tarot / fire rite | reject / source_note_only | coercive_or_target_control, exact_text_sensitive, house_voice_challenge | tim_decision_required | yes | Some mechanics resemble boundaries/release, but chapter frame is revenge. | Decide if any mechanics-only non-revenge variant is allowed later. |
| Chapter 8 assault/revenge jar / karma / cemetery fruit lanes | PDF 175-177 / Ch. 8 | hex / revenge | reject | coercive_or_target_control, therapy_adjacent, exact_text_sensitive, house_voice_challenge | tim_decision_required | yes | Strong reject for app recommendation, but no longer silently absent. | Decide final reject or source_note_only. |
| Breakup boldness / relationship mending / trust / bed reset | PDF 178-188 / Ch. 9 | glamour / mending / cleansing | ritual_candidate | adult_intimacy, therapy_adjacent, exact_text_sensitive | already_imported / metadata_review | yes | Current forms are safe, but some context remains direct-use only. | Decide if any should stay non-recommendable. |
| Assault survivor / cheating / gaslighting lanes | PDF 185-192 / Ch. 9 | prayer / clarity / recovery | hold | therapy_adjacent, exact_text_sensitive, house_voice_challenge | tim_decision_required | yes | Old packet held these. Visible now as trauma/abuse-adjacent. | Decide reject, source_note_only, or private direct-source-only. |
| Body smoke / enemy bath bomb / smoke/body purification lanes | PDF 189-191 / Ch. 9 | smoke / bath / revenge | hold / reject | explicit, body_fluid, medical_or_somatic_claim, coercive_or_target_control | tim_decision_required | yes | Old packet held/rejected. | Likely reject app text. |

### Saint Thomas decision queue

These are the Saint Thomas decisions Tim needs to make before any later import
or metadata repair:

1. Should Chapter 2 stay reviewer context only, or be rejected entirely for app
   work?
2. Should body-fluid material stay final reject for app text, or be preserved
   as direct-source-only/private-household-only source notes?
3. Should Chapter 8 be final reject, source-note-only, or mechanics-only
   salvage for non-revenge boundary/release patterns?
4. Should partner sex magic and fantasy/intention lanes get a later high-level
   `body + connecting` private candidate, or remain candle/table/words lanes?
5. Should context-specific adult records such as first date, long distance,
   former lover release, friendship-with-benefits, breakup, and bed reset remain
   direct-use only, or become recommendation eligible in certain lanes?

## Runtime comparison

### Anand runtime state

Anand has 28 runtime records, all direct-use eligible and 24 recommendation
eligible.

Primary runtime cells:

| Cell | Count | Notes |
| --- | ---: | --- |
| `words + connecting` | 4 | Practice night, noticed/appreciation, shared vision, speak before circle. |
| `table + connecting` | 1 | Shared sign. |
| `body + steadying` | 2 | Includes Melting Hug and return-to-room. |
| `candlelight + opening` | 2 | Includes shared altar and candlelit room; connecting is secondary. |
| `vessel + steadying` | 1 | Water Between Us; connecting is secondary. |

Observation: Anand is source-strong for body/connecting, but runtime has no
primary `body + connecting` record. The imported records preserve connection as
secondary in many places, but Choose with me may not surface them when the user
explicitly asks for `body + connecting`.

### Saint Thomas runtime state

Saint Thomas has 47 runtime records, all direct-use eligible and 37
recommendation eligible.

Primary runtime connecting cells:

| Cell | Count | Notes |
| --- | ---: | --- |
| `candlelight + connecting` | 3 | Erotic sigil, partner shared intention, long-distance light. |
| `words + connecting` | 1 | Just-sex boundary string. |
| `vessel + connecting` | 1 | Friendship-with-benefits vessel; not recommendation eligible. |
| `body + connecting` | 0 | Body records exist, but body is paired with blessing, opening, protecting, releasing, steadying, or tending. |

Observation: Saint Thomas supports body/intimacy strongly, but the imported
runtime set has no primary `body + connecting` record. The safest current
records are still useful, but the body/connecting gap is real if Tim wants the
recommendation engine to find an embodied connection ritual without choosing
candlelight, words, or vessel first.

## Recommended next steps

1. Tim reviews the two decision queues above and marks each lane:
   `import_candidate`, `direct_source_only`, `private_household_only`,
   `source_note_only`, `hold`, or `reject`.
2. Create a follow-up issue for metadata-only repair of already imported Anand
   and Saint Thomas records if Tim wants source-strong connection lanes to be
   more discoverable.
3. Create a separate follow-up issue only if Tim approves new private adult
   body/connecting candidates. That issue should author a small number of
   high-level Moon & Table forms without importing technique instructions.
4. Keep Chapter 8 Saint Thomas and the most explicit Anand technique chapters
   out of recommendation unless Tim explicitly approves a private direct-source
   pointer lane.

## Validation checklist

- Existing gates reviewed: yes.
- Existing packets reviewed: yes.
- Working PDFs inspected locally: yes.
- Runtime imported records compared: yes.
- Previously excluded/compressed adult lanes surfaced: yes.
- Repository-safe paraphrase used: yes.
- Long source text copied into repo: no.
- Runtime data changed: no.
- Recommendation eligibility changed: no.
