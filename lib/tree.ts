import { Node, Edge } from 'reactflow'

export interface TreeNode {
  id: string
  label: string
  description: string
  category: 'tech' | 'arts' | 'crossover'
  links: Array<{
    label: string
    url: string
    type: 'internal' | 'external'
  }>
}

export const treeNodes: TreeNode[] = [
  {
    id: 'root',
    label: 'José Alejandro Gómez Castro — Tech × Arts',
    description: 'Next-Gen Web3 Open Source Developer',
    category: 'crossover',
    links: [
      { label: 'Tech Profile', url: '/tech', type: 'internal' },
      { label: 'Arts Profile', url: '/arts', type: 'internal' },
    ],
  },
  {
    id: 'tech',
    label: 'Software Engineer (Web2 → Web3)',
    description: '10+ years shipping web & mobile apps. React/Next.js/TS, Solidity & Cairo, Stellar SDK, Firebase; UX-first builder.',
    category: 'tech',
          links: [
        { label: 'View Tech Profile', url: '/tech', type: 'internal' },
        { label: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL || '#', type: 'external' },
      ],
  },
  {
    id: 'arts',
    label: 'Musician (Composer/Producer)',
    description: 'Composer/producer with national awards in Costa Rica (2013, 2015, 2024). Original soundtracks + modern folkloric adaptations.',
    category: 'arts',
    links: [
      { label: 'View Arts Profile', url: '/arts', type: 'internal' },
      { label: 'Studio: Catarsis Musical', url: '', type: 'external' },
    ],
  },
  {
    id: 'web2',
    label: 'Web2 Projects',
    description: 'Enterprise platforms, mobile apps, and full-stack solutions built with modern web technologies.',
    category: 'tech',
    links: [
      { label: 'View Projects', url: '/tech#projects', type: 'internal' },
    ],
  },
  {
    id: 'web3',
    label: 'Web3 Projects',
    description: 'Blockchain platforms, DeFi protocols, and NFT marketplaces pushing the boundaries of decentralized technology.',
    category: 'tech',
    links: [
      { label: 'View Projects', url: '/tech#projects', type: 'internal' },
    ],
  },
  {
    id: 'awards',
    label: 'Awards & Folklore',
    description: 'National recognition for musical excellence and cultural preservation through modern folkloric adaptations.',
    category: 'arts',
    links: [
      { label: 'View Awards', url: '/arts#awards', type: 'internal' },
    ],
  },
  {
    id: 'crossover',
    label: 'Cross-Over: Music × Web3',
    description: 'Innovative projects bridging music and blockchain technology, including BlockBeats 3.0 and cultural preservation initiatives.',
    category: 'crossover',
    links: [
      { label: 'BlockBeats 3.0', url: '/tech#blockbeats', type: 'internal' },
      { label: 'Cultural Projects', url: '/arts#folkloric', type: 'internal' },
    ],
  },
]

export const nodes: Node[] = treeNodes.map((node) => ({
  id: node.id,
  position: getNodePosition(node.id),
  data: { 
    label: node.label,
    description: node.description,
    category: node.category,
    links: node.links,
  },
  type: node.id === 'root' ? 'input' : 'default',
  style: getNodeStyle(node.category),
}))

export const edges: Edge[] = [
  { id: 'e1', source: 'root', target: 'tech', style: { stroke: '#00E5FF', strokeWidth: 2 } },
  { id: 'e2', source: 'root', target: 'arts', style: { stroke: '#FF4DFF', strokeWidth: 2 } },
  { id: 'e3', source: 'tech', target: 'web2', style: { stroke: '#00E5FF', strokeWidth: 1.5 } },
  { id: 'e4', source: 'tech', target: 'web3', style: { stroke: '#00E5FF', strokeWidth: 1.5 } },
  { id: 'e5', source: 'arts', target: 'awards', style: { stroke: '#FF4DFF', strokeWidth: 1.5 } },
  { id: 'e6', source: 'root', target: 'crossover', style: { stroke: '#9B5CFF', strokeWidth: 2 } },
]

function getNodePosition(id: string) {
  const positions: Record<string, { x: number; y: number }> = {
    root: { x: 400, y: 50 },
    tech: { x: 150, y: 200 },
    arts: { x: 650, y: 200 },
    web2: { x: 50, y: 350 },
    web3: { x: 250, y: 350 },
    awards: { x: 750, y: 350 },
    crossover: { x: 400, y: 350 },
  }
  return positions[id] || { x: 0, y: 0 }
}

function getNodeStyle(category: string) {
  const baseStyle = {
    padding: 16,
    borderRadius: 12,
    border: '2px solid',
    fontSize: 14,
    fontWeight: 600,
    textAlign: 'center' as const,
    minWidth: 120,
  }

  switch (category) {
    case 'tech':
      return {
        ...baseStyle,
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        borderColor: '#00E5FF',
        color: '#00E5FF',
      }
    case 'arts':
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255, 77, 255, 0.1)',
        borderColor: '#FF4DFF',
        color: '#FF4DFF',
      }
    case 'crossover':
      return {
        ...baseStyle,
        backgroundColor: 'rgba(155, 92, 255, 0.1)',
        borderColor: '#9B5CFF',
        color: '#9B5CFF',
      }
    default:
      return baseStyle
  }
}
