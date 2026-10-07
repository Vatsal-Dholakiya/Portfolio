// After `vite build`: renders the home page and the 404 page to static HTML (fast first paint, crawlable),
// and inlines the stylesheet so it does not block rendering.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const base = process.env.BASE_PATH ?? '/'
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'))

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Placeholder <!--app-html--> not found in dist/index.html')

const withInlineCss = (html) =>
  html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/, (_, href) => {
    const cssPath = href.slice(base.length) // e.g. "assets/index-abc.css"
    const cssDir = cssPath.slice(0, cssPath.lastIndexOf('/') + 1)
    // Relative url() values are relative to the CSS file; rewrite them for the HTML page
    const css = readFileSync(resolve(dist, cssPath), 'utf8').replace(
      /url\((?!['"]?(?:\/|data:|https?:|#))['"]?(?:\.\/)?([^'")]+)['"]?\)/g,
      (_m, p) => `url(${base}${cssDir}${p})`,
    )
    return `<style>${css}</style>`
  })

const page = withInlineCss(template)
writeFileSync(resolve(dist, 'index.html'), page.replace('<!--app-html-->', await render(false)))
writeFileSync(
  resolve(dist, '404.html'),
  page
    .replace('<!--app-html-->', await render(true))
    .replace(/<link rel="canonical"[^>]*>\s*/, '')
    .replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'),
)
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('Pre-rendered dist/index.html and dist/404.html')
