export interface Article {
  title: string
  description: string
  url: string
  publishedAt: string
  category: string
  tags: string[]
}

export interface ArticleCategory {
  key: string
  label: string
  description: string
}

export const articleCategories: ArticleCategory[] = [
  {
    key: 'software',
    label: 'Software & Dev Fundamentals',
    description: 'Technical articles about software development and best practices.',
  },
  {
    key: 'web3',
    label: 'Web3 & Open Source',
    description: 'Blockchain, DeFi, and open source development insights.',
  },
  {
    key: 'arts',
    label: 'Arts & Culture',
    description: 'Music composition, cultural preservation, and artistic expression.',
  },
  {
    key: 'education',
    label: 'Educational & Community',
    description: 'Learning resources and community building initiatives.',
  },
]
