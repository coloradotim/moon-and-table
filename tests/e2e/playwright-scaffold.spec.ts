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
