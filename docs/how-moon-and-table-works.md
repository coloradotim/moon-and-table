# How Moon & Table Works

My love -- Moon & Table is a tool I made just for us.

I started building it while thinking about what it means for us to come together into a shared home: not just furniture and routines, but little ways of marking time, tending the space, and remembering that our life can have magic in it.

Part of the story is us meeting on 8/8, the day before a full moon. Part of it is being welcomed into your home with candle magic. Part of it is me realizing that the more I understand the things you care about, the more deeply I understand you.

Moon & Table is one way of leaning into that. It is meant to help us choose one ritual that fits the moment.

## The basic idea

The app starts with a simple question: are we wanting something for today, or looking across the week?

Then it asks what is true right now. How much energy is there? Is this for one of us or both of us? What kind of practice feels welcome? What should the ritual hold?

The answer might be small: water a plant, light a candle, clear one surface, make tea, say one thing clearly, or let the evening close. The point is not to make every moment profound. The point is to choose one act that feels timed, personal, and doable.

Try Again uses the same check-in context. Feedback helps the app learn what feels useful over time.

## What happens under the hood

Moon & Table has three jobs:

```text
calculate facts
-> interpret meaning
-> choose an action
```

First, it calculates timing facts: moon phase, lunations, moon sign, sun sign, seasonal markers, planetary signs, retrogrades, aspects, and universal numerology values.

Then it interprets only the facts that have reviewed symbolic support. A computed fact is not meaning by itself.

Finally, it chooses one approved ritual pattern using the current check-in, private profile context, preferences, capacity, prior feedback, and private natal contacts when they matter.

It also keeps a few quiet hard stops in the background: no unsafe ingestion, no medical or emergency advice, no smoke by default, no required live flame, and no practices aimed at controlling someone else.

## How timing becomes meaning

Timing can be for today or for the next several days.

For today, the app uses the current timing. For Across the week, it looks ahead and asks whether any timing window stands out more strongly.

The timing layer can include lunar phase, exact lunations, moon sign, sun sign, seasonal markers, planetary signs, retrogrades, major aspects, and numerology.

Some timing may matter more because it resonates with us, with the relationship, or with the kind of ritual we are asking for. That is where private natal contacts come in. The app can notice when the current sky touches saved private natal profiles and shared themes, then use that as private fit context.

It does not say the chart commands anything. It does not predict. It does not turn astrology into compatibility claims. It uses timing as symbolic weather: something to notice and work with gently.

## Where the symbolic library comes from

The app does not free-associate from the internet.

The curation path is:

```text
source review
-> transformed source note
-> symbolic card or ritual pattern
-> approval
-> use in recommendations
```

Sources can support lunar timing, astrology, numerology, seasonal timing, candle and light work, kitchen magic, plant tending, and home-tending rituals.

The app does not copy book passages, rituals, spells, prayers, chants, recipes, correspondence tables, or distinctive source phrasing. Source material is transformed into short notes, cards, rules, and patterns that fit Moon & Table's voice.

## How current context changes the answer

Capacity is current context, not a judgment.

- **Barely any**: almost weightless; a pause, a noticing, or one tiny act
- **A little**: five minutes or less
- **Enough to engage**: a simple ritual with some attention
- **Room for something deeper**: more time, reflection, conversation, or ritual shape

When capacity is low, the app should ask fewer questions and keep the ritual small. When there is more room, it can ask more: audience, practice type, and ritual focus.

Ritual focus can include getting grounded, making a beginning, clearing something out, resting, saying something clearly, tending us, tending the home, or marking a threshold.

Timing can shape the form, but it should not veto the intention.

## How it chooses one ritual

The app compares approved ritual patterns against:

- the time scope: today or across the week
- the selected timing window, if one is strong enough
- the ritual focus
- private natal contacts
- current capacity
- audience
- practice preferences
- avoided styles
- prior feedback

Then it chooses one ritual.

The decision record is inspectable for debugging, but it is not the normal experience. The normal experience should feel like: here is one thing that fits, and here is why.

## What shows up in the ritual brief

The ritual brief shows:

- one ritual
- an intention or question to carry, when useful
- a best window or timing note
- why this ritual fits
- selected signals, tucked away when the detail helps
- sources used, tucked away for deeper review
- Try Again
- feedback

If we asked for Across the week, the brief should say when the selected timing window is. If we said Barely any, the ritual should stay almost weightless. If we asked for Tending us or Marking a threshold, the shape and explanation should reflect that.

## How it learns and stays private

Feedback tunes the app over time.

Try Again should not start from scratch. It should keep the same check-in, profile context, and timing scope, then look for another approved fit.

Private natal data, profile notes, preferences, and real household context live in private storage or local gitignored seed files. They do not belong in the repository.

The app can be personal without exposing everything personal.

## How we can shape it together

Moon & Table is meant to become more ours through use.

We can notice what feels good, what feels too much, what feels cheesy, what should happen again, and what kind of magic actually helps the house feel like ours.

It should stay small enough to live with. It should trust us. It should make ordinary moments feel a little more chosen.

## To Us

This is not meant to replace intuition. It is meant to give us a shared place to listen for it.

One small ritual, for us, built with love and chosen with care.

I love you.
