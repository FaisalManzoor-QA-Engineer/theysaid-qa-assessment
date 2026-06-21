import { test } from '@playwright/test';

test('EVO sign in second step inspect karo', async ({ page }) => {
  await page.goto('https://evo.dev.theysaid.io/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // homepage par agar direct sign-in screen na aaye to sign in par click karo
  const signInLink = page.getByText(/sign in/i).first();
  if (await signInLink.isVisible().catch(() => false)) {
    await signInLink.click();
    await page.waitForTimeout(3000);
  }

  // email fill
  const emailField = page.locator('input[type="email"]').first();
  await emailField.fill('test@example.com');

  // continue click
  await page.getByRole('button', { name: /continue/i }).click();

  // second step load hone do
  await page.waitForTimeout(5000);

  // screenshot
  await page.screenshot({ path: 'evo-signin-step2.png', fullPage: true });

  // full visible text print
  const bodyText = await page.locator('body').innerText();
  console.log('===== EVO SIGNIN STEP2 TEXT START =====');
  console.log(bodyText);
  console.log('===== EVO SIGNIN STEP2 TEXT END =====');

  // saare inputs print
  const inputs = await page.locator('input').evaluateAll((els) =>
    els.map((el) => ({
      type: (el as HTMLInputElement).type,
      name: (el as HTMLInputElement).name,
      placeholder: (el as HTMLInputElement).placeholder,
      value: (el as HTMLInputElement).value
    }))
  );

  console.log('===== EVO SIGNIN STEP2 INPUTS =====');
  console.log(JSON.stringify(inputs, null, 2));

  // saare buttons print
  const buttons = await page.locator('button').allTextContents();
  console.log('===== EVO SIGNIN STEP2 BUTTONS =====');
  console.log(buttons);

  await page.waitForTimeout(2000);
});