/* global document -- used inside page.evaluate, which runs in the browser */
// Regenerates public/og-image.png (1200x630) and public/apple-touch-icon.png from HTML using Playwright.
// Usage: node scripts/generate-assets.mjs   (requires the `playwright` package and a Chromium browser)
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_PATH ?? 'playwright')
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const favicon = readFileSync(resolve(root, 'public/favicon.svg'), 'utf8')
const fonts =
  '<style>html,body{margin:0;background:#0A0B10}</style>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&family=Space+Grotesk:wght@700&display=swap">'

const browser = await chromium.launch(process.env.PROXY ? { proxy: { server: process.env.PROXY } } : {})
async function shot(html, width, height, out) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.setContent(fonts + html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: resolve(root, 'public', out) })
  await page.close()
}

await shot(
  `<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:#0A0B10;color:#E6E8F0;font-family:Inter;margin:0">
    <div style="position:absolute;width:820px;height:820px;left:-260px;top:-380px;border-radius:50%;background:radial-gradient(circle,rgba(124,92,255,.45),rgba(124,92,255,0) 65%)"></div>
    <div style="position:absolute;width:720px;height:720px;right:-260px;top:-60px;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.28),rgba(34,211,238,0) 65%)"></div>
    <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(230,232,240,.12) 1px,transparent 1.2px);background-size:26px 26px;-webkit-mask-image:radial-gradient(ellipse 75% 70% at 50% 45%,#0A0B10 20%,transparent 80%)"></div>
    <div style="position:absolute;left:84px;top:84px;width:72px;height:72px">${favicon.replace('<svg ', '<svg width="72" height="72" ')}</div>
    <div style="position:absolute;left:84px;top:230px">
      <div style="font-family:'JetBrains Mono';font-size:26px;color:#22D3EE">Hi, my name is</div>
      <div style="margin-top:14px;font-family:'Space Grotesk';font-weight:700;font-size:104px;line-height:1;letter-spacing:-3px;background:linear-gradient(135deg,#7C5CFF,#22D3EE);-webkit-background-clip:text;color:transparent">Vatsal Dholakiya</div>
      <div style="margin-top:26px;font-family:'Space Grotesk';font-weight:700;font-size:40px;color:#E6E8F0">Software Developer &amp; Android Developer</div>
      <div style="margin-top:14px;font-size:26px;color:#9AA3B2">London, United Kingdom</div>
    </div>
  </div>`,
  1200,
  630,
  'og-image.png',
)
await shot(`<div style="width:180px;height:180px;background:#0A0B10;display:grid;place-items:center">${favicon.replace('<svg ', '<svg width="150" height="150" ')}</div>`, 180, 180, 'apple-touch-icon.png')
await browser.close()
console.log('Generated public/og-image.png and public/apple-touch-icon.png')
