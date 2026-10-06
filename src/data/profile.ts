/**
 * All site content lives here. Edit text in this file only; components read from it.
 * Leave a contact field as an empty string ('') to hide it everywhere on the site.
 */

export type Link = { label: string; href: string }

export type Project = {
  title: string
  kind?: string
  featured?: boolean
  impact?: { value: number; prefix: string; suffix: string; label: string }
  description: string
  tags: string[]
  links: Link[]
}

export type Role = {
  period: string
  title: string
  company: string
  current?: boolean
  points: string[]
}

export type SkillGroup = { name: string; items: string[] }

export type Certificate = {
  title: string
  date: string
  issuer: string
  url: string
  image: string
}

export type Education = { degree: string; school: string; modules: string }

export type Stat = { value: number; prefix?: string; suffix?: string; label: string }

export const profile = {
  name: { first: 'Vatsal', last: 'Dholakiya' },
  initials: 'VD',
  role: 'Software Developer and Applied AI',

  seo: {
    title: 'Vatsal Dholakiya | Software Developer and Applied AI',
    description:
      'Vatsal Dholakiya is a Software Developer in London building Android, desktop and Python applications, with a Master of Science in Cloud Computing. Open to roles in the United Kingdom and internationally.',
  },

  hero: {
    intro:
      'Software Developer in London. I build Android, desktop and Python applications, and I have a Master of Science in Cloud Computing.',
    location:
      'Based in London. Open to roles anywhere in the United Kingdom and internationally, with visa sponsorship.',
  },

  // Paths starting with "/" are served from the public/ folder.
  cv: '/Vatsal_Dholakiya_CV.pdf',

  contact: {
    email: 'vatsal.dholakiya2000@gmail.com',
    phone: '', // e.g. '+44 7xxx xxxxxx'
    linkedin: '', // e.g. 'https://www.linkedin.com/in/your-name'
    github: 'https://github.com/Vatsal-Dholakiya',
    stackoverflow: 'https://stackoverflow.com/users/12660050/vatsal-dholakiya',
    location: 'London, United Kingdom',
    heading: "Let's talk",
    text: 'I am open to software development, IT and AI roles anywhere in the United Kingdom or abroad, and I require visa sponsorship.',
  },

  summary: [
    'Software Developer with experience since 2019 building native Android applications, desktop automation tools and Python applications. Holds a Master of Science (MSc) in Cloud Computing from the University of East London and a Bachelor of Science (BSc) in Information Technology from Ganpat University.',
    "Delivered a WhatsApp automation product in Java, Selenium and SQLite that removed around 90% of a client's manual messaging work, and shipped Android applications with REST (Representational State Transfer) API (Application Programming Interface) integrations to the Google Play Store. Working knowledge of Amazon Web Services, Google Cloud Platform, Linux, Windows Server, networking protocols and ethical hacking, and an active Stack Overflow contributor with 47 answers.",
    'Seeking software development, IT (Information Technology) and junior AI (Artificial Intelligence) roles in the United Kingdom or internationally. Requires visa sponsorship.',
  ],

  projects: [
    {
      title: 'WhatsApp messaging automation',
      kind: 'Featured',
      featured: true,
      impact: { value: 90, prefix: '~', suffix: '%', label: "of the client's manual messaging work automated" },
      description:
        'A desktop application built for a company that serves local small businesses. It replaced repetitive, manual customer messaging with automated sends driven from a local SQLite database.',
      tags: ['Java', 'Selenium', 'SQLite', 'Desktop application'],
      links: [],
    },
    {
      title: 'Support Ticket Triage Assistant',
      kind: 'Personal project, Python',
      description:
        'A machine learning tool that reads a customer support ticket and returns its category, priority, the team it should go to and what to check first. Tickets where the model is less than 60% confident are flagged for human review. Built with TF-IDF (Term Frequency-Inverse Document Frequency) features and logistic regression in scikit-learn, evaluated with a stratified train/test split, macro F1 score and per-class reports, covered by unit tests, served through a Streamlit web app and a command-line tool. Trained on a synthetic dataset of 3,000 tickets, so results show the pipeline working rather than real-world accuracy.',
      tags: ['Python', 'scikit-learn', 'pandas', 'Streamlit', 'pytest'],
      links: [{ label: 'View on GitHub', href: 'https://github.com/Vatsal-Dholakiya/support-ticket-triage' }],
    },
    {
      title: 'Native Android applications',
      description:
        'Built and maintained native Android and desktop applications for clients over around two years: designing screens, connecting apps to back-end services through REST APIs, and managing Google Play Store releases.',
      tags: ['Java', 'Android SDK (Software Development Kit)', 'REST APIs', 'Google Play Console'],
      links: [],
    },
    {
      title: 'Cloud, Linux, networking and security labs',
      description:
        'Linux and Windows Server virtual machines in VMware and VirtualBox, Active Directory domains, network configuration and troubleshooting, ethical hacking exercises, and cloud services on Amazon Web Services and Google Cloud Platform.',
      tags: [
        'Linux',
        'Windows Server',
        'Active Directory',
        'VMware',
        'VirtualBox',
        'Networking',
        'Ethical hacking',
        'AWS (Amazon Web Services)',
        'GCP (Google Cloud Platform)',
      ],
      links: [],
    },
    {
      title: 'Android projects on GitHub',
      description: 'A navigation drawer in Java and an SOS (emergency alert) system.',
      tags: [],
      links: [
        { label: 'Navigation drawer', href: 'https://github.com/Vatsal-Dholakiya/navigation_drawer' },
        { label: 'SOS system', href: 'https://github.com/Vatsal-Dholakiya/sossystemandroid' },
      ],
    },
  ] satisfies Project[] as Project[],

  stackoverflow: {
    since: 'Active member since 2020',
    url: 'https://stackoverflow.com/users/12660050/vatsal-dholakiya',
    stats: [
      { value: 563, label: 'Reputation' },
      { value: 47, label: 'Answers posted' },
      { value: 23, prefix: '~', suffix: 'k', label: 'People reached' },
      { value: 6, label: 'Silver badges' },
      { value: 20, label: 'Bronze badges' },
    ] satisfies Stat[] as Stat[],
    note: 'Most activity in the android tag, including answers on custom EditText input fields; questions include getting accurate UTC (Coordinated Universal Time) time in an app; one question earned the Notable Question badge.',
  },

  experience: [
    {
      period: 'October 2024 to present',
      title: 'Software Developer',
      company: 'Made Tech IT, London, United Kingdom',
      current: true,
      points: [
        'Design, develop and maintain software solutions for business clients, from requirements to delivery.',
        'Translate client needs into technical specifications and working features, and agree scope and timelines with stakeholders.',
        'Test, debug and document code to keep releases reliable and easy to hand over.',
        'Produce visual and user interface assets that support the software delivered to clients.',
      ],
    },
    {
      period: 'August 2020 to November 2022',
      title: 'Android Developer',
      company: 'CodeCreator Technologies, India',
      points: [
        'Developed native Android applications in Java from screen design to production release.',
        'Integrated REST APIs for login, data sync and content updates.',
        'Built companion desktop applications for clients.',
        'Managed Google Play Store releases end to end: signed builds, store listings and version updates.',
      ],
    },
    {
      period: 'March 2019 to June 2021',
      title: 'Freelance Android Developer',
      company: 'Self-employed, India',
      points: [
        'Built a WhatsApp messaging automation desktop application in Java, Selenium and SQLite for a company serving local small businesses, automating around 90% of its manual messaging work.',
        'Developed Android applications for small-business clients from requirements to delivery.',
      ],
    },
  ] satisfies Role[] as Role[],

  skills: [
    { name: 'Programming', items: ['Java', 'Python', 'SQL (Structured Query Language)'] },
    { name: 'Mobile and desktop', items: ['Android SDK', 'REST APIs', 'Google Play Store releases', 'Selenium automation'] },
    { name: 'Data and tooling', items: ['PostgreSQL', 'SQLite', 'Docker', 'Git', 'pytest'] },
    {
      name: 'Cloud and infrastructure',
      items: ['Amazon Web Services', 'Google Cloud Platform', 'VMware', 'VirtualBox', 'Windows Server', 'Active Directory'],
    },
    {
      name: 'Linux',
      items: ['command line', 'file system and permissions', 'package management', 'services and processes', 'shell basics'],
    },
    {
      name: 'Networking',
      items: [
        'TCP/IP (Transmission Control Protocol/Internet Protocol)',
        'DNS (Domain Name System)',
        'DHCP (Dynamic Host Configuration Protocol)',
        'HTTP/HTTPS (Hypertext Transfer Protocol/Secure)',
        'subnetting',
        'troubleshooting',
      ],
    },
    {
      name: 'Security',
      items: ['ethical hacking', 'vulnerability scanning and network reconnaissance in lab environments', 'secure configuration basics'],
    },
    { name: 'Languages', items: ['English', 'Hindi'] },
  ] satisfies SkillGroup[] as SkillGroup[],

  // Short names for the scrolling marquee at the top of the Skills section.
  marquee: [
    'Java', 'Python', 'SQL', 'Android SDK', 'REST APIs', 'Selenium', 'PostgreSQL', 'SQLite', 'Docker', 'Git',
    'pytest', 'Amazon Web Services', 'Google Cloud Platform', 'VMware', 'VirtualBox', 'Windows Server',
    'Active Directory', 'Linux', 'TCP/IP', 'DNS', 'DHCP', 'HTTP/HTTPS', 'Ethical hacking',
  ],

  certificates: [
    {
      title: 'Introduction to Ethical Hacking',
      date: 'February 2022',
      issuer: 'Great Learning Academy',
      url: 'https://www.mygreatlearning.com/certificate/PEBXWXBY',
      image: '/certificates/ethical-hacking.jpg',
    },
    {
      title: 'Object-Oriented Programming in Java',
      date: 'July 2021',
      issuer: 'Great Learning Academy',
      url: 'https://www.mygreatlearning.com/certificate/HKOQRUKS',
      image: '/certificates/oop-java.jpg',
    },
    {
      title: 'GitHub Tutorial for Beginners',
      date: 'July 2021',
      issuer: 'Great Learning Academy',
      url: 'https://www.mygreatlearning.com/certificate/YNTHADPU',
      image: '/certificates/github.jpg',
    },
    {
      title: 'Introduction to UI-UX (User Interface and User Experience) Design',
      date: 'July 2021',
      issuer: 'Great Learning Academy',
      url: 'https://www.mygreatlearning.com/certificate/XUMTKXBL',
      image: '/certificates/ui-ux.jpg',
    },
    {
      title: 'Cloud Foundations',
      date: 'July 2020',
      issuer: 'Great Learning Academy',
      url: 'https://www.mygreatlearning.com/certificate/HFFENWXA',
      image: '/certificates/cloud-foundations.jpg',
    },
  ] satisfies Certificate[] as Certificate[],

  education: [
    {
      degree: 'Master of Science (MSc) in Cloud Computing',
      school: 'University of East London',
      modules: 'Cloud platforms (Amazon Web Services and Google Cloud Platform), virtualisation and infrastructure.',
    },
    {
      degree: 'Bachelor of Science (BSc) in Information Technology',
      school: 'Ganpat University',
      modules: 'Android Development, Web Design, System Analysis and Design, Databases, Computer Networks.',
    },
  ] satisfies Education[] as Education[],

  footer: 'Vatsal Dholakiya, 2026',
}

/** Prefixes a public/ path with the deploy base (needed for GitHub Pages sub-paths). */
export const asset = (path: string) =>
  path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
