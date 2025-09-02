'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedHighlightsProps {
  highlights: string[]
}

export function AnimatedHighlights({ highlights }: AnimatedHighlightsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <div 
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
    >
      {highlights.map((highlight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={inView ? { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateY: [0, 5, 0]
          } : { opacity: 0, y: 30, scale: 0.9 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05,
            rotateY: 10,
            boxShadow: "0 20px 40px -12px rgba(0, 229, 255, 0.3)"
          }}
          className="card p-6 text-center border-primary/20 relative overflow-hidden group"
        >
          {/* Floating particles */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(0, 229, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(0, 229, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(0, 229, 255, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(0, 229, 255, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 229, 255, 0.4)",
                "0 0 0 10px rgba(0, 229, 255, 0)",
                "0 0 0 0 rgba(0, 229, 255, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.p 
            className="text-white/80 relative z-10"
            animate={{
              textShadow: [
                "0 0 0 rgba(0, 229, 255, 0)",
                "0 0 10px rgba(0, 229, 255, 0.5)",
                "0 0 0 rgba(0, 229, 255, 0)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            {highlight}
          </motion.p>
        </motion.div>
      ))}
    </div>
  )
}
