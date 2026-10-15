import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://127.0.0.1:3000';
const LOGIN_PATH = __ENV.LOGIN_PATH || '/api/login';

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
    username: __ENV.TEST_USERNAME || 'test-user',
    password: __ENV.TEST_PASSWORD || 'test-password'
  });

  const response = http.post(`${BASE_URL}${LOGIN_PATH}`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });

  check(response, {
    'login API returns expected success status': (r) =>
      r.status === 200
  });

  sleep(1);
}
