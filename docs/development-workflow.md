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
npm run build
npm run typecheck
npm run test
npm run test:e2e
```

`npm run dev` starts the local app shell in the foreground. Use the `server:*` commands to manage the Vite dev server in the background. `npm run test:e2e` starts the app through Playwright and verifies the initial `Moon & Table` brief page.

For manual Google Auth testing, add real Firebase web app config values and `VITE_AUTH_ALLOWED_EMAILS` to `.env.local`, enable Google Auth in Firebase, then run `npm run server:restart` and open `http://localhost:5173`. The signed-out page should show `Sign in with Google`; after signing in with an allowed account, the protected weekly brief should render. Firestore profile loading is not implemented yet.

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
