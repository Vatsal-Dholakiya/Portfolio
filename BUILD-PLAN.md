# BUILD PLAN — Vatsal Dholakiya · Cinematic Portfolio (v4)

> Status: **awaiting approval**. Nothing in this plan is built or generated until it is approved.
> Date: 7 October 2026 · Repository: `Vatsal-Dholakiya/Portfolio` · Branch: `claude/animated-portfolio-redesign-mdy784`

Items marked **[FILL IN]** need your real details. Nothing here is invented: every number on the site is either a fact you have given me, a value loaded live from a public API, or a placeholder.

---

## 1. Website overview

A single-page, scroll-driven portfolio that feels like a short film about a developer at work.
The visitor watches the page **build itself**, meets Vatsal in three cinematic shots, sees the software he ships, and leaves knowing two things:

1. He is a **Software Developer and Android Developer** who ships reliable, real-world software.
2. He is **learning Artificial Intelligence (AI)** seriously, and that is where he is heading.

|                        |                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **Primary goal**       | Get recruiters and engineering leads to contact him for software, Android and junior AI-adjacent roles. |
| **Primary audience**   | Recruiters, hiring managers, engineering leads (scan in 30 seconds).                                    |
| **Secondary audience** | Fellow developers (look at code, GitHub, craft).                                                        |
| **One-line promise**   | "I build software and Android apps that do real work — and I'm learning AI to build what comes next."   |
| **Success signals**    | Email clicks, CV downloads, GitHub visits (measured with privacy-friendly analytics, optional).         |

What changes from the current site (v3):

- New **cinematic art direction** (black void, emerald + warm ember light) matched to the generated films.
- New **story structure** (hero → stats → mission → pillars → story → projects → featured work → next chapter → call to action).
- New **assembling hero**, **three avatar films** and a **product film**, all tied to scroll.
- Kept from v3: single `content.ts`, pre-rendering, accessibility, tests, live GitHub and Stack Overflow data, certificates, CV.

---

## 2. Core positioning

**Positioning statement**

> Vatsal Dholakiya is a London-based Software Developer and Android Developer who builds dependable software that automates real business work. He is currently exploring Artificial Intelligence and Machine Learning, and growing his skills toward building with AI.

**Role line (everywhere):** Software Developer · Android Developer · Exploring AI

**Proof points (facts only)**

| Proof                                                                                                                            | Source                    |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Software Developer at Made Tech IT, London (Oct 2024 – present)                                                                  | You                       |
| Native Android apps for small businesses at CodeCreator Technologies (Aug 2020 – Nov 2022), including Google Play Store releases | You                       |
| WhatsApp business automation desktop app, about 90% of manual messaging automated                                                | You                       |
| MSc Cloud Computing (Distinction), University of East London; BSc Information Technology, Ganpat University                      | You                       |
| 5 certifications (Great Learning Academy)                                                                                        | Certificates you uploaded |
| Stack Overflow contributor (reputation and answers loaded live)                                                                  | Stack Exchange API        |

**AI wording rules (strict)**

- ✅ "currently exploring AI", "learning AI and Machine Learning", "AI is where I'm heading", "studied AI and Machine Learning fundamentals in my MSc".
- ❌ "AI engineer", "AI expert", "built AI products", "AI clients", "AI consultant", "creator", "content", "YouTuber".
- AI appears as **direction and curiosity**: a learning log, a "next chapter" film, a pillar called _Learning AI_. Never as past professional work.

**Messaging hierarchy**

1. I build software that does real work. _(credibility)_
2. I build Android apps people use. _(specialism)_
3. I'm learning AI, deliberately and in public. _(direction)_

---

## 3. Brand personality

| Is                            | Is not                                   |
| ----------------------------- | ---------------------------------------- |
| Calm, focused, precise        | Loud, hype, "10x"                        |
| Quietly confident             | Arrogant, motivational-speaker           |
| Craft-obsessed, detail-minded | Flashy for its own sake                  |
| Curious, still learning       | Pretending to be an expert in everything |
| Warm, human                   | Corporate, cold                          |

**Voice:** short sentences, active voice, plain technical language, first person. Specific over clever.
Example: "I build software that removes busywork." not "Leveraging synergies to empower digital transformation."

**Signature idea:** _"Built in front of you."_ The site literally assembles itself, the same way he builds software: piece by piece, carefully, until it works.

---

## 4. Visual direction

**Mood:** a late-night studio. Black void, a single emerald rim light, a faint warm ember glow from a monitor. Film-like: shallow depth of field, soft bloom, fine grain, anamorphic feel. Premium and quiet, like a product launch film rather than a tech ad.

**Key visual rules**

- 90% of every frame is near-black. Light is used to _point_, never to decorate.
- **Emerald** = craft, code, the present (software and Android).
- **Ember (warm orange)** = warmth, humanity, the future (AI learning). Used sparingly.
- Real interface elements (code, Android screens, cards) are the "props". No stock photography, no robots, no glowing brains.
- Typography is the hero of every non-video section: huge, tight, kinetic.

**Mood references (for direction, not copying):** Apple product films, Linear and Vercel launch pages, Awwwards "Site of the Day" scroll-story portfolios, Blade Runner 2049 colour restraint.

---

## 5. Higgsfield Seedance 2.0 asset generation

### 5.1 Facts checked in your Higgsfield account (7 Oct 2026)

| Item          | Value                                                                                 |
| ------------- | ------------------------------------------------------------------------------------- |
| Model         | **Seedance 2.0** (`seedance_2_0`, Bytedance)                                          |
| Duration      | 4–15 seconds → we use **8–12 s**                                                      |
| Resolution    | 480p / 720p / **1080p** / 4K — 1080p needs `mode: "std"`                              |
| References    | `image_references` (identity), `start_image`, `end_image`, video and audio references |
| Audio         | `generate_audio` — we set **false** (the site is silent by default)                   |
| Aspect ratios | 16:9, 9:16, 21:9, 4:3, 1:1, 3:4, auto                                                 |
| Your balance  | **9.76 credits, free plan**                                                           |

> ⚠️ **Credits:** four 1080p clips plus avatar stills will very likely cost more than 9.76 credits. Before generating anything I will request an exact quote from Higgsfield and show you the total. **No credits are spent without your explicit approval.**
> Cost-saving option: Seedance 2.5 (also available) can make a 480p **draft** first and finalise only the approved take at 1080p.

### 5.2 Avatar pipeline ("keep my face exactly as it is")

AI video cannot guarantee a perfect likeness, so the pipeline is built to maximise it and to let you reject any take:

1. **Reference photos (from you — see §24).** 3–5 sharp, well-lit photos: front, ¾ left, ¾ right, neutral expression, face at least 600 px tall. The current site photo (899 × 676, face about 110 px tall) is too small to hold identity reliably.
2. **Avatar keyframe stills.** One still per scene generated with your photos as identity references: **face unchanged**; only body, outfit, styling, lighting and setting change. Outfit: black crew-neck tee or dark overshirt, dark trousers, minimal, no logos.
3. **Your approval of the stills** (cheap) before any video.
4. **Seedance 2.0 video** using the approved still as `start_image` plus your photos as `image_references`.
5. **Review gate:** any take where the face drifts is rejected and regenerated (re-rolls are quoted too).

### 5.3 Global generation settings

| Setting                       | Value                                                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Model / mode                  | `seedance_2_0`, `mode: "std"`                                                                                |
| Resolution / aspect           | 1080p, **16:9** masters (subject kept centred so a 9:16 crop works on phones)                                |
| Duration                      | 10 s (Hero Orbit), 12 s (Developer), 10 s (Next Chapter), 12 s (Project Showcase)                            |
| Audio                         | off                                                                                                          |
| Bitrate                       | `high` (cleaner when scrubbed)                                                                               |
| Genre hint                    | `drama` for avatar shots, `auto` for product                                                                 |
| Negative guidance (in prompt) | no text overlays, no logos, no watermarks, no extra people, no face distortion, no lens flares over the face |

### 5.4 Asset list

| ID    | Asset                                                | Type       | Used in                                            |
| ----- | ---------------------------------------------------- | ---------- | -------------------------------------------------- |
| A1–A3 | Avatar keyframe stills (studio, desk, corridor)      | image      | start frames for V1–V3, posters                    |
| V1    | **Hero Orbit**                                       | video 10 s | Hero background (loop)                             |
| V2    | **The Developer**                                    | video 12 s | Story → Featured Work transition (scroll-scrubbed) |
| V3    | **The Next Chapter**                                 | video 10 s | before the Final Call To Action (scroll-scrubbed)  |
| V4    | **Project Showcase** (phone)                         | video 12 s | Projects section (scroll-scrubbed)                 |
| P1–P4 | Poster frames (first frame of each video, AVIF/WebP) | image      | instant paint, reduced motion, slow networks       |

Post-processing (done by me, in code): trimmed, colour-matched, exported as H.264 MP4 + WebM, plus a **scrub-optimised** version (every frame a keyframe) for scroll-controlled clips, at 1080p (desktop) and 720p (mobile).

---

## 6. Three cinematic scenes

All three share: black void, emerald rim light (key from behind-left), subtle warm ember fill (front-right, low), 35 mm anamorphic look, shallow depth of field, slow movement, fine film grain, no text.

### Scene 1 — Hero Orbit (V1 · 10 s · loops)

**Story beat:** "This is who builds it." Calm, serious confidence.
**Shot:** Vatsal stands centred in a black-void studio, hands relaxed (one in pocket), looking just past the lens. The camera makes **one slow, continuous 360° orbit** at chest height. Emerald rim light traces his silhouette; a faint warm glow lifts the face. Subtle haze. He breathes, blinks, shifts weight once; no gestures, no smiling at camera.
**Loop:** the end frame matches the start frame (same angle), so the orbit loops seamlessly behind the hero text.
**Prompt (draft):**

> Cinematic 16:9 shot. A confident software developer [identity from references, face unchanged] stands still in an infinite black void studio, black crew-neck t-shirt, dark trousers. Emerald green rim light from behind outlines his shoulders and hair, a very subtle warm orange glow softly lights his face from the front right. The camera performs one slow, smooth, continuous 360-degree orbit around him at chest height, ending at the starting angle. Calm, focused, serious expression, natural breathing, minimal movement. Light haze, shallow depth of field, 35mm anamorphic lens, fine film grain, premium product-film look. No text, no logos, no extra people.

### Scene 2 — The Developer (V2 · 12 s · scroll-scrubbed)

**Story beat:** "This is how he works, and what he's learning."
**Shot:** Night. Vatsal sits at a dark desk, typing. Around him float semi-transparent holographic screens: a code editor (Java/Kotlin), **Android Studio** with a layout preview, a phone app interface, a terminal compiling, an Application Programming Interface (API) request/response flow. Two screens at the edge, in **warm ember tones**, show AI concepts he is exploring (a neural-network diagram, a training-loss curve, a notebook titled "learning"). The camera **slowly orbits**, then **pushes in over his shoulder** into the main monitor until the screen fills the frame. The final frame is a clean, dark app/dashboard interface that **match-cuts into the Featured Work section**.
**Prompt (draft):**

> Cinematic night scene, 16:9. A software developer [identity from references, face unchanged] sits at a dark minimalist desk typing on a laptop, lit by an emerald green rim light and the soft glow of screens. Floating semi-transparent holographic panels surround him: a code editor with Java code, Android Studio with a phone layout preview, a mobile app interface, a terminal compiling, and an API data flow diagram. At the edges, two panels glow warm orange showing a simple neural network diagram and a learning curve chart. The camera slowly orbits from the side, then pushes in over his shoulder into the main screen until a clean dark app dashboard fills the frame. Shallow depth of field, gentle bloom, fine film grain, calm and focused mood. No readable brand logos, no text overlays.

### Scene 3 — The Next Chapter (V3 · 10 s · scroll-scrubbed)

**Story beat:** "A developer growing into the future of AI."
**Shot:** A long dark cinematic corridor of glass panels. Vatsal walks toward camera at an unhurried pace. **Behind him** (emerald): screens with apps he has built, code compiling, a phone UI. **Ahead of him** (ember, brighter as he walks): abstract AI visuals — node graphs, data streams, a training curve. He stops, settles into a relaxed, confident stance, hands loose, slight look past the lens. Final frame holds still (used as the background of the Final Call To Action).
**Prompt (draft):**

> Cinematic 16:9 tracking shot. A software developer [identity from references, face unchanged] walks calmly toward the camera down a long dark corridor lined with glass screens. Behind him the screens glow emerald green with mobile app interfaces and code compiling; ahead of him the screens glow warm orange with abstract AI visuals, node graphs and flowing data. The camera slowly dollies backward as he walks, then he stops and settles into a relaxed, confident stance. Natural, grounded, not corporate. Light haze, reflections on a polished floor, shallow depth of field, anamorphic lens, fine film grain. No text, no logos.

### Bonus shot — Project Showcase (V4 · 12 s · scroll-scrubbed, no avatar)

1. A smartphone lies face-down on a dark desk under a single emerald strip light.
2. It **lifts and rotates** into the air, turning face-up.
3. **Lines of code stream** into the screen; interface components (app bar, cards, list, button) **snap together** into a complete Android app.
4. The app **launches** with a soft glow and scrolls smoothly; the phone settles, floating.

> Cinematic 16:9 macro product shot. A modern smartphone lies on a dark matte desk under a thin emerald light. It slowly lifts into the air and rotates to face the camera. Glowing lines of code stream into its screen, and mobile interface components — app bar, cards, list items, a button — snap together into a complete, clean dark-themed Android app. The app launches with a soft glow and scrolls smoothly. Black background, soft reflections, shallow depth of field, premium product film, fine grain. No logos, no readable brand names.

### Extra creative ideas (code-driven, no credits)

- **Android-style status bar navbar:** live London time, a "battery" that fills with scroll progress, signal bars as section indicators.
- **"Compile" Call To Action:** pressing _Start a conversation_ prints a 1-second fake build log (`✓ compiled · ✓ tests passed · ✓ ready`) before opening email.
- **Developer terminal easter egg:** press <kbd>`</kbd> to open a tiny terminal (`whoami`, `skills`, `learning`, `contact`, `cv`).
- **"Currently learning" log:** an honest, dated list of AI topics and courses — the clearest way to show AI as a journey (**[FILL IN]** topics and dates).
- **Activity transitions:** section changes borrow Android shared-element transitions (a card expands into the next section).

---

## 7. Website structure

| #   | Section                            | Anchor       | Purpose                                          | Media                    |
| --- | ---------------------------------- | ------------ | ------------------------------------------------ | ------------------------ |
| 0   | Navbar (status-bar style)          | —            | Navigation, progress                             | —                        |
| 1   | **Hero — "Built in front of you"** | `#home`      | Assemble, then introduce                         | Code animation → V1 loop |
| 2   | Animated stats strip               | `#stats`     | Instant credibility                              | Counters                 |
| 3   | Mission                            | `#mission`   | Why he builds                                    | Kinetic type             |
| 4   | Three pillars                      | `#pillars`   | What he does / is learning                       | Cards + skills           |
| 5   | Story                              | `#story`     | Career timeline + education + certificates       | Timeline                 |
| 6   | The Developer (film)               | `#developer` | Bridge into the work                             | V2 scrubbed              |
| 7   | Projects / What I build            | `#projects`  | Capabilities + project cards                     | V4 scrubbed              |
| 8   | Featured work                      | `#work`      | WhatsApp suite deep dive, GitHub, Stack Overflow | Live data                |
| 9   | The Next Chapter (film)            | `#next`      | AI as direction                                  | V3 scrubbed              |
| 10  | Final Call To Action               | `#contact`   | Contact                                          | V3 last frame            |
| 11  | Footer                             | —            | Links, credits                                   | —                        |
| —   | 404                                | —            | Lost visitors                                    | —                        |

Navbar links: **Work · Story · Skills · Learning · Contact** + **Résumé** button.

---

## 8. Hero section — "Built in front of you"

**Concept:** the visitor's scroll _builds_ the hero. Everything is real HTML and CSS (not video), so it is crisp, accessible and selectable.

**Sequence (desktop, pinned for about 250% of viewport height, scrubbed by scroll):**

| Scroll  | What happens                                                                                                                                                                                                                                                                                                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–10%   | Black screen, emerald hairline, label `// building the portfolio…`. A clean laptop **slides up into view** (3D perspective, soft emerald underglow).                                                                                                                                                                                                                                            |
| 10–60%  | A custom **cursor sprite** grabs interface pieces from the edges and **drags them onto the laptop screen**: a code block (`class Developer { … }`), two Android app screens, a primary button, a stat card, a skills card, a small **"AI · learning" chat panel** (ember). Each piece arrives with a **bouncy spring** (overshoot, squash, settle) and snaps to a grid with a tiny click flash. |
| 60–75%  | Pieces lock; the screen shows a mini version of the hero. Status text: `✓ build succeeded`.                                                                                                                                                                                                                                                                                                     |
| 75–100% | **Camera push:** the laptop scales up until its screen fills the viewport; the bezel and keyboard slide out of frame; the mini hero becomes the **full-screen hero** with V1 (Hero Orbit) fading in behind it.                                                                                                                                                                                  |

**Final hero (copy):**

- Label: `Software Developer · Android Developer · London`
- Headline (huge, two lines): **VATSAL / DHOLAKIYA**
- Line: **"I build software and Android apps that do real work — and I'm learning AI to build what comes next."**
- Buttons: **See my work** (→ `#work`) · **Download CV** · icons (GitHub, Stack Overflow, LinkedIn **[FILL IN]**, email)
- Status chip (emerald dot): **Open to opportunities**
- Scroll cue: `scroll to explore`

**Rules:** a "Skip intro" button is always visible; returning visitors in the same session start at the final hero; with reduced motion the final hero shows immediately; with JavaScript off the final hero is in the pre-rendered HTML.

---

## 9. Animated stats strip

A full-width band of large numbers that count up once, separated by thin emerald dividers, with a slow horizontal drift (marquee) on wide screens.

| Stat                                        | Value                             | Source             |
| ------------------------------------------- | --------------------------------- | ------------------ |
| Years building software                     | **4+**                            | You                |
| Manual messaging automated (client project) | **~90%**                          | You                |
| Certifications                              | **5**                             | Your certificates  |
| Stack Overflow reputation                   | **live** (fallback 563)           | Stack Exchange API |
| Stack Overflow answers                      | **live** (fallback **[FILL IN]**) | Stack Exchange API |
| Android apps shipped to Google Play         | **[FILL IN]**                     | You                |

Any stat left empty is hidden automatically. No invented numbers.

---

## 10. Mission section

Huge kinetic statement, revealed word by word as you scroll (words light up from ash to bone):

> **"Good software disappears into the work it does. I build the kind people stop noticing — because it just works. And I'm learning AI to make the next thing smarter."**

Small supporting line: _Based in London. Building since 2019. Currently exploring AI and Machine Learning._

---

## 11. Three pillars section

Three tall cards, side by side on desktop (stacked on mobile), each with an animated icon, a one-line promise, a short paragraph and real skills chips (tooltips show where each skill was used, as in v3).

| Pillar                                                | Promise                               | Body                                                                                                          | Chips (facts only)                                                                                                                       |
| ----------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Software Development**                              | "Software that removes busywork."     | Desktop and business software built from real requirements, delivered and handed over properly.               | Java, Python, SQL, PostgreSQL, MySQL, SQLite, Selenium, Git, Docker, requirements gathering                                              |
| **Android Development**                               | "Native apps, shipped to real users." | Native Android apps in Java and XML for small businesses, with REST API integration and Google Play releases. | Java, XML, Android SDK, Android Studio, Firebase, REST APIs, Google Play Store                                                           |
| **Learning AI** _(ember accent, label "In progress")_ | "Where I'm heading."                  | Studied AI and Machine Learning fundamentals in my MSc; now learning hands-on, step by step.                  | AI and Machine Learning fundamentals, MATLAB (data analysis), **[FILL IN] what you're learning now (e.g. Python for ML, a course name)** |

Networking & Security and Cloud skills appear as a compact "Also comfortable with" row under the pillars (Linux, Wireshark, Nmap, TCP/IP…, AWS, Azure, GCP — marked "Academic" where true).

---

## 12. Story section

A pinned horizontal timeline on desktop (vertical on mobile). Each chapter is a full-height panel with a huge year, a title and two lines.

| Year          | Chapter                                                          | Copy                                                                                                                                      |
| ------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **[FILL IN]** | BSc Information Technology, Ganpat University                    | "Where it started: my first Android apps, in Java."                                                                                       |
| 2019          | Freelance Software Developer                                     | "A WhatsApp automation tool for small retailers — around 90% of their manual messaging, gone." _(dates hidden on the card, as you asked)_ |
| 2020          | Android Developer, CodeCreator Technologies                      | "Native apps for small businesses, from layout to Play Store release."                                                                    |
| 2022          | MSc Cloud Computing, University of East London — **Distinction** | "Cloud, security, AI and Machine Learning fundamentals."                                                                                  |
| 2024          | Software Developer, Made Tech IT                                 | "Building client software from requirements to handover."                                                                                 |
| Now           | Learning AI                                                      | "Exploring AI and Machine Learning, one project at a time."                                                                               |

Below the timeline: a horizontal strip of the **5 certificate cards** (click → full certificate in an accessible dialog, credential link).

> Please confirm MSc dates: your CV says 2023 – 2024, your last brief said 2022 – 2023.

---

## 13. Projects / What I build section

Opens with **V4 Project Showcase** (scroll-scrubbed: the phone lifts, the app assembles, launches). Then **"What I build"** — three capability rows (not "services for hire", no consultancy language):

1. **Business automation software** — desktop tools that remove repetitive work.
2. **Native Android apps** — responsive, Play-Store-ready, API-connected.
3. **Client software, end to end** — requirements, build, testing, handover.

Then project cards:

- **Android Applications (University)** — **[FILL IN]** app names, one-line descriptions, GitHub links.
- **Personal Portfolio** — this site (React, TypeScript, GSAP, Seedance-generated films) — GitHub link.
- **[FILL IN]** any other project you want shown.

---

## 14. Featured work section

**WhatsApp Business Automation Suite** as a cinematic case study:

- Full-width title, "Private client project" badge (no code link).
- **Problem → Build → Result** in three short panels.
- Key features (7, from your notes) revealed as a staggered list with icons.
- Big **~90%** counter.
- Tech: Java, NetBeans, Selenium, SQLite, MySQL, Firebase, XML, HTML.

Followed by **Latest on GitHub** (live, non-fork repositories, 1-hour cache, fallback list) and the **Stack Overflow** card (live reputation and badges, fallback values).

---

## 15. Final Call To Action section

Background: **V3 last frame** (Vatsal in his relaxed stance, ember glow ahead).

- Kinetic headline: **"Let's build what's next."**
- Line: "Open to software development, Android and AI-focused roles. Based in London, open to relocation."
- Big email (copy button + "Copied!" toast), **Start a conversation** button (the "Compile" micro-interaction, then `mailto:` with subject "Hello Vatsal"), **Download CV**.
- Work preferences card: Based in London · Open to relocation · Visa sponsorship required.

---

## 16. Footer

Oversized outlined wordmark **DHOLAKIYA** (cut off at the bottom edge), "Designed & built by Vatsal Dholakiya · {year}", social icons, live London time, "Back to top".

---

## 17. Complete visual style guide

### Colour tokens (contrast checked against WCAG — Web Content Accessibility Guidelines — AA)

| Token                  | Hex                      | Use                                                   | Contrast on Void |
| ---------------------- | ------------------------ | ----------------------------------------------------- | ---------------- |
| `--void`               | `#050607`                | Page background                                       | —                |
| `--carbon`             | `#0B0E0D`                | Cards, navbar                                         | —                |
| `--graphite`           | `#131816`                | Raised / hover surfaces                               | —                |
| `--line`               | `rgba(237,238,233,0.08)` | Borders                                               | —                |
| `--bone`               | `#EDEEE9`                | Headings, primary text                                | 17.4 : 1         |
| `--mist`               | `#B9C0BC`                | Body text                                             | 10.9 : 1         |
| `--ash`                | `#8A938E`                | Labels, meta (lowest on Graphite: 5.7 : 1)            | 6.4 : 1          |
| `--emerald`            | `#2EE6A6`                | Primary accent, links, focus ring                     | 12.5 : 1         |
| `--ember`              | `#FF8A3D`                | Warm accent — AI / future only, max 3 uses per screen | 8.6 : 1          |
| Button text on emerald | `#050607`                | Primary buttons                                       | 12.5 : 1         |

Signature gradient (sparingly: hero name highlight, timeline line, active underline): `linear-gradient(120deg, #2EE6A6 0%, #B8F5DD 45%, #FF8A3D 100%)`.
No pure white, no pure black.

### Surfaces and effects

- Card radius 16 px, 1 px `--line` border, 1 px inner top highlight.
- **Film grain:** animated noise overlay (canvas or SVG), opacity 5–7%, `mix-blend-mode: overlay`, frozen with reduced motion.
- **Vignette** on film sections; **emerald bloom** behind focal elements (radial gradients, no blur filters on scroll).
- Grid: 12 columns, max content width 1280 px, gutters 24 px (mobile 16–20 px).
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 px.

---

## 18. Typography

| Role                        | Typeface (Google Fonts)       | Weights  | Notes                                                    |
| --------------------------- | ----------------------------- | -------- | -------------------------------------------------------- |
| Display (huge kinetic type) | **Geist**                     | 600, 800 | Tracking −4% to −6% at large sizes                       |
| Accent (emotional words)    | **Instrument Serif** _Italic_ | 400      | One or two words per heading, e.g. "build what's _next_" |
| Body                        | **Geist**                     | 400, 500 | 17–18 px, line-height 1.65                               |
| Labels, code, numbers       | **Geist Mono**                | 400, 500 | Uppercase labels, +8% tracking                           |

Fluid scale (clamp): hero name `clamp(4rem, 16vw, 15rem)` · section titles `clamp(2.75rem, 8vw, 7.5rem)` · statement `clamp(2rem, 5vw, 4.5rem)` · body `1.0625–1.125rem` · label `0.75rem`.
Metric-matched fallback fonts to prevent layout shift (same method as v3).

---

## 19. Animation direction

**Principles:** one strong idea per section; motion explains structure; nothing loops for attention except the hero film and grain.
**Easing:** `expo.out` / `cubic-bezier(0.16, 1, 0.3, 1)` for reveals; springs (stiffness 380, damping 22) for the bouncy hero pieces; `none` for scroll-scrubbed timelines.
**Durations:** micro 0.2–0.3 s · reveals 0.6–0.9 s · scene transitions scroll-linked.

| Element             | Animation                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Hero assembly       | Scroll-scrubbed GSAP timeline; spring overshoot per piece; cursor path follows Bézier curves              |
| Huge headings       | SplitText: characters rise from a mask with stagger 0.02 s; on hover, letters gently push apart (desktop) |
| Mission statement   | Word-by-word colour fill tied to scroll                                                                   |
| Stats               | Count-up once + slow marquee drift                                                                        |
| Pillars             | Cards rise in sequence; icons draw in; Learning AI card has a soft ember "pulse"                          |
| Story               | Pinned horizontal scroll; year numbers parallax at 0.6×                                                   |
| Films               | Scroll-scrubbed with smoothing (lerp 0.1) so playback never stutters                                      |
| Section transitions | Clip-path wipes (inset) and a brief grain flash, like a film cut                                          |
| Buttons             | Magnetic pull + fill sweep on hover                                                                       |

Only `transform`, `opacity` and `clip-path` are animated. Video frames are painted by the browser's video decoder (no layout work).

---

## 20. Interaction design

- **Custom cursor (desktop):** small emerald dot; grows into a ring with a label over interactive things ("View", "Drag", "Open", "Copy").
- **Magnetic buttons**, **3D tilt cards** (max 6°), **cursor-following border glow** (from v3).
- **Skill chips:** tooltip shows where each skill was used (hover, tap, keyboard).
- **Certificate dialog:** focus trapped, Escape and backdrop close, scroll position kept.
- **Copy email** with "Copied!" toast; **Compile** micro-interaction on the main Call To Action.
- **Terminal easter egg** (<kbd>`</kbd>), fully keyboard accessible, Escape closes.
- **Sound:** off. (Optional later: a muted-by-default ambient toggle.)
- Every interaction has a keyboard path and a visible emerald focus ring.

---

## 21. Scroll behaviour

- **Lenis** smooth scrolling (lerp 0.08) synced with **GSAP ScrollTrigger** on one shared clock.
- Pinned scenes: Hero assembly (~250 vh), The Developer (~200 vh), Project Showcase (~200 vh), Story (horizontal, length of content), Next Chapter (~150 vh).
- Scrubbed video: `video.currentTime` follows the scroll progress through a smoothed value; clips encoded with every frame as a keyframe so seeking is instant.
- Anchors, direct links (`/#work`), browser back/forward and the navbar all work with pinned sections (ScrollTrigger-aware offsets).
- Navbar hides on scroll down and returns on scroll up; the "battery" shows overall progress.
- Respect `prefers-reduced-motion`: no pinning, no scrubbing, no smooth scroll; films replaced by poster frames; all content visible immediately.

---

## 22. Mobile behaviour

- **Hero:** the laptop becomes a **phone** (fits the Android story); fewer pieces (code block, app screen, button, AI chip); pin length 160 vh; push-in into the phone screen.
- **Films:** 720p versions; Hero Orbit autoplays muted inline as a loop; scrubbed films become **tap-to-play** cards with posters on low-power or data-saver devices (`navigator.connection.saveData`) and play inline otherwise.
- **Story** becomes a vertical timeline; pillars stack; stats become a 2 × 3 grid.
- Huge type still huge: hero name fills the width (`16vw`).
- Touch: no cursor effects, no tilt, no magnetic; tap targets ≥ 44 px; tooltips open on tap.
- Tested at 320, 375, 414, 768, 1024, 1280, 1440, 1920 px; no horizontal scroll.

---

## 23. Technical implementation

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind CSS · **GSAP 3 with ScrollTrigger and SplitText** (scroll storytelling) · Lenis · Framer Motion (small UI only) · lucide-react · ESLint + Prettier · Playwright.
GSAP is now fully free including its plugins, so no licence cost.

**Architecture (kept from v3):** all content in `src/data/content.ts` (new sections added); pre-rendered HTML; code-split sections; SEO tags, JSON-LD, robots.txt and sitemap generated from content; `vercel.json` deployment; 404 page; Playwright end-to-end tests.

**New modules**

```
src/components/hero/        HeroAssembly (desktop laptop / mobile phone), DraggablePiece, CursorSprite, FinalHero
src/components/film/        ScrubVideo (scroll-controlled), LoopVideo, FilmSection, Grain
src/components/sections/    StatsStrip, Mission, Pillars, Story, WhatIBuild, FeaturedWork, NextChapter, FinalCta, Footer
src/components/extras/      StatusBarNav, Terminal, CompileButton, Cursor
src/lib/scroll.ts           Lenis + ScrollTrigger integration
public/media/               v1-orbit.{mp4,webm}, v2-developer-scrub.mp4, … , posters/*.avif
```

**Video delivery:** H.264 MP4 + WebM, 1080p desktop / 720p mobile, loaded only when a section is within one viewport; posters first; `preload="metadata"`; total film weight target ≤ 25 MB desktop, ≤ 10 MB mobile (lazy, never blocking first paint).

**Performance targets:** Lighthouse mobile Performance ≥ 90 (the hero's first paint is text, not video), Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95; Largest Contentful Paint < 2.5 s; Cumulative Layout Shift < 0.05; 60 frames per second during scrubbing on a mid-range laptop.

**Quality gates before handover:** zero TypeScript/ESLint errors; zero console errors or warnings; Playwright tests (navigation, links, dialogs, reduced motion, no horizontal scroll, 404, film fallbacks); screenshots at all 8 widths; manual check in Chrome; Safari and Firefox via `ALL_BROWSERS=1 npm test` on your machine.

**Build order (after approval)**

1. Design system: tokens, fonts, grain, cursor, navbar.
2. Hero assembly (code) + final hero with poster.
3. Stats, Mission, Pillars, Story, What I build, Featured work, Final Call To Action, Footer (all with poster placeholders).
4. Avatar stills → your approval → videos (with your credit approval) → encode → wire in.
5. Tests, performance pass, preview link, push.

Steps 1–3 need **no credits**, so the full site can be reviewed before any video is generated.

---

## 24. What I need from you

| #   | Item                                                                                       | Why                               |
| --- | ------------------------------------------------------------------------------------------ | --------------------------------- |
| 1   | **3–5 clear photos of your face** (front, ¾ left, ¾ right; good light; face ≥ 600 px tall) | Reliable likeness in the films    |
| 2   | **Credit approval** after I show the exact Higgsfield quote (your balance: 9.76 credits)   | Video generation                  |
| 3   | LinkedIn URL                                                                               | Links                             |
| 4   | Number of Android apps you shipped to Google Play (or "skip")                              | Stats strip                       |
| 5   | What you are learning in AI right now (topics, courses, dates)                             | Learning AI pillar + learning log |
| 6   | University Android apps: names, one line each, GitHub links (optional)                     | Projects                          |
| 7   | MSc dates (2022 – 2023 or 2023 – 2024?) and BSc start year                                 | Story                             |
| 8   | Your domain (or use the Vercel address)                                                    | SEO                               |
