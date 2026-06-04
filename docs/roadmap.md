# Roadmap

Moon & Table should be built around a curation-first product model.

The app is not primarily a horoscope generator, ritual content feed, or generic calendar app. It is a curated symbolic knowledge system with a calendar interface.

The core product risk is not whether the app can display a weekly brief. The core risk is whether reviewed symbolic sources can be turned into approved, traceable cards that produce one useful, low-overwhelm recommendation for a private household.

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
* 0-5 minutes for low-capacity weeks
* a short “why this” explanation

Capture generic feedback categories:

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

Success means the manual brief format feels useful, private, and doable in real life.

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
* privacy guardrails
* traceability expectations for generated briefs

The curation pipeline should follow this lifecycle:

1. Source candidate
2. Source review
3. Knowledge extraction
4. Card normalization
5. Human approval
6. Use in brief synthesis
7. Feedback from actual practice

Success means we know how a source becomes approved product knowledge without committing private data.

Non-goals:

* no large-scale scraping
* no automatic source ingestion without review
* no AI-generated symbolic meanings without approved cards
* no complex admin workbench yet
* no private profile details in the repository

## Phase 2 — Seed symbolic library

Create a small reviewed symbolic library that is sufficient to generate early weekly briefs.

Start small. The goal is not coverage. The goal is quality, traceability, usefulness, and privacy-safe structure.

Initial source review targets:

* private astrology/profile materials handled outside the repository
* a small moon phase reference set
* a small numerology reference set
* a small home magic starter set

Initial generic cards:

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
* private profile theme placeholder

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

Do not include actual names, natal placements, birth data, relationship details, or schedules in seed cards.

Success means approved generic cards can be used with private runtime context to generate a grounded, low-overwhelm brief with a clear “why this” explanation.

## Phase 3 — Brief prototype from curated cards

Generate a weekly brief from curated symbolic cards and mock timing facts.

The first prototype can use static or mock data. It does not need a full app UI, database, timing engine, or external API.

Inputs:

* mock timing facts
* approved symbolic cards
* generic private profile placeholders
* generic household context placeholders
* capacity mode

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
* What private profile keys shaped the recommendation?
* What capacity constraint affected the recommendation?
* Later, when schedule awareness is designed, what real schedule constraint affected the recommendation?
* Why this ritual instead of another?

Success means the product nucleus works before building a large app surface.

## Phase 4 — Initial app shell

Build a simple private web app that can display one generated or mock weekly brief.

This phase can remain backend-independent. Firebase integration should not block the generic seed-card, mock-brief, and first app-shell work.

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

Success means a private household can use the app as a weekly ritual surface, even if much of the data is still mock or manually curated.

## Phase 5 — Firebase Auth and Firestore foundation

Set up the first hosted private-data direction before real private profiles are added.

Use:

* Firebase Auth, with Google auth as the current first provider path
* Firestore for private profile data, schedule constraints, capacity defaults, saved briefs, feedback, and eventual ritual notebook data
* `.env.local` for real Firebase web app config values during local development
* `.env.example` with placeholder Firebase config names only
* Firestore security rules that restrict private data to the authenticated user or household

Local gitignored profile loading can remain useful for development, but Firestore is the target for real hosted private data.

Success means the app has a privacy-safe path for hosted auth and private data without committing real profile data, real schedules, names, birth data, natal placements, relationship details, private source text, or real Firebase secrets.

## Phase 6 — Capacity modes and manual schedule rules

Add real-life constraints before adding complex astrology.

Capacity should shape the output before astrology does.

Capacity modes:

* `pause`: no ritual; grounding, blessing, or permission to do nothing
* `low`: 0-5 minutes; one small action with no shopping, setup, or cleanup
* `steady`: 10-20 minutes; the default practical ritual size
* `high`: 20-30 minutes; a more active or decisive ritual, still one primary recommendation

Current timing/window copy is capacity-based, not schedule-based:

* pause: `No timing needed.`
* low: `When you have five quiet minutes.`
* steady: `When you have a little space this week.`
* high: `When you have room to linger this week.`

Manual schedule rules and calendar-aware realistic windows are deferred until a later designed feature. Current briefs should not name hard-coded weekdays or fallback windows.

Success means the app protects users from overwhelm and treats real-life capacity as a first-class constraint.

## Phase 7 — Computed timing engine

Add reliable computed timing facts.

Start with:

* moon phase
* new moons and full moons
* solstice and equinox
* lunar cycles from private dates stored outside the repository
* universal numerology days
* private numerology dates stored outside the repository

Later:

* moon sign
* planetary ingresses
* retrogrades
* aspects
* private transits generated from private profile data outside the repository

Timing facts should be deterministic and testable. They should be kept separate from interpretation.

Success means the app can compute or source timing facts without relying on AI to invent dates or events.

## Phase 8 — Private profiles

Add private profiles without committing private data to the repository.

Profile fields may include:

* birth date/time/place
* chart placements
* preferred ritual styles
* disliked ritual styles
* capacity defaults
* max ritual duration
* preferred nights
* important private dates
* schedule constraints
* notes from actual ritual feedback

Repository code should use schemas, placeholders, and examples only. Real hosted profile data belongs in Firestore behind Firebase Auth. Local gitignored files may be used only as a development helper.

Success means the app can personalize without overclaiming, making deterministic statements, or exposing private data in source control.

## Phase 9 — Ritual notebook and feedback loop

Add a private saved history in Firestore.

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

Success means the app learns from actual use, not just from generic symbolic sources, while keeping real private data outside the repository.

## Phase 10 — Recommendation Quality and Content Depth

Treat Moon & Table as a private household grimoire with a recommendation engine underneath.

The next-stage product frame is:

```text
Moon & Table chooses one ritual from our private household grimoire, then explains how the moment gives it shape.
```

This phase should happen before Conversation becomes a mainline visible practice preference. The goal is to fix generic recommendation quality and deepen existing practice areas before adding major new categories.

Deliverables:

* privacy-safe recommendation quality scenarios
* grimoire presentation fields for approved ritual patterns
* reviewed meaning bridges for timing/focus/practice/capacity tensions
* contextual optional accents and carry prompts
* clean ritual closing patterns
* Moon & Table house voice instead of user-facing writing-style knobs
* content packet workflow for reviewed source-backed batches
* deeper candle and light magic content
* deeper home / threshold / table / arrival ritual content
* deeper kitchen warmth and ordinary nourishment content
* deeper plant tending and seasonal companionship content
* deeper ritual closure, carrying, and after-practice content

This phase should prevent:

* generic optional candle add-ons
* raw timing fallback prompts that contradict selected focus
* `No required ritual` followed by imperative steps
* score/debug language in user-facing copy
* pattern summaries stitched together without ritual coherence
* safety becoming a prominent product layer instead of quiet hard guardrails
* profile settings becoming a prompt-style or tone-style mixer

Success means a generated recommendation feels authored, coherent, specific, private, and sourced, not merely explainable by the debug record.

## Phase 11 — Curation workbench

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
* privacy review

This is not a web scraper. It is a tool for disciplined human-reviewed curation.

Success means source-derived knowledge can be added and refined without editing raw files by hand or committing private source text.

## Phase 12 — Calendar integration

Add calendar integration after schedule awareness is designed.

Possible integrations:

* Google Calendar
* possibly Apple Calendar later

Calendar integration should:

* detect realistic windows
* avoid busy nights
* account for private recurring schedule constraints
* account for work or school demands
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
* committing private profile data or private source material
