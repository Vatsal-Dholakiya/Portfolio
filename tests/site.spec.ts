import { expect, navHeight, scrollThrough, test } from './fixtures'

const sections = ['about', 'skills', 'experience', 'projects', 'learning', 'contact']

/** Waits until the section's top sits just below the sticky navbar (smooth scrolling has finished). */
async function expectSectionInView(page: import('@playwright/test').Page, id: string) {
  await expect
    .poll(async () => page.evaluate((s) => Math.round(document.getElementById(s)!.getBoundingClientRect().top), id), {
      timeout: 6000,
    })
    .toBeGreaterThanOrEqual(-2)
  await expect
    .poll(async () => page.evaluate((s) => Math.round(document.getElementById(s)!.getBoundingClientRect().top), id), {
      timeout: 6000,
    })
    .toBeLessThanOrEqual(navHeight + 4)
}

test.describe('Navigation', () => {
  test('every navbar link scrolls to its section and highlights it', async ({ page, isMobile, consoleProblems }) => {
    test.skip(isMobile, 'desktop navbar')
    await page.goto('/')
    // Nothing is highlighted at the top of the page
    await expect(page.locator('header nav a[aria-current]')).toHaveCount(0)
    for (const id of sections) {
      await page.locator(`header nav a[href="#${id}"]`).click()
      await expectSectionInView(page, id)
      await expect(page.locator(`header nav a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location')
      await expect(page.locator('header nav a[aria-current]')).toHaveCount(1)
    }
    // The address bar stays clean, so a reload starts at the top
    expect(new URL(page.url()).hash).toBe('')
    await page.locator('header a[href="#home"]').click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5)
    expect(consoleProblems).toEqual([])
  })

  test('the page always opens at the top, even after scrolling and reloading', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="#projects"]:visible').first().click()
    await expectSectionInView(page, 'projects')
    await page.reload()
    await page.waitForFunction(() => window.__vdReady === true)
    await page.waitForTimeout(800)
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(5)
  })

  test('mobile menu: links, Escape, outside tap, focus and scroll lock', async ({ page, isMobile, consoleProblems }) => {
    test.skip(!isMobile, 'mobile menu')
    await page.goto('/')
    const toggle = page.locator('button[aria-controls="mobile-menu"]')
    for (const id of sections) {
      await toggle.click()
      const menu = page.locator('#mobile-menu')
      await expect(menu).toBeVisible()
      // The menu covers the whole screen, even after the header has slid away on scroll
      const box = (await menu.boundingBox())!
      expect(box.height).toBeGreaterThanOrEqual(page.viewportSize()!.height - 1)
      expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden')
      await menu.locator(`a[href="#${id}"]`).click()
      await expect(menu).toHaveCount(0)
      await expectSectionInView(page, id)
    }
    // Escape closes and returns focus to the menu button
    await toggle.click()
    await expect(page.locator('#mobile-menu')).toBeVisible()
    await expect(page.locator('#mobile-menu a').first()).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
    await expect(toggle).toBeFocused()
    // A tap on empty space closes it
    await toggle.click()
    await page.locator('#mobile-menu').click({ position: { x: 20, y: 760 } })
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
    expect(consoleProblems).toEqual([])
  })

  test('a shared link such as /#projects opens at that section, then the hash is cleared', async ({ page }) => {
    await page.goto('/#projects')
    await expectSectionInView(page, 'projects')
    await expect.poll(() => new URL(page.url()).hash).toBe('')
  })
})

test.describe('Links', () => {
  test('external links use https, open in a new tab and are safe', async ({ page }) => {
    await page.goto('/')
    await scrollThrough(page)
    const links = await page.$$eval('a[href^="http"]', (as) =>
      as.map((a) => ({ href: a.getAttribute('href')!, target: a.getAttribute('target'), rel: a.getAttribute('rel') ?? '' })),
    )
    expect(links.length).toBeGreaterThan(5)
    for (const link of links) {
      expect(link.href, link.href).toMatch(/^https:\/\/[^\s]+\.[^\s]+/)
      expect(link.target, link.href).toBe('_blank')
      expect(link.rel, link.href).toContain('noopener')
      expect(link.rel, link.href).toContain('noreferrer')
    }
  })

  test('no link has an empty or "#" href', async ({ page }) => {
    await page.goto('/')
    await scrollThrough(page)
    const bad = await page.$$eval('a', (as) =>
      as.filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').map((a) => a.outerHTML),
    )
    expect(bad).toEqual([])
  })

  test('in-page links point to existing sections', async ({ page }) => {
    await page.goto('/')
    await scrollThrough(page)
    const missing = await page.$$eval('a[href^="#"]', (as) =>
      as.map((a) => a.getAttribute('href')!.slice(1)).filter((id) => !document.getElementById(id)),
    )
    expect(missing).toEqual([])
  })

  test('CV links point to an existing PDF', async ({ page, request }) => {
    await page.goto('/')
    const hrefs = await page.$$eval('a[href$="cv.pdf"]', (as) => [...new Set(as.map((a) => a.getAttribute('href')!))])
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      const res = await request.get(href)
      expect(res.status(), href).toBe(200)
      expect(res.headers()['content-type']).toContain('pdf')
      expect((await res.body()).subarray(0, 4).toString()).toBe('%PDF')
    }
  })

  test('local images and files referenced by the page exist', async ({ page, request }) => {
    await page.goto('/')
    await scrollThrough(page)
    const srcs = await page.$$eval('img[src], link[rel~="icon"], link[rel="apple-touch-icon"]', (els) =>
      els.map((e) => e.getAttribute('src') ?? e.getAttribute('href')!).filter((s) => !s.startsWith('http') && !s.startsWith('data:')),
    )
    for (const src of srcs) expect((await request.get(src)).status(), src).toBe(200)
  })
})

test.describe('Certificates', () => {
  test('modal opens and closes with Escape, the close button and the backdrop', async ({ page, consoleProblems }) => {
    await page.goto('/#certificates')
    const card = page.locator('#certificates li button[aria-haspopup="dialog"]').first()
    const dialog = page.locator('[role="dialog"][aria-modal="true"]')

    await card.click()
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('img')).toHaveAttribute('alt', /certificate/i)
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden')
    const scrollBefore = await page.evaluate(() => window.scrollY)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(card).toBeFocused()
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - scrollBefore)).toBeLessThan(2)

    await card.click()
    await dialog.locator('button[aria-label="Close"]').click()
    await expect(dialog).toHaveCount(0)

    await card.click()
    await page.mouse.click(5, 5)
    await expect(dialog).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
    expect(consoleProblems).toEqual([])
  })
})

test.describe('Projects and data', () => {
  test('projects show the PostFactory and WhatsApp case studies with their features', async ({ page }) => {
    await page.goto('/#projects')
    await expect(page.locator('#postfactory-title')).toHaveText('PostFactory')
    await expect(page.locator('#whatsapp-automation-title')).toHaveText('WhatsApp Business Automation')
    await expect(page.locator('#projects li', { hasText: 'Number filter' })).toHaveCount(1)
  })

  test('GitHub grid shows live repositories without forks, and caches them', async ({ page }) => {
    await page.goto('/#projects')
    const cards = page.locator('#projects h4 a')
    await expect(cards.first()).toBeVisible()
    await expect(page.locator('#projects h4', { hasText: 'some-fork' })).toHaveCount(0)
    expect(await page.evaluate(() => !!sessionStorage.getItem('gh-repos-v2'))).toBe(true)
  })

  test('GitHub and Stack Overflow fall back gracefully when the APIs fail', async ({ page }) => {
    await page.route('**/api.github.com/**', (r) => r.fulfill({ status: 403, json: { message: 'API rate limit exceeded' } }))
    await page.route('**/api.stackexchange.com/**', (r) => r.abort())
    await page.goto('/#projects')
    await expect(page.locator('#projects [role="status"]')).toBeVisible()
    await expect(page.locator('#projects h4 a').first()).toBeVisible()
    const so = page.locator('#projects article', { hasText: 'Reputation' })
    await so.scrollIntoViewIfNeeded()
    await expect(so).toContainText('563', { timeout: 6000 })
  })

  test('Copy email shows the toast', async ({ page, context, browserName }) => {
    if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/#contact')
    await page.locator('button[aria-label="Copy email address"]').click()
    await expect(page.locator('[role="status"]', { hasText: 'Copied!' })).toBeVisible()
  })

  test('"Start a conversation" prints the compile log and links to email', async ({ page }) => {
    await page.goto('/#contact')
    const cta = page.locator('#contact a', { hasText: 'Start a conversation' })
    await expect(cta).toHaveAttribute('href', /^mailto:vatsal\.dholakiya2000@gmail\.com\?subject=/)
    await cta.click()
    await expect(page.locator('#contact', { hasText: 'tests passed' })).toBeVisible()
  })

  test('terminal opens with the backtick key, runs commands and closes on Escape', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard easter egg')
    await page.goto('/')
    await page.keyboard.press('`')
    const terminal = page.locator('[role="dialog"]', { hasText: 'vatsal@portfolio' })
    await expect(terminal).toBeVisible()
    await expect(page.locator('#terminal-input')).toBeFocused()
    await page.keyboard.type('whoami')
    await page.keyboard.press('Enter')
    await expect(terminal).toContainText('Software Developer & Android Developer')
    await page.keyboard.type('nope')
    await page.keyboard.press('Enter')
    await expect(terminal).toContainText('Command not found')
    await page.keyboard.press('Escape')
    await expect(terminal).toHaveCount(0)
  })
})

test.describe('Layout and accessibility', () => {
  for (const width of [375, 1440]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await scrollThrough(page)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    })
  }

  test('exactly one h1 and a skip link', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveCount(1)
    await page.keyboard.press('Tab')
    await expect(page.locator('a[href="#main"]')).toBeFocused()
  })

  test('skill tooltip opens, stays inside the viewport and closes on Escape', async ({ page, isMobile }) => {
    await page.goto('/#skills')
    const chip = page.locator('#skills button.chip').first()
    await chip.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    if (isMobile) await chip.tap()
    else await chip.hover()
    const tip = page.locator('[role="tooltip"]')
    await expect(tip).toBeVisible()
    const box = (await tip.boundingBox())!
    const vw = page.viewportSize()!.width
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(vw)
    await page.keyboard.press('Escape')
    await expect(tip).toHaveCount(0)
  })

  test('reduced motion: hero and all content visible', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    const { mockNetwork } = await import('./fixtures')
    await mockNetwork(page)
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    const hidden = await page.$$eval('main [data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length)
    expect(hidden).toBe(0)
    await context.close()
  })
})

test.describe('404', () => {
  test('unknown paths show the 404 page with a link home', async ({ page, consoleProblems }) => {
    const res = await page.goto('/this-page-does-not-exist')
    expect(res?.status()).toBeLessThan(500)
    await expect(page.locator('h1')).toHaveText("This page doesn't exist.")
    await page.locator('a', { hasText: 'Back to home' }).click()
    await expect(page.locator('#home')).toBeVisible()
    expect(consoleProblems).toEqual([])
  })
})

test('the whole page loads and scrolls with zero console errors or warnings', async ({ page, consoleProblems }) => {
  await page.goto('/')
  await scrollThrough(page)
  await page.waitForTimeout(500)
  expect(consoleProblems).toEqual([])
})
