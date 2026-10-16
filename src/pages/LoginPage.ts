import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('input[name="username"]').fill(username);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click();
  }

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard\/index/);
    await expect(
      this.page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
  }

  async verifyInvalidLogin(): Promise<void> {
    await expect(this.page.getByText("Invalid credentials")).toBeVisible();
  }
}
