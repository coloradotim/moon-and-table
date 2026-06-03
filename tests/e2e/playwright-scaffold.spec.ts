import { expect, test } from "@playwright/test";

test("Playwright is ready for the future app shell smoke test", async () => {
  expect("Moon & Table").toBe("Moon & Table");
});
