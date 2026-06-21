import { test, expect } from '@playwright/test';

test('login with google and land on projects page', async ({ page }) => {
  await page.goto('https://evo.dev.theysaid.io/');

  // login button if homepage opens
  const loginBtn = page.getByRole('button', { name: /log in|login/i });
  if (await loginBtn.count()) {
    await loginBtn.first().click();
  }

  // Google auth button
  await page.getByRole('button', { name: /continue with google/i }).click();

  // wait for redirect back to app
  await page.waitForLoadState('networkidle');

  // if already authenticated, projects page should appear
  await expect(page).toHaveURL(/theysaid/i, { timeout: 60000 });

  // AI Projects or sidebar visible
  await expect(page.getByText(/AI Projects/i)).toBeVisible({ timeout: 60000 });

  await page.screenshot({ path: 'login-success.png', fullPage: true });
});