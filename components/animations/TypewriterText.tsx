'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorColor?: string
  onComplete?: () => void
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '',
  cursorColor = 'text-primary',
  onComplete 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsTyping(true)
      }, delay)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(true)
    }
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
      if (onComplete) {
        onComplete()
      }
    }
  }, [currentIndex, text, speed, isTyping, onComplete])

  return (
    <span className={className}>
      {displayText}
      {isTyping && (
        <motion.span
          className={`inline-block w-0.5 h-5 ${cursorColor} ml-1`}
          animate={{
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </span>
  )
}

// Specialized component for the tech description
export function TechDescriptionTypewriter() {
  return (
    <div className="text-lg dark:text-white/60 light:text-gray-600 max-w-3xl mx-auto mb-8">
      <TypewriterText 
        text="10+ years shipping web & mobile apps. "
        speed={60}
        className="dark:text-white/80 light:text-gray-700 font-medium"
        cursorColor="text-primary"
      />
      <TypewriterText 
        text="UX-first builder."
        speed={80}
        delay={2000}
        className="text-primary font-semibold"
        cursorColor="text-primary"
      />
    </div>
  )
}

// Specialized component for the bio description
export function BioDescriptionTypewriter() {
  return (
    <div className="text-lg dark:text-white/60 light:text-gray-600 max-w-3xl mx-auto mb-8">
      <TypewriterText 
        text="A journey of "
        speed={70}
        className="dark:text-white/80 light:text-gray-700 font-medium"
        cursorColor="text-accent"
      />
      <TypewriterText 
        text="music, "
        speed={70}
        delay={1000}
        className="text-red-400 font-semibold"
        cursorColor="text-red-400"
      />
      <TypewriterText 
        text="technology, "
        speed={70}
        delay={2000}
        className="text-cyan-400 font-semibold"
        cursorColor="text-cyan-400"
      />
      <TypewriterText 
        text="and cultural innovation."
        speed={70}
        delay={3500}
        className="dark:text-white/80 light:text-gray-700 font-medium"
        cursorColor="text-accent"
      />
    </div>
  )
}

