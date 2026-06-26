import { test, expect } from "./fixtures";

test.describe.configure({ mode: "serial" });

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

test("1. homepage loads and matches baseline", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("DewanKita")).toBeVisible();
  await expect(page.getByPlaceholder("Search wedding venues")).toBeVisible();
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
  await expect(page.getByRole("heading", { name: "Date Availability" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bird's Eye View" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Location" })).toBeVisible();
  await expect(page.getByText("Costing / Pricing")).toBeVisible();
  await expect(page.getByText("Terms of Payment")).toBeVisible();
  await expect(page.getByRole("heading", { name: "What You Get" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reviews" })).toBeVisible();

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

test("5. user can book a wedding venue date and package", async ({ page }) => {
  await page.goto("/");

  await page.getByText("Dewan Titi Belimbing").first().click();
  await page.waitForURL(/\/listings\/.+/);

  const dateInput = page.locator('input[type="date"]').first();
  await expect(dateInput).toBeVisible();
  await dateInput.fill(tomorrow());

  const paxSelect = page.locator("select").first();
  await paxSelect.selectOption({ index: 0 });

  await page.getByRole("button", { name: "Reserve date" }).click();

  await page.waitForURL("/trips");
  await expect(page.getByRole("heading", { name: "Your bookings" })).toBeVisible();
  await expect(page.getByText("Dewan Titi Belimbing")).toBeVisible();
  await expect(page.getByText("300 pax")).toBeVisible();
});

test("6. user can create a new venue listing", async ({ page }) => {
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

  await page.getByRole("button", { name: "Create venue listing" }).click();

  await page.waitForURL(/\/listings\/.+/);
  await expect(page.getByRole("heading", { name: uniqueTitle })).toBeVisible();
  await expect(page.getByText("Test Location, Malaysia").first()).toBeVisible();
});
