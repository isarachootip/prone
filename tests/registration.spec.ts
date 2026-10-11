import { test, expect } from "@playwright/test";

test.describe("Event Registration Flow", () => {
  test("shows validation errors when submitting an empty or invalid form", async ({ page }) => {
    await page.goto("/en/events/upcoming-tech-summit-2026");
    await page.waitForLoadState("networkidle");

    const submitBtn = page.getByRole("button", { name: "Confirm Registration" });
    await expect(submitBtn).toBeVisible();

    // Click submit without entering any fields
    await submitBtn.click();

    // Verify validation errors appear
    await expect(page.getByText("Please enter your full name")).toBeVisible();
    await expect(page.getByText("Please enter your company name")).toBeVisible();
    await expect(page.getByText("Please enter your job title")).toBeVisible();
    await expect(page.getByText("Please enter a valid work email address")).toBeVisible();
    await expect(page.getByText("Please enter a valid phone number")).toBeVisible();
    await expect(page.getByText("You must consent to the privacy policy")).toBeVisible();
  });

  test("submits successfully with valid data and shows thank you screen with AddToCalendar", async ({
    page,
  }) => {
    await page.goto("/en/events/upcoming-tech-summit-2026");
    await page.waitForLoadState("networkidle");

    // Fill valid data
    await page.locator("#fullName").fill("John Doe");
    await page.locator("#company").fill("Acme Global");
    await page.locator("#jobTitle").fill("Vice President of Technology");
    await page.locator("#phone").fill("+66 81 234 5678");
    await page.locator("#email").fill("john.doe@acmeglobal.com");

    // Click PDPA checkbox
    const pdpaCheckbox = page.getByRole("checkbox");
    await pdpaCheckbox.click({ force: true });

    // Submit form
    const submitBtn = page.getByRole("button", { name: "Confirm Registration" });
    await submitBtn.click();

    // Verify thank you view is displayed
    await expect(page.getByText("Registration Confirmed!")).toBeVisible();
    await expect(
      page.getByText("We have received your registration details")
    ).toBeVisible();

    // Verify AddToCalendar button is present in success screen
    const addToCalendarBtn = page
      .locator("#register")
      .getByRole("button", { name: /\+ ปฏิทิน|\+ Calendar/i });
    await expect(addToCalendarBtn).toBeVisible();
  });

  test("privacy policy placeholder page loads correctly", async ({ page }) => {
    await page.goto("/en/privacy");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1, h2").first()).toBeVisible();
    await expect(
      page.getByText("[Privacy Policy — Pending Legal Review]")
    ).toBeVisible();
  });
});
