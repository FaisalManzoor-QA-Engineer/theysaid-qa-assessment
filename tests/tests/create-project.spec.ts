import { test, expect } from '@playwright/test';

test('create AI user test project', async ({ page }) => {
  await page.goto('https://evo.dev.theysaid.io/projects');

  // Add project
  await page.getByRole('button', { name: /add project/i }).click();

  // Select AI User Test
  await page.getByText(/AI User Test/i).first().click();

  // Create button inside modal
  const createBtn = page.getByRole('button', { name: /create ai user test/i });
  if (await createBtn.count()) {
    await createBtn.click();
  }

  // Draft project modal
  const goalBox = page.locator('textarea').first();
  await goalBox.fill('Test project for automation assessment');

  await page.getByRole('button', { name: /draft project/i }).click();

  // Wait for project page
  await page.waitForLoadState('networkidle');

  // Project editor should open
  await expect(page.locator('h1')).toBeVisible({ timeout: 60000 });

  await page.screenshot({ path: 'project-created.png', fullPage: true });
});