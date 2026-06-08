> Status: Archived / historical.
> This document is preserved for source trail, failure analysis, or migration context.
> It is not current implementation guidance.
> For current direction, see `docs/product/moon-and-table-current-direction.md`.

# Natal Contact Model

Moon & Table can compute private contacts between current timing facts and private natal profile placements. The contact model returns structured records; the weekly brief generator may use selected records as bounded scoring signals and visibility-aware explanation context. It does not create predictions, identity claims, houses, synastry, or compatibility.

## Privacy Boundary

Real chart details belong only in private runtime storage or local gitignored files. The repository may contain:

- generic TypeScript types
- fake placeholder test profiles
- docs describing the model
- non-identifying theme keys

The repository must not contain real names, emails, birth dates, birth times, birth places, raw chart details tied to real people, private relationship details, private schedules, or private source text.

## Input Shape

The private placement shape is:

```ts
type PrivateNatalPlacement = {
  bodyOrPoint: NatalPoint;
  sign: ZodiacSign;
  degree?: number;
  themeKeys?: string[];
};

type PrivateNatalProfile = {
  personKey: "person_a" | "person_b";
  placements: PrivateNatalPlacement[];
  profileThemeKeys?: string[];
  astrologyVisibility?: "subtle" | "balanced" | "explicit";
};
```

Use fake placeholder values in tests. Real private values are not source-controlled.

## Computed Contacts

`getNatalContactsForTimingFacts()` accepts current timing facts and one or more private natal profiles. It returns structured `NatalContact` records with:

- `personKey`
- transiting body
- private natal body or point
- contact type
- optional aspect type
- optional orb
- transit and natal sign/degree where available
- theme keys
- strength
- visibility

Supported MVP contact types:

- `same_sign`: detected from sign data only
- `near_conjunction`: detected with degrees and a conservative 3 degree orb
- `major_aspect`: opposition, square, trine, and sextile with a conservative 3 degree orb

Conjunction geometry is represented as `near_conjunction` so it can stay distinct from broader same-sign resonance.

## Theme Keys

Contacts output compact theme keys rather than interpretive prose. Examples include:

- `practical_care`
- `home_and_belonging`
- `careful_words`
- `visible_warmth`
- `relationship_balance`
- `direct_action`
- `embodied_tending`
- `structure_and_repair`
- `quiet_integration`

These keys are private computation hints for scoring and explanation. They should not be treated as final user-facing copy.

## Deferred

- richer user-facing natal explanation controls
- houses
- synastry or compatibility
- personal transit predictions
- identity/personality claims
- body-specific orbs
- elemental and modality resonance
- user-facing editing or import UI for detailed placements

Future issues can deepen the scoring weights and explanation controls once privacy, consent, and display rules mature.

## Timing Look-Ahead

`getTimingWindowCandidates()` can compute private natal contacts for each candidate timing fact when private natal profiles are supplied. Contacts can add score reasons such as private contact present, shared contact, or repeated theme.

The timing-window layer stores only safe contact keys and theme keys on each candidate. It must not use contact labels that expose raw natal placements, degrees, birth data, or private profile notes. User-facing copy should stay at the theme level unless a later issue adds explicit visibility controls for more detailed chart display.
