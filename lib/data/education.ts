export interface Education {
  formal: Array<{
    title: string
    org: string
    year?: number
  }>
  informal: Array<{
    title: string
    org: string
    year?: number
  }>
}

export const education: Education = {
  formal: [
    {
      title: 'Ethereum Developer Pack (Solidity)',
      org: 'Ethereum Costa Rica & Cenfotec University',
      year: 2025,
    },
    {
      title: 'Scrum Master',
      org: 'Certiprof',
      year: 2020,
    },
    {
      title: 'BIOSOFT',
      org: 'Universidad Cenfotec | Montes de Oca, San José, Costa Rica',
      year: 2015,
    },
  ],
  informal: [
    {
      title: 'Cairo Smart Contracts',
      org: 'Starknet Basecamp #13',
      year: 2025,
    },
    {
      title: 'DevOps & Blockchain',
      org: 'LinkedIn Learning',
      year: 2022,
    },
    {
      title: 'Advanced React Components',
      org: 'EggHead.io',
      year: 2018,
    },
    {
      title: 'Full-stack developer track',
      org: 'TeamTreehouse',
      year: 2017,
    },
    
  ],
}
