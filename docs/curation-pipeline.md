# Curation Pipeline

Moon & Table is only useful if its recommendations are grounded in reviewed, traceable, human-approved symbolic knowledge.

This app should not scrape random sources, dump content into a database, and let AI improvise. It should build a small, high-quality symbolic library through a disciplined curation process.

Moon & Table is best understood as:

> A curated symbolic knowledge system with a calendar interface.

The calendar matters, but the quality of the symbolic knowledge matters more.

## Privacy boundary

The repository must not contain real names, birth data, relationship details, schedules, natal placements, private source documents, or personal profile notes.

The repository may contain generic schemas, templates, placeholder profiles, and example data.

Real personalization belongs only in Firebase/Firestore for the hosted app, private runtime storage, or local gitignored development files.

Use generic placeholder language in source control, such as:

* `person_a`
* `person_b`
* `household`
* `private_profile`
* `capacity_constraints`
* `schedule_constraints`

Do not commit actual names, birth data, natal placements, schedules, or private source text.

## Core principle

Moon & Table should not free-associate from the internet.

Generated briefs should come from:

1. **Reliable timing facts**  
   Computed or sourced dates and events, such as moon phases, lunations, solstices, equinoxes, numerology dates, and eventually astrological transits.

2. **Reviewed symbolic knowledge**  
   Human-approved symbolic cards extracted from sources and transformed into concise, structured meanings.

3. **Private synthesis**  
   A weekly or monthly recommendation that combines timing facts, symbolic cards, private profile context, capacity, and prior feedback. Schedule awareness is deferred until it has a real product design.

The AI layer, if used, should synthesize from approved material. It should not invent the underlying symbolic system.

## Curation lifecycle

### 1. Source discovery

A source candidate is identified.

Sources may include:

* astrology books or ebooks
* numerology references
* moon phase references
* kitchen magic books or websites
* candle magic correspondence sources
* plant or herbal magic sources
* seasonal almanacs
* astronomy or ephemeris references
* private uploaded astrology materials
* private household notes
* ritual feedback from actual use

At this stage, the source is only a candidate. It should not automatically become active product knowledge.

### 2. Source review

Before extracting knowledge, the source should be reviewed and classified.

Review questions:

* What domain does this source cover?
* Is it factual, interpretive, practical, private, or inspirational?
* Is it general-purpose or tied to a specific tradition?
* Is it credible enough for the product’s tone?
* Is it useful for Moon & Table’s domestic, practical, low-overwhelm style?
* Is it too deterministic, fear-based, unsafe, sensational, or vague?
* Does it suggest unsafe actions, especially with herbs, oils, ingestion, smoke, fire, pets, or pregnancy?
* Does it involve culturally specific practices that require more care or context?
* Are there copyright or usage concerns?
* Are there privacy concerns?
* Should it be used directly, used carefully as inspiration, avoided, or deferred?

A source can be useful without being treated as authoritative. Many symbolic sources should be treated as interpretive or inspirational, not factual.

### 3. Knowledge extraction

Extract small, transformed knowledge units.

Do not store large copied passages from copyrighted material.

Do not store private profile details in the repository.

The goal is not to preserve the source’s prose. The goal is to extract reusable symbolic meaning in our own words.

Examples:

* waning moon → release, clearing, integration, composting
* full moon → visibility, completion, illumination
* new moon → beginning, intention, quiet reset
* numerology 6 → home, care, responsibility, harmony
* rosemary → memory, protection, clarity, practical kitchen use
* salt → grounding, cleansing, preservation
* honey → sweetness, gentleness, attraction
* private profile theme → practical care, beauty, grounding, direct affection, or another private theme stored outside the repository

For private or copyrighted sources, preserve only generic location notes and transformed source references in the repository. Keep actual private details outside source control.

### 4. Normalization

Each extracted idea should become a structured symbolic card.

A symbolic card should be small, reusable, and easy to review.

Each card should include:

* `key`
* `title`
* `category`
* `summary`
* `themes`
* `good_for`
* `ritual_styles`
* `ritual_ideas`
* `avoid_saying`
* `safety_notes`
* `source_references`
* `confidence`
* `approval_status`

The app should retrieve from normalized cards, not from raw notes or long prose.

### 5. Human approval

No symbolic card should enter the active library until reviewed.

Approval states should include:

* `candidate`
* `approved`
* `needs_revision`
* `rejected`
* `retired`

Only `approved` cards should be used in generated Moon & Table briefs.

This is a key quality control point. The product should never treat scraped, pasted, or AI-summarized content as ready for use without review.

The repository may include small lifecycle examples for curator training and tests. These examples should live outside active seed arrays, carry explicit review reasons, and remain ineligible for generated briefs. Use them to show why a candidate, needs-revision, rejected, retired, or draft item is not the same as approved product knowledge.

### 6. Use in brief synthesis

Approved cards become retrievable material for briefs.

A generated brief should be able to explain:

* which timing facts mattered
* which symbolic cards were used
* which private profile themes shaped the recommendation
* which capacity constraints changed the recommendation
* why this ritual was chosen instead of other possible rituals

The “why this” explanation should be short and user-facing, not an internal debug dump.

Example:

> The waning moon supports clearing and release. The private profile favors practical tending over abstract processing. Because capacity is low, the recommendation stays at five minutes or less.

### 7. Feedback loop

After a brief or ritual, feedback should inform future recommendations.

Useful feedback types:

* loved this
* skipped it
* too much
* too cheesy
* too generic
* too emotionally heavy
* too much astrology
* more plant magic
* more kitchen magic
* more candle magic
* less setup
* less cleanup
* do this again
* avoid this ritual style

Over time, practice feedback should become one of the strongest personalization sources.

## Source classes

### Computed factual sources

These provide timing facts, not symbolic meaning.

Examples:

* moon phase calculations
* new moon and full moon dates
* solstice and equinox dates
* planetary position calculations
* numerology formulas

These should be deterministic, testable, and separated from interpretation.

### Interpretive symbolic sources

These provide meaning and correspondence.

Examples:

* moon phase meanings
* zodiac sign interpretations
* planetary symbolism
* numerology meanings
* candle color correspondences
* kitchen magic correspondences
* plant and herbal correspondences

These sources require review. They should not be treated as factual certainty.

### Private sources

These provide private personalization.

Examples:

* private uploaded astrology materials
* private chart data
* birthdays
* important household dates
* relationship milestones
* recurring schedule constraints
* work or school demands
* stated preferences
* capacity constraints

Private sources may be highly important even when they are not broadly generalizable. They must not be committed to the repository. For the hosted app, private profile, schedule, capacity, saved brief, feedback, and ritual notebook data should live in Firestore behind Firebase Auth.

### Practice feedback

These are observations from actual use.

Examples:

* ritual completed
* ritual skipped
* felt meaningful
* felt silly
* too many steps
* too intense
* good timing
* bad timing
* repeat next full moon
* never suggest this again

Practice feedback should shape future synthesis.

## Proposed data concepts

These are product concepts first. Exact schema can come later.

### SourceCandidate

A possible source before approval.

Suggested fields:

* `id`
* `title`
* `author`
* `source_type`
* `domain`
* `url_or_reference`
* `usage_notes`
* `copyright_notes`
* `privacy_notes`
* `review_status`
* `review_notes`
* `decision`
* `created_at`
* `updated_at`

### SourceNote

A short transformed note extracted from a source.

Suggested fields:

* `id`
* `source_id`
* `location_note`
* `source_location_label`
* `reviewed_source_area`
* `review_basis`
* `reviewed_at`
* `location_precision`
* `paraphrased_note`
* `domain`
* `tags`
* `risk_notes`
* `privacy_notes`
* `created_at`
* `updated_at`

For copyrighted sources, prefer location notes and paraphrased notes over copied excerpts.

For private sources, avoid committing actual private details.

`location_precision` should make the trace honest. Use `source_area` or `source_family` when the note is tied to a reviewed section or source family. Use `synthesis_only` when the note is still based only on internal synthesis and needs a later precision pass.

### SymbolicCard

A reusable, approved knowledge unit.

Suggested fields:

* `id`
* `key`
* `title`
* `category`
* `summary`
* `themes`
* `good_for`
* `ritual_styles`
* `ritual_ideas`
* `avoid_saying`
* `safety_notes`
* `source_note_ids`
* `confidence`
* `approval_status`
* `created_at`
* `updated_at`

Suggested categories:

* `moon_phase`
* `zodiac_sign`
* `planet`
* `aspect`
* `retrograde`
* `numerology`
* `candle_color`
* `herb`
* `kitchen_magic`
* `plant_magic`
* `seasonal`
* `relationship`
* `private_profile_theme`

Suggested ritual styles:

* `kitchen`
* `candle`
* `plant`
* `journal`
* `conversation`
* `cleaning`
* `meal`
* `altar`
* `outdoor`
* `rest`

Suggested confidence values:

* `core`
* `common`
* `experimental`
* `personal`
* `avoid`

### TimingFact

A computed or externally sourced timing event.

Suggested fields:

* `id`
* `type`
* `date_start`
* `date_end`
* `timezone`
* `label`
* `computed_by`
* `related_symbolic_keys`
* `created_at`
* `updated_at`

Examples:

* full moon
* new moon
* waning moon
* solstice
* equinox
* numerology day
* Venus ingress
* Mercury retrograde station

### BriefTrace

A record of why a recommendation was produced.

Suggested fields:

* `brief_id`
* `timing_fact_ids`
* `symbolic_card_ids`
* `private_profile_keys`
* `capacity_mode`
* `schedule_constraints_used` later, when schedule awareness is active
* `why_this_summary`

This supports user trust and debugging.

Repository examples should use generic private profile keys, not actual private information.

## Knowledge extraction rules

Use these rules when turning sources into cards:

* Extract meanings into small cards, not long documents.
* Store summaries in our own words.
* Preserve source references and location notes.
* Keep general symbolism separate from private interpretation.
* Include `avoid_saying` guardrails on every card.
* Include safety notes where relevant.
* Distinguish common correspondences from experimental or private ones.
* Do not conflate astronomy facts with astrology interpretations.
* Do not allow a source to produce active recommendations until reviewed.
* Do not make deterministic claims such as “this transit will cause X.”
* Avoid content that creates fear, obligation, or emotional pressure.
* Prefer practical home-based rituals over elaborate rituals requiring many supplies.
* Do not commit names, birth data, natal placements, schedules, or private source text.

## Safety and quality guardrails

The curation model should explicitly prevent:

* fear-based astrology
* deterministic predictions
* medical, legal, financial, or safety advice dressed up as ritual
* unsafe ingestion of herbs, essential oils, or crystal-infused water
* unsafe smoke, fire, or candle practices
* rituals that require buying many supplies
* rituals that create too much setup or cleanup
* rituals that create too much emotional labor
* culturally specific practices used without context or care
* overwhelming users with multiple suggested tasks
* turning symbolic timing into obligation
* exposing private personal data in repository docs, issues, examples, or seed files

The app should use invitation language.

Not:

> You must release this now.

Better:

> This is a good symbolic moment for letting one small thing go, if there is capacity.

## First source review targets

The first review pass should be intentionally small.

Recommended first source set:

### 1. Private astrology materials

Use for private personalization only.

Extract outside the repository:

* chart placements
* high-level themes
* personalization notes
* ritual style affinities

Do not copy passages or private details into the repository.

Repository-facing cards may include only generic placeholder patterns such as:

* private profile theme: practical care
* private profile theme: emotional reflection
* private profile theme: beauty or warmth
* private profile theme: structured action

Actual private meanings belong outside source control.

### 2. Moon phase reference set

Build initial cards for:

* new moon
* waxing moon
* full moon
* waning moon

These are enough for early weekly briefs.

### 3. Numerology reference set

Build initial cards for:

* 1
* 2
* 4
* 6
* 9

These are enough for a light symbolic layer.

### 4. Home magic starter set

Build initial cards for:

* candle
* kitchen clearing
* plant tending
* salt
* rosemary
* honey
* lemon

These are practical, accessible, and aligned with Moon & Table’s domestic style.

## Example symbolic card

```json
{
  "id": "moon-waning",
  "key": "moon.waning",
  "title": "Waning Moon",
  "category": "moon_phase",
  "summary": "The waning moon is commonly associated with release, clearing, integration, composting, and making space.",
  "themes": ["release", "clearing", "integration", "completion", "composting"],
  "good_for": ["tidying", "finishing", "letting go", "reviewing", "gentle closure"],
  "ritual_styles": ["cleaning", "plant", "kitchen", "candle", "journal"],
  "ritual_ideas": [
    "Clear one small surface and name what is ready to be set down.",
    "Prune dead leaves from a plant and name what is no longer being fed.",
    "Light a candle while putting away or discarding one stale thing."
  ],
  "avoid_saying": [
    "This is a bad time to begin anything.",
    "The moon requires you to let go.",
    "Emotional upheaval is inevitable."
  ],
  "safety_notes": [],
  "source_note_ids": [],
  "confidence": "common",
  "approval_status": "candidate"
}
```

## How curated cards flow into a brief

A Moon & Table brief should be generated from approved cards and real constraints.

Example input:

* Timing: waning moon
* Numerology: 6 day
* Private profile: practical tending theme
* Capacity: low
* Approved cards: waning moon, numerology 6, plant tending, private profile theme

Possible output:

> Theme: Clear one small thing. Feed one living thing.  
> Best window: When you have five quiet minutes.
> Ritual: Tend one plant. Remove dead leaves or water it. Name one thing to stop feeding and one thing to nourish.  
> Why this: The waning moon supports clearing and release. The numerology theme emphasizes home and care. The private profile favors practical tending over abstract processing. Because capacity is low, the ritual stays at five minutes or less.

## Early success criteria

The curation pipeline is working if:

* source material is reviewed before use
* knowledge is stored in small, editable cards
* cards are traceable to sources or notes
* approved cards can produce a grounded weekly brief
* the brief includes a clear “why this”
* recommendations remain small and practical
* users are not overwhelmed by too many options
* private source-derived material can be edited, rejected, or refined without entering source control
* hosted private data is stored in Firestore behind Firebase Auth rather than in source-controlled files
* feedback from real practice improves future suggestions

## What not to build yet

Do not start with:

* large-scale web scraping
* a public content database
* automatic source ingestion without review
* full predictive astrology
* daily ritual spam
* a complex admin workbench before the workflow is clear
* AI-generated symbolic meanings without approved cards
* broad source collection before the first small library works
* committing private profile data or private source material

Start small. Curate carefully. Use the smallest useful source set to produce one good weekly recommendation.
