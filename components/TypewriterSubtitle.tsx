'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterSubtitleProps {
  text: string
  speed?: number
  className?: string
}

export function TypewriterSubtitle({ 
  text, 
  speed = 100, 
  className = "text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto" 
}: TypewriterSubtitleProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (isTyping && currentIndex >= text.length) {
      // Finished typing, pause then start deleting
      const pauseTimeout = setTimeout(() => {
        setIsTyping(false)
        setCurrentIndex(text.length - 1)
      }, 1500) // 1.5 second pause before deleting

      return () => clearTimeout(pauseTimeout)
    } else if (!isTyping && currentIndex >= 0) {
      // Deleting backward
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1))
        setCurrentIndex(prev => prev - 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isTyping && currentIndex < 0) {
      // Finished deleting, pause then start typing again
      const pauseTimeout = setTimeout(() => {
        setIsTyping(true)
        setCurrentIndex(0)
        setDisplayText('')
      }, 1000) // 1 second pause before restarting

      return () => clearTimeout(pauseTimeout)
    }
  }, [currentIndex, text, speed, isTyping])

  return (
    <motion.p 
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-white/80 ml-1"
      />
    </motion.p>
  )
}
