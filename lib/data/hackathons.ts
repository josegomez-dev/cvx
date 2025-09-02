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
    link: 'https://joses-organization-73.gitbook.io/blockbeats-3.0',
    demoVideo: 'https://www.youtube.com/watch?v=cujoOA1WvRM&t=1s',
    liveApp: 'https://blockbeats-tau.vercel.app/',
    article: 'https://medium.com/@josegomezdev/blockbeats-second-place-in-the-starknet-hackathon-9aa782732948',
    type: 'hackathon',
    category: 'web3'
  },
  {
    id: 'space-apps-2019',
    title: 'Space Apps Challenge 2019',
    year: 2019,
    link: 'https://sdgs.un.org/goals',
    article: 'https://josegomezdev.medium.com/space-apps-experience-from-34-36-cubicle-1b31a4dc3dbd',
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
    link: 'https://josegomezdev.medium.com/contruyamos-juntos-el-futuro-hwthon-2018-experience-37758eb690d5',
    article: 'https://josegomezdev.medium.com/kap%C3%B6kw%C3%A3-appnea-hwthon-2018-7ff31b13904c',
    type: 'hackathon',
    category: 'hardware'
  },
]
