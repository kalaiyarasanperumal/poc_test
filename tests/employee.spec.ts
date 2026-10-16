import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { EmployeePage } from "../src/pages/EmployeePage";

test("Create employee @regression", async ({ page }) => {
  const login = new LoginPage(page);
  const employees = new EmployeePage(page);

  const id = Date.now();
  const firstName = "Test";
  const lastName = `Employee${id}`;

  await login.goto();
  await login.login("Admin", "admin123");
  await login.verifyLoginSuccess();

  await employees.goto();
  await employees.create(firstName, lastName);

  await expect(
    page.getByRole("heading", { name: "Personal Details" }),
  ).toBeVisible();
});



// npx playwright test tests/employee.spec.ts --headed
// npx playwright show-report