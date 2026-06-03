# Timing Engine Decision

Moon & Table should compute timing facts separately from symbolic interpretation.

The timing layer answers factual questions such as:

- What lunar phase is active for a date?
- When are the next new moon and full moon?
- What solar season is active?
- When do solstices and equinoxes occur?

The symbolic layer answers different questions:

- What does this timing suggest for a calm weekly brief?
- Which approved symbolic cards are relevant?
- Which safe ritual patterns fit the household capacity and schedule?

The app should not blur those layers. A computed sky fact can be accurate without implying what a person should feel, do, decide, or expect.

## Decision

Use Astronomy Engine as the MVP timing engine.

Astronomy Engine is the best first fit because it can provide deterministic sky facts without making interpretive claims. It keeps the first implementation focused on dates, angles, phases, positions, and provenance rather than a full astrology system.

Use the timing output as factual input only. Interpretation should continue to come from reviewed symbolic cards, approved ritual patterns, and private capacity/schedule constraints.

## Why Not Swiss Ephemeris Yet

Swiss Ephemeris is useful for later professional astrology needs, especially:

- houses
- natal chart calculation
- precise personal transits
- more advanced astrology workflows
- validation against professional astrology tooling

It is deferred because the MVP does not need those features yet. Adding it now would introduce licensing, deployment, native/binary, and product-scope decisions before the brief engine needs them.

## MVP Timing Scope

MVP timing facts should support:

- current moon phase and lunar phase angle
- new moon and full moon date/time
- four lunar phase buckets: new, waxing, full, waning
- solar seasons
- solstice and equinox dates
- basic planetary positions if practical, stored as facts only

The four lunar phase buckets should stay aligned with the approved symbolic card set. Do not add an eight-phase lunar interpretation system in the timing layer.

## Deferred Timing Scope

Defer:

- houses
- natal chart engine
- personal transits
- detailed aspect interpretation
- Swiss Ephemeris integration
- full professional astrology calculations
- relationship, compatibility, fate, or prediction logic

Detailed aspects or planetary positions may eventually become timing facts, but their interpretation must still be handled by reviewed symbolic cards and approval workflow.

## Licensing And Deployment Notes

Astronomy Engine should be reviewed for package license, browser/server usage, and deterministic test behavior before implementation. It is expected to be lighter operationally than Swiss Ephemeris for the MVP.

Swiss Ephemeris should not be added until there is a written licensing and deployment decision. In particular, decide whether the app needs its precision enough to justify package, hosting, and compliance complexity.

## Model Plan

The first model should be factual, traceable, and testable.

```ts
type TimingFactType =
  | "moon_phase"
  | "lunation"
  | "solar_season"
  | "solar_event"
  | "planetary_position";

type TimingFactConfidence = "computed" | "estimated" | "manual_review";

type TimingFact = {
  id: string;
  type: TimingFactType;
  dateStart: string;
  dateEnd?: string;
  timezone: string;
  label: string;
  computedBy: "astronomy_engine" | "manual_placeholder";
  relatedSymbolicKeys: string[];
  confidence: TimingFactConfidence;
};
```

`relatedSymbolicKeys` should point to reviewed symbolic card keys. It should not contain prose interpretation.

```ts
type SkyEventType =
  | "new_moon"
  | "full_moon"
  | "solstice"
  | "equinox"
  | "planetary_position";

type SkyEvent = {
  id: string;
  type: SkyEventType;
  dateTime: string;
  timezone: string;
  label: string;
  computedBy: "astronomy_engine" | "manual_placeholder";
  rawFactKeys: string[];
  relatedTimingFactIds: string[];
};
```

`SkyEvent` should represent dated events. `TimingFact` can represent active conditions or intervals derived from events.

## Initial Test Plan

The eventual implementation should include deterministic tests for:

- a known new moon date/time
- a known full moon date/time
- waxing vs. waning classification for fixed dates
- solstice and equinox date calculation
- timezone boundary behavior around a lunation
- deterministic output for the same fixed date/time input
- no symbolic interpretation in computed timing output

Tests should use fixed dates, explicit timezones, and stable expected values. Any tolerance for astronomical calculations should be documented in the test itself.

## Product Guardrails

- Computed timing facts do not create obligations.
- Timing facts do not make predictions.
- Timing facts do not decide ritual safety.
- Symbolic meaning comes from approved cards.
- Recommended actions come from approved safe ritual patterns.
- Capacity and schedule can override symbolic timing.

