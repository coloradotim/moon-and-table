# Roadmap

Moon & Table should be built around a curation-first product model.

The app is not primarily a horoscope generator, ritual content feed, or generic calendar app. It is a curated symbolic knowledge system with a calendar interface.

The core product risk is not whether the app can display a weekly brief. The core risk is whether reviewed symbolic sources can be turned into approved, traceable cards that produce one useful, low-overwhelm recommendation for Tim and Jessica.

Relevant docs:

* `README.md`
* `docs/product-vision.md`
* `docs/brief-format.md`
* `docs/manual-brief-prompt.md`
* `docs/curation-pipeline.md`

## Phase 0 — Manual prototype

Use ChatGPT to generate manual Moon & Table briefs before building too much.

Test:

* one theme
* one best window
* one ritual
* one relationship or journal prompt
* one optional add-on
* under 20 minutes by default
* under 5 minutes for low-capacity weeks
* a short “why this” explanation

Capture feedback:

* meaningful
* too cheesy
* too much
* too generic
* too emotionally heavy
* do again
* more plant / candle / kitchen / astrology / numerology
* less astrology jargon
* lower capacity needed
* bad timing
* good timing

Success means the manual brief format feels useful, personal, and doable in real life.

## Phase 1 — Curation pipeline foundation

Define and validate the disciplined source curation process before building the symbolic library or generation logic.

This phase is about product discipline, not just technical schema.

Deliverables:

* source discovery process
* source review criteria
* extraction rules
* symbolic card structure
* approval statuses
* safety and quality guardrails
* first source review targets
* traceability expectations for generated briefs

The curation pipeline should follow this lifecycle:

1. Source candidate
2. Source review
3. Knowledge extraction
4. Card normalization
5. Human approval
6. Use in brief synthesis
7. Feedback from actual practice

Success means we know how a source becomes approved product knowledge.

Non-goals:

* no large-scale scraping
* no automatic source ingestion without review
* no AI-generated symbolic meanings without approved cards
* no complex admin workbench yet

## Phase 2 — Seed symbolic library

Create a small reviewed symbolic library that is sufficient to generate early weekly briefs.

Start small. The goal is not coverage. The goal is quality, traceability, and usefulness.

Initial source review targets:

* Jessica’s uploaded astrology materials
* a small moon phase reference set
* a small numerology reference set
* a small home magic starter set

Initial cards:

* new moon
* waxing moon
* full moon
* waning moon
* numerology 1
* numerology 2
* numerology 4
* numerology 6
* numerology 9
* candle
* kitchen clearing
* plant tending
* salt
* rosemary
* honey
* lemon
* Jessica Pisces Sun
* Jessica Virgo Moon
* Jessica Leo Rising
* Jessica Venus in Aries
* Jessica Mars in Capricorn

Each card should include:

* key
* title
* category
* summary
* themes
* good_for
* ritual_styles
* ritual_ideas
* avoid_saying
* safety_notes
* source references or source notes
* confidence
* approval status

Success means approved cards can be used to generate a grounded, low-overwhelm brief with a clear “why this” explanation.

## Phase 3 — Brief prototype from curated cards

Generate a weekly brief from curated symbolic cards and mock timing facts.

The first prototype can use static or mock data. It does not need a full app UI, database, timing engine, or external API.

Inputs:

* mock timing facts
* approved symbolic cards
* Jessica personalization themes
* Tim/Jessica relationship context
* capacity mode
* manual schedule assumptions

Output:

* theme
* best ritual window
* one recommended ritual
* one optional add-on
* one relationship or journal prompt
* short “why this” trace

The brief should be able to answer:

* What timing facts mattered?
* Which symbolic cards were used?
* What personal context shaped the recommendation?
* What schedule or capacity constraint affected the recommendation?
* Why this ritual instead of another?

Success means the product nucleus works before building a large app surface.

## Phase 4 — Initial app shell

Build a simple private web app that can display one generated or mock weekly brief.

Features:

* private login or simple private access approach
* current week view
* theme
* best window
* recommended ritual
* relationship prompt
* optional add-on
* “why this” explanation
* source/trace summary where appropriate
* save/dismiss feedback

The app should feel:

* calm
* minimal
* private
* domestic
* usable on iPhone Chrome and desktop
* intentionally not overloaded

Success means Tim and Jessica can use the app as a weekly ritual surface, even if much of the data is still mock or manually curated.

## Phase 5 — Capacity modes and manual schedule rules

Add real-life constraints before adding complex astrology.

Capacity should shape the output before astrology does.

Capacity modes:

* Tiny: one 3–5 minute action
* Normal: one 10–20 minute ritual
* Spacious: one ritual plus optional meal/journal/altar layer
* Celebration: richer ritual allowed
* Survival mode: no ritual, just grounding or a blessing

Manual schedule rules:

* unavailable nights
* preferred windows
* Tim’s parenting schedule
* Jessica’s school/work constraints
* max ritual duration
* default low-capacity mode

The app should not automatically recommend a ritual on the exact date of an astrological event. It should recommend the nearest realistic window.

Example:

> Full moon is Tuesday, but Tuesday is kid night and Jessica has class. Recommend Thursday evening instead, and keep the ritual under 10 minutes.

Success means the app protects Jessica from overwhelm and treats real-life capacity as a first-class constraint.

## Phase 6 — Computed timing engine

Add reliable computed timing facts.

Start with:

* moon phase
* new moons and full moons
* solstice and equinox
* lunar cycles from personal dates
* universal numerology days
* personal numerology dates

Later:

* moon sign
* planetary ingresses
* retrogrades
* aspects
* personal transits

Timing facts should be deterministic and testable. They should be kept separate from interpretation.

Success means the app can compute or source timing facts without relying on AI to invent dates or events.

## Phase 7 — Personal profiles

Add private profiles for Tim and Jessica.

Profile fields may include:

* birth date/time/place
* natal placements
* preferred ritual styles
* disliked ritual styles
* capacity defaults
* max ritual duration
* preferred nights
* important personal dates
* schedule constraints
* notes from actual ritual feedback

Initial Jessica themes:

* Pisces Sun
* Virgo Moon
* Leo Rising
* Mercury in Aquarius
* Venus in Aries
* Mars in Capricorn
* Jupiter in Aries
* Saturn in Capricorn

These should be used as interpretive themes, not rigid labels.

Success means the app can personalize without overclaiming or making deterministic statements.

## Phase 8 — Ritual notebook and feedback loop

Add a private saved history.

Track:

* rituals done
* rituals skipped
* notes
* what worked
* what felt off
* too cheesy
* too much
* repeat this
* avoid this
* seasonal favorites
* relationship prompts worth revisiting

Practice feedback should eventually become one of the strongest personalization sources.

Success means the app learns from what Tim and Jessica actually do, not just from generic symbolic sources.

## Phase 9 — Curation workbench

Add admin tools for managing source material and symbolic cards.

This should come after the curation workflow is clear.

Workbench features:

* source inbox
* source candidate review
* manual excerpt or note entry
* source classification
* transformed source notes
* symbolic card creation
* approve/edit/reject workflow
* source trace maintenance
* safety notes
* avoid_saying guardrails

This is not a web scraper. It is a tool for disciplined human-reviewed curation.

Success means Tim can add and refine source-derived knowledge without editing raw files by hand.

## Phase 10 — Calendar integration

Add calendar integration after manual schedule rules work.

Possible integrations:

* Google Calendar
* possibly Apple Calendar later

Calendar integration should:

* detect realistic windows
* avoid busy nights
* account for Tim’s parenting schedule
* account for Jessica’s school/work demands
* move ritual suggestions near symbolic events, not necessarily on the exact date

Success means the app recommends rituals that fit actual life, not just symbolic timing.

## Not now

Do not build these early:

* public sharing
* community rituals
* marketplace/content subscriptions
* complex predictive astrology
* full birth chart engine
* daily notification spam
* large-scale web scraping
* automatic source ingestion without human review
* AI-generated meanings without curated grounding
* complex curation UI before the pipeline is validated
