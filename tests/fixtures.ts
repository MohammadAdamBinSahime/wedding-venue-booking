import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  page: async ({ page }, use) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await use(page);

    expect(
      consoleErrors,
      `Console errors detected: ${consoleErrors.join("; ")}`
    ).toEqual([]);
    expect(pageErrors, `Page errors detected: ${pageErrors.join("; ")}`).toEqual(
      []
    );
  },
});

export { expect } from "@playwright/test";
