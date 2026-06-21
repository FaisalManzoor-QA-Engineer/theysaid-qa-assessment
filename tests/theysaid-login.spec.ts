import { test } from '@playwright/test';

test('Debug TheySaid second login step', async ({ page }) => {
  await page.goto('https://ai.theysaid.io/home?landing_page=https%3A%2F%2Fwww.theysaid.io%2F');

  await page.waitForLoadState('domcontentloaded');

  // email field
  const emailField = page.locator('input[type="email"]');
  await emailField.fill('test@example.com');

  // Continue button click
  await page.getByRole('button', { name: /continue/i }).click();

  // next screen load hone do
  await page.waitForTimeout(5000);

  // saare inputs print karo
  const inputs = await page.locator('input').evaluateAll((els) =>
    els.map((el) => ({
      type: (el as HTMLInputElement).type,
      name: (el as HTMLInputElement).name,
      placeholder: (el as HTMLInputElement).placeholder,
      value: (el as HTMLInputElement).value,
    }))
  );

  // saare buttons print karo
  const buttons = await page.locator('button').evaluateAll((els) =>
    els.map((el) => ({
      text: (el.textContent || '').trim(),
    }))
  );

  // saare headings print karo
  const headings = await page.locator('h1, h2, h3').evaluateAll((els) =>
    els.map((el) => (el.textContent || '').trim())
  );

  console.log('===== SECOND STEP INPUTS =====');
  console.log(JSON.stringify(inputs, null, 2));

  console.log('===== SECOND STEP BUTTONS =====');
  console.log(JSON.stringify(buttons, null, 2));

  console.log('===== SECOND STEP HEADINGS =====');
  console.log(JSON.stringify(headings, null, 2));
});