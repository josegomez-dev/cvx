export interface Web3Project {
  title: string
  chain: string
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

export const projectsWeb3: Web3Project[] = [
  {
    title: 'Stellar Nexus Experience',
    chain: 'Stellar',
    summary: 'The Web3 Early Adopters Program on Stellar blockchain.',
    links: [
      { label: 'Demo Video', url: 'https://www.youtube.com/watch?v=1wKEBt0LcUQ'},
      { label: 'Live App', url: 'https://stellar-nexus-experience.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/josegomez-dev/stellar-nexus-experience'},
    ],
    year: 2025,
    company: 'Trusless Work',
    role: 'PM & Developer',
  },
  {
    title: 'BlockBeats 3.0',
    chain: 'Starknet',
    summary: 'Music NFTs, beat machines, cultural preservation & gamified launchpad.',
    links: [
      { label: 'Demo Video', url: 'https://www.youtube.com/watch?v=FYvw8MCz1Eg'},
      { label: 'Live App', url: 'https://blockbeats-tau.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/josegomez-dev/blockbeats'},
      { label: 'Docs', url: 'https://joses-organization-73.gitbook.io/blockbeats-3.0'},
      { label: 'Demo (Starknet Live)', url: 'https://www.youtube.com/watch?v=cujoOA1WvRM' },
    ],
    year: 2025,
    company: 'Starknet',
    role: 'Developer',
  },
  {
    title: 'Goatopia',
    chain: 'Telegram Mini-game App',
    summary: 'A Telegram-based tap mini game where the main character is a goat. Players interact by tapping the goat (like Hamster Kombat) to earn in-game points, which can be boosted with special items, upgrades, or streak multipliers.',
    links: [
      { label: 'Telegram Bot', url: 'https://t.me/Goatopia_Bot'},
      { label: 'Development Company', url: 'https://lightningworks.io/' },
    ],
    year: 2025,
    company: 'Lighting Works',
    role: 'Web3 Frontend Developer',
  },
]
