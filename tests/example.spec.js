const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:5173';

const routes = [
  '/',
  '/login',
  '/register',
  '/personal-info',
  '/pregnancy-details',
  '/pregnancy-profile',
  '/appointment',
  '/appointment-history',
  '/profile',
  '/baby-development',
  '/health-tracking',
  '/report',
  '/family-form',
  '/family-form-details',
  '/family-dashboard',
];

for (const route of routes) {
  test(`Page should load: ${route}`, async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${route}`);

    expect(response).not.toBeNull();

    if (response) {
      expect(response.status()).toBeLessThan(400);
    }

    console.log(`PASS: ${route}`);
  });
}