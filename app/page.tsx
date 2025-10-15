'use client'

import { motion } from 'framer-motion'
import { Code, Music, Map } from 'lucide-react'
import Link from 'next/link'

import { RotatingPhrases } from '@/components/animations/RotatingPhrases'
import { TypewriterSubtitle } from '@/components/animations/TypewriterSubtitle'
import { TiltCard } from '@/components/ui/TiltCard'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8 relative">
      {/* Floating Welcome Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-8 right-8 z-10 hidden md:block"
      >
        <div className="relative">
          {/* Avatar */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/media/avatar.png" 
              alt="José Alejandro Gómez Castro" 
              className="w-16 h-16 rounded-full border-4 border-primary/30 shadow-lg"
            />
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Welcome Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-0 right-20 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-xl max-w-xs"
          >
            <div className="text-white text-sm font-medium">
              👋 Hi! Welcome to <span className="font-bold text-primary">CVx</span>!
            </div>
            <div className="text-white/80 text-xs mt-1">
              Ready to explore my world?
            </div>
            {/* Speech bubble tail */}
            <div className="absolute top-4 -left-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-primary/90"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Welcome Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="md:hidden mb-8"
      >
        <div className="relative">
          {/* Avatar */}
          <motion.div
            className="relative mx-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/media/avatar.png" 
              alt="José Alejandro Gómez Castro" 
              className="w-20 h-20 rounded-full border-4 border-primary/30 shadow-lg mx-auto"
            />
            {/* Sparkle effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Welcome Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl max-w-xs mx-auto text-center"
          >
            <div className="text-white text-base font-medium">
              👋 Hi! Welcome to <span className="font-bold text-primary">CVx</span>!
            </div>
            <div className="text-white/80 text-sm mt-1">
              Ready to explore my world?
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 name-text">
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
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all group"
          >
            <Map className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Explore the Interactive Biography Map</span>
          </Link>
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
            title="CVx | Web3 Software Engineer 👨🏻‍💻"
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
            
            <div className="flex flex-wrap justify-center gap-4">
              
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

