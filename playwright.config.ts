import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/browser', timeout: 120_000, expect: { timeout: 15_000 }, workers: 1,
  use: { baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000', headless: true,
    launchOptions: { executablePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' }, trace: 'retain-on-failure' },
  reporter: [['list'], ['html', { open: 'never' }]],
})
