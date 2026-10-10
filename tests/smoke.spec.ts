import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  const testLocales = [
    { code: "th", lang: "th" },
    { code: "en", lang: "en" },
  ];

  for (const { code, lang } of testLocales) {
    test(`loads /${code} successfully without console errors and with correct lang attribute`, async ({
      page,
    }) => {
      const errors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text());
        }
      });

      page.on("pageerror", (err) => {
        errors.push(err.message);
      });

      const response = await page.goto(`/${code}`);
      expect(response?.ok()).toBeTruthy();

      const htmlLang = await page.locator("html").getAttribute("lang");
      expect(htmlLang).toBe(lang);

      expect(errors).toEqual([]);
    });
  }

  test("loads /admin dashboard or login without crashing", async ({ page }) => {
    test.setTimeout(60000);
    const response = await page.goto("/admin", { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveURL(/\/admin/);
  });
});
