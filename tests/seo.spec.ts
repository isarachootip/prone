import { test, expect } from "@playwright/test";

test.describe("Step 14 - SEO and Performance Verification", () => {
  test("robots.txt serves correct crawl directives and references sitemap.xml", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();

    const text = await response.text();
    expect(text).toMatch(/User-agent:\s*\*/i);
    expect(text).toContain("Disallow: /*/design");
    expect(text).toContain("Disallow: /admin");
    expect(text).toContain("Sitemap:");
    expect(text).toContain("/sitemap.xml");
  });

  test("sitemap.xml generates valid XML with localized routes and alternates", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("xml");

    const xml = await response.text();
    expect(xml).toContain("<urlset");
    expect(xml).toContain("/th");
    expect(xml).toContain("/en");
    expect(xml).toContain("/th/events");
    expect(xml).toContain("/th/work");
    expect(xml).toContain("/th/services");
    expect(xml).toContain("/th/about");
    expect(xml).toContain("/th/contact");
    expect(xml).toContain("xhtml:link");
    expect(xml).toContain("hreflang=\"th\"");
    expect(xml).toContain("hreflang=\"en\"");
  });

  test("home page contains Organization JSON-LD and canonical alternates", async ({ page }) => {
    await page.goto("/th");

    // Canonical link tag
    const canonical = await page.locator("link[rel='canonical']").getAttribute("href");
    expect(canonical).toContain("/th");

    // Hreflang alternates
    const thAlternate = await page.locator("link[rel='alternate'][hreflang='th']").getAttribute("href");
    expect(thAlternate).toContain("/th");

    // Organization JSON-LD
    const ldJsonScript = page.locator("script[type='application/ld+json']").first();
    await expect(ldJsonScript).toBeAttached();
    const ldJsonContent = await ldJsonScript.textContent();
    expect(ldJsonContent).toContain("PR One Network");
    expect(ldJsonContent).toContain("Organization");
    expect(ldJsonContent).toContain("2004");
  });

  test("event detail page contains Event JSON-LD structured data", async ({ page }) => {
    await page.goto("/th/events/upcoming-tech-summit-2026");

    const ldJsonScripts = page.locator("script[type='application/ld+json']");
    const count = await ldJsonScripts.count();
    expect(count).toBeGreaterThan(0);

    let foundEvent = false;
    for (let i = 0; i < count; i++) {
      const content = await ldJsonScripts.nth(i).textContent();
      if (content?.includes('"Event"')) {
        foundEvent = true;
        expect(content).toContain("PR One Network");
        break;
      }
    }
    expect(foundEvent).toBe(true);
  });

  test("case study page contains BreadcrumbList JSON-LD structured data", async ({ page }) => {
    await page.goto("/th/work/uipath-fusion-summit-bangkok");

    const ldJsonScripts = page.locator("script[type='application/ld+json']");
    const count = await ldJsonScripts.count();
    expect(count).toBeGreaterThan(0);

    let foundBreadcrumb = false;
    for (let i = 0; i < count; i++) {
      const content = await ldJsonScripts.nth(i).textContent();
      if (content?.includes('"BreadcrumbList"')) {
        foundBreadcrumb = true;
        expect(content).toContain("PR One");
        expect(content).toContain("Work");
        break;
      }
    }
    expect(foundBreadcrumb).toBe(true);
  });

  test("dynamic OpenGraph image generates image/png preview", async ({ request }) => {
    const res = await request.get("/th/opengraph-image");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"]).toBe("image/png");
  });
});
