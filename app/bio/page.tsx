'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Hero } from '@/components/layout/Hero'
import { Section } from '@/components/ui/Section'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { CertifiedBadge } from '@/components/ui/CertifiedBadge'
import InteractiveTreeMap from '@/components/interactive/InteractiveTreeMap'
import { MapPin, Calendar, Award, Music, Code, Users, Globe, Heart, Star, BookOpen, Network } from 'lucide-react'

export default function BioPage() {
  const [isTreeMapOpen, setIsTreeMapOpen] = useState(false);
  const [activeTreeTab, setActiveTreeTab] = useState<'journey' | 'achievements' | 'interests' | 'timeline'>('journey');

  const heroData = {
    profile: 'arts' as const,
    title: 'Biography',
    subtitle: "José Alejandro Gómez Castro",
    subtitle2: "From Costa Rica to the World",
            description: 'A journey of technology, arts and cultural innovation.',
    showTreeMapButton: true,
    onTreeMapClick: () => {
      setActiveTreeTab('journey');
      setIsTreeMapOpen(true);
    }
  }

  const handleOpenTreeMap = (tab: 'journey' | 'achievements' | 'interests' | 'timeline') => {
    setActiveTreeTab('journey'); // Always use journey for bio page
    setIsTreeMapOpen(true);
  };

  const tabs = [
    {
      id: 'journey',
      label: '🌍 Life Journey',
      content: (
        <div className="space-y-8">


          {/* Early Life */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Early Life & Roots</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Costa Rica</h4>
                    <p className="text-white/60 text-sm">Born and raised in the beautiful landscapes of Costa Rica, where nature meets innovation. Pura vida! 🏖️ 🌋 ☀️</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Early 1990s</h4>
                    <p className="text-white/60 text-sm">Growing up during the digital revolution, the birth of the internet age. Retro gaming enthusiast and nerd but old-school guy with a lot of interests</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Music className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Musical Foundation</h4>
                    <p className="text-white/60 text-sm">Early exposure to Costa Rican, Mexican and Colombian folk music - classical and empyrical training through mnemotechnic methods</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Code className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">First Computer</h4>
                    <p className="text-white/60 text-sm">Discovered programming at a young age, fascinated by creating digital worlds, building apps and creating digital content</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Education</h4>
                    <p className="text-white/60 text-sm">Computer Science studies with focus on software engineering and web development - Scrum Master Certification and Ethereum Developer Pack (Solidity)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Global Perspective</h4>
                    <p className="text-white/60 text-sm">International exposure through travel and remote work opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Evolution */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Career Evolution</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Web2 Developer (2014-2022)</h4>
                  <p className="text-white/60 text-sm mb-2">Built enterprise platforms, mobile apps, and full-stack solutions. Mastered React, Next.js, TypeScript, and modern web technologies.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">React</Badge>
                    <Badge variant="primary">Next.js</Badge>
                    <Badge variant="primary">TypeScript</Badge>
                    <Badge variant="default">Firebase</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-secondary font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Web3 Pioneer (2022-2024)</h4>
                  <p className="text-white/60 text-sm mb-2">Transitioned to blockchain development, exploring DeFi, NFTs, and decentralized applications. Won hackathons and built innovative protocols.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Solidity</Badge>
                    <Badge variant="secondary">Cairo</Badge>
                    <Badge variant="secondary">Stellar SDK</Badge>
                    <Badge variant="secondary">DeFi</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Web3 Founder (2025+)</h4>
                  <p className="text-white/60 text-sm mb-2">Building the future of decentralized technology, focusing on innovative solutions that bridge technology and culture.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Innovation</Badge>
                    <Badge variant="default">Leadership</Badge>
                    <Badge variant="default">Strategy</Badge>
                    <Badge variant="default">Vision</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Impact */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Cultural Impact & Innovation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <Code className="w-5 h-5 text-primary" />
                  <span>Tech Innovation</span>
                </h4>
                <p className="text-white/60 text-sm">Pioneering Web3 development and open-source contributions that impact the global tech community.</p>
                <div className="flex flex-wrap gap-2">
                  <CertifiedBadge variant="tech">Web3 Development</CertifiedBadge>
                  <CertifiedBadge variant="tech">Open Source</CertifiedBadge>
                  <CertifiedBadge variant="tech">Community Building</CertifiedBadge>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <Music className="w-5 h-5 text-primary" />
                  <span>Musical Innovation</span>
                </h4>
                <p className="text-white/60 text-sm">National awards winner for musical excellence and cultural preservation through modern folkloric compositions and arrangements.</p>
                                 <div className="flex flex-wrap gap-2">
                   <CertifiedBadge variant="design">Composition</CertifiedBadge>
                   <CertifiedBadge variant="design">Production</CertifiedBadge>
                   <CertifiedBadge variant="design">Cultural Preservation</CertifiedBadge>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'achievements',
      label: '🏆 Achievements',
      content: (
        <div className="space-y-8">

          {/* Tech Achievements */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title flex items-center space-x-2">
              <Code className="w-6 h-6" />
              <span>Technology Achievements</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Starknet Hackathon Winner 2025</h4>
                  <p className="text-white/60 text-sm">BlockBeats 3.0 - Second place in blockchain innovation competition <a className='text-primary' href={process.env.NEXT_PUBLIC_BLOCKBEATS_ARTICLE || '#'} target="_blank" rel="noopener noreferrer">Read More...</a></p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Imagine.XYZ Hardwarethon Winner</h4>
                  <p className="text-white/60 text-sm">Kapökwã - Second Place with an Apnea biomedical device build in one weekend <a className='text-primary' href={process.env.NEXT_PUBLIC_KAPOKWA_ARTICLE || '#'} target="_blank" rel="noopener noreferrer">Read More...</a></p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Open Source Contributor</h4>
                  <p className="text-white/60 text-sm">Active contributor to Web3 and developer communities <a className='text-primary' href={process.env.NEXT_PUBLIC_GITHUB_URL || '#'} target="_blank" rel="noopener noreferrer">check GitHub profile...</a></p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Ethereum Speedrun Builder</h4>
                  <p className="text-white/60 text-sm">Recognized builder in the Ethereum ecosystem <a className='text-primary' href={process.env.NEXT_PUBLIC_ETHEREUM_BUILDER_URL || '#'} target="_blank" rel="noopener noreferrer">check Builder profile...</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Music Awards */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title flex items-center space-x-2">
              <Award className="w-6 h-6" />
              <span>Musical Achievements</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">National Music Awards</h4>
                  <p className="text-white/60 text-sm">Winner of prestigious Costa Rican music awards in 2013, and 2024</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Music className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Cultural Preservation through Music</h4>
                  <p className="text-white/60 text-sm">Modern and folkloric music compositions and arrangements</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">International Recognition</h4>
                  <p className="text-white/60 text-sm">Featured on national television and international platforms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Projects */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <span>Personal Projects</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white"> <strong>Musical Path</strong> Board Game </h4>
                <p className="text-white/60 text-sm">Educational & interactive game platform for music learning (digital/physical)</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Festivartes</h4>
                <p className="text-white/60 text-sm">Arts & culture platform connecting artists, judges and artworks</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Catarsis Musical</h4>
                <p className="text-white/60 text-sm">Telegram mini app for music education courses</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">BlockBeats 3.0</h4>
                <p className="text-white/60 text-sm">Blockchain Launchpad to create, mint, and trade Musical NFTs</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'interests',
      label: '🎯 Interests',
      content: (
        <div className="space-y-8">
          {/* Technology */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Technology & Innovation</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Code className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Web3 Development</span>
              </div>
              <p className="text-white/60 text-sm">Passionate about blockchain technology, DeFi protocols, and decentralized applications. Exploring the future of finance and digital ownership.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Blockchain</Badge>
                <Badge variant="secondary">DeFi</Badge>
                <Badge variant="secondary">Smart Contracts</Badge>
                <Badge variant="secondary">NFTs</Badge>
              </div>
            </div>
          </div>

          {/* Music */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Music & Culture</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Music className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Cultural Preservation</span>
              </div>
              <p className="text-white/60 text-sm">Dedicated to preserving and modernizing traditional Costa Rican music while creating innovative musical experiences.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Folk Music</Badge>
                <Badge variant="default">Composition</Badge>
                <Badge variant="default">Arts & Culture</Badge>
                <Badge variant="default">Education</Badge>
              </div>
            </div>
          </div>

          {/* Community */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Community & Education</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Open Source & Education</span>
              </div>
              <p className="text-white/60 text-sm">Committed to building inclusive communities and sharing knowledge through open-source projects and educational content.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Open Source</Badge>
                <Badge variant="default">Education</Badge>
                <Badge variant="default">Community Building</Badge>
                <Badge variant="default">Mentorship</Badge>
              </div>
            </div>
          </div>

          {/* Innovation */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4 bio-card-title">Innovation & Future</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-white font-medium">Cross-Disciplinary Innovation</span>
              </div>
              <p className="text-white/60 text-sm">Exploring the intersection of technology, music, and culture to create unique solutions that bridge traditional and digital worlds.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Innovation</Badge>
                <Badge variant="default">Cross-Disciplinary</Badge>
                <Badge variant="default">Future Tech</Badge>
                <Badge variant="default">Creative Solutions</Badge>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'timeline',
      label: '📅 Timeline',
      content: (
        <div className="space-y-8">


          {/* Timeline */}
          <div className="space-y-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/20"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">2014</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">First National Music Award</h4>
                    <p className="text-white/60 text-sm">Recognition for musical excellence and cultural contribution</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">2015</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Computer Science Studies</h4>
                    <p className="text-white/60 text-sm">Began formal education in software engineering</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold text-sm">2016</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Web Development Career</h4>
                    <p className="text-white/60 text-sm">Started professional journey in software development</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold text-sm">2017</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Professional Experience</h4>
                    <p className="text-white/60 text-sm">Started working in the software industry as a full-stack developer in Sillicon Valley based startup</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-bold text-sm">2022</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Web3 Transition</h4>
                    <p className="text-white/60 text-sm">Began exploring blockchain and decentralized technologies</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">2023</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Sabbatical Year</h4>
                    <p className="text-white/60 text-sm">I built my own office / home studio and recorded my first album</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">2024</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Second National Music Award</h4>
                    <p className="text-white/60 text-sm">Continued recognition for musical and cultural contributions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">2025</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Lighthing Works (Comic, Manga, NFTs, Games, Crypto Invest)</h4>
                    <p className="text-white/60 text-sm">Start up company focused on creating content for the web3 space</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">2025</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Starknet Hackathon Winner</h4>
                    <p className="text-white/60 text-sm">BlockBeats 3.0 - Second place in blockchain innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div>
      <Hero {...heroData} />
      <Section id="content" title="Biography" description="Explore my personal journey and achievements">
        <Tabs tabs={tabs} defaultTab="journey" />
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
