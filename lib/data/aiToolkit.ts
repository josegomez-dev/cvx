export interface AIToolkit {
  wireframes: string[]
  prototyping: string[]
  smartContracts: string[]
  aiAssist: string[]
  genAssets: string[]
  testing: string[]
  ciCd: string[]
  agile: string[]
}

export const aiToolkit: AIToolkit = {
  wireframes: ['Figma', 'Whimsical', 'Excalidraw'],
  prototyping: ['Next.js 14', 'React', 'Tailwind', 'Firebase'],
  smartContracts: ['Solidity', 'Cairo (Starknet)', 'Stellar SDK'],
  aiAssist: ['Cursor', 'Gemini'],
  genAssets: ['HuggingFace', 'Stable Diffusion / Polinations'],
  testing: ['Cypress', 'Jest', 'Hardhat', 'Starklings'],
  ciCd: ['Vercel', 'GitHub Actions', 'Docker', 'Firebase Hosting'],
  agile: ['Trello', 'GitHub Projects', 'Scrum Master frameworks'],
}
