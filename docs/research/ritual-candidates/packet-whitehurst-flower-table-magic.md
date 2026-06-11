# Ritual candidate packet: Whitehurst flower table magic

## Packet metadata

Packet ID: `packet-whitehurst-flower-table-magic`
Packet status: `canonical_reextraction_ready_for_pr_review`
Researcher: ChatGPT
Date created: 2026-06-10
Date revised: 2026-06-11 under #352 request-changes rework
Parent issues: #334, #352
Related issues: #324, #344, #345, #335, #287, #288
Output path: `docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md`
Source ID: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`

This packet is research content only. It does not create runtime Ritual records. It does not mark any Ritual reviewed, findable, direct-use eligible, recommendation eligible, recommendable, or runtime-ready.

## #352 request-changes repair note

The first #352 PR pass was too narrow. It kept four good orientation-based candidates but reduced the Whitehurst flower-entry lane to backlog categories. This revision keeps those four candidates and expands the packet with concrete flower-entry candidates from PDF pp. 24-360, while keeping preparation-heavy, unsafe, medicalized, target-control, and correspondence-table material held or rejected.

## Assignment and controls

Assigned source: Tess Whitehurst, *The Magic of Flowers: A Guide to Their Metaphysical Uses & Properties*, Llewellyn Publications, 2013, first e-book edition.

Controlling source gate: `docs/research/source-gates/src-plant-whitehurst-magic-of-flowers.md`.

Controlling docs read for #352:

```text
#352
#344
#345
src/data/rituals/types.ts
docs/research/voice/moon-and-table-house-voice-guide.md
docs/research/extraction-depth-policy.md
docs/research/prompts/extraction-packet-prompt-template.md
docs/research/runtime-ritual-authoring-policy.md
docs/research/private-source-text-policy.md
```

The actual Whitehurst PDF available in the workspace was used. Page references use PDF pages.

## Source policy note

Gate verdict: `approved_for_extraction_with_limits`.

The Whitehurst source gate is stricter than the later general 20-word operative-word rule. It allows mechanics extraction and brief anchors, but says generated Moon & Table ritual instructions, spoken copy, and timing language should be newly written unless Tim later enters private exact source wording. This packet therefore uses `ritualWords.mode = "moon_and_table_original"` where spoken words are needed. No exact Whitehurst charm, prayer, blessing, meditation, recipe, flower entry, correspondence table, or distinctive long passage is reproduced.

Held by default: flower essences, essential oils, mists, smoke/incense, baths, topical use, ingestion, flower additions to anyone's food or drink, unsafe plants, medicalized claims, guaranteed outcomes, manipulative attraction, target control, and whole correspondence tables.

## Source sections used

| PDF pages | Section | Extraction decision | Notes |
| ---: | --- | --- | --- |
| 1-10 | Front matter, copyright, contents | context_only | Citation, source identity, and page map. |
| 11-12 | Introduction | context_only | Flower magic frame; no candidate prose copied. |
| 13-15 | Orientation: proximity, gathering, purchased flowers, quiet contemplation | approved_with_limits | Core mechanics for home flower presence, bouquet intention, ethical gathering, offering, and blossom contemplation. |
| 15-16 | Orientation: care, rituals, charms | approved_with_limits | Supports tending a flower as magical action. |
| 16-19 | Orientation: preparations, affinity, correspondences, caution | mixed | Affinity and correspondence support approved as notes; preparation/body-contact methods held. |
| 20-21 | Author's Notes | approved_with_limits | Supports local flowers, asking a flower directly, and offerings after gathering. |
| 24-360 | Individual flower entries | approved_with_limits | Expanded in this pass as named entry rows and selected candidate records. |
| 361-363 | Appendix A | hold | Flower essence preparation is not normal extraction. |
| 364-389 | Appendices B-D | source_note_only | Navigation and timing support only. No database dump. |
| 390-394 | Acknowledgments, bibliography | context_only | Provenance only. |

## Source rite inventory and disposition

This inventory is not a flower encyclopedia and does not expose correspondence tables. It records named flower-entry decisions so the approved pp. 24-360 lane is not hidden as a vague backlog.

| Source item | Source pages | Source location precision | Type | Research use | Brief source description | Likely carriers | Likely purposes | Exact text importance | Disposition | Reason | Future action |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Flower proximity / home presence | 13-14 | page_range | ritual | ritual_candidate | Flower or bouquet enters the house as intentional presence. | plant, table, vessel, words | opening, marking, blessing, steadying | mechanics only | candidate_extract_now | Foundational household flower magic. | C1 |
| Purchased bouquet charged with intention | 14 | exact_page | ritual | ritual_candidate | Purchased flowers are gazed with intention and placed. | plant, vessel, table, words | blessing, opening, voicing | mechanics only | candidate_extract_now | Complete table/vase practice. | C2 |
| Quiet contemplation with blossom | 14-15 | page_range | meditation | ritual_candidate | Sit near blossom, present one concern or question, receive quietly. | plant, body, words | steadying, voicing, remembering | mechanics only | candidate_extract_now | Complete source practice. | C3 |
| Ethical gathering and offering | 14, 20-21 | page_range | ritual | ritual_candidate | Ask before gathering; give thanks afterward. | plant, words, body, vessel | tending, blessing, marking | mechanics only | candidate_extract_now | Complete source practice. | C4 |
| Flower care as repeated practice | 15 | exact_page | ritual | ritual_candidate | Care for a flower or flowering plant while holding intention. | plant, body, words | tending, blessing, marking | mechanics only | candidate_extract_later | Better with living-plant lane review. | Later living-plant variant. |
| Affinity flower choice | 18 | exact_page | prompt | both | Notice which flower draws attention and begin there. | plant, words | opening, marking, steadying | mechanics only | source_note_only | Selection logic, not standalone here. | Use in recommender explanation. |
| Ask the flower directly | 20 | exact_page | prompt | both | Ask a present flower what it offers when not in the source list. | plant, words, body | opening, voicing | mechanics only | candidate_extract_later | Promising but needs anti-invention guardrail. | Later source-note-backed form. |
| African Daisy entry mechanics | 24-27 | page_range | charm | hold | Magical power amulet and mystique practices lean on smoke, oils, stones, body wearing. | plant, vessel, words, candlelight | blessing, opening, protecting, marking | private review useful | hold | Safety/preparation-heavy. | Safe altar/token only later. |
| Agapanthus entry mechanics | 28-32 | page_range | ritual | ritual_candidate | Contemplation with a blossom and thanks by water at roots. | plant, words, body | blessing, steadying, opening | mechanics only | candidate_extract_now | Simple quality-receiving practice. | C5 |
| Alyssum entry mechanics | 33-36 | page_range | charm | ritual_candidate | Comfort, gentleness, grounding, peace; anchoring charm is external. | plant, vessel, body, words | steadying, protecting, tending | private review useful | candidate_extract_later | Needs charm safety and simplification. | Later safe token candidate. |
| Amaryllidaceae entry mechanics | 37-39 | page_range | ritual | hold | Creativity, joy, self-acceptance; most uses point to essence/body contact. | plant, body, words | opening, blessing, steadying | mechanics only | hold | Preparation/body lane. | Contemplation-only later. |
| Aster entry mechanics | 40-46 | page_range | ritual | ritual_candidate | Beginnings, transitions, protection, love altar, fresh flowers. | plant, table, vessel, candlelight, words, doorway | marking, opening, protecting, connecting, blessing | private review useful | candidate_extract_later | Useful but several practices are mist/altar/flame heavy. | Later transition marker. |
| Baby Blue Eyes entry mechanics | 47-51 | page_range | ritual | hold | Self-kindness, trust, release; exact charm/essence material. | plant, words, vessel | steadying, releasing, blessing, connecting | private review useful | hold | Sensitive framing and preparation lane. | Later symbolic form only. |
| Bird of Paradise entry mechanics | 52-55 | page_range | ritual | ritual_candidate | Freedom, adventure, perception, confidence. | plant, table, words | opening, marking, blessing | mechanics only | candidate_extract_later | Good atmosphere marker but less central. | Later adventure marker. |
| Black-Eyed Susan entry mechanics | 56-58 | page_range | ritual | ritual_candidate | Confidence, optimism, boundaries. | plant, words, table | steadying, protecting, blessing | mechanics only | candidate_extract_later | Safe presence candidate after review. | Later courage flower. |
| Bleeding Heart entry mechanics | 59-61 | page_range | ritual | ritual_candidate | Compassion, love, release. | plant, words, table | connecting, releasing, steadying | mechanics only | candidate_extract_later | Useful heart flower; avoid health claims. | Later heart table candidate. |
| Bougainvillea entry mechanics | 62-65 | page_range | ritual | ritual_candidate | Joy, celebration, home/beauty, vitality. | plant, doorway, table | opening, blessing, protecting | mechanics only | candidate_extract_later | Good threshold/atmosphere support. | Later doorway variant. |
| Calla Lily entry mechanics | 66-68 | page_range | ritual | ritual_candidate | Grief, purity, elegance, spiritual beauty. | plant, table, vessel | remembering, steadying, blessing | mechanics only | candidate_extract_later | Remembrance lane needs care. | Later remembrance candidate. |
| Carnation entry mechanics | 69-72 | page_range | ritual | ritual_candidate | Funeral/grief associations, heart support, beauty, love; manipulative potion rejected. | plant, table, vessel, words | remembering, steadying, blessing, connecting | private review useful | candidate_extract_now | Strong memory/table lane if non-medical and non-coercive. | C6 |
| Chamomile entry mechanics | 73-78 | page_range | ritual | ritual_candidate | Peace, comfort, harmony, room gentleness. | plant, table, vessel | steadying, tending, blessing | mechanics only | candidate_extract_now | Good room/table flower without tea/bath use. | C7 |
| Cinquefoil entry mechanics | 79-83 | page_range | charm | ritual_candidate | Protection, luck, fivefold charm material. | plant, vessel, words | protecting, marking | private review useful | candidate_extract_later | Charm-heavy. | Later external charm. |
| Camellia entry mechanics | 84-88 | page_range | ritual | ritual_candidate | Friendship, devotion, authentic beauty, message/gift. | plant, words, table | connecting, voicing, blessing | mechanics only | candidate_extract_later | Strong message lane. | Later friendship flower. |
| Cherry Blossom entry mechanics | 89-92 | page_range | ritual | ritual_candidate | Gentleness, impermanence, beauty, forgiveness, heart opening. | plant, table, words | opening, releasing, blessing, connecting | mechanics only | candidate_extract_now | Strong seasonal/table release form. | C8 |
| Cherry Plum entry mechanics | 93-97 | page_range | ritual | ritual_candidate | Energy, fresh start, clearing, optimism. | plant, words | opening, steadying, releasing | mechanics only | candidate_extract_later | Good fresh-start support; preparation held. | Later opening candidate. |
| Chrysanthemum entry mechanics | 98-101 | page_range | ritual | ritual_candidate | Seasonal longevity, cheer, protection, remembrance. | plant, table, vessel | remembering, blessing, protecting, marking | mechanics only | candidate_extract_later | Strong autumn table lane. | Later seasonal table. |
| Citrus Blossom entry mechanics | 102-106 | page_range | ritual | hold | Joy, romance, prosperity, purification; scent/direct-contact/outcome-heavy. | plant, body, vessel | opening, blessing, connecting | private review useful | hold | Fragrance/direct-contact and outcome-heavy. | Safe blossom presence only later. |
| Clover entry mechanics | 107-112 | page_range | ritual | candidate_later | Luck, blessing, gentle strength, faery altar. | plant, words, vessel | marking, blessing, opening | private review useful | candidate_extract_later | Some bath/ingestion/faery material held. | Later luck marker. |
| Crabapple entry mechanics | 113-114 | page_range | ritual | ritual_candidate | Cleansing, purification, self-acceptance. | plant, words, vessel | releasing, blessing, steadying | mechanics only | candidate_extract_later | Good symbolic cleansing; preparation held. | Later table-clearing variant. |
| Crepe Myrtle entry mechanics | 115-118 | page_range | ritual | ritual_candidate | Beauty, resilience, confidence. | plant, table, words | blessing, steadying, marking | mechanics only | candidate_extract_later | Good safe beauty/resilience marker. | Later candidate. |
| Crocus entry mechanics | 119-120 | page_range | ritual | ritual_candidate | Spring opening, first flowers, hope, emergence. | plant, table | opening, marking, blessing | mechanics only | candidate_extract_now | Strong seasonal marker. | C9 |
| Dahlia entry mechanics | 121-124 | page_range | ritual | hold | Shadow/emotion material includes mental-health-adjacent framing. | plant, table, words | voicing, steadying, connecting | mechanics only | hold | Mental-health boundary. | Do not import now. |
| Daisy entry mechanics | 125-128 | page_range | ritual | ritual_candidate | Simplicity, purity, purification, altar/bouquet uses. | plant, table, words | blessing, releasing, marking | private review useful | candidate_extract_now | Strong table-clearing form. | C10 |
| Dandelion entry mechanics | 129-131 | page_range | ritual | ritual_candidate | Wish, seed release, grounding, protection. | plant, words, vessel | marking, releasing, protecting | mechanics only | candidate_extract_now | Wish/release can stay safe and external. | C11 |
| Datura entry mechanics | 132-134 | page_range | ritual | reject | Vision/threshold material with unsafe plant. | plant, body, words | opening, protecting | private review useful | reject | Unsafe and off-lane. | Do not use. |
| Echinacea entry mechanics | 135-138 | page_range | ritual | ritual_candidate | Strength, resilience, protection. | plant, table, words | steadying, protecting, blessing | mechanics only | candidate_extract_later | Avoid immunity/health claims. | Later strength marker. |
| Forget-Me-Not entry mechanics | 139-141 | page_range | ritual | ritual_candidate | Memory, bond, perspective, preservation. | plant, vessel, words | remembering, connecting, marking | mechanics only | candidate_extract_now | Strong pressed/dried memory token. | C12 |
| Foxglove entry mechanics | 142-145 | page_range | ritual | hold | Protection/courage but toxic plant and mists. | plant, doorway, body | protecting | private review useful | hold | Unsafe plant/contact. | Symbolic-only later. |
| Freesia entry mechanics | 146-149 | page_range | ritual | ritual_candidate | Clarity, confidence, cheer. | plant, table, words | voicing, steadying, opening | mechanics only | candidate_extract_now | Safe bouquet/witness practice. | C13 |
| Geranium entry mechanics | 150-158 | page_range | ritual | ritual_candidate | Truth, positivity, protection, contemplation with question. | plant, words, body | voicing, steadying, protecting | mechanics only | candidate_extract_now | Strong ask-the-flower truth form. | C14 |
| Heather entry mechanics | 159-161 | page_range | ritual | ritual_candidate | Heritage, ancestors, home memory, protection. | plant, table, words | remembering, blessing, protecting | private review useful | candidate_extract_later | Keep remembrance-only unless spirit lane approved. | Later memory table. |
| Hibiscus entry mechanics | 162-165 | page_range | ritual | hold | Passion, beauty, attraction, joy. | plant, body, words | connecting, opening, blessing | private review useful | hold | Sensual/attraction and body lane. | Self-blessing only later. |
| Holly entry mechanics | 166-168 | page_range | ritual | ritual_candidate | Home protection, winter, boundaries. | plant, doorway, table | protecting, marking, blessing | mechanics only | candidate_extract_later | Sharp/plant safety review. | Later winter boundary. |
| Hollyhock entry mechanics | 169-173 | page_range | ritual | ritual_candidate | Home, ancestry, family, thresholds. | plant, doorway, table | blessing, remembering, protecting | mechanics only | candidate_extract_later | Good home-place marker. | Later home marker. |
| Honeysuckle entry mechanics | 174-178 | page_range | ritual | ritual_candidate | Sweet memory, love, homecoming. | plant, doorway, words | remembering, connecting, opening | mechanics only | candidate_extract_later | Avoid attraction manipulation. | Later homecoming. |
| Hyacinth entry mechanics | 179-181 | page_range | ritual | reject | Influence/glamour and strong scent/direct-contact lane. | plant, body, words | blessing, connecting, voicing | private review useful | reject | Influence framing. | Do not use now. |
| Hydrangea entry mechanics | 182-187 | page_range | ritual | ritual_candidate | Boundaries, coolness, apology, protection. | plant, table, doorway, vessel, words | protecting, steadying, voicing | mechanics only | candidate_extract_now | Useful boundary bowl. | C15 |
| Impatiens entry mechanics | 188-190 | page_range | ritual | ritual_candidate | Patience, soothing, gentleness. | plant, words, table | steadying, tending | mechanics only | candidate_extract_later | Remedy claims held. | Later patience vase. |
| Iris entry mechanics | 191-196 | page_range | ritual | ritual_candidate | Messenger/bridge, love-drawing spell, protection traditions. | plant, words, table | voicing, opening, marking | private review useful | candidate_extract_later | Love-drawing and bath material held; message lane promising. | Later message candidate. |
| Jasmine entry mechanics | 197-199 | page_range | ritual | hold | Romance, prosperity, luxury; fragrance/body lane. | plant, body, vessel | connecting, blessing, opening | private review useful | hold | Fragrance/direct-contact/attraction. | Hold. |
| Kalanchoe entry mechanics | 200-202 | page_range | ritual | ritual_candidate | Resilience, cheer, everyday houseplant magic. | plant, table | tending, steadying, blessing | mechanics only | candidate_extract_later | More living-plant lane. | Later resilience marker. |
| Lantana entry mechanics | 203-207 | page_range | ritual | ritual_candidate | Boundaries, adaptability, protection. | plant, doorway, table | protecting, steadying | mechanics only | candidate_extract_later | Household safety review. | Later source note. |
| Lavender entry mechanics | 208-216 | page_range | ritual | ritual_candidate | Calm, love, relationship repair, jar/altar/dried flower. | plant, vessel, table, words | steadying, connecting, releasing, blessing | private review useful | candidate_extract_later | Strong but exact relationship sequence/private review. | Later mutual connection. |
| Lilac entry mechanics | 217-219 | page_range | ritual | ritual_candidate | Memory, home, first love, nostalgia. | plant, table, vessel, words | remembering, connecting, blessing | mechanics only | candidate_extract_now | Strong memory/home flower. | C16 |
| Lily entry mechanics | 220-224 | page_range | ritual | hold | Purity, angels, grace; household pet safety concern. | plant, table | blessing, remembering | mechanics only | hold | Safety/spirit review. | Symbolic-only unless reviewed safe. |
| Lupine entry mechanics | 225-227 | page_range | ritual | ritual_candidate | Confidence, imagination, liminal courage. | plant, words, table | opening, steadying, blessing | mechanics only | candidate_extract_later | Safety review. | Later courage candidate. |
| Magnolia entry mechanics | 228-231 | page_range | ritual | ritual_candidate | Ancient wisdom, personal power altar, single blossom in water. | plant, table, vessel, candlelight | blessing, marking, opening | mechanics only | candidate_extract_now | Strong single-blossom altar/table form. | C17 |
| Manuka entry mechanics | 232-234 | page_range | ritual | hold | Clearing/protection/sweetness but preparation and provenance concerns. | plant, vessel, body | protecting, releasing, blessing | private review useful | hold | Preparation/fragrance. | Hold. |
| Marigold (Calendula) entry mechanics | 235-239 | page_range | ritual | ritual_candidate | Sun blessing, happiness, relationship charm, comfort. | plant, table, words | blessing, connecting, marking | private review useful | candidate_extract_now | Strong offering/table flower when non-medical. | C18 |
| Marigold (Tagetes) entry mechanics | 240-244 | page_range | ritual | ritual_candidate | Grief, protection, ancestors/dead, doorway garlands. | plant, table, doorway, words | protecting, remembering, marking | private review useful | candidate_extract_later | Cultural/ancestor review needed. | Later seasonal remembrance. |
| Morning Glory entry mechanics | 245-248 | page_range | ritual | hold | Opening/dream/new day but seed concerns. | plant, doorway, words | opening, marking | private review useful | hold | Seed/out-of-scope risk. | Image/flower-only later. |
| Narcissus entry mechanics | 249-252 | page_range | ritual | ritual_candidate | Joy, new year/spring, self-regard. | plant, table, vessel | opening, blessing, marking | mechanics only | candidate_extract_later | Good seasonal marker; safety review. | Later morning vase. |
| Nasturtium entry mechanics | 253-257 | page_range | ritual | ritual_candidate | Creativity, courage, nonconformity. | plant, table, words | opening, blessing, voicing | mechanics only | candidate_extract_later | Avoid preparation use. | Later brave color. |
| Oak entry mechanics | 258-261 | page_range | ritual | ritual_candidate | Flower/tree wisdom, strength, ancestors, protection. | plant, table, words | remembering, protecting, steadying | mechanics only | candidate_extract_later | Tree/flower lane. | Later tree note. |
| Oleander entry mechanics | 262-265 | page_range | ritual | reject | Protection/release but unsafe plant. | plant | protecting, releasing | private review useful | reject | Unsafe for household ritual. | Do not use. |
| Orchid entry mechanics | 266-269 | page_range | ritual | ritual_candidate | Beauty, devotion, refinement, spiritual intuition. | plant, table, words | connecting, blessing, opening | mechanics only | candidate_extract_later | Good devotion table lane. | Later devotion candidate. |
| Pansy / Viola / Violet entry mechanics | 270-273 | page_range | ritual | ritual_candidate | Reflection, thoughts, clarity, altar/paper under bouquet. | plant, table, vessel, words | voicing, remembering, steadying | mechanics only | candidate_extract_now | Strong reflection bowl/table form. | C19 |
| Peony entry mechanics | 274-278 | page_range | ritual | ritual_candidate | Beauty, prosperity, emotional balance, flowering abundance. | plant, table, words | blessing, opening, steadying | mechanics only | candidate_extract_later | Avoid prosperity guarantees. | Later beauty table. |
| Petunia entry mechanics | 279-282 | page_range | ritual | ritual_candidate | Clearing resentment, calming, household mood. | plant, table, words | releasing, steadying, blessing | mechanics only | candidate_extract_later | Good release candidate. | Later table release. |
| Pittosporum entry mechanics | 283-286 | page_range | ritual | ritual_candidate | Sweetness, balance, gentleness. | plant, table, vessel | steadying, blessing | mechanics only | candidate_extract_later | Good safe atmosphere if flower reviewed. | Later sweetness marker. |
| Plumeria entry mechanics | 287-291 | page_range | ritual | hold | Liberation, long-distance relationship, love, fragrance/body practices. | plant, body, words | connecting, releasing, opening | private review useful | hold | Fragrance/romance/body lane. | Hold. |
| Poppy entry mechanics | 292-297 | page_range | ritual | hold | Sleep, death/grief, remembrance, dream material. | plant, vessel, words | remembering, steadying | private review useful | hold | Sleep/medicine/death lane needs review. | Later symbolic-only. |
| Rose entry mechanics | 298-303 | page_range | ritual | ritual_candidate | Love, friendship, divine love, cleansing, beauty, witness/gift. | plant, table, words, vessel | connecting, blessing, voicing, releasing | private review useful | candidate_extract_now | Strong witness/message lane if non-coercive. | C20 |
| Sage Blossom entry mechanics | 304-307 | page_range | ritual | hold | Clearing, self-respect, mists, daily ritual. | plant, body, vessel, words | protecting, releasing, steadying | private review useful | hold | Mist/body/repeated exact sequence. | Later external form. |
| Snapdragon entry mechanics | 308-312 | page_range | ritual | ritual_candidate | Courage, protection, hex reversal. | plant, doorway, words | protecting, steadying | private review useful | candidate_extract_later | Protection language needs careful product review. | Later boundary marker. |
| Sunflower entry mechanics | 313-318 | page_range | ritual | ritual_candidate | Solar joy, opening, fertility, confidence, light. | plant, table, doorway | opening, blessing, marking | mechanics only | candidate_extract_now | Strong room-opening marker if non-fertility. | C21 |
| Sweet Pea entry mechanics | 319-322 | page_range | ritual | hold | Friendship/feminine power, scent, bath/altar, interpersonal social claims. | plant, body, table | connecting, blessing | private review useful | hold | Body/social lane. | Later friendship-only. |
| Tuberose entry mechanics | 323-325 | page_range | ritual | ritual_candidate | Intuition, table/desk reading, single flower or bouquet. | plant, table, words | voicing, opening, steadying | mechanics only | candidate_extract_now | Strong table/reading question form. | C22 |
| Tulip entry mechanics | 326-331 | page_range | ritual | ritual_candidate | Love, gratitude, beauty, simple vase practices. | plant, vessel, table, words | blessing, connecting, marking | mechanics only | candidate_extract_later | Strong gratitude vase but source review needed. | Later gratitude candidate. |
| Valerian entry mechanics | 332-335 | page_range | ritual | hold | Sleep, dreams, calm, body/preparation associations. | plant, body, vessel | steadying, remembering | private review useful | hold | Sleep/preparation lane. | Hold. |
| Vervain entry mechanics | 336-340 | page_range | ritual | ritual_candidate | Blessing, divine alignment, enchantment, ritual herb/flower. | plant, words, vessel | blessing, opening, voicing | private review useful | candidate_extract_later | Charm/spirit language review. | Later blessing form. |
| Water Lily entry mechanics | 344-349 | page_range | ritual | ritual_candidate | Stillness, emotional balance, water-bowl meditation. | plant, vessel, body, words | steadying, voicing, opening | mechanics only | candidate_extract_now | Strong still bowl form. | C23 |
| Wisteria entry mechanics | 350-354 | page_range | ritual | ritual_candidate | Comfort, gentleness, grieving support, home beauty. | plant, table, doorway | steadying, remembering, blessing | mechanics only | candidate_extract_later | Good household comfort candidate. | Later comfort marker. |
| Yarrow entry mechanics | 355-358 | page_range | ritual | ritual_candidate | Protection, courage, boundaries, healing traditions. | plant, doorway, words | protecting, steadying | private review useful | candidate_extract_later | Medical/protection boundary. | Later boundary source note. |
| Ylang Ylang entry mechanics | 359-360 | page_range | ritual | hold | Joy, love, scent, essential oil/body/fragrance practices. | plant, body, vessel | connecting, blessing, opening | private review useful | hold | Essential oil/fragrance/body lane. | Hold. |
| Appendix B magical uses overview | 364-383 | chapter_range | correspondence_with_action | source_note_only | Purpose-to-flower navigation index. | plant, words | marking, blessing, opening | do not reproduce | source_note_only | Extraction navigation only. | No runtime database. |
| Appendix C elemental correspondences | 384-386 | page_range | correspondence_with_action | source_note_only | Flower lists by element. | plant, words | marking, opening | do not reproduce | source_note_only | Timing support only. | Future source-note cards. |
| Appendix D planetary correspondences | 387-389 | page_range | correspondence_with_action | source_note_only | Flower lists by planet. | plant, words | marking, opening | do not reproduce | source_note_only | Timing support only. | Future source-note cards. |
| Acknowledgments and bibliography | 390-394 | page_range | context_only | context_only | Provenance/future source discovery only. | words | remembering | mechanics only | context_only | Not extraction material. | No action. |

## Packet metrics

```text
source_items_inventoried: 82
candidate_extract_now: 23
candidate_extract_later: 37
private_excerpt_reference: 0
items_with_private_excerpt_recommended: 25
source_note_only: 4
context_only: 3
hold: 13
reject: 5
remaining_unreviewed_source_sections: none at source-accounting level; item-level verification remains required before direct-use review
remaining_extraction_backlog: 37 candidate_extract_later rows plus held safety-heavy lanes
```

## Common runtime posture for all `candidate_extract_now` records

```ts
status: "draft"
availability: {
  findable: false,
  directUseEligible: false,
  recommendationEligible: false
}
recommendationMetadata.eligibility: {
  recommendable: false,
  missing: ["human_review", "source_verification"]
}
```

## Coverage summary

| Candidate ID | Primary carrier | Primary purpose |
| --- | --- | --- |
| `whitehurst-flower-on-the-table` | plant | marking |
| `whitehurst-bouquet-with-intention` | vessel | blessing |
| `whitehurst-blossom-contemplation` | plant | voicing |
| `whitehurst-ask-before-gathering` | plant | tending |
| `whitehurst-receive-flower-quality` | plant | blessing |
| `whitehurst-carnation-beside-memory` | table | remembering |
| `whitehurst-chamomile-room-bowl` | vessel | steadying |
| `whitehurst-cherry-blossom-soft-release` | plant | releasing |
| `whitehurst-first-crocus-marker` | plant | opening |
| `whitehurst-daisy-clears-table` | table | blessing |
| `whitehurst-dandelion-wish-breath` | plant | marking |
| `whitehurst-pressed-forget-me-not` | plant | remembering |
| `whitehurst-freesia-clarity-bouquet` | plant | voicing |
| `whitehurst-geranium-truth-sentence` | words | voicing |
| `whitehurst-hydrangea-boundary-bowl` | vessel | protecting |
| `whitehurst-lilac-remembers-house` | plant | remembering |
| `whitehurst-single-blossom-altar` | table | blessing |
| `whitehurst-marigold-offering-bowl` | vessel | blessing |
| `whitehurst-pansy-reflection-bowl` | vessel | voicing |
| `whitehurst-rose-as-witness` | plant | connecting |
| `whitehurst-sunflower-opens-room` | plant | opening |
| `whitehurst-tuberose-reading-table` | table | voicing |
| `whitehurst-water-lily-still-bowl` | vessel | steadying |

## Candidate research records

### C1. `whitehurst-flower-on-the-table`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Flower on the Table
ritual body / practice: Choose one household-safe flower or small bouquet already in the house, garden, or florist bundle. Put it in clean water and set it at the table before the meal, conversation, or evening begins. Stand or sit with it for one quiet breath and say: "This flower marks what is beginning here." Name the moment in plain words: the first dinner after a hard week, the start of a new month, a welcome home, or a return to peace. Leave the flower on the table while the household moves around it. When the moment is complete or the flower fades, thank it for marking the threshold and move it to compost or another safe return place.
intention: Mark a household moment with a living flower so the beginning has a visible center.
bestWindow: Useful at the start of a meal, evening, week, month, visit, repair conversation, or seasonal turn. Source timing is helpful rather than required.
questionToCarry: What is beginning at this table?
whyThisFitsIngredients: { checkInHooks: ["something needs to be marked", "household moment wants a visible center"], timingHooks: ["meal", "evening", "seasonal turn"], lunarPlanetarySeasonalHooks: ["new moon or seasonal first flowers can strengthen opening language"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "flower as primary carrier; table/vessel/words support the marking", sourceBackedRationale: "Whitehurst treats proximity as the simplest flower magic and supports bringing a flower or bouquet into the home for a conscious magical purpose.", notForOrHoldNotes: "Hold for unsafe flowers or preparation/body-contact work." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "marking", "table"], secondarySelectionSignals: ["opening", "blessing", "vessel"], exclusionSignals: ["ingestion", "oils", "smoke", "target-control"], timingSignal: "helpful", confidenceNotes: "Strong source fit; operational Moon & Table form." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Orientation", sourceLocation: "PDF pp. 13-14", sourceSummary: "Flower/bouquet proximity in the home may be consciously employed for a magical purpose.", sourceSupports: "flower as home presence; conscious purpose; household placement", moonAndTableChanges: "Table-centered marking form, original spoken line, and safe return close.", doNotImport: ["flower-property database behavior", "preparation-heavy methods"] }]
recommendation metadata: { purposes: { primary: `marking`, secondary: [`opening`, `blessing`], refinement: "household beginning marked by a flower" }, carriers: { primary: `plant`, secondary: [`table`, `vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "one shared placement; optional shared naming" }, timing: { relationship: `helpful`, contexts: ["beginning", "meal", "evening", "seasonal_turn_optional"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["flower", "table", "marking", "beginning", "home"], keywords: ["flower on the table", "bouquet", "household threshold"], materials: ["household-safe flower", "small bouquet", "vase or cup", "clean water"], places: ["table", "kitchen table", "dining table"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst flower proximity` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Verify chosen flower is household-safe before direct-use."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "This flower marks what is beginning here.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 13-14", useContext: `spoken`, note: "Source supports conscious purpose; wording is Moon & Table original under Whitehurst gate." }]
import readiness label: `approved_for_mechanical_import`

### C2. `whitehurst-bouquet-with-intention`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Give the Bouquet Its Purpose
ritual body / practice: Set a purchased or gathered household-safe bouquet in clean water. Before placing it in the room, hold the vase or cup in both hands and look at the flowers long enough for the room to quiet. Bring one intention to mind as if it already has a place in the house: welcome, tenderness, courage, celebration, repair, or another honest purpose. Say: "Hold this purpose in the house." Put the bouquet where it can be seen without being in the way. Let it stand there through the meal, evening, or day. When the flowers fade, thank them and clear the water and stems away.
intention: Give a bouquet a clear household purpose and let it carry that purpose visibly.
bestWindow: Best when fresh flowers enter the house, especially before a shared evening, welcome, repair, celebration, or new beginning. Source timing is none required.
questionToCarry: What is this bouquet being asked to hold?
whyThisFitsIngredients: { checkInHooks: ["specific household atmosphere desired", "visible but simple ritual wanted"], timingHooks: ["fresh flowers arrive", "before guests", "before a private evening"], lunarPlanetarySeasonalHooks: ["waxing moon or Venus-touched timing may support invitation if already available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "vase/bouquet carry blessing through visible placement", sourceBackedRationale: "Whitehurst supports pausing with purchased flowers, gazing, conjuring intention, and sending it into the blossoms.", notForOrHoldNotes: "Not for coercive intentions or unsafe flowers." }
howThisWasChosenIngredients: { primarySelectionSignals: ["vessel", "blessing", "fresh flowers"], secondarySelectionSignals: ["plant", "table", "words"], exclusionSignals: ["guaranteed outcomes", "target-control"], timingSignal: "none", confidenceNotes: "Direct source architecture rewritten in house voice." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Orientation", sourceLocation: "PDF p. 14", sourceSummary: "Purchased flowers may be gazed at and intentionally charged for a magical purpose.", sourceSupports: "purchased bouquet; gaze; felt intention; intentional placement", moonAndTableChanges: "Adds concise original spoken line and household close.", doNotImport: ["long source prose", "manifestation guarantee", "target-control uses"] }]
recommendation metadata: { purposes: { primary: `blessing`, secondary: [`opening`, `voicing`, `connecting`], refinement: "flower-vase blessing for household atmosphere" }, carriers: { primary: `vessel`, secondary: [`plant`, `table`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "shared vase placement; optional one-word purpose from each" }, timing: { relationship: `none`, contexts: ["fresh_flowers", "welcome", "repair", "celebration"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["bouquet", "vase", "blessing", "intention"], keywords: ["bouquet with intention", "vase blessing", "purchased flowers"], materials: ["household-safe bouquet", "vase or cup", "clean water"], places: ["table", "kitchen", "living room"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst purchased flowers` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Review that purpose language stays non-coercive."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Hold this purpose in the house.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF p. 14", useContext: `spoken`, note: "Source supports intention sent into blossoms; wording is original." }]
import readiness label: `approved_for_mechanical_import`

### C3. `whitehurst-blossom-contemplation`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Sit with the Blossom
ritual body / practice: Sit or stand comfortably near a living flowering plant or a fresh household-safe blossom. Let your breath settle and look at the flower until the room feels quieter. Bring one concern, desire, or question to mind and present it silently to the flower. Do not force an answer. Let an image, phrase, sensation, or simple quiet arrive if it arrives. Say: "Thank you for what you showed me." Close by stepping back from the flower and writing one sentence only if something needs to be remembered.
intention: Let a flower become a quiet witness for one question, concern, or desire.
bestWindow: Good when the user needs a small practice, a quiet answer, or a moment with a living/fresh blossom. Source timing is none required.
questionToCarry: What did the flower make easier to hear?
whyThisFitsIngredients: { checkInHooks: ["clarity needed", "gentle voicing needed"], timingHooks: ["quiet morning", "after work", "before sleep", "before a conversation"], lunarPlanetarySeasonalHooks: ["reflective lunar timing may shape explanation when present"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "flower carries quiet question; body and words support close", sourceBackedRationale: "Whitehurst gives quiet contemplation with a blossom as a primary flower magic method.", notForOrHoldNotes: "Not for diagnosis, therapy, or guaranteed guidance." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "voicing", "quiet question"], secondarySelectionSignals: ["steadying", "remembering"], exclusionSignals: ["medical guidance", "unsafe flower"], timingSignal: "none", confidenceNotes: "Direct method from Orientation section." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Orientation", sourceLocation: "PDF pp. 14-15", sourceSummary: "The source describes sitting/standing near a blossom, relaxing, gazing, presenting a concern, and receiving what comes.", sourceSupports: "posture near flower; relaxed gaze; presenting concern; optional note-taking", moonAndTableChanges: "Keeps the structure and adds original close.", doNotImport: ["therapy framing", "guaranteed message claims"] }]
recommendation metadata: { purposes: { primary: `voicing`, secondary: [`steadying`, `remembering`], refinement: "silent question carried by flower contemplation" }, carriers: { primary: `plant`, secondary: [`body`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "shared quiet practice with private or optional spoken questions" }, timing: { relationship: `none`, contexts: ["quiet", "before_sleep", "before_conversation"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["flower contemplation", "quiet", "question", "voicing"], keywords: ["sit with the blossom", "flower witness", "quiet contemplation"], materials: ["living flowering plant or household-safe blossom"], places: ["garden", "table", "window"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst quiet contemplation` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep symbolic/ritual listening, not therapy or divination guarantee."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Thank you for what you showed me.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 14-15", useContext: `closing`, note: "Original close supported by source relationship-with-flower mechanics." }]
import readiness label: `approved_for_mechanical_import`

### C4. `whitehurst-ask-before-gathering`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Ask Before Gathering
ritual body / practice: Stand near the flower you are considering gathering. Before cutting or picking it, pause and tell the flower inwardly what help you are asking for. Ask whether it is right to gather this blossom. Wait for the body answer: open, relaxed, and easy means yes; closed, tight, or doubtful means no. If the answer is no, leave the flower and return another day. If the answer is yes, gather gently and take only what is needed. Close by giving simple thanks: a little clean water at the roots, care for the plant's place, or a whispered thank-you.
intention: Gather a flower through permission, restraint, and thanks rather than taking it as a prop.
bestWindow: Use before any flower is gathered from a garden or permitted outdoor place. Source timing is required by action context, not by lunar phase.
questionToCarry: Did I take this flower in right relationship?
whyThisFitsIngredients: { checkInHooks: ["flower gathering planned", "relational flower practice desired"], timingHooks: ["immediately before gathering", "garden visit", "seasonal flower moment"], lunarPlanetarySeasonalHooks: ["seasonal availability matters more than lunar timing"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "plant is primary; words/body carry permission and response", sourceBackedRationale: "Whitehurst instructs gathering with consciousness, compassion, respect, asking permission, following body/mind response, and offering thanks.", notForOrHoldNotes: "Only where gathering is legal, permitted, and ecologically appropriate." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "tending", "before gathering"], secondarySelectionSignals: ["blessing", "marking"], exclusionSignals: ["land permission unresolved", "unknown plant"], timingSignal: "required", confidenceNotes: "Direct sequence from Orientation and Author's Notes." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Orientation and Author's Notes", sourceLocation: "PDF pp. 14, 20-21", sourceSummary: "The source advises asking before gathering, following felt yes/no response, gathering gently, and giving thanks.", sourceSupports: "permission; body/mind check; gentle gathering; thanks/offering", moonAndTableChanges: "Uses safe thanks options and avoids wine/ale/coin as required materials.", doNotImport: ["trespass", "unsafe or unknown plant handling", "alcohol or coin offering as required material"] }]
recommendation metadata: { purposes: { primary: `tending`, secondary: [`blessing`, `marking`], refinement: "permission and thanks before flower gathering" }, carriers: { primary: `plant`, secondary: [`words`, `body`, `vessel`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "shared witnessing with one person gathering" }, timing: { relationship: `required`, contexts: ["before_gathering", "garden", "permitted_place"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`, `material_safety_review`] } }
search metadata: { tags: ["gathering", "flower", "permission", "offering", "tending"], keywords: ["ask before gathering", "flower permission", "ethical gathering"], materials: ["identified household-safe flower", "clean water if offering"], places: ["garden", "yard", "permitted outdoor place"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst ethical gathering` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Requires land-access/ecology/common-sense gathering review before direct-use."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_best_window` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "May I gather this blossom?", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF p. 14", useContext: `petition`, note: "Source supports asking permission; wording is original." }]
import readiness label: `approved_for_mechanical_import`

## Expanded flower-entry candidates

The records below keep the flower as the primary magical carrier and avoid preparation-heavy methods. Each is approved for later mechanical import only as draft/unavailable source-backed content, not for direct use or recommendation.

### C5. `whitehurst-receive-flower-quality`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Receive the Flower's Quality
ritual body / practice: Visit or set near you one household-safe blossom whose source entry names the quality you want to receive. Sit or stand close enough to see the flower clearly. Name the quality in one word: confidence, gentleness, clarity, courage, sweetness, or another source-supported quality. Look at the flower and say: "Share this quality with me in the way I can carry." Stay with the blossom until the request feels complete. Close by giving thanks and, if the flower is living, a little clean water at the roots.
intention: Receive one source-backed flower quality through attention, request, and thanks.
bestWindow: Best when a flower entry gives a clear quality and the flower is present. No lunar timing required.
questionToCarry: What quality is the flower teaching by being itself?
whyThisFitsIngredients: { checkInHooks: ["one quality is desired", "gentle source-backed blessing"], timingHooks: ["when the matching flower is present"], lunarPlanetarySeasonalHooks: ["seasonal bloom strengthens fit"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`], materialPlaceCarrierPurposeFit: "flower carries the named quality; words focus the request", sourceBackedRationale: "Several entries, including Agapanthus, support receiving a flower's named quality through contemplation and thanks.", notForOrHoldNotes: "Not for medicalized qualities or unsafe plants." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "blessing", "quality named by source"], secondarySelectionSignals: ["steadying", "opening"], exclusionSignals: ["medical claims", "unavailable or unsafe flower"], timingSignal: "none", confidenceNotes: "Entry-backed form from Agapanthus and general contemplation mechanics." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Agapanthus and Orientation", sourceLocation: "PDF pp. 28-29, 14-15", sourceSummary: "Agapanthus includes a simple infusion ritual for receiving a quality through gazing, request, and water thanks; Orientation supports quiet contemplation.", sourceSupports: "quality request; flower contemplation; thanks with water", moonAndTableChanges: "Generalizes only to source-supported qualities and uses original words.", doNotImport: ["unsupported qualities", "medicalized claims"] }]
recommendation metadata: { purposes: { primary: `blessing`, secondary: [`steadying`, `opening`], refinement: "receive one flower quality" }, carriers: { primary: `plant`, secondary: [`words`, `body`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`], default: `me` }, timing: { relationship: `none`, contexts: ["flower_present", "seasonal_bloom"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["flower quality", "blessing", "contemplation"], keywords: ["receive flower quality", "agapanthus confidence", "flower teaching"], materials: ["household-safe source-supported blossom", "clean water if living plant"], places: ["garden", "table", "window"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst flower quality contemplation` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Verify flower quality against entry before import variant is used."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `not_allowed`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Share this quality with me in the way I can carry.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 28-29", useContext: `petition`, note: "Source supports request; words are original." }]
import readiness label: `approved_for_mechanical_import`

### C6. `whitehurst-carnation-beside-memory`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Carnation Beside the Memory
ritual body / practice: Place one household-safe carnation in a small vase beside a photograph, letter, keepsake, or empty place at the table. Sit with the flower and the memory for one minute. Say: "This memory is held with tenderness, not demand." Name one thing the memory gave you and one thing that still belongs to life now. Leave the carnation beside the object through the evening. When it fades, thank it and return it to compost or another safe place.
intention: Hold a memory with tenderness while keeping the present life open.
bestWindow: Best near anniversaries, after remembering someone, or when the house wants a gentle memory marker. No source timing required.
questionToCarry: What can be remembered without being held too tightly?
whyThisFitsIngredients: { checkInHooks: ["memory present", "grief-adjacent but not clinical support"], timingHooks: ["anniversary", "quiet evening", "after finding a keepsake"], lunarPlanetarySeasonalHooks: ["dark or waning moon may support gentle remembrance if available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "carnation and table object carry remembrance", sourceBackedRationale: "Whitehurst ties carnation to funerary memory, death/rebirth symbolism, heart and grief support, and bringing the flower into space or gift.", notForOrHoldNotes: "Not grief counseling or medical heart healing." }
howThisWasChosenIngredients: { primarySelectionSignals: ["table", "remembering", "carnation"], secondarySelectionSignals: ["plant", "vessel", "words"], exclusionSignals: ["health claims", "coercive love potion material"], timingSignal: "helpful", confidenceNotes: "Strong source symbolism and safe external form." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Carnation", sourceLocation: "PDF pp. 69-72", sourceSummary: "Carnation is associated with funerary settings, death/rebirth symbolism, heart/grief support, and use by bringing into space or giving as a gift.", sourceSupports: "carnation as memory/grief flower; bringing into space; gift/presence", moonAndTableChanges: "Creates a table memory form and original words; rejects love-potion and medical framing.", doNotImport: ["love potion", "medical heart-healing claims", "ingestion or bath use"] }]
recommendation metadata: { purposes: { primary: `remembering`, secondary: [`steadying`, `blessing`], refinement: "memory object with carnation witness" }, carriers: { primary: `table`, secondary: [`plant`, `vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "shared object and one spoken memory each if desired" }, timing: { relationship: `helpful`, contexts: ["anniversary", "memory", "quiet_evening"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["carnation", "memory", "table", "remembrance"], keywords: ["carnation memory", "flower beside photo", "remembrance table"], materials: ["household-safe carnation", "small vase", "photo or keepsake"], places: ["table", "shelf", "bedside"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst carnation` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep as symbolic remembrance, not grief treatment."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "This memory is held with tenderness, not demand.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 69-72", useContext: `spoken`, note: "Original memory wording under Whitehurst gate." }]
import readiness label: `approved_for_mechanical_import`

### C7. `whitehurst-chamomile-room-bowl`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Chamomile for the Room
ritual body / practice: Place fresh chamomile flowers, dried chamomile flowers, or a reviewed safe substitute in a small bowl on the table where the household gathers. Do not brew, ingest, bathe, or mist anything for this ritual. Touch the edge of the bowl and say: "Let this room remember gentleness." Name one way the room can be softer tonight: slower voices, less rushing, a kinder end to the day. Leave the bowl in place through the evening, then clear it with thanks.
intention: Let a gentle flower soften the household room without turning the practice into tea or medicine.
bestWindow: Best after a tense day, before a shared meal, or when the room needs softening. No source timing required.
questionToCarry: What would make this room gentler tonight?
whyThisFitsIngredients: { checkInHooks: ["tension", "need for gentleness"], timingHooks: ["after work", "before meal", "evening reset"], lunarPlanetarySeasonalHooks: ["Moon or Sun correspondence may support explanation after review"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "bowl and flower hold room gentleness", sourceBackedRationale: "Whitehurst associates chamomile with peace, comfort, harmony, grief soothing, and gentle household support.", notForOrHoldNotes: "No ingestion or medicinal claims." }
howThisWasChosenIngredients: { primarySelectionSignals: ["vessel", "steadying", "chamomile"], secondarySelectionSignals: ["table", "plant", "blessing"], exclusionSignals: ["tea as remedy", "bath/mist"], timingSignal: "none", confidenceNotes: "Safe external adaptation from source-supported chamomile peace/harmony lane." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Chamomile", sourceLocation: "PDF pp. 73-78", sourceSummary: "Chamomile supports peace, comfort, harmony, and grief soothing; the gate allows safe external flower/table/vase mechanics.", sourceSupports: "chamomile as peace/comfort flower; flower presence in space", moonAndTableChanges: "Uses bowl placement only; avoids tea, bath, mist, and medical claims.", doNotImport: ["ingestion", "bath", "mist", "health claims"] }]
recommendation metadata: { purposes: { primary: `steadying`, secondary: [`blessing`, `tending`], refinement: "soften shared room with chamomile presence" }, carriers: { primary: `vessel`, secondary: [`plant`, `table`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "shared bowl; one named room-softening gesture" }, timing: { relationship: `none`, contexts: ["tense_day", "evening", "meal"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["chamomile", "room", "gentleness", "steadying"], keywords: ["chamomile room bowl", "gentle room", "flower bowl"], materials: ["chamomile flowers or reviewed substitute", "small bowl"], places: ["table", "kitchen", "living room"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst chamomile` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["External flower/bowl only."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let this room remember gentleness.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 73-78", useContext: `blessing`, note: "Original room blessing." }]
import readiness label: `approved_for_mechanical_import`

### C8. `whitehurst-cherry-blossom-soft-release`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Cherry Blossom Soft Release
ritual body / practice: Place one household-safe cherry blossom, fallen petal, or reviewed seasonal substitute in a shallow bowl or on a small plate at the table. Name one thing that is passing and does not need to be held in the same way. Say: "Beauty can pass and still bless the house." Let the blossom stay through the meal or evening. Close by returning the petal or blossom to compost or earth with thanks.
intention: Let a passing flower teach release without harshness.
bestWindow: Best in cherry blossom season, during a seasonal turn, or when something tender is ending. Source timing is seasonal/helpful, not required.
questionToCarry: What can pass gently?
whyThisFitsIngredients: { checkInHooks: ["tender release", "seasonal softness"], timingHooks: ["spring bloom", "ending", "seasonal turn"], lunarPlanetarySeasonalHooks: ["waning moon can support release; spring blossom supports impermanence"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "petal/blossom and table bowl carry passing beauty", sourceBackedRationale: "Whitehurst treats cherry blossom as gentle, beautiful, heart-opening, and tied to impermanence/softening.", notForOrHoldNotes: "Do not force rare flowers; use only reviewed safe blossoms or substitute." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "releasing", "seasonal flower"], secondarySelectionSignals: ["table", "vessel", "blessing"], exclusionSignals: ["unsafe sourcing", "unsupported grief treatment"], timingSignal: "helpful", confidenceNotes: "Source-backed symbolic form with safe external flower placement." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Cherry Blossom", sourceLocation: "PDF pp. 89-92", sourceSummary: "Cherry blossom supports gentleness, beauty, forgiveness, heart opening, and the transient beauty of blossoms.", sourceSupports: "blossom/petal as gentle release and beauty marker", moonAndTableChanges: "Creates a table release form with original words and compost close.", doNotImport: ["foraging without permission", "therapy claims"] }]
recommendation metadata: { purposes: { primary: `releasing`, secondary: [`blessing`, `opening`], refinement: "soft seasonal release" }, carriers: { primary: `plant`, secondary: [`table`, `vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "shared naming of one passing thing if appropriate" }, timing: { relationship: `helpful`, contexts: ["spring", "seasonal_turn", "ending", "waning_moon_optional"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["cherry blossom", "release", "seasonal", "petal"], keywords: ["cherry blossom release", "soft release", "passing beauty"], materials: ["safe cherry blossom or petal", "shallow bowl or plate"], places: ["table", "altar table", "kitchen"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst cherry blossom` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Review sourcing and substitute flower before direct-use."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Beauty can pass and still bless the house.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 89-92", useContext: `spoken`, note: "Original release line." }]
import readiness label: `approved_for_mechanical_import`

### C9. `whitehurst-first-crocus-marker`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: First Crocus Marker
ritual body / practice: When crocus or another reviewed first-flower sign appears, place one blossom, photo, or drawn image at the table. Name the first small sign of return that you are willing to trust. Say: "This is enough to begin." Leave the marker on the table for the day. Close by putting the image in the grimoire or returning the flower to compost or earth.
intention: Mark the first visible sign of return, emergence, or seasonal opening.
bestWindow: Best at the first spring bloom or the first sign that something is returning. Seasonal timing is the core timing.
questionToCarry: What small sign is enough to begin?
whyThisFitsIngredients: { checkInHooks: ["emergence", "new beginning", "hope after dormancy"], timingHooks: ["first spring bloom", "first sign of return"], lunarPlanetarySeasonalHooks: ["spring and waxing moon strengthen opening"], capacityHooks: [`only_a_little`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "first flower marks opening", sourceBackedRationale: "Whitehurst frames crocus as a spring opening and first-flower sign.", notForOrHoldNotes: "Use image if live flower should not be picked." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "opening", "seasonal first"], secondarySelectionSignals: ["marking", "blessing"], exclusionSignals: ["forced sourcing"], timingSignal: "required", confidenceNotes: "Seasonal marker is source-aligned and operational." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Crocus", sourceLocation: "PDF pp. 119-120", sourceSummary: "Crocus supports spring opening, first flowers, hope, and emergence.", sourceSupports: "first-flower marker; seasonal opening", moonAndTableChanges: "Uses table marker and original spoken line; allows image to avoid unnecessary picking.", doNotImport: ["forced rare flower sourcing"] }]
recommendation metadata: { purposes: { primary: `opening`, secondary: [`marking`, `blessing`], refinement: "first spring sign marker" }, carriers: { primary: `plant`, secondary: [`table`, `words`] }, capacity: { supports: [`only_a_little`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "both name one sign if desired" }, timing: { relationship: `required`, contexts: ["first_bloom", "spring", "return"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["crocus", "spring", "opening", "first flower"], keywords: ["first crocus", "spring marker", "first sign"], materials: ["crocus, safe first flower, photo, or drawing"], places: ["table", "window", "seasonal shelf"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst crocus` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Image/drawing is allowed to avoid picking." ] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_best_window` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "This is enough to begin.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 119-120", useContext: `spoken`, note: "Original opening line." }]
import readiness label: `approved_for_mechanical_import`

### C10. `whitehurst-daisy-clears-table`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Daisy Clears the Table
ritual body / practice: Clear the table of what does not belong there tonight. Put daisies, a daisy image, or another reviewed purity flower at the center. Touch the table once and say: "Only what is simple and needed stays here." Name one complication, worry, or cluttered feeling that is being set down for the evening. Leave the daisy at the center through the meal or night. Close by clearing the flower or image with thanks.
intention: Use daisy's simplicity and purification current to clear the table for the present moment.
bestWindow: Best before a meal, conversation, or evening when the household feels cluttered or overcomplicated. No source timing required.
questionToCarry: What is simple enough to stay?
whyThisFitsIngredients: { checkInHooks: ["cluttered feeling", "need for simplicity"], timingHooks: ["before meal", "before conversation", "evening"], lunarPlanetarySeasonalHooks: ["full moon can support daisy altar language if already present"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "daisy at table center carries purification and simplicity", sourceBackedRationale: "Whitehurst frames daisy as simplicity/purity and recommends bouquet/altar use for magical aims.", notForOrHoldNotes: "Avoid prosperity guarantee or charm wording." }
howThisWasChosenIngredients: { primarySelectionSignals: ["table", "blessing", "daisy"], secondarySelectionSignals: ["releasing", "marking"], exclusionSignals: ["wealth charm", "exact charm text"], timingSignal: "none", confidenceNotes: "Strong table form from daisy entry and source gate." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Daisy", sourceLocation: "PDF pp. 125-128", sourceSummary: "Daisy supports simplicity, purity, purification, positivity, and altar/bouquet magical use.", sourceSupports: "daisy as purification/purity carrier; bouquet/altar/table logic", moonAndTableChanges: "Creates table-clearing form with original spoken line; excludes wealth charm mechanics.", doNotImport: ["wealth charm", "exact source charm wording"] }]
recommendation metadata: { purposes: { primary: `blessing`, secondary: [`releasing`, `marking`], refinement: "clear table through daisy simplicity" }, carriers: { primary: `table`, secondary: [`plant`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "shared table clearing and one named complication" }, timing: { relationship: `none`, contexts: ["meal", "conversation", "cluttered_evening"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["daisy", "table", "purification", "simplicity"], keywords: ["daisy clears the table", "simplicity flower", "table clearing"], materials: ["daisies or daisy image"], places: ["table", "kitchen table", "dining table"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst daisy` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["No exact charm text or wealth guarantee imported."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Only what is simple and needed stays here.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 125-128", useContext: `spoken`, note: "Original table-clearing line." }]
import readiness label: `approved_for_mechanical_import`

### C11. `whitehurst-dandelion-wish-breath`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Dandelion Wish Breath
ritual body / practice: Hold a dandelion seed head, a single seed, or a drawing of one. Name one wish as an offering, not a demand. Say: "May this wish find the place it can grow." If releasing seed is safe and appropriate where you are, breathe once and let the seeds go. If not, draw the wish as a seed in the grimoire instead. Close by thanking the dandelion for carrying the wish lightly.
intention: Let a wish move without forcing it.
bestWindow: Best when the user wants to mark a wish, beginning, or gentle release. Helpful during spring/summer seed season.
questionToCarry: Where can this wish grow without being forced?
whyThisFitsIngredients: { checkInHooks: ["wish", "release", "light marking"], timingHooks: ["seed season", "new beginning"], lunarPlanetarySeasonalHooks: ["waxing moon supports wish; wind/season can shape explanation"], capacityHooks: [`only_a_little`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "dandelion seed carries wish/release", sourceBackedRationale: "Whitehurst includes dandelion wish and release material; the gate allows external flower release when safe.", notForOrHoldNotes: "No ecological release where inappropriate." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "marking", "wish"], secondarySelectionSignals: ["releasing", "words"], exclusionSignals: ["unsafe release", "invasive spread"], timingSignal: "helpful", confidenceNotes: "Operational safe variant with drawing fallback." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Dandelion", sourceLocation: "PDF pp. 129-131", sourceSummary: "Dandelion supports wish and release material, with source gate allowing safe release/return mechanics.", sourceSupports: "seed/wish symbolism; release motion", moonAndTableChanges: "Adds non-demand language and drawing fallback for ecological safety.", doNotImport: ["outdoor release where unsafe", "guaranteed outcome"] }]
recommendation metadata: { purposes: { primary: `marking`, secondary: [`releasing`, `opening`], refinement: "wish carried lightly" }, carriers: { primary: `plant`, secondary: [`words`, `body`] }, capacity: { supports: [`only_a_little`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "each names one wish only if desired" }, timing: { relationship: `helpful`, contexts: ["wish", "seed_season", "spring", "beginning"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["dandelion", "wish", "release", "seed"], keywords: ["dandelion wish", "wish breath", "seed release"], materials: ["dandelion seed head, seed, or drawing"], places: ["yard", "table", "grimoire"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst dandelion` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Review ecological release before direct-use."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "May this wish find the place it can grow.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 129-131", useContext: `spoken`, note: "Original wish line." }]
import readiness label: `approved_for_mechanical_import`

### C12. `whitehurst-pressed-forget-me-not`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Press the Forget-Me-Not
ritual body / practice: Place one household-safe forget-me-not or another reviewed memory flower between two pieces of clean paper. Before closing the paper, say: "Let this be remembered kindly." Write the date and the memory's name on the outside. Put the paper under a book until the flower dries. When it is dry, keep it in the private grimoire or a small envelope. Close by touching the paper once and naming what must not be lost.
intention: Make a small flower token for a memory that deserves to stay.
bestWindow: Best after a meaningful day, promise, visit, anniversary, or tender memory. No lunar timing required.
questionToCarry: What must not be lost?
whyThisFitsIngredients: { checkInHooks: ["memory worth preserving", "bond or promise present"], timingHooks: ["after meaningful day", "anniversary", "departure"], lunarPlanetarySeasonalHooks: ["Venus timing may support bond language if already present"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "pressed flower becomes memory carrier", sourceBackedRationale: "Whitehurst links forget-me-not to memory, perspective, success/focus, and blossoms used in ritual or contemplation.", notForOrHoldNotes: "Use only safe flowers; no memory enhancement health claims." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "remembering", "forget-me-not"], secondarySelectionSignals: ["vessel", "words", "connecting"], exclusionSignals: ["memory-loss treatment claims"], timingSignal: "helpful", confidenceNotes: "Strong memory-object form from source symbolism and gate-approved dried/pressed token lane." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Forget-Me-Not", sourceLocation: "PDF pp. 139-141", sourceSummary: "Forget-me-not supports memory, perspective, focus, and incorporation into spells or rituals.", sourceSupports: "flower as memory carrier; ritual use; quiet contemplation", moonAndTableChanges: "Creates pressed-token form with original short line and grimoire storage.", doNotImport: ["medical memory claims", "essence use"] }]
recommendation metadata: { purposes: { primary: `remembering`, secondary: [`marking`, `connecting`], refinement: "pressed memory flower" }, carriers: { primary: `plant`, secondary: [`vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "shared memory name if desired; private storage" }, timing: { relationship: `helpful`, contexts: ["memory", "anniversary", "departure", "meaningful_day"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["forget-me-not", "memory", "pressed flower", "grimoire"], keywords: ["pressed forget-me-not", "memory flower", "flower token"], materials: ["forget-me-not or reviewed memory flower", "clean paper", "book", "envelope"], places: ["table", "desk", "grimoire"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst forget-me-not` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep as remembrance, not memory treatment."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let this be remembered kindly.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 139-141", useContext: `spoken`, note: "Original memory line." }]
import readiness label: `approved_for_mechanical_import`

### C13. `whitehurst-freesia-clarity-bouquet`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Freesia for Clarity
ritual body / practice: Put freesia or another reviewed clarity flower in a small vase near the place where the question will be named. Set one blank card or page beside the vase. Say the question once, plainly. Then write only the clearest version of the question, not the answer. Leave the flower and card together until the next natural pause in the day. Close by moving the card into the grimoire or recycling it if the question no longer needs to be carried.
intention: Let freesia clarify the question before anyone rushes the answer.
bestWindow: Best before a decision, conversation, or reading where clarity matters. No required timing.
questionToCarry: What is the real question?
whyThisFitsIngredients: { checkInHooks: ["decision", "unclear question", "conversation ahead"], timingHooks: ["before decision", "before check-in"], lunarPlanetarySeasonalHooks: ["Mercury or air timing may support clarity if available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "flower and written card carry clarity", sourceBackedRationale: "Whitehurst identifies freesia with clarity, confidence, and cheer; the source allows contemplation and ritual incorporation.", notForOrHoldNotes: "Not decision advice or divination guarantee." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "voicing", "clarity"], secondarySelectionSignals: ["words", "vessel"], exclusionSignals: ["answer guarantee", "medical/legal/financial advice"], timingSignal: "helpful", confidenceNotes: "Operational source-backed clarity form." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Freesia", sourceLocation: "PDF pp. 146-149", sourceSummary: "Freesia supports clarity, confidence, and cheer; entries allow flower contemplation or ritual incorporation.", sourceSupports: "clarity flower; fresh flower presence; question work", moonAndTableChanges: "Makes a question-card table form with original words.", doNotImport: ["guaranteed answer", "advice replacement"] }]
recommendation metadata: { purposes: { primary: `voicing`, secondary: [`steadying`, `opening`], refinement: "clarify the question" }, carriers: { primary: `plant`, secondary: [`words`, `vessel`, `table`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "both agree on the clearest question if shared" }, timing: { relationship: `helpful`, contexts: ["decision", "conversation", "reading"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["freesia", "clarity", "question", "vase"], keywords: ["freesia clarity", "question flower", "clarity bouquet"], materials: ["freesia or reviewed clarity flower", "small vase", "blank card"], places: ["table", "desk", "reading table"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst freesia` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Do not present as advice or prediction."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "What is the real question?", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 146-149", useContext: `question`, note: "Original question line." }]
import readiness label: `approved_for_mechanical_import`

### C14. `whitehurst-geranium-truth-sentence`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Geranium Truth Sentence
ritual body / practice: Place geranium or another reviewed truth flower near the table or writing place. Sit where you can see it. Ask silently what needs to be named without drama. Say: "Let the plain truth come through cleanly." Write one sentence only. Do not explain it yet. Read it once, then place it under or beside the flower until you are ready to speak or release it. Close by thanking the flower and folding the sentence once.
intention: Let one clean sentence emerge from the flower's truth-telling current.
bestWindow: Best before a hard conversation, personal check-in, or moment of discernment. No source timing required.
questionToCarry: What is true when I stop decorating it?
whyThisFitsIngredients: { checkInHooks: ["truth needs naming", "discernment", "conversation ahead"], timingHooks: ["before conversation", "before check-in", "private evening"], lunarPlanetarySeasonalHooks: ["Mercury timing can support voicing if available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "flower and written sentence carry truth", sourceBackedRationale: "Whitehurst identifies geranium with truth, clarity, positivity, and contemplation practices.", notForOrHoldNotes: "Not for accusation, verdict, or relationship advice." }
howThisWasChosenIngredients: { primarySelectionSignals: ["words", "voicing", "truth"], secondarySelectionSignals: ["plant", "steadying"], exclusionSignals: ["weaponized truth", "therapy framing"], timingSignal: "helpful", confidenceNotes: "Strong source fit when kept to one sentence." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Geranium", sourceLocation: "PDF pp. 150-158", sourceSummary: "Geranium supports truth, positivity, protection, and contemplative discernment.", sourceSupports: "flower as truth/discernment support; contemplation; ritual use", moonAndTableChanges: "Creates one-sentence table/writing form with original spoken words.", doNotImport: ["argument advice", "therapy framing"] }]
recommendation metadata: { purposes: { primary: `voicing`, secondary: [`steadying`, `protecting`], refinement: "one truthful sentence" }, carriers: { primary: `words`, secondary: [`plant`, `table`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "each writes one sentence privately before sharing if desired" }, timing: { relationship: `helpful`, contexts: ["conversation", "discernment", "check_in"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["geranium", "truth", "sentence", "discernment"], keywords: ["geranium truth", "plain sentence", "flower discernment"], materials: ["geranium or reviewed truth flower", "paper", "pen"], places: ["table", "desk", "journal place"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst geranium` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep as voicing ritual, not relationship advice."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let the plain truth come through cleanly.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 150-158", useContext: `spoken`, note: "Original voicing line." }]
import readiness label: `approved_for_mechanical_import`

### C15. `whitehurst-hydrangea-boundary-bowl`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Hydrangea Boundary Bowl
ritual body / practice: Place one reviewed hydrangea bloom, a small cluster, or a safe image of hydrangea in a bowl near the table or entry. Set the bowl down deliberately. Say: "This belongs inside; that stays outside." Name one thing the house is holding tonight and one thing it is not holding. Leave the bowl in place through the evening. Close by moving the bowl away from the entry or table and thanking the flower for holding the line.
intention: Give the household boundary a visible flower form.
bestWindow: Best before guests, after a demanding day, after a difficult exchange, or when the house needs a clear inside/outside distinction. Source timing is helpful rather than required.
questionToCarry: What belongs inside tonight?
whyThisFitsIngredients: { checkInHooks: ["boundary needed", "house feels porous", "apology or coolness needed"], timingHooks: ["before guests", "after conflict", "evening"], lunarPlanetarySeasonalHooks: ["waning moon may support boundary/release if available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "hydrangea/bowl at entry or table holds boundary", sourceBackedRationale: "Whitehurst associates hydrangea with boundaries, coolness, apology, and protection; source gate supports bowl/vase placement.", notForOrHoldNotes: "Review flower safety; avoid fear-heavy protection copy." }
howThisWasChosenIngredients: { primarySelectionSignals: ["vessel", "protecting", "boundary"], secondarySelectionSignals: ["plant", "doorway", "words"], exclusionSignals: ["fear-based protection", "unsafe flower"], timingSignal: "helpful", confidenceNotes: "Strong boundary bowl candidate from source entry and gate." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Hydrangea", sourceLocation: "PDF pp. 182-187", sourceSummary: "Hydrangea supports boundaries, coolness, apology, and protection.", sourceSupports: "flower as boundary/protection support; bowl/vase/placement lane", moonAndTableChanges: "Creates calm household boundary bowl with original words.", doNotImport: ["fear-based protection", "unsafe handling"] }]
recommendation metadata: { purposes: { primary: `protecting`, secondary: [`steadying`, `voicing`], refinement: "inside/outside household boundary" }, carriers: { primary: `vessel`, secondary: [`plant`, `doorway`, `words`, `table`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "both name one inside/outside boundary if desired" }, timing: { relationship: `helpful`, contexts: ["guests", "after_conflict", "boundary", "evening"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["hydrangea", "boundary", "bowl", "protection"], keywords: ["hydrangea boundary", "boundary bowl", "inside outside"], materials: ["reviewed hydrangea bloom or image", "small bowl"], places: ["table", "entry", "doorway area"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst hydrangea` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Boundary/protection tone should stay calm and household-scale."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "This belongs inside; that stays outside.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 182-187", useContext: `spoken`, note: "Original boundary line." }]
import readiness label: `approved_for_mechanical_import`

### C16. `whitehurst-lilac-remembers-house`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Lilac Remembers the House
ritual body / practice: Set lilac or another reviewed seasonal memory flower in a vase in the room where the memory belongs. Stand near it and name one sweetness the house has carried before. Say: "Let old sweetness make room for new sweetness." Leave the flower in the room through the day or evening. Close by writing the date and one remembered image in the grimoire, then clear the flower when it fades.
intention: Let a seasonal flower hold house memory without freezing the house in the past.
bestWindow: Best in lilac season, after returning home, or when a room carries a tender old memory. Seasonal timing is helpful.
questionToCarry: What sweetness is the house ready to carry forward?
whyThisFitsIngredients: { checkInHooks: ["home memory", "nostalgia", "returning home"], timingHooks: ["lilac season", "homecoming", "room memory"], lunarPlanetarySeasonalHooks: ["spring bloom and Venus correspondence may support tenderness"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "lilac/vase marks house memory", sourceBackedRationale: "Whitehurst associates lilac with memory, home, nostalgia, first love, and banishing/clearing support.", notForOrHoldNotes: "Avoid manipulating romantic memory or spirit-work claims." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "remembering", "home"], secondarySelectionSignals: ["vessel", "connecting", "blessing"], exclusionSignals: ["targeted love", "spirit-work"], timingSignal: "helpful", confidenceNotes: "Strong domestic memory candidate." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Lilac", sourceLocation: "PDF pp. 217-219", sourceSummary: "Lilac supports memory, home, first love/nostalgia, and clearing.", sourceSupports: "seasonal flower as memory/home carrier", moonAndTableChanges: "Creates house-memory vase practice with original words and grimoire note.", doNotImport: ["targeted love work", "spirit claims"] }]
recommendation metadata: { purposes: { primary: `remembering`, secondary: [`connecting`, `blessing`], refinement: "house memory carried by lilac" }, carriers: { primary: `plant`, secondary: [`vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "each may name one old sweetness" }, timing: { relationship: `helpful`, contexts: ["lilac_season", "homecoming", "memory"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["lilac", "home", "memory", "seasonal"], keywords: ["lilac remembers the house", "home memory flower", "seasonal memory"], materials: ["lilac or reviewed seasonal memory flower", "vase", "grimoire"], places: ["room", "table", "window"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst lilac` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep home-memory lane, not romance manipulation or spirit work."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let old sweetness make room for new sweetness.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 217-219", useContext: `spoken`, note: "Original memory line." }]
import readiness label: `approved_for_mechanical_import`

### C17. `whitehurst-single-blossom-altar`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Single Blossom Altar
ritual body / practice: Spread a small cloth on the table. Place one household-safe magnolia blossom or another reviewed single blessing flower in a shallow bowl of clean water at the center. Add one supporting household object only if it directly belongs to the purpose. Say: "One blossom is enough to hold this purpose." Name the purpose in one plain sentence. Leave the altar in place for the chosen evening or day. Close by removing the object, thanking the flower, and pouring the water into soil or down the sink.
intention: Let one blossom make a small table altar without cluttering the work.
bestWindow: Best for a focused blessing, intention, or beginning when one object is enough. No required timing.
questionToCarry: What purpose can one blossom hold?
whyThisFitsIngredients: { checkInHooks: ["focused blessing", "too many props would distract"], timingHooks: ["evening", "day-long marker", "beginning"], lunarPlanetarySeasonalHooks: ["Venus or seasonal flowering may shape explanation"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "single flower, bowl, water, table altar", sourceBackedRationale: "Whitehurst supports flower altar/table/vase mechanics; magnolia entry supports personal power/ancient wisdom and single blossom in water lane.", notForOrHoldNotes: "No extra props beyond one source-fitting object." }
howThisWasChosenIngredients: { primarySelectionSignals: ["table", "blessing", "single blossom"], secondarySelectionSignals: ["vessel", "plant", "words"], exclusionSignals: ["decorative clutter", "unsupported correspondences"], timingSignal: "none", confidenceNotes: "Strong table/vessel flower altar form." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Magnolia and flower-entry altar/table lane", sourceLocation: "PDF pp. 228-231; gate pp. 24-360 lane", sourceSummary: "Magnolia supports ancient wisdom/personal power and single-blossom water/altar mechanics; gate approves flower altar/table/vase practices.", sourceSupports: "single blossom; water; altar/table purpose", moonAndTableChanges: "Uses one-object limit and original spoken line.", doNotImport: ["extra crystals/candles unless separately reviewed", "decor-only altar"] }]
recommendation metadata: { purposes: { primary: `blessing`, secondary: [`marking`, `opening`], refinement: "single-blossom table altar" }, carriers: { primary: `table`, secondary: [`plant`, `vessel`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `enough_to_participate` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "both agree on one purpose if shared" }, timing: { relationship: `none`, contexts: ["focused_purpose", "evening", "beginning"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["magnolia", "altar", "table", "single blossom"], keywords: ["single blossom altar", "magnolia altar", "flower in water"], materials: ["household-safe magnolia or reviewed blessing flower", "small cloth", "shallow bowl", "clean water", "one supporting object optional"], places: ["table", "altar table", "desk"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst magnolia` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Do not add extra altar materials during import."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "One blossom is enough to hold this purpose.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 228-231", useContext: `spoken`, note: "Original altar line." }]
import readiness label: `approved_for_mechanical_import`

### C18. `whitehurst-marigold-offering-bowl`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Marigold Offering Bowl
ritual body / practice: Place marigold blooms, dried calendula, or a reviewed marigold image in a small bowl at the table. Name what is being honored: warmth, a relationship, a remembered person, a completed effort, or the sunlight that helped the day. Say: "This brightness is offered back with thanks." Leave the bowl where it can be seen during the meal or evening. Close by clearing the bowl and returning the flowers to compost or another safe place.
intention: Offer visible brightness back to what has warmed the house.
bestWindow: Best on a bright day, after a shared success, near seasonal remembrance, or when the house needs a sunlit blessing. Timing is helpful rather than required.
questionToCarry: What brightness deserves an offering?
whyThisFitsIngredients: { checkInHooks: ["gratitude", "house needs warmth", "memory or shared effort"], timingHooks: ["sunny day", "after completion", "seasonal remembrance"], lunarPlanetarySeasonalHooks: ["Sun correspondence or seasonal marigold timing may strengthen explanation"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "marigold in bowl acts as offering and blessing", sourceBackedRationale: "Whitehurst links calendula/marigold with sunshiny brightness, happiness, relationship blessing, and marigold Tagetes with grief/protection/remembrance lanes.", notForOrHoldNotes: "No tea, tincture, health, or culture-specific ancestor ritual imported." }
howThisWasChosenIngredients: { primarySelectionSignals: ["vessel", "blessing", "marigold"], secondarySelectionSignals: ["remembering", "marking", "plant"], exclusionSignals: ["health claims", "culturally specific ancestor rites without review"], timingSignal: "helpful", confidenceNotes: "Strong flower/table offering candidate with held lanes excluded." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Marigold (Calendula) and Marigold (Tagetes)", sourceLocation: "PDF pp. 235-244", sourceSummary: "Calendula is sunlike and happiness/relationship-oriented; Tagetes carries grief/protection/remembrance associations.", sourceSupports: "marigold as brightness, relationship blessing, remembrance/protection flower; table/offering lane", moonAndTableChanges: "Creates simple offering bowl and excludes health, ingestion, and culturally specific rites.", doNotImport: ["tea/tincture", "health claims", "full charm text", "unreviewed ancestor ritual"] }]
recommendation metadata: { purposes: { primary: `blessing`, secondary: [`remembering`, `marking`], refinement: "sunlit offering bowl" }, carriers: { primary: `vessel`, secondary: [`plant`, `table`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "shared naming of one brightness or memory" }, timing: { relationship: `helpful`, contexts: ["sunny_day", "completion", "seasonal_remembrance", "gratitude"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["marigold", "offering", "bowl", "gratitude", "sun"], keywords: ["marigold offering bowl", "calendula blessing", "sunlit flower offering"], materials: ["marigold blooms, dried calendula, or reviewed image", "small bowl"], places: ["table", "kitchen", "seasonal shelf"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst marigold` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep broad offering/blessing; do not import health or culturally specific ancestor claims without review."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "This brightness is offered back with thanks.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 235-244", useContext: `blessing`, note: "Original offering line." }]
import readiness label: `approved_for_mechanical_import`

### C19. `whitehurst-pansy-reflection-bowl`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Pansy Reflection Bowl
ritual body / practice: Fill a small bowl with clean water. Float one household-safe pansy, viola, violet, or a reviewed image beside the bowl. Write the question you want clarity on and fold the paper once. Set it under the bowl or beside it. Say: "Let the beautiful thought rise cleanly." Sit for one quiet minute. Close by lifting the paper, reading the question once, and deciding whether to keep it in the grimoire or clear it away.
intention: Use pansy's thought-and-beauty current to clarify one question.
bestWindow: Best before a decision, creative idea, or reflective conversation. No required timing.
questionToCarry: What beautiful thought is trying to rise?
whyThisFitsIngredients: { checkInHooks: ["reflection", "decision", "thoughts tangled"], timingHooks: ["before decision", "quiet minute", "creative pause"], lunarPlanetarySeasonalHooks: ["Neptune/water or reflective moon timing may shape explanation"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "pansy and water bowl carry reflection", sourceBackedRationale: "Whitehurst connects pansy/viola/violet with thinking, clarity, beauty, and setting a written clarity request under fresh pansies.", notForOrHoldNotes: "No bath/essence/animal companion remedy material." }
howThisWasChosenIngredients: { primarySelectionSignals: ["vessel", "voicing", "pansy"], secondarySelectionSignals: ["words", "steadying", "table"], exclusionSignals: ["treatment claims", "essence dosing"], timingSignal: "none", confidenceNotes: "Directly grounded in entry's written clarity-under-flowers mechanic, rewritten safely." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Pansy / Viola / Violet", sourceLocation: "PDF pp. 270-273", sourceSummary: "Pansy is linked to thought, beauty, calming, clarity, ideas, and a written clarity request placed under fresh pansies.", sourceSupports: "written question; fresh pansies; clarity/reflection", moonAndTableChanges: "Uses bowl/table form and original words; excludes bath/essence/remedy uses.", doNotImport: ["bath", "essence dosing", "animal remedy claims"] }]
recommendation metadata: { purposes: { primary: `voicing`, secondary: [`steadying`, `remembering`], refinement: "written clarity question with pansy bowl" }, carriers: { primary: `vessel`, secondary: [`plant`, `words`, `table`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "one shared question or private questions beside same bowl" }, timing: { relationship: `none`, contexts: ["decision", "creative_pause", "reflection"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["pansy", "violet", "reflection", "bowl", "question"], keywords: ["pansy reflection bowl", "violet clarity", "written question under flowers"], materials: ["pansy, viola, violet, or reviewed image", "small bowl", "clean water", "paper", "pen"], places: ["table", "desk", "reading place"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst pansy` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep as reflection ritual, not treatment or divination guarantee."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let the beautiful thought rise cleanly.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 270-273", useContext: `spoken`, note: "Original reflection line." }]
import readiness label: `approved_for_mechanical_import`

### C20. `whitehurst-rose-as-witness`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Rose as Witness
ritual body / practice: Place one household-safe rose in a vase where both people can see it, or where you can see it if the practice is solo. Name what the rose is witnessing: apology, gratitude, welcome, devotion, tenderness, or repair. Say: "Let this be true and freely given." Speak only what is yours to offer. Leave the rose in place through the evening. Close by thanking it for witnessing the words and clearing it when it fades.
intention: Let a rose witness connection without persuasion or control.
bestWindow: Best before or after an apology, gratitude, welcome home, anniversary, or tender conversation. Timing is contextual rather than lunar.
questionToCarry: What can I offer freely?
whyThisFitsIngredients: { checkInHooks: ["connection", "apology", "gratitude", "tenderness"], timingHooks: ["before conversation", "welcome home", "anniversary", "repair"], lunarPlanetarySeasonalHooks: ["Venus timing may support tenderness if available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "rose witnesses freely offered words", sourceBackedRationale: "Whitehurst treats rose as a major love/devotion/friendship/divine love flower; source gate explicitly approves flower-as-gift/message/witness when non-manipulative.", notForOrHoldNotes: "Reject manipulative attraction or target-control work." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "connecting", "rose"], secondarySelectionSignals: ["words", "table", "blessing"], exclusionSignals: ["coercion", "target control", "guaranteed attraction"], timingSignal: "helpful", confidenceNotes: "Strong source-gate lane; non-coercive wording keeps product boundary." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Rose; source gate flower-as-message/witness lane", sourceLocation: "PDF pp. 298-303; gate pp. 24-360 lane", sourceSummary: "Rose carries love, devotion, friendship, beauty, and spiritual love; gate approves flower-as-gift/message/witness when non-manipulative.", sourceSupports: "rose as connection/love flower; gift/message/witness practice", moonAndTableChanges: "Creates consent-respecting witness form with original words.", doNotImport: ["love spells that target or control", "guaranteed attraction"] }]
recommendation metadata: { purposes: { primary: `connecting`, secondary: [`voicing`, `blessing`], refinement: "rose witnesses freely offered words" }, carriers: { primary: `plant`, secondary: [`words`, `table`, `vessel`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`, `room_for_something_deeper`], default: `enough_to_participate` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "rose placed where both can see; each speaks only freely offered words" }, timing: { relationship: `helpful`, contexts: ["apology", "gratitude", "welcome", "anniversary", "repair"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["rose", "witness", "connection", "apology", "gratitude"], keywords: ["rose as witness", "flower message", "rose apology", "rose gratitude"], materials: ["household-safe rose", "vase"], places: ["table", "bedroom shelf", "shared room"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst rose` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Must remain non-coercive and mutual for partner use."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let this be true and freely given.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 298-303", useContext: `spoken`, note: "Original non-coercive witness line." }]
import readiness label: `approved_for_mechanical_import`

### C21. `whitehurst-sunflower-opens-room`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Sunflower Opens the Room
ritual body / practice: Place one sunflower or reviewed sunflower image where it catches natural light or can be seen from the table. Turn the flower or image slightly toward the room. Say: "Let the room turn toward what gives life." Name one thing the household is turning toward: courage, warmth, joy, a better pattern, or a simple next step. Leave the sunflower as the room marker for the day, then clear it with thanks.
intention: Open the room toward warmth, courage, and visible life.
bestWindow: Best in daylight, sunflower season, after a heavy stretch, or when the household wants a bright opening. Daylight is helpful.
questionToCarry: What is the room turning toward?
whyThisFitsIngredients: { checkInHooks: ["need for brightness", "opening after heaviness"], timingHooks: ["daylight", "sunflower season", "morning"], lunarPlanetarySeasonalHooks: ["Sun correspondence and summer season strengthen fit"], capacityHooks: [`only_a_little`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "sunflower acts as solar room marker", sourceBackedRationale: "Whitehurst frames sunflower with solar joy, energy, and opening/life-giving associations; gate allows room/table flower placement.", notForOrHoldNotes: "Do not use fertility or guaranteed abundance claims." }
howThisWasChosenIngredients: { primarySelectionSignals: ["plant", "opening", "sunflower"], secondarySelectionSignals: ["blessing", "marking", "table"], exclusionSignals: ["fertility claims", "prosperity guarantee"], timingSignal: "helpful", confidenceNotes: "Strong seasonal room-opening candidate." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Sunflower", sourceLocation: "PDF pp. 313-318", sourceSummary: "Sunflower carries solar joy, energy, confidence, and opening associations.", sourceSupports: "sunflower as solar/joy/opening carrier; visible placement", moonAndTableChanges: "Creates daylight room marker with original words; excludes fertility/outcome claims.", doNotImport: ["fertility claims", "guaranteed abundance"] }]
recommendation metadata: { purposes: { primary: `opening`, secondary: [`blessing`, `marking`], refinement: "sunflower daylight room marker" }, carriers: { primary: `plant`, secondary: [`table`, `words`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `both_of_us`, bothOfUsStructure: "shared naming of what the room turns toward" }, timing: { relationship: `helpful`, contexts: ["daylight", "morning", "sunflower_season", "after_heaviness"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["sunflower", "room", "opening", "daylight"], keywords: ["sunflower opens room", "solar flower", "room marker"], materials: ["sunflower or reviewed image"], places: ["table", "window", "living room"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst sunflower` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, notes: ["Avoid fertility/guaranteed abundance framing."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let the room turn toward what gives life.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 313-318", useContext: `spoken`, note: "Original opening line." }]
import readiness label: `approved_for_mechanical_import`

### C22. `whitehurst-tuberose-reading-table`

disposition: `candidate_extract_now`
ritualizationType: `direct_source_ritual`
headline: Tuberose on the Reading Table
ritual body / practice: Place one household-safe tuberose flower, a small bouquet, or a reviewed substitute on the table or desk before a card pull, I Ching throw, grimoire question, or shared check-in. Look at the flower and take one settling breath. Say: "Let intuition come into ordinary language." State the question plainly. Leave the flower on the table while you read, write, or speak. Close by thanking the flower and moving it away from the reading surface.
intention: Let the flower bring intuition back into useful words.
bestWindow: Best before intuitive reading, grimoire question, or reflective check-in. Source timing is action-specific, not lunar.
questionToCarry: What does intuition sound like in ordinary language?
whyThisFitsIngredients: { checkInHooks: ["intuitive question", "reading", "reflection"], timingHooks: ["before card pull", "before shared check-in", "before grimoire question"], lunarPlanetarySeasonalHooks: ["Moon timing supports intuition if already available"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "flower on reading table carries intuition into words", sourceBackedRationale: "Whitehurst explicitly suggests placing tuberose on the table or desk during intuitive sessions and returning to the flower during the reading.", notForOrHoldNotes: "Not prediction guarantee; avoid fragrance/body dependence if sensitivity exists." }
howThisWasChosenIngredients: { primarySelectionSignals: ["table", "voicing", "reading"], secondarySelectionSignals: ["plant", "body", "opening"], exclusionSignals: ["guaranteed psychic answer", "strong scent sensitivity"], timingSignal: "required", confidenceNotes: "Direct source ritual architecture." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Tuberose", sourceLocation: "PDF pp. 323-325", sourceSummary: "The source suggests placing tuberose or a bouquet on the table/desk during intuitive sessions and using the flower during the reading.", sourceSupports: "table/desk flower; intuitive reading context; centered attention", moonAndTableChanges: "Adds original spoken line and broadens reading/check-in contexts without adding materials.", doNotImport: ["guaranteed psychic claims", "fragrance as required if sensitivity exists"] }]
recommendation metadata: { purposes: { primary: `voicing`, secondary: [`opening`, `steadying`], refinement: "flower-supported intuitive question" }, carriers: { primary: `table`, secondary: [`plant`, `words`, `body`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`, `room_for_something_deeper`], default: `enough_to_participate` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "shared question stated once before reading/check-in" }, timing: { relationship: `required`, contexts: ["before_reading", "before_check_in", "grimoire_question"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["tuberose", "reading table", "intuition", "question"], keywords: ["tuberose reading table", "intuitive flower", "flower before card pull"], materials: ["tuberose, bouquet, or reviewed substitute"], places: ["table", "desk", "reading place"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst tuberose` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Keep as reflective/intuitive support, not guaranteed prediction."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_best_window` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let intuition come into ordinary language.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 323-325", useContext: `spoken`, note: "Original reading-table line." }]
import readiness label: `approved_for_mechanical_import`

### C23. `whitehurst-water-lily-still-bowl`

disposition: `candidate_extract_now`
ritualizationType: `source_backed_moon_and_table_form`
headline: Water Lily Still Bowl
ritual body / practice: Set a bowl of clean water on the table. Place a household-safe water lily, a reviewed substitute flower, or an image beside the bowl rather than forcing rare material. Sit where the water and flower can be seen together. Say: "Let stillness gather before I speak." Wait one minute. Then speak or write one question, sentence, or closing word. Close by emptying the bowl and clearing the flower or image with thanks.
intention: Let water and flower gather stillness before words arrive.
bestWindow: Best before sleep, after emotional noise, before a reflective question, or at the close of a day. No required timing.
questionToCarry: What can only be heard after stillness gathers?
whyThisFitsIngredients: { checkInHooks: ["stillness needed", "emotional noise", "question before sleep"], timingHooks: ["before sleep", "day close", "quiet pause"], lunarPlanetarySeasonalHooks: ["Moon/water timing can support explanation"], capacityHooks: [`only_a_little`, `enough_to_participate`], audienceHooks: [`me`, `both_of_us`], materialPlaceCarrierPurposeFit: "water bowl and flower/image carry stillness", sourceBackedRationale: "Whitehurst associates water lily with stillness, meditation, emotional balance, and water/flower contemplation.", notForOrHoldNotes: "Use image/substitute instead of rare or unsafe material." }
howThisWasChosenIngredients: { primarySelectionSignals: ["vessel", "steadying", "water lily"], secondarySelectionSignals: ["plant", "words", "voicing"], exclusionSignals: ["rare flower sourcing", "therapy claims"], timingSignal: "helpful", confidenceNotes: "Strong water/flower stillness form." }
source grounding: [{ citationLabel: "Whitehurst, The Magic of Flowers, Water Lily", sourceLocation: "PDF pp. 344-349", sourceSummary: "Water lily supports stillness, meditation, emotional balance, and water-associated contemplation.", sourceSupports: "water/flower stillness; quiet question; bowl-compatible form", moonAndTableChanges: "Allows image/substitute; adds original spoken line and simple water close.", doNotImport: ["forced rare material", "therapy claims"] }]
recommendation metadata: { purposes: { primary: `steadying`, secondary: [`voicing`, `opening`], refinement: "water and flower stillness before words" }, carriers: { primary: `vessel`, secondary: [`plant`, `words`, `table`] }, capacity: { supports: [`only_a_little`, `enough_to_participate`], default: `only_a_little` }, audience: { supports: [`me`, `both_of_us`], default: `me`, bothOfUsStructure: "shared still minute before one sentence each" }, timing: { relationship: `helpful`, contexts: ["before_sleep", "day_close", "quiet_question", "moon_water_optional"] }, eligibility: { recommendable: false, missing: [`human_review`, `source_verification`] } }
search metadata: { tags: ["water lily", "stillness", "bowl", "water", "steadying"], keywords: ["water lily still bowl", "flower water bowl", "stillness before speaking"], materials: ["bowl", "clean water", "water lily, reviewed substitute, or image"], places: ["table", "bedside", "quiet room"], sourceLabel: `SRC-PLANT-WHITEHURST-MAGIC-OF-FLOWERS`, originLabel: `Whitehurst water lily` }
review flags: { materialSafetyReviewRequired: true, sourceVerificationRequired: true, productBoundaryReviewRequired: true, notes: ["Image/substitute is acceptable; no rare material sourcing required."] }
adaptation policy notes: { purposeChange: `not_allowed`, materialSubstitution: `defined_only`, capacityAdaptation: `allowed_if_authored`, audienceAdaptation: `allowed_if_authored`, timingAdaptation: `may_shape_why_this_fits` }
operative words metadata: [{ mode: `moon_and_table_original`, text: "Let stillness gather before I speak.", citationLabel: "Whitehurst, The Magic of Flowers", sourceLocation: "PDF pp. 344-349", useContext: `spoken`, note: "Original stillness line." }]
import readiness label: `approved_for_mechanical_import`

## Source notes

### SN-WHITEHURST-FLOWER-SELECTION

Use flower selection as ritual relationship, not database lookup. Affinity, availability, local flowers, and direct flower presence matter. Correspondences can support later recommendation explanation, but they should not turn Moon & Table into a flower encyclopedia or shopping list.

### SN-WHITEHURST-SAFETY-FIRST-FLOWER

Every runtime flower still needs household safety review before direct-use: pets, children, allergies, scent sensitivity, toxicity, irritating sap, sprayed or treated florist material, plant identification, and disposal. These concerns belong in review flags and notes, not warning-heavy ritual copy.

### SN-WHITEHURST-WORDING-OVERRIDE

For this source, the source gate's stricter wording rule controls until Tim changes it. Preserve ritual mechanics and source locations. Use Moon & Table original words in public packet copy unless a private source excerpt is later added by Tim under the private source text policy.

## Variant / split ledger

```text
Variant / split candidates:
- keep together now: Flower on the Table as a general marking ritual.
- split later: meal-table marker; repair marker; welcome-home marker; seasonal marker.
- reason: same flower/table mechanics, different household moments.
- trigger for split: recommendation copy needs moment-specific wording.
```

```text
Variant / split candidates:
- keep together now: Rose as Witness and Flower-as-Message lane as non-coercive connection forms.
- split later: apology witness; gratitude witness; welcome-home witness; anniversary witness; friendship flower.
- reason: relationship variants need careful non-agency-violating copy.
- trigger for split: partner-connection review lane opens.
```

```text
Variant / split candidates:
- keep together now: Pressed Forget-Me-Not as a general memory token.
- split later: date memory; home memory; seasonal memory; relationship milestone memory.
- reason: memory objects differ by emotional weight.
- trigger for split: review distinguishes remembering from grief/spirit-work.
```

```text
Variant / split candidates:
- keep together now: Single Blossom Altar as a small table/blessing form.
- split later: no-flame altar; candlelit altar; memory altar; intention altar; offering altar.
- reason: candlelight is source-supported but secondary and requires separate fire review.
- trigger for split: candle safety and setting preferences are in runtime metadata.
```

## Rejected / held leads

| Source lead | Source pages | Disposition | Reason |
| --- | ---: | --- | --- |
| Preparation-heavy flower practices | 16-19, 24-360, 361-363 | hold | Outside the safe flower/table lane until separate safety review exists. |
| Fragrance, mist, anointing, diffusion, smoke/incense, bath/direct-contact methods | throughout | hold | Household exposure, fire, respiratory, skin, pet, and allergy review required. |
| Health-adjacent or guaranteed-outcome claims | throughout | reject as app advice | Moon & Table can hold symbolic practice, not diagnosis, treatment, fertility, immunity, or health guidance. |
| Agency-violating attraction or target-control framing | throughout | reject or later self-blessing only | Private household ritual must preserve agency and consent. |
| Unsafe plants such as Datura, Oleander, and Foxglove | related entries | reject/hold | Not normal household flower work. |
| Whole Appendix B-D tables | 364-389 | source_note_only | Navigation and timing support only; no flower database. |

## Duplicate check

- #323 / *The Green Witch's Garden* remains the living plant, container, gardening, and seasonal care lane. This packet stays with flower/table/vase/contemplation/gathering/message/memory mechanics.
- Candlelight remains secondary here. Flower-specific candle altars should be cross-checked with candle sources before import.
- Moon Book and Dominguez timing work can shape later timing explanation, but this packet does not create lunar or astrology timing cards.

## Gap notes

- This repair expands the Whitehurst source beyond the orientation section and provides named flower-entry candidates from the approved pp. 24-360 lane.
- The packet still does not open preparation-heavy flower magic.
- The packet still does not solve flower safety. Safety remains a review dependency, not user-facing warning prose.
- The packet does not import runtime records or alter eligibility.

## Remaining extraction backlog

1. Additional connection/message flowers: camellia, sweet pea after body/social-framing review, orchid devotion, tulip gratitude.
2. Additional memory/seasonal flowers: calla lily, chrysanthemum, heather, hollyhock, honeysuckle, wisteria.
3. Additional steadying/protection flowers: alyssum external token, echinacea strength marker, holly winter boundary, snapdragon/yarrow boundary source notes.
4. Additional opening/beauty flowers: narcissus, nasturtium, peony, crepe myrtle, bird of paradise.
5. Correspondence source-note cards from Appendices B-D after separate product decision.
6. Preparation-heavy flower magic remains held until a safety policy exists.

## Validation checklist

- Source gate metadata is no longer pending/blocked: yes
- Existing four approved orientation candidates remain: yes
- Packet includes broader source-backed extraction from individual flower-entry lane: yes
- Held/rejected lanes stay held/rejected: yes
- Safety stays in review flags/notes and does not overwhelm ritual bodies: yes
- Metrics and coverage are internally consistent: yes
- No runtime Ritual records created: yes
- No selector, check-in, recommendation, or UI changes: yes
- No candidate marked reviewed/findable/direct-use eligible/recommendation eligible/recommendable/runtime-ready: yes
- Runtime enum values checked against `src/data/rituals/types.ts`: yes
- Invalid carrier values such as flower, bouquet, altar, offering, object, room, and decor are not used as runtime carriers: yes
- Invalid capacity values are not used: yes
- Invalid review flag fields are not used: yes
- Exact Whitehurst wording is not reproduced; stricter source-gate wording policy is documented: yes
- Self-check terms from #352 searched in this packet: pass; any occurrence is outside approved ritual bodies or is source/policy context that does not block mechanical import

## Final packet status

```text
packet_status: canonical_reextraction_ready_for_pr_review
runtime_records_created: no
recommendation_logic_updated: no
ui_updated: no
candidates_reviewed: no
candidates_findable: no
candidates_direct_use_eligible: no
candidates_recommendation_eligible: no
human_review_required: yes
```
