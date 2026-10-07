/**
 * ALL SITE CONTENT LIVES HERE.
 * Edit text in this file only; components read from it.
 * - Leave a link or field as an empty string ('') to hide it on the site.
 * - Paths that start with "/" point to files in the public/ folder.
 */

export type SkillIcon = 'code' | 'mobile' | 'cloud' | 'database' | 'server' | 'shield' | 'palette'
export type CertIcon = 'shield' | 'cloud' | 'code' | 'award'

export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  featured?: boolean
  /** Big figure shown on the featured card */
  impact?: { value: number; prefix?: string; suffix?: string; label: string }
}

export interface Role {
  title: string
  company: string
  location: string
  period: string
  current?: boolean
  points: string[]
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  url: string
  icon: CertIcon
  /** e.g. '/certificates/ethical-hacking.webp' — leave '' until the image is added */
  image: string
}

export interface Degree {
  degree: string
  school: string
  years: string
  modules: string[]
}

export interface Repo {
  name: string
  description: string
  language: string | null
  stars: number
  updated: string
  url: string
  homepage?: string
}

export const content = {
  name: { first: 'Vatsal', last: 'Dholakiya' },
  initials: 'VD',

  seo: {
    title: 'Vatsal Dholakiya — Software Developer & Android Developer',
    description:
      'Vatsal Dholakiya is a Software Developer in London building reliable software and Android applications, with a Master of Science in Cloud Computing. Now focused on Artificial Intelligence.',
  },

  links: {
    email: 'vatsal.dholakiya2000@gmail.com',
    github: 'https://github.com/Vatsal-Dholakiya',
    stackoverflow: 'https://stackoverflow.com/users/12660050/vatsal-dholakiya',
    linkedin: '', // FILL IN, e.g. 'https://www.linkedin.com/in/your-name' — hidden while empty
    cv: '/Vatsal_Dholakiya_CV.pdf',
  },

  location: 'London, United Kingdom',

  hero: {
    greeting: 'Hi, my name is',
    roles: ['Software Developer', 'Android Developer', 'Cloud Computing Graduate'],
    intro: "I build reliable software and Android applications, and I'm now focused on Artificial Intelligence.",
    primaryCta: 'View My Work',
    secondaryCta: 'Download CV',
  },

  about: {
    text: "I'm a Software Developer based in London with a Master of Science in Cloud Computing from the University of East London and a Bachelor of Science in Information Technology from Ganpat University. I started out building native Android applications, integrating REST (Representational State Transfer) Application Programming Interfaces and managing Google Play Store releases. As a freelancer I built a WhatsApp automation desktop product that removed around 90% of manual messaging work for small businesses. Today I work as a Software Developer at Made Tech IT and I'm expanding into Artificial Intelligence and Machine Learning.",
    /** Profile photo, e.g. '/profile.webp'. Leave '' to show the monogram placeholder. */
    photo: '',
    stats: [
      { value: 4, suffix: '+', label: 'Years Experience' },
      { value: 3, suffix: '', label: 'Certifications' },
      { value: 2, suffix: '', label: 'Degrees' },
    ],
  },

  skills: [
    { title: 'Languages', icon: 'code', items: ['Java', 'Python', 'SQL (Structured Query Language)'] },
    {
      title: 'Mobile',
      icon: 'mobile',
      items: ['Android Development', 'Google Play Store releases', 'REST APIs (Application Programming Interfaces)'],
    },
    { title: 'Cloud & DevOps', icon: 'cloud', items: ['Amazon Web Services', 'Google Cloud Platform', 'Docker', 'Git'] },
    { title: 'Databases', icon: 'database', items: ['PostgreSQL', 'SQLite'] },
    {
      title: 'Systems & Networking',
      icon: 'server',
      items: ['Linux', 'VMware', 'VirtualBox', 'Windows Server', 'Active Directory', 'Networking protocols'],
    },
    { title: 'Security & Automation', icon: 'shield', items: ['Ethical Hacking', 'Selenium automation'] },
    { title: 'Design', icon: 'palette', items: ['Graphic Design'] },
  ] satisfies { title: string; icon: SkillIcon; items: string[] }[],

  experience: [
    {
      title: 'Software Developer',
      company: 'Made Tech IT',
      location: 'London, United Kingdom',
      period: 'Oct 2024 – Present',
      current: true,
      points: [
        'Design, develop and maintain software solutions for business clients, from requirements to delivery.',
        'Translate client needs into technical specifications and working features, and agree scope and timelines with stakeholders.',
        'Test, debug and document code to keep releases reliable and easy to hand over.',
      ],
    },
    {
      title: 'Android Developer',
      company: 'CodeCreator Technologies',
      location: 'India',
      period: 'Aug 2020 – Nov 2022',
      points: [
        'Built native Android and desktop applications',
        'Integrated REST Application Programming Interfaces',
        'Managed Google Play Store releases',
      ],
    },
    {
      title: 'Freelance Android Developer',
      company: 'Self-employed',
      location: 'India',
      period: 'Mar 2019 – Jun 2021',
      points: [
        'Built a WhatsApp automation desktop product (Java, Selenium, SQLite) for a company serving local small businesses, automating around 90% of manual messaging work',
      ],
    },
  ] satisfies Role[] as Role[],

  projects: [
    {
      title: 'WhatsApp Automation Tool',
      description: 'Desktop application automating around 90% of manual messaging work for local small businesses.',
      tags: ['Java', 'Selenium', 'SQLite'],
      featured: true,
      impact: { value: 90, prefix: '~', suffix: '%', label: 'of manual messaging work automated' },
    },
    {
      title: 'Personal Portfolio',
      description: 'This site: a fast, accessible single-page portfolio with smooth scrolling and motion.',
      tags: ['React', 'TypeScript', 'Framer Motion'],
      github: 'https://github.com/Vatsal-Dholakiya/Portfolio',
    },
  ] satisfies Project[] as Project[],

  github: {
    username: 'Vatsal-Dholakiya',
    api: 'https://api.github.com/users/Vatsal-Dholakiya/repos?sort=updated&per_page=6',
    /** Hidden from the "Latest on GitHub" grid */
    hide: ['Vatsal-Dholakiya'],
    /** Shown when a repository has no description on GitHub */
    descriptions: {
      Portfolio: 'Source code of this portfolio website.',
      'Sos-System': 'SOS (emergency alert) system.',
      sossystemandroid: 'SOS (emergency alert) system for Android.',
      navigation_drawer: 'Android navigation drawer built in Java.',
    } as Record<string, string>,
    /** Shown if GitHub cannot be reached or the rate limit is hit */
    fallback: [
      { name: 'Portfolio', description: '', language: 'TypeScript', stars: 0, updated: '2026-10-06T22:45:04Z', url: 'https://github.com/Vatsal-Dholakiya/Portfolio' },
      { name: 'Sos-System', description: '', language: null, stars: 0, updated: '2021-05-12T12:34:11Z', url: 'https://github.com/Vatsal-Dholakiya/Sos-System' },
      { name: 'sossystemandroid', description: '', language: null, stars: 0, updated: '2021-05-09T08:25:14Z', url: 'https://github.com/Vatsal-Dholakiya/sossystemandroid' },
      { name: 'navigation_drawer', description: '', language: 'Java', stars: 0, updated: '2021-05-04T16:44:50Z', url: 'https://github.com/Vatsal-Dholakiya/navigation_drawer' },
    ] satisfies Repo[] as Repo[],
  },

  certificates: [
    {
      title: 'Ethical Hacking',
      issuer: 'Great Learning Academy',
      date: 'February 2022',
      url: 'https://www.mygreatlearning.com/certificate/PEBXWXBY',
      icon: 'shield',
      image: '',
    },
    {
      title: 'Cloud Foundations',
      issuer: 'Great Learning Academy',
      date: 'July 2020',
      url: 'https://www.mygreatlearning.com/certificate/HFFENWXA',
      icon: 'cloud',
      image: '',
    },
    {
      title: 'Object-Oriented Programming in Java',
      issuer: 'Great Learning Academy',
      date: 'July 2021',
      url: 'https://www.mygreatlearning.com/certificate/HKOQRUKS',
      icon: 'code',
      image: '',
    },
  ] satisfies Certificate[] as Certificate[],

  education: [
    {
      degree: 'Master of Science in Cloud Computing',
      school: 'University of East London',
      years: '2023 – 2024',
      modules: ['Cloud architecture and services', 'Distributed systems and virtualisation', 'Network security', 'Database systems'],
    },
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Ganpat University',
      years: 'Completed 2020',
      modules: ['Android Development', 'Web Design', 'System Analysis and Design', 'Databases', 'Computer Networks'],
    },
  ] satisfies Degree[] as Degree[],

  contact: {
    heading: "Let's build something together.",
    cta: 'Say Hello',
  },

  footer: 'Designed & built by Vatsal Dholakiya',
}

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

/** Prefixes a public/ path with the deploy base path (needed for GitHub Pages sub-paths). */
export const asset = (path: string) => (path.startsWith('/') ? `${__BASE__}${path.slice(1)}` : path)
