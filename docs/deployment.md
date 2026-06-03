# Deployment

Moon & Table deploys as a Vite web app on Vercel. Firebase remains the auth and private data layer.

Do not upload private seed files, Firebase Admin service account files, real profile data, birth data, natal placements, relationship details, private schedules, or private source text to Vercel.

## Current Vercel Project

The Vercel project is named `moon-and-table` and is configured as a Vite project. Vercel should use:

- framework preset: `Vite`
- build command: `npm run build`
- output directory: `dist`
- install command: Vercel default, or `npm ci`

The production domain is:

```text
moon-and-table.vercel.app
```

Preview deployments may use generated Vercel URLs. They are useful for visual review, but Google Auth only works on preview domains that are also allowed in Firebase Auth.

## Vercel Environment Variables

Add these environment variables in the Vercel project settings for Production and any Preview environment where Google Auth should work:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_AUTH_ALLOWED_EMAILS
```

Use the Firebase web app config values from Firebase project settings. These are client web config values, not Firebase Admin credentials, but keep real values out of source control.

`VITE_AUTH_ALLOWED_EMAILS` is currently a client-visible allowlist used for a friendly not-invited screen. Because Vite bundles `VITE_` variables into the browser app, real emails in this value are visible to anyone who inspects the deployed JavaScript. Firestore rules remain the real access-control layer for private data. If the privacy tradeoff is not acceptable, leave this value empty and rely on Firestore rules until the allowlist is moved out of client-visible config. Follow-up issue #58 tracks moving this allowlist out of client-visible Vite env.

Do not add these to Vercel:

- `GOOGLE_APPLICATION_CREDENTIALS`
- `FIREBASE_SERVICE_ACCOUNT_PATH`
- Firebase Admin service account JSON
- `private/household.seed.local.json`
- any `*.local.json`
- real private profile or schedule files

## Manual Vercel Steps

1. Open the Vercel dashboard.
2. Open the `moon-and-table` project.
3. Go to **Settings** > **Environment Variables**.
4. Add the Firebase web config variables listed above.
5. Add `VITE_AUTH_ALLOWED_EMAILS` only if you accept the client-visible email tradeoff for now.
6. Apply the variables to Production and, if needed, Preview.
7. Redeploy the latest production deployment so the new Vite env values are baked into the static bundle.

Vite reads these values at build time. Changing Vercel env vars does not affect an already-built deployment until it is redeployed.

## Manual Firebase Steps

1. Open the Firebase console for the Firebase project.
2. Go to **Authentication** > **Settings** > **Authorized domains**.
3. Add:

```text
moon-and-table.vercel.app
```

4. If testing Vercel previews with Google Auth, also add the exact preview domain you plan to test. Preview domains can change, so production is the stable auth target.
5. Confirm Google is enabled under **Authentication** > **Sign-in method**.
6. Confirm Firestore exists and `firestore.rules` has been deployed through the Firebase CLI or console.

## Private Data Runtime Boundary

The deployed app does not read local private seed files. Private data must already exist in Firestore.

Normal private setup is:

1. Keep real private data in `private/household.seed.local.json` on a local machine.
2. Keep Firebase Admin credentials local and gitignored, or use Application Default Credentials.
3. Run `npm run seed:private` locally.
4. Deploy the web app to Vercel with only Firebase web config values.
5. Sign into the deployed app with Google Auth.
6. Let the app read existing Firestore household/profile/capacity/schedule documents.

Manual Firestore console inspection is fine for debugging. Manual Firestore document entry is not the normal setup workflow.

## Verification Checklist

After Vercel env vars and Firebase authorized domains are set:

1. Redeploy production in Vercel.
2. Open `https://moon-and-table.vercel.app`.
3. Confirm the page shows `Moon & Table` and the Google sign-in button.
4. Sign in with an allowed Google account.
5. Confirm the weekly brief loads.
6. Open `Menu` > `Profile settings`.
7. Confirm seeded private profile settings load.
8. Save a harmless settings edit and confirm it persists after refresh.
9. Sign out from the menu.
10. Sign in with an unauthorized Google account, if available.
11. Confirm the account cannot read private Firestore data and sees either the not-invited screen or a no-private-data starter state.
12. Confirm no private seed files or Firebase Admin credential files are present in Vercel project files or environment variables.

If Google sign-in fails with an unauthorized domain error, add the deployed domain to Firebase Auth authorized domains and redeploy or retry.

If the hosted app still shows Firebase as not configured, one or more `VITE_FIREBASE_*` env vars are missing from Vercel or the app was not redeployed after adding them.

If sign-in works but private settings do not load, verify Firestore has seeded documents for that user email or UID and that Firestore rules are deployed.
