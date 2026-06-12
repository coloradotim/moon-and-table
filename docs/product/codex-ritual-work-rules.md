# Codex Ritual Work Rules

> Status: Current / controlling.
> This is the plain-language rulebook for Codex work on Rituals, library,
> intake, source review, search, direct selection, and recommendations.

## Scope Gate

Before any future issue creates, edits, migrates, or recommends Ritual content, the issue must state which scope it is in:

1. Source research only
2. Ritual authoring/review
3. Inert typed Ritual data
4. Runtime recommendation integration
5. UI/search/direct selection
6. Legacy `RitualPattern` maintenance

If the issue does not state scope clearly, do not infer scope.

## Ritual Authoring Rules

- Do not create Rituals from generic mechanics.
- Do not assemble rituals from metadata.
- Do not invent ritual prose unless explicitly asked.
- Do not invent adaptations.
- Do not change a Ritual's purpose through adaptation.
- Similar mechanics with different purposes are different Rituals.
- Completion and ritual words belong inside `practice`.
- Preserve presentation fields:
  - `headline`
  - `practice`
  - `intention`
  - `best window`
  - `why this fits`
  - `question to carry`

## Source / Research Rules

- Old content packets are supporting source research, not implementation plans.
- Source packets written for `RitualPattern` / `SourceNote` / `SymbolicCard` implementation must not be used as runtime instructions.
- Any source-backed Ritual must have source grounding reviewed before it becomes recommendation-eligible.
- Source research must separate inventory from eligibility. Inventory the source first in repository-safe paraphrase; decide import, direct-use, recommendation eligibility, hold, or reject later.
- Do not silently exclude adult, explicit, sex-forward, consent-sensitive, kink-adjacent, body-fluid, technique-heavy, culturally loaded, therapy-adjacent, awkward, or non-default-recommendation-ready material from source inventory for those reasons alone. Label it, preserve the source location, and surface it for Tim decision.
- Copyright, privacy, and exact-source-text limits still control what can be stored in the repository. They limit reproduction, not whether an item is named in the inventory.

## Migration Rules

- Do not migrate existing `RitualPattern` records directly into Rituals unless a reviewed migration issue explicitly says so.
- Existing `RitualPattern` records may be used only as:
  - current runtime references;
  - migration evidence;
  - examples of failure modes;
  - candidates for later human-reviewed re-authoring.

## Runtime Rules

- Do not add runtime wiring, scoring, UI, `SourceNotes`, `SymbolicCards`, `RitualPatterns`, migrations, history, favorites, feedback, or intake unless explicitly requested.
- Do not use composer bridge language to create Ritual identity.
- Runtime recommendation work must preserve the Ritual-first doctrine.
