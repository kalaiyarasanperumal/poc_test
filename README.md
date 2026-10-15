# Senior QA Automation Engineer Technical Test

A simple automation framework using Playwright, TypeScript, API testing, GitHub Actions, HTML reports, and k6 performance testing.

## Prerequisites
- Node.js 20+
- npm and Git
- k6 (for performance testing)
- Running application and test credentials

## Setup
```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env
```

Update `.env` with the application URL and credentials.

## Run Tests
```bash
npm test
npm run test:smoke
npm run test:headed
npm run test:debug
npm run report
```

Run tests in staging:
```bash
TEST_ENV=staging npm test
```

## Test Tags
- `@smoke` – Basic checks
- `@regression` – Full functional tests
- `@employee-lifecycle` – Create, update, and delete employees
- `@rbac` – Role-based access tests

## Performance Testing
```bash
k6 run performance/login.js
k6 run performance/create-employee.js
```