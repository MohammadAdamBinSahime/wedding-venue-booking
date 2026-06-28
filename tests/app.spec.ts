import { test, expect } from "./fixtures";

test.describe.configure({ mode: "serial" });

test("1. homepage loads and matches baseline", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("DewanKita")).toBeVisible();
  await expect(page.getByTestId("nav-venue")).toBeVisible();
  await expect(page.getByText("Dewan Titi Belimbing")).toBeVisible();

  await expect(page).toHaveScreenshot("home.png", { fullPage: true });
});

test("2. category filter updates listings", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Garden" }).click();
  await page.waitForURL("/?category=Garden");

  await expect(page.getByText("Garden Villa Aisyah")).toBeVisible();
  await expect(page.getByText("Dewan Titi Belimbing")).not.toBeVisible();
});

test("3. listing detail page shows all wedding venue sections", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Dewan Titi Belimbing").first().click();
  await page.waitForURL(/\/listings\/.+/);

  await expect(page.getByRole("heading", { name: "Dewan Titi Belimbing" })).toBeVisible();
  await expect(page.getByText("Titi Belimbing, Malaysia").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bird's Eye View" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Location" })).toBeVisible();
  await expect(page.getByText("Package / Pricing")).toBeVisible();
  await expect(page.getByText("Terms of Payment")).toBeVisible();
  await expect(page.getByRole("heading", { name: "What You Get" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reviews" })).toBeVisible();

  // The inline booking sidebar should be removed.
  await expect(page.getByRole("button", { name: "Reserve date" })).not.toBeVisible();

  const mapIframe = page.locator('iframe[title^="Map of"]').first();
  await expect(mapIframe).toBeVisible();

  await expect(page).toHaveScreenshot("listing-detail.png", {
    fullPage: true,
    mask: [mapIframe],
  });
});

test("4. user can add a review", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Dewan Titi Belimbing").first().click();
  await page.waitForURL(/\/listings\/.+/);

  await page.getByLabel("Rate 5 stars").click();
  await page.getByPlaceholder("Share your experience...").fill("Beautiful venue and great service!");
  await page.getByRole("button", { name: "Submit review" }).click();

  await expect(page.getByText("Beautiful venue and great service!")).toBeVisible();
});

test("5. user can create a new venue listing", async ({ page }) => {
  const uniqueTitle = `Test Venue ${Date.now()}`;

  await page.goto("/host");

  await page.getByPlaceholder("Venue title").fill(uniqueTitle);
  await page.getByPlaceholder("Description").fill("A lovely test wedding venue.");
  await page
    .getByPlaceholder("Main image URL")
    .fill(
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=80"
    );
  await page
    .getByPlaceholder("360° outside image URL")
    .fill(
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
    );
  await page
    .getByPlaceholder("360° inside image URL")
    .fill(
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80"
    );
  await page
    .getByPlaceholder("Map URL (Google Maps link)")
    .fill("https://www.google.com/maps/search/?api=1&query=Test+Venue");
  await page.getByPlaceholder("Location").fill("Test Location, Malaysia");
  await page.getByPlaceholder("Base package price (RM)").fill("2500");
  await page
    .getByPlaceholder("Describe your venue, special amenities, restrictions")
    .fill("Free parking available. No open flame catering.");

  await page.getByRole("button", { name: "Create venue listing" }).click();

  await page.waitForURL(/\/listings\/.+/);
  await expect(page.getByRole("heading", { name: uniqueTitle })).toBeVisible();
  await expect(page.getByText("Test Location, Malaysia").first()).toBeVisible();
  await expect(page.getByText("Free parking available.")).toBeVisible();
});
