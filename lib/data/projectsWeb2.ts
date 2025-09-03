export interface Web2Project {
  title: string
  stack: string[]
  summary: string
  links: { label: string; url: string }[]
  demoVideo?: string
  liveApp?: string
  docs?: string
  githubRepo?: string
  company?: string
  role?: string
  year?: number
}

export const projectsWeb2: Web2Project[] = [
  {
    title: 'AccionSR',
    stack: ['IONIC', 'Hybrid', 'iOS'],
    summary: 'Cross-platform mobile solution for social responsibility initiatives. This experience introduced me to hybrid app development, mobile UI/UX design, and deploying apps for Apple devices.',
    links: [
      { label: 'Non-profit organization', url: 'https://www.instagram.com/accionsr/' } 
    ],
    company: 'YesDuet',
    role: 'Co-Founder',
    year: 2015
  },
  {
    title: 'JobbleApp',
    stack: ['Angular', 'MongoDB', 'Express', 'PubNub API'],
    summary: 'A job marketplace mobile app that connects talent with opportunities based on geographical positioning. Features include subscription channels, group access, and an internal chat system to streamline communication between employers and candidates.',
    links: [
      { label: 'Product', url: 'https://app.jobble.com/' },
      { label: 'Clients', url: 'https://jobble.com/' },
      { label: 'Development Company', url: 'https://www.foundationlab.co/' },
    ],
    company: 'FoundationLab LLC',
    role: 'Frontend Developer',
    year: 2019
  },
  {
    title: 'Gunderson',
    stack: ['MERN', 'DocuSign API', 'DB Admin'],
    summary: 'A fund management platform designed for startup projects, featuring a lawyer-driven digital validation system to ensure compliance and authenticity. Built to streamline the investment process with secure project registration, review, and approval workflows.',
    links: [ 
      { label: 'Product', url: 'https://funds.gunder.com/login' },
      { label: 'Clients', url: 'https://www.gunder.com/en' },
      { label: 'Development Company', url: 'https://www.foundationlab.co/' },
    ],
    company: 'FoundationLab LLC',
    role: 'Full-stack Developer',
    year: 2020
  },
  {
    title: 'Fasken Baker McKenzie',
    stack: ['MERN', 'Stripe API', 'French translations'],
    summary: 'An enterprise legal services platform built with React and Node.js. Designed to streamline the U.S. startup registration process, it integrates Stripe subscription payments and automatically generates legal documentation, providing a seamless end-to-end experience for entrepreneurs and legal teams.',
    links: [ 
      { label: 'Development Company', url: 'https://www.foundationlab.co/' },
    ],
    company: 'FoundationLab LLC',
    role: 'Full-stack Developer',
    year: 2022
  },
  {
    title: 'Join ClubGolf',
    stack: ['React Native', 'Expo', 'Firebase'],
    summary: 'A mobile app built with Expo, React Native, and Firebase that allows players to register golf course progress in real time, track live scores, and place friendly bets with others during ongoing games.',
    links: [ 
      { label: 'Development Company', url: 'https://www.foundationlab.co/' },
    ],
    company: 'FoundationLab LLC',
    role: 'Senior Product Developer',
    year: 2023
  },
]
