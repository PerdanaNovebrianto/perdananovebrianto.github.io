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

export const clouds = [
  { top: '7%', left: '-127px', duration: '37s', delay: '-9s', size: '6.75rem', opacity: 'opacity-55' },
  { top: '58%', left: '-283px', duration: '61s', delay: '-34s', size: '10.5rem', opacity: 'opacity-30' },
  { top: '19%', left: '-391px', duration: '44s', delay: '-16s', size: '5.125rem', opacity: '' },
  { top: '49%', left: '-68px', duration: '53s', delay: '-41s', size: '8.25rem', opacity: 'opacity-40' },
  { top: '73%', left: '-214px', duration: '29s', delay: '-5s', size: '7rem', opacity: 'opacity-25' },
  { top: '31%', left: '-347px', duration: '72s', delay: '-23s', size: '11.75rem', opacity: 'opacity-45' },
]

export const sections = [
  { id: 'profile', title: 'Sky', label: 'Profile' },
  { id: 'experience', title: 'Horizon', label: 'Experience' },
  { id: 'skills', title: 'Transition', label: 'Skills' },
  { id: 'education', title: 'Sunset', label: 'Education' },
  { id: 'contact', title: 'Abyss', label: 'Contact' },
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

export const portraitSrc = 'src/assets/photo.png'
