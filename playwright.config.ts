import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 180000,
  expect: {
    timeout: 30000,
  },
  fullyParallel: false,
  reporter: 'html',
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    storageState: 'auth.json',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});