import { test, expect } from "@playwright/test";

test.describe("Work Pages Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("work listing page renders correctly and filter functions", async ({ page }) => {
    await page.goto("/en/work");
    await page.waitForLoadState("networkidle");

    const heading = page.locator("h2, h1").first();
    await expect(heading).toBeVisible();

    // Verify filter buttons exist
    const summitFilter = page.getByRole("radio", { name: "Summit" });
    await expect(summitFilter).toBeVisible();
    await summitFilter.click();

    // Expect filtered cards to be visible
    const caseCards = page.locator("article, .group\\/study");
    await expect(caseCards.first()).toBeVisible();

    // Visual snapshot of work listing page
    await expect(page).toHaveScreenshot("work-listing.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("case study detail page renders content blocks and interactive lightbox", async ({ page }) => {
    await page.goto("/en/work/uipath-fusion-summit-bangkok");
    await page.waitForLoadState("networkidle");

    // Header validation
    const title = page.locator("h1");
    await expect(title).toContainText("UiPath Fusion Summit");

    // Blocks validation
    await expect(page.getByText("The Challenge")).toBeVisible();
    await expect(page.getByText("What We Delivered")).toBeVisible();
    await expect(page.getByText("Measurable Impact")).toBeVisible();

    // Lightbox interaction test
    const galleryButton = page.locator('button[aria-label^="Event Gallery"]').first();
    await expect(galleryButton).toBeVisible();
    await galleryButton.click();

    // Lightbox dialog should open
    const dialog = page.locator('[data-slot="dialog-content"]');
    await expect(dialog).toBeVisible();

    // Next arrow navigation
    const nextBtn = page.getByRole("button", { name: "Next photo" });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();
    await expect(page.getByText("2 / 4", { exact: true })).toBeVisible();

    // Close dialog
    const closeBtn = page.getByRole("button", { name: "Close" });
    await closeBtn.click();
    await expect(dialog).not.toBeVisible();

    // Visual snapshot of case study page
    await expect(page).toHaveScreenshot("case-study-detail.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("non-existent case study returns 404", async ({ page }) => {
    const response = await page.goto("/en/work/non-existent-slug");
    expect(response?.status()).toBe(404);
  });
});
