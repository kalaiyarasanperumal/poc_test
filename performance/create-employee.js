import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:3000';
const CREATE_PATH = __ENV.CREATE_EMPLOYEE_PATH || '/api/employees';

export const options = {
  vus: 2,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  }
};

export default function () {
  const payload = JSON.stringify({
    firstName: `Load${__VU}`,
    lastName: `Test${Date.now()}${__ITER}`
  });

  const response = http.post(`${BASE_URL}${CREATE_PATH}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      ...( __ENV.API_TOKEN
        ? { Authorization: `Bearer ${__ENV.API_TOKEN}` }
        : {})
    }
  });

  check(response, {
    'employee creation returns success status': (r) =>
      r.status === 200 || r.status === 201
  });

  sleep(1);
}
