import http from "k6/http";
import { check } from "k6";
// import { run } from 'node:test';

const BASE_URL = "https://opensource-demo.orangehrmlive.com";

export const options = {
  vus: 2,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1000"],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/web/index.php/pim/viewEmployeeList`);

  check(response, {
    "employee page is accessible": (r) => r.status === 200,
  });
}

// run
// k6 run performance/createEmployee.js
