export interface HackathonAchievement {
  id: string
  title: string
  year: number
  placement?: string
  project?: string
  description: string
  link?: string
  demoVideo?: string
  liveApp?: string
  article?: string
  type: 'hackathon' | 'challenge' | 'competition'
  category: 'hardware' | 'space' | 'blockchain' | 'biomedical' | 'web3'
}

export const hackathonAchievements: HackathonAchievement[] = [
  {
    id: 'starknet-hackathon-2025',
    title: 'Starknet Hackathon 2025',
    year: 2025,
    placement: '2nd Place',
    project: 'BlockBeats 3.0',
    description: 'Won second place with BlockBeats 3.0, a revolutionary music × Web3 crossover project. Built on Starknet using Cairo for advanced blockchain functionality.',
    link: process.env.NEXT_PUBLIC_BLOCKBEATS_DOCS || '#',
    demoVideo: process.env.NEXT_PUBLIC_BLOCKBEATS_VIDEO || '#',
    liveApp: process.env.NEXT_PUBLIC_BLOCKBEATS_URL || '#',
    article: process.env.NEXT_PUBLIC_BLOCKBEATS_ARTICLE || '#',
    type: 'hackathon',
    category: 'web3'
  },
  {
    id: 'space-apps-2019',
    title: 'Space Apps Challenge 2019',
    year: 2019,
    link: process.env.NEXT_PUBLIC_SDGS_URL || '#',
    article: process.env.NEXT_PUBLIC_SPACE_APPS_ARTICLE || '#',
    description: 'Participated in NASA\'s International Space Apps Challenge, working on space technology solutions and innovative approaches to space exploration problems.',
    type: 'challenge',
    category: 'space'
  },
  {
    id: 'hardwarethon-2018',
    title: 'Hardwarethon 2018',
    year: 2018,
    placement: '2nd Place',
    project: 'Kapökwã APPNEA Biomedical Device',
    description: 'Developed an innovative biomedical device for respiratory monitoring and sleep apnea detection. Combined hardware engineering with software development to create a comprehensive healthcare solution.',
    link: process.env.NEXT_PUBLIC_HWTHON_ARTICLE || '#',
    article: process.env.NEXT_PUBLIC_KAPOKWA_ARTICLE || '#',
    type: 'hackathon',
    category: 'hardware'
  },
]
