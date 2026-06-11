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
      hasText: "Wet the seed and wait.",
    }),
  ).toBeVisible();

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
