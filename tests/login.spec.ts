import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

test.describe("OrangeHRM Login", () => {
  test("Successful login @smoke", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login("Admin", "admin123");
    await login.verifyLoginSuccess();
  });

  test("Invalid login shows an error", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login("InvalidUser", "WrongPassword");
    await login.verifyInvalidLogin();
  });

  test("Empty credentials show validation errors", async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Required").first()).toBeVisible();
  });
});



// npx playwright test tests/login.spec.ts --headed
// npx playwright test tests/login.spec.ts --reporter=html
// npx playwright show-report



