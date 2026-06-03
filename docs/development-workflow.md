# Development Workflow

Moon & Table uses small automated checks so future PRs can stay privacy-safe, typed, and ready for review.

## Local Commands

Install dependencies:

```bash
npm install
```

Run all available checks:

```bash
npm run check
```

Run individual checks:

```bash
npm run dev
npm run server:start
npm run server:stop
npm run server:restart
npm run server:status
npm run seed:private
npm run build
npm run typecheck
npm run test
npm run test:e2e
```

`npm run dev` starts the local app shell in the foreground. Use the `server:*` commands to manage the Vite dev server in the background. `npm run test:e2e` starts the app through Playwright and verifies the initial `Moon & Table` brief page.

For manual Google Auth and Firestore testing, add real Firebase web app config values and `VITE_AUTH_ALLOWED_EMAILS` to `.env.local`, enable Google Auth in Firebase, seed private Firestore data locally if desired, then run `npm run server:restart` and open `http://localhost:5173`. The signed-out page should show `Sign in with Google`; after signing in with an allowed account, the app loads UID-linked or pending email-linked Firestore documents and renders the protected weekly brief.

Missing Firestore documents are safe. With no `profiles/{uid}`, `capacitySettings/{uid}`, or `scheduleConstraints/{uid}` documents, the brief should render with `Using starter settings until your private settings are ready.`

Optional private-data verification uses the local seed script:

1. Sign in locally with an allowed Google account.
2. Copy `docs/examples/household.seed.example.json` to `private/household.seed.local.json`.
3. Edit the local seed file with real private values. Do not commit it.
4. Authenticate the seed script with `GOOGLE_APPLICATION_CREDENTIALS` or `FIREBASE_SERVICE_ACCOUNT_PATH` pointing to a gitignored local service account file.
5. Run `npm run seed:private`.
6. Refresh the app.
7. Confirm the brief shows `Using your household settings.` and that capacity, profile theme, or schedule changes affect the brief.

The seed script does not require every household member to have logged in already. If an account does not exist yet in Firebase Auth, the seed writes pending documents by email; when that person later signs in with the same Google Auth email, the app can read the seeded profile through the email link.

After seeded private data loads, the signed-in app shows the weekly brief by default. Use `Menu` > `Profile settings` to open one tuning card per seeded household profile and edit that profile's existing Firestore profile, capacity, and schedule documents. It is not an import flow, setup wizard, account manager, or seed editor.

For hosted deployment setup, see `docs/deployment.md`.

Keep optional Firestore test values generic. Do not use real names, birth data, natal placements, relationship details, private source text, or schedules tied to a real person in source-controlled examples, tests, or screenshots.

Manual Firebase console inspection is fine for debugging, but normal setup should not require manual Firestore document creation.

There is no lint command yet because the repo does not have an app framework or linter configuration. Add linting when the app scaffold makes the project conventions clear.

## CI

GitHub Actions runs on pull requests and pushes to `main`.

The CI workflow runs:

- dependency installation with `npm ci`
- TypeScript typecheck
- Vite build
- Vitest unit tests
- Playwright Chromium browser installation
- Playwright tests

Unit tests cover the privacy-safe seed symbolic cards and the deterministic mock weekly brief generator.

## Auto-Merge Readiness

Use GitHub auto-merge only after CI is green and the PR has been reviewed as appropriate.

This repo should use auto-merge as a readiness signal, not as a substitute for review. If repository settings do not allow auto-merge, merge manually only after CI passes. Do not force repo settings from code changes.

## Privacy-Safe Testing

Tests, fixtures, screenshots, and examples must use generic placeholders only.

Do not include:

- real names
- birth data
- natal placements tied to a real person
- relationship details
- schedules tied to a real person
- private source text
- real Firebase secrets or private profile data
