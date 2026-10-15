import { expect, type Page } from "@playwright/test";

export class EmployeePage {
  constructor(private page: Page) {}

  async create(firstName: string, lastName: string) {
    await this.page.goto("/web/index.php/pim/addEmployee");

    await this.page.getByPlaceholder("First Name").fill(firstName);
    await this.page.getByPlaceholder("Last Name").fill(lastName);

    const employeeId = await this.page.getByLabel("Employee Id").inputValue();

    await this.page.getByRole("button", { name: "Save" }).click();

    await expect(this.page).toHaveURL(/empNumber\/\d+/);

    const empNumber = this.page.url().match(/empNumber\/(\d+)/)?.[1] || "";

    expect(empNumber).not.toBe("");

    return { employeeId, empNumber };
  }

  async search(employeeId: string) {
    await this.page.goto("/web/index.php/pim/viewEmployeeList");

    await this.page.getByLabel("Employee Id").fill(employeeId);
    await this.page.getByRole("button", { name: "Search" }).click();

    const row = this.page.getByRole("row").filter({
      hasText: employeeId,
    });

    await expect(row).toBeVisible();

    return row;
  }

  async update(employeeId: string, newFirstName: string) {
    const row = await this.search(employeeId);

    await row.getByRole("link").first().click();

    await this.page.getByPlaceholder("First Name").fill(newFirstName);
    await this.page.getByRole("button", { name: "Save" }).first().click();
  }

  async delete(employeeId: string) {
    const row = await this.search(employeeId);

    await row.getByRole("checkbox").check();

    await this.page.getByRole("button", { name: /delete selected/i }).click();

    await this.page.getByRole("button", { name: /yes, delete/i }).click();
  }
}
