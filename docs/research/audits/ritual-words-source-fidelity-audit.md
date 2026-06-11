# Ritual Words Source Fidelity Audit

Issue: #376

Branch: `codex/issue-376-ritual-words-audit`

## Corrected Contract

Operative ritual words are ritual materials.

Current rule:

1. If source-provided operative ritual words are 20 words or fewer, use those words verbatim in the ritual body and track them as `source_exact_short`.
2. If the source supports a speech, naming, blessing, writing, or prayer action but does not provide reviewed reusable words, use plain functional instruction such as "Name the purpose aloud." Do not invent quoted ceremonial speech.
3. If source-provided operative ritual words are more than 20 words, do not reproduce the long passage. Use `adapted_source_words` only as a candidate-by-candidate exception when the source words are structurally necessary to the rite and the audit explains why functional instruction is not enough.
4. If a candidate truly requires unresolved source words and neither exact short wording nor justified adaptation is available, hold the candidate until the wording is reviewed.

There is no normal product path where process labels, placeholder speech, or app-authored substitute lines stand in for source words.

## Files Audited

Policies and prompts:

- `docs/research/operative-ritual-words-policy.md`
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

Active source gates and runtime schema references were also reviewed where they controlled extraction behavior.

## Policy Repairs

- Runtime word modes now distinguish exact short source words from justified adapted long source-word exceptions.
- Prompt templates now require functional instruction or hold when a long-word adaptation cannot be justified candidate by candidate.
- Source gates no longer say that long operative wording automatically becomes adapted Moon & Table speech.
- Packet checklists now require exact short source wording, functional instruction, or a justified adapted-word exception.

## Packet Repairs

### Buckland Candlelight

Buckland remains the only required packet with active `adapted_source_words` entries after this pass.

Short source lines under 20 words remain verbatim in the body and are tracked as `source_exact_short`.

Longer source-word functions are retained only for specific candle rites where the body already contains full source placement, lighting, order, repetition, and close, and where the words operate as part of that staged candle structure.

### House Witch

Removed unsupported adapted-word metadata and converted unsupported quoted lines into functional instructions.

Examples:

- "Say" lines for hearth recognition became instructions to name the hearth, flame, or house action.
- Whole-house and one-room blessing lines became functional blessing actions.
- Room purification smoke/flame lines became instructions to name what smoke carries out and what flame blesses.

Exact short source lines in `Create the Small Sacred Space` remain verbatim and tracked as `source_exact_short`.

### Green Witch's Garden

Removed unsupported quoted speech and adapted-word metadata.

The packet now uses functional instructions for plant speech actions where no reviewed reusable source words are present.

### Magical Household

Removed unsupported quoted speech and adapted-word metadata.

The packet now uses functional instructions for household, threshold, key, and altar speech actions where exact reviewed reusable words are not present.

### Woodward Kitchen/Vessel

Removed unsupported quoted speech and adapted-word metadata.

The packet now uses functional instructions for centering, vessel, table, cup, object, and kitchen speech actions where exact reviewed reusable words are not present.

### Whitehurst

No active candidate-body operative-word repairs were needed in this pass.

## Candidate-By-Candidate Adapted Words Audit

Only the following adapted-word entries remain in the required candidate packets.

| Candidate | Adapted words in body | Source basis | Why this is not invented substitute speech | Status |
|---|---|---|---|---|
| `ritual-candlelight-buckland-releasing-habit-surrounded` | "The old pattern is surrounded; the way out is already known." | Buckland, PDF pp. 20-21, longer poem/script following exact short candle lines. | The rite is built around surrounding a black candle with four white candles and moving them inward over repeated nights. The adapted line names that exact source structure rather than adding a new ritual claim. | Kept as justified exception pending human source-word review before direct use. |
| `ritual-candlelight-buckland-tending-home-settling` | "Let peace return to this house; let patience and warmth take root here." | Buckland, PDF pp. 22-23, home-settling candle sequence and repeated spoken material. | The body preserves the source layout, repeated sitting periods, and exact short home/peace line. The adapted line supports the same settling function without replacing the exact short line. | Kept as justified exception pending human source-word review before direct use. |
| `ritual-buckland-seven-marks-readiness` | "Let readiness gather one flame at a time." | Buckland, PDF pp. 90-93, seven-night increasing-light sequence. | The adapted line names the source mechanics of adding one candle each night and keeps the narrowed product function as readiness. | Kept as justified exception pending human source-word review before direct use. |
| `ritual-buckland-protection-circle` | "Let this circle hold what belongs within it." | Buckland, PDF pp. 30-32, protective candle-circle structure and long prayer/Psalm material. | The body preserves the circle placement. The adapted line names the circle function while removing guarantee and prayer text. | Kept as justified exception but not direct-use eligible; protection framing remains review-bound. |
| `ritual-buckland-remembrance-photo-peace` | "Let memory be held in peace tonight." | Buckland, PDF pp. 23-26, remembrance photograph/candle rite and longer source passage. | The adapted line is tied to the photograph, light-blue candle, repeated nights, and half-hour candle period already in the body. | Kept as justified exception but grief/death content remains review-bound. |
| `ritual-buckland-object-consecration-light` | "This object receives its work and rests in the light." | Buckland, PDF pp. 93-94, object/talisman consecration structure and longer consecration wording. | The line names the source consecration function after the exact short fire line and does not introduce a new object purpose. | Kept as justified exception pending human source-word review before direct use. |
| `ritual-buckland-courage-around-fear` | "Let courage take its place around this fear." | Buckland, PDF pp. 33-36, courage/fear candle layout and longer prayer/Psalm material. | The body preserves the petitioner and surrounding candle layout. The adapted line names the physical candle relationship in the rite. | Kept as justified exception; fear/courage product boundary remains review-bound. |
| `ritual-buckland-welcome-joy-center` | "Let warmth move closer to the center." | Buckland, PDF pp. 36-37, inward-moving candle sequence. | The adapted line describes the source movement of candles toward the center and removes outcome-force language. | Kept as justified exception pending human source-word review before direct use. |
| `ritual-buckland-purify-self-flame` | "Let what is sincere grow brighter than what is heavy." | Buckland, PDF pp. 65-67, pink/white candle purification sequence and longer prayer/Psalm material. | The line is bound to the source candle sequence and repeated sitting periods while avoiding shame, health, or guarantee language. | Kept as justified exception; purification framing remains review-bound. |
| `ritual-buckland-candle-clear-words` | "Let the clear word come forward without force." | Buckland, PDF pp. 75-76 / printed pp. 131-133, truth/clear-words candle rite and longer prayer/Psalm material. | The line preserves the source function of truth/clear words without copying prayer text or forcing confession. | Kept as justified exception pending human source-word review before direct use. |
| `ritual-buckland-dream-door-candle` | "Let the dream draw near without being forced." | Buckland, PDF p. 89, attraction line inside a dream-candle sequence. | The adapted line is embedded among exact short source lines and removes outcome-force while preserving the dream-drawing function. | Kept as justified exception; dream/attraction framing remains review-bound. |
| `ritual-buckland-dream-door-candle` | "Let the night show only what can be carried back." | Buckland, PDF pp. 89-90, longer dream passage following exact short source lines. | The line preserves the return/carry-back function of the dream rite without copying the longer passage. | Kept as justified exception; dream content remains review-bound. |

## Held Candidate Rule

No candidate was newly held in this cleanup simply because unsupported quoted speech was removed. When the ritual still works through source-backed sequence plus functional naming, it remains draft/importable in the packet.

The hold rule applies only when the candidate collapses without unresolved source words. In that case, the packet must mark the candidate held rather than approve invented speech.

## Verification Searches

Current active policy, prompt, source-gate, required-packet, and runtime surfaces were searched for obsolete private-wording lanes and automatic long-word adaptation language.

Result: the active contract now says exact short words, functional instruction, justified adapted exception, or hold.

## Remaining Risks

- Buckland adapted lines still need human source-word review before any direct-use or recommendable import.
- Some draft packets remain source-heavy and require product/safety review before runtime activation.
- This PR does not import these packet candidates or change recommendation selection.

## Merge Recommendation

Merge after validation if tests pass. This PR removes the systemic invented-word contract, repairs required packets in place, and leaves only candidate-audited adapted-word exceptions where the source-word function is tied to the preserved ritual sequence.

## Post-#379 Buckland update

Issue #379 supersedes the Buckland adapted-word exception table above for current packet state.

Current review note:

```text
docs/research/reviews/buckland-adapted-ritual-words-review.md
```

Outcome: all 12 Buckland adapted-word exceptions were converted to functional instruction in `docs/research/ritual-candidates/packet-buckland-candlelight-complete-extraction.md`. No active Buckland candidate now uses adapted long-word metadata. Exact short source words remain where already cited and tracked.
