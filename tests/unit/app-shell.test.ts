import { describe, expect, it } from "vitest";

import {
  renderAppShell,
  renderLoadingShell,
  renderSignedInShell,
  renderSignedOutShell,
} from "../../src/ui/app-shell";

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
    const html = renderSignedInShell();

    expect(html).toContain("Signed in");
    expect(html).toContain("Sign out");
    expect(html).toContain("data-testid=\"recommended-ritual\"");
    expect(html).toContain("Clear one small thing. Feed one living thing.");
    expect(html).toContain("Thursday evening, 0-5 minutes.");
  });

  it("routes auth states to the correct shell", () => {
    expect(renderAppShell({ status: "loading" })).toContain(
      "Checking sign-in state.",
    );
    expect(
      renderAppShell({ status: "signed_out", configReady: true }),
    ).toContain("Sign in with Google");
    expect(
      renderAppShell({
        status: "signed_in",
        user: { uid: "placeholder-user-id" },
      }),
    ).toContain("Sign out");
  });
});
