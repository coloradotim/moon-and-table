# Architecture

Moon & Table is a private Vite/TypeScript app hosted on Vercel, with Firebase Auth and Firestore as the hosted private-data layer. The repository contains generic code, schemas, reviewed symbolic content, tests, and placeholder examples only.

## App Stack

| Layer | Current choice | Responsibility |
| --- | --- | --- |
| Frontend | Vite / TypeScript | Renders the private app shell, weekly brief, feedback controls, and profile tuning. |
| Auth | Firebase Auth with Google sign-in | Identifies the signed-in user. |
| Private data | Firestore | Stores household, profile, capacity, schedule, feedback, and future private notes. |
| Hosting | Vercel | Hosts the static web app. |
| Local private setup | `npm run seed:private` | Reads gitignored local private seed JSON and writes private Firestore documents. |
| Timing | Astronomy Engine via local deterministic helpers | Produces lunar, solar, planetary, seasonal, and numerology timing facts; interpretation stays in approved rules and symbolic content. |

## Runtime Flow

```text
User opens deployed app
-> Google Auth sign-in
-> app checks for readable UID-linked or pending email-linked Firestore private data
-> app loads household/profile/capacity/schedule data
-> generator creates a weekly brief from private data, timing facts, approved cards, and approved ritual patterns
-> UI renders the brief, try-again, feedback, profile settings, and human-readable explanations
```

Readable seeded Firestore private data is the authorization signal after Google Auth. The app no longer uses a client-visible email allowlist. Firestore rules remain the real access-control layer.

## Private Data Boundary

Private data must not enter source control.

Keep out of the repo:

- private seed JSON
- Firebase Admin service account JSON
- real names
- birth data
- natal placements tied to people
- relationship details
- private schedules
- private source documents or private source text
- real private profile notes

Where private data belongs:

| Data kind | Correct location |
| --- | --- |
| Real household/profile/capacity/schedule data | Firestore |
| Initial real private seed values | `private/household.seed.local.json`, gitignored |
| Firebase Admin credentials for seeding | local gitignored file or Application Default Credentials |
| Firebase web config | Vercel env vars and local `.env.local`; client config, not Admin credentials |
| Generic symbolic cards and ritual patterns | Repository |
| Placeholder examples | Repository |

Manual Firestore console inspection is fine for debugging. Manual Firestore document entry is not the normal setup workflow.

## Current Setup Path

```text
local private seed JSON
-> local seed script
-> Firestore private data
-> Google Auth sign-in
-> app loads Firestore data
-> generator renders a private weekly brief
```

The local seed script writes stable household/profile/capacity/schedule documents and pending email links for household members who have not signed in yet.

## Source And Content Flow

```text
SourceReview
-> SourceNote
-> SymbolicCard
-> RitualPattern
-> Safety guardrails
-> Timing facts
-> Brief generation
-> Feedback / try-again
```

`SourceReview` and `SourceNote` keep source use traceable and transformed. `SymbolicCard` stores approved symbolic meaning. `RitualPattern` stores approved low-overwhelm practices. `RitualSafetyFlags` can block or constrain recommendations even when symbolic fit is good.

Timing facts are deterministic facts, not interpretations. The broader timing fact API lives in `src/lib/timing-facts.ts`; the first interpretation rule layer lives in `src/lib/timing-interpretation-rules.ts`. The generator currently remains lunar-first while future signal selection can draw from the broader fact list. It combines timing facts, approved cards, approved patterns, private profile placeholders, capacity, schedule constraints, and feedback exclusions to produce one brief.

The generator also returns a structured recommendation decision record with evaluated candidate scores, rejection reasons, selected cards/patterns, and source references. See `docs/recommendation-decision-model.md`. The normal UI stays simple; the developer decision view appears only under `?debug=true`.

## Deployment Model

Vercel hosts the static web app. Firebase remains external for Auth and Firestore.

Vercel receives only Firebase web client config:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Do not put Firebase Admin credentials, seed JSON, private files, or real allowed-user email lists in Vercel env vars.

## Status

| Area | Status | Notes |
| --- | --- | --- |
| Vite app shell | Implemented | Private weekly brief is the default signed-in view. |
| Google Auth | Implemented | Google identifies the user; Firestore data controls authorization. |
| Firestore private data | Implemented | Household/profile/capacity/schedule reads, feedback writes, and profile tuning exist. |
| Local private seed script | Implemented | Normal setup path for initial private data. |
| Source registry / SourceNote | Implemented starter | Source reviews and transformed notes are typed and validated. |
| Symbolic cards | Implemented starter | Initial approved generic cards exist. |
| Ritual safety | Implemented starter | Hard exclusions and safety flags are enforced. |
| Ritual patterns | Implemented starter | Approved capacity-aware ritual patterns are eligible for briefs. |
| Timing facts | Implemented starter | Lunar timing feeds the current brief; broader lunar, solar, planetary, seasonal, and numerology facts are available for later signal selection. |
| Weekly brief generator | Implemented | Produces one approved recommendation, intention, explanation, trace, and feedback hooks. |
| Feedback / try-again | Implemented starter | Feedback stores trace references; try-again selects another approved pattern. |
| Ritual notebook/history | Planned | Private Firestore history is not built yet. |
| Curation workbench | Planned | Manual reviewed curation remains file-based for now. |
| Calendar integration | Planned | Not implemented. |
