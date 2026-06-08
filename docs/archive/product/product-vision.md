> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Product Vision

Moon & Table is a private almanac for a household building shared rituals around home, timing, relationship, and seasonal meaning.

It combines several streams:

* astronomy: moon phases, lunar cycles, solstices, equinoxes, visible sky events
* astrology: signs, planets, aspects, retrogrades, private profile themes
* numerology: day, month, year, and private-date patterns
* kitchen magic: food, herbs, tea, salt, honey, bread, simmer pots, shared meals
* candle magic: color, intention, focus, beauty, atmosphere
* plant magic: watering, pruning, repotting, propagation, tending, growth/release
* private context: important dates, birthdays, household schedule rules, work/school demands, capacity
* feedback: what felt meaningful, what felt off, what should be repeated

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

## Backend and private storage direction

Firebase Auth is the planned first authentication mechanism for the hosted app. The current first provider path is Google auth; email/password can remain a future option if the product shape calls for it.

Firestore is the planned first hosted storage layer for real private profile data, schedule and capacity settings, ritual feedback, saved briefs, and ritual notebook history. Source-controlled data remains generic: reviewed symbolic cards, schemas, templates, placeholder examples, and privacy-safe docs.

Local gitignored files may still be useful during development, but real hosted private data should live in Firebase/Firestore. Do not commit real Firebase secrets, real profile data, names, birth data, natal placements, schedules, relationship details, or private source text.

## What the app is

Moon & Table is a weekly ritual guide and private ritual notebook.

It helps a private household notice symbolic timing, choose one realistic ritual window, and do something small that supports relationship and home life.

## What the app is not

Moon & Table is not:

* a generic horoscope app
* a prediction engine
* a daily task generator
* a public astrology platform
* a content scraper
* a replacement for human interpretation
* a source of medical, financial, legal, or safety advice
* a system that tells users what they “must” do
* a repository for private personal details

## Core user experience

The app should open to a simple weekly recommendation.

Example:

> Theme: Clear one small thing. Feed one living thing.
> Best window: Saturday evening, 15 minutes.
> Do: Tend one plant. Remove dead leaves or water it. Name one thing to stop feeding and one thing to nourish.
> Prompt: What part of this household needs less intensity and more tending?
> Optional: Light a candle while doing it.

Expanded detail can explain the symbolic reasoning, but the default experience should be calm and minimal.

## Curation-first product model

Moon & Table is not primarily a horoscope generator, ritual content feed, or generic calendar app.

It is a curated symbolic knowledge system with a calendar interface.

The product depends on disciplined source handling. Symbolic recommendations should come from reviewed, traceable, human-approved knowledge cards, not from open-ended AI generation or casual web scraping.

The app should treat source material in stages:

1. Source candidate
2. Source review
3. Knowledge extraction
4. Card normalization
5. Human approval
6. Use in brief synthesis
7. Feedback from actual practice

Only approved symbolic cards should be used in generated briefs.

The goal is not to collect as much mystical content as possible. The goal is to build a small, high-quality symbolic library that can produce calm, practical, personalized recommendations without storing private details in the repository.

## Knowledge layers

Moon & Table should separate three layers of knowledge.

### 1. Reliable timing facts

These are computed or sourced facts:

* moon phases
* new moons and full moons
* solstices and equinoxes
* numerology dates
* private anniversaries or important dates stored outside the repository
* eventually planetary ingresses, retrogrades, and aspects

Timing facts should be deterministic and testable. They should not include interpretation by themselves.

### 2. Reviewed symbolic knowledge

These are human-approved symbolic cards.

Examples:

* waning moon
* full moon
* numerology 6
* rosemary
* salt
* kitchen clearing
* plant tending
* private profile theme placeholder

Each card should include themes, appropriate uses, ritual styles, avoid-saying guardrails, safety notes, source references, and approval status.

### 3. Personal synthesis

This is where Moon & Table creates a useful recommendation.

The synthesis layer combines:

* timing facts
* approved symbolic cards
* private profile context loaded from non-repository storage
* schedule constraints
* capacity mode
* feedback from prior rituals

The synthesis layer should produce one calm, realistic recommendation, not a pile of possible tasks.

## Source discipline

Moon & Table should not scrape sources casually or ingest large bodies of content without review.

Before a source becomes useful product knowledge, it should be reviewed for:

* domain
* usefulness
* tone
* reliability
* safety concerns
* cultural context
* copyright or usage concerns
* risk of deterministic or fear-based interpretation
* privacy risk

The app should store transformed summaries and source notes, not large copied passages from copyrighted materials.

Private uploaded materials may be used outside the repository to extract private profile themes and personalization notes. They should not be committed, copied into source-controlled docs, or treated as public source material.

## Traceability

Generated briefs should be able to answer:

* What timing facts mattered?
* Which symbolic cards were used?
* What private profile context shaped the recommendation?
* What capacity constraint affected the ritual window?
* Later, when schedule awareness is designed, what real schedule constraint affected the ritual window?
* Why was this recommendation chosen?

This does not need to be shown as a technical audit log. But the user-facing “why this” should be grounded and explainable.

Traceability must not expose private names, birth data, schedules, or personal profile notes in repository examples.

## Guardrails

Moon & Table should avoid:

* deterministic claims
* fear-based astrology
* overwhelming task lists
* unsafe herb, oil, smoke, fire, or ingestion suggestions
* culturally specific practices used without context or care
* rituals that require buying many supplies
* rituals that create too much setup, cleanup, or emotional labor
* recommendations that ignore schedule or capacity
* committing private personal data to the repository

The app should use invitation language.

Not:

> You must release this now.

Better:

> This is a good symbolic moment for letting one small thing go, if there is capacity.

## Early product nucleus

The first meaningful product milestone is not a full calendar.

The first milestone is:

> Moon & Table can take a small reviewed source set, produce approved symbolic cards, and use those cards to generate one grounded, low-overwhelm weekly brief with a clear “why this” trace.

That milestone proves the core product before building a large app surface.

## Schedule-aware planning

Schedule awareness is a future product feature, not current brief behavior.

The current app does not use hard-coded schedule assumptions or pretend it knows a realistic weekday window. The visible best-window line is capacity-based:

* pause: `No timing needed.`
* low: `When you have five quiet minutes.`
* steady: `When you have a little space this week.`
* high: `When you have room to linger this week.`

Later schedule awareness should be designed separately and may include:

* recurring unavailable nights
* school/work demands
* preferred ritual nights
* low-capacity weeks
* max ritual duration
* calendar integration later

Until that exists, the app should not name Thursday, Tuesday, Saturday, or any other specific window as if it came from real household knowledge.

## Capacity modes

The app should support weekly capacity settings:

* `pause`: no ritual; grounding, blessing, or permission to do nothing
* `low`: 0-5 minutes; one small action with no shopping, setup, or cleanup
* `steady`: 10-20 minutes; the default practical ritual size
* `high`: 20-30 minutes; a more active or decisive ritual, still one primary recommendation

Capacity should shape the output before astrology does.

## Success criteria

Moon & Table is working if:

* users do not feel assigned more tasks
* users actually do some of the rituals
* suggestions feel personal without exposing private data in the repository
* the “why this” explanation is clear and grounded
* saved feedback improves future suggestions
* the app feels like a shared private practice, not a content feed
