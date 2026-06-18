# Manage Ritual Editor Design

Status: Product design for issue #480, with early implementation slices in
Manage Rituals.

Scope: Product design. Early slices now implement read-only inspection,
`ritualEditDrafts` draft persistence, and editable canonical body fields. This document
does not itself implement publish/review promotion, source import, selector
changes, or full metadata editing.

## 1. Product Goal

The Manage Rituals surface should grow from an inspection and review console into a calm curation workbench where Tim and Jessica can maintain complete Ritual records outside the repo.

The editor should let household maintainers:

- inspect the current published Ritual version;
- create and save an editable draft;
- create a new household-origin Ritual from scratch;
- validate draft content and metadata;
- preview how a draft would appear in Search / direct selection;
- later preview whether and how a draft could be recommended by Choose with me;
- submit a draft into the existing review / publish path;
- understand prior versions and rollback context without using raw JSON as the main interface.

The editor must not become a generic CMS, a source-ingestion UI, or a raw JSON admin panel.

## 2. Controlling Decisions

### 2.1 Ritual-first doctrine

A Ritual is a whole authored practice with intrinsic purpose. Metadata supports review, Search, direct selection, and Choose with me. Metadata does not assemble Rituals out of parts.

### 2.2 Immutable versions

Published `ritualVersions/{ritualId_versionId}` documents are immutable content snapshots. Editing must never mutate the published version in place.

### 2.3 Editable draft buffer

In-progress edits live in a mutable edit-draft buffer, recommended as:

```text
ritualEditDrafts/{draftId}
```

A draft is a workspace. It may autosave. It may be discarded. It may be validated. It does not become an immutable Ritual version until explicitly submitted / sealed for review.

Do not use mutable `ritualVersions` as the draft workspace. That would weaken the meaning of immutable version history.

### 2.4 Review remains the promotion gate

Save draft, autosave, validate draft, and submit draft are not publish or promotion actions.

Review decisions remain the gate for:

```text
publish / direct-use approval
recommendation approval
hold / release
archive
rollback
```

Those actions must continue to write review decision and audit records through the review-decision transaction path.

### 2.5 Both household maintainers can edit

The editor should support both Tim and Jessica as household maintainers.

Persistent editor/version/audit records should use repository-safe actor IDs such as:

```text
person_a
person_b
household
owner
automation
codex
```

Friendly names can be rendered from private household context in the client, but real names should not be written into repo-safe/editor-safe version, review, or audit fields.

### 2.6 Source/provenance is read-only at first

The editor should display source and provenance fields safely, but source/provenance editing is not needed in the near term.

Issue #467 remains the source-pipeline path for importing approved packet candidates into DB draft Rituals. This editor is not source ingestion.

### 2.7 Generated recommendation explanation is not canonical Ritual prose

`why this fits` and `how this was chosen` are generated per Choose with me recommendation run from the combination of:

```text
Ritual metadata
check-in inputs
timing context
selector score/breakdown
household memory, later
```

The editor should not make Tim manually maintain `whyThisFits` as canonical Ritual prose.

Current legacy/static records may still carry `presentation.whyThisFits` as
fallback or migration data, but the editor should treat it as read-only/legacy
compatibility data.

Canonical editable Ritual body fields for the editor are:

```text
headline
practice
intention
bestWindow
questionToCarry
```

### 2.8 Household Rituals can become recommendation eligible

A household-origin Ritual created from scratch should be able to move through the same review ladder as source-backed Rituals:

```text
draft
→ reviewed / direct-use eligible
→ recommendable
```

Household Rituals do not require source grounding. They do require household context/review, complete metadata, validation, and explicit promotion before they are findable, direct-use eligible, or recommendation eligible.

Do not treat household-origin Rituals as less legitimate than source-backed Rituals. If Tim and Jessica approve one as a real Ritual and its metadata is good, it can be recommendation eligible.

### 2.9 New Ritual creation starts from scratch

The first household Ritual creation flow should be a blank structured draft. Do not add template pickers in the first implementation. Templates can come later if needed, but the first editor should reinforce authored Ritual identity, not generic ritual assembly.

### 2.10 Explicit save first

Because this is a private app on a constrained Firestore plan, the first
editable implementation should avoid chatty writes. The editor marks local
draft changes immediately and writes to Firestore only when a maintainer clicks
`Save`.

Save rules:

```text
Save updates only ritualEditDrafts.
Save never creates an immutable ritualVersion.
Save never publishes.
Save never promotes direct-use or recommendation eligibility.
Save never changes the published pointer.
```

The UI should show:

```text
Saving…
Saved
Unsaved changes
Could not save
```

Autosave may be reconsidered later if quota, batching, and diagnostics are in
place.

## 3. Editor Screen Structure

### 3.1 Entry point

The Manage Rituals table remains the triage surface. A row action opens the full editor.

Recommended entry labels:

```text
Open editor
Edit draft
View draft
Create Ritual
```

### 3.2 Desktop layout

Use a workbench layout:

```text
Top status bar
Left section navigation
Center structured editor
Right preview / validation / version rail
```

#### Top status bar

Always visible.

Show:

```text
headline
ritualId
origin: source / household
current lifecycle state
publishedVersionId
draftId, if open
validation summary
findable / direct-use / recommendation status
save state
```

Primary actions:

```text
Save
Validate draft
Submit draft for review
Discard draft
Return to table
```

Do not place direct-use/recommendation promotion actions here in early editor slices. Those remain in the review action console until review/publish integration is intentionally added.

#### Left section navigation

Sections:

```text
Status
Ritual body
Recommendation fit
Search and library
Source and provenance
Review and validation
Versions and audit
Debug
```

Each section should show small state indicators:

```text
changed
clean
warning
blocking error
read-only
```

#### Center editor

Structured controls grouped by section. Raw JSON must not be the primary interface.

#### Right rail

Tabs:

```text
Search preview
Choose with me preview
Validation
Version context
```

On smaller screens, this becomes accordion sections or tabs below the main editor.

## 4. Field Groupings

### 4.1 Status

Read-only summary in early slices:

```text
ritualId
origin type
currentVersionId
publishedVersionId
current lifecycle state
findable
directUseEligible
recommendationEligible
recommendable
missing readiness
hold reasons
latestValidationSnapshotId
latestReviewDecisionId
```

These lifecycle and availability fields are not normal form fields. They change through review actions.

### 4.2 Ritual body

Editable first:

```text
headline
practice
intention
bestWindow
questionToCarry
```

Controls:

```text
headline: single-line text
practice: large multiline editor
intention: short multiline
bestWindow: short multiline
questionToCarry: short text
```

Do not edit `whyThisFits` as canonical Ritual prose.

Practice editor guidance:

- Keep the Ritual self-contained.
- Include a beginning/container, a middle/core action, and a closing.
- Put spoken/written words users should say or write inline in `practice`.
- Do not paste private source text.

### 4.3 Words and spoken/written language

This can be part of Ritual body or a subpanel.

Show:

```text
inline spoken/written words in practice
ritualWords provenance metadata
source_exact_short metadata, if present
adapted_source_words metadata, if present
wording review warnings
```

In early slices, ritual words/provenance metadata is read-only unless a later issue explicitly edits it.

### 4.4 Recommendation fit

Selection metadata. This gets its own explicit implementation issue.

Editable later:

```text
primary purpose
secondary purposes
primary carrier
secondary carriers
capacity
audience
timing relationship
timing contexts
recommendation metadata completeness fields
```

Controls:

```text
single-select for primary purpose
multi-select chips for secondary purposes
single-select for primary carrier
multi-select chips for secondary carriers
capacity selector
audience selector
timing relationship selector: none / helpful / preferred / required
timing context chips
```

Changing these fields changes Search/Choose behavior and may change Ritual identity. The UI must warn clearly:

```text
Changing primary purpose may change Ritual identity.
Changing primary carrier changes selection behavior.
Changing capacity, audience, or timing changes Choose with me eligibility.
Validation and review are required before publishing.
```

Editing these fields must save only to the draft. It must not promote recommendation eligibility.

### 4.5 Search and library

Editable earlier than selection metadata:

```text
tags
keywords
materials
places
```

Read-only / derived:

```text
search tokens
sort headline key
source label, unless separate source-safe correction is allowed later
findable / direct-use state
```

Search/direct selection remains separate from recommendation eligibility.

### 4.6 Source and provenance

Read-only in the near term.

Show safe provenance:

```text
origin.type
sourceIds
sourceRunId
importBatchId
packetCandidateId
packetPath
sourceLocationLabels
source grounding summaries
Moon & Table adaptation notes
review flags related to source/provenance
```

Do not display or edit unsafe source/private fields:

```text
private source text
OCR text
page images
copied passages
raw extraction transcripts
private profile details
real names
birth data
relationship details
emails
schedules
```

### 4.7 Review and validation

Show:

```text
latest validation status
validation findings
missing readiness
review flags
hold reasons
latest review decision
review notes
available review actions, later
```

In early slices, provide:

```text
Validate draft
Show field-level findings
Show section-level findings
```

Promotion/hold/release actions should remain in the review action panel until the editor is intentionally integrated with review-decision transactions.

### 4.8 Versions and audit

Compact timeline by default.

Show:

```text
current published version
current draft, if any
previous published version
last validation snapshot
last review decision
```

Collapsed actions later:

```text
View all versions
Compare draft to published
Preview previous version
Request rollback
View audit log
```

Version rows should show:

```text
versionId
createdAt
createdBy
status at creation
contentHash short form
supersedesVersionId
published / draft / superseded / archived badge
```

### 4.9 Debug

Read-only and collapsed by default.

Show only for inspection/troubleshooting:

```text
Ritual JSON
RitualDocument pointer JSON
RitualVersionDocument JSON
validation snapshot JSON
review/audit IDs
contentHash
```

Raw JSON is an escape hatch, not the editor.

## 5. First Slice vs Later

### First editable implementation slice

Build:

```text
ritualEditDrafts model + autosave
open editor from Manage Rituals
create draft from existing Ritual/version
create blank household-origin draft
edit Ritual body fields
validate draft
show field-level findings
show Search/direct-use preview
```

Editable first:

```text
headline
practice
intention
bestWindow
questionToCarry
```

Explicitly not editable first:

```text
whyThisFits
status
availability
recommendable
source grounding
publishedVersionId
currentVersionId
contentHash
primary purpose
primary carrier
capacity
audience
timing relationship
timing contexts
```

### Later slices

Add in order:

1. simple Search/library metadata editor;
2. explicit selection metadata editor;
3. Choose with me preview;
4. source/provenance read-only refinements;
5. submit/seal immutable version flow;
6. version compare and rollback context;
7. review/publish integration.

## 6. Preview Behavior

### 6.1 Search preview

Search preview is the first preview to build.

Show draft as it would appear in:

```text
I have something in mind
Search result card
Ritual detail/open view
```

Preview modes:

```text
Published
Draft
Diff highlight, later
```

Show:

```text
headline
intention
bestWindow
questionToCarry
primary purpose
primary carrier
materials
places
tags
source label / household origin label
findable/direct-use status
```

Do not require recommendation eligibility for Search preview.

### 6.2 Choose with me preview

Add later after selection metadata editing.

Purpose:

```text
Show whether and why the draft could be selected by Choose with me.
```

Controls:

```text
capacity sample: only a little / enough / deeper
audience sample: me / both of us
purpose sample
carrier sample
timing sample: current timing / no timing / custom fixture
```

Output:

```text
eligible / not eligible
blocking gates
sample generated why this fits
sample generated how this was chosen
timing impact
capacity/audience fit
```

Do not expose raw selector/debug keys in normal preview. Put raw detail in Debug.

## 7. Validation UX

Validation appears in three levels.

### Top summary

```text
Validation clean
2 blocking issues
4 warnings
Direct-use ready
Recommendation not ready
```

### Section nav

```text
Ritual body — 1 blocker
Recommendation fit — 2 warnings
Source and provenance — clean
```

### Inline field messages

Examples:

```text
Practice needs a closing action.
Primary carrier is required before recommendation review.
Required timing context is unsupported by the current selector.
Source-backed Ritual needs source grounding.
This field appears to contain disallowed private/source text.
```

For findings that do not map to a visible field, show an `Other validation findings` block with an optional debug path.

## 8. Versioning Flow

### 8.1 Edit existing Ritual

```text
Open existing Ritual
→ Start edit
→ create ritualEditDrafts/{draftId} from publishedVersionId/currentVersionId
→ autosave draft changes
→ validate draft
→ submit draft for review
→ seal immutable ritualVersion candidate
→ review decision publishes/holds/promotes
```

Published version remains untouched until review action changes the pointer.

### 8.2 Create household Ritual

```text
Create Ritual
→ blank household-origin ritualEditDrafts/{draftId}
→ autosave draft
→ validate draft
→ submit for review
→ seal immutable household-origin ritualVersion
→ review action may make findable/direct-use/recommendation eligible
```

No source grounding required. Household review/context required.

### 8.3 Submit / seal draft

Submitting a draft should create or prepare:

```text
immutable ritualVersion candidate
contentHash
validation snapshot
audit event
supersedesVersionId, when editing existing Ritual
```

Submit does not equal publish.

### 8.4 Publish / promote

Publishing or promotion happens through review-decision transaction tooling.

It may update:

```text
rituals/{ritualId}.currentVersionId
rituals/{ritualId}.publishedVersionId
rituals/{ritualId}.lifecycle
latestReviewDecisionId
latestValidationSnapshotId
```

It must not mutate old `ritualVersions`.

## 9. Previous Versions and Rollback Context

Default should be minimal.

Show:

```text
Published now: v004
Draft based on: v004
Previous: v003
Last rollback: none
```

Timeline row examples:

```text
v004 — published — recommendation-ready — Jun 14
v003 — superseded — direct-use only — Jun 10
v002 — archived — source correction — Jun 8
v001 — original import — Jun 5
```

Actions later:

```text
Preview version
Compare to current draft
Copy field from this version
Request rollback
```

Rollback should require a review action, reason, validation context, and audit event. No casual one-click rollback.

## 10. Mobile Layout

Use a full-screen editor route or modal-style page.

Mobile order:

```text
Status and save state
Ritual body
Search preview
Validation
Recommendation fit
Search/library metadata
Source/provenance
Versions/audit
Debug
```

Use accordions and a sticky bottom bar:

```text
Save
Validate
More
```

Save state should be visible near the header and bottom action bar.

The `practice` field should offer comfortable multiline editing and may later get a focus mode.

## 11. Implementation Issues

Recommended implementation order:

1. Clarify generated recommendation explanation fields.
2. Add Ritual edit draft model with draft persistence.
3. Add read-only editor shell.
4. Add editable Ritual body fields.
5. Add draft validation UX.
6. Add Search/direct-use preview.
7. Add simple Search/library metadata editor.
8. Add selection metadata editor.
9. Add Choose with me preview.
10. Add source/provenance read-only panel.
11. Add draft submit / seal immutable version flow.
12. Add create household Ritual flow.
13. Add version compare and rollback context.
14. Add mobile editor polish.

Each issue should be implementation-scoped and should not require Codex to make new product decisions.

## 12. Open Product Questions

Resolved for now:

- Drafts use mutable `ritualEditDrafts`, not mutable `ritualVersions`.
- Both household maintainers can edit.
- Source/provenance is read-only for now.
- Selection metadata editing gets a dedicated issue.
- `whyThisFits` / `howThisWasChosen` are generated per recommendation run.
- Existing `presentation.whyThisFits` is legacy/fallback compatibility data, not
  an editable Ritual body field.
- Household-origin Rituals can become recommendation eligible.
- New Rituals start from a blank draft, not templates.
- Explicit Save is part of the first editable implementation; autosave is deferred
  until quota-safe behavior is designed.

Still worth revisiting later:

- Whether templates are helpful after blank household Ritual creation exists.
- Whether source/provenance safe-summary editing is worth adding.
- Whether full prose diff is needed beyond section-level diff.
- When a later migration should remove or rename legacy `presentation.whyThisFits`.
