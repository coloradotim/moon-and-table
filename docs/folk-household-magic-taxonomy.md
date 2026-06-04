# Folk Household Magic Taxonomy

This document defines the planning taxonomy for future folk household magic content in Moon & Table. It is not active content. It does not approve sources, SourceNotes, symbolic cards, ritual patterns, presentations, bridges, scoring changes, or UI changes.

The folk household magic taxonomy overlays the existing practice categories. It does not replace Home, Plant, Kitchen, Candle/light, Reflection, or Seasonal. Existing practice categories remain the simple user-facing routes; folk household magic supplies deeper source-backed material forms, functions, timing affinities, and ritual structures underneath them.

Moon & Table treats magical practice as meaningful on its own terms. Do not tell the practitioner what to believe. Do not reduce magical practices to wellness metaphors, decorative props, psychological cues, or "visual markers." Do not safety-wash practices into dead objects.

Safety should constrain recommendations; it should not rewrite the metaphysics of the practice.

This means source, privacy, and practical boundaries can shape eligibility, variants, and wording. They can cause a risky or unsupported form to be set aside. They should not flatten the practice into something less magical in order to make it feel safer.

## Core Rules

- Preserve ritual meaning while bounding claims.
- Do not make unsupported claims about healing, protection, prosperity, love, medical outcomes, legal outcomes, safety outcomes, certainty, or guaranteed results.
- Do not include unsafe default instructions.
- If a ritual form creates source, privacy, or practical eligibility risk, choose an approved form that fits, quietly constrain eligibility, or set the pattern aside.
- Practical boundaries should be quiet and mostly internal.
- Do not copy distinctive rituals, spells, prayers, chants, recipes, correspondence tables, or private source text.
- Materials are vehicles, not top-level categories.

## Three Layers

### 1. Visible Practice Type

This is what the user sees. These stay simple and low-overwhelm:

- Home
- Plant
- Kitchen
- Candle or light
- Reflection
- Seasonal
- Surprise me

Do not add a visible category called Folk magic, Moon water, Charms, Spells, Prosperity, Protection, Petitions, Jars, Bowls, or Containers.

### 2. Folk Household Magic Content Taxonomy

This is what the library uses underneath the visible routes:

- lunar materials
- threshold charms
- household blessing / boundary / clearing
- sweetening / warmth / affection
- written charms / petitions / spoken words
- containers / jars / bowls / carried objects

These are source/content packets and taxonomy groupings, not user-facing app tabs.

### 3. Specific Materials and Actions

These are ritual vehicles, not top-level user-facing categories:

- water
- moonlight
- cinnamon
- salt
- honey
- sugar
- tea
- bread/grain
- candle/flame/lamp
- plant/herb
- key
- coin
- bowl
- jar
- cup
- bottle
- paper/slip
- thread/string
- doorway
- window
- table
- sweeping
- washing
- carrying
- placing
- speaking
- folding
- lighting
- extinguishing

Future content packets should treat these as material forms, activation modes, or action vehicles inside reviewed ritual structures.

## Planned Folk Household Magic Packets

### A. Lunar Materials and Moon-Timed Objects

Covers:

- moon water
- moonlit objects
- bowls, jars, cups, vessels, and windows
- full moon and new moon material rites
- lunar charging, resting, holding, blessing, and clearing language

Existing visible routes may include:

- Seasonal
- Candle or light
- Reflection
- Home

Planning notes:

- Do not reduce moon water to a visual marker.
- Do not tell the practitioner what moon water is or is not.
- Do not include unsafe default instructions, such as drinking ritual water.
- Preserve lunar material practice as meaningful while bounding claims.

### B. Threshold Charms and Monthly Household Rites

Covers:

- cinnamon at the threshold
- first-of-month household rites
- doorway, keys, entry bowls, crossing, and return
- welcome, luck, prosperity, enoughness, and household flow
- monthly opening / monthly reset

Existing visible routes may include:

- Home
- Seasonal
- Kitchen, where spices/materials are involved
- Marking a threshold
- Making a beginning
- Tending the home

Planning notes:

- Do not reduce threshold charms to decor, productivity resets, or visual markers.
- Do not promise money, protection, luck, success, safety, legal outcomes, or guaranteed results.
- Do not copy distinctive cinnamon-door spell scripts, chants, prayers, or instructions.

### C. Household Blessing, Boundary, and Clearing

Covers:

- salt bowls
- sweeping
- washing
- opening/closing doors or windows
- returning objects
- room/table/threshold boundary practices
- smoke-free clearing
- blessing without guaranteed protection claims

Existing visible routes may include:

- Home
- Kitchen
- Seasonal
- Reflection
- Getting grounded
- Clearing something out
- Tending the home
- Marking a threshold

Planning notes:

- Do not reduce boundary or clearing practices to cleaning hacks, decor, or purely psychological cues.
- Do not make cleaning feel like moral worth.
- Do not promise protection, physical safety, spiritual certainty, legal outcomes, or guaranteed clearing.

### D. Sweetening, Warmth, and Affection

Covers:

- honey
- sugar
- cinnamon
- tea
- sweet words
- warm cups/bowls
- table warmth
- softening the room
- tending-us rituals without therapy, coercion, or relationship advice

Existing visible routes may include:

- Kitchen
- Home
- Reflection
- Candle or light
- Tending us
- Resting
- Saying something clearly
- Getting grounded

Planning notes:

- Do not reduce sweetening or warmth practices to comfort cues or wellness metaphors.
- Do not promise love, attraction, relationship repair, harmony, calm, health, or emotional outcomes.
- Do not create coercive love magic, manipulation, or consent-violating practices.
- Keep food, allergy, pet, child, pregnancy, and ingestion boundaries quiet and practical.

### E. Written Charms, Petitions, and Spoken Words

Covers:

- one sentence
- folded paper
- named intention
- carry phrase
- blessing / closing formula
- threshold words
- written or spoken clarity
- ritual speech without becoming Conversation UI, therapy, or open-ended AI interpretation

Existing visible routes may include:

- Reflection
- Home
- Seasonal
- Candle or light
- Saying something clearly
- Making a beginning
- Marking a threshold
- Tending us, only when bounded

Planning notes:

- Do not reduce written or spoken charms to journaling prompts or self-help affirmations.
- Do not promise manifestation, protection, relationship outcomes, healing, certainty, or success.
- Do not create coercive speech, forced vulnerability, or consent-violating shared practices.
- Do not copy distinctive prayers, chants, charms, affirmations, petitions, or source language.

### F. Containers, Jars, Bowls, and Carried Objects

Covers:

- jars
- bowls
- bottles
- cups
- keys
- coins
- small carried objects
- objects that hold, invite, release, mark, or carry ritual work
- refresh/closure of container practices

Existing visible routes may include:

- Home
- Kitchen
- Seasonal
- Reflection
- Candle or light
- Making a beginning
- Clearing something out
- Getting grounded
- Marking a threshold
- Tending the home

Planning notes:

- Do not reduce containers or carried objects to decor, visual markers, productivity props, or psychological cues.
- Do not promise protection, luck, money, attraction, healing, certainty, or guaranteed outcomes.
- Do not copy distinctive spell jar recipes, bottle spells, charms, prayers, chants, or correspondence tables.
- Track refresh and closure modes before implementation.

## Metadata Axes

Future content packets should consider these axes. They are planning concepts, not implemented TypeScript fields yet.

```ts
FolkMagicContentShape = {
  practiceDomains: string[];
  magicalFunctions: string[];
  materialForms: string[];
  timingAffinities: string[];
  activationModes: string[];
  durationMode:
    | "momentary"
    | "overnight"
    | "monthly"
    | "seasonal"
    | "carried"
    | "until_refreshed";
  closureModes: string[];
  metaphysicalIntegrityNotes: string[];
  claimsBoundaries: string[];
  safetyEligibilityNotes: string[];
};
```

### Practice Domains

Examples:

- home
- threshold
- kitchen
- plant/herb
- candle/light
- lunar
- seasonal/monthly
- written/spoken
- container/object

### Magical Functions

Examples:

- grounding
- beginning
- clearing/release
- blessing
- protection/boundary
- sweetening/softening
- prosperity/luck/welcome
- love/affection/tending us
- rest/closure
- threshold/transition
- gratitude/recognition
- return/repair

These functions describe symbolic direction. They do not authorize claims of guaranteed protection, prosperity, love, healing, safety, or outcomes.

### Material Forms

Examples:

- water
- salt
- cinnamon
- honey
- sugar
- tea
- bread/grain/oats
- candle/flame/lamp
- plant/herb
- key
- coin
- paper/slip
- thread/string
- jar/bottle/bowl/cup
- doorway/window/table
- cloth/blanket
- broom/cloth/washing

### Timing Affinities

Examples:

- full moon
- new moon
- waxing moon
- waning moon
- first of month
- seasonal shift
- threshold moment
- morning/evening
- exact timing window
- private natal contact, visibility-aware

Timing affinities can shape when a ritual is eligible or how it is explained. They should not imply certainty or guaranteed effects.

### Activation Modes

Examples:

- place
- speak
- write
- fold
- light
- extinguish
- wash
- sweep
- carry
- tie
- pour
- set aside
- return
- cross threshold

### Duration and Closure

Examples:

- momentary
- overnight
- monthly
- seasonal
- carried
- until refreshed
- dispose
- wash
- return
- pour out
- refresh
- leave in place
- close with words
- extinguish

Duration and closure must be defined before a practice becomes active content. A ritual that holds, carries, or remains in place needs a clean refresh, return, or closing path.

## Mapping to Visible Routes

| Folk content packet | Existing visible route |
| --- | --- |
| Lunar materials and moon-timed objects | Seasonal, Candle or light, Reflection, Home |
| Threshold charms and monthly household rites | Home, Seasonal, Kitchen, Marking a threshold |
| Household blessing, boundary, and clearing | Home, Kitchen, Reflection, Seasonal |
| Sweetening, warmth, and affection | Kitchen, Home, Reflection, Tending us |
| Written charms, petitions, and spoken words | Reflection, Home, Saying something clearly |
| Containers, jars, bowls, and carried objects | Home, Kitchen, Seasonal, Reflection, Candle or light |

The visible route is the user-facing doorway. The folk packet is the deeper source/content layer that may eventually supply SourceNotes, SymbolicCards, RitualPatterns, RitualPresentation, RitualMeaningBridges, and quality scenarios.

## Relationship to Current Content

This taxonomy includes and deepens existing content. It does not replace it.

Current and future examples:

- Candle or light can later support flame, lamp, extinguishing, color, and light-as-threshold charms.
- Plant can later support plant companionship, herbal symbolism, pruning/release, growth/rest/dormancy, and plant-as-household ally.
- Kitchen can later support salt, honey, cinnamon, lemon, tea, bread, bowls, spoons, sweetening, and ordinary nourishment.
- Home can later support doors, thresholds, keys, sweeping, boundary, blessing, and returning objects.
- Reflection can later support written charms, petitions, carry phrases, spoken words, and closing formulas.
- Seasonal can later support lunar, monthly, first-of-month, and seasonal household rites.

## Content Packet Guidance

Use the workflow in `docs/content-packets/README.md` for future folk household magic packets, including #171 through #176. Packets should start as `draft` or `ready_for_review`. They should not produce active SourceReviews, SourceNotes, SymbolicCards, RitualPatterns, RitualPresentation, RitualMeaningBridges, scoring behavior, generator behavior, or UI changes until a human reviewer marks the packet `approved_for_implementation`.

Future folk household magic content packets should include a metaphysical integrity check:

- Does this preserve the ritual meaning of the practice?
- Did we accidentally reduce it to a wellness metaphor, visual prop, psychological cue, safety disclaimer, or decorative object?
- Are claims bounded without condescension?
- Are practical constraints handled quietly?
- Does the packet avoid telling the practitioner what to believe?

Packets should also identify:

- source candidates and classifications
- source/risk notes
- proposed SourceNotes
- proposed SymbolicCards
- proposed RitualPatterns
- proposed RitualPresentation needs
- proposed RitualMeaningBridges
- proposed recommendation quality scenarios
- practical, source, copyright, cultural sensitivity, and privacy risks
- what Codex may implement after human approval
- what Codex must not implement

## Non-Goals

Do not use this taxonomy issue to:

- add new sources
- add SourceReviews
- add SourceNotes
- add SymbolicCards
- add RitualPatterns
- add RitualPresentation
- add RitualMeaningBridges
- change scoring
- change generator behavior
- add visible UI categories
- implement moon water
- implement cinnamon threshold rites
- implement charms, jars, bowls, petitions, protection, or prosperity practices
- weaken source/privacy/practical constraints
- add private data
- copy source text
