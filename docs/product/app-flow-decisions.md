# Moon & Table App Flow Decisions

## 1. Purpose of this document

This document records settled user-facing app-flow decisions for Moon & Table. It should constrain future architecture, design, and implementation work unless it is superseded by a later explicit product decision.

Future work on the library, recommendation engine, feedback, favorites, history, or ritual intake should preserve these flows by default. If a future issue changes them, it should say exactly which decision is changing and why.

## 2. Product frame

Moon & Table is not a ritual text generator. It is a private, source/context-backed ritual library that chooses and shapes one ritual for the moment.

A ritual does not exist without purpose. The recommendation engine should select rituals whose intrinsic purpose fits the moment; it should not attach purpose to generic mechanics after selection.

Moon & Table has two main jobs:

1. Choose with me
   - Guided adaptive check-in.
   - The app recommends one ritual.

2. I have something in mind
   - Search, browse, and direct selection from the shared ritual library.
   - Includes favorites, curated rituals, and household rituals over time.
   - This is not recommendation-first.

## 3. Entry screen

The entry screen should offer two paths:

- Choose with me
- I have something in mind

Choose with me starts the adaptive check-in. The user is asking Moon & Table to help select one ritual for the moment.

I have something in mind opens the library, search, favorites, and direct-selection path. The user already has a ritual, material, carrier, favorite, or general direction in mind and should not be forced through the adaptive recommendation check-in.

## 4. Choose with me: adaptive flow

The first question is always:

How much do you have?

Options:

- Only a little
- Enough to participate
- Room for something deeper

Then ask:

Who is this for?

Options:

- Me
- Both of us

## 5. Energy behavior

Energy controls the burden of the check-in and the complexity of eligible ritual recommendations.

### Only a little

Ask fewer questions.

Flow:

1. How much do you have?
2. Who is this for?
3. What work should the ritual hold?

The app chooses where the ritual lives.

Low-energy users do not have to choose carrier, place, or material. The system should choose a low-burden ritual form that fits the selected work, audience, timing, and available library.

### Enough to participate

Ask:

1. How much do you have?
2. Who is this for?
3. Where should the ritual live?
4. What work should the ritual hold?
5. One refinement question based on the selected work.

The resulting ritual should be concrete and participatory, but not elaborate.

### Room for something deeper

Ask the same questions as Enough to participate.

The difference is not more questions. The difference is what the engine is allowed to select:

- richer ritual architecture;
- staged action;
- later return;
- stronger timing use when timing signals are genuinely strong;
- more embodied/shared roles when relevant;
- deeper source-backed structure.

Deeper does not mean more form-filling.

## 6. Carrier question

Question:

Where should the ritual live?

Options with visible helper text:

- In candlelight
  - flame, lamp, glow, witness
- At the table
  - bread, cup, shared surface, enough
- At the doorway
  - threshold, entry, crossing, month-turn
- With a plant
  - growth, witness, rest, living thing
- In words
  - spoken, written, folded, carried
- In a vessel
  - bowl, cup, plate, holding, emptying
- In the body
  - touch, breath, sensuality, movement

Notes:

- Do not include Room as a top-level carrier for now.
- Room may remain an internal place or tag selected by the engine.
- Do not use slash labels in the UI.
- Moon is not a top-level carrier for now.

## 7. Purpose question

Question:

What work should the ritual hold?

Options with visible helper text:

- Steadying
  - ground, rest, settle
- Opening
  - begin, invite, receive
- Releasing
  - let go, clear, finish
- Tending
  - home, us, body, what's here
- Connecting
  - touch, intimacy, closeness
- Voicing
  - speak, write, name
- Marking
  - threshold, season, change
- Blessing
  - honor, welcome, make sacred
- Protecting
  - boundary, belonging, what stays held
- Remembering
  - memory, gratitude, meaning

Notes:

- Do not include Something else for now.
- Purpose is not optional metadata. A ritual's purpose is part of what it is.
- These labels are product decisions for now, but the underlying schema may become more precise as the library-first architecture is designed.

## 8. Refinement layer

For Enough to participate and Room for something deeper, ask one refinement question based on the selected work.

Current candidate refinements:

### Steadying

Question: What needs steadying?

Options:

- My body
- The room
- Us
- The moment

### Opening

Question: What is opening?

Options:

- A beginning
- A welcome
- A threshold
- The month

### Releasing

Question: What is being released?

Options:

- A hold
- A finished thing
- A small space
- A burden

### Tending

Question: What needs tending?

Options:

- Me
- Us
- The home
- A living thing
- What is already here

### Connecting

Question: What kind of connection?

Options:

- Touch
- Sensuality
- Tenderness
- Play
- Desire
- Closeness

### Voicing

Question: What needs voice?

Options:

- A clear sentence
- A truth
- A written phrase
- Something between us

### Marking

Question: What are you marking?

Options:

- A threshold
- A season
- A change
- The month turning

### Blessing

Question: What are you blessing?

Options:

- The room
- The table
- Us
- A beginning
- What is already here

### Protecting

Question: What are you protecting?

Options:

- Rest
- A boundary
- The threshold
- What belongs here
- Us

### Remembering

Question: What are you remembering?

Options:

- Someone
- What changed
- What mattered
- What is still here
- Gratitude

These refinement options are current candidates and may be improved, but the flow shape is settled: one refinement question for the two higher-energy paths.

## 9. Timing behavior

Timing is engine-led.

The app should not ask the user whether timing matters.

Timing sources include:

- lunar phase / lunation;
- moon windows;
- astrology;
- numerology;
- season;
- calendar thresholds;
- daypart;
- eventually personal dates.

Rules:

- Strong timing should strongly shape eligible recommendations.
- Timing should operate within selected carrier/purpose constraints.
- Timing should not hijack explicit user selections.
- If timing signals are weak, timing should recede.
- Avoid filler timing language.
- Moon is not currently a top-level carrier; lunar timing shapes recommendation when strong.

## 10. I have something in mind

I have something in mind should open the shared ritual library and search path.

This path should support, over time:

- search;
- browse;
- favorites;
- direct selection;
- curated rituals;
- household rituals;
- source-backed rituals;
- rituals added through future intake flows.

This is not the same as Choose with me.

A user who has something in mind should not be forced through the adaptive recommendation check-in.

## 11. Body / intimacy / sensuality

Settled representation:

- In the body is a carrier.
- Connecting is a purpose.
- Body, intimacy, and sensuality should be represented as legitimate ritual possibilities.

Product voice direction:

- private;
- warm;
- adult;
- embodied;
- sensual when appropriate;
- non-clinical;
- non-corporate;
- not coy;
- not sterile.

Do not turn this lane into a disclaimer block. This is a private app for two adult life partners.

## 12. Explicit decisions and non-goals

Settled decisions:

- No top-level Room carrier for now.
- No top-level Moon carrier for now.
- No Something else option for now.
- No slash labels in the UI.
- Higher energy does not mean more questions beyond the single refinement question.
- Timing is not user-asked.
- I have something in mind is direct library access, not another recommendation flow.
- Carrier and purpose labels should show helper text.

Non-goals for this document:

- Do not implement UI.
- Do not change routes.
- Do not change check-in behavior.
- Do not change recommendation scoring.
- Do not change ritual content.
- Do not add rituals.
- Do not add migrations.
- Do not implement library, search, favorites, or intake.
- Do not alter runtime code.

## 13. Relationship to library-first architecture

This document does not settle the future library data model.

The library architecture remains open, but future architecture should preserve these app-flow decisions unless explicitly changed. Likely future concepts include:

- `LibraryRitual`
- `RitualPattern`
- `RitualInstance`
- favorites
- feedback
- intake
- readiness audit

Those concepts should be designed around this product flow, not used to reopen it by default.

## 14. How future issues should use this document

Future issues touching check-in, library, recommendation, feedback, history, favorites, or intake should reference this document and explicitly state whether they preserve or modify these app-flow decisions.

If an implementation issue preserves the decisions, say so in the PR notes. If it modifies them, cite the later product decision that supersedes this document.
