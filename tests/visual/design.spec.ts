import { test, expect } from "@playwright/test";

test.describe("Design System Visual Regression", () => {
  const sectionIds = [
    "colors",
    "typography",
    "radius",
    "buttons",
    "badges",
    "cards",
    "form",
    "primitives",
    "brand-components",
  ];

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/en/design");
    await page.waitForLoadState("networkidle");
  });

  for (const sectionId of sectionIds) {
    test(`visual snapshot of #${sectionId}`, async ({ page }) => {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible();
      // Scroll into view to ensure all dynamic elements/swatches are rendered cleanly
      await section.scrollIntoViewIfNeeded();
      await expect(section).toHaveScreenshot(`${sectionId}.png`, {
        animations: "disabled",
      });
    });
  }
});
