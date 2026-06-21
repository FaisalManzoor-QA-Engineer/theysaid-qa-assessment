import { test, expect } from '@playwright/test';

test('Playwright docs search flow', async ({ page }) => {
  // Open Playwright docs
  await page.goto('https://playwright.dev/');

  // Verify homepage title
  await expect(page).toHaveTitle(/Playwright/);

  // Open search modal
  await page.getByRole('button', { name: 'Search' }).click();

  // Search input
  const searchInput = page.locator('input[placeholder="Search docs"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('locators');

  // Wait for first actual result link in dropdown
  const firstResult = page.locator('.DocSearch-Hit a').first();
  await expect(firstResult).toBeVisible();

  // Click first result
  await firstResult.click();

  // Verify user reached locators page
  await expect(page).toHaveURL(/locators/);
  await expect(page.getByRole('heading', { name: /Locators/i })).toBeVisible();

  await page.waitForTimeout(2000);
});