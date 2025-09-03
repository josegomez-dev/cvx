'use client'

import { motion } from 'framer-motion'
import { Code, Music, ArrowRight, Map } from 'lucide-react'
import Link from 'next/link'
import { CertifiedBadge } from '@/components/CertifiedBadge'
import { RotatingPhrases } from '@/components/RotatingPhrases'
import { TypewriterSubtitle } from '@/components/TypewriterSubtitle'
import { TiltCard } from '@/components/TiltCard'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          José Alejandro Gómez Castro
        </h1>
        <TypewriterSubtitle 
          text="Next-Gen Web3 Open Source Developer"
          speed={80}
        />
        <p className="text-lg text-white/60 mb-12">
          Choose your path… or explore the Biography map
        </p>
      </motion.div>

      {/* Biography Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center relative mb-16 -mt-[100px]"
      >        
        <div className="relative inline-block">
          <Link 
            href="/bio"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all group blur-sm"
          >
            <Map className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Explore the Interactive Biography Map</span>
          </Link>
          
          {/* WIP Badge */}
          <div className="absolute -top-3 -right-3 z-10">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium">
              <span>🚧</span>
              <span>WIP</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Tech Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltCard
            type="tech"
            title="CVX | Web3 Software Engineer 👨🏻‍💻"
            description="I'm an innovative Software Engineer, with more than 10 years of experience in the full software development life-cycle. Excellent troubleshooting and great teamwork skills."
            icon={Code}
            badges={[
              { text: "Scrum Master", variant: "scrum", hasStar: true },
              { text: "Full-Stack", variant: "dev", hasStar: true },
              { text: "DevOps", variant: "devops", hasStar: true },
              { text: "Web3", variant: "web3", hasStar: true }
            ]}
            href="/tech"
            color="text-primary"
          />
        </motion.div>

        {/* Arts Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TiltCard
            type="arts"
            title="Musician (Songwriter & Producer) 🤠"
            description="Composer • Producer • Songwriter. National awards in Costa Rica (2013, 2015, 2024). Original game soundtracks + modern folkloric compositions for cultural preservation."
            icon={Music}
            badges={[
              { text: "Composer" },
              { text: "Producer" },
              { text: "Cultural" }
            ]}
            href="/arts"
            color="text-arts-primary"
            isWIP={true}
          />
        </motion.div>
      </div>

      {/* Interactive Tech Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-10 max-w-4xl mx-auto"
      >
        <div className="p-8 text-center">
          
          {/* Rotating Tech Phrases */}
          <div className="mb-8">
            <RotatingPhrases />
          </div>

          {/* Recent Interview Reference */}
          <div className="space-y-4">
            <p className="text-white/70 text-lg">
              Featured in national media for innovative work in technology and education!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="https://www.repretel.com/noticia/en-grecia-vive-un-joven-muy-talentoso-que-educa-con-musica-y-tecnologia/#!/player-visor" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-primary/20 hover:border-primary/40"
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
              >
                📺 Watch the Full Interview
              </motion.a>
              
              <motion.a 
                href="https://calendly.com/josegomez-dev/30min?month=2025-09" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-secondary/20 hover:border-secondary/40"
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
              >
                📅 Schedule a Meeting
              </motion.a>
              
              <motion.a 
                href="https://play.workadventu.re/@/stellar-nexus-experience-1756770824/stellarnexusexperience/conference-campus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-200 text-sm font-medium cursor-pointer border border-accent/20 hover:border-accent/40"
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
              >
                🏢 Virtual Office Access
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

