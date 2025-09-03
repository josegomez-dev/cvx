'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/layout/Hero'
import { Section } from '@/components/ui/Section'
import { Tabs } from '@/components/ui/Tabs'
import { ProjectCard } from '@/components/features/ProjectCard'
import { ArticleList } from '@/components/features/ArticleList'
import { Badge } from '@/components/ui/Badge'
import { CertifiedBadge } from '@/components/ui/CertifiedBadge'
import { projectsWeb2 } from '@/lib/data/projectsWeb2'
import { projectsWeb3 } from '@/lib/data/projectsWeb3'
import { aiToolkit } from '@/lib/data/aiToolkit'
import { education } from '@/lib/data/education'
import { HackathonCard } from '@/components/features/HackathonCard'
import { hackathonAchievements } from '@/lib/data/hackathons'
import { FeaturedArticles } from '@/components/features/FeaturedArticles'
import { featuredArticles } from '@/lib/data/featuredArticles'
import { EducationTimeline } from '@/components/features/EducationTimeline'
import InteractiveTreeMap from '@/components/interactive/InteractiveTreeMap'
import { FolderOpen, Network } from 'lucide-react'

export default function TechPage() {
  const [isTreeMapOpen, setIsTreeMapOpen] = useState(false);
  const [activeTreeTab, setActiveTreeTab] = useState<'overview' | 'projects' | 'competitions' | 'blog'>('overview');

  const heroData = {
    profile: 'tech' as const,
    title: 'Howdy, I\'m',
    subtitle: "José Alejandro Gómez Castro",
    subtitle2: "Next-Gen Web3 Open Source Developer",
    description: '10+ years shipping desktop &web & mobile apps. UX-first builder.',
    showTreeMapButton: true,
    onTreeMapClick: () => {
      setActiveTreeTab('overview');
      setIsTreeMapOpen(true);
    }
  }

  const handleOpenTreeMap = (tab: 'overview' | 'projects' | 'competitions' | 'blog') => {
    setActiveTreeTab('overview'); // Always use overview for tech page
    setIsTreeMapOpen(true);
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-8">


          {/* Tech Stack Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary mb-4 tech-card-title">Core Technologies</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Frontend
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(React/Next.js/TS/TailwindCSS)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">React</Badge>
                    <Badge variant="primary">Next.js</Badge>
                    <Badge variant="primary">TypeScript</Badge>
                    <Badge variant="primary">TailwindCSS</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Backend
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Firebase/MongoDB)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Firebase</Badge>
                    <Badge variant="default">MongoDB</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Web3
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Solidity / Cairo (Starknet) / Stellar SDK)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Solidity</Badge>
                    <Badge variant="secondary">Cairo (Starknet)</Badge>
                    <Badge variant="secondary">StellarSDK</Badge>
                    <Badge variant="secondary">OpenZeppelin</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary mb-4 tech-card-title">Tools & Platforms</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    AI Tools
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Github Copilot/ChatGPT5/Cursor/Grok3)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CertifiedBadge variant="ai">Github Copilot</CertifiedBadge>
                    <CertifiedBadge variant="ai">ChatGPT5</CertifiedBadge>
                    <CertifiedBadge variant="ai">Cursor</CertifiedBadge>
                    <CertifiedBadge variant="ai">Grok3</CertifiedBadge>
                    <CertifiedBadge variant="ai">DeepSeek</CertifiedBadge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Design & Audiovisuals
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Wireframes/Mockups/Edition & Production)</span>  
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CertifiedBadge variant="design">Scalidraw</CertifiedBadge>
                    <CertifiedBadge variant="design">Figma</CertifiedBadge>
                    <CertifiedBadge variant="design">Canva</CertifiedBadge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Documentation
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Business Plans/Product Roadmaps/Tokenomics)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CertifiedBadge variant="docs">Gitbooks</CertifiedBadge>
                    <CertifiedBadge variant="docs">Swagger</CertifiedBadge>
                  </div>
                </div>
              </div>
            </div>            

            <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 tech-card-title">Development Tools & Methodologies</h3>
            <div className="space-y-4">
              <div>
                                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Development Environment
                  <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(IDE/Terminal/Package Managers)</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  <CertifiedBadge variant="dev">VSCode</CertifiedBadge>
                  <CertifiedBadge variant="dev">iTerm2</CertifiedBadge>
                  <CertifiedBadge variant="dev">npm</CertifiedBadge>
                  <CertifiedBadge variant="dev">yarn</CertifiedBadge>
                  <CertifiedBadge variant="dev">pnpm</CertifiedBadge>
                  <CertifiedBadge variant="dev">ESLint</CertifiedBadge>
                </div>
              </div>
              <div>
                                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Version Control & Collaboration
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Git/Project Management)</span>
                  </h4>
                <div className="flex flex-wrap gap-2">
                  <CertifiedBadge variant="collab">GitHub</CertifiedBadge>
                  <CertifiedBadge variant="collab">SourceTree</CertifiedBadge>
                  <CertifiedBadge variant="collab">Bitbucket</CertifiedBadge>
                  <CertifiedBadge variant="collab">Trello</CertifiedBadge>
                  <CertifiedBadge variant="collab">Jira</CertifiedBadge>
                </div>
              </div>
              <div>
                                  <h4 className="font-semibold dark:text-white light:text-gray-900 mb-2 flex items-center">
                    Productivity & Planning
                    <span className="ml-2 text-xs dark:text-white/60 light:text-gray-600">(Second Brain/Visual Thinking/Time Management)</span>
                  </h4>
                <div className="flex flex-wrap gap-2">
                  <CertifiedBadge variant="productivity">Notion</CertifiedBadge>
                  <CertifiedBadge variant="productivity">Bullet Journal</CertifiedBadge>
                  <CertifiedBadge variant="productivity">Time Boxing</CertifiedBadge>
                  <CertifiedBadge variant="productivity">Miro</CertifiedBadge>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Highlights */}
          <div className="card p-6">
                          <h3 className="text-xl font-bold text-primary mb-4 tech-card-title">Experience Highlights</h3>
            <ul className="space-y-3 dark:text-white/80 light:text-gray-700">
                              <li>• <motion.a href={process.env.NEXT_PUBLIC_GITHUB_URL || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-primary/20 hover:border-primary/40"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(0, 229, 255, 0)",
                      "0 0 8px rgba(0, 229, 255, 0.2)",
                      "0 0 0 rgba(0, 229, 255, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}>📝 Web2 foundations to Web3 pioneer</motion.a> transformation</li>
                              <li>• <motion.a 
                  href={process.env.NEXT_PUBLIC_REPRETEL_ARTICLE || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-primary/20 hover:border-primary/40"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(0, 229, 255, 0)",
                      "0 0 8px rgba(0, 229, 255, 0.2)",
                      "0 0 0 rgba(0, 229, 255, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >📺 Most recent personal interview</motion.a> on national television</li>
              <li>• <motion.a 
                  href={process.env.NEXT_PUBLIC_GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-secondary/20 hover:border-secondary/40"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(155, 92, 255, 0)",
                      "0 0 8px rgba(155, 92, 255, 0.2)",
                      "0 0 0 rgba(155, 92, 255, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >💻 Open source contributor</motion.a> and community builder</li>
              <li>• <motion.a 
                  href={process.env.NEXT_PUBLIC_ETHEREUM_BUILDER_URL || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-accent/20 hover:border-accent/40"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(255, 77, 255, 0)",
                      "0 0 8px rgba(255, 77, 255, 0.2)",
                      "0 0 0 rgba(255, 77, 255, 0)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >⚡ Ethereum Speedrun Challenges</motion.a> URL Profile</li>
            </ul>
          </div>

          </div>

        </div>
      )
    },
    {
      id: 'projects',
      label: '🌀 Projects',
      content: (
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center tech-card-title">
              <FolderOpen className="h-6 w-6 mr-3" />
              Most Recent Web3 Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsWeb3.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.summary}
                  tags={[project.chain]}
                  links={project.links}
                  demoVideo={project.demoVideo}
                  liveApp={project.liveApp}
                  docs={project.docs}
                  githubRepo={project.githubRepo}
                  company={project.company}
                  role={project.role}
                  year={project.year}
                  variant="secondary"
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center tech-card-title">
              <FolderOpen className="h-6 w-6 mr-3" />
              Web2 Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsWeb2.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.summary}
                  tags={project.stack}
                  links={project.links}
                  demoVideo={project.demoVideo}
                  liveApp={project.liveApp}
                  docs={project.docs}
                  githubRepo={project.githubRepo}
                  company={project.company}
                  role={project.role}
                  year={project.year}
                  variant="primary"
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center tech-card-title">
              <FolderOpen className="h-6 w-6 mr-3" />
              Personal Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="Musical Path"
                description="Our first game, “Musical Path,” introduces musical grades, allowing users to learn and explore the essential foundations of music in an interactive, family-friendly way."
                tags={['Unity', 'C#', '2D Platformer', 'Game Development']}
                                  links={[
                    { label: 'Product Demo', url: process.env.NEXT_PUBLIC_MUSICAL_PATH_GAME || '#' },
                    { label: 'Play Now', url: process.env.NEXT_PUBLIC_MUSICAL_PATH_URL || '#' },
                    { label: 'Demo', url: process.env.NEXT_PUBLIC_MUSICAL_PATH_VIDEO || '#' },
                    { label: 'Board Game', url: process.env.NEXT_PUBLIC_CATARSIS_PATREON || '#' },
                    { label: 'Store', url: process.env.NEXT_PUBLIC_CATARSIS_STORE || '#' },
                  ]}
                company="Non-Profit"
                role="Product Owner & Game Creator"
                year={2024}
                variant="personal"
              />
              <ProjectCard
                title="Festivartes"
                description="Festivartes is a Costa Rican platform that brings together art, education, and safe technology to help children, youth, and artists unlock their full creative potential. We believe in a future where culture is a driving force for innovation, well-being, and social transformation"
                tags={['Web App', 'Arts & Culture', 'Ratings & Awards', 'React TS/Next.js', 'Firebase']}
                                  links={[
                    { label: 'Live App', url: process.env.NEXT_PUBLIC_FESTIVARTES_URL || '#' },
                    { label: 'Telegram Bot', url: process.env.NEXT_PUBLIC_FESTIVARTES_BOT || '#' },
                    { label: 'Docs', url: process.env.NEXT_PUBLIC_FESTIVARTES_DOCS || '#' },
                    { label: 'GitHub', url: process.env.NEXT_PUBLIC_FESTIVARTES_GITHUB || '#' },
                  ]}
                company="Non-Profit"
                role="Product Owner & Developer"
                year={2024}
                variant="personal"
              />
              <ProjectCard
                title="Catarsis Musical"
                description="Telegram mini app platform with musical courses. Interactive learning experience for immersive education experience."
                tags={['Telegram Mini App', 'VainillaJS','Music Education']}
                                  links={[
                    { label: 'Live App', url: process.env.NEXT_PUBLIC_CATARSIS_BOT || '#' },
                    { label: 'Telegram Mini App', url: process.env.NEXT_PUBLIC_CATARSIS_ACADEMIA || '#' },
                    { label: 'Catarsis Musical', url: process.env.NEXT_PUBLIC_CATARSIS_MUSICAL_URL || '#' },
                  ]}
                company="Non-Profit"
                role="Product Owner & Developer"
                variant="personal"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hackathons',
      label: '🏆 Competitions',
      content: (
        <div className="space-y-8">


          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4 tech-card-title">Competition Achievements</h3>
            <p className="dark:text-white/60 light:text-gray-600 max-w-2xl mx-auto">
              From biomedical devices to blockchain innovations, explore my journey through various hackathons, 
              challenges, and competitions that showcase rapid prototyping and problem-solving skills.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hackathonAchievements.map((achievement, index) => (
              <HackathonCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'articles',
      label: '📝 Blog',
      content: (
        <div className="space-y-12">


          <FeaturedArticles articles={featuredArticles} />
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6 tech-card-title">All Articles</h3>
            <ArticleList categories={['software', 'web3']} />
          </div>
        </div>
      )
    },
    {
      id: 'education',
      label: '👨‍🏫 Education',
      content: <EducationTimeline />
    }
  ]

  return (
    <div>
      <Hero {...heroData} />
      <Section id="content" title="Tech Profile" description="Explore my software engineering journey">
        <Tabs tabs={tabs} defaultTab="overview" />
      </Section>
      
      {/* Interactive Tree Map */}
      <InteractiveTreeMap 
        isOpen={isTreeMapOpen}
        onClose={() => setIsTreeMapOpen(false)}
        activeTab={activeTreeTab}
      />
    </div>
  )
}
