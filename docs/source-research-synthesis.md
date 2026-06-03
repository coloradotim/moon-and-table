# Source Research Synthesis

Got it. I read the full uploaded source-research document. It’s strong work, and the big product direction is clear: **Moon & Table should not become an astrology app, spell database, horoscope feed, or scraped correspondence library.** It should be a small, disciplined synthesis engine:

> computed timing facts → reviewed symbolic cards → safe ritual patterns → private schedule/capacity filter → one useful recommendation.

The document itself is organized across the 9 categories you described and explicitly separates computed timing from symbolic interpretation, which is exactly the right architecture. 

# 1. Executive Recommendation

Start with a **small, safe, domestic MVP**:

1. **Astronomy Engine** for computed facts.
2. **Four lunar phase cards**, not eight.
3. **A tiny ritual starter set**: tea, clear one surface, tend one plant, LED candle/light, threshold/table reset.
4. **A source registry and approval workflow** before creating many cards.
5. **Safety guardrails as data**, not just prose in docs.

The strongest source families are:

| Area                     | Best first sources                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Computed timing          | Astronomy Engine                                                                                              |
| Astrology interpretation | Steven Forrest, Kevin Burk, April Elliott Kent, ethics sources                                                |
| Moon/lunar               | Sarah Faith Gottesdiener, Rachel Patterson                                                                    |
| Numerology               | Hans Decoz/Tom Monte, David Phillips, with Barnum/Forer as guardrail                                          |
| Kitchen                  | Laurel Woodward, Rachel Patterson, Scott Cunningham as cross-check, FDA/CDC/ASPCA/Poison Control as overrides |
| Candle/color             | Madame Pamita carefully, Cunningham/Kynes carefully, NFPA/USFA safety as overrides                            |
| Plant/green              | Arin Murphy-Hiscock, Cunningham as cross-check, ASPCA/Poison Control/VCA as overrides                         |
| Home                     | Arin Murphy-Hiscock, Cheryl Mendelson, Matsumoto, CDC/EPA/NFPA                                                |
| Seasonal                 | NOAA/NWS + Astronomy Engine for facts; Temperance Alden and Anna Franklin for symbolic home-season practice   |

The riskiest source families are **commercial numerology sites, popular astrology/magic blogs, manifestation-heavy moon/spell books, oracle decks, outcome-based candle magic, and any source that encourages medical, fertility, relationship-control, protection-from-danger, or guaranteed-result claims**.

# 2. Source Decision Table

Condensed from the document:

| Source / family                         |                  Decision | Use for                                                         |
| --------------------------------------- | ------------------------: | --------------------------------------------------------------- |
| Astronomy Engine                        |                   **use** | MVP sky facts, lunar phases, solar seasons, planetary positions |
| Swiss Ephemeris                         |         **use carefully** | Later professional astrology, houses, personal transits         |
| sweph / swisseph                        |                 **defer** | Only after licensing/deployment decision                        |
| Kerykeion / Astrologer-API              |         **defer/context** | Schema inspiration, not MVP                                     |
| Astrology APIs                          |  **use carefully/backup** | Raw positions only, no interpretation                           |
| JPL Horizons                            |          **context only** | Validation/reference                                            |
| Steven Forrest                          |                   **use** | Core symbolic astrology grammar                                 |
| Kevin Burk                              |                   **use** | Structured astrology fundamentals                               |
| April Elliott Kent                      |         **use carefully** | Beginner-safe practical language                                |
| Chani Nicholas                          |         **use carefully** | Humane tone and prompts, not voice imitation                    |
| Robert Hand                             |   **use carefully/later** | Transit grammar, not copied delineations                        |
| Demetra George                          |   **defer/use carefully** | Later rigor, not MVP                                            |
| ISAR / OPA / NCGR ethics                |                   **use** | Hard interpretation guardrails                                  |
| Barnum / Forer effect                   |                   **use** | Anti-manipulative content QA                                    |
| Popular astrology sites                 |            **avoid core** | Vocabulary context only                                         |
| Sarah Faith Gottesdiener                |                   **use** | Lunar phase reflection                                          |
| Rachel Patterson moon/kitchen work      |     **use/use carefully** | Practical lunar/domestic correspondences                        |
| Yasmin Boland / Moonology               |         **use carefully** | Common modern moon pattern only                                 |
| Diane Ahlquist                          | **context/use carefully** | Spell-timing context, filtered hard                             |
| Llewellyn Moon Sign Book                |         **use carefully** | Almanac context, not proof claims                               |
| We’Moon / oracle decks                  |         **context/defer** | Format inspiration only                                         |
| Hans Decoz / Tom Monte                  |         **use carefully** | Numerology 1–9 and calculations                                 |
| David Phillips                          |         **use carefully** | Secondary numerology reference                                  |
| Juno Jordan / Javane / Lawrence         |         **context/defer** | Lineage/context                                                 |
| Commercial numerology sites             |            **avoid core** | What not to become                                              |
| Laurel Woodward                         |                   **use** | Kitchen ingredient cards                                        |
| Scott Cunningham food/herb works        |         **use carefully** | Cross-check correspondences                                     |
| Anna Franklin                           |     **use carefully/use** | Seasonal hearth/home rhythm                                     |
| FDA / CDC / Poison Control / ASPCA      |                   **use** | Safety overrides                                                |
| Madame Pamita                           |         **use carefully** | Candle mechanics, filtered                                      |
| Sandra Kynes                            |         **use carefully** | Correspondence cross-check only                                 |
| NFPA / USFA / CPSC / Candle Association |                   **use** | Candle/fire safety                                              |
| Arin Murphy-Hiscock                     |     **use/use carefully** | Green/home framing                                              |
| Rosemary Gladstar                       |          **context only** | Herbalism seriousness, not app advice                           |
| Cheryl Mendelson                        |         **use carefully** | Practical home grounding                                        |
| Shoukei Matsumoto                       |         **use carefully** | Mindful cleaning, respectfully                                  |
| Tess Whitehurst                         |         **use carefully** | Cleaning-as-ritual, filtered                                    |
| NOAA/NWS                                |                   **use** | Seasonal facts                                                  |
| Old Farmer’s Almanac                    |         **use carefully** | Almanac format/folklore                                         |
| Temperance Alden                        |                   **use** | Place-based seasonal practice                                   |
| Popular magic/herb/seasonal blogs       |            **avoid core** | Common vocabulary only                                          |

# 3. Category-by-Category Review

## Computed astronomical / astrological timing

Use **Astronomy Engine** first. It is the clean MVP choice because it gives you deterministic sky facts without dragging in interpretation, horoscope logic, native binary deployment, or AGPL licensing problems. The document specifically recommends using it for moon phase angle, exact lunation times, solar season, planetary positions, retrograde detection, aspects, and ingress detection. 

Defer Swiss Ephemeris until you need houses, natal charts, or personal transits. That is a later architecture decision, not an MVP dependency.

## Astrology interpretation

Use astrology as symbolic grammar only. Forrest and Burk are the backbone. April Elliott Kent can help with plain-language explanation. Chani can help with humane reflection tone, but do not imitate the CHANI voice. Robert Hand is useful later for transit grammar, but the app must not copy delineations or sound deterministic.

The important guardrail: every interpretation must be invitational. “Consider noticing…” is fine. “This transit means your relationship will…” is not.

## Moon phase symbolism

Start with **four phase cards**: new, waxing, full, waning. The document explicitly recommends four for MVP because eight phases are useful but likely too much for a low-overwhelm weekly product. 

This is one of the most important product decisions in the document. Do not overbuild lunar nuance before the recommendation UX works.

## Numerology

Use numerology as a **minor accent**, probably one sentence max. Support universal year/month/day and numbers 1–9. Defer life path, personal year, name numerology, master numbers, compatibility, and “purpose” language.

Numerology should color a recommendation, never choose it by itself.

## Kitchen magic

This should be one of Moon & Table’s strongest categories because it naturally fits the product: warmth, care, food, attention, clearing, preparation, sharing. The document recommends Laurel Woodward as the primary kitchen source, Rachel Patterson as a secondary kitchen-witch source, Cunningham as a cross-check, Anna Franklin as a seasonal bridge, and FDA/CDC/Poison Control/ASPCA as mandatory safety layers. 

Hard yes: tea, soup, lemon, salt, rosemary, bread, oats, apples, ordinary cooking.

Hard no: essential oil ingestion, pet-accessible toxic ingredients, raw dough crafts, copied recipes/spells, smoke-cleansing defaults, or rituals aimed at controlling another person. 

## Candle magic and color symbolism

Make this a **light and attention practice**, not candle spellcraft. LED candle should be default. Live flame should be opt-in and safety-gated.

The document’s recommended MVP color/light set is strong: white/warm light, yellow/gold, green, blue, and black/unlit candle. It also correctly notes that black does not need flame; it can symbolize rest or boundary without fire risk. 

## Plant / herb / green magic

Frame green magic as **plant care as ritual**, not herbal medicine. Approve only a tiny initial set: rosemary, basil, mint, thyme, sage, lavender, and generic houseplant. Even those need pet/allergy checks.

Important product call: no essential oils, no smoke cleansing, no medicinal claims, no “sage smudging” language in MVP.

## Broader home / household magic

This should become the app’s practical heart. The best action families are threshold, table/altar, room reset, cleaning as ritual, and rest/protection of attention. The document rightly says “protection” should mean protecting attention, peace, rest, time, and home feeling — not spiritual warfare, curse-breaking, physical security, or guaranteed safety. 

Use “home tending” as the UI language most of the time. It’s warmer and less loaded than “spell” or even “ritual.”

## Seasonal / almanac sources

Start with the four astronomical seasonal anchors: spring equinox, summer solstice, autumn equinox, winter solstice. Add cross-quarter days later, clearly labeled as traditional or computed midpoint.

Use NOAA/NWS and Astronomy Engine for facts. Use Temperance Alden and Anna Franklin for seasonal home practice. Old Farmer’s Almanac is context, not scientific authority. 

# 4. Best First Source Set

Use these first:

1. **Astronomy Engine**
2. **Sarah Faith Gottesdiener — The Moon Book**
3. **Rachel Patterson — Pagan Portals: Moon Magic**
4. **Laurel Woodward — Kitchen Witchery**
5. **Arin Murphy-Hiscock — The House Witch / The Green Witch**
6. **FDA / CDC / ASPCA / Poison Control / NFPA**
7. **Steven Forrest + Kevin Burk**
8. **NOAA/NWS**
9. **Temperance Alden or Anna Franklin**

That gives you enough to build the MVP without getting buried in correspondences.

# 5. Extraction Model

Use the structures from your prompt, with one addition: every card/pattern needs **recommendation eligibility fields**.

## SourceReview

Add:

```ts
useDecision: "use" | "use_carefully" | "context_only" | "defer" | "avoid";
reviewStatus: "candidate" | "reviewed" | "approved" | "rejected";
```

## SourceNote

This is the only place where reviewed source-derived observations should live before becoming cards.

Rules:

```ts
paraphrasedNote: string; // short, transformed
locationNote: string;    // chapter/page/URL/date accessed
verbatimAllowed: false;  // default
```

## SymbolicCard

Add:

```ts
claimType: "symbolic" | "computed_fact" | "safety_rule" | "historical_context";
avoidWhen: string[];
requiresSafetyGate: boolean;
```

## RitualPattern

Add:

```ts
capacityModes: ["tiny", "low", "normal"];
durationMinutes: number;
requiresLiveFlame: boolean;
requiresIngestion: boolean;
petRisk: "none" | "low" | "review_required" | "avoid";
childRisk: "none" | "low" | "review_required" | "avoid";
```

## TimingInterpretationRule

Keep it boring and testable:

```ts
timing_fact_type: "moon_phase" | "solar_season" | "planetary_aspect" | "numerology_date";
condition: object;
symbolic_card_keys: string[];
weight: number;
avoid_if: string[];
```

The prompt’s extraction model is already basically right: SourceReview, SourceNote, SymbolicCard, RitualPattern, and TimingInterpretationRule are the correct objects. 

# 6. First Ingestion Batches

## Batch 1 — Computed timing foundation

Purpose: calculate factual sky events.

Sources: Astronomy Engine, NOAA/NWS, maybe JPL Horizons for validation.

Create: `SkyEvent`, lunar phase events, solstice/equinox events.

Acceptance criteria: tests for new/full moon, four lunar phases, solar seasons, zodiac sign calculation, timezone handling.

## Batch 2 — Four lunar phase cards

Purpose: first symbolic layer.

Sources: Gottesdiener, Patterson, Boland as context only.

Create: new/waxing/full/waning moon cards; 4–8 basic ritual patterns.

Acceptance criteria: no manifestation guarantees, no outcome claims, no copied ritual scripts.

## Batch 3 — Home tending starter set

Purpose: make the app feel useful immediately.

Sources: House Witch, Home Comforts, Matsumoto, CDC/EPA/NFPA.

Create: threshold reset, table reset, room reset, clear one surface, close evening.

Acceptance criteria: all actions 5–20 minutes, no fire/smoke/oils required, capacity-aware.

## Batch 4 — Kitchen / plant / light starter set

Purpose: domestic ritual texture.

Sources: Woodward, Patterson, Green Witch, ASPCA, Poison Control, NFPA.

Create: tea, soup, lemon/salt/rosemary, plant tending, LED candle/light cards.

Acceptance criteria: safety flags implemented; pet-toxic and essential-oil exclusions enforced.

## Batch 5 — Astrology/numerology accents

Purpose: add symbolic nuance without overwhelming.

Sources: Forrest, Burk, Decoz, Phillips, Barnum/Forer guardrail.

Create: planet/sign/aspect starter vocabulary; numerology 1–9 accent cards.

Acceptance criteria: no “you are,” no destiny, no compatibility, no prediction.

# 7. Scraping / Ingestion Strategy

Use this rule:

**Books create SourceNotes manually. APIs/libraries calculate facts. Websites are mostly metadata/context unless they are authoritative safety/factual sources.**

| Source type           | Strategy                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Copyrighted books     | Manual review only. Short transformed notes. No copied rituals, recipes, spells, tables, or distinctive phrasing. |
| Safety websites       | Lightweight extraction is okay for internal safety rules, but write app copy in your own words and cite metadata. |
| Popular blogs         | Avoid as source material. Context only.                                                                           |
| Public-domain sources | Can ingest more directly, but still normalize into cards and safety-review.                                       |
| APIs/libraries        | Facts only. No interpretation text. Document license, terms, caching, deployment constraints.                     |
| Oracle decks          | Avoid/defer. Too much copyright/structure/voice risk.                                                             |
| Correspondence tables | Use carefully as cross-checks, not as direct ingestion sources.                                                   |

# 8. Safety and Copyright Guardrails

Every ritual card/pattern should have these fields:

```ts
safetyFlags: {
  ingestion: "none" | "normal_food_use_only" | "review_required" | "avoid";
  essentialOils: "none" | "avoid" | "review_required";
  smoke: "none" | "avoid" | "review_required";
  fire: "none" | "led_default" | "live_flame_opt_in" | "avoid";
  pets: "safe" | "keep_away" | "review_required" | "avoid";
  children: "safe" | "supervision" | "review_required" | "avoid";
  pregnancy: "no_claim" | "review_required" | "avoid";
  allergies: string[];
  medicalClaims: "forbidden";
  culturalContext: "none" | "label_required" | "avoid";
  emotionalIntensity: "low" | "medium" | "avoid_when_low_capacity";
  cleanupBurden: "tiny" | "low" | "medium" | "high";
}
```

Hard rules:

* No medical, fertility, pregnancy, legal, financial, or safety advice.
* No essential oil ingestion.
* No smoke-cleansing defaults.
* LED candle by default.
* No crystal elixirs.
* No raw dough/flour crafts.
* No pet-accessible toxic foods/plants.
* No controlling-another-person rituals.
* No copied recipes, spells, prayers, chants, affirmations, or scripts.
* No deterministic astrology/numerology claims.
* No “this will happen” language.
* No “your partner is…” language.
* No third-party chart interpretation without consent.

# 9. Recommended GitHub Issues

## Issue 1 — Add computed timing engine decision doc

Goal: document Astronomy Engine as MVP calculation foundation.

Requirements:

* Explain fact layer vs interpretation layer.
* Document why Swiss Ephemeris is deferred.
* Include license notes.
* Include initial `SkyEvent` model.

Acceptance:

* A doc exists in `/docs`.
* It includes MVP/non-MVP calculation scope.
* It has at least 5 test cases listed.

Non-goal: personal natal chart engine.

## Issue 2 — Create source registry model

Goal: track candidate and approved sources.

Requirements:

* Add `SourceReview` schema.
* Include use decision, category, safety/copyright notes, confidence.
* Seed initial source list from this research.

Acceptance:

* Source registry supports `use`, `use carefully`, `context only`, `defer`, `avoid`.
* No private data in repo.

Non-goal: full admin UI.

## Issue 3 — Create SourceNote workflow

Goal: prevent copy-paste ingestion.

Requirements:

* Add `SourceNote` model.
* Notes must be paraphrased and short.
* Include source location metadata.

Acceptance:

* Example notes use placeholder source data.
* Validation rejects long copied passages.

Non-goal: scraping pipeline.

## Issue 4 — Add SymbolicCard and RitualPattern schemas

Goal: create reusable reviewed content objects.

Requirements:

* Implement card/pattern fields.
* Include safety flags, avoid language, source references, approval status.
* Add seed examples using placeholders.

Acceptance:

* Cards cannot be approved without source references and safety review.
* Patterns include capacity and duration.

Non-goal: generating final user recommendations.

## Issue 5 — Build safety guardrail layer

Goal: make safety enforceable in data and recommendation logic.

Requirements:

* Encode fire, smoke, ingestion, pet, child, pregnancy, allergy, medical-claim, cultural-context flags.
* Add hard exclusions for oils, smoke, unsafe pet foods, live flame defaults.

Acceptance:

* Unsafe pattern cannot be recommended without explicit opt-in gate.
* Essential oil ingestion is impossible in approved content.

Non-goal: medical advice engine.

## Issue 6 — Create first lunar phase card batch

Goal: four approved lunar phase cards.

Requirements:

* New, waxing, full, waning.
* Max 4 themes each.
* Low-overwhelm ritual ideas.
* No manifestation guarantees.

Acceptance:

* Four reviewed cards exist.
* Each has at least two source refs.
* Each has avoid language and safety notes.

Non-goal: eight-phase lunar system.

## Issue 7 — Add home tending starter patterns

Goal: useful low-capacity domestic actions.

Requirements:

* Threshold reset, table reset, room reset, surface clearing, close evening.
* 5–20 minute modes.
* No fire/smoke/oils required.

Acceptance:

* At least five approved patterns.
* Each has tiny/low/normal capacity versions.

Non-goal: complex ritual scripts.

## Issue 8 — Add traceability from recommendation to cards

Goal: every brief can show why it was recommended.

Requirements:

* Recommendation stores timing facts used.
* Recommendation stores card/pattern IDs.
* UI/debug view can show source chain.

Acceptance:

* A generated brief can be traced back to computed facts, symbolic cards, and ritual patterns.

Non-goal: public citation-heavy UI.

## Issue 9 — Add approval workflow

Goal: keep draft content out of recommendations.

Requirements:

* Statuses: draft, reviewed, approved, rejected.
* Only approved cards/patterns can be recommended.
* Safety approval required separately.

Acceptance:

* Tests prove draft content is excluded.

Non-goal: full editorial workbench.

## Issue 10 — Plan future curation workbench

Goal: define later admin interface.

Requirements:

* Document needs for reviewing sources, notes, cards, patterns, safety flags.
* Include bulk import constraints.
* Include no-scraping/copyright rules.

Acceptance:

* A roadmap doc exists with phased implementation.

Non-goal: build it now.

# 10. Open Questions

1. Do you want Moon & Table’s first UI language to say **ritual**, **practice**, **home tending**, or a mix?
2. Should live flame be allowed at all in MVP, or should the first version be LED/natural-light only?
3. Should the first weekly brief include astrology every time, or only when the timing is unusually relevant?
4. Do you want the source registry in Firestore/Supabase right away, or start as Markdown/JSON seed files?
5. Should Colorado / Front Range seasonal ecology become part of the seasonal layer later?

My recommendation: **build the source registry, safety model, four lunar cards, and home-tending patterns before adding personal astrology or deeper correspondences.** That keeps the product usable, safe, and aligned with the one-recommendation principle.
