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
npm run typecheck
npm run test
npm run test:e2e
```

`npm run test:e2e` currently runs a Playwright scaffold test. The app-shell smoke test that verifies the page loads and shows `Moon & Table` is deferred until the app shell exists.

There is no lint command yet because the repo does not have an app framework or linter configuration. Add linting when the app scaffold makes the project conventions clear.

## CI

GitHub Actions runs on pull requests and pushes to `main`.

The CI workflow runs:

- dependency installation with `npm ci`
- TypeScript typecheck
- Vitest unit tests
- Playwright tests

Unit tests currently cover the privacy-safe seed symbolic cards. Generator-specific tests are deferred until the issue #3 generator is merged into `main`.

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
