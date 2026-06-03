import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  type Auth,
  type AuthProvider,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

export type FirebaseEnv = {
  VITE_FIREBASE_API_KEY?: string;
  VITE_FIREBASE_AUTH_DOMAIN?: string;
  VITE_FIREBASE_PROJECT_ID?: string;
  VITE_FIREBASE_STORAGE_BUCKET?: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  VITE_FIREBASE_APP_ID?: string;
};

export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  googleProvider: AuthProvider;
};

const PLACEHOLDER_PATTERN = /placeholder|000000000000/;

function isUsableEnvValue(value: string | undefined): value is string {
  return Boolean(value && !PLACEHOLDER_PATTERN.test(value));
}

export function buildFirebaseConfig(
  env: FirebaseEnv,
): FirebaseWebConfig | null {
  const config = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };

  if (
    !isUsableEnvValue(config.apiKey) ||
    !isUsableEnvValue(config.authDomain) ||
    !isUsableEnvValue(config.projectId) ||
    !isUsableEnvValue(config.storageBucket) ||
    !isUsableEnvValue(config.messagingSenderId) ||
    !isUsableEnvValue(config.appId)
  ) {
    return null;
  }

  return config as FirebaseWebConfig;
}

export function createFirebaseServices(
  env: FirebaseEnv = import.meta.env,
): FirebaseServices | null {
  const config = buildFirebaseConfig(env);

  if (!config) {
    return null;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(config);

  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    googleProvider: new GoogleAuthProvider(),
  };
}

export function getFirebaseServices(): FirebaseServices | null {
  return createFirebaseServices();
}
