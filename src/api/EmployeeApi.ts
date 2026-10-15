import { expect, type APIRequestContext } from "@playwright/test";
import { config } from "../config/env";

export class EmployeeApi {
  constructor(private request: APIRequestContext) {}

  async verifyEmployee(empNumber: string) {
    if (!config.apiToken) {
      throw new Error("Add API_TOKEN to your .env file");
    }

    const response = await this.request.get(
      `${config.baseUrl}/web/index.php/api/v2/pim/employees/${empNumber}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
        },
      },
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(String(body.data.empNumber)).toBe(empNumber);
  }
}
