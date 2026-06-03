import { generateWeeklyBrief } from "./lib/generate-weekly-brief";
import "./styles.css";

const brief = generateWeeklyBrief();
const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("Missing app root");
}

const feedbackOptions = ["saved", "too much", "too cheesy", "do again"];

app.innerHTML = `
  <section class="shell" aria-labelledby="app-title">
    <header class="masthead">
      <p class="eyebrow">Private weekly ritual brief</p>
      <h1 id="app-title">Moon &amp; Table</h1>
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
