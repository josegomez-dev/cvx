'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  type?: 'fadeIn' | 'slideUp' | 'bounce' | 'glitch' | 'gradient' | 'highlight'
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0, 
  duration = 0.8,
  type = 'fadeIn'
}: AnimatedTextProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const getAnimationVariants = () => {
    switch (type) {
      case 'fadeIn':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay,
              ease: "easeOut"
            }
          }
        }
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay,
              ease: "easeOut"
            }
          }
        }
      case 'bounce':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration,
              delay,
              type: "spring",
              stiffness: 100
            }
          }
        }
      case 'glitch':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: "easeOut"
            }
          }
        }
      case 'gradient':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration,
              delay,
              ease: "easeOut"
            }
          }
        }
      case 'highlight':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration,
              delay,
              ease: "easeOut"
            }
          }
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
    }
  }

  const renderText = () => {
    if (type === 'glitch') {
      return (
        <motion.span
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={getAnimationVariants()}
          className={`${className} relative`}
        >
          <span className="relative z-10">{text}</span>
          <motion.span
            className="absolute inset-0 text-primary opacity-50"
            animate={{
              x: [0, -2, 2, 0],
              y: [0, 1, -1, 0]
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-primary opacity-30"
            animate={{
              x: [0, 2, -2, 0],
              y: [0, -1, 1, 0]
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 2,
              delay: 0.05
            }}
          >
            {text}
          </motion.span>
        </motion.span>
      )
    }

    if (type === 'gradient') {
      return (
        <motion.span
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={getAnimationVariants()}
          className={`${className} bg-gradient-to-r from-white/80 via-primary to-white/80 bg-clip-text text-transparent`}
        >
          {text}
        </motion.span>
      )
    }

    if (type === 'highlight') {
      return (
        <motion.span
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={getAnimationVariants()}
          className={`${className} relative`}
        >
          <span className="relative z-10">{text}</span>
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded px-1 -z-10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + 0.2,
              ease: "easeOut"
            }}
            style={{ transformOrigin: "left" }}
          />
        </motion.span>
      )
    }

    return (
      <motion.span
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={getAnimationVariants()}
        className={className}
      >
        {text}
      </motion.span>
    )
  }

  return renderText()
}

// Specialized component for the tech profile description
export function TechDescription() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="text-lg text-white/60 max-w-3xl mx-auto mb-8"
    >
      <AnimatedText 
        text="10+ years shipping web & mobile apps. "
        type="highlight"
        className="text-white/80 font-medium"
      />
      <AnimatedText 
        text="UX-first builder."
        type="glitch"
        className="text-primary font-semibold"
        delay={1}
      />
    </motion.p>
  )
}
