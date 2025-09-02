'use client'

import { motion } from 'framer-motion'
import { Profile } from '@/store/useUI'
import { TechDescription } from './AnimatedText'
import { TechDescriptionTypewriter } from './TypewriterText'
import { AnimatedHighlights } from './AnimatedHighlights'
import { CertifiedBadge } from './CertifiedBadge'

interface HeroProps {
  profile: Profile
  title: string
  subtitle: string
  subtitle2?: string
  description: string
  highlights?: string[]
}

export function Hero({ 
  profile, 
  title, 
  subtitle, 
  subtitle2,
  description, 
  highlights = []
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
          <h1 className={`text-4xl sm:text-6xl font-bold text-${accentColor} mb-4`}>
            {title}
          </h1>
          <p className="text-xl lg:text-4xl text-white/80 mb-2">
            {subtitle}
          </p>
          {subtitle2 && (
            <p className="text-lg sm:text-xl text-white/60 mb-6">
              {subtitle2}
            </p>
          )}

          {/* Certified Badges Section */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <CertifiedBadge variant="scrum" hasStar>Scrum Master</CertifiedBadge>
            <CertifiedBadge variant="devops" hasStar>DevOps</CertifiedBadge>
            <CertifiedBadge variant="dev" hasStar>Full-Stack</CertifiedBadge>
            <CertifiedBadge variant="web3" hasStar>Web3</CertifiedBadge>
          </div>


          {profile === 'tech' ? (
            <TechDescriptionTypewriter />
          ) : (
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-8">
              {description}
            </p>
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
