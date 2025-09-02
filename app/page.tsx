'use client'

import { motion } from 'framer-motion'
import { Code, Music, ArrowRight, Map } from 'lucide-react'
import Link from 'next/link'
import { CertifiedBadge } from '@/components/CertifiedBadge'
import { RotatingPhrases } from '@/components/RotatingPhrases'
import { TypewriterSubtitle } from '@/components/TypewriterSubtitle'

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
          whileHover={{ 
            scale: 1.02,
            rotateY: 5,
            boxShadow: "0 25px 50px -12px rgba(0, 229, 255, 0.25)"
          }}
          className="card card-hover group"
        >
          <Link href="/tech" className="block p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <Code className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              <ArrowRight className="h-6 w-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Software Engineer 👨🏻‍💻
            </h2>
            <p className="text-white/70 mb-6">
             I'm an innovative Software Engineer, with more than 10 years of experience in the full software development life-cycle. Excellent troubleshooting and great teamwork skills.
            </p>
            <div className="flex flex-wrap gap-2">
              <CertifiedBadge variant="scrum" hasStar>Scrum Master</CertifiedBadge>
              <CertifiedBadge variant="devops" hasStar>DevOps</CertifiedBadge>
              <CertifiedBadge variant="dev" hasStar>Full-Stack</CertifiedBadge>
              <CertifiedBadge variant="web3" hasStar>Web3</CertifiedBadge>
            </div>
          </Link>
        </motion.div>

        {/* Arts Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ 
            scale: 1.02,
            rotateY: -5,
            boxShadow: "0 25px 50px -12px rgba(255, 68, 68, 0.25)"
          }}
          className="card card-hover group relative"
        >
          {/* WIP Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium">
              <span>🚧</span>
              <span>WIP</span>
            </div>
          </div>
          <Link href="/arts" className="block p-8 h-full">
            <div className="flex items-center justify-between mb-6">
              <Music className="h-12 w-12 text-arts-primary group-hover:scale-110 transition-transform" />
              <ArrowRight className="h-6 w-6 text-arts-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="text-2xl font-bold text-arts-primary mb-4 blur-sm">
              Musician (Songwriter/Producer) 🤠
            </h2>
            <p className="text-white/70 mb-6 blur-sm">
              Composer • Producer • Songwriter. National awards in Costa Rica 
              (2013, 2015, 2024). Original soundtracks + modern folkloric 
              adaptations for cultural preservation.
            </p>
            <div className="flex flex-wrap gap-2 blur-sm">
              <span className="px-3 py-1 bg-arts-primary/20 text-arts-primary text-sm rounded-full">
                Composer
              </span>
              <span className="px-3 py-1 bg-arts-primary/20 text-arts-primary text-sm rounded-full">
                Producer
              </span>
              <span className="px-3 py-1 bg-arts-primary/20 text-arts-primary text-sm rounded-full">
                Cultural
              </span>
            </div>
          </Link>
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

