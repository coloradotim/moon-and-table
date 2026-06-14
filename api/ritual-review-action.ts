import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";

import {
  createAdminFirestoreRitualReviewActionStore,
  type AdminFirestoreReviewActionDb,
} from "../src/data/rituals/db-review-action-boundary";
import {
  handleRitualReviewActionApi,
  type RitualReviewActionApiRequest,
  type RitualReviewActionApiResponse,
} from "../src/server/ritual-review-action-api";

type VercelRequest = RitualReviewActionApiRequest;
type VercelResponse = RitualReviewActionApiResponse;

function getServiceAccount(): object | undefined {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (json) {
    return JSON.parse(json) as object;
  }

  if (base64) {
    return JSON.parse(Buffer.from(base64, "base64").toString("utf8")) as object;
  }

  if (path) {
    return JSON.parse(readFileSync(path, "utf8")) as object;
  }

  return undefined;
}

function initializeFirebaseAdmin(): void {
  if (getApps().length > 0) {
    return;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ??
    process.env.GCLOUD_PROJECT ??
    process.env.VITE_FIREBASE_PROJECT_ID;
  const serviceAccount = getServiceAccount();

  initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : applicationDefault(),
    projectId,
  });
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  initializeFirebaseAdmin();

  await handleRitualReviewActionApi(request, response, {
    verifyIdToken: async (idToken) => {
      const decoded = await getAuth().verifyIdToken(idToken);

      return {
        uid: decoded.uid,
        email: typeof decoded.email === "string" ? decoded.email : undefined,
      };
    },
    store: createAdminFirestoreRitualReviewActionStore(
      getFirestore() as unknown as AdminFirestoreReviewActionDb,
    ),
    authorize: () => true,
  });
}
