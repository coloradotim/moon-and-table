import { describe, expect, it } from "vitest";

import { buildFirebaseConfig } from "../../src/lib/firebase";

describe("Firebase config", () => {
  it("does not build config from placeholder values", () => {
    expect(
      buildFirebaseConfig({
        VITE_FIREBASE_API_KEY: "placeholder-api-key",
        VITE_FIREBASE_AUTH_DOMAIN: "placeholder-project-id.firebaseapp.com",
        VITE_FIREBASE_PROJECT_ID: "placeholder-project-id",
        VITE_FIREBASE_STORAGE_BUCKET:
          "placeholder-project-id.firebasestorage.app",
        VITE_FIREBASE_MESSAGING_SENDER_ID: "000000000000",
        VITE_FIREBASE_APP_ID: "1:000000000000:web:placeholderappid",
      }),
    ).toBeNull();
  });

  it("maps complete non-placeholder web config values", () => {
    expect(
      buildFirebaseConfig({
        VITE_FIREBASE_API_KEY: "test-api-key",
        VITE_FIREBASE_AUTH_DOMAIN: "test-project.firebaseapp.com",
        VITE_FIREBASE_PROJECT_ID: "test-project",
        VITE_FIREBASE_STORAGE_BUCKET: "test-project.firebasestorage.app",
        VITE_FIREBASE_MESSAGING_SENDER_ID: "123456789012",
        VITE_FIREBASE_APP_ID: "1:123456789012:web:testappid",
      }),
    ).toEqual({
      apiKey: "test-api-key",
      authDomain: "test-project.firebaseapp.com",
      projectId: "test-project",
      storageBucket: "test-project.firebasestorage.app",
      messagingSenderId: "123456789012",
      appId: "1:123456789012:web:testappid",
    });
  });
});
