# Manage Rituals Workflow And Data Lifecycle

Status: Current Manage Rituals product/workflow reference.

Scope: Product/workflow reference. Manage Rituals now covers inspection,
DB-backed availability actions, draft editing, draft validation, and publishing
drafts into the live household library.

## 1. Product Verdict

Manage Rituals should exist, but it should not be another user-facing way to choose a practice.

Product terms:

**Ritual**: a live app ritual record using the canonical Ritual data model.
Normal Manage language should describe whether it is in the library, allowed in
Choose with me, archived, or needs attention. Raw fields such as `findable`,
`directUseEligible`, `recommendationEligible`, `recommendable`,
`missingReadiness`, and `lifecycle.state` remain internal diagnostics.

**Draft**: a mutable editor workspace for a new household Ritual, an edit to an
existing Ritual, or a future source/import candidate. A draft is not live until
it is added to the library or applied as a new immutable version.

**Ritual candidate**: a source-backed or household-authored candidate still living in an extraction/review packet. It is not yet an app Ritual.

**Held candidate**: a Ritual candidate intentionally excluded from import pending product, source, safety, adaptation, or completeness review.

Moon & Table needs two different surfaces:

**Search Rituals** helps a person find and use a Ritual directly.

**Manage Rituals** helps a logged-in user inspect imported app Ritual records and understand their readiness state.

Manage Rituals first shipped as an imported-Ritual inspection table. It now also
allows DB-backed availability actions and editor drafts. It still does not do
source import or selector-scoring redesign.

Manage Rituals should feel like a clear inspection workbench, not a public library browser, productivity dashboard, spell database, or CMS for generating rituals from metadata.

## 2. Relationship Between Search Rituals And Manage Rituals

Search Rituals is part of the user’s ritual-finding path. It should stay warm, direct, and practice-facing:

* search by material, mood, purpose, place, or phrase;
* see Rituals that are in the library;
* select one Ritual and read the user-facing ritual card;
* keep readiness/source details secondary.

Manage Rituals is part of the content inspection path. It should answer different questions:

* Which Rituals exist?
* Which Rituals are drafts, in the library, allowed in Choose with me, archived,
  or needing attention?
* Which Rituals are usable directly but not ready for guided recommendation?
* Which records have validation findings, review flags, timing repair needs, or
  source review needs?
* Which source and origin labels are attached to imported records?
* What does the complete underlying Ritual object look like?

Search Rituals should never become a management table. Manage Rituals should never become the default way a household chooses a ritual.

## 3. Navigation And Access Model

Recommended placement:

* Search Rituals belongs in the main app menu and may also be reached from the “I have something in mind” entry path.
* Manage Rituals V1 should be visible to any logged-in user from the hamburger menu.
* Manage Rituals should not appear on the first check-in screen.

The first screen should keep the ritual choice simple:

* Choose with me
* Search rituals, when the user already has something in mind

Suggested hamburger menu order:

1. Current ritual
2. Search rituals
3. Manage rituals
4. Profile settings
5. How it works
6. Sign out

## 4. Intended Users

Manage Rituals currently has no role model beyond being available to logged-in
users in this private app.

It is a logged-in inspection and lifecycle-review surface for imported Ritual
records.

The intended users are household maintainers who need to inspect and maintain
what the app currently knows about its Ritual records:

* someone checking whether a Ritual is in the library;
* someone checking whether Choose with me is allowed to offer it;
* someone checking why a Ritual needs attention;
* someone checking source/origin labels and review flags;
* someone checking the full Ritual object without opening code.

Later versions may add reviewer, editor, or maintainer roles if broader editing
and promotion tools require them.

## 5. Current Data Model Summary

The current Ritual type is the canonical imported app record model.

Some Ritual records are usable library Rituals before they are allowed in Choose
with me. Recommendation availability is an extra gate, not the price of
admission for the library.

Important fields:

* `id`
* `status`: `pilot`, `draft`, `reviewed`, or `recommendable`
* `origin`: source or household
* `presentation`: headline, practice, intention, bestWindow, questionToCarry,
  and legacy/read-only whyThisFits compatibility data when present
* `recommendationMetadata`: purpose, carrier, capacity, audience, timing, and eligibility
* `searchMetadata`: tags, keywords, materials, places, and labels
* `availability`: internal `findable`, `directUseEligible`, and
  `recommendationEligible` fields
* `ritualWords`
* `reviewFlags`
* `adaptationPolicy`

Current pilot data contains three source-origin pilot Rituals:

* `ritual.wet_the_seed_and_wait`
* `ritual.set_grain_at_the_table`
* `ritual.kindle_the_first_household_light`

They are in the library, but not allowed in Choose with me.

## 6. User-Facing Manage Model

Manage should use these product-facing states:

**Draft**: editable, not live yet. A draft may be incomplete and still saved.

**In library**: visible in Search, usable directly, and available through “I
have something in mind.” Internally this maps to `findable=true` and
`directUseEligible=true`.

**Allowed in Choose with me**: eligible for guided recommendation. Internally
this maps to `recommendationEligible=true` and `recommendable=true`.

**Archived**: hidden from normal Search/direct use and not offered by Choose
with me, but preserved for history and audit.

**Needs attention**: a derived cross-cutting state, not a lifecycle state. It
includes validation findings, source review needs, timing repair needs,
recommendation setup needs, and mismatched internal availability fields.

If internal `findable` and `directUseEligible` disagree, Manage should show a
`Library state mismatch` attention condition instead of asking the user to
manage those fields separately.

Choose with me states should be displayed as:

* `Allowed`
* `Held by choice`
* `Needs setup`
* `Not available`

`Held by choice` requires an explicit hold signal such as a recommendation hold
reason or review decision. Do not infer it merely because a Ritual is not
recommendable.

## 7. Search, Filters, Readiness, And Validation

The current `validateRituals(...)` function should remain the core validation source.

Manage Rituals should consume validation results rather than inventing a second validation system.

Manage search should be broad and forgiving. It should match headline, Ritual
IDs or short version fragments, source/origin labels, tags, keywords, materials,
places, purpose, carrier, hold reasons, review flags, validation finding text,
active draft headline, and derived Choose with me states.

Manage should avoid overlapping top-level dropdowns for every internal state.
Use:

* a search box;
* view chips: `Drafts`, `In library`, `Allowed in Choose with me`,
  `Needs attention`, `Archived`; when no view chip is selected, show all rows;
* stable facets: `Origin`, `Source`, `Purpose`, `Carrier`;
* attention chips: `Validation issues`, `Timing needs repair`, `Needs source
  review`, `Needs recommendation setup`, `Held from Choose with me`, `State
  mismatch`;
* derived table states: `Library`, `Choose with me`, `Attention`, `Draft`.

Do not expose `Findable`, `Direct use`, `Recommendation eligible`,
`Recommendation ready`, `Missing readiness`, `Review flags`, or `Findings` as
separate normal top-level filter concepts. They may remain visible in advanced
details or debug output.

A Ritual may be in the library while still carrying visible review warnings.
Choose with me remains a separate stricter gate.

Draft rows can be searched and filtered by draft state, attention labels,
source, purpose, carrier, and preview metadata, but they are not live `In
library` or `Allowed in Choose with me` rows until `Add to library` or `Apply
changes` succeeds. A draft may preview that it would be library-ready or needs
Choose with me setup, but live availability filters should only count published
Ritual rows.

`recommendation_review` means Choose with me setup or review is still needed.
It is not an intentional hold. `Held from Choose with me` requires an explicit
manual hold signal such as `recommendation_hold`.

## 8. Manage Rituals Current Surface

Manage Rituals shows imported app Ritual records in an inspection table and
allows DB-backed lifecycle review actions for records that have Firestore review
documents in the active payload.

Purpose:

* make the Ritual library inspectable before it grows;
* show validation and readiness state clearly;
* make blocked records visible without command-line work;
* keep Search Rituals free from management detail.

Current capabilities:

* list all imported Ritual records;
* filter by status, origin type, availability, readiness item, and validation state;
* show compact counts above the table;
* show a compact table;
* expand a row to show source, version, validation, readiness, and review
  workflow details;
* record lifecycle review actions through the server/admin boundary.

Recommended compact counts:

* total Rituals;
* count by status;
* count by origin type;
* findable count;
* direct-use eligible count;
* recommendation eligible count;
* recommendation-ready count;
* count with validation findings;
* count with missing readiness items.

Recommended V1 table fields:

* headline;
* id;
* status;
* origin;
* findable;
* directUseEligible;
* recommendationEligible;
* recommendable;
* primary purpose;
* primary carrier;
* audience;
* capacity;
* review flags;
* validation findings;
* missing readiness;
* source label / origin label.

Validation findings and missing readiness should be separate columns if space allows. They represent different concerns: validation is data/model correctness; missing readiness is product/review state.

Recommended row expansion:

* formatted presentation fields;
* recommendation metadata;
* search metadata;
* origin/source grounding summary;
* ritualWords metadata;
* reviewFlags;
* adaptationPolicy;
* validation findings;
* missing readiness;
* raw full object.

The raw object can appear below the formatted sections. It is useful for debugging and keeps V1 from needing a custom UI for every field.

Search preview link:

* show a Search Rituals preview link only for direct-use eligible Rituals;
* do not imply a Ritual is usable if direct-use eligibility is false.

V1 should not include:

* roles;
* editing;
* promotion buttons;
* source packet import;
* Ritual candidates;
* held candidates;
* generated copy repair;
* runtime eligibility changes;
* Firestore writes;
* record creation.

Later, Manage Rituals may add a Ritual Candidates or Pipeline section that surfaces approved, held, later, rejected, or needs-correction packet candidates. That is not part of V1.

A future Ritual Candidates / Pipeline section must remain visually and structurally separate from the imported Ritual table.

## 9. Manage Rituals V2: QA Preview Modes

V2 should help reviewers see how a Ritual behaves in product contexts without changing the data.

Recommended preview modes:

* direct-use preview, matching Search Rituals;
* capacity preview for supported capacity modes;
* audience preview for supported audience modes;
* timing preview for allowed timing shaping;
* recommendation-card preview once Ritual recommendations exist.

QA preview should flag when a requested mode is not supported rather than inventing an adaptation.

Examples:

* If a Ritual supports “me” only, a “both of us” preview should say it is not authored for both people.
* If capacity adaptation is `allowed_if_authored`, the preview should only show authored capacity variants.
* If timing adaptation may shape only the best window, timing should not rewrite the practice.

## 10. Deferred Future Capabilities

Manage Rituals should grow beyond lifecycle review into a full editor, but those
capabilities remain separate design/implementation work.

Deferred capabilities include:

* QA preview modes;
* draft editing;
* versioning and history;
* Ritual Candidates / Pipeline section.

### Controlled editing / authoring

A future editor may allow changes to draft-only fields such as:

* presentation fields;
* search tags and keywords;
* materials and places;
* review notes;
* missing readiness items;
* household context;
* adaptation notes.

Protected fields should include:

* source grounding;
* citation labels;
* source locations;
* ritual words that use source text;
* recommendation eligibility;
* promotion status;
* stable Ritual IDs;
* version history.

The editor must preserve the Ritual-first doctrine:

* do not assemble rituals from metadata;
* do not use metadata to rewrite purpose;
* do not invent adaptations;
* do not change purpose through edits;
* keep completion and ritual words inside practice.

### Review and promotion workflow

A future promotion workflow may add explicit review actions.

Possible gates:

* validation clean;
* source review complete for source-origin records;
* household approval complete for household-origin records;
* source text risk reviewed;
* product boundary review complete when flagged;
* material safety review complete when flagged;
* adaptation policy complete;
* QA preview accepted;
* recommendation eligibility explicitly approved.

Promotion should be a deliberate action, not a side effect of editing a field.

Possible review actions:

* mark source review complete;
* mark household review complete;
* request changes;
* record reviewer note;
* mark QA preview accepted;
* promote to reviewed;
* promote to recommendable;
* retire or archive.

### Versioning and history

Future versioning rules may include:

* every promoted Ritual version gets a stable version identifier;
* presentation changes create a new version;
* source-grounding changes create a new version;
* recommendation-relevant metadata changes create a new version;
* old versions can be retired but should remain readable for history.

Future RitualInstance or history records should store the exact version and user-facing text that was shown at the time. Later edits should not rewrite past household history.

### Ritual Candidates / Pipeline

A future Ritual Candidates / Pipeline section may inspect packet candidates, including:

* approved;
* held;
* later;
* rejected;
* needs correction.

This must remain visually and structurally separate from the V1 imported-Ritual table.

## 11. Source-Backed Ritual Workflow

Source-backed Rituals should begin as Ritual candidates in reviewed packets, not casual browsing.

Primary import source:

* content packets and product docs marked ready or approved for implementation.

V1 does not import packet candidates. It only shows records that have already been imported as Rituals.

Source-backed workflow:

1. source packet or approved source note identifies the candidate;
2. candidate is approved for import or held for later review;
3. approved candidate is imported as an app Ritual;
4. Manage Rituals V1 shows the imported Ritual and its readiness state;
5. later workflow slices may add QA preview, review actions, and promotion.

Held candidates stay in packets until a later Ritual Candidates or Pipeline section exists.

## 12. Household-Origin Ritual Workflow

Household-origin Rituals are allowed, but they enter Manage Rituals V1 only after they have been imported as Ritual records.

They may come from:

* repeated household practice;
* shared ritual language;
* direct household preference;
* a practice that does not need public source grounding.

They should not require source grounding, but imported household-origin Rituals should still show:

* household context;
* product boundary review;
* adaptation policy;
* review flags;
* missing readiness items.

Household-origin candidates that are not imported yet belong in packets or a future pipeline surface, not in V1.

## 13. Tag / Search Metadata Management

Search metadata helps humans find rituals. It must not become ritual identity.

Manage Rituals should support careful metadata review:

* tags;
* keywords;
* materials;
* places;
* source label;
* origin label;
* primary purpose;
* primary carrier;
* secondary purpose and carrier values.

Metadata rules:

* do not add tags that imply unsupported ritual function;
* do not use search metadata to broaden recommendation eligibility;
* do not make tags replace authored purpose;
* avoid duplicate near-synonyms unless they improve search;
* prefer source-backed or practice-visible materials;
* keep internal IDs out of user-facing Search Ritual cards.

The “I have something in mind” path can use metadata for search and filtering. The recommendation engine should use explicitly reviewed recommendation metadata and eligibility, not loose search tags.

## 14. Text Editing And Ritual Prose Rules

Ritual prose is authored text, not generated glue.

Text editing must preserve:

* one ritual body;
* one clear material/place/action path;
* activation, action, and closure;
* intrinsic purpose;
* audience structure when both-of-us is supported;
* capacity depth when deeper capacity is claimed;
* source boundaries;
* house voice.

Text editing must avoid:

* therapy/productivity/wellness framing;
* safety/compliance-forward normal copy;
* protection, healing, prosperity, or guaranteed-effect claims unless a future approved source and product decision explicitly allow a bounded form;
* copied long source wording;
* generic spell-database voice;
* metadata recaps standing in for ritual meaning.

Manage Rituals should show canonical body fields in the same structure the app
uses:

* headline;
* practice;
* intention;
* best window;
* question to carry.

`why this fits` is generated after a Choose with me path. It can appear in
recommendation preview/history surfaces, but it is not an editable Ritual body
field in Manage Rituals. Existing `presentation.whyThisFits` data should be
treated as legacy/read-only fallback until a later migration removes or renames
it.

## 15. Data Persistence Options

Recommended staged persistence:

### Current state: source-controlled typed data

Reviewed and pilot records live in TypeScript.

Changes happen by PR.

Validation runs in tests and reports.

### Implemented inspection manager

Reads imported Ritual data, validation findings, DB lifecycle pointers when
available, and readiness state.

The current implementation can write lifecycle review decisions through the
server-side Manage Rituals review-action boundary. It does not write Ritual
body/content edits.

### Future draft handling

Future draft records may live in app storage or source-controlled data, depending on the editing workflow chosen later.

Source-backed draft imports still require packet/source review.

### Promotion and export

Lifecycle promotion happens in Firestore through review decisions. Static
TypeScript export remains available as a PR-reviewable recovery/export path.

Not every lifecycle decision needs an immediate repo diff. Any export back to
TypeScript should still generate a reviewable diff.

### Versioned app history

Future history/favorites/feedback can reference Ritual IDs and versions.

Past RitualInstances preserve exact text shown.

Do not remove the static fallback/export path until a later migration issue
explicitly approves that decision and preservation audits remain green.

## 16. Access And Data Boundaries

Manage Rituals is visible to logged-in users.

The current surface shows imported app Ritual records only.

The current surface does not show:

* packet candidates;
* held candidates;
* source packet workspaces;
* feedback history;
* profile data;
* full Ritual body/metadata editing controls.

Because this is a private app and review actions are server-mediated, the
current slice does not need a separate role model. A broader editor may revisit
that decision.

## 17. Non-Goals And Deferrals

Do not add to the current Manage Rituals surface without a separate issue:

* editing;
* adding Rituals;
* deleting Rituals;
* full Ritual body editing;
* source/import persistence;
* source packet import;
* packet candidate display;
* held candidate display;
* recommendation integration;
* favorites;
* history;
* feedback management;
* public sharing;
* AI rewriting;
* broad CMS features;
* migration of legacy RitualPatterns into Rituals.

Do not let Manage Rituals become a way to bypass source review, household approval, or Ritual-first authoring rules.

## 18. Recommended Implementation Slices

### Landed slices

- visible to logged-in users from the hamburger menu;
- consumes imported Ritual data, DB lifecycle pointers, validation findings,
  and readiness state;
- shows compact counts above the table;
- shows a table of imported Ritual records;
- separates validation findings from missing readiness when space allows;
- expands rows to show formatted fields and lifecycle review workflow;
- records review actions through a server/admin boundary;
- keeps full Ritual body/content editing out of this slice.

### Later slices

QA preview modes:

* direct-use preview;
* capacity/audience/timing preview;
* unsupported-mode warnings.

Full versioned Ritual editor:

- design is tracked in `docs/product/manage-ritual-editor-design.md` and issue
  #480;
- edits must create draft/superseding immutable versions rather than mutating
  published versions in place;
- review actions remain the publish/recommendation gate.

Review actions:

* source review complete;
* household approval complete;
* QA accepted;
* request changes.

Promotion workflow:

* generate a reviewable PR/diff for source-controlled records;
* promote reviewed records to recommendable only after gates pass.

Versioning and history:

* stable versions;
* retired records;
* RitualInstance references.

Ritual Candidates / Pipeline:

* show approved, held, later, rejected, or needs-correction packet candidates;
* keep separate from the V1 imported-Ritual table.

## 19. Open Product Questions

* Should V1 include counts plus table from the start, or should counts wait until a follow-up?
* Should the row expansion show formatted sections, raw object, or both?
* Should validation findings and missing readiness appear in separate columns by default?
* Should V1 include links back to Search Rituals only for direct-use eligible records?
* Should Search Rituals show pilot records long-term, or only reviewed direct-use records once the library grows?
* What counts as enough QA preview for both-of-us support?
* Should readiness labels be strict blockers, or can some records be findable while still carrying visible review warnings?
* What is the smallest useful first Manage Rituals screen: counts and table only, or counts plus inline read-only presentation preview?
* When should a separate Ritual Candidates / Pipeline section appear?
* Which packet candidate states matter first in a future pipeline: approved, held, later, rejected, or needs-correction?
