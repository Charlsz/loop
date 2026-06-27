// ponytail: end-to-end test, run via `node scripts/e2e-test.mjs`
// Fires a fake GitHub webhook to localhost. Requires the dev server running.
const BASE = process.env.BASE_URL ?? 'http://localhost:3000';

const payload = {
  action: 'opened',
  pull_request: {
    number: 42,
    title: 'feat: add user authentication',
    body: 'Implements JWT-based login and session management for the API.',
    html_url: 'https://github.com/Charlsz/loop/pull/42',
    user: { login: 'test-user' },
    created_at: new Date().toISOString(),
    head: { sha: 'abc123def456', ref: 'feat/auth' },
    base: { sha: '789012ghi345', ref: 'main' },
  },
  repository: { full_name: 'Charlsz/loop' },
};

const res = await fetch(`${BASE}/api/webhook/github`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.error(`E2E test failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const data = await res.json();
console.log('E2E test passed:', JSON.stringify(data));
