# Vatsal Dholakiya — Portfolio

A production-ready, single-page portfolio: dark, fast, accessible and animated.

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind CSS · Framer Motion · Lenis · lucide-react

| Check (local test) | Result |
|---|---|
| `npm run build` | 0 TypeScript errors, 0 ESLint problems |
| Browser console | 0 errors, 0 warnings (production and dev, desktop, mobile, reduced motion) |
| Lighthouse mobile | Performance 98–99 · Accessibility 100 · Best Practices 100 · SEO 100 |
| Lighthouse desktop | Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100 |
| Horizontal scroll | none at 320, 375, 768, 1024, 1440 and 1920 px |

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # type-check + lint + production build + pre-render into dist/
npm run preview    # serve the production build at http://localhost:4173
npm run lint       # ESLint only
```

## Edit the content

**Everything you read on the site lives in [`src/data/content.ts`](src/data/content.ts).** Components never need to change.

| To change | Edit in `content.ts` |
|---|---|
| Name, hero greeting, rotating roles, intro line, button labels | `name`, `hero` |
| Email, GitHub, Stack Overflow, LinkedIn, CV path | `links` (an empty string `''` hides that link everywhere) |
| About text, stat counters, profile photo | `about` |
| Skill groups | `skills` |
| Jobs | `experience` (`current: true` adds the "Current" badge and pink dot) |
| Projects | `projects` (`featured: true` makes the large card; `impact` adds the big count-up figure; `github` / `live` add links) |
| "Latest on GitHub" | `github` (repos to hide, descriptions for repos that have none, and the offline fallback list) |
| Certifications | `certificates` (add an object to add a card; the grid adapts) |
| Education | `education` (`years` is hidden while empty) |
| Contact heading and button | `contact` |
| Footer text | `footer` |

The page title, description and social-preview tags are in [`index.html`](index.html). The site address used by those tags is in `.env` (`VITE_SITE_URL`).

### Add your files to `public/`

| File | What to do |
|---|---|
| `public/Vatsal_Dholakiya_CV.pdf` | Your CV (added). Both "Download CV" buttons point here via `links.cv`. |
| `public/profile.webp` | Your photo (square, at least 640 × 640 px, WebP). Then set `about.photo: '/profile.webp'`. Until then a "VD" monogram is shown. |
| `public/certificates/*.webp` | Certificate images (about 1600 × 1131 px, WebP). Then set each certificate's `image`, e.g. `'/certificates/ethical-hacking.webp'`. The dialog shows the image when one is set. |
| `public/og-image.png` | Social preview (1200 × 630). Regenerate with `node scripts/generate-assets.mjs` (needs Playwright) or replace with your own. |

Convert a JPG to WebP with any image tool, e.g. `npx @squoosh/cli --webp auto photo.jpg` or an online converter.

## Deploy

### GitHub Pages (workflow included)
1. Push to the `main` branch.
2. On GitHub: **Settings → Pages → Source: GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and publishes on every push to `main`. The site appears at `https://<username>.github.io/<repository>/`; the sub-path is set automatically.

### Vercel
Import the repository at [vercel.com/new](https://vercel.com/new). Vite is detected automatically (build `npm run build`, output `dist`). Set `VITE_SITE_URL` in `.env` to your Vercel address.

### Netlify
New site from Git → build command `npm run build`, publish directory `dist`. Set `VITE_SITE_URL` to your Netlify address.

After changing the address, also update `public/robots.txt` and `public/sitemap.xml`.

## How it works

- **Pre-rendering:** after the build, `scripts/prerender.mjs` renders the page to static HTML and inlines the CSS, so the first paint does not wait for JavaScript. React then hydrates it.
- **Fonts:** Space Grotesk, Inter and JetBrains Mono from Google Fonts with `preconnect`, `display=swap` and a non-blocking stylesheet. Fallback faces in `src/styles/index.css` have metrics matched to each web font, so text does not shift when the fonts arrive.
- **Motion rules:** only `transform` and `opacity` are animated. With `prefers-reduced-motion` the intro, aurora movement, tilt, cursor glow, typing effect and smooth scroll are off, and all content is shown immediately. Cursor glow, magnetic buttons and tilt are desktop-only (`pointer: fine`).
- **GitHub grid:** fetches `api.github.com/users/Vatsal-Dholakiya/repos?sort=updated&per_page=6`, caches it in `sessionStorage` for 1 hour, shows skeletons while loading, and falls back to the list in `content.ts` (with a "Try again" button) on errors, time-outs or rate limits.

## Project structure

```
src/
  data/content.ts        all site content
  sections/              Hero, About, Skills, Experience, Projects, Certifications, Education, Contact
  components/            Navbar, Intro, Aurora, GradientName, RoleTyper, CursorGlow, ScrollProgress, Footer
  components/ui/         Reveal, SectionHeading, TiltCard, Magnetic, Modal, Counter, Monogram, BrandIcons
  hooks/                 useActiveSection, useCountUp, useFocusTrap, useGitHubRepos
  lib/                   scroll (Lenis + anchors), env (reduced motion, pointer), intro
  styles/index.css       colour tokens, fallback fonts, aurora, reduced-motion rules
scripts/                 prerender.mjs, generate-assets.mjs
```

Brand icons (GitHub, Stack Overflow, LinkedIn) are inline SVG from Bootstrap Icons (MIT licence).
