import "dotenv/config";

export const config = {
  baseUrl: process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com",
  username: process.env.TEST_USERNAME || "Admin",
  password: process.env.TEST_PASSWORD || "admin123",
  apiToken: process.env.API_TOKEN || "",
  employeeNumber: process.env.API_TEST_EMPLOYEE_NUMBER || "",
};
