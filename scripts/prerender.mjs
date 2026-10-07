// Renders the app to static HTML (fast first paint, readable by search engines)
// and inlines the stylesheet so it does not block rendering.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const base = process.env.BASE_PATH ?? '/'
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const file = resolve(dist, 'index.html')
let html = readFileSync(file, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('Placeholder <!--app-html--> not found in dist/index.html')
html = html.replace('<!--app-html-->', render())

html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/, (_, href) => {
  const cssPath = href.slice(base.length) // e.g. "assets/index-abc.css"
  const cssDir = cssPath.slice(0, cssPath.lastIndexOf('/') + 1)
  // Relative url() values are relative to the CSS file; rewrite them for index.html
  const css = readFileSync(resolve(dist, cssPath), 'utf8').replace(
    /url\((?!['"]?(?:\/|data:|https?:|#))['"]?(?:\.\/)?([^'")]+)['"]?\)/g,
    (_m, p) => `url(${base}${cssDir}${p})`,
  )
  return `<style>${css}</style>`
})

writeFileSync(file, html)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Pre-rendered dist/index.html')
