import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import {
  createAdminFirestoreRitualReviewActionStore,
  type AdminFirestoreReviewActionDb,
  type RitualReviewActionAuthorizer,
} from "../src/data/rituals/db-review-action-boundary";
import {
  handleRitualReviewActionApi,
  type RitualReviewActionApiRequest,
  type RitualReviewActionApiResponse,
} from "../src/server/ritual-review-action-api";

type VercelRequest = RitualReviewActionApiRequest;
type VercelResponse = RitualReviewActionApiResponse;

function splitEnvList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function getServiceAccount(): object | undefined {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (json) {
    return JSON.parse(json) as object;
  }

  if (base64) {
    return JSON.parse(Buffer.from(base64, "base64").toString("utf8")) as object;
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

const authorizeReviewAction: RitualReviewActionAuthorizer = (caller) => {
  const allowedUids = splitEnvList(process.env.MOON_TABLE_RITUAL_REVIEW_ADMIN_UIDS);
  const allowedEmails = splitEnvList(
    process.env.MOON_TABLE_RITUAL_REVIEW_ADMIN_EMAILS,
  ).map((email) => email.toLowerCase());

  return Boolean(
    (caller.uid && allowedUids.includes(caller.uid)) ||
      (caller.email && allowedEmails.includes(caller.email.toLowerCase())),
  );
};

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
    authorize: authorizeReviewAction,
  });
}
