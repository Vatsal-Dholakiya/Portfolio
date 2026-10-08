/**
 * ============================================================================
 *  ALL SITE CONTENT LIVES IN THIS FILE  (v4 — cinematic edition)
 * ============================================================================
 *  Edit text, links, dates, skills, projects, certificates and films here only.
 *  Components read everything from this file; nothing is hard-coded in them.
 *
 *  Rules
 *  - Leave any optional field as '' (or an empty list) to hide it on the site.
 *  - Paths that start with "/" point to files in the public/ folder.
 *  - Items marked  FILL IN  are still waiting for your details.
 *  - AI is described only as a learning focus and future direction.
 * ============================================================================
 */

/* ------------------------------------------------------------------ Types */

export type IconName =
  'android' | 'monitor' | 'code' | 'database' | 'git' | 'cloud' | 'brain' | 'shield' | 'smartphone' | 'palette' | 'workflow' | 'terminal'

export interface Skill {
  name: string
  /** Optional long form of an abbreviation, shown in the tooltip */
  full?: string
  /** Where the skill was used, shown in the tooltip */
  usedAt: string[]
}

export interface Stat {
  /** Numeric value counts up; use `text` for non-numeric values */
  value?: number
  prefix?: string
  suffix?: string
  label: string
  /** 'stackoverflow-reputation' is replaced by the live value from the Stack Exchange API */
  live?: 'stackoverflow-reputation'
}

export interface Chapter {
  year: string
  title: string
  place: string
  text: string
  /** Optional highlighted badge, e.g. 'Distinction' */
  badge?: string
}

export interface Project {
  id: string
  title: string
  summary: string
  tags: string[]
  /** Leave '' to hide */
  github: string
  /** Leave '' to hide */
  live: string
  /** Optional list of sub-items, e.g. individual university apps */
  items?: { name: string; description: string; github: string }[]
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  icon: IconName
  /** e.g. '/certificates/ethical-hacking.webp'; leave '' if there is no image */
  image: string
  /** Credential URL; leave '' to hide the "View Credential" button */
  credential: string
}

export interface Repo {
  name: string
  description: string
  language: string | null
  stars: number
  updated: string
  url: string
}

export interface StackOverflowStats {
  reputation: number
  gold: number
  silver: number
  bronze: number
}

/** A generated film. Leave `src` as '' to use the built-in animated code scene instead. */
export interface Film {
  /** MP4 (H.264) path, e.g. '/media/v1-orbit.mp4' */
  src: string
  /** Optional WebM version */
  webm: string
  /** Optional smaller version for phones */
  mobileSrc: string
  /** First-frame image shown before the video loads */
  poster: string
  /** Describes the film for screen readers */
  alt: string
}

/* ------------------------------------------------------------------ Site */

export const site = {
  /** FILL IN: your live domain without a trailing slash, e.g. 'https://vatsaldholakiya.com'.
   *  Used for the canonical URL, social previews and sitemap.xml. Leave '' until you have one. */
  url: '',
  title: 'Vatsal Dholakiya — Software Developer & Android Developer',
  description:
    'Vatsal Dholakiya is a London-based Software Developer and Android Developer who builds software that does real work, and is currently exploring Artificial Intelligence.',
  ogImage: '/og-image.png',
  ogImageAlt: 'Vatsal Dholakiya, Software Developer and Android Developer',
  locale: 'en_GB',
}

/* ---------------------------------------------------------------- Person */

export const person = {
  firstName: 'Vatsal',
  lastName: 'Dholakiya',
  initials: 'VD',
  jobTitle: 'Software Developer',
  roleLine: 'Software Developer · Android Developer · Exploring AI',
  location: 'London, United Kingdom',
  timeZone: 'Europe/London',
  links: {
    email: 'vatsal.dholakiya2000@gmail.com',
    github: 'https://github.com/Vatsal-Dholakiya',
    githubRepos: 'https://github.com/Vatsal-Dholakiya?tab=repositories',
    stackoverflow: 'https://stackoverflow.com/users/12660050/vatsal-dholakiya',
    /** FILL IN: e.g. 'https://www.linkedin.com/in/your-name' — hidden everywhere while empty */
    linkedin: '',
    cv: '/cv.pdf',
  },
}

/* ------------------------------------------------------------ Navigation */

export const nav = {
  links: [
    { id: 'work', label: 'Work' },
    { id: 'story', label: 'Story' },
    { id: 'pillars', label: 'Skills' },
    { id: 'next', label: 'Learning' },
    { id: 'contact', label: 'Contact' },
  ],
  resumeLabel: 'Résumé',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  menuLabel: 'Menu',
  homeLabel: 'Vatsal Dholakiya, back to top',
  skipLink: 'Skip to content',
  progressLabel: 'Page progress',
}

/* ------------------------------------------------------------------ Films */

export const films: Record<'orbit' | 'developer' | 'nextChapter' | 'showcase', Film> = {
  /** V1 Hero Orbit — loops behind the hero */
  orbit: {
    src: '',
    webm: '',
    mobileSrc: '',
    poster: '',
    alt: 'Vatsal standing in a dark studio lit by emerald light as the camera circles him.',
  },
  /** V2 The Developer — scrubbed by scroll */
  developer: {
    src: '',
    webm: '',
    mobileSrc: '',
    poster: '',
    alt: 'Vatsal working at a desk at night, surrounded by floating screens of code, Android Studio and app interfaces.',
  },
  /** V3 The Next Chapter — scrubbed by scroll */
  nextChapter: {
    src: '',
    webm: '',
    mobileSrc: '',
    poster: '',
    alt: 'Vatsal walking down a dark corridor of screens: apps and code behind him, AI visuals ahead.',
  },
  /** V4 Project Showcase — scrubbed by scroll */
  showcase: {
    src: '',
    webm: '',
    mobileSrc: '',
    poster: '',
    alt: 'A smartphone lifts from a desk as code streams in and an Android app assembles and launches.',
  },
}

/* ------------------------------------------------------------------ Hero */

export const hero = {
  buildLabel: '// building the portfolio',
  scrollHint: 'Scroll to build',
  skipIntro: 'Skip intro',
  buildDone: 'build succeeded',
  kicker: 'Software Developer · Android Developer · London',
  line: "I build software and Android apps that do real work — and I'm learning AI to build what comes next.",
  primaryCta: 'See my work',
  secondaryCta: 'Download CV',
  availability: 'Open to opportunities',
  scrollCue: 'Scroll to explore',
  /** Text shown inside the pieces dragged onto the laptop screen */
  pieces: {
    code: ['public class Developer {', '  String focus = "Android";', '  void build() { ship(); }', '}'],
    button: 'Ship it',
    stat: { value: '~90%', label: 'messaging automated' },
    skills: ['Java', 'Android', 'SQL', 'Git'],
    chat: { title: 'AI · learning', question: 'What should I learn next?', answer: 'Model basics → small projects.' },
    appTitle: 'Orders',
  },
}

/* ----------------------------------------------------------------- Stats */

export const stats = {
  label: 'In numbers',
  items: [
    { value: 4, suffix: '+', label: 'Years building software' },
    { value: 90, prefix: '~', suffix: '%', label: 'Manual messaging automated for a client' },
    { value: 5, label: 'Certifications' },
    { value: 563, label: 'Stack Overflow reputation', live: 'stackoverflow-reputation' },
    { value: 47, label: 'Stack Overflow answers' },
    /** FILL IN: number of Android apps you shipped to Google Play — hidden while value is undefined */
    { label: 'Android apps on Google Play' },
  ] as Stat[],
}

/* --------------------------------------------------------------- Mission */

export const mission = {
  label: 'Mission',
  statement:
    'Good software disappears into the work it does. I build the kind people stop noticing — because it just works. And I am learning AI to make the next thing smarter.',
  /** Words rendered in the serif italic accent */
  accentWords: ['disappears', 'works.', 'smarter.'],
  support: 'Based in London. Building since 2019. Currently exploring AI and Machine Learning.',
}

/* --------------------------------------------------------------- Pillars */

const uni = 'University'
const cc = 'CodeCreator Technologies'
const freelance = 'Freelance'
const mtit = 'Made Tech IT'
const masters = "Master's degree"

export const pillars = {
  label: 'What I do',
  title: 'Three things, done properly.',
  usedAtLabel: 'Used at',
  hint: 'Hover or tap a skill to see where I used it.',
  items: [
    {
      id: 'software',
      title: 'Software Development',
      icon: 'monitor',
      promise: 'Software that removes busywork.',
      body: 'Desktop and business software built from real requirements, then delivered and handed over properly.',
      skills: [
        { name: 'Java', usedAt: [uni, cc, freelance] },
        { name: 'Python', usedAt: [uni] },
        { name: 'SQL', full: 'Structured Query Language', usedAt: [uni, freelance] },
        { name: 'PostgreSQL', usedAt: [uni, freelance] },
        { name: 'MySQL', usedAt: [uni, freelance] },
        { name: 'SQLite', usedAt: [uni, freelance] },
        { name: 'Selenium automation', usedAt: [freelance] },
        { name: 'Git & GitHub', usedAt: [uni, cc, freelance] },
        { name: 'Docker', usedAt: ['Projects'] },
        { name: 'Requirements gathering', usedAt: [mtit] },
      ],
    },
    {
      id: 'android',
      title: 'Android Development',
      icon: 'android',
      promise: 'Native apps, shipped to real users.',
      body: 'Native Android apps in Java and XML for small businesses, connected to REST APIs and released on Google Play.',
      skills: [
        { name: 'Java', usedAt: [uni, cc] },
        { name: 'XML layouts', full: 'Extensible Markup Language', usedAt: [uni, cc] },
        { name: 'Android SDK', full: 'Software Development Kit', usedAt: [uni, cc] },
        { name: 'Android Studio', usedAt: [uni, cc] },
        { name: 'Responsive UI', full: 'User Interface design for multiple screen sizes and densities', usedAt: [cc] },
        { name: 'Firebase', full: 'Realtime Database and Authentication', usedAt: [uni] },
        { name: 'REST APIs', full: 'Representational State Transfer Application Programming Interfaces', usedAt: [cc] },
        { name: 'Google Play releases', usedAt: [cc] },
      ],
    },
    {
      id: 'ai',
      title: 'Learning AI',
      icon: 'brain',
      tag: 'In progress',
      promise: "Where I'm heading.",
      body: 'I studied AI and Machine Learning fundamentals during my MSc, and I am now learning hands-on, one small project at a time.',
      skills: [
        { name: 'AI & ML fundamentals', full: 'Artificial Intelligence and Machine Learning', usedAt: [masters] },
        { name: 'MATLAB data analysis', full: 'Matrix Laboratory', usedAt: [masters] },
        { name: 'Python', usedAt: [uni] },
      ],
    },
  ] as { id: string; title: string; icon: IconName; tag?: string; promise: string; body: string; skills: Skill[] }[],
  alsoTitle: 'Also comfortable with',
  also: [
    { name: 'Linux command line', usedAt: ['Self-taught', masters] },
    { name: 'Wireshark', full: 'Packet capture and analysis', usedAt: ['Ethical Hacking course', masters] },
    { name: 'Nmap', full: 'Network Mapper: network and port scanning', usedAt: ['Ethical Hacking course', masters] },
    { name: 'TCP/IP, DNS, HTTP/HTTPS, SSH', full: 'Core networking protocols', usedAt: [masters] },
    { name: 'AWS · Azure · GCP', full: 'Amazon Web Services, Microsoft Azure, Google Cloud Platform (academic)', usedAt: [masters] },
    { name: 'VMware · VirtualBox', usedAt: ['Coursework', 'Personal projects'] },
    { name: 'Windows Server · Active Directory', usedAt: ['Coursework', 'Personal projects'] },
  ] as Skill[],
}

/* ----------------------------------------------------------------- Story */

export const story = {
  label: 'Story',
  title: 'How I got here.',
  chapters: [
    {
      /** FILL IN: the year you started your BSc */
      year: 'BSc',
      title: 'BSc Information Technology',
      place: 'Ganpat University, Gujarat, India',
      text: 'Where it started: my first Android apps, written in Java. Completed 2020.',
    },
    {
      year: '2019',
      title: 'Freelance Software Developer',
      place: 'Self-employed, India',
      text: 'A WhatsApp automation tool for small retailers — around 90% of their manual messaging, gone.',
    },
    {
      year: '2020',
      title: 'Android Developer',
      place: 'CodeCreator Technologies, India',
      text: 'Native apps for small businesses, from first layout to Google Play release.',
    },
    {
      /** Your CV says 2023 – 2024; your brief said 2022 – 2023. Confirm and edit here. */
      year: '2022',
      title: 'MSc Cloud Computing',
      place: 'University of East London',
      text: 'Cloud platforms, security, and the fundamentals of AI and Machine Learning.',
      badge: 'Distinction',
    },
    {
      year: '2024',
      title: 'Software Developer',
      place: 'Made Tech IT, London',
      text: 'Client software from requirements to handover — built properly, explained clearly.',
    },
    {
      year: 'Now',
      title: 'Learning AI',
      place: 'Ongoing',
      text: 'Exploring AI and Machine Learning, one honest project at a time.',
    },
  ] as Chapter[],
  certificatesTitle: 'Certificates',
  viewCredential: 'View Credential',
  viewCertificate: 'View certificate',
  close: 'Close',
  /** Add a certificate by adding one entry here (and its image in public/certificates/) */
  certificates: [
    {
      title: 'Ethical Hacking',
      issuer: 'Great Learning Academy',
      date: 'February 2022',
      icon: 'shield',
      image: '/certificates/ethical-hacking.webp',
      credential: 'https://www.mygreatlearning.com/certificate/PEBXWXBY',
    },
    {
      title: 'Cloud Foundations',
      issuer: 'Great Learning Academy',
      date: 'July 2020',
      icon: 'cloud',
      image: '/certificates/cloud-foundations.webp',
      credential: 'https://www.mygreatlearning.com/certificate/HFFENWXA',
    },
    {
      title: 'Object-Oriented Programming in Java',
      issuer: 'Great Learning Academy',
      date: 'July 2021',
      icon: 'code',
      image: '/certificates/oop-java.webp',
      credential: 'https://www.mygreatlearning.com/certificate/HKOQRUKS',
    },
    {
      title: 'GitHub Tutorial for Beginners',
      issuer: 'Great Learning Academy',
      date: 'July 2021',
      icon: 'git',
      image: '/certificates/github.webp',
      credential: 'https://www.mygreatlearning.com/certificate/YNTHADPU',
    },
    {
      title: 'Introduction to UI/UX Design',
      issuer: 'Great Learning Academy',
      date: 'July 2021',
      icon: 'palette',
      image: '/certificates/ui-ux.webp',
      credential: 'https://www.mygreatlearning.com/certificate/XUMTKXBL',
    },
  ] as Certificate[],
}

/* ------------------------------------------------------ Developer (film) */

export const developer = {
  label: 'The Developer',
  title: 'Night shift. Real work.',
  text: 'Code editors, Android Studio, APIs, a terminal compiling — and a couple of screens for what I am learning next.',
  /** Labels on the floating screens of the built-in animated scene */
  panels: {
    editor: 'MainActivity.java',
    studio: 'Android Studio',
    terminal: 'terminal',
    api: 'GET /api/orders',
    ai: ['learning / neural-networks', 'learning / loss-curve'],
  },
}

/* --------------------------------------------------------- What I build */

export const whatIBuild = {
  label: 'Projects',
  title: 'What I build.',
  showcaseCaption: 'Code in. App out.',
  capabilities: [
    { icon: 'workflow', title: 'Business automation software', text: 'Desktop tools that take repetitive work off people’s plates.' },
    { icon: 'smartphone', title: 'Native Android apps', text: 'Responsive, API-connected and ready for Google Play.' },
    { icon: 'terminal', title: 'Client software, end to end', text: 'Requirements, build, testing and a proper handover.' },
  ] as { icon: IconName; title: string; text: string }[],
  sourceLabel: 'Source code',
  liveLabel: 'Live site',
  projects: [
    {
      id: 'android-university',
      title: 'Android Applications (University)',
      summary: 'Native Android applications built in Java during my degree, using Firebase for data and authentication.',
      tags: ['Java', 'XML', 'Android Studio', 'Firebase', 'Google Sign-In'],
      github: '',
      live: '',
      /** FILL IN: one entry per app, e.g. { name: 'App name', description: 'One line.', github: 'https://github.com/...' } */
      items: [],
    },
    {
      id: 'portfolio',
      title: 'This Portfolio',
      summary: 'A cinematic, scroll-driven portfolio with live GitHub and Stack Overflow data, built to be fast and accessible.',
      tags: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
      github: 'https://github.com/Vatsal-Dholakiya/Portfolio',
      live: '',
    },
  ] as Project[],
  /** The phone app assembled in the built-in showcase scene */
  phoneApp: { title: 'Orders', items: ['Gold chain · 22K', 'Anniversary offer', 'Bulk message · 1,200'], button: 'Send campaign' },
}

/* --------------------------------------------------------- Featured work */

export const featured = {
  id: 'whatsapp-suite',
  label: 'Featured work',
  title: 'WhatsApp Business Automation Suite',
  badge: 'Private client project',
  summary: 'A desktop application that lets small businesses such as jewellery shops reach thousands of customers in a single campaign.',
  impact: { value: 90, prefix: '~', suffix: '%', label: 'of manual messaging work automated' },
  steps: [
    {
      title: 'Problem',
      text: 'Shop staff were messaging customers one by one: slow, repetitive, and easy to get wrong.',
    },
    {
      title: 'Build',
      text: 'A Java desktop app that imports contacts, filters invalid numbers and sends personalised campaigns automatically.',
    },
    {
      title: 'Result',
      text: 'Around 90% of the manual messaging work automated, with birthday and anniversary offers running alongside campaigns.',
    },
  ],
  featuresLabel: 'Key features',
  features: [
    'Bulk messaging to thousands of contacts in a single campaign.',
    'Contact import directly from Excel files.',
    'Group Grabber: extracts contacts from WhatsApp groups.',
    'Number Filter: removes numbers not registered on WhatsApp before sending.',
    'Personalised messages that address each customer by name.',
    'Automated birthday and anniversary messages with occasion-based offers.',
    'Local storage in SQLite, synchronised to MySQL through APIs, with Firebase integration.',
  ],
  tags: ['Java', 'NetBeans', 'Selenium', 'SQLite', 'MySQL', 'Firebase', 'XML', 'HTML'],
}

/* ---------------------------------------------------------------- GitHub */

export const github = {
  title: 'Latest on GitHub',
  kicker: 'Live from the GitHub API',
  api: 'https://api.github.com/users/Vatsal-Dholakiya/repos?sort=updated&per_page=6',
  viewAll: 'View all on GitHub',
  updatedLabel: 'Updated',
  starsLabel: 'Stars',
  noDescription: 'No description provided.',
  errorMessage: "GitHub couldn't be reached just now, so a saved list is shown.",
  retry: 'Try again',
  loading: 'Loading repositories from GitHub',
  /** Hidden from the grid (e.g. the profile README repository) */
  hide: ['Vatsal-Dholakiya'],
  /** Used when a repository has no description on GitHub */
  descriptions: {
    Portfolio: 'Source code of this portfolio website.',
    'Sos-System': 'SOS emergency alert system.',
    sossystemandroid: 'SOS emergency alert system for Android.',
    navigation_drawer: 'Android navigation drawer implemented in Java.',
  } as Record<string, string>,
  /** Shown if the API request fails or is rate-limited */
  fallback: [
    {
      name: 'Portfolio',
      description: '',
      language: 'TypeScript',
      stars: 0,
      updated: '2026-10-07T00:00:00Z',
      url: 'https://github.com/Vatsal-Dholakiya/Portfolio',
    },
    {
      name: 'Sos-System',
      description: '',
      language: null,
      stars: 0,
      updated: '2021-05-12T12:34:11Z',
      url: 'https://github.com/Vatsal-Dholakiya/Sos-System',
    },
    {
      name: 'sossystemandroid',
      description: '',
      language: null,
      stars: 0,
      updated: '2021-05-09T08:25:14Z',
      url: 'https://github.com/Vatsal-Dholakiya/sossystemandroid',
    },
    {
      name: 'navigation_drawer',
      description: '',
      language: 'Java',
      stars: 0,
      updated: '2021-05-04T16:44:50Z',
      url: 'https://github.com/Vatsal-Dholakiya/navigation_drawer',
    },
  ] satisfies Repo[] as Repo[],
}

/* -------------------------------------------------------- Stack Overflow */

export const stackoverflow = {
  title: 'Stack Overflow',
  api: 'https://api.stackexchange.com/2.3/users/12660050?site=stackoverflow',
  caption: 'Answering Android and Java questions.',
  button: 'View profile',
  reputationLabel: 'Reputation',
  badgeLabels: { gold: 'Gold', silver: 'Silver', bronze: 'Bronze' },
  /** Shown if the API request fails; update occasionally */
  fallback: { reputation: 563, gold: 0, silver: 6, bronze: 20 } satisfies StackOverflowStats,
}

/* --------------------------------------------------------- Next chapter */

export const nextChapter = {
  label: 'The next chapter',
  title: 'Growing into AI.',
  text: 'I am a developer first. AI is what I am learning now — carefully, hands-on, and in public.',
  logTitle: 'Currently learning',
  /** FILL IN: what you are learning now. Each entry: topic, a short note, and a status. Empty list hides the log. */
  log: [
    { topic: 'AI & Machine Learning fundamentals', note: 'Covered during my MSc.', status: 'Studied' },
    { topic: '[FILL IN] Current topic or course', note: '[FILL IN] One line about what you are doing.', status: 'In progress' },
  ],
  /** Screens in the built-in corridor scene */
  behind: ['Android app', 'Desktop automation', 'BUILD SUCCESSFUL'],
  ahead: ['neural networks', 'training data', 'next: build with AI'],
}

/* ------------------------------------------------------------------ CTA */

export const contact = {
  label: 'Contact',
  heading: "Let's build what's next.",
  accentWord: 'next.',
  line: 'Open to software development, Android and AI-focused roles. Based in London, open to relocation.',
  copy: 'Copy',
  copied: 'Copied!',
  copyAria: 'Copy email address',
  cta: 'Start a conversation',
  compiling: ['compiling message…', 'tests passed', 'opening email'],
  mailSubject: 'Hello Vatsal',
  cvLabel: 'Download CV',
  preferencesTitle: 'Work preferences',
  preferences: ['Based in London, United Kingdom', 'Open to relocation', 'Visa sponsorship required'],
}

/* ---------------------------------------------------------------- Footer */

export const footer = {
  credit: 'Designed & built by Vatsal Dholakiya',
  backToTop: 'Back to top',
  localTime: 'London',
  terminalHint: 'Press ` for the terminal',
}

/* -------------------------------------------------------------- Terminal */

export const terminal = {
  title: 'vatsal@portfolio',
  welcome: 'Type help to see commands. Esc closes.',
  commands: {
    help: 'Commands: whoami, skills, learning, contact, cv, clear',
    whoami: 'Vatsal Dholakiya — Software Developer & Android Developer, London. Currently exploring AI.',
    skills: 'Java · Python · SQL · Android SDK · REST APIs · Selenium · Git · Docker',
    learning: 'AI and Machine Learning — learning hands-on, one project at a time.',
    contact: 'vatsal.dholakiya2000@gmail.com',
    cv: 'Opening CV…',
  } as Record<string, string>,
  unknown: 'Command not found. Type help.',
}

/* ------------------------------------------------------------------- 404 */

export const notFound = {
  title: "This page doesn't exist.",
  text: 'The link may be broken or the page may have moved.',
  button: 'Back to home',
}

/* ---------------------------------------------------------------- Helpers */

/** Prefixes a public/ path with the deploy base path (needed for GitHub Pages sub-paths). */
export const asset = (path: string) => (path.startsWith('/') ? `${__BASE__}${path.slice(1)}` : path)
