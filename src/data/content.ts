/**
 * ============================================================================
 *  ALL SITE CONTENT LIVES IN THIS FILE.
 * ============================================================================
 *  Edit text, links, dates, skills, projects and certificates here only.
 *  Components read everything from this file; nothing is hard-coded in them.
 *
 *  Rules
 *  - Leave any optional field as '' (empty string) to hide it on the site.
 *    Example: linkedin: '' hides every LinkedIn icon and link.
 *  - Paths that start with "/" point to files in the public/ folder.
 *  - Items marked  FILL IN  are still waiting for your details.
 * ============================================================================
 */

/* ------------------------------------------------------------------ Types */

export type IconName = 'android' | 'monitor' | 'code' | 'database' | 'git' | 'cloud' | 'brain' | 'shield' | 'cpu' | 'smartphone' | 'palette'

export interface Skill {
  name: string
  /** Optional long form of an abbreviation, shown in the tooltip */
  full?: string
  /** Where the skill was used, shown in the tooltip */
  usedAt: string[]
}

export interface SkillCategory {
  title: string
  icon: IconName
  /** Optional small label on the card, e.g. "Academic" */
  label?: string
  skills: Skill[]
}

export interface Role {
  title: string
  company: string
  location: string
  /** Leave '' to hide the dates for this role */
  period: string
  current?: boolean
  points: string[]
  tags: string[]
  /** Optional in-page link to a project, e.g. { label: 'See project', projectId: 'whatsapp-suite' } */
  projectLink?: { label: string; projectId: string }
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
  /** Shown instead of a code link, e.g. for client work */
  privateLabel?: string
  /** Bullet list shown in the expandable "Key Features" panel (featured project) */
  features?: string[]
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

export interface Degree {
  degree: string
  school: string
  location: string
  /** Leave '' to hide */
  years: string
  /** Shown as a gradient badge; leave '' to hide */
  award: string
  modules: string[]
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

/* ------------------------------------------------------------------ Site */

export const site = {
  /** FILL IN: your live domain without a trailing slash, e.g. 'https://vatsaldholakiya.com'.
   *  Used for the canonical URL, social previews and sitemap.xml. Leave '' until you have one. */
  url: '',
  title: 'Vatsal Dholakiya — Software Developer & Android Developer',
  description:
    'Vatsal Dholakiya is a London-based Software Developer and Android Developer with an MSc in Cloud Computing (Distinction), building software that automates real business work.',
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
  location: 'London, United Kingdom',
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
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ],
  resumeLabel: 'Resume',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  menuLabel: 'Menu',
  homeLabel: 'Vatsal Dholakiya, back to top',
  skipLink: 'Skip to content',
}

/* ------------------------------------------------------------------ Hero */

export const hero = {
  greeting: 'Hi, my name is',
  roles: ['Software Developer', 'Android Developer', 'Cloud & AI Enthusiast'],
  intro:
    "I build Android applications and desktop software that automate real business work, and I'm now growing my skills in Artificial Intelligence and Machine Learning.",
  primaryCta: 'View My Work',
  secondaryCta: 'Download CV',
  availability: 'Open to opportunities',
  scrollLabel: 'Scroll to About',
}

/* ----------------------------------------------------------------- About */

export const about = {
  title: 'About me',
  paragraphs: [
    "I'm a London-based Software Developer with a Master of Science in Cloud Computing, awarded with Distinction by the University of East London, and a Bachelor of Science in Information Technology from Ganpat University, Gujarat, India.",
    'My path into software began with Android development in Java during my degree, which led to building production Android applications for small businesses at CodeCreator Technologies. As a freelancer, I designed and delivered a WhatsApp bulk-messaging and customer-engagement desktop application for small retailers such as jewellery shops, automating around 90% of their manual messaging.',
    'Today I work as a Software Developer at Made Tech IT, building software for clients and guiding them from requirements through delivery and handover. Beyond development, I work hands-on with Linux, networking protocols and security tools, and I contribute to Stack Overflow by answering Android and Java questions.',
  ],
  /** Profile photo in public/; if it fails to load, a "VD" avatar is shown instead */
  photo: '/profile.webp',
  /** Optional smaller copies of the photo for phones (file path + pixel width); leave [] if you only have one size */
  photoSizes: [
    { src: '/profile-360.webp', width: 360 },
    { src: '/profile-480.webp', width: 480 },
    { src: '/profile.webp', width: 676 },
  ] as { src: string; width: number }[],
  photoAlt: 'Portrait of Vatsal Dholakiya',
  stats: [
    { value: 4, suffix: '+', label: 'Years Experience' },
    { text: 'MSc', label: 'with Distinction' },
    { value: 4, suffix: '+', label: 'Certifications' },
  ] as { value?: number; suffix?: string; text?: string; label: string }[],
  interestsTitle: 'Interests & Career Focus',
  interests: [
    {
      icon: 'brain',
      title: 'Artificial Intelligence & Machine Learning',
      text: 'Actively learning, with the goal of building my career in AI.',
    },
    {
      icon: 'smartphone',
      title: 'Software & Android Development',
      text: 'Open to software development, application development and Android roles.',
    },
    {
      icon: 'shield',
      title: 'Cloud & Security',
      text: 'Interested in cloud platforms, networking and system security.',
    },
  ] as { icon: IconName; title: string; text: string }[],
}

/* ---------------------------------------------------------------- Skills */

const uni = 'University'
const cc = 'CodeCreator Technologies'
const freelance = 'Freelance'
const mtit = 'Made Tech IT'
const masters = "Master's degree"

export const skills = {
  title: 'Skills',
  hint: 'Hover or tap a skill to see where I used it.',
  usedAtLabel: 'Used at',
  categories: [
    {
      title: 'Android Development',
      icon: 'android',
      skills: [
        { name: 'Java', usedAt: [uni, cc] },
        { name: 'XML layouts', full: 'Extensible Markup Language', usedAt: [uni, cc] },
        { name: 'Android Studio', usedAt: [uni, cc] },
        { name: 'Android SDK', full: 'Software Development Kit', usedAt: [uni, cc] },
        { name: 'Responsive UI', full: 'User Interface design for multiple screen sizes and densities', usedAt: [cc] },
        { name: 'Firebase', full: 'Realtime Database and Authentication', usedAt: [uni] },
        { name: 'Google Sign-In', usedAt: [uni] },
        { name: 'REST API integration', full: 'Representational State Transfer Application Programming Interface', usedAt: [cc] },
        { name: 'Google Play Store releases', usedAt: [cc] },
      ],
    },
    {
      title: 'Desktop & Software Development',
      icon: 'monitor',
      skills: [
        { name: 'Java desktop applications', full: 'NetBeans and Eclipse', usedAt: [freelance] },
        { name: 'Selenium automation', usedAt: [freelance] },
        { name: 'Excel data import & processing', usedAt: [freelance] },
        { name: 'Requirements gathering', usedAt: [mtit] },
        { name: 'Solution guidance & handover', usedAt: [mtit] },
      ],
    },
    {
      title: 'Programming & Web',
      icon: 'code',
      skills: [
        { name: 'Java', usedAt: [uni] },
        { name: 'Python', usedAt: [uni] },
        { name: 'HTML', full: 'HyperText Markup Language', usedAt: [uni] },
        { name: 'CSS', full: 'Cascading Style Sheets', usedAt: [uni] },
        { name: 'Web design', usedAt: [uni] },
        { name: 'Web development', usedAt: [uni] },
        { name: 'MATLAB', full: 'Matrix Laboratory', usedAt: [masters] },
      ],
    },
    {
      title: 'Databases',
      icon: 'database',
      skills: [
        { name: 'SQLite', usedAt: [uni, freelance] },
        { name: 'MySQL', usedAt: [uni, freelance] },
        { name: 'SQL', full: 'Structured Query Language', usedAt: [uni, freelance] },
        { name: 'Firebase Realtime Database', usedAt: [uni, freelance] },
        { name: 'PostgreSQL', usedAt: [uni, freelance] },
      ],
    },
    {
      title: 'Engineering Practices',
      icon: 'git',
      skills: [
        { name: 'Git & GitHub', usedAt: [uni, cc, freelance] },
        { name: 'Debugging & error resolution', usedAt: [uni, cc, freelance] },
        { name: 'Team collaboration', usedAt: [uni, cc, freelance] },
        { name: 'Docker', usedAt: ['Projects'] },
      ],
    },
    {
      title: 'Cloud Computing',
      icon: 'cloud',
      label: 'Academic',
      skills: [
        { name: 'Amazon Web Services', usedAt: [masters] },
        { name: 'Microsoft Azure', usedAt: [masters] },
        { name: 'Google Cloud Platform', usedAt: [masters] },
        { name: 'Cloud architecture', usedAt: [masters] },
        { name: 'Cloud security concepts', usedAt: [masters] },
      ],
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      icon: 'brain',
      label: 'Academic / Learning',
      skills: [
        { name: 'AI & ML fundamentals', full: 'Artificial Intelligence and Machine Learning', usedAt: [masters] },
        { name: 'MATLAB data analysis & modelling', full: 'Matrix Laboratory', usedAt: [masters] },
      ],
    },
    {
      title: 'Networking & Security',
      icon: 'shield',
      skills: [
        { name: 'Linux command line', usedAt: ['Self-taught', masters] },
        { name: 'Windows Command Prompt', usedAt: ['Self-taught', masters] },
        { name: 'Wireshark', full: 'Packet capture and analysis', usedAt: ['Ethical Hacking course', masters] },
        { name: 'Nmap', full: 'Network Mapper: network and port scanning', usedAt: ['Ethical Hacking course', masters] },
        { name: 'TCP/IP', full: 'Transmission Control Protocol / Internet Protocol', usedAt: [] },
        { name: 'UDP', full: 'User Datagram Protocol', usedAt: [] },
        { name: 'DHCP', full: 'Dynamic Host Configuration Protocol', usedAt: [] },
        { name: 'DNS', full: 'Domain Name System', usedAt: [] },
        { name: 'HTTP/HTTPS', full: 'HyperText Transfer Protocol / Secure', usedAt: [] },
        { name: 'FTP', full: 'File Transfer Protocol', usedAt: [] },
        { name: 'SSH', full: 'Secure Shell', usedAt: [] },
        { name: 'ARP', full: 'Address Resolution Protocol', usedAt: [] },
        { name: 'ICMP', full: 'Internet Control Message Protocol', usedAt: [] },
        { name: 'VMware', usedAt: ['Coursework', 'Personal projects'] },
        { name: 'VirtualBox', usedAt: ['Coursework', 'Personal projects'] },
        { name: 'Windows Server', usedAt: ['Coursework', 'Personal projects'] },
        { name: 'Active Directory', usedAt: ['Coursework', 'Personal projects'] },
      ],
    },
  ] satisfies SkillCategory[] as SkillCategory[],
}

/* ------------------------------------------------------------ Experience */

export const experience = {
  title: 'Experience',
  roles: [
    {
      title: 'Software Developer',
      company: 'Made Tech IT',
      location: 'London, United Kingdom',
      period: 'Oct 2024 – Present',
      current: true,
      points: [
        'Design and develop software solutions tailored to each client’s business needs.',
        'Consult with clients to gather requirements and recommend the most suitable technical approach.',
        'Guide clients through delivery, handover and knowledge transfer so they can confidently use and maintain their solutions.',
      ],
      tags: ['Requirements gathering', 'Solution design', 'Client handover'],
    },
    {
      title: 'Android Developer',
      company: 'CodeCreator Technologies',
      location: 'India',
      period: 'Aug 2020 – Nov 2022',
      points: [
        'Developed native Android applications in Java and XML for jewellery retailers and other small businesses.',
        'Designed responsive interfaces that adapt across screen sizes and device densities.',
        'Integrated REST APIs and managed Google Play Store releases end to end.',
        'Collaborated with the development team on feature delivery, debugging and releases.',
      ],
      tags: ['Java', 'XML', 'Android SDK', 'REST APIs', 'Google Play'],
    },
    {
      title: 'Freelance Software Developer',
      company: 'Self-employed',
      location: 'India',
      /** Dates hidden on request; restore with 'Mar 2019 – Jun 2021' */
      period: '',
      points: [
        'Designed and built a WhatsApp bulk-messaging and customer-engagement desktop application for a product company serving small businesses.',
      ],
      tags: ['Java', 'NetBeans', 'Selenium', 'SQLite', 'MySQL', 'Firebase'],
      projectLink: { label: 'See project', projectId: 'whatsapp-suite' },
    },
  ] satisfies Role[] as Role[],
  currentLabel: 'Current',
}

/* -------------------------------------------------------------- Projects */

export const projects = {
  title: 'Projects',
  featuredLabel: 'Featured project',
  featuresLabel: 'Key Features',
  showFeatures: 'Show key features',
  hideFeatures: 'Hide key features',
  sourceLabel: 'Source code',
  liveLabel: 'Live site',
  featured: {
    id: 'whatsapp-suite',
    title: 'WhatsApp Business Automation Suite',
    summary:
      'A desktop application that lets small businesses such as jewellery shops reach thousands of customers in a single campaign, automating around 90% of their manual messaging work.',
    tags: ['Java', 'NetBeans', 'Selenium', 'SQLite', 'MySQL', 'Firebase', 'XML', 'HTML'],
    github: '',
    live: '',
    privateLabel: 'Private client project',
    features: [
      'Bulk messaging to thousands of contacts in a single campaign.',
      'Contact import directly from Excel files.',
      'Group Grabber: extracts contacts from WhatsApp groups.',
      'Number Filter: verifies which numbers are registered on WhatsApp and removes invalid ones before sending.',
      'Personalised messages that address each customer by name.',
      'Automated birthday and anniversary messages, including occasion-based discount offers, sent alongside regular campaigns without interrupting them.',
      'Local storage in SQLite, synchronised to MySQL through APIs, with Firebase integration.',
    ],
  } satisfies Project as Project,
  impact: { value: 90, prefix: '~', suffix: '%', label: 'of manual messaging work automated' },
  others: [
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
      title: 'Personal Portfolio',
      summary:
        'This website: a fast, accessible single-page portfolio with smooth scrolling, motion and live GitHub and Stack Overflow data.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/Vatsal-Dholakiya/Portfolio',
      live: '',
    },
  ] satisfies Project[] as Project[],
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

/* -------------------------------------------------------- Certifications */

export const certifications = {
  title: 'Certifications',
  viewCredential: 'View Credential',
  viewCertificate: 'View certificate',
  close: 'Close',
  /** Add a certificate by adding one entry here (and its image in public/certificates/) */
  items: [
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
  ] satisfies Certificate[] as Certificate[],
}

/* ------------------------------------------------------------- Education */

export const education = {
  title: 'Education',
  modulesLabel: 'Modules',
  degrees: [
    {
      degree: 'Master of Science in Cloud Computing',
      school: 'University of East London',
      location: 'London, United Kingdom',
      years: '2022 – 2023',
      award: 'Distinction',
      modules: [
        'Cloud Computing',
        'Artificial Intelligence',
        'Machine Learning',
        'Security',
        'Distributed Systems & Virtualisation',
        'Database Systems',
      ],
    },
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Ganpat University',
      location: 'Gujarat, India',
      /** FILL IN start year, e.g. '2017 – 2020' (your CV states "Completed 2020") */
      years: 'Completed 2020',
      award: '',
      modules: ['Android Development', 'Web Design', 'System Analysis and Design', 'Databases', 'Computer Networks'],
    },
  ] satisfies Degree[] as Degree[],
}

/* --------------------------------------------------------------- Contact */

export const contact = {
  kicker: 'Contact',
  heading: "Let's build something together.",
  line: 'Open to software development, Android and AI roles.',
  copy: 'Copy',
  copied: 'Copied!',
  copyAria: 'Copy email address',
  sayHello: 'Say Hello',
  mailSubject: 'Hello Vatsal',
  preferencesTitle: 'Work Preferences',
  preferences: ['Based in London, United Kingdom', 'Open to relocation', 'Visa sponsorship required'],
}

/* ---------------------------------------------------------------- Footer */

export const footer = {
  credit: 'Designed & built by Vatsal Dholakiya',
  backToTop: 'Back to top',
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
