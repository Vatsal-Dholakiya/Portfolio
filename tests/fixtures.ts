import { test as base, expect, type Page } from '@playwright/test'

declare global {
  interface Window {
    __vdReady?: boolean
  }
}

/** Deterministic, offline test runs: external APIs and fonts are mocked. */
export async function mockNetwork(page: Page) {
  await page.route('**/api.github.com/**', (route) =>
    route.fulfill({
      json: [
        {
          name: 'Portfolio',
          description: null,
          language: 'TypeScript',
          stargazers_count: 1,
          pushed_at: '2026-10-01T00:00:00Z',
          html_url: 'https://github.com/Vatsal-Dholakiya/Portfolio',
          fork: false,
        },
        {
          name: 'navigation_drawer',
          description: null,
          language: 'Java',
          stargazers_count: 0,
          pushed_at: '2021-05-04T00:00:00Z',
          html_url: 'https://github.com/Vatsal-Dholakiya/navigation_drawer',
          fork: false,
        },
        {
          name: 'some-fork',
          description: 'A fork',
          language: 'Java',
          stargazers_count: 0,
          pushed_at: '2021-05-04T00:00:00Z',
          html_url: 'https://github.com/Vatsal-Dholakiya/some-fork',
          fork: true,
        },
      ],
    }),
  )
  await page.route('**/api.stackexchange.com/**', (route) =>
    route.fulfill({ json: { items: [{ reputation: 600, badge_counts: { gold: 1, silver: 7, bronze: 21 } }] } }),
  )
  await page.route('**/fonts.googleapis.com/**', (route) => route.fulfill({ contentType: 'text/css', body: '' }))
  await page.route('**/fonts.gstatic.com/**', (route) => route.abort())
}

/** Collects console errors and warnings for the whole test. */
export const test = base.extend<{ consoleProblems: string[] }>({
  consoleProblems: async ({ page }, use) => {
    const problems: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') problems.push(`${msg.type()}: ${msg.text()}`)
    })
    page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`))
    await use(problems)
  },
  page: async ({ page }, use) => {
    await mockNetwork(page)
    // Skip the once-per-session hero build sequence so tests start at the final hero (it has its own test)
    await page.addInitScript(() => sessionStorage.setItem('vd-built', '1'))
    // Every navigation waits until the page is fully loaded and hydrated, as a visitor would see it
    const goto = page.goto.bind(page)
    page.goto = async (url, options) => {
      const res = await goto(url, options)
      await page.waitForLoadState('networkidle')
      await page.waitForFunction(() => window.__vdReady === true)
      return res
    }
    await use(page)
  },
})

export { expect }

export const navHeight = 64

/** Scrolls the page from top to bottom so every reveal and lazy element mounts. */
export async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(40)
  }
}
