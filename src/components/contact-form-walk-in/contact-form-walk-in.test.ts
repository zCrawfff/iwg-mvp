import { test, expect } from "@playwright/test";

const STORYBOOK_URL = "http://localhost:6009";

test.describe("ContactFormWalkIn", () => {
  test("default step 1", async ({ page }) => {
    await page.goto(
      `${STORYBOOK_URL}/iframe.html?id=templates-contactformwalkin--default`,
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });

  test("step 2 shows progress bar", async ({ page }) => {
    await page.goto(
      `${STORYBOOK_URL}/iframe.html?id=templates-contactformwalkin--step-2`,
    );
    await expect(page.locator("#storybook-root")).toHaveScreenshot();
  });
});
