# Ritual Words Source Fidelity Audit

Issue: #376

Branch: `codex/issue-376-ritual-words-audit`

## Summary

This audit repairs the source-wording contract for extraction packets and runtime Ritual records.

The corrected rule is:

1. If source-provided operative ritual words are 20 words or fewer, use those words verbatim in the ritual body and track them as `source_exact_short`.
2. If source-provided operative ritual words are more than 20 words, write adapted Moon & Table words that preserve the source words' ritual function, include those words in the ritual body, and track them as `adapted_source_words`.

There is no third path for operative ritual speech. Runtime Ritual copy must not contain process labels, "say the app line" placeholders, or wording that exists only because the extractor invented a ceremonial phrase.

## Files Audited

Policies and prompts:

- `docs/research/private-source-text-policy.md`
- `docs/research/runtime-ritual-authoring-policy.md`
- `docs/research/extraction-depth-policy.md`
- `docs/research/prompts/extraction-packet-prompt-template.md`
- `docs/research/prompts/source-gate-prompt-template.md`
- `docs/research/voice/moon-and-table-house-voice-guide.md`

Required candidate packets:

- `docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md`
- `docs/research/ritual-candidates/packet-house-witch-complete-extraction.md`
- `docs/research/ritual-candidates/packet-green-witchs-garden-plant-household-practice.md`
- `docs/research/ritual-candidates/packet-magical-household-domestic-threshold-altar.md`
- `docs/research/ritual-candidates/packet-whitehurst-flower-table-magic.md`
- `docs/research/ritual-candidates/packet-woodward-kitchen-vessel-magic.md`

Active source gates with stale wording contract references:

- `docs/research/source-gate-house-witch.md`
- `docs/research/source-gates/src-astrology-dominguez-practical-astrology-witches-pagans.md`
- `docs/research/source-gates/src-connection-anand-art-sexual-magic.md`
- `docs/research/source-gates/src-connection-saint-thomas-sex-witch.md`
- `docs/research/source-gates/src-mod-moon-gottesdiener-2020-moon-book.md`
- `docs/research/source-gates/src-plant-murphy-hiscock-green-witchs-garden.md`
- `docs/research/source-gates/src-plant-whitehurst-magic-of-flowers.md`
- `docs/research/source-gates/src-vessel-woodward-kitchen-witchery.md`

Runtime schema touched:

- `src/data/rituals/types.ts`
- `src/data/rituals/manage-rituals.ts`

## Policy Repairs

Removed the old operative-word modes and review flag:

- `private_source_excerpt`
- `moon_and_table_original`
- `privateExcerptKey`
- `privateExcerptRequired`

Runtime Ritual word modes are now:

- `source_exact_short`
- `adapted_source_words`

The extraction packet inventory disposition formerly called `private_excerpt_reference` was replaced in current policy/template language with `adapted_or_exact_text_review`, and `items_with_private_excerpt_recommended` was replaced with `items_with_operative_text_review`.

Historical source-discovery and old accounting audit documents were not rewritten in this PR; they remain history, not current policy. Active policy, prompts, source gates, required packets, and runtime type surfaces were scrubbed.

## Packet Repairs

### Buckland Candlelight

Spot-verified against the local private PDF for representative short operative phrases. Short lines under 20 words were preserved verbatim in the body and tracked as `source_exact_short`, including:

- "Here is that which holds me back."
- "Here is my strength; here is my courage; here is my fortitude; here is my victory."
- "This candle represents [Name]. As it burns, so burns his spirit."
- "The home is peace; peace is the home."
- "Here is [Name], the subject of this rite."
- "Here burn Tranquility and Patience."
- "For Truth in all that he sees, is this flame lit."

Longer poem/prayer/script portions were replaced with adapted Moon & Table lines in the ritual body and tracked as `adapted_source_words`.

Examples:

- `ritual-candlelight-buckland-releasing-habit-surrounded`: replaced source-lookup placeholder with "The old pattern is surrounded; the way out is already known."
- `ritual-candlelight-buckland-tending-home-settling`: preserved the short home/peace line and adapted the longer settling function.
- `ritual-buckland-candle-clear-words`: replaced longer source-word dependency with adapted clear-word language.

### House Witch

Removed stale long-word/private-excerpt language and kept adapted words in the body where source rites require a spoken/blessing function but the full source wording is longer than allowed.

Examples:

- `ritual-house-witch-spiritual-hearth-recognition`: adapted hearth-recognition words now appear directly in the body.
- `ritual-house-witch-house-blessing-circuit`: adapted air/fire, light, water/salt, and close lines appear in the body and are tracked as adapted words.
- `ritual-house-witch-bless-one-room`: adapted blessing lines appear directly in the body.

### Green Witch's Garden

Removed private/source-word placeholders and repaired invented ceremonial speech that did not have source-word support.

Converted invented speech into functional instructions where the source supports the act but not reusable wording:

- "You are already part of this house." -> "Name aloud that the plant is already part of the house."
- "Care first, symbol second." -> "Name the care it actually needs before doing anything symbolic."
- "I am here to meet you, not use you." -> "Name aloud that you are meeting the plant, not using it."
- "What was almost waste may try again." -> "Name the regrowth you are waiting for."
- "Stand here between house and sky." -> "Name the window as the place where this plant meets house and sky."

Kept one adapted elemental garden-blessing line because the candidate is explicitly replacing a longer source blessing:

- "Air, fire, water, and earth support this green place."

### Magical Household

Removed private/source-word placeholders and downgraded many invented "Say:" lines to functional naming instructions where the source supports the action but not a reusable operative phrase.

Converted examples:

- House focus line -> "Name that intention in one sentence."
- Hearth return line -> name what the home is holding, then stay for three breaths.
- Threshold distinction line -> name inside/outside functions without a fabricated charm line.
- Window clearing line -> name what can leave with the streaks.
- Rug/table/plant/sweeping/old-room/altar-place lines -> functional naming or action instead of invented speech.

Kept adapted words for candidates that are explicitly replacing source charm/prayer/formula mechanics:

- key/door mechanics
- elemental house circuit
- household altar tending

### Woodward Kitchen/Vessel

Removed private/source-word placeholders and the visible bad invented line:

- Removed: "The recipe stays private; the spell is what we remember."
- Replaced it with functional recordkeeping: read the sentence aloud once if that helps mark the memory.

Converted app-authored lines into functional instructions where the source supports intention, naming, hospitality, table clearing, seasonal marking, or vessel attention but the packet does not establish exact source words:

- bowl focus
- bread/table offering
- shared cup pause
- enoughness bowl
- seasonal food marker
- clear table close
- pot tending
- welcome offering
- candle beside bowl

Kept adapted words only where the packet is clearly replacing longer source-word practices:

- centering meditation
- water-bowl reflection
- object purpose/consecration

### Whitehurst

No active candidate-body operative word repairs were needed in this pass. The stale packet metric was updated to the current `adapted_or_exact_text_review` name.

## Source-Gate Repairs

Active source gates no longer say that long operative wording should be stored as a private excerpt or handled later as a private text lane. They now point to the same two-rule contract:

- exact source words of 20 words or fewer may be used verbatim when reviewed and product-safe;
- longer operative source words must be adapted into Moon & Table words and tracked as `adapted_source_words`.

## Verification Searches

The active policy/prompt/source-gate/required-packet/runtime surfaces were searched for:

```text
private_source_excerpt
privateExcerptKey
privateExcerptRequired
moon_and_table_original
Say the Moon & Table line
Moon & Table line
recipe stays private
spell is what we remember
Use the private
use the private
Read the private
read the private
private source words
source wording stays private
say the Say
private_excerpt_reference
private excerpt
private source excerpt
private words
private wording
```

Result for active/current surfaces: no matches.

Remaining matches outside that scope are in historical source-discovery notes, historical audit/accounting documents, or older non-required packets. They should not be treated as current policy. A later archival cleanup can either mark those documents historical at the top or migrate their terminology.

## Remaining Risks

- Some adapted lines in older packet work may still need source-by-source human review for voice and source fidelity before import.
- Historical docs still contain old terminology; this PR intentionally avoids rewriting old audit history.
- The candidate packets remain draft/import inputs, not direct-use or recommendable Ritual records.
- This PR changes runtime type names and management display only to remove a dead operative-word mode/flag; it does not import content or change recommendation selection.

## Merge Recommendation

Merge after validation if tests pass. This PR fixes the active extraction contract and required packet wording surface. It does not complete editorial review of every future packet, but it removes the bad systemic rule that created the current class of invented/process ritual words.
