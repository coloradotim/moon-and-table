# Firebase Setup

This guide sets up Moon & Table's first hosted path for private authentication and private storage. It is documentation only. Do not add Firebase app code, real config values, secrets, or private profile data to the repository for this step.

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

## Test Google Auth Locally

After `.env.local` has real Firebase web app config values and Google auth is enabled:

```bash
npm run server:restart
```

Open `http://localhost:5173`.

Expected behavior:

1. Signed out: the page shows `Moon & Table`, private access copy, and `Sign in with Google`.
2. Click `Sign in with Google` and complete the Google popup.
3. Signed in: the existing weekly brief appears, along with a small `Signed in` indicator and `Sign out`.
4. Click `Sign out`.
5. The page returns to the signed-out private access state.

This auth step does not read private profile data from Firestore yet. After sign-in, the brief still uses the current privacy-safe fallback/generated data.

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

You do not need to manually create empty collections for this foundation step. Firestore collections can be created by app writes when later issues add real reads and writes.

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

This setup guide includes the first Google sign-in UI. It does not implement Firestore reads and writes in the app.

Do not add:

- Firestore reads or writes
- calendar integration
- Supabase
- real private data
