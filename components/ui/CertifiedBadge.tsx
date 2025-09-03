'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CertifiedBadgeProps {
  children: React.ReactNode
  variant?: 'scrum' | 'devops' | 'tech' | 'ai' | 'design' | 'docs' | 'dev' | 'collab' | 'productivity' | 'web3'
  hasStar?: boolean
  className?: string
}

export function CertifiedBadge({ children, variant = 'tech', hasStar = false, className }: CertifiedBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'scrum':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400'
      case 'dev':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400'
      case 'ai':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400'
      case 'design':
        return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400'
      case 'docs':
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400'
      case 'devops':
        return 'bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400'
      case 'collab':
        return 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400'
      case 'productivity':
        return 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-400'
      case 'web3':
        return 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400'
      default:
        return 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 text-primary'
    }
  }

  return (
    <motion.div 
      className={cn(
        'inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-medium shadow-lg backdrop-blur-sm cursor-pointer',
        getVariantStyles(),
        className
      )}
      whileHover={{ 
        scale: 1.1,
        y: -2,
        rotateZ: 2,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }}
    >
      {hasStar && (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Star className="h-3 w-3 fill-current" />
        </motion.div>
      )}
      <span>{children}</span>
    </motion.div>
  )
}
