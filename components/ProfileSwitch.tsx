'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Code, Music } from 'lucide-react'
import { useUI, Profile } from '@/store/useUI'
import { cn } from '@/lib/utils'

export function ProfileSwitch() {
  const router = useRouter()
  const { currentProfile, setCurrentProfile } = useUI()

  const handleSwitch = (profile: Profile) => {
    if (profile === 'arts') return // Disable Arts switching
    setCurrentProfile(profile)
    router.push(`/${profile}`)
  }

  return (
    <div className="relative">
      {/* Main Tech Button */}
      <div className="flex items-center rounded-lg border border-white/10 bg-white/5 p-1">
        <motion.button
          onClick={() => handleSwitch('tech')}
          className={cn(
            'flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            currentProfile === 'tech'
              ? 'bg-primary/20 text-primary shadow-lg'
              : 'text-white/60 hover:text-white/80'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Code className="h-4 w-4" />
          <span className="hidden sm:inline">Tech</span>
        </motion.button>
        
        {/* Disabled Arts Button */}
        <motion.button
          onClick={() => handleSwitch('arts')}
          disabled
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all text-arts-primary/50 cursor-not-allowed opacity-60"
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
        >
          <Music className="h-4 w-4" />
          <span className="hidden sm:inline">Arts</span>
        </motion.button>
      </div>

              {/* Floating Music Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -top-3 -right-3 z-20"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-2"
          >
            🚧
          </motion.div>
        </motion.div>
    </div>
  )
}
