# Manage Rituals Workflow And Data Lifecycle

Status: Design proposal for issue #266.

Scope: Documentation only. This document does not implement UI, runtime behavior, recommendation selection, source content, Ritual records, imports, editing, promotion, or persistence.

## 1. Product Verdict

Manage Rituals should exist, but it should not be another user-facing way to choose a practice.

Product terms:

**Ritual**: an imported app ritual record using the canonical Ritual data model. A Ritual may be `pilot`, `draft`, `reviewed`, or `recommendable`. It may or may not be findable, direct-use eligible, recommendation eligible, or recommendation-ready.

**Ritual candidate**: a source-backed or household-authored candidate still living in an extraction/review packet. It is not yet an app Ritual.

**Held candidate**: a Ritual candidate intentionally excluded from import pending product, source, safety, adaptation, or completeness review.

Moon & Table needs two different surfaces:

**Search Rituals** helps a person find and use a Ritual directly.

**Manage Rituals** helps a logged-in user inspect imported app Ritual records and understand their readiness state.

Manage Rituals V1 shows imported app Ritual records in a read-only inspection table. It does not include Ritual candidates or held candidates from packets. Editing, authoring, promotion, candidate pipeline views, version history, and persistence should come later in staged slices.

Manage Rituals should feel like a clear inspection workbench, not a public library browser, productivity dashboard, spell database, or CMS for generating rituals from metadata.

## 2. Relationship Between Search Rituals And Manage Rituals

Search Rituals is part of the user’s ritual-finding path. It should stay warm, direct, and practice-facing:

* search by material, mood, purpose, place, or phrase;
* see findable and direct-use-eligible Rituals;
* select one Ritual and read the user-facing ritual card;
* keep readiness/source details secondary.

Manage Rituals is part of the content inspection path. It should answer different questions:

* Which Rituals exist?
* What status are they in?
* Which are findable, direct-use eligible, recommendation eligible, or recommendation-ready?
* Which records are blocked from recommendation?
* Which records have validation findings?
* Which imported records have review flags or missing readiness items?
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

Manage Rituals V1 has no role model.

It is a logged-in, read-only inspection surface for imported Ritual records.

The intended V1 users are people who need to inspect what the app currently knows about its Ritual records:

* someone checking whether a Ritual is findable or recommendation eligible;
* someone checking why a Ritual is still blocked;
* someone checking source/origin labels and review flags;
* someone checking the full Ritual object without opening code.

Later versions may add reviewer, editor, or maintainer roles if editing and promotion tools are introduced. V1 does not need roles.

## 5. Current Data Model Summary

The current Ritual type is the canonical imported app record model.

Some Ritual records are inert because they are not recommendation eligible yet, but they are still app Rituals once imported into typed data.

Important fields:

* `id`
* `status`: `pilot`, `draft`, `reviewed`, or `recommendable`
* `origin`: source or household
* `presentation`: headline, practice, intention, bestWindow, whyThisFits, and questionToCarry
* `recommendationMetadata`: purpose, carrier, capacity, audience, timing, and eligibility
* `searchMetadata`: tags, keywords, materials, places, and labels
* `availability`: findable, directUseEligible, and recommendationEligible
* `ritualWords`
* `reviewFlags`
* `adaptationPolicy`

Current pilot data contains three source-origin pilot Rituals:

* `ritual.wet_the_seed_and_wait`
* `ritual.set_grain_at_the_table`
* `ritual.kindle_the_first_household_light`

They are findable and direct-use eligible, but not recommendation eligible.

## 6. Ritual Lifecycle Model

The existing statuses are useful but should be interpreted carefully.

### `pilot`

Imported app Ritual record still under pilot review.

A pilot Ritual:

* may be findable;
* may be direct-use eligible;
* must not be recommendation eligible;
* should usually carry missing readiness items such as `pilot_review`.

### `draft`

Actively authored or revised app Ritual record.

A draft Ritual:

* may exist in typed data;
* should not be recommendation eligible;
* should be inspectable in Manage Rituals.

### `reviewed`

A Ritual that has passed source or household review.

A reviewed Ritual:

* has coherent presentation fields and metadata;
* may still not be recommendation eligible;
* may still carry review flags or missing readiness items.

### `recommendable`

A Ritual that is reviewed, QA accepted, validation clean, and explicitly eligible for recommendations.

Recommended lifecycle capabilities should be tracked separately from status:

* findable;
* direct-use eligible;
* recommendation eligible;
* source complete;
* household approved;
* validation clean;
* QA preview accepted;
* authoring complete;
* retired or archived.

Do not overload status to answer every readiness question.

Ritual candidates and held candidates have their own earlier lifecycle in packets. They are not part of the V1 Manage Rituals table until imported as Ritual records.

## 7. Readiness And Validation Model

The current `validateRituals(...)` function should remain the core validation source.

Manage Rituals should consume validation results rather than inventing a second validation system.

Readiness should combine:

* status;
* availability;
* recommendation eligibility;
* validation findings;
* missing readiness items;
* review flags;
* source grounding completeness;
* household context completeness;
* adaptation policy completeness;
* QA preview results.

The existing `npm run rituals:readiness` report is the command-line foundation. Manage Rituals V1 can be a visual counterpart to that report.

Recommended readiness labels:

* Ready for search
* Ready for direct use
* Needs review
* Needs source verification
* Needs household approval
* Needs QA preview
* Blocked from recommendation
* Recommendation ready

These labels should be derived from data and validation findings. They should not be manually decorative badges.

A Ritual may be findable while still carrying visible review warnings. Findable, direct-use eligible, recommendation eligible, and recommendation-ready are separate states.

## 8. Manage Rituals V1: Read-Only Audit View

Manage Rituals V1 shows imported app Ritual records in a read-only inspection table.

Purpose:

* make the Ritual library inspectable before it grows;
* show validation and readiness state clearly;
* make blocked records visible without command-line work;
* keep Search Rituals free from management detail.

Recommended V1 capabilities:

* list all imported Ritual records;
* filter by status, origin type, availability, readiness item, and validation state;
* show compact counts above the table;
* show a read-only table;
* expand a row to show the full Ritual object / all fields.

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

Manage Rituals may later grow beyond read-only inspection, but these are not part of V1.

Deferred capabilities include:

* QA preview modes;
* draft editing;
* review actions;
* promotion workflow;
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

Manage Rituals should show prose fields in the same structure the app uses:

* headline;
* practice;
* intention;
* best window;
* why this fits;
* question to carry.

## 15. Data Persistence Options

Recommended staged persistence:

### Current state: source-controlled typed data

Reviewed and pilot records live in TypeScript.

Changes happen by PR.

Validation runs in tests and reports.

### V1 read-only manager

Reads the same typed data and readiness report.

Writes nothing.

### Future draft handling

Future draft records may live in app storage or source-controlled data, depending on the editing workflow chosen later.

Source-backed draft imports still require packet/source review.

### Promotion export

Promoted records become source-controlled typed data through a PR.

Promotion should generate a reviewable diff.

### Versioned app history

Future history/favorites/feedback can reference Ritual IDs and versions.

Past RitualInstances preserve exact text shown.

Avoid making Firestore the only canonical source for reviewed Ritual records at the beginning. Source-controlled records give better review, history, and CI validation while the model is still settling.

## 16. Access And Data Boundaries

Manage Rituals V1 is visible to logged-in users and read-only.

V1 shows imported app Ritual records only.

V1 does not show:

* packet candidates;
* held candidates;
* source packet workspaces;
* feedback history;
* profile data;
* editing controls.

Because V1 writes nothing and imports nothing, it does not need a separate role model.

## 17. Non-Goals And Deferrals

Do not include in the first implementation:

* editing;
* adding Rituals;
* deleting Rituals;
* promoting Rituals;
* Firestore persistence;
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

### First slice: Read-only Manage Rituals audit view

* visible to logged-in users from the hamburger menu;
* consumes imported Ritual data, `validateRituals(...)`, and readiness-report data;
* shows compact counts above the table;
* shows a read-only table of imported Ritual records;
* separates validation findings from missing readiness when space allows;
* expands rows to show formatted fields plus the full raw Ritual object;
* links to Search preview only for direct-use eligible Rituals;
* writes nothing.

### Later slices

QA preview modes:

* direct-use preview;
* capacity/audience/timing preview;
* unsupported-mode warnings.

Draft editor:

* edits draft-only presentation/search fields;
* no promotion or runtime eligibility changes.

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
