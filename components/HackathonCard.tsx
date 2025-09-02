'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Rocket, Code, ExternalLink, Star, Play, Globe, FileText } from 'lucide-react'
import Link from 'next/link'

interface HackathonAchievement {
  id: string
  title: string
  year: number
  placement?: string
  project?: string
  description: string
  link?: string
  demoVideo?: string
  liveApp?: string
  article?: string
  type: 'hackathon' | 'challenge' | 'competition'
  category: 'hardware' | 'space' | 'blockchain' | 'biomedical' | 'web3'
  icon?: React.ReactNode
}

interface HackathonCardProps {
  achievement: HackathonAchievement
  index: number
}

export function HackathonCard({ achievement, index }: HackathonCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hardware': return 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400'
      case 'space': return 'from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-400'
      case 'blockchain': return 'from-primary/20 to-secondary/20 border-primary/30 text-primary'
      case 'biomedical': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400'
      case 'web3': return 'from-secondary/20 to-accent/20 border-secondary/30 text-secondary'
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hardware': return <Code className="h-4 w-4" />
      case 'space': return <Rocket className="h-4 w-4" />
      case 'blockchain': return <Code className="h-4 w-4" />
      case 'biomedical': return <Award className="h-4 w-4" />
      case 'web3': return <Star className="h-4 w-4" />
      default: return <Trophy className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'hardware': return 'Software & Hardware'
      case 'space': return 'Software & Hardware'
      case 'web3': return 'Web3'
      case 'blockchain': return 'Web3'
      case 'biomedical': return 'Software & Hardware'
      default: return category
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        boxShadow: "0 20px 40px -12px rgba(0, 229, 255, 0.2)"
      }}
      className={`card p-6 border-l-4 border-l-accent/50 relative overflow-hidden group`}
    >
              {/* Category Badge */}
        <div className={`absolute top-4 right-4 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(achievement.category)} text-xs font-medium`}>
          {getCategoryIcon(achievement.category)}
          <span>{getCategoryLabel(achievement.category)}</span>
        </div>

      {/* Year Badge */}
      <div className="absolute top-4 left-4">
        <div className="inline-flex items-center px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">
          {achievement.year}
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
            {achievement.title}
          </h3>
          {achievement.placement && (
            <div className="flex items-center space-x-1 text-accent">
              <Trophy className="h-4 w-4" />
              <span className="text-sm font-medium">{achievement.placement}</span>
            </div>
          )}
        </div>

        {achievement.project && (
          <p className="text-primary/80 text-sm font-medium">
            Project: {achievement.project}
          </p>
        )}

        <p className="text-white/70 text-sm leading-relaxed">
          {achievement.description}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap gap-2 relative z-10">
          {achievement.demoVideo && (
            <motion.a
              href={achievement.demoVideo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-primary/30 hover:border-primary/50 relative z-20"
            >
              <Play className="h-3 w-3" />
              <span>Demo</span>
            </motion.a>
          )}
          
          {achievement.liveApp && (
            <motion.a
              href={achievement.liveApp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-secondary/30 hover:border-secondary/50 relative z-20"
            >
              <Globe className="h-3 w-3" />
              <span>Live App</span>
            </motion.a>
          )}
          
          {achievement.article && (
            <motion.a
              href={achievement.article}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-accent/30 hover:border-accent/50 relative z-20"
            >
              <FileText className="h-3 w-3" />
              <span>Article</span>
            </motion.a>
          )}
          
          {achievement.link && (
            <motion.a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-200 text-xs font-medium cursor-pointer border border-white/20 hover:border-white/30 relative z-20"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Details</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.div>
  )
}
