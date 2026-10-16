# OrangeHRM Automation Testing

## About the Project

This project automates the OrangeHRM demo application using Playwright and TypeScript.

The goal is to test important features of the application and make sure they work as expected.

**Application:** https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Prettier
- HTML Test Reports

## Features Covered

- Login with valid credentials
- Login validation with invalid credentials
- Validation for empty login fields
- Employee creation
- Page Object Model (POM) for reusable code
- Automated test execution and HTML reporting

## Project Structure

```text
poc_test/
├── src/
│   └── pages/
│       ├── LoginPage.ts
│       └── EmployeePage.ts
├── tests/
│   ├── login.spec.ts
│   └── employee.spec.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

Make sure Node.js is installed.

Clone the repository:

```bash
git clone https://github.com/kalaiyarasanperumal/poc_test.git
cd poc_test
```

Install dependencies:

```bash
npm install
npx playwright install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run login tests:

```bash
npx playwright test tests/login.spec.ts
```

Run employee tests:

```bash
npx playwright test tests/employee.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Check TypeScript errors:

```bash
npx tsc --noEmit
```

## Test Report

Generate an HTML report:

```bash
npx playwright test --reporter=html
```

Open the report:

```bash
npx playwright show-report
```

The report shows the test results and helps identify failed test cases.

## Framework Approach

The project uses the Page Object Model to keep page actions separate from test cases.

- `LoginPage.ts` contains login-related actions.
- `EmployeePage.ts` contains employee-related actions.
- The `tests` folder contains the test scenarios.

This structure makes the code easier to read, maintain, and extend.

## Future Improvements

- Add employee update and deletion tests.
- Add API testing and verification.
- Improve failure screenshots and test reporting.
- Integrate automated tests with a CI/CD pipeline.
- Add performance testing using k6.

## Author

Kalaiyarasan Perumal

GitHub: https://github.com/kalaiyarasanperumal
