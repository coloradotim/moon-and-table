import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type Unsubscribe,
  type User,
} from "firebase/auth";

import type { FirebaseServices } from "./firebase";

export type AuthenticatedUser = {
  uid: string;
};

export type AppAuthState =
  | { status: "loading" }
  | { status: "signed_out"; configReady: boolean }
  | { status: "signed_in"; user: AuthenticatedUser };

export function toAuthenticatedUser(user: User): AuthenticatedUser {
  return { uid: user.uid };
}

export function subscribeToAuthState(
  services: FirebaseServices | null,
  onChange: (state: AppAuthState) => void,
): Unsubscribe {
  if (!services) {
    onChange({ status: "signed_out", configReady: false });
    return () => undefined;
  }

  return onAuthStateChanged(services.auth, (user) => {
    onChange(
      user
        ? { status: "signed_in", user: toAuthenticatedUser(user) }
        : { status: "signed_out", configReady: true },
    );
  });
}

export async function signInWithGoogle(
  services: FirebaseServices | null,
): Promise<void> {
  if (!services) {
    throw new Error("Firebase is not configured.");
  }

  await signInWithPopup(services.auth, services.googleProvider);
}

export async function signOutOfFirebase(
  services: FirebaseServices | null,
): Promise<void> {
  if (!services) {
    return;
  }

  await signOut(services.auth);
}
