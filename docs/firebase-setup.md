# Firebase Setup

This guide sets up Moon & Table's first hosted path for private authentication and private storage. Do not add real config values, secrets, or private profile data to the repository.

## Privacy Boundary

Keep source-controlled examples generic and placeholder-only.

Do not commit:

- real Firebase secrets or real Firebase config values
- real names
- birth data
- natal placements tied to a real person
- relationship details
- schedules tied to a real person
- private source documents or private source text
- personal profile notes

Real private data belongs in Firebase behind authentication, private runtime storage, or local gitignored files. Generic symbolic cards remain source-controlled for now because they are reviewed, privacy-safe product knowledge rather than private household data.

## Create the Firebase Project

1. Open the Firebase console.
2. Create a new project with a generic project name.
3. Use the Spark/free plan for early development.
4. Skip optional product setup that is not needed yet, such as analytics or storage, unless a later issue asks for it.

Use one Firebase project for early development. Add separate staging or production projects later if deployment needs become clearer.

## Enable Google Auth

1. In the Firebase console, open Authentication.
2. Click **Get started** if Authentication has not been enabled yet.
3. Open **Sign-in method**.
4. Enable **Google**.
5. In **Settings** > **Authorized domains**, make sure `localhost` is allowed for local development.
6. Leave other providers disabled until a later issue asks for them.

Do not create or document real user accounts in source control.

Email/password can be enabled later if the product needs it, but the current first provider path is Google auth.

## Create Firestore

1. In the Firebase console, open Firestore Database.
2. Create a database.
3. Choose a region appropriate for the hosted app.
4. Start with locked-down rules for private data.

Firestore is the planned hosted storage layer for private profile data, schedule constraints, capacity settings, generated briefs, feedback, and ritual notes. The starting rules live in `firestore.rules` and restrict private collections to authenticated user-scoped documents or household members.

## Configure Local Environment Values

Copy the placeholder example file:

```bash
cp .env.example .env.local
```

Then replace the placeholder values in `.env.local` with the Firebase web app config values from the Firebase console.

Example placeholder names:

```bash
VITE_FIREBASE_API_KEY=placeholder-api-key
VITE_FIREBASE_AUTH_DOMAIN=placeholder-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=placeholder-project-id
VITE_FIREBASE_STORAGE_BUCKET=placeholder-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:placeholderappid
```

`.env.local` is gitignored and is where real local config values belong. `.env.example` stays source-controlled and must contain placeholders only.

Firebase web app config is not the same as a server admin secret, but Moon & Table should still avoid committing real project values while the private-data shape is being established.

Do not add real allowed-user emails to `VITE_` env vars. Vite bundles `VITE_` values into browser JavaScript. Moon & Table now uses readable seeded Firestore private documents as the authorization signal after Google Auth.

For Vercel, add the same Firebase web config variable names in the Vercel project environment settings, then redeploy. See `docs/deployment.md` for hosted setup, Firebase authorized domains, and verification steps.

## Test Google Auth Locally

After `.env.local` has real Firebase web app config values and Google auth is enabled:

```bash
npm run server:restart
```

Open `http://localhost:5173`.

Expected behavior:

1. Signed out: the page shows `Moon & Table`, private access copy, and `Sign in with Google`.
2. Click `Sign in with Google` and complete the Google popup.
3. Signed in: the app loads private settings from Firestore, then shows the weekly brief with a small `Menu` button.
4. Open `Menu` and click `Sign out`.
5. The page returns to the signed-out private access state.

If the signed-in Google account does not have readable seeded Firestore private documents by UID or pending email link, the app shows that the account is not invited yet.

The app does not require local seed files at runtime, but the account must have seeded Firestore private documents before it can use the hosted brief.

## Seed Private Firestore Data Locally

Normal setup uses a local gitignored seed file and a backend seed script. Do not manually enter household, profile, capacity, schedule, assumption, or astrology metadata in the Firebase console as the normal workflow.

Copy the source-safe example:

```bash
mkdir -p private
cp docs/examples/household.seed.example.json private/household.seed.local.json
```

Edit `private/household.seed.local.json` with real private household values on your machine only. The `private/` directory and `*.local.json` files are gitignored.

The seed file supports:

- `household.id`
- `household.memberEmails`
- `household.defaultCapacityMode`
- `household.maxRitualDurationMinutes`
- `household.preferredRitualStyles`
- `household.avoidedRitualStyles`
- `household.astrologyVisibility`
- `household.scheduleConstraints`
- `profiles[].personKey`
- `profiles[].displayLabel`
- `profiles[].email`
- `profiles[].profileThemeKeys`
- `profiles[].assumptions`
- `profiles[].astrologyProfile`

The script normalizes a few local-authoring conveniences:

- missing `household.scheduleConstraints` falls back to empty schedule lists
- missing `updatedAtIso` values are filled when seeding
- missing assumption `source` and `confidence` default to `starter_assumption` and `low`
- assumption `editability` is accepted as a synonym for `editable`
- `astrologyVisibility: "placeholder"` is normalized to `placeholder_keys_only`

The seed script tries to resolve `profiles[].email` through Firebase Auth. If an account already exists, the script writes UID-linked documents. If an account does not exist yet, the script writes stable pending profile documents and a `profileEmailLinks/{encodedEmail}` document. That pending profile can be read after the person signs in with the same Google Auth email.

In your local private seed, `household.memberEmails[]` and each `profiles[].email` must be full Firebase Auth account email addresses. Keep `personKey` generic if you want a stable local label, but do not use `person_a`, names, or nicknames in the local private seed email fields.

Authenticate the backend seed script with one of these local-only options:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/private/firebase-service-account.local.json"
```

or:

```bash
export FIREBASE_SERVICE_ACCOUNT_PATH="$PWD/private/firebase-service-account.local.json"
```

The seed script uses `FIREBASE_PROJECT_ID`, `GCLOUD_PROJECT`, or `VITE_FIREBASE_PROJECT_ID` from `.env.local` to pick the Firebase project.

Run the seed:

```bash
npm run seed:private
```

To seed from a different local file:

```bash
npm run seed:private -- private/another-household.seed.local.json
```

The seed script is idempotent. It uses stable document ids and Firestore merge writes, so rerunning updates existing documents rather than creating duplicates.

After seeding, sign into the app normally with Google Auth. The app reads existing Firestore documents and should show `Using your household settings.`

## Tune Seeded Private Settings

After the app loads seeded private Firestore data, use `Menu` > `Profile settings` to open the profile tuning section. It shows one tuning card per seeded household profile, using private display labels from Firestore when available. Each card edits that profile's existing profile, capacity, and schedule settings, such as:

- default capacity mode
- max ritual time
- preferred ritual styles
- avoided ritual styles
- astrology visibility
- editable boolean preference assumptions

This tuning section is for revising existing private data after backend/local seeding. It is not an initial import path, setup wizard, account manager, or seed JSON editor.

When an editable assumption is changed, the app stores it as user-confirmed with high confidence while preserving non-editable and non-boolean assumption metadata.

The profile cards use private display labels from Firestore. Source-controlled examples use placeholders such as `Person A`; real names belong only in the local seed file and Firestore.

## Starter Firestore Collections

Use these collection names as the first planning vocabulary:

- `households`
- `profiles`
- `scheduleConstraints`
- `capacitySettings`
- `briefs`
- `feedback`
- `ritualNotes`

Keep collection documents private and generic in documentation. Do not commit real household profiles, schedules, capacity notes, feedback, or ritual journal entries.

The matching TypeScript schema lives in `src/lib/private-data-schema.ts`.

The app currently reads these user-scoped documents after Google sign-in:

- `profiles/{uid}`
- `capacitySettings/{uid}`
- `scheduleConstraints/{uid}`

Missing documents are safe but are not treated as authorization for the hosted app. If no UID-linked or pending email-linked profile can be read, the app shows the not-invited screen.

The local seed script writes:

- `households/{householdId}`
- `profileEmailLinks/{encodedEmail}`
- `profiles/{uid}`
- `profiles/{householdId_personKey}` for pending members who have not signed in yet
- `capacitySettings/{uid}`
- `capacitySettings/{householdId_personKey}` for pending members who have not signed in yet
- `scheduleConstraints/{uid}`
- `scheduleConstraints/{householdId_personKey}` for pending members who have not signed in yet

Manual Firebase console inspection is fine for debugging. Manual console document creation is not the normal setup path.

The source-safe example seed lives at `docs/examples/household.seed.example.json`.

Example seeded `profiles/{uid}` shape:

```json
{
  "id": "placeholder-user-id",
  "householdId": "placeholder-household-id",
  "userId": "placeholder-user-id",
  "displayLabel": "Person A",
  "audienceLabels": {
    "person_a": "Person A",
    "person_b": "Person B",
    "together": "Together",
    "either": "Either"
  },
  "defaultAudience": "either",
  "profileThemeKeys": ["private_profile.practical_tending"],
  "preferredRitualStyles": ["tiny_home_ritual"],
  "avoidedRitualStyles": ["large_task_list"],
  "astrologyVisibility": "balanced",
  "assumptions": [
    {
      "key": "assumption.low_overwhelm",
      "label": "May prefer low-overwhelm suggestions",
      "value": true,
      "source": "starter_assumption",
      "confidence": "low",
      "editable": true,
      "updatedAtIso": "2026-01-01T00:00:00.000Z"
    }
  ],
  "astrologyProfile": {
    "source": "manual_entry",
    "confidence": "low",
    "placementKeys": ["placement.sun.placeholder"],
    "profileThemeKeys": ["private_profile.practical_tending"],
    "updatedAtIso": "2026-01-01T00:00:00.000Z"
  },
  "updatedAtIso": "2026-01-01T00:00:00.000Z"
}
```

`placementKeys` are abstract metadata keys. They can support saved profile themes, but they do not give the app enough information to compute private timing contacts.

For private timing contacts, the gitignored local seed may include `astrologyProfile.placements` records with `bodyOrPoint`, `sign`, optional `degree`, and optional generic `themeKeys`. Source-controlled examples use fake placeholder placement records only. Do not write real chart placements, birth data, names, private interpretations, relationship details, or private source text into the repository.

Example `capacitySettings/{uid}`:

```json
{
  "id": "placeholder-user-id",
  "householdId": "placeholder-household-id",
  "userId": "placeholder-user-id",
  "defaultCapacityMode": "low",
  "maxRitualDurationMinutes": 5,
  "updatedAtIso": "2026-01-01T00:00:00.000Z"
}
```

Example `scheduleConstraints/{uid}`:

```json
{
  "id": "placeholder-user-id",
  "householdId": "placeholder-household-id",
  "userId": "placeholder-user-id",
  "unavailableDaysOrNights": [],
  "preferredRitualWindows": [],
  "recurringHouseholdConstraintNotes": [],
  "workOrSchoolConstraintNotes": [],
  "maxRitualDurationMinutes": 5,
  "defaultCapacityMode": "low",
  "updatedAtIso": "2026-01-01T00:00:00.000Z"
}
```

The seed script uses the authenticated user's uid as the document id when that uid already exists. For household members who have not signed in yet, it uses a stable pending id based on `household.id` and `personKey`, then stores an email link so the app can find the profile after Google Auth. Use generic notes for source-controlled examples. Real schedule details belong only in private storage.

## Source-Controlled Data

Keep these in the repository:

- approved generic symbolic cards
- schemas and TypeScript types
- privacy-safe placeholder examples
- setup and development documentation

Keep these out of the repository:

- real Firebase config values
- service account keys
- private profile details
- real schedule constraints
- real capacity settings
- saved briefs, feedback, and ritual notes from actual use

## Current Non-Goals

This setup guide includes the first Google sign-in UI, a local backend seed script for private Firestore documents, app reads for existing user-scoped documents, and a small profile tuning surface for existing seeded settings. It does not implement import/setup UI or broad account management.

Do not add:

- seed import UI
- full profile or account management UI
- import or setup UI
- calendar integration
- Supabase
- real private data
