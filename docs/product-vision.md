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

## Source and curation philosophy

The app should use three layers:

1. Computed facts
   Moon phases, dates, numerology, astronomical events, and eventually astrological transits.

2. Curated symbolic library
   Short, edited, source-aware entries for moon phases, signs, planets, numerology, herbs, candle colors, kitchen magic, plant magic, and seasonal themes.

3. Personal synthesis
   The app combines current timing, curated meanings, personal profiles, schedule constraints, and feedback to create one useful recommendation.

The AI should operate mostly in layer 3. It should retrieve and synthesize from curated material, not invent meanings from scratch.

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
