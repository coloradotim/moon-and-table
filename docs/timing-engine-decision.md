# Timing Engine Decision

Moon & Table timing should be factual before it is symbolic.

The timing layer computes deterministic facts. It does not explain what those facts mean, predict outcomes, or read private charts. Symbolic meaning belongs in reviewed symbolic cards and explicit timing interpretation rules.

## Current Decision

Use Astronomy Engine as the MVP timing engine.

Astronomy Engine is already installed in the app. It can produce deterministic local calculations without adding an external API, a hosted ephemeris service, or a professional astrology dependency before the product needs one.

## Separation Of Responsibilities

```text
computed timing facts
-> approved timing interpretation rules
-> approved symbolic cards and ritual patterns
-> private profile, capacity, preferences, and feedback
-> one brief
```

Computed facts are raw material. The app should not show every computed fact, and it should not treat every fact as relevant. Signal selection should choose only 2-4 timing/profile/context signals that actually influenced the recommendation.

Schedule awareness is deferred until it has a real product design. Current brief timing/window copy is capacity-based, not calendar-based, and should not name hard-coded weekday windows.

## Model

The first broader fact model lives in `src/lib/timing-facts.ts`.

Common fields:

```ts
type BaseTimingFact = {
  id: string;
  type:
    | "moon_phase"
    | "lunation"
    | "moon_sign"
    | "sun_sign"
    | "solar_season"
    | "planet_sign"
    | "planet_retrograde"
    | "planetary_aspect"
    | "numerology_date";
  label: string;
  startIso?: string;
  endIso?: string;
  exactIso?: string;
  timezone?: string;
  computedBy: "astronomy_engine" | "app_numerology" | "manual";
  confidence: "computed" | "estimated" | "manual";
};
```

The public API is:

```ts
getTimingFactsForDate(date, options)
```

It returns a structured list of facts for later signal selection. It does not decide the ritual by itself.

## SkyEvent

`SkyEvent` is the broader event vocabulary for exact or bounded sky events such as lunations, solstices, equinoxes, ingresses, and later eclipses or station events. In the current implementation it is modeled as a timing fact with an `eventKey`, but it is not yet a separate persistence object.

## Phase 1 — Lunar And Solar Facts

Implemented or represented:

- lunar phase bucket: new, waxing, full, waning
- current moon phase angle
- exact new moon and full moon times when the selected UTC week contains one
- moon sign from geocentric lunar ecliptic longitude
- sun sign from solar ecliptic longitude
- solstice and equinox markers when the selected UTC week contains one

Notes:

- The moon phase bucket remains the current generator's primary timing input.
- Moon sign and sun sign are computed as tropical zodiac positions only. They are not interpreted by the fact layer.
- Solstice and equinox facts are factual seasonal markers, not ritual instructions.

## Phase 2 — Planetary Facts

Implemented:

- current geocentric zodiac sign for Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto
- apparent retrograde/direct status based on signed geocentric ecliptic longitude motion over a two-day sample window
- major transiting aspects between Sun, Moon, and listed planets

Aspect scope:

- conjunction
- opposition
- square
- trine
- sextile

The default aspect orb is 3 degrees. This is intentionally conservative for MVP fact detection. Aspect facts are geometry only; they do not say what an aspect means.

Validation needs before deeper use:

- compare selected planetary sign and retrograde examples against a second trusted ephemeris
- decide whether the two-day apparent-motion method is sufficient near stations
- decide whether aspect detection should use exact searches, different orbs, or body-specific rules

## Phase 3 — Numerology Facts

Implemented in app code without astrology libraries:

- universal year number
- universal month number
- universal day number

Numerology remains a light accent. It should not outrank primary lunar, seasonal, ritual-fit, capacity, or profile signals.

The current calculation reduces ordinary digit sums to 1-9:

- universal year: reduce the UTC year digits
- universal month: reduce universal year number plus UTC month number
- universal day: reduce universal year number plus UTC month number plus UTC day number

Master numbers 11 and 22 are reduced for MVP. Life path numbers, names, compatibility, and personal numerology are deferred.

## Phase 4 — Private Natal Contact Computation

Implemented as a private computation layer:

- same-sign resonance between current timing facts and private natal profile placements
- near conjunctions with a conservative 3 degree orb when both degrees are available
- opposition, square, trine, and sextile contacts with a conservative 3 degree orb when both degrees are available
- structured theme-key output for later scoring and explanation work

This layer lives in `src/lib/private-natal-contacts.ts`. The contact engine itself returns structured records; the brief generator may use selected records as bounded scoring signals and visibility-aware explanation context. It does not add houses, synastry, compatibility, predictions, or identity claims. Real private chart values must stay in Firestore or local gitignored files, not source control.

Still deferred:

- richer user-facing private natal explanation controls
- houses
- synastry or compatibility
- body-specific orbs
- elemental or modality resonance
- user-facing editing or import UI for detailed placements

## Astronomy Engine Fit

Astronomy Engine can cleanly support the MVP because it can compute:

- lunar phase angle
- exact moon phases
- solar longitude and seasons
- geocentric moon position
- geocentric planetary positions
- enough apparent position data to derive signs, simple retrograde status, and major aspects

Astronomy Engine should be treated as a computation source only. It is not an astrology interpretation source.

## Swiss Ephemeris Decision

Swiss Ephemeris is deferred.

Reasons:

- licensing and deployment decisions are more complex
- native/binary packaging may complicate the Vite/Vercel setup
- houses, natal charts, and personal transits are not MVP requirements
- the current product needs better signal selection and approved interpretation before deeper precision

Reconsider Swiss Ephemeris when Moon & Table genuinely needs:

- house systems
- more professional natal chart support
- precise transit work tied to private chart data
- stronger ephemeris validation requirements than Astronomy Engine can satisfy

## Interpretation Rule Layer

The first rule layer lives in `src/lib/timing-interpretation-rules.ts`.

Rules can map computed facts into candidate signals only when they are explicit, source-backed, and tied to approved symbolic cards.

Approved rules currently cover:

- four lunar phase buckets
- approved numerology cards for 1-9
- four solstice/equinox seasonal anchors with reviewed seasonal source notes
- MVP astrology interpretation for Sun, Moon, Mercury, Venus, Mars, Jupiter, and Saturn
- all 12 zodiac signs as symbolic styles, not identity labels
- five major aspects: conjunction, opposition, square, trine, and sextile
- a conservative retrograde review cue for the core planets

Weather-aware seasonal interpretation, local ecology, cross-quarter days, and outer planet interpretation remain deferred. Uranus, Neptune, and Pluto can still be computed as facts, but they are fact-only until a later reviewed source pass creates approved cards and rules.

The MVP astrology cards and rules are intentionally symbolic and invitational. They can color ritual selection, but they must not predict events, describe a person, expose private chart material, judge relationships, or become the whole recommendation.

## Signal Selection

The app should select only a few signals for any one brief.

Selection should consider:

- rule approval status
- rule weight and strength
- approved symbolic card fit
- profile preference fit
- capacity and safety constraints
- whether a signal is primary, supporting, or accent

Numerology should remain accent-level and should not be selected as the first or only timing signal.

## Test Plan

Implemented tests cover:

- existing lunar phase bucket behavior
- exact new moon fact for a known date
- moon sign fact for a known date
- sun sign boundary behavior around the June solstice
- solstice/equinox weekly detection
- planetary sign lookup for a known date
- retrograde status for a known date
- major aspect detection within the configured orb
- universal year/month/day numerology examples
- invalid date handling
- UTC week boundary behavior
- timing rule eligibility and signal selection
- draft zodiac/planetary rules remaining ineligible

Future tests should add:

- second-source ephemeris comparisons for planetary facts
- station-boundary retrograde cases
- exact aspect search cases if the app moves beyond simple daily facts
- runtime integration tests for private natal contact behavior in the signed-in app shell
- timezone-aware week selection if the app later supports household timezones beyond labels
- seasonal marker behavior around year boundaries

## Non-Goals

- No full timing engine UI.
- No full astrology interpretation.
- No user-facing personal natal chart explanations.
- No user-facing personal transit claims.
- No houses.
- No compatibility or synastry.
- No AI-generated timing meaning.
- No private chart data in source-controlled examples.
