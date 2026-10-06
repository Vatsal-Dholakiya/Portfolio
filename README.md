# Vatsal Dholakiya — Portfolio

A fast, fully animated, static portfolio built with Vite, React, TypeScript, Tailwind CSS, GSAP (GreenSock Animation Platform), Lenis and Framer Motion.

- Pre-rendered HTML (HyperText Markup Language): every word is readable without JavaScript and by search engines.
- Light and dark themes (dark by default; follows the system setting first; the choice is saved).
- Respects `prefers-reduced-motion`: no preloader, cursor, canvas motion, pinning or reveals.
- Lighthouse (local test): Performance 94–95 mobile / 100 desktop; Accessibility, Best Practices and SEO (Search Engine Optimisation) 100.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check, build, pre-render into dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Edit the content

**All text lives in [`src/data/profile.ts`](src/data/profile.ts).** You never need to touch a component to change wording.

| What | Where in `profile.ts` |
|---|---|
| Hero intro and location line | `hero` |
| Email, phone, LinkedIn, GitHub, Stack Overflow | `contact` (an empty string `''` hides that row and its footer icon) |
| Professional summary | `summary` (one string per paragraph) |
| Projects | `projects` (`impact` adds the big count-up figure; `featured: true` highlights the card) |
| Stack Overflow numbers | `stackoverflow.stats` |
| Jobs | `experience` (`current: true` gives the pulsing dot) |
| Skills | `skills` (grouped lists) and `marquee` (scrolling names) |
| Certificates | `certificates` |
| Education | `education` |
| Footer line | `footer` |

The page title, description and social-sharing tags are in [`index.html`](index.html).

### Add your files

1. **CV:** put your PDF at `public/Vatsal_Dholakiya_CV.pdf` (same name). All "Download CV" buttons use it.
2. **Certificates:** replace the five placeholder images in `public/certificates/` with your real ones, keeping the file names:
   `ethical-hacking.jpg`, `oop-java.jpg`, `github.jpg`, `ui-ux.jpg`, `cloud-foundations.jpg`.
   A landscape image about 1600 × 1131 pixels works best.
3. **Phone and LinkedIn:** fill in `contact.phone` and `contact.linkedin` in `profile.ts`.

### Site address

`.env` holds `VITE_SITE_URL`, which is used for the canonical link and the Open Graph (social preview) image. It is set to `https://vatsal-dholakiya.github.io/Portfolio`. If you use a custom domain or Vercel, change it there and in `public/robots.txt` and `public/sitemap.xml`.

To regenerate `og-image.png` and `apple-touch-icon.png` after design changes: `node scripts/generate-assets.mjs` (needs Playwright installed).

## Deploy to GitHub Pages

1. Push this project to the `main` branch of your GitHub repository.
2. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main` (or run it by hand from the **Actions** tab).
4. Your site will be at `https://<your-username>.github.io/<repository-name>/`. The workflow sets the sub-path automatically from the repository name.

## Deploy to Vercel (alternative)

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Vite automatically: build command `npm run build`, output directory `dist`. No other settings are needed. Update `VITE_SITE_URL` in `.env` to your Vercel address.

## Project structure

```
src/
  data/profile.ts        all content
  data/nav.ts            navbar links
  sections/              Hero, About, Work, StackOverflow, Experience, Skills, Certificates, Education, Contact
  components/            Preloader, Cursor, Navbar, NeuralCanvas, Marquee, TiltCard, Lightbox, RevealHeading, ...
  hooks/                 useCountUp, useMagnetic, useActiveSection
  lib/                   gsap setup, Lenis smooth scroll, theme store, motion helpers
  styles/index.css       colour tokens (light and dark), base styles
scripts/prerender.mjs    renders the app to static HTML and inlines the CSS after the build
```

## Animation map

| Animation | File |
|---|---|
| Preloader counter 0 → 100 with "VD", once per session | `components/Preloader.tsx` |
| Hero name letter-by-letter reveal (SplitText), intro fade | `sections/Hero.tsx` |
| Neural-network canvas that connects to the cursor | `components/NeuralCanvas.tsx` |
| Custom cursor (dot + ring, desktop only) | `components/Cursor.tsx` |
| Magnetic buttons | `hooks/useMagnetic.ts`, `components/Magnetic.tsx` |
| Navbar hide/show, sliding underline, scroll progress bar | `components/Navbar.tsx`, `components/ScrollProgress.tsx` |
| Section heading word reveal | `components/RevealHeading.tsx` |
| Pinned horizontal project scroll, count-up, tag pop-in | `sections/Work.tsx` |
| Stack Overflow count-ups | `sections/StackOverflow.tsx`, `hooks/useCountUp.ts` |
| Timeline line draw, dot fill, pulsing current role | `sections/Experience.tsx` |
| Skills marquee | `components/Marquee.tsx` |
| Certificate 3D tilt and lightbox | `components/TiltCard.tsx`, `components/Lightbox.tsx` |
| "Let's talk" reveal and copy email | `sections/Contact.tsx` |

Icons are from [Bootstrap Icons](https://icons.getbootstrap.com) (MIT licence).
