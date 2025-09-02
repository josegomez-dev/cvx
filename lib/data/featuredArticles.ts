export interface FeaturedArticle {
  id: string
  title: string
  description: string
  year: number
  link: string
  type: 'popular' | 'company' | 'educational'
  company?: string
  claps?: number
  category: string
}

export const featuredArticles: FeaturedArticle[] = [
  {
    id: 'stellar-escrow',
    title: 'Building Trustless Escrow Systems on Stellar (A Developer\'s Guide)',
    description: 'Technical guide exploring trustless escrow systems on Stellar blockchain. Covers the "Baby Steps to Riches" demo, escrow initialization, milestone completion, and auto-release mechanisms.',
    year: 2025,
    link: 'https://josegomezdev.medium.com/building-trustless-escrow-systems-on-stellar-a-developers-guide-770e402751f9',
    type: 'popular',
    category: 'web3'
  },
  {
    id: 'hardhat-guide',
    title: 'Getting Started with Hardhat',
    description: 'Published technical guide for CoinsBench on deploying smart contracts locally with Hardhat. Step-by-step tutorial for Web3 developers.',
    year: 2025,
    link: 'https://medium.com/@alegomez/getting-started-with-hardhat',
    type: 'company',
    company: 'CoinsBench',
    category: 'web3'
  },
  {
    id: 'sdlc-article',
    title: 'Full Software Development Life Cycle',
    description: 'Published comprehensive article on Medium about implementing full SDLC using UML and LucidChart for diagramming. Received high engagement and claps from the developer community.',
    year: 2021,
    link: 'https://medium.com/@alegomez/full-software-development-life-cycle',
    type: 'popular',
    claps: 100,
    category: 'software'
  },
  {
    id: 'structured-programming',
    title: 'Structured Programming Fundamentals | Software Engineering (Demo)',
    description: 'Comprehensive guide for beginners in structured programming, focusing on Java and essential software engineering concepts. Includes practical examples, algorithms, programming structures, and variable management.',
    year: 2019,
    link: 'https://es.slideshare.net/slideshow/structured-programming-fundamentals-software-engineering-demo/165948848',
    type: 'educational',
    category: 'software'
  }
]
