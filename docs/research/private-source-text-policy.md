# Private source text policy

Moon & Table is a private household ritual calendar and grimoire for Tim and Jessica. It is not a public ritual-publishing platform.

This policy exists so research agents stop flattening rituals into generic mechanics and stop treating words, blessings, prayers, invocations, prompts, meditations, spells, charms, and recipes as contamination risks.

## Core rule

Words are valid ritual mechanics.

Blessings, prayers, invocations, prompts, meditations, spells, charms, spoken formulas, sung lines, written questions, recipes, and distinctive ritual phrases may be central to a Ritual. Agents must not exclude them as categories.

The task is to classify source text use, not erase it.

## Distinction to preserve

There are three different uses of source text:

1. **Mechanics extraction** — source-backed ritual structure, materials, sequence, timing, carrier, purpose, and safety context.
2. **Private exact-text use** — exact wording manually selected by Tim from a legally possessed/provided source and stored privately in Moon & Table.
3. **Assistant-generated output** — generated packets, summaries, candidate records, and repo docs created by agents.

A modern authored blessing, prompt, invocation, spell, meditation, charm, recipe, or prayer may be valid for private household use even when the assistant should not reproduce the whole passage in a generated research packet.

## Agent extraction posture

Agents may extract:

- exact rite titles;
- exact short phrases;
- exact short questions;
- exact spoken cues;
- exact blessing names;
- exact material/action labels;
- short wording anchors that help Tim locate or preserve ritual force;
- close summaries of the source ritual’s structure, materials, sequence, purpose, and magical function;
- notes that exact source wording is ritually important and should be reviewed by Tim for private excerpting.

Agents should not reproduce in generated packets:

- full modern copyrighted rituals;
- full prayers or invocations;
- full guided meditations;
- full prompt sets;
- full recipes;
- whole distinctive spell texts;
- long copyrighted passages.

## Classification model

Use these classifications in source-gate and extraction records.

```text
use_directly_from_source:
  Tim and Jessica can perform the rite directly from the purchased/provided source. The app may recommend the source rite by title, page, and section without reproducing the full text.

private_excerpt_allowed:
  Exact modern source wording may be manually selected by Tim from his copy and stored in the private Moon & Table app with citation. Research agents identify source locations and importance but should not reproduce long passages.

private_recipe_excerpt_allowed:
  Exact recipes may be manually entered by Tim for private household use. Research agents classify the recipe’s ritual role and safety context, but should not reproduce full recipes.

brief_quote_allowed:
  Short quotes are allowed for internal review, source commentary, or phrase anchoring. Keep them brief, attributed, and non-substitutive for the source.

close_paraphrase_allowed:
  Agents may closely summarize the ritual architecture, sequence, materials, purpose, tone, and magical function while avoiding line-by-line synonym replacement of distinctive source expression.

paraphrase_required:
  Use for agent-generated summaries, source interpretation, and Moon & Table-authored replacement text.

mechanics_only:
  Use for sequence, materials, timing, carriers, purposes, preparation, close, and adaptation guidance.

do_not_use:
  Use for coercive, unsafe, medicalized, culturally inappropriate, out-of-scope, or guaranteed-effect material.
```

## What “close to the source” means

For extraction, “close to the source” means close to:

- ritual architecture;
- sequence;
- materials;
- timing;
- carrier;
- purpose;
- spiritual/magical function;
- tone of practice;
- action logic;
- closing/completion logic.

It does not mean a line-by-line rewrite that merely swaps synonyms.

## Private exact-text support field

Future extraction records should support this optional field:

```ts
sourceTextUse?: {
  exactPhraseAnchors?: string[];
  exactQuestions?: string[];
  exactSpokenCues?: string[];
  privateExcerptRecommended: boolean;
  excerptType?:
    | "blessing"
    | "prayer"
    | "invocation"
    | "prompt"
    | "meditation"
    | "recipe"
    | "spell"
    | "charm"
    | "spoken_formula"
    | "ritual_sequence"
    | "other";
  sourceLocation: string;
  whyExactTextMatters?: string;
  agentUseLimit:
    | "short_phrases_only"
    | "close_paraphrase_allowed"
    | "mechanics_only"
    | "do_not_use";
  storagePolicy: [
    "private_app_only",
    "cited",
    "not_public_repo",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
}
```

## Private source excerpt storage policy

Exact source wording manually selected by Tim may be stored only under these constraints:

- private app only;
- cited with source ID;
- cited with title and author;
- cited with page or section;
- marked as source excerpt, not generated Moon & Table text;
- unavailable by default;
- not public repo content;
- not public runtime content;
- not recommendation eligible until human review.

Recommended source-gate policy block:

```ts
sourceTextPolicy: {
  exactTextUse: "private_excerpt_allowed";
  assistantMayReproduce: "brief_quote_only";
  timManualEntry: "allowed_for_private_app";
  storageLimits: [
    "private_app_only",
    "not_public_repo",
    "not_public_runtime_content",
    "cite_source_id",
    "cite_title_author",
    "cite_page_or_section",
    "unavailable_by_default",
    "not_recommendation_eligible_until_human_review"
  ];
  notes: "Tim may manually enter exact source wording from his copy for private household use. Research agents should identify important exact wording and source location but should not reproduce long copyrighted passages."
}
```

## Anti-sanitizing rule

Do not over-sanitize the source.

Moon & Table is not trying to turn witchcraft, hearthcraft, candle magic, kitchen magic, prayer, blessing, invocation, recipe, spoken ritual, or spellcraft into generic wellness mechanics.

Preserve the ritual force of the source. Use words like blessing, prayer, spell, invocation, charm, consecration, purification, protection, hearth, spirit, ancestor, sacred, and offering when the source uses those concepts and when they fit the approved product scope.

The task is to classify and adapt responsibly, not to flatten magical practice into secular self-care.

## Recipe rule

Recipes may be Rituals or central Ritual components.

Do not reject recipe material just because it is a recipe.

Classify recipes as:

- `mechanics_only` when extracting preparation, timing, sequence, serving, offering, blessing, or table structure;
- `private_recipe_excerpt_allowed` when the exact recipe may be valuable for Tim’s private app;
- `paraphrase_required` when creating Moon & Table-authored recipe-adjacent ritual copy;
- `do_not_use` only for unsafe, medicalized, culturally inappropriate, or out-of-scope material.

Flag food safety, allergies, dietary restrictions, pet/pregnancy concerns, and medical/nutrition claims only where relevant.

## Prompt language to use going forward

Use this in future source-gate and extraction prompts:

```text
Words, prayers, blessings, invocations, prompts, meditations, spells, charms, and recipes are valid Ritual mechanics and may be central to a Ritual.

For modern copyrighted sources, distinguish between:

1. mechanics extraction;
2. assistant-generated paraphrase/original Moon & Table wording;
3. private exact-text excerpts manually selected by Tim from his source copy.

Research agents should not reproduce long copyrighted passages in generated packets. However, agents must not erase or downgrade verbal, recipe, prayer, blessing, invocation, spell, prompt, or meditation material. Instead, classify it.

Agents may extract exact short phrases, questions, rite titles, spoken cues, blessing names, invocation cues, and wording anchors when they are ritually important.

Agents may closely summarize or rewrite the ritual while preserving the source’s structure, materials, sequence, carrier, purpose, and magical force.

When exact wording is important, mark it as `privateExcerptRecommended` and give the source page/section so Tim can manually review and enter the exact wording into the private Moon & Table app if desired.
```

## Coordinator instruction

Research agents should stop treating exact wording as a contamination risk.

The correct handling is:

- preserve words as valid Ritual mechanics;
- preserve recipes as valid Ritual mechanics;
- extract short exact wording anchors where ritually useful;
- closely summarize the ritual structure and magical function;
- identify exact-wording locations when exact phrasing matters;
- allow Tim to manually excerpt exact wording into the private app;
- avoid agent-generated long reproduction of copyrighted text;
- keep exact excerpts private, cited, unavailable by default, and human-reviewed before any direct-use/recommendation path.
