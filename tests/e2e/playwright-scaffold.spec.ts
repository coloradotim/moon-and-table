import { expect, test } from "@playwright/test";

test("home page renders one privacy-safe weekly brief", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Moon & Table" })).toBeVisible();
  await expect(page.getByTestId("recommended-ritual")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Why this" })).toBeVisible();
  await expect(page.getByText("Clear one small thing. Feed one living thing.")).toBeVisible();
  await expect(page.getByText("Thursday evening, 3-5 minutes.")).toBeVisible();
});
