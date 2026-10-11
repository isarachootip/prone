import { test, expect } from "@playwright/test";

test.describe("Step 13 - Services, About, and Contact Pages", () => {
  test("services page renders 5 core services and related case studies", async ({ page }) => {
    await page.goto("/th/services");
    await expect(page).toHaveTitle(/PR One Network/);

    // Verify all 5 core service sections are present
    const services = [
      "event-management",
      "pr-media-relations",
      "marketing-campaign",
      "lead-generation-database",
      "creative-content",
    ];

    for (const id of services) {
      const serviceEl = page.locator(`article#${id}`);
      await expect(serviceEl).toBeVisible();
    }

    // Verify case study link within services
    const caseStudyLink = page.locator("a[href*='/work/']").first();
    await expect(caseStudyLink).toBeVisible();
  });

  test("about page displays 2004 milestone, client logo grid, and team placeholder", async ({ page }) => {
    await page.goto("/th/about");
    await expect(page).toHaveTitle(/PR One Network/);

    // Verify 2004 milestone stat (exact text match)
    await expect(page.getByText("2004", { exact: true }).first()).toBeVisible();

    // Verify client logo grid presence
    await expect(page.getByText("UiPath")).toBeVisible();
    await expect(page.getByText("Huawei")).toBeVisible();

    // Verify team placeholder
    await expect(page.getByText(/ทีมงานผู้เชี่ยวชาญ/i).first()).toBeVisible();
  });

  test("contact page displays location with Google Maps link and quick channels", async ({ page }) => {
    await page.goto("/th/contact");
    await expect(page).toHaveTitle(/PR One Network/);

    // Verify Google Maps external link
    const mapsLink = page.locator("a[href*='maps.google.com'], a[href*='google.com/maps']").first();
    await expect(mapsLink).toBeVisible();
    await expect(mapsLink).toHaveAttribute("target", "_blank");
    await expect(mapsLink).toHaveAttribute("rel", "noopener noreferrer");

    // Verify quick channels
    await expect(page.getByText("LINE Official Account")).toBeVisible();
    await expect(page.getByText("โทรศัพท์ติดต่อ")).toBeVisible();
    await expect(page.getByText("อีเมลติดต่อสอบถาม")).toBeVisible();
  });

  test("contact brief form validates required inputs and handles submission", async ({ page }) => {
    await page.goto("/th/contact");

    // 1. Submit empty form to trigger validation errors
    const submitBtn = page.getByRole("button", { name: /ส่งข้อมูลบรีฟ/i });
    await submitBtn.click();

    // Expect validation errors on required fields
    await expect(page.getByText(/กรุณากรอกชื่อ-นามสกุล/i)).toBeVisible();
    await expect(page.getByText(/กรุณาระบุชื่อบริษัท/i)).toBeVisible();
    await expect(page.getByText(/กรุณากรอกอีเมล/i)).toBeVisible();
    await expect(page.getByText(/กรุณากรอกเบอร์โทรศัพท์/i)).toBeVisible();
    await expect(page.getByText(/กรุณาเลือกประเภทงาน/i)).toBeVisible();
    await expect(page.getByText(/กรุณายินยอมรับเงื่อนไข/i)).toBeVisible();

    // 2. Fill in valid data
    await page.locator("#brief-fullName").fill("Somchai Techlead");
    await page.locator("#brief-company").fill("Enterprise Solutions Thailand");
    await page.locator("#brief-email").fill("somchai@enterprisesolutions.co.th");
    await page.locator("#brief-phone").fill("0899998888");
    await page.locator("#brief-eventType").selectOption("summit");
    await page.locator("#brief-targetDate").fill("November 2026");
    await page.locator("#brief-budget").selectOption("tier3");
    await page.locator("#brief-attendees").fill("250 executives");
    await page.locator("#brief-details").fill("Annual tech innovation conference and executive breakout workshops.");

    // Check PDPA consent
    const pdpaCheckbox = page.getByRole("checkbox");
    await pdpaCheckbox.click({ force: true });

    // Submit valid form
    await submitBtn.click();

    // Expect confirmation / thank you screen
    await expect(page.getByText(/ส่งข้อมูลบรีฟเรียบร้อยแล้ว/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("button", { name: /ส่งบรีฟงานอื่นเพิ่มเติม/i })).toBeVisible();
  });
});
