import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { person, site } from './src/data/content.ts'

/**
 * Deploy base path. Vercel and Netlify: '/' (default).
 * GitHub Pages project site: set BASE_PATH=/<repository-name>/ (the included workflow does this).
 */
const base = process.env.BASE_PATH ?? '/'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Generates <head> SEO tags, robots.txt and sitemap.xml from src/data/content.ts. */
function seoFromContent(): Plugin {
  const url = site.url.replace(/\/$/, '')
  const abs = (path: string) => (url ? `${url}${path}` : `${base}${path.replace(/^\//, '')}`)
  const sameAs = [person.links.github, person.links.stackoverflow, person.links.linkedin].filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${person.firstName} ${person.lastName}`,
    jobTitle: person.jobTitle,
    ...(url && { url: `${url}/` }),
    email: `mailto:${person.links.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
    sameAs,
  }

  return {
    name: 'seo-from-content',
    transformIndexHtml(html) {
      const tags = [
        `<title>${esc(site.title)}</title>`,
        `<meta name="description" content="${esc(site.description)}" />`,
        `<meta name="author" content="${esc(`${person.firstName} ${person.lastName}`)}" />`,
        url && `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${esc(`${person.firstName} ${person.lastName}`)}" />`,
        `<meta property="og:locale" content="${site.locale}" />`,
        `<meta property="og:title" content="${esc(site.title)}" />`,
        `<meta property="og:description" content="${esc(site.description)}" />`,
        url && `<meta property="og:url" content="${url}/" />`,
        `<meta property="og:image" content="${abs(site.ogImage)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(site.ogImageAlt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(site.title)}" />`,
        `<meta name="twitter:description" content="${esc(site.description)}" />`,
        `<meta name="twitter:image" content="${abs(site.ogImage)}" />`,
        `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
      ]
        .filter(Boolean)
        .join('\n    ')
      return html.replace('<!--seo-->', tags).replaceAll('%BASE%', base)
    },
    generateBundle() {
      const robots = `User-agent: *\nAllow: /\n${url ? `\nSitemap: ${url}/sitemap.xml\n` : ''}`
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (url) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig({
  base,
  define: { __BASE__: JSON.stringify(base) },
  plugins: [react(), tailwindcss(), seoFromContent()],
  build: { chunkSizeWarningLimit: 600 },
})
