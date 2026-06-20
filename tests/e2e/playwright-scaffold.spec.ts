import { expect, test } from "@playwright/test";

test("home page renders privacy-safe signed-out state", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Moon & Table", exact: true })).toBeVisible();
  await expect(page.getByText("Small rituals for a more magical home.")).toBeVisible();
  await expect(page.getByText("Sign in to continue.")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Sign in with Google" })).toBeVisible();
  await expect(page.getByTestId("recommended-ritual")).toHaveCount(0);
});

test("home page fits a phone-sized viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Moon & Table", exact: true })).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });

  expect(hasHorizontalOverflow).toBe(false);
});

test("dev visual QA mode renders signed-in Manage rituals on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?dev_visual_qa=signed_in&view=manage_rituals");

  await expect(page.getByRole("heading", { name: "Manage rituals" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in with Google" })).toHaveCount(0);
  await expect(page.getByText("Imported Ritual records")).toBeVisible();
  await expect(
    page.locator(".manage-rituals__ritual-title", {
      hasText: "Prepare the Candle Table",
    }),
  ).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });

  expect(hasHorizontalOverflow).toBe(false);
});

test("dev visual QA mode opens a new household Ritual draft from Manage", async ({ page }) => {
  await page.goto("/?dev_visual_qa=signed_in&view=manage_rituals");

  await page.getByRole("button", { name: "Create Ritual" }).click();

  await expect(page.locator("[data-manage-ritual-editor='true']")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Untitled Ritual" })).toBeVisible();
  await expect(
    page
      .locator("[data-manage-ritual-editor='true']")
      .locator("[data-manage-ritual-draft-status='true']"),
  ).toHaveText("Local preview draft");
  await expect(page.getByRole("button", { name: "Add to library" })).toBeVisible();

  await page.getByRole("button", { name: "Close editor" }).click();

  await expect(page.locator("[data-manage-ritual-editor='true']")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Manage rituals" })).toBeVisible();
});

test("dev visual QA mode filters Manage rituals to drafts", async ({ page }) => {
  await page.goto("/?dev_visual_qa=signed_in&view=manage_rituals");

  await expect(page.getByText("528 Rituals shown")).toBeVisible();

  const drafts = page.getByRole("button", { name: "Drafts" });
  await drafts.click();

  await expect(page.getByText("528 Rituals shown")).toHaveCount(0);
  await expect(page.getByText(/Rituals shown/)).toBeVisible();
  await expect(drafts).toHaveAttribute("aria-pressed", "true");

  await drafts.click();

  await expect(page.getByText("528 Rituals shown")).toBeVisible();
  await expect(drafts).toHaveAttribute("aria-pressed", "false");
});

test("dev visual QA mode replaces Manage view chips predictably", async ({ page }) => {
  await page.goto("/?dev_visual_qa=signed_in&view=manage_rituals");

  const inLibrary = page.getByRole("button", { name: "In library" });
  const chooseWithMe = page.getByRole("button", { name: "Allowed in Choose with me" });
  const needsAttention = page.getByRole("button", { name: "Needs attention" });
  const archived = page.getByRole("button", { name: "Archived" });

  await inLibrary.click();
  await expect(inLibrary).toHaveAttribute("aria-pressed", "true");

  await chooseWithMe.click();
  await expect(inLibrary).toHaveAttribute("aria-pressed", "false");
  await expect(chooseWithMe).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("528 Rituals shown")).toHaveCount(0);

  await needsAttention.click();
  await expect(chooseWithMe).toHaveAttribute("aria-pressed", "false");
  await expect(needsAttention).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("528 Rituals shown")).toHaveCount(0);
  await expect(page.getByText(/Rituals shown/)).toBeVisible();

  await archived.click();
  await expect(needsAttention).toHaveAttribute("aria-pressed", "false");
  await expect(archived).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("0 Rituals shown")).toBeVisible();

  await needsAttention.click();
  await expect(archived).toHaveAttribute("aria-pressed", "false");
  await expect(needsAttention).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("0 Rituals shown")).toHaveCount(0);
  await expect(page.getByText(/Rituals shown/)).toBeVisible();
});

test("local dev server serves the Ritual edit draft API", async ({ request }) => {
  const response = await request.post("/api/ritual-edit-draft", {
    data: {
      action: "create_blank",
      ritualId: "playwright-local-api-check",
    },
  });

  expect(response.status()).toBe(401);
  expect(response.headers()["content-type"]).toContain("application/json");
  expect(response.headers()["cache-control"]).toContain("no-store");
  await expect(await response.json()).toEqual({
    valid: false,
    findings: [
      {
        path: "authorization",
        message: "A Firebase ID token is required.",
        severity: "error",
      },
    ],
  });
});

test("dev visual QA mode recommends a Ritual through Choose with me", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?dev_visual_qa=signed_in");

  async function choose(action: string, value: string): Promise<void> {
    await page
      .locator(`[data-check-in-action="${action}"][data-check-in-value="${value}"]`)
      .click();
  }

  await choose("start_guided", "choose_with_me");
  await choose("energy_capacity", "enough_to_engage");
  await choose("time_scope", "best_moment_this_week");
  await choose("audience", "both_of_us");
  await choose("purpose", "voicing");
  await choose("carrier", "words");

  const result = page.locator("article.choose-result");
  await expect(result).toBeVisible();
  await expect(result.locator('section[aria-label="Practice"]')).toBeVisible();
  await expect(result.locator('details[aria-label="Why this fits now"]')).toBeVisible();
  await expect(result.locator('details[aria-label="How this was chosen"]')).toBeVisible();
  await expect(result.locator('section[aria-label="Question to carry"]')).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 1;
  });

  expect(hasHorizontalOverflow).toBe(false);
});

test("home page exposes production favicon assets", async ({ page }) => {
  await page.goto("/");

  const faviconLinks = await page
    .locator('link[rel~="icon"], link[rel="apple-touch-icon"]')
    .evaluateAll((links) =>
      links.map((link) => ({
        href: link.getAttribute("href"),
        rel: link.getAttribute("rel"),
        sizes: link.getAttribute("sizes"),
        type: link.getAttribute("type"),
      })),
    );

  expect(faviconLinks).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ href: "/favicon.ico", rel: "icon", sizes: "any" }),
      expect.objectContaining({ href: "/favicon.svg", rel: "icon", type: "image/svg+xml" }),
      expect.objectContaining({ href: "/favicon-32x32.png", rel: "icon", sizes: "32x32" }),
      expect.objectContaining({ href: "/apple-touch-icon.png", rel: "apple-touch-icon" }),
    ]),
  );
});
