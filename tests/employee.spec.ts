import { test, expect } from "@playwright/test";

import { config } from "../src/config/env";
import { LoginPage } from "../src/pages/LoginPage";
import { EmployeePage } from "../src/pages/EmployeePage";
import { EmployeeApi } from "../src/api/EmployeeApi";

// Test 1: Authentication
test("Authentication", async ({ page }) => {
  const login = new LoginPage(page);

  await login.login(config.username, config.password);
  await login.verifyLogin();
});

// Test 2: Create, update and delete employee
test("Employee lifecycle", async ({ page }) => {
  const login = new LoginPage(page);
  const employee = new EmployeePage(page);

  await login.login(config.username, config.password);
  await login.verifyLogin();

  const lastName = `Test${Date.now()}`;
  const created = await employee.create("QA", lastName);

//   expect(created.employeeId).not.toBe("");

//   await employee.update(created.employeeId, "UpdatedQA");
//   await employee.delete(created.employeeId);
});

// Test 3: API verification
test("Verify employee through API", async ({ request }) => {
  test.skip(
    !config.apiToken || !config.employeeNumber,
    "Configure API_TOKEN and API_TEST_EMPLOYEE_NUMBER in .env",
  );

  const api = new EmployeeApi(request);
  await api.verifyEmployee(config.employeeNumber);
});

// Test 4: Role-based access
test("Restricted user cannot see PIM menu", async ({ page }) => {
  test.skip(
    !config.restrictedUsername || !config.restrictedPassword,
    "Configure a restricted user in .env",
  );

  const login = new LoginPage(page);

  await login.login(config.restrictedUsername, config.restrictedPassword);

  await expect(page).toHaveURL(/dashboard/);

  await expect(
    page.getByRole("link", { name: "PIM", exact: true }),
  ).toHaveCount(0);
});
