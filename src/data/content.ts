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
  /** Decimal places shown, e.g. 1 for 4.8 */
  decimals?: number
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
  /** Image size in pixels when it is not the usual landscape 1600 × 1131 */
  width?: number
  height?: number
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
  url: 'https://www.vatsaldholakiya.com',
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
    linkedin: 'https://www.linkedin.com/in/vatsal-dholakiya-0bba67182',
    cv: '/cv.pdf',
  },
}

/* ------------------------------------------------------------ Navigation */

export const nav = {
  links: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'learning', label: 'Learning' },
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

export const films: Record<'orbit' | 'developer' | 'nextChapter', Film> = {
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
}

/* ------------------------------------------------------------------ Hero */

export const hero = {
  kicker: 'Software Developer · Android Developer · London',
  line: "I build software and Android apps that do real work — and I'm learning AI to build what comes next.",
  primaryCta: 'See my work',
  secondaryCta: 'Download CV',
  availability: 'Open to opportunities',
  scrollCue: 'Scroll to explore',
  /** Code shown on the screens of the animated scenes */
  pieces: {
    code: ['public class Developer {', '  String focus = "Android";', '  void build() { ship(); }', '}'],
  },
}

/* ----------------------------------------------------- Build animation */

export const build = {
  label: '// Built in front of you',
  title: 'Code, screens and features, assembled piece by piece.',
  scrollHint: 'Scroll to build',
  buildDone: 'Build succeeded',
  /** Text inside the pieces dragged onto the screen */
  pieces: {
    button: 'Ship it',
    stat: { value: '10,000+', label: 'Messages a day' },
    skills: ['Java', 'Android', 'SQL', 'Git'],
    chat: { title: 'AI · Learning', question: 'What should I learn next?', answer: 'Generative AI, step by step.' },
    appTitle: 'Orders',
    secondApp: 'Customers',
  },
}

/* ----------------------------------------------------------------- Stats */

export const stats = {
  label: 'In numbers',
  items: [
    { value: 4, suffix: '+', label: 'Years building software' },
    { value: 10000, suffix: '+', label: 'WhatsApp messages sent a day by my automation tool' },
    { value: 5, label: 'Professional certifications' },
    { value: 563, label: 'Stack Overflow reputation', live: 'stackoverflow-reputation' },
    /** FILL IN: number of Android apps you shipped to Google Play — hidden while value is undefined */
    { label: 'Android apps on Google Play' },
  ] as Stat[],
}

/* ----------------------------------------------------------------- About */

export const about = {
  label: 'About',
  statement: 'I build software that removes busywork — desktop tools and mobile apps that businesses rely on every day.',
  /** Words rendered in the serif italic accent */
  accentWords: ['busywork'],
  paragraphs: [
    "I'm a Software Developer and Android Developer based in London. I built a WhatsApp automation tool that now sends more than 10,000 messages a day, and at CodeCreator Technologies I built PostFactory, a business card design app for Android.",
    'I hold an MSc in Cloud Computing with Distinction from the University of East London. I care about clean code, clear communication and software that keeps working long after handover. Right now I am learning Generative AI and the ethics of AI.',
  ],
}

/* ---------------------------------------------------------------- Skills */

const uni = 'University'
const cc = 'CodeCreator Technologies'
const freelance = 'Freelance'
const mtit = 'Made Tech IT Ltd'
const masters = "Master's degree"
const pf = 'PostFactory'

export const skills = {
  label: 'Skills',
  title: 'The tools I work with.',
  usedAtLabel: 'Used at',
  hint: 'Hover over or tap a skill to see where I have used it.',
  groups: [
    {
      title: 'Languages',
      icon: 'code',
      skills: [
        { name: 'Java', usedAt: [uni, cc, freelance, pf] },
        { name: 'Python', usedAt: [mtit, uni] },
        { name: 'SQL', full: 'Structured Query Language', usedAt: [mtit, uni, freelance, pf] },
        { name: 'PHP', full: 'Hypertext Preprocessor', usedAt: [pf] },
        { name: 'XML', full: 'Extensible Markup Language', usedAt: [uni, cc] },
        { name: 'HTML & CSS', full: 'HyperText Markup Language and Cascading Style Sheets', usedAt: [freelance, pf] },
      ],
    },
    {
      title: 'Mobile development',
      icon: 'smartphone',
      skills: [
        { name: 'Android SDK', full: 'Android Software Development Kit', usedAt: [uni, cc, pf] },
        { name: 'Android Studio', usedAt: [uni, cc, pf] },
        { name: 'Responsive UI', full: 'User interfaces for many screen sizes and densities', usedAt: [cc, pf] },
        { name: 'REST APIs', full: 'Representational State Transfer Application Programming Interfaces', usedAt: [mtit, cc, freelance] },
        { name: 'Google Sign-In', usedAt: [cc, uni] },
        { name: 'Google Play releases', usedAt: [cc] },
      ],
    },
    {
      title: 'Desktop and automation',
      icon: 'workflow',
      skills: [
        { name: 'Java desktop apps', usedAt: [freelance] },
        { name: 'NetBeans', usedAt: [freelance] },
        { name: 'Selenium', full: 'Browser automation', usedAt: [freelance] },
        { name: 'Excel data import', usedAt: [freelance] },
      ],
    },
    {
      title: 'Databases',
      icon: 'database',
      skills: [
        { name: 'MySQL', usedAt: [uni, freelance, pf] },
        { name: 'PostgreSQL', usedAt: [mtit, uni] },
        { name: 'SQLite', usedAt: [uni, freelance] },
        { name: 'Firebase', full: 'Realtime Database and Authentication', usedAt: [uni, freelance] },
      ],
    },
    {
      title: 'Tools and practices',
      icon: 'git',
      skills: [
        { name: 'Git & GitHub', usedAt: [mtit, cc, freelance, uni] },
        { name: 'Docker', usedAt: [mtit] },
        { name: 'UI/UX design', full: 'User interface and user experience design', usedAt: [pf, 'Great Learning certificate'] },
        { name: 'Requirements gathering', usedAt: [mtit, freelance] },
        { name: 'Testing on real devices', usedAt: [cc, pf] },
      ],
    },
    {
      title: 'Cloud and networking',
      icon: 'cloud',
      skills: [
        { name: 'AWS · Azure · GCP', full: 'Amazon Web Services, Microsoft Azure and Google Cloud Platform (academic)', usedAt: [masters] },
        { name: 'Linux command line', usedAt: [mtit, masters] },
        { name: 'TCP/IP, DNS, HTTP, SSH', full: 'Core networking protocols', usedAt: [masters] },
        { name: 'Wireshark', full: 'Packet capture and analysis', usedAt: ['Ethical Hacking course', masters] },
        { name: 'Nmap', full: 'Network Mapper: network and port scanning', usedAt: ['Ethical Hacking course', masters] },
        { name: 'VMware · VirtualBox', usedAt: ['Coursework'] },
      ],
    },
    {
      title: 'Learning: AI',
      icon: 'brain',
      tone: 'ember',
      tag: 'In progress',
      skills: [
        { name: 'Generative AI', usedAt: ['Learning now'] },
        { name: 'Ethics of AI', full: 'Fairness, transparency and responsible use of AI', usedAt: ['Learning now'] },
        { name: 'AI & ML fundamentals', full: 'Artificial Intelligence and Machine Learning', usedAt: [masters] },
        { name: 'MATLAB', full: 'Data analysis', usedAt: [masters] },
      ],
    },
  ] as { title: string; icon: IconName; tone?: 'ember'; tag?: string; skills: Skill[] }[],
}

/* ----------------------------------------------------------------- Story */

export const story = {
  label: 'Experience',
  title: 'Experience and education.',
  chapters: [
    {
      year: '2017',
      title: 'BSc Information Technology',
      place: 'Ganpat University, Gujarat, India · 2017 – 2020',
      text: 'Where it started: Java, Android Studio and the fundamentals of building apps. Graduated with a CGPA of 8.15.',
    },
    {
      year: '2019',
      title: 'Freelance Software Developer',
      place: 'Self-employed, India',
      text: 'Built a WhatsApp automation tool for small retailers. It now sends more than 10,000 messages a day.',
    },
    {
      year: '2020',
      title: 'Android Developer',
      place: 'CodeCreator Technologies, India · Aug 2020 – Nov 2022',
      text: 'Native Android apps for small businesses, built in a team, including PostFactory, a business card design app.',
    },
    {
      year: '2022',
      title: 'MSc Cloud Computing',
      place: 'University of East London · Sep 2022 – Sep 2023',
      text: 'Cloud platforms, security, and the fundamentals of AI and machine learning.',
      badge: 'Distinction',
    },
    {
      year: '2024',
      title: 'Software Developer',
      place: 'Made Tech IT Ltd, London · Oct 2024 – present',
      text: 'Client software in Java and Python with PostgreSQL, REST APIs, Git and Docker, from the business problem to delivery and handover.',
    },
    {
      year: 'Now',
      title: 'Learning AI',
      place: 'Ongoing',
      text: 'Learning Generative AI and the ethics of AI, one practical project at a time.',
    },
  ] as Chapter[],
  certificatesTitle: 'Certificates',
  viewCredential: 'View Credential',
  viewCertificate: 'View certificate',
  close: 'Close',
  /** Add a certificate by adding one entry here (and its image in public/certificates/) */
  certificates: [
    {
      title: 'MSc Cloud Computing, Pass with Distinction',
      issuer: 'University of East London',
      date: 'October 2023',
      icon: 'cloud',
      image: '/certificates/msc-cloud-computing.webp',
      credential: '',
      width: 1600,
      height: 1132,
    },
    {
      title: 'BSc Information Technology, CGPA 8.15',
      issuer: 'Ganpat University',
      date: 'December 2020',
      icon: 'code',
      image: '/certificates/bsc-information-technology.webp',
      credential: '',
      width: 1200,
      height: 1617,
    },
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

/* ------------------------------------------------------------ How I work */

export const process = {
  label: 'How I work',
  title: 'From first conversation to release.',
  text: 'Every project follows the same professional process, whether it is a small Android app or a business tool used every day.',
  steps: [
    {
      title: 'Understand the problem',
      text: 'I start by talking to the people who will use the software: what slows them down, what success looks like and what must never break. The result is a short, written list of requirements that everyone agrees on.',
    },
    {
      title: 'Plan and design',
      text: 'I sketch the screens and user journey, choose the architecture and database structure, and break the work into small tasks with clear priorities, so progress is visible from the first week.',
    },
    {
      title: 'Build in small steps',
      text: 'I write clean, readable code in small increments, using Git branches and meaningful commits. Each feature is shown to the client early, so feedback arrives while changes are still cheap.',
    },
    {
      title: 'Test thoroughly',
      text: 'I test every feature on real devices and different screen sizes, and check the difficult cases: invalid input, lost connections, large data sets and slow phones.',
    },
    {
      title: 'Release with care',
      text: 'I prepare signed release builds, publish to Google Play or deliver the desktop installer, and watch the first days of real use closely to catch anything unexpected.',
    },
    {
      title: 'Hand over and support',
      text: 'I document how the software works, show the team how to use it, and stay available for fixes and improvements after launch.',
    },
  ],
  /** Labels on the floating screens of the animated scene */
  panels: {
    editor: 'MainActivity.java',
    studio: 'Android Studio',
    terminal: 'Terminal',
    api: 'GET /api/orders',
    ai: ['Learning: neural networks', 'Learning: loss curve'],
  },
}

/* -------------------------------------------------------------- Projects */

export interface CaseStudy {
  id: string
  kind: string
  title: string
  tagline: string
  summary: string
  meta: { label: string; value: string }[]
  features: string[]
  impact: { value: string; label: string }[]
  result: string
  tags: string[]
  /** Which interface the animated illustration shows */
  visual: 'phone' | 'desktop'
  /** Real screenshots (public/projects/...). When present they replace the drawn illustration. First one leads. */
  images?: { src: string; alt: string; width: number; height: number }[]
}

export const projects = {
  label: 'Projects',
  title: 'Selected work.',
  intro: 'Two products I built for real businesses, followed by other work and my public code.',
  featuresLabel: 'Key features',
  impactLabel: 'Results',
  enlarge: 'View full size',
  close: 'Close',
  caseStudies: [
    {
      id: 'postfactory',
      kind: 'Mobile application',
      title: 'PostFactory',
      tagline: 'Business card design app for Android',
      summary:
        'PostFactory lets entrepreneurs, freelancers and professionals design modern business cards in minutes, without complex design software. Users choose from hundreds of professionally crafted templates for different industries, then customise fonts, colours, icons, backgrounds and layouts with a few taps.',
      meta: [
        { label: 'Built at', value: 'CodeCreator Technologies' },
        { label: 'Client', value: 'Mobile design platform for professionals' },
        { label: 'Duration', value: '8 months' },
      ],
      features: [
        'Hundreds of professionally crafted templates',
        'Industry-specific designs for many sectors',
        'Full customisation of fonts, colours, icons and backgrounds',
        'Intuitive drag-and-drop layout editor',
        'Real-time preview while editing',
        'Export as PNG, PDF or print-ready files',
        'Cloud storage for designs and templates',
      ],
      impact: [
        { value: 'Minutes', label: 'To design a card that used to take hours' },
        { value: '100s', label: 'Professionally crafted templates' },
        { value: '8 months', label: 'From first design to finished app' },
      ],
      result:
        'Built and delivered to the client as a complete Android app, cutting the time it takes to design a business card from hours to minutes.',
      tags: ['Java', 'Android', 'Android Studio', 'XML', 'PHP', 'MySQL', 'CSS', 'UI/UX'],
      visual: 'phone',
      images: [
        {
          src: '/projects/postfactory/home.webp',
          alt: 'PostFactory home screen with business categories such as My Business and Business Ethics, each with ready-made post templates.',
          width: 620,
          height: 1217,
        },
        {
          src: '/projects/postfactory/custom.webp',
          alt: 'PostFactory Custom screen showing a full-size template preview, with more designs below.',
          width: 620,
          height: 1217,
        },
      ],
    },
    {
      id: 'whatsapp-automation',
      kind: 'Desktop application',
      title: 'WhatsApp Business Automation',
      tagline: 'Bulk and one-to-one messaging for small businesses',
      summary:
        'A desktop application for bulk or one-to-one WhatsApp messaging. The left column manages recipients and attachments, the right column holds the message composer and sending history, and the toolbar gives quick access to import, group management, filtering and reports. One large Send button starts a campaign, and every result is saved automatically to the sending log.',
      meta: [
        { label: 'Client', value: 'Small retail businesses, such as jewellery shops' },
        { label: 'Type', value: 'Private client project' },
        { label: 'Platform', value: 'Windows desktop' },
      ],
      features: [
        'Bulk messaging with recipient management',
        'One-to-one messages, personalised with each customer’s name',
        'File attachments for images and documents',
        'Contact import from Excel and group management',
        'Number filter that removes contacts not on WhatsApp',
        'Message templates, birthday and anniversary offers',
        'Advanced filtering and reports',
        'Automatic sending log with detailed records',
      ],
      impact: [
        { value: '10,000+', label: 'Messages sent a day' },
        { value: '99.8%', label: 'Delivery rate' },
        { value: '90%', label: 'Less time spent on manual messaging' },
        { value: '400%', label: 'Improvement in communication efficiency' },
      ],
      result:
        'Deployed for small retailers, the system handles more than 10,000 messages a day with a 99.8% delivery rate, and cut manual messaging time by 90%.',
      tags: ['Java', 'NetBeans', 'Selenium', 'SQLite', 'MySQL', 'Firebase', 'REST APIs'],
      visual: 'desktop',
      images: [
        {
          src: '/projects/whatsapp/main-window.webp',
          alt: 'WhatsApp Automation main window: toolbar with Import, Group, Group Grabber, Number Filter and Report; recipient and attachment lists; message composer and sending log; Send button.',
          width: 1361,
          height: 687,
        },
        {
          src: '/projects/whatsapp/number-filter.webp',
          alt: 'Number Filter window: selected contacts are checked and sorted into WhatsApp and non-WhatsApp number lists.',
          width: 1128,
          height: 493,
        },
      ],
    },
  ] as CaseStudy[],
  moreTitle: 'More work',
  sourceLabel: 'Source code',
  liveLabel: 'Live site',
  more: [
    {
      id: 'android-business-apps',
      title: 'Android apps for small businesses',
      summary:
        'Native Android apps built in a team at CodeCreator Technologies, with responsive layouts, REST API integration and Google Play releases. These were client projects, so the code is private.',
      tags: ['Java', 'XML', 'Android Studio', 'Android SDK', 'REST APIs', 'Google Play'],
      github: '',
      live: '',
    },
    {
      id: 'portfolio',
      title: 'This portfolio',
      summary: 'A scroll-driven portfolio with live GitHub and Stack Overflow data, built to be fast, accessible and easy to update.',
      tags: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
      github: 'https://github.com/Vatsal-Dholakiya/Portfolio',
      live: '',
    },
  ] as Project[],
  /** Labels shown inside the animated app illustrations */
  phoneApp: { title: 'PostFactory', templates: ['Corporate', 'Tech', 'Creative', 'Personal'], button: 'Export PDF' },
  desktopApp: {
    title: 'WhatsApp Automation',
    toolbar: ['Import', 'Groups', 'Filter', 'Reports'],
    recipients: ['Priya Shah', 'Amit Patel', 'Neha Joshi', 'Ravi Mehta', 'Sneha Desai'],
    message: 'Hello {name}, our anniversary offer is live: 15% off all gold jewellery this week.',
    send: 'Send',
    log: 'Sending log',
  },
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
  /** What you are learning now. Each entry: topic, a short note, and a status. Empty list hides the log. */
  log: [
    { topic: 'AI and machine learning fundamentals', note: 'Covered during my MSc.', status: 'Studied' },
    { topic: 'Generative AI', note: 'How generative models work and how to build with them.', status: 'In progress' },
    {
      topic: 'Ethics of AI',
      note: 'Course: Building and Implementing Ethical AI, Certified Institute for Technology and AI.',
      status: 'In progress',
    },
  ],
  /** Screens in the built-in corridor scene */
  behind: ['Android app', 'Desktop automation', 'Build successful'],
  ahead: ['Neural networks', 'Training data', 'Next: building with AI'],
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
  compiling: ['Compiling message…', 'Tests passed', 'Opening email'],
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
}

/* -------------------------------------------------------------- Terminal */

export const terminal = {
  title: 'vatsal@portfolio',
  welcome: 'Type help to see commands. Esc closes.',
  commands: {
    help: 'Commands: whoami, skills, learning, contact, cv, clear',
    whoami: 'Vatsal Dholakiya — Software Developer & Android Developer, London. Currently exploring AI.',
    skills: 'Java · Python · SQL · Android SDK · REST APIs · Selenium · Git · Docker',
    learning: 'Learning now: Generative AI and Ethics of AI — hands-on, one project at a time.',
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
