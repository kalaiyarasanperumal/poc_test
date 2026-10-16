import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { EmployeePage } from "../src/pages/EmployeePage";

test.describe("OrangeHRM Employee Tests", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login("Admin", "admin123");
    await login.verifyLoginSuccess();
  });

  test("Create employee @regression", async ({ page }) => {
    const employees = new EmployeePage(page);

    const id = Date.now();
    const firstName = "Test";
    const lastName = `Employee${id}`;

    await employees.goto();
    await employees.create(firstName, lastName);
  });

  test("Employee page opens successfully", async ({ page }) => {
    const employees = new EmployeePage(page);

    await employees.goto();

    await expect(
      page.getByRole("heading", { name: "Employee Information" }),
    ).toBeVisible();
  });

  test("Employee Add form opens successfully", async ({ page }) => {
    const employees = new EmployeePage(page);

    await employees.goto();
    await page.getByRole("button", { name: "Add" }).click();

    await expect(
      page.getByRole("heading", { name: "Add Employee" }),
    ).toBeVisible();
  });

  test("First name is required", async ({ page }) => {
    const employees = new EmployeePage(page);

    await employees.goto();
    await page.getByRole("button", { name: "Add" }).click();

    await page.locator('input[name="lastName"]').fill("TestEmployee");
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.locator('input[name="firstName"]')).toHaveClass(
      /input-field-error/,
    );
  });
});

// npx playwright test tests/employee.spec.ts --headed
// npx playwright test tests/employee.spec.ts --headed --trace on

// npx prettier --write .
// npx prettier --check .
