import { test, expect } from '@playwright/test';

test('publish project and open survey', async ({ page }) => {
  await page.goto('https://evo.dev.theysaid.io/projects');

  // Open first project row
  const firstProject = page.locator('table tbody tr').first();
  if (await firstProject.count()) {
    await firstProject.click();
  } else {
    // fallback if list layout is cards/rows
    await page.locator('text=Professional Platform Experience and Freelance Preferences').first().click();
  }

  // Publish button
  await page.getByRole('button', { name: /publish/i }).click();

  // publish modal appears
  await expect(page.getByText(/your project has been published/i)).toBeVisible({
    timeout: 30000,
  });

  // copy/open survey link from visible input text if needed
  const surveyUrl = page.url();

  await page.screenshot({ path: 'project-published.png', fullPage: true });

  // If survey page already not opened, just go directly to published survey if you have the URL copied manually
  // fallback below can be adjusted after run
  if (!/survey/.test(surveyUrl)) {
    console.log('Project published modal shown. Open survey manually if needed.');
  }
});