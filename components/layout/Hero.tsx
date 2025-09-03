'use client'

import { motion } from 'framer-motion'
import { Profile } from '@/store/useUI'
import { TechDescription } from '../animations/AnimatedText'
import { TechDescriptionTypewriter, BioDescriptionTypewriter } from '../animations/TypewriterText'
import { TypewriterSubtitle } from '../animations/TypewriterSubtitle'
import { AnimatedHighlights } from '../animations/AnimatedHighlights'
import { CertifiedBadge } from '../ui/CertifiedBadge'
import { Network } from 'lucide-react'

interface HeroProps {
  profile: Profile
  title: string
  subtitle: string
  subtitle2?: string
  description: string
  highlights?: string[]
  showTreeMapButton?: boolean
  onTreeMapClick?: () => void
}

export function Hero({ 
  profile, 
  title, 
  subtitle, 
  subtitle2,
  description, 
  highlights = [],
  showTreeMapButton = false,
  onTreeMapClick
}: HeroProps) {
  const isTech = profile === 'tech'
  const accentColor = isTech ? 'primary' : 'accent'

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 -mb-[80px]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl sm:text-6xl font-bold ${profile === 'tech' ? `text-${accentColor} tech-title` : 'text-white bio-title'} mb-4`}>
            {title}
          </h1>
          <p className={`text-xl lg:text-4xl text-white/80 mb-2 ${profile === 'tech' ? 'tech-name' : 'bio-name'}`}>
            {subtitle}
          </p>
          
          {profile === 'tech' ? (
            <TechDescriptionTypewriter />
          ) : (
            <BioDescriptionTypewriter />
          )}


          {/* Certified Badges Section */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {profile === 'tech' ? (
              <>
                <CertifiedBadge variant="scrum" hasStar>Scrum Master</CertifiedBadge>
                <CertifiedBadge variant="dev" hasStar className="!bg-gradient-to-r !from-cyan-500/20 !to-blue-500/20 !border-cyan-500/30 !text-cyan-400">Full-Stack</CertifiedBadge>
                <CertifiedBadge variant="devops" hasStar className="!bg-gradient-to-r !from-cyan-500/20 !to-indigo-500/20 !border-cyan-500/30 !text-cyan-400">DevOps</CertifiedBadge>
                <CertifiedBadge variant="web3" hasStar className="!bg-gradient-to-r !from-cyan-500/20 !to-purple-500/20 !border-cyan-500/30 !text-cyan-400">Web3</CertifiedBadge>
              </>
            ) : (
              <>
                <CertifiedBadge variant="scrum" hasStar>Scrum Master</CertifiedBadge>
                <CertifiedBadge variant="dev" hasStar className="!bg-gradient-to-r !from-cyan-500/20 !to-blue-500/20 !border-cyan-500/30 !text-cyan-400">Full-Stack</CertifiedBadge>
                <CertifiedBadge variant="web3" hasStar className="!bg-gradient-to-r !from-cyan-500/20 !to-purple-500/20 !border-cyan-500/30 !text-cyan-400">Web3</CertifiedBadge>
                <CertifiedBadge variant="design" hasStar className="!bg-gradient-to-r !from-red-500/20 !to-pink-500/20 !border-red-500/30 !text-red-400">Musician</CertifiedBadge>
                <CertifiedBadge variant="ai" hasStar className="!bg-gradient-to-r !from-red-500/20 !to-orange-500/20 !border-red-500/30 !text-red-400">Composer</CertifiedBadge>
                <CertifiedBadge variant="docs" hasStar className="!bg-gradient-to-r !from-red-500/20 !to-rose-500/20 !border-red-500/30 !text-red-400">Producer</CertifiedBadge>
              </>
            )}
          </div>

          {/* Tree Map Button */}
          {showTreeMapButton && onTreeMapClick && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <motion.button
                onClick={onTreeMapClick}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Network className="w-5 h-5" />
                <span>View Interactive Tree Map</span>
              </motion.button>
            </motion.div>
          )}


        </motion.div>

        {/* Animated Highlights */}
        {highlights.length > 0 && (
          <AnimatedHighlights highlights={highlights} />
        )}


      </div>
    </section>
  )
}
