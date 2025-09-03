'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Code, Music, ArrowRight } from 'lucide-react'
import { CertifiedBadge } from './CertifiedBadge'

interface TiltCardProps {
  type: 'tech' | 'arts'
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  badges: Array<{ text: string; variant?: string; hasStar?: boolean }>
  href: string
  color: string
  isWIP?: boolean
}

export function TiltCard({ 
  type, 
  title, 
  description, 
  icon: Icon, 
  badges, 
  href, 
  color,
  isWIP = false 
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform mouse position to rotation
  const rotateX = useTransform(y, [-200, 200], [20, -20])
  const rotateY = useTransform(x, [-200, 200], [-20, 20])

  // Spring animations for smooth transitions
  const springConfig = { damping: 20, stiffness: 300 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  // Handle mouse move for 3D tilt
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = event.clientX - centerX
    const mouseY = event.clientY - centerY

    x.set(mouseX)
    y.set(mouseY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  // Set hover state when mouse enters
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1200,
        }}
        className="group relative overflow-hidden border-0 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/20 rounded-2xl hover:border-0 hover:bg-transparent hover:backdrop-blur-none hover:shadow-none card"
        animate={{
          y: [0, -5, 0],
        }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: `0 40px 80px -20px ${color}60, 0 0 30px ${color}30`,
          rotateX: 5,
          rotateY: 5,
          y: -15,
          z: 20
        }}
        transition={{ 
          duration: 0.5, 
          type: "spring", 
          stiffness: 250, 
          damping: 25,
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
              <motion.div
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="h-full relative"
          whileHover={{
            scale: 1.02,
            z: 30
          }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 400
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${color.replace('text-', '')}20, transparent 50%, ${color.replace('text-', '')}10)`,
              transform: 'translateZ(-10px)',
            }}
            animate={{
              background: [
                `linear-gradient(135deg, ${color.replace('text-', '')}20, transparent 50%, ${color.replace('text-', '')}10)`,
                `linear-gradient(225deg, ${color.replace('text-', '')}20, transparent 50%, ${color.replace('text-', '')}10)`,
                `linear-gradient(135deg, ${color.replace('text-', '')}20, transparent 50%, ${color.replace('text-', '')}10)`,
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        {/* WIP Badge for Arts card */}
        {isWIP && (
          <motion.div 
            className="absolute top-4 right-4 z-10"
            style={{ transform: 'translateZ(60px)' }}
          >
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-medium">
              <span>🚧</span>
              <span>WIP</span>
            </div>
          </motion.div>
        )}
                  <Link href={href} className="block p-8 h-full relative">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                style={{ transform: 'translateZ(50px)' }}
                whileHover={{ 
                  scale: 1.2, 
                  rotateZ: 8,
                  y: -3
                }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 400,
                  damping: 15
                }}
              >
                <Icon className={`h-12 w-12 ${color} drop-shadow-lg`} />
              </motion.div>
              <motion.div
                style={{ transform: 'translateZ(30px)' }}
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : 10,
                  scale: isHovered ? 1.2 : 0.8
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.4 }}
              >
                <ArrowRight className={`h-6 w-6 ${color} drop-shadow-sm`} />
              </motion.div>
            </div>
          
                      <motion.h2 
              className={`text-2xl font-bold ${color} mb-4 ${isWIP ? 'blur-sm' : ''} drop-shadow-sm`}
              style={{ transform: 'translateZ(40px)' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className={`text-white/70 mb-6 ${isWIP ? 'blur-sm' : ''} leading-relaxed`}
              style={{ transform: 'translateZ(20px)' }}
            >
              {description}
            </motion.p>
          
                      <motion.div 
              className={`flex flex-wrap gap-2 ${isWIP ? 'blur-sm' : ''}`}
              style={{ transform: 'translateZ(10px)' }}
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -2,
                    rotateZ: 2 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    type: "spring", 
                    stiffness: 400 
                  }}
                  style={{ 
                    transform: `translateZ(${15 + index * 2}px)` 
                  }}
                >
                  {badge.variant ? (
                    <CertifiedBadge variant={badge.variant as 'scrum' | 'dev' | 'devops' | 'web3'} hasStar={badge.hasStar}>
                      {badge.text}
                    </CertifiedBadge>
                  ) : (
                    <span className={`px-3 py-1 ${color.replace('text-', 'bg-')}/20 ${color} text-sm rounded-full border border-current/20 backdrop-blur-sm`}>
                      {badge.text}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  )
}
