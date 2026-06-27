import {
  faUser,
  faBriefcase,
  faEnvelope,
  faDisplay,
  faStar,
  faServer,
  faTerminal,
  faBrain,
  faScrewdriverWrench,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { getYears } from '../composables/useHelper.js'
import photoUrl from '../assets/photo.png'

export const clouds = [
  { top: '8%', duration: '37s', delay: '0s', size: '6.75rem', opacity: 'opacity-55' },
  { top: '56%', duration: '61s', delay: '-18s', size: '10.5rem', opacity: 'opacity-30' },
  { top: '19%', duration: '44s', delay: '-8s', size: '5.125rem', opacity: '' },
  { top: '43%', duration: '53s', delay: '-31s', size: '8.25rem', opacity: 'opacity-40' },
  { top: '70%', duration: '29s', delay: '-4s', size: '7rem', opacity: 'opacity-25' },
  { top: '31%', duration: '72s', delay: '-24s', size: '11.75rem', opacity: 'opacity-45' },
]

export const sections = [
  { id: 'profile', title: 'Sky', label: 'Profile', icon: faUser },
  { id: 'experience', title: 'Horizon', label: 'Experience', icon: faBriefcase },
  { id: 'skills', title: 'Transition', label: 'Skills', icon: faBrain },
  // { id: 'education', title: 'Sunset', label: 'Education', icon: faGraduationCap },
  { id: 'contact', title: 'Abyss', label: 'Contact', icon: faEnvelope },
]

export const profile = {
  photo: photoUrl,
  name: 'Perdana Novebrianto Khristi',
  title: `Experienced web developer with ${getYears('2018-01-01', new Date().toISOString().split('T')[0])}+ years of experience building responsive web applications. Skilled in the Vue.js ecosystem to create reusable components, optimize web performance, and integrate RESTful APIs.`
}

export const experiences = [
  {
    period: 'January 2020 — PRESENT',
    title: 'Frontend Web Developer',
    company: 'PT. Inosoft Trans Sistem',
    description: [
      'Working on frontend web development based on Vue.js',
      'Working on frontend web development based on Laravel (blade or Inertia.js)',
      'Creating reusable components for multiple Vue.js based projects',
      'Implementing the design into the application view',
      'Usually use Tailwind.css or Bootstrap',
      'Use AI to assist optimize and test',
      'Connect data using rest API to application view',
      'Manage application version and code with GIT',
      'Collaboration with project managers and backend teams using Jira tools',
    ],
    accent: 'primary',
    icon: faStar,
    align: 'left',
  },
  {
    period: 'October — November 2021',
    title: 'Full Stack Web Developer',
    company: 'Side Project at FKKMK UGM',
    description:[
      'Developed of the Early Childhood Screening Assessment (ECSA) questionnaire web application to help screen emotional and social disorders in children aged 1.5-5 years and parents using Laravel.'
    ],
    accent: 'secondary-fixed',
    icon: faHandshake,
    align: 'right',
  },
  {
    period: 'August — October 2021',
    title: 'Full Stack Web Developer',
    company: 'Side Project at Kagama UGM',
    description:[
      'Developed an admin system for K-GAMA Health android application using laravel.'
    ],
    accent: 'secondary-fixed',
    icon: faHandshake,
    align: 'left',
  },
  {
    period: 'July 2018 — December 2019',
    title: 'Full Stack Web Developer',
    company: 'CV. Kinariyatama',
    description: [
      'Developed of the message history feature on admin system for the Matur Dokter android application at the Klaten Health Office (Dinas Kesehatan Klaten) which is used as an integrated emergency management system using CodeIgniter.',
      'Developed of the Online Bride and Groom (CATIN) web application at the Boyolali Health Office (Dinas Kesehatan Boyolali) which is used as a learning medium and certification of prospective brides using Laravel.',
      'Developed of the Permata Bersinar web application at the Prambanan Health Center (Puskesmas Prambanan) which is used as a posyandu remaja using CodeIgniter.',
    ],
    accent: 'primary',
    icon: faStar,
    align: 'right',
  },
]

export const skillCategories = [
  {
    title: 'Frontend Development',
    icon: faDisplay,
    accent: 'primary',
    barClass: 'bg-primary',
    skills: [
      { name: 'Vue.js', score: 90 },
      { name: 'React.js', score: 30 },
      { name: 'HTML', score: 90 },
      { name: 'CSS', score: 90 },
      { name: 'JavaScript', score: 80 },
      { name: 'TypeScript', score: 20 },
      { name: 'Tailwind CSS', score: 80 },
      { name: 'Bootstrap', score: 90 },
    ],
  },
  {
    title: 'Backend Development',
    icon: faServer,
    accent: 'secondary-fixed',
    barClass: 'bg-secondary-fixed',
    skills: [
      { name: 'Laravel', score: 70 },
      { name: 'CodeIgniter', score: 60 },
      { name: 'Go', score: 30 },
      { name: 'PHP', score: 70 },
      { name: 'MySQL', score: 60 },
      { name: 'PostgreSQL', score: 30 },
      { name: 'MongoDB', score: 30 },
    ],
  },
  {
    title: 'DevOps',
    icon: faTerminal,
    accent: 'primary',
    barClass: 'bg-primary',
    skills: [
      { name: 'Git', score: 70 },
      { name: 'CI/CD', score: 60 },
    ],
  },
  {
    title: 'Tools',
    icon: faScrewdriverWrench,
    accent: 'secondary-fixed',
    barClass: 'bg-secondary-fixed',
    skills: [
      { name: 'Cursor', score: 70 },
      { name: 'Postman', score: 60 },
      { name: 'Figma', score: 60 },
      { name: 'Jira', score: 60 },
      { name: 'Firebase', score: 50 },
    ],
  },
]

// export const education = [
//   {
//     degree: 'Bachelor of Informatics Education',
//     school: 'Yogyakarta State University | 2014 — 2098',
//     note: 'It combines technical computing skills with professional teaching methods.',
//     accent: 'primary',
//   },
// ]

export const contacts = [
  { icon: faEnvelope, label: 'EMAIL', title: 'perdananovebrianto@gmail.com', value: 'https://mail.google.com/mail/u/0/?fs=1&to=perdananovebrianto@gmail.com&tf=cm' },
  { icon: faLinkedin, label: 'LINKEDIN', title: 'perdananovebrianto', value: 'https://www.linkedin.com/in/perdananovebrianto/' },
]
