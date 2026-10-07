import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end tests run against the production build (`npm run build` + `vite preview`).
 * Chromium desktop and mobile run by default. To include Safari (WebKit) and Firefox:
 *   npx playwright install && ALL_BROWSERS=1 npm test
 */
const allBrowsers = !!process.env.ALL_BROWSERS

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
    ...(allBrowsers
      ? [
          { name: 'desktop-firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 900 } } },
          { name: 'desktop-webkit', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
          { name: 'mobile-webkit', use: { ...devices['iPhone 14'] } },
        ]
      : []),
  ],
})
