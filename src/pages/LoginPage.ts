import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/web/index.php/auth/login");
  }

  async login(username: string, password: string) {
    await this.page.goto("/web/index.php/auth/login");

    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async verifyLogin() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(
      this.page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
  }
}
