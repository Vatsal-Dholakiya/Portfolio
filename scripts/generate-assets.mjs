// Generates og-image.png, apple-touch-icon.png and placeholder certificate images with Playwright.
// Usage: node scripts/generate-assets.mjs [--certs]   (needs Playwright; see README)
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
let pw
try { pw = require('playwright') } catch { pw = require('/opt/node22/lib/node_modules/playwright') }

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(resolve(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).toString('base64')}`
const fonts = `
@font-face{font-family:B;src:url(${font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')});font-weight:200 800}
@font-face{font-family:S;src:url(${font('source-serif-4', 'source-serif-4-latin-wght-normal.woff2')});font-weight:200 900}
*{margin:0;box-sizing:border-box}`

const browser = await pw.chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {})
const shot = async (html, w, h, path, type = 'png') => {
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.setContent(`<style>${fonts}</style>${html}`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: resolve(root, 'public', path), type, ...(type === 'jpeg' ? { quality: 82 } : {}) })
  await page.close()
}

await shot(
  `<div style="width:1200px;height:630px;background:#121826;color:#E6EAF2;font-family:B;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden">
    <svg style="position:absolute;inset:0;opacity:.35" width="1200" height="630">${Array.from({ length: 40 }, (_, i) => {
      const x = (i * 197) % 1200, y = (i * 113) % 630
      return `<circle cx="${x}" cy="${y}" r="2.5" fill="#8FA3FF"/><line x1="${x}" y1="${y}" x2="${(x + 140) % 1200}" y2="${(y + 90) % 630}" stroke="#8FA3FF" stroke-opacity=".5"/>`
    }).join('')}</svg>
    <div style="position:relative;font-size:22px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#A0A9BC">Software Developer and Applied AI</div>
    <div style="position:relative;font-size:150px;font-weight:800;line-height:.9;letter-spacing:-.035em">Vatsal<br><span style="color:#121826;-webkit-text-stroke:6px #E6EAF2;paint-order:stroke fill">Dholakiya</span></div>
    <div style="position:relative;font-family:S;font-size:30px;color:#A0A9BC">Android, desktop and Python applications · London, United Kingdom</div>
  </div>`,
  1200, 630, 'og-image.png',
)

await shot(
  `<div style="width:180px;height:180px;background:#121826;color:#E6EAF2;font-family:B;font-weight:800;font-size:84px;display:grid;place-items:center;letter-spacing:-3px">VD<span style="position:absolute;left:140px;top:110px;width:14px;height:14px;border-radius:50%;background:#8FA3FF"></span></div>`,
  180, 180, 'apple-touch-icon.png',
)

if (process.argv.includes('--certs')) {
  const certs = [
    ['ethical-hacking', 'Introduction to Ethical Hacking', 'February 2022'],
    ['oop-java', 'Object-Oriented Programming in Java', 'July 2021'],
    ['github', 'GitHub Tutorial for Beginners', 'July 2021'],
    ['ui-ux', 'Introduction to UI-UX Design', 'July 2021'],
    ['cloud-foundations', 'Cloud Foundations', 'July 2020'],
  ]
  for (const [file, title, date] of certs) {
    await shot(
      `<div style="width:1600px;height:1131px;background:#fbfaf7;padding:56px;font-family:S;color:#18233A">
        <div style="height:100%;border:3px solid #2E4BD8;outline:1px solid #C9D0DC;outline-offset:-18px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:28px;padding:80px">
          <div style="font-family:B;font-weight:600;letter-spacing:.3em;text-transform:uppercase;font-size:28px;color:#556079">Certificate of completion</div>
          <div style="font-family:B;font-weight:800;font-size:84px;line-height:1.05;letter-spacing:-.02em;max-width:1200px">${title}</div>
          <div style="font-size:36px;color:#556079">Awarded to <b style="color:#18233A">Vatsal Dholakiya</b></div>
          <div style="font-size:32px;color:#556079">Great Learning Academy · ${date}</div>
          <div style="margin-top:40px;font-family:B;font-size:24px;color:#C98A16;font-weight:600">Preview image — replace with the original certificate file</div>
        </div>
      </div>`,
      1600, 1131, `certificates/${file}.jpg`, 'jpeg',
    )
  }
}

await browser.close()
console.log('Assets generated in public/')
