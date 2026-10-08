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
  '<style>html,body{margin:0;background:#050607}</style>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;800&family=Geist+Mono:wght@400&family=Instrument+Serif:ital@1&display=swap">'

const browser = await chromium.launch(process.env.PROXY ? { proxy: { server: process.env.PROXY } } : {})
async function shot(html, width, height, out) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.setContent(fonts + html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: resolve(root, 'public', out) })
  await page.close()
}

await shot(
  `<div style="position:relative;width:1200px;height:630px;overflow:hidden;background:#050607;color:#EDEEE9;font-family:Geist;margin:0">
    <div style="position:absolute;width:900px;height:900px;left:-200px;top:-420px;border-radius:50%;background:radial-gradient(circle,rgba(46,230,166,.22),rgba(46,230,166,0) 65%)"></div>
    <div style="position:absolute;width:700px;height:700px;right:-240px;bottom:-380px;border-radius:50%;background:radial-gradient(circle,rgba(255,138,61,.16),rgba(255,138,61,0) 65%)"></div>
    <div style="position:absolute;left:72px;top:68px;width:64px;height:64px">${favicon.replace('<svg ', '<svg width="64" height="64" ')}</div>
    <div style="position:absolute;left:72px;top:72px;right:72px;text-align:right;font-family:'Geist Mono';font-size:20px;letter-spacing:3px;color:#8A938E">LONDON, UNITED KINGDOM</div>
    <div style="position:absolute;left:66px;bottom:150px;font-weight:800;font-size:150px;line-height:.86;letter-spacing:-8px;text-transform:uppercase">
      <div>Vatsal</div>
      <div style="color:#050607;-webkit-text-stroke:3px rgba(237,238,233,.4);paint-order:stroke fill;letter-spacing:-1px">Dholakiya</div>
    </div>
    <div style="position:absolute;left:72px;bottom:72px;font-size:30px;color:#B9C0BC">Software Developer · Android Developer · <span style="font-family:'Instrument Serif';font-style:italic;color:#FF8A3D;font-size:34px">exploring AI</span></div>
  </div>`,
  1200,
  630,
  'og-image.png',
)
await shot(
  `<div style="width:180px;height:180px;background:#050607;display:grid;place-items:center">${favicon.replace('<svg ', '<svg width="150" height="150" ')}</div>`,
  180,
  180,
  'apple-touch-icon.png',
)
await browser.close()
console.log('Generated public/og-image.png and public/apple-touch-icon.png')
