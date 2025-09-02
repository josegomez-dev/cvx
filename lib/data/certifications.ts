export interface Certification {
  title: string
  org: string
  year?: number
  url?: string
}

export const certifications: Certification[] = [
  {
    title: 'Certified Scrum Master',
    org: 'Certiprof',
    year: 2023,
  },
  {
    title: 'DevOps Fundamentals',
    org: 'Certiprof',
    year: 2023,
  },
  {
    title: 'Ethereum Developer Pack (Solidity)',
    org: 'Ethereum Costa Rica',
    year: 2022,
  },
  {
    title: 'Starknet Basecamp Graduate',
    org: 'Starknet',
    year: 2024,
  },
]
