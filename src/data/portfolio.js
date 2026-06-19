import {
  faBriefcase,
  faChessKnight,
  faClapperboard,
  faCode,
  faEnvelope,
  faLocationDot,
  faPenRuler,
  faStar,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons'
import {
  faDribbble,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

export const sections = [
  { id: 'profile', title: 'Sky', label: 'Profile' },
  { id: 'experience', title: 'Horizon', label: 'Experience' },
  { id: 'skills', title: 'Transition', label: 'Skills' },
  { id: 'education', title: 'Sunset', label: 'Education' },
  { id: 'contact', title: 'Abyss', label: 'Contact' },
]

export const clouds = [
  { top: '10%', left: '-100px', duration: '45s', delay: null, size: '7.5rem', opacity: '' },
  { top: '25%', left: '-200px', duration: '60s', delay: '-10s', size: '11.25rem', opacity: 'opacity-40' },
  { top: '5%', left: '-300px', duration: '35s', delay: '-5s', size: '5.625rem', opacity: 'opacity-50' },
]

export const experiences = [
  {
    period: '2021 — PRESENT',
    title: 'Senior Creative Director',
    company: 'Aether Digital Agency',
    description:
      'Leading a cross-functional team of 15 designers and developers. Orchestrating the visual strategy for Fortune 500 tech clients with a focus on immersive UX.',
    accent: 'primary',
    icon: faBriefcase,
    align: 'left',
  },
  {
    period: '2018 — 2021',
    title: 'Lead Interaction Designer',
    company: 'Submarine UI Labs',
    description:
      'Specialized in motion-heavy web experiences. Developed proprietary animation libraries used in award-winning interactive portfolios.',
    accent: 'secondary-fixed',
    icon: faCode,
    align: 'right',
  },
  {
    period: '2019 — ONGOING',
    title: 'Project "Abyssal"',
    company: 'Open Source Contribution',
    description:
      'Building a WebGL-based fluid simulation engine for narrative-driven web experiences. Featured in Creative Review Magazine.',
    accent: 'tertiary',
    icon: faStar,
    align: 'left',
  },
]

export const skillCategories = [
  {
    title: 'UI Design',
    icon: faPenRuler,
    accent: 'primary',
    barClass: 'bg-primary',
    skills: [
      { name: 'Figma & Prototyping', score: 95 },
      { name: 'Design Systems', score: 90 },
    ],
  },
  {
    title: 'Development',
    icon: faTerminal,
    accent: 'secondary-fixed',
    barClass: 'bg-secondary-fixed',
    skills: [
      { name: 'React & Three.js', score: 88 },
      { name: 'WebGL & Shaders', score: 82 },
    ],
  },
  {
    title: 'Motion',
    icon: faClapperboard,
    accent: 'tertiary',
    barClass: 'bg-tertiary',
    skills: [
      { name: 'After Effects', score: 92 },
      { name: 'GSAP & Framer Motion', score: 85 },
    ],
  },
  {
    title: 'Strategy',
    icon: faChessKnight,
    accent: 'on-surface-variant',
    barClass: 'bg-white/30',
    skills: [
      { name: 'UX Research', score: 80 },
      { name: 'Branding & Identity', score: 85 },
    ],
  },
]

export const education = [
  {
    degree: 'Master of Fine Arts in Digital Media',
    school: 'Rhode Island School of Design | 2016 — 2018',
    note: 'Focus on interactive storytelling and emergent technologies.',
    accent: 'primary',
  },
  {
    degree: 'B.S. in Computer Science & Design',
    school: 'Stanford University | 2012 — 2016',
    note: 'Dual degree combining technical engineering with visual arts.',
    accent: 'secondary-fixed',
  },
]

export const credentials = [
  'Google UX Professional Certificate',
  'Advanced Three.js Masterclass',
]

export const contacts = [
  { icon: faEnvelope, label: 'EMAIL', value: 'hello@adrianvoid.design' },
  { icon: faLocationDot, label: 'LOCATION', value: 'Los Angeles, CA / Remote' },
]

export const socialLinks = [
  { name: 'GitHub', icon: faGithub, href: '#' },
  { name: 'LinkedIn', icon: faLinkedin, href: '#' },
  { name: 'Dribbble', icon: faDribbble, href: '#' },
]

export const portraitSrc =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNn1UXLD-xzAICg7IGRQ1hG_CmuiTcdsOWcXJB0knxzSUBi9Cp3Wogr3G5A4Yv4J2bWMlQd38kbS2FB3eNG7OrncvCojaScKqnd5hYLCSVyJYTwgG4pcUD9WElZfT2yVXX-Mzb1pKnIIC2y_dQSCSqtF5szlFsTjWDJqqj7MtRCQYH7Qh5XC1f1uc9XJ-VH-Zm2hPb6gf1P-1ySsHsAV6DaFfaGr6uxmJJAfhRkHozsMtXZnUeGOCcSA9yglKZAM3Wo6Psk5MzCpw'
