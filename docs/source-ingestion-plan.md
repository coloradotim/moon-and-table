# Source Ingestion Plan

This plan turns the issue #7 source-research synthesis into implementation-sized batches for Moon & Table.

Moon & Table should remain a small, disciplined synthesis engine:

> computed timing facts → reviewed symbolic cards → safe ritual patterns → private capacity/profile filter → one useful recommendation.

Schedule awareness is deferred. Current recommendations should not use hard-coded or fallback schedule windows.

## Operating rules

- Do not scrape or ingest copyrighted books wholesale.
- Do not copy spells, recipes, prayers, chants, affirmations, long passages, or distinctive source phrasing.
- Use books for manual review and short transformed `SourceNote` records.
- Use APIs/libraries only for computed facts, not interpretation.
- Keep astrology, numerology, and magic symbolic and invitational, not predictive or deterministic.
- Keep all source-controlled examples privacy-safe.
- Safety overrides outrank symbolic correspondences.

## Batch 1 — Source registry and SourceNote foundation

**Purpose:** Create the data structure that prevents Moon & Table from becoming a pile of untraceable content.

**Sources involved:** All source families from the source research synthesis.

**Create:**

- `SourceReview` model/schema
- `SourceNote` model/schema
- use-decision values: `use`, `use_carefully`, `context_only`, `defer`, `avoid`
- review status values: `candidate`, `reviewed`, `approved`, `rejected`

**Implementation note:** The starter TypeScript model lives in `src/data/source-registry.ts`. It includes a small reviewed-source registry, short transformed source-note examples, and validation helpers that reject unsupported decisions, missing trace fields, long copied-looking notes, and any note with `verbatimAllowed` set to anything other than `false`.

**Acceptance criteria:**

- Sources can be classified by category, decision, confidence, safety risk, copyright risk, and extraction notes.
- Source notes are short, paraphrased, and traceable.
- Long copied passages are not allowed in examples or tests.
- No source can become active content without review status.

**Non-goals:**

- No scraping.
- No curation UI.
- No symbolic card expansion yet.

## Batch 2 — Safety guardrail model

**Purpose:** Make ritual safety enforceable as data, not just prose.

**Sources involved:** FDA, CDC, Poison Control, ASPCA, VCA, NFPA, USFA, CPSC, Candle Association, and other safety references identified in the synthesis.

**Create safety fields for ritual-related cards/patterns:**

- ingestion
- essential oils
- smoke
- fire
- pets
- children
- pregnancy
- allergies
- medical claims
- cultural context
- emotional intensity
- cleanup burden

**Implementation note:** The first typed guardrail model lives in `src/lib/ritual-safety.ts`. It exposes `RitualSafetyFlags`, low-risk defaults, and validation helpers for hard exclusions such as essential oil ingestion, smoke-cleansing defaults, medical claims, crystal elixirs, raw dough/flour crafts, controlling-another-person rituals, and candle work without declared fire safety.

**Hard exclusions:**

- no essential oil ingestion
- no smoke-cleansing defaults
- no medical/fertility/pregnancy/legal/financial/safety advice
- no crystal elixirs
- no raw dough/flour crafts
- no pet-accessible toxic foods/plants
- no rituals aimed at controlling another person
- candle flame allowed with ordinary candle safety and supervision

**Acceptance criteria:**

- Unsafe pattern/card combinations can be blocked or require explicit opt-in.
- Fire/smoke/ingestion/pet/pregnancy/allergy/cleanup risks are encoded in data.
- Safety tests cover hard exclusions.

**Non-goals:**

- No medical advice engine.
- No user-specific allergy/pet profile yet.

## Batch 3 — RitualPattern schema

**Purpose:** Separate symbolic meaning from actionable home practices.

**Create:**

- `RitualPattern` schema/model
- capacity modes
- duration
- materials
- steps
- safety notes
- avoid-if rules
- source references
- approval status

**Implementation note:** The first typed pattern model lives in `src/data/ritual-patterns.ts`. It includes a small starter set, `RitualSafetyFlags` from `src/lib/ritual-safety.ts`, validation helpers, and eligibility helpers that only return approved, safety-allowed patterns for a requested capacity mode.

**Initial pattern candidates:**

- clear one surface
- tend one plant
- candle light focus
- table reset
- threshold reset
- close-the-evening pattern
- tea ritual

**Acceptance criteria:**

- Patterns have capacity-aware versions.
- Patterns can be recommended independently from a single symbolic card.
- Patterns have safety flags and source references.
- Only approved patterns can be recommended.

**Non-goals:**

- No large pattern library yet.
- No elaborate spell scripts.

## Profile Preference Taxonomy

Private profile tuning uses a canonical preference taxonomy in `src/lib/profile-preference-taxonomy.ts`. Keep these preference groups separate:

- ritual styles: what kind of practice it is
- action patterns: what the user actually does
- burden / avoid flags: what makes a suggestion unsuitable
- tone preferences: how the app should sound
- audience: who a recommendation is for

Older bootstrap values such as `candle`, `home_care`, `kitchen_clearing`, `shopping`, `elaborate_ceremony`, and `vague_mush` are mapped to canonical values when private profile data is loaded or saved. Unknown saved values should remain visible as other saved values instead of being silently dropped.

## Batch 4 — Computed timing foundation decision

**Purpose:** Document and then implement deterministic timing facts separately from interpretation.

**First choice:** Astronomy Engine.

**Deferred:** Swiss Ephemeris until houses, natal charts, and personal transit precision justify licensing/deployment complexity.

**Implementation note:** The MVP timing decision and initial `TimingFact` / `SkyEvent` model plan live in `docs/timing-engine-decision.md`. The first broader computed fact API lives in `src/lib/timing-facts.ts`, and the first approved/draft interpretation rule layer lives in `src/lib/timing-interpretation-rules.ts`.

**Create:**

- timing-engine decision doc
- `SkyEvent`/`TimingFact` model
- computed lunar, solar, seasonal, planetary, aspect, retrograde, and numerology facts
- approved/draft timing interpretation rules
- tests for moon phases, lunations, solstice/equinox, zodiac/solar season, aspects, retrogrades, numerology, and rule eligibility

**Acceptance criteria:**

- Facts are clearly separated from symbolic interpretation.
- Astronomy Engine is documented as the MVP timing engine.
- Swiss Ephemeris is documented as a later decision.
- Initial test cases are defined.

**Non-goals:**

- No personal natal chart engine in this batch.

## Batch 5 — Four lunar phase card batch

**Purpose:** Create/strengthen the first reviewed lunar symbolic layer.

**Sources:** Sarah Faith Gottesdiener, Rachel Patterson, common moon-pattern context only where appropriate.

**Create/review cards:**

- new moon
- waxing moon
- full moon
- waning moon

**Acceptance criteria:**

- Four approved lunar cards exist.
- No eight-phase system yet.
- Each card has source references, avoid-saying language, and safety notes.
- No manifestation guarantees, outcome claims, copied rituals, or urgency language.

**Non-goals:**

- No daily moon feed.
- No eight-phase system.

## Batch 6 — Home tending starter patterns

**Purpose:** Make Moon & Table useful before it becomes deep astrology.

**Sources:** Arin Murphy-Hiscock, Cheryl Mendelson, Shoukei Matsumoto, Tess Whitehurst carefully, CDC/EPA/NFPA safety as applicable.

**Create patterns:**

- threshold reset
- table reset
- room reset
- clear one surface
- close-the-evening practice

**Acceptance criteria:**

- At least five approved home-tending patterns exist.
- Each supports low/steady/high capacity or equivalent app capacity mapping.
- No fire/smoke/oils required.
- Patterns use “home tending” style language rather than guaranteed spell outcomes.

**Non-goals:**

- No protection-from-danger claims.
- No curse-breaking, spiritual warfare, or guaranteed safety claims.

## Batch 7 — Kitchen, plant, and light starter set

**Purpose:** Add practical domestic magic texture with strong safety guardrails.

**Sources:** Laurel Woodward, Rachel Patterson, Scott Cunningham as cross-check, Arin Murphy-Hiscock, FDA/CDC/Poison Control/ASPCA/VCA/NFPA safety overrides.

**Create cards/patterns:**

- tea
- simple soup or warm drink pattern
- lemon
- salt
- rosemary
- basil
- mint
- thyme
- sage
- lavender
- generic houseplant cue
- bread
- oats
- apples
- ordinary cooking cue
- plant tending
- candle/light
- color accent
- kitchen reset

**Acceptance criteria:**

- Safety flags are present and enforceable.
- No essential oil ingestion.
- No smoke-cleansing defaults.
- No copied recipes/spells.
- No pet-toxic or allergy-risk ingredients recommended casually.

**Non-goals:**

- No herbal medicine advice.
- No large ingredient correspondence database yet.

## Batch 8 — Astrology and numerology accent layer

**Purpose:** Add nuance without turning Moon & Table into a horoscope engine.

**Sources:** Steven Forrest, Kevin Burk, April Elliott Kent, ethics sources, Hans Decoz/Tom Monte, David Phillips, Barnum/Forer guardrail.

**Create:**

- planet/sign/aspect starter vocabulary
- transit prompt style rules
- numerology 1–9 accent cards
- avoid-saying rules for deterministic claims

**Acceptance criteria:**

- Astrology language is invitational and symbolic.
- Numerology is at most an accent, not the main recommendation driver.
- No compatibility/destiny/personality-certainty claims.
- No “this transit means X will happen” language.

**Non-goals:**

- No full birth chart engine.
- No personal transits until timing architecture is ready.

## Batch 9 — Traceability and approval workflow

**Purpose:** Ensure generated recommendations can be trusted and debugged.

**Create:**

- approval statuses for cards/patterns/source notes
- recommendation trace linking timing facts, symbolic cards, ritual patterns, private profile/capacity inputs
- tests that draft/unapproved content cannot be recommended

**Acceptance criteria:**

- Every generated brief can trace back to timing facts, cards, patterns, and private constraints.
- Only approved cards/patterns are used.
- Safety approval is distinct from symbolic approval.

**Non-goals:**

- No public citation-heavy UI.
- No full curation workbench yet.

## Recommended implementation order

1. Source registry and SourceNote foundation
2. Safety guardrail model
3. RitualPattern schema
4. Computed timing engine decision doc
5. Four lunar phase card batch
6. Home tending starter patterns
7. Kitchen, plant, and light starter set
8. Astrology/numerology accent layer
9. Traceability and approval workflow

## Open product decisions

- Should the UI say `ritual`, `practice`, `home tending`, or use a mix?
- What candle-safety review, if any, is needed before recommending longer candle practices?
- Should astrology appear in every brief or only when especially relevant?
- Should the source registry start as TypeScript/JSON or Firestore-backed data?
- Should Front Range/Colorado seasonal ecology become part of the seasonal layer later?
