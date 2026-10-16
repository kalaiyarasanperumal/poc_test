
import { expect, type Page } from "@playwright/test";

export class EmployeePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/web/index.php/pim/viewEmployeeList");

    await expect(
      this.page.getByRole("heading", { name: "Employee Information" }),
    ).toBeVisible();
  }

  async create(firstName: string, lastName: string): Promise<void> {
    await this.page.getByRole("button", { name: "Add" }).click();

    await expect(
      this.page.getByRole("heading", { name: "Add Employee" }),
    ).toBeVisible();

    await this.page.locator('input[name="firstName"]').fill(firstName);
    await this.page.locator('input[name="lastName"]').fill(lastName);

    await this.page.getByRole("button", { name: "Save" }).click();

    await expect(
      this.page.getByRole("heading", { name: "Personal Details" }),
    ).toBeVisible();
  }
}
