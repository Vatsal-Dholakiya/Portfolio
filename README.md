# Vatsal Dholakiya — Portfolio

A cinematic, scroll-driven single-page portfolio: the hero builds itself as you scroll, film scenes are scrubbed by scroll, and everything stays fast and accessible.

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText) · Lenis · Framer Motion · lucide-react · ESLint + Prettier · Playwright

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

| To change                                          | Edit in `content.ts`                                                  |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| Domain for canonical URL, social previews, sitemap | `site.url`                                                            |
| Page title, description, social image              | `site`                                                                |
| Email, GitHub, Stack Overflow, LinkedIn, CV path   | `person.links` (`linkedin: ''` hides every LinkedIn link)             |
| Navbar links and labels                            | `nav`                                                                 |
| Hero text and the pieces dragged onto the laptop   | `hero` (`hero.pieces`)                                                |
| Numbers strip                                      | `stats.items` (an item without `value` is hidden)                     |
| Mission statement                                  | `mission`                                                             |
| Three pillars, skills and tooltips ("used at")     | `pillars`                                                             |
| Timeline chapters and certificates                 | `story.chapters`, `story.certificates` (**add one = add one object**) |
| Film scene text                                    | `developer`, `nextChapter`, `whatIBuild.showcaseCaption`              |
| Capabilities and project cards                     | `whatIBuild`                                                          |
| WhatsApp case study                                | `featured`                                                            |
| GitHub grid, Stack Overflow fallback figures       | `github`, `stackoverflow.fallback`                                    |
| "Currently learning" log                           | `nextChapter.log` (an empty list hides it)                            |
| Contact heading, compile log, work preferences     | `contact`                                                             |
| Footer, terminal commands, 404 text                | `footer`, `terminal`, `notFound`                                      |

### Adding the films

Each film section shows a code-built animated scene until its video exists. To use a generated film, put the files in
`public/media/` and fill in the matching entry in `films` (`src`, optional `webm` and `mobileSrc`, `poster`).
Encode scroll-scrubbed films (`developer`, `nextChapter`, `showcase`) with every frame as a keyframe so seeking is instant, e.g.
`ffmpeg -i in.mp4 -c:v libx264 -g 1 -crf 22 -an -movflags +faststart out.mp4`.

### Files in `public/`

| File                                  | Purpose                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
| `cv.pdf`                              | Your CV. "Résumé" and "Download CV" use it. Replace the file to update it.                  |
| `certificates/*.webp`                 | One image per certificate (about 1600 × 1131 px), referenced by each certificate's `image`. |
| `favicon.svg`, `apple-touch-icon.png` | "VD" icon.                                                                                  |
| `og-image.png`                        | Social preview (1200 × 630).                                                                |

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

- **Hero "Built in front of you":** on the first visit in a session (motion allowed, no `#section` link), a class set before first paint (`html.js-build`) shows the build stage. A pinned, scroll-scrubbed GSAP timeline drags interface pieces onto a laptop (a phone below 768 px), then pushes the camera into the screen to reveal the final hero. "Skip intro" is always available; reloads, reduced motion and no-JavaScript visits show the final hero directly.
- **Pinned scenes:** Story (sideways timeline on desktop), The Developer, Project Showcase and The Next Chapter pin and scrub with scroll. Lenis smooth scrolling runs on GSAP's ticker so they stay in sync.
- **Pre-rendering:** `scripts/prerender.mjs` renders the full page (all code-split sections) to static HTML and inlines the CSS, so the first paint does not wait for JavaScript. React then hydrates it.
- **SEO:** a small Vite plugin in `vite.config.ts` writes the title, description, canonical URL, Open Graph, Twitter and JSON-LD `Person` tags from `content.ts`.
- **Motion:** only `transform`, `opacity` and video time are animated. With `prefers-reduced-motion`: no build sequence, no pinning or scrubbing, no smooth scrolling, no cursor, grain frozen, and all content visible immediately.
- **Live data:** GitHub repositories and Stack Overflow reputation are fetched in the browser, cached in `sessionStorage` for one hour, and fall back to values in `content.ts` if a request fails or is rate-limited.
- **Fonts:** Geist, Geist Mono and Instrument Serif from Google Fonts (preconnect, `display=swap`, non-blocking), with metric-matched fallbacks so text does not shift.
- **Extras:** status-bar navbar (London time, battery = scroll progress), custom cursor (mouse only), film grain, "compile" contact button, and a terminal easter egg (press <kbd>`</kbd>).

## Project structure

```
src/
  data/content.ts          all content + TypeScript types
  components/              Navbar, Hero, Contact, Footer, GitHubRepos, StackOverflowCard, CertificateModal, Toast, NotFound, Icon
    hero/                  BuildStage (laptop/phone assembly), FinalHero
    sections/              StatsStrip, Mission, Pillars, Story, Certificates, DeveloperFilm, PhoneShowcase,
                           WhatIBuild, FeaturedWork, NextChapter
    film/                  FilmSection (pinned shot), FilmVideo (looping or scroll-scrubbed video)
    extras/                Cursor, Grain, Terminal
    ui/                    SectionHead, SkillChips, TiltCard, Magnetic, Modal, Tooltip, Reveal, Counter, Monogram, BrandIcons
  hooks/                   useActiveSection, useSplitReveal, useSkillTips, useCountUp, useFetchWithCache, useFocusTrap …
  lib/                     gsap (plugin registration), lenis (smooth scroll + anchors), animations, helpers, overlay
  styles/globals.css       colour tokens, fallback fonts, grain, story layout, reduced-motion rules
public/                    cv.pdf, certificates/, favicon.svg, og-image.png, apple-touch-icon.png (films go in media/)
tests/                     Playwright end-to-end tests
scripts/                   prerender.mjs, generate-assets.mjs (regenerates og-image.png / apple-touch-icon.png)
```

Brand icons (GitHub, Stack Overflow, LinkedIn) are inline SVG from Bootstrap Icons (MIT licence).
