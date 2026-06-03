import { describe, expect, it } from "vitest";

import {
  renderAppShell,
  renderLoadingShell,
  renderPrivateDataLoadingShell,
  renderSignedInShell,
  renderSignedOutShell,
  renderUnauthorizedShell,
} from "../../src/ui/app-shell";
import { resolvePrivateBriefData } from "../../src/lib/private-data";

describe("app shell rendering", () => {
  it("renders a loading state", () => {
    const html = renderLoadingShell();

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Checking sign-in state.");
  });

  it("renders a signed-out Google sign-in state", () => {
    const html = renderSignedOutShell(true);

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Sign in with Google");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("renders a config-missing signed-out state without private data", () => {
    const html = renderSignedOutShell(false).toLowerCase();

    expect(html).toContain("firebase is not configured yet");
    expect(html).toContain("sign in with google");
    expect(html).toContain("disabled");
    expect(html).not.toContain("birth");
    expect(html).not.toContain("natal");
    expect(html).not.toContain("relationship details");
  });

  it("renders the weekly brief only when signed in", () => {
    const html = renderSignedInShell(resolvePrivateBriefData({}));

    expect(html).toContain("Signed in");
    expect(html).toContain("Sign out");
    expect(html).toContain("data-testid=\"recommended-ritual\"");
    expect(html).toContain("Clear one small thing. Feed one living thing.");
    expect(html).toContain("Thursday evening, 0-5 minutes.");
    expect(html).toContain("Using starter settings until private settings are created.");
  });

  it("renders private data loading while signed-in Firestore data loads", () => {
    const html = renderPrivateDataLoadingShell();

    expect(html).toContain("Moon &amp; Table");
    expect(html).toContain("Loading private settings for this household.");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("renders unauthorized accounts without showing the brief", () => {
    const html = renderUnauthorizedShell();

    expect(html).toContain("This account is not invited yet.");
    expect(html).toContain("Sign in with Google");
    expect(html).not.toContain("data-testid=\"recommended-ritual\"");
  });

  it("routes auth states to the correct shell", () => {
    expect(renderAppShell({ status: "loading" })).toContain(
      "Checking sign-in state.",
    );
    expect(
      renderAppShell({ status: "signed_out", configReady: true }),
    ).toContain("Sign in with Google");
    expect(
      renderAppShell({ status: "unauthorized", configReady: true }),
    ).toContain("not invited");
    expect(
      renderAppShell({
        status: "signed_in",
        user: { uid: "placeholder-user-id", email: "person_a@example.com" },
      }),
    ).toContain("Loading private settings for this household.");
  });
});
