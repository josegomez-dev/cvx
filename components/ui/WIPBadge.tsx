'use client'

import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface WIPBadgeProps {
  title?: string
  message?: string
  redirectDelay?: number
  variant?: 'default' | 'arts'
}

export function WIPBadge({ 
  title = "Coming Soon", 
  message = "This page is currently under construction. We're working hard to bring you something amazing!",
  redirectDelay = 5000,
  variant = 'default'
}: WIPBadgeProps) {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (redirectDelay / 100))
        if (newProgress >= 100) {
          setIsRedirecting(true)
          setTimeout(() => router.push('/'), 500)
          return 100
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [redirectDelay, router])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-surface/95 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="relative max-w-lg mx-4 p-8 rounded-3xl bg-gradient-to-br from-base-surface/80 to-base-surface/60 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Floating WIP Badge */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-white text-sm font-semibold shadow-lg bg-gradient-to-r from-arts-fire via-arts-lava to-arts-primary border border-arts-primary/30`}
          >
            <Sparkles className="h-4 w-4" />
            <span>🚧 WIP</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6 pt-4">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className={`p-4 rounded-2xl border ${
              variant === 'arts'
                ? 'bg-gradient-to-br from-arts-fire/20 to-arts-lava/20 border-arts-primary/30'
                : 'bg-gradient-to-br from-white/20 to-gray-500/20 border-white/30'
            }`}>
              <Clock className={`h-10 w-10 ${
                variant === 'arts' ? 'text-arts-primary' : 'text-white'
              }`} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-white/70 leading-relaxed text-lg"
          >
            {message}
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center justify-center space-x-2 text-white/60"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              Redirecting in {Math.ceil((100 - progress) / (100 / (redirectDelay / 1000)))}s
            </span>
          </motion.div>

          {/* Animated Loading Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center space-x-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className={`w-2 h-2 rounded-full ${
                  variant === 'arts'
                    ? 'bg-gradient-to-r from-arts-fire to-arts-lava'
                    : 'bg-gradient-to-r from-white to-gray-400'
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-3xl overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className={`h-full ${
              variant === 'arts'
                ? 'bg-gradient-to-r from-arts-fire via-arts-lava to-arts-primary'
                : 'bg-gradient-to-r from-white via-gray-400 to-white'
            }`}
          />
        </div>

        {/* Decorative Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 1, duration: 1 }}
          className={`absolute inset-0 rounded-3xl ${
            variant === 'arts'
              ? 'bg-gradient-to-br from-arts-fire/10 via-arts-lava/5 to-transparent'
              : 'bg-gradient-to-br from-white/10 via-gray-500/5 to-transparent'
          }`}
        />
      </motion.div>
    </div>
  )
}
