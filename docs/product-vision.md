# Product Vision

Moon & Table is a private almanac for two people building shared rituals around home, timing, relationship, and seasonal meaning.

It combines several streams:

* astronomy: moon phases, lunar cycles, solstices, equinoxes, visible sky events
* astrology: signs, planets, aspects, retrogrades, personal chart themes
* numerology: day, month, year, and personal-date patterns
* kitchen magic: food, herbs, tea, salt, honey, bread, simmer pots, shared meals
* candle magic: color, intention, focus, beauty, atmosphere
* plant magic: watering, pruning, repotting, propagation, tending, growth/release
* personal context: relationship dates, birthdays, parenting schedule, school/work demands, capacity
* feedback: what felt meaningful, what felt cheesy, what should be repeated

## What the app is

Moon & Table is a weekly ritual guide and private ritual notebook.

It helps Tim and Jessica notice symbolic timing, choose one realistic ritual window, and do something small that supports their relationship and home life.

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

## Core user experience

The app should open to a simple weekly recommendation.

Example:

> Theme: Clear one small thing. Feed one living thing.
> Best window: Saturday evening, 15 minutes.
> Do: Tend one plant together. Remove dead leaves or water it. Each name one thing you are done feeding and one thing you want to nourish.
> Prompt: What part of our life together needs less intensity and more tending?
> Optional: Light a candle while you do it.

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

The goal is not to collect as much mystical content as possible. The goal is to build a small, high-quality symbolic library that can produce calm, practical, personalized recommendations for Tim and Jessica.

## Knowledge layers

Moon & Table should separate three layers of knowledge.

### 1. Reliable timing facts

These are computed or sourced facts:

* moon phases
* new moons and full moons
* solstices and equinoxes
* numerology dates
* personal anniversaries
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
* Jessica Virgo Moon
* Jessica Pisces Sun

Each card should include themes, appropriate uses, ritual styles, avoid-saying guardrails, safety notes, source references, and approval status.

### 3. Personal synthesis

This is where Moon & Table creates a useful recommendation.

The synthesis layer combines:

* timing facts
* approved symbolic cards
* Tim and Jessica’s personal context
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

The app should store transformed summaries and source notes, not large copied passages from copyrighted materials.

Private uploaded materials, such as Jessica’s astrology documents, may be used to extract private profile themes and personalization notes. They should not be copied into the app as large text passages or treated as public source material.

## Traceability

Generated briefs should be able to answer:

* What timing facts mattered?
* Which symbolic cards were used?
* What personal context shaped the recommendation?
* What schedule or capacity constraint affected the ritual window?
* Why was this recommendation chosen?

This does not need to be shown as a technical audit log. But the user-facing “why this” should be grounded and explainable.

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

The app should use invitation language.

Not:

> You must release this now.

Better:

> This is a good symbolic moment for letting one small thing go, if you have capacity.

## Early product nucleus

The first meaningful product milestone is not a full calendar.

The first milestone is:

> Moon & Table can take a small reviewed source set, produce approved symbolic cards, and use those cards to generate one grounded, low-overwhelm weekly brief with a clear “why this” trace.

That milestone proves the core product before building a large app surface.


## Schedule-aware planning

Schedule awareness is a core requirement.

The app should not simply recommend a ritual on the exact date of an astrological event. It should recommend the nearest realistic window based on:

* Tim’s parenting schedule
* Jessica’s school/work demands
* preferred ritual nights
* unavailable nights
* low-capacity weeks
* max ritual duration
* calendar integration later

Example:

> Full moon is Tuesday, but Tuesday is kid night and Jessica has class. Recommend Thursday evening instead, and keep the ritual under 10 minutes.

## Capacity modes

The app should support weekly capacity settings:

* Tiny: one 3–5 minute action
* Normal: one 10–20 minute ritual
* Spacious: one ritual plus optional meal/journal/altar layer
* Celebration: richer ritual allowed
* Survival mode: no ritual, just grounding or a blessing

Capacity should shape the output before astrology does.

## Success criteria

Moon & Table is working if:

* Jessica does not feel assigned more tasks
* Tim and Jessica actually do some of the rituals
* the suggestions feel personal without being invasive
* the “why this” explanation is clear and grounded
* saved feedback improves future suggestions
* the app feels like a shared private practice, not a content feed
