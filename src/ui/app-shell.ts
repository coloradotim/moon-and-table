import { generateWeeklyBrief } from "../lib/generate-weekly-brief";
import { getMissingPrivateDataFallback } from "../lib/private-data-schema";
import type { AppAuthState } from "../lib/auth";

const feedbackOptions = ["saved", "too much", "too cheesy", "do again"];

function getFallbackBrief() {
  const privateDataFallback = getMissingPrivateDataFallback();

  return generateWeeklyBrief({
    privateProfileKeys: privateDataFallback.privateProfileKeys,
    capacityMode: privateDataFallback.capacityMode,
    scheduleConstraints: privateDataFallback.scheduleConstraints,
  });
}

export function renderLoadingShell(): string {
  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Loading auth state">
        <p class="label">Private access</p>
        <p>Checking sign-in state.</p>
      </article>
    </section>
  `;
}

export function renderSignedOutShell(configReady: boolean): string {
  const configMessage = configReady
    ? "Sign in to open the private weekly brief."
    : "Firebase is not configured yet. Add local config values in .env.local to enable sign-in.";
  const disabledAttribute = configReady ? "" : " disabled";

  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Private sign-in">
        <p class="label">Private access</p>
        <h2>A quiet place for one household brief.</h2>
        <p>${configMessage}</p>
        <button class="primary-action" type="button" data-auth-action="sign-in"${disabledAttribute}>Sign in with Google</button>
      </article>
    </section>
  `;
}

export function renderUnauthorizedShell(): string {
  return `
    <section class="shell shell--centered" aria-labelledby="app-title">
      <header class="masthead">
        <p class="eyebrow">Private weekly ritual brief</p>
        <h1 id="app-title">Moon &amp; Table</h1>
      </header>

      <article class="brief auth-panel" aria-label="Private access limited">
        <p class="label">Private access</p>
        <h2>This account is not invited yet.</h2>
        <p>Moon &amp; Table is limited to the private household allowlist.</p>
        <button class="primary-action" type="button" data-auth-action="sign-in">Sign in with Google</button>
      </article>
    </section>
  `;
}

export function renderSignedInShell(): string {
  const brief = getFallbackBrief();

  return `
    <section class="shell" aria-labelledby="app-title">
      <header class="masthead masthead--with-session">
        <div>
          <p class="eyebrow">Private weekly ritual brief</p>
          <h1 id="app-title">Moon &amp; Table</h1>
        </div>

        <div class="session">
          <span>Signed in</span>
          <button type="button" data-auth-action="sign-out">Sign out</button>
        </div>
      </header>

      <article class="brief" aria-label="Weekly brief">
        <div class="brief__topline">
          <span>${brief.dateRange}</span>
          <span>${brief.trace.capacityMode} capacity</span>
        </div>

        <section class="brief__section">
          <p class="label">Theme</p>
          <h2>${brief.theme}</h2>
        </section>

        <section class="brief__grid" aria-label="Brief details">
          <div class="detail">
            <p class="label">Best window</p>
            <p>${brief.bestWindow}</p>
          </div>

          <div class="detail" data-testid="recommended-ritual">
            <p class="label">Recommended ritual</p>
            <p>${brief.recommendedRitual}</p>
          </div>

          <div class="detail">
            <p class="label">Optional add-on</p>
            <p>${brief.optionalAddOn}</p>
          </div>
        </section>

        <section class="brief__section">
          <p class="label">Why this</p>
          <h2>Why this</h2>
          <p>${brief.whyThis}</p>
        </section>

        <section class="brief__section">
          <p class="label">Reflection prompt</p>
          <p class="prompt">${brief.reflectionPrompt}</p>
        </section>

        <section class="trace" aria-label="Trace summary">
          <p class="label">Trace</p>
          <p>${brief.trace.timingFacts.join(" + ")} · ${brief.trace.symbolicCards.join(" · ")} · ${brief.trace.scheduleAssumptions.join(" · ")}</p>
        </section>

        <div class="feedback" aria-label="Feedback placeholders">
          ${feedbackOptions.map((option) => `<button type="button">${option}</button>`).join("")}
        </div>
      </article>
    </section>
  `;
}

export function renderAppShell(state: AppAuthState): string {
  if (state.status === "loading") {
    return renderLoadingShell();
  }

  if (state.status === "signed_out") {
    return renderSignedOutShell(state.configReady);
  }

  if (state.status === "unauthorized") {
    return renderUnauthorizedShell();
  }

  return renderSignedInShell();
}
