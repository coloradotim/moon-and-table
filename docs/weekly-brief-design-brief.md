# Weekly Brief Design Brief

This is the controlling design reference for the signed-in Moon & Table weekly brief screen. It is a design target, not an implementation log.

Moon & Table should open to one small meaningful thing for the week: a quiet weekly ritual card on a soft tabletop. The screen should feel warm, private, calm, domestic, lightly magical without cliche, composed, readable in thirty seconds, and useful without asking for extra effort.

The screen should not feel like a horoscope app, dashboard, task manager, spell database, settings form, generated report, developer demo, or generic SaaS app.

## Core Principles

### 1. The theme and practice are the card

The theme and practice carry the visual weight. Everything else is context or control.

### 2. Default view is completable in one read

The user should get the recommendation without opening any disclosure.

Default-visible content is:

- theme / invitation
- practice
- labeled intention
- labeled best window
- optional add-on, only when present
- why this fits
- question to carry

### 3. Go-deeper content is available but not dominant

Reflection and reasoning are valuable, but they serve different moments than receiving the brief. The reasoning should be visible as trust-building product copy. The reflection question should be available without looking like the most important thing on the card.

### 4. Controls do not compete with the ritual

Try-again, feedback, capacity, and menu controls must be visible or reachable without taking over the card.

### 5. The app name is a nameplate after sign-in

The signed-in `Moon & Table` masthead is compact. The weekly theme is the hero.

## Final Content Architecture

### Zone A — The Brief, Always Visible

Render in this order:

1. `brief.theme`
2. `brief.recommendedRitual`
3. `brief.intention`, labeled `Intention`
4. `brief.bestWindow`, labeled `Best window`
5. `brief.optionalAddOn`, only if there is a real optional add-on

### Zone B — Reflection And Reasoning

Use two visible sections:

1. `Why this fits`
   - content: `brief.whyThis`
   - visible by default
   - headline, not a disclosure
   - calm and trust-building
2. `Question to carry`
   - content: `brief.reflectionPrompt`
   - visible by default
   - softer than the reasoning section
   - not a highlighted card

Keep the label exactly:

```text
Why this fits
```

Do not use:

```text
Why this, this week
```

### Zone C — Actions, Visually Secondary

Actions:

- `Capacity: [current capacity]`
- `Try something else`
- `Give feedback`

These controls should read as one quiet secondary control group and wrap cleanly on mobile. `Try something else` is an action, not feedback. `Give feedback` opens feedback options. Feedback chips are hidden by default.

## Current Capacity Control

Capacity is a visible control in the lower action group, near try-again and feedback. It describes the user's available life energy, not suggestion size and not a judgment.

Visible line:

```text
Capacity: Bare minimum
```

Picker title:

```text
How much do you have this week?
```

Picker options:

```text
Surviving — nothing required
Bare minimum — five minutes or less
Steady — about twenty minutes
Energized — about half an hour
```

Picker helper text:

```text
This only changes the current view.
```

Internal mapping:

```text
Surviving -> pause
Bare minimum -> low
Steady -> steady
Energized -> high
```

Behavior:

- selecting an option applies immediately
- no Apply button
- picker closes after selection
- brief regenerates immediately
- selection is session/current-view only
- do not persist this override to Firestore
- profile default capacity remains editable in profile settings

## Masthead And Moon Glyph

- Signed-in `Moon & Table` is a compact nameplate, not the hero.
- The weekly theme is the hero.
- A meaningful moon phase glyph appears to the left of `Moon & Table`.
- The glyph is decorative and `aria-hidden="true"`.
- The glyph uses the current computed moon phase.
- The glyph should be meaningful and visually connected to the current phase.
- It does not need to be pixel-perfect astronomy.
- A reliable 8-phase or 16-phase renderer is acceptable if continuous SVG math is risky.
- No animation.
- No extra dependency.

## Menu

- Top-right menu uses a real hamburger icon with three stacked horizontal lines.
- No visible `Menu` text.
- No ellipsis.
- No bordered square default button style.
- Transparent background by default.
- Subtle hover/focus only.
- Accessible label: `Open menu`.
- Open menu is a quiet popover, not a form.
- Menu contains exactly:
  - `This week`
  - `Profile settings`
  - `Sign out`

Menu interaction rules:

- click hamburger opens menu
- click hamburger again closes menu
- click outside closes menu
- Escape closes menu
- clicking any menu item closes menu
- focus is not trapped

## Card And Page Visual Direction

- Page background should feel warmer than neutral web-app gray.
- Card should feel like paper on a surface.
- Card background may be warm off-white.
- Card border should be soft.
- Shadow should be subtle.
- Use whitespace instead of many horizontal dividers.
- Use no more than two internal zone separators in the card.
- Practice text should have comfortable line-height and readable text measure.
- Lower controls should be visibly secondary.
- If the theme is two short sentences, render them as two visual lines. Single-sentence themes render normally.

## Typography

- Signed-in wordmark is smaller than the brief theme.
- Signed-in wordmark is a nameplate.
- Theme is the dominant type on the screen.
- Practice paragraph is readable and calm.
- Intention is labeled, visually distinct, softer, and ritual-like.
- Best window is labeled and compact so timing does not feel mushed into the prose.
- `Why this fits` is an always-visible section headline.
- `Question to carry` is a soft reflective prompt.
- Supporting text is smaller and muted.

## Anti-Patterns

- Do not render every brief field as a labeled section.
- Do not make the screen feel like a form or worksheet.
- Do not show feedback chips by default.
- Do not show raw trace/debug/source ids by default.
- Do not show date range in the default brief.
- Do not show household settings status.
- Do not make the app wordmark dominate the brief.
- Do not use `low-capacity` as user-facing copy.
- Do not label the visible control as suggestion size.
- Do not persist current-view capacity override to Firestore.
- Do not introduce a full design system or new navigation architecture.

## Relationship To Implementation Issues

This design brief guides the follow-on implementation work for:

- three-zone weekly brief redesign
- current-capacity control
- moon phase glyph
- later #49 signal, reasoning, and source transparency work
