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
  email: string | null;
  displayName: string | null;
};

export type AppAuthState =
  | { status: "loading" }
  | { status: "signed_out"; configReady: boolean }
  | { status: "unauthorized"; configReady: boolean }
  | { status: "signed_in"; user: AuthenticatedUser };

export function parseAllowedEmails(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(
  email: string | null | undefined,
  allowedEmails: string[],
): boolean {
  if (allowedEmails.length === 0) {
    return true;
  }

  return Boolean(email && allowedEmails.includes(email.toLowerCase()));
}

export function toAuthenticatedUser(user: User): AuthenticatedUser {
  return { uid: user.uid, email: user.email, displayName: user.displayName };
}

export function subscribeToAuthState(
  services: FirebaseServices | null,
  onChange: (state: AppAuthState) => void,
  allowedEmails: string[] = parseAllowedEmails(import.meta.env.VITE_AUTH_ALLOWED_EMAILS),
): Unsubscribe {
  if (!services) {
    onChange({ status: "signed_out", configReady: false });
    return () => undefined;
  }

  return onAuthStateChanged(services.auth, (user) => {
    if (user && !isEmailAllowed(user.email, allowedEmails)) {
      onChange({ status: "unauthorized", configReady: true });
      void signOut(services.auth);
      return;
    }

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
