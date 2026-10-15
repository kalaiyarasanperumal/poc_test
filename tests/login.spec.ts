import { test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";

import { config } from "../src/config/env";
// import { config } from "../src/config/config";

test("Valid login", async ({ page }) => {
  const login = new LoginPage(page);

  await login.login(config.username, config.password);
  await login.verifyLogin();
});

test("Invalid login", async ({ page }) => {
  const login = new LoginPage(page);

  await login.login("invalid-user", "invalid-password");
});
