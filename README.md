# Vatsal Dholakiya — Portfolio

A production-ready, single-page portfolio: dark, fast, accessible and animated.

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind CSS · Framer Motion · Lenis · lucide-react · ESLint + Prettier · Playwright

## Quick start

Requires Node.js 20 or newer.

| Task                                                   | Command                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| Install                                                | `npm install`                                                 |
| Run (development server, http://localhost:5173)        | `npm run dev`                                                 |
| Build (type-check, lint, production build, pre-render) | `npm run build`                                               |
| Preview the production build (http://localhost:4173)   | `npm run preview`                                             |
| End-to-end tests (Chromium desktop + mobile)           | `npx playwright install chromium` once, then `npm test`       |
| Tests in Chromium, Firefox and Safari (WebKit)         | `npx playwright install` once, then `ALL_BROWSERS=1 npm test` |
| Lint / format                                          | `npm run lint` · `npm run format`                             |

`npm test` builds the site and starts the preview server automatically. External APIs and fonts are mocked in tests, so they run offline.

## How to update my content

**Everything on the site comes from one file: [`src/data/content.ts`](src/data/content.ts).** Components never need editing.
Leave any optional field as `''` to hide it everywhere (no empty or dead links are ever rendered).

| To change                                               | Edit in `content.ts`                                                                      |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Domain for canonical URL, social previews, sitemap      | `site.url`                                                                                |
| Page title, description, social image                   | `site`                                                                                    |
| Email, GitHub, Stack Overflow, LinkedIn, CV path        | `person.links` (`linkedin: ''` hides every LinkedIn link)                                 |
| Navbar links and labels                                 | `nav`                                                                                     |
| Hero greeting, rotating roles, intro, buttons, badge    | `hero`                                                                                    |
| About paragraphs, photo, stats, interests               | `about`                                                                                   |
| Skills, categories, tooltips ("used at")                | `skills.categories`                                                                       |
| Jobs (timeline)                                         | `experience.roles` (`period: ''` hides dates; `current: true` adds the badge)             |
| Featured project, key features, other projects          | `projects`                                                                                |
| GitHub grid (hidden repos, fallback list, descriptions) | `github`                                                                                  |
| Stack Overflow fallback figures                         | `stackoverflow.fallback`                                                                  |
| Certificates                                            | `certifications.items` — **add one = add one object** (`credential: ''` hides the button) |
| Education                                               | `education.degrees` (`award` shows the gradient badge)                                    |
| Contact heading, line, work preferences                 | `contact`                                                                                 |
| Footer and 404 text                                     | `footer`, `notFound`                                                                      |

### Files in `public/`

| File                                                      | Purpose                                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `cv.pdf`                                                  | Your CV. "Resume" and "Download CV" use it. Replace the file to update it.                  |
| `profile.webp` (+ `profile-360.webp`, `profile-480.webp`) | Profile photo (square). Smaller copies are served to phones; see `about.photoSizes`.        |
| `certificates/*.webp`                                     | One image per certificate (about 1600 × 1131 px), referenced by each certificate's `image`. |
| `favicon.svg`, `apple-touch-icon.png`                     | "VD" icon.                                                                                  |
| `og-image.png`                                            | Social preview (1200 × 630).                                                                |

`robots.txt`, `sitemap.xml` (once `site.url` is set) and `404.html` are generated at build time from `content.ts`.
Original uploads (photo JPEG, certificate PDFs) are kept in `originals/` and are not deployed.

## Deploy

### Vercel (default)

Import the repository at [vercel.com/new](https://vercel.com/new). `vercel.json` sets the build command, output folder, an SPA fallback (unknown paths show the custom 404 view) and long cache headers for hashed assets. Then set `site.url` in `content.ts` to your domain and redeploy.

### Netlify

New site from Git → build command `npm run build`, publish directory `dist`. Netlify serves `dist/404.html` for unknown paths automatically. Set `site.url`.

### GitHub Pages

1. Repository **Settings → Pages → Source: GitHub Actions**.
2. Push to `main`; `.github/workflows/deploy.yml` builds and publishes.
3. A project site lives under `/<repository>/`, so Vite needs that `base`. The workflow sets `BASE_PATH=/<repository>/`, which `vite.config.ts` uses as `base`. For a manual build: `BASE_PATH=/Portfolio/ npm run build`. (A user site at `<username>.github.io` uses the default `/`.)
4. Set `site.url` to `https://<username>.github.io/<repository>`.

## How it works

- **Pre-rendering:** `scripts/prerender.mjs` renders the full page (all code-split sections) to static HTML and inlines the CSS, so the first paint does not wait for JavaScript. React then hydrates it.
- **SEO:** a small Vite plugin in `vite.config.ts` writes the title, description, canonical URL, Open Graph, Twitter and JSON-LD `Person` tags from `content.ts`.
- **Motion:** only `transform` and `opacity` are animated. With `prefers-reduced-motion`, the intro, aurora movement, tilt, cursor glow, rotating text and smooth scrolling are off and all content shows immediately. Tilt, magnetic buttons and cursor glow run only with a mouse or trackpad.
- **Live data:** GitHub repositories and Stack Overflow reputation are fetched in the browser, cached in `sessionStorage` for one hour, and fall back to values in `content.ts` if a request fails or is rate-limited.
- **Fonts:** Space Grotesk, Inter and JetBrains Mono from Google Fonts (preconnect, `display=swap`, non-blocking). Fallback fonts in `src/styles/globals.css` have metrics matched to each web font, so text does not shift when fonts load.

## Project structure

```
src/
  data/content.ts          all content + TypeScript types
  components/              Navbar, Hero, About, Skills, Experience, Projects, GitHubRepos, StackOverflowCard,
                           Certifications, CertificateModal, Education, Contact, Footer, Loader, Toast,
                           SectionTitle, NotFound (+ ui/: TiltCard, Magnetic, Modal, Tooltip, Reveal, Counter …)
  hooks/                   useActiveSection, useReducedMotion, useIsTouch, useCountUp, useFetchWithCache, useFocusTrap
  lib/                     animations (variants), lenis (smooth scroll + anchors), helpers, overlay, events
  styles/globals.css       colour tokens, fallback fonts, aurora, reduced-motion rules
public/                    cv.pdf, profile*.webp, certificates/, favicon.svg, og-image.png, apple-touch-icon.png
tests/                     Playwright end-to-end tests
scripts/                   prerender.mjs, generate-assets.mjs (regenerates og-image.png / apple-touch-icon.png)
```

Brand icons (GitHub, Stack Overflow, LinkedIn) are inline SVG from Bootstrap Icons (MIT licence).
