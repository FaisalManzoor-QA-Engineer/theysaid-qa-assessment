import { test, expect } from '@playwright/test';
import path from 'path';

test('TheySaid assessment - create, upload, publish', async ({ page }) => {
  test.setTimeout(180000);

  // =========================
  // 1) Already logged-in state se projects open
  // =========================
  await page.goto('https://evo.dev.theysaid.io/projects', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForLoadState('networkidle').catch(() => {});

  await expect(page.getByText(/AI Projects|Teach AI/i).first()).toBeVisible({
    timeout: 60000,
  });

  await page.screenshot({ path: '01-dashboard.png', fullPage: true });

  // =========================
  // 2) CREATE PROJECT
  // =========================
  await page.getByRole('button', { name: /add project/i }).click();
  await page.getByText(/AI User Test/i).first().click();

  const createBtn = page.getByRole('button', { name: /create ai user test/i });
  if (await createBtn.count()) {
    await createBtn.click();
  }

  const textarea = page.locator('textarea').first();
  if (await textarea.count()) {
    await textarea.fill('Test project for QA automation assessment');
  }

  const draftBtn = page.getByRole('button', { name: /draft project/i });
  if (await draftBtn.count()) {
    await draftBtn.click();
  }

  await page.waitForLoadState('networkidle').catch(() => {});
  await page.screenshot({ path: '02-project-created.png', fullPage: true });

  // =========================
  // 3) TEACH AI FILE UPLOAD
  // =========================
  await page.goto('https://evo.dev.theysaid.io/home/teach-ai', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForLoadState('networkidle').catch(() => {});

  await expect(page.getByText(/Contextualize Your AI|Teach AI/i).first()).toBeVisible({
    timeout: 60000,
  });

  await page.getByRole('button', { name: /add file/i }).click();

  const filePath = path.resolve('learner_transcript.pdf');
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(filePath);

  const confirmBtn = page.getByRole('button', { name: /confirm/i });
  if (await confirmBtn.count()) {
    await confirmBtn.click();
  }

  await expect(page.getByText(/learner_transcript\.pdf/i).first()).toBeVisible({
    timeout: 60000,
  });

  await page.screenshot({ path: '03-teach-ai-upload.png', fullPage: true });

  // =========================
  // 4) OPEN PROJECT + PUBLISH
  // =========================
  await page.goto('https://evo.dev.theysaid.io/projects', {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForLoadState('networkidle').catch(() => {});

  // jo naya project create hua usko open karne ki koshish
  const projectByName = page.getByText(/Upwork Homepage Navigation and Freelancer Discovery/i).first();
  if (await projectByName.count()) {
    await projectByName.click();
  } else {
    // fallback: first project row / first visible project text
    const firstProject = page.locator('tbody tr').first();
    if (await firstProject.count()) {
      await firstProject.click();
    } else {
      const anyProjectText = page.locator('text=/Professional Platform Experience|Untitled|Upwork/i').first();
      if (await anyProjectText.count()) {
        await anyProjectText.click();
      }
    }
  }

  await page.waitForLoadState('networkidle').catch(() => {});

  const publishBtn = page.getByRole('button', { name: /publish/i });
  if (await publishBtn.count()) {
    await publishBtn.click();
  }

  await expect(page.getByText(/project has been published|published/i).first()).toBeVisible({
    timeout: 30000,
  });

  const copyBtn = page.getByRole('button', { name: /copy link/i });
  if (await copyBtn.count()) {
    await copyBtn.click().catch(() => {});
  }

  await page.screenshot({ path: '04-project-published.png', fullPage: true });
});