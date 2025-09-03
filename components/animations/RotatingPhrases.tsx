'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const phrases = [
  "Building the future of decentralized finance",
  "Crafting seamless Web3 experiences",
  "Pioneering trustless smart contracts",
  "Architecting the next generation of dApps",
  "Engineering blockchain solutions for tomorrow",
  "Creating innovative DeFi protocols",
  "Developing cutting-edge Web3 infrastructure",
  "Building bridges between Web2 and Web3"
]

export function RotatingPhrases() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-xl text-white/80"
        >
          <span className="text-primary font-semibold">
            {phrases[currentIndex]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
