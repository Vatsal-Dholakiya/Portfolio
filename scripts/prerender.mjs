// Renders the app to static HTML so every word is readable without JavaScript and by search engines.
// Also inlines the (small) stylesheet and preloads the Latin fonts so the first paint is not blocked.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))
const file = resolve(dist, 'index.html')
let html = readFileSync(file, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('Placeholder <!--app-html--> not found in dist/index.html')

html = html.replace('<!--app-html-->', render())

// Inline the stylesheet
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/, (_, href) => {
  const base = process.env.BASE_PATH ?? '/'
  const css = readFileSync(resolve(dist, href.slice(base.length)), 'utf8')
  const fonts = [...css.matchAll(/url\(([^)]+(?:bricolage-grotesque|source-serif-4)-latin-wght-normal[^)]+\.woff2)\)/g)].map((m) => m[1])
  const preloads = [...new Set(fonts)]
    .map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>`)
    .join('')
  return `${preloads}<style>${css}</style>`
})

writeFileSync(file, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Pre-rendered dist/index.html')
