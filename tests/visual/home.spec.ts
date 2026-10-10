import { test, expect } from "@playwright/test";

test.describe("Home Page Visual Regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
  });

  test("visual snapshot of home page hero and content", async ({ page }) => {
    // Wait for the hero section to be fully visible
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();

    // Snapshot full page or main content, masking dynamic countdown timer
    await expect(page).toHaveScreenshot("home-page.png", {
      fullPage: true,
      animations: "disabled",
      mask: [page.locator('[aria-live="off"]')],
    });
  });
});
