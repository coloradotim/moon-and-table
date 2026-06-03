# How Moon & Table Works

Moon & Table turns timing, symbolism, and household magic into one small ritual for the week.

It is not trying to be a horoscope feed, spell database, task manager, or productivity system. It is a private household tool that helps translate lunar phases, planetary movement, seasonal rhythms, numerology, saved profile themes, current capacity, and reviewed source material into one grounded practice: something to tend, clear, warm, notice, bless, begin, release, or make room for.

The point is not to explain everything in the sky. The point is to notice what feels meaningful now and choose one small act of magic that fits real life.

## The short version

Moon & Table works like this:

```text
computed timing facts
→ selected symbolic signals
→ reviewed cards and ritual patterns
→ private profile, capacity, and schedule context
→ safety and practicality checks
→ one weekly ritual recommendation
→ feedback that helps future recommendations fit better
```

The app uses timing and symbolism as guidance, not commands. It offers a direction for attention: begin, tend, clarify, release, rest, repair, warm, bless, or make room.

## What the app calculates

Moon & Table separates facts from interpretation.

Computed timing facts are the sky-and-date information the app can calculate directly. These may include:

- lunar phase
- exact lunations, such as new moon or full moon timing
- moon sign
- sun sign or solar season
- solstices and equinoxes
- planetary signs
- planetary retrograde status
- major planetary aspects
- universal numerology year, month, and day values

These facts do not automatically become recommendations. A fact is only raw timing. Moon & Table still has to ask: does this timing matter for this week, this household, this capacity, and the available approved ritual patterns?

That is why the app does not show every computed fact. It chooses only the signals that actually influence the recommendation.

## How lunar timing is used

Lunar timing is the backbone of the first version of Moon & Table.

The app uses a four-phase lunar model for weekly recommendations:

- **New Moon**: beginning, reset, making room, one modest intention
- **Waxing Moon**: tending, support, small progress, follow-through
- **Full Moon**: clarity, visibility, gratitude, what is ready to be acknowledged
- **Waning Moon**: release, clearing, integration, rest

The moon phase does not force a ritual. It helps set the direction. A New Moon might point toward one small beginning. A Waning Moon might point toward clearing one surface or letting the evening close gently. The app keeps this practical and low-pressure.

## How astrology is used

Astrology helps Moon & Table read the quality of the moment.

Planetary and lunar signals can point toward different kinds of magic: beauty, courage, affection, clarity, repair, structure, communication, rest, tending, or useful friction. A Venus signal might point toward beauty, care, affection, or what feels worth tending. A Mars signal might point toward courage, directness, movement, or useful action. A square may point toward adjustment or creative friction, not crisis.

Moon & Table does not treat astrology as a command. It does not say what must happen. It uses astrological timing as symbolic weather: something to notice, work with, or gently respond to.

The app can compute astrology facts, but facts are not meaning. Planetary facts only become visible signals when an approved symbolic rule supports them. If a planetary placement or aspect is computed but there is no reviewed interpretation rule for it, the app should keep that fact internal rather than turning it into unsupported advice.

## How natal-chart themes are used

Moon & Table can use saved natal-chart themes as private profile context.

Those themes help the app understand what kinds of magic may feel resonant for each person and for the household. For example, one profile may lean toward practical tending, direct action, beauty, conversation, depth, warmth, or structure. Another may lean toward reflection, care, plants, candlelight, home rhythms, or grounded effort.

The app treats these themes as living context, not fixed labels. A chart theme can help shape the kind of ritual offered, but it should not define a person or explain them away.

Private profile data belongs in Firestore or local gitignored seed files. It should not be committed to the repository.

## How numerology is used

Numerology adds a number-current to the week.

It is a small symbolic undertone that can shape the flavor of a ritual or question. A 6 signal might point toward home, care, harmony, repair, or tending. A 4 signal might point toward structure, usefulness, stability, or making one thing easier.

Numerology is usually an accent. It can support the main lunar, seasonal, astrological, capacity, or household signal, but it should not take over the recommendation by itself.

Moon & Table does not use numerology for destiny claims, compatibility claims, or personality certainty. It uses it as a small symbolic current: one more way to notice the shape of the week.

## How seasonal timing is used

Seasonal timing helps Moon & Table behave more like an almanac for home.

Solstices, equinoxes, and seasonal shifts can point toward practices around light, warmth, rest, freshening, harvest, gratitude, storing, transition, threshold, or protection of attention.

The app keeps factual seasonal markers separate from symbolic interpretation. A solstice date is a computed or factual timing event. What the household does with that timing comes from reviewed symbolic cards, source notes, ritual patterns, capacity, and safety guidance.

## Where the symbolic knowledge comes from

The magic in Moon & Table comes from a reviewed symbolic library, not random internet scraping.

Sources are reviewed and turned into structured material before they can influence recommendations. The curation path is:

```text
source review
→ short transformed source note
→ symbolic card or ritual pattern
→ safety review
→ approval
→ use in recommendations
```

A source may inform a lunar card, a kitchen practice, an astrology interpretation rule, a numerology accent, a seasonal rhythm, a plant-tending pattern, or a safety guardrail.

The app should not copy book passages, rituals, prayers, chants, recipes, correspondence tables, or distinctive source phrasing. Source material is transformed into short notes, cards, rules, and patterns that fit Moon & Table’s voice and safety boundaries.

## What kinds of sources are used

Moon & Table uses several kinds of sources, each for a different purpose.

**Astronomy and timing tools** are used for computed facts: moon phase, planetary positions, seasons, and related timing.

**Astrology sources** are used to build symbolic interpretation rules for planets, signs, aspects, and timing signals. These rules help translate timing into invitations for ritual and attention.

**Lunar sources** help shape the four moon phase cards and keep the lunar layer gentle, useful, and non-pressuring.

**Numerology sources** help shape the 1-9 symbolic layer and keep number meanings simple, grounded, and secondary.

**Kitchen, plant, candle, and home sources** help create practical ritual patterns for ordinary domestic life.

**Safety sources** override symbolic correspondences when needed. Safety comes before magic.

## How a recommendation is created

A weekly recommendation starts with timing.

The app gathers relevant timing facts for the selected date or week. It may know the lunar phase, a seasonal marker, astrology timing, and numerology values. Then it selects a small number of signals that actually matter.

Next, the app checks the reviewed symbolic library. It looks for approved cards and ritual patterns that match the selected signals.

Then it applies private household context:

- who the recommendation is for
- current capacity
- default capacity
- max ritual time
- preferred ritual styles
- avoided ritual styles
- tone preferences
- schedule constraints
- profile themes
- prior feedback, when available

Then it applies safety and practicality checks. If a ritual would require too much cleanup, live flame, smoke, special shopping, heavy emotional processing, or unsafe use of herbs/oils/ingredients, the app should avoid it or choose a safer version.

Finally, Moon & Table offers one ritual. Not five options. Not a feed. One small thing that seems to fit the week.

## How capacity shapes the ritual

Capacity matters.

A ritual that is beautiful in theory can be wrong for a hard week. Moon & Table uses capacity to decide how much effort a recommendation should ask for.

Capacity might mean:

- **Pause**: no required ritual; noticing, resting, or letting something be enough
- **Low**: one tiny action, usually five minutes or less
- **Steady**: a practical ritual that can take a little more attention
- **High**: a larger but still bounded practice

Capacity is not a judgment. It is a way of letting the app meet the household where it actually is.

## How safety works

Safety comes before symbolism.

Moon & Table should avoid recommending risky practices just because they have symbolic meaning. It should avoid essential oil ingestion, smoke defaults, live flame requirements, crystal elixirs, medical claims, fertility or pregnancy claims, pet-toxic casual recommendations, and rituals aimed at controlling another person.

For candle or light work, the safe default is LED, natural light, or an optional flame only when appropriate. For kitchen and plant work, suggestions should stay within normal household use and include caution around allergies, pets, children, and capacity.

A good ritual should leave the household better held, not overloaded.

## How feedback works

Feedback helps Moon & Table learn what fits.

A user might say:

- this was good
- make it simpler
- the tone was off
- not this style
- more like this
- I skipped it
- try something else

Feedback should help future recommendations shift gradually. It can help the app learn which ritual styles, capacities, tones, and patterns feel useful. It should not overreact to one click or turn the app into a survey.

The feedback loop exists so the app can become more personal through use.

## What the app shows and what it keeps behind the scenes

Moon & Table may calculate more than it shows.

The brief should usually show only:

- the selected ritual
- the best window
- the current capacity
- a question to carry
- the few signals that mattered
- why this ritual fits
- sources used, tucked away for people who want to look deeper

Behind the scenes, the app may keep trace data: timing facts, symbolic cards, ritual patterns, source notes, safety filters, and preference matches. That trace helps with debugging and source transparency, but raw IDs and internal file paths should not be the normal user experience.

## What Moon & Table does not do

Moon & Table does not predict the future.

It does not tell anyone who they are.

It does not treat astrology, numerology, or magic as commands.

It does not give medical, legal, financial, emergency, or safety advice.

It does not copy rituals from books or scrape the internet into recommendations.

It does not expose private profile data in the repository.

It does not try to make every week profound.

Some weeks, the right magic is just watering a plant, clearing one surface, lighting a safe little light, making tea, or letting the evening close.

## The spirit of the app

Moon & Table is built around a simple belief:

Timing, symbols, home, and ritual can matter.

The app’s job is to make that meaning small enough to live with. It gathers the week’s signals, listens to the household’s capacity, checks the reviewed symbolic library, and offers one grounded practice.

Not a command. Not a prediction. Not a performance.

Just one piece of household magic for the week.
