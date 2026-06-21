import { test, expect } from '@playwright/test';
import path from 'path';

test('upload document in Teach AI', async ({ page }) => {
  await page.goto('https://evo.dev.theysaid.io/home/teach-ai');

  // Wait for page
  await expect(page.getByText(/Teach AI/i)).toBeVisible({ timeout: 30000 });

  // Add file button
  await page.getByRole('button', { name: /add file/i }).click();

  // file input / chooser
  const filePath = path.resolve('learner_transcript.pdf');

  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(filePath);

  // confirm upload
  await page.getByRole('button', { name: /confirm/i }).click();

  // generating state or document summary
  await expect(
    page.getByText(/generating data|document summary/i).first()
  ).toBeVisible({ timeout: 60000 });

  // final summary card visible
  await expect(page.getByText(/learner_transcript\.pdf/i)).toBeVisible({
    timeout: 60000,
  });

  await page.screenshot({ path: 'teach-ai-uploaded.png', fullPage: true });
});